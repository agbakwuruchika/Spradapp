'use client'
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import SocialMediaPostCardTemplate from "./social-media-post-card-template";
import { db } from '@/firebase/config';
import { getDocs, collection, query, where, orderBy, updateDoc, doc } from 'firebase/firestore';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import ButtonWithIcon from "./button-with-icon";
  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card";
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"



const influencers = [
    {
        author: "Chika Agbakwuru",
        authorUsername: "@sixtusagba",
        authorStatus: "Student",
        authorCourse: "Philosophy",
        authorSchool: "abubakar tafawa balewa university",
        authorTypeOfStudy: "Undergraduate",
        authorLevel: "300 Level",
        authorProfilePics: "/chika-agbakwuru.jpg",
        authorID: 1

    },
    {
        author: "Chika Agbakwuru",
        authorUsername: "@sixtusagba",
        authorStatus: "Student",
        authorCourse: "Philosophy",
        authorSchool: "ahmadu bello university",
        authorTypeOfStudy: "Undergraduate",
        authorLevel: "300 Level",
        authorProfilePics: "/chika-agbakwuru.jpg",
        authorID: 2

    },
    {
        author: "Tobiloba Chika",
        authorUsername: "@tobiano",
        authorStatus: "Student",
        authorCourse: "Accounting",
        authorSchool: "obafemi awolowo university",
        authorTypeOfStudy: "Undergraduate",
        authorLevel: "300 Level",
        authorProfilePics: "/unilag logo.png",
        authorID: 3

    },
    {
        author: "Benjamin Lekki",
        authorUsername: "@benjamin_lekki",
        authorStatus: "Student",
        authorCourse: "Computer Science",
        authorSchool: "Imo State University",
        authorTypeOfStudy: "Undergraduate",
        authorLevel: "100 Level",
        authorProfilePics: "/benjamin.jpg",
        authorID: 4

    },
    {
        author: "David Adeleke",
        authorUsername: "@davido",
        authorStatus: "Aspirant",
        authorCourse: "Philosophy",
        authorSchool: "Covenant University",
        authorTypeOfStudy: "Undergraduate",
        authorLevel: "0 Level",
        authorProfilePics: "/davido.jpg",
        authorID: 5

    },
    {
        author: "Ini Edo",
        authorUsername: "@officialiniedo",
        authorStatus: "Student",
        authorCourse: "Master of Business Administration (MBA)",
        authorSchool: "University of Lagos",
        authorTypeOfStudy: "Postgraduate",
        authorLevel: "500 Level",
        authorProfilePics: "/ini-edo.png",
        authorID: 6

    }
]



async function FetchStateUniversities() {
    const q = query(collection(db, "Schools in Nigeria"), where("Ownership", "==", "state"), orderBy("Name", "asc"));
    const querySnapshot = await getDocs(q);
    const data:any = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}




async function FetchInfluencers(influencerSchool:any) {
    const q = query(collection(db, "Profiles"), where("School", "==", influencerSchool), orderBy("Followers", "desc"));
    const querySnapshot = await getDocs(q);
    const data:any = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}





interface School {
    id: string;
    Logo: string;
    Name: string;
    Description: string;
    Acronym: string;
    State: string;
    SchoolsInSameState?: string;
    Location: string;
    SchoolsInSameLocation?: string;
    Ownership: string;
    schoolsOfSameOwnership?: string;
    Year: number;
    Head: string;
    HeadPage?: string;
    Ranking: number;
    RankingPage?: string;
    Courses: number;
    CoursesPage?: string;
    LowestFee: number;
    FeesPage?: string;
    JambCutOffLowest: number;
    JambCutOffPage?: string;
    Hostel: string;
    HostelPage?: string;
    Capacity: number;
    CapacityPage?: string;
}



interface InfluencersToFollow {
    id: string;
    Course: string;
    Followers?: string;
    Level: number;
    Name: string;
    Picture: string;
    School: string;
    Status: string;
    Type?: string;
    Username: string;
}


