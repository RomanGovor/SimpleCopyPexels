import {AppStateType} from "../../redux/store";
import {compose} from "redux";
import {connect} from "react-redux";
import {actions} from "../../redux/homeReducer";
import HomePage from "./HomePage";
import React from "react";

const mapStateToProps = (state: AppStateType) => {
    return {
        homePage: state.homePage,
        common: state.common
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions})
)(HomePage);
