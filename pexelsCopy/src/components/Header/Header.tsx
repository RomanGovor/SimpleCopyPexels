import React from "react";
import './header.scss';
import HeaderContent from "./HeaderContent/HeaderContent";
import {IHeaderContentItem, PhotoCardType} from "../../types/commonTypes";

type PropsType = {
    headerPhoto: PhotoCardType,
    recommendCategories: Array<IHeaderContentItem>
}

const Header: React.FunctionComponent<PropsType> = (props) => {
    const {headerPhoto, recommendCategories} = props;
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
            <HeaderContent recommendCategories={recommendCategories}/>
        </header>
    )
}

export default Header;
