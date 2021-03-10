import React from "react";
import SearchBar from "../../SearchBar/SearchBar";
import HeaderContentItem from "./HeaderContentItem";
import {IHeaderContentItem, ISearchBarType, PhotoCardType} from "../../../types/commonTypes";
import {actionsCommon, InitialStateType as CommonStateType} from "../../../redux/commonReducer";


type PropsType = {
    recommendCategories: Array<IHeaderContentItem>
    common: CommonStateType
}

const HeaderContent: React.FunctionComponent<PropsType> = (props) => {
    const contentItemsElements = props.recommendCategories
        .map(({category, link}) => <HeaderContentItem link={link} category={category} key={category}/>)

    const SearchProps: ISearchBarType = {
        suggestionWords: props.common.suggestionWords,
        resentSearches: props.common.resentSearches,
        trendingSearches: props.common.trendingSearches,
        value: props.common.headerInputValue,
        isBigSearchBar: true,
        setInput: actionsCommon.setHeaderInputValue
    }

    return (
        <div className={'header__content'}>
            <h1 className={'header__title'}>The best free stock photos &amp; videos shared by talented creators.</h1>
            <div className={'header__search-container'}>
                <SearchBar searchProps={SearchProps}/>
                <div className={'header__search-container__search-tags'}>
                    <ul className={'header__search-container__search-tags__tag-container'}>
                        <li className={'header__search-container__search-tags__tag-container__suggested'}>
                            Suggested
                            <span>:</span>
                        </li>
                        <li>
                            <ul>
                                {contentItemsElements}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HeaderContent;
