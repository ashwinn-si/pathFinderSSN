import { GoArrowRight } from "react-icons/go";
import {motion} from "framer-motion";
import Background from "../Background";

function Documentation1Page(){
    const learningChallenges = [
        {
            point: "Lack of Personalized Learning Paths",
            description: "In today’s fast-paced world, individuals often struggle to find learning paths that are specifically tailored to their existing knowledge and goals. Generic resources fail to offer personalized recommendations based on the learner’s individual needs."
        },
        {
            point: "One-Size-Fits-All Approach",
            description: "Current resources, like generic courses or static guides, are designed for a broad audience and fail to consider the unique starting points, learning speeds, and progress of each individual. This makes it difficult for learners to find content that suits their personal journey."
        },
        {
            point: "Inefficiency in Learning",
            description: "Because learning materials are not personalized, individuals may spend time on content that is too basic or too advanced, leading to inefficiency. Learners may also revisit topics they already know or miss out on critical knowledge gaps."
        },
        {
            point: "Frustration and Burnout",
            description: "When content does not align with a learner’s skill level or goals, it can lead to frustration. The lack of tailored guidance makes it harder to stay motivated, often resulting in disengagement, burnout, or abandoning the learning process altogether."
        },
        {
            point: "Missed Opportunities for Growth",
            description: "Without a personalized learning path, individuals risk missing out on key opportunities for growth. By following a static or irrelevant curriculum, learners may not progress at the pace or in the direction that truly benefits their development."
        },
        {
            point: "Limited Feedback and Tracking",
            description: "Generic learning resources often lack the ability to provide real-time feedback or track individual progress. This makes it difficult for learners to understand where they are excelling and where they need improvement, leading to a sense of stagnation."
        },
        {
            point: "Loss of Confidence",
            description: "As learners struggle to find relevant and challenging material, their confidence can diminish. The mismatch between their goals and available resources can cause self-doubt, lowering the motivation to continue learning."
        },
        {
            point: "Rigid Learning Structures",
            description: "Most current learning systems follow a rigid, linear structure, offering little flexibility for learners to explore alternative paths or adjust to their evolving needs. This restricts creativity and limits the opportunity to discover new interests or topics."
        },
        {
            point: "Time Wastage",
            description: "Learning materials often include irrelevant information, causing learners to waste valuable time. Time spent on non-essential content could otherwise be directed toward mastering more important concepts that align with their career or personal goals."
        }
    ];


    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: {
            y: 0,
            opacity: 2,
            transition: { duration: 2, ease: "easeOut" },
        },
        exit: { y: -10, opacity: 0, transition: { duration: 0.2 } },
    };

    return(
        <div className="relative flex flex-col items-center justify-center h-[200vh] lg:h-[100vh]">
            <Background />
            <motion.div className="absolute grid grid-cols-1 lg:grid-cols-[57fr_38fr] grid-rows-[auto_auto] lg:grid-rows-none min-h-screen z-[11] w-full gap-4 p-2 md:p-4">
                <div className="w-full h-full bg-base-100 bg-opacity-50 rounded-lg p-2 md:p-4 border-[1px] border-primary flex flex-col justify-evenly items-center overflow-hidden" variants={itemVariants} whileInView="visible" initial="hidden"
                     exit="exit" >
                    <p className="text-xl md:text-2xl lg:text-3xl font-[550] text-primary mb-4">
                        Reason For Developement
                    </p>
                    <motion.div className="w-full my-3 md:my-5">
                        <div className="flex flex-col items-start gap-2 md:gap-3">
                            {learningChallenges.map((learn, index) => (
                                <motion.div key={index} className="flex items-center gap-2 w-full" variants={itemVariants} whileInView="visible" initial="hidden"
                                            exit="exit" >
                                    <GoArrowRight className="text-primary min-w-[16px] md:min-w-[20px]" />
                                    <p className="text-sm md:text-base lg:text-lg hover:py-1 hover:scale-105 transition-all duration-300 cursor-pointer w-full text-left">
                                        <span className="font-[600]"> {learn.point} - </span>{learn.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div className="w-full my-3 md:my-5" variants={itemVariants} whileInView="visible" initial="hidden"
                                exit="exit" >
                        <p className="text-lg md:text-xl lg:text-2xl font-[700] text-center hover:tracking-widest transition-all duration-300 mb-4">
                            Repository Links
                        </p>
                        <div className="flex w-full justify-evenly items-center gap-2 my-3">
                            <button className="btn btn-outline btn-secondary text-sm md:text-base"><a href="https://github.com/ashwinn-si/autherizationFrontEnd" target="_blank">FrontEnd</a></button>
                            <button className="btn btn-outline btn-accent text-sm md:text-base"><a href="https://github.com/ashwinn-si/autherizationBackEnd" target="_blank">BackEnd</a></button>
                        </div>
                    </motion.div>
                </div>

                <motion.div className="grid grid-rows-2 gap-4" variants={itemVariants} whileInView="visible" initial="hidden"
                            exit="exit" >
                    <div className="w-full h-full bg-base-100 bg-opacity-50 rounded-lg p-2 md:p-4 border-[1px] border-primary flex flex-col justify-start items-center overflow-hidden">
                        <p className="text-xl md:text-2xl lg:text-3xl font-[550] text-primary mb-4">Password</p>
                        <motion.div className=" my-5 overflow-x-auto" variants={itemVariants} whileInView="visible" initial="hidden"
                                    exit="exit" >
                            <table className="table w-full lg:w-1/2 mx-auto">
                                <thead>
                                <tr>
                                    <th className="text-center text-base lg:text-lg">Email</th>
                                    <th className="text-center text-base lg:text-lg">Password</th>
                                    <th className="text-center text-base lg:text-lg">Role</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="text-center text-sm lg:text-base">admin</td>
                                    <td className="text-center text-sm lg:text-base">root</td>
                                    <td className="text-center text-sm lg:text-base">admin</td>
                                </tr>
                                </tbody>
                            </table>
                        </motion.div>
                        <div className="flex flex-col items-start gap-2 md:gap-3">
                            <p className="text-lg md:text-xl lg:text-2xl font-[700] text-center hover:tracking-widest transition-all duration-300 mb-4 w-full">
                                Steps
                            </p>
                            {/*{*/}
                            {/*    userSteps.map((step, index) => (*/}
                            {/*        <motion.div className="flex items-center gap-2 w-full" variants={itemVariants} whileInView="visible" initial="hidden"*/}
                            {/*                    exit="exit"  key={index}>*/}
                            {/*            <GoArrowRight className="text-primary min-w-[16px] md:min-w-[20px]" />*/}
                            {/*            <p className="text-sm md:text-base lg:text-lg hover:py-1 hover:scale-105 transition-all duration-300 cursor-pointer w-full text-left">*/}
                            {/*                {step}*/}
                            {/*            </p>*/}
                            {/*        </motion.div>*/}
                            {/*    ))*/}
                            {/*}*/}

                        </div>
                    </div>
                    <motion.div
                        variants={itemVariants} whileInView="visible" initial="hidden"
                        exit="exit"
                        className="w-full h-full bg-base-100 bg-opacity-50 rounded-lg p-2 md:p-4 border-[1px] border-primary flex flex-col justify-evenly items-center overflow-hidden">
                        <p className="text-lg md:text-xl lg:text-2xl font-[700] text-center hover:tracking-widest transition-all duration-300 mb-4 cursor-pointer">
                            Developed By : <span className="text-primary">Ashwin SI</span>
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}
export default Documentation1Page;