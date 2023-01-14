import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import wishlistService from "../../services/wishlist.service";
import { ActionType } from "../../enums/ActionType";
import { useDispatch, useSelector } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { updateWishlist } from "../../features/wishlist/wishlist.slice";
import { selectSeriesWishlistStatus } from "../../features/wishlist/wishlist.selectors"
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";

const WishlistIcon = (props) => {
    const dispatch = useDispatch();
    const { relatedEmail, series, className, disableClick = false, explicitIsInWishlist } = props;

    const loggedInUserWishlistStatus = useSelector((state) => selectSeriesWishlistStatus(state, series._id));
    const wishlistFillStatus = explicitIsInWishlist || loggedInUserWishlistStatus;
    
    const getHeartIcon = () => {
        return wishlistFillStatus ? faSolidHeart : faRegularHeart;
    };

    const updateUserWishlist = async (event) => {
        event.stopPropagation();
        event.preventDefault();

        try {
            const { series_ids } = await wishlistService.updateWishlist(relatedEmail, series._id, wishlistFillStatus ? ActionType.REMOVE : ActionType.ADD);
            dispatch(updateWishlist(series_ids));
        } catch (e) {
            console.log(`Error occurred while update user's wish list: ${e}`);
        }
    };

    return (
        <>
            <OverlayTrigger placement="bottom"
                overlay={<Tooltip id="tooltip"><b>{!wishlistFillStatus ? "Add to wishlist" : "Remove from wishlist"}</b></Tooltip>}>
                <FontAwesomeIcon className={`${className} ${disableClick ? " pe-none" : ""}`}
                    icon={getHeartIcon()}
                    color={disableClick ? 'gray' : 'red'}
                    cursor="pointer"
                    onClick={updateUserWishlist} />
            </OverlayTrigger>
        </>
    );
}

export default WishlistIcon;