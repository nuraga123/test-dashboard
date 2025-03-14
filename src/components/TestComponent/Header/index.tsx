import { SortConfig, Test } from "@/types";
import ChevronIcon from "@/components/iconComponent/ChevronIcon";
import styles from "../styles.module.css";

const TestHeader = ({
  sortConfig,
  requestSort,
}: {
  sortConfig: SortConfig;
  requestSort: (key: keyof Test) => void;
}) => {
  const TestHeaderTitle = ({ keySort }: { keySort: keyof Test }) => {
    return (
      <div
        className={styles.header__title}
        onClick={() => requestSort(keySort)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            requestSort(keySort);
          }
        }}>
        {keySort} {getSortDirectionIcon(keySort)}
      </div>
    );
  };

  const getSortDirectionIcon = (columnName: keyof Test) => {
    if (sortConfig.key !== columnName) {
      return null;
    }

    return sortConfig.direction === "asc" ? (
      <ChevronIcon state={true} />
    ) : (
      <ChevronIcon state={false} />
    );
  };

  return (
    <div className={styles.header}>
      <TestHeaderTitle keySort={"name"} />
      <TestHeaderTitle keySort={"type"} />
      <TestHeaderTitle keySort={"status"} />
      <TestHeaderTitle keySort={"site"} />
      <div className={styles.header__title} />
    </div>
  );
};

export default TestHeader;
