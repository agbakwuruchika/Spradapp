"use client"
import React from "react";

export default function ButtonWithOutIcon(props:any){
    return(
        <div>
            <button type = {props.type} className = {props.style} onClick ={props.action}><span className = {props.stateLayer}><span className = {props.textWrapper}>{props.label}</span></span></button>
        </div>
    )
    

}