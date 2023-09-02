import React, { createContext } from "react";
import { json } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
const URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple"

const questionsContext = createContext()

function QuestionsContextProvider(props) {


    const [questionsData, setQuestionsData] = React.useState(
        JSON.parse(localStorage.getItem('quizData') || '[]')
    )

    function shuffleArray(array) {
        const shuffledArray = [...array];

        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }

        return shuffledArray;
    }



    function updateAnswerState(answerId, questionId) {
        const updatedState = questionsData.map(question => {

            const newAnswersArray = question.answers.map(answer => {
                return answer.answerId === answerId ? 
                     { ...answer, 
                        isSelected: answer.isSelected === true ? false : true, 
                        answerId: answer.questionId 
                      } : 
                      { ...answer, 
                        isSelected : false,
                        answerId: uuidv4() 
                       }
            })


            return question.id === questionId ? {
                ...question,
                answers: newAnswersArray
            } : question
        })
        setQuestionsData(updatedState)
        localStorage.setItem('quizData', JSON.stringify(updatedState))
    }


    React.useEffect(() => {
        const getQuestions = async () => {
            try {
                const res = await fetch(URL)
                const data = await res.json()
                const rawData = data.results
                const enrichedDatawithId = rawData.map(item => (
                    {
                        correct_answer: item.correct_answer,
                        question: item.question,
                        answers: shuffleArray([...item.incorrect_answers, item.correct_answer]),
                        id: uuidv4()
                    }
                ))
                const answersWithState = enrichedDatawithId.map(item => {
                    const questionId = item.id
                    const answersUpdated = item.answers.map(answer => {
                        return {
                            answer: answer,
                            isSelected: false,
                            answerId: uuidv4(),
                            questionId: questionId,
                            isCorrect: answer === item.correct_answer ? true : false
                        }
                    })
                    return {
                        ...item,
                        answers: answersUpdated
                    }
                })

                localStorage.setItem('quizData', JSON.stringify(answersWithState))
            } catch (error) {
                console.log(error)
            }
        }

        getQuestions()
    }, [])


    return (
        <questionsContext.Provider
            value={{ questionsData: questionsData, updateAnswerState: updateAnswerState }}
        >
            {props.children}
        </questionsContext.Provider>
    )
}

export { QuestionsContextProvider, questionsContext }