import React, {useState} from "react";
import './HomePage.scss';
import './TitleTabs.scss';
import arrowDown from '../../assets/icons/arrow-down.svg';
import Photos from "../../components/Photos/Photos";
import {InitialStateType} from "../../redux/homeReducer";

type PropsType = {
    homePage: InitialStateType
}

const HomePage: React.FC<PropsType> = (props) => {
    const photos = props.homePage.photos;
    const maxCountOfColumns = props.homePage.maxCountOfColumns;

    const [isMouseOver, setMouseEnter] = useState(false);

    const setFalseMouseOver = (event: React.MouseEvent) => {
        setMouseEnter(false);
    }

    const setTrueMouseOver = (event: React.MouseEvent) => {
        setMouseEnter(true);
    }

    return (
        <>
            <div className={'container home-page'}>
                <div className={'title-tabs'}>
                    <div className={'title-tabs__title'}>Free Stock Photos</div>
                    <div onMouseOver={setTrueMouseOver}
                         onMouseOut={setFalseMouseOver}
                         className={`rd__dropdown rd__dropdown--right ${isMouseOver ? 'rd__dropdown--active': ''}`}>
                        <div className={'rd__button rd__button--text-primary rd__button--compact rd__button--with-icon rd__button--no-right-padding'}>
                            <span>Trending</span>
                            <i className={'svg-icon'}>
                                <img src={arrowDown}/>
                            </i>
                        </div>
                        <div className={'rd__dropdown__container'}>
                            <div className={'rd__dropdown__container__content'}>
                                <ul className={'rd__dropdown__container__items'}>
                                    <li><a href={'/'}>Trending</a></li>
                                    <li><a target={'_blank'} href={'https://www.pexels.com/new-photos/'}>New</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <Photos photos={photos} maxCountOfColumns={maxCountOfColumns}/>
            </div>
        </>
    );
}

export default HomePage;
