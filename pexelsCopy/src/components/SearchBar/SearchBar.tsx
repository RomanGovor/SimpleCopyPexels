import React, { useEffect, useRef, useState } from 'react';
import './search-bar.scss';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import searchIcon from '../../assets/icons/search.svg';
import closeIcon from '../../assets/icons/close.svg';
import SearchSuggestions from './SearchSuggestions/SearchSuggestions';
import RecentSearches from './RecentSearches/RecentSearches';
import { ISearchBarType } from '../../types/commonTypes';
import TrendingSearches from './TrendingSearches/TrendingSearches';
import { addResentWord } from '../../utils/storage/storageRecentWords';
import { actionsCommon } from '../../redux/commonReducer';
import { SearchBarLangType } from '../../types/langTypes';

type PropsType = {
  searchProps: ISearchBarType;
  vocabulary: SearchBarLangType;
};

const SearchBar: React.FC<PropsType> = (props) => {
  const {
    trendingSearches,
    isBigSearchBar,
    suggestionWords,
    value,
    resentSearches,
    setInput,
  } = props.searchProps;
  const { vocabulary } = props;

  const inputEl = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState('');

  const addResentWordEvent = () => {
    const valueTrim = inputEl.current?.value.trim();
    if (valueTrim && valueTrim.length !== 0) {
      const resentSearchesTemp = addResentWord(valueTrim);
      dispatch(actionsCommon.setResentSearches(resentSearchesTemp));
      setRedirect(`/category/${valueTrim}`);
    }

    dispatch(setInput(''));
  };

  const keydownHandler = (event: any) => {
    if (event.key === 'Enter') {
      const isFocused = document.activeElement === inputEl.current;
      if (isFocused) addResentWordEvent();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return function () {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, []);

  useEffect(() => {
    dispatch(actionsCommon.asyncSetSuggestionWords(value));
  }, [value]);

  const onChange = () => {
    const valueTemp = inputEl.current?.value;
    if (valueTemp || valueTemp === '') dispatch(setInput(valueTemp));
  };

  const onClick = () => {
    addResentWordEvent();
  };

  const [isFormFocus, setFormFocus] = useState(false);

  const onFormFocus = () => {
    setFormFocus(true);
  };

  const onFormBlur = () => {
    setFormFocus(false);
  };

  const onFormOver = () => {
    const isFocused = document.activeElement === inputEl.current;
    if (isFocused) setFormFocus(true);
  };

  return (
    <form
      onMouseLeave={onFormBlur}
      onFocus={onFormFocus}
      onMouseOver={onFormOver}
      className={`search-bar ${isBigSearchBar && ' search-bar--bigger '}${
        isFormFocus && ' search-bar--open'
      }`}
      method="get"
    >
      <div className="search-bar__container">
        <input
          ref={inputEl}
          value={value}
          onChange={onChange}
          placeholder={vocabulary.placeholder}
          type="search"
        />
        <button type="button" onClick={onClick}>
          <i className="svg-icon">
            <img alt="search" src={searchIcon} />
          </i>
        </button>
      </div>
      <div>
        <div onMouseOver={onFormFocus} className="search-bar__dropdown">
          {redirect !== '' && <Redirect to={redirect} />}
          {suggestionWords && suggestionWords.length !== 0 && (
            <SearchSuggestions words={suggestionWords} substr={value} />
          )}
          <div>
            <div className="search-bar__dropdown__section">
              <div className="search-bar__dropdown__section__title">
                <span>{vocabulary.resent}</span>
                <button type="button" className="js-search-bar-clear-recent-searches">
                  <img alt="close" src={closeIcon} />
                </button>
              </div>
              <div className="search-bar__dropdown__section__content">
                {resentSearches && resentSearches.length !== 0 && (
                  <RecentSearches resentSearches={resentSearches} />
                )}
              </div>
            </div>
            <div className="search-bar__dropdown__section">
              <div className="search-bar__dropdown__section__title">
                <span>{vocabulary.trending}</span>
              </div>
              <div className="search-bar__dropdown__section__content">
                <TrendingSearches trendingSearches={trendingSearches} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
