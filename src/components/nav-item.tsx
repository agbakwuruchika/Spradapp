import React from "react";
import Image from "next/image";

export default function NavItem(props:any){
    return(
        <div className = "inactive-enabled-container">
            <div className = {props.stateLayerClass}>
                <Image src = {props.name} alt = {props.alt} className = "inactive-enabled-image" width = {24} height = {24}/>
                <div className = "inactive-enabled-label">
                    {props.label}
                </div>
                <div className = "inactive-enabled-badge">
                    {props.badge}
                </div>

            </div>

        </div>
    )
}