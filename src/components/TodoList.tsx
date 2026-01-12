import { TodoItem } from "./TodoItem";

export const TodoList = ({ todos }) => {
  return (
    <ul>
      {todos.map((elem: any) => (
        <TodoItem key={elem.id} task={elem} />
      ))}
    </ul>
  );
};
