import axios from 'axios';
import { ApiTest, Site, Test } from '../types';
import db from "@/api/db.json";

// Базовый URL для API
const API_BASE_URL = 'http://localhost:3000';

const JSON__TESTS = db.tests;
const JSON__SITES = db.sites;


// Функция для получения всех тестов с информацией о сайтах
export const fetchTests = async (): Promise<Test[] | []> => {
  try {
    // Получаем тесты и сайты
    const [testsResponse, sitesResponse] = await Promise.all([
      axios.get<ApiTest[]>(`${API_BASE_URL}/tests`),
      axios.get<Site[]>(`${API_BASE_URL}/sites`)
    ]);

    console.log(testsResponse, sitesResponse)


    const tests = JSON__TESTS;
    console.log(tests.length)
    const sites = JSON__SITES;

    // Объединяем данные
    return tests.map(test => {
      const site = sites.find(site => +site.id === test.siteId)?.url;
      return {
        id: +test.id,
        name: test.name,
        type: test.type,
        status: test.status,
        site: site || ''
      };
    });
  } catch (error) {
    console.error('Ошибка при получении тестов:', error);
    return [];
  }
};

// Функция для получения теста по ID
export const fetchTestById = async (id: number): Promise<Test | object> => {
  try {
    // Получаем тест и сайты
    const { data } = await axios.get(`${API_BASE_URL}/tests/${+id}`);
    console.log("data")
    console.log(data)
    const fakeDB = db.tests.find(test => +test.id === +id) || {}

    return fakeDB;
  } catch (error) {
    console.error(`Ошибка при получении теста с id ${id}:`, error);
    return {};
  }
};