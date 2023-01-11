import SeriesCard from './SeriesCard';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBRow } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import seriesService from "../../services/series.service";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../../features/auth/auth.selectors";

const SeriesRow = (props) => {
    const { seriesRequestFn, title, subtitle } = props;
    const [series, setSeries] = useState([]);

    useEffect(() => {
        seriesRequestFn()
            .then(response => setSeries(response.data.slice(0, 5)))
            .catch(console.error)
    }, [seriesRequestFn]);

    return (
        <>
            <MDBCard className="mt-3">
                <MDBCardHeader border="0">
                    <h4>{title}</h4>
                    <h6 style={{ color: "gray" }}>{subtitle}</h6>
                </MDBCardHeader>
                <MDBCardBody style={{ padding: ".5rem 1.5rem" }}>
                    <MDBRow className='row-cols-1 row-cols-md-5 g-3 mb-2'>
                        {series.map(series => (
                            <SeriesCard series={series} key={series._id}/>
                        ))}
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </>
    );
}

const Home = () => {
    const email = useSelector(selectUserEmail);

    return (
        <div className="d-flex m-auto flex-column g-1" style={{ width: "85%" }}>
            <SeriesRow seriesRequestFn={() => seriesService.getMostRecommendedSeries(email)}
                       title="Series You Might Like"
                       subtitle="Based on your following's watchlist" />
            <SeriesRow seriesRequestFn={() => seriesService.getMostPopularSeries()}
                       title="Most Popular Series"
                       subtitle="The most popular series available" />
        </div>
    );
};

export default Home;