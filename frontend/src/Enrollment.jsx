import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Enrollment = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [formData, setFormData] = useState({
    S_id: '',
    c_id: '',
    date: '',
    grade: '',
  });
  const [editMode, setEditMode] = useState(false);

  // Track original IDs for update URL if IDs change in form
  const [originalIDs, setOriginalIDs] = useState({ S_id: '', c_id: '' });

  const fetchEnrollments = async () => {
    try {
      const res = await axios.get('http://localhost:3000/enrollments');
      setEnrollments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        // Use originalIDs for URL, formData for updated data
        await axios.put(
          `http://localhost:3000/enrollments/${originalIDs.S_id}/${originalIDs.c_id}`,
          formData
        );
      } else {
        await axios.post('http://localhost:3000/enrollments', formData);
      }
      setFormData({ S_id: '', c_id: '', date: '', grade: '' });
      setOriginalIDs({ S_id: '', c_id: '' });
      setEditMode(false);
      fetchEnrollments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (enrollment) => {
    setFormData(enrollment);
    setOriginalIDs({ S_id: enrollment.S_id, c_id: enrollment.c_id });
    setEditMode(true);
  };

  const handleDelete = async (S_id, c_id) => {
    if (
      window.confirm(
        `Are you sure you want to delete enrollment of Student ID ${S_id} for Course ID ${c_id}?`
      )
    ) {
      try {
        await axios.delete(`http://localhost:3000/enrollments/${S_id}/${c_id}`);
        fetchEnrollments();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormData({ S_id: '', c_id: '', date: '', grade: '' });
    setOriginalIDs({ S_id: '', c_id: '' });
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Enrollment Management</h2>

      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow-sm mb-5 bg-light"
      >
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Student ID</label>
            <input
              type="number"
              name="S_id"
              className="form-control"
              value={formData.S_id}
              onChange={handleChange}
              required
              placeholder="Enter student ID"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Course ID</label>
            <input
              type="number"
              name="c_id"
              className="form-control"
              value={formData.c_id}
              onChange={handleChange}
              required
              placeholder="Enter course ID"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
              placeholder="Select enrollment date"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Grade</label>
            <input
              type="text"
              name="grade"
              className="form-control"
              value={formData.grade}
              onChange={handleChange}
              placeholder="Enter grade"
            />
          </div>
        </div>

        <div className="mt-4 text-end">
          <button type="submit" className="btn btn-primary">
            {editMode ? 'Update Enrollment' : 'Add Enrollment'}
          </button>
          {editMode && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <table className="table table-bordered table-striped shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Student ID</th>
            <th>Course ID</th>
            <th>Date</th>
            <th>Grade</th>
            <th style={{ minWidth: '140px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                No enrollments found.
              </td>
            </tr>
          )}
          {enrollments.map((enrollment) => (
            <tr key={`${enrollment.S_id}-${enrollment.c_id}`}>
              <td>{enrollment.S_id}</td>
              <td>{enrollment.c_id}</td>
              <td>{enrollment.date}</td>
              <td>{enrollment.grade}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(enrollment)}
                  title="Edit enrollment"
                >
                  <i className="bi bi-pencil-square"></i> Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() =>
                    handleDelete(enrollment.S_id, enrollment.c_id)
                  }
                  title="Delete enrollment"
                >
                  <i className="bi bi-trash3-fill"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Enrollment;
