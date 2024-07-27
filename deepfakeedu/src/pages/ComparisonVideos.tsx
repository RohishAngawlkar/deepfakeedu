import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import React from 'react'
import ReactPlayer from 'react-player'
import { useNavigate } from 'react-router-dom'

const ComparisonVideos = () => {
    const navigate = useNavigate()
    return (
        <>
            <Navbar />
            <div className="antialiased">
                <div className="flex items-center justify-center h-screen w-screen">
                    <div className="space-y-5">
                        <h1 className="text-center font-bold text-6xl">
                            Comparison Videos
                        </h1>
                        <p className="text-center">
                            Can be deepfake or original?
                        </p>
                        <div className='grid grid-cols-2 gap-5'>
                            <div className='text-center'>
                                <Label>Deepfake</Label>
                                <ReactPlayer url={"https://www.youtube.com/watch?v=WL9EOfzoSsA&ab_channel=QuietQuest-StudyMusic"} />
                            </div>
                            <div className='text-center'>
                                <Label>Original</Label>
                                <ReactPlayer url={"https://www.youtube.com/watch?v=WL9EOfzoSsA&ab_channel=QuietQuest-StudyMusic"} />
                            </div>
                        </div>
                        <div className='w-full text-center'>
                            <Button onClick={() => navigate("/task-explanation")} className='rounded-full w-1/5 bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300'>Next</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ComparisonVideos
