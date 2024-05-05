"use client"
import React from "react";
import ButtonWithIcon from "./button-with-icon";
import ButtonWithOutIcon from "./button-without-icon";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { BiMenu } from "react-icons/bi";
import Image from "next/image";
import { MdMoreVert } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { LiaUserCircleSolid } from "react-icons/lia";
import NavigationDrawerMobile from "./navigation-drawer-mobile";
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
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
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
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar";




export default function TopAppBar(props: any) {
    const [session, setSession] = useState(false)
    const surface = "#FBF8FD"
    const surfaceContainer = "#F0EDF1"
    const [screenSize, setScreenSize] = useState(0);
    const [bgColor, setBgColor] = useState(surface)
    const changeBgColor = () => {
        setBgColor(surfaceContainer)
    }
    const noChangeBgColor = () => {
        setBgColor(surface)
    }

    useEffect(()=>{
        const handleResize = () =>{
            setScreenSize(window.innerWidth)
        }
        handleResize();
        window.addEventListener("scroll", changeBgColor)
        window.addEventListener("scrollend", noChangeBgColor)

    },[])
    {session && console.log(session)}
    return (
        
        
        <div className="top-app-bar-container w-full h-16 px-4 flex items-center sticky top-0 z-50" style={{ backgroundColor: bgColor, gap: 12 }}>
            {screenSize < 700 &&
                <Sheet>
                    <SheetTrigger>
                        <BiMenu style={{ width: 30, height: 30 }} />
                    </SheetTrigger>
                    <SheetContent side = "left" className = "w-9/12 px-0">
                        <NavigationDrawerMobile />
                    </SheetContent>
                </Sheet>
            }
            <Link href="/">
                <Image src="/spradapp-logo-cropped.png" alt="Logo" width={40} height={40} />
            </Link>
            <div className="flex-grow" style={{ display: "flex", justifyContent: "center" }}>
                {screenSize > 700 &&
                    <div className="top-search-bar-container px-4" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 48, width: 450, borderRadius: 28, gap: 12 }}>

                        <FcSearch style={{ height: 30, width: 30 }} />
                        <input type="search" placeholder="search" className="w-full top-search-bar" style={{ height: 40 }} />

                    </div>
                }
            </div>
            {screenSize > 700 &&
                <AlertDialog>
                    <AlertDialogTrigger>
                        <ButtonWithIcon type="button" style="tonal-enabled-with-and-without-icon" stateLayer="tonal-enabled-with-icon-state-layer" icon={<FaPlus />} iconStyle="tonal-enabled-icon-styling" label="Add Post" textWrapper="tonal-enabled-with-and-without-icon-text-wrapper" toggle="modal" target="#loginModal" tabindex="-1" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogDescription>
                                {session &&
                                <h2>Write you post here</h2>
                                
                                }
                                {!session &&
                                <h2>Login First</h2>
                                }

                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Close</AlertDialogCancel>
                        </AlertDialogFooter>

                    </AlertDialogContent>
                </AlertDialog>
            }
            
            <div>
                {!session &&
                <AlertDialog>
                    <AlertDialogTrigger>
                        <ButtonWithOutIcon type="button" style="filled-enabled-with-and-without-icon" stateLayer="filled-enabled-without-icon-state-layer" label="Login" textWrapper="filled-enabled-with-and-without-icon-text-wrapper" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogDescription>
                                <Tabs defaultValue="login" className="w-[400px]">
                                    <TabsList>
                                        <TabsTrigger value="login">Login To Already Existing Account</TabsTrigger>
                                        <TabsTrigger value="register">Create a New Account</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="login">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Login Here</CardTitle>
                                                <CardDescription>
                                                    Make changes to your account here. Click save when you are done.
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-2">
                                                <div className="space-y-1">
                                                    <Label htmlFor="name">Name</Label>
                                                    <Input id="name" defaultValue="Pedro Duarte" />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor="username">Username</Label>
                                                    <Input id="username" defaultValue="@peduarte" />
                                                </div>
                                            </CardContent>
                                            <CardFooter>
                                                <Button>Save changes</Button>
                                            </CardFooter>
                                        </Card>

                                    </TabsContent>
                                    <TabsContent value="register">
                                        <h2>Sign up Form Goes Here</h2>
                                    </TabsContent>

                                </Tabs>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                }
                </div>
            
            {screenSize < 700 &&
                <div>
                {session &&
                    <FaPlusCircle style={{ height: 30, width: 30 }} className="block md:hidden" />
                }
                </div>
            }
            {session &&
            <DropdownMenu>
                <DropdownMenuTrigger>
            <Avatar className = "p-0 bg-transparent hover:bg-gray-200" style = {{height:30, width:30}}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" height = {30} width = {30}/>
      <AvatarFallback className = "bg-transparent">
      <LiaUserCircleSolid className = "w-full" style = {{height:30, width:30}}/>
        </AvatarFallback>
    </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        <DropdownMenuItem>Edit Profile</DropdownMenuItem>
        <DropdownMenuItem>
            <ButtonWithOutIcon label = "Log Out" action = {()=>{setSession(false)}}/>
        </DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>
    }

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MdMoreVert style={{ width: 30, height: 30, borderRadius:15 }} className = "hover:bg-gray-200"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Quick Links</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link href = "/about">About</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href = "/advertise">Advertise</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href = "/help">Help Center</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href = "/tos">Terms of Service</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href = "/privacy-policy">Privacy Policy</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href = "/cookie-policy">Cookie Policy</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href = "/accessibility">Accessibility</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href = "/career">Career</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href = "/contact">Contact</Link></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}