import React, {useEffect, useRef, useState} from "react";
import './search-bar.scss'
import searchIcon from '../../assets/icons/search.svg';
import closeIcon from '../../assets/icons/close.svg';
import SearchSuggestions from "./SearchSuggestions/SearchSuggestions";
import RecentSearches from "./RecentSearches/RecentSearches";
import {ISearchBarType} from "../../types/commonTypes";
import TrendingSearches from "./TrendingSearches/TrendingSearches";
import {useDispatch} from "react-redux";
import {addResentWord} from "../../utils/storage/storageRecentWords";
import {actionsCommon, setSuggestionWords} from "../../redux/commonReducer";
import {Redirect} from "react-router-dom";

type PropsType = {
    searchProps: ISearchBarType
}

const SearchBar: React.FC<PropsType> = (props) => {
    const {trendingSearches,isBigSearchBar, suggestionWords, value,resentSearches, setInput} = props.searchProps;
    const inputEl = useRef(null);
    const dispatch = useDispatch();

    const [redirect, setRedirect] = useState('');

    const addResentWordEvent = () => {
        // @ts-ignore
        const value = inputEl.current?.value.trim();
        if (value.length !== 0) {
            const resentSearches = addResentWord(value);
            dispatch(actionsCommon.setResentSearches(resentSearches));
            setRedirect(`/category/${value}`)
        }

        dispatch(setInput(''));
    }

    const keydownHandler = (event: any) => {
        if (event.key === 'Enter') {
            const isFocused = document.activeElement === inputEl.current;
            if (isFocused) addResentWordEvent();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', keydownHandler);
        return function () {
            document.removeEventListener('keydown', keydownHandler);
        }
    }, []);

    useEffect(() => {
        dispatch(setSuggestionWords(value));
    }, [value]);

    const onChange = () => {
        // @ts-ignore
        const value = inputEl.current?.value;
        dispatch(setInput(value));
    }

    const onClick = () => {
        // @ts-ignore
        addResentWordEvent();
    }

    const [isFormFocus, setFormFocus] = useState(false);

    const onFormFocus = () => {
        setFormFocus(true);
    }

    const onFormBlur = () => {
        setFormFocus(false);
    }

    return (
       <form onMouseLeave={onFormBlur} onFocus={onFormFocus} className={'search-bar ' + (isBigSearchBar && ' search-bar--bigger ') + (isFormFocus && ' search-bar--open')} method="get">
           <div className={'search-bar__container'}>
               <input ref={inputEl} value={value} onChange={onChange} placeholder="Search for free photos" type="search"/>
               <button onClick={onClick}>
                   <i className={'svg-icon'}><img src={searchIcon}/></i>
               </button>
           </div>
           <div>
               <div onMouseOver={onFormFocus} className={'search-bar__dropdown'}>
                   { redirect !== '' && <Redirect to={redirect} />}
                   { suggestionWords && suggestionWords.length !== 0 && <SearchSuggestions words={suggestionWords} substr={value}/> }
                   <div>
                       <div className={'search-bar__dropdown__section'}>
                           <div className={'search-bar__dropdown__section__title'}>
                               <span>Resent searches</span>
                               <button className={'js-search-bar-clear-recent-searches'}>
                                   <img src={closeIcon}/>
                               </button>
                           </div>
                           <div className={'search-bar__dropdown__section__content'}>
                               { resentSearches && resentSearches.length !== 0 && <RecentSearches resentSearches={resentSearches}/> }
                           </div>
                       </div>
                       <div className={'search-bar__dropdown__section'}>
                           <div className={'search-bar__dropdown__section__title'}>
                               <span>Trending Topics</span>
                           </div>
                           <div className={'search-bar__dropdown__section__content'}>
                               <TrendingSearches trendingSearches={trendingSearches}/>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </form>
   )
}

export default SearchBar;
