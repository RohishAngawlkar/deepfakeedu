import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const Welcome = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 space-y-5">
        <h1 className="text-center font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          Welcome to Generative AI Edu
        </h1>
        <p className="text-center font-semibold text-sm sm:text-base md:text-lg">
          (New Way To Educate People Against Generative AI Media)
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            onClick={handleLoginClick}
            className="rounded-full w-full sm:w-1/2 bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg shadow-[#5AE579] transition duration-300"
          >
            Login
          </Button>
          <Button
            onClick={handleRegisterClick}
            className="rounded-full w-full sm:w-1/2 bg-white text-black border-2 hover:bg-white hover:text-black hover:shadow-lg border-black transition"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
