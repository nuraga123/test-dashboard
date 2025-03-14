import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import styles from "./styles.module.css";

const NotFound = () => {
  return (
    <Layout>
      <div className={styles.not__found}>
        <h2>404 - Страница не найдена</h2>
        <p>Запрашиваемая страница не существует или была перемещена.</p>
        <Link to="/dashboard" className={styles.btn}>
          Вернуться на главную
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
