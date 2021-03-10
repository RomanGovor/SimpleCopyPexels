import React from "react";
import {NavLink} from "react-router-dom";
import searchIcon from '../../../assets/icons/search18.svg';

type PropsType = {
    word: string
}

const RecentSearchesItem: React.FC<PropsType> = ({word}) => {
    return (
        <NavLink to={`/category/${word}`} className={'search-bar__recent-searches__item'}>
            <div className={'search-bar__recent-searches__item__text'}>{word}</div>
            <div className={'search-bar__recent-searches__item__icon'}>
                <img src={searchIcon}/>
            </div>
        </NavLink>
    );
}

export default RecentSearchesItem;
