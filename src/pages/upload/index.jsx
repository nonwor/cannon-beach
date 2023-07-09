import React from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage';
import { storage } from "../../firebase";
import {v4} from 'uuid';

const Upload =()=>{

    const[imageUpload, setImageUpload] = useState(null);
    const[imageList, setImageList] = useState([]);
    
    const imageListRef = ref(storage, "images/")

    const uploadImage = () =>{
        console.log("Trying to upload")
        if(imageUpload == null){
            console.log("no images uploaded")
            alert("Failed")
        }
        console.log("Good to go", imageUpload);
        const imageRef = ref(storage, `images/${imageUpload.name}`)
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
}

export default Upload;