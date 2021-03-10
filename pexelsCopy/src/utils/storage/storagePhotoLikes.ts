import {LikesArrayType} from "../../types/commonTypes";

export function getLikes(): LikesArrayType {
    // @ts-ignore
    const likes: LikesArrayType = JSON.parse(localStorage.getItem('pexels/likes'));
    return !likes ? [] : likes;
}

export function setLikes(likes: LikesArrayType) {
    localStorage.setItem('pexels/likes', JSON.stringify(likes));
}

export function togglePhotoLike(id: never & number): boolean {
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
