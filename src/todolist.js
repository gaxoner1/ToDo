import React from "react";
import "./styles.css";

function TodoList(props) {
  console.log(`log from ToDoList.js ${props.task}`);
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
            type="submit"
            onClick={() => props.editTask(task.text, task.uniqueID)}
          >
            Edit
          </button>
        </div>
      </div>
    );
  });
  //const listItems = props.items;
  return <div>reached TodoList.js/taskList {eachTask} </div>;
}

export default TodoList;
