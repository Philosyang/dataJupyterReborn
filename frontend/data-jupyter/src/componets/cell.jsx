import React,{useState, useEffect} from "react"

export default function Cell(props){

    const [value, setValue] = useState("")
    const [viewValue, setViewValue] = useState("")


    useEffect(()=>{
        setValue(props.value)
        setViewValue(props.value)
    },[props.value])
    
    const handleCellChange =(e) =>{
        if(value != viewValue){
            setViewValue(value)
            console.log(e.target.value)
            const py = `sheets["${props.sheetName}"][${props.location[0]-1}][${props.location[1]-1}] = "${value}"`
            props.pyChange(py)
            var data = {"text": {"location" : props.location,
                         "value" : value,
                        "sheet_name" : props.sheet   }}
            fetch('/cellChange',{
                body: JSON.stringify(data),
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(r => console.log(r))
        }
    }

    return(
        <input type="text" value = {value}  onChange = {(e)=>{setValue(e.target.value)}}  onBlur={handleCellChange}/>
    )
}