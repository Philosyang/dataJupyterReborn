import {React, useEffect, useState} from "react"
import {TextField, Button} from '@material-ui/core';
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import "./stepOneInput.css"
import ace from "react-ace";



export default function StepOneInput(props) {
    const [name, setName] = useState(props.name)
    const [institution, setInstitution] = useState(props.institution)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [displayUrls, setDisplayUrls] = useState(props.previosDisplay)
    const [url, setUrl] = useState("http://127.0.0.1:5000/aba");
    const [dis, setDis] = useState({name: "", ins: ""})
    const [pythonText, setPythonText] = useState("")
    const [aceValue, setAceValue] = useState("")
    const [resultFromPython, setResultFromPython] = useState([])





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



    useEffect(()=>{
        props.passData(resultFromPython)
    },[resultFromPython])


    const handleAceChange = (e) =>{
        setAceValue(e)
    }

    const handleCodeSubmit = () =>{
        console.log(aceValue)
        var data = {text:aceValue}
        fetch("/aceValue", {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            var results =  response.json()
            return results
        }).then((response)=>{
            var result = response["result"]
              
            setResultFromPython(result)
        })
    }

    return(                                                                     
        <div className = "StepOneInputWrapper">

            <div className="editorWrapper">
            <AceEditor
                placeholder="Python code here"
                mode="python"
                theme="monokai"
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={aceValue}
                onChange = {handleAceChange}
                setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 4,
                }}/>
                <button className="submitCode" onClick={handleCodeSubmit}>
                    submit code
                </button>
           
            </div>
            

        </div>
    )
}