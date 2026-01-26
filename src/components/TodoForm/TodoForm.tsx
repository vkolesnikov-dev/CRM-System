import { useState } from "react";
import styles from "./TodoForm.module.scss";

interface TodoFormProps {
  addTask: (todoInput: string) => void;
}

export const TodoForm = ({ addTask }: TodoFormProps) => {
  const [todoInput, setTodoInput] = useState("");
  const [error, setError] = useState("");

  const validate = (value: string) => {
    if (!value.trim()) {
      return "Поле должно быть обязательным для заполнения";
    }
    if (value.length < 2) {
      return "Должно быть минимум 2 символа";
    }
    if (value.length > 64) {
      return "Должно быть максимум 64 символа";
    }
    return "";
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setError(validate(value));
    setTodoInput(value);
  };
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const validationError = validate(todoInput);
    if (validationError) {
      setError(validationError);
      return;
    }
    addTask(todoInput);
    setTodoInput("");
    setError("");
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
      {error && <span className={styles.error}>{error}</span>}
    </form>
  );
};
