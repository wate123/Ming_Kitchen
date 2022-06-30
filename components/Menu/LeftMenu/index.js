import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  useLayoutEffect,
} from "react";
import { Affix, Menu } from "antd";
import smoothscroll from "smoothscroll-polyfill";

import styles from "/styles/leftmenu.module.css";
export default function LeftMenu({ sections, refs, selectedKey }) {
  const [mode, setMode] = useState("vertical");
  const menuBarRefs = useRef([]);

  menuBarRefs.current = sections.map(
    (_, i) => menuBarRefs.current[i] ?? createRef()
  );
  useLayoutEffect(() => {
    if (window.matchMedia("(max-width: 600px)").matches) {
      setMode("horizontal");
    }
  }, []);
  useEffect(() => {
    smoothscroll.polyfill();
    window.matchMedia("(max-width: 600px)").addEventListener("change", (e) => {
      console.l;
      e.matches ? setMode("horizontal") : setMode("vertical");
    });
  }, []);

  useEffect(() => {
    console.log(selectedKey);
    if (mode === "horizontal") {
      menuBarRefs.current[
        sections.indexOf(selectedKey)
      ].current.scrollIntoView();
    }
  }, [selectedKey]);
  return (
    <Affix>
      <Menu
        className={styles.menu}
        defaultSelectedKeys={sections[0]}
        selectedKeys={selectedKey}
        mode={mode}
        disabledOverflow
        onClick={(item) => {
          console.log(refs);
          // scrollElementIntoView(refs.current, "auto");
          refs.current[sections.indexOf(item.key)].current.scrollIntoView(true);
        }}
      >
        {sections.map((s, i) => (
          <Menu.Item
            key={s}
            className={styles.item}
            style={{
              marginBottom: 0,
              backgroundColor: "transparent",
              color: "black",
            }}
          >
            <div ref={menuBarRefs.current[i]}>{s}</div>
          </Menu.Item>
        ))}
      </Menu>
    </Affix>
  );
}
