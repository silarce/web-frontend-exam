type JobDto = {
  companyName:string;
  jobTitle:string;
  educationId:number;
  salaryId:number;
  preview:string;
  companyPhoto:string[]; // 這是圖片URL的陣列
  description:string; // 這是HTML字串
};

export type { JobDto };
