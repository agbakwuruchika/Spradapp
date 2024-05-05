"use client"
import React from "react";

export default function ButtonWithOutIcon(props:any){
    return(
        <div className = {props.style}>
            <button type = {props.type} className = {props.stateLayer} onClick ={props.action}><span className = {props.textWrapper}>{props.label}</span></button>
        </div>
    )
    

}