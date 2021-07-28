import {React, useEffect, useState, useRef, createRef, useMemo} from "react"
import "./workflow.css"
import StepOneInput from "./eachSteps/step1/stepOneInput"
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';
import SpreadSheet from "./spreadSheet";
import Apps from "./testSheet";
import Test from "./testSheet";


export default function WorkFlow() {

    const [numBlock, setNumBlock] = useState(1)
    const [spreadSheetData, setSpreadSheetData] = useState()
    const [grid, setgrid] = useState([[],[]])
    const [currentSheet, setSheet] = useState("")
    const [consoleMsg, setConsoleMsg] = useState({})
    const chilRef =  Array(numBlock).fill(useRef())
    const [Pys, setPys] = useState({})



    var references = {};


    useEffect(()=>{
        console.log(spreadSheetData)
    },[spreadSheetData])

    const callChildRef = () => {
        console.log(chilRef)
    }


    function arrayToGrid(a){
        if(a ==undefined){
            return []
        }
        return a.map((e,i)=>{
          console.log(e)
          return e.map((item, index)=>{
            return {value: item}
        })
      })
    }

    const initialVal = (i) =>{
        if(i === 2) {
            console.log(i.toString())
            console.log(Object.keys(Pys))
            console.log(Object.keys(Pys).includes( i.toString()))
        }
    }


    useEffect(()=>{
        // console.log(Pys)
    },[Object.keys(Pys).length])

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
                <button onClick = {()=>{console.log(arrayToGrid(grid[currentSheet]))}}>s</button>
                <SpreadSheet  passPy = {c => {var obj = Pys; obj[numBlock] = c  ;setPys(obj); setNumBlock(numBlock+1);console.log(c); console.log(numBlock) }} data= {grid} sheet = {currentSheet} />
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
                <button onClick={callChildRef}>
                    sumbit all code
                </button>
                <div style = {{marginBottom:"400px"}}>
                    {Array(numBlock).fill("1").map((e, i)=>{
                        return(
                        <div style={{padding: "10px"}}>
                            <StepOneInput  ref = { chilRef} passData = {c => {setgrid( c)}} id = {i} initial = {Object.keys(Pys).includes(i.toString()) ? Pys[i.toString()] : ""}/> 
                        </div>
                        )

                    })}
                </div>

                    {/* <div>
                        <StepOneInput passData = {c => {setgrid(c)}}/>
                    </div> */}
                {/* <div className = "consoleWrapper">
                    <div className = "consoleHeader">
                        Console
                    </div>
                    <div className ="consoleText">
                        {consoleMsg == 1 ? "success": consoleMsg["msg"]}
                    </div>

                </div>    */}
                {/* <Test data = {arrayToGrid(grid[currentSheet])}/> */}


                </div>


            </div>
        </div>
    )
}

