'use client';

import { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import Card from '@/components/card';
import Pagination from '@mui/material/Pagination';
import { useApiGetJobs, useApiGetJobById } from '@/apiClient/hook/useGetJobs';
import scss from './index.module.scss';

// type QueryString = {
//   page?:`${number}`;
// };
const prePage = 4;
export default function JobList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // const page = (searchParams.get('page') as `${number}`) ?? '1';
  // const { jobs, total } = useApiGetJobs({
  //   page,
  //   pre_page: prePage,
  // });

  // console.log(jobs);

  // const { job } = useApiGetJobById({ id: '1' });

  // console.log(job);

  return (

    <div className={scss.jobList}>
      <div className={scss.title}>
        <div />
        <h1>適合前端工程師的好工作</h1>
      </div>

      {/* {jobs.map((job) => (
        <Card
          key={job.id}
          companyName={job.companyName}
          jobTitle={job.jobTitle}
          education={job.education}
          salary={job.salary}
          preview={job.preview}
        />
      ))} */}

      <Pagination
        className={scss.pagination}
        // count={Math.ceil(total / prePage)}
        // page={Number(page)}
        count={10}
        // page={Number(page)}
        onChange={(e, newPage) => {
          const qs = new URLSearchParams({
            page: `${newPage}`,
          }).toString();
          router.replace(`http://localhost:3000/?${qs}`);
          // router.replace('http://localhost:3000/?4');
        }}
      />
    </div>
  );
}
