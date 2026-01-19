import { useEffect, useState } from "react";
import { TodoForm } from "./components/TodoForm/TodoForm.tsx";
import { TodoList } from "./components/TodoList/TodoList.tsx";
import styles from "./App.module.scss";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

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
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Error");
    }
  };

  const updateStatus = async (id, completed) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTask = {
      ...todoToUpdate,
      isDone: completed,
      title: todoToUpdate.title,
    };

    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    const updatedTodo = await response.json();

    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        todo.id === id ? updatedTodo : todo;
      });
    });
  };
  const getTodos = async () => {
    try {
      const response = await fetch("https://easydev.club/api/v1/todos");
      const json = await response.json();

      setTodos(json.data);
      console.log(json);
      console.log(todos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.box}>
      <h1 className={styles.title}>Todo App</h1>
      <TodoForm addTask={addTask} />
      <TodoList todos={todos} onUpdateTodo={updateStatus} />
    </div>
  );
};

export default App;
