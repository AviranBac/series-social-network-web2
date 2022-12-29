import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css';
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { loginThunk } from "../../../features/auth/auth.slice";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";

const Login = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginFormRef = useRef();
    const emailInputRef = useRef('');
    const passwordInputRef = useRef('');
    const [ error, setError ] = useState();

    useImperativeHandle(ref, () => ({
        reset() {
            loginFormRef.current.reset();
            setError(null);
        }
    }), []);

    const submitHandler = (event) => {
        event.preventDefault();
        setError(null);

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        dispatch(loginThunk({
            email: enteredEmail,
            password: enteredPassword
        }))
            .unwrap()
            .then(() => navigate('/'))
            .catch(setError);
    }

    return (
        <form onSubmit={submitHandler} ref={loginFormRef}>
            <div className="d-flex flex-column align-items-center">
                <h2 className="fw-bold mb-2">Login</h2>
                <p className="text-white mb-4">Please enter your email and password!</p>

                <MDBInput required className="input" ref={emailInputRef}     wrapperClass='mb-4 w-100' labelClass='text-white' label='Email address'    type='email'    size="lg"/>
                <MDBInput required className="input" ref={passwordInputRef}  wrapperClass='mb-4 w-100' labelClass='text-white' label='Password'         type='password' size="lg"/>

                { error &&
                    <p className="fw-bold text-warning error-message">
                        { error }
                    </p>
                }

                <MDBBtn outline className='mt-2 px-5' color='light' size='lg'>
                    Login
                </MDBBtn>

                <div className="d-flex mt-4">
                    <p className="mb-0">
                        Don't have an account?
                        <span className={`text-white-50 fw-bold ${classes.signUp}`} onClick={props.moveToRegister}> Sign Up </span>
                    </p>
                </div>
            </div>
        </form>
    );
});

export default Login;