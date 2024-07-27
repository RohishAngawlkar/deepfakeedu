import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const GenerativeMediaQuestion = () => {
    const navigate = useNavigate()
    return (<>
        <Navbar />
        <div className="antialiased">
            <div className="flex items-center justify-center h-screen w-screen">
                <div className="space-y-5">
                    <h1 className="text-center font-bold text-6xl">
                        Are You Aware Generative AI Media ?
                    </h1>
                    <p className="text-center">
                        Generative AI models can take inputs such as image, generate new content into any of the modalities.
                    </p>
                    <p className='text-center text-2xl font-semibold'>Here a Small Assessment To
                        Know Your Awerness.</p>
                    <div className='w-full text-center'>
                        <Button onClick={() => navigate("/comparison-videos")} className='rounded-full w-1/5 bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300'>Next</Button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default GenerativeMediaQuestion
