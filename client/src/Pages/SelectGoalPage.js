import Background from "../Components/Background";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import api from "./../AxiosProvider"

function SelectGoalPage(props) {
    const [userTopic, setUserTopic] = useState("Select Topic");
    const [userSubTopic, setUserSubTopic] = useState("Select Sub Topic");
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);
    useEffect(() => {
       api.get("/api/user/getTopics").then(res => {
           const topics = res.data.topics.map(element =>{
                return {
                    topic: element.topic,
                    subTopic: element.subTopics.map(currTopic => {
                        return currTopic.subTopic
                    }),
                }
           })
           setTopics(topics);
       })
    },[])
    function handleSubmit(){
        api.post("/api/user/addskill",{
            topic : userTopic,
            subTopic : userSubTopic
        }).then(response =>{
            if(response.status === 200){
                navigate(`/userKnowledge`);
            }
        }).catch(error =>{
            console.log(error);
        })

    }

    const handleBack = () =>{
        navigate("/roadMapDashBoard");
    }

    return (
        <div className="w-screen h-screen relative flex justify-center items-center overflow-x-hidden">
            <Background />
            <button
                className="btn btn-secondary absolute top-7 left-20 z-10 border border-solid"
                onClick={handleBack}
            >
                Back
            </button>

            <div className="flex flex-col gap-6 w-[350px] lg:w-[500px] max-h-[80vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                {/* First Box - Topic Selection */}
                <div className="bg-base-300 rounded-lg border-2 border-solid border-primary shadow-primary shadow-sm p-6 bg-opacity-85 custom-FontFamily">
                    <div className="mb-6">
                        <p className="text-center font-bold text-2xl md:text-4xl">Set Your Goal</p>
                    </div>

                    <div className="mb-6">
                        <div className="w-full bg-base-100 border border-primary rounded-xl p-3 text-center">
                            {userTopic === "Select Topic" ? (
                                <p className="text-xl font-semibold">{userTopic} !!!</p>
                            ) : (
                                <p className="text-xl font-semibold">
                                    {userTopic} / <span className="text-secondary">{userSubTopic}</span>
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center">
                        {topics.map((goalOption) => (
                            <button
                                key={goalOption.topic}
                                onClick={() => {
                                    setUserTopic(goalOption.topic);
                                    setUserSubTopic("Select Sub Topic");
                                }}
                                className={`px-4 py-2 rounded-full text-base font-medium transition-all duration-200 border-2
                  ${userTopic === goalOption.topic
                                    ? 'bg-primary text-white shadow-md scale-105'
                                    : 'bg-base-100 hover:bg-primary/10 hover:shadow-md hover:scale-105'
                                } border-primary/20 hover:border-primary/50`}
                            >
                                {goalOption.topic}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Second Box - Subtopic Selection with Scrolling */}
                {userTopic !== "Select Topic" && (
                    <div className="bg-base-300 rounded-lg border-2 border-solid border-secondary shadow-secondary shadow-sm p-6 bg-opacity-85 custom-FontFamily ">
                        <div className="max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                            <div className="flex flex-wrap gap-3 justify-center">
                                {topics
                                    .find(currTopic => currTopic.topic === userTopic)
                                    .subTopic.map((subTopic) => (
                                        <button
                                            key={subTopic}
                                            onClick={() => setUserSubTopic(subTopic)}
                                            className={`px-4 py-2 rounded-full text-base font-medium transition-all duration-200 border-2
                        ${userSubTopic === subTopic
                                                ? 'bg-secondary text-white shadow-md scale-105'
                                                : 'bg-base-100 hover:bg-secondary/10 hover:shadow-md hover:scale-105'
                                            } border-secondary/20 hover:border-secondary/50`}
                                        >
                                            {subTopic}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </div>

                )}
                {userSubTopic !== "Select Sub Topic" && (
                    <div className="custom-FontFamily">
                        <div className="flex justify-center mt-6">
                            <button
                                className="btn  btn-primary"
                                onClick={handleSubmit}
                            >
                                Set Goal
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
export default SelectGoalPage;