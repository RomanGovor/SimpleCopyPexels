import React from "react";

type PhotosColumnType = {
    photosElems: Array<JSX.Element>
}

const PhotosColumn: React.FC<PhotosColumnType> = ({photosElems}) => {
    return (
        <div className={'photos__column'}>
            {photosElems}
        </div>
    )
}


export default PhotosColumn;
