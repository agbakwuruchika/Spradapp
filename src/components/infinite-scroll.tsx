'use client'
import React, { useEffect, useState } from 'react';
import { db, auth } from '@/firebase/config';
import { collection, query, orderBy, where, limit, getDocs, startAfter, QueryDocumentSnapshot, DocumentData, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { BsX } from "react-icons/bs";
import { useInView } from 'react-intersection-observer';
import { LuMoreHorizontal } from "react-icons/lu";
import Image from "next/image";
import ButtonWithIcon from "./button-with-icon";
import { FaBullseye, FaPlus } from "react-icons/fa";
import ChipsWithIcon from "./chips-with-icon";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FaRegThumbsUp, FaRegCommentDots, FaRegBookmark, FaRegBell } from "react-icons/fa";
import LoginAndSignupFormModal from './login-and-signup-form-modal';
import { CgLink } from "react-icons/cg";
import { ImEmbed2 } from "react-icons/im";
import { BiHide } from "react-icons/bi";
import { MdBlock } from "react-icons/md";
import { CiFlag1 } from "react-icons/ci";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";



type Profiles = {
    id: string;
    Course: string;
    Email?: string;
    Followers?: string[];
    Level: number;
    Name: string;
    Picture: string;
    School: string;
    Status: string;
    Type: string;
    UID: string;
    Username: string;
};


async function FetchUserProfile(): Promise<Profiles[]> {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(async (user) => {
            if (user && user.emailVerified) {
                try {
                    const userID = user.uid;
                    const q = query(collection(db, "Profiles"), where("UID", "==", userID));
                    const querySnapshot = await getDocs(q);
                    const data: Profiles[] = [];
                    querySnapshot.forEach((doc) => {
                        data.push({ id: doc.id, ...doc.data() } as Profiles);
                    });
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            } else {
                resolve([]);
            }
        });
    });
}





export interface Post {
    id: string;
    Author_Academic_Status: string;
    Author_Course: string;
    Author_Level: number;
    Author_Name: string;
    Author_Profile_Picture: string;
    Author_School: string;
    Author_Type_Of_Study: string;
    Author_UID: string;
    Author_Username: string;
    Number_Of_Comments: number;
    Number_Of_Likes: number;
    Number_Of_Shares: number;
    Post_Content: string;
    Post_Create_At: Timestamp;
    Post_Media: string;
    Post_Media_Type: string;
    Post_Types: string;
}

