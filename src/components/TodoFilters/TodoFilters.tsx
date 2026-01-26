import { useState } from "react";
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
  const [activeFilter, setActiveFilter] = useState("all");

  console.log(todoInfo);
  const getProgressTodo = () => {
    setActiveFilter("inWork");
    onGetProgressTodo();
  };
  const getAllTodo = () => {
    setActiveFilter("all");
    onGetAllTodo();
  };
  const getCompletedTodo = () => {
    setActiveFilter("completed");
    onGetCompleted();
  };
  return (
    <div className={styles.containerTodo}>
      <button
        onClick={getAllTodo}
        className={`${styles.filterBtn} ${activeFilter === "all" ? styles.active : ""}`}
      >
        Все ({todoInfo.all})
      </button>
      <button
        onClick={getProgressTodo}
        className={`${styles.filterBtn} ${activeFilter === "inWork" ? styles.active : ""}`}
      >
        В прогрессе ({todoInfo.inWork})
      </button>
      <button
        onClick={getCompletedTodo}
        className={`${styles.filterBtn} ${activeFilter === "completed" ? styles.active : ""}`}
      >
        Завершенные ({todoInfo.completed})
      </button>
    </div>
  );
};
