import React from 'react';
import Header from "./components/Header/Header";
import Navbar from "./components/Navigation/Navbar";

const App: React.FC = () => {
    return (
        <div className="App">
            <Navbar />
            <Header />
        </div>
    );
}

export default App;