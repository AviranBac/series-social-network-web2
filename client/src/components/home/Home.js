import SeriesCard from "./SeriesCard";
import { MDBRow} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';

const Home = () => {

  const [series, setSeries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8080/series');
      const data = await response.json();
      setSeries(data);
    }
    fetchData();
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
                {series.map((series) => <SeriesCard series={series}/>)}
            </MDBRow>

            <h5>Most Popular Series</h5>
            <MDBRow className='row-cols-1 row-cols-md-5 g-3'  style={{ border: '1px solid #ccc'}}>
            {series.map((series) => <SeriesCard series={series}/>)}
            </MDBRow>
        </div>
           
    );
};

export default Home;