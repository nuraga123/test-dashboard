import React from "react";
import SearchIcon from "../iconComponent/SearchIcon";
import styles from "./styles.module.css";

const Search = ({
  searchTerm,
  handleSearchChange,
  resetSearch,
  itemsCount,
}: {
  itemsCount: number;
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetSearch: () => void;
}) => {
  return (
    <div className={styles.search}>
      <input
        type="text"
        className={styles.search__input}
        placeholder="What test are you looking for?"
        value={searchTerm}
        onChange={handleSearchChange}
        aria-label="Поиск по названию теста"
      />
      <span className={styles.search__icon} aria-hidden="true">
        <SearchIcon />
      </span>
      {searchTerm && (
        <button
          className={styles.search__clear}
          onClick={resetSearch}
          aria-label="Очистить поиск">
          ✕
        </button>
      )}

      <div className={styles.search__count} aria-live="polite">
        {itemsCount} tests
      </div>
    </div>
  );
};

export default Search;
