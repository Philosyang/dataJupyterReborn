import React, {useState, useEffect} from "react"
import "./spreadsheet.css"

export default function SpreadSheet(props){
    const [sheetValue, setSheetValue] = useState(emptySheet)
    
    var emptySheet =  Array(200).fill().map(() => Array(26).fill("")) //Array(200).fill(Array(26).fill(""))
    const header = [...Array(27).keys()]
    const entireSheet = [header].concat(emptySheet)
    
    const[k, setK] = useState(emptySheet)

    var data = props.data

    useEffect(()=>{
        handle()
    },[JSON.stringify(props.data)])

    for(var i = 0; i < data.length; i++) {
        for(var j = 0; j < data[i].length; j++) {
            emptySheet[i][j] = data[i][j]
        }

    }   

    const handle=()=>{
        for(var i = 0; i < data.length; i++) {
            for(var j = 0; j < data[i].length; j++) {
                emptySheet[i][j] = data[i][j]["value"]
            }
    
        }   
        setK(emptySheet)

        console.log(emptySheet)
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
                                return <td onClick={(e)=>{console.log(e.target.textContent)}} id = {index+1 + "," + is }>{element}</td>
                            })}
                        </tr>
                    })}
                    
                </table>
            </div>

        </div>
    )
}