import React from "react";
//import TodoList from "./todolist";

class Modal extends React.Component {
  render() {
    if (!this.props.showModal) {
      return null;
    }
    return (
      <div className="modal">
        <div>{this.props.children}</div>
        <input type="text" defaultValue={this.props.currentTaskText} />
        <button
          onClick={e => {
            ///done clicked - need to take text value update state with new text
            ///need to update state of modal to false (dont show)
            this.props.handleDone(e.target.value);
            //this.showModal();
          }}
        >
          Done
        </button>
      </div>
    );
  }
}

export default Modal;
