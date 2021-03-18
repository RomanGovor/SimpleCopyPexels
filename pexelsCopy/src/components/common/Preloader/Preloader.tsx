import React from 'react';
import './Preloader.scss';
import preloader from '../../../assets/images/preloader.svg';

const Preloader: React.FC = () => {
  return (
    <div className="preloader">
      <img alt="preloader" src={preloader} />
    </div>
  );
};

export default Preloader;
