/**
 * 計算滑鼠座標與元素座標的向量
 */
const calcEleVector = ({
  mouseX,
  mouseY,
  ele,
}: {
  mouseX:number,
  mouseY:number,
  ele: HTMLElement,

}) => {
  const {
    left, width, top, height,
  } = ele.getBoundingClientRect();
  const cx = left + width / 2; // 當前座標x
  const cy = top + height / 2; // 當前座標y
  const vectorX = mouseX - cx;
  const vectorY = mouseY - cy;

  return {
    vectorX,
    vectorY,
  };
};

export default calcEleVector;
