import './AuthenticationContainer.css';
import { useRef, useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsPane
} from "mdb-react-ui-kit";
import Login from "./login/Login";
import Register from "./register/Register";

const AuthenticationContainer = () => {
    const [ isLoginTab, setIsLoginTab ] = useState(true);
    const loginRef = useRef();
    const registerRef = useRef();

    const justifyClickHandler = (updatedIsLoginTab) => {
        if (isLoginTab !== updatedIsLoginTab) {
            setIsLoginTab(updatedIsLoginTab);

            const resetRef = isLoginTab ? loginRef : registerRef;
            resetRef.current.reset();
        }
    };

    return (
        <MDBContainer fluid>
            <MDBRow className='d-flex m-5'>
                <MDBCol col='12'>
                    <MDBCard className={`bg-primary text-white m-auto auth-container-card`}>
                        <MDBTabs pills justify>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => justifyClickHandler(true)} active={isLoginTab}>
                                    Login
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => justifyClickHandler(false)} active={!isLoginTab}>
                                    Register
                                </MDBTabsLink>
                            </MDBTabsItem>
                        </MDBTabs>

                        <MDBTabsContent>
                            <MDBTabsPane show={isLoginTab}>
                                <MDBCardBody className="auth-container-card-body">
                                    <Login ref={loginRef} moveToRegister={() => justifyClickHandler(false)} />
                                </MDBCardBody>
                            </MDBTabsPane>
                            <MDBTabsPane show={!isLoginTab}>
                                <MDBCardBody className="auth-container-card-body">
                                    <Register ref={registerRef} moveToLogin={() => justifyClickHandler(true)} />
                                </MDBCardBody>
                            </MDBTabsPane>
                        </MDBTabsContent>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default AuthenticationContainer;