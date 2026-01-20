import { TodoItem } from "../TodoItem/TodoItem.tsx";
import styles from "./TodoList.module.scss";

export const TodoList = ({ todos, onUpdateTodo, onDeleteTodo }) => {
  return (
    <ul className={styles.box}>
      {todos.map((elem: any) => (
        <TodoItem
          key={elem.id}
          task={elem}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
};
