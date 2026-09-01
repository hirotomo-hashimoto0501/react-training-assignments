import type { Todo } from '../types';

type TodoItemProps = {
  // 表示対象のTodo1件分のデータ
  todo: Todo;
  // 削除ボタンが押されたときに呼び出す関数
  // 「どのTodoを削除するか」はこのコンポーネントが一番知っているので、
  // 自分のidを添えて親（TodoList）に削除を依頼する形にする
  onDelete: (id: number) => void;
};

// Todo追加機能に続いて削除機能を実装するステップ。
// 各Todoに削除ボタンを表示し、押されたら自分のidを親に伝える。
function TodoItem({ todo, onDelete }: TodoItemProps) {
  // 削除ボタンのクリックハンドラ
  // 実際に配列から取り除く処理はTodoList側が持っているため、
  // ここでは「このidのTodoを削除してほしい」と伝えるだけでよい
  const handleDeleteClick = (): void => {
    onDelete(todo.id);
  };

  return (
    <li className="todo-item">
      <span className="todo-text">{todo.text}</span>

      {/* 削除ボタン：押すとこのTodoだけが一覧から消える */}
      <button
        type="button"
        className="delete-button"
        onClick={handleDeleteClick}
      >
        削除
      </button>
    </li>
  );
}

export default TodoItem;
