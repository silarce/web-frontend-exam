import Modal from '@mui/material/Modal';

import { useApiGetJobById } from '@/apiClient/hook/useGetJobs';

import scss from './index.module.scss';

export default function JobInfo() {
  const { job } = useApiGetJobById({ id: '1' });

  // console.log(job);

  return (

    <Modal
      open
      // sx={{ overflow: 'auto' }}
    >
      <div className={scss.container}>

        <div className={scss.title}>
          <span>詳細資訊</span>
        </div>
        {/*  */}
        <div className={scss.content}>

          <div className={scss.jobTitle}>
            <h5>{job?.companyName}</h5>
            <h6>{job?.jobTitle}</h6>
          </div>

          <div className={scss.carousel}>
            <div>輪播圖保留區</div>
            <div>輪播圖保留區</div>
            <div>輪播圖保留區</div>
          </div>

          <div className={scss.desc}>
            <span>工作內容</span>
            <div dangerouslySetInnerHTML={{ __html: job?.description ?? '' }} />
          </div>

        </div>
        {/*  */}
        <div className={scss.footer}>
          <button
            type="button"
            className={scss.btn}
          >
            關閉
          </button>
        </div>

      </div>
    </Modal>

  );
}
