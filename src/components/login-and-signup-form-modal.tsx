'use client'
import React from 'react'
import { IoMdClose } from "react-icons/io";
import SignUpForm from './sign-up-form';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ButtonWithOutIcon from './button-without-icon';




export default function LoginAndSignupFormModal(props:any) {
    const [loginSection, setLoginSection] = useState(true);
    const [signUpSection, setSignUpSection] = useState(false)
    return (
        <div>
            <>
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
                        zIndex: 9998, // Overlay should be behind the modal
                    }}
                ></div>
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        border: "1px solid black",
                        minWidth: "300px",
                        maxWidth: "90vw",
                        maxHeight: "95vh",
                        overflow: "auto",
                        backgroundColor: "white",
                        borderRadius: "15px",
                        zIndex: 9999, // Modal should be above the overlay
                    }}
                    className="enrollment-modal-container"
                >
                    <div className="flex login-signup-tabs-container">
                        {loginSection ?
                            <div className="w-2/4 p-2 product-description-tabs-active">
                                <h2 className="h4">Login</h2>
                            </div> :
                            <div className="w-2/4 p-2 product-description-tabs" onClick={() => {
                                setSignUpSection(false);
                                setLoginSection(true);
                            }}>
                                <h2 className="h4">Login</h2>
                            </div>
                        }
                        {signUpSection ?
                            <div className="w-2/4 p-2 product-description-tabs-active">
                                <h3 className="h4">Sign Up</h3>
                            </div> :
                            <div className="w-2/4 p-2 product-description-tabs" onClick={() => {
                                setLoginSection(false);
                                setSignUpSection(true);
                            }}>
                                <h3 className="h4">Sign Up</h3>
                            </div>
                        }

                    </div>
                    <div>
                        {loginSection &&
                        <div>Login</div>
                        }
                        {signUpSection &&
                        <div><SignUpForm /> </div>
                        }
                    </div>
                    <div className = "flex">
                    <ButtonWithOutIcon type = "button" style = "text-enabled-with-and-without-icon" label = "Close" statelayer = "text-enabled-without-icon-state-layer" textWrapper = "text-enabled-with-and-without-icon-text-wrapper" action = {props.closeModal} />
                    </div>

                </div>
            </>
        </div>
    )
}