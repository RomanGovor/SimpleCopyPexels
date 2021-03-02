import React from "react";
import './UnderlinedTabs.scss'

const UnderlinedTabs: React.FC = () => {
    return (
        <div className={'underlined-tabs underlined-tabs--large underlined-tabs--centered underlined-tabs--shadow'}>
            <a className={'underlined-tabs__tab underlined-tabs__tab--active'} href={'/'}>Home</a>
            <a className={'underlined-tabs__tab'} target={'_blank'} href={'https://www.pexels.com/discover/'}>Discover</a>
            <a className={'underlined-tabs__tab'} target={'_blank'} href={'https://www.pexels.com/videos/'}>Videos</a>
            <a className={'underlined-tabs__tab'} target={'_blank'} href={'https://www.pexels.com/leaderboard/'}>Leaderboard</a>
            <a className={'underlined-tabs__tab'} target={'_blank'} href={'https://www.pexels.com/challenges/'}>Challenges</a>
        </div>
    );
}

export default UnderlinedTabs;
