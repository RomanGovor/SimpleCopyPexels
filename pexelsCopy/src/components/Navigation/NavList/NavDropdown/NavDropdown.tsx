import React from "react";
import {NavigationItemType} from "../../../../types/commonTypes";
import OverlayList from "../../OverlayListItem/OverlayList";

type PropsType = {
    navItems: Array<NavigationItemType>,
}

const NavDropdown: React.FC<PropsType> = ({navItems}) => {
    return (
        <div className={'rd__dropdown__container '}>
           <div className={'rd__dropdown__container__content'}>
               <div className={'rd__dropdown__container__content__pointer'}></div>
               <ul className={'rd__dropdown__container__content__items'}>
                   <OverlayList navItems={navItems.slice(2)}/>
               </ul>
           </div>
        </div>
    );
}

export default NavDropdown;
