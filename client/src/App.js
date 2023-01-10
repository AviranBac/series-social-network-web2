import Routing from "./Routing";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/auth/auth.selectors";
import { useEffect } from "react";
import { loadWishlistThunk } from "./features/wishlist/wishlist.slice";
import { loadWatchlistThunk } from "./features/watchlist/watchlist.slice";

const App = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(loadWishlistThunk(user.email));
            dispatch(loadWatchlistThunk(user.email));
        }
    }, [user, dispatch]);
    return (
        <BrowserRouter>
            <Navbar/>
            <Routing/>
        </BrowserRouter>
    );
}

export default App;