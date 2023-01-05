import { MDBCard, MDBCardBody, MDBCardFooter, MDBCardImage } from "mdb-react-ui-kit";
import NoImagePlaceholderSvg from "../../../../svgs/NoImagePlaceholderSvg";
import classes from "./EntityCard.module.css";

const EntityCard = (props) => {
    const { entity, imageSrc, name, description, footer, className = "" } = props;

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
                            <h2 className="fw-bold">{name}</h2>
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