import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Lawyers from "./pages/Lawyers";

import Login from "./authentication/Login";
import LawyerDetailsForm from "./authentication/LawyerDetailsForm";
import Registration from "./authentication/Registration"; 

import LawyersByCountyPage from "./pages/Lawyers/LawyersByCountyPage";
import LawyersByExpertise from "./pages/Lawyers/LawyersByExpertise";
import LawyerDetails from "./pages/Lawyers/LawyerDetailsForm";

import SheriaAi from "./pages/SheriaAi";
import Courts from "./pages/Courts";
import TrackCases from "./pages/TrackCases";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Registration />} />
            <Route path="/courts" element={<Courts />} />
            <Route path="/track/cases" element={<TrackCases />} />
            <Route path="/lawyer-registration" element={<LawyerDetailsForm />} />
            {/* Lawyers */}
            <Route path="/lawyers" element={<Lawyers />} />
            <Route path="/lawyers-county/:county" element={<LawyersByCountyPage />} />
            <Route path="/lawyers-expertise/:expertise" element={<LawyersByExpertise />} />
            <Route path="/lawyer/:id" element={<LawyerDetails />} />  
            <Route path="/sheria/chat" element={<SheriaAi />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
