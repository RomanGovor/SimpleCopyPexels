import { PhotoCardType, ArrColumnsType } from '../types/commonTypes';

const generatePhotoColumns = (
  columns: number,
  photos: Array<PhotoCardType>
): Array<ArrColumnsType> => {
  let arrColumns: Array<ArrColumnsType> = Array(columns)
    .fill(0)
    .map((el, i) => {
      return {
        colIndex: i,
        height: 0,
        photos: [],
      };
    });

  for (let i = 0; i < photos.length; i += 1) {
    const img = new Image();
    img.src = photos[i].src;

    arrColumns = arrColumns.sort((a, b) => a.height - b.height);

    const calcAttitudeImg: number = (img.height / img.width) * 100;
    if (!Number.isNaN(calcAttitudeImg)) {
      arrColumns[0].height += calcAttitudeImg;
      arrColumns[0].photos.push(i);
    } else {
      console.log(calcAttitudeImg, img, img.width, img.height);
      arrColumns[0].height += 700;
      arrColumns[0].photos.push(i);
    }
  }

  arrColumns = arrColumns.sort((a, b) => a.colIndex - b.colIndex);
  return arrColumns;
};

export default generatePhotoColumns;
