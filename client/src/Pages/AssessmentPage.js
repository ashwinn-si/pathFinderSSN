import Background from "../Components/Background";
import {useState} from "react";

function AssessmentPage(props) {
    const [goal, setGoal] = useState("Select Goal");
    const [question, setQuestion] = useState(null);

    const [selectedAnswer, setSelectedAnswer] = useState('');

    const options = [
        { id: 'a', text: 'This is the first option for the MCQ question' },
        { id: 'b', text: 'This is the second option for the MCQ question' },
        { id: 'c', text: 'This is the third option for the MCQ question' },
        { id: 'd', text: 'This is the fourth option for the MCQ question' }
    ];

    function handleSubmit(){
        console.log("hello")
    }
    return(
        <div className="w-screen h-screen relative flex justify-center items-center overflow-hidden">
            <Background />
            <div className=" w-[350px] lg:w-[800px]    h-auto  bg-base-300 rounded-lg border-2 border-solid border-neutral shadow-primary shadow-[0_0_5px]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-85 flex justify-evenly items-center flex-col py-4 px-6">
                <div className="h-[90%] w-full flex flex-col items-center mb-4 p-6">
                    <div className="w-full mb-8">
                        <p className="text-center font-semibold text-primary text-2xl md:text-3xl">
                            What is the main question that you want to ask here?
                        </p>
                    </div>

                    <div className="w-full max-w-2xl space-y-4">
                        {options.map((option) => (
                            <label
                                key={option.id}
                                className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200
                              ${selectedAnswer === option.id
                                    ? 'bg-primary/10 border-primary'
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
                <div className=" flex justify-center items-center ">
                    <button className={"btn btn-outline btn-primary"} onClick={handleSubmit}>Submit</button>
                </div>

            </div>
        </div>
    )
}
export default AssessmentPage;