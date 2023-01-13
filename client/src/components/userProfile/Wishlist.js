import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/auth.selectors";
import { ActionType } from "../../enums/ActionType";

import PaginationTable, { seriesColumnDetails }  from '../paginationTable/PaginationTable';
import wishlistService from '../../services/wishlist.service';


const Wishlist = () => {

    return (
        <div>
            wishlist tab
        </div>
    );
};

export default Wishlist;