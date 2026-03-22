const qsToNumberString = (qs:string | null | undefined) => {
  if (!qs) {
    return null;
  }
  const n = Number(qs);
  if (Number.isNaN(n)) {
    return null;
  }
  return `${n}` as `${number}`;
};

export default qsToNumberString;
