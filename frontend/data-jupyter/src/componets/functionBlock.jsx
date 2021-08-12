import {React, useEffect, useState} from "react"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default function FunctionBlock(props){

    useEffect(()=>{
        console.log(props)
    },[props.headers])

    const [first, setFirst] = useState("");
    const [second, setSecond] = useState("");


    return(
        <div style = {{position:"relative", width:"100%", height:"200px", backgroundColor:"lightgreen"}}>
            <FormControl className = "dropdown" style = {{width:"100px",marginRight:"50px"}}>
                <InputLabel>{props.sheetSelection}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={first}
                    onChange={(e)=>{setFirst(e.target.value)}}
                >
                    {props.headers != null ?
                    props.headers.map((a)=>{ return <MenuItem value={a}>{a}</MenuItem>}) : <h1></h1> }
                </Select>
            </FormControl>
            <FormControl className = "dropdown" style = {{width:"100px",marginRight:"50px"}}>
                <InputLabel>{props.sheetSelection}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={second}
                    onChange={(e)=>{setSecond(e.target.value)}}
                >
                    {props.headers != null ?
                    props.headers.map((a)=>{ return <MenuItem value={a}>{a}</MenuItem>}) : <h1></h1> }
                </Select>
            </FormControl>
            <button onClick = {()=>{
                fetch("/merge",{
                    body: JSON.stringify({
                        c1: first,
                        c2: second,
                        sname: props.sheetSelection,
                        split: "|",
                        newname: "test"

                    }),
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }}>
                Click to merge
            </button>
      </div>
    )
}