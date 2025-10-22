import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ToggleComponent from "./components/ToggleComponent";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import QuestionBankEnhanced from "./components/QuestionBankEnhanced";

export default function App() {
  return (
    <div className="container my-4">
      <h2 className="mb-4">useReducer Exercises</h2>
      <ToggleComponent />
      <LoginForm />
      <SignUpForm />
      <QuestionBankEnhanced />
    </div>
  );
}
