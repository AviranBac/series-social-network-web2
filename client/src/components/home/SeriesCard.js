import React from 'react';
import WishlistIcon from '../wishlistIcon/WishlistIcon';
import NoImagePlaceholderSvg from "../../svgs/NoImagePlaceholderSvg";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol } from 'mdb-react-ui-kit';
import WatchlistIcon from "../watchlistIcon/WatchlistIcon";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../../features/auth/auth.selectors";
import { EntityType } from "../../enums/EntityType";
import { Link } from "react-router-dom";

const SeriesCard = (props) => {
  const { series } = props;
  const currentUserEmail = useSelector(selectUserEmail);

  return (
    <MDBCol>
      <Link to={`/series/${series._id}`} key={series._id}>
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
              <WishlistIcon className="m-auto" series={series} relatedEmail={currentUserEmail} size="sm" />
              <WatchlistIcon className="m-auto"
                             relatedEmail={currentUserEmail}
                             entity={series}
                             entityType={EntityType.SERIES}
                             size="sm" />
            </div>
          </MDBCardBody>
        </MDBCard>
      </Link>
    </MDBCol>
  );
}

export default SeriesCard;