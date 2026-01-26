import styles from "./TodoItem.module.scss";
import Delete from "../../assets/trash.svg";
import Edit from "../../assets/pen.svg";
import Save from "../../assets/save.svg";
import Close from "../../assets/close.svg";
import { useState } from "react";
import type { Todo } from "../../App";

interface TodoItemProps {
  task: Todo;
  onUpdateTodo: (id: number, newStatus: boolean, inputValue?: string) => void;
  onDeleteTodo: (id: number) => void;
}
export const TodoItem = ({
  task,
  onUpdateTodo,
  onDeleteTodo,
}: TodoItemProps) => {
  const [isChange, setIsChange] = useState(true);
  const [inputValue, setInputValue] = useState(task.title);
  const [error, setError] = useState("");

  const handleChangeTask = () => {
    setIsChange(!isChange);
  };
  const handleStatus = async () => {
    if (!onUpdateTodo) return;

    const newStatus = !task.isDone;
    onUpdateTodo(task.id, newStatus);
  };
  const handleTitle = async () => {
    const value = inputValue.trim();
    if (!value) {
      setError("Поле должно быть заполненно");
      return;
    }

    if (value.length < 2) {
      setError("Должно быть минимум 2 символа");
      return;
    }
    if (value.length > 64) {
      setError("Должно быть максимум 64 символа");
      return;
    }

    onUpdateTodo(task.id, task.isDone, inputValue);
    setIsChange(!isChange);
    setError("");
  };
  const deleteTask = async () => {
    onDeleteTodo(task.id);
  };
  if (isChange) {
    return (
      <li className={`${styles.item} ${task.isDone ? styles.done : ""}`}>
        <label className={styles.circleCheck}>
          <input
            type="checkbox"
            onChange={handleStatus}
            checked={task.isDone}
          />
          <span className={styles.checkmark}></span>
        </label>
        <span className={styles.text}>{task.title}</span>
        <div className={styles.btnBlock}>
          <button onClick={handleChangeTask} className={styles.editButton}>
            <img src={Edit} alt="Edit" />
          </button>
          <button onClick={deleteTask} className={styles.delButton}>
            <img src={Delete} alt="Delete" />
          </button>
        </div>
      </li>
    );
  } else {
    return (
      <li className={`${styles.item} ${task.isDone ? styles.done : ""}`}>
        <label className={styles.circleCheck}>
          <input
            type="checkbox"
            onChange={handleStatus}
            checked={task.isDone}
          />
          <span className={styles.checkmark}></span>
        </label>
        <div className={styles.editBlock}>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={styles.editInput}
          />
          {error && <span className={styles.error}>{error}</span>}
        </div>
        <div className={styles.btnBlock}>
          <button onClick={deleteTask} className={styles.delButton}>
            <img src={Delete} alt="Delete" />
          </button>
          <button onClick={handleTitle} className={styles.editButton}>
            <img src={Save} alt="Save" style={{ width: 20 }} />
          </button>
          <button onClick={handleChangeTask} className={styles.editButton}>
            <img src={Close} alt="Close" style={{ width: 20 }} />
          </button>
        </div>
      </li>
    );
  }
};
