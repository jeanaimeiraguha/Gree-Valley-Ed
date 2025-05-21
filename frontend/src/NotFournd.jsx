import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const NotFound = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center text-center vh-100 bg-light">
      <div className="mb-4">
        <i className="bi bi-exclamation-triangle-fill text-danger" style={{ fontSize: '5rem' }}></i>
      </div>
      <h1 className="display-4">404 - Page Not Found</h1>
      <p className="lead text-muted">The page you’re looking for doesn’t exist or has been moved.</p>
      <a href="/" className="btn btn-primary mt-3">
        <i className="bi bi-house-door-fill me-2"></i>
        Go Home
      </a>
    </div>
  );
};

export default NotFound;
