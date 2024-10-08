import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Lawyers from "./pages/Lawyers";
import ESheria from "./pages/Home/ESheria";
import SheriaAi from "./pages/SheriaAi";
import Courts from "./pages/Courts";
import TrackCases from "./pages/TrackCases";
import CaseForm from "./pages/track-case/CaseForm";

import LawyerDetailsForm from "./authentication/LawyerDetailsForm";
import Registration from "./authentication/Registration";

import LawyersByCountyPage from "./pages/Lawyers/LawyersByCountyPage";
import LawyersByExpertise from "./pages/Lawyers/LawyersByExpertise";
import LawyerDetails from "./pages/Lawyers/LawyerDetails";

import FileUpload from "./pages/E-sheria-documents/FileUpload";
import SearchDocument from "./pages/E-sheria-documents/SearchDocument";
import About from "./pages/About";
import UserUpdateForm from "./authentication/UserUpdateForm";
import Login from "./authentication/Login";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/track/cases" element={<TrackCases />} />
            {/* General */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Registration />} />


            {/* Courts */}
            <Route path="/courts" element={<Courts />} />
            <Route path="/court/create/case" element={<CaseForm />} />

            {/* Lawyers */}
            <Route    path="/lawyer/registration"  element={<LawyerDetailsForm />}
            />
            <Route
              path="/lawyers-county/:county"
              element={<LawyersByCountyPage />}
            />
            <Route
              path="/lawyers-expertise/:expertise"
              element={<LawyersByExpertise />}
            />
            <Route path="/lawyer/:id" element={<LawyerDetails />} />
            {/* Users */}
            <Route path="/user/update-profile" element={<UserUpdateForm />} />
            <Route path="/lawyers" element={<Lawyers />} />


            <Route path="/sheria/chat" element={<SheriaAi />} />
            <Route path="/sheria/docs" element={<ESheria />} />
            <Route path="/sheria/search-docs" element={<SearchDocument />} />
            <Route path="/sheria/upload-doc" element={<FileUpload />} />

            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
