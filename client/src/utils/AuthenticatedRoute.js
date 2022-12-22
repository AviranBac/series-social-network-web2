import { useSelector } from "react-redux";
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsLoggedIn } from "../features/auth/auth.selectors";

const AuthenticatedRoute = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return isLoggedIn ? <Outlet/> : <Navigate to="/login" />;
}

export default AuthenticatedRoute;