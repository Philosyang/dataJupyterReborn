import {React, useEffect, useState} from "react"

export default function Python(){

    return(
        <div>
            <textarea onChange={(event)=>{console.log(event.target.value)}}> </textarea>
        </div>
    )
}