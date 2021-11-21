import s from "./Users.module.css";
import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = ({onCurrentPageChanged, currentPage, totalUsersCount, pageSize, ...props}) => {
    return (
        <div>
            {/*<div>*/}
            {/*    {pages.map(page => {*/}
            {/*        return <button onClick={(e) => {*/}
            {/*            props.onCurrentPageChanged(page)*/}
            {/*        }} className={props.currentPage === page && s.selectedPage}>{page}</button>*/}
            {/*    })}*/}
            {/*</div>*/}
            <Paginator onCurrentPageChanged={onCurrentPageChanged} currentPage={currentPage}
                       totalItemsCount={totalUsersCount} pageSize={pageSize}/>
            Users
            {
                props.users.map(user =>
                    <User user={user} followingInProgress={props.followingInProgress} key={user.id}
                          follow={props.follow} unfollow={props.unfollow}/>
                )
            }
        </div>
    );
}

export default Users;
