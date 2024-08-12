import { Link } from "react-router-dom";

import icon from "../assets/icon.svg"; // Adjust the path based on your file structure

const Navbar = () => {
  return (
    <div className="container mx-auto">
      <Link to={"/"}>
        <img src={icon} alt="Logo" className="h-10 w-10" /> {/* Adjust the height and width as needed */}
      </Link>
    </div>
  );
};

export default Navbar;