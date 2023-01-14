import axios from "axios";
import { config } from "../config/config";

const getUserWishlist = async (email) => {
  return axios.get(`${config.serverUrl}/wishlist/${email}`)
    .catch(error => {
      console.error(`Error while trying to get user ${email}'s wishlist, Error: ${error}`);
      throw error;
    });
};

const updateWishlist = async (email, seriesId, action) => {
  return axios.post(`${config.serverUrl}/wishlist`, { action , email, seriesId }).then(response => response.data)
  .catch(error => {
      console.error(`Error while trying to update wishlist details for user ${email}, Error: ${error}`);
      throw error;
    });
}

const wishlistService = {
  updateWishlist,
  getUserWishlist
};

export default wishlistService;
