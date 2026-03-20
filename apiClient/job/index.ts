import axiosInstance from '../axiosInstance';
import type { JobDto } from './dto';

type ApiGetJobsResponse = {
  data: JobDto[];
  total: number;
};

type ApiGetJobsParams = {
  page:number;
  pre_page:number;
  company_name?:string;
  education_level?:number;
  salary_level?:number;
};

const apiGetJobs = async (params:ApiGetJobsParams) => {
  const url = 'jobs';
  return axiosInstance.get<ApiGetJobsResponse>(url, { params }).then(({ data }) => data);
};

export { apiGetJobs };
export type {
  ApiGetJobsResponse,
  ApiGetJobsParams,
};
