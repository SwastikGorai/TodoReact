// Import required modules from Firebase SDK, React and custom components
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { RxPlusCircled } from "react-icons/rx";
import { db } from "./firebase";
import Todo from "./Components/Todo";

// Define styles
const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-b from-[#2F80ED]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-3xl shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-2 ml-2 bg-[#CDB0EE] text-slate-100 rounded-xl`,
  count: `text-center p-2`,
};

// Define main App component
function App() {
  // Define states
  const [todo, setTodo] = useState([]); // State to store todos
  const [input, setInput] = useState(""); // State to store user input

  // UseEffect Hook to fetch todos from Firestore on component mount
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((todoitem) => {
        // '...' to expand elements
        todosArray.push({ ...todoitem.data(), id: todoitem.id });
      });
      setTodo(todosArray);
    });
    // Cleanup function to unsubscribe from snapshot listener
    return () => unsubscribe();
  }, []);

  // Function to create a new todo in Firestore
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input == "") {
      alert("Please enter Todo item");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };

  // Function to update a todo's completion status in Firestore
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // Function to delete a todo from Firestore
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  // Render UI
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Let's See</h3>
        {/* Form to add new todo */}
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className={style.input}
            type="text"
            placeholder="Todo"
          />
          <button className={style.button}>
            <RxPlusCircled size={30} />
          </button>
        </form>
        {/* List of todos */}
        <ul>
          {todo.map((todo, id) => (
            <Todo
              key={id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {/* Display count of todos */}
        {todo.length == 0 ? null : (
          <p className={style.count}>{`You have ${todo.length} Todo`} </p>
        )}
      </div>
    </div>
  );
}
export default App;
