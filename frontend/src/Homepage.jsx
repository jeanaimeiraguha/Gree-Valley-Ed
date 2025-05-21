import { useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AOS from "aos";
import "aos/dist/aos.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

const Homepage = () => {
  useEffect(() => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(t => new bootstrap.Tooltip(t));

    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="container my-5">
      {/* Carousel */}
      <div id="homeCarousel" className="carousel slide mb-4" data-bs-ride="carousel" data-bs-interval="4000" data-aos="fade-in">
        <div className="carousel-inner rounded shadow-sm">
          <div className="carousel-item active bg-primary text-white p-5">
            <h2><i className="bi bi-mortarboard-fill me-2"></i>Welcome to Green Valley</h2>
            <p>Efficiently manage students, courses, and enrollments in one platform.</p>
          </div>
          <div className="carousel-item bg-success text-white p-5">
            <h2><i className="bi bi-book-fill me-2"></i>Course Management</h2>
            <p>Organize and update course offerings with ease.</p>
          </div>
          <div className="carousel-item bg-warning text-dark p-5">
            <h2><i className="bi bi-clipboard-data-fill me-2"></i>Enrollment Insights</h2>
            <p>Track student enrollments and course progress effectively.</p>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* Main Cards */}
      <div className="row text-center" data-aos="fade-up">
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm h-100" data-aos="zoom-in">
            <div className="card-body">
              <h4 className="card-title">Students</h4>
              <p className="card-text">Manage student records and profiles.</p>
              <Link to="/students" className="btn btn-primary btn-lg" data-bs-toggle="tooltip" title="Manage Students">
                <i className="bi bi-people-fill me-2"></i>Students
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow-sm h-100" data-aos="zoom-in">
            <div className="card-body">
              <h4 className="card-title">Courses</h4>
              <p className="card-text">Create, edit and delete courses offered.</p>
              <Link to="/courses" className="btn btn-success btn-lg" data-bs-toggle="tooltip" title="Manage Courses">
                <i className="bi bi-book-half me-2"></i>Courses
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow-sm h-100" data-aos="zoom-in">
            <div className="card-body">
              <h4 className="card-title">Enrollment</h4>
              <p className="card-text">Enroll students into courses quickly and easily.</p>
              <Link to="/enrollment" className="btn btn-warning btn-lg" data-bs-toggle="tooltip" title="">
                <i className="bi bi-person-check-fill me-2"></i>Enrollment
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow-sm h-100" data-aos="zoom-in">
            <div className="card-body">
              <h4 className="card-title">Admin</h4>
              <p className="card-text">Access admin tools and settings.</p>
              <Link to="/admin" className="btn btn-dark btn-lg" data-bs-toggle="tooltip" title="">
                <i className="bi bi-shield-lock-fill me-2"></i>Admin
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal trigger */}
      <div className="text-center mt-5" data-aos="fade-up">
        <button
          type="button"
          className="btn btn-info btn-lg"
          data-bs-toggle="modal"
          data-bs-target="#infoModal"
        >
          <i className="bi bi-info-circle me-2"></i>About This App
        </button>
      </div>

      {/* Modal */}
      <div className="modal fade" id="infoModal" tabIndex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" data-aos="zoom-in">
          <div className="modal-content">
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title" id="infoModalLabel">About EduTrack</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              EduTrack helps institutions manage student records, course offerings, enrollments, and administrative tasks all in one place.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
