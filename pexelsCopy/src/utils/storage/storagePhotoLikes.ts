import { LikesArrayType } from '../../types/commonTypes';

export function getLikes(): LikesArrayType {
  const likes: LikesArrayType = JSON.parse(<string>localStorage.getItem('pexels/likes'));
  return !likes ? [] : likes;
}

export function setLikes(likes: LikesArrayType) {
  localStorage.setItem('pexels/likes', JSON.stringify(likes));
}

export function togglePhotoLike(id: number): boolean {
  const likes: LikesArrayType = getLikes();

  if (likes.includes(id)) {
    const likeIndex = likes.indexOf(id);
    likes.splice(likeIndex, 1);

    setLikes(likes);
    return false;
  }

  likes.push(id);
  setLikes(likes);
  return true;
}
