import { config } from "../config/config";
import { axiosInstance } from "../utils/AxiosInstance";

const getUserWishlist = async (email) => {
  return axiosInstance.get(`${config.serverUrl}/wishlist/${email}`)
      .catch(error => {
          console.error(`Error while trying to get user ${email}'s wishlist, Error: ${error}`);
          throw error;
      });
};

const updateWishlist = async (seriesId, email, action) => {
  return axiosInstance.post(`${config.serverUrl}/wishlist`, { action, email, seriesId }).then(response => response.data)
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
