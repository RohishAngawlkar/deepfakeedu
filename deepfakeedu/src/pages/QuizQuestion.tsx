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
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        </p>
                        <RadioGroup defaultValue="option-one">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-one" id="option-one" />
                                <Label htmlFor="option-one">Option One</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-two" id="option-two" />
                                <Label htmlFor="option-two">Option Two</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-three" id="option-three" />
                                <Label htmlFor="option-two">Option Three</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-four" id="option-four" />
                                <Label htmlFor="option-two">Option Four</Label>
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
