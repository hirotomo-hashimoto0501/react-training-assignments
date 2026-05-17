import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState<number>(0);

  const handleAddCount = (): void => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <main className="app">
      <div className="counter-box">
        <p className="count">{count}</p>
        <button type="button" onClick={handleAddCount}>
          +1する
        </button>
      </div>
    </main>
  );
}

export default App;