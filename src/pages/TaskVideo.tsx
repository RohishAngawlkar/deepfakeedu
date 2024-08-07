import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';

const TaskVideoSingle = () => {
    const navigate = useNavigate();
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const pb = new PocketBase('https://genaiedu.pockethost.io/');

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                // Fetch the videos collection from PocketBase
                const records = await pb.collection('videos').getFullList();

                // Extract URLs
                const videoUrls = records.map(record => record.url);

                // Randomly select one of the URLs
                const selectedUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];
                setVideoUrl(selectedUrl);
            } catch (error) {
                console.error('Error fetching video URLs:', error);
            }
        };

        fetchVideo();
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
                                    style={{ border: '1px solid black' }}
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
