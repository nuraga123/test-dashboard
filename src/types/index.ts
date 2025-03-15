// Типы статусов и типов тестов
export type TestStatus = 'Online' | 'Paused' | 'Stopped' | 'Draft' | string;
export type TestType = 'Classic' | 'MVT' | 'Server-side' | string;

// Интерфейс для сайта
export interface Site {
  id: number;
  url: string;
}

// Интерфейс для теста из API
export interface ApiTest {
  id: number;
  name: string;
  type: TestType;
  status: TestStatus;
  siteId: number;
}

// Интерфейс для объединенного теста с информацией о сайте
export interface Test {
  id: number;
  name: string;
  type: TestType;
  status: TestStatus;
  site: string;
}

// Интерфейс для конфигурации сортировки
export interface SortConfig {
  key: keyof Test | null;
  direction: 'asc' | 'desc';
}