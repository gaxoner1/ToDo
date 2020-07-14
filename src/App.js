import React from "react";
import "./styles.css";
import TodoList from "./todolist.js";
import uniqueId from "react-html-id";
import Modal from "./modal.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      tasks: [],
      currentTask: {
        text: "",
        uniqueID: ""
      },
      editText: ""
    };
    //bind needed so handleInput & add item know where 'this' points to
    //without bind this in handleinput will be undefined and not point to App Class constructor
    //but with arrow function in ES6 no longer necessary
    // this.handleInput = this.handleInput.bind(this);
    // this.addTask = this.addTask.bind(this);
    // this.deleteTask = this.deleteTask.bind(this);
  }

  handleInput = e => {
    uniqueId.enableUniqueIds(this);
    console.log(this.state);
    this.setState({
      currentTask: {
        text: e.target.value,
        uniqueID: this.nextUniqueId()
      }
    });
    //localStorage.setItem(this.state);
    //localStorage.setItem("", JSON.stringify());
    console.log(this.state);
  };

  addTask = e => {
    e.preventDefault();
    const newTask = this.state.currentTask;
    console.log(newTask);
    //if not empty, add existing items in currenttask array plus target item.
    if (newTask.text !== "") {
      console.log(newTask);
      //set updatedTasks to recent input(newTask) and the exisiting array of task(this.state.tasks)
      const updatedTasks = [...this.state.tasks, newTask];
      //update state with new task list aka updatedTasks and clear all else.
      this.setState({
        showModal: false,
        tasks: updatedTasks,
        currentTask: {
          text: "",
          id: ""
        },
        editText: "",
        editID: ""
      });
    }
  };

  // componentWillUpdate (nextProps, nextState) {
  //   localStorage.setItem("");
  // }

  // called by render:TodoList -pass the uniq ID from onClick at todolist.js to point to target element
  deleteTask = id => {
    const filteredList = this.state.tasks.filter(task => task.uniqueID !== id);
    //set updated state of tasks to filtered list of tasks that do not match the id
    //aka the delete event listener.
    this.setState({
      tasks: filteredList
    });
  };

  handleDone = (newTask, newTaskID) => {
    //const existTaskID = this.state.currentTask.uniqueID //grab the task ID to be compared with edited version
    console.log(`task list in handleDone ${newTask}`);
    let updatedTasks = this.state.tasks.map(task => {
      if (task.uniqueID === newTaskID) {
        let updatedTask = { text: newTask, uniqueID: newTaskID };
        return updatedTask;
      } else {
        return task;
      }
    });
    //Done click event passed newTask and ID (kept same) so we can compare unique IDs and update text
    //and rerender list of task (if ids match - make a change, else return.)
    // here take new text and update state for showmodal, state of task list
    // console.log(`text from done onclick: ${newTask}`);
    // console.log(`id from edit func: ${newTaskID}`);
    this.setState({
      showModal: false,
      tasks: updatedTasks
    });
  };

  showModal = (targetText, targetID) => {
    console.log(
      `showModal Reached, edit target text: ${targetText}, ${targetID}`
    );
    this.setState({
      showModal: !this.state.showModal,
      editText: `${targetText}`,
      editID: `${targetID}`
    });
  };

  render() {
    return (
      <div className="pageCont">
        <header className="siteHeading"> Simple React ToDo Page</header>
        <div>{this.state.title}</div>
        <form id="todo-body" onSubmit={this.addTask}>
          <input
            id="input"
            type="text"
            placeholder="Add Task"
            value={this.state.currentTask.text}
            onChange={this.handleInput}
          />
          <button id="addBtn" type="submit">
            Add
          </button>
        </form>
        <h2 className="siteHeading">Tasks</h2>
        <TodoList
          task={this.state.tasks}
          deleteTask={this.deleteTask}
          showModal={this.showModal}
        />
        {/* pass task text to modal for input to be edited & show boolean to toggle 
          pass the edit functo to this modal.*/}
        <Modal
          //task={this.state.tasks}
          showModal={this.state.showModal}
          handleDone={this.handleDone} //*** TODO check edit call from modal
          currentTaskText={this.state.editText} //passes text of task
          currentTaskID={this.state.editID} //pass id of task
        >
          Edit Task Below:
        </Modal>
      </div>
    );
  }
}
export default App;
