import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';

import { apiGetJobs, ApiGetJobsParams } from '../job';
import { apiGetEducationLevelList } from '../education';
import { apiGetSalaryLevelList } from '../salary';

import type { JobDto } from '../job/dto';

type Job = Omit<JobDto, 'educationId' | 'salaryId'> & {
  education:string;
  salary:string;
};

const useApiGetJobs = (params:ApiGetJobsParams) => {
  const [jobsQuery, educationLevelListQuery, salaryLevelListQuery] = useQueries({
    queries: [
      {
        queryKey: ['apiGetJobs', params],
        queryFn: () => apiGetJobs(params),
      },
      {
        queryKey: ['apiGetEducationLevelList'],
        queryFn: apiGetEducationLevelList,
        staleTime: Infinity,
      },
      {
        queryKey: ['apiGetSalaryLevelList'],
        queryFn: apiGetSalaryLevelList,
        staleTime: Infinity,
      },
    ],
  });

  const jobsRes = jobsQuery.data;
  const total = jobsRes?.total ?? 0;
  const rawJobs = jobsRes?.data;
  const educationList = educationLevelListQuery.data;
  const salaryList = salaryLevelListQuery.data;

  // 以下兩個dict是為了優化在mappedJobs查找的效能
  const educationDict:Record<string, string> | null = useMemo(() => {
    if (!educationList) {
      return null;
    }

    const dict:Record<string, string> = {};

    educationList.forEach(({ id, label }) => {
      dict[id] = label;
    });
    return dict;
  }, [educationList]);

  const salaryDict:Record<string, string> | null = useMemo(() => {
    if (!salaryList) {
      return null;
    }

    const dict:Record<string, string> = {};

    salaryList.forEach(({ id, label }) => {
      dict[id] = label;
    });
    return dict;
  }, [salaryList]);

  const mappedJobs:Job[] = useMemo(() => {
    if (!rawJobs || !educationDict || !salaryDict) {
      return [];
    }
    const mappedList = rawJobs.map((job) => {
      const { educationId, salaryId, ...rest } = job;
      const education = educationDict[educationId] ?? '';
      const salary = salaryDict[salaryId] ?? '';

      const mappedJob:Job = {
        ...rest,
        education,
        salary,
      };

      return mappedJob;
    });

    return mappedList;
  }, [
    rawJobs,
    educationDict,
    salaryDict,
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

export { useApiGetJobs };

// 展示過去我是怎麼寫的，現在改成用@tanstack/react-query處理
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
