import s from './Header.module.css'
import {NavLink} from "react-router-dom";
const Header = (props) => {
    return <header className={s.header}>
        <img className={s.logo} src="https://www.pngmart.com/files/13/Akatsuki-Logo-PNG-Pic.png" alt="logo"/>

        <div className={s.login}>
            {props.isAuth ? <div>{props.login} - <button onClick={props.logoutUser}>Log out</button></div> : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}

export default Header
