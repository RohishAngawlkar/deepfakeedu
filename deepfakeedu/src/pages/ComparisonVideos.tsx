import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import React, { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { useNavigate } from 'react-router-dom'

const TaskVideo = () => {
    const navigate = useNavigate()
    const player1 = useRef(null)
    const player2 = useRef(null)
    const [playing, setPlaying] = useState(false)

    const togglePlayPause = () => {
        setPlaying(!playing)
    }

    return (
        <>
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
                        <div className='flex justify-center items-center space-x-2'>
                            <div className='w-3/5'>
                                <ReactPlayer
                                    ref={player1}
                                    url={"https://www.youtube.com/watch?v=WL9EOfzoSsA&ab_channel=QuietQuest-StudyMusic"}
                                    playing={playing}
                                    controls={true}
                                    width="100%"
                                    height="auto"
                                />
                            </div>
                            <div className='w-3/5'>
                                <ReactPlayer
                                    ref={player2}
                                    url={"https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"}
                                    playing={playing}
                                    controls={true}
                                    width="100%"
                                    height="auto"
                                />
                            </div>
                        </div>
                        <div className='w-full text-center'>
                            <Button onClick={togglePlayPause} className='rounded-full w-1/5 bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300'>
                                {playing ? 'Pause Videos' : 'Play Videos'}
                            </Button>
                        </div>
                        <div className='w-full text-center'>
                            <Button onClick={() => navigate("/Task-Explanation")} className='rounded-full w-1/5 bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300'>
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskVideo
