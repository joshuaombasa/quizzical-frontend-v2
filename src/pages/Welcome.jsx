import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
    return (
        <div className="welcome--container">
            <div className="wrapper">
                <h1>Quizzical</h1>
                <p>"Welcome to Quizzical ! 🌟 Get ready to test your knowledge and have fun with our quizzes. Start your learning journey now!"</p>
                <Link to="/questions">Start quiz</Link>
            </div>
        </div>
    )
}