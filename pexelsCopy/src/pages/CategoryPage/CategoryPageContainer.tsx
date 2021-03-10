import {AppStateType} from "../../redux/store";
import {compose} from "redux";
import {connect, useDispatch} from "react-redux";
import {actions} from "../../redux/homeReducer";
import CategoryPage from "./CategoryPage";
import {withRouter, RouteComponentProps} from "react-router-dom";
import React, {useEffect} from "react";
import {actionsCategories, InitialStateType as CategoryStateType} from "../../redux/categoryReducer";
import {InitialStateType as CommonStateType} from "../../redux/commonReducer";

type mapStateType = {
    categoryPage: CategoryStateType,
    common: CommonStateType
}

type PathParamsType = {
    query: string
}

type PropsType = mapStateType & RouteComponentProps<PathParamsType>;

const CategoryPageContainer: React.FC<PropsType> = (props) => {
    const title = props.match.params.query;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionsCategories.setCategoryTitle(title));

        return () => {
           dispatch(actionsCategories.zeroing());
        }
    }, []);

    const query = props.match.params.query.split('')
        .map((el, i) => {
        return i === 0 ? el.toUpperCase() : el.toLowerCase()
    }).join('');

    return (
        <CategoryPage categoryPage={props.categoryPage}
                      query={query}
                      common={props.common}
        />
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
        categoryPage: state.categoryPage,
        common: state.common
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    withRouter
)(CategoryPageContainer);
