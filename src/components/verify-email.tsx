'use client'
import { useState } from "react"
import { useEffect } from "react"

export default function VerfiyEmail(){
    const [token, setToken] = useState("")
    const [email, setEmail] = useState("")
    const [serverMessage, setServerMessage] = useState("")

    useEffect(()=>{
        const params = new URLSearchParams(window.location.search)
        const urlToken:any = params.get('token');
        setToken(urlToken)
        const urlEmail:any = params.get('email');
        setEmail(urlEmail)
    }, [])

    const verifyUser = async () =>{
        const response = await fetch("/api/auth/verify-email", {
            method:"POST",
            body:JSON.stringify({
                email: email,
                token: token
            })
        })
        console.log(response)
        const successResponse = await response.json()
        if(response.ok && successResponse.message === "Your Email Has Been Successfully Verified"){
            //const successResponse = await response.json()
            setServerMessage(successResponse.message)

        }else{
            //const errorResponse = await response.json()
            setServerMessage(successResponse.errorMessage)
        }
    }

    useEffect(()=>{
        verifyUser();
        
    }, [token])
    return(
        <div>
            <h1>{token}</h1>
            <h1>{email}</h1>
            <h1>{serverMessage}</h1>
            

        </div>
    )
}