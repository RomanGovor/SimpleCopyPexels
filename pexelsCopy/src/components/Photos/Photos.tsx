import React from "react";
import './Photos.scss'
import {PhotoCardType} from "../../interfaces/headerInterfaces";
import PhotoCard from "./PhotoCard/PhotoCard";

import img1 from '../../assets/images/defaultImages/image-1.jpeg';
import img2 from '../../assets/images/defaultImages/image-2.jpg';
import img3 from '../../assets/images/defaultImages/image-3.jpg';


const initialState: Array<PhotoCardType> = [
    {src: img1, phNames: 'kira schwarz', phPhotoLink: 'https://images.pexels.com/users/avatars/616468/kira-schwarz-869.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@kira-schwarz'},
    {src: img2, phNames: 'Jc Siller', phPhotoLink: 'https://images.pexels.com/users/avatars/30672065/jc-siller-412.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@jc-siller-30672065'},
    {src: img3, phNames: 'Vinícius Estevão', phPhotoLink: 'https://images.pexels.com/users/avatars/920335/vinicius-estevao-866.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@eosvini'},
]

const Photos: React.FC = () => {
    return (
        <div className={'photos'}>
            <div className={'photos__column'}>
                <PhotoCard src={initialState[0].src} phLink={initialState[0].phLink} phNames={initialState[0].phNames} phPhotoLink={initialState[0].phPhotoLink}/>
                <PhotoCard src={initialState[1].src} phLink={initialState[1].phLink} phNames={initialState[1].phNames} phPhotoLink={initialState[1].phPhotoLink}/>
                <PhotoCard src={initialState[1].src} phLink={initialState[1].phLink} phNames={initialState[1].phNames} phPhotoLink={initialState[1].phPhotoLink}/>
                <PhotoCard src={initialState[2].src} phLink={initialState[2].phLink} phNames={initialState[2].phNames} phPhotoLink={initialState[2].phPhotoLink}/>
            </div>
            {/*<div className={'photos__column'}>*/}
            {/*    <PhotoCard src={initialState[1].src} phLink={initialState[1].phLink} phNames={initialState[1].phNames} phPhotoLink={initialState[1].phPhotoLink}/>*/}
            {/*    <PhotoCard src={initialState[0].src} phLink={initialState[0].phLink} phNames={initialState[0].phNames} phPhotoLink={initialState[0].phPhotoLink}/>*/}
            {/*    <PhotoCard src={initialState[1].src} phLink={initialState[1].phLink} phNames={initialState[1].phNames} phPhotoLink={initialState[1].phPhotoLink}/>*/}
            {/*    <PhotoCard src={initialState[2].src} phLink={initialState[2].phLink} phNames={initialState[2].phNames} phPhotoLink={initialState[2].phPhotoLink}/>*/}
            {/*</div>*/}
            {/*<div className={'photos__column'}>*/}
            {/*    <PhotoCard src={initialState[2].src} phLink={initialState[2].phLink} phNames={initialState[2].phNames} phPhotoLink={initialState[2].phPhotoLink}/>*/}
            {/*    <PhotoCard src={initialState[2].src} phLink={initialState[2].phLink} phNames={initialState[2].phNames} phPhotoLink={initialState[2].phPhotoLink}/>*/}
            {/*    <PhotoCard src={initialState[0].src} phLink={initialState[0].phLink} phNames={initialState[0].phNames} phPhotoLink={initialState[0].phPhotoLink}/>*/}
            {/*    <PhotoCard src={initialState[1].src} phLink={initialState[1].phLink} phNames={initialState[1].phNames} phPhotoLink={initialState[1].phPhotoLink}/>*/}
            {/*    <PhotoCard src={initialState[2].src} phLink={initialState[2].phLink} phNames={initialState[2].phNames} phPhotoLink={initialState[2].phPhotoLink}/>*/}
            {/*</div>*/}
        </div>
    )
}

export default Photos;
