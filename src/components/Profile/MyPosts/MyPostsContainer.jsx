import s from './MyPosts.module.css'
import React from "react";
import {addPostActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = state => {
    return {
        posts: state.profilePage.posts
    }
};
let mapDispatchToProps = dispatch => {
    return {
        addPost: newPostText => {
            let action = addPostActionCreator(newPostText);
            dispatch(action);
        }
    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;
