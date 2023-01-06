import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/auth.selectors";
import axios from 'axios';

const removeSeriesFromWishlist = async (series, user) => {
  await axios.post('http://localhost:8080/wishlist', { action: "REMOVE" , email: user.email, seriesId: series._id});
  console.log("removing " + JSON.stringify(series) + " from wishlist");
}

const addSeriesFromWishlist = async(series, user) => {
  await axios.post('http://localhost:8080/wishlist', { action: "ADD", email: user.email, seriesId: series._id });
  console.log("adding " + JSON.stringify(series) + " to wishlist");

}

export default function WishlistIcon(props) {
  const [fill, setFill] = useState(false);
  const user = useSelector(selectUser);

  const clickHandler = () => {
    if(fill){
      removeSeriesFromWishlist(props.series, user);
    } else {
      addSeriesFromWishlist(props.series, user);
    }
    setFill(!fill);
  }

  return (
    <div onClick={() => clickHandler()} style={{ cursor: 'pointer' }}>
      <FontAwesomeIcon icon={faHeart} color={fill ? 'red' : 'none'} />
    </div>
  );
}