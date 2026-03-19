import Image from 'next/image';
import man from '@/public/image/man.png';
import manShadow from '@/public/image/manShadow.png';
import heeloo from '@/public/heeloo.png';
import heroBg from '@/public/heroBg.png';
import leftEye from '@/public/leftEye.png';
import rightEye from '@/public/rightEye.png';

import scss from './index.module.scss';

export default function HeroImage() {
  return (
    <div className={scss.heroImage}>
      <div className={scss.manContainer}>
        <Image className={scss.manShadow} src={manShadow} alt="manShadow" />
        <Image className={scss.man} src={man} alt="man" />
      </div>
    </div>
  );
}
