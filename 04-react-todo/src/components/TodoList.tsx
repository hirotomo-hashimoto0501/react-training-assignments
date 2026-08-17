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

  return (
    <div className="todo-list-wrapper">
      <TodoInput onAdd={handleAddTodo} />
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
