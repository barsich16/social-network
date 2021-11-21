import {connect} from "react-redux";
import {
    follow,
    setCurrentPage,
    unfollow,
    toggleFollowingInProgress, getUsers
} from "../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersFromState
} from "../../redux/usersSelectors";

class UsersContainer extends React.Component {
    componentDidMount = () => {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }
    onCurrentPageChanged = page => {
        this.props.setCurrentPage(page);
        this.props.getUsers(page, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount = {this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      onCurrentPageChanged={this.onCurrentPageChanged}
                      currentPage={this.props.currentPage}
                      users={this.props.users}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}
                      toggleFollowingInProgress={this.props.toggleFollowingInProgress}
                      followingInProgress={this.props.followingInProgress}

            />
        </>
    }

}
const mapStateToProps = state => {
    return {
        users: getUsersFromState(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}
// const mapDispatchToProps = dispatch => {
//     return {
//         follow: userId => {
//             dispatch(followAC(userId));
//         },
//         unfollow: userId => {
//             dispatch(unfollowAC(userId));
//         },
//         setUsers: users => {
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: page => {
//             dispatch(setCurrentPageAC(page));
//         },
//         setTotalUsersCount: count => {
//             dispatch(setTotalUsersCountAC(count));
//         },
//         toggleIsFetching: isFetching => {
//             dispatch(toggleIsFetchingAC(isFetching));
//         }
//     }
// };


export default compose(
    connect(mapStateToProps,{follow, unfollow, setCurrentPage, toggleFollowingInProgress, getUsers})
)(UsersContainer)
