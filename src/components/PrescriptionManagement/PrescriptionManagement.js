"use client";
import React, { useState } from "react";
import styles from "./PrescriptionManagement.module.css";
import { Toaster, toast } from "react-hot-toast";

const PrescriptionManagement = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ]);

  const [prescriptions, setPrescriptions] = useState([]);
  const [formData, setFormData] = useState({
    patientId: "",
    medicine: "",
    dosage: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update prescription
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.patientId || !formData.medicine || !formData.dosage) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (editIndex !== null) {
      const updatedPrescriptions = [...prescriptions];
      updatedPrescriptions[editIndex] = {
        ...formData,
        patientName: patients.find((p) => p.id === parseInt(formData.patientId))
          ?.name,
      };
      setPrescriptions(updatedPrescriptions);
      toast.success("Prescription updated successfully!");
    } else {
      const newPrescription = {
        ...formData,
        patientName: patients.find((p) => p.id === parseInt(formData.patientId))
          ?.name,
      };
      setPrescriptions([...prescriptions, newPrescription]);
      toast.success("Prescription added successfully!");
    }

    setFormData({ patientId: "", medicine: "", dosage: "" });
    setEditIndex(null);
  };

  // Handle editing a prescription
  const handleEdit = (index) => {
    const prescription = prescriptions[index];
    setFormData({
      patientId: patients.find((p) => p.name === prescription.patientName)?.id,
      medicine: prescription.medicine,
      dosage: prescription.dosage,
    });
    setEditIndex(index);
  };

  // Handle deleting a prescription
  const handleDelete = (index) => {
    const updatedPrescriptions = prescriptions.filter((_, i) => i !== index);
    setPrescriptions(updatedPrescriptions);
    toast.success("Prescription deleted successfully!");
  };

  return (
    <div className={styles.container}>
      <h1>Prescription Management</h1>

      {/* Prescription Form */}
      <div className={styles.content}>
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <h2>
            {editIndex !== null ? "Edit Prescription" : "Add Prescription"}
          </h2>
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
            <label htmlFor="medicine" className={styles.label}>
              Medicine
            </label>
            <input
              id="medicine"
              name="medicine"
              type="text"
              value={formData.medicine}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dosage" className={styles.label}>
              Dosage
            </label>
            <input
              id="dosage"
              name="dosage"
              type="text"
              value={formData.dosage}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            {editIndex !== null ? "Update Prescription" : "Add Prescription"}
          </button>
        </form>

        {/* Prescription Table */}
        <div className={styles.tableContainer}>
          <h2>Prescription List</h2>
          {prescriptions.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Medicine</th>
                  <th>Dosage</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((prescription, index) => (
                  <tr key={index}>
                    <td>{prescription.patientName}</td>
                    <td>{prescription.medicine}</td>
                    <td>{prescription.dosage}</td>
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
            <p>No prescriptions available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionManagement;
