import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { JobPreviewDto } from '../job/dto';

import { apiGetJobs, apiGetJobById, type ApiGetJobsParams } from '../job';

import { useApiGetEducationLevelList, type EducationLevelDict } from './useApiGetEducationLevelList';
import { useApiGetSalaryLevelList, type SalaryLevelDict } from './useApiGetSalaryLevelList';

type Job = Omit<JobPreviewDto, 'educationId' | 'salaryId'> & {
  education:string;
  salary:string;
};

const mapJob = (
  {
    job,
    educationLevelListDict,
    salaryLevelListDict,
  }:
  {
    job:JobPreviewDto;
    educationLevelListDict:EducationLevelDict;
    salaryLevelListDict:SalaryLevelDict;
  },
) => {
  const { educationId, salaryId, ...rest } = job;
  const education = educationLevelListDict[`${educationId}`] ?? '';
  const salary = salaryLevelListDict[`${salaryId}`] ?? '';
  const mappedJob:Job = {
    ...rest,
    education,
    salary,
  };

  return mappedJob;
};

const useApiGetJobs = (params:ApiGetJobsParams) => {
  const educationLevelListQuery = useApiGetEducationLevelList();
  const salaryLevelListQuery = useApiGetSalaryLevelList();

  const { educationLevelDict } = educationLevelListQuery;
  const { salaryLevelDict } = salaryLevelListQuery;

  const jobsQuery = useQuery({
    queryKey: ['apiGetJobs', params],
    queryFn: () => apiGetJobs(params),
  });

  const jobsRes = jobsQuery.data;
  const total = jobsRes?.total ?? 0;
  const rawJobs = jobsRes?.data;

  const mappedJobs:Job[] = useMemo(() => {
    if (!rawJobs || educationLevelListQuery.error || salaryLevelListQuery.error) {
      return [];
    }
    const mappedList = rawJobs.map((job) => {
      const mappedJob = mapJob({
        job,
        educationLevelListDict: educationLevelDict,
        salaryLevelListDict: salaryLevelDict,
      });
      return mappedJob;
    });

    return mappedList;
  }, [
    rawJobs,
    educationLevelDict,
    salaryLevelDict,
    educationLevelListQuery.error,
    salaryLevelListQuery.error,
  ]);

  const isFetching = jobsQuery.isFetching
  || educationLevelListQuery.isFetching
  || salaryLevelListQuery.isFetching;

  const error = (jobsQuery.error
  || educationLevelListQuery.error
  || salaryLevelListQuery.error) ? '取得職缺資料失敗' : null;

  return {
    jobs: mappedJobs,
    total,
    isFetching,
    error,
  };
};

// const useApiGetJobById = (id:number) => {
//   const educationLevelListQuery = useApiGetEducationLevelList();
//   const salaryLevelListQuery = useApiGetSalaryLevelList();
//   const { educationLevelDict } = educationLevelListQuery;
//   const { salaryLevelDict } = salaryLevelListQuery;

//   const jobQuery = useQuery({
//     queryKey: ['apiGetJobById', id],
//     queryFn: () => apiGetJobById(`${id}`),
//   });

//   const job = jobQuery.data;

//   const mappedJob:Job | null = useMemo(() => {
//     if (!job || educationLevelListQuery.error || salaryLevelListQuery.error) {
//       return null;
//     }

//     const mapped = mapJob({
//       job,
//       educationLevelListDict: educationLevelDict,
//       salaryLevelListDict: salaryLevelDict,
//     });

//     return mapped;
//   }, [
//     job,
//     educationLevelDict,
//     salaryLevelDict,
//     educationLevelListQuery.error,
//     salaryLevelListQuery.error,
//   ]);

//   const isFetching = jobQuery.isFetching
//   || educationLevelListQuery.isFetching
//   || salaryLevelListQuery.isFetching;

//   const error = (jobQuery.error
//   || educationLevelListQuery.error
//   || salaryLevelListQuery.error) ? '取得職缺資料失敗' : null;

//   return {
//     job: mappedJob,
//     isFetching,
//     error,
//   };
// };

const useApiGetJobById = (id:number) => {
  const { data, isFetching, error } = useQuery({
    queryKey: ['apiGetJobById', id],
    queryFn: () => apiGetJobById(`${id}`),
  });

  return {
    job: data,
    isFetching,
    error,
  };
};

export {
  useApiGetJobs,
  useApiGetJobById,
};

export type { Job };

// 過去通常是這樣寫的，現在改成用@tanstack/react-query處理
// const useApiGetJobs = (params:ApiGetJobsParams) => {
//   const [stateJobs, setStateJobs] = useState<Job[]>([]);
//   const [stateTotal, setStateTotal] = useState(0);
//   const [isFetching, setIsFetching] = useState(false);
//   const [stateError, setStateError] = useState<string | null>(null);

//   const update = useCallback(async () => {
//     setIsFetching(true);

//     try {
//       const [jobList, educationLevelList, salaryLevelList] = await Promise
//         .all([
//           apiGetJobs(params),
//           apiGetEducationLevelList(),
//           apiGetSalaryLevelList(),
//         ]);

//       const mappedJobList:Job[] = jobList.data.map((job) => {
//         const { educationId, salaryId, ...rest } = job;

//         const education = educationLevelList
//           .find(({ id }) => id === educationId)?.label ?? '';

//         const salary = salaryLevelList
//           .find(({ id }) => id === salaryId)?.label ?? '';

//         const mappedJob:Job = {
//           ...rest,
//           education,
//           salary,
//         };

//         return mappedJob;
//       });

//       setStateTotal(jobList.total);
//       setStateJobs(mappedJobList);
//     } catch (error) {
//       setStateJobs([]);
//       setStateTotal(0);
//       setStateError('取得職缺資料失敗');
//     } finally {
//       setIsFetching(false);
//     }
//   }, [params]);

//   useEffect(() => {
//     update();
//   }, [update]);

//   return {
//     stateJobs,
//     stateTotal,
//     stateError,
//     isFetching,
//     update,
//   };
// };
