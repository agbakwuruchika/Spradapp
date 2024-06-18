'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ClipLoader from 'react-spinners/ClipLoader';
import { FaPlus } from "react-icons/fa";
import SocialMediaPostCardTemplate from './social-media-post-card-template';
import { db } from '@/firebase/config';
import { getDocs, collection, query, where, orderBy } from 'firebase/firestore';
import ButtonWithOutIcon from './button-without-icon';
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
  import ButtonWithIcon from "@/components/button-with-icon";
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
  import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
  import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"


  const undergraduateCourses = [
    {
        value: "accounting",
        label: "Accounting"
    },
    {
        value: "business administration",
        label: "Business Administration"
    },
    {
        value: "pharmacy",
        label: "Pharmacy"
    },
    {
        value: "physiotherapy",
        label: "Physiotherapy"
    },
    {
        value: "medicine",
        label: "Medicine"
    },
    {
        value: "dentistry",
        label: "Dentistry"
    },
    {
        value: "veterinary medicine",
        label: "Veterinary Medicine"
    },
    {
        value: "biochemistry",
        label: "Biochemistry"
    },
    {
        value: "medical laboratory science",
        label: "Medical Laboratory Science"
    },
    {
        value: "pharmacology",
        label: "Pharmacology"
    },
    {
        value: "physiology",
        label: "Physiology"
    },
    {
        value: "biotechnology",
        label: "Biotechnology"
    },
    {
        value: "chemistry",
        label: "Chemistry"
    },
    {
        value: "chemical engineering",
        label: "Chemical Engineering"
    },
    {
        value: "economics",
        label: "Economics"
    },
    {
        value: "finance",
        label: "Finance"
    },
    {
        value: "actuarial science",
        label: "Actuarial Science"
    },
    {
        value: "insurance",
        label: "Insurance"
    },
    {
        value: "industrial relations",
        label: "Industrial Relations"
    },
    {
        value: "employment relations",
        label: "Employment Relations"
    },
    {
        value: "industrial relations and personnel management",
        label: "Industrial Relations And Personnel Management"
    },
    {
        value: "human resources management",
        label: "Human Resources Management"
    },
    {
        value: "mathematics",
        label: "Mathematics"
    },
    {
        value: "statistics",
        label: "Statistics"
    },
    {
        value: "business education",
        label: "Business Education"
    },
    {
        value: "accounting education",
        label: "Accounting Education"
    }

  ]


  const listOfProfessionalQualifications = [
    {
        value: "associate of the chartered institute of taxation of nigeria acti",
        label: "Associate of the Chartered Institute of Taxation of Nigeria (ACTI)"
    },
    {
        value: "associate chartered accountant aca",
        label: "Associate Chartered Accountant (ACA)"
    }
  ]


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



async function FetchPostgraduateCoursesForBachelorDegreeHoldersWithoutProfessionalQualification(educationalQualification: any, cgpa: any, discipline: any, workExperience:any) {
    // Fetch courses matching educational qualification and CGPA
    const baseQuery = query(
        collection(db, "Postgraduate Courses in Nigeria"),
        where("Eligible_Educational_Qualification", "array-contains", educationalQualification),
        where("Minimum_CGPA", "<=", cgpa),
        where("Work_Experience", "<=", workExperience),
        orderBy("Title", "asc")
    );

    const baseSnapshot = await getDocs(baseQuery);
    let baseData: any = [];
    baseSnapshot.forEach((doc) => {
        baseData.push({ id: doc.id, ...doc.data() });
    });

    // Filter results in JavaScript for Eligible_Courses
    const filteredData = baseData.filter((course: any) => 
        course.Eligible_Courses_For_Bachelor_Degree_Holders.includes(discipline) || course.Eligible_Courses_For_Bachelor_Degree_Holders.includes("any discipline")
    );

    return filteredData;
}



