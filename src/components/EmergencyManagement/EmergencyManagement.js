import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import styles from "./EmergencyManagement.module.css";

const EmergencyManagement = () => {
  const [emergencyAlert, setEmergencyAlert] = useState("");
  const [staffNotification, setStaffNotification] = useState(false);
  const [patientNotification, setPatientNotification] = useState(false);

  const handleEmergencyAlert = () => {
    if (!emergencyAlert) {
      toast.error("Please enter the emergency alert message.");
      return;
    }
    toast.success("Emergency alert has been sent!");
    setEmergencyAlert("");
  };

  const handleStaffNotification = () => {
    setStaffNotification(true);
    toast.success("Staff notified of the emergency!");
  };

  const handlePatientNotification = () => {
    setPatientNotification(true);
    toast.success("Patients notified of the emergency!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.alertSection}>
        <h3 className={styles.alertTitle}>Send Emergency Alert</h3>
        <textarea
          className={styles.textarea}
          placeholder="Enter emergency alert message..."
          value={emergencyAlert}
          onChange={(e) => setEmergencyAlert(e.target.value)}
        />
        <button className={styles.actionBtn} onClick={handleEmergencyAlert}>
          Send Emergency Alert
        </button>
      </div>

      <div className={styles.notificationSection}>
        <h3 className={styles.alertTitle}>Notify Staff & Patients</h3>
        <button
          className={styles.actionBtn}
          onClick={handleStaffNotification}
          disabled={staffNotification}
        >
          Notify Staff
        </button>
        <button
          className={styles.actionBtn}
          onClick={handlePatientNotification}
          disabled={patientNotification}
        >
          Notify Patients
        </button>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default EmergencyManagement;
