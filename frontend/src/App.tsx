// @ts-ignore
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
// import SignUpOrganism from "./Components/organisms/SignUpOrganism";
import './App.css'
import LoginOrganism from "./Components/organisms/LoginOrganism";
import SignUpOrganism from "./Components/organisms/SignUpOrganism";
import ForgotPasswordOrganism from "./Components/organisms/ForgotPasswordOrganism";
import ResetPasswordOrganism from "./Components/organisms/ResetPasswordOrganism";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUpOrganism />} />
          <Route path="login" element={<LoginOrganism />} />
          <Route path="forgot-password" element={<ForgotPasswordOrganism />} />
          <Route path="reset-password/:userId/:token" element={<ResetPasswordOrganism />} />
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
