import styles from "./TodoItem.module.scss";
import Delete from "../../assets/trash.svg";
import Edit from "../../assets/pen.svg";
export const TodoItem = ({ task }) => {
  return (
    <li className={styles.item}>
      <input type="checkbox" />
      <span className={styles.text}>{task.title}</span>
      <div>
        <button className={styles.delButton}>
          <img src={Delete} alt="Delete" />
        </button>
        <button className={styles.editButton}>
          <img src={Edit} alt="Edit" />
        </button>
      </div>
    </li>
  );
};
