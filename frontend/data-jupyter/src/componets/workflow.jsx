import {React, useEffect, useState} from "react"
import "./workflow.css"
import StepOneInput from "./eachSteps/step1/stepOneInput"
import StepOneDisplay from "./eachSteps/step1/stepOneDisplay"
import ReactDataSheet from 'react-datasheet';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';
import SpreadSheet from "./spreadSheet";
import sheetSelection from "./sheetSelection";


export default function WorkFlow() {

    const [numBlock, setNumBlock] = useState(1)
    const [spreadSheetData, setSpreadSheetData] = useState()
    const [grid, setgrid] = useState([[],[]])
    const [currentSheet, setSheet] = useState("")
    



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
                {Array(numBlock).fill(                <StepOneInput passData = {c => {setgrid(c)}}/>
)}

                    {/* <div>
                        <StepOneInput passData = {c => {setgrid(c)}}/>
                    </div> */}
                   
                </div>


            </div>
        </div>
    )
}

