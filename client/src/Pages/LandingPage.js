import Background from "../Components/Background";
import Header from "../Components/LandingPage/Header";
import {Link} from "react-router-dom";

import HeroPage from "../Components/LandingPage/HeroPage";
import Documentation1Page from "../Components/LandingPage/Documentation1Page";

function LandingPage() {
    return (
        <div className="overflow-x-hidden ">
            <section id="Home"  className="overflow-hidden">
                <HeroPage/>
            </section>
            <section id="Documentation-1" className="overflow-hidden">
               <Documentation1Page/>
            </section>
            
        </div>
    )
}

export default LandingPage;