import {React, useEffect, useState, forwardRef, useImperativeHandle} from "react"
import {TextField, Button} from '@material-ui/core';
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import "./stepOneInput.css"
import ace from "react-ace";



const StepOneInput = forwardRef((props, ref)=>{
    {
        const [name, setName] = useState(props.name)
        const [pythonText, setPythonText] = useState("")
        const [aceValue, setAceValue] = useState("")
        const [resultFromPython, setResultFromPython] = useState([])
        const [consoleMsg, setConsoleMsg] = useState("")

        useImperativeHandle(ref, ()=>({
            refF(){
                handleCodeSubmit();
            }
        }))
    
        useEffect(()=>{
            props.passData(resultFromPython)
            props.passMsg(consoleMsg)
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
                var terminal = response["terminal"]
                console.log(terminal)
                setConsoleMsg("Message from code block " + props.id  +" : "+ "\n"+response["terminal"])
                console.log(consoleMsg)
                setResultFromPython(result)
            })
        }
        const refFunc = handleCodeSubmit;

        ref.current = refFunc != null ? refFunc : "";
    
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
    
               
                </div>  
            </div>
        )
    }
})


export default StepOneInput;