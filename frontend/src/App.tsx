// @ts-ignore
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import './App.css'
import LoginOrganism from "./components/templates/LoginPage";
import SignUpOrganism from "./components/templates/SignUpPage";
import ForgotPasswordOrganism from "./components/organisms/ForgotPasswordOrganism";
import ResetPasswordOrganism from "./components/organisms/ResetPasswordOrganism";
import 'react-toastify/dist/ReactToastify.css';
import DummyPage from "./components/templates/DummyPage";
import VerifyEmailPage from "./components/templates/VerifyEmailPage";
import NotFoundPage from "./components/templates/NotFoundPage";
import HomePage from "./components/templates/HomePage";
import AboutPage from "./components/templates/AboutPage";
import ContactPage from "./components/templates/ContactPage";
import AllCoursesPage from "./components/templates/AllCoursesPage";
import TeacherInfoMolecule from "./components/molecules/TeacherInfoMolecule";
import LoginAuthenticate from "./components/templates/LoginAuthenticate";
import CreateCourseMolecule from "./components/molecules/CreateCourseMolecule";
import TeacherProfilePage from "./components/templates/TeacherProfilePage";
import AdminAuthenticate from "./components/templates/AdminAuthenticate";
import TeacherAuthenticate from "./components/templates/TeacherAuthenticate";
import StudentAuthenticate from "./components/templates/StudentAuthenticate";
import StudentProfilePage from "./components/templates/StudentProfilePage";
import SingleCourseOverviewPage from "./components/templates/SingleCourseOverviewPage";
import CreateLessonMolecule from "./components/molecules/CreateLessonMolecule";
import SingleCourseStudentPage from "./components/templates/SingleCourseStudentPage";
import CreateQuizMolecule from "./components/molecules/CreateQuizMolecule";

function App() {
  // const auth = useSelector((state: { auth: { username: string; email: string; _id: string; token: string } }) => state.auth);
  return (
    <>
      <ToastContainer position="bottom-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpOrganism />} />
          <Route path="verify-email/:userId/:token" element={<VerifyEmailPage />} />
          <Route path="login" element={<LoginOrganism />} />
          <Route path="forgot-password" element={<ForgotPasswordOrganism />} />
          <Route path="reset-password/:userId/:token" element={<ResetPasswordOrganism />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/courses" element={<AllCoursesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dummy" element={<DummyPage />} />
          {/* <Route path="/home" element={<HomePage />} /> */}
          <Route path="/single-course/:courseId" element={<SingleCourseOverviewPage />} />
          <Route element={<LoginAuthenticate />}>
            <Route path="login/teacher" element={<TeacherInfoMolecule />} />
            <Route element={<TeacherAuthenticate />}>
              <Route path="login/teacher/create-course" element={<CreateCourseMolecule />} />
              <Route path="login/teacher/teacher-profile" element={<TeacherProfilePage />} />
              <Route path="/login/teacher/teacher-profile/create-lesson/:courseId" element={<CreateLessonMolecule />} />
              <Route path="/login/teacher/teacher-profile/create-lesson/create-quiz/:courseId" element={<CreateQuizMolecule />} />
            </Route>
            <Route element={<StudentAuthenticate />}>
              <Route path="login/student/student-profile" element={<StudentProfilePage />} />
              <Route path="login/student/student-profile/single-course-student/:courseId" element={<SingleCourseStudentPage />} />
            </Route>
            <Route element={<AdminAuthenticate />}>
              <Route path="login/admin/admin-profile" element={<StudentProfilePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
