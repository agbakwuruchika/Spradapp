'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import SocialMediaPostCardTemplate from "@/components/social-media-post-card-template";
import { db } from '@/firebase/config';
import { getDocs, collection, query, where, orderBy, DocumentData } from 'firebase/firestore';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
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
  } from "@/components/ui/carousel";

// Define the types for the course and influencer data
interface Course {
    id: string;
    Title: string;
    Course_Category: string;
    Course_Description: string;
    Eligible_Educational_Qualification: string;
    Minimum_Class_Of_Degree: string;
    NYSC_Certificate_Required: string;
    Work_Experience: string;
    Professional_Qualification: string;
    Eligible_Courses: string;
    Entrance_Exam: string;
    Postgraduate_Type: string;
    Learning_Option: string;
    Career_Prospects: string;
    PG_Courses_For_HND_Holders_Link?: string;
    PG_Courses_Third_Class_Holders_Link?: string;
    Apply_Without_NYSC_Link?: string;
    PG_Courses_Without_Work_Experience?: string;
    PG_Courses_Without_Professional_Qualification?: string;
    Course_Finder_Link?: string;
    PG_Courses_Without_Entrance_Exam_Link?: string;
    Academic_Vs_Professional_Master_Link?: string;
    Distance_Learning_Program_Link?: string;
    Career_Counselling_Link?: string;
    School_Name: string;
}

interface Influencer {
    id: string;
    Name: string;
    Profile_Picture: string;
    Bio: string;
    Course: string;
    Followers: number;
    Username: string;
    Platform: string;
    Profile_Link: string;
}

async function FetchUNILAGPGCourses(): Promise<Course[]> {
    const q = query(collection(db, "Postgraduate Courses in Nigeria"), where("School_Name", "==", "university-of-lagos"), orderBy("Title", "asc"));
    const querySnapshot = await getDocs(q);
    const data: Course[] = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Course);
    });
    return data;
}

async function FetchInfluencers(influencerCourse: string): Promise<Influencer[]> {
    const q = query(collection(db, "Profiles"), where("Course", "==", influencerCourse), orderBy("Followers", "desc"));
    const querySnapshot = await getDocs(q);
    const data: Influencer[] = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Influencer);
    });
    return data;
}

