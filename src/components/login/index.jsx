import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,onAuthStateChanged,signOut, signInWithEmailAndPassword} from "firebase/auth";
import app from '../../firebase';
import {useState} from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {authinfo,clearUserInfo} from '../../slice/authuserSlice.js'
import { Link, Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import './index.css'

import axios from 'axios';

const Login = ()=>{
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const[currEmail, setCurrEmail] = useState('');
    const[currPassword, setCurrPassword] = useState('');
    // console.log(email)
    const auth = getAuth(app)

    const handleSignin=()=>{

        signInWithEmailAndPassword(auth, currEmail, currPassword)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("signin successful")
            console.log(user.uid, typeof(user.uid));
            dispatch(authinfo(user.uid));
            navigate('/upload')
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    const handleSignUp =()=>{
        console.log(email)
        console.log(password)

        // Use firebase to make a new user
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("new user id", user.uid)

                // This is when we initialized the mongo db with credits
                axios({
                    method: 'post',
                    url: 'http://localhost:3000/users',
                    data: {
                        id: user.uid,
                        credit: 100,
                        usage: 0
                    }
                  }).then((response) => {
                    console.log(response);
                  }, (error) => {
                    console.log(error);
                  });;

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                // ..
            });
    }

    const handleStateCheck = ()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const uid = user.uid;
              console.log("Yes we have a user here!", uid)
              // ...
            } else {
              // User is signed out
              console.log("active user not found!")
              // ...
            }
          });
    }

    const handleSignOut = () =>{
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("successful logout")
            dispatch(clearUserInfo())

          }).catch((error) => {
            // An error happened.
          });
    }

    return(
        <>
            <div className="signin-div">
                <h4>Welcome Back!</h4>
                <Form className="signin-form">
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    Email
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control className="inputfield" type="email" placeholder="Email" onChange={(event)=>{setCurrEmail(event.target.value)}}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                    Password
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control className="inputfield" type="password" placeholder="Password" onChange={(event)=>{setCurrPassword(event.target.value)}}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    
                    <Button onClick={handleSignin} className="signin-bnt">Sign In</Button>
                    
                </Form.Group>

                </Form>
            </div>

            <div className="signup-div">
                <h4>New to BlueWater? Sign Up Here </h4>
                <Form>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    Email
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control className="inputfield" type="email" placeholder="Email" onChange={(event)=>{setEmail(event.target.value)}}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                    Password
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control className="inputfield" type="password" placeholder="Password" onChange={(event)=>{setPassword(event.target.value)}}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    
                    <Button className="signin-bnt" onClick={handleSignUp}>Sign Up!</Button>
                    
                </Form.Group>

                {/* <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 1 }}>
                    <Button onClick={handleStateCheck}>Check State</Button>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 1 }}>
                    <Button onClick={handleSignOut}>Sign Out</Button>
                    </Col>
                </Form.Group> */}
                </Form>
            </div>
        </>
    )
}

export default Login;