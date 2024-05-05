"use client"
import React from "react";
import NavItem from "./nav-item";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ButtonWithIcon from "./button-with-icon";
import ButtonWithOutIcon from "./button-without-icon";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const navLinks = [
    {url:"/", imageName:"home.svg", altText:"Home Page", labelText:"Home", badgeText:"999+"},
    {url:"/trending-topics", imageName:"trending-topics.svg", altText:"Trending Topics Page", labelText:"Trending Topics", badgeText:"999+"},
    {url:"/events", imageName:"events.svg", altText:"Events Page", labelText:"Events", badgeText:"999+"},
    {url:"/groups", imageName:"groups.svg", altText:"Groups Page", labelText:"Groups", badgeText:"999+"},
    {url:"/profile", imageName:"profile.svg", altText:"Profile Page", labelText:"Profile", badgeText:"999+"}
]

const academicResources = [
    {url:"/library", imageName:"library.svg", altText:"Library Page", labelText:"Library", badgeText:"999+"},
    {url:"/tutorial", imageName:"tutorial.svg", altText:"Tutorial Page", labelText:"Tutorial", badgeText:"999+"},
    {url:"/quiz-cbt-practice", imageName:"quiz-cbt-practice.svg", altText:"Quiz / CBT Practice Page", labelText:"Quiz / CBT Practice", badgeText:"999+"}
]

const financialSupport = [
    {url:"/scholarships", imageName:"scholarships.svg", altText:"Scholarships Page", labelText:"Scholarships", badgeText:"999+"},
    {url:"/work-study", imageName:"work-study.svg", altText:"Work Study Page", labelText:"Work Study", badgeText:"999+"},
    {url:"/student-loan", imageName:"student-loan.svg", altText:"Student Loan Page", labelText:"Student Loan", badgeText:"999+"}
]

const schoolInformation = [
    {url:"/school-news", imageName:"school-news.svg", altText:"School News Page", labelText:"School News", badgeText:"999+"},
    {url:"/universities-in-nigeria", imageName:"universities-in-nigeria.svg", altText:"Universities in Nigeria Page", labelText:"Universities in Nigeria", badgeText:"999+"},
    {url:"/polytechnics-in-nigeria", imageName:"polytechnics-in-nigeria.svg", altText:"Polytechnics in Nigeria Page", labelText:"Polytechnics in Nigeria", badgeText:"999+"},
    {url:"/colleges-of-education-in-nigeria", imageName:"colleges-of-education-in-nigeria.svg", altText:"Colleges of Education in Nigeria Page", labelText:"Colleges of Education in Nigeria", badgeText:"999+"}
]

const examinations = [
    {url:"/jamb", imageName:"jamb.svg", altText:"JAMB Page", labelText:"JAMB", badgeText:"999+"},
    {url:"/waec", imageName:"waec.svg", altText:"WAEC Page", labelText:"WAEC", badgeText:"999+"},
    {url:"/gce", imageName:"gce.svg", altText:"GCE Page", labelText:"GCE", badgeText:"999+"},
    {url:"/nabteb", imageName:"nabteb.svg", altText:"NABTEB Page", labelText:"NABTEB", badgeText:"999+"},
    {url:"/neco", imageName:"neco.svg", altText:"NECO Page", labelText:"NECO", badgeText:"999+"},
    {url:"/jupeb", imageName:"jupeb.svg", altText:"JUPEB Page", labelText:"JUPEB", badgeText:"999+"},
    {url:"/ijmb", imageName:"ijmb.svg", altText:"IJMB Page", labelText:"IJMB", badgeText:"999+"},
    {url:"/igcse", imageName:"igcse.svg", altText:"IGCSE Page", labelText:"IGCSE", badgeText:"999+"},
    {url:"/ielts", imageName:"ielts.svg", altText:"IELTS Page", labelText:"IELTS", badgeText:"999+"},
    {url:"/pte", imageName:"pte.svg", altText:"PTE Page", labelText:"PTE", badgeText:"999+"},
    {url:"/toefl", imageName:"toefl.svg", altText:"TOEFL Page", labelText:"TOEFL", badgeText:"999+"},
    {url:"/sat", imageName:"sat.svg", altText:"SAT Page", labelText:"SAT", badgeText:"999+"},
    {url:"/gmat", imageName:"gmat.svg", altText:"GMAT Page", labelText:"GMAT", badgeText:"999+"},
    {url:"/gre", imageName:"gre.svg", altText:"GRE Page", labelText:"GRE", badgeText:"999+"}
]

