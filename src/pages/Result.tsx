import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { videoValidationStore } from '@/lib/store';
import { useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';

// Define the user type or interface (as per your actual user object structure)
interface User {
    id: string;
    // other properties of the user if needed
}

const Result = () => {
    const navigate = useNavigate();
    const isVideoDeepfake = videoValidationStore((state) => state.isVideoDeepfake);
    const [rating, setRating] = useState(0);  // State to store the user's rating
    const [submitted, setSubmitted] = useState(false); // State to prevent multiple submissions
    const [user, setUser] = useState<User | null>(null); // State to store the logged-in user

    // Initialize PocketBase
    const pb = new PocketBase('https://genaiedu.pockethost.io'); // Your PocketBase instance

    // Check for logged-in user when component mounts
    useEffect(() => {
        const fetchUser = async () => {
            const authenticatedUser = pb.authStore.model; // Get the logged-in user
            if (authenticatedUser) {
                setUser(authenticatedUser as User); // Store the user in state
                console.log("Authenticated User ID:", authenticatedUser.id); // Debugging: log the user ID
            } else {
                // Handle the case where no user is logged in
                alert('You must be logged in to submit feedback.');
                navigate('/login');  // Redirect to login page or another appropriate page
            }
        };

        fetchUser();
    }, [pb, navigate]);

    // Handle star click
    const handleStarClick = (value: number) => {
        setRating(value);
    };

    // Handle submission
    const handleSubmit = async () => {
        if (rating > 0 && !submitted && user) {
            setSubmitted(true);
            try {
                await submitFeedback();
                alert('Thank you for your feedback!');
            } catch (error) {
                handleSubmissionError(error);
            }
        } else if (!user) {
            alert('User not logged in. Please log in to submit feedback.');
        } else if (rating === 0) {
            alert('Please provide a rating before submitting.');
        }
    };

    const submitFeedback = async () => {
        if (!user) return;  // Add null check for user
        const data = {
            user: user.id,  // Use the user's ID directly
            experience: rating.toString()  // Ensure rating is correctly formatted as a string
        };
        try {
            const record = await pb.collection('feedback').create(data);
            console.log("Feedback submitted:", record);
        } catch (error: any) {
            handleSubmissionError(error);
        }
    };

    const handleSubmissionError = (error: any) => {
        console.error('Error submitting feedback:', error);
        alert('Failed to submit feedback. Please try again.');
        setSubmitted(false);
    };

    return (
        <>
            <Navbar />
            <div className="antialiased min-h-screen">
                <div className="flex items-center justify-center min-h-screen p-4">
                    <div className="space-y-5 w-full max-w-md lg:max-w-2xl bg-white shadow-lg p-6 lg:p-10 rounded-lg">
                        <h1 className="text-center font-bold text-3xl lg:text-5xl mb-6 lg:mb-10">
                            Result
                        </h1>
                        <p className="text-center text-2xl lg:text-4xl font-bold">
                            The video you watched was {isVideoDeepfake ? "an AI generated" : "an original"} video.
                        </p>

                        {/* Star Rating UI */}
                        <div className="flex justify-center space-x-2 my-6">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                    key={star}
                                    className={`w-10 h-10 cursor-pointer ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    onClick={() => handleStarClick(star)}
                                >
                                    <path d="M12 17.75l-6.16 3.72 1.58-6.81-5.42-4.71 7.08-.61L12 2.5l2.92 6.84 7.08.61-5.42 4.71 1.58 6.81z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-center text-gray-500">Please rate your experience</p>

                        {/* Submit Button */}
                        <div className="w-full text-center mt-6">
                            <Button
                                onClick={handleSubmit}
                                disabled={submitted}
                                className={`rounded-full w-full max-w-xs bg-[#5AE579] ${submitted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300'}`}
                            >
                                Submit Rating
                            </Button>
                        </div>

                        {/* Home Button */}
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
