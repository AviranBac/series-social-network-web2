import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { Button, Spinner, Tab, Tabs } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import Followers from "./Followers";
import Followings from './Followings';
import Wishlist from './Wishlist';
import Watchlist from './watchlist/Watchlist';
import { selectUserEmail } from "../../features/auth/auth.selectors";
import followService from "../../services/follows.service";
import { ActionType } from "../../enums/ActionType";
import classes from "./Wishlist.module.css";

const UserProfile = () => {
    const { email } = useParams();
    const [isFollowing, setIsFollowing] = useState();
    const currentUserEmail = useSelector(selectUserEmail);
    const [updateFollowLoading, setUpdateFollowLoading] = useState(false);
    const isLoggedInUser = email === currentUserEmail;

    useEffect(() => {
        async function fetchData() {
            const isCurrentUserFollowing = await followService.isFollowing(currentUserEmail, email);
            setIsFollowing(!!isCurrentUserFollowing);
        }

        setIsFollowing(undefined);
        if (!isLoggedInUser) fetchData();
    }, [email]);

    const updateFollow = () => {
        setUpdateFollowLoading(true);
        followService.updateFollow(isFollowing ? ActionType.REMOVE : ActionType.ADD, currentUserEmail, email)
            .then(() => setIsFollowing(!isFollowing))
            .finally(() => setUpdateFollowLoading(false));
    };

    return (
        <>
            <div className="text-center">
                <h2 className="mt-4 text-primary text-center fw-bold text-decoration-underline">{email}</h2>
                {
                    !isLoggedInUser && isFollowing !== undefined &&
                    <>
                        { updateFollowLoading && <div className="text-center"><Spinner animation="border" variant="primary"/></div> }
                        {
                            !updateFollowLoading &&
                            <Button onClick={updateFollow} variant={isFollowing ? 'outline-primary' : 'primary'}>
                                <div className={`m-auto ${classes.details}`}>
                                    <div className="d-flex flex-column">
                                        <div className="d-flex w-100">
                                            <Fragment>
                                                <FontAwesomeIcon icon={faUserPlus}/>
                                                <span className={classes.flex1}>
                                            {isFollowing ? 'Unfollow' : 'Follow'}
                                        </span>
                                            </Fragment>
                                        </div>
                                    </div>
                                </div>
                            </Button>
                        }
                    </>

                }
            </div>
            <Tabs
                defaultActiveKey="Wishlist"
                className="mb-3"
                justify
                unmountOnExit
            >
                <Tab eventKey="Wishlist" title="Wishlist">
                    <Wishlist email={email}/>
                </Tab>
                <Tab eventKey="Watchlist" title="Watchlist">
                    <Watchlist email={email}/>
                </Tab>
                <Tab eventKey="Following" title="Following">
                    <Followings email={email}/>
                </Tab>
                <Tab eventKey="Followers" title="Followers">
                    <Followers email={email}/>
                </Tab>
            </Tabs>
        </>
    );
};

export default UserProfile;