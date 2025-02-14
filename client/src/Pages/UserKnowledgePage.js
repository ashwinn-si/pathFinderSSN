import Background from "../Components/Background";
import {useEffect, useState} from "react";
import StarRating from "../Components/StarRating";
import api from ".././AxiosProvider"
import {useParams} from "react-router-dom";

function UserKnowledgePage(){
    const email = useParams().email;
    const [topics, setTopics] = useState(null);

    useEffect(()=>{
        api.get(`/api/user/getSkill/${email}`).then((response) => {
            const data = response.data.data;
            const currentData = {}
            data.map((item) => {
                currentData[item] = 0;
            })
            setTopics(currentData);
        })
    },[email])


    const handleRatingChange = (topic, newValue) => {
        setTopics(prev => ({
            ...prev,
            [topic]: newValue
        }));
    };

    const handleSubmit = () =>{
        console.log(topics)
    }

    return(
        <div className="w-screen h-screen relative flex justify-center items-center overflow-hidden">
            <Background />
            <div className=" w-[350px] lg:w-[800px]    h-auto  bg-base-300 rounded-lg border-2 border-solid border-neutral shadow-primary shadow-[0_0_5px]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-85 flex justify-evenly items-center flex-col py-4 px-6">
                <div className="h-[90%] w-full flex flex-col items-center mb-4 p-6">
                    <div className="h-[20%] w-full flex justify-center items-center mb-4">
                        <p className="text-center font-semibold text-primary text-2xl md:text-3xl custom-FontFamily">Rate YourSelf In These Topics
                        </p>
                    </div>
                    <div className="w-[90%] grid grid-cols-1 gap-4 items-center justify-center my-2">
                        {
                            topics !== null ?
                                Object.entries(topics)?.map(([topic, value], index) => (
                                        <div key={index} className="w-full grid grid-cols-2 gap-4 items-center justify-center my-2">
                                            <div className="flex justify-center items-center">
                                                <p className="text-center font-[500] text-secondary text-xl md:text-2xl custom-FontFamily">
                                                    {topic}
                                                </p>
                                            </div>
                                            <div className="flex justify-center items-center">
                                                <StarRating
                                                    value={value}
                                                    name={`topic-${index}`}
                                                    onChange={(newValue) => handleRatingChange(topic, newValue)}
                                                />
                                            </div>
                                        </div>
                                    )) : null
                        }

                    </div>
                    <div>
                        <button  className="btn btn-primary btn-outline px-6 py-2" onClick={handleSubmit}>Proceed</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UserKnowledgePage;