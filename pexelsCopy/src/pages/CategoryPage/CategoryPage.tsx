import React, {useEffect, useState} from "react";
import {InitialStateType, updateCategoriesArrayPhotos} from "../../redux/categoryReducer";
import {withSuspense} from "../../components/common/Suspense/withSuspense";
import Navbar from "../../components/Navigation/Navbar";
import './CategoryPage.scss'
import {useDispatch} from "react-redux";
import {MAX_COUNT_PAGE} from "../../utils/constants/constants";
import Preloader from "../../components/common/Preloader/Preloader";
import {LikesArrayType} from "../../types/commonTypes";

type PropsType = {
    categoryPage: InitialStateType,
    query: string,
    likedPhotosArray: LikesArrayType
}

const Photos = React.lazy(() => import('../../components/Photos/Photos'));
const SuspendedPhotos = withSuspense(Photos);

const CategoryPage: React.FC<PropsType> = (props) => {
    const {photos, maxCountOfColumns} = props.categoryPage;
    const query = props.query;
    const title = photos.length === 0 ? `We Couldn't Find Anything For “${query}”` : query;
    const likedPhotos = props.likedPhotosArray;

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
            dispatch(updateCategoriesArrayPhotos(currentPage, query));
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
        <>
            <Navbar isMain={false}/>
            <div className={'category'}>
                <section className={'category__header'}>
                    <h1 className={'category__header__title'}>{title}</h1>
                </section>
                <section className={'category__grid'}>
                    <SuspendedPhotos photos={photos} maxCountOfColumns={maxCountOfColumns} likedPhotosArray={likedPhotos}/>
                    {!isFetching ? <Preloader /> : null}
                </section>
            </div>
        </>
    );
}

export default CategoryPage;
