import React from 'react';
import WishlistIcon from '../wishlistIcon/WishlistIcon';
import NoImagePlaceholderSvg from "../../svgs/NoImagePlaceholderSvg";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol } from 'mdb-react-ui-kit';

const SeriesCard = (props) => {
  const { series } = props

  return (
    <MDBCol>
      <MDBCard className="h-100">
        <div className="m-auto">
            {series.poster_path ?
              <MDBCardImage src={series.poster_path} alt='...' position='top' /> :
              <NoImagePlaceholderSvg/>
            }
        </div>
        <MDBCardBody className="p-0">
          <MDBCardTitle className='text-center py-3'>{series.name}</MDBCardTitle>
          <div className="d-flex w-100 pb-2 mb-3">
            <WishlistIcon series={series} className="m-auto" />
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

export default SeriesCard;