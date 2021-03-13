import React, {useEffect, useState} from "react";
import {PhotoCardType} from "../../../../types/commonTypes";

import favoriteIcon from '../../../../assets/icons/favorite-icon.svg';
import starIcon from '../../../../assets/icons/star.svg';
import addIcon from '../../../../assets/icons/add.svg';
import collectIcon from '../../../../assets/icons/collect-white.svg';
import heartIcon from '../../../../assets/icons/heart.svg';
import fullHeartIcon from '../../../../assets/icons/full-heart.svg';
import downloadIcon from '../../../../assets/icons/download.svg';

import './badge.scss'

type PropsType = {
    isLiked: boolean
}

const PhotoCard: React.FC<PhotoCardType & PropsType> = (props) => {
    const {src, phLink,phPhotoLink,phNames, photoId, isLiked, isCollect} = props;

    return (
        <div className={'photo-card hide-featured-badge hide-favorite-badge'}>
            <article className={'photo-item photo-item--overlay'} data-photoid={photoId}>
                <a className={'photo-item__link'}>
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
                    <a className={'js-download rd__button rd__button--download rd__button--no-padding rd__button--text-white rd__button--with-icon'}
                       download href={`https://www.pexels.com/photo/${photoId}/download/`}>
                        <i className={'rd__button--download--active--icon svg-icon'}>
                            <img src={downloadIcon}/>
                        </i>
                    </a>
                    <button data-photoid={photoId} className={'js-collect rd__button rd__button--collect rd__button--no-padding rd__button--text-white rd__button--with-icon'}>
                        {!isCollect && <i className={'rd__button--collect--not-active--icon svg-icon'}>
                            <img src={addIcon}/>
                        </i>
                        }
                        {isCollect && <i className={'rd__button--collect--active--icon svg-icon'}>
                                <img src={collectIcon}/>
                            </i>
                        }
                    </button>
                    <button data-photoid={photoId} className={'js-like rd__button rd__button--like rd__button--no-padding rd__button--text-white rd__button--with-icon'}>
                        {isLiked && <i className={'rd__button--like--active--icon svg-icon'}>
                            <img src={fullHeartIcon}/>
                        </i>
                        }
                        {!isLiked && <i className={'rd__button--like--active--icon svg-icon'}>
                                <img src={heartIcon}/>
                        </i>
                        }
                    </button>
                </div>
            </article>
        </div>
    )
}

export default PhotoCard;
