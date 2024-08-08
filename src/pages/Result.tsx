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
            <div className="antialiased">
                <div className="flex items-center justify-center h-screen w-screen">
                    <div className="space-y-5 w-1/2">
                        <h1 className="text-center font-bold text-6xl mb-10">
                            {isVideoDeepfake ? "Deepfake" : "Original"}
                        </h1>
                        <p className="text-center text-6xl font-bold border-b-4 border-b-black">
                            The video you watched was {isVideoDeepfake ? "a Deepfake" : "an Original"}.
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
