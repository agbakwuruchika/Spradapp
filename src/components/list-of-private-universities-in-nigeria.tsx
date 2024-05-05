import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import SocialMediaPostCardTemplate from "./social-media-post-card-template";
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




const privateUniversities = [
    {
        name: "Achievers University Owo (AUO)",
        about: "Achievers University Owo (AUO) is a private Nigerian institution founded in 2007. Situated in Owo, Ondo State, it focuses on providing quality education in various disciplines, promoting research, and fostering character development among students",
        abbreviation: "AUO",
        logo: "/auo_logo.png",
        page: "/achievers-university-owo",
        state: "Ondo",
        yearFounded: "2007",
        schoolsInStateUrl: "/universities-in-ondo-state",
        location: "Owo",
        schoolsInLocationUrl: "/universities-in-owo",
        ownership: "Private",
        schoolsOfSameOwnershipUrl: "/private-universities-in-nigeria",
        vc: "Samuel Olabanji Aje",
        aboutVcUrl: "/achievers-university-vc",
        ranking: "94th",
        schoolsRankingUrl: "/university-ranking-in-nigeria",
        numberOfCourses: 47,
        listOfCoursesUrl: "/achievers-university-courses",
        fees: "400k - 1.250m",
        feesURL: "/achievers-university-school-fees",
        jambCutOff: 140,
        jambCutOffUrl: "/achievers-university-cut-off-mark",
        hostel: "Yes",
        hostelUrl: "/achievers-university-hostel",
        admissionCapacity: "800",
        admissionCapacityUrl: "/achievers-university-admission-capacity",
        ID: "auo001",
        hashtagID: "#auo001"

    },
    {
        name: "Adeleke University (AU), Ede",
        about: "Adeleke University in Ede,  Osun State, Nigeria, is a vibrant institution dedicated to quality education, research, and character formation. With a focus on holistic development, it offers diverse academic programs and a conducive learning environment.",
        abbreviation: "AU",
        logo: "/au-logo.jpg",
        page: "/adeleke-university-ede",
        state: "Osun",
        yearFounded: "1962",
        schoolsInStateUrl: "/universities-in-osun-state",
        location: "Ede",
        schoolsInLocationUrl: "/universities-in-ede",
        ownership: "Private",
        schoolsOfSameOwnershipUrl: "/private-universities-in-nigeria",
        vc: "Solomon Ajayi Adebola",
        aboutVcUrl: "/adeleke-university-vc",
        ranking: "70th",
        schoolsRankingUrl: "/university-ranking-in-nigeria",
        numberOfCourses: 40,
        listOfCoursesUrl: "/adeleke-university-courses",
        fees: "1M - 2.1M",
        feesURL: "/adeleke-university-school-fees",
        jambCutOff: 160,
        jambCutOffUrl: "/adeleke-university-cut-off-mark",
        hostel: "Yes",
        hostelUrl: "/adeleke-university-hostel",
        admissionCapacity: "1.2k",
        admissionCapacityUrl: "/adeleke-university-admission-capacity",
        ID: "au002",
        hashtagID: "#au002"
    },
    
]


const privateInfluencers = [
    {
        author: "Chika Agbakwuru",
        authorUsername: "@sixtusagba",
        authorStatus: "Student",
        authorCourse: "Philosophy",
        authorSchool: "University of Lagos",
        authorTypeOfStudy: "Undergraduate",
        authorLevel: "300 Level",
        authorProfilePics: "/chika-agbakwuru.jpg",
        authorID: 1

    },
    {
        author: "Tobiloba Chika",
        authorUsername: "@tobiano",
        authorStatus: "Student",
        authorCourse: "Accounting",
        authorSchool: "Obafemi Awolowo University",
        authorTypeOfStudy: "Undergraduate",
        authorLevel: "300 Level",
        authorProfilePics: "/unilag logo.png",
        authorID: 2

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
        authorID: 3

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
        authorID: 4

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
        authorID: 5

    }
]


