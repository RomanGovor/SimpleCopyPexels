import React from "react";
import SearchBar from "../../SearchBar/SearchBar";
import HeaderContentItem from "./HeaderContentItem";
import {IHeaderContentItem} from "../../../interfaces/headerInterfaces";


const contentItems: Array<IHeaderContentItem> = [
    {link: 'https://www.pexels.com/search/st%20patricks%20day/', category: 'st patricks day'},
    {link: 'https://www.pexels.com/search/calendar/', category: 'calendar'},
    {link: 'https://www.pexels.com/search/diversity/', category: 'diversity'},
    {link: 'https://www.pexels.com/search/communication/', category: 'communication'},
    {link: 'https://www.pexels.com/search/interview/', category: 'interview'},
    {link: 'https://www.pexels.com/search/vaccine/', category: 'vaccine'},
    {link: 'https://www.pexels.com/popular-searches/', category: 'more'},
];

const HeaderContent: React.FunctionComponent = () => {
    const contentItemsElements = contentItems
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
