import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "./../../../assets/images/avatar.png"
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader />
    }
    return (
        <div>
            <img className={s.picture} src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg" alt=""/>
            <div className={s.profile}>
                <img src={profile.photos.small != null
                    ? profile.photos.small
                    : userPhoto} className={s.avatar}/>
                <div className={s.info}>
                    <div className={s.name}>{profile.fullName}</div>
                    <div>Date</div>
                    <div>City</div>
                    <div>Education</div>
                    <div>Link</div>
                </div>
            </div>
            <ProfileStatus status={status} updateStatus={updateStatus}/>
        </div>
    );
}

export default ProfileInfo;
