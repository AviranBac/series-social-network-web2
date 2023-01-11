import { Navigate, Route, Routes } from "react-router-dom";
import AuthenticationGuardRoute from "./utils/AuthenticationGuardRoute";
import Home from "./components/home/Home";
import Logout from "./components/logout/Logout";
import AuthenticationContainer from "./components/authenticationContainer/AuthenticationContainer";
import SeriesDetails from "./components/seriesDetails/SeriesDetails";
import Statistics from "./components/statistics/Statistics"
import UpdateDetails from "./components/updateDetails/UpdateDetails";

const Routing = () => {
    return (
        <Routes>
            <Route path="/auth" element={<AuthenticationGuardRoute shouldBeLoggedIn="false" />}>
                <Route path="/auth" element={<AuthenticationContainer />} />
            </Route>
            <Route path="/users/update" element={<AuthenticationGuardRoute />}>
                <Route path="/users/update" element={<UpdateDetails />} />
            </Route>
            <Route path="/logout" element={<Logout />} />
            <Route path="/statistics" element={<AuthenticationGuardRoute />}>
                <Route path="/statistics" element={<Statistics />} />
            </Route>
            <Route path="/" element={<AuthenticationGuardRoute />}>
                <Route path="/" element={<Home />} />
            </Route>
            <Route path="/series/:id" element={<AuthenticationGuardRoute />}>
                <Route path="/series/:id" element={<SeriesDetails />} />
            </Route>
            <Route path="*" element={<Navigate to='/' />} />
        </Routes>
    );
};

export default Routing;