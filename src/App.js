import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeacherHeader from './components/Teacher/TeacherHeader';

import StudentHeader from './components/Student/StudentHeader';
import Footer from './components/Footer';
import Home from './components/Home';
import TeacherDashboard from './components/Teacher/Dashboard';
import StudentDashboard from './components/Student/Dashboard';
import Attendance from './components/Teacher/Attendance';
import TeacherReport from './components/Teacher/Report';
import HomeHeader from './components/HomeHeader';
import StudentReport from './components/Student/Report';
import Leave from './components/Student/Leave';
import UpdatePage from './components/Teacher/Update';


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <HomeHeader />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/TeacherDashboard"
          element={
            <>
              <TeacherHeader />
              <TeacherDashboard />

              <Footer />
            </>
          }
        />
        <Route
          path="/Attendance"
          element={
            <>
              <TeacherHeader />
              <Attendance />

              <Footer />
            </>
          }
        />
        <Route
          path="/TeacherReport"
          element={
            <>
              <TeacherHeader />
              <TeacherReport />

              <Footer />
            </>
          }
        />
        <Route
          path="/Update"
          element={
            <>
              <TeacherHeader />
              <UpdatePage />
              <Footer />
            </>
          }
        />
        <Route
          path="/StudentDashboard"
          element={
            <>
              <StudentHeader />
              <StudentDashboard />
              <Footer />
            </>
          }
        />
        <Route
          path="/StudentReport"
          element={
            <>
              <StudentHeader />
              <StudentReport />
              <Footer />
            </>
          }
        />
        <Route
          path="/Leave"
          element={
            <>
              <StudentHeader />
              <Leave />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
