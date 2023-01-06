import SeriesChart from "./SeriesChart";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Statistics = () => {
    const [series, setRecommendedSeries] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const response = await axios.get('http://localhost:8080/series');
        setRecommendedSeries(response.data);
      }
      fetchData();
    }, []);
    return (
        <div>
            <h3>Series Statistics</h3>
            <SeriesChart series={series} dataKey="popularity"/>
            <SeriesChart series={series} dataKey="vote_average"/>
        </div>
  
    );
};

export default Statistics;