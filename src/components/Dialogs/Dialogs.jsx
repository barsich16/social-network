import s from './Dialogs.module.css'
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import React from "react";
import {Redirect} from "react-router-dom"
import {Field, reduxForm} from "redux-form";
import {TextArea} from "../common/FormsControl/FormsControl";
import {required} from "../../utils/validators/validators";

const Dialogs = (props) => {
    let state = props.dialogPage;

    const dialogsElements = state.dialogs.map(d => <DialogsItem name={d.name} id={d.id}/>);
    const messagesElements = state.messages.map(m => <Message message={m.message}/>)
    const addNewMessage = values => {
        props.addMessage(values.newMessageBody);
    }

    if (!props.isAuth) return <Redirect to={"/login"}/>;
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={s.messages}>
                { messagesElements }
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    );
};

const AddMessageForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={TextArea} name="newMessageBody"
                       placeholder="Enter your message:" validate={required}/>
            </div>
            <button>Type message</button>
        </form>
    )
}
const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm)
export default Dialogs;
