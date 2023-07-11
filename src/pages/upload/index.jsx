import React from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

import {getStorage} from "firebase/storage";
import {ref, uploadBytes, listAll, getDownloadURL, updateMetadata} from 'firebase/storage';
import app  from "../../firebase.js";
import {v4} from 'uuid';
import UploadMany from "../../components/uploadmultiple/index.jsx";

import { useSelector } from "react-redux";

const Upload =()=>{

    const[imageUpload, setImageUpload] = useState(null);
    const[imageList, setImageList] = useState([]);
    
    const storage = getStorage(app);

    //User id/ogimages/
    const user_id = useSelector(state =>state.userInfo);
    console.log(user_id)


    if(user_id.uid != ''){
        return(
            <>
               <UploadMany/>
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