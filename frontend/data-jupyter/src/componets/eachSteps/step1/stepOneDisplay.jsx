import {React, useEffect, useState} from "react"
import "./stepOneDisplay.css"
import SpreadSheet from "../../spreadSheet"


export default function StepOneDisplay(props){


    var data = props.data


    return(
        <div className = "stepOneDisplayWrapper">
            <SpreadSheet/>
        </div>
    )
}