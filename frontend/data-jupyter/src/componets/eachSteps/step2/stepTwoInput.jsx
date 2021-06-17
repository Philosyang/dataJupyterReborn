import {React, useEffect, useState} from "react"


export default function StepTwoInput(props){

    const [clicks, setClicks] = useState([])

    const handleClick = (e)=>{
        setClicks(clicks.concat(e.target.id))
    }

    useEffect(()=>{
        props.inputChange(clicks)
    },[clicks])


    return(
        <div className = "stepOneDisplayWrapper">
            {props.allUrls.map((a, index)=>{
                return(
                    <div className = "singleBlock">
                        <h1 id = {index} onClick = {handleClick}>{a["title"]}</h1>
                        <a target="_blank" href = {a["link"]}>{a["link"]}</a>
                    </div>
                )
            })}
        </div>
    )
}