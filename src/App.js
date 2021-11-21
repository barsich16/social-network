import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import {Route, withRouter} from "react-router-dom";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
//import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {Component} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import {lazy, Suspense} from "react";
const DialogsContainer = lazy(() => import("./components/Dialogs/DialogsContainer"));

class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }
    render() {
        if (!this.props.initialized)
            return <Preloader />
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <div className="page">
                    <Navbar/>
                    <div className="app-wrapper-content">
                        <Route path='/profile/:userId?'
                               render={() => <ProfileContainer/>}/>

                        <Route path='/dialogs'
                               render={() => {
                                   return <Suspense fallback={<Preloader/>}>
                                        <DialogsContainer/>
                                       </Suspense>
                               }}/>

                        <Route path='/users'
                               render={() => <UsersContainer/>}/>

                        <Route path='/login'
                               render={() => <LoginPage/>}/>

                        <Route path='/news'
                               render={() => <News/>}/>

                        <Route path='/music'
                               render={() => <Music/>}/>

                        <Route path='/settings'
                               render={() => <Settings/>}/>

                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    initialized: state.app.initialized
});
export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);
