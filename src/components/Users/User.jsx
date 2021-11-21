import s from "./Users.module.css";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/avatar.png";
import React from "react";

const User = ({user, followingInProgress, follow, unfollow}) => {
    return (
        <div className={s.user}>
            <div className={s.logo}>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} alt="avatar"/>
                </NavLink>
                {user.followed
                    ? <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => unfollow(user.id)}>
                        Unfollow</button>

                    : <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => follow(user.id)}>
                        Follow</button>}

            </div>
            <div className={s.info}>
                <div className={s.name_status}>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </div>
                <div className={s.location}>
                    <div>user.location.city</div>
                    <div>user.location.country=</div>
                </div>
            </div>
        </div>
    );
}

export default User;
