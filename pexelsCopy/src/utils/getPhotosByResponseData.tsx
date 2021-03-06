import {PhotoCardType} from "../types/commonTypes";
import {defaultPhotoParameters} from "./constants/constants";
import {ErrorResponse, Photo, Photos} from "pexels";

export function getPhotosByResponseData(data: Photos | ErrorResponse): Array<PhotoCardType> {
    const photos: Array<PhotoCardType> = [];

    // @ts-ignore
    data?.photos.forEach((photo: Photo) => {
        const obj: PhotoCardType = {
            phLink: photo.photographer_url || defaultPhotoParameters.phLink,
            phNames: photo.photographer || defaultPhotoParameters.phNames,
            src: photo.src.landscape || defaultPhotoParameters.src,
            phPhotoLink: defaultPhotoParameters.phPhotoLink
        }
        photos.push(obj);
    });

    return photos;
}
