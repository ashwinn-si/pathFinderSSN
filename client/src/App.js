import {Route, Routes, BrowserRouter} from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import ThemeChanger from "./Components/ThemeChanger";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import DashBoardPageNew from "./Pages/DashBoard/DashBoardPageNew";
import DashBoardPageOld from "./Pages/DashBoard/DashBoardPageOld";
import SelectGoalPage from "./Pages/SelectGoalPage";
import AssessmentPage from "./Pages/AssessmentPage";
import UserKnowledgePage from "./Pages/UserKnowledgePage";
import RoadMapPage from "./Pages/RoadMapPage";
import RoadMapSeparatePage from "./Pages/RoadMapSeparatePage"

function App() {
  return (
    <div>
      <ThemeChanger />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/dashboard/new" element={<DashBoardPageNew />}></Route>
          <Route path="/dashboard/old" element={<DashBoardPageOld />}></Route>
          <Route path="/userKnowledge" element={<UserKnowledgePage />}></Route>
          <Route path="/goalselection" element={<SelectGoalPage />}></Route>
          <Route path="/assessment" element={<AssessmentPage />}></Route>
          <Route path="/roadmap" element={<RoadMapPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
