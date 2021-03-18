import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavigationItemType } from '../../../types/commonTypes';

const OverlayListItem: React.FC<NavigationItemType> = ({
  isNavItem = false,
  iconClass,
  isIcon = false,
  title,
  link,
}) => {
  return (
    <li>
      {!isNavItem && !isIcon && (
        <a rel="noreferrer" target="_blank" href={`https://www.pexels.com/${link}/`}>
          {title}
        </a>
      )}
      {isNavItem && !isIcon && <NavLink to={link}>{title}</NavLink>}
      {isIcon && !isNavItem && (
        <a rel="noreferrer" target="_blank" title={title} href={link}>
          <i className={`fa ${iconClass}`} aria-hidden="true" />
        </a>
      )}
    </li>
  );
};

export default OverlayListItem;
