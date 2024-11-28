"use client";
import React from "react";
import styles from "./Features.module.css";
import { useState, useEffect } from "react";
import hospitalData from "@/data"; // Import the data.
import FeaturesCard from "./FeaturesCard";
const Features = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = hospitalData;
        setData(result);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className={styles.features}>
      <div className="container">
        <h1 className={styles.headTitle}>Hospital Management Features</h1>
        <div className={styles.featuresCards}>
          {data.map((item, index) => (
            <FeaturesCard item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
