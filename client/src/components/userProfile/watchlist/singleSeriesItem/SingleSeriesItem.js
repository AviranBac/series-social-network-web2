import NoImagePlaceholderSvg from "../../../../svgs/NoImagePlaceholderSvg";
import classes from "./SingleSeriesItem.module.css";
import { Link } from "react-router-dom";
import WatchlistIcon from "../../../watchlistIcon/WatchlistIcon";
import { EntityType } from "../../../../enums/EntityType";
import { MDBAccordionItem, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { WatchlistStatus } from "../../../../enums/WatchlistStatus";
import { Fragment } from "react";

const SingleSeriesHeader = ({ series, email, isLoggedInUser, onWatchlistChange }) => {
    return (
        <div className="d-flex">
            {series.poster_path ?
                <img src={series.poster_path} alt="series"/> :
                <NoImagePlaceholderSvg/>
            }
            <div className="d-flex flex-column m-auto p-2">
                <div className={`d-flex gap-2 ${classes.seriesTitle}`}>
                    <Link to={`/series/${series._id}`} className="fw-bold text-decoration-underline fs-3">
                        {series.name}
                    </Link>
                    <WatchlistIcon relatedEmail={email}
                                   entity={series}
                                   entityType={EntityType.SERIES}
                                   disableClick={!isLoggedInUser}
                                   className="m-auto"
                                   explicitWatchlistStatus={series.watchlistStatus}
                                   onWatchlistChange={onWatchlistChange}
                    />
                </div>

                <span>
                    Number of seasons: {series.number_of_seasons} |
                    Number of episodes: {series.number_of_episodes} |
                    Status: {series.status} |&nbsp;
                    { series.genres.map(genre => genre.name).join(", ") }
                </span>
                <p className={`mt-2 ${classes.overview}`}>
                    { series.overview }
                </p>
            </div>
        </div>
    );
};

const SingleSeriesBody = ({ series, email, isLoggedInUser, onWatchlistChange }) => {
    return (
        <MDBCard>
            { series.seasons.map(season => (
                <Fragment key={season._id}>
                    <MDBCardBody>
                        <div className="d-flex gap-3 ">
                            {season.poster_path ?
                                <img src={season.poster_path} alt="season"/> :
                                <NoImagePlaceholderSvg/>
                            }
                            <div className="d-flex flex-column my-auto">
                                <div className="d-flex gap-2">
                                    <span>{season.name}</span>
                                    <WatchlistIcon relatedEmail={email}
                                                   entity={season}
                                                   entityType={EntityType.SEASON}
                                                   disableClick={!isLoggedInUser}
                                                   className="mt-1"
                                                   explicitWatchlistStatus={season.watchlistStatus}
                                                   onWatchlistChange={onWatchlistChange}
                                    />
                                </div>
                                <span>Number of watched episodes: {season.episodes.length}</span>
                                <p className={`mt-2 ${classes.overview}`}>
                                    { series.overview }
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            { season.episodes.map(episode => (
                                <div className="d-flex mx-4 my-2 gap-2" key={episode._id}>
                                    <WatchlistIcon relatedEmail={email}
                                                   entity={episode}
                                                   entityType={EntityType.EPISODE}
                                                   disableClick={!isLoggedInUser}
                                                   className="mt-1"
                                                   explicitWatchlistStatus={WatchlistStatus.COMPLETE}
                                                   onWatchlistChange={onWatchlistChange}
                                    />
                                    <span>Episode {episode.episode_number}: {episode.name}</span>
                                </div>
                            )) }
                        </div>
                    </MDBCardBody>
                </Fragment>
            ))}
        </MDBCard>
    );
};

const SingleSeriesItem = ({ series, email, isLoggedInUser, onWatchlistChange }) => {
    return (
        <MDBAccordionItem className={classes.accordionItem}
                          btnClassName={classes.accordionBtn}
                          collapseId={series._id}
                          headerTitle={<SingleSeriesHeader email={email}
                                                           series={series}
                                                           isLoggedInUser={isLoggedInUser}
                                                           onWatchlistChange={onWatchlistChange} />} >
            <SingleSeriesBody email={email}
                              series={series}
                              isLoggedInUser={isLoggedInUser}
                              onWatchlistChange={onWatchlistChange} />
        </MDBAccordionItem>
    );
};

export default SingleSeriesItem;