import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navigation/Navbar";
import '../CategoryPage/CategoryPage.scss';
import {InitialStateType as CommonStateType} from "../../redux/commonReducer";
import PhotosContainer from "../../components/Photos/PhotosContainer";
import { InitialStateType } from "../../redux/collectionsReducer";
import Photos from "../../components/Photos/Photos";

type PropsType = {
    collectionsPage: InitialStateType,
    common: CommonStateType
}

const CategoryPage: React.FC<PropsType> = (props) => {
    const {photos, maxCountOfColumns} = props.collectionsPage;
    const [isBadRequest, setBadRequest] = useState(false);

    const likedPhotos = props.common.likedPhotos;
    const collectPhotos = props.common.collectPhotos;

    return (
        <>
            <Navbar isMain={false} common={props.common}/>
            <div className={'category'}>
                <section className={'category__header'}>
                    <h1 className={'category__header__title'}>Collection</h1>
                </section>
                <section className={'category__grid'}>
                    <Photos
                        photos={photos}
                        maxCountOfColumns={maxCountOfColumns}
                        likedPhotosArray={likedPhotos}
                        collectPhotos={collectPhotos}
                        isBadRequest={isBadRequest}
                        isFetching={true}/>
                </section>
            </div>
        </>
    );
}

export default CategoryPage;
