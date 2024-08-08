import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskVideo = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch video data from PocketBase
        axios.get('https://genaiedu.pockethost.io/api/collections/videos/records')
            .then(response => {
                const videos = response.data.items;
                console.log('Fetched videos:', videos); // Log fetched videos
                if (videos && videos.length > 0) {
                    // Select a random video
                    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
                    console.log('Selected video:', randomVideo); // Log selected video
                    // Use either the deepfake or original field based on your requirement
                    const url = randomVideo.deepfake || randomVideo.original;
                    if (url) {
                        setVideoUrl(`https://genaiedu.pockethost.io/api/files/${randomVideo.collectionId}/${randomVideo.id}/${url}`);
                    }
                } else {
                    console.error('No videos found in the response');
                }
            })
            .catch(error => {
                console.error('Error fetching video data:', error);
            });
    }, []);

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
                        <div className='text-center'>
                            {videoUrl ? (
                                <ReactPlayer url={videoUrl} controls />
                            ) : (
                                <p>Loading video...</p>
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
};

export default TaskVideo;
