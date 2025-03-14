import { LayoutProps } from "@/types/layout";
import Header from "@/components/Header";
import styles from "./styles.module.css";

const Layout = ({ children, isHeader = true }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      {isHeader && <Header />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
