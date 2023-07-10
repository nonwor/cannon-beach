import React from "react";

import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";

const NavigateBar = () =>{

    const user_status = useSelector(state =>state.userInfo);

    const handleLogoutAction =()=>{
        console.log(user_status)
    }

    return(
        <>
            <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to="/home">BluewaterMLabs</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/upload">Upload Images</Nav.Link>
                            <Nav.Link as={Link} to="/analysis">Data Analysis</Nav.Link>
                        </Nav>
                        
                        <Nav className='logged-in-view'>
                            
                            <NavDropdown title="Profile" id="basic-nav-dropdown" className="ml-auto">
                                <NavDropdown.Item as={Link} to='/userprofile'> Settings </NavDropdown.Item>
                                
                                <NavDropdown.Item href="#action/3.2"> Data </NavDropdown.Item>
                                
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogoutAction}>
                                    Log Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
        </>
    )
}

export default NavigateBar