import {userAPI} from "../api/api";

const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS', UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS', SET_USERS = 'SET-USERS', SET_CURRENT_PAGE = 'SET-CURRENT-PAGE',
    SET_TOTAL_USERS_COUNT= 'SET-TOTAL-USERS-COUNT', TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING',
    TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_IS_FOLLOWING_IN_PROGRESS';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW_SUCCESS: {
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId){
                        return {...user, followed: true}
                    }
                    return user;
                })
            };
        }
        case UNFOLLOW_SUCCESS: {  //REFACTOR THIS
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user;
                })
            };
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.page
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.count
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)   //!!!!

            }
        }
        default:
            return state;
    }
}

export const followSuccess = userId => ({type: FOLLOW_SUCCESS, userId});
export const unfollowSuccess = userId => ({type: UNFOLLOW_SUCCESS, userId});
export const setUsers = users => ({type: SET_USERS, users});
export const setCurrentPage = page => ({type: SET_CURRENT_PAGE, page});
export const setTotalUsersCount = count => ({type: SET_TOTAL_USERS_COUNT, count});
export const toggleIsFetching = isFetching => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingInProgress = (isFetching, userId) => ({type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching, userId});

export const getUsers = (currentPage, pageSize) => {       //Thunk Creator
    return async dispatch => {
        dispatch(toggleIsFetching(true));
        let data = await userAPI.getUsers(currentPage, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    };
}


export const follow = (userId) => {       //Thunk Creator
    return async dispatch => {
        dispatch(toggleFollowingInProgress(true, userId));
        let data = await userAPI.follow(userId);
        if (data.resultCode === 0) {
            dispatch(followSuccess(userId));
        }
        dispatch(toggleFollowingInProgress(false, userId));
    }
}
export const unfollow = (userId) => {       //Thunk Creator
    return async dispatch => {
        dispatch(toggleFollowingInProgress(true, userId));
        let data = await userAPI.unfollow(userId);
        if (data.resultCode === 0) {
            dispatch(unfollowSuccess(userId));
        }
        dispatch(toggleFollowingInProgress(false, userId));
    }
}

export default usersReducer;
