import React from 'react';
import WishlistIcon from '../wishlistIcon/WishlistIcon';
import NoImagePlaceholderSvg from "../../svgs/NoImagePlaceholderSvg";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCol,
  MDBCardImage
} from 'mdb-react-ui-kit';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/auth.selectors";

export default function SeriesCard(props) {
  const { series } = props;
  const currentUser = useSelector(selectUser);

  return (
    <MDBCol>
      <MDBCard>
        <div className="m-auto">
            {series.poster_path ?
              <MDBCardImage src={series.poster_path} alt='...' position='top' /> :
              <NoImagePlaceholderSvg/>
            }
        </div>
        <MDBCardBody>
          <MDBCardTitle className='text-center'>{series.name}</MDBCardTitle>
          <WishlistIcon relatedUser={currentUser} series={series}/>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

