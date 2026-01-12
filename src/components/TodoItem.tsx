export const TodoItem = ({ task }) => {
  return (
    <li>
      <input type="checkbox" />
      <span>{task.title}</span>
      <button>delete</button>
      <button>edit</button>
    </li>
  );
};
