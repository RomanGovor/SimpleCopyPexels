import {RecentSearchsType} from "../../types/commonTypes";

export function getResentWords(): RecentSearchsType {
    // @ts-ignore
    const resent: RecentSearchsType = JSON.parse(localStorage.getItem('pexels/resent-searches'));
    return !resent ? [] : resent;
}

export function setResentWords(resent: RecentSearchsType) {
    localStorage.setItem('pexels/resent-searches', JSON.stringify(resent));
}

export function addResentWord(word: number): RecentSearchsType {
    const resentSearches: RecentSearchsType = getResentWords();

    if (resentSearches.length === 10) resentSearches.splice(0, 1);

    // @ts-ignore
    resentSearches.push(word);
    setResentWords(resentSearches);

    return resentSearches;
}
