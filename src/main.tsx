import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import GenerativeMediaQuestion from "./pages/GenerativeMediaQuestion.tsx";
import QuizQuestion from "./pages/QuizQuestion.tsx";
import ComparisonVideos from "./pages/ComparisonVideos.tsx";
import TaskExplanation from "./pages/TaskExplanation.tsx";
import TaskVideo from "./pages/TaskVideo.tsx";
import Result from "./pages/Result.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />
  }, {
    path: "/register",
    element: <Register />
  },
  {
    path: "/generative-media-question",
    element: <GenerativeMediaQuestion />
  },
  {
    path: "/comparison-videos",
    element: <ComparisonVideos />
  }, {
    path: "/quiz-question",
    element: <QuizQuestion />
  }, {
    path: "/task-explanation",
    element: <TaskExplanation />
  },
  {
    path: "/task-video",
    element: <TaskVideo />
  }
  , {
    path: "/result",
    element: <Result />
  }
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