import axiosInstance from '../axiosInstance';
import type { SalaryDto } from './dto';

const apiGetSalaryLevelList = async () => {
  const url = 'salaryLevelList';
  return axiosInstance.get<SalaryDto[]>(url).then(({ data }) => data);
};

export { apiGetSalaryLevelList };
