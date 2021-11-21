import React from "react";
import {addMessageActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = state => {
    return {
        dialogPage: state.dialogPage,
        isAuth: state.auth.isAuth
    }
};
let mapDispatchToProps = dispatch => {
    return {
        addMessage: (newMessageBody) => {
            let action = addMessageActionCreator(newMessageBody);
            dispatch(action);
        }
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);
