import { useState, type SetStateAction } from "react";
import styles from "./TodoForm.module.scss";

interface TodoFormProps {
  addTask: (todoInput: string) => void;
}

export const TodoForm = ({ addTask }: TodoFormProps) => {
  const [todoInput, setTodoInput] = useState("");
  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setTodoInput(event.target.value);
  };
  const handleSubmit = (event: { preventDefault: () => void }) => {
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
