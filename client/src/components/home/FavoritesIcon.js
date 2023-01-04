import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


// const updateWishList = () => {
//   const [wishList, setWishList] = useState([]);

//   useEffect(() => {
//     async function postData() {
//       const response = await fetch('/api/endpoint', {
//         method: 'POST',
//         body: JSON.stringify({
//           data: wishList
//         }),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       const result = await response.json();
//       setWishList(result);
//     }
//     postData();
//   }, [wishList]);

// }

const removeSeriesFromFavorites = (series) => {
  console.log("removing " + JSON.stringify(series) + " from favorites");
}

const addSeriesFromFavorites = (series) => {
  console.log("adding " + JSON.stringify(series) + " to favorites");

}

export default function FavoritesIcon(props) {
  const [fill, setFill] = useState(false);

  const onClick = () => {
    if(fill){
      removeSeriesFromFavorites(props.series);
    } else {
      addSeriesFromFavorites(props.series);
    }
    setFill(!fill);
  }

  return (
    <div onClick={() => onClick()} style={{ cursor: 'pointer' }}>
      <FontAwesomeIcon icon={faHeart} color={fill ? 'red' : 'none'} />
    </div>
  );
}