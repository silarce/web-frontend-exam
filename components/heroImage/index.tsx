'use client';

import { useRef } from 'react';

import Image from 'next/image';
import man from '@/public/image/man.png';
import manShadow from '@/public/image/manShadow.png';
import heeloo from '@/public/image/heeloo.png';
import leftEye from '@/public/image/leftEye.png';
import rightEye from '@/public/image/rightEye.png';

import calcVectorCoordinate from '@/utils/calcCoordinate';
import calcEleVector from '@/utils/calcEleVector';

import scss from './index.module.scss';

// YAGNI 這兩個變數先不抽出去
const standardWidth = 1440;
const MAX_RADIUS = 5;

export default function HeroImage() {
  const refHeroImage = useRef<HTMLDivElement>(null);
  const refLeftEye = useRef<HTMLImageElement>(null);
  const refRightEye = useRef<HTMLImageElement>(null);

  const moveEyes = ({ mouseX, mouseY }: { mouseX:number; mouseY:number }) => {
    if (!refLeftEye.current || !refRightEye.current || !refHeroImage.current) {
      return;
    }

    // 為了避免在小螢幕時眼睛移到眼眶外，所以根據螢幕寬度縮放眼睛移動的最大半徑
    const heroImageWidth = refHeroImage.current.getBoundingClientRect().width;
    const scaledMaxRadius = MAX_RADIUS * (heroImageWidth / standardWidth);

    [refLeftEye, refRightEye].forEach((refEye) => {
      if (!refEye.current) {
        return;
      }

      const eyeEle = refEye.current;

      const { vectorX, vectorY } = calcEleVector({
        mouseX,
        mouseY,
        ele: eyeEle,
      });

      const { x, y } = calcVectorCoordinate({
        vectorX,
        vectorY,
        maxRadius: scaledMaxRadius,
      });

      const clampedY = Math.min(0, y); // 最小Y最標為0，讓眼睛不會往下移動

      eyeEle.style.transform = `translate(${x}px, ${clampedY}px)`;
    });
  };

  const handleMouseMove = (e:React.MouseEvent) => {
    moveEyes({ mouseX: e.clientX, mouseY: e.clientY });
  };

  const handleTouchMove = (e:React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      moveEyes({ mouseX: touch.clientX, mouseY: touch.clientY });
    }
  };

  const resetEyes = () => {
    if (refLeftEye.current) {
      refLeftEye.current.style.transform = 'unset';
    }
    if (refRightEye.current) {
      refRightEye.current.style.transform = 'unset';
    }
  };

  return (
    <div
      className={scss.heroImage}
      ref={refHeroImage}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetEyes}
      onTouchMove={handleTouchMove}
      onTouchEnd={resetEyes}
    >
      <Image className={scss.heeloo} src={heeloo} alt="heeloo" />
      <div className={scss.manContainer}>
        <Image className={scss.manShadow} src={manShadow} alt="manShadow" />
        <Image className={scss.man} src={man} alt="man" />
        <Image
          className={scss.leftEye}
          src={leftEye}
          alt="leftEye"
          ref={refLeftEye}
        />
        <Image
          className={scss.rightEye}
          src={rightEye}
          alt="rightEye"
          ref={refRightEye}
        />
      </div>
    </div>
  );
}
