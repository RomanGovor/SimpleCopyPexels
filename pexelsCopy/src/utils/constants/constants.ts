import { IHeaderContentItem, PhotoCardType, TrendingSearchesType } from '../../types/commonTypes';
import defaultAvatar from '../../assets/images/default-avatar.svg';
import defaultImg from '../../assets/images/loading.gif';
import lakeImg from '../../assets/images/trendingImages/lake.jpeg';
import fruitsImg from '../../assets/images/trendingImages/fruits.jpeg';
import talkingImg from '../../assets/images/trendingImages/talking.jpeg';
import conversationImg from '../../assets/images/trendingImages/conversation.jpeg';
import elephantImg from '../../assets/images/trendingImages/elephant.jpeg';
import facebookImg from '../../assets/images/trendingImages/facebook.jpeg';
import planImg from '../../assets/images/trendingImages/plan.jpeg';
import leadershipImg from '../../assets/images/trendingImages/leadership.jpeg';
import jungleImg from '../../assets/images/trendingImages/jungle.jpeg';
import parisImg from '../../assets/images/trendingImages/pairs.jpeg';
import dancingImg from '../../assets/images/trendingImages/dancing.jpeg';
import holdingImg from '../../assets/images/trendingImages/holding-hands.jpeg';
import innovationImg from '../../assets/images/trendingImages/innovation.jpeg';

export const MAX_COUNT_PAGE = 80;

export const defaultPhotoParameters: PhotoCardType = {
  src: defaultImg,
  phNames: 'kira schwarz',
  phPhotoLink: defaultAvatar,
  phLink: 'https://www.pexels.com/@kira-schwarz',
  photoId: 2880507111,
};

export const trendingCategories: Array<TrendingSearchesType> = [
  { word: 'lake', img: lakeImg },
  { word: 'fruits', img: fruitsImg },
  { word: 'talking', img: talkingImg },
  { word: 'conversation', img: conversationImg },
  { word: 'elephant', img: elephantImg },
  { word: 'facebook', img: facebookImg },
  { word: 'plan', img: planImg },
  { word: 'leadership', img: leadershipImg },
  { word: 'jungle', img: jungleImg },
  { word: 'pairs', img: parisImg },
  { word: 'dancing', img: dancingImg },
  { word: 'holding hands', img: holdingImg },
  { word: 'innovation', img: innovationImg },
];

export const mainCategories: Array<IHeaderContentItem> = [
  { link: 'nature', category: 'nature' },
  { link: 'industry', category: 'industry' },
  { link: 'water', category: 'water' },
  { link: 'communication', category: 'communication' },
  { link: 'interview', category: 'interview' },
  { link: 'vaccine', category: 'vaccine' },
  { link: 'business', category: 'business' },
  { link: 'work', category: 'work' },
  { link: 'finance', category: 'finance' },
  { link: 'technology', category: 'technology' },
  { link: 'office', category: 'office' },
  { link: 'people', category: 'people' },
  { link: 'success', category: 'success' },
  { link: 'team', category: 'team' },
  { link: 'building', category: 'building' },
  { link: 'computer', category: 'computer' },
  { link: 'city', category: 'city' },
  { link: 'design', category: 'design' },
  { link: 'travel', category: 'travel' },
  { link: 'laptop', category: 'laptop' },
  { link: 'idea', category: 'idea' },
  { link: 'construction', category: 'construction' },
  { link: 'luxury', category: 'luxury' },
  { link: 'working', category: 'working' },
  { link: 'family', category: 'family' },
  { link: 'energy', category: 'energy' },
  { link: 'calendar', category: 'calendar' },
  { link: 'castle', category: 'castle' },
  { link: 'love%20story', category: 'love story' },
  { link: 'puppy', category: 'puppy' },
  { link: 'movie', category: 'movie' },
  { link: 'dark', category: 'dark' },
  { link: 'coffee%20cup', category: 'coffee cup' },
  { link: 'eat', category: 'eat' },
  { link: 'sleep', category: 'sleep' },
  { link: 'tired', category: 'tired' },
  { link: 'happy', category: 'happy' },
  { link: 'landscape', category: 'landscape' },
  { link: 'mountains', category: 'mountains' },
  { link: 'clouds', category: 'clouds' },
  { link: 'love', category: 'love' },
  { link: 'flowers', category: 'flowers' },
];
