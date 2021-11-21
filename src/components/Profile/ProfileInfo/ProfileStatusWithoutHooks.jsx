import React from "react";
class ProfileStatusWithoutHooks extends React.Component{
    // state = {
    //     editMode: false,
    //     status: this.props.status
    // }
    // onStatusChange= (e) => {
    //     this.setState({status: e.currentTarget.value});
    // }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }

    // toggleEditMode = () => {
    //     if (!this.state.editMode) {   //editing
    //         this.setState({
    //             editMode: true
    //         })
    //     }
    //     else {                             // edit off
    //         this.props.updateStatus(this.state.status);
    //         this.setState({
    //             editMode: false
    //         })
    //
    //     }
    // }
    render() {
        return (
            <div>
                {this.state.editMode
                    ? <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.toggleEditMode} value={this.state.status}/>
                      </div>
                    : <div>
                        <span onDoubleClick={this.toggleEditMode}>{this.props.status}</span>
                      </div>
                }


            </div>
        );
    }


}

export default ProfileStatusWithoutHooks;
