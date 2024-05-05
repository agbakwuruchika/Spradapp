'use client'
import React from "react";
import { useState, useEffect } from "react";


export default function BottomAppBar(){
    const [deviceScreenSize, setDeviceScreenSize] = useState(0)
    useEffect(()=>{
        const handleResize = () =>{
            setDeviceScreenSize(window.innerWidth)
        }
        handleResize();

    },[])
    return(
        <div>
        {deviceScreenSize < 700 &&
            <div className = "bottom-app-bar w-full bg-yellow-500 fixed bottom-0 z-50" style = {{height:64}}>
      
            </div>
        }
        </div>
    )
}