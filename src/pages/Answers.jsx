import React, { useContext } from "react";
import { questionsContext } from "../context/QuestionContext";

import UnitQuestionWithAnswer from "../components/UnitQuestionWithAnswer";
export default function Answers() {

    const { questionsData } = useContext(questionsContext)

    let answersElements

    if (questionsData.length > 0) {
        answersElements = questionsData.map(item => (
            <UnitQuestionWithAnswer key={item.id} question={item} />
        ))
    }

    return (
        <div className="questions--container answers--container">
            {questionsData.length > 0 && answersElements}
        </div>
    )
}