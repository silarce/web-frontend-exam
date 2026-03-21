import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiGetEducationLevelList } from '../education';

type EducationLevelDict = Record<string, string>;

const useApiGetEducationLevelList = () => {
  const query = useQuery({
    queryKey: ['apiGetEducationLevelList'],
    queryFn: apiGetEducationLevelList,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const educationLevelDict = useMemo(() => {
    if (!query.data) {
      return {};
    }

    const dict:EducationLevelDict = {};

    query.data.forEach(({ id, label }) => {
      dict[id] = label;
    });
    return dict;
  }, [query.data]);

  return {
    ...query,
    educationLevelDict,
  };
};

export { useApiGetEducationLevelList };
export type { EducationLevelDict };
