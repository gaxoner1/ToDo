import React from "react";
//import TodoList from "./todolist";

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newTextVal: "",
      newTextId: ""
    };
  }

  handleEdit = e => {
    //input onChange(ie ech typing action)- nextTextVal is updated to what is typed
    //we pass this new text value to HandleDone as argument when clicked
    console.log(`handleEdit task id: ${this.props.currentTaskID}`);
    console.log(`text to be edited: ${this.props.currentTaskText}`);
    this.setState({
      newTextVal: e.target.value,
      newTextId: this.props.currentTaskID //keep same ID
    });
  };

  render() {
    if (!this.props.showModal) {
      return null;
    }
    return (
      <div className="modal">
        <div>{this.props.children}</div>
        <input
          type="text"
          onChange={this.handleEdit}
          defaultValue={this.props.currentTaskText}
        />
        <button
          onClick={e => {
            e.preventDefault();
            ///done clicked - need to take text value update state with new text
            ///need to update state of modal to false (dont show)
            console.log(this.state.newTextVal);
            this.props.handleDone(this.state.newTextVal, this.state.newTextId); //arg of new text passed by handleEdit func, ID kept same to manipulate task list
          }}
        >
          Done
        </button>
      </div>
    );
  }
}

export default Modal;
