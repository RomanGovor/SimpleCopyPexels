import React from 'react';
import './Preloader.scss';
import preloader from "../../../assets/images/preloader.svg";

const Preloader: React.FC = () => {
    return <div className={'preloader'}>
        <img src={preloader} />
    </div>
}

export default Preloader;
