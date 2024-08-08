import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar'; // Ensure this path is correct
import { Button } from '@/components/ui/button'; // Ensure this path is correct
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import { pb } from '@/lib/utils';

const TaskVideo: React.FC = () => {
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    // @ts-ignore
    const [videoKey, setVideoKey] = useState<number>(Date.now());
    const [randomVideo, setRandomVideo] = useState<any>(null);
    const navigate = useNavigate();

    const fetchVideoHandler = async () => {
        try {
            const records = await pb.collection('Videos').getFullList({
                sort: '-created',
            });

            if (records.length === 0) {
                console.error('No video records found.');
                return;
            }

            function randomIntFromInterval(min: number, max: number) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }

            const rndInt = randomIntFromInterval(0, records.length - 1);
            const selectedVideo = records[rndInt];
            const videoRandomizerNumber = Math.floor(Math.random() * 10);

            setRandomVideo(selectedVideo);

            if (videoRandomizerNumber % 2 === 0) {
                setVideoUrl(selectedVideo.deepfake);
            } else {
                setVideoUrl(selectedVideo.original);
            }

            console.log('Selected video:', selectedVideo);
            console.log('Video URL:', videoRandomizerNumber % 2 === 0 ? selectedVideo.deepfake : selectedVideo.original);

        } catch (error) {
            console.error('Error fetching video records:', error);
        }
    };

    useEffect(() => {
        fetchVideoHandler();
    }, []);

    useEffect(() => {
        if (randomVideo && videoUrl) {
            const videoUrlString = `https://genaiedu.pockethost.io/api/files/${randomVideo.collectionId}/${randomVideo.id}/${videoUrl}`;
            console.log('Constructed video URL:', videoUrlString);
            setLoading(false);
        }
    }, [randomVideo, videoUrl]);

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
                                <ReactPlayer
                                    key={videoKey}
                                    url={videoUrl ? `https://genaiedu.pockethost.io/api/files/${randomVideo.collectionId}/${randomVideo.id}/${videoUrl}` : ""}
                                    controls
                                />
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
