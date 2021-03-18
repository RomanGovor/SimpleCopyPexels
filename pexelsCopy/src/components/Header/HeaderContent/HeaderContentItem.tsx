import React from 'react';
import { NavLink } from 'react-router-dom';
import { IHeaderContentItem } from '../../../types/commonTypes';

const HeaderContentItem: React.FC<IHeaderContentItem> = ({ link, category }) => {
  return (
    <li className="header__search-container__search-tags__tag-container__tag">
      <NavLink to={`/category/${link}`}>{category}</NavLink>
    </li>
  );
};

export default HeaderContentItem;
