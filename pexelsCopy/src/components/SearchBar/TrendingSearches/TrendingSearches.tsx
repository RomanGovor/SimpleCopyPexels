import React from 'react';
import { TrendingSearchesType } from '../../../types/commonTypes';
import TrendingSearchesItem from './TrendingSearchesItem';

type PropsType = {
  trendingSearches: Array<TrendingSearchesType>;
};

const TrendingSearches: React.FC<PropsType> = ({ trendingSearches }) => {
  const trendingElements = trendingSearches.map((el, i) => {
    return <TrendingSearchesItem trendingItem={el} key={el.word} />;
  });

  return (
    <div className="search-bar__trending-searches" key={trendingElements[0].key}>
      {trendingElements}
    </div>
  );
};

export default TrendingSearches;
