import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  // Prevent back navigation
  useEffect(() => {
    const preventBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    preventBack();
    window.onpopstate = preventBack;

    return () => {
      window.onpopstate = null;
    };
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.password.trim()) {
      setMessage("Username and password are required.");
      setIsError(true);
      return;
    }

    const url = isLogin ? "/login" : "/register";

    try {
      const res = await fetch(`http://localhost:3000${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Operation failed");
        setIsError(true);
      } else {
        setMessage(isLogin ? "Login successful!" : "Signup successful!");
        setIsError(false);
        navigate("/");
      }
    } catch (error) {
      setMessage("Server error");
      setIsError(true);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "15px",
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "15px",
          padding: "30px 25px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          backgroundColor: "rgba(255,255,255,0.95)",
        }}
      >
        <h2 className="text-center mb-4" style={{ fontWeight: "700", color: "#4b3f72" }}>
          Green Valley
        </h2>
        <h3 className="text-center mb-4" style={{ color: "#6c63ff" }}>
          {isLogin ? "Login" : "Sign Up"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              className="form-control form-control-lg"
              placeholder="Username"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ borderRadius: "10px", borderColor: "#6c63ff" }}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              className="form-control form-control-lg"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ borderRadius: "10px", borderColor: "#6c63ff" }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{
              backgroundColor: "#6c63ff",
              borderColor: "#6c63ff",
              fontWeight: "600",
              fontSize: "1.1rem",
              borderRadius: "10px",
              padding: "10px",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = "#574fcf")}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = "#6c63ff")}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-3">
          <button
            className="btn btn-link"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
              setIsError(false);
              setFormData({ name: "", password: "" });
            }}
            style={{ color: "#6c63ff", fontWeight: "600", fontSize: "0.9rem" }}
          >
            {isLogin ? "Create Account" : "Go to Login"}
          </button>
        </div>

        {message && (
          <div
            className={`alert mt-4 ${isError ? "alert-danger" : "alert-success"}`}
            role="alert"
            style={{ borderRadius: "10px", fontWeight: "600" }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
