import Welcome from "./components/App/Welcome";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <h1 className=""></h1>
      {/* Navbar */}
      <div className="sticky top-0 container">
        <Navbar />
      </div>
      {/* Welcome Section */}
      <Welcome />
    </>
  );
}

export default App;
