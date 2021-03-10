import React, {useEffect, useState} from "react";
import './navbar.scss'
import logo from '../../assets/icons/pexels.svg'
import NavList from "./NavList/NavList";
import SearchBar from "../SearchBar/SearchBar";
import {ISearchBarType} from "../../types/commonTypes";
import {actionsCommon, InitialStateType as CommonStateType} from "../../redux/commonReducer";

type PropsType = {
    isMain: boolean,
    common: CommonStateType
}

const Navbar: React.FunctionComponent<PropsType> = (props) => {
    const [scrollTop, setScrollTop] = useState(0);

    document.addEventListener('scroll', () => {
        const temp = window.pageYOffset;
        if (((temp > 50) && (scrollTop <= 50)) || ((temp <= 50) && (scrollTop > 50))) {
            setScrollTop(temp);
        }
    })

    const [isTransparent, setIsTransparent] = useState(true);

    useEffect(() => {
        if(scrollTop > 50 && isTransparent) setIsTransparent(false);
        if(scrollTop <= 50 && !isTransparent) setIsTransparent(true);
    }, [scrollTop]);

    const SearchProps: ISearchBarType = {
        suggestionWords: props.common.suggestionWords,
        resentSearches: props.common.resentSearches,
        trendingSearches: props.common.trendingSearches,
        value: props.common.navInputValue,
        isBigSearchBar: false,
        setInput: actionsCommon.setNavInputValue
    }

    return (
        <nav className={`navigation ${props.isMain && isTransparent ? 'navigation__transparent' : ''}`}>
            <a className={'navigation__logo'} href={'/'}>
                <div className={'navigation__logo__img'}>
                    <img src={logo}/>
                </div>
                <div className={'navigation__logo__text'}>Pexels</div>
            </a>
            <div className={'navigation__search-bar'}>
                <SearchBar searchProps={SearchProps}/>
            </div>
            <NavList />
        </nav>
    )
};

export default Navbar;
