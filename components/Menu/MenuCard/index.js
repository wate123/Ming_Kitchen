import React from "react";
import { Row, Col, Card } from "antd";
import Image from "next/image";
import style from "./MenuCard.module.css";

export default function index({ item, modifier }) {
  const { id, name, price, photo } = item;
  const ModifierItem = () => {
    if (modifier) {
      let Mod = [<h3 className={style.cardText}>{`${id}. ${name}`}</h3>];
      modifier.map((m) => {
        if (m.modifier == "Small" || m.modifier == "Large") {
          Mod.push(<span style={{ fontWeight: 300 }}>{`${m.modifier} `}</span>);
          Mod.push(
            <span style={{ fontWeight: 600 }}>{`$${(price + m.price).toFixed(
              2
            )} `}</span>
          );
          Mod.push(<br />);
        } else {
          Mod.push(
            <span
              style={{ fontWeight: 300, fontStyle: "italic" }}
            >{`${m.modifier} `}</span>
          );
          Mod.push(
            <span style={{ fontWeight: 600 }}>{`$${(price + m.price).toFixed(
              2
            )}`}</span>
          );
          Mod.push(<br />);
        }
      });
      return Mod;
    } else {
      return (
        <>
          <h3 className={style.cardText}>{`${id}. ${name}`}</h3>
          <div style={{ fontWeight: 600 }}>{`$${price.toFixed(2)}`}</div>
        </>
      );
    }
  };
  return (
    <Row className={style.card}>
      <Col sm={{ order: 2, span: 24 }} lg={{ order: 1, span: 12 }}>
        <ModifierItem />
      </Col>
      <Col
        sm={{ order: 1, span: 24 }}
        lg={{ order: 1, span: 12 }}
        className={photo ? style.image : null}
      >
        {photo ? (
          <Image src={photo} alt={name} layout="fill" objectFit="cover" />
        ) : null}
      </Col>
    </Row>
  );
}
