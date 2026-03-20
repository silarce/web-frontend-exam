import axiosInstance from '../axiosInstance';
import type { EducationDto } from './dto';

const apiGetEducationLevelList = async () => {
  const url = 'educationLevelList';
  return axiosInstance.get<EducationDto[]>(url).then(({ data }) => data);
};

export { apiGetEducationLevelList };
