import React, {useEffect} from 'react';
import {connect, useDispatch} from "react-redux";
import {actions} from "./redux/homeReducer";
import {withSuspense} from "./components/common/Suspense/withSuspense";
import {getRandomArray} from "./utils/common";
import {defaultPhotoParameters, mainCategories, trendingCategories} from "./utils/constants/constants";
import {Redirect, Route, Switch} from 'react-router-dom'
import {getLikes} from "./utils/storage/storagePhotoLikes";
import {actionsCommon, initialState, InitialStateType as CommonStateType} from "./redux/commonReducer";
import {getResentWords} from "./utils/storage/storageRecentWords";
import Modal from "./components/Modal/Modal";
import {AppStateType} from "./redux/store";
import {compose} from "redux";
import {isUniquePhoto} from "./utils/photoEditing";
import {getCollectPhotos} from "./utils/storage/storagePhotoCollect";
import {getLanguage} from "./utils/storage/storageLang";

type PropsType = {
    common: CommonStateType
}

const HomePageContainer = React.lazy(() => import('./pages/HomePage/HomePageContainer'));
const CategoryPageContainer = React.lazy(() => import('./pages/CategoryPage/CategoryPageContainer'));
const CollectionsPageContainer = React.lazy(() => import('./pages/CollectionsPage/CollectionsPageContainer'));

const SuspendedCollectionsPage = withSuspense(CollectionsPageContainer);
const SuspendedHomePage = withSuspense(HomePageContainer);
const SuspendedCategoryPage = withSuspense(CategoryPageContainer);

const App: React.FC<PropsType> = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.asyncSetHeaderPhoto());

        const recommendCategories = getRandomArray(mainCategories.length, 7, mainCategories);
        dispatch(actions.setRecommendCategories(recommendCategories));

        const trendingSearches = getRandomArray(trendingCategories.length, 10, trendingCategories);
        dispatch(actionsCommon.setTrendingCategories(trendingSearches));

        const likes = getLikes();
        dispatch(actionsCommon.setLikedPhotos(likes));

        const collectPhotos = getCollectPhotos();
        dispatch(actionsCommon.setCollectPhotos(collectPhotos));

        const resentSearches = getResentWords();
        dispatch(actionsCommon.setResentSearches(resentSearches));

        const lang = getLanguage();
        dispatch(actionsCommon.setLanguage(lang));
    }, []);

    useEffect(() => {
        if (isUniquePhoto(props.common.photoModalCard, defaultPhotoParameters)) {
            dispatch(actionsCommon.setOpenModalFlag(true));
        }
    }, [props.common.photoModalCard]);

    return (
        <div className="App">
            <Switch>
                <Route exact path='/'
                       render={() => <SuspendedHomePage />}/>

                <Route exact path='/category/:query?'
                       render={() => <SuspendedCategoryPage />}/>

                <Route exact path='/collections'
                       render={() => <SuspendedCollectionsPage />}/>

                <Route exact path='*'
                       render={() => <div>404 NOT FOUND</div>}/>
            </Switch>

            <Modal isOpenModal={props.common.isOpenModal}
                   photo={props.common.photoModalCard}
                   vocabulary={props.common.vocabulary.modal} />
        </div>
    );
}

const mapStateToProps = (state: AppStateType) => {
    return {
        common: state.common
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actionsCommon})
)(App);
