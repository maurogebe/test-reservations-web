export const getIndexOfLineup = (lineup: number[], rowIndex: number, colIndex: number): number => {
  let sum = 0;
  for (let idx = 0; idx < rowIndex; idx++) {
    sum += lineup[idx]
  }
  return sum + colIndex;
}