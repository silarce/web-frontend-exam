'use client';

import { useState, useRef, useEffect } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';

import { useRouter, useSearchParams } from 'next/navigation';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Card from '@/components/card';
import Pagination from '@mui/material/Pagination';
import { useApiGetJobs, useApiGetJobById } from '@/apiClient/hook/useGetJobs';

import scss from './index.module.scss';

export default function JobList() {
  const matches = useMediaQuery('(min-width:768px)');

  const prePage = matches ? 6 : 4;

  const router = useRouter();
  const searchParams = useSearchParams();

  const page = (searchParams.get('page') as `${number}`) ?? '1';

  const { jobs, total, isFetching } = useApiGetJobs({
    page,
    pre_page: prePage,
  });

  const jobListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    jobListRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [jobs]);

  return (

    <div className={scss.jobList} ref={jobListRef}>

      <div className={scss.title}>
        <div />
        <h1>適合前端工程師的好工作</h1>
      </div>

      {jobs.map((job) => (
        <Card
          key={job.id}
          companyName={job.companyName}
          jobTitle={job.jobTitle}
          education={job.education}
          salary={job.salary}
          preview={job.preview}
        />
      ))}

      <Pagination
        className={scss.pagination}
        count={Math.ceil(total / prePage)}
        page={Number(page)}
        onChange={(e, newPage) => {
          const qs = new URLSearchParams({
            page: `${newPage}`,
          }).toString();
          router.replace(`/?${qs}`, {
            scroll: false,
          });

          // window.history.replaceState不會觸發取RSC的api
          // 這樣miragejs應該能正常運作，但已經改用msw了
          // 現在一切運作正常，就不改回miragejs了
          // window.history.replaceState(null, '', `/?${qs}`);
        }}
      />

      <Backdrop open={isFetching} className={scss.backdrop}>
        <CircularProgress
          className={scss.circularProgress}
          size={60}
        />
      </Backdrop>
    </div>
  );
}
