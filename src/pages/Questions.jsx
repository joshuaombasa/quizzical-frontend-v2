import React, { useContext } from "react";
import { questionsContext } from "../context/QuestionContext";
import UnitQuestion from "../components/UnitQuestion";

export default function Questions() {

    const { questionsData } = useContext(questionsContext)

    let questionElements
    if (questionsData.length > 1) {
        questionElements = questionsData.map(question => (
            <UnitQuestion key={question.id} question={question} />
        ))
    }


    return (
        <div className="questions--container">
            {/* className="wrapper" */}
            <div >
                {questionsData.length > 0 &&  questionElements }
            </div>
        </div>
    )
}