import React from "react";
import Image from "next/image";
import Head from "../../public/Head.jpg";
import styles from "/styles/Header.module.css";
export default function index() {
  return (
    <div style={{ height: "250px", position: "relative" }}>
      {/* <img className={styles.head} src="/Head.jpg" alt="Ming Kitchen" /> */}
      <Image
        // className={styles.head}
        src={Head}
        // height={300}
        priority
        layout="fill"
        objectFit="cover"
        alt="Ming Kitchen"
      />
    </div>
  );
}
