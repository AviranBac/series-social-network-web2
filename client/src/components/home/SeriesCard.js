import React from 'react';
import WishlistIcon from './WishlistIcon';
import NoImagePlaceholderSvg from "../../svgs/NoImagePlaceholderSvg";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCol,
  MDBCardImage
} from 'mdb-react-ui-kit';

export default function SeriesCard(props) {
  const { series } = props

  return (
    <MDBCol>
      <MDBCard> 
        <MDBCardImage src={series.poster_path} alt='...' position='top' />
        <MDBCardBody>
          <MDBCardTitle className='text-center'>{series.name}</MDBCardTitle>
          <WishlistIcon series={series}/>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

