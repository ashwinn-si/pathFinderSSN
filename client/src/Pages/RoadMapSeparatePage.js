import { GoArrowRight } from "react-icons/go";

function RoadMapSeparatePage({header, description, reasourcesLink}){
    return (
        <div className="w-full max-w-4xl mx-auto p-8 custom-FontFamily">
            <div className="bg-base-200 rounded-xl p-8 shadow-xl relative border">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-base-content mb-2">{header}</h1>
                </div>

                <div className = "mb-3">
                    <p>
                    {description}
                    </p>
                </div>

                <div className=" text-left">
                    <h1 className="text-xl font-bold text-base-content mb-2">Links</h1>
                </div>
                <div  className="flex items-center gap-2 w-full flex-col"  >
                {
                    reasourcesLink.map((item,index) => (

                        <div  className="flex items-center gap-2 w-full" key={index}>
                            <GoArrowRight className="text-primary min-w-[16px] md:min-w-[20px]" />
                            <p className="text-sm md:text-base lg:text-lg  cursor-pointer w-full text-left font-[600]">
                            <span className="font-[700] text-secondary">{item.topic} - </span>
                                <a href={item.link} target="_blank" className="cursor-pointer"> resources Link</a>
                            </p>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
}
export default RoadMapSeparatePage;