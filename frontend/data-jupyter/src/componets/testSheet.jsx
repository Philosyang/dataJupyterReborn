import ReactDataSheet from 'react-datasheet';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';

import React,{useEffect, useState} from "react"


class Apps extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        grid: this.props.data,
      };
    }
    render() {
      return (
        <ReactDataSheet
            data={this.state.grid}
            valueRenderer={cell => cell.value}
            onCellsChanged={changes => {
            const grid = this.state.grid.map(row => [...row]);
            changes.forEach(({ cell, row, col, value }) => {
              grid[row][col] = { ...grid[row][col], value };
            });
            this.setState({ grid });
          }}
        />
      );
    }
}




export default function Test(props){

    var data = props.data


    return(
        <div>
            <button onClick = {()=>console.log(data)}>fsdf</button>
            <ReactDataSheet
            data = {data}
            valueRenderer={cell => cell.value}
            onCellsChanged={(changes)=>{
                changes.forEach(({ cell, row, col, value })=>{
                    console.log(data[row][col])
                    console.log(value)
                    data[row][col] = value
                })
            }}
            />
        </div>
    )

}

