import type { TodoInfo } from "../../App";
import styles from "./TodoFilters.module.scss";

interface TodoFiltersProps {
  onGetProgressTodo: () => void;
  onGetAllTodo: () => void;
  onGetCompleted: () => void;
  todoInfo: TodoInfo;
}

export const TodoFilters = ({
  onGetProgressTodo,
  onGetAllTodo,
  onGetCompleted,
  todoInfo,
}: TodoFiltersProps) => {
  console.log(todoInfo);
  const getProgressTodo = () => {
    onGetProgressTodo();
  };
  const getAllTodo = () => {
    onGetAllTodo();
  };
  const getCompletedTodo = () => {
    onGetCompleted();
  };
  return (
    <div className={styles.containerTodo}>
      <button onClick={getAllTodo} className={styles.allTodo}>
        Все ({todoInfo.all})
      </button>
      <button onClick={getProgressTodo} className={styles.progressTodo}>
        В прогрессе ({todoInfo.inWork})
      </button>
      <button onClick={getCompletedTodo} className={styles.completedTodo}>
        Завершенные ({todoInfo.completed})
      </button>
    </div>
  );
};
