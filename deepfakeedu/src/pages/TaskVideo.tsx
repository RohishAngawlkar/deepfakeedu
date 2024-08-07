import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';

const TaskVideoSingle = () => {
    const navigate = useNavigate();
    const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
        // Fetch video URLs from localStorage
        const url1 = localStorage.getItem('video1');
        const url2 = localStorage.getItem('video2');

        // Randomly select one of the URLs
        const selectedUrl = Math.random() < 0.5 ? url1 : url2;
        setVideoUrl(selectedUrl);
    }, []);

    return (
        <>
            <Navbar />
            <div className="antialiased">
                <div className="flex items-center justify-center h-screen w-screen">
                    <div className="space-y-5 text-center">
                        <h1 className="font-bold text-6xl">
                            Task Video
                        </h1>
                        <p>
                            Can be deepfake or original?
                        </p>
                        <div className='flex justify-center'>
                            {videoUrl && (
                                <ReactPlayer
                                    url={videoUrl}
                                    playing={true}
                                    controls={true}
                                    width="50%"
                                    height="50%"
                                    muted={true}
                                    config={{
                                        file: {
                                            attributes: {
                                                disablePictureInPicture: true,
                                                controlsList: 'nodownload',
                                            },
                                        },
                                    }}
                                />
                            )}
                        </div>
                        <div className='w-full text-center'>
                            <Button onClick={() => navigate("/Quiz-Question")} className='rounded-full w-1/5 bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300'>Next</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TaskVideoSingle;
