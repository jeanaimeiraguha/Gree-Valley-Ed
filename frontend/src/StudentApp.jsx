import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentApp() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    gender: '',
    dob: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:3000/students');
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:3000/students/${editId}`, formData);
      } else {
        await axios.post('http://localhost:3000/students', formData);
      }
      setFormData({ fname: '', lname: '', gender: '', dob: '' });
      setEditId(null);
      fetchStudents();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleEdit = (student) => {
    setFormData({
      fname: student.fname,
      lname: student.lname,
      gender: student.gender,
      dob: student.dob.slice(0, 10)
    });
    setEditId(student.S_id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Student MS</h1>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-6">
          <input
            type="text"
            name="fname"
            className="form-control"
            placeholder="First Name"
            value={formData.fname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="lname"
            className="form-control"
            placeholder="Last Name"
            value={formData.lname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="gender"
            className="form-control"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="date"
            name="dob"
            className="form-control"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12 text-center">
          <button type="submit" className={`btn ${editId ? 'btn-warning' : 'btn-primary'}`}>
            {editId ? 'Update Student' : 'Add Student'}
          </button>
        </div>
      </form>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? students.map((student) => (
            <tr key={student.S_id}>
              <td>{student.S_id}</td>
              <td>{student.fname}</td>
              <td>{student.lname}</td>
              <td>{student.gender}</td>
              <td>{student.dob.slice(0, 10)}</td>
              <td>
                <button
                  onClick={() => handleEdit(student)}
                  className="btn btn-sm btn-outline-warning me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student.S_id)}
                  className="btn btn-sm btn-outline-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="6" className="text-center">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
