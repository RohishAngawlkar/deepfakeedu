import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import { pb } from '@/lib/utils';
import { videoValidationStore } from '@/lib/store';

interface VideoRecord {
    collectionId: string;
    id: string;
    deepfake: string;
    original: string;
}

const TaskVideo: React.FC = () => {
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [randomVideo, setRandomVideo] = useState<VideoRecord | null>(null);
    const [isDeepfake, setIsDeepfake] = useState<boolean | null>(null);

    const setVideoValidation = videoValidationStore((state) => state.setIsVideoDeepfake);
    const navigate = useNavigate();

    const fetchVideoHandler = async () => {
        try {
            const records = await pb.collection('Videos').getFullList<VideoRecord>({
                sort: '-created',
            });

            if (records.length === 0) {
                console.error('No video records found.');
                return;
            }

            const randomIntFromInterval = (min: number, max: number) => {
                return Math.floor(Math.random() * (max - min + 1) + min);
            };

            const rndInt = randomIntFromInterval(0, records.length - 1);
            const selectedVideo = records[rndInt];
            const videoRandomizerNumber = Math.floor(Math.random() * 10);

            setRandomVideo(selectedVideo);

            if (videoRandomizerNumber % 2 === 0) {
                setVideoUrl(selectedVideo.deepfake);
                setIsDeepfake(true); // Set deepfake state
            } else {
                setVideoUrl(selectedVideo.original);
                setIsDeepfake(false); // Set original state
            }
        } catch (error) {
            console.error('Error fetching video records:', error);
        }
    };

    useEffect(() => {
        fetchVideoHandler();
    }, []);

    useEffect(() => {
        if (randomVideo && videoUrl) {
            setLoading(false);
        }
    }, [randomVideo, videoUrl]);

    const handleNextClick = () => {
        if (isDeepfake !== null) {
            setVideoValidation(isDeepfake);  // Ensure not null
            navigate('/Quiz-Question');
        } else {
            console.error('The video deepfake state is not set.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="space-y-5 text-center w-full max-w-2xl">
                        <h1 className="font-bold text-4xl md:text-6xl">Task Video</h1>
                        <p className="text-lg md:text-xl">Can be deepfake or original?</p>
                        <div className="relative w-full pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
                            {loading ? (
                                <p>Loading video...</p>
                            ) : (
                                <ReactPlayer
                                    url={videoUrl ? `https://genaiedu.pockethost.io/api/files/${randomVideo?.collectionId}/${randomVideo?.id}/${videoUrl}` : ""}
                                    playing={true}  // Autoplay video
                                    muted={true}  // Mute the video
                                    controls={false}  // Disable controls to prevent unmuting
                                    config={{
                                        file: {
                                            attributes: {
                                                controlsList: 'nodownload',  // Prevent download
                                                disablePictureInPicture: true,  // Disable PiP
                                            },
                                        },
                                    }}
                                    width="100%"
                                    height="100%"
                                    style={{ position: 'absolute', top: 0, left: 0 }}
                                />
                            )}
                        </div>
                        <div className="mt-6">
                            <Button
                                onClick={handleNextClick}
                                className="rounded-full w-full md:w-1/3 bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300"
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
