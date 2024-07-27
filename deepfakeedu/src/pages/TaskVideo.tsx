import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import React from 'react'
import ReactPlayer from 'react-player'
import { useNavigate } from 'react-router-dom'

const TaskVideo = () => {
    const navigate = useNavigate()
    return (<>
        <Navbar />
        <div className="antialiased">
            <div className="flex items-center justify-center h-screen w-screen">
                <div className="space-y-5">
                    <h1 className="text-center font-bold text-6xl">
                        Task Video
                    </h1>
                    <p className="text-center">
                        Can be deepfake or original?
                    </p>
                    <div className='text-center'>
                        <ReactPlayer url={"https://www.youtube.com/watch?v=WL9EOfzoSsA&ab_channel=QuietQuest-StudyMusic"} />
                    </div>
                    <div className='w-full text-center'>
                        <Button onClick={() => navigate("/quiz-question")} className='rounded-full w-1/5 bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300'>Next</Button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default TaskVideo
