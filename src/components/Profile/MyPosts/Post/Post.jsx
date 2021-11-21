import s from './Post.module.css'

const Post = (props) => {
    return (
        <div className={s.item}>
            {props.message}
            <div>
                Liked {props.likesCount}
            </div>
        </div>
    );
}

export default Post;
