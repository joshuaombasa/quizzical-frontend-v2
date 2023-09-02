import React, { useContext } from "react";
import { Link } from "react-router-dom";
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
        <div className="wrapper" >
            <div className="questions--container" >
                {questionsData.length > 0 && questionElements}
                <div className="dashboard--container">
                    <Link to="/answers" className="play--again--btn">Check answers</Link>
                </div>
            </div>
        </div>
    )
}