import {React, useEffect, useState} from "react"
import GitHubIcon from '@material-ui/icons/GitHub';
import "./naviBar.css"
import InfoIcon from '@material-ui/icons/Info';

export default function NaviBar() {

    const [displayInfo, setDisplayInfo] = useState(false)


    return(
        <div>
            <div className = "NaviBarWrapper">
                <div className = "titleWrapper">
                    <span style={{position:"relative", top:"18px"}}>Data-Jupyter</span>
                </div>
                <div className = "info">
                    <InfoIcon title = "click for more info" color="primary" style={{paddingRight:"20px", cursor:"pointer"}} onClick = {()=>{setDisplayInfo(!displayInfo)}}/>
                    <a href="https://github.com/Philosyang/dataJupyter" target="_blank" style={{textDecoration:"none"}}>
                        <GitHubIcon color ="primary"/>
                    </a>
                </div>
            </div>
            <div >
                {!displayInfo ? <p></p> : <div className= "displayInfo">
                    <p> Data-Jupyter is a workbench for data collecting/cleaing/analysis</p> 
                    <p> Developers: Yufei Zhu, Peifan(Philos) Yang, Jincheng Liu</p>
                </div>  }
            </div>
        </div>
    )
}