import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Nav, NavItem } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faCircleUser, faHome, faTv } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Sidebar = ({ visibility, setVisibility }) => {
    const displaySidebarOptions = [
        { link: '/', icon: faHome, value: 'Home' },
        { link: '/series', icon: faTv, value: 'Search Series' },
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
                    <Nav className="justify-content-end flex-grow-1 pe-3" fill variant="tabs">
                        {
                            displaySidebarOptions.map(option => (
                                <NavItem key={option.link}>
                                    <Link to={option.link} onClick={setVisibility} className="text-black nav-link" style={{ textAlign: "left" }}>
                                        <FontAwesomeIcon icon={option.icon} />
                                        <span className="ms-3">{option.value}</span>
                                    </Link>
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
