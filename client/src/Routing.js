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
import UserProfile from "./components/userProfile/UserProfile";

const Routing = () => {
    return (
        <Routes>
            <Route path="/auth"  element={<AuthenticationGuardRoute shouldBeLoggedIn={false}><AuthenticationContainer /></AuthenticationGuardRoute>} />
            <Route path="/" element={<AuthenticationGuardRoute><Home /></AuthenticationGuardRoute>} />
            <Route path="/search/users" element={<AuthenticationGuardRoute><SearchUsers /></AuthenticationGuardRoute>} />
            <Route path="/users/update" element={<AuthenticationGuardRoute><UpdateDetails /></AuthenticationGuardRoute>} />
            <Route path="/statistics" element={<AuthenticationGuardRoute><Statistics /></AuthenticationGuardRoute>} />
            <Route path="/users/:email" element={<AuthenticationGuardRoute><UserProfile /></AuthenticationGuardRoute>} />
            <Route path="/series" element={<AuthenticationGuardRoute><SearchSeries /></AuthenticationGuardRoute>} />
            <Route path="/series/:id" element={<AuthenticationGuardRoute><SeriesDetails /></AuthenticationGuardRoute>} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Navigate to='/' />} />
        </Routes>
    );
};

export default Routing;