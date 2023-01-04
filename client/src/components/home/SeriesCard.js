import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <div>
        <FontAwesomeIcon icon="fa-solid fa-heart" />
          {/* <a className='btn-floating btn-large waves-effect waves-light red'> */}
            <FontAwesomeIcon icon='heart' size='2x' className='red-text' style={{ position: 'absolute', bottom: 0, left: 0 }} />
          {/* </a> */}
        </div>
        <MDBCardImage src={props.series.poster_path} alt='...' position='top' />
        <MDBCardBody>
          <MDBCardTitle className='text-center'>{props.series.name}</MDBCardTitle>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

