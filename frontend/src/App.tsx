// @ts-ignore
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
// import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
// import SignUpOrganism from "./Components/organisms/SignUpOrganism";
import './App.css'
import LoginOrganism from "./components/organisms/LoginOrganism";
import SignUpOrganism from "./components/organisms/SignUpOrganism";
import ForgotPasswordOrganism from "./components/organisms/ForgotPasswordOrganism";
import ResetPasswordOrganism from "./components/organisms/ResetPasswordOrganism";
// import PrivateRoute from "./components/templates/AdminAuthenticate";
import AdminAuthenticate from "./components/templates/AdminAuthenticate";
import 'react-toastify/dist/ReactToastify.css';
import DummyPage from "./components/templates/DummyPage";

function App() {
  // const auth = useSelector((state: { auth: { username: string; email: string; _id: string; token: string } }) => state.auth);
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUpOrganism />} />
          <Route path="login" element={<LoginOrganism />} />
          <Route path="forgot-password" element={<ForgotPasswordOrganism />} />
          <Route path="reset-password/:userId/:token" element={<ResetPasswordOrganism />} />
          {/* <Route path="validate-reset-password/:userId/:token" element={<ResetPasswordOrganism />} /> */}
          {/* <Route path="/login" element={!(auth.username && auth.email && auth._id && auth.token) ? <LoginOrganism /> : <Navigate to={"/dummy"} />} /> */}
          <Route element={<AdminAuthenticate />} >
            <Route path="/dummy" element={<DummyPage />} />
          </Route>
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
