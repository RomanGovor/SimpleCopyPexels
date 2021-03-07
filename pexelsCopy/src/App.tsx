import React, {useEffect} from 'react';
import Navbar from "./components/Navigation/Navbar";
import {useDispatch} from "react-redux";
import {actions, setHeaderPhoto} from "./redux/homeReducer";
import {withSuspense} from "./components/common/Suspense/withSuspense";
import {getRandomArray} from "./utils/common";
import {mainCategories} from "./utils/constants/constants";

const HomePageContainer = React.lazy(() => import('./pages/HomePage/HomePageContainer'));
const SuspendedHomePage = withSuspense(HomePageContainer);

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setHeaderPhoto());
        // dispatch(setRecommendCategories());

        const recommendCategories = getRandomArray(mainCategories.length, 7, mainCategories);
        dispatch(actions.setRecommendCategories(recommendCategories));
    }, [])

    return (
        <div className="App">
            <Navbar />
            <SuspendedHomePage />
        </div>
    );
}

export default App;
