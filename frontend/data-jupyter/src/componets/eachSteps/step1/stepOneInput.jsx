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


    const handleKeyDown = (e) =>{
        if (e.keyCode === 9) {
            e.preventDefault()
            setPythonText(pythonText.concat("    ")) 
        }
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
                <textarea onKeyDown = {handleKeyDown} value ={pythonText} spellCheck = "false" name="python" id="" cols="50" rows="20" onChange={(e)=>{setPythonText(e.target.value); console.log(pythonText)}}></textarea>
            </div>
            <div className = "submitButton">
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