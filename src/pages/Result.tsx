import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { videoValidationStore } from '@/lib/store';
import { useNavigate } from 'react-router-dom';

const Result = () => {
    const navigate = useNavigate();
    const isVideoDeepfake = videoValidationStore((state) => state.isVideoDeepfake);

    return (
        <>
            <Navbar />
            <div className="antialiased min-h-screen bg-white-100">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="space-y-5 w-11/12 lg:w-1/2 bg-white shadow-lg p-5 lg:p-10 rounded-lg">
                        <h1 className="text-center font-bold text-6xl mb-10">
                            {/* {isVideoDeepfake ? "AI Generated" : "Original"}  */}
                            Result
                        </h1>
                        <p className="text-center text-6xl font-bold ">
                            The video you watched was {isVideoDeepfake ? "a AI generated " : "a original"} video.
                        </p>
                        <div className="w-full text-center">
                            <Button
                                onClick={() => navigate("/")}
                                className="rounded-full w-1/5 bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300"
                            >
                                Home
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Result;
