import React from "react";
import styles from "./FeaturesCard.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { contentVariantsWithIndex } from "@/src/shared/MotionVaribles";

const FeaturesCard = ({ item, index }) => {
  const Icon = item?.icon;
  return (
    <motion.div
      variants={contentVariantsWithIndex}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      className={styles.featuresCard}
    >
      <div className={styles.inner}>
        <div className={styles.icon}>
          {/* {item.icon} */}
          {/* <Icon /> */}
          {Icon && <Icon className={styles.iconSvg} />} {/* Render icon */}
        </div>
        <h2 className={styles.title}>{item?.feature}</h2>
        <p className={styles.description}>{item?.description}</p>
        <Link href={`/${item?.slug}`} className={styles.viewMore}>
          View More
          {/* &gt; */}
        </Link>
      </div>
    </motion.div>
  );
};

export default FeaturesCard;
