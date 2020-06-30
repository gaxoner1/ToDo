import React from "react";
import "./styles.css";
import TodoList from "./todolist.js";
import uniqueId from "react-html-id";
import Modal from "./modal.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    //uniqueId.enableUniqueIds(this);

    this.state = {
      showModal: false,
      title: "React ToDo Form (hardcoded state prop)",
      tasks: [],
      currentTask: {
        text: "",
        uniqueID: ""
      }
    };
    //bind needed so handleInput & add item know where 'this' points to
    //without bind this in handleinput will be undefined and not point to App Class constructor
    this.handleInput = this.handleInput.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  handleInput(e) {
    uniqueId.enableUniqueIds(this);
    console.log(this.state);
    this.setState({
      currentTask: {
        text: e.target.value,
        uniqueID: this.nextUniqueId()
      }
    });
    console.log(this.state);
  }

  addTask(e) {
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
        }
      });
    }
  }

  // componentWillUpdate (nextProps, nextState) {
  //   localStorage.setItem("");
  // }

  // called by render:TodoList -pass the uniq ID from onClick at todolist.js to point to target element
  deleteTask(id) {
    const filteredList = this.state.tasks.filter(task => task.uniqueID !== id);
    //set updated state of tasks to filtered list of tasks that do not match the id
    //aka the delete event listener.
    this.setState({
      tasks: filteredList
    });
  }

  editTask(text, id) {
    //console.log(` edit func var: ${this.state.showModal}`);
    console.log(`text from edit func: ${text}`);
    console.log(`id from edit func: ${id}`);
  }

  render() {
    return (
      <header>
        <div>{this.state.title}</div>
        <form id="todo-body" onSubmit={this.addTask}>
          <input
            type="text"
            placeholder="Add Task"
            value={this.state.currentTask.text}
            onChange={this.handleInput}
          />
          <button type="submit">Add</button>
        </form>
        <h2>Tasks</h2>
        <TodoList
          task={this.state.tasks}
          deleteTask={this.deleteTask}
          editTask={this.editTask}
        />
        {/* pass task text to modal for input to be edited & show boolean to toggle */}
        <Modal task={this.state.tasks} showModal={this.state.showModal}>
          Message in Edit Modal
        </Modal>
      </header>
    );
  }
}
export default App;
