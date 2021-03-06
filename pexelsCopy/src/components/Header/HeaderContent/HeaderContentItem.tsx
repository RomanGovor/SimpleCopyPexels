import React from "react";
import {IHeaderContentItem} from "../../../types/commonTypes";

const HeaderContentItem: React.FC<IHeaderContentItem> = ({link,category}) => {
    return (
        <li className={'header__search-container__search-tags__tag-container__tag'}>
            <a target={'_blank'} href={link}>{category}</a>
        </li>
    );
}

export default HeaderContentItem;
