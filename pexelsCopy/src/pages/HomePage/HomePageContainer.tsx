import { compose } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import { AppStateType } from '../../redux/store';
import { actions } from '../../redux/homeReducer';
import HomePage from './HomePage';

const mapStateToProps = (state: AppStateType) => {
  return {
    homePage: state.homePage,
    common: state.common,
  };
};

export default compose<React.ComponentType>(connect(mapStateToProps, { ...actions }))(HomePage);
