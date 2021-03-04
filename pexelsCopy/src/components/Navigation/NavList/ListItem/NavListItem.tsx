import React from "react";
import tripleSvg from '../../../../assets/icons/triple.svg';
import burgerSvg from '../../../../assets/icons/burger.svg';

interface INavListItemProps {
    link?: string
    title?: string
    typeOfItem?: string
}

interface IClassesByTypes {
    mainClasses: string
    wrapAboveLink?: string
    linkClasses?: string
    iconPath?: string
}

const getItemClassesByType = (typeOfItem: string) : IClassesByTypes => {
    const defaultClasses: IClassesByTypes = {
        mainClasses: 'hide-nav-item',
        wrapAboveLink: 'rd__dropdown',
        linkClasses: 'sub-nav__item'
    }

    switch (typeOfItem) {
        case 'triplet':
            return {
                mainClasses: 'hide-button',
                wrapAboveLink: 'rd__dropdown',
                linkClasses: 'sub-nav__item',
                iconPath: tripleSvg
            }
        case 'link':
            return defaultClasses;
        case 'button':
            return {
                mainClasses: 'hide-button',
                linkClasses: 'sub-nav__item sub-nav__item--button'
            }
        case 'burger':
            return {
                mainClasses: 'show-unvisible-element',
                linkClasses: 'sub-nav__item',
                iconPath: burgerSvg
            }
    }

    return defaultClasses;
}

const NavListItem: React.FC<INavListItemProps> = ({link, title, typeOfItem = 'link'}) => {
    const itemClass: IClassesByTypes = getItemClassesByType(typeOfItem);

    return (
        <li className={itemClass.mainClasses}>
            <div className={itemClass.wrapAboveLink}>
                {!(typeOfItem === 'triplet' || typeOfItem === 'burger') &&
                    <a className={itemClass.linkClasses}
                       href={link}
                       target={'_blank'}>{title}
                    </a>
                }
                {(typeOfItem === 'triplet' || typeOfItem === 'burger') &&
                <a className={itemClass.linkClasses}>
                    <i><img src={itemClass.iconPath}/></i>
                </a>
                }
            </div>
        </li>
    );
}

export default NavListItem;
