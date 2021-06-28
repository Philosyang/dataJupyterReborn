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
        resultFromPython.forEach((item)=>{
            console.log(item)
        })
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
            var out = []
            for (let i = 0; i < result.length; i++) {
                out[i] = []
                for (let j = 0; j < result[i].length; j++) {
                    out[i][j] = { value: result[i][j] }
                }
            }
              
            setResultFromPython(out)
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
            <div>
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
                <button onClick={handleCodeSubmit}>
                    submit code
                </button>
           
            </div>
            

        </div>
    )
}