import React from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

import {getStorage} from "firebase/storage";
import {ref, uploadBytes, listAll, getDownloadURL, updateMetadata} from 'firebase/storage';
import app  from "../../firebase.js";
import {v4} from 'uuid';

import { useSelector } from "react-redux";

const Upload =()=>{

    const[imageUpload, setImageUpload] = useState(null);
    const[imageList, setImageList] = useState([]);
    
    const storage = getStorage(app);

    //User id/ogimages/
    const user_id = useSelector(state =>state.userInfo);
    console.log(user_id)

    const imageListRef = ref(storage, `${user_id.uid}/ogimages/`)

    const uploadImage = () =>{

        // updateMetadata(imageListRef,metadata )
        //     .then((metadata) => {
        //         // Updated metadata for 'images/forest.jpg' is returned in the Promise
        //     }).catch((error) => {
        //         // Uh-oh, an error occurred!
        //     });

        console.log("Trying to upload")
        if(imageUpload == null){
            console.log("no images uploaded")
            alert("Failed")
        }
        console.log("Good to go", imageUpload);
        console.log(`${user_id.uid}/ogimages/${imageUpload.name}`)
        const imageRef = ref(storage, `${user_id.uid}/ogimages/${imageUpload.name}`)
        uploadBytes(imageRef, imageUpload).then((response)=>{
            console.log("Response",response)
            alert("image uploaded!")
            setImageUpload(null);
        })
    }

    //How to get images from firebase
    useEffect(()=>{
        listAll(imageListRef).then((response)=>{
            console.log(response);
            response.items.forEach((item)=>{
                getDownloadURL(item).then((url)=>{
                    setImageList((prev)=>[...prev,url])
                })
            })
        })
    }, [])

    if(user_id.uid != ''){
        return(
            <>
                <h1>Upload</h1>
                
                <div className="upload-function">
                    {/* This is actually an array, so for now we will do one image at a time */}
                    <input type='file' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
                    <Button onClick={uploadImage}>Upload Image</Button>
                </div>
                {imageList.map((url)=>{
                    return <img src={url}/>
                })}
    
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