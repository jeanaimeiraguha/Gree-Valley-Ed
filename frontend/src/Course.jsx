import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/courses';

function Course() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ c_name: '', credit: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(API_URL);
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId === null) {
      await axios.post(API_URL, form);
    } else {
      await axios.put(`${API_URL}/${editingId}`, form);
      setEditingId(null);
    }
    setForm({ c_name: '', credit: '' });
    fetchCourses();
  };

  const handleEdit = (course) => {
    setForm({ c_name: course.c_name, credit: course.credit });
    setEditingId(course.c_id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchCourses();
  };

  return (
    <div className="container my-5" style={{ maxWidth: '700px' }}>
      <h1 className="mb-4 text-center">Course Manager</h1>

      <form onSubmit={handleSubmit} className="row g-3 mb-4 align-items-center">
        <div className="col-md-7">
          <input
            type="text"
            name="c_name"
            placeholder="Course Name"
            value={form.c_name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            name="credit"
            placeholder="Credit"
            value={form.credit}
            onChange={handleChange}
            className="form-control"
            required
            min="0"
          />
        </div>
        <div className="col-md-2 d-grid">
          <button type="submit" className="btn btn-primary">
            {editingId === null ? 'Add' : 'Update'}
          </button>
        </div>
      </form>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Credit</th>
            <th style={{ width: '160px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-muted">
                No courses found.
              </td>
            </tr>
          ) : (
            courses.map((course) => (
              <tr key={course.c_id}>
                <td>{course.c_id}</td>
                <td>{course.c_name}</td>
                <td>{course.credit}</td>
                <td>
                  <button
                    onClick={() => handleEdit(course)}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.c_id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Course;
