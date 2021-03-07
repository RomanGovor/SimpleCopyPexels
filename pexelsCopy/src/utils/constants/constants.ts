import {IHeaderContentItem, PhotoCardType} from "../../types/commonTypes";
import defaultAvatar from "../../assets/images/default-avatar.svg";
import defaultImg from "../../assets/images/defaultImages/image-1.jpeg";


export const MAX_COUNT_PAGE: number = 80;

export const defaultPhotoParameters: PhotoCardType = {
    src: defaultImg,
    phNames: 'kira schwarz',
    phPhotoLink: defaultAvatar,
    phLink: 'https://www.pexels.com/@kira-schwarz',
    photoId: 2880507
};

export const mainCategories: Array<IHeaderContentItem> = [
    {link: 'nature', category: 'nature'},
    {link: 'industry', category: 'industry'},
    {link: 'water', category: 'water'},
    {link: 'communication', category: 'communication'},
    {link: 'interview', category: 'interview'},
    {link: 'vaccine', category: 'vaccine'},
    {link: 'business', category: 'business'},
    {link: 'work', category: 'work'},
    {link: 'finance', category: 'finance'},
    {link: 'technology', category: 'technology'},
    {link: 'office', category: 'office'},
    {link: 'people', category: 'people'},
    {link: 'success', category: 'success'},
    {link: 'team', category: 'team'},
    {link: 'building', category: 'building'},
    {link: 'computer', category: 'computer'},
    {link: 'city', category: 'city'},
    {link: 'design', category: 'design'},
    {link: 'travel', category: 'travel'},
    {link: 'laptop', category: 'laptop'},
    {link: 'idea', category: 'idea'},
    {link: 'construction', category: 'construction'},
    {link: 'luxury', category: 'luxury'},
    {link: 'working', category: 'working'},
    {link: 'family', category: 'family'},
    {link: 'energy', category: 'energy'},
    {link: 'calendar', category: 'calendar'},
    {link: 'castle', category: 'castle'},
    {link: 'love%20story', category: 'love story'},
    {link: 'puppy', category: 'puppy'},
    {link: 'movie', category: 'movie'},
    {link: 'dark', category: 'dark'},
    {link: 'coffee%20cup', category: 'coffee cup'},
    {link: 'eat', category: 'eat'},
    {link: 'sleep', category: 'sleep'},
    {link: 'tired', category: 'tired'},
    {link: 'happy', category: 'happy'},
    {link: 'landscape', category: 'landscape'},
    {link: 'mountains', category: 'mountains'},
    {link: 'clouds', category: 'clouds'},
    {link: 'love', category: 'love'},
    {link: 'flowers', category: 'flowers'},
];

