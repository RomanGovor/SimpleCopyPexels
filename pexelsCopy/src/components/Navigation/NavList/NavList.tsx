import React from "react";
import NavListItem from "./ListItem/NavListItem";
import './nav-list.scss'

const NavList: React.FC = () => {
    return (
        <ul className={'sub-nav'}>
            <NavListItem link={'https://www.pexels.com/discover/'} title={'Explore'}/>
            <NavListItem link={'https://www.pexels.com/license/'} title={'License'}/>
            <NavListItem link={'https://www.pexels.com/join-contributor/'} title={'Upload'}/>
            <NavListItem typeOfItem={'triplet'}/>
            <NavListItem link={'https://www.pexels.com/onboarding/'} title={'Collection'} redirect={'collection'} typeOfItem={'button'}/>
            <NavListItem typeOfItem={'burger'}/>
        </ul>
    );
}

export default NavList;
