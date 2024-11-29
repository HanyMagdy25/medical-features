"use client";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import styles from "./LabAndTestResults.module.css";

const LabAndTestResults = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ]);

  const [testResults, setTestResults] = useState([]);
  const [formData, setFormData] = useState({
    patientId: "",
    testName: "",
    result: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // Get current date in a readable format
  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString("en-GB") + " " + now.toLocaleTimeString();
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update test result
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.patientId || !formData.testName || !formData.result) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (editIndex !== null) {
      const updatedResults = [...testResults];
      updatedResults[editIndex] = {
        ...formData,
        patientName: patients.find((p) => p.id === parseInt(formData.patientId))
          ?.name,
        dateUpdated: getCurrentDate(),
      };
      setTestResults(updatedResults);
      toast.success("Test result updated successfully!");
    } else {
      const newTestResult = {
        ...formData,
        patientName: patients.find((p) => p.id === parseInt(formData.patientId))
          ?.name,
        dateUpdated: getCurrentDate(),
      };
      setTestResults([...testResults, newTestResult]);
      toast.success("Test result added successfully!");
    }

    setFormData({ patientId: "", testName: "", result: "" });
    setEditIndex(null);
  };

  // Handle editing a test result
  const handleEdit = (index) => {
    const result = testResults[index];
    setFormData({
      patientId: patients.find((p) => p.name === result.patientName)?.id,
      testName: result.testName,
      result: result.result,
    });
    setEditIndex(index);
  };

  // Handle deleting a test result
  const handleDelete = (index) => {
    const updatedResults = testResults.filter((_, i) => i !== index);
    setTestResults(updatedResults);
    toast.success("Test result deleted successfully!");
  };

  return (
    <div className={styles.container}>
      <h1>Lab and Test Results</h1>

      <div className={styles.content}>
        {/* Test Result Form */}
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <h2>{editIndex !== null ? "Edit Test Result" : "Add Test Result"}</h2>
          <div className={styles.formGroup}>
            <label htmlFor="patientId" className={styles.label}>
              Patient Name
            </label>
            <select
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleInputChange}
              className={styles.select}
              required
            >
              <option value="">-- Select Patient --</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="testName" className={styles.label}>
              Test Name
            </label>
            <input
              id="testName"
              name="testName"
              type="text"
              value={formData.testName}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="result" className={styles.label}>
              Test Result
            </label>
            <textarea
              id="result"
              name="result"
              value={formData.result}
              onChange={handleInputChange}
              className={styles.textarea}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            {editIndex !== null ? "Update Result" : "Add Result"}
          </button>
        </form>

        {/* Test Results Table */}
        <div className={styles.tableContainer}>
          <h2>Test Results</h2>
          {testResults.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Test Name</th>
                  <th>Result</th>
                  <th>Date Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testResults.map((result, index) => (
                  <tr key={index}>
                    <td>{result.patientName}</td>
                    <td>{result.testName}</td>
                    <td>{result.result}</td>
                    <td>{result.dateUpdated}</td>
                    <td>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No test results available.</p>
          )}
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default LabAndTestResults;
