import {
    MDBContainer,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBNavbar,
    MDBNavbarItem,
    MDBNavbarNav,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserDisplayName } from "../../features/auth/auth.selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Navbar.module.css";
import { faCircleUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const userDisplayName = useSelector(selectUserDisplayName);

    const displayNameNavOptions = [
        { link: '#',        icon: faCircleUser,        value: 'Your Profile' },
        { link: '#',        icon: faCircleUser,        value: 'Update Your Details' },
        { link: '/logout',  icon: faRightFromBracket, value: 'Logout' }
    ];

    return (
        <MDBNavbar color="white" bgColor='primary'>
            <MDBContainer fluid className="d-flex">
                <div className="fw-bold">Series Social Network</div>

                <div className={classes.spacer}></div>

                { userDisplayName &&
                    <div>
                        <MDBNavbarNav className="d-flex flex-row">
                            <MDBNavbarItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle tag="a" className={`nav-link fw-bold ${classes.displayNameToggle}`}>
                                        { userDisplayName }
                                    </MDBDropdownToggle>

                                    <MDBDropdownMenu className="dropdown-menu-end">
                                        { displayNameNavOptions.map(option => (
                                                <Link to={option.link} key={option.value}>
                                                    <MDBDropdownItem className="dropdown-item">
                                                        <FontAwesomeIcon icon={option.icon} />
                                                        <span className="ms-3">{option.value}</span>
                                                    </MDBDropdownItem>
                                                </Link>
                                        )) }
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </div>
                }
            </MDBContainer>
        </MDBNavbar>
    );
};

export default Navbar;