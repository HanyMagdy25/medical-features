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
  const { asPath } = router;
  const slug = asPath.replace(/^\/(.*)$/, "$1");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = hospitalData;
        const findItem = hospitalData?.find((item) => item.slug === slug);

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

  console.log("singleFeatureData", singleFeatureData);
  return (
    <div className={styles.features}>
      <div>
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
