import React, {useState, useEffect} from "react"
import "./spreadsheet.css"

export default function SpreadSheet(props){
    const [sheetValue, setSheetValue] = useState(emptySheet)
    
    var emptySheet =  Array(200).fill().map(() => Array(26).fill("")) //Array(200).fill(Array(26).fill(""))
    const header = [...Array(27).keys()]
    const entireSheet = [header].concat(emptySheet)
    
    const[k, setK] = useState(emptySheet)

    var data = props.data
    var sheet = props.sheet

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
            console.log(data)
            console.log(sheet)
            console.log(data[sheet])
            var first = data[sheet]
            if(first != undefined){
                for(var i = 0; i < first.length; i++) {
                    for(var j = 0; j < first[i].length; j++){
                        emptySheet[i][j] = first[i][j]
                    }
                }
                console.log(emptySheet)
                setK(emptySheet)
            }
        }
        
        // if(data[fisrt][0] != undefined) {
        //     var datas = data[first][0]
        //     for(var i = 0; i < datas.length; i++) {
        //         for(var j = 0; j < datas[i].length; j++) {
        //             emptySheet[i][j] = datas[i][j]
        //         }
        
        //     }  
        // }
        // console.log("first is " + first)
        // console.log("the next line is data[first]")
        // console.log(data[first])
        // var datas = data[first]
        // for(var i = 0; i < datas[i]; i++) {
        //     for(var j = 0; j < data[i][j].length; j++) {
        //         emptySheet[i][j] = data[i][j]
        //     }
    
        // }
        // console.log("result is" + emptySheet)
   
        // setK(emptySheet)
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