import React, {useState} from "react";
import './Photos.scss'
import {PhotoCardType} from "../../interfaces/headerInterfaces";
import PhotoCard from "./PhotoCard/PhotoCard";
import PhotosColumn from "./PhotosColumn";
import {generatePhotoColumns} from "../../utils/generatePhotoColumns";


type PropsType = {
    photos: Array<PhotoCardType>,
    maxCountOfColumns: number
}

const Photos: React.FC<PropsType> = ({photos, maxCountOfColumns}) => {
    const [widthWindow, setWidthWindow] = useState(window.screen.width);
    const [countColumn, setCountColumn] = useState(3);

    const controlResize = (): void => {
        const temp = document.body.clientWidth;
        if ((temp >= 1070) && !(widthWindow >= 1070)) {
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

    controlResize();

    const arrColumns = generatePhotoColumns(countColumn, photos);
    const columns: Array<JSX.Element | undefined>= [];

    const getColumn = () => {
        for (let i = 0; i < arrColumns.length; i++) {
            const photosColumn = arrColumns[i].photos.map((index, i) => {
                return <PhotoCard src={photos[index].src} phLink={photos[index].phLink} phNames={photos[index].phNames}
                                  phPhotoLink={photos[index].phPhotoLink}/>
            })

            columns.push(<PhotosColumn photosElems={photosColumn} /> )
        }
    }

    getColumn();

    window.addEventListener('resize', () => {
        controlResize();
    })

    return (
        <div className={'photos'}>
            {columns}
        </div>
    )
}

export default Photos;
