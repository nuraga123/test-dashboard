import { useState, useEffect } from "react";
import { Test, SortConfig } from "@/types";
import { sortByStatus } from "@/utils";
import Search from "@/components/Search";
import TestHeader from "@/components/TestComponent/Header";
import { TestItem } from "@/components";
import styles from "../styles.module.css";

const TestList = ({ tests }: { tests: Test[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });

  const [filteredTests, setFilteredTests] = useState<Test[]>(tests);

  // Обработка изменения поля поиска
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const requestSort = (key: keyof Test) => {
    let direction: "asc" | "desc" = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  useEffect(() => {
    let result = [...tests];

    if (searchTerm) {
      result = result.filter((test) =>
        test.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig.key) {
      if (sortConfig.key === "status") {
        result = sortByStatus(result, sortConfig.direction);
      } else {
        result.sort((a, b) => {
          const aValue = a[sortConfig.key as keyof Test];
          const bValue = b[sortConfig.key as keyof Test];

          if (aValue < bValue) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
          return 0;
        });
      }
    }

    setFilteredTests(result);
  }, [tests, searchTerm, sortConfig]);

  return (
    <div>
      <Search
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        resetSearch={() => setSearchTerm("")}
        itemsCount={filteredTests.length}
      />

      {filteredTests.length > 0 ? (
        <div>
          <TestHeader sortConfig={sortConfig} requestSort={requestSort} />

          {filteredTests.map((test) => (
            <TestItem
              key={test.id}
              {...test}
              action={test.status === "Draft" ? "Finalize" : "Results"}
            />
          ))}
        </div>
      ) : (
        <div className={styles.no__results}>
          <h1>Your search did not match any results.</h1>
          <button
            onClick={() => setSearchTerm("")}
            className={styles.resultsBtn}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default TestList;
