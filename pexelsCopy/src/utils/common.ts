import {IHeaderContentItem} from "../types/commonTypes";
import {MAX_COUNT_PAGE} from "./constants/constants";

type RandomArrayType = Array<IHeaderContentItem> | Array<number> | undefined;

export function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

export function getRandomArray(len: number, count: number, defArr: Array<IHeaderContentItem>): Array<IHeaderContentItem> {
    const currentArr = defArr === undefined
        ? (new Array(len)).fill(1).map((a, i) => i) : [...defArr];

    const arr: Array<IHeaderContentItem> = [];
    for (let i = 0; i < count; i++) {
        const removed = currentArr.splice(getRandomInt(len - i) - 1, 1);
        // @ts-ignore
        arr.push(removed[0]);
    }
    return arr;
}
