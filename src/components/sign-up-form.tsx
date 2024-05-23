
'use client'
import React from 'react'
import Image from 'next/image'
import { db } from '../firebase/config'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';
import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ClipLoader from "react-spinners/ClipLoader";
import ButtonWithIcon from './button-with-icon'
import ButtonWithOutIcon from './button-without-icon'
import Link from 'next/link'




export default function SignUpForm(props:any) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [serverMessage, setServerMessage] = useState("")
    const [processing, setProcessing] = useState(false)



    type signUpSchema = {
        email: string;
        password: string;
        confirmPassword: string;
    }


    const formSchema: ZodType<signUpSchema> = z.object({
        email: z.string().email({message:"Invalid email address"}).trim().toLowerCase(),
        password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .regex(/[^A-Za-z0-9]/, { message: 'Password must include at least one special character' }),
    confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'], // Set the path of the error
      });

    const { register, handleSubmit, formState: { errors } } = useForm<signUpSchema>({ resolver: zodResolver(formSchema) })



    const handleOrder = async () => {
        setProcessing(true)
        const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        //Signed up
        const user = userCredential.user;
    })
    .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
    })
    }


    return (
        <div>

            <h2 className = "text-center font-bold">Create Account</h2>
            <div className="rounded shadow p-2 m-2 content-with-white-background">
                <h3 className="text-center h3">Fill The Form Below To Create an Account</h3>
                <div className="mb-2">
                    <form onSubmit={handleSubmit(handleOrder)}>
                        <div className="mt-2">
                            <label htmlFor="emailAddress" className = "font-medium">Email Address <span className="text-red-500"> *</span></label>
                            <input type="email" id="emailAddress" className="p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" placeholder="Enter your email address here" required {...register("email")} onChange={(e) => { setEmail(e.currentTarget.value) }} />
                            {errors.email && <p className='text-red-500 error-message'>{errors.email.message}</p>}
                        </div>
                        <div className="mt-2">
                             
                            <label htmlFor="password" className = "font-medium">Password <span className="text-red-500"> *</span></label>
                            
                            <input type="password" id="password" className="p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" placeholder="Enter your password here" required {...register("password")} onChange={(e) => { setPassword(e.currentTarget.value) }} />
                            {errors.password && <p className='text-red-500 error-message'>{errors.password.message}</p>}
                        </div>
                        <div className="mt-2">
                        <label htmlFor="confirmPassword" className = "font-medium">Confirm Password <span className="text-red-500"> *</span></label>
                            <input type="password" id="confirmPassword" className="p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" placeholder = "Re-enter your password here" {...register("confirmPassword")} onChange={(e) => { setConfirmPassword(e.currentTarget.value) }} />
                            {errors.confirmPassword && <p className='text-red-500 error-message'>{errors.confirmPassword.message}</p>}
                        </div>
                        <p className = "text-xs mt-4">By clicking Create Account, you agree to our <Link href = "/tos" className = "link-text-color hover:underline">Terms of Service</Link>, <Link href = "/privacy-policy" className = "link-text-color hover:underline">Privacy Policy</Link>, and <Link href = "/cookie-policy" className = "link-text-color hover:underline">Cookies Policy</Link>.</p>
                        {email !== "" && password !== "" && confirmPassword !== "" ?
                        <div className="mt-4">
                            {processing ? <ButtonWithIcon type = "button" style = "filled-enabled-with-and-without-icon" icon = {<ClipLoader color='rgba(255, 255, 255, 1)'/>} iconStyle = "filled-enabled-icon-styling" label = "Processing..." stateLayer = "filled-enabled-with-icon-state-layer" textWrapper = "filled-enabled-with-and-without-icon-text-wrapper"/> :
                                <ButtonWithOutIcon type = "submit" style = "filled-enabled-with-and-without-icon" label = "Create Account" statelayer = "filled-enabled-without-icon-state-layer" textWrapper = "filled-enabled-with-and-without-icon-text-wrapper"/>
                            }
                        </div> :
                        <div className = "mt-4">
                          <ButtonWithOutIcon type = "button" style = "filled-disabled-with-and-without-icon" label = "Create Account" stateLayer = "filled-disabled-without-icon-state-layer" textWrapper = "filled-disabled-icon-text-wrapper"/>
                        </div>
                        }
                    </form>
                    <div className = "flex gap-x-2">
                    <p className = "mt-2">Already have an account? </p>
                    <span className = "mt-2 link-text-color font-bold cursor-pointer hover:underline" onClick={props.goToLogin}> Login</span>
                    
                    </div>
                </div>
            </div>
        </div>
    )
}