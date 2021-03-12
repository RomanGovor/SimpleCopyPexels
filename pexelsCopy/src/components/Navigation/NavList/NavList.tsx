import React, {useRef} from "react";
import NavListItem from "./ListItem/NavListItem";
import './nav-list.scss'
import usaImg from '../../../assets/images/flags/usa.png';
import russiaImg from '../../../assets/images/flags/russia.png';
import {setLanguage} from "../../../utils/storage/storageLang";
import {useDispatch} from "react-redux";
import {actionsCommon} from "../../../redux/commonReducer";
import {NavigationLangType} from "../../../types/langTypes";

type PropsType = {
    lang: string
    vocabulary: NavigationLangType
}

const NavList: React.FC<PropsType> = ({vocabulary, lang}) => {
    const selectRef = useRef(null);
    const dispatch = useDispatch();

    const selectLang = () => {
        // @ts-ignore
        const lang = selectRef?.current?.value;
        setLanguage(lang);
        dispatch(actionsCommon.setLanguage(lang));
    }

    return (
        <ul className={'sub-nav'}>
            <NavListItem link={'https://www.pexels.com/discover/'} title={vocabulary.explore}/>
            <NavListItem link={'https://www.pexels.com/license/'} title={vocabulary.license}/>
            <NavListItem link={'https://www.pexels.com/join-contributor/'} title={vocabulary.upload}/>
            <NavListItem typeOfItem={'triplet'}/>
            <li>
                <div className={'select-lang'}>
                    <select ref={selectRef} onChange={selectLang}>
                        <option selected={lang === 'en'} value="en">English</option>
                        <option selected={lang === 'ru'} value="ru">Русский</option>
                        <option selected={lang === 'by'} value="by">Беларускі</option>
                    </select>
                </div>
            </li>
            <NavListItem link={'https://www.pexels.com/onboarding/'} title={vocabulary.collections} redirect={'collection'} typeOfItem={'button'}/>
            <NavListItem typeOfItem={'burger'}/>
        </ul>
    );
}

export default NavList;
