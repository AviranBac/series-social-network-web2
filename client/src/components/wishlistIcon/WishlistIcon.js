import { useState } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import wishlistService from "../../services/wishlist.service";
import { ActionType } from "../../enums/ActionType";
import { useDispatch, useSelector } from "react-redux";
import { updateWishlist } from "../../features/wishlist/wishlist.slice";
import { selectSeriesWishlistStatus } from "../../features/wishlist/wishlist.selectors"

const WishlistIcon = (props) => {
    const { relatedUser, series } = props;
    const dispatch = useDispatch();

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
        <div onClick={() => updateUserWatchlist()} style={{ cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faHeart} color={wishlistFillStatus ? 'red' : 'none'} />
        </div>
    );
}

export default WishlistIcon;