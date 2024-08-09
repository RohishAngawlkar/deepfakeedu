import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import { pb } from '@/lib/utils';

interface VideoRecord {
    deepfake: string;
    original: string;
}

const TaskVideo: React.FC = () => {
    const navigate = useNavigate();
    const player1 = useRef<ReactPlayer>(null);
    const player2 = useRef<ReactPlayer>(null);
    const [playing, setPlaying] = useState<boolean>(true); // Autoplay on load
    const [progress, setProgress] = useState<{ played: number }>({ played: 0 });
    const [currentPair, setCurrentPair] = useState<string[]>([]);

    useEffect(() => {
        const fetchRandomVideo = async () => {
            try {
                // Fetch total number of video records
                const totalVideos = await pb.collection('videos').getFullList<VideoRecord>();

                const totalItems = totalVideos.length;

                // Select two random indices
                const randomIndex1 = Math.floor(Math.random() * totalItems);
                let randomIndex2 = Math.floor(Math.random() * totalItems);
                while (randomIndex2 === randomIndex1) {
                    randomIndex2 = Math.floor(Math.random() * totalItems);
                }

                // Fetch the two random video records
                const randomVideo1 = totalVideos[randomIndex1];

                // Assuming the video record has two file fields: deepfake and original
                const url1 = pb.files.getUrl(randomVideo1, randomVideo1.deepfake);
                const url2 = pb.files.getUrl(randomVideo1, randomVideo1.original);

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

    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const seekTo = parseFloat(e.target.value);
        if (player1.current) player1.current.seekTo(seekTo);
        if (player2.current) player2.current.seekTo(seekTo);
    };

    const handleProgress = (state: { played: number }) => {
        setProgress(state);
    };

    return (
        <>
            <Navbar />
            <div className="antialiased">
                <div className="flex items-center justify-center min-h-screen w-full px-4">
                    <div className="space-y-5 w-full lg:w-4/5 bg-transparent p-4 md:p-10 rounded-lg">
                        <h1 className="text-center font-bold text-3xl md:text-6xl mb-4">
                            Comparison Video
                        </h1>
                        <p className="text-left mb-7">
                            {/* Can be deepfake or original? */}
                        </p>
                        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                            <Suspense fallback="Loading...">
                                {currentPair.length === 2 && (
                                    <>
                                        <div className="w-full md:w-1/2">
                                            <h2 className="text-center font-bold text-lg mb-2">
                                                AI Generated Video
                                            </h2>
                                            <div className="relative w-full h-[200px] md:h-[360px] border border-gray-300 rounded-lg overflow-hidden">
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
                                        </div>
                                        <div className="w-full md:w-1/2">
                                            <h2 className="text-center font-bold text-lg mb-2">
                                                Original Video
                                            </h2>
                                            <div className="relative w-full h-[200px] md:h-[360px] border border-gray-300 rounded-lg overflow-hidden">
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
                                        </div>
                                    </>
                                )}
                            </Suspense>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-x-4 mt-6">
                            <Button onClick={handlePlayPause} className="rounded-full bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300 px-6 py-2">
                                {playing ? 'Pause' : 'Play'}
                            </Button>
                            <input
                                type="range"
                                min={0}
                                max={0.999999}
                                step="any"
                                value={progress.played}
                                onChange={handleSeekChange}
                                className="w-full md:w-1/2"
                            />
                        </div>
                        <div className="w-full text-center mt-8">
                            <Button onClick={() => navigate("/Task-Explanation")} className="rounded-full w-full md:w-1/5 bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300 px-6 py-2">
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
