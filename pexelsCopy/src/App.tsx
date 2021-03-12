import React, {useEffect} from 'react';
import {connect, useDispatch} from "react-redux";
import {actions, setHeaderPhoto} from "./redux/homeReducer";
import {withSuspense} from "./components/common/Suspense/withSuspense";
import {getRandomArray} from "./utils/common";
import {mainCategories, trendingCategories} from "./utils/constants/constants";
import {Redirect, Route, Switch} from 'react-router-dom'
import {getLikes} from "./utils/storage/storagePhotoLikes";
import {actionsCommon, initialState, InitialStateType as CommonStateType} from "./redux/commonReducer";
import {getResentWords} from "./utils/storage/storageRecentWords";
import Modal from "./components/Modal/Modal";
import {AppStateType} from "./redux/store";
import {compose} from "redux";
import {isUniquePhoto} from "./utils/photoEditing";
import {getCollectPhotos} from "./utils/storage/storagePhotoCollect";

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
        dispatch(setHeaderPhoto());

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

    }, []);

    useEffect(() => {
        if (isUniquePhoto(props.common.photoModalCard, initialState.photoModalCard)) {
            dispatch(actionsCommon.setOpenModalFlag(true));
        }

    }, [props.common.photoModalCard]);

    return (
        <div className="App">
            <Switch>
                <Route exact path='/'
                       render={() => <Redirect to={'/main'}/>}/>

                <Route path='/main'
                       render={() => <SuspendedHomePage />}/>

                <Route path='/category/:query?'
                       render={() => <SuspendedCategoryPage />}/>

                <Route path='/collections'
                       render={() => <SuspendedCollectionsPage />}/>

                <Route path='*'
                       render={() => <div>404 NOT FOUND</div>}/>
            </Switch>
            <Modal isOpenModal={props.common.isOpenModal} photo={props.common.photoModalCard} />
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
