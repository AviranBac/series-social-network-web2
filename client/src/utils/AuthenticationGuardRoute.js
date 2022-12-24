import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectIsLoggedIn } from "../features/auth/auth.selectors";
import { isNullOrUndefined } from "is-what";

const AuthenticationGuardRoute = (props) => {
    const location = useLocation();

    const shouldBeLoggedIn = isNullOrUndefined(props.shouldBeLoggedIn) ? true : props.shouldBeLoggedIn;
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if (!isLoggedIn) {
        return location.pathname === "/auth" ?
            <Outlet /> :
            <Navigate to="/auth" />;
    }

    return isLoggedIn && shouldBeLoggedIn ?
        <Outlet /> :
        <Navigate to="/" />
}

export default AuthenticationGuardRoute;