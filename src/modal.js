import React from "react";
//import TodoList from "./todolist";

class Modal extends React.Component {
  render() {
    //TODO: !this.propßs.showModal
    if (this.props.showModal) {
      return null;
    }
    return (
      <div className="modal">
        <div>{this.props.children}</div>
        <input type="text" defaultValue="*TODO-insert target text*" />
        <button
          onClick={e => {
            this.showModal();
          }}
        >
          Done
        </button>
      </div>
    );
  }

  showModal = e => {
    console.log(`show modal func reached`);
    //     this.setState({
    //       show: true
    //     });
  };
}

export default Modal;
