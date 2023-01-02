const Series = require("../db/mongo/models/series");
const Seasons = require("../db/mongo/models/season");
const Episodes = require("../db/mongo/models/episode");
const WatchLists = require("../db/mongo/models/watchlist");
const mongoose = require("mongoose");
const {
    aggregateSeries,
    lookupGenres,
    sortBySeasonNumber
} = require("./series");

const addToWatchlist = async (email, entityType, entityId) => {
    const allEpisodeIdsOfEntity = await getTvEpisodeIdsByEntity(entityType, entityId);

    const existingEpisodeIdsInWatchlist = (await WatchLists.find({ episode_id: { $in: allEpisodeIdsOfEntity } }).exec())
        .map(watchlistRecord => watchlistRecord.episode_id.toString());
    const episodeIdsToAdd = allEpisodeIdsOfEntity.filter(episodeId => !existingEpisodeIdsInWatchlist.includes(episodeId.toString()));
    const watchlistRecordsToAdd = episodeIdsToAdd.map(episodeId => ({ email, episode_id: episodeId }));

    await WatchLists.insertMany(watchlistRecordsToAdd);
    return getUserWatchlist(email);
};

const removeFromWatchlist = async (email, entityType, entityId) => {
    const allEpisodeIdsOfEntity = await getTvEpisodeIdsByEntity(entityType, entityId);

    await WatchLists.deleteMany({ email, episode_id: { $in: allEpisodeIdsOfEntity } });
    return getUserWatchlist(email);
};

const getTvEpisodeIdsByEntity = async (entityType, entityId) => {
    let episodeIds = [];

    switch (entityType) {
        case "SERIES": {
            episodeIds = (await aggregateSeries([new mongoose.mongo.ObjectId(entityId)]))[0].seasons
                .flatMap(season => season.episodes.map(episode => episode._id))
            break;
        }
        case "SEASON": {
            episodeIds = (await Episodes.find({ season_id: entityId })).map(episode => episode._id);
            break;
        }
        case "EPISODE": {
            episodeIds = [new mongoose.mongo.ObjectId(entityId)];
            break;
        }
    }

    return episodeIds;
};

const getUserWatchlist = async (email) => {
    const seriesWithWatchlistEpisodes = await aggregateWatchlistEpisodes(email);
    const seriesIds = seriesWithWatchlistEpisodes.map(series => series._id);
    const allOriginalSeries = await aggregateSeries(seriesIds);

    return allOriginalSeries.map(currentOriginalSeries => {
        const currentWatchlistSeries = seriesWithWatchlistEpisodes.find(watchlistSeries => watchlistSeries._id.equals(currentOriginalSeries._id));
        return calculateSeriesWatchlistStatus(currentOriginalSeries, currentWatchlistSeries);
    });
};

const aggregateWatchlistEpisodes = async (email) => {
    return WatchLists.aggregate([
        { $match: { email } }, // filter by email
        {
            $lookup: {
                from: Episodes.collection.name,
                localField: "episode_id",
                foreignField: "_id",
                as: "episode"
            }
        }, // get episode record from episodes collection
        { $unwind: "$episode" }, // flatten episode array
        { $group: { _id: "$episode.season_id", episodes: { $push: "$episode" } } }, // group by season_id
        {
            $lookup: {
                from: Seasons.collection.name,
                localField: "episodes.season_id",
                foreignField: "_id",
                as: "season"
            }
        }, // get season record from seasons collection
        { $unwind: "$season" }, // flatten season array
        { $replaceWith: { $mergeObjects: ["$$ROOT", "$season"] } }, // flatten "season" field to root
        { $project: { season: 0 } }, // remove duplicated field
        { $group: { _id: "$series_id", seasons: { $push: "$$ROOT" } } }, // group by series_id
        {
            $lookup: {
                from: Series.collection.name,
                localField: "_id",
                foreignField: "_id",
                as: "series"
            }
        }, // get series record from series collection
        { $unwind: "$series" }, // flatten series array
        { $replaceWith: { $mergeObjects: ["$$ROOT", "$series"] } }, // flatten "series" field to root
        { $project: { series: 0 } }, // remove duplicated field
        ...lookupGenres(),
        ...sortBySeasonNumber()
    ]);
};

const calculateSeriesWatchlistStatus = (originalSeries, watchlistSeries) => {
    const originalSeasons = originalSeries.seasons;
    const watchlistSeasons = watchlistSeries.seasons;

    const seasonsWithWatchlistStatus = watchlistSeasons
        .map(watchlistSeason => {
            const originalSeason = originalSeasons.find(season => season._id.equals(watchlistSeason._id));
            const watchlistStatus = watchlistSeason.episodes.length < originalSeason.episodes.length ? "PARTIAL" : "COMPLETE";
            return {
                ...JSON.parse(JSON.stringify(watchlistSeason)),
                watchlistStatus
            };
        });

    const hasNotWatchedAllSeasons = watchlistSeasons.length < originalSeasons.length;
    const hasWatchedAnySeasonPartially = !!seasonsWithWatchlistStatus.find(season => season.watchlistStatus === "PARTIAL");
    const watchlistStatus = hasNotWatchedAllSeasons || hasWatchedAnySeasonPartially ? "PARTIAL" : "COMPLETE";

    return {
        ...JSON.parse(JSON.stringify(watchlistSeries)),
        seasons: seasonsWithWatchlistStatus,
        watchlistStatus
    };
};

module.exports = {
    addToWatchlist,
    removeFromWatchlist,
    getUserWatchlist
}