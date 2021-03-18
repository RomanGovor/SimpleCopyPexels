export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

export function getRandomArray<T>(len: number, count: number, defArr: Array<T>): Array<T | number> {
  const currentArr = defArr === undefined ? new Array(len).fill(1).map((a, i) => i) : [...defArr];
  const countTemp = count > len ? len : count;

  const arr: Array<T | number> = [];
  for (let i = 0; i < countTemp; i += 1) {
    const removed = currentArr.splice(getRandomInt(len - i) - 1, 1);
    arr.push(removed[0]);
  }
  return arr;
}
