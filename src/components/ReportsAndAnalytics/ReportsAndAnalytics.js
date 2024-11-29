"use client";
import React, { useState } from "react";
import styles from "./ReportsAndAnalytics.module.css";

const ReportsAndAnalytics = () => {
  const [activeReport, setActiveReport] = useState(
    "Patient demographics report"
  );
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Sample data for patients
  const patients = [
    {
      id: 1,
      name: "Patient 1",
      reports: {
        "Patient demographics report": [
          { category: "Age 18-25", percentage: "20%" },
          { category: "Age 26-40", percentage: "50%" },
          { category: "Age 41-60", percentage: "25%" },
          { category: "Age 60+", percentage: "5%" },
        ],
        "Appointment history report": [
          { date: "2024-01-10", status: "Completed" },
          { date: "2024-01-12", status: "Cancelled" },
          { date: "2024-01-15", status: "No-show" },
        ],
        "Revenue report": [
          { month: "January 2024", revenue: "$500" },
          { month: "February 2024", revenue: "$700" },
        ],
      },
    },
    {
      id: 2,
      name: "Patient 2",
      reports: {
        "Patient demographics report": [
          { category: "Age 18-25", percentage: "30%" },
          { category: "Age 26-40", percentage: "40%" },
          { category: "Age 41-60", percentage: "20%" },
          { category: "Age 60+", percentage: "10%" },
        ],
        "Appointment history report": [
          { date: "2024-01-11", status: "Completed" },
          { date: "2024-01-13", status: "Cancelled" },
        ],
        "Revenue report": [
          { month: "January 2024", revenue: "$1,000" },
          { month: "February 2024", revenue: "$800" },
        ],
      },
    },
  ];

  // Handle patient selection
  const handlePatientSelect = (id) => {
    const patient = patients.find((p) => p.id === parseInt(id));
    setSelectedPatient(patient);
  };

  // Render report data dynamically based on the selected patient and report
  const renderReportData = () => {
    if (!selectedPatient)
      return <p>Please select a patient to view their reports.</p>;

    const reportData = selectedPatient.reports[activeReport];

    if (activeReport === "Patient demographics report") {
      return (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((item, index) => (
              <tr key={index}>
                <td>{item.category}</td>
                <td>{item.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (activeReport === "Appointment history report") {
      return (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (activeReport === "Revenue report") {
      return (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Month</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((item, index) => (
              <tr key={index}>
                <td>{item.month}</td>
                <td>{item.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className={styles.container}>
      <h1>Reports and Analytics</h1>

      {/* Patient Selection */}
      <div className={styles.patientSelect}>
        <label htmlFor="patientSelect" className={styles.label}>
          Select Patient:
        </label>
        <select
          id="patientSelect"
          className={styles.select}
          onChange={(e) => handlePatientSelect(e.target.value)}
        >
          <option value="">-- Select a patient --</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs for Report Selection */}
      <div className={styles.tabs}>
        {Object.keys(patients[0].reports).map((report) => (
          <button
            key={report}
            className={`${styles.tabButton} ${
              activeReport === report ? styles.active : ""
            }`}
            onClick={() => setActiveReport(report)}
          >
            {report.split(" report")[0]}
          </button>
        ))}
      </div>

      {/* Report Content */}
      <div className={styles.reportContent}>
        <h2>{activeReport}</h2>
        {renderReportData()}
      </div>
    </div>
  );
};

export default ReportsAndAnalytics;
