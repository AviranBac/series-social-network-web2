import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());
        navigate('/login');
    }, [dispatch, navigate]);

    return (
        <></>
    );
};

export default Logout;