import Image from 'next/image';
import man from '@/public/image/man.png';
import manShadow from '@/public/image/manShadow.png';
import heeloo from '@/public/image/heeloo.png';
import leftEye from '@/public/image/leftEye.png';
import rightEye from '@/public/image/rightEye.png';
import heroBg from '@/public/image/heroBg.png';

import scss from './index.module.scss';

function LeftEye() {
  return (
    <Image className={scss.leftEye} src={leftEye} alt="leftEye" />
  );
}
function RightEye() {
  return (
    <Image className={scss.rightEye} src={rightEye} alt="leftEye" />
  );
}

export default function HeroImage() {
  return (
    <div className={scss.heroImage}>
      <div className={scss.manContainer}>
        <Image className={scss.manShadow} src={manShadow} alt="manShadow" />
        <Image className={scss.man} src={man} alt="man" />
        <LeftEye />
        <RightEye />
      </div>
    </div>
  );
}
