import React from "react";
import './index.css'
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";


const Usage = ()=>{

    const user_id = useSelector(state =>state.userInfo);
    console.log("my user id in usage page", user_id)

    const[credits, setCredits] = useState()
    const[usage, setUsage] = useState()
    const [, forceUpdate] = useState(0);
    
    const [selectedOption, setSelectedOption] = useState(0);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const fetchData = async () => {
        try {
            //We will need to change the user id in this call
          const response = await axios.get(`${import.meta.env.VITE_NODE_ENV}/users/${user_id.uid}`);
        //   console.log(response.data);
          setCredits(response.data.credit)
          setUsage(response.data.usage)
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
    };

    const addCredits =(e)=>{
        e.preventDefault();
        console.log(selectedOption, typeof(selectedOption));
        let amount = 0;
        if(selectedOption == ''){
            alert("please select one option")
        } else{
            if(selectedOption=="0"){
                amount = 100
            }
            if(selectedOption=="1"){
                amount = 300
            }
            if(selectedOption=="2"){
                amount = 1000
            }
            //Make the API call to update the credit
            axios({
                method: 'put',
                url: `${import.meta.env.VITE_NODE_ENV}/users/credit/${user_id.uid}/${amount}`,
            }).then((response) => {
                console.log(response);
                fetchData();
            }, (error) => {
                console.log(error);
            });
        }

    }

    useEffect(()=>{
        fetchData();
    },[credits])

    return(
        <>
            <div className="main-usageview">
                <h3> Data Usage and Payments</h3>
                <p>Usage: {usage}</p>
                <p>Avaliable Credits: {credits}</p>
                <div>
                    <h5>Add more credits</h5>
                    <Form>
    
                            <div className="mb-3">
                            <Form.Check
                                label="100 credits = $10"
                                type="radio"
                                id="option1"
                                name="option"
                                value= "0"
                                checked={selectedOption === "0"}
                                onChange={handleOptionChange}
                                
                            />
                            <Form.Check
                                label="300 credits = $25"
                                type="radio"
                                id="option2"
                                name="option"
                                value="1"
                                checked={selectedOption === "1"}
                                onChange={handleOptionChange}
                                
                            />
                            <Form.Check
                                label="1,000 credits = $60"
                                type="radio"
                                id="option3"
                                name="option"
                                value="2"
                                checked={selectedOption === "2"}
                                onChange={handleOptionChange}
                                
                            />
                            </div>
                    </Form>
                
                </div>
                <button className="add-credit-button" onClick={addCredits}>Add Credits</button>
            </div>
        </>
    )

}

export default Usage;