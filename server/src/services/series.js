const Series = require("../db/mongo/models/series");
const Seasons = require("../db/mongo/models/season");
const Episodes = require("../db/mongo/models/episode");
const Genres = require("../db/mongo/models/genre");
const WatchLists = require("../db/mongo/models/watchlist");
const { searchFollowings } = require("./follows");
const mongoose = require("mongoose");

const getSeriesDetails = async (seriesId) => {
    const matchedSeries = await aggregateSeries([new mongoose.mongo.ObjectId(seriesId)]);
    return matchedSeries.length > 0 ? matchedSeries[0] : null;
};

const aggregateSeries = async (seriesIds) => {
    return Series.aggregate([
        { $match: { _id: { $in: seriesIds } } }, // filter series id
        {
            $lookup: {
                from: Seasons.collection.name,
                localField: "_id",
                foreignField: "series_id",
                as: "season"
            }
        }, // get season details
        { $unwind: "$season" },
        {
            $lookup: {
                from: Episodes.collection.name,
                localField: "season._id",
                foreignField: "season_id",
                as: "episode"
            }
        }, // get episode details
        { $unwind: "$episode" },
        { $group: { _id: "$episode.season_id", series: { $first: "$$ROOT" }, episodes: { $push: "$episode" } } }, // group by season_id
        { $replaceWith: { $mergeObjects: ["$$ROOT", "$series"] } }, // flatten
        { $set: { "season.episodes": "$episodes" } }, // set episodes in season hierarchy
        { $project: { series: 0, episode: 0, episodes: 0 } }, // remove duplicated fields
        { $group: { _id: "$season.series_id", series: { $first: "$$ROOT" }, seasons: { $push: "$season" } } }, // group by season_id
        { $replaceWith: { $mergeObjects: ["$$ROOT", "$series"] } }, // flatten
        { $set: { "series.seasons": "$seasons" } }, // set seasons in series hierarchy
        { $project: { series: 0, season: 0 } }, // remove duplicated fields
        ...lookupGenres(),
        ...sortBySeasonNumber()
    ]);
};

const filterSeries = async ({ name, status, genre }, pageNumber, pageLimit) => {
    const aggregationQuery = [];

    name && aggregationQuery.push({ $addFields: { searchIndex: { $indexOfCP: ["$name", String(name)] } } }, { $match: { searchIndex: { $ne: -1 } } });
    status && aggregationQuery.push({ $match: { status: { $eq: status } } });
    aggregationQuery.push(...lookupGenres(), {
        $replaceWith: {
            $setField: {
                field: "genres",
                input: "$$ROOT",
                value: {
                    $reduce: {
                        input: "$genres",
                        initialValue: [],
                        in: { $concatArrays: ["$$value", ["$$this.name"]] }
                    }
                }
            }
        }
    });
    genre && aggregationQuery.push({ $match: { genres: { $all: genre } } });

    const data = await Series.aggregate([...aggregationQuery, { $skip: pageLimit * (parseInt(pageNumber) - 1) }, { $limit: pageLimit }]);
    const totalAmount = await Series.aggregate([...aggregationQuery, { $count: "count" }]);

    return { data, totalAmount };
};

const getMostWatchedSeries = async (pageNumber, pageLimit) => {
    const result = await WatchLists.aggregate([
        ...lookupSeriesFromEpisode(),
        { $replaceRoot: { newRoot: "$series" } },
        ...lookupGenres(),
        { $group: { _id: "$_id", series: { $first: "$$ROOT" } } },
        { $skip: pageLimit * (parseInt(pageNumber) - 1) },
        { $limit: pageLimit }
    ]);

    return result;
};

const getCommonSeriesAmongFollowing = async (email, userSeriesIdsWatchList, pageNumber, pageLimit) => {
    const following = await searchFollowings(email);

    const followingWatchList = await WatchLists.aggregate([
        { $match: { email: { $in: following.map(follower => follower.email_to) } } },
        ...lookupSeriesFromEpisode(),
        { $replaceRoot: { newRoot: { email: "$email", seriesId: "$series._id", series: "$series" } } },
        { $group: {  _id : { email: "$email", seriesId: "$series._id" }, series: {$first: "$series"} } },
        { $replaceRoot: { newRoot: "$series" } },
        { $match: { _id: { $nin: userSeriesIdsWatchList }}},
        ...lookupGenres(),
        { $group: { _id: "$_id", series: { $first: "$$ROOT" }, count: { $sum: 1} } },
        { $sort: { "count": -1 } },
        { $unset: "count" },
        { $skip: pageLimit * (parseInt(pageNumber) - 1) },
        { $limit: pageLimit }
    ]);

    return followingWatchList;
};

const getTopRatedSeries = async (pageNumber, pageLimit) => await Series.find().sort({ vote_average: -1 }).skip(pageLimit * (pageNumber - 1)).limit(pageLimit).exec();

const getPopularSeries = async (pageNumber, pageLimit) => await Series.find().sort({ popularity: -1 }).skip(pageLimit * (pageNumber - 1)).limit(pageLimit).exec();

const lookupSeriesFromEpisode = () => ([
    {
        $lookup: {
            from: Episodes.collection.name,
            localField: "episode_id",
            foreignField: "_id",
            as: "episode"
        }
    }, {
        $lookup: {
            from: Seasons.collection.name,
            localField: "episode.season_id",
            foreignField: "_id",
            as: "season"
        }
    }, {
        $lookup: {
            from: Series.collection.name,
            localField: "season.series_id",
            foreignField: "_id",
            as: "series"
        }
    }, { $unwind: "$series" },
]);

const lookupGenres = () => ([
    {
        $lookup: {
            from: Genres.collection.name,
            localField: "genre_ids",
            foreignField: "_id",
            as: "genres"
        }
    }, // get genre details
    { $project: { genre_ids: 0 } } // remove duplicated fields
]);

const sortBySeasonNumber = () => ([
    { $unwind: "$seasons" }, // prepare season_number sorting
    { $sort: { "seasons.season_number": 1 } },
    { $group: { _id: "$_id", series: { $first: "$$ROOT" }, seasons: { $push: "$seasons" } } }, // restore sorted seasons field
    { $project: { "series.seasons": 0 } }, // remove "series.seasons" field so it won't be overridden
    { $replaceWith: { $mergeObjects: ["$$ROOT", "$series"] } }, // flatten
    { $project: { series: 0 } } // remove duplicated fields
]);

module.exports = {
    aggregateSeries,
    lookupGenres,
    sortBySeasonNumber,
    filterSeries,
    getMostWatchedSeries,
    getCommonSeriesAmongFollowing,
    getTopRatedSeries,
    getPopularSeries,
    getSeriesDetails
};