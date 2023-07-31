import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <p>
          Desenvolvido por{" "}
          <a
            className={styles.link}
            href="https://filipegallo.dev/"
            target="_blank"
            rel="noreferrer"
          >
            Filipe
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
