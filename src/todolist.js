import React from "react";
import "./styles.css";
//import Modal from "./modal.js";

function TodoList(props) {
  //console.log(`log from ToDoList.js ${props.task}`);
  const taskList = props.task;
  //for each task create div w/ classname list TODO
  //inside div, diplay each task text and pass task ID
  const eachTask = taskList.map(task => {
    console.log(task.uniqueID);
    return (
      <div className="taskbody" id={task.uniqueID}>
        <div>
          {task.text}
          <button type="submit" onClick={() => props.deleteTask(task.uniqueID)}>
            Delete
          </button>
          <button
            //call & pass target text/ ID to showModal function on edit click
            type="submit"
            onClick={() => props.showModal(task.text, task.uniqueID)}
          >
            Edit
          </button>
        </div>
      </div>
    );
  });
  //const listItems = props.items;
  return <div className="eachTask"> {eachTask} </div>;
}

export default TodoList;
