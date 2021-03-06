import React, {useEffect, useState} from "react";
import './Photos.scss'
import {ArrColumnsType, PhotoCardType} from "../../types/commonTypes";
import PhotoCard from "./PhotosColumn/PhotoCard/PhotoCard";
import PhotosColumn from "./PhotosColumn/PhotosColumn";
import {generatePhotoColumns} from "../../utils/generatePhotoColumns";
import {useDispatch} from "react-redux";
import {getPhoto} from "../../redux/homeReducer";


type PropsType = {
    photos: Array<PhotoCardType>,
    maxCountOfColumns: number
}

const getColumn = (arrColumns: Array<ArrColumnsType>, photos: Array<PhotoCardType>): Array<JSX.Element | undefined> => {
    const columns: Array<JSX.Element | undefined>= [];

    for (let i = 0; i < arrColumns.length; i++) {
        const photosColumn = arrColumns[i].photos.map((index) => {
            return <PhotoCard src={photos[index].src} phLink={photos[index].phLink} phNames={photos[index].phNames}
                              phPhotoLink={photos[index].phPhotoLink}/>
        })

        columns.push(<PhotosColumn photosElems={photosColumn} /> )
    }

    return columns;
}

const Photos: React.FC<PropsType> = ({photos, maxCountOfColumns}) => {
    const [widthWindow, setWidthWindow] = useState(window.screen.width);
    const [countColumn, setCountColumn] = useState(maxCountOfColumns);

    const arrColumns = generatePhotoColumns(countColumn, photos);
    const columns: Array<JSX.Element | undefined> = getColumn(arrColumns, photos);

    const controlResize = (maxColumns: number): void => {
        const temp = document.body.clientWidth;

        if ((temp >= 1440) && !(widthWindow >= 1440) && (maxColumns === 4)) {
            setWidthWindow(temp);
            setCountColumn(4);
        } else if ((temp >= 1070) && !(widthWindow >= 1070)) {
            setWidthWindow(temp);
            setCountColumn(3);
        } else if ((temp < 1070) && (temp >= 600) && !((widthWindow > 600) && (widthWindow <= 1070))) {
            setWidthWindow(temp);
            setCountColumn(2);
        } else if ((temp < 600) && !(widthWindow < 600)) {
            setWidthWindow(temp);
            setCountColumn(1);
        }
    }

    controlResize(maxCountOfColumns);

    useEffect(() => {
        window.addEventListener('resize', () => {
            controlResize(maxCountOfColumns);
        });
       // return window.removeEventListener('resize', controlResize);
    }, [])



    // const dispatch = useDispatch();
    //
    // const onclick = () => {
    //     dispatch(getPhoto('Nature'));
    // }

    return (
        <div className={'photos'}>
            {columns}
        </div>
    )
}

export default Photos;
