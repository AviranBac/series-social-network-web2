import React, { useState } from 'react';
import SeriesFilters from '../seriesFilters/SeriesFilters';

const SearchSeries = () => {
    const [query,setQuery]=useState({name: "", genres:[], statuses:[]});

    const setFilters = ({name="", genres =query.genres, statuses=query.genres}) => {
        setQuery({name, genres, statuses});
    }

    return (
        <>
        <SeriesFilters setSeriesFilters={setFilters}/>
        
        <p>name: {query.name}</p>
        <p>genres: {JSON.stringify(query.genres)}</p>
        <p>statuses: {JSON.stringify(query.statuses)}</p>

        </>
    )
};

export default SearchSeries;