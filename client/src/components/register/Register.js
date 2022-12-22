import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerThunk } from "../../features/auth/auth.slice";
import classes from "../login/Login.module.css";
import { useRef } from "react";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const emailInputRef = useRef('');
    const passwordInputRef = useRef('');
    const displayNameInputRef = useRef('');

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredDisplayName = displayNameInputRef.current.value;

        dispatch(registerThunk({
            email: enteredEmail,
            password: enteredPassword,
            displayName: enteredDisplayName
        }))
            .unwrap()
            .then(() => navigate('/login'))
            .catch(console.error);
    }

    return (
        <section className={classes.auth}>
            <h1>Register</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required ref={passwordInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='displayName'>Your Display Name</label>
                    <input type='text' id='displayName' required ref={displayNameInputRef} />
                </div>
                <div className={classes.actions}>
                    <button>Register</button>
                </div>
            </form>
        </section>
    );
};

export default Register;