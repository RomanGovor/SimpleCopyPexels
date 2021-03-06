import React from "react";
import './header.scss';
import HeaderContent from "./HeaderContent/HeaderContent";
import {PhotoCardType} from "../../types/commonTypes";

type PropsType = {
    headerPhoto: PhotoCardType
}

const Header: React.FunctionComponent<PropsType> = (props) => {
    const headerPhoto = props.headerPhoto;

    return (
        <header className={'header'}>
            <div className={'header__background'}>
                <img src={headerPhoto.src}/>
            </div>
            <div className={'header__footer'}>
                <div className="header__footer__item"></div>
                <div className="header__footer__item header__footer__item--align-right">
                    <a href={headerPhoto.phLink}
                       target={'_blank'}>Photo by {headerPhoto.phNames}</a>
                </div>
            </div>
            <HeaderContent />
        </header>
    )
}

export default Header;
