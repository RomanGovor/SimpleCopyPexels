import React from 'react';
import RecentSearchesItem from './RecentSearchesItem';

type PropsType = {
  resentSearches: Array<string>;
};

const RecentSearches: React.FC<PropsType> = ({ resentSearches }) => {
  const resentElements = resentSearches.map((word) => {
    return <RecentSearchesItem word={word} key={word} />;
  });

  return (
    <div className="search-bar__recent-searches" key={resentSearches[0]}>
      {resentElements}
    </div>
  );
};

export default RecentSearches;
