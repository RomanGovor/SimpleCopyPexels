import React from 'react';
import { NavLink } from 'react-router-dom';
import { TrendingSearchesType } from '../../../types/commonTypes';

type PropsType = {
  trendingItem: TrendingSearchesType;
};

const TrendingSearchesItem: React.FC<PropsType> = ({ trendingItem }) => {
  const upperCaseWord = trendingItem.word.split('').map((el, i) => {
    return i === 0 ? el.toUpperCase() : el.toLowerCase();
  });

  return (
    <NavLink to={`/category/${trendingItem.word}`} className="image-tag">
      <img alt={trendingItem.word} className="image-tag__img" src={trendingItem.img} />
      <span>{upperCaseWord}</span>
    </NavLink>
  );
};

export default TrendingSearchesItem;
