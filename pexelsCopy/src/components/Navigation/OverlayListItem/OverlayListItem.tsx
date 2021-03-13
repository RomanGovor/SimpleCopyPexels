import React from "react";
import {NavLink} from 'react-router-dom';

type PropsType = {
    isNavItem?: boolean,
    isIcon?: boolean,
    iconClass?: string,
    link: string,
    title: string
}

const OverlayListItem: React.FC<PropsType> = ({isNavItem = false,iconClass,isIcon= false,title, link}) => {
    return (
        <li>
            {!isNavItem && !isIcon && <a target={'_blank'} href={`https://www.pexels.com/${link}/`}>{title}</a>}
            {isNavItem && !isIcon && <NavLink to={link}>{title}</NavLink>}
            {isIcon && !isNavItem &&  <a target={'_blank'} title={title} href={link}>
                <i className={`fa ${iconClass}`} aria-hidden="true"></i>
            </a>
            }
        </li>
    )
}

export default OverlayListItem;
