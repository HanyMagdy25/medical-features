"use client";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import styles from "./StaffManagement.module.css";

const StaffManagement = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    salary: "",
    performanceReview: "",
    schedule: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submitting the staff form (Create or Update staff member)
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.role ||
      !formData.salary ||
      !formData.performanceReview ||
      !formData.schedule
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (editIndex !== null) {
      const updatedStaff = [...staffMembers];
      updatedStaff[editIndex] = {
        ...formData,
      };
      setStaffMembers(updatedStaff);
      toast.success("Staff member updated successfully!");
    } else {
      const newStaffMember = {
        ...formData,
      };
      setStaffMembers([...staffMembers, newStaffMember]);
      toast.success("Staff member added successfully!");
    }

    // Clear form data after submission
    setFormData({
      name: "",
      role: "",
      salary: "",
      performanceReview: "",
      schedule: "",
    });
    setEditIndex(null);
  };

  // Handle editing a staff member
  const handleEdit = (index) => {
    const staff = staffMembers[index];
    setFormData({
      name: staff.name,
      role: staff.role,
      salary: staff.salary,
      performanceReview: staff.performanceReview,
      schedule: staff.schedule,
    });
    setEditIndex(index);
  };

  // Handle deleting a staff member
  const handleDelete = (index) => {
    const updatedStaff = staffMembers.filter((_, i) => i !== index);
    setStaffMembers(updatedStaff);
    toast.success("Staff member deleted successfully!");
  };

  return (
    <div className={styles.container}>
      <h1>Staff Management</h1>

      <div className={styles.content}>
        {/* Staff Form */}
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <h2>
            {editIndex !== null ? "Edit Staff Member" : "Add Staff Member"}
          </h2>

          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="role" className={styles.label}>
              Role
            </label>
            <input
              id="role"
              name="role"
              type="text"
              value={formData.role}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="salary" className={styles.label}>
              Salary
            </label>
            <input
              id="salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="performanceReview" className={styles.label}>
              Performance Review
            </label>
            <textarea
              id="performanceReview"
              name="performanceReview"
              value={formData.performanceReview}
              onChange={handleInputChange}
              className={styles.textarea}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="schedule" className={styles.label}>
              Schedule
            </label>
            <input
              id="schedule"
              name="schedule"
              type="text"
              value={formData.schedule}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            {editIndex !== null ? "Update Staff" : "Add Staff"}
          </button>
        </form>

        {/* Staff Table */}
        <div className={styles.tableContainer}>
          <h2>Staff Members List</h2>
          {staffMembers.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Salary</th>
                  <th>Performance Review</th>
                  <th>Schedule</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffMembers.map((staff, index) => (
                  <tr key={index}>
                    <td>{staff.name}</td>
                    <td>{staff.role}</td>
                    <td>{staff.salary}</td>
                    <td>{staff.performanceReview}</td>
                    <td>{staff.schedule}</td>
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
            <p>No staff members available.</p>
          )}
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default StaffManagement;
