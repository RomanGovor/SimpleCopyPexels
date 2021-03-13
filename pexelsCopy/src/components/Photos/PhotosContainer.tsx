import {connect, useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {MAX_COUNT_PAGE} from "../../utils/constants/constants";
import {withSuspense} from "../common/Suspense/withSuspense";
import {PhotoCardType} from "../../types/commonTypes";
import {ThunkType as HomeThunkType} from "../../redux/homeReducer";
import {ThunkType as CategoryThunkType} from "../../redux/categoryReducer";

type mapStateType = {
    photos: Array<PhotoCardType>,
    maxCountOfColumns: number,
    likedPhotosArray: Array<number>,
    collectPhotos: Array<number>,
    query?: string,
    isBadRequest: boolean
    // updatePhotos: (page: number, query?: string) => CategoryThunkType & HomeThunkType
    updatePhotos: (page: number, query?: string) => any
}

type PropsType = mapStateType;

const Photos = React.lazy(() => import('./Photos'));
const SuspendedPhotos = withSuspense(Photos);

const PhotosContainer:React.FC<PropsType> = (props) => {
    const {photos, maxCountOfColumns, updatePhotos,isBadRequest, likedPhotosArray, collectPhotos} = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [isFetching, setFetching] = useState(true);

    const dispatch = useDispatch();

    const scrollHandler = (event: any) => {
        if (event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 100
            && currentPage < MAX_COUNT_PAGE) {
            setFetching(true);
        }
    }

    useEffect(() => {
        if (isFetching) {
            if (props.query) {
                dispatch(updatePhotos(currentPage, props.query));
            } else {
                dispatch(updatePhotos(currentPage));
            }

            setCurrentPage(prevState => prevState + 1);
            setFetching(false);
        }
    }, [isFetching]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, []);


    return (
        <SuspendedPhotos isFetching={isFetching}
                         photos={photos}
                         isBadRequest={isBadRequest}
                         maxCountOfColumns={maxCountOfColumns}
                         likedPhotosArray={likedPhotosArray}
                         collectPhotos={collectPhotos} />
    )
}

export default PhotosContainer;

// const mapStateToProps = (state: AppStateType) => {
//     return {
//         initialPage: state.categoryPage
//     }
// }
//
// export default compose<React.ComponentType>(
//     connect(mapStateToProps, {...actions})
// )(PhotosContainer);

