import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Nav, NavItem } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faHome, faTv, faChartBar } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ visibility, setVisibility }) => {
    const displaySidebarOptions = [
        { link: '/', icon: faHome, value: 'Home' },
        { link: '#action2', icon: faTv, value: 'Search Series' },
        { link: '#action3', icon: faCircleUser, value: 'Search User' },
        { link: '#action4', icon: faChartBar, value: 'statistics' },

    ];

    return (
        <>
            <Offcanvas show={visibility} onHide={setVisibility} style={{ width: "300px" }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Series Social Network</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3" fill variant="tabs" defaultActiveKey="/home">
                        {
                            displaySidebarOptions.map(option => (
                                <NavItem class="nav-item">
                                    <Nav.Link className="my-navbar" style={{ color: 'black', 'text-align': 'left' }} href={option.link} onClick={setVisibility}>
                                        <FontAwesomeIcon icon={option.icon} />
                                        <span className="ms-3">{option.value}</span>
                                    </Nav.Link>
                                </NavItem>
                            ))
                        }
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};
export default Sidebar;