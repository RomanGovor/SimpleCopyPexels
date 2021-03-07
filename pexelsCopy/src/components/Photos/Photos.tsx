import React, {useEffect, useState} from "react";
import './Photos.scss'
import {ArrColumnsType, PhotoCardType} from "../../types/commonTypes";
import PhotoCard from "./PhotosColumn/PhotoCard/PhotoCard";
import PhotosColumn from "./PhotosColumn/PhotosColumn";
import {generatePhotoColumns} from "../../utils/generatePhotoColumns";


type PropsType = {
    photos: Array<PhotoCardType>,
    maxCountOfColumns: number
}

const getColumn = (arrColumns: Array<ArrColumnsType>, photos: Array<PhotoCardType>): Array<JSX.Element | undefined> => {
    const columns: Array<JSX.Element | undefined>= [];

    for (let i = 0; i < arrColumns.length; i++) {
        const photosColumn = arrColumns[i].photos.map((index) => {
            return <PhotoCard src={photos[index].src}
                              phLink={photos[index].phLink}
                              phNames={photos[index].phNames}
                              phPhotoLink={photos[index].phPhotoLink}
                              photoId={photos[index].photoId}/>
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

    return (
        <div className={'photos'}>
            {columns}
        </div>
    )
}

export default Photos;










// import {AppStateType} from "../../redux/store";
// import {compose} from "redux";
// import {connect, useDispatch} from "react-redux";
// // import {actions} from "../../redux/homeReducer";
// import React, {useEffect, useState} from "react";
// import {MAX_COUNT_PAGE} from "../../utils/constants/constants";
// import {updateArrayPhotos} from "../../redux/homeReducer";
// import {withSuspense} from "../common/Suspense/withSuspense";
// import {commonStateType} from "../../types/commonTypes";
//
// type mapStateType = {
//     initialPage: commonStateType,
//
// }
//
// type PropsType = mapStateType;
//
//
// const Photos = React.lazy(() => import('./Photos'));
// const SuspendedPhotos = withSuspense(Photos);
//
// const PhotosContainer:React.FC<PropsType> = (props) => {
//     const {photos, maxCountOfColumns} = props.initialPage;
//
//     const [currentPage, setCurrentPage] = useState(1);
//     const [isFetching, setFetching] = useState(true);
//
//     const dispatch = useDispatch();
//
//     const scrollHandler = (event: any) => {
//         if (event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 100
//             && currentPage < MAX_COUNT_PAGE) {
//             setFetching(true);
//         }
//     }
//
//     useEffect(() => {
//         if (isFetching) {
//             dispatch(updateArrayPhotos(currentPage));
//             setCurrentPage(prevState => prevState + 1);
//             setFetching(false);
//         }
//     }, [isFetching]);
//
//     useEffect(() => {
//         document.addEventListener('scroll', scrollHandler);
//         return function () {
//             document.removeEventListener('scroll', scrollHandler);
//         }
//     }, []);
//
//
//     return (
//         <SuspendedPhotos photos={photos} maxCountOfColumns={maxCountOfColumns}/>
//     )
// }
//
// const mapStateToProps = (state: AppStateType) => {
//     return {
//         initialPage: state.categoryPage
//     }
// }
//
// export default compose<React.ComponentType>(
//     connect(mapStateToProps, {...actions})
// )(PhotosContainer);
