import React, {useEffect, useState} from "react";
import './HomePage.scss';
import {InitialStateType, updateArrayPhotos} from "../../redux/homeReducer";
import {InitialStateType as CommonStateType} from "../../redux/commonReducer";

import UnderlinedTabs from "../../components/UnderlinedTabs/UnderlinedTabs";
import TitleTabs from "./TitleTabs/TitleTabs";
import {withSuspense} from "../../components/common/Suspense/withSuspense";
import Navbar from "../../components/Navigation/Navbar";
import PhotosContainer from "../../components/Photos/PhotosContainer";

type PropsType = {
    homePage: InitialStateType,
    common: CommonStateType
}

const Header = React.lazy(() => import('../../components/Header/Header'));
const SuspendedHeader = withSuspense(Header);

const HomePage: React.FC<PropsType> = (props) => {
    const {photos, headerPhoto, maxCountOfColumns, recommendCategories} = props.homePage;
    const likedPhotosArray: Array<number> = props.common.likedPhotos;
    const collectPhotos: Array<number> = props.common.collectPhotos;

    const vocabularyUnderlinedTabs = props.common.vocabulary.underlineTabs;
    const titleTabslinedTabs = props.common.vocabulary.homePage;

    return (
        <>
            <Navbar isMain={true} common={props.common}/>
            <SuspendedHeader headerPhoto={headerPhoto} recommendCategories={recommendCategories} common={props.common}/>
            <UnderlinedTabs vocabulary={vocabularyUnderlinedTabs}/>
            <div className={'container home-page'}>
                <TitleTabs vocabulary={titleTabslinedTabs}/>
                <PhotosContainer photos={photos}
                                 maxCountOfColumns={maxCountOfColumns}
                                 likedPhotosArray={likedPhotosArray}
                                 collectPhotos={collectPhotos}
                                 isBadRequest={false}
                                 updatePhotos={updateArrayPhotos}/>
            </div>
        </>
    );
}

export default HomePage;
