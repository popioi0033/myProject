"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../login.css";

const LoginPage = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.username || !form.password) {
    alert("Please fill all fields");
    return;
  }

  // mock login ผ่าน
  router.push("/page/dashboard");
};


  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Welcome, Login your account</h1>

        <div className="login-card">
          <p className="login-subtitle">
            It is our great pleasure to have <br /> you on board!
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              name="username"
              placeholder="Enter the Username"
              value={form.username}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
            />

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p className="signup-text">
            Already have an account? <span>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
