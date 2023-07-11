import React from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

import {getStorage} from "firebase/storage";
import {ref, uploadBytes, listAll, getDownloadURL, updateMetadata, list} from 'firebase/storage';
import app  from "../../firebase.js";
import {v4} from 'uuid';

import { useSelector } from "react-redux";

const Retrive =()=>{

    const[imageList, setImageList] = useState([]);
    const[folderList, setFolderList] = useState([]);
    
    const storage = getStorage(app);

    //User id/ogimages/
    const user_id = useSelector(state =>state.userInfo);
    // console.log(user_id)

    const imageListRef = ref(storage, `${user_id.uid}`)

    //How to get images from firebase
    useEffect(()=>{
        list(imageListRef).then((response)=>{
            setFolderList([]);
            console.log("file location?",response.prefixes);
            for(let i of response.prefixes){
                console.log(i._location.path_)
                setFolderList(folderList=>[...folderList, i._location.path_]);
            }
            // console.log(folderList)
            // response.prefixs.map((item)=>{
            //     console.log(item)
            // })
        })
    }, [])

    console.log(folderList)

    if(user_id.uid != ''){
        return(
            <>
                <h1>Retrive</h1>
                
                <div className="imageBatch">
                    {folderList.map((item)=>{
                        return <button key={v4()} onclick >{item}</button>
                    })}
                    <Button variant="primary">Train</Button>
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

export default Retrive;