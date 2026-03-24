import { useState } from 'react';

import DOMPurify from 'dompurify';

import Modal from '@mui/material/Modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

import ErrorMessage from '@/components/errorMessage';

import { useApiGetJobById } from '@/apiClient/hook/useGetJobs';

import scss from './index.module.scss';

type JobInfoProps = {
  id: string | undefined;
  onClose: () => void;
};

export default function JobInfo(
  { id, onClose }:JobInfoProps,

) {
  const { job, error } = useApiGetJobById({ id });

  const [zoomUrl, setZoomUrl] = useState<string | null>(null);

  return (
    <Modal open={!!id} onClose={onClose}>
      <div className={scss.container}>

        <div className={scss.title}>
          <span>詳細資訊</span>
        </div>
        {/*  */}

        {error && (
        <ErrorMessage>
          {error}
          MEOW
        </ErrorMessage>
        )}

        {!error && (
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
                    className={scss.image}
                    src={url}
                    alt={url}
                    width={250}
                    height={150}
                    onClick={() => {
                      setZoomUrl(url);
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className={scss.desc}>
            <span>工作內容</span>
            <div
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job?.description ?? '') }}
              className={scss.richText}
            />
          </div>

        </div>

        )}

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

        <Modal open={!!zoomUrl} onClose={() => setZoomUrl(null)}>
          <div>
            {zoomUrl
            && (
            <Image
              className={scss.bigImage}
              src={zoomUrl}
              alt={zoomUrl}
              width={250}
              height={150}
              // 加了unoptimized才可以在新分頁開啟圖片
              // 但是取得的圖卻跟原本不一樣了
              // unoptimized
            />
            )}
          </div>
        </Modal>

      </div>
    </Modal>

  );
}
