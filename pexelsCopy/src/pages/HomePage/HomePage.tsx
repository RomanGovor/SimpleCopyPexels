import React from 'react';
import './HomePage.scss';
import { actions, InitialStateType } from '../../redux/homeReducer';
import { InitialStateType as CommonStateType } from '../../redux/commonReducer';

import UnderlinedTabs from '../../components/UnderlinedTabs/UnderlinedTabs';
import TitleTabs from './TitleTabs/TitleTabs';
import withSuspense from '../../components/common/Suspense/withSuspense';
import Navbar from '../../components/Navigation/Navbar';
import PhotosContainer from '../../components/Photos/PhotosContainer';

type PropsType = {
  homePage: InitialStateType;
  common: CommonStateType;
};

const Header = React.lazy(() => import('../../components/Header/Header'));
const SuspendedHeader = withSuspense(Header);

const HomePage: React.FC<PropsType> = (props) => {
  const { photos, headerPhoto, maxCountOfColumns, recommendCategories } = props.homePage;
  const likedPhotosArray: Array<number> = props.common.likedPhotos;
  const { collectPhotos } = props.common;

  const {
    underlineTabs: vocabularyUnderlinedTabs,
    homePage: titleTabslinedTabs,
  } = props.common.vocabulary;

  return (
    <>
      <Navbar isMain common={props.common} />
      <SuspendedHeader
        headerPhoto={headerPhoto}
        recommendCategories={recommendCategories}
        common={props.common}
      />
      <UnderlinedTabs vocabulary={vocabularyUnderlinedTabs} />
      <div className="container home-page">
        <TitleTabs vocabulary={titleTabslinedTabs} />
        <PhotosContainer
          photos={photos}
          maxCountOfColumns={maxCountOfColumns}
          likedPhotosArray={likedPhotosArray}
          collectPhotos={collectPhotos}
          isBadRequest={false}
          updatePhotos={actions.asyncUpdateArrayPhotos}
        />
      </div>
    </>
  );
};

export default HomePage;
