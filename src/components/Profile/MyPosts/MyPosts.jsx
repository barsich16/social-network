import s from './MyPosts.module.css'
import Post from "./Post/Post";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {TextArea} from "../../common/FormsControl/FormsControl";

const MyPosts = (props) => {

    const postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>);
    const addNewPost = text => {
        props.addPost(text.newPostText)
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={addNewPost}/>
            <div className={s.posts}>
                { postsElements }
            </div>
        </div>
    );
}
const maxLength10 = maxLengthCreator(10);
let AddPostForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={TextArea} name="newPostText"
                       placeholder="What's new?" validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}
AddPostForm = reduxForm({form: "profileAddPostForm"})(AddPostForm);

export default MyPosts;
