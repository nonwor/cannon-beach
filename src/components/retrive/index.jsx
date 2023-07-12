import React from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

import {getStorage} from "firebase/storage";
import {ref, uploadBytes, listAll, getDownloadURL, updateMetadata, list} from 'firebase/storage';
import app  from "../../firebase.js";
import {v4} from 'uuid';
import axios from 'axios';

import { useSelector } from "react-redux";

const Retrive =()=>{

    const[imageList, setImageList] = useState([]);
    const[folderList, setFolderList] = useState([]);
    
    const storage = getStorage(app);

    //User id/ogimages/
    const user_id = useSelector(state =>state.userInfo);
    console.log("this should be empty",user_id)

    const imageListRef = ref(storage, `${user_id.uid}`)

    //How to get images from firebasegit p
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

    console.log("folder list",folderList)

    const handleFolder=(item)=>{
        console.log("Hello folder")
        console.log("folder name?", item)
        //Reset display
        setImageList([])
        //Show images in the folder that we clicked on
        const imageListRef = ref(storage, item)
        listAll(imageListRef).then((response)=>{
            console.log("res",response);
            response.items.forEach((item)=>{
                getDownloadURL(item).then((url)=>{
                    setImageList((prev)=>[...prev, url])
                })
            })
        })
    }
    const handleTrain=(item)=>{
        console.log("Do transaction", item)
        let costToTrain = 0;
        const imageListRef = ref(storage, item)
        listAll(imageListRef).then((response)=>{
            console.log(response.items.length)
            costToTrain = response.items.length;
            
            //update usage(+) and credit(-)
            axios({
                method: 'put',
                url: `http://localhost:3000/users/credit/${user_id.uid}/${-costToTrain}`,
            }).then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });

            axios({
                method: 'put',
                url: `http://localhost:3000/users/usage/${user_id.uid}/${+costToTrain}`,
            }).then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });

            
        })
        // console.log("Cost to train:", costToTrain)
    }

    if(user_id.uid != ''){
        return(
            <>
                <h1>Retrive</h1>
                
                <div className="imageBatch">
                    {folderList.map((item)=>{
                        if(item.includes("ogimages")){
                            return (
                                <>  
                                    <button key={v4()} onClick={()=>{handleFolder(item)}} >{item}</button>
                                    <Button variant="primary" className="train-me" onClick={()=>handleTrain(item)}>Train</Button>
                                </>
                            )
                        } else {
                            return(
                                <button key={v4()} onClick={()=>{handleFolder(item)}} >{item}</button>
                            )
                        }

                    })}
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

export default Retrive;