import React, {useEffect, useState} from "react";
import './Photos.scss'
import {ArrColumnsType, LikesArrayType, PhotoCardType} from "../../types/commonTypes";
import PhotoCard from "./PhotosColumn/PhotoCard/PhotoCard";
import PhotosColumn from "./PhotosColumn/PhotosColumn";
import {generatePhotoColumns} from "../../utils/generatePhotoColumns";
import {getLikes, togglePhotoLike} from "../../utils/storage/storagePhotoLikes";
import {useDispatch} from "react-redux";
import {actionsCommon} from "../../redux/commonReducer";
import {getPhotoCardById} from "../../utils/photoEditing";


type PropsType = {
    photos: Array<PhotoCardType>,
    maxCountOfColumns: number,
    likedPhotosArray: Array<number>,
    isFetching: boolean,
    isBadRequest: boolean
}

const getColumn = (arrColumns: Array<ArrColumnsType>, photos: Array<PhotoCardType>,
                   likes: LikesArrayType, isFetching: boolean, isBadRequest: boolean): Array<JSX.Element | undefined> => {
    const columns: Array<JSX.Element | undefined>= [];

    for (let i = 0; i < arrColumns.length; i++) {
        const photosColumn = arrColumns[i].photos.map((index) => {

            // @ts-ignore
            const photoId: number & never = photos[index].photoId
            const isLiked = likes.includes(photoId);

            return <PhotoCard src={photos[index].src}
                              key={photos[index].photoId}
                              phLink={photos[index].phLink}
                              phNames={photos[index].phNames}
                              phPhotoLink={photos[index].phPhotoLink}
                              photoId={photos[index].photoId}
                              isLiked={isLiked}/>
        });

        columns.push(<PhotosColumn photosElems={photosColumn} isFetching={isFetching} isBadRequest={isBadRequest}/> )
    }

    return columns;
}

const Photos: React.FC<PropsType> = ({photos, maxCountOfColumns, likedPhotosArray, isFetching,isBadRequest}) => {
    const [widthWindow, setWidthWindow] = useState(2000);
    const [countColumn, setCountColumn] = useState(maxCountOfColumns);

    const arrColumns = generatePhotoColumns(countColumn, photos);
    const columns: Array<JSX.Element | undefined> = getColumn(arrColumns, photos, likedPhotosArray, isFetching, isBadRequest);

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
