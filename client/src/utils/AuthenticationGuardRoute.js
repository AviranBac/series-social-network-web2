import { useSelector } from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsLoggedIn } from "../features/auth/auth.selectors";

const AuthenticationGuardRoute = (props) => {
    const { shouldBeLoggedIn = true, children } = props;
    const location = useLocation();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if (!isLoggedIn) {
        return location.pathname === "/auth" ?
            children :
            <Navigate to="/auth" />;
    }

    return shouldBeLoggedIn ? children : <Navigate to="/" />;
}

export default AuthenticationGuardRoute;