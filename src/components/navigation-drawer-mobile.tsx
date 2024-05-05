"use client"
import React from "react";
import NavItemMobile from "./nav-item-mobile";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    {url:"/scholarship-opportunities", imageName:"scholarships.svg", altText:"Scholarships Page", labelText:"Scholarship Opportunities", badgeText:"999+"},
    {url:"/online-jobs-for-students", imageName:"work-study.svg", altText:"Online Jobs for Students Page", labelText:"Online Jobs for Students", badgeText:"999+"},
    {url:"/student-loan-in-nigeria", imageName:"student-loan.svg", altText:"Student Loan Page", labelText:"Student Loan", badgeText:"999+"}
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
export default function NavigationDrawerMobile(){
    const pathname = usePathname();
    return(
        <div className = "navigation-drawer-mobile">
            <p>Social Feeds</p>
            {navLinks.map((link)=>{
                const isActive = pathname.endsWith(link.url)
            return(
                <Link key = {link.url} href = {link.url}><NavItemMobile stateLayerClass = {isActive ? "active-enabled-state-layer":"inactive-enabled-state-layer"} name = {link.imageName} alt = {link.altText} label = {link.labelText} badge = {link.badgeText}/></Link>
            )
})}
            <p>Academic Resources</p>
            {academicResources.map((link)=>{
                const isActive = pathname.endsWith(link.url)
            return(
                <Link key = {link.url} href = {link.url}><NavItemMobile stateLayerClass = {isActive ? "active-enabled-state-layer":"inactive-enabled-state-layer"} name = {link.imageName} alt = {link.altText} label = {link.labelText} badge = {link.badgeText}/></Link>
            )
})}
            <p>Financial Support</p>
            {financialSupport.map((link)=>{
                const isActive = pathname.endsWith(link.url)
            return(
                <Link key = {link.url} href = {link.url}><NavItemMobile stateLayerClass = {isActive ? "active-enabled-state-layer":"inactive-enabled-state-layer"} name = {link.imageName} alt = {link.altText} label = {link.labelText} badge = {link.badgeText}/></Link>
            )
})}
            <p>School Information</p>
            {schoolInformation.map((link)=>{
                const isActive = pathname.endsWith(link.url)
            return(
                <Link key = {link.url} href = {link.url}><NavItemMobile stateLayerClass = {isActive ? "active-enabled-state-layer":"inactive-enabled-state-layer"} name = {link.imageName} alt = {link.altText} label = {link.labelText} badge = {link.badgeText}/></Link>
            )
})}
            <p>Examinations</p>
            {examinations.map((link)=>{
                const isActive = pathname.endsWith(link.url)
            return(
                <Link key = {link.url} href = {link.url}><NavItemMobile stateLayerClass = {isActive ? "active-enabled-state-layer":"inactive-enabled-state-layer"} name = {link.imageName} alt = {link.altText} label = {link.labelText} badge = {link.badgeText}/></Link>
            )
})}
            </div>
    )
}