"use client";
import React, { useState } from "react";
import styles from "./BillingAndPaymentProcessing.module.css";
import { Toaster, toast } from "react-hot-toast";

const BillingAndPaymentProcessing = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [billAmount, setBillAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentHistory, setPaymentHistory] = useState([]);

  // Function to generate a bill for a selected patient
  const generateBill = (patientId) => {
    const patient = patients.find((p) => p.id === patientId);
    setSelectedPatient(patient);

    // Simulate generating a bill (e.g., $200 for consultation and treatment)
    const generatedBill = 200; // You can modify this logic to generate bills dynamically
    setBillAmount(generatedBill);
  };

  // Function to process payment
  const processPayment = (e) => {
    e.preventDefault();
    if (paymentAmount <= 0 || paymentAmount > billAmount) {
      toast.error("Invalid payment amount.");
      return;
    }

    const paymentDate = new Date().toLocaleDateString();
    const payment = {
      patientName: selectedPatient.name, // Add patient name to payment history
      amount: paymentAmount,
      date: paymentDate,
      remainingBalance: billAmount - paymentAmount,
    };

    setPaymentHistory((prevHistory) => [...prevHistory, payment]);
    setBillAmount(payment.remainingBalance);
    setPaymentAmount(0);

    toast.success(`Payment of $${paymentAmount} processed successfully!`);
  };

  return (
    <div className={styles.container}>
      <h1>Billing and Payment Processing</h1>

      {/* Patient Selection */}
      <div className={styles.selectPatientSection}>
        <h2>Select Patient</h2>
        <select
          className={styles.select}
          onChange={(e) => generateBill(parseInt(e.target.value))}
        >
          <option value="">Select a patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>
      </div>

      {selectedPatient && (
        <div className={styles.billingSection}>
          {/* Bill View */}
          <h3>Bill for {selectedPatient.name}</h3>
          <p>Amount: ${billAmount}</p>

          {/* Payment Form */}
          <form onSubmit={processPayment} className={styles.paymentForm}>
            <label htmlFor="paymentAmount" className={styles.label}>
              Payment Amount
            </label>
            <input
              id="paymentAmount"
              type="number"
              min="1"
              max={billAmount}
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.submitBtn}>
              Pay Bill
            </button>
          </form>

          {/* Payment History */}
          <div className={styles.paymentHistory}>
            <h3>Payment History</h3>
            {paymentHistory.length === 0 ? (
              <p>No payments made yet.</p>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Amount Paid</th>
                    <th>Date</th>
                    <th>Remaining Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment, index) => (
                    <tr key={index}>
                      <td>{payment.patientName}</td>
                      <td>${payment.amount}</td>
                      <td>{payment.date}</td>
                      <td>${payment.remainingBalance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default BillingAndPaymentProcessing;
