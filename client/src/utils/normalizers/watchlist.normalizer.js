import { normalize, schema } from "normalizr";

export const normalizeWatchlistSeries = (seriesBeforeNormalization) => {
    const episodes = new schema.Entity(
        'episodes',
        {},
        { idAttribute: '_id' }
    );
    const seasons = new schema.Entity(
        'seasons',
        { episodes: [episodes] },
        { idAttribute: '_id' }
    );
    const series = new schema.Entity(
        'series',
        { seasons: [seasons] },
        { idAttribute: '_id' }
    );

    return normalize(seriesBeforeNormalization, [series]).entities;
}