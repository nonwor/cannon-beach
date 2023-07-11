import React from "react";
import './index.css'
import { Form } from "react-bootstrap";
import { useState } from "react";

const Usage = ()=>{

    const[credits, setCredits] = useState()
    const[checkButton, setCheckButton] = useState()
    
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const addCredits =(e)=>{
        e.preventDefault();
        console.log(selectedOption);
        if(selectedOption == ''){
            alert("please select one option")
        }
    }

    return(
        <>
            <div className="main-usageview">
                <h3> Data Usage and Payments</h3>
                <p>Usage: ...</p>
                <p>Avaliable Credits: ...</p>
                <div>
                    <h5>Add more credits</h5>
                    <Form>
    
                            <div className="mb-3">
                            <Form.Check
                                label="100 credits = $10"
                                type="radio"
                                id="option1"
                                name="option"
                                value="option1"
                                checked={selectedOption === 'option1'}
                                onChange={handleOptionChange}
                                
                            />
                            <Form.Check
                                label="300 credits = $25"
                                type="radio"
                                id="option2"
                                name="option"
                                value="option2"
                                checked={selectedOption === 'option2'}
                                onChange={handleOptionChange}
                                
                            />
                            <Form.Check
                                label="1,000 credits = $60"
                                type="radio"
                                id="option3"
                                name="option"
                                value="option3"
                                checked={selectedOption === 'option3'}
                                onChange={handleOptionChange}
                                
                            />
                           
                            </div>
                            <button onClick={addCredits}>Add Credits</button>
                    </Form>
                </div>
            </div>
        </>
    )

}

export default Usage;