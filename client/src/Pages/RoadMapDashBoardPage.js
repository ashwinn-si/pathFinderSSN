import {React, useEffect, useState} from 'react';
import Background from "../Components/Background";
import { Map } from 'lucide-react';
import axios from "./../AxiosProvider"
import {useNavigate} from "react-router-dom";
import RoadMapPageSkeleton from "./SkeletonLoaderPage/RoadMapPageSkeleton";

function RoadMapDashBoardPage() {
    const [availableRoadMaps, setAvailableRoadMaps] = useState([]);
    const [loaderFlag, setLoaderFlag] = useState(false);
    const navigate = useNavigate();

    function getRoadMaps() {
        setLoaderFlag(true);
        axios.get("/api/user/roadmap/getDetails").then((response)=>{
            const roadMap = response.data.roadMaps
            setAvailableRoadMaps(roadMap)
        }).catch(e =>{
            if(e.response.status === 401){
                navigate("/Page404");
            }
        }).finally()
        {
            console.log("hello")
            setTimeout(() => {
                setLoaderFlag(false)
            }, 1000);
        }
    }

    useEffect(()=>{
        getRoadMaps();
    },[])
    const handleLogOut = () =>{
        axios.delete("/api/auth/logout").then((response) => {
            navigate("/");
        })

    }
    const openHandler = (index)=>{
        navigate(`/roadmap/${availableRoadMaps[index].roadMapID}`)
    }

    const openDelete = (index) =>{
        axios.delete(`/api/user/roadmap/delete?roadMapID=${availableRoadMaps[index].roadMapID}`).then((response) => {
            if(response.status === 200){
                getRoadMaps()
            }
        })
    }

    return (
        <div className="w-screen h-screen relative flex justify-center items-center overflow-hidden">
            <Background />
            <button className=" btn  btn-secondary  absolute top-7 left-20 z-[11] border border-solid border-1" onClick={handleLogOut} >
                Logout
            </button>
            {
                loaderFlag ?
                    <RoadMapPageSkeleton header = "Getting your RoadMapss...!"/>
                    :
                    <div className="w-[350px] lg:w-[700px] min-h-[300px] px-5 py-5 bg-base-300 rounded-lg border-2 border-solid border-neutral shadow-primary shadow-[0_0_5px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-85 custom-FontFamily  ">

                        <p className="text-2xl lg:text-3xl font-semibold text-center mb-6 " >All Available RoadMaps</p>
                        <div className="flex flex-col gap-5">
                            {
                                availableRoadMaps.length > 0 ?
                                    availableRoadMaps.map((roadmap,index) => (
                                        <div className="flex items-center justify-between w-90 border-secondary border-2 py-4 px-4 rounded-xl" key={index}>
                                            <div className="flex items-center gap-3">
                                                <Map className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400" />
                                                <div>
                                                    <h2 className="text-l lg:text-xl font-semibold ">{roadmap.skillName}</h2>
                                                    <p className="text-sm text-secondary">{roadmap.dateOfCreation}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className=" px-2 py-1 lg:px-4 lg:py-2 bg-zinc-400 text-white rounded-md hover:bg-zinc-500  transition-colors duration-200 flex items-center gap-2"
                                                        onClick={() => openDelete(index)}>
                                                    Delete
                                                </button>
                                                <button className=" px-2 py-1 lg:px-4 lg:py-2 bg-purple-400 text-white rounded-md hover:bg-purple-500 transition-colors duration-200 flex items-center gap-2"
                                                        onClick={() => openHandler(index)}>
                                                    Open
                                                </button>
                                            </div>

                                        </div>
                                    )) : null
                            }
                            <div className="flex items-center justify-between w-90 border-secondary  border-2 py-4 px-4 rounded-xl" >
                                <div className="flex items-center gap-3">
                                    <Map className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400" />
                                    <div>
                                        <h2 className="text-l lg:text-xl font-semibold ">Create RoadMap</h2>

                                    </div>
                                </div>
                                <button className=" px-2 py-1 lg:px-4 lg:py-2 bg-red-400 text-white rounded-md hover:bg-red-500 transition-colors duration-200 flex items-center gap-2"
                                        onClick={() => navigate("/goalselection")}>
                                    Create
                                </button>
                            </div>
                        </div>

                    </div>
            }


        </div>
    );
}

export default RoadMapDashBoardPage;