import {React, useEffect, useState} from "react"
import "./workflow.css"
import StepOneInput from "./eachSteps/step1/stepOneInput"
import StepOneDisplay from "./eachSteps/step1/stepOneDisplay"
import ReactDataSheet from 'react-datasheet';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';
import SpreadSheet from "./spreadSheet";


export default function WorkFlow() {


    const [spreadSheetData, setSpreadSheetData] = useState()
    const [grid, setgrid] = useState([[],[]])
    



    useEffect(()=>{
        console.log(spreadSheetData)
    },[spreadSheetData])





    return(
        <div className = "WorkFlowWrapper">
            <div className = "displayArea">
                <div className = "result">
                   <h1 style= {{paddingTop : "5px", paddingBottom: "5px"}}>Result</h1>
                </div>

                <SpreadSheet data= {grid}/>
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
                <div className = "userInput">
                    <div>
                        <StepOneInput passData = {c => {setgrid(c)}}/>
                    </div>
                </div>


            </div>
        </div>
    )
}

