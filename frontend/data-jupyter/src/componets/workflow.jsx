import {React, useEffect, useState} from "react"
import Steps from "./steps"
import "./workflow.css"
import StepOneInput from "./eachSteps/step1/stepOneInput"
import StepOneDisplay from "./eachSteps/step1/stepOneDisplay"
import StepTwoInput from "./eachSteps/step2/stepTwoInput"


export default function WorkFlow() {
    const [step, setStep] = useState(0)
    const [stepOneInputPair, setStepOneInputPair] = useState({name: "", institution: ""}) 
    const [stepOneDisplay, setStepOneDisplay] = useState([])
    const [inputFromStepTwo, setInputFromStepTwo] = useState([])
    const [stepTwoDisplay, setStepTwoDisplay] = useState()


    useEffect(()=>{
        console.log(stepOneInputPair)
    }, [stepOneInputPair])

    useEffect(()=>{
        console.log("this is step one display");
        console.log(stepOneDisplay)
        
    }, [stepOneDisplay])


    useEffect(()=>{
        console.log("workf", inputFromStepTwo);
        console.log(Object.values(stepOneDisplay).map((a,i)=>{return[a,i]}))
        console.log(Object.values(stepOneDisplay).filter((e,index)=>{inputFromStepTwo.includes(index.toString())}))
    },[inputFromStepTwo])



    useEffect(()=>{
        var unique = inputFromStepTwo.filter((v, i, a) => a.indexOf(v) === i)
        console.log(unique)
        setStepTwoDisplay(unique)
        console.log(Object.values(stepOneDisplay)["0"])
    },[inputFromStepTwo])







    const inputNote = {
        1: "Step 1: please provide the name and insitution of the faculty member you interested in, then the result of google search will be presented.",
        2: "Step 2: select the urls(s) that you are interested in."
    }


    return(
        <div className = "WorkFlowWrapper">
            <div className = "displayArea">
                <div className = "result">
                   <h1 style= {{paddingTop : "5px", paddingBottom: "5px"}}>Result</h1>
                </div>
                <Steps 
                changeStep = {
                    s => setStep(s) 
                }
                />
                <div>
                    {step === 1 ? 
                    <StepOneDisplay allUrls = {Object.values(stepOneDisplay)}/>
                    : step === 2 ? <div>
                        {stepTwoDisplay.map(a=>{
                            return <h1> {Object.values(stepOneDisplay)[parseInt(a)]["link"]} </h1>
                        })}
                    </div>
                    : <h1>step3</h1> }
                </div>
            </div>
            <div className = "dividingStick">
               
            </div>
            <div className = "inputArea">
                <div className = "inputNoteWrapper">
                    <h3> {inputNote[step]}</h3>
                </div>
                <div className = "userInput">
                    {step === 1 ? 
                    <StepOneInput name = {stepOneInputPair.name} institution = {stepOneInputPair.institution} changInputOnePair = {s => setStepOneInputPair(s)} displayUrls = { c => setStepOneDisplay(c)} previosDisplay = {stepOneDisplay}/> 
                    : step === 2 ? <div>
                        <StepTwoInput allUrls = {Object.values(stepOneDisplay)} inputChange = {(s)=>{setInputFromStepTwo(s) }   }/>
                    </div>
                    : <h1>step3</h1> }
                </div>


            </div>
        </div>
    )
}

