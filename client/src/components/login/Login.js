import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css';
import { useRef } from "react";
import { loginThunk } from "../../features/auth/auth.slice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const emailInputRef = useRef('');
    const passwordInputRef = useRef('');

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        dispatch(loginThunk({
            email: enteredEmail,
            password: enteredPassword
        }))
            .unwrap()
            .then(() => navigate('/'))
            .catch(console.error);
    }

    return (
        <section className={classes.auth}>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required ref={passwordInputRef} />
                </div>
                <div className={classes.actions}>
                    <button>Login</button>
                </div>
            </form>
        </section>
    );
}

export default Login;