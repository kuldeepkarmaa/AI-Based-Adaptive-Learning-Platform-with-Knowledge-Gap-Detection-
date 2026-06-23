import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // `<Router>` ko hata diya import se

// Component Imports
import LandingPage from "../pages/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

// Dashboards Placeholders
import StudentDashboard from "../pages/student/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";
import TeacherLayout from "../components/layouts/TeacherLayout";
import TeacherDashboard from "../pages/teacher/Dashboard";
import ManageCourses from "../pages/teacher/ManageCourses";
import CreateCourse from "../pages/teacher/CreateCourse";
import CreateQuiz from "../pages/teacher/CreateQuiz";
import Students from "../pages/teacher/Students";
import Analytics from "../pages/teacher/Analytics";
import Profile from "../pages/teacher/Profile";

const AppRoutes = () => {
  return (
    // Yahan se parent <Router> wrapper hata diya h
    <Routes>
      {/* Public Routes */}
     {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
 
      {/* Teacher routes — TODO: wrap with <ProtectedRoute allowedRole="teacher"> once auth is implemented */}
      <Route path="/teacher" element={<TeacherLayout />}>
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="courses" element={<ManageCourses />} />
        <Route path="courses/create" element={<CreateCourse />} />
        <Route path="quiz/create" element={<CreateQuiz />} />
        <Route path="students" element={<Students />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;