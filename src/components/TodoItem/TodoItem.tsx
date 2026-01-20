import styles from "./TodoItem.module.scss";
import Delete from "../../assets/trash.svg";
import Edit from "../../assets/pen.svg";
export const TodoItem = ({ task, onUpdateTodo, onDeleteTodo }) => {
  const handleStatus = async () => {
    if (!onUpdateTodo) return;

    const newStatus = !task.isDone;
    await onUpdateTodo(task.id, newStatus);
  };
  const deleteTask = async () => {
    await onDeleteTodo(task.id);
  };
  return (
    <li className={styles.item}>
      <input type="checkbox" onChange={handleStatus} checked={task.isDone} />
      <span className={styles.text}>{task.title}</span>
      <div>
        <button onClick={deleteTask} className={styles.delButton}>
          <img src={Delete} alt="Delete" />
        </button>
        <button className={styles.editButton}>
          <img src={Edit} alt="Edit" />
        </button>
      </div>
    </li>
  );
};
