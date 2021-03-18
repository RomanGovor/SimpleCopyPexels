import React from 'react';
import { NavigationItemType } from '../../../types/commonTypes';
import OverlayListItem from './OverlayListItem';
import { getRandomInt } from '../../../utils/common';

type PropsType = {
  navItems: Array<NavigationItemType>;
};

const OverlayList: React.FC<PropsType> = ({ navItems }) => {
  const navElements = navItems.map((item) => {
    const key = getRandomInt(10000);
    return (
      <OverlayListItem
        title={item.title}
        link={item.link}
        isNavItem={item.isNavItem}
        key={item.title + key}
      />
    );
  });

  return <>{navElements}</>;
};

export default OverlayList;
