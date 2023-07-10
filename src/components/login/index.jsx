import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,onAuthStateChanged,signOut, signInWithEmailAndPassword} from "firebase/auth";
import app from '../../firebase';
import {useState} from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {authinfo} from '../../slice/authuserSlice.js'

const Login = ()=>{

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
          }).catch((error) => {
            // An error happened.
          });
    }

    return(
        <>
            <div>
                <h3>Sign In!</h3>
                <Form className="signin-form">
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    Email
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="email" placeholder="Email" onChange={(event)=>{setCurrEmail(event.target.value)}}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                    Password
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="password" placeholder="Password" onChange={(event)=>{setCurrPassword(event.target.value)}}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 1 }}>
                    <Button onClick={handleSignin}>Sign In!</Button>
                    </Col>
                </Form.Group>

                </Form>
            </div>
            <div>
                <h3>Sign Up!</h3>
                <Form>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    Email
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="email" placeholder="Email" onChange={(event)=>{setEmail(event.target.value)}}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                    Password
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="password" placeholder="Password" onChange={(event)=>{setPassword(event.target.value)}}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 1 }}>
                    <Button onClick={handleSignUp}>Sign Up!</Button>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 1 }}>
                    <Button onClick={handleStateCheck}>Check State</Button>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 1 }}>
                    <Button onClick={handleSignOut}>Sign Out</Button>
                    </Col>
                </Form.Group>
                </Form>
            </div>
        </>
    )
}

export default Login;