export default function ListOfUniversitiesInNigeria(){
    const [stateUniversities, setStateUniversities] = useState<School[]>([]);
    const [schoolInfluencers, setSchoolInfluencers] = useState<InfluencersToFollow[]>([]);


    useEffect(()=>{
        async function fetchData() {
            const data: School[] = await FetchStateUniversities();
            const modifiedData = data.map(school => ({
                ...school,
                Name: school.Name.replace(/-/g, ' ')
            }));
            setStateUniversities(modifiedData);
        }
        fetchData()
    },[])


    const fetchInfluencersForSchool = async (influencerSchool:any) => {
        const influencers: InfluencersToFollow[] = await FetchInfluencers(influencerSchool);
        // Do something with influencers data
        const modifiedInfluencersData = influencers.map(influence =>({
            ...influence,
            Name: influence.Name.replace(/-/g, ' ')
        }))
        setSchoolInfluencers(modifiedInfluencersData)
        console.log("Influencers for school", influencerSchool, influencers);
    };

console.log(stateUniversities)
    return(
        <div>
            {stateUniversities.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
            <ol>
                {stateUniversities.map((school:any)=>{
                    return(
                        <AccordionItem key = {school.id} value = {school.id}>
                            <AccordionTrigger onClick={() => fetchInfluencersForSchool(school.Name)}>
                        <li className = "flex items-center gap-x-2 capitalize">
                            <Image src = {school.Logo} alt = {school.Name} width = {40} height = {40} />
                            {school.Name} <span className = "uppercase">({school.Acronym})</span>
                        </li>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p>{school.Description}</p>
                                <div className = "flex justify-start mt-2 gap-x-2">
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Acronym:</h3>
                                        <p className = "uppercase mt-0">{school.Acronym}</p>
                                        {school.SchoolPage &&
                                        <p>Learn more about <Link href = {school.SchoolPage} className = "uppercase text-blue-600">{school.Acronym}</Link></p>
                                        }
                                    </div>
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">State:</h3>
                                        <p className = "capitalize">{school.State}</p>
                                        {school.SchoolsInSameState &&
                                        <p>See <Link href = {school.SchoolsInSameState} className = "text-blue-600">List of Universities in <span className = "capitalize">{school.State}</span></Link></p>
                                        }
                                    </div>
                                </div>
                                <div className = "flex justify-start mt-2 gap-x-2">
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Location:</h3>
                                        <p className = "mt-0 capitalize">{school.Location}</p>
                                        {school.SchoolsInSameLocation &&
                                        <p>See <Link href = {school.SchoolsInSameLocation} className = "text-blue-600">List of Universities in <span className = "capitalize">{school.Location}</span></Link></p>
                                        }
                                    </div>
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Ownership:</h3>
                                        <p className = "capitalize">{school.Ownership}</p>
                                        {school.schoolsOfSameOwnership &&
                                        <p>See <Link href = {school.schoolsOfSameOwnership} className = "text-blue-600">List of <span className = "capitalize">{school.Ownership}</span> Universities in Nigeria</Link></p>
                                        }
                                    </div>
                                </div>
                                <div className = "flex justify-start mt-2 gap-x-2">
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Year Founded:</h3>
                                        <p className = "mt-0">{school.Year}</p>
                                        {school.SchoolPage &&
                                        <p>Learn more about <Link href = {school.SchoolPage} className = "text-blue-600"><span className = "uppercase">{school.Acronym}</span> History</Link></p>
                                        }
                                    </div>
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Vice Chancellor:</h3>
                                        <p className = "capitalize">{school.Head}</p>
                                        {school.HeadPage &&
                                        <p>Learn more about <Link href = {school.HeadPage} className = "text-blue-600"><span className = "uppercase">{school.Acronym}</span> VC</Link></p>
                                        }
                                    </div>
                                </div>
                                <div className = "flex justify-start mt-2 gap-x-2">
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Nigerian Ranking:</h3>
                                        <p className = "mt-0">{school.Ranking}</p>
                                        {school.RankingPage &&
                                        <p>Check <Link href = {school.RankingPage} className = "text-blue-600">University Ranking in Nigeria</Link> here</p>
                                        }
                                    </div>
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Number of Courses:</h3>
                                        <p>{school.Courses}</p>
                                        {school.CoursesPage &&
                                        <p>See full list of <Link href = {school.CoursesPage} className = "text-blue-600"><span className = "uppercase">{school.Acronym}</span> Courses</Link></p>
                                        }
                                    </div>
                                </div>
                                <div className = "flex justify-start mt-2 gap-x-2">
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">School Fees:</h3>
                                        <p className = "mt-0">{school.LowestFee}</p>
                                        {school.FeesPage &&
                                        <p>Learn more about <Link href = {school.FeesPage} className = "text-blue-600"><span className = "uppercase">{school.Acronym}</span> School Fees</Link></p>
                                        }
                                    </div>
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">JAMB Cut Off:</h3>
                                        <p>{school.JambCutOffLowest}</p>
                                        {school.JambCutOffPage &&
                                        <p>Check <Link href = {school.JambCutOffPage} className = "text-blue-600"><span className = "uppercase">{school.Acronym}</span> Cut Off Marks</Link> here</p>
                                        }
                                    </div>
                                </div>
                                <div className = "flex justify-start mt-2 gap-x-2">
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Hostel:</h3>
                                        <p className = "capitalize mt-0">{school.Hostel}</p>
                                        {school.HostelPage &&
                                        <p>Learn more about <Link href = {school.HostelPage} className = "text-blue-600"><span className = "uppercase">{school.Acronym}</span> Hostel</Link></p>
                                        }
                                    </div>
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Admission Capacity:</h3>
                                        <p>{school.Capacity}</p>
                                        {school.CapacityPage &&
                                        <p>Learn more about <Link href = {school.CapacityPage} className = "text-blue-600"><span className = "uppercase">{school.Acronym}</span> Admission Capacity</Link></p>
                                        }
                                    </div>
                                </div>
                                {schoolInfluencers.length > 0 &&
                                <div>
                                <Card className = "mt-4 shadcn-card">
                                    <CardHeader>
                                        <CardTitle>Follow To Connect With <span className = "uppercase">{school.Acronym}</span> Students/Aspirants</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                {schoolInfluencers.map((influencer)=>{
                    return(
                        <div key = {influencer.id} className = "flex mt-4 py-2 hover:bg-gray-200" style = {{gap:5}}>
                            <div style = {{borderRadius:20, display:"flex", height:40, width:40}}>
                                <Image src = {influencer.Picture} alt = "Profile Picture" height = {40} width = {40} style = {{borderRadius:20}}/>
                            </div>
                            <div className = "flex flex-col flex-grow">
                                <HoverCard>
                                    <HoverCardTrigger asChild>
                                        <p style = {{lineHeight:1.2}}><span style = {{fontSize:15, fontWeight:"bold", paddingLeft:5}}>{influencer.Name}</span> </p>
                                    </HoverCardTrigger>
                                    <HoverCardContent className = "w-80">
                                        <div className = "flex justify-between space-x-4">
                                            <div style = {{borderRadius:20, display:"flex", height:40, width:40}}>
                                                <Image src = {influencer.Picture} alt = "Profile Picture" height = {40} width = {40} style = {{borderRadius:20}}/>
                                            </div>
                                            <div className = "space-y-1">
                                                <p style = {{lineHeight:1.2}}><span style = {{fontSize:15, fontWeight:"bold", paddingLeft:5}}>{influencer.Name}</span> </p>
                                                <p style = {{lineHeight:1.2}}><span style = {{fontSize:15, color:"gray", paddingLeft:5}}>{influencer.Username}</span> </p>
                                            </div>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                                <p style = {{lineHeight:1.2}}><span style = {{fontSize:15, color:"gray", paddingLeft:5}}>{influencer.Username}</span> </p>
                            </div>
                            <ButtonWithIcon type = "button" style = "filled-enabled-with-and-without-icon" stateLayer = "filled-enabled-with-icon-state-layer" icon = {<FaPlus />} iconStyle = "filled-enabled-icon-styling" label = "Follow" textWrapper = "filled-enabled-with-and-without-icon-text-wrapper"/>
                        </div>
                        )
                })}
                <div style = {{marginTop:15}}>
                <Link href = "/#" style = {{color:"blue"}}>See more</Link>
                </div>
                                    </CardContent>
                                </Card>
                                </div>
                                }
                                <Card className = "flex flex-col justify-center mt-4 shadcn-card">
                                    <CardHeader>
                                        <CardTitle>Trending Posts on <span className = "uppercase">{school.Acronym}</span></CardTitle>
                                    </CardHeader>
                                    <CardContent className = "flex justify-center">
                                <Carousel className="md:w-full max-w-60 md:max-w-md">
                                    <CarouselContent>
                                        <CarouselItem>
                                        <div className="p-1">
             
                
                <SocialMediaPostCardTemplate reasonForShowing = "Suggested" author = "Tony Elumelu" authorUsername = "@telumelu" authorSchool = {school.Name} authorCourse = "Mass Communication" authorStatus = "Student" authorTypeOfStudy = "Undergraduate" authorProfilePics = "/chika-agbakwuru.jpg" postMedia = "/unilag-alumni.jpg" postLikes = {23} authorLevel = "200 Level" postDescription = "This picture was taken during the last General Meeting of UNILAG ALUMNI ASSOCIATION." comments = {45} shares = {81}/>
               
              
            </div>
                                            

                                        </CarouselItem>
                                        <CarouselItem>
                                        <div className="p-1">
                <SocialMediaPostCardTemplate reasonForShowing = "Suggested" author = "Tony Elumelu" authorUsername = "@telumelu" authorSchool = {school.Name}/>
            </div>
                                            

                                        </CarouselItem>
                                        <CarouselItem >
                                        <div className="p-1">
              
                <SocialMediaPostCardTemplate reasonForShowing = "Suggested" author = "Tony Elumelu" authorUsername = "@telumelu" authorSchool = {school.Name}/>
                
            </div>
                                            

                                        </CarouselItem>
                                        
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                                </CardContent>
                                </Card>
                                <Card className = "flex flex-col justify-center mt-4 shadcn-card">
                                    <CardHeader>
                                        <CardTitle><span className = "uppercase">{school.Acronym}</span> Latest News</CardTitle>
                                    </CardHeader>
                                    <CardContent className = "flex flex-col justify-center">
                                    <div className = "flex flex-col md:flex-row justify-start mt-2 gap-y-2 md:gap-x-2">
                                    <div className = "flex items-center p-3 rounded-xl border hover:bg-gray-200 md:basis-1/2 gap-x-2">
                                        <div className = "basis-1/2">
                                            <Link href = "/#">
                                            <Image src = "/unilag-alumni.jpg" alt = "News Title" height = {300} width = {500} className = "w-full"/>
                                            </Link>
                                        </div>
                                        <div>
                                            {school.SchoolPage &&
                                        <h3 className = "text-base font-medium"><Link href = {school.SchoolPage}>Learn more about <span className = "uppercase">{school.Acronym}</span> History</Link></h3>
                                        }
                                        </div>
                                    </div>
                                    <div className = "flex items-center p-3 rounded-xl border hover:bg-gray-200 md:basis-1/2 gap-x-2">
                                        <div className = "basis-1/2">
                                            <Link href = "/#">
                                            <Image src = "/unilag-alumni.jpg" alt = "News Title" height = {300} width = {500} className = "w-full"/>
                                            </Link>
                                        </div>
                                        <div>
                                            {school.SchoolPage &&
                                        <h3 className = "text-base font-medium"><Link href = {school.SchoolPage}>Learn more about <span className = "uppercase">{school.Acronym}</span> History</Link></h3>
                                        }
                                        </div>
                                    </div>
                                </div>
                                <div className = "flex flex-col md:flex-row justify-start mt-2 gap-y-2 md:gap-x-2">
                                    <div className = "flex items-center p-3 rounded-xl border hover:bg-gray-200 md:basis-1/2 gap-x-2">
                                        <div className = "basis-1/2">
                                            <Link href = "/#">
                                            <Image src = "/unilag-alumni.jpg" alt = "News Title" height = {300} width = {500} className = "w-full"/>
                                            </Link>
                                        </div>
                                        <div>
                                            {school.SchoolPage &&
                                        <h3 className = "text-base font-medium"><Link href = {school.SchoolPage}>Learn more about <span className = "uppercase">{school.Acronym}</span> History</Link></h3>
                                    }
                                        </div>
                                    </div>
                                    <div className = "flex items-center p-3 rounded-xl border hover:bg-gray-200 md:basis-1/2 gap-x-2">
                                        <div className = "basis-1/2">
                                            <Link href = "/#">
                                            <Image src = "/unilag-alumni.jpg" alt = "News Title" height = {300} width = {500} className = "w-full"/>
                                            </Link>
                                        </div>
                                        <div>
                                            {school.SchoolPage &&
                                        <h3 className = "text-base font-medium"><Link href = {school.SchoolPage}>Learn more about <span className = "uppercase">{school.Acronym}</span> History</Link></h3>
                                        }
                                        </div>
                                    </div>
                                </div>
                                
                                </CardContent>
                                </Card>

                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </ol>
            </Accordion>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}