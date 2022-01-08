import React from "react";
import { Row, Col, Card } from "antd";
import Image from "next/image";
import style from "/styles/MenuCard.module.css";

export default function index({ item, modifier }) {
  const { id, name, price, photo } = item;
  const ModifierItem = () => {
    if (modifier) {
      const Modifiers = modifier.map((m) => {
        if (m.modifier == "Small" || m.modifier == "Large") {
          return (
            <div key={id + m.modifier}>
              <span style={{ fontWeight: 300 }}>{`${m.modifier} `}</span>
              <span style={{ fontWeight: 600 }}>{`$${(price + m.price).toFixed(
                2
              )} `}</span>
              <br />
            </div>
          );
        } else {
          return (
            <div key={id + m.modifier}>
              <span
                style={{ fontWeight: 300, fontStyle: "italic" }}
              >{`${m.modifier} `}</span>
              <span style={{ fontWeight: 600 }}>{`$${(price + m.price).toFixed(
                2
              )}`}</span>
              <br />
            </div>
          );
        }
      });
      return (
        <div>
          <h3 className={style.cardText}>{`${id}. ${name}`}</h3>
          {Modifiers}
        </div>
      );
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
      <Col
        xs={{ order: 2, span: 24 }}
        sm={{ order: 2, span: 24 }}
        lg={{ order: 1, span: 12 }}
      >
        <ModifierItem />
      </Col>
      <Col
        xs={{ order: 1, span: 24 }}
        sm={{ order: 1, span: 24 }}
        lg={{ order: 1, span: 12 }}
        className={photo ? style.image : null}
      >
        {photo ? (
          <Image
            src={photo}
            alt={name}
            // placeholder="blur"
            layout="fill"
            objectFit="cover"
          />
        ) : null}
      </Col>
    </Row>
  );
}
