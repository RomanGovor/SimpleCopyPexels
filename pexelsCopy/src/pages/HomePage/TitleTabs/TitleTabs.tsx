import React, { useState } from 'react';
import arrowDown from '../../../assets/icons/arrow-down.svg';
import './TitleTabs.scss';
import { HomePageLangType } from '../../../types/langTypes';

type PropsType = {
  vocabulary: HomePageLangType;
};

const TitleTabs: React.FC<PropsType> = ({ vocabulary }) => {
  const [isMouseOver, setMouseEnter] = useState(false);

  const setFalseMouseOver = () => {
    setMouseEnter(false);
  };

  const setTrueMouseOver = () => {
    setMouseEnter(true);
  };

  return (
    <div className="title-tabs">
      <div className="title-tabs__title">{vocabulary.title}</div>
      <div
        onMouseOver={setTrueMouseOver}
        onMouseOut={setFalseMouseOver}
        className={`rd__dropdown rd__dropdown--right ${isMouseOver ? 'rd__dropdown--active' : ''}`}
      >
        <div className="rd__button rd__button--text-primary rd__button--compact rd__button--with-icon rd__button--no-right-padding">
          <span>{vocabulary.trending}</span>
          <i className="svg-icon">
            <img alt="arrow-down" src={arrowDown} />
          </i>
        </div>
        <div className="rd__dropdown__container">
          <div className="rd__dropdown__container__content">
            <ul className="rd__dropdown__container__items">
              <li>
                <a href="/">{vocabulary.trending}</a>
              </li>
              <li>
                <a rel="noreferrer" target="_blank" href="https://www.pexels.com/new-photos/">
                  {vocabulary.newTag}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleTabs;
