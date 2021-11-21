import {Field, reduxForm} from "redux-form";
import {loginUser} from "../../redux/authReducer";
import {Input} from "../common/FormsControl/FormsControl";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import style from "./../common/FormsControl/FormsControl.module.css"

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'Email'} name={"email"} component={Input} validate={required}/>
            </div>
            <div>
                <Field type={"password"} name={"password"} placeholder={'password'}
                       component={Input} validate={required}/>
            </div>
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={Input}/> Remember Me
            </div>
            {error && <div className={style.formSummaryError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
};
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);
const Login = props => {
    let onSubmit = formData => {
        props.loginUser(formData.email, formData.password, formData.rememberMe);
    }
    if (props.isAuth) return <Redirect to={'/profile'}/>;
    return (
        <div>
            Login
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
}
const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {loginUser})(Login);
