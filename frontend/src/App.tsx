// @ts-ignore
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import './App.css'
import LoginOrganism from "./components/templates/CommonPages/LoginPage";
import SignUpOrganism from "./components/templates/CommonPages/SignUpPage";
import ForgotPasswordOrganism from "./components/organisms/CommonOrganisms/ForgotPasswordOrganism";
import ResetPasswordOrganism from "./components/organisms/CommonOrganisms/ResetPasswordOrganism";
import 'react-toastify/dist/ReactToastify.css';
import DummyPage from "./components/templates/CommonPages/DummyPage";
import VerifyEmailPage from "./components/templates/CommonPages/VerifyEmailPage";
import NotFoundPage from "./components/templates/CommonPages/NotFoundPage";
import HomePage from "./components/templates/CommonPages/HomePage";
import AboutPage from "./components/templates/CommonPages/AboutPage";
import ContactPage from "./components/templates/CommonPages/ContactPage";
import AllCoursesPage from "./components/templates/CommonPages/AllCoursesPage";
import TeacherInfoMolecule from "./components/molecules/TeacherMolecules/TeacherInfoMolecule";
import LoginAuthenticate from "./components/templates/CommonPages/LoginAuthenticate";
import CreateCourseMolecule from "./components/molecules/TeacherMolecules/CreateCourseMolecule";
import TeacherProfilePage from "./components/templates/TeacherPages/TeacherProfilePage";
import AdminAuthenticate from "./components/templates/AdminPages/AdminAuthenticate";
import TeacherAuthenticate from "./components/templates/TeacherPages/TeacherAuthenticate";
import StudentAuthenticate from "./components/templates/StudentPages/StudentAuthenticate";
import StudentProfilePage from "./components/templates/StudentPages/StudentProfilePage";
import SingleCourseOverviewPage from "./components/templates/CommonPages/SingleCourseOverviewPage";
import CreateLessonMolecule from "./components/molecules/TeacherMolecules/CreateLessonMolecule";
import SingleCourseStudentPage from "./components/templates/StudentPages/SingleCourseStudentPage";
import CreateQuizMolecule from "./components/molecules/TeacherMolecules/CreateQuizMolecule";
import CreateAssignmentMolecule from "./components/molecules/TeacherMolecules/CreateAssignmentMolecule";

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
              <Route path="/login/teacher/teacher-profile/create-lesson/create-quiz/create-assignment/:courseId" element={<CreateAssignmentMolecule />} />
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
