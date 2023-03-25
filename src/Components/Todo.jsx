// Import the necessary modules for the component
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

// Define CSS styles as a JavaScript object
const style = {
  listItem: `flex justify-between bg-[#cdb0ee] p-4 my-2 captalize rounded-3xl `,
  listItemComplete: `flex justify-between bg-[#B195D2] p-4 my-2 captalize rounded-3xl `,
  row: `flex`,
  textt: `ml-2 cursor-pointer`,
  textcomplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
};

// Define the Todo component
const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    // Render a list item with a conditional CSS class
    <li className={todo.completed ? style.listItemComplete : style.listItem}>
      <div className={style.row}>
        {/* Render a checkbox with an onChange event handler */}
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed ? "checked" : ""}
        />
        {/* Render the todo item's text with an onClick event handler */}
        <p
          onClick={() => toggleComplete(todo)}
          className={todo.completed ? style.textcomplete : style.textt}
        >
          {todo.text}
        </p>
      </div>
      {/* Render a delete button with an onClick event handler */}
      <button onClick={() => deleteTodo(todo.id)}>{<FaRegTrashAlt />}</button>
    </li>
  );
};

// Export the Todo component for use in other parts of the application
export default Todo;
