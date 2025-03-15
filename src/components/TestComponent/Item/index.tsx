import { formatSiteUrl } from "@/utils";
import styles from "../styles.module.css";
import { useNavigate } from "react-router-dom";

interface ItemProps {
  id: number;
  name: string;
  type: string;
  status: string;
  site: string;
  action: "Results" | "Finalize";
}

const Item = ({ id, name, type, status, site, action }: ItemProps) => {
  const navigate = useNavigate();

  const getStatusClass = () => {
    switch (status) {
      case "Online":
        return styles.online;
      case "Paused":
        return styles.paused;
      case "Stopped":
        return styles.stopped;
      case "Draft":
        return styles.draft;
      default:
        return "";
    }
  };

  const getBorderLeftClass = () => {
    if (!site) return "";
    if (site.includes("market")) return styles.market;
    if (site.includes("delivery")) return styles.delivery;
    if (site.includes("games")) return styles.games;
    return "";
  };

  // Навигация к страницам результатов или финализации
  const handleActionClick = (
    testId: number,
    action: "results" | "finalize"
  ) => {
    navigate(`/${action}/${testId}`);
  };

  return (
    <div
      key={id}
      className={`${styles.item} ${getBorderLeftClass()}`}
      onClick={() =>
        handleActionClick(id, action === "Results" ? "results" : "finalize")
      }>
      <span className={styles.name}>{name}</span>
      <span>{type}</span>
      <span className={`${styles.status} ${getStatusClass()}`}>{status}</span>
      <span>{formatSiteUrl(site)}</span>
      <button
        className={
          action === "Results" ? styles.resultsBtn : styles.finalizeBtn
        }
        onClick={() =>
          handleActionClick(id, action === "Results" ? "results" : "finalize")
        }>
        {action}
      </button>
    </div>
  );
};

export default Item;
