import React, {useEffect, useState} from "react";
import {actionsCategories, InitialStateType} from "../../redux/categoryReducer";
import Navbar from "../../components/Navigation/Navbar";
import './CategoryPage.scss'
import {InitialStateType as CommonStateType} from "../../redux/commonReducer";
import PhotosContainer from "../../components/Photos/PhotosContainer";

type PropsType = {
    categoryPage: InitialStateType,
    query: string,
    common: CommonStateType
}

const CategoryPage: React.FC<PropsType> = (props) => {
    const {photos, maxCountOfColumns} = props.categoryPage;
    const query = props.query;
    const title = photos.length === 0 ? `We Couldn't Find Anything For “${query}”` : query;
    const [isBadRequest, setBadRequest] = useState(false);

    useEffect(() => {
        if (query !== title) setBadRequest(true);
        else setBadRequest(false);
    }, [title]);

    const likedPhotos = props.common.likedPhotos;
    const collectPhotos = props.common.collectPhotos;

    return (
        <>
            <Navbar isMain={false} common={props.common}/>
            <div className={'category'}>
                <section className={'category__header'}>
                    <h1 className={'category__header__title'}>{title}</h1>
                </section>
                <section className={'category__grid'}>
                    <PhotosContainer
                        photos={photos}
                        maxCountOfColumns={maxCountOfColumns}
                        likedPhotosArray={likedPhotos}
                        collectPhotos={collectPhotos}
                        query={query}
                        isBadRequest={isBadRequest}
                        updatePhotos={actionsCategories.asyncUpdateArrayPhotos}/>
                </section>
            </div>
        </>
    );
}

export default CategoryPage;
