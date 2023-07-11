import React from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

import {getStorage} from "firebase/storage";
import {ref, uploadBytes, listAll, getDownloadURL, updateMetadata} from 'firebase/storage';
import app  from "../../firebase.js";
import {v4} from 'uuid';

import { useSelector } from "react-redux";

const UploadMany =()=>{

    const[images, setImages] = useState([]);
    const[imageList, setImageList] = useState([]);
    
    const storage = getStorage(app);

    //User id/ogimages/
    const user_id = useSelector(state =>state.userInfo);

    const imageListRef = ref(storage, `${user_id.uid}/ogimages/`)

    const uploadImage = () =>{

        console.log("Trying to upload")
        console.log(images)
        // if(imageUpload == null){
        //     console.log("no images uploaded")
        //     alert("Failed")
        // }
        let imageUploadCount = 0
        for (let image of images){
            const imageRef = ref(storage, `${user_id.uid}/ogimages/${image.name}`)

            uploadBytes(imageRef, image).then((response)=>{
                console.log("Response",response)
                // alert("image uploaded!")
                // setImageUpload(null);
                imageUploadCount += 1
            }).catch((error) => {
                alert("Opps something went wrong!")
                console.log(errorMessage)
                // ..
            });
        }

        if (imageUploadCount == images.length){
            alert("Upload Completed!")
        }

    }

    const handleChange =(e)=>{
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = v4();
            setImages((prevState) => [...prevState, newImage]);
          }
    };

    if(user_id.uid != ''){
        return(
            <>
                <h1>Upload</h1>
                
                <div className="upload-function">
                    {/* This is actually an array, so for now we will do one image at a time */}
                    <input type='file' multiple onChange={handleChange}/>
                    <Button onClick={uploadImage}>Upload Images</Button>
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

export default UploadMany;