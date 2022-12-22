import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/auth.selectors";
import { Link } from "react-router-dom";

const Home = () => {
    const user = useSelector(selectUser);

    return (
        <>
            <span>{JSON.stringify(user)}</span>
            <Link to="/logout">Logout</Link>
        </>
    );
};

export default Home;