import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthenticatedRoute from "./utils/AuthenticatedRoute";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Logout from "./components/logout/Logout";

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/" element={<AuthenticatedRoute />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="*" element={<Navigate to='/' />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;