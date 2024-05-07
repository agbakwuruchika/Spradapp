
'use client'
import React from 'react'
import Image from 'next/image'
import { db } from '../../../firebase/config'
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react'
import { z, ZodType } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ClipLoader from "react-spinners/ClipLoader"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import ButtonWithOutIcon from "@/components/button-without-icon"
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


  const listOfFederalUniversities = [
    {
      value: "abubakar-tafawa-balewa-university",
      label: "Abubakar Tafawa Balewa University (ATBU)",
      acronym: "atbu",
      location: "bauchi",
      state: "bauchi"
    },
    {
      value: "african-aviation-and-aerospace-university",
      label: "African Aviation And Aerospace University (AAAU)",
      acronym: "aaau",
      location: "fct",
      state: "abuja"
    },
    {
      value: "ahmadu-bello-university",
      label: "Ahmadu Bello University (ABU)",
      acronym: "abu",
      location: "zaria",
      state: "kaduna"
    },
    {
      value: "alex-ekwueme-federal-university",
      label: "Alex Ekwueme Federal University (AE-FUNAI)",
      acronym: "ae-funai",
      location: "ndufu-alike",
      state: "ebonyi"
    },
    {
      value: "bayero-university-kano",
      label: "Bayero University Kano (BUK)",
      acronym: "buk",
      location: "kano",
      state: "kano"
    },
  ];


  const listOfStateUniversities = [
    {
      value: "abia-state-university",
      label: "Abia State University, Uturu (ABSU)",
      acronym: "absu",
      location: "uturu",
      state: "abia"
    },
    {
      value: "adamawa-state-university",
      label: "Adamawa State University, Mubi (ADSU)",
      acronym: "adsu",
      location: "mubi",
      state: "adamawa"
    },
    {
      value: "adekunle-ajasin-university",
      label: "Adekunle Ajasin University, Akungba-Akoko, (AAUA)",
      acronym: "aaua",
      location: "akungba-akoko",
      state: "ondo"
    },
    {
      value: "akwa-ibom-state-university",
      label: "Akwa Ibom State University, Ikot-Akpaden, (AKSU)",
      acronym: "aksu",
      location: "ikot-akpaden",
      state: "akwa-ibom"
    },
    {
      value: "ambrose-ali-university",
      label: "Ambrose Ali University, Ekpoma, (AAU)",
      acronym: "aau",
      location: "ekpoma",
      state: "edo"
    },
  ];  



async function addDataToFireStore(institutionType: string, ownershipType: string, schoolName: string, schoolDescription: string, schoolAcronym: string, logoUrl: string, schoolPageUrl: string, stateLocated: string, yearFounded: number, schoolsInSameStateUrl: string, schoolsInSameLocationUrl: string, areaLocated: string, schoolsOfSameOwnershipUrl: string, schoolHead: string, schoolHeadPageUrl: string, rankingPosition: number, schoolsRankingPageUrl: string, numberOfCourses:number, schoolsCoursesPageUrl:string, schoolsFeesLowest:number, schoolsFeesHighest:number, schoolsFeesPageUrl:string, jambCutOffLowest:number, jambCutOffHighest:number, schoolsJambCutOffPageUrl:string, schoolsHostel:any, schoolsHostelPageUrl:string, schoolsAdmissionCapacity:number, schoolsAdmissionCapacityPageUrl:string, addedBy:string) {
    try {
        const docRef = await addDoc(collection(db, "Schools in Nigeria"), {
            Type: institutionType,
            Ownership: ownershipType,
            Name: schoolName,
            Description: schoolDescription,
            Acronym: schoolAcronym,
            Logo: logoUrl,
            SchoolPage: schoolPageUrl,
            State: stateLocated,
            Year: yearFounded,
            SchoolsInSameState: schoolsInSameStateUrl,
            Location: areaLocated,
            SchoolsInSameLocation: schoolsInSameLocationUrl,
            schoolsOfSameOwnership: schoolsOfSameOwnershipUrl,
            Head: schoolHead,
            HeadPage: schoolHeadPageUrl,
            Ranking: rankingPosition,
            RankingPage: schoolsRankingPageUrl,
            Courses: numberOfCourses,
            CoursesPage: schoolsCoursesPageUrl,
            LowestFee: schoolsFeesLowest,
            HighestFee: schoolsFeesHighest,
            FeesPage: schoolsFeesPageUrl,
            JambCutOffLowest: jambCutOffLowest,
            JambCutOffHighest: jambCutOffHighest,
            JambCutOffPage: schoolsJambCutOffPageUrl,
            Hostel: schoolsHostel,
            HostelPage: schoolsHostelPageUrl,
            Capacity: schoolsAdmissionCapacity,
            CapacityPage: schoolsAdmissionCapacityPageUrl,
            AddedBy: addedBy

        })
        console.log("Document written with ID: ", docRef.id)
        return true;
    } catch (error) {
        console.log("Error adding document ", error)
        return false;
    }
}


