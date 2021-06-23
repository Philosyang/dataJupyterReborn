import {React, useEffect, useState} from "react"
import "./stepOneDisplay.css"


export default function StepOneDisplay(props){


    var data = props.data


    return(
        <div className = "stepOneDisplayWrapper">
            <table>
                {data === undefined ?
                <h1>
                    no data yet
                </h1>
                :  data.map((items, index)=>{
                    if (index === 0){
                        return <tr>
                            {items.index}
                        </tr>
                    } else {
                        return <tr>
                            <td>
                                notyet
                            </td>
                        </tr>
                    }

                }) }

            </table>
            <button onClick= {()=>{
                console.log(data[0])
            }}> click</button>
        </div>
    )
}