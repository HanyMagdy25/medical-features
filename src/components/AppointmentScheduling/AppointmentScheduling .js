"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./AppointmentScheduling.module.css";
import appointmentData from "@/appointmentData";
const AppointmentScheduling = () => {
  const [appointments, setAppointments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: uuidv4(),
    patientName: "",
    doctorName: "",
    date: "",
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setAppointments(appointmentData);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      }
    };
    fetchAppointments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update the existing appointment
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment.id === formData.id ? formData : appointment
          )
        );
        setIsEditing(false);
      } else {
        // Add a new appointment
        setAppointments((prev) => [...prev, formData]);
      }

      // Reset the form data
      setFormData({ id: uuidv4(), patientName: "", doctorName: "", date: "" });
    } catch (err) {
      console.error("Failed to submit appointment");
    }
  };

  const handleEdit = (appointment) => {
    setIsEditing(true);
    setFormData(appointment);
  };

  const handleDelete = (id) => {
    setAppointments((prev) =>
      prev.filter((appointment) => appointment.id !== id)
    );
  };

  return (
    <div className={styles.container}>
      <h1>Appointment Scheduling</h1>
      <div className={styles.content}>
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
            <label htmlFor="doctorName" className={styles.label}>
              Doctor Name
            </label>
            <input
              id="doctorName"
              type="text"
              className={styles.input}
              value={formData.doctorName}
              onChange={(e) =>
                setFormData({ ...formData, doctorName: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="date" className={styles.label}>
              Appointment Date
            </label>
            <input
              id="date"
              type="date"
              className={styles.input}
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Schedule Appointment
          </button>
        </form>
        {/* <h2>Appointments</h2> */}

        <table className={styles.table}>
          <caption>Appointments</caption>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patientName}</td>
                <td>Dr. {appointment.doctorName}</td>
                <td>{appointment.date}</td>
                <td>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.editBtn}
                      onClick={() => handleEdit(appointment)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() =>
                        setAppointments(
                          appointments.filter((a) => a.id !== appointment.id)
                        )
                      }
                    >
                      X
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentScheduling;