export default function ListOfPrivateUniversitiesInNigeria(){
    return(
        <div>
            <Accordion type="single" collapsible className="w-full">
            <ol>
                {privateUniversities.map((school)=>{
                    return(
                        <AccordionItem key = {school.ID} value = {school.ID}>
                            <AccordionTrigger>
                        <li className = "flex items-center gap-x-2">
                            <Image src = {school.logo} alt = {school.name} width = {40} height = {40} />
                            {school.name}
                        </li>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p>{school.about}</p>
                                <div className = "flex justify-start mt-2 gap-x-2">
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Abbreviation:</h3>
                                        <p className = "mt-0">{school.abbreviation}</p>
                                        <p>Learn more about <Link href = {school.page} className = "text-blue-600">{school.abbreviation}</Link></p>
                                    </div>
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">State:</h3>
                                        <p>{school.state}</p>
                                        <p>See <Link href = {school.schoolsInStateUrl} className = "text-blue-600">List of Universities in {school.state}</Link></p>
                                    </div>
                                </div>
                                <div className = "flex justify-start mt-2 gap-x-2">
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Location:</h3>
                                        <p className = "mt-0">{school.location}</p>
                                        <p>See <Link href = {school.schoolsInLocationUrl} className = "text-blue-600">List of Universities in {school.location}</Link></p>
                                    </div>
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Ownership:</h3>
                                        <p>{school.ownership}</p>
                                        <p>See <Link href = {school.schoolsOfSameOwnershipUrl} className = "text-blue-600">List of {school.ownership} Universities in Nigeria</Link></p>
                                    </div>
                                </div>
                                <div className = "flex justify-start mt-2 gap-x-2">
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Year Founded:</h3>
                                        <p className = "mt-0">{school.yearFounded}</p>
                                        <p>Learn more about <Link href = {school.page} className = "text-blue-600">{school.abbreviation} History</Link></p>
                                    </div>
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Vice Chancellor:</h3>
                                        <p>{school.vc}</p>
                                        <p>Learn more about <Link href = {school.aboutVcUrl} className = "text-blue-600">{school.abbreviation} VC</Link></p>
                                    </div>
                                </div>
                                <div className = "flex justify-start mt-2 gap-x-2">
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Nigerian Ranking:</h3>
                                        <p className = "mt-0">{school.ranking}</p>
                                        <p>Check <Link href = {school.schoolsRankingUrl} className = "text-blue-600">University Ranking in Nigeria</Link> here</p>
                                    </div>
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Number of Courses:</h3>
                                        <p>{school.numberOfCourses}</p>
                                        <p>See full list of <Link href = {school.listOfCoursesUrl} className = "text-blue-600">{school.abbreviation} Courses</Link></p>
                                    </div>
                                </div>
                                <div className = "flex justify-start mt-2 gap-x-2">
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">School Fees:</h3>
                                        <p className = "mt-0">{school.fees}</p>
                                        <p>Learn more about <Link href = {school.feesURL} className = "text-blue-600">{school.abbreviation} School Fees</Link></p>
                                    </div>
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">JAMB Cut Off:</h3>
                                        <p>{school.jambCutOff}</p>
                                        <p>Check <Link href = {school.jambCutOffUrl} className = "text-blue-600">{school.abbreviation} Cut Off Marks</Link> here</p>
                                    </div>
                                </div>
                                <div className = "flex justify-start mt-2 gap-x-2">
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Hostel:</h3>
                                        <p className = "mt-0">{school.hostel}</p>
                                        <p>Learn more about <Link href = {school.hostelUrl} className = "text-blue-600">{school.abbreviation} Hostel</Link></p>
                                    </div>
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Admission Capacity:</h3>
                                        <p>{school.admissionCapacity}</p>
                                        <p>Learn more about <Link href = {school.admissionCapacityUrl} className = "text-blue-600">{school.abbreviation} Admission Capacity</Link></p>
                                    </div>
                                </div>
                                <div>
                                <Card className = "mt-4 shadcn-card">
                                    <CardHeader>
                                        <CardTitle>Follow To Connect With {school.abbreviation} Students/Aspirants</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                {privateInfluencers.map((influencer)=>{
                    return(
                        <div key = {influencer.authorID} className = "flex mt-4 py-2 hover:bg-gray-200" style = {{gap:5}}>
                            <div style = {{borderRadius:20, display:"flex", height:40, width:40}}>
                                <Image src = {influencer.authorProfilePics} alt = "Profile Picture" height = {40} width = {40} style = {{borderRadius:20}}/>
                            </div>
                            <div className = "flex flex-col flex-grow">
                                <HoverCard>
                                    <HoverCardTrigger asChild>
                                        <p style = {{lineHeight:1.2}}><span style = {{fontSize:15, fontWeight:"bold", paddingLeft:5}}>{influencer.author}</span> </p>
                                    </HoverCardTrigger>
                                    <HoverCardContent className = "w-80">
                                        <div className = "flex justify-between space-x-4">
                                            <div style = {{borderRadius:20, display:"flex", height:40, width:40}}>
                                                <Image src = {influencer.authorProfilePics} alt = "Profile Picture" height = {40} width = {40} style = {{borderRadius:20}}/>
                                            </div>
                                            <div className = "space-y-1">
                                                <p style = {{lineHeight:1.2}}><span style = {{fontSize:15, fontWeight:"bold", paddingLeft:5}}>{influencer.author}</span> </p>
                                                <p style = {{lineHeight:1.2}}><span style = {{fontSize:15, color:"gray", paddingLeft:5}}>{influencer.authorUsername}</span> </p>
                                            </div>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                                <p style = {{lineHeight:1.2}}><span style = {{fontSize:15, color:"gray", paddingLeft:5}}>{influencer.authorUsername}</span> </p>
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
                                <Card className = "flex flex-col justify-center mt-4 shadcn-card">
                                    <CardHeader>
                                        <CardTitle>Trending Posts on {school.abbreviation}</CardTitle>
                                    </CardHeader>
                                    <CardContent className = "flex justify-center">
                                <Carousel className="md:w-full max-w-60 md:max-w-md">
                                    <CarouselContent>
                                        <CarouselItem>
                                        <div className="p-1">
             
                
                <SocialMediaPostCardTemplate reasonForShowing = "Suggested" author = "Tony Elumelu" authorUsername = "@telumelu" authorSchool = {school.name} authorCourse = "Mass Communication" authorStatus = "Student" authorTypeOfStudy = "Undergraduate" authorProfilePics = "/chika-agbakwuru.jpg" postMedia = "/unilag-alumni.jpg" postLikes = {23} authorLevel = "200 Level" postDescription = "This picture was taken during the last General Meeting of UNILAG ALUMNI ASSOCIATION." comments = {45} shares = {81}/>
               
              
            </div>
                                            

                                        </CarouselItem>
                                        <CarouselItem>
                                        <div className="p-1">
                <SocialMediaPostCardTemplate reasonForShowing = "Suggested" author = "Tony Elumelu" authorUsername = "@telumelu" authorSchool = {school.name}/>
            </div>
                                            

                                        </CarouselItem>
                                        <CarouselItem >
                                        <div className="p-1">
              
                <SocialMediaPostCardTemplate reasonForShowing = "Suggested" author = "Tony Elumelu" authorUsername = "@telumelu" authorSchool = {school.name}/>
                
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
                                        <CardTitle>{school.abbreviation} Latest News</CardTitle>
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
                                        <h3 className = "text-base font-medium"><Link href = {school.page}>Learn more about {school.abbreviation} History</Link></h3>
                                        </div>
                                    </div>
                                    <div className = "flex items-center p-3 rounded-xl border hover:bg-gray-200 md:basis-1/2 gap-x-2">
                                        <div className = "basis-1/2">
                                            <Link href = "/#">
                                            <Image src = "/unilag-alumni.jpg" alt = "News Title" height = {300} width = {500} className = "w-full"/>
                                            </Link>
                                        </div>
                                        <div>
                                        <h3 className = "text-base font-medium"><Link href = {school.page}>Learn more about {school.abbreviation} History</Link></h3>
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
                                        <h3 className = "text-base font-medium"><Link href = {school.page}>Learn more about {school.abbreviation} History</Link></h3>
                                        </div>
                                    </div>
                                    <div className = "flex items-center p-3 rounded-xl border hover:bg-gray-200 md:basis-1/2 gap-x-2">
                                        <div className = "basis-1/2">
                                            <Link href = "/#">
                                            <Image src = "/unilag-alumni.jpg" alt = "News Title" height = {300} width = {500} className = "w-full"/>
                                            </Link>
                                        </div>
                                        <div>
                                        <h3 className = "text-base font-medium"><Link href = {school.page}>Learn more about {school.abbreviation} History</Link></h3>
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
        </div>
    )
}