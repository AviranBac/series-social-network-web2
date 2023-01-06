const Series = require("../db/mongo/models/series");
const Seasons = require("../db/mongo/models/season");
const Episodes = require("../db/mongo/models/episode");
const Genres = require("../db/mongo/models/genre");
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
    getSeriesDetails,
    aggregateSeries,
    lookupGenres,
    sortBySeasonNumber
};