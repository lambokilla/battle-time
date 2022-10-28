import { Answer, Question } from "@battle-time/common";

interface QuestionViewProps {
    question: Question;
    questionChange: (answer: Answer) => void;
    setQuestionNumber: (update: ((current: number) => number)) => void;
    setPlaneNumber: (update: ((current: number) => number)) => void;
}

export default function QuestionView({
    question,
    questionChange,
    setQuestionNumber,
    setPlaneNumber
}: QuestionViewProps) {
    return (
        <div className="Question">
            <img src={`${question.imageUrl}`} alt={`${question.title}`} />
            <h2>{`${question.title}`}</h2>
            <p id="question-description">{`${question.description}`}</p>
            <ul>
                {question.options.map(option => (
                    <li key={option.id} onClick={() => {
                        questionChange({
                            questionId: question.id,
                            optionId: option.id
                        });
                        setQuestionNumber((v) => v + 1);
                        setPlaneNumber((v) => v + 1);

                    }}>
                        <div className="Option">
                            <h3>{option.title}</h3>
                            <p>{option.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <style jsx>{`
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
                
            }
            .Option p{
                text-align:center;
                padding-bottom:5px;
                padding-left:5px;
            }
            #question-description{
                text-align:center;
                padding:0 5px;
            }
            ul{
                list-style:none;
                margin:0;
                padding:0;
                display:flex;
                flex-direction:column;
                margin-bottom:40px;
            }
            li{
                cursor:pointer;
                margin:0;
                background:black;
                border:3px solid white;
                border-radius:3px;
                margin:5px;
                transition:transform 200ms ease-in-out;
            }
            li:hover{
                box-shadow: 0 12px 16px 0 rgba(252,252,252,0.24), 0 17px 50px 0 rgba(252,252,252,0.19);
                transform:scale(1.1);
                transition:transform 300ms ease-in-out, box-shadow 100ms ease-in-out;
            }
            img{
                width:50vw;
                height:50vh;
                object-fit:contain;
            }
            @media (min-width:52rem){
                #question-description{
                    width:800px;
                }
            }
            @media (min-width: 45rem){
                ul{
                    flex-wrap:wrap;
                    flex-direction:row;
                    align-items:center;
                    justify-content:center;
                }
            }
            `}</style>
        </div>

    )
}