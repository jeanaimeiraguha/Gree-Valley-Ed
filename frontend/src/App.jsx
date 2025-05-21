import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Course from './Course';
import StudentApp from './StudentApp';
import Homepage from './Homepage';
import Enrollment from './Enrollment';
import Login from './Login';
import GPAReport from './GPAReport'; // <-- Import your GPAReport component here

const Home = () => {
  useEffect(() => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(t => new bootstrap.Tooltip(t));
    AOS.init({ duration: 1000, once: true });
  }, []);

  return <Homepage />;
};

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Hide navbar and footer on login page
  const hideNavFooter = location.pathname === '/login';

  return (
    <div className="d-flex flex-column min-vh-100">
      {!hideNavFooter && (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <i className="bi bi-journal-code me-2"></i> Course Manager
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="bi bi-house-door-fill me-1"></i> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/courses">
                    <i className="bi bi-book-fill me-1"></i> Courses
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/students">
                    <i className="bi bi-people-fill me-1"></i> Students
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/enrollment">
                    <i className="bi bi-journal-plus me-1"></i> Enrollment
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/gpa-report">
                    <i className="bi bi-bar-chart-line-fill me-1"></i> GPA Report
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="bi bi-lock"></i> Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}

      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/students" element={<StudentApp />} />
          <Route path="/enrollment" element={<Enrollment />} />
          <Route path="/gpa-report" element={<GPAReport />} /> {/* Added GPAReport route */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>

      {!hideNavFooter && (
        <footer className="bg-primary text-white text-center py-3 mt-auto">
          <div className="container">
            <p className="mb-0">&copy; {new Date().getFullYear()} Course Management System</p>
            <p className="mb-0">
              <a href="#" className="text-white me-3">
                <i className="bi bi-facebook"></i> Facebook
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-twitter"></i> Twitter
              </a>
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
