import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useNavigate } from 'react-router-dom'

const QuizQuestion = () => {
    const navigate = useNavigate()
    const handleNextClick = () => {
        navigate("/result")
    }
    return (
        <>
            <Navbar />
            <div className="antialiased">
                <div className="flex items-center justify-center h-screen w-screen">
                    <div className="space-y-5">
                        <h1 className="text-center font-bold text-6xl">
                            Quiz Question ?
                        </h1>
                        <p className="text-center">
                            Based on your analysis of the video and the differences between deepfake and original videos, what is your conclusion about the video's authenticity?
                        </p>
                        <RadioGroup defaultValue="option-one">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-one" id="option-one" />
                                <Label htmlFor="option-one">The video is a deepfake based on visual inconsistencies.</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-two" id="option-two" />
                                <Label htmlFor="option-two">The video is original due to the natural flow and features.</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-three" id="option-three" />
                                <Label htmlFor="option-two">The video seems like a deepfake but with some original characteristics.</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-four" id="option-four" />
                                <Label htmlFor="option-two">The video appears original but has some deepfake traits.</Label>
                            </div>
                        </RadioGroup>
                        <div className='w-full text-center'>
                            <Button onClick={handleNextClick} className='rounded-full w-1/5 bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300'>Next</Button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default QuizQuestion
