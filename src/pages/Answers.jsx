import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { questionsContext } from "../context/QuestionContext";

import UnitQuestionWithAnswer from "../components/UnitQuestionWithAnswer";
export default function Answers() {

    const { startNewQuiz } = useContext(questionsContext)
    const [questionsData, setQuestionsData] = React.useState(
        () => JSON.parse(localStorage.getItem('quizData') || '[]')
    )

    const allAnswers = []

    if (questionsData.length > 0) {
        for (let i = 0; i < questionsData.length; i++) {
            allAnswers.push(questionsData[i].answers)
        }
    }

    let flatcorrectAnswers
    if (allAnswers.length > 0) {
        flatcorrectAnswers = allAnswers.flat()
    }

    let correctAnswersArray

    if (flatcorrectAnswers.length > 0) {
        correctAnswersArray = flatcorrectAnswers.filter(answer => answer.isSelected && answer.isCorrect)
    }

    let answersElements

    if (questionsData.length > 0) {
        answersElements = questionsData.map(item => (
            <UnitQuestionWithAnswer key={item.id} question={item} />
        ))
    }

    return (
        <div className="wrapper">
            <div className="questions--container">
                {questionsData.length > 0 && answersElements}
                <div className="dashboard--container">
                    <p className="score--text">You scored {correctAnswersArray.length}/10 correct answers</p>
                    <Link 
                        to="/questions" 
                        className="play--again--btn"
                        onClick={startNewQuiz}
                    >Play again</Link>
                </div>
            </div>
        </div>
    )
}

