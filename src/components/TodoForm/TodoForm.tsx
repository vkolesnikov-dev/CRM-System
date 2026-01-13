import { useState } from "react";
import styles from "./TodoForm.module.scss";

export const TodoForm = ({ addTask }) => {
  const [todoInput, setTodoInput] = useState("");
  const handleChange = (event) => {
    setTodoInput(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    addTask(todoInput);
    setTodoInput("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles.input}
        placeholder="Task To Be Done..."
        value={todoInput}
        onChange={handleChange}
      />
      <button className={styles.button}>Add</button>
    </form>
  );
};
