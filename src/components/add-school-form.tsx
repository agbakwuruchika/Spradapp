'use client'
import React from "react";
import ButtonWithOutIcon from "./button-without-icon";
import { FormEvent } from "react";
import {z, ZodType} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'


type  addSchoolFormData = {
    nameOfSchool: string;
    aboutSchool: string;
    abbreviation: string;
    schoolLogoUrl: string;
    schoolPageUrl: string;
    stateLocated: string;
    yearFounded: number;
    schoolsInSameStateUrl: string;
    areaLocated: string;
    schoolsInSameAreaUrl: string;
    ownership: string;
    vc: string;
}


const addSchoolSchema: ZodType<addSchoolFormData> = z.object({
    nameOfSchool: z.string().trim(),
    aboutSchool: z.string().trim().max(250, {message:"This field cannot exceed 250 characters"}),
    abbreviation: z.string().trim().min(2, {message:"This field must contain at least 2 characters"}),
    schoolLogoUrl: z.string().trim().startsWith("https", {message:"Image URL must start with https"}).toLowerCase(),
    schoolPageUrl: z.string().trim().startsWith("/", {message:"School Page URL must start with /"}).toLowerCase(),
    stateLocated: z.string().trim().min(3, {message: "A state must contain at least 3 characters"}),
    yearFounded: z.number().min(4,{message:"This field must not be less than 4 digits"}).max(4, {message: "This field must not exceed 4 digits"}),
    schoolsInSameStateUrl: z.string().trim().startsWith("/", {message:"This field is an internal URL and must start with /"}).toLowerCase(),
    areaLocated: z.string().trim(),
    schoolsInSameAreaUrl: z.string().trim().startsWith("/", {message:"This field is an internal URL and must start with /"}).toLowerCase(),
    ownership: z.string().trim().min(5, {message:"This field must not be less than 5 characters"}).max(7, {message:"This field must not exceed 7 characters"}),
    schoolsOfSameOwnershipUrl: z.string().trim().startsWith("/", {message:"This field is an internal URL and must start with /"}).toLowerCase(),
    vc: z.string().trim()
})


export default function AddSchoolForm(){
    const handleSubmit =async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const response = await fetch("/api/auth/add-school", {
            method:"POST",
            body:JSON.stringify({
                name: formData.get('name'),
                about: formData.get('about'),
                abbreviation: formData.get('abbreviation'),
                logo: formData.get('logo'),
                page: formData.get('page'),
                state: formData.get('state'),
                year_founded: formData.get('year_founded'),
                schools_in_state_url: formData.get('schools_in_state_url'),
                location: formData.get('location'),
                schools_in_location_url: formData.get('schools_in_location_url'),
                ownership: formData.get('ownership'),
                schools_of_same_ownership_url: formData.get('schools_of_same_ownership_url'),
                vc: formData.get('vc'),
                about_vc_url: formData.get('about_vc_url'),
                ranking: formData.get('ranking'),
                schools_ranking_url: formData.get('schools_ranking_url'),
                number_of_courses: formData.get('number_of_courses'),
                list_of_courses_url: formData.get('list_of_courses_url'),
                fees: formData.get('fees'),
                fees_url: formData.get('fees_url'),
                jamb_cut_off: formData.get('jamb_cut_off'),
                jamb_cut_off_url: formData.get('jamb_cut_off_url'),
                hostel: formData.get('hostel'),
                hostel_url: formData.get('hostel_url'),
                admission_capacity: formData.get('admission_capacity'),
                admission_capacity_url: formData.get('admission_capacity_url'),
                id: formData.get('id'),
                hashtag_id: formData.get('hashtag_id'),
                added_by: formData.get('added_by')
            })
        })
        console.log({response})

    }
    return(
        <form onSubmit={handleSubmit} className = "flex flex-col">
            <input type = "text" name = "name" placeholder="Name of School" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "textarea" name = "about" placeholder="About the School" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "abbreviation" placeholder="Abbreviation of School Name" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "logo" placeholder="URL of School Logo" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "page" placeholder="URL of School Page" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "state" placeholder="State Where The School is Located" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "year_founded" placeholder="Year The School Was Founded" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "schools_in_state_url" placeholder="Link To The List of Schools in The Same State where This School Located" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "location" placeholder="Where The School is Located Within the state" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "schools_in_location_url" placeholder="Link To The List of Schools in The Same Location Within The State Where This School is Located" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "ownership" placeholder="Who Owns The School?" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "schools_of_same_ownership_url" placeholder="Link To The List of Schools With The Same Ownership As This" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "vc" placeholder="Who is The VC of the School" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "about_vc_url" placeholder="Link To The Page About The School's VCs" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "ranking" placeholder="Ranking Position of the School" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "schools_ranking_url" placeholder="Link To Ranking of Schools in Nigeia" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "number_of_courses" placeholder="How Many Course Does The School Offer" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "list_of_courses_url" placeholder="Link To The List of Courses Offered By The School" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "fees" placeholder="What Is The Fee Range for The School" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "fees_url" placeholder="Link To School Fees Page" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "jamb_cut_off" placeholder="JAMB Cut Off" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "jamb_cut_off_url" placeholder="Link To The JAMB Cut Off Page" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "hostel" placeholder="Does The School Has Hostel?" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "hostel_url" placeholder="Link To The School Hostel Page" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "admission_capacity" placeholder="What Is The Admission Capacity of The School" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "admission_capacity_url" placeholder="Link To The Admission Capacity Page" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "id" placeholder="What is The School Unique ID" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "hashtag_id" placeholder="ID with Hash Tag" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <input type = "text" name = "added_by" placeholder="Added By?" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
            <ButtonWithOutIcon type = "submit" style = "filled-enabled-with-and-without-icon" label = "Submit" statelayer = "filled-enabled-without-icon-state-layer" textWrapper = "filled-enabled-with-and-without-icon-text-wrapper"/>
        </form>
    )
}