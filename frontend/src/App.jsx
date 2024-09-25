import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import SignUpForm from "./pages/SignUpForm";


function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUpForm />} />
              
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
    </BrowserRouter>
  );
}

export default App;