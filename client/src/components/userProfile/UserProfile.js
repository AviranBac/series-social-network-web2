import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/auth.selectors";
import { Tab, Tabs } from 'react-bootstrap';
import Followers from "./Followers";
import Followings from './Followings';
import Wishlist from './Wishlist';

const UserProfile = () => {
    const user = useSelector(selectUser);

    return (
        <>
            <h2 className="mt-4 text-primary text-center fw-bold text-decoration-underline">{user.email}</h2>
            <Tabs
                defaultActiveKey="Wishlist"
                className="mb-3"
                justify
            >
                <Tab eventKey="Wishlist" title="Wishlist">
                    <Wishlist/>
                </Tab> 
                <Tab eventKey="Watchlist" title="Watchlist">
                </Tab>
                <Tab eventKey="Following" title="Following">
                    <Followings />
                </Tab>
                <Tab eventKey="Followers" title="Followers">
                    <Followers />
                </Tab>
            </Tabs>
        </>
    );
};

export default UserProfile;