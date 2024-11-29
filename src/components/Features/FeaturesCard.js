import React from "react";
import styles from "./FeaturesCard.module.css";
import Link from "next/link";

const FeaturesCard = ({ item }) => {
  const Icon = item?.icon;
  return (
    <div className={styles.featuresCard}>
      <div className={styles.inner}>
        <div className={styles.icon}>
          {/* {item.icon} */}
          {/* <Icon /> */}
          {Icon && <Icon className={styles.iconSvg} />} {/* Render icon */}
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
