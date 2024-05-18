import Image from 'next/image'
import TopAppBar from '@/components/top-app-bar'
import BottomAppBar from '@/components/bottom-app-bar'
import NavigationDrawer from '@/components/navigation-drawer'
import SideSheets from '@/components/side-sheets'
import CbtEnglish from '@/components/cbt-english'
import Link from 'next/link'
import SocialMediaPostCard from '@/components/social-media-post-card'
import ListOfUniversitiesInNigeria from '@/components/list-of-universities-in-nigeria'
import ListOfStateUniversitiesInNigeria from '@/components/list-of-state-universities-in-nigeria'
import ListOfPrivateUniversitiesInNigeria from '@/components/list-of-private-universities-in-nigeria'
import { Metadata } from 'next'

export const metadata:Metadata = {
  title: "List of Universities in Nigeria"
}


export default function UniversitiesInNigeria() {
  return (
    <div className="overAllContainer flex min-h-screen flex-col relative"> 
      <TopAppBar />
      <div className = "body-container flex px-4 mt-4 relative">
        <div className = "left-side-bar w-96 fixed hidden md:block"> 
          <NavigationDrawer />  
        </div>
        <div className = "main-content content-sub-container md:ml-96 md:mr-4 w-full md:flex-grow" style={{ borderRadius: 12, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, marginBottom: 16 }}>
          
          <h1 className = "text-center text-2xl">List of Universities in Nigeria</h1>
          <hr />
          <Image src = "/list-of-universities-in-nigeria.png" alt="List of Universities in Nigeria" width = {500} height = {600} className = "w-full"/>
          <CbtEnglish />
          <p className = "text-base mt-2">Are you considering pursuing higher education in Nigeria?</p>
          <p className = "text-base mt-3">With a multitude of universities across the country, choosing the right one for your academic and career goals can be a daunting task.</p>
          <p className = "text-base mt-3">To help you navigate this important decision, we&apos;ve compiled an updated list of universities in Nigeria for 2024.</p>
          <p className = "text-base mt-3">This comprehensive guide will provide you with essential information about each institution, including their locations, list of courses, school fees, admission requirements, etc.</p>
          <p className = "text-base mt-3">Let&apos;s dive in and explore the diverse array of educational opportunities available in Nigeria.</p>
          <h2 className = "text-2xl mt-2">List of Universities in Nigeria</h2>
          <p className = "text-base mt-3">On the basis of ownership, the universities in Nigeria can be categorized into three namely: </p>
          <ol>
            <li><Link href = "#federalUniversities">Federal Universities</Link></li>
            <li><Link href = "#stateUniversities">State Universities</Link></li>
            <li><Link href = "#privateUniversities">Private Universities</Link></li>
          </ol>
          <div id = "federalUniversities">
          <ListOfUniversitiesInNigeria />
          </div>
          <div id = "stateUniversities">
          <ListOfStateUniversitiesInNigeria />
          </div>
          <h3 className = "text-2xl mt-2" id = "stateUniversities">List of Private Universities in Nigeria</h3>
          <ListOfPrivateUniversitiesInNigeria />


      
          
          
        </div>
        <div className = "right-side-bar w-96 hidden md:block">
          <SideSheets />

        </div>
          
      </div>
      <BottomAppBar />
    </div>
  )
}
