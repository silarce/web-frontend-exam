'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import useMediaQueryLg from '@/hook/useMediaQueryLg';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import Card from '@/components/card';
import Pagination from '@mui/material/Pagination';

import MySelect from '@/components/mySelect';
import MyInput from '@/components/myInput';
import ErrorMessage from '@/components/errorMessage';

import { useApiGetJobs } from '@/apiClient/hook/useGetJobs';
import { useApiGetEducationLevelList } from '@/apiClient/hook/useApiGetEducationLevelList';
import { useApiGetSalaryLevelList } from '@/apiClient/hook/useApiGetSalaryLevelList';

import qsToNumberString from '@/utils/qsToNumberString';
import useSearch from '@/app/_hook/useSearch';
import JobInfo from '../jobInfo';

import scss from './index.module.scss';

export default function JobList() {
  const jobListRef = useRef<HTMLDivElement>(null);
  const isFirstFetchSuccess = useRef(false);

  const RWDMatches = useMediaQueryLg();

  const router = useRouter();
  const searchParams = useSearchParams();

  const prePage = RWDMatches ? 6 : 4;

  const page = (searchParams.get('page') as `${number}`) ?? '1';
  const companyNameQs = searchParams.get('companyName') || undefined;
  const stateEducationIdQs = qsToNumberString(searchParams.get('stateEducationId'));
  const stateSalaryIdQs = qsToNumberString(searchParams.get('stateSalaryId'));
  const infoIdQs = searchParams.get('infoId') || undefined;

  const enableFetch = !(!RWDMatches
     && (!!companyNameQs || !!stateEducationIdQs || !!stateSalaryIdQs));

  const { data: educationList } = useApiGetEducationLevelList();
  const { data: salaryList } = useApiGetSalaryLevelList();

  const {
    jobs, total, isFetching, error,
  } = useApiGetJobs({
    page,
    pre_page: prePage,
    company_name: companyNameQs,
    education_level: stateEducationIdQs || undefined,
    salary_level: stateSalaryIdQs || undefined,
  }, {
    enabled: enableFetch,
  });

  const {
    stateCompanyName: companyName, stateEducationId, stateSalaryId,
    setStateCompanyName: setCompanyName, setStateEducationId, setStateSalaryId,
  } = useSearch(
    {
      defaultCompanyName: companyNameQs ?? '',
      defaultStateEducationId: stateEducationIdQs ? `${stateEducationIdQs}` : 'null',
      defaultStateSalaryId: stateSalaryIdQs ? `${stateSalaryIdQs}` : 'null',
    },
  );

  const educationOptions = useMemo(() => {
    const options = (educationList ?? [])
      .map(({ id, label }) => ({
        value: `${id}`,
        label,
      }));

    options.unshift({ value: 'null', label: '不拘' });

    return options;
  }, [educationList]);

  const salaryOptions = useMemo(() => {
    const options = (salaryList ?? [])
      .map(({ id, label }) => ({
        value: `${id}`,
        label,
      }));

    options.unshift({ value: 'null', label: '不拘' });

    return options;
  }, [salaryList]);

  const handleTurnPage = (newPage: number) => {
    const q = new URLSearchParams(searchParams);
    q.set('page', `${newPage}`);
    const qs = q.toString();
    router.replace(`/?${qs}`, {
      scroll: false,
    });
  };

  const handleSearch = () => {
    const qs = new URLSearchParams({
      page: '1',
      companyName,
      stateEducationId: stateEducationId === 'null' ? '' : stateEducationId,
      stateSalaryId: stateSalaryId === 'null' ? '' : stateSalaryId,
    }).toString();
    router.replace(`/?${qs}`, {
      scroll: false,
    });
  };

  const handleOpenInfo = (infoId: string) => {
    const q = new URLSearchParams(searchParams);
    q.set('infoId', infoId);
    const qs = q.toString();
    router.replace(`/?${qs}`, {
      scroll: false,
    });
  };

  const handleCloseInfo = () => {
    const q = new URLSearchParams(searchParams);
    q.delete('infoId');
    const qs = q.toString();
    router.replace(`/?${qs}`, {
      scroll: false,
    });
  };

  // 避免一進入page取得第一筆就滾動到list
  // 在rwd lg時無效
  useEffect(() => {
    if (!isFirstFetchSuccess.current && jobs.length === 0) {
      return;
    }

    if (!isFirstFetchSuccess.current && jobs.length > 0) {
      isFirstFetchSuccess.current = true;
      return;
    }

    if (!RWDMatches) {
      jobListRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [jobs]);

  useEffect(() => {
    if (!enableFetch) {
      router.replace(`/?page=${1}`, { scroll: false });
    }
  }, []);

  // mobile與desktop要顯示的資料數量不同，所以要重新取資料
  // 實務上幾乎不會發生，不使用這個useEffect
  // useEffect(handleSearch, [prePage]);

  return (
    <div className={scss.container} ref={jobListRef}>

      <div className={scss.title}>
        <div />
        <h1>適合前端工程師的好工作</h1>
      </div>

      {RWDMatches && (
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

      {true && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
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
            onInfoClick={() => {
              handleOpenInfo(job.id);
            }}
          />
        ))}
      </div>

      <Pagination
        className={scss.pagination}
        count={Math.ceil(total / prePage)}
        page={Number(page)}
        onChange={(e, newPage) => {
          handleTurnPage(newPage);
        }}
      />

      <Backdrop open={isFetching} className={scss.backdrop}>
        <CircularProgress
          className={scss.circularProgress}
          size={60}
        />
      </Backdrop>

      <JobInfo
        id={infoIdQs}
        onClose={handleCloseInfo}
      />
    </div>
  );
}
