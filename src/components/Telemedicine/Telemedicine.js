"use client";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import styles from "./Telemedicine.module.css";

const Telemedicine = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    appointmentDate: "",
    timeSlot: "",
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle appointment booking
  const handleBookAppointment = (e) => {
    e.preventDefault();
    if (
      !formData.patientName ||
      !formData.doctorName ||
      !formData.appointmentDate ||
      !formData.timeSlot
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const newAppointment = {
      id: appointments.length + 1,
      ...formData,
    };

    setAppointments([...appointments, newAppointment]);
    setFormData({
      patientName: "",
      doctorName: "",
      appointmentDate: "",
      timeSlot: "",
    });
    toast.success("Appointment booked successfully!");
  };

  // Handle appointment selection for video conferencing or remote diagnosis
  const handleAppointmentSelect = (id) => {
    const appointment = appointments.find(
      (appointment) => appointment.id === id
    );
    setSelectedAppointment(appointment);
  };

  // Handle starting video conferencing
  const handleStartVideoConference = () => {
    if (!selectedAppointment) {
      toast.error(
        "Please select an appointment to start the video conference."
      );
      return;
    }

    toast.success(
      `Starting video conference with Dr. ${selectedAppointment.doctorName}`
    );
    // Simulate video conference start logic here (e.g., open video conferencing app)
  };

  // Handle remote diagnosis
  const handleRemoteDiagnosis = () => {
    if (!selectedAppointment) {
      toast.error("Please select an appointment for remote diagnosis.");
      return;
    }

    toast.success(
      `Performing remote diagnosis for ${selectedAppointment.patientName}`
    );
    // Simulate remote diagnosis logic here
  };

  return (
    <div className={styles.container}>
      <h1>Telemedicine</h1>
      <div className={styles.content}>
        {/* Appointment Booking Form */}
        <form onSubmit={handleBookAppointment} className={styles.form}>
          <h2>Book Telemedicine Appointment</h2>

          <div className={styles.formGroup}>
            <label htmlFor="patientName" className={styles.label}>
              Patient Name
            </label>
            <input
              id="patientName"
              name="patientName"
              type="text"
              value={formData.patientName}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="doctorName" className={styles.label}>
              Doctor Name
            </label>
            <input
              id="doctorName"
              name="doctorName"
              type="text"
              value={formData.doctorName}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="appointmentDate" className={styles.label}>
              Appointment Date
            </label>
            <input
              id="appointmentDate"
              name="appointmentDate"
              type="date"
              value={formData.appointmentDate}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="timeSlot" className={styles.label}>
              Time Slot
            </label>
            <input
              id="timeSlot"
              name="timeSlot"
              type="time"
              value={formData.timeSlot}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Book Appointment
          </button>
        </form>
        <div>
          {/* Appointments Table */}
          <div className={styles.tableContainer}>
            <h2>Upcoming Telemedicine Appointments</h2>
            {appointments.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Doctor Name</th>
                    <th>Appointment Date</th>
                    <th>Time Slot</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.patientName}</td>
                      <td>{appointment.doctorName}</td>
                      <td>{appointment.appointmentDate}</td>
                      <td>{appointment.timeSlot}</td>
                      <td>
                        <button
                          className={styles.selectBtn}
                          onClick={() =>
                            handleAppointmentSelect(appointment.id)
                          }
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No upcoming appointments.</p>
            )}
          </div>

          {/* Appointment Actions */}
          {selectedAppointment && (
            <div className={styles.actionsContainer}>
              <h3>
                Selected Appointment: {selectedAppointment.patientName} with Dr.{" "}
                {selectedAppointment.doctorName}
              </h3>
              <button
                className={styles.actionBtn}
                onClick={handleStartVideoConference}
              >
                Start Video Conference
              </button>
              <button
                className={styles.actionBtn}
                onClick={handleRemoteDiagnosis}
              >
                Start Remote Diagnosis
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Telemedicine;
