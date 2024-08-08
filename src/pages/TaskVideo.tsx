import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar'; // Ensure this path is correct
import { Button } from '@/components/ui/button'; // Ensure this path is correct
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Video {
    id: string;
    collectionId: string;
    deepfake?: string;
    original?: string;
}

const TaskVideo: React.FC = () => {
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [videoKey, setVideoKey] = useState<number>(Date.now()); // Unique key for ReactPlayer to force re-render
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                // Randomly decide to fetch a deepfake or original video
                const isDeepfake = Math.random() < 0.5;
                const column = isDeepfake ? 'deepfake' : 'original';
                const response = await axios.get<{ items: Video[] }>(
                    `https://genaiedu.pockethost.io/api/collections/videos/records?filter=${column}!=null&limit=1`
                );

                const videos = response.data.items;
                console.log('Fetched video:', videos); // Log fetched video

                if (videos && videos.length > 0) {
                    const video = videos[0];
                    const url = isDeepfake ? video.deepfake : video.original;

                    if (url) {
                        setVideoUrl(`https://genaiedu.pockethost.io/api/files/${video.collectionId}/${video.id}/${url}`);
                        setVideoKey(Date.now()); // Update the key to force ReactPlayer re-render
                    } else {
                        console.error('No valid video URL found in the selected video');
                    }
                } else {
                    console.error('No video found in the response');
                }
            } catch (error) {
                console.error('Error fetching video data:', error);
            } finally {
                setLoading(false); // Set loading to false after the video is fetched
            }
        };

        fetchVideo();
    }, []);

    return (
        <>
            <Navbar />
            <div className="antialiased">
                <div className="flex items-center justify-center h-screen w-screen">
                    <div className="space-y-5">
                        <h1 className="text-center font-bold text-6xl">Task Video</h1>
                        <p className="text-center">Can be deepfake or original?</p>
                        <div className="text-center">
                            {loading ? (
                                <p>Loading video...</p>
                            ) : (
                                <ReactPlayer key={videoKey} url={videoUrl} controls />
                            )}
                        </div>
                        <div className="w-full text-center">
                            <Button
                                onClick={() => navigate('/Quiz-Question')}
                                className="rounded-full w-1/5 bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskVideo;
