'use client';

import { useRef } from 'react';

import Image from 'next/image';
import man from '@/public/image/man.png';
import manShadow from '@/public/image/manShadow.png';
import heeloo from '@/public/image/heeloo.png';
import leftEye from '@/public/image/leftEye.png';
import rightEye from '@/public/image/rightEye.png';
import heroBg from '@/public/image/heroBg.png';

import scss from './index.module.scss';

const standardWidth = 1920;
const MAX_RADIUS = 7;

/**
 * 計算圓形位移後的座標
 *
 * 將一個二維向量的長度（距離）限制在指定的最大半徑（max）以內。它的核心原理是使用畢氏定理和向量縮放。
 */
function clampToRadius({ vectorX, vectorY, maxRadius }:{
  vectorX: number, // 滑鼠座標與眼睛座標的X向量
  vectorY: number, // 滑鼠座標與眼睛座標的Y向量
  maxRadius: number
}) {
  if (vectorX === 0 && vectorY === 0) {
    return { x: 0, y: 0 };
  }

  const dist = Math.sqrt(vectorX * vectorX + vectorY * vectorY); // 計算目前的距離 (向量長度)

  /**
 * 如果滑鼠距離 dist 小於或等於最大半徑 max（例如：距離 5，最大 10）：
 * max / dist 會大於 1。Math.min(1, 2) 結果是 1。代表不需要縮放（比例為 1）。
 *
 * 如果滑鼠距離 dist 大於最大半徑 max（例如：距離 20，最大 10）：
 * max / dist 會小於 1（這裡是 0.5）。Math.min(1, 0.5) 結果是 0.5。代表向量需要被等比例縮小。
 */
  const ratio = Math.min(1, maxRadius / dist); // 計算縮放比例
  const x = vectorX * ratio; // 縮放後的X座標
  const y = vectorY * ratio; // 縮放後的Y座標

  return { x, y };
}

const calcCoordinate = ({
  mouseX,
  mouseY,
  eyeEle,
  maxRadius,
}: {
  mouseX:number,
  mouseY:number,
  eyeEle: HTMLImageElement,
  maxRadius: number
}) => {
  const {
    left, width, top, height,
  } = eyeEle.getBoundingClientRect();
  const cx = left + width / 2; // 當前座標x
  const cy = top + height / 2; // 當前座標y
  const vectorX = mouseX - cx;
  const vectorY = mouseY - cy;

  const { x, y } = clampToRadius({
    vectorX,
    vectorY,
    maxRadius,
  });

  const theY = Math.min(0, y); // 最小Y最標為0，讓眼睛不會往下移動

  return {
    x,
    y: theY,
  };
};

export default function HeroImage() {
  const refHeroImage = useRef<HTMLDivElement>(null);
  const refLeftEye = useRef<HTMLImageElement>(null);
  const refRightEye = useRef<HTMLImageElement>(null);

  const moveEyes = ({ mouseX, mouseY }: { mouseX:number; mouseY:number }) => {
    if (!refLeftEye.current || !refRightEye.current || !refHeroImage.current) {
      return;
    }

    // 為了避免在小螢幕時眼睛移到眼眶外，所以根據螢幕寬度縮放眼睛移動的半徑
    const heroImageWidth = refHeroImage.current.getBoundingClientRect().width;
    const scaledRadius = MAX_RADIUS * (heroImageWidth / standardWidth);

    const { x: leftX, y: leftY } = calcCoordinate({
      mouseX,
      mouseY,
      eyeEle: refLeftEye.current,
      maxRadius: scaledRadius,
    });
    refLeftEye.current.style.transform = `translate(${leftX}px, ${leftY}px)`;

    const { x: rightX, y: rightY } = calcCoordinate({
      mouseX,
      mouseY,
      eyeEle: refRightEye.current,
      maxRadius: scaledRadius,
    });
    refRightEye.current.style.transform = `translate(${rightX}px, ${rightY}px)`;
  };

  const handleMouseMove = (e:React.MouseEvent) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    moveEyes({ mouseX, mouseY });
  };

  const handleTouchMove = (e:React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) {
      return;
    }

    const mouseX = touch.clientX;
    const mouseY = touch.clientY;
    moveEyes({ mouseX, mouseY });
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
          alt="leftEye"
          ref={refRightEye}
        />

      </div>
    </div>
  );
}
