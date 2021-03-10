import React, {useEffect, useState} from "react";
import './HomePage.scss';
import {InitialStateType, updateArrayPhotos} from "../../redux/homeReducer";
import {InitialStateType as CommonStateType} from "../../redux/commonReducer";

import UnderlinedTabs from "../../components/UnderlinedTabs/UnderlinedTabs";
import TitleTabs from "./TitleTabs/TitleTabs";
import {useDispatch} from "react-redux";
import {MAX_COUNT_PAGE} from "../../utils/constants/constants";
import Preloader from "../../components/common/Preloader/Preloader";
import {withSuspense} from "../../components/common/Suspense/withSuspense";
import Navbar from "../../components/Navigation/Navbar";

type PropsType = {
    homePage: InitialStateType,
    common: CommonStateType
}

const Photos = React.lazy(() => import('../../components/Photos/Photos'));
const Header = React.lazy(() => import('../../components/Header/Header'));

const SuspendedPhotos = withSuspense(Photos);
const SuspendedHeader = withSuspense(Header);

const HomePage: React.FC<PropsType> = (props) => {
    const {photos, headerPhoto, maxCountOfColumns, recommendCategories} = props.homePage;
    const likedPhotosArray: Array<number> = props.common.likedPhotos;

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
            dispatch(updateArrayPhotos(currentPage));
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
            <Navbar isMain={true}/>
            <SuspendedHeader headerPhoto={headerPhoto} recommendCategories={recommendCategories}/>
            <UnderlinedTabs />
            <div className={'container home-page'}>
                <TitleTabs />
                <SuspendedPhotos photos={photos} maxCountOfColumns={maxCountOfColumns} likedPhotosArray={likedPhotosArray}/>
                {!isFetching ? <Preloader /> : null}
            </div>
        </>
    );
}

export default HomePage;
