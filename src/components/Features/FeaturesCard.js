import React from "react";
import styles from "./FeaturesCard.module.css";
import Image from "next/image";
import Link from "next/link";
import UserIcon from "@/src/assets/user.svg";
// import ArrowRight from "@/src/assets/arrow-right.svg";
const FeaturesCard = ({ item }) => {
  return (
    <div className={styles.featuresCard}>
      <div className={styles.inner}>
        <div className={styles.icon}>
          <UserIcon />
        </div>
        <h2 className={styles.title}>{item?.feature}</h2>
        <p className={styles.description}>{item?.description}</p>
        <Link href={`/${item?.slug}`} className={styles.viewMore}>
          View More &gt;
        </Link>
      </div>
    </div>
  );
};

export default FeaturesCard;
