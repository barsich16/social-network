import React, {useEffect, useState} from "react";

const ProfileStatus = ({updateStatus, ...props}) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const toggleEditMode = () => {
        if (!editMode) {   //editing
            setEditMode(true);
        }
        else {                             // edit off
            updateStatus(status);
            setEditMode(false);
        }
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }
    return (
        <div>
            {editMode
                ? <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={toggleEditMode} value={status}/>
                </div>
                : <div>
                    <span onDoubleClick={toggleEditMode}>{props.status}</span>
                </div>
            }
        </div>
    );
}
export default ProfileStatus;
