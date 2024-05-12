import Image from 'next/image'
import TopAppBar from '@/components/top-app-bar'
import NavigationDrawer from '@/components/navigation-drawer'
import SideSheets from '@/components/side-sheets'
import SocialMediaPostCard from '@/components/social-media-post-card'
import BottomAppBar from '@/components/bottom-app-bar'
import { Metadata } from 'next'


export const metadata:Metadata = {
  title: "Abubakar Tafawa Balewa University (ATBU)"
}


export default function ATBU() {
  return (
    <div className="overAllContainer flex min-h-screen flex-col relative"> 
      <TopAppBar title = "Home Feed"/>
      <div className = "body-container flex px-4 mt-4 relative">
        <div className = "left-side-bar w-96 fixed hidden md:block"> 
          <NavigationDrawer />  
        </div>
        <div className = "main-content md:ml-96 md:mr-4 w-full md:flex-grow">
          
          <h1>List of Universities in Dutse</h1>
        </div>
        <div className = "right-side-bar w-96 hidden md:block">
          <SideSheets />

        </div>
          
      </div>
      <BottomAppBar />
      
    </div>
  )
}
