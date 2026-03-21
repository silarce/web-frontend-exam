'use client';

import Card from '@/components/card';
import Pagination from '@mui/material/Pagination';
import { useApiGetJobs, useApiGetJobById } from '@/apiClient/hook/useGetJobs';
import scss from './index.module.scss';

export default function JobList() {
  const { jobs } = useApiGetJobs({
    page: 1,
    pre_page: 1,
  });
  console.log(jobs);

  const { job } = useApiGetJobById({ id: '1' });

  console.log(job);

  return (

    <div className={scss.jobList}>
      <div className={scss.title}>
        <div />
        <h1>適合前端工程師的好工作</h1>
      </div>
      <Card />
      <Card />
      <Card />
      <Card />
      <Pagination className={scss.pagination} />
    </div>
  );
}
