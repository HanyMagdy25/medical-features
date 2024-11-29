"use client";
import React, { useState } from "react";
import styles from "./PatientRegistration.module.css";
import { Toaster, toast } from "react-hot-toast";

const Registration = () => {
  const [activeTab, setActiveTab] = useState("patient"); // 'patient' or 'doctor'
  const [isLogin, setIsLogin] = useState(false); // Toggle between Registration and Login
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialty: "", // For doctor registration only
    role: "", // For login: 'patient' or 'doctor'
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (isLogin) {
      if (!formData.role) {
        toast.error("Please select a role (Patient or Doctor).");
        return;
      }
      toast.success(`Logged in successfully as a ${formData.role}!`);
    } else {
      if (activeTab === "doctor" && !formData.specialty) {
        toast.error("Please enter the specialty for doctor registration.");
        return;
      }
      toast.success(
        `${
          activeTab === "patient" ? "Patient" : "Doctor"
        } registered successfully!`
      );
    }

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      password: "",
      specialty: "",
      role: "",
    });
  };

  return (
    <div className={styles.patientRegistration}>
      <div className={styles.tabs}>
        {!isLogin && (
          <>
            <button
              className={`${styles.tabButton} ${
                activeTab === "patient" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("patient")}
            >
              Patient Registration
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "doctor" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("doctor")}
            >
              Doctor Registration
            </button>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>
          {isLogin
            ? "Login"
            : activeTab === "patient"
            ? "Patient Registration"
            : "Doctor Registration"}
        </h1>
        {!isLogin && (
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={styles.input}
              required
            />
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className={styles.input}
            required
          />
        </div>

        {isLogin && (
          <div className={styles.formGroup}>
            <label htmlFor="role" className={styles.label}>
              Role
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className={styles.select}
              required
            >
              <option value="">Select Role</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
        )}

        {!isLogin && activeTab === "doctor" && (
          <div className={styles.formGroup}>
            <label htmlFor="specialty" className={styles.label}>
              Specialty
            </label>
            <input
              id="specialty"
              type="text"
              placeholder="Enter your specialty"
              value={formData.specialty}
              onChange={(e) =>
                setFormData({ ...formData, specialty: e.target.value })
              }
              className={styles.input}
              required
            />
          </div>
        )}

        <p className={styles.toggleLoginText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            className={styles.toggleLoginBtn}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

        <button type="submit" className={styles.submitBtn}>
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      {/* Toast Notifications */}
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
    </div>
  );
};

export default Registration;
