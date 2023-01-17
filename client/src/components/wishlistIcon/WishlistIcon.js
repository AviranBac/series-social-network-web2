import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import wishlistService from "../../services/wishlist.service";
import { ActionType } from "../../enums/ActionType";
import { useDispatch, useSelector } from "react-redux";
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { updateWishlist } from "../../features/wishlist/wishlist.slice";
import { selectIsSeriesInWishlist } from "../../features/wishlist/wishlist.selectors"
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const WishlistIcon = (props) => {
    const dispatch = useDispatch();
    const { relatedEmail, series, className, disableClick = false, size = "md", explicitIsInWishlist } = props;
    const [loading, setLoading] = useState(false);

    const loggedInUserWishlistFillStatus = useSelector((state) => selectIsSeriesInWishlist(state, series._id));
    const wishlistFillStatus = explicitIsInWishlist || loggedInUserWishlistFillStatus;

    const getHeartIcon = () => {
        return wishlistFillStatus ? faSolidHeart : faRegularHeart;
    };

    const updateUserWishlist = async (event) => {
        event.stopPropagation();
        event.preventDefault();

        try {
            setLoading(true);
            const { series_ids } = await wishlistService.updateWishlist(relatedEmail, series._id, wishlistFillStatus ? ActionType.REMOVE : ActionType.ADD);
            dispatch(updateWishlist(series_ids));
            setLoading(false);
        } catch (e) {
            console.log(`Error occurred while update user's wish list: ${e}`);
        }
    };

    return (
        <>
            { loading && <Spinner size={size} className={className} animation="border" variant="primary"/> }
            { !loading &&
                <OverlayTrigger placement="bottom"
                                overlay={<Tooltip id="tooltip"><b>{!wishlistFillStatus ? "Add to wishlist" : "Remove from wishlist"}</b></Tooltip>}>
                    <FontAwesomeIcon className={`${className} ${disableClick ? " pe-none" : ""}`}
                                     icon={getHeartIcon()}
                                     color={disableClick ? 'gray' : 'red'}
                                     cursor="pointer"
                                     onClick={updateUserWishlist} />
                </OverlayTrigger>
            }
        </>
    );
}

export default WishlistIcon;