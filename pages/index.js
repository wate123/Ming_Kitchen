import React, { createRef, useRef, useEffect, useState } from "react";
import { Button, notification } from "antd";

import Head from "next/head";
import moment from "moment";
import Image from "next/image";
import styles from "/styles/Home.module.css";
import Header from "/components/Header";
import Menu from "/components/Menu";
const StoreOperationTime = [0, 2200, 2200, 2200, 2230, 2230, 2200];
export default function Home({ MenuItems }) {
  const ref = useRef(null);

  useEffect(() => {
    notification["info"]({
      duration: null,
      placement: "topLeft",
      message: "Hours Update",
      description: (
        <span>
          Starting next week<b>(1/11)</b>，We will be <b>closed</b> on{" "}
          <b>every Monday！</b>Please come back next day or a day before. Sorry
          for any inconvenience
        </span>
      ),
    });
  }, []);

  const OperationTimeToday = () => {
    const now = new Date();
    const weekDay = now.getDay();
    const hour = now.getHours();
    if (weekDay == 0) {
      return (
        <div className={styles.storeDetails}>
          <b>
            Closed! Please come back {moment(1100, "hmm").format("LT")} Tomorrow
          </b>
        </div>
      );
    }
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
        <b>Closed! Open at {moment(1100, "hmm").format("LT")} Today</b>
      </div>
    );
  };

  return (
    <div>
      <Head>
        <title>Ming Kitchen | Kenner, LA 70065 | Chinese</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Chinese Restaurant" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Header />
      <main className={styles.container} ref={ref}>
        <div className={styles.name}>Ming Kitchen</div>
        <Button
          className={styles.orderButton}
          type="danger"
          href="https://qmenu.us/#/ming-kitchen-kenner"
          target="_blank"
        >
          Order Here
        </Button>
        <span>Tel. </span>
        <a href="tel:504-466-6400">(504)-466-6400</a>
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
  console.log(process.env.Domain);
  const res = await fetch(`${process.env.Domain}/api/items`);
  const data = await res.json();
  return {
    props: { MenuItems: data }, // will be passed to the page component as props
  };
}
