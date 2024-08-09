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
            <div className="antialiased min-h-screen ">
                <div className="flex items-center justify-center min-h-screen p-4">
                    <div className="space-y-5 w-full max-w-md lg:max-w-2xl bg-white shadow-lg p-6 lg:p-10 rounded-lg">
                        <h1 className="text-center font-bold text-3xl lg:text-5xl mb-6 lg:mb-10">
                            Result
                        </h1>
                        <p className="text-center text-2xl lg:text-4xl font-bold">
                            The video you watched was {isVideoDeepfake ? "an AI generated" : "an original"} video.
                        </p>
                        <div className="w-full text-center mt-6">
                            <Button
                                onClick={() => navigate("/")}
                                className="rounded-full w-full max-w-xs bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300"
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
