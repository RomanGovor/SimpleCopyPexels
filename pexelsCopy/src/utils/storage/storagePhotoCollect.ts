import { CollectArrayType } from '../../types/commonTypes';

export function getCollectPhotos(): CollectArrayType {
  const collectPhotos: CollectArrayType = JSON.parse(
    <string>localStorage.getItem('pexels/collectPhotos')
  );
  return !collectPhotos ? [] : collectPhotos;
}

export function setCollectPhotos(collectPhotos: CollectArrayType) {
  localStorage.setItem('pexels/collectPhotos', JSON.stringify(collectPhotos));
}

export function toggleCollectPhoto(id: number): boolean {
  const collectPhotos: CollectArrayType = getCollectPhotos();

  if (collectPhotos.includes(id)) {
    const collectIndex = collectPhotos.indexOf(id);
    collectPhotos.splice(collectIndex, 1);

    setCollectPhotos(collectPhotos);
    return false;
  }

  collectPhotos.push(id);
  setCollectPhotos(collectPhotos);
  return true;
}
