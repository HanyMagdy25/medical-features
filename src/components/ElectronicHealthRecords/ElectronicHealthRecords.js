"use client";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import styles from "./ElectronicHealthRecords.module.css";

const ElectronicHealthRecords = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ]);

  const [ehrRecords, setEhrRecords] = useState([]);
  const [formData, setFormData] = useState({
    patientId: "",
    medicalHistory: "",
    diagnoses: "",
    treatmentPlan: "",
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

  // Add or update EHR record
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.patientId ||
      !formData.medicalHistory ||
      !formData.diagnoses ||
      !formData.treatmentPlan
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (editIndex !== null) {
      const updatedEhrs = [...ehrRecords];
      updatedEhrs[editIndex] = {
        ...formData,
        patientName: patients.find((p) => p.id === parseInt(formData.patientId))
          ?.name,
        dateUpdated: getCurrentDate(),
      };
      setEhrRecords(updatedEhrs);
      toast.success("EHR updated successfully!");
    } else {
      const newEhrRecord = {
        ...formData,
        patientName: patients.find((p) => p.id === parseInt(formData.patientId))
          ?.name,
        dateUpdated: getCurrentDate(),
      };
      setEhrRecords([...ehrRecords, newEhrRecord]);
      toast.success("EHR record created successfully!");
    }

    setFormData({
      patientId: "",
      medicalHistory: "",
      diagnoses: "",
      treatmentPlan: "",
    });
    setEditIndex(null);
  };

  // Handle editing an EHR record
  const handleEdit = (index) => {
    const record = ehrRecords[index];
    setFormData({
      patientId: patients.find((p) => p.name === record.patientName)?.id,
      medicalHistory: record.medicalHistory,
      diagnoses: record.diagnoses,
      treatmentPlan: record.treatmentPlan,
    });
    setEditIndex(index);
  };

  // Handle deleting an EHR record
  const handleDelete = (index) => {
    const updatedEhrs = ehrRecords.filter((_, i) => i !== index);
    setEhrRecords(updatedEhrs);
    toast.success("EHR record deleted successfully!");
  };

  return (
    <div className={styles.container}>
      <h1>Electronic Health Records</h1>

      {/* EHR Record Form */}
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <h2>{editIndex !== null ? "Edit EHR Record" : "Create EHR Record"}</h2>

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
          <label htmlFor="medicalHistory" className={styles.label}>
            Medical History
          </label>
          <textarea
            id="medicalHistory"
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleInputChange}
            className={styles.textarea}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="diagnoses" className={styles.label}>
            Diagnoses
          </label>
          <textarea
            id="diagnoses"
            name="diagnoses"
            value={formData.diagnoses}
            onChange={handleInputChange}
            className={styles.textarea}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="treatmentPlan" className={styles.label}>
            Treatment Plan
          </label>
          <textarea
            id="treatmentPlan"
            name="treatmentPlan"
            value={formData.treatmentPlan}
            onChange={handleInputChange}
            className={styles.textarea}
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          {editIndex !== null ? "Update Record" : "Create Record"}
        </button>
      </form>

      {/* EHR Records Table */}
      <div className={styles.tableContainer}>
        <h2>EHR Records</h2>
        {ehrRecords.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Medical History</th>
                <th>Diagnoses</th>
                <th>Treatment Plan</th>
                <th>Date Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ehrRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.patientName}</td>
                  <td>{record.medicalHistory}</td>
                  <td>{record.diagnoses}</td>
                  <td>{record.treatmentPlan}</td>
                  <td>{record.dateUpdated}</td>
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
          <p>No EHR records available.</p>
        )}
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ElectronicHealthRecords;
