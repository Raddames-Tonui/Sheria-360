import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Lawyers from "./pages/Lawyers";
import Login from "./authentication/Login";
import Registration from "./authentication/Registration"; 
import { AuthProvider } from "./context/AuthContext";
import LawyerDetailsForm from "./authentication/LawyerDetailsForm";

import LawyersPage from "./pages/Lawyers/LawyersPage";
import LawyersByCountyPage from "./pages/Lawyers/LawyersByCountyPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/lawyers" element={<Lawyers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/lawyer-registration" element={<LawyerDetailsForm />}/>
          <Route path="/lawyers/:area" element={<LawyersPage />} />
          <Route path="/lawyers-county/:county" element={<LawyersByCountyPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
