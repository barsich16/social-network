import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserStatus, setUserProfile, updateUserStatus} from "../../redux/profileReducer";
import {withRouter} from "react-router";
import {compose} from "redux";
class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId; //беремо з URL id користувача
        if (!userId) {
            userId = this.props.authorizedUserId;   //беремо з state якщо ми авторизовані
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.setUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    render () {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = state => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId
});
export default compose(
    connect(mapStateToProps, {setUserProfile, getUserStatus, updateUserStatus}),
    withRouter
)(ProfileContainer);
