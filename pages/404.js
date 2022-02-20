import styles from "/styles/404.module.css";

export default function Custom404() {
  return (
    <div className={styles.custom404}>
      <img className={styles.image} src="/404.webp" alt="404 cat" />
    </div>
  );
}
