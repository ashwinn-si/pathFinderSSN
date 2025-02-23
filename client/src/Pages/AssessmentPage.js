import Background from "../Components/Background";
import {useEffect, useState} from "react";
import questionFormater  from "../Utilities/questionFormater";
import axios from "./../AxiosProvider"
import {useNavigate} from "react-router-dom";
import QuestionPageSkeletonLoader from "./SkeletonLoaderPage/QuestionPageSkeletonLoader";

function AssessmentPage(props) {
    const navigate= useNavigate();
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState([{id:"a",text:"deno"}]);
    const [loaderFlag, setLoaderFlag] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [topicIndex, setTopicIndex] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [totalTopics, setTotalTopics] = useState(null);
    const [noQuestions, setNoQuestions] = useState(3);
    const [nextQuestion, setNextQuestion] = useState(0);

    const generateFirstQuestion = () =>{
        axios.get(`/api/questionGeneration/firstQuestion?topicIndex=${topicIndex}`).then((response) => {
            const formatedQuestion = questionFormater(response.data);
            console.log("question: "+formatedQuestion.question+"\nanswer: "+formatedQuestion.answer.text);
            setOptions(formatedQuestion.options)
            setQuestion(formatedQuestion.question);
        }).catch((error) => {

            navigate("/Page404")
        }).finally(() => setTimeout(()=> { setLoaderFlag(false) },1000));
    }


    function testCaseHandling(){
        setLoaderFlag(true);
        axios.get("/api/questionGeneration/questionGenerate?topicIndex="+topicIndex).then((res2) => {
            const nextQuestion = questionFormater(res2.data);
            setOptions(nextQuestion.options)
            setQuestion(nextQuestion.question);
            setQuestionNumber(prevState => prevState+1);
        }).then((response) => {
            setLoaderFlag(false);
        })
    }

    useEffect(() => {
        if(options.length == 0){
            testCaseHandling();
        }else{
            setQuestionNumber(prevState => prevState+1);
        }
    },[options]);

    function generateNextQuestion(){
        const userAnswer = options.filter(option => option.id === selectedAnswer)[0].text;
        axios.post("/api/questionGeneration/saveQuestion",{
            question: question,
            answer: userAnswer,
            topicIndex: topicIndex
        }).then((res1)=>{
            axios.get("/api/questionGeneration/questionGenerate?topicIndex="+topicIndex).then((res2) => {
                const nextQuestion = questionFormater(res2.data);
                setQuestion(nextQuestion.question);
                setOptions(nextQuestion.options)
            })
        }).catch((error) => {
            if(error.response.status === 401){
                navigate("/Page404")
            }
        }).finally(() =>
            setTimeout(()=> { setLoaderFlag(false) },1000)
        );
    }
    useEffect(() => {
        if(topicIndex !== 0){
            generateFirstQuestion()
        }
    },[topicIndex])

    async function handleSubmit(){
        setLoaderFlag(true)
        setSelectedAnswer("");
        try{
            if(topicIndex === totalTopics-1 && questionNumber === noQuestions){
                navigate("/generatingRoadMap")
            }else{
                if(questionNumber === noQuestions){
                    await setQuestionNumber(0);
                    await setTopicIndex(prevState => prevState+1);

                }else{
                    generateNextQuestion()
                }
            }
        }catch(error){
            navigate("/Page404")
        }
    }

    useEffect(() => {
        setLoaderFlag(true);
        axios.delete("/api/questionGeneration/deleteQuestion").then((response) => {
            generateFirstQuestion()
        }).catch(err =>{
            navigate("/Page404")
        })
        axios.get("/api/questionGeneration/getTopicCount").then((response) => {
            setTotalTopics(parseInt(response.data.size))
        })

    },[])

    return(
        <div className="w-screen h-screen relative flex justify-center items-center overflow-hidden">
            <Background />
            {
             loaderFlag ?
                <QuestionPageSkeletonLoader />
             :
                 <div className=" w-[350px] lg:w-[800px]    h-auto  bg-base-300 rounded-lg border-2 border-solid border-neutral shadow-primary shadow-[0_0_5px]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-85 flex justify-evenly items-center flex-col py-4 px-6">
                     <div className="h-[90%] w-full flex flex-col items-center mb-4 p-6">
                         <div className="w-full mb-8">
                             <p className="text-center font-semibold text-primary text-2xl md:text-3xl">
                                 {question}
                             </p>
                         </div>

                         <div className="w-full max-w-2xl space-y-4">
                             {options.map((option) => (
                                 <label
                                     key={option.id}
                                     className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200
                              ${selectedAnswer === option.id
                                         ? 'bg-secondary/10 border-secondary'
                                         : 'bg-base-100 hover:bg-base-200'
                                     } border-2`}
                                 >
                                     <div className="flex items-center h-5">
                                         <input
                                             type="radio"
                                             name="mcq-answer"
                                             value={option.id}
                                             checked={selectedAnswer === option.id}
                                             onChange={(e) => setSelectedAnswer(e.target.value)}
                                             className="h-4 w-4 text-primary border-gray-300 focus:ring-primary hidden"
                                         />
                                     </div>
                                     <div className="ml-4 text-sm md:text-base">
                              <span className="font-medium ">
                                {option.id.toUpperCase()}. {option.text}
                              </span>
                                     </div>
                                 </label>
                             ))}
                         </div>
                     </div>
                     {
                         selectedAnswer !== "" &&
                         <div className=" flex justify-center items-center ">
                             <button className={"btn btn-outline btn-primary"} onClick={handleSubmit}>Submit</button>
                         </div>
                     }
                 </div>
            }

        </div>
    )
}
export default AssessmentPage;