import React, { useState } from 'react';
import Navbar from '../../components/Navigation/Navbar';
import '../CategoryPage/CategoryPage.scss';
import { InitialStateType as CommonStateType } from '../../redux/commonReducer';
import { InitialStateType } from '../../redux/collectionsReducer';
import Photos from '../../components/Photos/Photos';

type PropsType = {
  collectionsPage: InitialStateType;
  common: CommonStateType;
};

const CollectionsPage: React.FC<PropsType> = (props) => {
  const { photos, maxCountOfColumns } = props.collectionsPage;
  const [isBadRequest] = useState(false);
  const vocabulary = props.common.vocabulary.collectionsPage;

  const { likedPhotos } = props.common;
  const { collectPhotos } = props.common;

  const title = photos && photos.length > 0 ? vocabulary.title : vocabulary.noPictures;

  return (
    <>
      <Navbar isMain={false} common={props.common} />
      <div className="category">
        <section className="category__header">
          <h1 className="category__header__title">{title}</h1>
        </section>
        <section className="category__grid">
          {photos && photos.length !== 0 && (
            <Photos
              photos={photos}
              maxCountOfColumns={maxCountOfColumns}
              likedPhotosArray={likedPhotos}
              collectPhotos={collectPhotos}
              isBadRequest={isBadRequest}
              isFetching
            />
          )}
        </section>
      </div>
    </>
  );
};

export default CollectionsPage;
