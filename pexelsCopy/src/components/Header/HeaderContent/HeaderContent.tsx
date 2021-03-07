import React from "react";
import SearchBar from "../../SearchBar/SearchBar";
import HeaderContentItem from "./HeaderContentItem";
import {IHeaderContentItem, PhotoCardType} from "../../../types/commonTypes";


type PropsType = {
    recommendCategories: Array<IHeaderContentItem>
}

const HeaderContent: React.FunctionComponent<PropsType> = (props) => {
    const contentItemsElements = props.recommendCategories
        .map(({category, link}) => <HeaderContentItem link={link} category={category}/>)

    return (
        <div className={'header__content'}>
            <h1 className={'header__title'}>The best free stock photos &amp; videos shared by talented creators.</h1>
            <div className={'header__search-container'}>
                <SearchBar isBigSearchBar={true}/>
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
