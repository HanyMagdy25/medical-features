"use client";
import React, { useState } from "react";
import styles from "./PatientRegistration.module.css";
import { Toaster, toast } from "react-hot-toast";

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    insuranceNumber: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (
      !formData.patientName ||
      !formData.email ||
      !formData.phone ||
      !formData.dateOfBirth
    ) {
      toast.error("Please fill in all required fields!");
      return;
    }

    // Simulate successful registration
    toast.success("Patient registered successfully!");

    // Clear form
    setFormData({
      patientName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      insuranceNumber: "",
    });
  };

  return (
    <div className={styles.container}>
      <h1>Patient Registration</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="patientName" className={styles.label}>
            Patient Name
          </label>
          <input
            id="patientName"
            type="text"
            className={styles.input}
            value={formData.patientName}
            onChange={(e) =>
              setFormData({ ...formData, patientName: e.target.value })
            }
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className={styles.input}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            className={styles.input}
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="dateOfBirth" className={styles.label}>
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            type="date"
            className={styles.input}
            value={formData.dateOfBirth}
            onChange={(e) =>
              setFormData({ ...formData, dateOfBirth: e.target.value })
            }
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="insuranceNumber" className={styles.label}>
            Insurance Number (optional)
          </label>
          <input
            id="insuranceNumber"
            type="text"
            className={styles.input}
            value={formData.insuranceNumber}
            onChange={(e) =>
              setFormData({ ...formData, insuranceNumber: e.target.value })
            }
          />
        </div>
        <button type="submit" className={styles.submitBtn}>
          Register Patient
        </button>
      </form>

      {/* Toaster for notifications */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default PatientRegistration;
