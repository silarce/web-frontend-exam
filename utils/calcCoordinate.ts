/**
 * 計算圓形位移後的座標
 *
 * 將一個二維向量的長度（距離）限制在指定的最大半徑（max）以內。
 * 它的核心原理是使用畢氏定理和向量縮放。
 */
function calcVectorCoordinate({ vectorX, vectorY, maxRadius }:{
  vectorX: number, // X向量
  vectorY: number, // Y向量
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

export default calcVectorCoordinate;
