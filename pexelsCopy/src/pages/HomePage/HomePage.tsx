import React, {useEffect, useState} from "react";
import './HomePage.scss';
import Photos from "../../components/Photos/Photos";
import {InitialStateType, updateArrayPhotos} from "../../redux/homeReducer";
import Header from "../../components/Header/Header";
import UnderlinedTabs from "../../components/UnderlinedTabs/UnderlinedTabs";
import TitleTabs from "./TitleTabs/TitleTabs";
import {useDispatch} from "react-redux";
import {MAX_COUNT_PAGE} from "../../utils/constants/constants";
import Preloader from "../../components/common/Preloader/Preloader";
import {withSuspense} from "../../components/common/Suspense/withSuspense";

type PropsType = {
    homePage: InitialStateType
}

const SuspendedPhotos = withSuspense(Photos);


const HomePage: React.FC<PropsType> = (props) => {
    const {photos, headerPhoto, maxCountOfColumns} = props.homePage;

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
            <Header headerPhoto={headerPhoto}/>
            <UnderlinedTabs />
            <div className={'container home-page'}>
                <TitleTabs />
                <SuspendedPhotos photos={photos} maxCountOfColumns={maxCountOfColumns}/>
                {!isFetching ? <Preloader /> : null}
            </div>
        </>
    );
}

export default HomePage;
