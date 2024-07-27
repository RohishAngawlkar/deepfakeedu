import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/question",
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="bg-[url(src/assets/home/background_deepfakeedu.svg)]">
      {/* <img
        src={BackgroundDeepfakeEdu}
        alt="background"
        className="absolute -z-50 object-cover w-full h-full"
      /> */}
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
