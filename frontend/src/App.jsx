import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Lawyers from "./pages/Lawyers";
import Login from "./authentication/Login"; // Ensure this path is correct
import Registration from "./authentication/Registration"; // Ensure this path is correct
import { AuthProvider } from "./context/AuthContext";
import LawyerRegistration from "./authentication/LawyerRegistration";

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
          <Route path="/lawyer-registration" element={<LawyerRegistration />}/>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
