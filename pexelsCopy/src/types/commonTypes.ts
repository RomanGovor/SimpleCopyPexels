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
}

export type ArrColumnsType = {
    colIndex: number
    height: number
    photos: Array<number>
}

export type commonStateType = homeStateType & categoryStateType;

export type LikesArrayType = Array<number> | never[];
