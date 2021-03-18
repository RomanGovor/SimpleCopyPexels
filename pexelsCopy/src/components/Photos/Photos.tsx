import React, { useEffect, useState } from 'react';
import './Photos.scss';
import { useDispatch } from 'react-redux';
import {
  ArrColumnsType,
  CollectArrayType,
  LikesArrayType,
  PhotoCardType,
} from '../../types/commonTypes';
import PhotoCard from './PhotosColumn/PhotoCard/PhotoCard';
import PhotosColumn from './PhotosColumn/PhotosColumn';
import { getLikes, togglePhotoLike } from '../../utils/storage/storagePhotoLikes';
import { actionsCommon } from '../../redux/commonReducer';
import { getPhotoCardById } from '../../utils/photoEditing';
import { getCollectPhotos, toggleCollectPhoto } from '../../utils/storage/storagePhotoCollect';
import generatePhotoColumns from '../../utils/generatePhotoColumns';

type PropsType = {
  photos: Array<PhotoCardType>;
  maxCountOfColumns: number;
  likedPhotosArray: Array<number>;
  collectPhotos: Array<number>;
  isFetching: boolean;
  isBadRequest: boolean;
};

const getColumn = (
  arrColumns: Array<ArrColumnsType>,
  photos: Array<PhotoCardType>,
  likes: LikesArrayType,
  isFetching: boolean,
  isBadRequest: boolean,
  collectPhotos: CollectArrayType
): Array<JSX.Element | undefined> => {
  const columns: Array<JSX.Element | undefined> = [];

  for (let i = 0; i < arrColumns.length; i += 1) {
    const photosColumn = arrColumns[i].photos.map((index) => {
      const { photoId } = photos[index];
      const isLiked = likes.includes(photoId);
      const isCollect = collectPhotos.includes(photoId);

      return (
        <PhotoCard
          src={photos[index].src}
          key={photos[index].photoId * Math.random()}
          phLink={photos[index].phLink}
          phNames={photos[index].phNames}
          phPhotoLink={photos[index].phPhotoLink}
          photoId={photos[index].photoId}
          isLiked={isLiked}
          isCollect={isCollect}
        />
      );
    });

    columns.push(
      <PhotosColumn
        photosElems={photosColumn}
        isFetching={isFetching}
        isBadRequest={isBadRequest}
        key={i}
      />
    );
  }

  return columns;
};

const Photos: React.FC<PropsType> = (props) => {
  const {
    photos,
    maxCountOfColumns,
    likedPhotosArray,
    isFetching,
    isBadRequest,
    collectPhotos,
  } = props;

  const [widthWindow, setWidthWindow] = useState(2000);
  const [countColumn, setCountColumn] = useState(maxCountOfColumns);

  const arrColumns = generatePhotoColumns(countColumn, photos);

  const columns: Array<JSX.Element | undefined> = getColumn(
    arrColumns,
    photos,
    likedPhotosArray,
    isFetching,
    isBadRequest,
    collectPhotos
  );

  const controlResize = (maxColumns: number): void => {
    const temp = document.body.clientWidth;
    if (temp >= 1440 && !(widthWindow >= 1440) && maxColumns === 4) {
      setWidthWindow(temp);
      setCountColumn(4);
    } else if (temp >= 1070 && !(widthWindow >= 1070 && widthWindow <= 1440)) {
      setWidthWindow(temp);
      setCountColumn(3);
    } else if (temp < 1070 && temp >= 700 && !(widthWindow > 700 && widthWindow <= 1070)) {
      setWidthWindow(temp);
      setCountColumn(2);
    } else if (temp < 700 && widthWindow > 700) {
      setWidthWindow(temp);
      setCountColumn(1);
    }
  };

  useEffect(() => {
    controlResize(maxCountOfColumns);
    window.addEventListener('resize', () => {
      controlResize(maxCountOfColumns);
    });
  }, []);

  const dispatch = useDispatch();

  const onLikeClick = (id: number) => {
    togglePhotoLike(id);
    const likes = getLikes();
    dispatch(actionsCommon.setLikedPhotos(likes));
  };

  const onCollectClick = (id: number) => {
    toggleCollectPhoto(id);
    const collectPhotosTemp = getCollectPhotos();
    dispatch(actionsCommon.setCollectPhotos(collectPhotosTemp));
  };

  const onArticleClick = (id: number) => {
    const photo = getPhotoCardById(photos, id);
    console.log(photo);
    dispatch(actionsCommon.setPhotoModalCard(photo));
  };

  const onClickHandler = (event: any): void => {
    const target = event.target.closest('button');
    const article = event.target.closest('article');

    if (target?.classList?.contains('js-like')) {
      const photoId: number = +target.getAttribute('data-photoid');

      onLikeClick(photoId);
    } else if (target?.classList?.contains('js-collect')) {
      const photoId: number = +target.getAttribute('data-photoid');

      onCollectClick(photoId);
    } else if (article) {
      const photoId: number = +article.getAttribute('data-photoid');
      onArticleClick(photoId);
    }
  };

  return (
    <div className="photos" onClick={onClickHandler}>
      {columns}
    </div>
  );
};

export default Photos;
