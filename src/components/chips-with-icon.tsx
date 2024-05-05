import React from "react";


export default function ChipsWithIcon(props:any){
    return(
        <div className = "assist-chips-with-icon" style = {{height:32, borderRadius:8, display:"flex", alignItems:"center"}} onClick={props.action}>
            <div className = "assist-chips-with-icon-state-layer" style = {{height:32, paddingLeft:8, paddingRight:16, gap:8, display:"flex", alignItems:"center"}}>
                <span className = "assist-chips-with-icon-enabled-icon">{props.icon}</span>
                <span className = "assist-chips-with-icon-enabled-textwrapper hidden md:block">{props.label}</span>
            </div>
        </div>
    )
}