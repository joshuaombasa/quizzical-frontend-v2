import React, {useContext} from "react";
import { questionsContext } from "../context/QuestionContext";
export default function UnitQuestion({ question }) {
   
    const { updateAnswerState } = useContext(questionsContext)

    const answersElements = question.answers.map(answer => (

        <span
            key={answer.answerId}
            style={
                {
                    backgroundColor:  answer.isCorrect ||  answer.isSelected && answer.isCorrect ? "#94D7A2" : answer.isSelected && !answer.isCorrect ? "#F8BCBC" : "",
                    border:  answer.isCorrect || answer.isSelected  ? "0.794px solid white" : "0.794px solid #4D5B9E",
                    
                }
            }
        >
            {answer.answer}
        </span>
    ))


    return (
        <div className="unit--question--container">
            <h2 className="question">{question.question}</h2>
            <div className="answer--choices">
                {answersElements}
            </div>
        </div>
    )
}