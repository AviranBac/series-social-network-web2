import { Fragment, useEffect, useState } from "react";
import { MDBCard, MDBCardBody, MDBCardImage, MDBContainer } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faStar, faTv, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserEmail } from "../../features/auth/auth.selectors";
import NoImagePlaceholderSvg from "../../svgs/NoImagePlaceholderSvg";
import WishlistIcon from "../wishlistIcon/WishlistIcon";
import wishlistService from '../../services/wishlist.service';
import classes from "./Wishlist.module.css";
import { selectWishlistSeriesIds } from "../../features/wishlist/wishlist.selectors";

const Wishlist = ({ email }) => {
    const [wishlist, setWishlist] = useState([]);
    const currentUserEmail = useSelector(selectUserEmail);
    const wishlistSeriesIds = useSelector(selectWishlistSeriesIds);

    const detailsMetadata = [
        [{
            icon: faCalendar,
            label: "First air date",
            valueFn: (series) => series.first_air_date && new Date(series.first_air_date).toLocaleDateString()
        }],
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

    useEffect(() => {
        async function fetchData() {
            const wishlist = await wishlistService.getUserWishlist(email);
            setWishlist(wishlist.data);
        }
        fetchData();
    }, [email, wishlistSeriesIds]);

    return (
        <>
            {
                wishlist.length > 0 && wishlist.map((series) => (
                    <MDBContainer className="my-3" style={{width: "70%"}} key={series._id}>
                        <MDBCard className="w-100">
                            <MDBCardBody className="d-flex w-100 py-3">
                                <div className="m-auto">
                                    {series.poster_path ?
                                        <MDBCardImage src={series.poster_path} /> :
                                        <NoImagePlaceholderSvg />
                                    }
                                </div>
                                <div className={`${classes.summary} w-75`}>
                                    <div className="d-flex my-2">
                                        <Link to={`/series/${series._id}`} className="fw-bold text-decoration-underline fs-3 me-2">
                                            {series.name}
                                        </Link>
                                        <WishlistIcon relatedEmail={email}
                                                      series={series}
                                                      className="my-auto"
                                                      disableClick={currentUserEmail !== email}
                                                      explicitIsInWishlist={true} />
                                    </div>
                                    <div className={`m-auto ${classes.details}`}>
                                        <div className="d-flex flex-column">
                                            <div className={`d-flex w-100 mb-2 ${classes.overview}`}>
                                                <span>{series.overview}</span>
                                            </div>
                                            {detailsMetadata.map((rowMetadata, index) => (
                                                <div className="d-flex w-100" key={index}>
                                                    {rowMetadata.map(({ icon, label, valueFn }, index) => (
                                                        <Fragment key={index}>
                                                            <FontAwesomeIcon icon={icon} key={`icon ${index}`} />
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
                            </MDBCardBody>
                        </MDBCard>
                    </MDBContainer>
                ))
            }

            {
                wishlist.length === 0 && <h6 className="text-center border-white mt-4">This user does not have a wishlist yet</h6>
            }
        </>
    );
};

export default Wishlist;