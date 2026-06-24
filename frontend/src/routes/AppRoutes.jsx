import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // `<Router>` ko hata diya import se
import ProtectedRoute from "../components/common/ProtectedRoute";
import StudentLayout  from "../components/layouts/StudentLayout";

// Auth
import Login          from "../pages/auth/Login";
import Register       from "../pages/auth/Register";

// Student
import Dashboard      from "../pages/student/Dashboard";
import Courses        from "../pages/student/Courses";
import CourseDetails  from "../pages/student/CourseDetails";
import Quiz           from "../pages/student/Quiz";
import Results        from "../pages/student/Results";
import Recommendations from "../pages/student/Recommendations";
import Reports        from "../pages/student/Reports";
import Chatbot        from "../pages/student/Chatbot";
import Profile        from "../pages/student/Profile";

// Component Imports
import LandingPage from "../pages/LandingPage";
import ForgotPassword from "../pages/auth/ForgotPassword";

// Dashboards Placeholders
import StudentDashboard from "../pages/student/Dashboard";
import TeacherDashboard from "../pages/teacher/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";

const AppRoutes = () => {
  return (
    // Yahan se parent <Router> wrapper hata diya h
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/student/dashboard" element={<Dashboard />} />

      {/* Dashboards */}
      <Route path="/student" element={
        <ProtectedRoute role="Student">
          <StudentLayout />
        </ProtectedRoute>
      }>
        <Route index                     element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard"          element={<Dashboard />} />
        <Route path="courses"            element={<Courses />} />
        <Route path="courses/:id"        element={<CourseDetails />} />
        <Route path="quiz/:id"           element={<Quiz />} />
        <Route path="results"            element={<Results />} />
        <Route path="results/:id"        element={<Results />} />
        <Route path="recommendations"    element={<Recommendations />} />
        <Route path="reports"            element={<Reports />} />
        <Route path="chatbot"            element={<Chatbot />} />
        <Route path="profile"            element={<Profile />} />
      </Route>
      <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;