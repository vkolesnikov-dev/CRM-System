import styles from "./TodoFilters.module.scss";

interface TodoFiltersProps {
  onGetProgressTodo: () => void;
  onGetAllTodo: () => void;
  onGetCompleted: () => void;
}

export const TodoFilters = ({
  onGetProgressTodo,
  onGetAllTodo,
  onGetCompleted,
}: TodoFiltersProps) => {
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
        Все
      </button>
      <button onClick={getProgressTodo} className={styles.progressTodo}>
        В прогрессе
      </button>
      <button onClick={getCompletedTodo} className={styles.completedTodo}>
        Завершенные
      </button>
    </div>
  );
};
