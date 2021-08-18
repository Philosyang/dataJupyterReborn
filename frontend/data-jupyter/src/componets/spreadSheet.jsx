import React, {useState, useEffect} from "react"
import TableCell from "./tableCell"
import "./spreadsheet.css"
import { Table } from "@material-ui/core"
import Cell from "./cell"

export default function SpreadSheet(props){
    const [sheetValue, setSheetValue] = useState(emptySheet)
    
    var emptySheet =  Array(1000).fill().map(() => Array(26).fill("")) //Array(200).fill(Array(26).fill(""))
    const header = [...Array(27).keys()]
    const entireSheet = [header].concat(emptySheet)
    
    const[k, setK] = useState(emptySheet)

    const [py, setPy] = useState("")

    var data = props.data
    var sheet = props.sheet

    useEffect(()=>{
        if(props.sheet != "") {
            props.passPy(py)
        }

    },[py])

    useEffect(()=>{
        handle()
    },[JSON.stringify(props.data), JSON.stringify(sheet)])

    for(var i = 0; i < data.length; i++) {
        for(var j = 0; j < data[i].length; j++) {
            emptySheet[i][j] = data[i][j]
        }

    }   

    const handle=()=>{
        if(data != {} ){

            var first = data[sheet]
            if(first != undefined){
                for(var i = 0; i < first.length; i++) {
                    for(var j = 0; j < first[i].length; j++){
                        emptySheet[i][j] = first[i][j]
                    }
                }
                setK(emptySheet)
            }
        }
        

    }

    return(
        <div>

            <div className = "sheets">
                <table>
                    <tr>
                        {header.map((e, i)=>{
                            return <th>{e}</th>
                        })}
                    </tr>
                    {k.map((item, index)=>{
                        item = [index+1].concat(item)
                        return <tr>
                            {item.map((element, is)=>{
                                return <td id = {index+1 + "," + is }>  <Cell  location = {[index+1,is]} sheet = {sheet}  value = {element} sheetName = {sheet} pyChange = {(s)=>{setPy(s)}}/> </td>
                            })}
                        </tr>
                    })}
                    
                </table>
            </div>

        </div>
    )
}