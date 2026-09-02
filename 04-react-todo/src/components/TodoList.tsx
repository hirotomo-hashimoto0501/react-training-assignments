import { useState } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import type { Todo } from '../types';

function TodoList() {
  // Todoデータはこのコンポーネントが一元管理する
  // （バニラJS版のグローバル変数`todos`に相当する状態）
  const [todos, setTodos] = useState<Todo[]>([]);

  // Todoに割り当てる連番ID。追加のたびに1ずつ増やして一意性を保証する
  const [nextId, setNextId] = useState<number>(1);

  // 現在編集中のTodoのid（編集していないときはnull）
  // この値と一致するidのTodoだけが、TodoItem側で入力欄表示に切り替わる
  const [editingId, setEditingId] = useState<number | null>(null);

  // 編集欄に入力中のテキスト
  // TodoItem側にローカルstateを持たせると、同じ行を再利用して
  // 別のタイミングで編集を開始したときに前回の入力が残ってしまうため、
  // 編集中の値もこのTodoList側でまとめて管理する
  const [editingText, setEditingText] = useState<string>('');

  const handleAddTodo = (text: string): void => {
    const newTodo: Todo = { id: nextId, text };

    // 既存の配列を直接書き換えず、新しい配列を作って状態を更新する
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNextId((prevId) => prevId + 1);
  };

  // 指定したidのTodoだけを配列から取り除く関数
  const handleDeleteTodo = (id: number): void => {
    // Array.filter は「条件に合う要素だけを残した新しい配列」を作るメソッド。
    // ここでは「削除対象のidと一致しないTodo」だけを残すことで、
    // 結果的に対象のTodoだけが取り除かれた配列になる。
    // 元のtodos配列自体は書き換えない（Reactの状態更新は常に新しい値を渡す）。
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  };

  // 編集モードを開始する関数
  // 対象のidを記録し、編集欄の初期値として現在のテキストをセットする
  const handleStartEdit = (id: number, currentText: string): void => {
    setEditingId(id);
    setEditingText(currentText);
  };

  // 編集欄の入力値が変わるたびに呼ばれる関数
  const handleEditTextChange = (text: string): void => {
    setEditingText(text);
  };

  // 編集内容を確定させる関数
  const handleSaveEdit = (): void => {
    // 空文字（空白のみ含む）は保存しない
    if (editingText.trim() === '') {
      return;
    }

    // Array.map は「各要素を変換した新しい配列」を作るメソッド。
    // 編集対象のidと一致するTodoだけ新しいtextに置き換え、
    // それ以外のTodoはそのまま返すことで、対象だけを更新している。
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === editingId
          ? { id: todo.id, text: editingText.trim() }
          : todo
      )
    );

    // 編集状態を終了し、通常表示に戻す
    setEditingId(null);
  };

  // 編集をキャンセルする関数（内容は保存せず、通常表示に戻すだけ）
  const handleCancelEdit = (): void => {
    setEditingId(null);
  };

  return (
    <div className="todo-list-wrapper">
      <TodoInput onAdd={handleAddTodo} />
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            // key: Reactがリストの各要素を区別するための一意な値
            key={todo.id}
            todo={todo}
            onDelete={handleDeleteTodo}
            // isEditing: このTodoが今まさに編集中かどうか
            isEditing={todo.id === editingId}
            editingText={editingText}
            onStartEdit={handleStartEdit}
            onEditTextChange={handleEditTextChange}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
