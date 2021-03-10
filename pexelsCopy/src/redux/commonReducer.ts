import {InferActionsTypes, BaseThunkType} from './store';
import {LikesArrayType} from "../types/commonTypes";

type ThunkType = BaseThunkType<ActionsType>

const initialState = {
    likedPhotos: [] as Array<number>,
};

export const actionsCommon = {
    setLikedPhotos: (likedPhotos: LikesArrayType) =>
        ({type: 'COMMON/SET_LIKED_PHOTOS', likedPhotos} as const),
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actionsCommon>

const commonReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'COMMON/SET_LIKED_PHOTOS': {
            return {
                ...state,
                likedPhotos: [...action.likedPhotos]
            };
        }
        default:
            return state;
    }
}


export default commonReducer;
