import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useNavigate } from 'react-router-dom';
import { videoValidationStore } from '@/lib/store';
import { pb } from '@/lib/utils';

type TTaskVideo = {
    user: string;
    answer_selected: string;
    video_isDeepFake: boolean;
}

const QuizQuestion: React.FC = () => {
    const [answer, setAnswer] = useState<string>("");
    const isVideoDeepfake = videoValidationStore((state) => state.isVideoDeepfake);

    useEffect(() => {
        console.log("isVideoDeepfake", isVideoDeepfake);
    }, [isVideoDeepfake]);

    const navigate = useNavigate();

    const submitAnswerHandler = async () => {
        const data: TTaskVideo = {
            user: pb?.authStore?.model?.id,
            answer_selected: answer,
            video_isDeepFake: isVideoDeepfake
        };
        const record = await pb.collection('task_video').create(data);
        return record;
    }

    const handleNextClick = async () => {
        await submitAnswerHandler();
        navigate("/result");
    };

    const handleAnswerUpdate = (value: string) => {
        setAnswer(value);
    };

    return (
        <>
            <Navbar />
            <div className="antialiased">
                <div className="flex items-center justify-center h-screen w-screen">
                    <div className="space-y-5">
                        <h1 className="text-center font-bold text-6xl">
                            Quiz Question ?
                        </h1>
                        <p className="text-center">
                            Based on your analysis of the video and the differences between deepfake and original videos, what is your conclusion about the video's authenticity?
                        </p>
                        <RadioGroup defaultValue="isDeepFake" onValueChange={handleAnswerUpdate}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="isDeepFake" id="isDeepFake" />
                                <Label htmlFor="isDeepFake">The video is a deepfake based on visual inconsistencies.</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="isOriginal" id="isOriginal" />
                                <Label htmlFor="isOriginal">The video is original due to the natural flow and features.</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="isPartiallyDeepfake" id="isPartiallyDeepfake" />
                                <Label htmlFor="isPartiallyDeepfake">The video seems like a deepfake but with some original characteristics.</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="isPartiallyOriginal" id="isPartiallyOriginal" />
                                <Label htmlFor="isPartiallyOriginal">The video appears original but has some deepfake traits.</Label>
                            </div>
                        </RadioGroup>
                        <div className='w-full text-center'>
                            <Button onClick={handleNextClick} className='rounded-full w-1/5 bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300'>Next</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuizQuestion;
