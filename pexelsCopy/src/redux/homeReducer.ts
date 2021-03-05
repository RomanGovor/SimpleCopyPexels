import {InferActionsTypes} from './store';
import {PhotoCardType} from "../interfaces/headerInterfaces";
import img1 from "../assets/images/defaultImages/image-1.jpeg";
import img2 from "../assets/images/defaultImages/image-2.jpg";
import img3 from "../assets/images/defaultImages/image-3.jpg";


const initialState = {
    photos: [
        {src: img1, phNames: 'kira schwarz', phPhotoLink: 'https://images.pexels.com/users/avatars/616468/kira-schwarz-869.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@kira-schwarz'},
        {src: img2, phNames: 'Jc Siller', phPhotoLink: 'https://images.pexels.com/users/avatars/30672065/jc-siller-412.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@jc-siller-30672065'},
        {src: img3, phNames: 'Vinícius Estevão', phPhotoLink: 'https://images.pexels.com/users/avatars/920335/vinicius-estevao-866.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@eosvini'},
        {src: img1, phNames: 'kira schwarz', phPhotoLink: 'https://images.pexels.com/users/avatars/616468/kira-schwarz-869.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@kira-schwarz'},
        {src: img2, phNames: 'Jc Siller', phPhotoLink: 'https://images.pexels.com/users/avatars/30672065/jc-siller-412.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@jc-siller-30672065'},
        {src: img3, phNames: 'Vinícius Estevão', phPhotoLink: 'https://images.pexels.com/users/avatars/920335/vinicius-estevao-866.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@eosvini'},
        {src: img1, phNames: 'kira schwarz', phPhotoLink: 'https://images.pexels.com/users/avatars/616468/kira-schwarz-869.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@kira-schwarz'},
        {src: img2, phNames: 'Jc Siller', phPhotoLink: 'https://images.pexels.com/users/avatars/30672065/jc-siller-412.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@jc-siller-30672065'},
        {src: img3, phNames: 'Vinícius Estevão', phPhotoLink: 'https://images.pexels.com/users/avatars/920335/vinicius-estevao-866.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@eosvini'},
        {src: img1, phNames: 'kira schwarz', phPhotoLink: 'https://images.pexels.com/users/avatars/616468/kira-schwarz-869.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@kira-schwarz'},
        {src: img2, phNames: 'Jc Siller', phPhotoLink: 'https://images.pexels.com/users/avatars/30672065/jc-siller-412.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@jc-siller-30672065'},
        {src: img3, phNames: 'Vinícius Estevão', phPhotoLink: 'https://images.pexels.com/users/avatars/920335/vinicius-estevao-866.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@eosvini'},
        {src: img1, phNames: 'kira schwarz', phPhotoLink: 'https://images.pexels.com/users/avatars/616468/kira-schwarz-869.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@kira-schwarz'},
        {src: img2, phNames: 'Jc Siller', phPhotoLink: 'https://images.pexels.com/users/avatars/30672065/jc-siller-412.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@jc-siller-30672065'},
        {src: img3, phNames: 'Vinícius Estevão', phPhotoLink: 'https://images.pexels.com/users/avatars/920335/vinicius-estevao-866.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@eosvini'},

    ] as Array<PhotoCardType>,
    maxCountOfColumns: 3
};

export const actions = {
    addPostActionCreator: (phLink: string, phPhotoLink: string, src: string, phNames: string) =>
        ({type: 'ADD_PHOTO_CARD', phNames, phPhotoLink, phLink, src
    } as const),
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const homeReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'ADD_PHOTO_CARD': {
            const newPhoto = {
                phLink: action.phLink,
                phPhotoLink: action.phLink,
                phNames: action.phNames,
                src: action.src
            } as PhotoCardType;
            return {
                ...state,
                photos: [...state.photos, newPhoto],
            };
        }
        default:
            return state;
    }
}


export default homeReducer;
