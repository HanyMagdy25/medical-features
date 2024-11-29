"use client";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import styles from "./InventoryManagement.module.css";

const InventoryManagement = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [formData, setFormData] = useState({
    itemName: "",
    itemCategory: "",
    quantity: "",
    reorderLevel: "",
    usageReport: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submitting the inventory form (Create or Update item)
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.itemName ||
      !formData.itemCategory ||
      !formData.quantity ||
      !formData.reorderLevel ||
      !formData.usageReport
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (editIndex !== null) {
      const updatedInventory = [...inventoryItems];
      updatedInventory[editIndex] = {
        ...formData,
        dateUpdated: new Date().toLocaleString(),
      };
      setInventoryItems(updatedInventory);
      toast.success("Inventory item updated successfully!");
    } else {
      const newItem = {
        ...formData,
        dateAdded: new Date().toLocaleString(),
      };
      setInventoryItems([...inventoryItems, newItem]);
      toast.success("Inventory item added successfully!");
    }

    // Clear form data after submission
    setFormData({
      itemName: "",
      itemCategory: "",
      quantity: "",
      reorderLevel: "",
      usageReport: "",
    });
    setEditIndex(null);
  };

  // Handle editing an inventory item
  const handleEdit = (index) => {
    const item = inventoryItems[index];
    setFormData({
      itemName: item.itemName,
      itemCategory: item.itemCategory,
      quantity: item.quantity,
      reorderLevel: item.reorderLevel,
      usageReport: item.usageReport,
    });
    setEditIndex(index);
  };

  // Handle deleting an inventory item
  const handleDelete = (index) => {
    const updatedInventory = inventoryItems.filter((_, i) => i !== index);
    setInventoryItems(updatedInventory);
    toast.success("Inventory item deleted successfully!");
  };

  return (
    <div className={styles.container}>
      <h1>Inventory Management</h1>

      {/* Inventory Item Form */}
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <h2>
          {editIndex !== null ? "Edit Inventory Item" : "Add Inventory Item"}
        </h2>

        <div className={styles.formGroup}>
          <label htmlFor="itemName" className={styles.label}>
            Item Name
          </label>
          <input
            id="itemName"
            name="itemName"
            type="text"
            value={formData.itemName}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="itemCategory" className={styles.label}>
            Item Category
          </label>
          <input
            id="itemCategory"
            name="itemCategory"
            type="text"
            value={formData.itemCategory}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="quantity" className={styles.label}>
            Quantity
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="reorderLevel" className={styles.label}>
            Reorder Level
          </label>
          <input
            id="reorderLevel"
            name="reorderLevel"
            type="number"
            value={formData.reorderLevel}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="usageReport" className={styles.label}>
            Usage Report
          </label>
          <textarea
            id="usageReport"
            name="usageReport"
            value={formData.usageReport}
            onChange={handleInputChange}
            className={styles.textarea}
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          {editIndex !== null ? "Update Item" : "Add Item"}
        </button>
      </form>

      {/* Inventory Table */}
      <div className={styles.tableContainer}>
        <h2>Inventory List</h2>
        {inventoryItems.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Reorder Level</th>
                <th>Usage Report</th>
                <th>Date Added</th>
                <th>Date Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemName}</td>
                  <td>{item.itemCategory}</td>
                  <td>{item.quantity}</td>
                  <td>{item.reorderLevel}</td>
                  <td>{item.usageReport}</td>
                  <td>{item.dateAdded}</td>
                  <td>{item.dateUpdated || "Not updated yet"}</td>
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
          <p>No inventory items available.</p>
        )}
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default InventoryManagement;
