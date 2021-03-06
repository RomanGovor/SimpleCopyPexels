export interface IHeaderContentItem {
    link: string,
    category: string
}

export type PhotoCardType = {
    src: string
    phLink: string
    phPhotoLink?: string
    phNames: string
}

export type ArrColumnsType = {
    colIndex: number
    height: number
    photos: Array<number>
}


