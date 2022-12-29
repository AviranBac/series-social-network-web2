import { Navigate, Route, Routes } from "react-router-dom";
import AuthenticationGuardRoute from "./utils/AuthenticationGuardRoute";
import Home from "./components/home/Home";
import Logout from "./components/logout/Logout";
import AuthenticationContainer from "./components/authenticationContainer/AuthenticationContainer";

const Routing = () => {
    return (
        <Routes>
            <Route path="/auth" element={<AuthenticationGuardRoute shouldBeLoggedIn="false" />}>
                <Route path="/auth" element={<AuthenticationContainer />} />
            </Route>
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<AuthenticationGuardRoute />}>
                <Route path="/" element={<Home />} />
            </Route>
            <Route path="*" element={<Navigate to='/' />} />
        </Routes>
    );
};

export default Routing;