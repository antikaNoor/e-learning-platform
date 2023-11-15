// @ts-ignore
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
// import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
// import SignUpOrganism from "./Components/organisms/SignUpOrganism";
import './App.css'
import LoginOrganism from "./components/templates/LoginPage";
import SignUpOrganism from "./components/templates/SignUpPage";
import ForgotPasswordOrganism from "./components/organisms/ForgotPasswordOrganism";
import ResetPasswordOrganism from "./components/organisms/ResetPasswordOrganism";
// import PrivateRoute from "./components/templates/AdminAuthenticate";
// import AdminAuthenticate from "./components/templates/AdminAuthenticate";
import 'react-toastify/dist/ReactToastify.css';
import DummyPage from "./components/templates/DummyPage";
import VerifyEmailPage from "./components/templates/VerifyEmailPage";
import NotFoundPage from "./components/templates/NotFoundPage";
import HomePage from "./components/templates/HomePage";
import AboutPage from "./components/templates/AboutPage";
import ContactPage from "./components/templates/ContactPage";
import AllCoursesPage from "./components/templates/AllCoursesPage";

type Props = {
  onSearch: () => void;
}

function App({ onSearch }: Props) {
  // const auth = useSelector((state: { auth: { username: string; email: string; _id: string; token: string } }) => state.auth);
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpOrganism />} />
          <Route path="verify-email/:userId/:token" element={<VerifyEmailPage />} />
          <Route path="login" element={<LoginOrganism />} />
          <Route path="forgot-password" element={<ForgotPasswordOrganism />} />
          <Route path="reset-password/:userId/:token" element={<ResetPasswordOrganism />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/courses" element={<AllCoursesPage onSearch={onSearch} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* <Route path="validate-reset-password/:userId/:token" element={<ResetPasswordOrganism />} /> */}
          {/* <Route path="/login" element={!(auth.username && auth.email && auth._id && auth.token) ? <LoginOrganism /> : <Navigate to={"/dummy"} />} /> */}
          {/* <Route element={<AdminAuthenticate />} > */}
          <Route path="/dummy" element={<DummyPage />} />
          <Route path="/home" element={<HomePage />} />
          {/* </Route> */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
