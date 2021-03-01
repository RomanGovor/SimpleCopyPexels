import React from "react";
import './navbar.scss'
import logo from '../../assets/icons/pexels.svg'
import NavList from "./NavList/NavList";
import SearchBar from "../SearchBar/SearchBar";

const Navbar: React.FunctionComponent = () => {
    return (
        <nav className={'navigation'}>
            <a className={'navigation__logo'} href={'/'}>
                <div className={'navigation__logo__img'}>
                    <img src={logo}/>
                </div>
                <div className={'navigation__logo__text'}>Pexels</div>
            </a>
            <div className={'navigation__search-bar'}>
                <SearchBar />
            </div>
            <NavList />
        </nav>
    )
};

export default Navbar;
