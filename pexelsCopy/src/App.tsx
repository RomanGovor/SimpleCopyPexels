import React from 'react';
import Header from "./components/Header/Header";
import Navbar from "./components/Navigation/Navbar";
import UnderlinedTabs from "./components/UnderlinedTabs/UnderlinedTabs";

const App: React.FC = () => {
    return (
        <div className="App">
            <Navbar />
            <Header />
            <UnderlinedTabs />
        </div>
    );
}

export default App;
