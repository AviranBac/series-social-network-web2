import { Tab, Tabs } from 'react-bootstrap';
import Followers from "./Followers";
import Followings from './Followings';
import Wishlist from './Wishlist';
import Watchlist from './watchlist/Watchlist';
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const { email } = useParams();

    return (
        <>
            <h2 className="mt-4 text-primary text-center fw-bold text-decoration-underline">{email}</h2>
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