import {Route, Routes, BrowserRouter} from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import ThemeChanger from "./Components/ThemeChanger";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import SelectGoalPage from "./Pages/SelectGoalPage";
import AssessmentPage from "./Pages/AssessmentPage";
import UserKnowledgePage from "./Pages/UserKnowledgePage";
import RoadMapPage from "./Pages/RoadMapPage";
import SkillPageSkeleton from "./Pages/SkeletonLoaderPage/SkillPageSkeleton";
import RoadMapDashBoardPage from "./Pages/RoadMapDashBoardPage";
import Page404 from "./Pages/Page404";
import GeneratingRoadMapLoadingPage from "./Pages/SkeletonLoaderPage/GeneratingRoadMapLoadingPage";
import ChatBot from "./Components/ChatBot";


function App() {
  return (
    <div>
      <ThemeChanger />
        <ChatBot />
        <BrowserRouter>
            <Routes>
                  <Route path="/" element={<LandingPage />}></Route>
                  <Route path="/login" element={<LoginPage />}></Route>
                  <Route path="/signup" element={<SignUpPage />}></Route>
                  <Route path="/userKnowledge" element={<UserKnowledgePage />}></Route>
                  <Route path="/goalselection" element={<SelectGoalPage />}></Route>
                  <Route path="/quizPage" element={<AssessmentPage />}></Route>
                  <Route path="/skeletonLoader" element={<SkillPageSkeleton/>}></Route>
                  <Route path="/generatingRoadMap" element = {<GeneratingRoadMapLoadingPage />}></Route>
                  <Route path="/roadMapDashBoard" element = {<RoadMapDashBoardPage />}></Route>
                  <Route path="/Page404" element = {<Page404 />}></Route>
                  <Route path="/roadmap/:id" element={<RoadMapPage />}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
