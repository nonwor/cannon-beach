import React from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

import {getStorage} from "firebase/storage";
import {ref, uploadBytes, listAll, getDownloadURL, updateMetadata} from 'firebase/storage';
import app  from "../../firebase.js";
import {v4} from 'uuid';

import { useSelector } from "react-redux";
import axios from 'axios'

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
        // const formData = new FormData();
        // formData.append('image', selectedFile);
        

        for (let image of images){
            // we need to make individual axios calls
            const formData = new FormData();
            console.log(image)
            console.log(image.name)
            // // console.log(`${user_id.uid}/ogimages/${image.name}`)
            // formData.append('image', image);
            // formData.append('path', `${user_id.uid}/ogimages/${image.name}`)

            // console.log("trying to make axio call on one image", formData.entries())
            var reader = new FileReader();
            let imageAs64Bit
            reader.onloadend = function() {
                console.log('RESULT', reader.result)
            }
            console.log("Something here",reader.readAsDataURL(image))

            axios({
                method: 'Post',
                url: `${import.meta.env.VITE_NODE_ENV}/uploadimage/${user_id.uid}/ogimages/${image.name}`,
                // data: "a"
              }).then((response) => {
                console.log("res from server",response);
              }, (error) => {
                console.log(error);
              });
        }
    }

    const handleChange =(e)=>{
        setImages([])
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