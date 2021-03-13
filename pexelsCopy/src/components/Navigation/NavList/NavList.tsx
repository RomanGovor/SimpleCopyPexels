import React, {useRef, useState} from "react";
import NavListItem from "./ListItem/NavListItem";
import './nav-list.scss'
import {NavigationLangType} from "../../../types/langTypes";
import OverlayListItem from "../OverlayListItem/OverlayListItem";
import SelectLang from "../SelectLang/SelectLang";

type PropsType = {
    lang: string
    vocabulary: NavigationLangType
}

const NavList: React.FC<PropsType> = ({vocabulary, lang}) => {
    const overlayVoc = vocabulary.overlay;
    const [isOpenOverlay, setOpenOverlay] = useState(false);

    const onBurgerClick = (event: any) => {
        const target = event.target.closest('li');
        if (target?.getAttribute('data-type') === 'burger') {
            isOpenOverlay ? setOpenOverlay(false) : setOpenOverlay(true);
        }
    }

    return (
        <>
            <ul className={'sub-nav'} onClick={onBurgerClick}>
                <NavListItem link={'https://www.pexels.com/discover/'} title={vocabulary.explore}/>
                <NavListItem link={'https://www.pexels.com/license/'} title={vocabulary.license}/>
                <NavListItem link={'https://www.pexels.com/join-contributor/'} title={vocabulary.upload}/>
                <NavListItem typeOfItem={'triplet'}/>
                <li className={'hide-nav-item'}><SelectLang lang={lang} /></li>
                <NavListItem link={'https://www.pexels.com/onboarding/'} title={vocabulary.collections} redirect={'collection'} typeOfItem={'button'}/>
                <NavListItem typeOfItem={'burger'}/>
                <div className={'sub-nav__overlay ' + (isOpenOverlay && 'sub-nav__overlay--open')}>
                    <ul className={'sub-nav__overlay__section sub-nav__overlay__section--large'}>
                        <OverlayListItem title={overlayVoc.home} isNavItem={true} link={'/'}/>
                        <OverlayListItem title={overlayVoc.collections} isNavItem={true} link={'/collections'}/>
                    </ul>
                    <hr className={'sub-nav__overlay__divider'}/>
                    <ul className={'sub-nav__overlay__section sub-nav__overlay__section--large'}>
                        <OverlayListItem title={overlayVoc.discover} link={'discover'}/>
                        <OverlayListItem title={overlayVoc.popular} link={'popular-searches'}/>
                        <OverlayListItem title={overlayVoc.videos} link={'videos'}/>
                        <OverlayListItem title={overlayVoc.challenges} link={'challenges'}/>
                        <OverlayListItem title={overlayVoc.leaderboard} link={'leaderboard'}/>
                        <OverlayListItem title={overlayVoc.pexelsBlog} link={'blog'}/>
                    </ul>
                    <hr className={'sub-nav__overlay__divider'}/>
                    <ul className={'sub-nav__overlay__section'}>
                        <OverlayListItem title={overlayVoc.join} link={'onboarding'}/>
                        <li><SelectLang lang={lang} /></li>
                        <OverlayListItem title={overlayVoc.license} link={'license'}/>
                    </ul>
                    <hr className={'sub-nav__overlay__divider'}/>
                    <ul className={'sub-nav__overlay__section'}>
                        <OverlayListItem title={overlayVoc.apps} link={'pro'}/>
                        <OverlayListItem title={overlayVoc.faq} link={'about'}/>
                        <OverlayListItem title={overlayVoc.about} link={'about'}/>
                        <OverlayListItem title={overlayVoc.terms} link={'imprint'}/>
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




















