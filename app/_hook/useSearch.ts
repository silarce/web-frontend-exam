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
  const [companyName, setCompanyName] = useState<string>(defaultCompanyName);
  const [stateEducationId, setStateEducationId] = useState<string>(defaultStateEducationId);
  const [stateSalaryId, setStateSalaryId] = useState<string>(defaultStateSalaryId);

  return {
    companyName,
    stateEducationId,
    stateSalaryId,
    setCompanyName,
    setStateEducationId,
    setStateSalaryId,
  };
});

export default useSearch;
