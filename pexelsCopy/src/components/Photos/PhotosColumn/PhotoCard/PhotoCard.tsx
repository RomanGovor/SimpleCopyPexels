import React from "react";
import {PhotoCardType} from "../../../../types/commonTypes";

import favoriteIcon from '../../../../assets/icons/favorite-icon.svg';
import starIcon from '../../../../assets/icons/star.svg';
import addIcon from '../../../../assets/icons/add.svg';
import successIcon from '../../../../assets/icons/success.svg';
import heartIcon from '../../../../assets/icons/heart.svg';
import fullHeartIcon from '../../../../assets/icons/full-heart.svg';

import './badge.scss'

const PhotoCard: React.FC<PhotoCardType> = ({src, phLink,phPhotoLink,phNames}) => {
    const img = new Image();
    img.src = src;

    // const calcAttitudeImg: number = img.height / img.width * 100;

    return (
        <div className={'photo-card hide-featured-badge hide-favorite-badge'}>
            <article className={'photo-item photo-item--overlay'}>
                <a target={'_blank'} href={'/'} className={'photo-item__link'}>
                    <img src={src} className={'photo-item__img'}/>
                    <div className={'badge-container'}>
                        <span className={'favorite-badge'}>
                            <img height={'14'} width={'14'} className={'favorite-badge__icon'} src={favoriteIcon} />
                        </span>
                        <span className={'featured-badge'}>
                            <img height={'14'} width={'14'} className={'featured-badge__icon'} src={starIcon} />
                        </span>
                    </div>
                </a>
                <a target={'_blank'} href={phLink} className={'photo-item__photographer'}>
                    <img height={'30'} width={'30'} src={phPhotoLink} className={'photo-item__avatar'}/>
                    <span className={'photo-item__name'}>{phNames}</span>
                </a>
                <div className={'photo-item__info'}>
                    <button className={'js-collect rd__button rd__button--collect rd__button--no-padding rd__button--text-white rd__button--with-icon'}>
                        <i className={'rd__button--collect--not-active--icon svg-icon'}>
                            <img src={addIcon}/>
                        </i>
                        <i className={'rd__button--collect--active--icon svg-icon none'}>
                            <img src={successIcon}/>
                        </i>
                    </button>
                    <button className={'js-like rd__button rd__button--like rd__button--no-padding rd__button--text-white rd__button--with-icon'}>
                        <i className={'rd__button--like--not-active--icon svg-icon'}>
                            <img src={heartIcon}/>
                        </i>
                        <i className={'rd__button--like--active--icon svg-icon none'}>
                            <img src={fullHeartIcon}/>
                        </i>
                    </button>
                </div>
            </article>
        </div>
    )
}

export default PhotoCard;
