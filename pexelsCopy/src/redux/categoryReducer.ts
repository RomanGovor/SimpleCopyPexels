import { InferActionsTypes } from './store';
import { PhotoCardType } from '../types/commonTypes';
import { isUniquePhoto } from '../utils/photoEditing';

export const CATEGORIES_ASYNC_UPDATE_ARRAY_PHOTOS = 'CATEGORIES/ASYNC_UPDATE_ARRAY_PHOTOS';

export const initialState = {
  photos: [] as Array<PhotoCardType>,
  maxCountOfColumns: 3,
  photoPageIndex: 0 as number,
  title: '',
};

export const actionsCategories = {
  updateArrayPhotos: (photos: Array<PhotoCardType>) =>
    ({ type: 'CATEGORIES/UPDATE_ARRAY_PHOTOS', photos } as const),
  asyncUpdateArrayPhotos: (page: number, category?: string) =>
    ({ type: CATEGORIES_ASYNC_UPDATE_ARRAY_PHOTOS, page, category } as const),
  setCuratedPageIndex: (page: number) => ({ type: 'CATEGORIES/SET_PAGE_INDEX', page } as const),
  setCategoryTitle: (title: string) => ({ type: 'CATEGORIES/SET_CATEGORY_TITLE', title } as const),
  zeroing: () => ({ type: 'CATEGORIES/ZEROING_STATE' } as const),
};

export type InitialStateType = typeof initialState;
export type ActionsType = InferActionsTypes<typeof actionsCategories>;

const categoryReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'CATEGORIES/UPDATE_ARRAY_PHOTOS': {
      const isUnique = isUniquePhoto(
        state.photos[state.photos.length - 1],
        action.photos[action.photos.length - 1]
      );
      if (isUnique) {
        return {
          ...state,
          photos: [...state.photos, ...action.photos],
        };
      }
      return state;
    }
    case 'CATEGORIES/SET_PAGE_INDEX': {
      initialState.photoPageIndex = action.page;

      return {
        ...state,
        photoPageIndex: action.page,
      };
    }
    case 'CATEGORIES/SET_CATEGORY_TITLE': {
      return {
        ...state,
        title: action.title,
      };
    }
    case 'CATEGORIES/ZEROING_STATE': {
      return {
        ...state,
        photoPageIndex: 0,
        title: '',
        photos: [],
      };
    }
    default:
      return state;
  }
};

export default categoryReducer;
