import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const TaskExplanation: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <div className="antialiased min-h-screen bg-gray-100">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="space-y-5 w-11/12 lg:w-1/2 bg-white shadow-lg p-5 lg:p-10 rounded-lg">
                        <h1 className="text-center font-bold text-2xl lg:text-6xl">
                            Task Explanation
                        </h1>
                        <p className="text-center text-sm lg:text-base">
                            You will watch a video on the next page and determine whether it is AI-generated or an original. Prior to this, you were shown a comparison video featuring both AI-generated and original content to help you understand the differences.
                            Use your observations from the comparison video to make your guess.
                        </p>
                        <p className="text-center text-base lg:text-2xl font-semibold">
                            Here is a small assessment to know your awareness.
                        </p>
                        <div className="w-full text-center">
                            <Button onClick={() => navigate("/task-video")} className="rounded-full w-full lg:w-1/5 bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300">
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TaskExplanation;
