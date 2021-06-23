import {React, useEffect, useState} from "react"
import "./workflow.css"
import StepOneInput from "./eachSteps/step1/stepOneInput"
import StepOneDisplay from "./eachSteps/step1/stepOneDisplay"




export default function WorkFlow() {


    const [spreadSheetData, setSpreadSheetData] = useState()





    useEffect(()=>{
        console.log(spreadSheetData)
    },[spreadSheetData])





    return(
        <div className = "WorkFlowWrapper">
            <div className = "displayArea">
                <div className = "result">
                   <h1 style= {{paddingTop : "5px", paddingBottom: "5px"}}>Result</h1>
                </div>

                <StepOneDisplay data = {spreadSheetData}/>
            </div>
            <div className = "dividingStick">
               
            </div>
            <div className = "inputArea">
                <div className = "userInput">
                    <div>
                        <StepOneInput passData = {c => {setSpreadSheetData(c)}}/>
                    </div>
                </div>


            </div>
        </div>
    )
}

