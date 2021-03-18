import React from 'react';
import SearchBar from '../../SearchBar/SearchBar';
import HeaderContentItem from './HeaderContentItem';
import { IHeaderContentItem, ISearchBarType } from '../../../types/commonTypes';
import { actionsCommon, InitialStateType as CommonStateType } from '../../../redux/commonReducer';
import { HeaderLangType, SearchBarLangType } from '../../../types/langTypes';

type PropsType = {
  recommendCategories: Array<IHeaderContentItem>;
  common: CommonStateType;
};

const HeaderContent: React.FunctionComponent<PropsType> = (props) => {
  const vocabularySearchBar: SearchBarLangType = props.common.vocabulary.searchBar;
  const vocabularyHeader: HeaderLangType = props.common.vocabulary.header;

  const contentItemsElements = props.recommendCategories.map(({ category, link }) => (
    <HeaderContentItem link={link} category={category} key={category} />
  ));

  const SearchProps: ISearchBarType = {
    suggestionWords: props.common.suggestionWords,
    resentSearches: props.common.resentSearches,
    trendingSearches: props.common.trendingSearches,
    value: props.common.headerInputValue,
    isBigSearchBar: true,
    setInput: actionsCommon.setHeaderInputValue,
  };

  return (
    <div className="header__content">
      <h1 className="header__title">{vocabularyHeader.title}</h1>
      <div className="header__search-container">
        <SearchBar searchProps={SearchProps} vocabulary={vocabularySearchBar} />
        <div className="header__search-container__search-tags">
          <ul className="header__search-container__search-tags__tag-container">
            <li className="header__search-container__search-tags__tag-container__suggested">
              {vocabularyHeader.suggested}
              <span>:</span>
            </li>
            <li>
              <ul>{contentItemsElements}</ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;
