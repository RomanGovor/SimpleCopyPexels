import React from 'react';
import Header from "./components/Header/Header";
import Navbar from "./components/Navigation/Navbar";
import UnderlinedTabs from "./components/UnderlinedTabs/UnderlinedTabs";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store";
import HomePageContainer from "./pages/HomePage/HomePageContainer";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <div className="App">
                    <Navbar />
                    <Header />
                    <UnderlinedTabs />
                    <HomePageContainer />
                </div>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
