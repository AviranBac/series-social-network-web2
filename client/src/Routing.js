import { Navigate, Route, Routes } from "react-router-dom";
import AuthenticationGuardRoute from "./utils/AuthenticationGuardRoute";
import Home from "./components/home/Home";
import Logout from "./components/logout/Logout";
import AuthenticationContainer from "./components/authenticationContainer/AuthenticationContainer";
import SeriesDetails from "./components/seriesDetails/SeriesDetails";
import SearchSeries from "./components/searchSeries/SearchSeries";
import SearchUsers from "./components/searchUsers/SearchUsers"
import Statistics from "./components/statistics/Statistics"
import UpdateDetails from "./components/updateDetails/UpdateDetails";
import Followers from "./components/userProfile/Followers";
import Followings from "./components/userProfile/Followings";
import Watchlist from "./components/userProfile/watchlist/Watchlist";

const Routing = () => {
    return (
        <Routes>
            <Route path="/auth" element={<AuthenticationGuardRoute shouldBeLoggedIn="false" />}>
                <Route path="/auth" element={<AuthenticationContainer />} />
            </Route>
            <Route path="/search/users" element={<AuthenticationGuardRoute />}>
                <Route path="/search/users" element={<SearchUsers />} />
            </Route>
            <Route path="/users/update" element={<AuthenticationGuardRoute />}>
                <Route path="/users/update" element={<UpdateDetails />} />
            </Route>
            <Route path="/logout" element={<Logout />} />
            <Route path="/statistics" element={<AuthenticationGuardRoute />}>
                <Route path="/statistics" element={<Statistics />} />
            </Route>
            <Route path="/user/:email/watchlist" element={<AuthenticationGuardRoute />}>
                <Route path="/user/:email/watchlist" element={<Watchlist />} />
            </Route>
            <Route path="/user/:email/followers" element={<AuthenticationGuardRoute />}>
                <Route path="/user/:email/followers" element={<Followers />} />
            </Route>
            <Route path="/user/:email/followings" element={<AuthenticationGuardRoute />}>
                <Route path="/user/:email/followings" element={<Followings />} />
            </Route>
            <Route path="/" element={<AuthenticationGuardRoute />}>
                <Route path="/" element={<Home />} />
            </Route>
            <Route path="/series" element={<AuthenticationGuardRoute />}>
                <Route path="/series" element={<SearchSeries />} />
            </Route>
            <Route path="/series/:id" element={<AuthenticationGuardRoute />}>
                <Route path="/series/:id" element={<SeriesDetails />} />
            </Route>
            <Route path="*" element={<Navigate to='/' />} />
        </Routes>
    );
};

export default Routing;