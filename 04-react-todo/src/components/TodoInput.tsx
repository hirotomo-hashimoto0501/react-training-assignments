import { useState } from 'react';
import type { KeyboardEvent } from 'react';

type TodoInputProps = {
  // Todo追加処理は状態を持つ親（TodoList）に任せ、
  // この関数を呼び出すだけにすることで責務を分離する
  onAdd: (text: string) => void;
};

function TodoInput({ onAdd }: TodoInputProps) {
  // 入力欄の値はこのコンポーネント内だけで完結するローカルな状態
  const [text, setText] = useState<string>('');

  const handleAdd = (): void => {
    const trimmedText = text.trim();

    // 空文字（または空白のみ）は追加しない
    if (trimmedText === '') {
      return;
    }

    onAdd(trimmedText);
    setText(''); // 追加後は入力欄をクリアする
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="input-area">
      <input
        type="text"
        placeholder="Todoを入力してください"
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button type="button" onClick={handleAdd}>
        追加
      </button>
    </div>
  );
}

export default TodoInput;
