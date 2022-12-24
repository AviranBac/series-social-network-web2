import { useDispatch } from "react-redux";
import { registerThunk } from "../../../features/auth/auth.slice";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";

const Register = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const registerFormRef = useRef();
    const emailInputRef = useRef('');
    const passwordInputRef = useRef('');
    const displayNameInputRef = useRef('');
    const [ error, setError ] = useState();

    useImperativeHandle(ref, () => ({
        resetForm() {
            registerFormRef.current.reset();
        }
    }), []);

    const submitHandler = (event) => {
        event.preventDefault();
        setError(null);

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredDisplayName = displayNameInputRef.current.value;

        dispatch(registerThunk({
            email: enteredEmail,
            password: enteredPassword,
            displayName: enteredDisplayName
        }))
            .unwrap()
            .then(() => props.moveToLogin())
            .catch(setError);
    }

    return (
        <form onSubmit={submitHandler} ref={registerFormRef}>
            <div className="d-flex flex-column align-items-center">
                <h2 className="fw-bold mb-4">Register</h2>

                <MDBInput required className="input" ref={emailInputRef}        wrapperClass='mb-4 w-100' labelClass='text-white' label='Email address'    type='email'    size="lg"/>
                <MDBInput required className="input" ref={passwordInputRef}     wrapperClass='mb-4 w-100' labelClass='text-white' label='Password'         type='password' size="lg" minLength="6" />
                <MDBInput required className="input" ref={displayNameInputRef}  wrapperClass='mb-4 w-100' labelClass='text-white' label='Display name'     type='text'     size="lg"/>

                { error &&
                    <p className="fw-bold text-warning error-message">
                        { error }
                    </p>
                }

                <MDBBtn outline className='mt-2 px-5' color='light' size='lg'>
                    Register
                </MDBBtn>
            </div>
        </form>
    );
});

export default Register;