export default function ProductOrderForm() {
    const [institutionType, setInstitutionType] = useState("")
    const [ownershipType, setOwnershipType] = useState("")
    const [schoolName, setSchoolName] = useState("")
    const [schoolDescription, setSchoolDescription] = useState("")
    const [schoolAcronym, setSchoolAcronym] = useState("")
    const [logoUrl, setLogoUrl] = useState("")
    const [schoolPageUrl, setSchoolPageUrl] = useState("")
    const [stateLocated, setStateLocated] = useState("")
    const [yearFounded, setYearFounded] = useState(0)
    const [schoolsInSameStateUrl, setSchoolsInSameStateUrl] = useState("")
    const [schoolsInSameLocationUrl, setSchoolsInSameLocationUrl] = useState("")
    const [areaLocated, setAreaLocated] = useState("")
    const [schoolsOfSameOwnershipUrl, setSchoolsOfSameOwnershipUrl] = useState("")
    const [schoolHead, setSchoolHead] = useState("")
    const [schoolHeadPageUrl, setSchoolHeadPageUrl] = useState("")
    const [schoolHeadType, setSchoolHeadType] = useState("")
    const [rankingPosition, setRankingPosition] = useState(0)
    const [schoolsRankingPageUrl, setSchoolsRankingPageUrl] = useState("")
    const [numberOfCourses, setNumberOfCourses] = useState(0)
    const [schoolsCoursesPageUrl, setSchoolsCoursesPageUrl] = useState("")
    const [schoolsFeesLowest, setSchoolsFeesLowest] = useState(0)
    const [schoolsFeesHighest, setSchoolsFeesHighest] = useState(0)
    const [schoolsFeesPageUrl, setSchoolsFeesPageUrl] = useState("")
    const [jambCutOffLowest, setJambCutOffLowest] = useState(0)
    const [jambCutOffHighest, setJambCutOffHighest] = useState(0)
    const [schoolsJambCutOffPageUrl, setSchoolsJambCutOffPageUrl] = useState("")
    const [schoolsHostel, setSchoolsHostel] = useState("")
    const [schoolsHostelPageUrl, setSchoolsHostelPageUrl] = useState("")
    const [schoolsAdmissionCapacity, setSchoolsAdmissionCapacity] = useState(0)
    const [schoolsAdmissionCapacityPageUrl, setSchoolsAdmissionCapacityPageUrl] = useState("")
    const [addedBy, setAddedBy] = useState("")
    const [open, setOpen] = useState(false)
    const [serverMessage, setServerMessage] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [value, setValue] = React.useState("")
    const [openStateUniversity, setOpenStateUniversity] = React.useState(false)
    const [stateUniversityValue, setStateUniversityValue] = React.useState("")

    const inputElement = useRef(null);
    
    const resetInput = () => {
      const radioInputsYes = document.getElementById("thereIsHostel") as HTMLInputElement;
      const radioInputsNo = document.getElementById("thereIsNoHostel") as HTMLInputElement;
      
      if (radioInputsYes && radioInputsNo) { // Null check
          if (radioInputsYes.type === "radio" && radioInputsNo.type === "radio") {
              radioInputsYes.checked = false;
              radioInputsNo.checked = false;
          }
      }
  };


  const resetAllInputs = () => {
    setInstitutionType("");
    setOwnershipType("");
    setSchoolName("");
    setSchoolDescription("");
    setSchoolAcronym("")
    setLogoUrl("")
    setSchoolPageUrl("")
    setStateLocated("")
    setYearFounded(0)
    setSchoolsInSameStateUrl("");
    setSchoolsInSameLocationUrl("")
    setAreaLocated("")
    setSchoolsOfSameOwnershipUrl("")
    setSchoolHead("")
    setSchoolHeadPageUrl("")
    setSchoolHeadType("")
    setRankingPosition(0)
    setSchoolsRankingPageUrl("")
    setNumberOfCourses(0)
    setSchoolsCoursesPageUrl("")
    setSchoolsFeesLowest(0)
    setSchoolsFeesHighest(0)
    setSchoolsFeesPageUrl("")
    setJambCutOffLowest(0)
    setJambCutOffHighest(0)
    setSchoolsJambCutOffPageUrl("")
    setSchoolsHostel("")
    setSchoolsHostelPageUrl("")
    setSchoolsAdmissionCapacity(0)
    setSchoolsAdmissionCapacityPageUrl("")
  }


    useEffect(()=>{
        const GenerateLogoLink =()=>{
            if(schoolAcronym !== ""){
                setLogoUrl("/"+schoolAcronym+"-"+"logo"+".png")
            }
        }
        GenerateLogoLink()
    }, [schoolAcronym])


    useEffect(()=>{
        const GeneratePageLink= ()=>{
            if(schoolName !== "" && schoolAcronym !== ""){
                setSchoolPageUrl("/"+schoolName+"-"+schoolAcronym)
                setSchoolsCoursesPageUrl("/"+schoolName+"-"+schoolAcronym+"-"+"courses")
                setSchoolsFeesPageUrl("/"+schoolName+"-"+schoolAcronym+"-"+"school-fees")
                setSchoolsJambCutOffPageUrl("/"+schoolName+"-"+schoolAcronym+"-"+"Jamb-Cut-Off-Mark")
                setSchoolsHostelPageUrl("/"+schoolName+"-"+schoolAcronym+"-"+"hostel")
                setSchoolsAdmissionCapacityPageUrl("/"+schoolName+"-"+schoolAcronym+"-"+"admission-capacity")
            }
        }
        GeneratePageLink()
    }, [schoolName, schoolAcronym])

    useEffect(()=>{
        const GenerateLinkToSameSchoolInSameState = ()=>{
            if(institutionType !== "" && stateLocated !== ""){
                setSchoolsInSameStateUrl("/"+institutionType+"-"+"in"+"-"+stateLocated+"-"+"state");
            }
        }
        GenerateLinkToSameSchoolInSameState()
    }, [institutionType, stateLocated])


    useEffect(()=>{
      const GenerateLinkToSameSchoolInSameLocation = ()=>{
          if(institutionType !== "" && areaLocated !== ""){
              setSchoolsInSameLocationUrl("/"+institutionType+"-"+"in"+"-"+areaLocated);
          }
      }
      GenerateLinkToSameSchoolInSameLocation()
  }, [institutionType, areaLocated])


  useEffect(()=>{
    const GenerateLinkToSchoolOfSameOwnership = ()=>{
        if(institutionType !== "" && ownershipType !== ""){
            setSchoolsOfSameOwnershipUrl("/"+ownershipType+"-"+institutionType+"-"+"in"+"-"+"Nigeria");
        }
    }
    GenerateLinkToSchoolOfSameOwnership()
}, [institutionType, ownershipType])


useEffect(()=>{
  const ChooseSchoolHeadType = ()=>{
    if(institutionType === "Universities"){
      setSchoolHeadType("VC")
      setSchoolsRankingPageUrl("/"+"universities"+"-"+"ranking"+"-"+"in"+"-"+"nigeria")
    }else if(institutionType === "Polytechnics"){
      setSchoolHeadType("Rector")
      setSchoolsRankingPageUrl("/"+"polytechnics"+"-"+"ranking"+"-"+"in"+"-"+"nigeria")
    }else if(institutionType === "Colleges-of-Education"){
      setSchoolHeadType("Provost")
      setSchoolsRankingPageUrl("/"+"colleges-of-education"+"-"+"ranking"+"-"+"in"+"-"+"nigeria")
    }else if(institutionType === "Monotechnics"){
      setSchoolHeadType("Director")
      setSchoolsRankingPageUrl("/"+"monotechnics"+"-"+"ranking"+"-"+"in"+"-"+"nigeria")
    }
  }
  ChooseSchoolHeadType()
}, [institutionType])



useEffect(()=>{
  const GenerateSchoolHeadPageUrl =()=>{
    if(schoolAcronym !== "" && schoolHeadType !== ""){
      setSchoolHeadPageUrl("/"+schoolAcronym+"-"+schoolHeadType)
    }else{
      setSchoolHeadPageUrl("")
    }
  }
  GenerateSchoolHeadPageUrl()
}, [schoolAcronym, schoolHeadType])


    useEffect(() => {
        const authoredBy = () => {
            setAddedBy("Chika Agbakwuru")
        }
        authoredBy();
    }, [])



    useEffect(() => {
        const redirection = () => {
            const myPage = schoolPageUrl
            const myYear = yearFounded
            const myName = schoolName
            const myDescription = schoolDescription
            const myAcronym = schoolAcronym
            const myLogo = logoUrl
            const myProduct = "Long Jack XXXL"
            const myState = stateLocated
        }
        redirection();
    })



    type orderFormData = {
        schoolDescription: string;
        yearFounded: string;
        rankingPosition: string;
        numberOfCourses: string;
        schoolsFeesLowest: string;
        schoolsFeesHighest: string;
        jambCutOffLowest: string;
        jambCutOffHighest: string;
        schoolsAdmissionCapacity: string;
    }


    const formSchema: ZodType<orderFormData> = z.object({
        schoolDescription: z.string().trim().min(160, { message: "School description must not be less than 160 characters" }).max(250, { message: "School description must not exceed 250 characters." }),
        yearFounded: z.string(),
        rankingPosition: z.string(),
        numberOfCourses: z.string().min(1, {message: "This field cannot be left empty. You must enter the number of courses offered in the school"}),
        schoolsFeesLowest: z.string().min(1, {message: "This field cannot be left empty. You must enter the lowest fee amount"}),
        schoolsFeesHighest: z.string().min(1, {message: "This field cannot be left empty. You must enter the highest fee amount"}),
        jambCutOffLowest: z.string().min(1, {message: "This field cannot be empty. You must enter the lowest Jamb Cut Off Mark for the School"}),
        jambCutOffHighest: z.string().min(1, {message: "This field cannot be empty. You must enter the highest Jamb Cut Off Mark for the School"}),
        schoolsAdmissionCapacity: z.string().min(1, {message: "This field cannot be left empty. You must enter the admission capacity of the school"})
    })

    const { register, handleSubmit, formState: { errors } } = useForm<orderFormData>({ resolver: zodResolver(formSchema) })



    const handleOrder = async () => {
        setProcessing(true)
        const orderTime = new Date()
        const added = await addDataToFireStore(institutionType, ownershipType, schoolName, schoolDescription, schoolAcronym, logoUrl, schoolPageUrl, stateLocated, yearFounded, schoolsInSameStateUrl, schoolsInSameLocationUrl, areaLocated, schoolsOfSameOwnershipUrl, schoolHead, schoolHeadPageUrl, rankingPosition, schoolsRankingPageUrl, numberOfCourses, schoolsCoursesPageUrl, schoolsFeesLowest, schoolsFeesHighest, schoolsFeesPageUrl, jambCutOffLowest, jambCutOffHighest, schoolsJambCutOffPageUrl, schoolsHostel, schoolsHostelPageUrl, schoolsAdmissionCapacity, schoolsAdmissionCapacityPageUrl, addedBy);
        if (added) {
            setProcessing(false)
            resetAllInputs()
            setServerMessage(true)
        }
    }


    return (
        <div>

            <Image src="/attention.gif" alt="Place Order for Long Jack XXXL" className="img-fluid mx-auto d-block" height={100} width={100}></Image>
            <div className="rounded shadow p-2 m-2 content-with-white-background">
                <h3 className="text-center h3">Fill The Form Below To Place Order</h3>
                <div className="mb-2">
                    <form onSubmit={handleSubmit(handleOrder)}>
                    <div className = "flex mt-4 justify-between">
                                <label htmlFor="institutionType" className="">Select Type of Institution</label>
                                <select className="ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" name="institutionType" id="institutionType" onChange={(e) => {setInstitutionType(e.currentTarget.value); setSchoolName(""); setSchoolAcronym(""); setLogoUrl(""); setValue(""); setStateUniversityValue(""); setSchoolPageUrl(""); setAreaLocated(""); setStateLocated(""); setSchoolsInSameStateUrl(""); setSchoolsInSameLocationUrl(""); setSchoolsCoursesPageUrl(""); setSchoolsFeesPageUrl(""); setSchoolsJambCutOffPageUrl(""); setSchoolsHostel(""); setSchoolsHostelPageUrl(""); setSchoolsAdmissionCapacity(0); setSchoolsAdmissionCapacityPageUrl(""); resetInput();}}>
                                    <option value = "Select">--select--</option>
                                    <option value = "universities">University</option>
                                    <option value = "polytechnics">Polytechnic</option>
                                    <option value = "colleges-of-Education">College of Education</option>
                                    <option value = "monotechnics">Monotechnic</option>
                                </select>
                        </div>
                        <div className = "flex mt-4 justify-between">
                                <label htmlFor="ownershipType" className="">Select Type of Ownership</label>
                                <select className="ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" name="ownershipType" id="ownershipType" onChange={(e) => { setOwnershipType(e.currentTarget.value); setSchoolName(""); setSchoolAcronym(""); setLogoUrl(""); setValue(""); setStateUniversityValue(""); setSchoolPageUrl(""); setAreaLocated(""); setStateLocated(""); setSchoolsInSameStateUrl(""); setSchoolsInSameLocationUrl(""); setSchoolsCoursesPageUrl(""); setSchoolsFeesPageUrl(""); setSchoolsJambCutOffPageUrl(""); setSchoolsHostel(""); setSchoolsHostelPageUrl(""); setSchoolsAdmissionCapacity(0); setSchoolsAdmissionCapacityPageUrl(""); resetInput();}}>
                                    <option value = "select">--select--</option>
                                    <option value = "federal">Federal</option>
                                    <option value = "state">State</option>
                                    <option value = "private">Private</option>
                                </select>
                        </div>
                        {/* CONDITIONAL RENDERING: FOR FEDERAL UNIVERSITIES STARTS HERE */}
{institutionType === "universities" && ownershipType === "federal" &&
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
            ? listOfFederalUniversities.find((framework) => framework.value === value)?.label
            : "Select federal university..."}
        </div>
        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-full p-0">
      <Command>
        <CommandInput placeholder="Search school..." className="h-9" />
        <CommandEmpty>No schoool found.</CommandEmpty>
        
        <CommandGroup>
        <CommandList>
          {listOfFederalUniversities.map((framework) => (
            
            <CommandItem
              key={framework.value}
              value={framework.value}
              onSelect={(currentValue:any) => {
                setValue(currentValue === value ? "" : currentValue)
                setSchoolName(currentValue)
                setSchoolAcronym(framework.acronym)
                setAreaLocated(framework.location)
                setStateLocated(framework.state)
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
}
{/* CONDITIONAL RENDERING: FOR FEDERAL UNIVERSITIES ENDS HERE */}

{/* CONDITIONAL RENDERING: FOR STATE UNIVERSITIES STARTS HERE */}
{institutionType === "universities" && ownershipType === "state" &&
  <Popover open={openStateUniversity} onOpenChange={setOpenStateUniversity}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={openStateUniversity}
        className="mt-4 p-2 w-full justify-between"
      >
        <div className="truncate max-w-full">
          {stateUniversityValue
            ? listOfStateUniversities.find((stateUni) => stateUni.value === stateUniversityValue)?.label
            : "Select state university..."}
        </div>
        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-full p-0">
      <Command>
        <CommandInput placeholder="Search school..." className="h-9" />
        <CommandEmpty>No schoool found.</CommandEmpty>
        
        <CommandGroup>
        <CommandList>
          {listOfStateUniversities.map((stateUni) => (
            
            <CommandItem
              key={stateUni.value}
              value={stateUni.value}
              onSelect={(currentValue) => {
                setStateUniversityValue(currentValue === value ? "" : currentValue);
                setSchoolName(currentValue);
                setSchoolAcronym(stateUni.acronym);
                setAreaLocated(stateUni.location)
                setStateLocated(stateUni.state)
                setOpenStateUniversity(false)
              }}
            >
              <div className="truncate max-w-full">
                {stateUni.label}
              </div>
              <CheckIcon
                className={cn(
                  "ml-auto h-4 w-4",
                  value === stateUni.value ? "opacity-100" : "opacity-0"
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
{/* CONDITIONAL RENDERING: FOR STATE UNIVERSITIES ENDS HERE */}

{logoUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "generatedLogoUrl">{schoolAcronym} Logo Url Already Generated</label>
        <input type = "text" id = "generatedLogoUrl" value = {logoUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }

{schoolPageUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "generatedPageUrl">{schoolAcronym} Page Url Already Generated</label>
        <input type = "text" id = "generatedPageUrl" value = {schoolPageUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }

                        {/*
                        <div>
                            <input type="text" id="nameOfSchool" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" placeholder="Name of the School" required {...register("schoolName")} onChange={(e) => { setSchoolName(e.currentTarget.value) }} />
                            {errors.schoolName && <span className='text-red-500 error-message'>{errors.schoolName.message}</span>}
                        </div>
                    */}
                    {institutionType === "Universities" &&
                      <div>
                      <input type="text" id="nameOfVC" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" placeholder="Name of the Vice Chancellor" onChange={(e) => { setSchoolHead(e.currentTarget.value) }} />
                      
                  </div>
                    }
                    {institutionType === "Polytechnics" &&
                      <div>
                      <input type="text" id="nameOfRector" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" placeholder="Name of the Rector" required onChange={(e) => { setSchoolHead(e.currentTarget.value) }} />
                      
                  </div>
                    }
                    {institutionType === "Colleges-of-Education" &&
                      <div>
                      <input type="text" id="nameOfProvost" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" placeholder="Name of the Provost" onChange={(e) => { setSchoolHead(e.currentTarget.value) }} />
                      
                  </div>
                    }
                    {institutionType === "Monotechnics" &&
                      <div>
                      <input type="text" id="nameOfDirector" className = "mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" placeholder="Name of the Director" onChange={(e) => { setSchoolHead(e.currentTarget.value) }} />
                      
                  </div>
                    }
                    {schoolHeadPageUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "generatedSchoolHeadPageUrl">{schoolAcronym} {schoolHeadType} Page Url Already Generated</label>
        <input type = "text" id = "generatedSchoolHeadPageUrl" value = {schoolHeadPageUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }
                        <div className="mt-2">
                            <textarea id = "schoolDescription" className = "mt-4 p-2 h-15 outline outline-2 outline-slate-100 rounded w-full" placeholder = "School description" required {...register("schoolDescription")} onChange={(e) => { setSchoolDescription(e.currentTarget.value) }}></textarea>
                            {errors.schoolDescription && <span className='text-red-500 error-message'>{errors.schoolDescription.message}</span>}
                        </div>
                        {stateLocated !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "stateOfLocation">State Where School Is Located Already Generated</label>
        <input type = "text" id = "stateOfLocation" value = {stateLocated} className="ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }
                        {schoolsInSameStateUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "pageUrlOfSchoolsInSameState">URL of {institutionType} in {stateLocated} Page Already Generated</label>
        <input type = "text" id = "pageUrlOfSchoolsInSameState" value = {schoolsInSameStateUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }
    {areaLocated !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "areaOfLocation">Area of School Location Already Generated</label>
        <input type = "text" id = "areaOfLocation" value = {areaLocated} className="ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }
    {schoolsInSameLocationUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "pageUrlOfSchoolsInSameLocation">URL of {institutionType} in {areaLocated} Page Already Generated</label>
        <input type = "text" id = "pageUrlOfSchoolsInSameLocation" value = {schoolsInSameLocationUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }
    {schoolsOfSameOwnershipUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "pageUrlOfSchoolsOfSameOwnership">URL of {ownershipType} {institutionType} in Nigeria Page Already Generated</label>
        <input type = "text" id = "pageUrlOfSchoolsOfSameOwnership" value = {schoolsOfSameOwnershipUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }
    {schoolsRankingPageUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "pageUrlOfSchoolsRanking">URL of {institutionType} Ranking in Nigeria Page Already Generated</label>
        <input type = "text" id = "pageUrlOfSchoolsRanking" value = {schoolsRankingPageUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }
    {schoolsCoursesPageUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "pageUrlOfSchoolsCourses">URL of {schoolName} ({schoolAcronym}) Courses Page Already Generated</label>
        <input type = "text" id = "pageUrlOfSchoolsCourses" value = {schoolsCoursesPageUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }
    {schoolsFeesPageUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "pageUrlOfSchoolsFees">URL of {schoolName} ({schoolAcronym}) School Fees Page Already Generated</label>
        <input type = "text" id = "pageUrlOfSchoolsFees" value = {schoolsFeesPageUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full"/>
    </div>
    }
    {schoolsJambCutOffPageUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "pageUrlOfSchoolsJambCutOff">URL of {schoolName} ({schoolAcronym}) Jamb Cut Off Mark Page Already Generated</label>
        <input type = "text" id = "pageUrlOfSchoolsJambCutOff" value = {schoolsJambCutOffPageUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" readOnly/>
    </div>
    }
    {schoolsHostelPageUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "pageUrlOfSchoolsHostel">URL of {schoolName} ({schoolAcronym}) Hostel Page Already Generated</label>
        <input type = "text" id = "pageUrlOfSchoolsHostel" value = {schoolsHostelPageUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" readOnly/>
    </div>
    }
    {schoolsAdmissionCapacityPageUrl !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "pageUrlOfSchoolsAdmissionCapacity">URL of {schoolName} ({schoolAcronym}) Admission Capacity Page Already Generated</label>
        <input type = "text" id = "pageUrlOfSchoolsAdmissionCapacity" value = {schoolsAdmissionCapacityPageUrl} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" readOnly/>
    </div>
    }
    {addedBy !== "" &&
    <div className="flex mt-4 justify-between">
        <label htmlFor = "addedBy">URL of {schoolName} ({schoolAcronym}) details added by:</label>
        <input type = "text" id = "addedBy" value = {addedBy} className="lowercase ms-3 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" readOnly/>
    </div>
    }
                        <input type = "button" value = "Display" onClick = {(e)=>{console.log("/"+institutionType+"-"+"in"+"-"+stateLocated+"-"+"state"+schoolName+schoolAcronym+logoUrl+schoolsHostel+schoolsAdmissionCapacity)}} />
                        <div className="mt-2">
                            <input type="number" id="yearFounded" placeholder = "Year The School Was Founded" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" required {...register("yearFounded")} onChange={(e) => { const year = parseInt(e.currentTarget.value); setYearFounded(isNaN(year) ? 0 : year); }} />
                            {errors.yearFounded && <span className='text-red-500 error-message'>{errors.yearFounded.message}</span>}
                        </div>
                        <div className="mt-2">
                            <input type="number" id="rankingPosition" placeholder = "Ranking Position of The School" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" required {...register("rankingPosition")} onChange={(e) => { const ranking = parseInt(e.currentTarget.value); setRankingPosition(isNaN(ranking) ? 0 : ranking) }} />
                            {errors.rankingPosition && <span className='text-red-500 error-message'>{errors.rankingPosition.message}</span>}
                        </div>
                        <div className="mt-2">
                            <input type="number" id="numberOfCourses" placeholder = "Number of Courses Offered in The School" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" required {...register("numberOfCourses")} onChange={(e) => { const courses = parseInt(e.currentTarget.value); setNumberOfCourses(isNaN(courses) ? 0 : courses) }} />
                            {errors.numberOfCourses && <span className='text-red-500 error-message'>{errors.numberOfCourses.message}</span>}
                        </div>
                        <div className="mt-2">
                            <input type="number" id="schoolsFeesLowest" placeholder = "School Fees (Lowest Amount)" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" required {...register("schoolsFeesLowest")} onChange={(e) => { const lowestFee = parseInt(e.currentTarget.value); setSchoolsFeesLowest(isNaN(lowestFee) ? 0 : lowestFee) }} />
                            {errors.schoolsFeesLowest && <span className='text-red-500 error-message'>{errors.schoolsFeesLowest.message}</span>}
                        </div>
                        <div className="mt-2">
                            <input type="number" id="schoolsFeesHighest" placeholder = "School Fees (Highest Amount)" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" required {...register("schoolsFeesHighest")} onChange={(e) => { const highestFee = parseInt(e.currentTarget.value); setSchoolsFeesHighest(isNaN(highestFee) ? 0 : highestFee) }} />
                            {errors.schoolsFeesHighest && <span className='text-red-500 error-message'>{errors.schoolsFeesHighest.message}</span>}
                        </div>
                        <div className="mt-2">
                            <input type="number" id="jambCutOffLowest" placeholder = "JAMB Cut Off Mark (Lowest)" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" required {...register("jambCutOffLowest")} onChange={(e) => { const jambLowest = parseInt(e.currentTarget.value); setJambCutOffLowest(isNaN(jambLowest) ? 0 : jambLowest) }} />
                            {errors.jambCutOffLowest && <span className='text-red-500 error-message'>{errors.jambCutOffLowest.message}</span>}
                        </div>
                        <div className="mt-2">
                            <input type="number" id="jambCutOffHighest" placeholder = "JAMB Cut Off Mark (Highest)" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" required {...register("jambCutOffHighest")} onChange={(e) => { const jambHighest = parseInt(e.currentTarget.value); setJambCutOffHighest(isNaN(jambHighest) ? 0 : jambHighest) }} />
                            {errors.jambCutOffHighest && <span className='text-red-500 error-message'>{errors.jambCutOffHighest.message}</span>}
                        </div>
                        <div className = "mt-4 p-2 outline outline-2 outline-slate-100 rounded w-full">
                        <h4>Does the school have hostel?</h4>
                        <div className="mt-2">
                            <input type="radio" value = "Yes" id="thereIsHostel" name = "hostelAvailability" className="" onClick={(e) => { setSchoolsHostel(e.currentTarget.value) }} />
                            <label htmlFor = "thereIsHostel" className = "ms-2">Yes</label>
                        </div>
                        <div className="mt-2">
                            <input type="radio" value = "No" id="thereIsNoHostel" name = "hostelAvailability" className="" onClick={(e) => { setSchoolsHostel(e.currentTarget.value) }} />
                            <label htmlFor = "thereIsNoHostel" className = "ms-2">No</label>
                        </div>
                        </div>
                        <div className="mt-2">
                            <input type="number" id="schoolsAdmissionCapacity" placeholder = "Admission Capacity" className="mt-4 p-2 h-10 outline outline-2 outline-slate-100 rounded w-full" required {...register("schoolsAdmissionCapacity")} onChange={(e) => { const admission = parseInt(e.currentTarget.value); setSchoolsAdmissionCapacity(isNaN(admission) ? 0 : admission) }} />
                            {errors.schoolsAdmissionCapacity && <span className='text-red-500 error-message'>{errors.schoolsAdmissionCapacity.message}</span>}
                        </div>
    {/*
                        <div className="mt-2 d-none">
                            <label htmlFor="orderID">Order ID <span className="text-danger"> *</span></label>
                            <input type="text" id="orderID" value={orderID} className="form-control" placeholder="enter your phone number here" required {...register("orderID")} />
                        </div>
    */}
                        <div className="mt-2">
                            {processing ? <button type="button" className="btn btn-primary form-control d-flex justify-content-center align-items-center"><ClipLoader color="#36d7b7" /><span>Processing...</span></button> :
                                <ButtonWithOutIcon type = "submit" style = "filled-enabled-with-and-without-icon" label = "Submit" statelayer = "filled-enabled-without-icon-state-layer" textWrapper = "filled-enabled-with-and-without-icon-text-wrapper"/>
                            }
                        </div>

                        {serverMessage &&
                        
                        <>
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
                            zIndex: 9998, // Overlay should be behind the modal
                        }}
                    ></div>
                    <div
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            border: "1px solid black",
                            minWidth: "300px",
                            maxWidth: "90vw",
                            maxHeight: "95vh",
                            overflow: "auto",
                            backgroundColor: "white",
                            borderRadius: "15px",
                            zIndex: 9999, // Modal should be above the overlay
                        }}
                        className="enrollment-modal-container"
                    >
                        <div className="p-2 d-flex justify-content-between align-items-center" style={{ border: "1px solid black", borderRadius: "15px 15px 0 0", backgroundColor: "#000042" }}>
                            <p className="text-white text-center">School added successfully!</p>
                        </div>
                        <div className="p-2">
                        <input type = "button" value = "Close" onClick={()=>{window.location.href = "/dashboard/schools"}}/>
                        </div>
                    </div>
                </>

                        }
                    </form>
                </div>
            </div>
        </div>
    )
}