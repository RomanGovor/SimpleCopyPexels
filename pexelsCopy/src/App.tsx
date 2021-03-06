import React, {useEffect} from 'react';
import Navbar from "./components/Navigation/Navbar";
import {useDispatch} from "react-redux";
import HomePageContainer from "./pages/HomePage/HomePageContainer";
import {setHeaderPhoto} from "./redux/homeReducer";
import {withSuspense} from "./components/common/Suspense/withSuspense";

const SuspendedHomePage = withSuspense(HomePageContainer);

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setHeaderPhoto());
    }, [])

    return (
        <div className="App">
            <Navbar />
            <SuspendedHomePage />
        </div>
    );
}

export default App;
