import React from "react";
import Image from "next/image";
import style from "./Header.module.css";
export default function index() {
  return (
    <div>
      <div style={{ height: "30vh", width: "100vw", position: "relative" }}>
        <Image src="/Head.jpg" alt="Heading" layout="fill" objectFit="cover" />
      </div>
      
    </div>
  );
}
