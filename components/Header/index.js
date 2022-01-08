import React from "react";
import Image from "next/image";
import styles from "/styles/Header.module.css";
export default function index() {
  return (
    <div>
      <div className={styles.head}>
        <Image
          src="/Head.jpg"
          alt="Heading"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </div>
  );
}
