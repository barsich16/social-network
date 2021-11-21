import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

let initialState = {
    posts: [
        {id: 1, message: 'Hey', likesCount: 12},
        {id: 2, message: 'How are you?', likesCount: 13},
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 2,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        default:
            return state;
    }
}
export const addPostActionCreator = newPostText => ({type: ADD_POST, newPostText});
export const setUserProfileToState = data => ({type: SET_USER_PROFILE, profile: data})
export const setUserStatus = status => ({type: SET_USER_STATUS, status})

export const setUserProfile = userId => async dispatch => {
    let response = await profileAPI.getUserProfile(userId);
        dispatch(setUserProfileToState(response.data));
};
export const getUserStatus = userId => async dispatch => {
    let response = await profileAPI.getStatus(userId);
        dispatch(setUserStatus(response.data));
};
export const updateUserStatus = status => async dispatch => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
};


export default profileReducer;
