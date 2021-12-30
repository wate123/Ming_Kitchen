import React, { createRef, useRef, useEffect, useState } from "react";

import Head from "next/head";
import moment from "moment";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "/components/Header";
import Menu from "/components/Menu";
const StoreOperationTime = [2200, 2200, 2200, 2200, 2230, 2230, 2200];
export default function Home({ MenuItems }) {
  const ref = useRef(null);
  const OperationTimeToday = () => {
    const now = new Date();
    const weekDay = now.getDay();
    const hour = now.getHours();
    const openTill = moment(StoreOperationTime[weekDay], "hmm");
    if (moment().isBetween(moment(1100, "hmm"), openTill)) {
      return (
        <div className={styles.storeDetails}>
          Open until {openTill.format("LT")} Today
        </div>
      );
    }
    return (
      <div className={styles.storeDetails}>
        Closed! Open at {moment(1100, "hmm").format("LT")} Today
      </div>
    );
  };

  return (
    <div>
      <Head>
        <title>Ming Kitchen Kenner LA</title>
        <meta name="description" content="Chinese Restaurant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.container} ref={ref}>
        <div className={styles.name}>Ming Kitchen</div>
        <span>Tel. </span>
        <a href="tel. 504-466-6400">(504)-466-6400</a>
        <div>3106 Loyola Drive, Kenner, LA, 70065</div>
        <OperationTimeToday />
        <Menu items={MenuItems} />
      </main>
      <footer className={styles.footer}>
        Ming Kitchen All Right Reserved.
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.Domain}/api/items`);
  const data = await res.json();
  return {
    props: { MenuItems: data }, // will be passed to the page component as props
  };
}
