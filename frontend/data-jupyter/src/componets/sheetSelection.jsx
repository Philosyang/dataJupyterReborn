import React, {useState, useEffect} from "react"

export default function SheetSelection() {
    const text = ["234","324"]
    return (
      <div>
          <span>select sheet</span>
      {text.map((item, index)=>{
          return(
              <span>{item}</span>
          )
      })}
  </div>
    );
  }