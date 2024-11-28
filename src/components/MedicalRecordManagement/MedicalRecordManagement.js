"use client";
import React, { useState } from "react";
import styles from "./MedicalRecordManagement.module.css";
import { Toaster, toast } from "react-hot-toast";

const MedicalRecordManagement = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patientName: "",
    medicalHistory: "",
    prescription: "",
  });
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Function to handle new patient record creation or updating existing record
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.patientName ||
      !formData.medicalHistory ||
      !formData.prescription
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (selectedPatient) {
      // Editing an existing patient
      const updatedPatients = patients.map((patient) =>
        patient.id === selectedPatient.id
          ? { ...patient, ...formData }
          : patient
      );
      setPatients(updatedPatients);
      toast.success("Patient record updated successfully!");
    } else {
      // Creating a new patient record
      const newPatient = {
        id: patients.length + 1,
        ...formData,
      };
      setPatients([...patients, newPatient]);
      toast.success("Patient record created successfully!");
    }

    // Reset form
    setFormData({ patientName: "", medicalHistory: "", prescription: "" });
    setSelectedPatient(null);
  };

  // Handle patient selection for editing
  const handlePatientSelect = (id) => {
    const patient = patients.find((patient) => patient.id === id);
    setSelectedPatient(patient);
    setFormData({
      patientName: patient.patientName,
      medicalHistory: patient.medicalHistory,
      prescription: patient.prescription,
    });
  };

  // Delete patient record
  const handleDeletePatient = (id) => {
    const updatedPatients = patients.filter((patient) => patient.id !== id);
    setPatients(updatedPatients);
    toast.success("Patient record deleted successfully!");
    setSelectedPatient(null);
  };

  return (
    <div className={styles.container}>
      <h1>Medical Record Management</h1>

      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>
            {selectedPatient
              ? "Edit Patient Record"
              : "Create New Patient Record"}
          </h2>

          <div className={styles.formGroup}>
            <label htmlFor="patientName" className={styles.label}>
              Patient Name
            </label>
            <input
              id="patientName"
              type="text"
              value={formData.patientName}
              onChange={(e) =>
                setFormData({ ...formData, patientName: e.target.value })
              }
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="medicalHistory" className={styles.label}>
              Medical History
            </label>
            <textarea
              id="medicalHistory"
              value={formData.medicalHistory}
              onChange={(e) =>
                setFormData({ ...formData, medicalHistory: e.target.value })
              }
              className={styles.textarea}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="prescription" className={styles.label}>
              Prescription
            </label>
            <textarea
              id="prescription"
              value={formData.prescription}
              onChange={(e) =>
                setFormData({ ...formData, prescription: e.target.value })
              }
              className={styles.textarea}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            {selectedPatient ? "Save Changes" : "Create Record"}
          </button>
        </form>

        <table className={styles.table}>
          <caption>Patients List</caption>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Medical History</th>
              <th>Prescription</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients?.length ? (
              patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.patientName}</td>
                  <td>{patient.medicalHistory}</td>
                  <td>{patient.prescription}</td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => handlePatientSelect(patient.id)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDeletePatient(patient.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <div className={styles.empty}>empty</div>
            )}
          </tbody>
        </table>
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MedicalRecordManagement;
