import Image from "next/image"

export default function LoadingIndicator(){
    return(
        <div className = "flex items-center justify-items-center h-screen w-full">
            <Image src = "/spradapp-logo-cropped.png" height = {50} width = {50} alt = "Spradapp Loading Indicator" className = "animate-ping mx-auto"/>
        </div>
    )
}