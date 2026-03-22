import Modal from '@mui/material/Modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

import { useApiGetJobById } from '@/apiClient/hook/useGetJobs';

import scss from './index.module.scss';

type JobInfoProps = {
  id: string | undefined;
  onClose: () => void;
};

export default function JobInfo(
  { id, onClose }:JobInfoProps,

) {
  const { job } = useApiGetJobById({ id });

  return (

    <Modal
      open={!!id}
      onClose={onClose}
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

          <div>
            <Swiper
              className={scss.swiper}
              modules={[Pagination, Autoplay]}
              slidesPerView="auto"
              spaceBetween={8}
              pagination={{ clickable: true }}
              loop
              autoplay={{ delay: 3000 }}
            >
              {job?.companyPhoto.map((url, index) => (
                <SwiperSlide
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={scss.swiperSlide}
                >
                  <Image
                    src={url}
                    alt={url}
                    width="250"
                    height="150"
                    // fill
                  />
                </SwiperSlide>
              ))}
            </Swiper>
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
            onClick={onClose}
          >
            關閉
          </button>
        </div>

      </div>
    </Modal>

  );
}
