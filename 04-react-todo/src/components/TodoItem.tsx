import type { Todo } from '../types';

type TodoItemProps = {
  todo: Todo;
};

// 現時点ではTodo追加機能のみを実装するため、テキスト表示のみを行う。
// 削除・修正ボタンは、それぞれの機能を実装するステップで追加する。
function TodoItem({ todo }: TodoItemProps) {
  return (
    <li className="todo-item">
      <span className="todo-text">{todo.text}</span>
    </li>
  );
}

export default TodoItem;
