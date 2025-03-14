import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Test } from "@/types";
import { fetchTestById } from "@/services/api";
import { BackBtn } from "@/components";

import styles from "./styles.module.css";

const Results = () => {
  const { testId } = useParams<{ testId: string }>();
  const id = +(testId || 0);
  const [test, setTest] = useState<Test>({} as Test);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { innerHeight } = window;
  const [size, setSize] = useState(innerHeight);

  useEffect(() => {
    addEventListener("resize", () => {
      const { innerHeight } = window;
      setSize(innerHeight);
    });
  }, [innerHeight]);

  useEffect(() => {
    const loadTests = async () => {
      try {
        setLoading(true);
        const data = (await fetchTestById(id)) as Test;
        setTest(data);
        setError(null);
      } catch (err) {
        setError("Не удалось загрузить тесты. Пожалуйста, попробуйте позже.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTests();
  }, [id]);

  return (
    <Layout isHeader={false}>
      <div className={styles.result} style={{ height: size - 44 }}>
        <div>
          {loading ? (
            <div className="loading">Loading test details...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : test ? (
            <div className={styles.header}>
              <h2 className={styles.title}>
                {test.status === "Draft" ? "Finalize" : "Results"}
              </h2>
              <h4 className={styles.description}>{test.name}</h4>
            </div>
          ) : (
            <div className="error">Test not found</div>
          )}
        </div>

        <div>
          <BackBtn />
        </div>
      </div>
    </Layout>
  );
};

export default Results;
