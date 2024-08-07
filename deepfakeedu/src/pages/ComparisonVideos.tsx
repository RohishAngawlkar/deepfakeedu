import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';



const TaskVideo = () => {
    const navigate = useNavigate();
    const player1 = useRef(null);
    const player2 = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState({ played: 0 });
    const [currentPair, setCurrentPair] = useState([]);

    const pb = new PocketBase('https://genaiedu.pockethost.io'); // Update with your PocketBase URL

    useEffect(() => {
        const fetchRandomVideo = async () => {
            try {
                // Fetch total number of video records
                const totalVideos = await pb.collection('videos').getFullList();

                const totalItems = totalVideos?.length;

                // Select two random indices
                const randomIndex1 = Math.floor(Math.random() * totalItems);
                let randomIndex2 = Math.floor(Math.random() * totalItems);
                while (randomIndex2 === randomIndex1) {
                    randomIndex2 = Math.floor(Math.random() * totalItems);
                }

                // Fetch the two random video records
                const randomVideo1 = totalVideos[randomIndex1];
                // const randomVideo2 = totalVideos[randomIndex2];

                // Assuming the video record has two file fields: deepfake and original
                const url1 = pb.files.getUrl(randomVideo1, randomVideo1?.deepfake);
                const url2 = pb.files.getUrl(randomVideo1, randomVideo1?.original);

                // console.log('Fetched deepfake URL:', url1); // Log the deepfake URL to the console
                // console.log('Fetched original URL:', url2); // Log the original URL to the console

                // Verify URLs are valid
                if (url1 && url2) {
                    setCurrentPair([url1, url2]);
                } else {
                    console.error('Invalid video URLs:', { url1, url2 });
                }
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchRandomVideo();
    }, []);

    const handlePlayPause = () => {
        setPlaying(!playing);
    };
    console.log("Player>>>", player1);

    const handleSeekChange = (e: any) => {
        const seekTo = parseFloat(e.target.value);


        if (player1.current) player1.current.seekTo(seekTo);
        if (player2.current) player2.current.seekTo(seekTo);
    };

    const handleProgress = (state: any) => {
        setProgress(state);
    };

    return (
        <>
            <Navbar />
            <div className="antialiased">
                <div className="flex items-center justify-center h-screen w-screen">
                    <div className="space-y-5 w-4/5 bg-white shadow-lg p-10 rounded-lg">
                        <h1 className="text-center font-bold text-6xl mb-4">
                            Comparision Video
                        </h1>
                        <p className="text-center mb-8">
                            Can be deepfake or original?
                        </p>
                        <div className='flex justify-center items-center space-x-4'>
                            {currentPair.length === 2 && (
                                <>
                                    <div className='relative w-1/2 h-[360px] border border-gray-300 rounded-lg overflow-hidden'>
                                        <ReactPlayer
                                            ref={player1}
                                            url={currentPair[0]}
                                            playing={playing}
                                            controls={false}
                                            muted={true}
                                            width="100%"
                                            height="100%"
                                            onProgress={handleProgress}
                                            config={{
                                                file: {
                                                    attributes: {
                                                        disablePictureInPicture: true,
                                                        controlsList: 'nodownload',
                                                    },
                                                },
                                            }}
                                        />
                                        <div className="absolute inset-0 w-full h-full bg-transparent pointer-events-none"></div>
                                    </div>
                                    <div className='relative w-1/2 h-[360px] border border-gray-300 rounded-lg overflow-hidden'>
                                        <ReactPlayer
                                            ref={player2}
                                            url={currentPair[1]}
                                            playing={playing}
                                            controls={false}
                                            muted={true}
                                            width="100%"
                                            height="100%"
                                            onProgress={handleProgress}
                                            config={{
                                                file: {
                                                    attributes: {
                                                        disablePictureInPicture: true,
                                                        controlsList: 'nodownload',
                                                    },
                                                },
                                            }}
                                        />
                                        <div className="absolute inset-0 w-full h-full bg-transparent pointer-events-none"></div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="flex justify-center items-center space-x-4 mt-6">
                            <Button onClick={handlePlayPause} className='rounded-full bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300 px-6 py-2'>
                                {playing ? 'Pause' : 'Play'}
                            </Button>
                            <input
                                type="range"
                                min={0}
                                max={0.999999}
                                step="any"
                                value={progress.played}
                                onChange={handleSeekChange}
                                className="w-1/2"
                            />
                        </div>
                        <div className='w-full text-center mt-8'>
                            <Button onClick={() => navigate("/Task-Explanation")} className='rounded-full w-1/5 bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300 px-6 py-2'>
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TaskVideo;
