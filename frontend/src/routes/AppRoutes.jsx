import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import StudentLayout from "../components/layouts/StudentLayout";
import TeacherLayout from "../components/layouts/TeacherLayout";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

// Landing Page
import LandingPage from "../pages/LandingPage";

// Student Pages
import StudentDashboard from "../pages/student/Dashboard";
import Courses from "../pages/student/Courses";
import CourseDetails from "../pages/student/CourseDetails";
import Quiz from "../pages/student/Quiz";
import Results from "../pages/student/Results";
import Recommendations from "../pages/student/Recommendations";
import Reports from "../pages/student/Reports";
import Chatbot from "../pages/student/Chatbot";
import Profile from "../pages/student/Profile";

// Admin
import AdminDashboard from "../pages/admin/Dashboard";

// Teacher Pages
import TeacherDashboard from "../pages/teacher/Dashboard";
import ManageCourses from "../pages/teacher/ManageCourses";
import CreateCourse from "../pages/teacher/CreateCourse";
import CreateQuiz from "../pages/teacher/CreateQuiz";
import Students from "../pages/teacher/Students";
import Analytics from "../pages/teacher/Analytics";
import TeacherProfile from "../pages/teacher/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/student" element={<StudentLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetails />} />
        <Route path="quiz/" element={<Quiz />} />
        <Route path="results" element={<Results />} />
        <Route path="results/:id" element={<Results />} />
        <Route path="recommendations" element={<Recommendations />} />
        <Route path="reports" element={<Reports />} />
        <Route path="chatbot" element={<Chatbot />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      {/* Teacher Routes */}
      <Route path="/teacher" element={<TeacherLayout />}>
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="courses" element={<ManageCourses />} />
        <Route path="courses/create" element={<CreateCourse />} />
        <Route path="quiz/create" element={<CreateQuiz />} />
        <Route path="students" element={<Students />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="profile" element={<TeacherProfile />} />
      </Route>

      {/* Direct Teacher Dashboard Route */}
      <Route path="/teacher/dashboard" element={<TeacherDashboard />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;