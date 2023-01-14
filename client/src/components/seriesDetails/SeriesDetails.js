import { Fragment, useEffect, useState } from "react";
import seriesService from "../../services/series.service";
import { useNavigate, useParams } from "react-router-dom";
import NoImagePlaceholderSvg from "../../svgs/NoImagePlaceholderSvg";
import classes from "./SeriesDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faList, faStar, faTv, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import SeasonDetails from "./seasonDetails/SeasonDetails";
import { HttpStatusCode } from "axios";
import WatchlistIcon from "../watchlistIcon/WatchlistIcon";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../../features/auth/auth.selectors";
import { EntityType } from "../../enums/EntityType";
import WishlistIcon from "../wishlistIcon/WishlistIcon";

const SeriesDetails = () => {
    const { id: seriesId } = useParams();
    const [series, setSeries] = useState();
    const [seasonOptions, setSeasonOptions] = useState([]);
    const [selectedSeasonOption, setSelectedSeasonOption] = useState(null);
    const email = useSelector(selectUserEmail);
    const navigate = useNavigate();

    useEffect(() => {
        seriesService.loadSeriesDetails(seriesId)
            .then((series) => {
                setSeries(series);

                if (series.seasons.length > 0) {
                    setSelectedSeasonOption({ label: series.seasons[0].name, value: series.seasons[0]._id });
                    setSeasonOptions(series.seasons.map(season => (
                        { value: season._id, label: season.name }
                    )));
                }
            })
            .catch(err => {
                if (err.response.status === HttpStatusCode.NotFound) {
                    navigate('/');
                }
            })
    }, [seriesId, navigate]);

    const detailsMetadata = [
        [{
            icon: faCalendar,
            label: "First air date",
            valueFn: (series) => series.first_air_date && new Date(series.first_air_date).toLocaleDateString()
        }],
        [{ icon: faList, label: "Genres", valueFn: (series) => series.genres.map(genre => genre.name).join(', ') }],
        [{ icon: faVideoCamera, label: "Status", valueFn: (series) => series.status }],
        [
            { icon: faTv, label: "Number of seasons", valueFn: (series) => series.number_of_seasons },
            { icon: faTv, label: "Number of episodes", valueFn: (series) => series.number_of_episodes }
        ],
        [
            { icon: faStar, label: "Popularity", valueFn: (series) => series.popularity },
            {
                icon: faStar,
                label: "Rating",
                valueFn: (series) => `${series.vote_average} (${series.vote_count} votes)`
            }
        ]
    ];

    const getCurrentSeason = () => {
        return series.seasons.find(season => season._id === selectedSeasonOption.value);
    };

    return (
        <>
            {!!series &&
                <div className={`m-auto p-3 ${classes.container}`}>
                    <div className="m-auto d-flex justify-content-center gap-3">
                        <h2 className={`text-center text-primary fw-bold text-decoration-underline my-0 ${classes.title}`}>{series.name}</h2>
                        <WatchlistIcon relatedEmail={email}
                                       entity={series}
                                       entityType={EntityType.SERIES}
                                       className={`my-auto ${classes.icon}`} />
                        <WishlistIcon relatedEmail={email}
                                      series={series}
                                      className={`my-auto ${classes.icon}`} />
                    </div>
                    <div className="m-3 d-flex">
                        <div className="m-auto">
                            {series.poster_path ?
                                <img src={series.poster_path} alt="series"/> :
                                <NoImagePlaceholderSvg/>
                            }
                        </div>
                        <div className={`m-auto ${classes.details}`}>
                            <div className="d-flex flex-column">
                                <div className={`d-flex w-100 ${classes.overview}`}>
                                    <span>{series.overview}</span>
                                </div>
                                {detailsMetadata.map((rowMetadata, index) => (
                                    <div className="d-flex w-100" key={index}>
                                        {rowMetadata.map(({ icon, label, valueFn }, index) => (
                                            <Fragment key={index}>
                                                <FontAwesomeIcon icon={icon} key={`icon ${index}`}/>
                                                <span className={classes.flex1} key={index}>
                                                    {label}:
                                                    <span className="fw-bold mx-1" key={index}>{valueFn(series)}</span>
                                                </span>
                                            </Fragment>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {selectedSeasonOption &&
                        <>
                            <div className="mt-5 mb-4 d-flex">
                                <Select options={seasonOptions}
                                        value={selectedSeasonOption}
                                        onChange={setSelectedSeasonOption}
                                        classNames={{
                                            menuList: () => classes.selectMenuList
                                        }}
                                        styles={{
                                            container: (styles) => ({ ...styles, width: "15%" }),
                                            option: (styles) => ({ ...styles, cursor: "pointer" }),
                                            control: (styles) => ({ ...styles, cursor: "pointer" })
                                        }}
                                />
                            </div>

                            <SeasonDetails season={getCurrentSeason()}/>
                        </>
                    }
                </div>
            }
        </>
    );
};

export default SeriesDetails;