import axios, { AxiosRequestConfig } from 'axios';
import { createClient } from 'pexels';
import { getRandomInt } from '../utils/common';
import { MAX_COUNT_PAGE } from '../utils/constants/constants';

export const client = createClient('563492ad6f917000010000014640aabb4e9d420cbe1c0df7daf4c2bf');

export const photoAPI = {
  getCategoryPhotos(query: string, page: number) {
    return client.photos.search({ query, per_page: 10, page }).then((photos) => photos);
  },
  getHeaderPhoto() {
    const page = getRandomInt(MAX_COUNT_PAGE);
    return client.photos.search({ query: 'Nature', per_page: page }).then((photos) => photos);
  },
  getCuratedPhoto(page: number) {
    return client.photos.curated({ per_page: 10, page }).then((photos) => photos);
  },
  getPhotoBuId(id: number) {
    return client.photos.show({ id }).then((photo) => photo);
  },
};

export const instance = axios.create({
  baseURL: 'https://wordsapiv1.p.rapidapi.com/words/',
  headers: {
    'x-rapidapi-key': '2a31348cf4mshb7cd779fb72b047p10656bjsndf86794edd3a',
    'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
  },
});

export const wordsAPI = {
  getArrayWord(substr: string) {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://wordsapiv1.p.rapidapi.com/words/',
      params: {
        letterPattern: `^${substr}.`,
        limit: '100',
        page: '1',
      },
      headers: {
        'x-rapidapi-key': '2a31348cf4mshb7cd779fb72b047p10656bjsndf86794edd3a',
        'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
      },
    };

    return axios.request(options).then((response) => response);
  },
};
