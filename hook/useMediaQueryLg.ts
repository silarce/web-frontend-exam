import useMediaQuery from '@mui/material/useMediaQuery';

const useMediaQueryLg = () => {
  const RWDMatches = useMediaQuery('(min-width:1024px)');

  return RWDMatches;
};

export default useMediaQueryLg;