const influencers = [
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
export default function SideSheets(){
    const pathname = usePathname();
    return(
        <div className = "">
            <div style = {{}} className = "side-sheets">
                <h2 className = "">Filter Home Feed By:</h2>
                <div style = {{display:"flex", gap:5, marginBottom:5, marginTop:10}}>
                    <input type = "radio" id = "bySchool" name = "filterOption" value = "By School" />
                    <label htmlFor="bySchool" className = "radio-button-label">School</label>
                </div>
                <div style = {{display:"flex", gap:5, marginBottom:5}}>
                    <input type = "radio" id = "byExam" name = "filterOption" value = "By Exam" />
                    <label htmlFor="byExam" className = "radio-button-label">Exam</label>
                </div>
                <div style = {{display:"flex", gap:5, marginBottom:5}}>
                    <input type = "radio" id = "byGroup" name = "filterOption" value = "By Group" />
                    <label htmlFor="byGroup" className = "radio-button-label">Group</label>
                </div>
                <div style = {{display:"flex", gap:5}}>
                    <input type = "radio" id = "byEvent" name = "filterOption" value = "By Event" />
                    <label htmlFor="byEvent" className = "radio-button-label">Event</label>
                </div>
                <div className = "hidden">
                <div style = {{display:"flex", gap:5}}>
                <input type = "radio" id = "allSchools" name = "selectSchool" value = "All Schools" />
                <label htmlFor="allSchools" className = "radio-button-label">All Schools</label>
                </div>
                <div style = {{display:"flex", gap:5}}>
                <input type = "radio" id = "specificSchools" name = "selectSchool" value = "Specific Schools" />
                <label htmlFor="specificSchools" className = "radio-button-label">Specific Schools</label>
                </div>
                </div>
            </div>
            <div style = {{}} className = "side-sheets mt-4">
                <h2 className = "text-centr">Who To Follow:</h2>
                {influencers.map((influencer)=>{
                    return(
                        <div key = {influencer.authorID} className = "flex mt-4 hover:bg-gray-100 hover:py-2" style = {{gap:5}}>
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
                            <ButtonWithIcon type = "button" style = "text-enabled-with-and-without-icon" stateLayer = "text-enabled-with-icon-state-layer" icon = {<FaPlus />} iconStyle = "text-enabled-icon-styling" label = "Follow" textWrapper = "text-enabled-with-and-without-icon-text-wrapper"/>
                        </div>
                        )
                })}
                <div style = {{marginTop:15}}>
                <Link href = "/#" style = {{color:"blue"}}>See more</Link>
                </div>
                <div className = "hidden">
                <div style = {{display:"flex", gap:5}}>
                <input type = "radio" id = "allSchools" name = "selectSchool" value = "All Schools" />
                <label htmlFor="allSchools" className = "radio-button-label">All Schools</label>
                </div>
                <div style = {{display:"flex", gap:5}}>
                <input type = "radio" id = "specificSchools" name = "selectSchool" value = "Specific Schools" />
                <label htmlFor="specificSchools" className = "radio-button-label">Specific Schools</label>
                </div>
                </div>
            </div>
            <div style = {{}} className = "side-sheets mt-4">
                <h2 className = "">Filter Home Feed By:</h2>
                <div style = {{display:"flex", gap:5, marginBottom:5, marginTop:10}}>
                    <input type = "radio" id = "bySchool" name = "filterOption" value = "By School" />
                    <label htmlFor="bySchool" className = "radio-button-label">School</label>
                </div>
                <div style = {{display:"flex", gap:5, marginBottom:5}}>
                    <input type = "radio" id = "byExam" name = "filterOption" value = "By Exam" />
                    <label htmlFor="byExam" className = "radio-button-label">Exam</label>
                </div>
                <div style = {{display:"flex", gap:5, marginBottom:5}}>
                    <input type = "radio" id = "byGroup" name = "filterOption" value = "By Group" />
                    <label htmlFor="byGroup" className = "radio-button-label">Group</label>
                </div>
                <div style = {{display:"flex", gap:5}}>
                    <input type = "radio" id = "byEvent" name = "filterOption" value = "By Event" />
                    <label htmlFor="byEvent" className = "radio-button-label">Event</label>
                </div>
                <div className = "hidden">
                <div style = {{display:"flex", gap:5}}>
                <input type = "radio" id = "allSchools" name = "selectSchool" value = "All Schools" />
                <label htmlFor="allSchools" className = "radio-button-label">All Schools</label>
                </div>
                <div style = {{display:"flex", gap:5}}>
                <input type = "radio" id = "specificSchools" name = "selectSchool" value = "Specific Schools" />
                <label htmlFor="specificSchools" className = "radio-button-label">Specific Schools</label>
                </div>
                </div>
            </div>
            
            <h1 className = "text-center">University of Lagos (UNILAG)</h1>
                <Link href = "/"><ButtonWithIcon type = "button" style = "filled-enabled-with-and-without-icon" stateLayer = "filled-enabled-with-icon-state-layer" icon = {<FaPlus />} iconStyle = "filled-enabled-icon-styling" label = "Add To Cart" textWrapper = "filled-enabled-with-and-without-icon-text-wrapper"/></Link>
                <Link href = "/"><ButtonWithIcon type = "button" style = "filled-disabled-with-and-without-icon" stateLayer = "filled-disabled-with-icon-state-layer" icon = {<FaPlus />} iconStyle = "filled-disabled-icon-styling" label = "Add To Cart" textWrapper = "filled-disabled-with-and-without-icon-text-wrapper"/></Link>
                <Link href = "/"><ButtonWithOutIcon type = "button" style = "filled-enabled-with-and-without-icon" stateLayer = "filled-enabled-without-icon-state-layer" label = "Add To Cart" textWrapper = "filled-enabled-with-and-without-icon-text-wrapper"/></Link>  
                <Link href = "/"><ButtonWithOutIcon type = "button" style = "filled-disabled-with-and-without-icon" stateLayer = "filled-disabled-without-icon-state-layer" label = "Add To Cart" textWrapper = "filled-disabled-with-and-without-icon-text-wrapper"/></Link>
                <Link href = "/"><ButtonWithIcon type = "button" style = "elevated-enabled-with-and-without-icon" stateLayer = "elevated-enabled-with-icon-state-layer" icon = {<FaPlus />} iconStyle = "elevated-enabled-icon-styling" label = "Add To Cart" textWrapper = "elevated-enabled-with-and-without-icon-text-wrapper"/></Link>
                <Link href = "/"><ButtonWithIcon type = "button" style = "elevated-disabled-with-and-without-icon" stateLayer = "elevated-disabled-with-icon-state-layer" icon = {<FaPlus />} iconStyle = "elevated-disabled-icon-styling" label = "Add To Cart" textWrapper = "elevated-disabled-with-and-without-icon-text-wrapper"/></Link>
                <Link href = "/"><ButtonWithOutIcon type = "button" style = "elevated-enabled-with-and-without-icon" stateLayer = "elevated-enabled-without-icon-state-layer" label = "Add To Cart" textWrapper = "elevated-enabled-with-and-without-icon-text-wrapper"/></Link>
                <Link href = "/"><ButtonWithOutIcon type = "button" style = "elevated-disabled-with-and-without-icon" stateLayer = "elevated-disabled-without-icon-state-layer" label = "Add To Cart" textWrapper = "elevated-disabled-with-and-without-icon-text-wrapper"/></Link>
                <Link href = "/"><ButtonWithIcon type = "button" style = "outlined-enabled-with-and-without-icon" stateLayer = "outlined-enabled-with-icon-state-layer" icon = {<FaPlus />} iconStyle = "outlined-enabled-icon-styling" label = "Add To Cart" textWrapper = "outlined-enabled-with-and-without-icon-text-wrapper"/></Link>
                <Link href = "/"><ButtonWithIcon type = "button" style = "outlined-disabled-with-and-without-icon" stateLayer = "outlined-disabled-with-icon-state-layer" icon = {<FaPlus />} iconStyle = "outlined-disabled-icon-styling" label = "Add To Cart" textWrapper = "outlined-disabled-with-and-without-icon-text-wrapper"/></Link>
                <Link href = "/"><ButtonWithOutIcon type = "button" style = "outlined-enabled-with-and-without-icon" stateLayer = "outlined-enabled-without-icon-state-layer" label = "Add To Cart" textWrapper = "outlined-enabled-with-and-without-icon-text-wrapper"/></Link>
                <Link href = "/"><ButtonWithOutIcon type = "button" style = "outlined-disabled-with-and-without-icon" stateLayer = "outlined-disabled-without-icon-state-layer" label = "Add To Cart" textWrapper = "outlined-disabled-with-and-without-icon-text-wrapper"/></Link>
                <Link href = "/"><ButtonWithIcon type = "button" style = "tonal-enabled-with-and-without-icon" stateLayer = "tonal-enabled-with-icon-state-layer" icon = {<FaPlus />} iconStyle = "tonal-enabled-icon-styling" label = "Add To Cart" textWrapper = "tonal-enabled-with-and-without-icon-text-wrapper"/></Link>
                <Link href = "/"><ButtonWithIcon type = "button" style = "tonal-disabled-with-and-without-icon" stateLayer = "tonal-disabled-with-icon-state-layer" icon = {<FaPlus />} iconStyle = "tonal-disabled-icon-styling" label = "Add To Cart" textWrapper = "tonal-disabled-with-and-without-icon-text-wrapper"/></Link>
                <Link href = "/"><ButtonWithOutIcon type = "button" style = "tonal-enabled-with-and-without-icon" stateLayer = "tonal-enabled-without-icon-state-layer" label = "Add To Cart" textWrapper = "tonal-enabled-with-and-without-icon-text-wrapper"/></Link>
                <Link href = "/"><ButtonWithOutIcon type = "button" style = "tonal-disabled-with-and-without-icon" stateLayer = "tonal-disabled-without-icon-state-layer" label = "Add To Cart" textWrapper = "tonal-disabled-with-and-without-icon-text-wrapper"/></Link>
                <Link href = "/"><ButtonWithIcon type = "button" style = "text-enabled-with-and-without-icon" stateLayer = "text-enabled-with-icon-state-layer" icon = {<FaPlus />} iconStyle = "text-enabled-icon-styling" label = "Add To Cart" textWrapper = "text-enabled-with-and-without-icon-text-wrapper"/></Link>
                <Link href = "/"><ButtonWithIcon type = "button" style = "text-disabled-with-and-without-icon" stateLayer = "text-disabled-with-icon-state-layer" icon = {<FaPlus />} iconStyle = "text-disabled-icon-styling" label = "Add To Cart" textWrapper = "text-disabled-with-and-without-icon-text-wrapper"/></Link>
                <Link href = "/"><ButtonWithOutIcon type = "button" style = "text-enabled-with-and-without-icon" stateLayer = "text-enabled-without-icon-state-layer" label = "Add To Cart" textWrapper = "text-enabled-with-and-without-icon-text-wrapper"/></Link>
                <Link href = "/"><ButtonWithOutIcon type = "button" style = "text-disabled-with-and-without-icon" stateLayer = "text-disabled-without-icon-state-layer" label = "Add To Cart" textWrapper = "text-disabled-with-and-without-icon-text-wrapper"/></Link>
            
            <p>Examinations</p>
            {examinations.map((link)=>{
                const isActive = pathname.endsWith(link.url)
            return(
                <Link key = {link.url} href = {link.url}><NavItem stateLayerClass = {isActive ? "active-enabled-state-layer":"inactive-enabled-state-layer"} name = {link.imageName} alt = {link.altText} label = {link.labelText} badge = {link.badgeText}/></Link>
            )
})}
            
        </div>
    )
}