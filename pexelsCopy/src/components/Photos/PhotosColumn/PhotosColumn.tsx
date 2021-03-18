import React from 'react';
import Preloader from '../../common/Preloader/Preloader';

type PhotosColumnType = {
  photosElems: Array<JSX.Element>;
  isFetching: boolean;
  isBadRequest: boolean;
};

const PhotosColumn: React.FC<PhotosColumnType> = ({ photosElems, isFetching, isBadRequest }) => {
  return (
    <div className="photos__column">
      {photosElems}
      {!isFetching && !isBadRequest ? <Preloader /> : null}
    </div>
  );
};

export default PhotosColumn;
