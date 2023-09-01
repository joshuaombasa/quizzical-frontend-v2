import React, { createContext } from "react";
import { v4 as uuidv4 } from 'uuid';
const URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple"

const questionsContext = createContext()

function QuestionsContextProvider(props) {


    const [questionsData, setQuestionsData] = React.useState([])

    function shuffleArray(array) {
        const shuffledArray = [...array]; 
    
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
    
        return shuffledArray; 
    }
    
    function updateAnswerState(answerId, questionId) {
        setQuestionsData(prevQuestionsData => {
            return prevQuestionsData.map(item => {
                 const newAnswersArray = item.answers.map(answer => {
                     return answer.answerId === answerId ? {...answer, isSelected : !answer.isSelected} : answer
                 })
 
                 return {
                     ...item,
                     answers : newAnswersArray
                 }
             })
 
         })
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
                        return {answer : answer, isSelected : false, answerId: uuidv4(), questionId: questionId}
                    })
                    return {
                        ...item,
                        answers : answersUpdated
                    }
                })
                console.log(answersWithState)
                setQuestionsData(answersWithState)
            } catch (error) {
                console.log(error)
            }
        }

        getQuestions()
    }, [])

    // console.log(questionsData)

    return (
        <questionsContext.Provider 
           value={{ questionsData: questionsData, updateAnswerState: updateAnswerState }}
        >
            {props.children}
        </questionsContext.Provider>
    )
}

export { QuestionsContextProvider, questionsContext }