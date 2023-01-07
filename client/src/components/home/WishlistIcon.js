import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/auth.selectors";
import wishlistService from "../../services/wishlist.service";
import { ActionType } from "../../enums/ActionType";

export default function WishlistIcon(props) {
    const [fill, setFill] = useState(false);
    const user = useSelector(selectUser);

    const clickHandler = () => {
        if (fill) {
            wishlistService.updateWishlist(props.series, user, ActionType.REMOVE)
                .then(setFill(!fill))
                .catch(console.error)
        } else {
            wishlistService.updateWishlist(props.series, user, ActionType.ADD)
                .then(setFill(!fill))
                .catch(console.error)
        }
    }

    return (
        <div onClick={() => clickHandler()} style={{ cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faHeart} color={fill ? 'red' : 'none'}/>
        </div>
    );
}