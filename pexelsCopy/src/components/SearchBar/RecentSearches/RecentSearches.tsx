import React from "react";
import RecentSearchesItem from "./RecentSearchesItem";

type PropsType = {
    resentSearches: Array<string>
}

const RecentSearches: React.FC<PropsType> = ({resentSearches}) => {
    const resentElements = resentSearches.map((word,i) => {
        return <RecentSearchesItem word={word} key={i}/>
    })

    return (
        <div className={'search-bar__recent-searches'} key={resentSearches[0]}>
            {resentElements}
        </div>
    );
}

export default RecentSearches;
