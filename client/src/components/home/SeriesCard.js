import React from 'react';
import FavoritesIcon from './FavoritesIcon';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCol,
  MDBCardImage
} from 'mdb-react-ui-kit';

export default function SeriesCard(props) {
  return (
    <MDBCol>
      <MDBCard>
        <MDBCardImage src={props.series.poster_path} alt='...' position='top' />
        <MDBCardBody>
          <MDBCardTitle className='text-center'>{props.series.name}</MDBCardTitle>
          <FavoritesIcon series={props.series}/>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

