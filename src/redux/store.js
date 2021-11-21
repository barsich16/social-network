import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

let store = {
    _state: {
        dialogPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Bohdan'},
                {id: 3, name: 'Vika'},
                {id: 4, name: 'Artem'},
            ],
            messages: [
                {id: 1, message: 'Hello'},
                {id: 2, message: 'Hi'},
                {id: 3, message: 'Ok'},
            ],
            newMessageBody: ''
        },
        profilePage: {
            posts: [
                {id: 1, message: 'Hey', likesCount: 12},
                {id: 2, message: 'How are you?', likesCount: 13},
            ],
            newPostText: ''
        }
    },
    _callSubscriber() {
        console.log('Empty function');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogPage = dialogsReducer(this._state.dialogPage, action);
        this._callSubscriber(this._state);

    }
}

export default store;
