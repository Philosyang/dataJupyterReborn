import {React, useEffect, useState} from "react"
import {Button, ButtonGroup} from "@material-ui/core";
import "./steps.css"

export default function Steps(props){
    const [selectedBtn, setSelectedBtn] = useState(1);

    useEffect(
        ()=> props.changeStep(selectedBtn)
    ,[selectedBtn])
 
    return(
      <div>
        <ButtonGroup disableElevation variant="contained" color="primary" orientation= "horizontal" className= "selectionSteps" size= "small">
          <Button color={selectedBtn === 1 ? "secondary" : "primary"} onClick={()=>setSelectedBtn(1)}>Step 1</Button>
          <Button color={selectedBtn === 2 ? "secondary" : "primary"} onClick={()=>setSelectedBtn(2)}>Step 2</Button>
          <Button color={selectedBtn === 3 ? "secondary" : "primary"} onClick={()=>setSelectedBtn(3)}>Step 3</Button>
          <Button color={selectedBtn === 4 ? "secondary" : "primary"} onClick={()=>setSelectedBtn(4)}>Step 4</Button>
          <Button color={selectedBtn === 5 ? "secondary" : "primary"} onClick={()=>setSelectedBtn(5)}>Step 5</Button>
          <Button color={selectedBtn === 6 ? "secondary" : "primary"} onClick={()=>setSelectedBtn(6)}>Step 6 </Button>
        </ButtonGroup>
      </div>
    );
}