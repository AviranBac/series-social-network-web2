import SeriesCard from './SeriesCard';
import { MDBRow } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import seriesService from "../../services/series.service";

const Home = () => {
    const [recommendedSeries, setRecommendedSeries] = useState([]);

    useEffect(() => {
        seriesService.getMostRecommendedSeries()
            .then(response => setRecommendedSeries(response.data.slice(0, 5)))
            .catch(console.error)
    }, []);


    const [mostPopularSeries, setMostPopularSeries] = useState([]);

    useEffect(() => {
        seriesService.getMostPopularSeries()
            .then(response => setMostPopularSeries(response.data.slice(0, 5)))
            .catch(console.error)
    }, []);

    const divStyle = {
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        width: '70%',
    };

    const rowStyle = {
        border: '1px solid #ccc',
        marginBottom: '20px'
    };

    return (
        <div style={divStyle}>
            <h5>Series You May Like</h5>

            <MDBRow className='row-cols-1 row-cols-md-5 g-3' style={rowStyle}>
                {recommendedSeries.length > 0 && recommendedSeries.map((series) => <SeriesCard series={series}/>)}
            </MDBRow>

            <h5>Most Popular Series</h5>
            <MDBRow className='row-cols-1 row-cols-md-5 g-3' style={{ border: '1px solid #ccc' }}>
                {mostPopularSeries.length > 0 && mostPopularSeries.map((series) => <SeriesCard series={series}/>)}
            </MDBRow>
        </div>

    );
};

export default Home;