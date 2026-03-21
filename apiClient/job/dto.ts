type JobPreviewDto = {
  companyName:string;
  educationId:number;
  id:string;
  jobTitle:string;
  preview:string;
  salaryId:number;
};

type JobDto = {
  id:string;
  companyName:string;
  companyPhoto:string[]; // 這是圖片URL的陣列
  jobTitle:string;
  description:string; // 這是HTML字串
};

export type { JobPreviewDto, JobDto };
