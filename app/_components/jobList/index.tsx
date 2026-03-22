'use client';

import {
  useState, useRef, useEffect, useMemo,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import useMediaQuery from '@mui/material/useMediaQuery';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import Card from '@/components/card';
import Pagination from '@mui/material/Pagination';

import MySelect from '@/components/mySelect';
import MyInput from '@/components/myInput';

import { useApiGetJobs } from '@/apiClient/hook/useGetJobs';
import { useApiGetEducationLevelList } from '@/apiClient/hook/useApiGetEducationLevelList';
import { useApiGetSalaryLevelList } from '@/apiClient/hook/useApiGetSalaryLevelList';

import JobInfo from '../jobInfo';

import scss from './index.module.scss';

const useSearch = (() => {
  const [companyName, setCompanyName] = useState<string>('');
  const [stateEducationId, setStateEducationId] = useState<string>('null');
  const [stateSalaryId, setStateSalaryId] = useState<string>('null');

  return {
    companyName,
    stateEducationId,
    stateSalaryId,
    setCompanyName,
    setStateEducationId,
    setStateSalaryId,
  };
});

export default function JobList() {
  const matches = useMediaQuery('(min-width:768px)');
  const prePage = matches ? 6 : 4;

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = (searchParams.get('page') as `${number}`) ?? '1';
  const companyNameQs = searchParams.get('companyName') || undefined;
  const stateEducationIdQs = Number(searchParams.get('stateEducationId'));
  const stateSalaryIdQs = Number(searchParams.get('stateSalaryId'));

  const { data: educationList } = useApiGetEducationLevelList();
  const { data: salaryList } = useApiGetSalaryLevelList();

  const { jobs, total, isFetching } = useApiGetJobs({
    page,
    pre_page: prePage,
    company_name: companyNameQs,
    education_level: stateEducationIdQs || undefined,
    salary_level: stateSalaryIdQs || undefined,
  });

  const {
    companyName, stateEducationId, stateSalaryId,
    setCompanyName, setStateEducationId, setStateSalaryId,
  } = useSearch();

  const jobListRef = useRef<HTMLDivElement>(null);

  const educationOptions = useMemo(() => {
    const options = (educationList ?? [])
      .map(({ id, label }) => ({
        value: id,
        label,
      }));

    options.unshift({ value: 'null', label: '不拘' });

    return options;
  }, [educationList]);

  const salaryOptions = useMemo(() => {
    const options = (salaryList ?? [])
      .map(({ id, label }) => ({
        value: id,
        label,
      }));

    options.unshift({ value: 'null', label: '不拘' });

    return options;
  }, [salaryList]);

  const handleSearch = () => {
    const qs = new URLSearchParams({
      page: '1',
      companyName,
      stateEducationId,
      stateSalaryId,
    }).toString();
    router.replace(`/?${qs}`, {
      scroll: false,
    });
  };

  useEffect(() => {
    if (!matches) {
      jobListRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [jobs]);

  return (

    <div className={scss.container} ref={jobListRef}>

      <div className={scss.title}>
        <div />
        <h1>適合前端工程師的好工作</h1>
      </div>

      {matches && (
      <form
        className={scss.filterBar}
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <MyInput
          className={scss.input}
          label="公司名稱"
          placeholder="請輸入公司名稱"
          value={companyName}
          onChange={(e) => {
            setCompanyName(e.target.value);
          }}
        />

        <MySelect
          className={scss.select}
          label="教育程度"
          value={stateEducationId}
          onChange={(e) => {
            setStateEducationId(e.target.value);
          }}
          options={educationOptions}
        />

        <MySelect
          className={scss.select}
          label="薪水範圍"
          value={stateSalaryId}
          onChange={(e) => {
            setStateSalaryId(e.target.value);
          }}
          options={salaryOptions}
        />

        <Button
          type="submit"
          className={scss.btn}
        >
          條件搜尋
        </Button>
      </form>
      )}

      <div className={scss.list}>
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
      </div>

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
      <JobInfo />
    </div>
  );
}
