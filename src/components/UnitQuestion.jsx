import React, {useContext} from "react";
import { questionsContext } from "../context/QuestionContext";
export default function UnitQuestion({ question }) {
   
    const { updateAnswerState } = useContext(questionsContext)
    // const selectedStyle = {
    //     backgroundColor: isSelected === true ? "#D6DBF5" : "",
    //     border: isSelected === true ? "none" : "0.794px solid #4D5B9E"
    // }

    const answersElements = question.answers.map(answer => (
        <span
            key={answer.answerId}
            onClick={() => updateAnswerState(answer.answerId)}
            style={
                {
                    backgroundColor: answer.isSelected === true ? "#D6DBF5" : "",
                    border: answer.isSelected === true ? "0.794px solid white" : "0.794px solid #4D5B9E"
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