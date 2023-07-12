import React, { useEffect } from "react";
import { getAuth,createUserWithEmailAndPassword,onAuthStateChanged,signOut, signInWithEmailAndPassword} from "firebase/auth";
import app from '../../firebase';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import {authinfo, clearUserInfo} from '../../slice/authuserSlice.js';
import axios from 'axios';

const NavigateBar = () =>{
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const user_status = useSelector(state =>state.userInfo);
    let LoggedIn = false

    const auth = getAuth(app)

    const handleLogoutAction =()=>{
        axios({
            method: 'get',
            url: `${import.meta.env.VITE_NODE_ENV}/logout`,
          }).then((response) => {
            console.log(response);
            dispatch(clearUserInfo());
            navigate('/home')
          }, (error) => {
            console.log(error);
          });
    }
    const handleStateCheck = async()=>{
        try {
            //We will need to change the user id in this call
          const response = await axios.get(`${import.meta.env.VITE_NODE_ENV}/checkuser`);
          console.log("yes we have a user!",response.data);
        //   setCredits(response.data.credit)
        //   setUsage(response.data.usage)
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
    }

    useEffect(()=>{
        handleStateCheck()
        // onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //       // User is signed in, see docs for a list of available properties
        //       // https://firebase.google.com/docs/reference/js/auth.user
        //       const uid = user.uid;
        //       console.log("Yes we have a user here!", uid)
        //       dispatch(authinfo(user.uid));
        //       // ...
        //     } else {
        //       // User is signed out
        //       console.log("active user not found!")
        //       // ...
        //     }
        //   });
        // axios({
        // method: 'post',
        // url: `${import.meta.env.VITE_NODE_ENV}/login`,
        // data: {
        //     email: currEmail,
        //     password: currPassword,
        // }
        // }).then((response) => {
        // console.log(response);
        // dispatch(authinfo(response.data));
        // navigate('/upload')

        // }, (error) => {
        // console.log(error);
        // });
    },[])
   

    if(user_status.uid){
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
                                    <NavDropdown.Item as={Link} to='/profile'> Profile </NavDropdown.Item>
                                    
                                    <NavDropdown.Item as={Link} to='/usage'> Data/Usage </NavDropdown.Item>
                                    
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
    } else {
        return(
            <>
                <Navbar bg="light" expand="lg">
                        <Container>
                            <Navbar.Brand as={Link} to="/home">BluewaterMLabs</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {/* <Nav.Link as={Link} to="/upload">Upload Images</Nav.Link>
                                <Nav.Link as={Link} to="/analysis">Data Analysis</Nav.Link> */}
                            </Nav>
                            
                            <Nav className='logged-in-view'>
                            <Nav.Link as={Link} to="/loginsignup">Log In/Sign Up</Nav.Link> 
                                {/* <NavDropdown title="Profile" id="basic-nav-dropdown" className="ml-auto">
                                    <NavDropdown.Item as={Link} to='/userprofile'> Settings </NavDropdown.Item>
                                    
                                    <NavDropdown.Item href="#action/3.2"> Data </NavDropdown.Item>
                                    
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogoutAction}>
                                        Log Out
                                    </NavDropdown.Item>
                                </NavDropdown> */}
                            </Nav>
                        </Navbar.Collapse>
                        </Container>
                    </Navbar>
            </>
        )
    }
    
}

export default NavigateBar