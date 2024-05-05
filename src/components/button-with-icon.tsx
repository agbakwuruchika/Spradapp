"use client"
import React from "react";

export default function ButtonWithIcon(props:any){
    return(
        <div className = {props.style}>
            <button type = {props.type} className = {props.stateLayer} onClick ={props.action}><span className = {props.iconStyle}>{props.icon}</span><span className = {props.textWrapper}>{props.label}</span></button>
        </div>
    )
    

}