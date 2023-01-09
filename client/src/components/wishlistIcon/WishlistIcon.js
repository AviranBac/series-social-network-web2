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
    const { relatedUser, series, className } = props;

    const wishlistFillStatus = useSelector((state) => selectSeriesWishlistStatus(state, series._id));

    const updateUserWatchlist = async () => {
        try {
            const { series_ids } = await wishlistService.updateWishlist(series._id, relatedUser.email, wishlistFillStatus ? ActionType.REMOVE : ActionType.ADD);
            dispatch(updateWishlist(series_ids));
        } catch (e) {
            console.log(`Error occurred while update user's wish list: ${e}`);
        }
    };

    return (
        <>
        <OverlayTrigger placement="bottom"
                                overlay={<Tooltip id="tooltip"><b>{!wishlistFillStatus ? "Add to wishlist" : "Remove from wishlist"}</b></Tooltip>}>
                    <FontAwesomeIcon className={className}
                                     icon={faHeart}
                                     color={wishlistFillStatus ? 'red' : 'none'}
                                     cursor="pointer"
                                     onClick={updateUserWatchlist}/>
                </OverlayTrigger>
        </>
    );
}

export default WishlistIcon;