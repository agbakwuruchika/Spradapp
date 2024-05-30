import Image from 'next/image'
import TopAppBar from '@/components/top-app-bar'
import NavigationDrawer from '@/components/navigation-drawer'
import SideSheets from '@/components/side-sheets'
import SocialMediaPostCard from '@/components/social-media-post-card'
import BottomAppBar from '@/components/bottom-app-bar'
import ListOfUNILAGPGDCourses from './list-of-unilag-pg-courses'
import { Metadata } from 'next'


export const metadata:Metadata = {
  title: "UNILAG Postgraduate Courses and Requirements"
}


export default function UNILAG() {
  return (
    <div className="overAllContainer flex min-h-screen flex-col relative"> 
      <TopAppBar title = "Home Feed"/>
      <div className = "body-container flex px-4 mt-4 relative">
        <div className = "left-side-bar w-96 fixed hidden md:block"> 
          <NavigationDrawer />  
        </div>
        <div className = "main-content content-sub-container md:ml-96 md:mr-4 w-full md:flex-grow" style={{ borderRadius: 12, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, marginBottom: 16 }}>
          
          <h1 className = "text-center text-2xl">List of UNILAG Postgraduate Courses and Requirements for 2024/2025</h1>
          <p className = "text-base mt-3">Are you considering pursuing a postgraduate degree at the University of Lagos (UNILAG)? If so, you have come to the right place.</p>
          <p className = "text-base mt-3">In this ultimate guide, we will provide you with a comprehensive list of UNILAG Postgraduate Courses and Requirements.</p>
          <p className = "text-base mt-3">Whether you have a passion for social sciences, engineering, arts, or business, UNILAG offers a wide range of programs to suit your interests.</p>
          <p className = "text-base mt-3">Navigating the admission process can be overwhelming, but fear not.</p>
          <p className = "text-base mt-3">We will break down the requirements for each course, including the academic qualifications, entrance exams, and other criteria you need to fulfill.</p>
          <p className = "text-base mt-3">This guide will serve as your roadmap to ensure you meet all the necessary prerequisites and increase your chances of securing a spot in your desired program.</p>
          <p className = "text-base mt-3">Whether you are a recent graduate, a working professional looking to enhance your skills, or an international student considering studying in Nigeria, UNILAG provides opportunities for everyone.</p>
          <p className = "text-base mt-3">With its renowed faculty, state-of-the-art facilities, and commitment to academic excellence, UNILAG is a top choice for postgraduate education.</p>
          <p className = "text-base mt-3">So let us dive in and explore the exciting postgraduate options that UNILAG has to offer.</p>
          <ul>
            <li>Benefits of Pursuing a Postgraduate Degree at UNILAG</li>
            <li>List of Available Postgraduate Courses at UNILAG</li>
            <li>Admission Requirements for Postgraduate Courses at UNILAG</li>
            <li>Application Process for UNILAG Postgraduate Programs</li>
            <li>Tips for Preparing for UNILAG Postgraduate Entrance Exams</li>
            <li>Scholarships and Funding Opportunities for UNILAG Postgraduate Students</li>
            <li>Career Prospects and Opportunities for UNILAG Postgraduate Degree Holders</li>
            <li>Alumni Success Stories from UNILAG Postgraduate Programs</li>
            <li>Conclusion: Why UNILAG is the Ideal Choice for your Postgraduate Studies</li>
          </ul>
          <ListOfUNILAGPGDCourses />
        </div>
        <div className = "right-side-bar w-96 hidden md:block">
          <SideSheets />

        </div>
          
      </div>
      <BottomAppBar />
      
    </div>
  )
}
