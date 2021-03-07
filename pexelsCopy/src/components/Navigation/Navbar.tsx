import React, {useEffect, useState} from "react";
import './navbar.scss'
import logo from '../../assets/icons/pexels.svg'
import NavList from "./NavList/NavList";
import SearchBar from "../SearchBar/SearchBar";

type PropsType = {
    isMain: boolean
}

const Navbar: React.FunctionComponent<PropsType> = (props) => {
    const [scrollTop, setScrollTop] = useState(0)

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

    return (
        <nav className={`navigation ${props.isMain && isTransparent ? 'navigation__transparent' : ''}`}>
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
