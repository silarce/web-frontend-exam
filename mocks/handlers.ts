import { http, HttpResponse } from 'msw';
import jobList from './constants/jobList';
import educationList from './constants/educationList';
import salaryList from './constants/salaryList';
import type { JobSchema } from './schemas';

const BASE_URL = 'http://localhost:3000/api/v1';

type JobPreview = Omit<JobSchema, 'companyPhoto' | 'description'> & { id: string };

const filterFormat = (
  data: JobPreview[],
  companyName?: string | null,
  educationLevel?: number,
  salaryLevel?: number,
) => {
  let result = data;

  if (companyName) {
    result = result.filter((item) => item.companyName.includes(companyName));
  }
  if (educationLevel) {
    result = result.filter((item) => item.educationId === educationLevel);
  }
  if (salaryLevel) {
    result = result.filter((item) => item.salaryId === salaryLevel);
  }

  return result;
};

export const handlers = [
  // GET /api/v1/jobs
  http.get(`${BASE_URL}/jobs`, ({ request }) => {
    const url = new URL(request.url);

    // filter
    const companyName = url.searchParams.get('company_name');
    const educationLevel = Number(url.searchParams.get('education_level'));
    const salaryLevel = Number(url.searchParams.get('salary_level'));

    // pagination
    const prePage = Number(url.searchParams.get('pre_page'));
    const page = Number(url.searchParams.get('page'));

    // 移除 companyPhoto 和 description，加入 id（和 MirageJS 一樣從 "1" 開始）
    const data: JobPreview[] = jobList.map(
      ({ companyPhoto, description, ...rest }, index) => ({ id: String(index + 1), ...rest }),
    );

    if (!Number.isNaN(prePage) && !Number.isNaN(page)) {
      const startIndex = (page - 1) * prePage;
      const endIndex = startIndex + prePage;
      const filterData = filterFormat(data, companyName, educationLevel, salaryLevel);
      const resultData = filterData.slice(startIndex, endIndex);
      return HttpResponse.json({
        data: resultData,
        total: filterData.length,
      });
    }

    const result = filterFormat(data, companyName, educationLevel, salaryLevel);
    return HttpResponse.json({
      data: result,
      total: result.length,
    });
  }),

  // GET /api/v1/educationLevelList
  http.get(`${BASE_URL}/educationLevelList`, () => HttpResponse.json(educationList)),

  // GET /api/v1/salaryLevelList
  http.get(`${BASE_URL}/salaryLevelList`, () => HttpResponse.json(salaryList)),

  // GET /api/v1/jobs/:id
  http.get(`${BASE_URL}/jobs/:id`, ({ params }) => {
    const { id } = params;
    const jobIndex = jobList.findIndex((_, index) => String(index + 1) === id);

    if (jobIndex !== -1) {
      const job = jobList[jobIndex];
      const {
        preview, educationId, salaryId, ...rest
      } = job;
      return HttpResponse.json({ id: String(jobIndex + 1), ...rest });
    }

    return HttpResponse.json([]);
  }),
];
