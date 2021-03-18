import React from 'react';
import { NavLink } from 'react-router-dom';
import tripleSvg from '../../../../assets/icons/triple.svg';
import burgerSvg from '../../../../assets/icons/burger.svg';

interface INavListItemProps {
  link?: string;
  title?: string;
  typeOfItem?: string;
  redirect?: string;
}

interface IClassesByTypes {
  mainClasses: string;
  wrapAboveLink?: string;
  linkClasses?: string;
  iconPath?: string;
  redirect?: string;
}

const getItemClassesByType = (typeOfItem: string): IClassesByTypes => {
  const defaultClasses: IClassesByTypes = {
    mainClasses: 'hide-nav-item',
    wrapAboveLink: 'rd__dropdown',
    linkClasses: 'sub-nav__item',
  };

  switch (typeOfItem) {
    case 'triplet':
      return {
        mainClasses: 'hide-button mt05 hide-nav-item',
        wrapAboveLink: 'rd__dropdown',
        linkClasses: 'sub-nav__item',
        iconPath: tripleSvg,
      };
    case 'link':
      return defaultClasses;
    case 'button':
      return {
        mainClasses: 'hide-button hide-nav-item',
        linkClasses: 'sub-nav__item sub-nav__item--button',
      };
    case 'burger':
      return {
        mainClasses: 'show-unvisible-element',
        linkClasses: 'sub-nav__item',
        iconPath: burgerSvg,
      };
    default:
      return defaultClasses;
  }
};

const NavListItem: React.FC<INavListItemProps> = ({
  link,
  title,
  typeOfItem = 'link',
  redirect,
}) => {
  const itemClass: IClassesByTypes = getItemClassesByType(typeOfItem);

  return (
    <li data-type={typeOfItem} className={itemClass.mainClasses}>
      <div className={itemClass.wrapAboveLink}>
        {!(typeOfItem === 'triplet' || typeOfItem === 'burger' || typeOfItem === 'button') && (
          <a className={itemClass.linkClasses} href={link} rel="noreferrer" target="_blank">
            {title}
          </a>
        )}
        {typeOfItem === 'button' && redirect !== undefined && (
          <NavLink className={itemClass.linkClasses} to="/collections">
            {title}
          </NavLink>
        )}
        {(typeOfItem === 'triplet' || typeOfItem === 'burger') && (
          <a className={itemClass.linkClasses}>
            <i>
              <img alt="icon-path" src={itemClass.iconPath} />
            </i>
          </a>
        )}
      </div>
    </li>
  );
};

export default NavListItem;
