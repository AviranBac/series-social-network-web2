import SeriesCard from './SeriesCard';
import { MDBRow} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import axios from 'axios';
import seriesService from "../../services/series.service";

const Home = () => {

  const [recommendedSeries, setRecommendedSeries] = useState([]);

  useEffect(() => {
    seriesService.getMostPopularSeries()
       .then(response => setRecommendedSeries(response))
       .catch(console.error)
  }, []);


  const [mostPopularSeries, setMostPopularSeries] = useState([]);

  useEffect(() => {
    seriesService.getMostPopularSeries()
       .then(response => setMostPopularSeries(response))
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

             <MDBRow className='row-cols-1 row-cols-md-5 g-3'  style={rowStyle}>
                {recommendedSeries.map((series) => <SeriesCard series={series}/>)}
            </MDBRow>

            <h5>Most Popular Series</h5>
            <MDBRow className='row-cols-1 row-cols-md-5 g-3'  style={{ border: '1px solid #ccc'}}>
            {mostPopularSeries.map((series) => <SeriesCard series={series}/>)}
            </MDBRow>
        </div>
           
    );
};

export default Home;