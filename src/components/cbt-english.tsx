'use client'
import { useState } from "react";
import Timer from "./timer";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

const english = [
    {ID: "#1980", year:1980, questions:[
        {question:"What is 2 + 2?", options:["3", "4", "5", "6"], correctAnswer:"4"},
        {question:"What is the capital of France?", options:["Berlin", "Paris", "Berlin", "London"], correctAnswer:"Paris"}
]},
    {ID: "#1981", year:1981, questions:[
        {question:"What is 1 + 2?", options:["3", "4", "5", "6"], correctAnswer:"3"},
        {question:"What is the capital of Nigeria?", options:["Berlin", "Paris", "Abuja", "London"], correctAnswer:"Abuja"}
    ]},
    {ID: "#1982", year:1982, questions:[
        {question:"What is 3 + 2?", options:["3", "4", "5", "6"], correctAnswer:"5"},
        {question:"What is the capital of Ghana?", options:["Accra", "Paris", "Berlin", "London"], correctAnswer:"Accra"}
    ]}
]


const CbtEnglish = () =>{
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [isGameOver, setIsGameOver] = useState(false)

    return(
        <div>
            <Accordion type="single" collapsible className="w-full">
            <ol>
                {english.map((pq)=>{
                    const handleAnswer = (selectedOption:any) => {
                        if(selectedOption === pq.questions[currentQuestion].correctAnswer){
                            setScore((prevScore) => prevScore + 1)
                        }
                        if(currentQuestion === pq.questions.length - 1){
                            setIsGameOver(true)
                        }else{
                            setCurrentQuestion((prevQuestion) => prevQuestion + 1)
                        }
                    }
                
                    const handleTimerComplete = () =>{
                        setIsGameOver(true)
                    }
                    return(
                        <AccordionItem key = {pq.year} value = {pq.ID}>
                            <AccordionTrigger>
                        <li className = "flex items-center gap-x-2">
                            {pq.year} JAMB Past Questions for English
                        </li>
                            </AccordionTrigger>
                            <AccordionContent>
                            {!isGameOver ? (
                <>
                <div>{pq.questions[currentQuestion].question}</div>
                <div>
                    {pq.questions[currentQuestion].options.map((option)=>(
                        <button key = {option} onClick = {()=> handleAnswer(option)}>
                            {option}
                        </button>

                    ))}
                </div>
                <Timer time = {300} onComplete={handleTimerComplete}/>
                
                </>

            ):(
                <div>
                    <h2>Game Over!</h2>
                    <p>Your score: {score}</p>
                </div>

            )

            }
                                

                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </ol>
            </Accordion>

        </div>

    )
}

export default CbtEnglish