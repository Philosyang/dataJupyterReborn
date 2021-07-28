import {React, useEffect, useState, forwardRef, useImperativeHandle} from "react"
import {TextField, Button} from '@material-ui/core';
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import "./stepOneInput.css"
import ace from "react-ace";



const StepOneInput = forwardRef((props, ref)=>{
    {
        const [aceValue, setAceValue] = useState("")
        const [resultFromPython, setResultFromPython] = useState(["",""])
        const [consoleMsg, setConsoleMsg] = useState({msg:"", status: ""})

    
        useEffect(()=>{
            props.passData(resultFromPython)
        },[resultFromPython])
        
        const handleAceChange = (e) =>{
            setAceValue(e)
        }

        useEffect(()=>{
            setAceValue(props.initial)
        },[])
    
        const handleCodeSubmit = () =>{
            console.log(props.id)
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
                var terminal = response["terminal"]
                setConsoleMsg({msg: "Message from code block " + props.id  +" : "+ "\n"+response["terminal"][0], status: response["terminal"][1]})
                setResultFromPython(result)
            })
        }
        ref.current = handleCodeSubmit;
    
        return(                                                                     
            <div className = "StepOneInputWrapper">
    
                <div className="editorWrapper">
                    <div style={{display:"flex"}}>
                        <button className="submitCode" onClick={handleCodeSubmit}>
                            submit code
                        </button>
                    </div>
                    <div>
                        Code Block : 
                        {" " +props.id}
                    </div>
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
                <div style = {{backgroundColor:"black", maxHeight:"200px", width:"500px", color:"white"}}>
                    {consoleMsg["msg"]}
                </div>
               
                </div>  
            </div>
        )
    }
})


export default StepOneInput;