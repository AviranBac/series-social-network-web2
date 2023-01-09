import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/auth/auth.selectors";
import { MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useRef, useState } from "react";
import { updateThunk } from "../../features/auth/auth.slice";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import classes from "./updateDetails.module.css";

const MySwal = withReactContent(Swal);

const UpdateDetails = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const formRef = useRef();
    const passwordInputRef = useRef('');
    const displayNameInputRef = useRef(user.displayName);
    const [loading, setLoading] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);

        const enteredPassword = passwordInputRef.current.value;
        const enteredDisplayName = displayNameInputRef.current.value;

        const swalCommonOptions = {
            width: "fit-content",
            confirmButtonColor: "#3b71ca"
        };

        dispatch(updateThunk({
            idToken: user.idToken,
            password: enteredPassword ? enteredPassword : undefined,
            displayName: enteredDisplayName
        }))
            .unwrap()
            .then(async () => await MySwal.fire({
                ...swalCommonOptions,
                title: "Your details have been updated!",
                icon: "success"
            }))
            .catch(async (error) => await MySwal.fire({
                ...swalCommonOptions,
                title: error,
                icon: "error"
            }))
            .finally(() => setLoading(false));
    }

    return (
        <MDBRow className="m-5">
            <MDBCard className={`bg-primary text-white m-auto ${classes.card}`}>
                <MDBCardBody>
                    <form onSubmit={submitHandler} ref={formRef}>
                        <div className="d-flex flex-column align-items-center">
                            <h2 className="fw-bold mb-2">Update Your Details</h2>
                            <p className="text-white mb-4">Your email: {user.email}</p>
                            <MDBInput className="input" ref={passwordInputRef} wrapperClass='mb-4 w-100'
                                      labelClass='text-white' label='Password (not required)' type='password'
                                      size="lg"/>
                            <MDBInput required className="input" defaultValue={displayNameInputRef.current}
                                      ref={displayNameInputRef} wrapperClass='mb-4 w-100' labelClass='text-white'
                                      label='Display Name' type='text' size="lg"/>

                            <MDBBtn outline className='mt-2 px-5' color='light' size='lg' disabled={loading}>
                                Update Details
                            </MDBBtn>
                        </div>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </MDBRow>
    );
};

export default UpdateDetails;