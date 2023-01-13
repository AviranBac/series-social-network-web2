import { MDBCard, MDBCardBody, MDBCardFooter, MDBCardImage } from "mdb-react-ui-kit";
import NoImagePlaceholderSvg from "../../../../svgs/NoImagePlaceholderSvg";
import classes from "./EntityCard.module.css";
import WatchlistIcon from "../../../watchlistIcon/WatchlistIcon";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../features/auth/auth.selectors";

const EntityCard = (props) => {
    const { entity, entityType, imageSrc, name, description, footer, className = "" } = props;
    const user = useSelector(selectUser);

    return (
        <>
            {entity &&
                <MDBCard className={`${className} w-100`}>
                    <MDBCardBody className="d-flex w-100 py-3">
                        <div className="m-auto">
                            { imageSrc ?
                                <MDBCardImage src={imageSrc} alt='entity' /> :
                                <NoImagePlaceholderSvg />
                            }
                        </div>
                        <div className={`${classes.summary} w-75`}>
                            <div className="d-flex my-3">
                                <h2 className={`fw-bold my-0 me-2 ${classes.title}`}>{name}</h2>
                                <WatchlistIcon relatedUser={user}
                                               entity={entity}
                                               entityType={entityType}
                                               className={`my-auto ${classes.icon}`} />
                            </div>
                            <span>{description}</span>
                            <p className={`mt-1 ${classes.overview}`}>{entity.overview}</p>
                        </div>
                    </MDBCardBody>

                    {footer &&
                        <MDBCardFooter className="border-0">{footer}</MDBCardFooter>
                    }
                </MDBCard>
            }
        </>
    );
};

export default EntityCard;