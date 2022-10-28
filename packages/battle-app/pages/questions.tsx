import { apiBaseUrl, Question, Answer } from "@battle-time/common";
import { useCallback, useEffect, useState } from "react";
import { BarsIcon } from "../components/BarsIcon";
import Logo from '../components/Logo';
import QuestionView from "../components/QuestionView";

export function Questions() {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [questions, setQuestions] = useState<Question[] | null>(null);
    const [userAnswers, setUserAnswers] = useState<Answer[] | null>([]);
    const [planeNumber, setPlaneNumber] = useState(0);
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

    const submitAnswers = useCallback(
        async () => {
            console.log("userAnswers before submission", userAnswers);
            const request = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userAnswers)
            };
            console.log("request", request);
            const response = await fetch(`${apiBaseUrl}questions`, request);
            console.log("response", response);
            setPlaneNumber(planeNumber + 1);
        },
        [userAnswers, planeNumber]);

    // useEffect(() => {
    //     let m = true;
    //     console.log("m", m);
    //     setTimeout(() => setTransition("transition-in"), 1000);
    //     return () => {
    //         m = false;
    //         console.log("m", m);
    //         setTransition("transition-out");
    //     }
    // }, [userAnswers]);

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
        <div className="body">

            <div className="viewport">
                <div className="plane" style={{ transform: `translateX(${-planeNumber * 100}vw)`, width: ((questions?.length ?? 1) + 3) * 100 + "vw" }}>
                    <div className="plane-view button">
                        <h1>Battle Time 🥳</h1>
                        <button onClick={() => setPlaneNumber(planeNumber + 1)}>Prepare for battle!</button>
                        <div className="footer">
                            <BarsIcon />

                            <Logo />
                        </div>
                    </div>
                    {questions?.map((question, i) => (
                        <div className="plane-view" key={question.id}>
                            <div className="title">
                                <h1>Battle Time 🥳</h1>
                            </div>
                            <QuestionView
                                question={question}
                                questionChange={questionChange}
                                setQuestionNumber={setQuestionNumber}
                                setPlaneNumber={setPlaneNumber} />
                            <div className="footer">
                                <BarsIcon />

                                <Logo />
                            </div>
                        </div>
                    ))}
                    <div className="plane-view button">
                        <h1>Battle Time 🥳</h1>
                        <button onClick={submitAnswers}>Let&apos;s rock n&apos; roll</button>
                        <div className="title">
                            <BarsIcon />

                            <Logo />
                        </div>
                    </div>
                    <div className="plane-view on-submit">
                        <h1>Battle Time 🥳</h1>
                        <h3>You&apos;re ready for battle!</h3>
                        <div className="title">
                            <BarsIcon />

                            <Logo />
                        </div>
                    </div>
                </div>
            </div>


            <style jsx>{`
                .viewport{
                    width:100vw;
                    position:relative;
                    overflow:hidden;
                    height:100vh;
                }
                .plane{
                    position:absolute;
                    left:0;
                    top:0;
                    width:100%;
                    height:100%;
                    transition:transform 1s ease-in-out;
                    display:flex;

                }
                .plane-view{
                    position:relative;
                    left:0;
                    top:0;
                    width:100vw;
                    height:100%;
                    flex:1;
                    overflow:auto;
                }
                .button{
                    display:flex;
                    flex-direction:column;
                    flex:1;
                    align-items:center;
                    
                }
                .title, .footer{
                    display:flex;
                    flex-direction:column;
                    flex:1;
                    align-items:center;
                    gap:20px;
                }
                .footer{
                    margin-bottom:20px;
                }
                .on-submit{
                    display:flex;
                    flex-direction:column;
                    flex:1;
                    align-items:center;
                }
                .on-submit h3{
                    margin:40px 0;
                }
                button{
                    background-color:#FCFCFC;
                    color:#1A1D1F;
                    height:40px;
                    width:140px;
                    border-radius:5px;
                    font-weight:bold;
                    margin:40px 0;
                    transition:all 100ms ease-in-out;
                }
                button:hover{
                    background-color:#4EAF90;
                    color:#FCFCFC;
                    box-shadow: 0 12px 16px 0 rgba(252,252,252,0.24), 0 17px 50px 0 rgba(252,252,252,0.19);
                    cursor:pointer;
                    transition:all 100ms ease-in-out;
                }
                button:active{
                    transform:scale(0.95);
                }
                h1{
                    color:#4EAF90;
                    margin:40px 0 0 0;
                }
                p{
                    margin:0;
                }
                img{
                    width:50vw;
                    height:50vh;
                    object-fit:contain;
                }
                ::-webkit-scrollbar {
                    width: 15px;
                }

                /* Track */
                ::-webkit-scrollbar-track {
                    box-shadow: inset 0 0 5px grey;
                    border-radius: 15px;
                }

                /* Handle */
                ::-webkit-scrollbar-thumb {
                    background: #FCFCFC;
                    border-radius: 15px;
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
