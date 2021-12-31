import React, {
  useRef,
  createRef,
  useLayoutEffect,
  useState,
  useEffect,
} from "react";
import { Menu } from "antd";
import LeftMenu from "./LeftMenu";
import moment from "moment";
import MenuCard from "./MenuCard";
import { Row, Col } from "antd";
import style from "./Menu.module.css";
const isBetween = (value, floor, ceil) => value >= floor && value <= ceil;
const clamp = (value) => Math.max(0, value);

const useScrollspy = (ids, offset = 0) => {
  const [activeId, setActiveId] = useState("");

  useLayoutEffect(() => {
    const listener = () => {
      const scroll = window.pageYOffset;

      const position = ids
        .map((id) => {
          const element = document.getElementById(id);

          if (!element) return { id, top: -1, bottom: -1 };

          const rect = element.getBoundingClientRect();
          const top = clamp(rect.top + scroll - offset);
          const bottom = clamp(rect.bottom + scroll - offset);

          return { id, top, bottom };
        })
        .find(({ top, bottom }) => isBetween(scroll, top, bottom));

      setActiveId(position?.id || "");
    };

    listener();

    window.addEventListener("resize", listener);
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("resize", listener);
      window.removeEventListener("scroll", listener);
    };
  }, [ids, offset]);

  return activeId;
};
export default function Menus({ items }) {
  const sections = Object.keys(items).filter((x) => x !== "Modifiers");

  const refs = useRef([]);
  const active = useScrollspy(sections, 80);

  refs.current = sections.map((_, i) => refs.current[i] ?? createRef());

  const sectionHeading = (name) => {
    if (name === "Special Dinner Combo Plates") {
      return (
        <>
          {name}
          <div className={style.notes}>(Served All Day)</div>
          <div className={style.subSection}>
            All Served w. Roast Pork Fried Rice & Egg Roll
          </div>
        </>
      );
    } else if (name === "Lunch Special") {
      return (
        <>
          {new Date().getDay() !== 6 ? (
            name + " (11:00 AM - 3:00 PM)"
          ) : (
            <div className={style.notes}>Not Available Today (Sunday)</div>
          )}

          <div className={style.subSection}>
            All Served w. Roast Pork Fried Rice & a Can Drink
          </div>
        </>
      );
    } else {
      return name;
    }
  };

  return (
    <div>
      <Row>
        <Col
          xs={{ order: 1, span: 24 }}
          sm={{ order: 1, span: 8 }}
          md={{ order: 1, span: 6 }}
        >
          <LeftMenu
            refs={refs}
            selectedKey={active !== "" ? active : sections[0]}
            sections={sections.filter((n) => n !== "Modifiers")}
          />
        </Col>
        <Col
          xs={{ order: 2, span: 24 }}
          sm={{ order: 2, span: 16 }}
          md={{ order: 1, span: 18 }}
        >
          {sections
            .filter((n) => n !== "Modifiers")
            .map((name, i) => {
              return (
                <div id={name} key={name} ref={refs.current[i]}>
                  <h2 className={style.section}>{sectionHeading(name)}</h2>
                  <Row>
                    {items[name].map((item) => (
                      <Col key={`${item.id}${Math.random()}`} xs={24} md={12}>
                        <MenuCard
                          item={item}
                          modifier={
                            items.Modifiers[name]?.[item.id]
                              ? items["Modifiers"][name][item.id]
                              : null
                          }
                        />
                      </Col>
                    ))}
                  </Row>
                </div>
              );
            })}
        </Col>
      </Row>
    </div>
  );
}
