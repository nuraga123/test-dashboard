import { Test } from '../types';

// Форматирование URL сайта для удаления http/https и www префикса
export const formatSiteUrl = (url: string): string => {
  return url.replace(/^(https?:\/\/)?(www\.)?/, '');
};

// Сортировка тестов по статусу в заданном порядке
export const sortByStatus = (tests: Test[], direction: 'asc' | 'desc'): Test[] => {
  const statusOrder = direction === 'asc'
    ? ['Online', 'Paused', 'Stopped', 'Draft']
    : ['Draft', 'Stopped', 'Paused', 'Online'];


  return [...tests].sort((a, b) => {
    const statusA = statusOrder.indexOf(a.status);
    const statusB = statusOrder.indexOf(b.status);
    return statusA - statusB;
  });
};