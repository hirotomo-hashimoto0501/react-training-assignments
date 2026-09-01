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

  return (
    <div className="todo-list-wrapper">
      <TodoInput onAdd={handleAddTodo} />
      <ul className="todo-list">
        {todos.map((todo) => (
          // key: Reactがリストの各要素を区別するための一意な値
          // onDelete: 削除ボタン押下時にhandleDeleteTodoを呼び出せるように渡す
          <TodoItem key={todo.id} todo={todo} onDelete={handleDeleteTodo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
