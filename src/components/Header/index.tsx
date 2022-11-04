import styles from "./styles.module.css";

const Header = (): JSX.Element => {
  return (
    <header>
      <a href="https://war.ukraine.ua/support-ukraine/" target="_blank" rel="noreferrer">
        <div className={styles.praporBlue} />
        <div className={styles.praporYellow} />
      </a>
      <h1>Technical Assessment</h1>
    </header>
  );
};

export default Header;
