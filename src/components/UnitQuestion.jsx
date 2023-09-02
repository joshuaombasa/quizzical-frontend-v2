import React, {useContext} from "react";
import { questionsContext } from "../context/QuestionContext";
export default function UnitQuestion({ question }) {
   
    const { updateAnswerState } = useContext(questionsContext)

    const answersElements = question.answers.map(answer => (

        <span
            key={answer.answerId}
            onClick={() => updateAnswerState(answer.answerId, answer.questionId)}
            style={
                {
                    backgroundColor:  answer.answerId === answer.questionId  ? "#D6DBF5" : "",
                    border: answer.answerId === answer.questionId  ? "0.794px solid white" : "0.794px solid #4D5B9E"
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