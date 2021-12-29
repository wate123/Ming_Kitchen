import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  useLayoutEffect,
} from "react";
import { Affix, Menu } from "antd";

import styles from "./leftmenu.module.css";
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
    window.matchMedia("(max-width: 600px)").addEventListener("change", (e) => {
      console.l;
      e.matches ? setMode("horizontal") : setMode("vertical");
    });
    console.log(mode);
  }, []);

  useEffect(() => {
    menuBarRefs.current[sections.indexOf(selectedKey)].current.scrollIntoView();
  }, [selectedKey]);
  return (
    <Affix>
      <Menu
        className={styles.menu}
        defaultSelectedKeys={sections[0]}
        selectedKeys={selectedKey}
        mode={mode}
        disabledOverflow
        onClick={(item) =>
          refs.current[sections.indexOf(item.key)].current.scrollIntoView()
        }
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
