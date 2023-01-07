import React from 'react';
import WishlistIcon from './WishlistIcon';
import NoImagePlaceholderSvg from "../../svgs/NoImagePlaceholderSvg";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol } from 'mdb-react-ui-kit';
import WatchlistIcon from "../watchlistIcon/WatchlistIcon";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/auth.selectors";
import { EntityType } from "../../enums/EntityType";

export default function SeriesCard(props) {
    const { series } = props;
    const currentUser = useSelector(selectUser);

    return (
        <MDBCol>
            <MDBCard>
                <div className="m-auto">
                    {series.poster_path ?
                        <MDBCardImage src={series.poster_path} alt='...' position='top'/> :
                        <NoImagePlaceholderSvg/>
                    }
                </div>
                <MDBCardBody>
                    <MDBCardTitle className='text-center'>{series.name}</MDBCardTitle>
                    <WishlistIcon series={series}/>
                    <WatchlistIcon relatedUser={currentUser}
                                   entity={series}
                                   entityType={EntityType.SERIES}/>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    );
}

