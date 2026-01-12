import { useState } from "react";
import { TodoForm } from "./components/TodoForm";

const App = () => {
  const [todos, setTodos] = useState([]);
  const addTask = async (todoInput) => {
    const isValid = todoInput.length >= 2 && todoInput.length < 64;
    if (todoInput && isValid) {
      const newTask = {
        title: todoInput,
        isDone: false,
      };
      try {
        const response = await fetch("https://easydev.club/api/v1/todos", {
          method: "POST",
          body: JSON.stringify(newTask),
        });
        const json = await response.json();
        setTodos((prevTodos) => [...prevTodos, json]);
        console.log(json);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Error");
    }
  };

  return (
    <>
      <h1>Todo App</h1>
      <TodoForm addTask={addTask} />
    </>
  );
};

export default App;
