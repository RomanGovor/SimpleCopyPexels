import React from "react";
import {NavLink} from "react-router-dom";

type PropsType = {
    word: string
    substr: string
}

const SearchSuggestionItem: React.FC<PropsType> = ({word, substr}) => {
    const indSubstr = word.indexOf(substr);
    let firstPartWord = '', secondPartWord = '';

    if (indSubstr !== 0) {
        firstPartWord = word.slice(0, indSubstr);
    }

    if (indSubstr + substr.length !== word.length) {
        secondPartWord = word.slice(indSubstr + substr.length);
    }

    return (
            <li>
                <NavLink to={`/category/${word}`}>
                    {firstPartWord}
                    <strong>{substr}</strong>
                    {secondPartWord}
                </NavLink>
            </li>
    );
}

export default SearchSuggestionItem;
