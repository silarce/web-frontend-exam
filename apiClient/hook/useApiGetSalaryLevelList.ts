import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiGetSalaryLevelList } from '../salary';

type SalaryLevelDict = Record<string, string>;

const useApiGetSalaryLevelList = () => {
  const query = useQuery({
    queryKey: ['apiGetSalaryLevelList'],
    queryFn: apiGetSalaryLevelList,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const salaryLevelDict = useMemo(() => {
    if (!query.data) {
      return {};
    }

    const dict:SalaryLevelDict = {};

    query.data.forEach(({ id, label }) => {
      dict[id] = label;
    });
    return dict;
  }, [query.data]);

  return {
    ...query,
    salaryLevelDict,
  };
};

export { useApiGetSalaryLevelList };
export type { SalaryLevelDict };
