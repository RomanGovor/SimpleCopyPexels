import React, {useEffect, useState} from "react";
import './Photos.scss'
import {ArrColumnsType, CollectArrayType, LikesArrayType, PhotoCardType} from "../../types/commonTypes";
import PhotoCard from "./PhotosColumn/PhotoCard/PhotoCard";
import PhotosColumn from "./PhotosColumn/PhotosColumn";
import {generatePhotoColumns} from "../../utils/generatePhotoColumns";
import {getLikes, togglePhotoLike} from "../../utils/storage/storagePhotoLikes";
import {useDispatch} from "react-redux";
import {actionsCommon} from "../../redux/commonReducer";
import {getPhotoCardById} from "../../utils/photoEditing";
import {getCollectPhotos, toggleCollectPhoto} from "../../utils/storage/storagePhotoCollect";


type PropsType = {
    photos: Array<PhotoCardType>,
    maxCountOfColumns: number,
    likedPhotosArray: Array<number>,
    collectPhotos: Array<number>,
    isFetching: boolean,
    isBadRequest: boolean,
}

const getColumn = (arrColumns: Array<ArrColumnsType>, photos: Array<PhotoCardType>, likes: LikesArrayType,
                   isFetching: boolean, isBadRequest: boolean, collectPhotos: CollectArrayType): Array<JSX.Element | undefined> => {
    const columns: Array<JSX.Element | undefined>= [];

    for (let i = 0; i < arrColumns.length; i++) {
        const photosColumn = arrColumns[i].photos.map((index) => {

            // @ts-ignore
            const photoId: number & never = photos[index].photoId
            const isLiked = likes.includes(photoId);
            const isCollect = collectPhotos.includes(photoId);

            return <PhotoCard src={photos[index].src}
                              key={photos[index].photoId}
                              phLink={photos[index].phLink}
                              phNames={photos[index].phNames}
                              phPhotoLink={photos[index].phPhotoLink}
                              photoId={photos[index].photoId}
                              isLiked={isLiked}
                              isCollect={isCollect} />
        });

        columns.push(<PhotosColumn photosElems={photosColumn} isFetching={isFetching} isBadRequest={isBadRequest}/> )
    }

    return columns;
}

const Photos: React.FC<PropsType> = (props) => {
    const {photos, maxCountOfColumns, likedPhotosArray, isFetching,isBadRequest, collectPhotos} = props;

    const [widthWindow, setWidthWindow] = useState(2000);
    const [countColumn, setCountColumn] = useState(maxCountOfColumns);

    const arrColumns = generatePhotoColumns(countColumn, photos);
    const columns: Array<JSX.Element | undefined> = getColumn(arrColumns, photos, likedPhotosArray, isFetching, isBadRequest, collectPhotos);

    const controlResize = (maxColumns: number): void => {
        const temp = document.body.clientWidth;
        if ((temp >= 1440) && !(widthWindow >= 1440) && (maxColumns === 4)) {
            setWidthWindow(temp);
            setCountColumn(4);
        } else if ((temp >= 1070) && !(widthWindow >= 1070 && widthWindow <= 1440)) {
            setWidthWindow(temp);
            setCountColumn(3);
        } else if ((temp < 1070) && (temp >= 700) && !((widthWindow > 700) && (widthWindow <= 1070))) {
            setWidthWindow(temp);
            setCountColumn(2);
        } else if ((temp < 700) && (widthWindow > 700)) {
            setWidthWindow(temp);
            setCountColumn(1);
        }
    }

    useEffect(() => {
        controlResize(maxCountOfColumns);
        window.addEventListener('resize', () => {
            controlResize(maxCountOfColumns);
        });
       // return window.removeEventListener('resize', controlResize);
    }, []);

    const dispatch = useDispatch();

    const onClick = (event: any): void => {
        const target = event.target.closest('button');
        const article = event.target.closest('article');

        if (target?.classList?.contains('js-like')) {
            const photoId: number = +(target.getAttribute('data-photoId'));

            // @ts-ignore
            togglePhotoLike(photoId)
            const likes = getLikes();

            dispatch(actionsCommon.setLikedPhotos(likes))
        } else if (target?.classList?.contains('js-collect')) {
            const photoId: number = +(target.getAttribute('data-photoId'));

            // @ts-ignore
            toggleCollectPhoto(photoId);
            const collectPhotos = getCollectPhotos();

            dispatch(actionsCommon.setCollectPhotos(collectPhotos))
        } else if (article) {
            const photoId: number = +(article.getAttribute('data-photoId'));

            const photo = getPhotoCardById(photos, photoId);
            dispatch(actionsCommon.setPhotoModalCard(photo));
        }
    }

    return (
        <div className={'photos'} onClick={onClick}>
            {columns}
        </div>
    )
}

export default Photos;
