import { TodoItem } from "../TodoItem/TodoItem.tsx";
import styles from "./TodoList.module.scss";

export const TodoList = ({ todos }) => {
  return (
    <ul className={styles.box}>
      {todos.map((elem: any) => (
        <TodoItem key={elem.id} task={elem} />
      ))}
    </ul>
  );
};
