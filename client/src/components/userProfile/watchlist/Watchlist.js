import { MDBAccordion } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import watchlistService from "../../../services/watchlist.service";
import classes from "./Watchlist.module.css";
import { sortBy } from "lodash";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../../../features/auth/auth.selectors";
import SingleSeriesItem from "./singleSeriesItem/SingleSeriesItem";
import { Spinner } from "react-bootstrap";

const Watchlist = ({ email }) => {
    const [watchlist, setWatchlist] = useState([]);
    const loggedInEmail = useSelector(selectUserEmail);
    const isLoggedInUser = email === loggedInEmail;
    const [loading, setLoading] = useState(true);

    const setSortedWatchlist = (watchlist) => {
        const sortedWatchlist = sortBy(watchlist, series => series.name);
        sortedWatchlist.forEach(series => {
            series.seasons = sortBy(series.seasons, season => season.season_number);
            series.seasons.forEach(season =>
                season.episodes = sortBy(season.episodes, episode => episode.episode_number)
            );
        });

        setWatchlist(sortedWatchlist);
    };

    useEffect(() => {
        setLoading(true);
        watchlistService.getUserWatchlist(email)
            .then((watchlist) => {
                setSortedWatchlist(watchlist);
                setLoading(false);
            });
    }, [email]);

    return (
        <>
            { watchlist.length > 0 &&
                <MDBAccordion className={`d-flex flex-column m-auto gap-2 ${classes.accordion}`}>
                    { watchlist.map(series => (
                       <SingleSeriesItem key={series._id}
                                         email={email}
                                         series={series}
                                         isLoggedInUser={isLoggedInUser}
                                         onWatchlistChange={setSortedWatchlist} />
                    )) }
                </MDBAccordion>
            }
            {
                watchlist.length === 0 && !loading && <h6 className="text-center border-white mt-4">This user does not have a watchlist yet</h6>
            }
            {
                watchlist.length === 0 && loading &&
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            }
        </>
    );
};

export default Watchlist;