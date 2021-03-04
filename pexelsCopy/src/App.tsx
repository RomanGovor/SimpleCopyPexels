import React from 'react';
import Header from "./components/Header/Header";
import Navbar from "./components/Navigation/Navbar";
import UnderlinedTabs from "./components/UnderlinedTabs/UnderlinedTabs";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
    return (
        <div className="App">
            <Navbar />
            <Header />
            <UnderlinedTabs />
            <HomePage />
        </div>
    );
}

export default App;
