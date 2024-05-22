
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





export default function SignUpForm() {
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

            <Image src="/attention.gif" alt="Place Order for Long Jack XXXL" className="img-fluid mx-auto d-block" height={100} width={100}></Image>
            <div className="rounded shadow p-2 m-2 content-with-white-background">
                <h3 className="text-center h3">Fill The Form Below To Place Order</h3>
                <div className="mb-2">
                    <form onSubmit={handleSubmit(handleOrder)}>
                        <div className="mt-2">
                            <label htmlFor="emailAddress">Email <span className="text-danger"> *</span></label>
                            <input type="email" id="emailAddress" className="form-control" placeholder="enter your email here" required {...register("email")} onChange={(e) => { setEmail(e.currentTarget.value) }} />
                            {errors.email && <span className='text-red-500 error-message'>{errors.email.message}</span>}
                        </div>
                        <div className="mt-2">
                            <label htmlFor="deliveryAddress">Delivery Address <span className="text-danger"> *</span></label>
                            <input type="text" id="deliveryAddress" className="form-control" placeholder="enter your delivery address here" required {...register("password")} onChange={(e) => { setPassword(e.currentTarget.value) }} />
                            {errors.password && <span className='text-red-500 error-message'>{errors.password.message}</span>}
                        </div>
                        <div className="mt-2">
                            <label htmlFor="orderQuantity">Confirm Password <span className="text-danger"> *</span></label>
                            <input type="text" id="orderQuantity" className="form-control" {...register("confirmPassword")} onChange={(e) => { setConfirmPassword(e.currentTarget.value) }} />
                            {errors.confirmPassword && <span className='text-red-500 error-message'>{errors.confirmPassword.message}</span>}
                        </div>
                        <div className="mt-2">
                            {processing ? <button type="button" className="btn btn-primary form-control d-flex justify-content-center align-items-center"><ClipLoader color="#36d7b7" /><span>Processing...</span></button> :
                                <input type="submit" className="btn btn-primary form-control" value="Submit" />
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}