import { Link } from "react-router-dom";
import back from "/icon/back.svg";
import styles from "./styles.module.css";

const BackBtn = () => {
  return (
    <Link to="/dashboard">
      <div className={styles.back}>
        <img src={back} alt="back-icon" style={{ marginRight: 18 }} />
        <span className={styles.text}>Back</span>
      </div>
    </Link>
  );
};

export default BackBtn;
