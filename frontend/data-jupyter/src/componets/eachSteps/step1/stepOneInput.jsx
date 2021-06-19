import {React, useEffect, useState} from "react"
import {TextField, Button} from '@material-ui/core';
import "./stepOneInput.css"



export default function StepOneInput(props) {
    const [name, setName] = useState(props.name)
    const [institution, setInstitution] = useState(props.institution)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [displayUrls, setDisplayUrls] = useState(props.previosDisplay)
    const [url, setUrl] = useState("http://127.0.0.1:5000/aba");
    const [dis, setDis] = useState({name: "", ins: ""})
    const [pythonText, setPythonText] = useState("")



    useEffect(
        ()=>{props.changInputOnePair({name, institution}); console.log("submitted, sent steponeinput state to workflow",{name, institution})
        setDis({name: name, ins: institution})
    }
    , [isSubmitted])

    useEffect(
        ()=>{props.displayUrls(displayUrls)}
    ,[displayUrls])

    useEffect(()=>{
        setDis({name: name, ins: institution})
    }, [])

    const handleSubmitText =()=>{

        var data = {text:pythonText}

        fetch("/pythonText", {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }



    const handleStepOneSubmit = () =>{

        setIsSubmitted(true)
        setDis({name: name, ins: institution})
        var data = {name: {name}, institution: {institution}}
        console.log(data)
        fetch("/aba", {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response)=>{
            var res = response.json()
            console.log(res)
            return res
        }).then((urls)=>{
            console.log(urls["urls"]);
            setDisplayUrls(urls["urls"])
            //()=>{props.displayUrls(urls["urls"])}
        })
    }

    return(
        <div className = "StepOneInputWrapper">
            <div className = "inputBoxesWrapper">
                <TextField style={{paddingRight: "30px"}} id="filled-basic" label="Name" variant="filled" onChange = {(e) =>{setName(e.target.value)}}/>
                <TextField id="filled-basic" label="Instituion" variant="filled" onChange = {(e) =>{setInstitution(e.target.value)}}/>
                <textarea name="python" id="" cols="30" rows="10" onClick={(e)=>{setPythonText(e.target.value)}}></textarea>
            </div>
            <div className = "submitButton">
                <Button color = "primary" variant="contained" onClick={handleStepOneSubmit}>Submit</Button>
                <button onClick = {handleSubmitText}>submit text</button>
            </div>
            {
                dis["name"] === "" ? (
                    <h1></h1>
                ) : (
                    <div className = "lastSearch">
                        <h1>Last search : {dis["name"]} , {dis["ins"]}</h1>
                    </div>
                )
            }

        </div>
    )
}