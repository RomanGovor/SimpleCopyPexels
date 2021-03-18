import React from 'react';
import './UnderlinedTabs.scss';
import { NavLink } from 'react-router-dom';
import { UnderlineTabsLangType } from '../../types/langTypes';

type PropsType = {
  vocabulary: UnderlineTabsLangType;
};

const UnderlinedTabs: React.FC<PropsType> = ({ vocabulary }) => {
  return (
    <div className="underlined-tabs underlined-tabs--large underlined-tabs--centered underlined-tabs--shadow">
      <a className="underlined-tabs__tab underlined-tabs__tab--active" href="/">
        {vocabulary.home}
      </a>
      <NavLink className="underlined-tabs__tab" to="/collections">
        {vocabulary.collections}
      </NavLink>
      <a
        className="underlined-tabs__tab"
        rel="noreferrer"
        target="_blank"
        href="https://www.pexels.com/videos/"
      >
        {vocabulary.videos}
      </a>
      <a
        className="underlined-tabs__tab"
        rel="noreferrer"
        target="_blank"
        href="https://www.pexels.com/leaderboard/"
      >
        {vocabulary.leaderboard}
      </a>
      <a
        className="underlined-tabs__tab"
        rel="noreferrer"
        target="_blank"
        href="https://www.pexels.com/challenges/"
      >
        {vocabulary.challenges}
      </a>
    </div>
  );
};

export default UnderlinedTabs;
