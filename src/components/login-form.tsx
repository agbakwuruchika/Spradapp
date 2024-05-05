'use client'
import React from "react"
import ButtonWithOutIcon from "./button-without-icon"
import { FormEvent } from "react";
//import { signIn } from "next-auth/react";

export default function LoginForm(){
    
    const handleSubmit =async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        //const response = await signIn('credentials', {
       //     email: formData.get('email'),
       //     password: formData.get('password'),
       //     redirect: false,
       // })
       // console.log({response})

    } 
    return(
        <form onSubmit={handleSubmit}>
            <input type = "email" name = "email" placeholder="Email" />
            <input type = "password" name = "password" placeholder="Password" />
            <ButtonWithOutIcon type = "submit" label = "Login" />
        </form>
    )
}