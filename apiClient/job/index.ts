import axiosInstance from '../axiosInstance';
import type { JobPreviewDto, JobDto } from './dto';

type ApiGetJobsResponse = {
  data: JobPreviewDto[];
  total: number;
};

type ApiGetJobsParams = {
  page:`${number}` | number;
  pre_page:`${number}` | number;
  company_name?:string;
  education_level?:`${number}` | number;
  salary_level?:`${number}` | number;
};

const apiGetJobs = async (params:ApiGetJobsParams) => {
  const url = 'jobs';
  return axiosInstance.get<ApiGetJobsResponse>(url, { params })
    .then(({ data }) => data);
};

const apiGetJobById = async (id:string) => {
  const url = `jobs/${id}`;
  return axiosInstance.get<JobDto>(url)
    .then(({ data }) => data);
};

export { apiGetJobs, apiGetJobById };
export type {
  ApiGetJobsResponse,
  ApiGetJobsParams,
};
