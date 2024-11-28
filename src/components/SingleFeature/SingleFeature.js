"use client";
import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./SingleFeature.module.css";
import hospitalData from "@/data";
import UserIcon from "@/src/assets/user.svg";
const SingleFeature = () => {
  const [singleFeatureData, setSingleFeatureData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = hospitalData;
        const findItem = result?.find((item) => item.slug === slug);
        setSingleFeatureData(findItem);
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
        <h1 className={styles.headTitle}>Single Hospital Management Feature</h1>
        <div className={styles.featuresCards}>
          <div className={styles.icon}>
            <UserIcon />
          </div>
          <h2 className={styles.title}>{singleFeatureData?.feature}</h2>
          <p className={styles.description}>{singleFeatureData?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleFeature;