const InfiniteScroll = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [session, setSession] = useState<boolean | undefined>(undefined);
    const [createProfile, setCreateProfile] = useState<boolean | undefined>(undefined);
    const [loginAndSignUpModal, setLoginAndSignUpModal] = useState(false)
    const [popupContent, setpopupContent] = useState(<FaRegBell />)
    const { toast } = useToast();
    const { ref, inView } = useInView();
    const [isComponentLoaded, setIsComponentLoaded] = useState(false);


    //User Authentication and Session Establishment
    async function CheckIfUserExistOnProfileDB() {
        try {
            const data: Profiles[] = await FetchUserProfile();
            console.log(data);
            if(data.length > 0){
                setSession(true)
                setCreateProfile(false)
            }else{
                setSession(false)
                setCreateProfile(true)
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    }


    useEffect(() => {
        // This effect runs only once when the component mounts
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user && user.emailVerified) {
                setIsComponentLoaded(true); // Trigger the profile check after authentication
            }else{
                setSession(false)
                setCreateProfile(false)
            }
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, []);



    useEffect(() => {
        if (isComponentLoaded) {
            // This effect runs when isComponentLoaded becomes true
            const checkUserProfile = async () => {
                try {
                    await CheckIfUserExistOnProfileDB();
                } catch (error) {
                    console.error("Error checking user profile:", error);
                }
            };

            checkUserProfile();
        }
    }, [isComponentLoaded]); // Dependency array includes isComponentLoaded




    const fetchPosts = async (initialFetch = false) => {
        if (!hasMore) return;

        setLoading(true);
        let q = query(collection(db, 'Posts'), orderBy('Post_Create_At', 'desc'), limit(2));

        if (!initialFetch && lastVisible) {
            q = query(collection(db, 'Posts'), orderBy('Post_Create_At', 'desc'), startAfter(lastVisible), limit(2));
        }

        const querySnapshot = await getDocs(q);
        const data: Post[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));

        if (initialFetch) {
            setPosts(data);
        } else {
            setPosts((prevPosts) => [...prevPosts, ...data]);
        }

        setLastVisible(querySnapshot.docs.length > 0 ? querySnapshot.docs[querySnapshot.docs.length - 1] : null);
        setHasMore(querySnapshot.docs.length === 2);
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts(true);
    }, []);

    useEffect(() => {
        if (inView && !loading) {
            fetchPosts();
        }
    }, [inView, loading]);


    const LikePost = () => {
        if(session){
    
            console.log("you just like a post")
        }else if(createProfile){
            alert("Update your profile first")
        }else{
            setLoginAndSignUpModal(true)
        }
    }


    
    const CommentOnPost = () => {
        if(session){
    
            console.log("You just commented on a post")
        }else if(createProfile){
            alert("Update your profile first")
        }else{
            setLoginAndSignUpModal(true)
        }
    }


    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} style={{ borderRadius: 12, padding: 16, marginBottom: 16 }} className="post-card-container w-full">
                    <div style={{ borderBottom: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p>{post.Post_Types}</p>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <AlertDialog>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <LuMoreHorizontal style={{ height: 28, width: 28, borderRadius: 14 }} className="hover:bg-gray-200" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem className="cursor-pointer" onClick={() => {
                                            toast({
                                                title: "Scheduled: Catch up",
                                                description: "Friday, February 10, 2023 at 5:57 PM",
                                                action: (
                                                    <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                                                ),
                                            });
                                        }}>
                                            <FaRegBell style={{ height: 24, width: 24 }} className="pr-2" />Turn on notifications for this post
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <AlertDialogTrigger className="flex" onClick={() => setpopupContent(<CgLink />)}>
                                                <CgLink style={{ height: 24, width: 24 }} className="pr-2" />Copy link to post
                                            </AlertDialogTrigger>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <AlertDialogTrigger className="flex" onClick={() => setpopupContent(<ImEmbed2 />)}>
                                                <ImEmbed2 style={{ height: 24, width: 24 }} className="pr-2" />Embed this post
                                            </AlertDialogTrigger>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <AlertDialogTrigger className="flex" onClick={() => setpopupContent(<BiHide />)}>
                                                <BiHide style={{ height: 24, width: 24 }} className="pr-2" />I don&apos;t want to see this
                                            </AlertDialogTrigger>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <AlertDialogTrigger className="flex" onClick={() => setpopupContent(<MdBlock />)}>
                                                <MdBlock style={{ height: 24, width: 24 }} className="pr-2" />Block {post.Author_Name}&apos;s profile
                                            </AlertDialogTrigger>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <AlertDialogTrigger className="flex" onClick={() => setpopupContent(<CiFlag1 />)}>
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
                        <div style={{ borderRadius: 28, display: 'flex', height: 56, width: 56 }}>
                            <Image src={post.Author_Profile_Picture} alt="Profile Picture" height={56} width={56} style={{ borderRadius: 28 }} />
                        </div>
                        <div className="flex flex-col flex-grow">
                            <p style={{ lineHeight: 1.2 }}><span style={{ fontSize: 15, fontWeight: 'bold', paddingLeft: 5 }}>{post.Author_Name}</span> <span style={{ fontSize: 15, color: 'gray' }}>{post.Author_Username}</span></p>
                            <p style={{ fontSize: 14, color: 'gray', paddingLeft: 5, lineHeight: 1.2 }}>{post.Author_Course} {post.Author_Academic_Status}, {post.Author_School}</p>
                            <p style={{ fontSize: 14, color: 'gray', paddingLeft: 5, lineHeight: 1.2 }}>{post.Author_Type_Of_Study} ({post.Author_Level})</p>
                        </div>
                        <ButtonWithIcon type="button" style="text-enabled-with-and-without-icon" stateLayer="text-enabled-with-icon-state-layer" icon={<FaPlus />} iconStyle="text-enabled-icon-styling" label="Follow" textWrapper="text-enabled-with-and-without-icon-text-wrapper" />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <p style={{ fontSize: 16, lineHeight: 1.3 }} className="post-description-text">{post.Post_Content}</p>
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Image src={post.Post_Media} alt="Uploaded picture" height={200} width={600} className="w-full" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                        <div>
                            <p style={{ fontSize: 12, cursor: 'pointer' }}>{post.Number_Of_Likes} Likes</p>
                        </div>
                        <div style={{ display: 'flex', gap: 15 }}>
                            <p style={{ fontSize: 12, cursor: 'pointer' }}>{post.Number_Of_Comments} Comments</p>
                            <p style={{ fontSize: 12, cursor: 'pointer' }}>{post.Number_Of_Shares} Shares</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                        <ChipsWithIcon icon={<FaRegThumbsUp style={{ height: 18, width: 18 }} />} label="Like" action = {LikePost}/>
                        <ChipsWithIcon icon={<FaRegCommentDots style={{ height: 18, width: 18 }} />} label="Comment" action ={CommentOnPost}/>
                        <ChipsWithIcon icon={<FaRegBookmark style={{ height: 18, width: 18 }} />} label="Save" />
                        <ChipsWithIcon icon={<FaRegShareFromSquare style={{ height: 18, width: 18 }} />} label="Share" />
                    </div>
                    {loginAndSignUpModal && 
                    <LoginAndSignupFormModal closeModal = {()=>{setLoginAndSignUpModal(false)}}/>
                    }
                </div>
            ))}
            <div ref={ref}>
                {loading && <p>Loading more posts...</p>}
                {!hasMore && <p>No more posts to load.</p>}
            </div>
        </div>
    );
};

export default InfiniteScroll;
