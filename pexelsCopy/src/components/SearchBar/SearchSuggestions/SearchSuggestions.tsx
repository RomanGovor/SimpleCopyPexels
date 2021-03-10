import React from "react";
import SearchSuggesstionItem from "./SearchSuggesstionItem";

type PropsType = {
    words: Array<string>
    substr: string
}

const SearchSuggestions: React.FC<PropsType> = ({words, substr}) => {
    const wordsArray = words.map((word) => {
        return <SearchSuggesstionItem word={word} substr={substr} key={word}/>
    })

    return (
        <ul className={'search-bar__suggestions'}>
            {wordsArray}
        </ul>
    );
}

export default SearchSuggestions;
