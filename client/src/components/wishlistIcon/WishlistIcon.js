import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import wishlistService from "../../services/wishlist.service";
import { ActionType } from "../../enums/ActionType";
import { useDispatch, useSelector } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { updateWishlist } from "../../features/wishlist/wishlist.slice";
import { selectSeriesWishlistStatus } from "../../features/wishlist/wishlist.selectors"

const WishlistIcon = (props) => {
    const dispatch = useDispatch();
    const { relatedUser, series, className, disableClick = false } = props;

    const wishlistFillStatus = useSelector((state) => selectSeriesWishlistStatus(state, series._id));
    
    const classes= `${className} ${disableClick ? " pe-none" : ""}`;

    const updateUserWishlist = async (event) => {
        event.stopPropagation();
        event.preventDefault();

        try {
            const { series_ids } = await wishlistService.updateWishlist(relatedUser.email, series._id, wishlistFillStatus ? ActionType.REMOVE : ActionType.ADD);
            dispatch(updateWishlist(series_ids));
        } catch (e) {
            console.log(`Error occurred while update user's wish list: ${e}`);
        }
    };

    return (
        <>
            <OverlayTrigger placement="bottom"
                overlay={<Tooltip id="tooltip"><b>{!wishlistFillStatus ? "Add to wishlist" : "Remove from wishlist"}</b></Tooltip>}>
                <FontAwesomeIcon className={classes}
                    icon={faHeart}
                    color={wishlistFillStatus ? 'red' : 'none'}
                    cursor="pointer"
                    onClick={updateUserWishlist} />
            </OverlayTrigger>
        </>
    );
}

export default WishlistIcon;