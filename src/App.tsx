import { useEffect, useState } from "react";
import { TodoForm } from "./components/TodoForm/TodoForm.tsx";
import { TodoList } from "./components/TodoList/TodoList.tsx";
import styles from "./App.module.scss";
import { TodoFilters } from "./components/TodoFilters/TodoFilters.tsx";

export interface Todo {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}
export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState("all");

  const todoInfo: TodoInfo = {
    all: todos.length,
    completed: todos.filter((todo) => todo.isDone).length,
    inWork: todos.filter((todo) => !todo.isDone).length,
  };

  useEffect(() => {
    getTodos();
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.isDone;
    }
    if (filter === "inWork") {
      return !todo.isDone;
    }
    return true;
  });
  const addTask = async (todoInput: string) => {
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

  const deleteTask = async (id: number) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    if (!todoToDelete) return;

    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed delete task");
    }

    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const updateStatus = async (
    id: number,
    completed: boolean,
    title: string | undefined,
  ) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTask = {
      ...todoToUpdate,
      isDone: completed,
      title: title,
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
        return todo.id === id ? updatedTodo : todo;
      });
    });
  };
  const getTodos = async () => {
    try {
      const response = await fetch("https://easydev.club/api/v1/todos");
      const json = await response.json();
      setTodos(json.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.box}>
      <h1 className={styles.title}>Todo App</h1>
      <TodoForm addTask={addTask} />
      <TodoFilters
        onGetProgressTodo={() => setFilter("inWork")}
        onGetAllTodo={() => setFilter("all")}
        onGetCompleted={() => setFilter("completed")}
        todoInfo={todoInfo}
      />
      <TodoList
        todos={filteredTodos}
        onUpdateTodo={updateStatus}
        onDeleteTodo={deleteTask}
      />
    </div>
  );
};

export default App;
