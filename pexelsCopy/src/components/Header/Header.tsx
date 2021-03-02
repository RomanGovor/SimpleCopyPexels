import React from "react";
import './header.scss';
import defaultHeaderBg from '../../assets/images/default-header-bg.jpeg';
import HeaderContent from "./HeaderContent/HeaderContent";

const Header: React.FunctionComponent = () => {
    return (
        <header className={'header'}>
            <div className={'header__background'}>
                <img src={defaultHeaderBg}/>
            </div>
            <div className={'header__footer'}>
                <div className="header__footer__item"></div>
                <div className="header__footer__item header__footer__item--align-right">
                    <a href="https://www.pexels.com/photo/sea-water-ocean-texture-6924256/"
                       target={'_blank'}>Photo by Nothing Ahead</a>
                </div>
            </div>
            <HeaderContent />
        </header>
    )
}

export default Header;
