import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {actions, setHeaderPhoto} from "./redux/homeReducer";
import {withSuspense} from "./components/common/Suspense/withSuspense";
import {getRandomArray} from "./utils/common";
import {mainCategories, trendingCategories} from "./utils/constants/constants";
import {Redirect, Route, Switch} from 'react-router-dom'
import {getLikes} from "./utils/storage/storagePhotoLikes";
import {actionsCommon} from "./redux/commonReducer";
import {getResentWords} from "./utils/storage/storageRecentWords";


const HomePageContainer = React.lazy(() => import('./pages/HomePage/HomePageContainer'));
const CategoryPageContainer = React.lazy(() => import('./pages/CategoryPage/CategoryPageContainer'));

const SuspendedHomePage = withSuspense(HomePageContainer);
const SuspendedCategoryPage = withSuspense(CategoryPageContainer);

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setHeaderPhoto());

        const recommendCategories = getRandomArray(mainCategories.length, 7, mainCategories);
        dispatch(actions.setRecommendCategories(recommendCategories));

        const trendingSearches = getRandomArray(trendingCategories.length, 10, trendingCategories);
        dispatch(actionsCommon.setTrendingCategories(trendingSearches));

        const likes = getLikes();
        dispatch(actionsCommon.setLikedPhotos(likes));

        const resentSearches = getResentWords();
        dispatch(actionsCommon.setResentSearches(resentSearches));

    }, [])

    return (
        <div className="App">
            <Switch>
                <Route exact path='/'
                       render={() => <Redirect to={'/main'}/>}/>

                <Route path='/main'
                       render={() => <SuspendedHomePage />}/>

                <Route path='/category/:query?'
                       render={() => <SuspendedCategoryPage />}/>

                <Route path='*'
                       render={() => <div>404 NOT FOUND</div>}/>
            </Switch>
        </div>
    );
}

export default App;
