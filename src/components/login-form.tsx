
'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getDocs, collection, query, where, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useState } from 'react';
import { useEffect } from 'react';
import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ClipLoader from "react-spinners/ClipLoader";
import ButtonWithIcon from './button-with-icon'
import ButtonWithOutIcon from './button-without-icon'




async function FetchUserProfile(userID:any) {
    const q = query(collection(db, "Profiles"), where("UID", "==", userID));
    const querySnapshot = await getDocs(q);
    const data:any = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}



export default function LoginForm(props:any) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [session, setSession] = useState(false)
    const [serverMessage, setServerMessage] = useState("")
    const [processing, setProcessing] = useState(false)
    const [userProfile, setUserProfile] = useState([]);
    const [createProfile, setCreateProfile] = useState(false)



    useEffect(() => {
        const redirection = () => {
            if (createProfile) {
                window.location.href = "/profile"
            }
        }
        redirection();
    }, [createProfile])



    type loginSchema = {
        email: string;
        password: string;
    }


    const formSchema: ZodType<loginSchema> = z.object({
        email: z.string().email({message:"Invalid email address"}).trim().toLowerCase(),
        password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .regex(/[^A-Za-z0-9]/, { message: 'Password must include at least one special character' }),
    })

    const { register, handleSubmit, formState: { errors } } = useForm<loginSchema>({ resolver: zodResolver(formSchema) })



    const handleLogin = async () => {
        setProcessing(true);
        const auth = getAuth();
    
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            if (user.emailVerified) {
                const uid = user.uid
                const data = await FetchUserProfile(uid);
                setUserProfile(data);
                console.log(uid)
                if(data.length > 0 && data.length < 2){
                    //Setup session, close modal and display toast
                    setSession(true)
                    console.log('Login successful. User is verified.');
                console.log(user)
                }else{
                    setCreateProfile(true)
                    //Redirect the user to set up profile
                }
            } else {
                console.log('Email not verified.');
                alert('Please verify your email before logging in.');
                await signOut(auth);
                setSession(false);
                console.log('User signed out due to unverified email.');
            }
    
        } catch (error:any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Error ${errorCode}: ${errorMessage}`);
            // Handle error appropriately in the UI
            alert(`Login failed: ${errorMessage}`);
        } finally {
            setProcessing(false);
        }
    };
    


    return (
        <div>

            <h2 className = "text-center font-bold">Login</h2>
            <div className="rounded shadow p-2 m-2 content-with-white-background">
                <h3 className="text-center h3">Fill The Form Below To Login</h3>
                <div className="mb-2">
                    <form onSubmit={handleSubmit(handleLogin)}>
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
                        <p className = "text-sm mt-4"><Link href = "/tos" className = "link-text-color hover:underline">Forgot password?</Link> </p>
                        {email !== "" && password !== "" ?
                        <div className="mt-4">
                            {processing ? <ButtonWithIcon type = "button" style = "filled-enabled-with-and-without-icon" icon = {<ClipLoader color='rgba(255, 255, 255, 1)'/>} iconStyle = "filled-enabled-icon-styling" label = "Processing..." stateLayer = "filled-enabled-with-icon-state-layer" textWrapper = "filled-enabled-with-and-without-icon-text-wrapper"/> :
                                <ButtonWithOutIcon type = "submit" style = "filled-enabled-with-and-without-icon" label = "Login" statelayer = "filled-enabled-without-icon-state-layer" textWrapper = "filled-enabled-with-and-without-icon-text-wrapper"/>
                            }
                        </div> :
                        <div className = "mt-4">
                          <ButtonWithOutIcon type = "button" style = "filled-disabled-with-and-without-icon" label = "Login" stateLayer = "filled-disabled-without-icon-state-layer" textWrapper = "filled-disabled-icon-text-wrapper"/>
                        </div>
                        }
                    </form>
                    <div className = "flex flex-col md:gap-x-2 md:flex-row">
                    <p className = "mt-2">Not yet on Spradapp? </p>
                    <span className = "mt-2 link-text-color font-bold cursor-pointer hover:underline" onClick={props.goToSignUp}> Create Account</span>
                    
                    </div>
                </div>
            </div>
        </div>
    )
}