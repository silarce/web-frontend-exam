import { useState } from 'react';

const useSearch = ((
  {
    defaultCompanyName = '',
    defaultStateEducationId = 'null',
    defaultStateSalaryId = 'null',
  }:
  {
    defaultCompanyName:string
    defaultStateEducationId:string
    defaultStateSalaryId:string
  },
) => {
  const [stateCompanyName, setStateCompanyName] = useState<string>(defaultCompanyName);
  const [stateEducationId, setStateEducationId] = useState<string>(defaultStateEducationId);
  const [stateSalaryId, setStateSalaryId] = useState<string>(defaultStateSalaryId);

  return {
    stateCompanyName,
    stateEducationId,
    stateSalaryId,
    setStateCompanyName,
    setStateEducationId,
    setStateSalaryId,
  };
});

export default useSearch;
