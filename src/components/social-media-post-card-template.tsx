'use client'
import React from "react";
import { LuMoreHorizontal } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import { CgLink } from "react-icons/cg";
import { ImEmbed2 } from "react-icons/im";
import { BiHide } from "react-icons/bi";
import { MdBlock } from "react-icons/md";
import { CiFlag1 } from "react-icons/ci";
import { BsX } from "react-icons/bs";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import ButtonWithIcon from "./button-with-icon";
  import ChipsWithIcon from "./chips-with-icon";
  import Image from "next/image";
  import { useToast } from "@/components/ui/use-toast";
  import { useState } from "react";
  import { ToastAction } from "@/components/ui/toast"


export default function SocialMediaPostCardTemplate(props:any){
    const [popupContent, setpopupContent] = useState(<FaRegBell />)
    const { toast } = useToast()
    return(
        <div style={{ borderRadius: 12, paddingLeft: 10, paddingRight: 10, paddingBottom: 16, marginBottom: 16 }} className="post-card-container w-full">
                        <div style={{ borderBottom: 5, borderColor: "black", display: "flex", alignItems: "center", justifyContent: "space-between" }} className="">
                            <p>{props.reasonForShowing}</p>
                            <div style={{ display: "flex", gap: 12 }}>
                                <AlertDialog>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <LuMoreHorizontal style={{ height: 28, width: 28, borderRadius: 14 }} className="hover:bg-gray-200" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem className = "cursor-pointer" onClick = {()=>{
                                                    toast({
                                                        title: "Scheduled: Catch up",
                                                        description: "Friday, February 10, 2023 at 5:57 PM",
                                                        action: (
                                                            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                                                          ),
                                                      })
                                                }}>
                                                <FaRegBell style={{ height: 24, width: 24 }} className="pr-2" />Turn on notifications for this post
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <AlertDialogTrigger className="flex" onClick = {()=>{
                                                    setpopupContent(<CgLink />)
                                                }}>
                                                    <CgLink style={{ height: 24, width: 24 }} className="pr-2" />Copy link to post
                                                </AlertDialogTrigger>
                                            </DropdownMenuItem>


                                            <DropdownMenuItem>
                                                <AlertDialogTrigger className = "flex" onClick ={()=>{
                                                    setpopupContent(<ImEmbed2 />)
                                                }}>
                                                    <ImEmbed2 style={{ height: 24, width: 24 }} className="pr-2" />Embed this post
                                                </AlertDialogTrigger>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <AlertDialogTrigger className = "flex" onClick ={()=>{
                                                    setpopupContent(<BiHide />)
                                                }}>
                                                    <BiHide style={{ height: 24, width: 24 }} className="pr-2" />I don&apos;t want to see this
                                                </AlertDialogTrigger>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <AlertDialogTrigger className = "flex" onClick = {()=>{
                                                    setpopupContent(<MdBlock />)
                                                }}>
                                                    <MdBlock style={{ height: 24, width: 24 }} className="pr-2" />Block {props.author}&apos;s profile
                                                </AlertDialogTrigger>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <AlertDialogTrigger className = "flex" onClick = {()=>{
                                                    setpopupContent(<CiFlag1 />)
                                                }}>
                                                    <CiFlag1 style={{ height: 24, width: 24 }} className="pr-2" />Report post
                                                </AlertDialogTrigger>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are You Sure You Want to Turn on {popupContent} Notification?</AlertDialogTitle>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>


                                <BsX style={{ height: 28, width: 28 }} />
                            </div>
                        </div>
                        <hr />
                        <div className="flex items-center mt-4 gap-2">
                            <div style={{ borderRadius: 15, display: "flex", height: 30, width: 30 }}>
                                <Image className = "min-w-8" src={props.authorProfilePics} alt="Profile Picture" height={30} width={30} style={{ borderRadius: 15 }} />
                            </div>
                            <div className="flex flex-col justify-start items-start flex-grow">
                                <p style={{ lineHeight: 0.5 }}><span style={{ fontSize: 15, fontWeight: "bold" }} className = "text-xs md:text-base">{props.author}</span> <span className = "hidden md:block" style={{ fontSize: 15, color: "gray" }}>{props.authorUsername}</span> </p> 
                            </div>
                            <ButtonWithIcon type="button" style="text-enabled-with-and-without-icon" stateLayer="text-enabled-with-icon-state-layer" icon={<FaPlus />} iconStyle="text-enabled-icon-styling" label="Follow" textWrapper="text-enabled-with-and-without-icon-text-wrapper" />
                        </div>
                        <p style={{ fontSize: 14, color: "gray", paddingLeft: 5, lineHeight: 1.2 }}>{props.authorTypeOfStudy} {props.authorStatus} ({props.authorLevel}), {props.authorCourse}, {props.authorSchool}</p>
                        <div style={{ marginTop: 10 }}>
                            <p style={{ fontSize: 16, lineHeight: 1.3 }} className="post-description-text">{props.postDescription}</p>
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <Image src={props.postMedia} alt="Uploaded picture" height={200} width={600} className="w-full" />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
                            <div>
                                <p style={{ fontSize: 12, cursor: "pointer" }}>{props.postLikes} Likes</p>
                            </div>
                            <div style={{ display: "flex", gap: 15 }}>
                                <p style={{ fontSize: 12, cursor: "pointer" }}>{props.comments} Comments</p>
                                <p style={{ fontSize: 12, cursor: "pointer" }}>{props.shares} Shares</p>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
                            <ChipsWithIcon icon={<FaRegThumbsUp style={{ height: 18, width: 18 }} />} label="Like" />
                            <ChipsWithIcon icon={<FaRegCommentDots style={{ height: 18, width: 18 }} />} label="Comment" />
                            <ChipsWithIcon icon={<FaRegBookmark style={{ height: 18, width: 18 }} />} label="Save" />
                            <ChipsWithIcon icon={<FaRegShareFromSquare style={{ height: 18, width: 18 }} />} label="Share" />
                        </div>
                    </div>
    )
}