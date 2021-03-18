import { ErrorResponse, Photo, Photos } from 'pexels';
import { PhotoCardType } from '../types/commonTypes';
import { defaultPhotoParameters } from './constants/constants';
import { getLikes } from './storage/storagePhotoLikes';
import { getCollectPhotos } from './storage/storagePhotoCollect';

export function photoEditing(data: Photos & ErrorResponse): Array<PhotoCardType> {
  const photos: Array<PhotoCardType> = [];

  if (data && data.photos) {
    data.photos.forEach((photo: Photo) => {
      const obj = getPhotoByData(photo);
      photos.push(obj);
    });
  }

  return photos;
}

export function getPhotoByData(data: Photo): PhotoCardType {
  const obj: PhotoCardType = {
    phLink: data.photographer_url || defaultPhotoParameters.phLink,
    phNames: data.photographer || defaultPhotoParameters.phNames,
    src: data.src.original || defaultPhotoParameters.src,
    phPhotoLink: defaultPhotoParameters.phPhotoLink,
    photoId: data.id || defaultPhotoParameters.photoId,
  };

  return obj;
}

export function isUniquePhoto(lastPhotoState: PhotoCardType, lastPhotoNew: PhotoCardType): boolean {
  return JSON.stringify(lastPhotoNew) !== JSON.stringify(lastPhotoState);
}

export function getPhotoCardById(photos: Array<PhotoCardType>, id: number): PhotoCardType {
  const photoArr = photos.filter((photo) => {
    return photo.photoId === id;
  });

  const photo = photoArr[0];
  photo.isLiked = isLikedPhoto(id);
  photo.isCollect = isCollectPhotos(id);

  return photo;
}

function isLikedPhoto(id: number) {
  const liked = getLikes();
  return liked.includes(id);
}

function isCollectPhotos(id: number) {
  const liked = getCollectPhotos();
  return liked.includes(id);
}
