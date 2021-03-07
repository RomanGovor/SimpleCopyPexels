import {PhotoCardType} from "../types/commonTypes";
import {defaultPhotoParameters} from "./constants/constants";
import {ErrorResponse, Photo, Photos} from "pexels";

export function photoEditing(data: Photos | ErrorResponse): Array<PhotoCardType> {
    const photos: Array<PhotoCardType> = [];

    // @ts-ignore
    data?.photos.forEach((photo: Photo) => {
        const obj: PhotoCardType = {
            phLink: photo.photographer_url || defaultPhotoParameters.phLink,
            phNames: photo.photographer || defaultPhotoParameters.phNames,
            src: photo.src.original || defaultPhotoParameters.src,
            phPhotoLink: defaultPhotoParameters.phPhotoLink,
            photoId: photo.id || defaultPhotoParameters.photoId
        }
        photos.push(obj);
    });

    console.log(photos);

    return photos;
}


export function isUniquePhoto(lastPhotoState: PhotoCardType, lastPhotoNew: PhotoCardType): Boolean {
    return JSON.stringify(lastPhotoNew) !== JSON.stringify(lastPhotoState);
}
