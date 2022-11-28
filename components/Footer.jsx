import styles from "../styles/Footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.png" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            OH YES, WE DID. THE TURTLEY AWESOME PIZZA COMPANY HAS COME TO
            BLYTHEVILLE!
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANT</h1>
          <p className={styles.text}>
            601 W Moultrie Drive
            <br /> Blytheville, AR 72315
            <br /> 870 278 0155
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY - FRIDAY
            <br /> 9AM - 10PM
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 11AM - 11PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
