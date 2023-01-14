import Routing from "./Routing";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectUserEmail } from "./features/auth/auth.selectors";
import { useEffect } from "react";
import { loadWishlistThunk } from "./features/wishlist/wishlist.slice";
import { loadWatchlistThunk } from "./features/watchlist/watchlist.slice";

const App = () => {
    const email = useSelector(selectUserEmail, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        if (email) {
            dispatch(loadWishlistThunk(email));
            dispatch(loadWatchlistThunk(email));
        }
    }, [email, dispatch]);
    return (
        <BrowserRouter>
            <Navbar/>
            <Routing/>
        </BrowserRouter>
    );
}

export default App;