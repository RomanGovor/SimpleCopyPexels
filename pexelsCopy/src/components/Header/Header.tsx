import React from 'react';
import './header.scss';
import HeaderContent from './HeaderContent/HeaderContent';
import { IHeaderContentItem, PhotoCardType } from '../../types/commonTypes';
import { InitialStateType as CommonStateType } from '../../redux/commonReducer';

type PropsType = {
  headerPhoto: PhotoCardType;
  recommendCategories: Array<IHeaderContentItem>;
  common: CommonStateType;
};

const Header: React.FunctionComponent<PropsType> = (props) => {
  const { headerPhoto, recommendCategories } = props;
  const { header: vocabularyHeader } = props.common.vocabulary;
  const { common } = props;

  return (
    <header className="header">
      <div className="header__background">
        <img alt="header-ph" src={headerPhoto.src} />
      </div>
      <div className="header__footer">
        <div className="header__footer__item" />
        <div className="header__footer__item header__footer__item--align-right">
          <a rel="noreferrer" href={headerPhoto.phLink} target="_blank">
            {vocabularyHeader.photographer} {headerPhoto.phNames}
          </a>
        </div>
      </div>
      <HeaderContent recommendCategories={recommendCategories} common={common} />
    </header>
  );
};

export default Header;
