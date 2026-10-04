import Clock from './components/Clock.tsx';
import './App.css';

// アプリ全体のレイアウトを担当するコンポーネント。
// 時刻の取得・更新といったロジックは Clock コンポーネントに任せ、
// ここでは見出しと配置だけを決める（04-react-todo と同じ役割分担）。
function App() {
  return (
    <main className="app">
      <div className="container">
        <h1>時計</h1>
        <Clock />
      </div>
    </main>
  );
}

export default App;
