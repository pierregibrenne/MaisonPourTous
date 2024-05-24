import React from "react";

function Steps({ currentStep, totalSteps }) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <ul className="steps steps-horizontal">
      {steps.map((step, index) => (
        <li
          key={index}
          className={`step ${index < currentStep ? "step-primary" : ""}`}
        >
        </li>
      ))}
    </ul>
  );
}

export default Steps;
