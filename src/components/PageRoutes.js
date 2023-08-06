import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeacherHeader from './Teacher/TeacherHeader';
import TeacherFooter from './Teacher/TeacherFooter';
import StudentHeader from './Student/StudentHeader';
import StudentFooter from './Student/StudentFooter';
import Home from './Home';
import TeacherDashboard from './Teacher/Dashboard';
import StudentDashboard from './Student/Dashboard';
import Attendance from './Teacher/Attendance';
import TeacherReport from './Teacher/Report';
import Substitute from './Teacher/Substitute';
import StudentReport from './Student/Report';
import Leave from './Student/Leave';
import UpdatePage from './Teacher/UpdatePage';

const App = () => {
  // Custom hook to get the current pathname
  const isTeacher = window.location.pathname.startsWith('/teacher');

  return (
    <Router>
      {isTeacher ? <TeacherHeader /> : <StudentHeader />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Conditionally render the dashboard based on the user role */}
        {isTeacher ? (
          <>
            <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
            <Route path="/Attendance" element={<Attendance />} />
            <Route path="/TeacherReport" element={<TeacherReport />} />
            <Route path="/UpdatePage" element={<UpdatePage />} />
          </>
        ) : (
          <>
            <Route path="/StudentDashboard" element={<StudentDashboard />} />
            <Route path="/StudentReport" element={<StudentReport />} />
            <Route path="/Leave" element={<Leave />} />
          </>
        )}
        {/* Add any other routes here as needed */}
      </Routes>
      {isTeacher ? <TeacherFooter /> : <StudentFooter />}
    </Router>
  );
};

export default App;