export default function ListOfUNILAGPGDCourses() {
    const [postgraduateCourses, setPostgraduateCourses] = useState<Course[]>([]);
    const [schoolInfluencers, setSchoolInfluencers] = useState<Influencer[]>([]);
    const [numberOfPostgraduateCourses, setNumberOfPostgraduateCourses] = useState<number>(0);

    useEffect(() => {
        async function fetchData() {
            const data = await FetchUNILAGPGCourses();
            const modifiedData = data.map(course => ({
                ...course,
                School_Name: course.School_Name.replace(/-/g, ' ')
            }));
            setPostgraduateCourses(modifiedData);
        }
        fetchData();
    }, []);

    const fetchInfluencersForCourse = async (influencerCourse: string) => {
        const influencers = await FetchInfluencers(influencerCourse);
        setSchoolInfluencers(influencers);
        console.log("Influencers for Course", influencerCourse, influencers);
    };

    useEffect(() => {
        setNumberOfPostgraduateCourses(postgraduateCourses.length);
    }, [postgraduateCourses]);

    return (
        <div>
            <h2 className="text-2xl mt-2">List of UNILAG Postgraduate Courses ({numberOfPostgraduateCourses})</h2>
            {postgraduateCourses.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                    <ol>
                        {postgraduateCourses.map((course) => (
                            <AccordionItem key={course.id} value={course.id}>
                                <AccordionTrigger onClick={() => fetchInfluencersForCourse(course.Title)}>
                                    <li className="flex items-center gap-x-2 capitalize">
                                        {course.Title} <span className="uppercase">({course.Course_Category})</span>
                                    </li>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p>{course.Course_Description}</p>
                                    <div className="flex justify-start mt-2 gap-x-2">
                                        <div className="basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                            <h3 className="text-base font-medium">Educational Qualification:</h3>
                                            <p className="uppercase mt-0">{course.Eligible_Educational_Qualification}</p>
                                            {course.PG_Courses_For_HND_Holders_Link &&
                                                <p>Check here for available <Link href={course.PG_Courses_For_HND_Holders_Link} className="capitalize text-blue-600">PG Courses for HND Holders</Link></p>
                                            }
                                        </div>
                                        <div className="basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                            <h3 className="text-base font-medium">Class of Degree:</h3>
                                            <p className="capitalize">Minimum of {course.Minimum_Class_Of_Degree}</p>
                                            {course.PG_Courses_Third_Class_Holders_Link &&
                                                <p>Check here for full list of <Link href={course.PG_Courses_Third_Class_Holders_Link} className="text-blue-600">PG Courses for Third Class Holders</Link></p>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex justify-start mt-2 gap-x-2">
                                        <div className="basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                            <h3 className="text-base font-medium">NYSC Certificate Required:</h3>
                                            <p className="mt-0 capitalize">{course.NYSC_Certificate_Required}</p>
                                            {course.Apply_Without_NYSC_Link &&
                                                <p>Don't have it? <Link href={course.Apply_Without_NYSC_Link} className="text-blue-600">Here is a way out</Link></p>
                                            }
                                        </div>
                                        <div className="basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                            <h3 className="text-base font-medium">Work Experience:</h3>
                                            <p className="capitalize">{course.Work_Experience}</p>
                                            {course.PG_Courses_Without_Work_Experience &&
                                                <p>Here are <Link href={course.PG_Courses_Without_Work_Experience} className="text-blue-600">List of PG Courses That Do Not Require Work Experience</Link></p>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex justify-start mt-2 gap-x-2">
                                        <div className="basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                            <h3 className="text-base font-medium">Professional Qualification:</h3>
                                            <p className="mt-0">{course.Professional_Qualification}</p>
                                            {course.PG_Courses_Without_Professional_Qualification &&
                                                <p>Here are <Link href={course.PG_Courses_Without_Professional_Qualification} className="text-blue-600">List of UNILAG Postgraduate Courses That Do Not Require Professional Qualification</Link></p>
                                            }
                                        </div>
                                        <div className="basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                            <h3 className="text-base font-medium">Eligible Courses:</h3>
                                            <p className="capitalize">{course.Eligible_Courses}</p>
                                            {course.Course_Finder_Link &&
                                                <p>Didn't see the course you studied, use Spradapp <Link href={course.Course_Finder_Link} className="text-blue-600">School and Course Finder</Link> to find it</p>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex justify-start mt-2 gap-x-2">
                                        <div className="basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                            <h3 className="text-base font-medium">Entrance Exam:</h3>
                                            <p className="mt-0">{course.Entrance_Exam}</p>
                                            {course.PG_Courses_Without_Entrance_Exam_Link &&
                                                <p>Don't want to write entrance exam? Here is the <Link href={course.PG_Courses_Without_Entrance_Exam_Link} className="text-blue-600">List of PG Courses Without Entrance Exam</Link></p>
                                            }
                                        </div>
                                        <div className="basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                            <h3 className="text-base font-medium">Postgraduate Type:</h3>
                                            <p className="capitalize">{course.Postgraduate_Type}</p>
                                            {course.Academic_Vs_Professional_Master_Link &&
                                                <p>Here is a clear guide on <Link href={course.Academic_Vs_Professional_Master_Link} className="text-blue-600">Academic vs Professional Masters Degree</Link></p>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex justify-start mt-2 gap-x-2">
                                        <div className="basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                            <h3 className="text-base font-medium">Learning Option:</h3>
                                            <p>{course.Learning_Option}</p>
                                            {course.Distance_Learning_Program_Link &&
                                                <p>Here is the full list of <Link href={course.Distance_Learning_Program_Link} className="text-blue-600">UNILAG Postgraduate Distance Learning Programme</Link></p>
                                            }
                                        </div>
                                        <div className="basis-1/2 p-3 rounded-xl border hover:bg-gray-200">
                                            <h3 className="text-base font-medium">Career Prospects:</h3>
                                            <p>{course.Career_Prospects}</p>
                                            {course.Career_Counselling_Link &&
                                                <p>Not sure which career to choose? <Link href={course.Career_Counselling_Link} className="text-blue-600">See here for Counselling</Link></p>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-y-2 mt-4">
                                        <div>
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="text-base font-bold capitalize">{course.Course_Category} Influencers</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="flex flex-wrap gap-4">
                                                        {schoolInfluencers.map((influencer) => (
                                                            <SocialMediaPostCardTemplate
                                                                key={influencer.id}
                                                                name={influencer.Name}
                                                                profilePicture={influencer.Profile_Picture}
                                                                bio={influencer.Bio}
                                                                course={influencer.Course}
                                                                followers={influencer.Followers}
                                                                username={influencer.Username}
                                                                platform={influencer.Platform}
                                                                profileLink={influencer.Profile_Link}
                                                            />
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                        <div>
                                            <ButtonWithIcon
                                                icon={<FaPlus />}
                                                text="Add to my list"
                                                onClick={() => {/* Handle the click event */}}
                                            />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </ol>
                </Accordion>
            ) : (
                <p>No postgraduate courses found.</p>
            )}
        </div>
    );
}
