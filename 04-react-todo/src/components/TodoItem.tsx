import type { ChangeEvent } from 'react';
import type { Todo } from '../types';

type TodoItemProps = {
  // 表示対象のTodo1件分のデータ
  todo: Todo;
  // 削除ボタンが押されたときに呼び出す関数
  // 「どのTodoを削除するか」はこのコンポーネントが一番知っているので、
  // 自分のidを添えて親（TodoList）に削除を依頼する形にする
  onDelete: (id: number) => void;

  // ここから編集機能用のprops
  // 編集中のテキストはTodoList側でまとめて管理しているため、
  // このコンポーネントは受け取った値をそのまま表示し、
  // 変更があれば親に伝えるだけの「見た目担当」に徹する

  // このTodoが今まさに編集中かどうか（trueなら入力欄表示に切り替える）
  isEditing: boolean;
  // 編集欄に表示するテキスト（isEditingがtrueのときだけ使う）
  editingText: string;
  // 編集ボタンが押されたとき、自分のidと現在のtextを親に伝えて編集を開始する
  onStartEdit: (id: number, currentText: string) => void;
  // 編集欄の入力内容が変わるたびに、新しい値を親に伝える
  onEditTextChange: (text: string) => void;
  // 保存ボタンが押されたときに呼び出す（空文字なら親側で保存しない）
  onSaveEdit: () => void;
  // キャンセルボタンが押されたときに呼び出す
  onCancelEdit: () => void;
};

// Step1: Todo追加機能 → Step2: Todo削除機能 に続く最後のステップ。
// 通常時はテキスト＋編集・削除ボタンを表示し、
// 編集中はその行だけ入力欄＋保存・キャンセルボタンに切り替える。
function TodoItem({
  todo,
  onDelete,
  isEditing,
  editingText,
  onStartEdit,
  onEditTextChange,
  onSaveEdit,
  onCancelEdit,
}: TodoItemProps) {
  const handleDeleteClick = (): void => {
    onDelete(todo.id);
  };

  const handleEditClick = (): void => {
    // 編集開始時の初期値として、現在表示中のtodo.textを親に渡す
    onStartEdit(todo.id, todo.text);
  };

  const handleEditInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onEditTextChange(event.target.value);
  };

  // 編集モード：入力欄と保存・キャンセルボタンを表示する
  if (isEditing) {
    return (
      <li className="todo-item">
        <input
          type="text"
          className="edit-input"
          value={editingText}
          onChange={handleEditInputChange}
        />
        <button type="button" className="save-button" onClick={onSaveEdit}>
          保存
        </button>
        <button type="button" className="cancel-button" onClick={onCancelEdit}>
          キャンセル
        </button>
      </li>
    );
  }

  // 通常モード：テキストと編集・削除ボタンを表示する
  return (
    <li className="todo-item">
      <span className="todo-text">{todo.text}</span>

      <button type="button" className="edit-button" onClick={handleEditClick}>
        編集
      </button>
      <button type="button" className="delete-button" onClick={handleDeleteClick}>
        削除
      </button>
    </li>
  );
}

export default TodoItem;
