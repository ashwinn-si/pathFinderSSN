import Background from "../Background";
import Header from "./Header";
import {Link} from "react-router-dom";
import LandingPage from "../../Pages/LandingPage";

function HeroPage() {
    return (
        <div className="w-screen h-screen relative flex justify-center items-center overflow-hidden">
            <Background />

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen cursor-pointer flex justify-center items-center">
                <div className="relative w-1/2 text-center">
                    <Header
                        text="pathFinder"
                        flex={true}
                        alpha={false}
                        stroke={false}
                        width={true}
                        weight={true}
                        italic={true}
                        textColor=""
                        strokeColor="#ff0000"
                        minFontSize={100}
                    />
                    <p className="custom-FontFamily text-xl mt-4 text-center text-primary font-[600]">
                        Your Roadmap to Success, One Step at a Time!!
                    </p>
                    <div className="flex items-center justify-evenly mt-4">
                        <Link to="/login">
                            <button className="btn btn-outline px-6 py-1 text-l custom-FontFamily">Login </button>
                        </Link>
                        <Link to="/signup">
                            <button className="btn btn-outline px-6 py-1 text-l custom-FontFamily">SignUp </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroPage;