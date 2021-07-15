import React,{useState, useEffect} from "react"

export default function Cell(props){

    const [value, setValue] = useState("")

    useEffect(()=>{
        setValue(props.value)
    },[props.value])
    
    const handleCellChange =(e) =>{
        var val = e.target.value
        setValue(val)
        console.log(props.location)
        var data = {"text": {"location" : props.location,
                     "value" : val,
                    "sheet_name" : props.sheet   }}
        fetch('/cellChange',{
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(r => console.log(r))
    }

    return(
        <input type="text" value = {value} onChange = {handleCellChange}/>
    )
}