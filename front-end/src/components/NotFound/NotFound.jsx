import { Link } from "react-router-dom";
import styles from "./notfound.module.css";

const NotFound = () => {
  return (
    <div className={styles.notfound_container}>
      <div className={styles.notfound_img}></div>
      <div className={styles.notfound_description}>
        <div className={styles.notfound_text}>
        <h3 className={styles.notfound_title}>Page Not Found</h3>

          <p className={styles.notfound_p}>
            Oops! It seems like the page you are looking for doesn't exist.
          </p>

          <p className={styles.notfound_p}>But don't worry!</p>
          <p className={styles.notfound_p}>
            You can continue discovering interesting sections we have for you.
          </p>
          {/* <p className={styles.notfound_p}>
            If you have any questions or need assistance, feel free to contact
            us. We're here to help with anything you need.
          </p> */}

          <Link to="/home">
            <button className={styles.notfound_btn}>Go Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