async function FetchPGDCoursesForThirdClassHolders(cgpa:any, discipline:any) {
    const q = query(
        collection(db, 'Postgraduate Courses in Nigeria'),
        where('Course', '==', discipline),
        where('Postgraduate_Type', '==', "PGD"),
        where("Minimum_CGPA_For_Third_Class_Holders_In_The_Course", "<=", cgpa),
        orderBy('Title', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const data: any = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}


async function FetchPostgraduateCoursesForBachelorDegreeHoldersWithProfessionalQualification(educationalQualification: any, cgpa: any, discipline: any, workExperience:any, professionalCertification:any) {
    // Fetch courses matching educational qualification and CGPA
    const baseQuery = query(
        collection(db, "Postgraduate Courses in Nigeria"),
        where("Eligible_Educational_Qualification", "array-contains", educationalQualification),
        where("Minimum_CGPA", "<=", cgpa),
        where("Work_Experience", "<=", workExperience),
        orderBy("Title", "asc")
    );

    const baseSnapshot = await getDocs(baseQuery);
    let baseData: any = [];
    baseSnapshot.forEach((doc) => {
        baseData.push({ id: doc.id, ...doc.data() });
    });

    // Filter results in JavaScript for Eligible_Courses
    const filteredData = baseData.filter((course: any) => 
        course.Eligible_Courses_For_Bachelor_Degree_Holders.includes(discipline) || course.Eligible_Courses_For_Bachelor_Degree_Holders.includes("any discipline") || course.Eligible_Courses_For_Bachelor_Degree_Holders.includes(discipline + " with " + professionalCertification) || course.Eligible_Courses_For_Bachelor_Degree_Holders.includes("any discipline " + "with " + professionalCertification)
    );

    return filteredData;
}



async function FetchPostgraduateCoursesForHNDHoldersWithoutProfessionalQualification(educationalQualification: any, cgpa: any, discipline: any, workExperience:any) {
    // Fetch courses matching educational qualification and CGPA
    const baseQuery = query(
        collection(db, "Postgraduate Courses in Nigeria"),
        where("Eligible_Educational_Qualification", "array-contains", educationalQualification),
        where("Minimum_CGPA_For_HND_Holders", "<=", cgpa),
        where("Work_Experience", "<=", workExperience),
        orderBy("Title", "asc")
    );

    const baseSnapshot = await getDocs(baseQuery);
    let baseData: any = [];
    baseSnapshot.forEach((doc) => {
        baseData.push({ id: doc.id, ...doc.data() });
    });

    // Filter results in JavaScript for Eligible_Courses
    const filteredData = baseData.filter((course: any) => 
        course.Eligible_Courses_For_Bachelor_Degree_Holders.includes(discipline) || course.Eligible_Courses_For_Bachelor_Degree_Holders.includes("any discipline")
    );

    return filteredData;
}

async function FetchPostgraduateCoursesForHNDHoldersWithProfessionalQualification(educationalQualification: any, cgpa: any, discipline: any, workExperience:any, professionalCertification:any) {
    // Fetch courses matching educational qualification and CGPA
    const baseQuery = query(
        collection(db, "Postgraduate Courses in Nigeria"),
        where("Eligible_Educational_Qualification", "array-contains", educationalQualification),
        where("Minimum_CGPA_For_HND_Holders", "<=", cgpa),
        where("Work_Experience", "<=", workExperience),
        orderBy("Title", "asc")
    );

    const baseSnapshot = await getDocs(baseQuery);
    let baseData: any = [];
    baseSnapshot.forEach((doc) => {
        baseData.push({ id: doc.id, ...doc.data() });
    });

    // Filter results in JavaScript for Eligible_Courses
    const filteredData = baseData.filter((course: any) => 
        course.Eligible_Courses_For_Bachelor_Degree_Holders.includes(discipline) || course.Eligible_Courses_For_Bachelor_Degree_Holders.includes("any discipline") || course.Eligible_Courses_For_Bachelor_Degree_Holders.includes(discipline + " with " + professionalCertification) || course.Eligible_Courses_For_Bachelor_Degree_Holders.includes("any discipline " + "with " + professionalCertification)
    );

    return filteredData;
}


async function FetchPostgraduateCoursesForPGDHoldersWithoutProfessionalQualification(educationalQualification: any, cgpa: any, discipline: any, workExperience:any, PGDDiscipline:any) {
    // Fetch courses matching educational qualification and CGPA
    const baseQuery = query(
        collection(db, "Postgraduate Courses in Nigeria"),
        where("Eligible_Educational_Qualification", "array-contains", educationalQualification),
        where("Minimum_CGPA_For_PGD_Holders", "<=", cgpa),
        where("Work_Experience", "<=", workExperience),
        orderBy("Title", "asc")
    );

    const baseSnapshot = await getDocs(baseQuery);
    let baseData: any = [];
    baseSnapshot.forEach((doc) => {
        baseData.push({ id: doc.id, ...doc.data() });
    });

    // Filter results in JavaScript for Eligible_Courses
    const filteredData = baseData.filter((course: any) => 
        course.Eligible_Bachelor_Degree_Courses_For_PGD.includes(discipline) || course.Eligible_Bachelor_Degree_Courses_For_PGD.includes("any discipline")
    );

    const finalFilteredData = filteredData.filter((course: any) => 
        course.Eligible_Courses_For_PGD_Holders.includes(PGDDiscipline) || course.Eligible_Courses_For_PGD_Holders.includes("any discipline")
    );

    return finalFilteredData;
}



async function FetchInfluencers(influencerCourse: any) {
    const q = query(
        collection(db, 'Profiles'),
        where('Course', '==', influencerCourse),
        orderBy('Followers', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const data: any = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

interface Courses {
    id: string;
    Title: string;
    Course_Category: string;
    Course_Description: string;
    Eligible_Educational_Qualification: string;
    Minimum_Class_Of_Degree: string;
    NYSC_Certificate_Required: boolean;
    Work_Experience: string;
    Professional_Qualification: string;
    Eligible_Courses_For_Bachelor_Degree_Holders: string[];
    Entrance_Exam: boolean;
    Postgraduate_Type: string;
    Learning_Option: string;
    Career_Prospects: string;
    CGPA_Calculator_Link: string;
    Number_Of_Semesters_In_A_Year_Link: string;
    Nature_Of_Full_Time_And_Part_Time_Link?: string;
    PG_Courses_For_HND_Holders_Link?: string;
    PG_Courses_For_Third_Class_Holders_Link?: string;
    Apply_Without_NYSC_Link?: string;
    PG_Courses_Without_Work_Experience?: string;
    PG_Courses_Without_Professional_Qualification?: string;
    Course_Finder_Link?: string;
    PG_Courses_Without_Entrance_Exam_Link?: string;
    Academic_Vs_Professional_Master_Link?: string;
    Distance_Learning_Program_Link?: string;
    Career_Counselling_Link?: string;
    School_Name: string;
    School_Fees_Link: string;
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

export default function PostgraduateCourseFinder() {
    const [recommendedPGCourses, setRecommendedPGCourses] = useState<Courses[]>([]);
    const [schoolInfluencers, setSchoolInfluencers] = useState<InfluencersToFollow[]>([]);
    const [numberOfPostgraduateCourses, setNumberOfPostgraduateCourses] = useState(0);
    const [academicQualification, setAcademicQualification] = useState('');
    const [programmeType, setProgrammeType] = useState('');
    const [processing, setProcessing] = useState(false)
    const [cgpa, setCgpa] = useState(0)
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [yearsOfExperience, setYearsOfExperience] = useState(0)
    const [hasProfessionalQualification, setHasProfessionalQualification] = useState(false)
    const [openProfessionalQualification, setOpenProfessionalQualification] = useState(false)
    const [professionalQualificationValue, setProfessionalQualificationValue] = useState("")
    const [pgdCourseValue, setPgdCourseValue] = useState("")
    const [openPgdCourses, setOpenPgdCourses] = useState(false)

    async function fetchData(educationalQualification: any, cgpa: any, discipline: any, workExperience:any, professionalCertification:any, PGDDiscipline:any) {
        if(academicQualification === "Bachelor Degree" && professionalQualificationValue === ""){
        const data: Courses[] = await FetchPostgraduateCoursesForBachelorDegreeHoldersWithoutProfessionalQualification(educationalQualification, cgpa, discipline, workExperience);
        const data2: Courses[] = await FetchPGDCoursesForThirdClassHolders(cgpa, discipline)
        const modifiedData = data.map((course) => ({
            ...course,
            School_Name: course.School_Name.replace(/-/g, ' '),
        }));
        const modifiedData2 = data2.map((course) => ({
            ...course,
            School_Name: course.School_Name.replace(/-/g, ' '),
        }));
        const modifiedData3 = [...modifiedData, ...modifiedData2];
        const modifiedData4 = Array.from(new Map(modifiedData3.map(item => [item.id, item])).values());
        setRecommendedPGCourses(modifiedData4);
        setProcessing(false);
        if(recommendedPGCourses.length > 0){
            console.log(recommendedPGCourses);
        }
    }else if(academicQualification === "Bachelor Degree" && professionalQualificationValue !== ""){
        const data: Courses[] = await FetchPostgraduateCoursesForBachelorDegreeHoldersWithProfessionalQualification(educationalQualification, cgpa, discipline, workExperience, professionalCertification);
        const data2: Courses[] = await FetchPGDCoursesForThirdClassHolders(cgpa, discipline)
        const modifiedData = data.map((course) => ({
            ...course,
            School_Name: course.School_Name.replace(/-/g, ' '),
        }));
        const modifiedData2 = data2.map((course) => ({
            ...course,
            School_Name: course.School_Name.replace(/-/g, ' '),
        }));
        const modifiedData3 = [...modifiedData, ...modifiedData2];
        const modifiedData4 = Array.from(new Map(modifiedData3.map(item => [item.id, item])).values());
        setRecommendedPGCourses(modifiedData4);
        setProcessing(false);
        if(recommendedPGCourses.length > 0){
            console.log(recommendedPGCourses);
        }
    }else if(academicQualification === "HND" && professionalQualificationValue === ""){
        const data: Courses[] = await FetchPostgraduateCoursesForHNDHoldersWithoutProfessionalQualification(educationalQualification, cgpa, discipline, workExperience);
        const modifiedData = data.map((course) => ({
            ...course,
            School_Name: course.School_Name.replace(/-/g, ' '),
        }));
        setRecommendedPGCourses(modifiedData);
        setProcessing(false);
        if(recommendedPGCourses.length > 0){
            console.log(recommendedPGCourses);
        }
    }else if(academicQualification === "HND" && professionalQualificationValue !== ""){
        const data: Courses[] = await FetchPostgraduateCoursesForHNDHoldersWithProfessionalQualification(educationalQualification, cgpa, discipline, workExperience, professionalCertification);
        const modifiedData = data.map((course) => ({
            ...course,
            School_Name: course.School_Name.replace(/-/g, ' '),
        }));
        setRecommendedPGCourses(modifiedData);
        setProcessing(false);
        if(recommendedPGCourses.length > 0){
            console.log(recommendedPGCourses);
        }
    }else if(academicQualification === "PGD" && professionalQualificationValue === ""){
        const data: Courses[] = await FetchPostgraduateCoursesForPGDHoldersWithoutProfessionalQualification(educationalQualification, cgpa, discipline, workExperience, PGDDiscipline);
        const modifiedData = data.map((course) => ({
            ...course,
            School_Name: course.School_Name.replace(/-/g, ' '),
        }));
        setRecommendedPGCourses(modifiedData);
        setProcessing(false);
        if(recommendedPGCourses.length > 0){
            console.log(recommendedPGCourses);
        }
    }else{

    }
        
    }



    const fetchInfluencersForCourse = async (influencerCourse:any) => {
        const influencers: InfluencersToFollow[] = await FetchInfluencers(influencerCourse);
        // Do something with influencers data
       // const modifiedInfluencersData = influencers.map(influence =>({
       //     ...influence,
       //     Name: influence.Name.replace(/-/g, ' ')
       // }))
        setSchoolInfluencers(influencers)
        console.log("Influencers for Course", influencerCourse, influencers);
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setProcessing(true);
        fetchData(academicQualification, cgpa, value, yearsOfExperience, professionalQualificationValue, pgdCourseValue);
    };

    return (
        <div>
            <h1 className="text-2xl mt-2">Spradapp Postgraduate Course Finder</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex mt-4 justify-between">
                    <label htmlFor="programmeType" className="">
                        Select Type of Programme You Want to Find
                    </label>
                    <select
                        className="ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"
                        name="programmeType"
                        id="programmeType"
                        onChange={(e) => {
                            setProgrammeType(e.currentTarget.value);
                        }}
                    >
                        <option value="Select">--select--</option>
                        <option value="Undergraduate Programme">Undergraduate Programme</option>
                        <option value="Postgraduate Programme">Postgraduate Programme</option>
                    </select>
                </div>
                {programmeType === 'Postgraduate Programme' && (
                    <>
                    <div className="flex mt-4 justify-between">
                        <label htmlFor="academicQualification" className="">
                            Select Your Academic Qualification
                        </label>
                        <select
                            className="ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"
                            name="academicQualification"
                            id="academicQualification"
                            onChange={(e) => {
                                setAcademicQualification(e.currentTarget.value);
                            }}
                        >
                            <option value="Select">--select--</option>
                            <option value="Bachelor Degree">Bachelor Degree</option>
                            <option value="HND">HND</option>
                            <option value="PGD">PGD</option>
                            <option value="Master Degree">Master Degree</option>
                            <option value="Master of Philosophy">Master of Philosophy (MPhil)</option>
                        </select>
                    </div>
                    {academicQualification == "Bachelor Degree" &&
                    <>
                    <div className="mt-2">
                    <input type="number" step = "0.01" min = "0.00" max = "10.00" id="cgpa" placeholder = "Enter Your CGPA" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" onChange={(e) => { const gp = parseFloat(e.currentTarget.value); setCgpa(isNaN(gp) ? 0 : gp); }} />
                    
                </div>
                <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="mt-4 p-2 w-full justify-between"
      >
        <div className="truncate max-w-full">
          {value
            ? undergraduateCourses.find((course) => course.value === value)?.label
            : "Select the course you studied..."}
        </div>
        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-full p-0">
      <Command>
        <CommandInput placeholder="Search school..." className="h-9" />
        <CommandEmpty>No course found.</CommandEmpty>
        
        <CommandGroup>
        <CommandList>
          {undergraduateCourses.map((framework) => (
            
            <CommandItem
              key={framework.value}
              value={framework.value}
              onSelect={(currentValue:any) => {
                setValue(currentValue === value ? "" : currentValue)
                setOpen(false)
              }}
            >
              <div className="truncate max-w-full">
                {framework.label}
              </div>
              <CheckIcon
                className={cn(
                  "ml-auto h-4 w-4",
                  value === framework.value ? "opacity-100" : "opacity-0"
                )}
              />
            </CommandItem>
            
          ))}
          </CommandList>
        </CommandGroup>
        
      </Command>
    </PopoverContent>
  </Popover>
  <div className="mt-2">
                    <input type="number" id="yearsOfExperience" placeholder = "How Many Years of Work Experience Do You Have After Your Bachelor Degree?" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" onChange={(e) => { const experience = parseInt(e.currentTarget.value); setYearsOfExperience(isNaN(experience) ? 0 : experience); }} />
                    
                </div>
                <div className = "mt-4 p-2 bg-white outline outline-2 outline-slate-100 rounded w-full">
            <h2 className = "sign-up-input">Do You Have Any Professional Qualification?:</h2>
                <div style = {{display:"flex", gap:5, marginBottom:5, marginTop:10}}>
                    <input type = "radio" id = "Yes" name = "professionalQualification" value = "Yes" onClick ={()=>{setHasProfessionalQualification(true);}}/>
                    <label htmlFor="Yes" className = "radio-button-label sign-up-input">Yes</label>
                </div>
                <div style = {{display:"flex", gap:5, marginBottom:5}}>
                    <input type = "radio" id = "No" name = "professionalQualification" value = "No" onClick ={()=>{setHasProfessionalQualification(false); }}/>
                    <label htmlFor="No" className = "radio-button-label sign-up-input">No</label>
                </div>
              </div>
              {hasProfessionalQualification &&
              <Popover open={openProfessionalQualification} onOpenChange={setOpenProfessionalQualification}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openProfessionalQualification}
                  className="mt-4 p-2 w-full justify-between"
                >
                  <div className="truncate max-w-full">
                    {professionalQualificationValue
                      ? listOfProfessionalQualifications.find((qualification) => qualification.value === professionalQualificationValue)?.label
                      : "Select professional qualification..."}
                  </div>
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search school..." className="h-9" />
                  <CommandEmpty>No professional qualification found.</CommandEmpty>
                  
                  <CommandGroup>
                  <CommandList>
                    {listOfProfessionalQualifications.map((qualification) => (
                      
                      <CommandItem
                        key={qualification.value}
                        value={qualification.value}
                        onSelect={(currentValue) => {
                          setProfessionalQualificationValue(currentValue === value ? "" : currentValue);
                          setOpenProfessionalQualification(false)
                        }}
                      >
                        <div className="truncate max-w-full">
                          {qualification.label}
                        </div>
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === qualification.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                      
                    ))}
                    </CommandList>
                  </CommandGroup>
                  
                </Command>
              </PopoverContent>
            </Popover>
              }
  </>
  }
  

  {academicQualification == "HND" &&
                    <>
                    <div className="mt-2">
                    <input type="number" step = "0.01" min = "0.00" max = "10.00" id="cgpa" placeholder = "Enter Your CGPA" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" onChange={(e) => { const gp = parseFloat(e.currentTarget.value); setCgpa(isNaN(gp) ? 0 : gp); }} />
                    
                </div>
                <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="mt-4 p-2 w-full justify-between"
      >
        <div className="truncate max-w-full">
          {value
            ? undergraduateCourses.find((course) => course.value === value)?.label
            : "Select the course you studied..."}
        </div>
        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-full p-0">
      <Command>
        <CommandInput placeholder="Search school..." className="h-9" />
        <CommandEmpty>No course found.</CommandEmpty>
        
        <CommandGroup>
        <CommandList>
          {undergraduateCourses.map((framework) => (
            
            <CommandItem
              key={framework.value}
              value={framework.value}
              onSelect={(currentValue:any) => {
                setValue(currentValue === value ? "" : currentValue)
                setOpen(false)
              }}
            >
              <div className="truncate max-w-full">
                {framework.label}
              </div>
              <CheckIcon
                className={cn(
                  "ml-auto h-4 w-4",
                  value === framework.value ? "opacity-100" : "opacity-0"
                )}
              />
            </CommandItem>
            
          ))}
          </CommandList>
        </CommandGroup>
        
      </Command>
    </PopoverContent>
  </Popover>
  <div className="mt-2">
                    <input type="number" id="yearsOfExperience" placeholder = "How Many Years of Work Experience Do You Have After Your Bachelor Degree?" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" onChange={(e) => { const experience = parseInt(e.currentTarget.value); setYearsOfExperience(isNaN(experience) ? 0 : experience); }} />
                    
                </div>
                <div className = "mt-4 p-2 bg-white outline outline-2 outline-slate-100 rounded w-full">
            <h2 className = "sign-up-input">Do You Have Any Professional Qualification?:</h2>
                <div style = {{display:"flex", gap:5, marginBottom:5, marginTop:10}}>
                    <input type = "radio" id = "Yes" name = "professionalQualification" value = "Yes" onClick ={()=>{setHasProfessionalQualification(true);}}/>
                    <label htmlFor="Yes" className = "radio-button-label sign-up-input">Yes</label>
                </div>
                <div style = {{display:"flex", gap:5, marginBottom:5}}>
                    <input type = "radio" id = "No" name = "professionalQualification" value = "No" onClick ={()=>{setHasProfessionalQualification(false); }}/>
                    <label htmlFor="No" className = "radio-button-label sign-up-input">No</label>
                </div>
              </div>
              {hasProfessionalQualification &&
              <Popover open={openProfessionalQualification} onOpenChange={setOpenProfessionalQualification}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openProfessionalQualification}
                  className="mt-4 p-2 w-full justify-between"
                >
                  <div className="truncate max-w-full">
                    {professionalQualificationValue
                      ? listOfProfessionalQualifications.find((qualification) => qualification.value === professionalQualificationValue)?.label
                      : "Select professional qualification..."}
                  </div>
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search school..." className="h-9" />
                  <CommandEmpty>No professional qualification found.</CommandEmpty>
                  
                  <CommandGroup>
                  <CommandList>
                    {listOfProfessionalQualifications.map((qualification) => (
                      
                      <CommandItem
                        key={qualification.value}
                        value={qualification.value}
                        onSelect={(currentValue) => {
                          setProfessionalQualificationValue(currentValue === value ? "" : currentValue);
                          setOpenProfessionalQualification(false)
                        }}
                      >
                        <div className="truncate max-w-full">
                          {qualification.label}
                        </div>
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === qualification.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                      
                    ))}
                    </CommandList>
                  </CommandGroup>
                  
                </Command>
              </PopoverContent>
            </Popover>
              }
  </>
  }


  {academicQualification == "PGD" &&
                    <>
                    <div className="mt-2">
                    <input type="number" step = "0.01" min = "0.00" max = "10.00" id="cgpa" placeholder = "Enter Your CGPA" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" onChange={(e) => { const gp = parseFloat(e.currentTarget.value); setCgpa(isNaN(gp) ? 0 : gp); }} />
                    
                </div>
                <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="mt-4 p-2 w-full justify-between"
      >
        <div className="truncate max-w-full">
          {value
            ? undergraduateCourses.find((course) => course.value === value)?.label
            : "Select the course you studied..."}
        </div>
        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-full p-0">
      <Command>
        <CommandInput placeholder="Search school..." className="h-9" />
        <CommandEmpty>No course found.</CommandEmpty>
        
        <CommandGroup>
        <CommandList>
          {undergraduateCourses.map((framework) => (
            
            <CommandItem
              key={framework.value}
              value={framework.value}
              onSelect={(currentValue:any) => {
                setValue(currentValue === value ? "" : currentValue)
                setOpen(false)
              }}
            >
              <div className="truncate max-w-full">
                {framework.label}
              </div>
              <CheckIcon
                className={cn(
                  "ml-auto h-4 w-4",
                  value === framework.value ? "opacity-100" : "opacity-0"
                )}
              />
            </CommandItem>
            
          ))}
          </CommandList>
        </CommandGroup>
        
      </Command>
    </PopoverContent>
  </Popover>

  <Popover open={openPgdCourses} onOpenChange={setOpenPgdCourses} className = "mt-2">
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={openPgdCourses}
        className="mt-4 p-2 w-full justify-between"
      >
        <div className="truncate max-w-full">
          {pgdCourseValue
            ? undergraduateCourses.find((course) => course.value === pgdCourseValue)?.label
            : "Select the course you studied..."}
        </div>
        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-full p-0">
      <Command>
        <CommandInput placeholder="Search school..." className="h-9" />
        <CommandEmpty>No course found.</CommandEmpty>
        
        <CommandGroup>
        <CommandList>
          {undergraduateCourses.map((framework) => (
            
            <CommandItem
              key={framework.value}
              value={framework.value}
              onSelect={(currentValue:any) => {
                setPgdCourseValue(currentValue === value ? "" : currentValue)
                setOpenPgdCourses(false)
              }}
            >
              <div className="truncate max-w-full">
                {framework.label}
              </div>
              <CheckIcon
                className={cn(
                  "ml-auto h-4 w-4",
                  value === framework.value ? "opacity-100" : "opacity-0"
                )}
              />
            </CommandItem>
            
          ))}
          </CommandList>
        </CommandGroup>
        
      </Command>
    </PopoverContent>
  </Popover>
  <div className="mt-2">
                    <input type="number" id="yearsOfExperience" placeholder = "How Many Years of Work Experience Do You Have After Your Bachelor Degree?" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" onChange={(e) => { const experience = parseInt(e.currentTarget.value); setYearsOfExperience(isNaN(experience) ? 0 : experience); }} />
                    
                </div>
                <div className = "mt-4 p-2 bg-white outline outline-2 outline-slate-100 rounded w-full">
            <h2 className = "sign-up-input">Do You Have Any Professional Qualification?:</h2>
                <div style = {{display:"flex", gap:5, marginBottom:5, marginTop:10}}>
                    <input type = "radio" id = "Yes" name = "professionalQualification" value = "Yes" onClick ={()=>{setHasProfessionalQualification(true);}}/>
                    <label htmlFor="Yes" className = "radio-button-label sign-up-input">Yes</label>
                </div>
                <div style = {{display:"flex", gap:5, marginBottom:5}}>
                    <input type = "radio" id = "No" name = "professionalQualification" value = "No" onClick ={()=>{setHasProfessionalQualification(false); }}/>
                    <label htmlFor="No" className = "radio-button-label sign-up-input">No</label>
                </div>
              </div>
              {hasProfessionalQualification &&
              <Popover open={openProfessionalQualification} onOpenChange={setOpenProfessionalQualification}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openProfessionalQualification}
                  className="mt-4 p-2 w-full justify-between"
                >
                  <div className="truncate max-w-full">
                    {professionalQualificationValue
                      ? listOfProfessionalQualifications.find((qualification) => qualification.value === professionalQualificationValue)?.label
                      : "Select professional qualification..."}
                  </div>
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search school..." className="h-9" />
                  <CommandEmpty>No professional qualification found.</CommandEmpty>
                  
                  <CommandGroup>
                  <CommandList>
                    {listOfProfessionalQualifications.map((qualification) => (
                      
                      <CommandItem
                        key={qualification.value}
                        value={qualification.value}
                        onSelect={(currentValue) => {
                          setProfessionalQualificationValue(currentValue === value ? "" : currentValue);
                          setOpenProfessionalQualification(false)
                        }}
                      >
                        <div className="truncate max-w-full">
                          {qualification.label}
                        </div>
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === qualification.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                      
                    ))}
                    </CommandList>
                  </CommandGroup>
                  
                </Command>
              </PopoverContent>
            </Popover>
              }
  </>
  }
  
                </>
                )}
                
                {academicQualification !== "" && cgpa > 0 && value !== "" ?
                        <div className="mt-2">
                            {processing ? <ButtonWithIcon type = "button" style = "filled-enabled-with-and-without-icon" icon = {<ClipLoader color='rgba(255, 255, 255, 1)'/>} iconStyle = "filled-enabled-icon-styling" label = "Processing..." stateLayer = "filled-enabled-with-icon-state-layer" textWrapper = "filled-enabled-with-and-without-icon-text-wrapper"/> :
                                <ButtonWithOutIcon type = "submit" style = "filled-enabled-with-and-without-icon" label = "Submit" statelayer = "filled-enabled-without-icon-state-layer" textWrapper = "filled-enabled-with-and-without-icon-text-wrapper"/>
                            }
                        </div> :
                        <div className = "mt-2">
                          <ButtonWithOutIcon type = "button" style = "filled-disabled-with-and-without-icon" label = "Submit" stateLayer = "filled-disabled-without-icon-state-layer" textWrapper = "filled-disabled-icon-text-wrapper"/>
                        </div>
                        }
            </form>
            {recommendedPGCourses.length > 0 &&
            <>
            <h2 className = "text-2xl mt-4">List of <span className = "underline">UNILAG</span> Postgraduate Courses You Can Apply For With a CGPA of <span className = "underline">{cgpa}</span> As a <span className = "underline">{academicQualification}</span> Holder in <span className='underline capitalize'>{value}</span></h2>
            <Accordion type="single" collapsible className="w-full">
            <ol>
                {recommendedPGCourses.map((course:any)=>{
                    return(
                        <AccordionItem key = {course.id} value = {course.id}>
                            <AccordionTrigger onClick={() => fetchInfluencersForCourse(course.Title)}>
                        <li className = "flex items-center gap-x-2 capitalize">
                            {/*<Image src = {school.Logo} alt = {course.Title} width = {40} height = {40} /> */}
                            {course.Title} <span className = "capitalize">({course.Mode_Of_Study}) ({course.Course_Category})</span>
                        </li>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p>{course.Course_Description}</p>
                               {/* {course.Course_Requirements.map((requirement:any)=>{
                                return(
                                <p>{requirement.Value}</p>
                                )
                                })} */}
                                <div className = "flex justify-start mt-2 gap-x-2">
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Educational Qualification:</h3>
                                        <p className = "capitalize mt-2">{course.Eligible_Educational_Qualification}</p>
                                        {course.PG_Courses_For_HND_Holders_Link &&
                                                <p className = "mt-2">Check here for available <Link href={course.PG_Courses_For_HND_Holders_Link} className="capitalize text-blue-600">PG Courses for HND Holders</Link></p>
                                        }
                                    </div>
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Class of Degree:</h3>
                                        <p className = "capitalize mt-2">Minimum of {course.Minimum_Class_Of_Degree}</p>
                                        {course.PG_Courses_For_Third_Class_Holders_Link &&
                                                <p className="mt-2">Check here for full list of <Link href={course.PG_Courses_For_Third_Class_Holders_Link} className="text-blue-600">PG Courses for Third Class Holders</Link></p>
                                        }
                                    </div>
                                </div>
                                <div className = "flex justify-start mt-2 gap-x-2">
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">NYSC Certificate Required:</h3>
                                        <p className = "mt-2 capitalize">{course.NYSC_Certificate_Required ? 'Yes' : 'No'}</p>
                                        {course.Apply_Without_NYSC_Link &&
                                                <p className = "mt-2">Don&apos;t have it? <Link href={course.Apply_Without_NYSC_Link} className="text-blue-600">Here is a way out</Link></p>
                                        }
                                    </div>
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Work Experience:</h3>
                                        <p className = "capitalize mt-2">{course.Work_Experience}</p>
                                        {course.PG_Courses_Without_Work_Experience &&
                                                <p className = "mt-2">Here are <Link href={course.PG_Courses_Without_Work_Experience} className="text-blue-600">List of PG Courses That Do Not Require Work Experience</Link></p>
                                        }
                                    </div>
                                </div>
                                <div className = "flex justify-start mt-2 gap-x-2">
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Professional Qualification:</h3>
                                        <p className = "mt-2">{course.Professional_Qualification}</p>
                                        {course.PG_Courses_Without_Professional_Qualification &&
                                                <p className = "mt-2">Here are <Link href={course.PG_Courses_Without_Professional_Qualification} className="text-blue-600">List of UNILAG Postgraduate Courses That Do Not Require Professional Qualification</Link></p>
                                        }
                                    </div>
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Eligible Courses:</h3>
                                        <ul className="list-disc ml-5 mt-2">
                                                {course.Eligible_Courses_For_Bachelor_Degree_Holders.map((eligibleCourse:any, index:any) => (
                                                    <li key={index} className="capitalize">{eligibleCourse}</li>
                                                ))}
                                            </ul>
                                            {course.Course_Finder_Link &&
                                                <p className = "mt-2">Didn&apos;t see the course you studied? Use Spradapp <Link href={course.Course_Finder_Link} className="text-blue-600">School and Course Finder</Link> to find it.</p>
                                            }
                                    </div>
                                </div>
                                <div className = "flex justify-start mt-2 gap-x-2">
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Entrance Exam:</h3>
                                        <p className = "mt-2">{course.Entrance_Exam ? 'Yes': 'No'}</p>
                                        {course.PG_Courses_Without_Entrance_Exam_Link &&
                                                <p className = "mt-2">Don&apos;t want to write entrance exam? Here is the <Link href={course.PG_Courses_Without_Entrance_Exam_Link} className="text-blue-600">List of PG Courses Without Entrance Exam</Link></p>
                                        }
                                    </div>
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Type of Postgraduate:</h3>
                                        <p className = "mt-2">{course.Postgraduate_Type}</p>
                                        {course.Academic_Vs_Professional_Master_Link &&
                                                <p className = "mt-2">Here is a clear guide on <Link href={course.Academic_Vs_Professional_Master_Link} className="text-blue-600">Academic vs Professional Masters Degree</Link></p>
                                        }
                                    </div>
                                </div>
                                <div className = "flex justify-start mt-2 gap-x-2">
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Mode of Study:</h3>
                                        <p className = "mt-2">{course.Mode_Of_Study}</p>
                                        {course.Nature_Of_Full_Time_And_Part_Time_Link &&
                                        <p className = "mt-2">Learn more about <Link href = {course.Nature_Of_Full_Time_And_Part_Time_Link} className = "text-blue-600">The Nature of Full Time and Part Time Programmes in UNILAG SPGS</Link></p>
                                        }
                                    </div>
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Minimum CGPA:</h3>
                                        <p className = "mt-2">{course.Minimum_CGPA}</p>
                                        {course.CGPA_Calculator_Link &&
                                        <p className = "mt-2">Check <Link href = {course.CGPA_Calculator_Link} className = "text-blue-600">How To Calculate CCGPA</Link> here</p>
                                        }
                                    </div>
                                </div>
                                <div className = "flex justify-start mt-2 gap-x-2">
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">Duration:</h3>
                                        <p className = "capitalize mt-2">{course.Number_Of_Semesters}</p>
                                        {course.Number_Of_Semesters_In_A_Year_Link &&
                                        <p className = "mt-2">Learn more about <Link href = {course.Number_Of_Semesters_In_A_Year_Link} className = "text-blue-600">How Many Semesters Are In a Year</Link></p>
                                        }
                                    </div>
                                    <div className = "basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                        <h3 className = "text-base font-medium">School Fees:</h3>
                                        <p className = "mt-2">{course.Fees}</p>
                                        {course.School_Fees_Link &&
                                        <p className = "mt-2">Learn more about <Link href = {course.School_Fees_Link} className = "text-blue-600"> UNILAG Postgraduate School Fees</Link></p>
                                        }
                                    </div>
                                </div>
                                {schoolInfluencers.length > 0 &&
                                <div>
                                <Card className = "mt-4 shadcn-card">
                                    <CardHeader>
                                        <CardTitle>Follow To Connect With <span className = "uppercase">{course.Title}</span> Students/Aspirants</CardTitle>
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
                                        <CardTitle>Trending Posts on <span className = "uppercase">{course.Title}</span></CardTitle>
                                    </CardHeader>
                                    <CardContent className = "flex justify-center">
                                <Carousel className="md:w-full max-w-60 md:max-w-md">
                                    <CarouselContent>
                                        <CarouselItem>
                                        <div className="p-1">
             
                
                <SocialMediaPostCardTemplate reasonForShowing = "Suggested" author = "Tony Elumelu" authorUsername = "@telumelu" authorSchool = {course.Title} authorCourse = "Mass Communication" authorStatus = "Student" authorTypeOfStudy = "Undergraduate" authorProfilePics = "/chika-agbakwuru.jpg" postMedia = "/unilag-alumni.jpg" postLikes = {23} authorLevel = "200 Level" postDescription = "This picture was taken during the last General Meeting of UNILAG ALUMNI ASSOCIATION." comments = {45} shares = {81}/>
               
              
            </div>
                                            

                                        </CarouselItem>
                                        <CarouselItem>
                                        <div className="p-1">
                <SocialMediaPostCardTemplate reasonForShowing = "Suggested" author = "Tony Elumelu" authorUsername = "@telumelu" authorSchool = {course.Title}/>
            </div>
                                            

                                        </CarouselItem>
                                        <CarouselItem >
                                        <div className="p-1">
              
                <SocialMediaPostCardTemplate reasonForShowing = "Suggested" author = "Tony Elumelu" authorUsername = "@telumelu" authorSchool = {course.Title}/>
                
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
                                        <CardTitle><span className = "uppercase">{course.Title}</span> Latest News</CardTitle>
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
                                            {course.SchoolPage &&
                                        <h3 className = "text-base font-medium"><Link href = {course.SchoolPage}>Learn more about <span className = "uppercase">{course.Title}</span> History</Link></h3>
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
                                            {course.SchoolPage &&
                                        <h3 className = "text-base font-medium"><Link href = {course.SchoolPage}>Learn more about <span className = "uppercase">{course.Title}</span> History</Link></h3>
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
                                            {course.SchoolPage &&
                                        <h3 className = "text-base font-medium"><Link href = {course.SchoolPage}>Learn more about <span className = "uppercase">{course.Acronym}</span> History</Link></h3>
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
                                            {course.SchoolPage &&
                                        <h3 className = "text-base font-medium"><Link href = {course.SchoolPage}>Learn more about <span className = "uppercase">{course.Acronym}</span> History</Link></h3>
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
            </>
            }
        </div>
    );
}
