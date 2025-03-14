import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/dashboard">
          <h1 className={styles.title}>Dashboard</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
