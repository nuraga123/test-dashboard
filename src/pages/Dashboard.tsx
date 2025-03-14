import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { fetchTests } from "@/services/api";
import { Test } from "@/types";
import { TestList } from "@/components";

const Dashboard = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTests = async () => {
      try {
        setLoading(true);
        const data = await fetchTests();
        setTests(data);
        setError(null);
      } catch (err) {
        setError("Не удалось загрузить тесты. Пожалуйста, попробуйте позже.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTests();
  }, []);

  return (
    <Layout>
      <div className="dashboard">
        {loading ? (
          <div className="loading">Загрузка тестов...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <TestList tests={tests} />
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
