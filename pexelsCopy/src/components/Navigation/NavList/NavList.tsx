import React, {useRef, useState} from "react";
import NavListItem from "./ListItem/NavListItem";
import tripleSvg from '../../../assets/icons/triple.svg';
import './nav-list.scss'
import {NavigationLangType} from "../../../types/langTypes";
import OverlayListItem from "../OverlayListItem/OverlayListItem";
import SelectLang from "../SelectLang/SelectLang";
import {NavigationItemType} from "../../../types/commonTypes";
import OverlayList from "../OverlayListItem/OverlayList";
import NavDropdown from "./NavDropdown/NavDropdown";

type PropsType = {
    lang: string
    vocabulary: NavigationLangType
}


const NavList: React.FC<PropsType> = ({vocabulary, lang}) => {
    const overlayVoc = vocabulary.overlay;
    const [isOpenOverlay, setOpenOverlay] = useState(false);
    // const [isOpenDropdown, setOpenDropdown] = useState(false);

    const onBurgerClick = (event: any) => {
        const target = event.target.closest('li');
        if (target?.getAttribute('data-type') === 'burger') {
            isOpenOverlay ? setOpenOverlay(false) : setOpenOverlay(true);
        }
    }

    // const onTripletHandler = () => {
    //     isOpenDropdown ? setOpenDropdown(false) : setOpenDropdown(true);
    // }


    const navigationItems: Array<NavigationItemType> = [
        {title: overlayVoc.home, isNavItem: true, link: '/'},
        {title: overlayVoc.collections, isNavItem: true, link: '/collections'},
        {title: overlayVoc.discover, link: 'discover'},
        {title: overlayVoc.popular, link: 'popular-searches'},
        {title: overlayVoc.videos, link: 'videos'},
        {title: overlayVoc.challenges, link: 'challenges'},
        {title: overlayVoc.leaderboard, link: 'leaderboard'},
        {title: overlayVoc.pexelsBlog, link: 'blog'},
        {title: overlayVoc.join, link: 'onboarding'},
        {title: overlayVoc.license, link: 'license'},
        {title: overlayVoc.apps, link: 'pro'},
        {title: overlayVoc.faq, link: 'about'},
        {title: overlayVoc.about, link: 'about'},
        {title: overlayVoc.terms, link: 'imprint'},
        {title: overlayVoc.terms, link: 'imprint'}
    ]

    return (
        <>
            <ul className={'sub-nav'} onClick={onBurgerClick}>
                <NavListItem link={'https://www.pexels.com/discover/'} title={vocabulary.explore}/>
                <NavListItem link={'https://www.pexels.com/license/'} title={vocabulary.license}/>
                <NavListItem link={'https://www.pexels.com/join-contributor/'} title={vocabulary.upload}/>
                <li className={'hide-button mt05 hide-nav-item'}>
                    <div className={'rd__dropdown'}>
                        <a className={'sub-nav__item'}>
                            <i><img src={tripleSvg}/></i>
                        </a>
                        <NavDropdown navItems={navigationItems}/>
                    </div>
                </li>
                <li className={'hide-nav-item'}><SelectLang lang={lang} /></li>
                <NavListItem link={'https://www.pexels.com/onboarding/'} title={vocabulary.collections} redirect={'collection'} typeOfItem={'button'}/>
                <NavListItem typeOfItem={'burger'}/>
                <div className={'sub-nav__overlay ' + (isOpenOverlay && 'sub-nav__overlay--open')}>
                    <ul className={'sub-nav__overlay__section sub-nav__overlay__section--large'}>
                        <OverlayList navItems={navigationItems.slice(0, 2)}/>
                    </ul>
                    <hr className={'sub-nav__overlay__divider'}/>
                    <ul className={'sub-nav__overlay__section sub-nav__overlay__section--large'}>
                        <OverlayList navItems={navigationItems.slice(2, 8)}/>
                    </ul>
                    <hr className={'sub-nav__overlay__divider'}/>
                    <ul className={'sub-nav__overlay__section'}>
                        <OverlayList navItems={navigationItems.slice(8, 9)}/>
                        <li><SelectLang lang={lang} /></li>
                        <OverlayList navItems={navigationItems.slice(9, 10)}/>
                    </ul>
                    <hr className={'sub-nav__overlay__divider'}/>
                    <ul className={'sub-nav__overlay__section'}>
                        <OverlayList navItems={navigationItems.slice(10, 14)}/>
                    </ul>
                    <hr className={'sub-nav__overlay__divider'}/>
                    <ul className={'sub-nav__overlay__icons'}>
                        <OverlayListItem title={'facebook'} iconClass={'fa-facebook'} isIcon={true} link={'https://www.facebook.com/pexels'}/>
                        <OverlayListItem title={'twitter'} iconClass={'fa-twitter'} isIcon={true} link={'https://twitter.com/pexels'}/>
                        <OverlayListItem title={'instagram'} iconClass={'fa-instagram'} isIcon={true} link={'https://www.instagram.com/pexels/'}/>
                        <OverlayListItem title={'pinterest'} iconClass={'fa-pinterest-p'} isIcon={true} link={'https://www.pinterest.com/pexels/'}/>
                        <OverlayListItem title={'youtube'} iconClass={'fa-youtube-play'} isIcon={true} link={'https://www.youtube.com/channel/UC7bU8qGV5Zh6PJrUaFQNoxg'}/>
                    </ul>
                </div>
            </ul>
        </>
    );
}

export default NavList;
