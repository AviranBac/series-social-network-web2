import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/auth.selectors";
import wishlistService from "../../services/wishlist.service";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./WishlistIcon.css";

const WishlistIcon = (props) => {
    const { series, className } = props;
    const [fill, setFill] = useState(false);
    const user = useSelector(selectUser);

    const clickHandler = () => {
        const action = fill ? "REMOVE" : "ADD";

        wishlistService.updateWishlist(series, user, action)
            .then(() => setFill(!fill))
            .catch(console.error)
    }

    return (
        <OverlayTrigger placement="bottom"
                        overlay={<Tooltip id="tooltip"><b>{fill ? "Remove from wishlist" : "Add to wishlist"}</b></Tooltip>}>
            <FontAwesomeIcon className={className}
                             icon={faHeart}
                             color={fill ? 'red' : 'none'}
                             cursor="pointer"
                             onClick={clickHandler}/>
        </OverlayTrigger>
    );
}

export default WishlistIcon;