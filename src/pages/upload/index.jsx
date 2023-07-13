import React from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

// import {getStorage} from "firebase/storage";
// import {ref, uploadBytes, listAll, getDownloadURL, updateMetadata} from 'firebase/storage';
// import app  from "../../firebase.js";
import {v4} from 'uuid';
import UploadMany from "../../components/uploadmultiple/index.jsx";

import { useSelector } from "react-redux";
import './index.css'

const Upload =()=>{

    //User id/ogimages/
    const user_id = useSelector(state =>state.userInfo);
    console.log(user_id)


    if(user_id.uid != ''){
        return(
            <>
                <div className="main-uploadiew">
                    <UploadMany/>
                </div>
              
            </>
        )
    } else {
        return(
            <>
            <h4>You need to be logged in to make this happen</h4>
            </>
        )
    }
}

export default Upload;