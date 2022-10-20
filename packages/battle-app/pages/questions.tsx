import { apiBaseUrl, Question, Answer } from "@battle-time/common";
import { useCallback, useEffect, useState } from "react";
import { BarsIcon } from "../components/BarsIcon";
import Logo from '../components/Logo';

export function Questions() {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [questions, setQuestions] = useState<Question[] | null>(null);
    const [userAnswers, setUserAnswers] = useState<Answer[] | null>([]);

    const fetchQuestions = async (): Promise<ReturnQuestions> => {
        try {
            const response = await fetch(`${apiBaseUrl}questions`);
            const questions = await response.json();
            return { success: true, questions: questions }
        } catch (error) {
            console.log(error);
            return { success: false, questions: null };
        }
    };


    const questionChange = useCallback(
        (answer: Answer) => {
            setUserAnswers([...userAnswers, answer]);
        }, [userAnswers]);

    useEffect(() => {
        let m = true;
        if (questionNumber === 4) {
            (async () => {
                console.log("userAnswers before submission", userAnswers);
                const request = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userAnswers)
                };
                console.log("request", request);
                const response = await fetch(`${apiBaseUrl}questions`, request);
                console.log("response", response);
            })();
        }
        return () => {
            m = false;
        }
    }, [userAnswers, questionNumber]);

    useEffect(() => {
        let m = true;
        (async () => {

            const result = await fetchQuestions();
            if (result.success) {
                setQuestions(result.questions);
            }

            console.log('m', m);
        })();
        return () => {
            m = false;
            console.log('m', m);
        }
    }, []);


    return (
        <div className="Index">

            <h1>Battle Time 🥳</h1>


            {!!questions &&
                questionNumber < 4 &&
                <div className="Question">
                    <img src={`${questions[questionNumber].imageUrl}`} alt={`${questions[questionNumber].title}`} />
                    <h2>{`${questions[questionNumber].title}`}</h2>
                    <p id="question-description">{`${questions[questionNumber].description}`}</p>
                    <ul>
                        {questions[questionNumber].options.map(option => (
                            <li key={option.id} onClick={() => {
                                questionChange({
                                    questionId: questions[questionNumber].id,
                                    optionId: option.id
                                });
                                setQuestionNumber(questionNumber + 1);
                            }}>
                                <div className="Option">
                                    <h3>{option.title}</h3>
                                    <p>{option.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            }
            {!!(questionNumber > 3) &&
                <p>Your results have been submitted!</p>
            }

            <BarsIcon />

            <Logo />

            <style jsx>{`
                .Index{
                    display:flex;
                    flex-direction:column;
                    flex:1;
                    align-items:center;
                    gap:20px;
                }
                .Question{
                    display:flex;
                    flex-direction:column;
                    flex:1;
                    align-items:center;
                    margin-top:0;
                }
                .Option{
                    display:flex;
                    align-items:center;
                    flex-direction:column;
                    flex:1;
                    width:300px;
                    border:3px solid white;
                    margin:5px;
                }
                .Option p{
                    text-align:center;
                    padding-bottom:5px;
                    padding-left:5px;
                }
                #question-description{
                    width:800px;
                    text-align:center;
                }
                ul{
                    list-style:none;
                    margin:0;
                    padding:0;
                    display:flex;
                    flex:1;
                }
                li a{
                    text-decoration:none;
                    color:white;
                    
                }
                h1{
                    color:#4EAF90;
                    margin:40px 0 0 0
                }
                p{
                    margin:0;
                }
                img{
                    width:50vw;
                    height:50vh;
                    object-fit:contain;
                }
            `}</style>
        </div>
    );
}

interface ReturnQuestions {
    success: boolean;
    questions: Question[] | null;
}

interface QuestionTitleDescription {
    title: string;
    description: string;
}

export default Questions;
