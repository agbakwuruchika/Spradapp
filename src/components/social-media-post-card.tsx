'use client'
import React, { useEffect, useState, useCallback } from 'react';
import { BsX } from "react-icons/bs";
import { LuMoreHorizontal } from "react-icons/lu";
import Image from "next/image";
import ButtonWithIcon from "./button-with-icon";
import { FaPlus } from "react-icons/fa";
import ChipsWithIcon from "./chips-with-icon";
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import { CgLink } from "react-icons/cg";
import { ImEmbed2 } from "react-icons/im";
import { BiHide } from "react-icons/bi";
import { MdBlock } from "react-icons/md";
import { CiFlag1 } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";
import { fetchPosts, Post } from './fetch-posts';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { useInView } from 'react-intersection-observer';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog"


const allPost = [
    {
        reasonForShowing: "Sponsored",
        author: "Spraditech",
        authorUsername: "@spraditech",
        authorStatus: "Student",
        authorCourse: "Computer Science",
        authorSchool: "University of Lagos",
        authorTypeOfStudy: "Postgraduate",
        authorLevel: "400 Level",
        authorProfilePics: "/unilag logo.png",
        postDescription: "The Department of Computer Sciences is located in a three-storey building in the Science Complex of the University of Lagos with a basement to itself.",
        postMedia: "/unilagcs.jpg",
        postMediaType: "Images",
        postLikes: 114,
        comments: 53,
        shares: 21,
        ID: 1

    },
    {
        reasonForShowing: "Suggested",
        author: "Chika Agbakwuru",
        authorUsername: "@sixtusagba",
        authorStatus: "Student",
        authorCourse: "Philosophy",
        authorSchool: "University of Lagos",
        authorTypeOfStudy: "Undergraduate",
        authorLevel: "300 Level",
        authorProfilePics: "/chika-agbakwuru.jpg",
        postDescription: "UNILAG Alumni Association organizes annual general meeting where new excos were elected. Thank God for a successful meeting",
        postMedia: "/unilag-alumni.jpg",
        postMediaType: "Images",
        postLikes: 386,
        comments: 73,
        shares: 42,
        ID: 2

    },
    {
        reasonForShowing: "Suggested",
        author: "Tobiloba Osundiya",
        authorUsername: "@tobilobaosun",
        authorStatus: "Student",
        authorCourse: "Economics",
        authorSchool: "Obafemi Awolowo University",
        authorTypeOfStudy: "Undergraduate",
        authorLevel: "100 Level",
        authorProfilePics: "pte.svg",
        postDescription: "UNILAG Alumni Association organizes annual general meeting where new excos were elected. Thank God for a successful meeting",
        postMedia: "/boost-libido.jpeg",
        postMediaType: "Images",
        postLikes: 56,
        comments: 13,
        shares: 2,
        ID: 3

    }
]




export default function SocialMediaPostCard() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();
    const [popupContent, setpopupContent] = useState(<FaRegBell />)
    const { toast } = useToast()



    const fetchInitialPosts = useCallback(async () => {
        setLoading(true);
        try {
          const { data, lastDoc } = await fetchPosts();
          setPosts(data);
          setLastDoc(lastDoc);
        } catch (error) {
          console.error('Error fetching posts:', error);
        } finally {
          setLoading(false);
        }
      }, []);
    
      const fetchMorePosts = useCallback(async () => {
        if (loading || !lastDoc) return;
    
        setLoading(true);
        try {
          const { data, lastDoc: newLastDoc } = await fetchPosts(lastDoc);
          setPosts((prevPosts) => [...prevPosts, ...data]);
          setLastDoc(newLastDoc);
        } catch (error) {
          console.error('Error fetching more posts:', error);
        } finally {
          setLoading(false);
        }
      }, [lastDoc, loading]);
    
      useEffect(() => {
        fetchInitialPosts();
      }, [fetchInitialPosts]);
    
      useEffect(() => {
        if (inView && !loading) {
          fetchMorePosts();
        }
      }, [inView, fetchMorePosts, loading]);
    




    return (
        <div>
            {posts.map((post) => {
                return (
                    <div key = {post.id} style={{ borderRadius: 12, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, marginBottom: 16 }} className="post-card-container w-full">
                        <div style={{ borderBottom: 5, borderColor: "black", display: "flex", alignItems: "center", justifyContent: "space-between" }} className="">
                            <p>{post.Post_Types}</p>
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
                                                    <MdBlock style={{ height: 24, width: 24 }} className="pr-2" />Block {post.Author_Name}&apos;s profile
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
                        <div className="flex mt-4">
                            <div style={{ borderRadius: 28, display: "flex", height: 56, width: 56 }}>
                                <Image src={post.Author_Profile_Picture} alt="Profile Picture" height={56} width={56} style={{ borderRadius: 28 }} />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <p style={{ lineHeight: 1.2 }}><span style={{ fontSize: 15, fontWeight: "bold", paddingLeft: 5 }}>{post.Author_Name}</span> <span style={{ fontSize: 15, color: "gray" }}>{post.Author_Username}</span>, </p>
                                <p style={{ fontSize: 14, color: "gray", paddingLeft: 5, lineHeight: 1.2 }}>{post.Author_Course} {post.Author_Academic_Status}, {post.Author_School}</p>
                                <p style={{ fontSize: 14, color: "gray", paddingLeft: 5, lineHeight: 1.2 }}>{post.Author_Type_Of_Study} ({post.Author_Level})</p>
                            </div>
                            <ButtonWithIcon type="button" style="text-enabled-with-and-without-icon" stateLayer="text-enabled-with-icon-state-layer" icon={<FaPlus />} iconStyle="text-enabled-icon-styling" label="Follow" textWrapper="text-enabled-with-and-without-icon-text-wrapper" />
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <p style={{ fontSize: 16, lineHeight: 1.3 }} className="post-description-text">{post.Post_Content}</p>
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <Image src={post.Post_Media} alt="Uploaded picture" height={200} width={600} className="w-full" />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
                            <div>
                                <p style={{ fontSize: 12, cursor: "pointer" }}>{post.Number_Of_Likes} Likes</p>
                            </div>
                            <div style={{ display: "flex", gap: 15 }}>
                                <p style={{ fontSize: 12, cursor: "pointer" }}>{post.Number_Of_Comments} Comments</p>
                                <p style={{ fontSize: 12, cursor: "pointer" }}>{post.Number_Of_Shares} Shares</p>
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
            })}
            <div ref={ref}>
        {loading && <p>Loading more posts...</p>}
      </div>
        </div>
    )
}