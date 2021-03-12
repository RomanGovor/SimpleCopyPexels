import React, {useEffect, useState} from "react";
import {InitialStateType, updateCategoriesArrayPhotos} from "../../redux/categoryReducer";
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
    // const [title, setTitle] = useState(query);

    // if (photos.length === 0) {
    //     setTitle(`We Couldn't Find Anything For “${query}”`);
    //     setBadRequest(true);
    // }

    useEffect(() => {
        if (query !== title) setBadRequest(true);
        else setBadRequest(false);
    }, [title]);

    const likedPhotos = props.common.likedPhotos;

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
                        query={query}
                        isBadRequest={isBadRequest}
                        updatePhotos={updateCategoriesArrayPhotos}/>
                </section>
            </div>
        </>
    );
}

export default CategoryPage;
