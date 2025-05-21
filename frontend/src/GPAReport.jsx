// src/GPAReport.js
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const GPAReport = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const printRef = useRef();

  useEffect(() => {
    axios.get('http://localhost:3000/report') // Update port if needed
      .then(res => {
        setReport(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("❌ Failed to fetch GPA report.");
        setLoading(false);
      });
  }, []);

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload after print
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">
          <i className="bi bi-graph-up-arrow me-2"></i> GPA Report
        </h2>
        <button className="btn btn-outline-success" onClick={handlePrint}>
          <i className="bi bi-printer me-1"></i> Print Report
        </button>
      </div>

      {loading && <p className="text-info">Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <div ref={printRef}>
          <table className="table table-striped table-bordered shadow-sm">
            <thead className="table-dark">
              <tr>
                <th><i className="bi bi-hash me-1"></i> Student ID</th>
                <th><i className="bi bi-person-circle me-1"></i> Name</th>
                <th><i className="bi bi-award me-1"></i> GPA</th>
              </tr>
            </thead>
            <tbody>
              {report.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.S_id}</td>
                  <td>{row.name}</td>
                  <td>{row.gpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GPAReport;
