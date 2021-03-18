import React, { useEffect, useState } from 'react';
import './Modal.scss';
import './Photo-page.scss';
import { useDispatch } from 'react-redux';
import { PhotoCardType } from '../../types/commonTypes';
import closeSvg from '../../assets/icons/cross.svg';
import fullHeartIcon from '../../assets/icons/full-heart.svg';
import heartIcon from '../../assets/icons/heart-black.svg';
import addIcon from '../../assets/icons/add-black.svg';
import collectIcon from '../../assets/icons/success.svg';
import { getLikes, togglePhotoLike } from '../../utils/storage/storagePhotoLikes';
import { actionsCommon } from '../../redux/commonReducer';
import { getCollectPhotos, toggleCollectPhoto } from '../../utils/storage/storagePhotoCollect';
import { defaultPhotoParameters } from '../../utils/constants/constants';
import { ModalLangType } from '../../types/langTypes';

type PropsType = {
  photo: PhotoCardType;
  isOpenModal: boolean;
  vocabulary: ModalLangType;
};

const Modal: React.FC<PropsType> = ({ photo, isOpenModal, vocabulary }) => {
  const [isLiked, setLike] = useState(photo.isLiked);
  const [isCollect, setCollect] = useState(photo.isCollect);

  const fullName = photo.phNames
    .split(' ')
    .map((el) => {
      return el
        .split('')
        .map((symb, i) => {
          return i === 0 ? symb.toUpperCase() : symb.toLowerCase();
        })
        .join('');
    })
    .join(' ');

  const dispatch = useDispatch();

  useEffect(() => {
    setCollect(photo.isCollect);
    setLike(photo.isLiked);

    if (photo.photoId === defaultPhotoParameters.photoId) {
      dispatch(actionsCommon.setOpenModalFlag(false));
    }
  }, [photo.photoId]);

  const onLikeBtnClick = (): void => {
    setLike(togglePhotoLike(photo.photoId));
    const likes = getLikes();
    dispatch(actionsCommon.setLikedPhotos(likes));
  };

  const onCollectBtnClick = (): void => {
    setCollect(toggleCollectPhoto(photo.photoId));
    const collectPhotos = getCollectPhotos();

    console.log(collectPhotos);
    dispatch(actionsCommon.setCollectPhotos(collectPhotos));
  };

  const clickHandler = (event: any) => {
    const overlay = event.target;
    if (overlay?.classList?.contains('modal__overlay')) {
      dispatch(actionsCommon.setPhotoModalCard(defaultPhotoParameters));
      dispatch(actionsCommon.setOpenModalFlag(false));
    }
  };

  useEffect(() => {
    document.addEventListener('click', clickHandler);
    return function () {
      document.removeEventListener('click', clickHandler);
    };
  }, []);

  const onCloseClick = () => {
    dispatch(actionsCommon.setPhotoModalCard(defaultPhotoParameters));
    dispatch(actionsCommon.setOpenModalFlag(false));
  };

  return (
    <div className={`modal ${isOpenModal && ' modal--open '}`}>
      <div className="photo-page-navbar">
        <div className="nav-level">
          <div className="nav-level__left">
            <div className="nav-level__item mt10">
              <button
                type="button"
                onClick={onCloseClick}
                className="rd__button rd__button--text rd__button--circle-icon"
              >
                <i className="rd__svg-icon svg-icon">
                  <img alt="close-icon" src={closeSvg} />
                </i>
              </button>
            </div>
          </div>
          <div className="nav-level__right" />
        </div>
      </div>
      <div className="modal__overlay">
        <button
          onClick={onCloseClick}
          type="button"
          className="modal__exit rd__button rd__button--text-white rd__button--circle-icon"
        >
          <i className="rd__svg-icon svg-icon">
            <img alt="close-icon" src={closeSvg} />
          </i>
        </button>
        <div className="modal__content">
          <div className="photo-page">
            <section className="photo-page__section photo-page__section--action-bar">
              <div className="nav-level nav-level--responsive">
                <div className="nav-level__left photo-page__hidden-on-mobile">
                  <div className="nav-level__item">
                    <div className="nav-level nav-level--responsive-large">
                      <div className="nav-level__item">
                        <a
                          className="photo-page__mini-profile"
                          href={photo.phLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <div className="photo-page__mini-profile__avatar rd__avatar rd__avatar--large">
                            <img
                              height="50"
                              width="50"
                              alt="photographer-link"
                              src={photo.phPhotoLink}
                            />
                          </div>
                          <div className="photo-page__mini-profile__text">
                            <h3 className="photo-page__mini-profile__text__title">{fullName}</h3>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="nav-level__right photo-page__action-buttons-level-item">
                  <div className="nav-level__item photo-page__action-buttons-level-item">
                    <div className="rd__button-group photo-page__action-buttons">
                      <button
                        type="button"
                        onClick={onLikeBtnClick}
                        className="js-like js-photo-page-action-buttons-like rd__button rd__button--white rd__button--with-icon-left"
                      >
                        {isLiked && (
                          <i className="rd__button--like--active--icon svg-icon">
                            <img alt="full-heart-icon" src={fullHeartIcon} />
                          </i>
                        )}
                        {!isLiked && (
                          <i className="rd__button--like--not-active--icon svg-icon">
                            <img alt="heart-icon" src={heartIcon} />
                          </i>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={onCollectBtnClick}
                        className="js-collect js-photo-page-action-buttons-collect rd__button rd__button--white rd__button--with-icon-left"
                      >
                        {!isCollect && (
                          <i className="rd__button--collect-active--icon svg-icon">
                            <img alt="add-icon" src={addIcon} />
                          </i>
                        )}
                        {isCollect && (
                          <i className="rd__button--collect-active--icon svg-icon">
                            <img alt="collect-icon" src={collectIcon} />
                          </i>
                        )}
                        <span>{vocabulary.collect}</span>
                      </button>
                      <div className="js-photo-page-action-buttons-download">
                        <div className="rd__button-group rd__button-group--space-with-margin-left rd__button-group--bar rd__button-group--bar--border-between">
                          <a
                            className="js-download-a-tag rd__button rd__button--download"
                            download
                            href={`https://www.pexels.com/photo/${photo.photoId}/download/`}
                          >
                            <span>{vocabulary.download}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="photo-page__section photo-page__section--photo">
              <div className="photo-page__photo">
                <a download href={`https://www.pexels.com/photo/${photo.photoId}/download/`}>
                  <div className="photo-page__photo__image">
                    <img alt={photo.src} src={photo.src} />
                  </div>
                </a>
              </div>
            </section>
            <section className="photo-page__section photo-page__section--photo-details">
              <div className="photo-page__photo-details-overview">
                <div className="photo-page__visible-on-mobile">
                  <div className="rd__card">
                    <div className="rd__card__title">{vocabulary.photographer}</div>
                    <div className="rd__card__section">
                      <a
                        className="photo-page__mini-profile"
                        href={photo.phLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="photo-page__mini-profile__avatar rd__avatar rd__avatar--large">
                          <img alt="photographer" height="50" width="50" src={photo.phPhotoLink} />
                        </div>
                        <div className="photo-page__mini-profile__text">
                          <h3 className="photo-page__mini-profile__text__title">{fullName}</h3>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <p className="photo-page__photo-details-overview__description" />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
