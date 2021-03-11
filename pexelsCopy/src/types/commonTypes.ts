import {InitialStateType as homeStateType} from "../redux/homeReducer";
import {InitialStateType as categoryStateType} from "../redux/categoryReducer";

export interface IHeaderContentItem {
    link: string,
    category: string
}

export type PhotoCardType = {
    src: string
    phLink: string
    phPhotoLink?: string
    phNames: string
    photoId: number
    isLiked?: boolean
}

export type ArrColumnsType = {
    colIndex: number
    height: number
    photos: Array<number>
}

export type TrendingSearchesType = {
    word: string
    img: string
}

export interface ISearchBarType {
    isBigSearchBar?: boolean,
    suggestionWords?: Array<string>,
    resentSearches?: Array<string>,
    trendingSearches: Array<TrendingSearchesType>,
    value: string,
    setInput: (value: string) => void
}

export type commonStateType = homeStateType & categoryStateType;

export type LikesArrayType = Array<number> | never[];

export type RecentSearchsType = Array<string> | never[];
