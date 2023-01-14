import { useEffect, useState } from "react";
import { Tab, Tabs, Button } from 'react-bootstrap';
import Followers from "./Followers";
import Followings from './Followings';
import Wishlist from './Wishlist';
import Watchlist from './watchlist/Watchlist';
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../../features/auth/auth.selectors";
import followService from "../../services/follows.service";
import { ActionType } from "../../enums/ActionType";
import classes from "./Wishlist.module.css";

const UserProfile = () => {
    const { email } = useParams();
    const [isFollowing, setIsFollowing] = useState(false);

    const currentUserEmail = useSelector(selectUserEmail);
    const isLoggedInUser = email === currentUserEmail;

    useEffect(() => {
        async function fetchData() {
            const isCurrentUserFollowing = await followService.isFollowing(currentUserEmail, email);
            setIsFollowing(!!isCurrentUserFollowing);
        }
        if (!isLoggedInUser) fetchData();
    }, [email]);

    const updateFollow = () => {
        followService.updateFollow(isFollowing ? ActionType.REMOVE : ActionType.ADD, currentUserEmail, email)
        .then(() => setIsFollowing(!isFollowing));
    };

    return (
        <>
            <div className={classes.followButton}>
                <h2 className="mt-4 text-primary text-center fw-bold text-decoration-underline">{email}</h2>
                {
                    !isLoggedInUser && 
                    <Button onClick={updateFollow}>
                        <FontAwesomeIcon icon={faUserPlus}/>
                        <span style={{flex: 5}}>
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </span>
                    </Button>
                }
                
            </div>
            <Tabs
                defaultActiveKey="Wishlist"
                className="mb-3"
                justify
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