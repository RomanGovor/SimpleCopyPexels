import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.scss';
import logo from '../../assets/icons/pexels.svg';
import NavList from './NavList/NavList';
import SearchBar from '../SearchBar/SearchBar';
import { ISearchBarType } from '../../types/commonTypes';
import { actionsCommon, InitialStateType as CommonStateType } from '../../redux/commonReducer';
import { NavigationLangType, SearchBarLangType } from '../../types/langTypes';

type PropsType = {
  isMain: boolean;
  common: CommonStateType;
};

const Navbar: React.FunctionComponent<PropsType> = (props) => {
  const [scrollTop, setScrollTop] = useState(0);
  const vocabularyNavbar: NavigationLangType = props.common.vocabulary.navigation;
  const vocabularySearchBar: SearchBarLangType = props.common.vocabulary.searchBar;
  const [isTransparent, setIsTransparent] = useState(true);

  const scrollHandler = () => {
    const temp = window.pageYOffset;
    if ((temp > 50 && scrollTop <= 50) || (temp <= 50 && scrollTop > 50)) {
      setScrollTop(temp);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => document.removeEventListener('scroll', scrollHandler);
  });

  useEffect(() => {
    if (scrollTop > 50 && isTransparent) setIsTransparent(false);
    if (scrollTop <= 50 && !isTransparent) setIsTransparent(true);
  }, [scrollTop]);

  const { suggestionWords, resentSearches, trendingSearches, navInputValue: value } = props.common;

  const SearchProps: ISearchBarType = {
    suggestionWords,
    resentSearches,
    trendingSearches,
    value,
    isBigSearchBar: false,
    setInput: actionsCommon.setNavInputValue,
  };

  return (
    <nav className={`navigation ${props.isMain && isTransparent ? 'navigation__transparent' : ''}`}>
      <NavLink className="navigation__logo" to="/">
        <div className="navigation__logo__img">
          <img alt="logo" src={logo} />
        </div>
        <div className="navigation__logo__text">Pexels</div>
      </NavLink>
      <div className="navigation__search-bar">
        <SearchBar searchProps={SearchProps} vocabulary={vocabularySearchBar} />
      </div>
      <NavList vocabulary={vocabularyNavbar} lang={props.common.lang} />
    </nav>
  );
};

export default Navbar;
