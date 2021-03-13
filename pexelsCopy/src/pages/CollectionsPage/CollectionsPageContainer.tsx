import {AppStateType} from "../../redux/store";
import {compose} from "redux";
import {connect, useDispatch} from "react-redux";
import {actions} from "../../redux/homeReducer";
import React, {useEffect} from "react";
import CollectionsPage from "./CollectionsPage";
import {InitialStateType as CommonStateType} from "../../redux/commonReducer";
import {
    actionsCollections,
    InitialStateType as CollectionsStateType
} from "../../redux/collectionsReducer";


type mapStateType = {
    collectionsPage: CollectionsStateType,
    common: CommonStateType
}


type PropsType = mapStateType;

const CollectionsPageContainer: React.FC<PropsType> = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionsCollections.asyncAddCollectionsPhoto(props.common.collectPhotos));
        return () => {
            dispatch(actionsCollections.zeroingData());
        }
    }, []);


    return (
        <CollectionsPage
            collectionsPage={props.collectionsPage}
            common={props.common}
        />
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
        common: state.common,
        collectionsPage: state.collectionsPage
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions})
)(CollectionsPageContainer);
