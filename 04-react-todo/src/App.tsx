import { useState } from 'react';
import TodoList from './components/TodoList.tsx'
import './App.css';


function App() {
  return (
    <main className="app">
      <div className="container">
        <h1>Todo リスト</h1>
        <TodoList />
      </div>
    </main>
  );
}

export default App;