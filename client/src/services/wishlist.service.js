import axios from "axios";
import { config } from "../config/config";

const updateWishlist =  (series, user, action) => {
  return axios.post(`${config.serverUrl}/wishlist`, { action: action , email: user.email, seriesId: series._id}).then(response => response.data)
  .catch(error => {
      console.error(`Error while trying to update wishlist details for user ${user}. Error: ${error}`);
      throw error;
  });
}

const wishlistService = {
    updateWishlist
};

export default wishlistService;