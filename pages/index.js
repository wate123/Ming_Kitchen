import React, { createRef, useRef, useEffect, useState } from "react";
import { Button, notification } from "antd";

import Head from "next/head";
import moment from "moment";
import Image from "next/image";
import styles from "/styles/Home.module.css";
import Header from "/components/Header";
import Menu from "/components/Menu";
import { useUserAgent } from "next-useragent";
import withHydrationOnDemand from "react-hydration-on-demand";

const StoreOperationTime = [0, 2200, 2200, 2200, 2230, 2230, 2200];
export default function Home({ MenuItems, uaString }) {
  const ref = useRef(null);
  let ua;
  if (uaString) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ua = useUserAgent(uaString);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ua = useUserAgent(window.navigator.userAgent);
  }
  useEffect(() => {
    notification["info"]({
      duration: null,
      placement: "topLeft",
      message: "Hours Update",
      description: (
        <span>
          <b>Closed</b> on <b>every Monday！</b>Please come back next day or a
          day before. Sorry for any inconvenience
        </span>
      ),
    });
  }, []);
  const MenuWithHydrationOnDemand = withHydrationOnDemand({ on: ["visible"] })(
    Menu
  );
  const OperationTimeToday = () => {
    const now = new Date();
    const weekDay = now.getDay();
    const hour = now.getHours();
    if (weekDay == 0) {
      return (
        <div className={styles.storeDetails}>
          <b>
            Closed! Please come back <b>{moment(1100, "hmm").format("LT")}</b>{" "}
            Tomorrow
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
    } else if (moment().isBetween(openTill, moment(2359, "hmm"))) {
      return (
        <div className={styles.storeDetails}>
          <b>
            Closed! Open at <b>{moment(1100, "hmm").format("LT")}</b> Tomorrow
          </b>
        </div>
      );
    }
    return (
      <div className={styles.storeDetails}>
        <b>
          Closed! Open at <b>{moment(1100, "hmm").format("LT")}</b> Today
        </b>
      </div>
    );
  };

  return (
    <div>
      <Head>
        <title>Ming Kitchen | Kenner, LA 70065 | Chinese</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Ming Kitchen menu, Order Chinese food Online from Ming Kitchen, Best Chinese in Kenner, LA."
        ></meta>
        <meta name="keywords" content="Chinese, Restaurant, Take out" />
        <link rel="preload" href="/Head.webp" as="image" />
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
        {ua.isIos ? (
          <div>
            <a
              href="http://maps.apple.com/?q=Ming+Kitchen&sll=30.0107,-90.2658"
              target="_blank"
              rel="noreferrer"
            >
              3106 Loyola Drive, <br />
              Kenner, LA, 70065
            </a>
          </div>
        ) : (
          <div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Ming+Kitchen&query_place_id=ChIJkeFQw6i3IIYRJwmQs0HugmY"
              target="_blank"
              rel="noreferrer"
            >
              3106 Loyola Drive, <br />
              Kenner, LA, 70065
            </a>
          </div>
        )}

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
  // console.log(process.env.Domain);
  const res = await fetch(`${process.env.Domain}/api/items`);
  const data = await res.json();
  return {
    props: { MenuItems: data, uaString: context.req.headers["user-agent"] }, // will be passed to the page component as props
  };
}
