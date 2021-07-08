import {React, useEffect, useState, useRef} from "react"
import "./workflow.css"
import StepOneInput from "./eachSteps/step1/stepOneInput"
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';
import SpreadSheet from "./spreadSheet";


export default function WorkFlow() {

    const [numBlock, setNumBlock] = useState(1)
    const [spreadSheetData, setSpreadSheetData] = useState()
    const [grid, setgrid] = useState([[],[]])
    const [currentSheet, setSheet] = useState("")
    const [consoleMsg, setConsoleMsg] = useState("")
    const chilRef = useRef(null)

    var references = {};

    const getOrCreateRef =(id) =>{
        if (!references.hasOwnProperty(id)) {
            references[id] = React.createRef(null);
        }
        return references[id];
    }
    
    var refArray = []


    useEffect(()=>{
        console.log(spreadSheetData)
    },[spreadSheetData])



    var trys = Object.keys(grid)

    return(
        <div className = "WorkFlowWrapper">
            <div className  = "sheetBar" style={{display:"flex"}}>
                <span>select sheet</span>
                {trys.map((e)=>{
                    return <button className="sheetButton" onClick={(e)=>{setSheet(e.target.value)}} value ={e}>{e}</button>
                })}
            </div>
            <div className = "displayArea">
                <div className = "result">
                   <h1 style= {{paddingTop : "5px", paddingBottom: "5px"}}>Result</h1>
                </div>

                <SpreadSheet data= {grid} sheet = {currentSheet} />
                {/* <ReactDataSheet
                    data={grid}
                    valueRenderer={cell => cell.value}
                    onCellsChanged={changes => {
                    const gridy = grid.map(row => [...row]);
                    changes.forEach(({ cell, row, col, value }) => {
                        gridy[row][col] = { ...gridy[row][col], value };
                    });
                    setgrid({ gridy });
                    }}
                /> */}
            </div>
            <div className = "dividingStick">
               
            </div>
            <div className = "inputArea">
                <button  style={{zIndex:36666}} onClick={()=>{setNumBlock(numBlock+1);console.log(numBlock)}}>click to add code block</button>
                <div className = "userInput">
                {Array.from(numBlock).map((x, index) =>  <div>

                </div>)}
                {/* {Array(numBlock).fill(
                    <StepOneInput passData = {c => {setgrid(c)}} passMsg = {g =>{setConsoleMsg(g)}}/>
                )} */}
                <button onClick={()=>{
                    console.log(refArray[0])
                }}>
                    sumbit all code
                </button>
                {Array(numBlock).fill("1").map((e, i)=>{
                    return(
                    <div style={{padding: "10px"}}>
                        <StepOneInput ref = {(i) =>{refArray[i] = i}}  passData = {c => {setgrid(c)}} passMsg = {g =>{setConsoleMsg(g)}} id = {i}/>
                    </div>
                    )

                })}

                    {/* <div>
                        <StepOneInput passData = {c => {setgrid(c)}}/>
                    </div> */}
                <div className = "consoleWrapper">
                <div className = "consoleHeader">
                    Console
                </div>
                <div className ="consoleText">
                    {consoleMsg == 1 ? "success": consoleMsg}
                </div>

            </div>   



                </div>


            </div>
        </div>
    )
}

