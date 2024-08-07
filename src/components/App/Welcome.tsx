import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const Welcome = () => {
  const navigate = useNavigate()

  const handleLoginClick = ()=>{
    navigate("/login")
  }

  const handleRegisterClick = ()=>{
    navigate("/register")
  }
  return (
    <div className="">
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="2xl:w-1/4 xl:w-1/3 lg:w-1/3 space-y-5">
          <h1 className="text-center font-bold text-6xl">
            {"Welcome to (Social Media)"}
          </h1>
          <p className="text-center">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet
            libero placeat veli.
          </p>
          <p className="text-center font-semibold">
            {"(Small description about the project)"}
          </p>
          <div className="flex justify-around space-x-8">
            <Button onClick={handleLoginClick} className="rounded-full w-1/2 bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg shadow-[#5AE579] transition duration-300">Login</Button>
            <Button onClick={handleRegisterClick} className="rounded-full w-1/2 bg-white text-black border-2 hover:bg-white hover:text-black hover:shadow-lg border-black transition">Sign Up</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Welcome;
