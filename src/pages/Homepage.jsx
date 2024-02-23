/* The code is a React component called `Homepage`. It imports necessary dependencies from the React
library, such as `useEffect`, `useCallback`, and `useNavigate` from `react-router-dom`. */
import React from "react";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const staticTextNodeOne = `<h2>Finding it difficult to manage your daily goals?</h2>`;
  const staticTextNodeTwo = `<h2>Welcome to the ultimate Goals Management App</h2>`;
  const staticTextNodeThree = `<h1>GoalsToScore</h1>`;
  const startButton = `<button class="add-task">Get Started</button>`;

  const navigate = useNavigate();

  /* The `staticTextsFlowCallback` function is a callback function created using the `useCallback` hook
  from React. It is used to handle the flow of static texts displayed on the homepage component. */
  const staticTextsFlowCallback = useCallback(() => {
    const parentIntroElement = document.querySelector(".parent-intro");
  
    if (parentIntroElement) {
      setTimeout(() => {
        parentIntroElement.innerHTML = staticTextNodeOne;
      }, 100);
      setTimeout(() => {
        parentIntroElement.innerHTML = staticTextNodeTwo;
      }, 2000);
      setTimeout(() => {
        parentIntroElement.innerHTML = staticTextNodeThree;
      }, 4000);
      setTimeout(() => {
        parentIntroElement.innerHTML = startButton;
      }, 6000);
      parentIntroElement.addEventListener("click", () => {
        navigate("/login");
      });
    }
  }, [navigate, startButton, staticTextNodeOne, staticTextNodeTwo, staticTextNodeThree]);
  

  /* The `useEffect` hook is used to perform side effects in a React component. In this case, it is
  used to call the `staticTextsFlowCallback` function when the component mounts or when the
  `staticTextsFlowCallback` function changes. */
  useEffect(() => {
    staticTextsFlowCallback();
  }, [staticTextsFlowCallback]);

  return (
    <div className="container">
      <div>
        <div className="parent-intro"></div>
      </div>
      <br />
    </div>
  );
}

export default Homepage;
