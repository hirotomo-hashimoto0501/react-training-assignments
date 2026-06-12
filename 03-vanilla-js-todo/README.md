# Todo リスト（バニラ JavaScript 研修教材）

## アプリの概要

HTML / CSS / JavaScript のみで実装したシンプルな Todo リストアプリです。  
フレームワークやライブラリを一切使わず、ブラウザの標準 API だけで DOM 操作・イベント処理・配列操作を学べます。

---

## 実装している機能

| 機能       | 内容                                     |
|------------|------------------------------------------|
| Todo 追加  | 入力欄に内容を入力して追加ボタンで登録   |
| Todo 削除  | 各 Todo の削除ボタンで対象だけを削除     |
| Todo 修正  | 各 Todo の編集ボタンで内容を変更・保存   |

---

## 実装順序（Step ごとの差分）

機能を一度にすべて実装するのではなく、3 段階に分けて実装しています。  
各 Step の差分を追うことで、機能追加のプロセスを学べます。

各 Step は Git のコミット単位で区切られています。以下のコマンドで差分を確認できます。

```bash
# Step 1: Todo 追加機能のコミット差分
git show fb001a5

# Step 2: Todo 削除機能のコミット差分
git show 38335f9

# Step 3: Todo 修正機能のコミット差分
git show daac3b9
```

### Step 1: Todo 追加機能

- 入力欄への文字入力
- 追加ボタン押下で Todo を登録
- 空文字は追加しない
- 追加後に入力欄をクリア

### Step 2: Todo 削除機能（Step 1 に追加）

- 各 Todo に削除ボタンを表示
- 削除ボタン押下で対象の Todo だけを削除
- 他の Todo には影響しない

### Step 3: Todo 修正機能（Step 2 に追加）

- 各 Todo に編集ボタンを表示
- 編集ボタン押下で対象行が入力欄に切り替わる
- 保存ボタンで内容を更新（空文字は保存不可）
- キャンセルボタンで編集前の表示に戻る

---

## 起動方法

ローカルサーバーは不要です。`index.html` をブラウザで直接開くだけで動作します。

```bash
# ファイルをブラウザで開く（macOS の場合）
open 03-vanilla-js-todo/index.html
```

または、VS Code の拡張機能「Live Server」を使って起動することもできます。

---

## 各 Step で学べること

### Step 1

- `document.getElementById` で HTML 要素を取得する
- `input.value` でテキスト入力欄の値を読む
- `Array.push` で配列に要素を追加する
- `document.createElement` で動的に HTML 要素を作る
- `addEventListener` でクリック・キーボードイベントを受け取る

### Step 2

- `Array.filter` で条件に合う要素だけを残した新配列を作る
- クロージャを使ってイベントハンドラに値を閉じ込める
- 「配列を更新 → 画面を再描画」という基本パターン

### Step 3

- `Array.map` で配列の各要素を変換した新配列を作る
- 状態変数（`editingId`）で画面の見た目を制御する
- 条件分岐（`if / else`）で通常表示と編集表示を切り替える

---

## コード解説

### データ管理の考え方

```js
var todos = [];
```

Todo のデータはすべて `todos` 配列で管理します。  
画面の表示は `renderTodos()` 関数が配列を元に毎回ゼロから作り直します。  
これにより「データを変えれば画面も変わる」という一方向の流れが明確になります。

---

### Todo の追加（Step 1）

```js
function addTodo() {
  var text = todoInput.value.trim(); // 前後の空白を除去
  if (text === '') return;           // 空文字は追加しない

  var newTodo = {
    id: Date.now(), // ユニークな ID（現在時刻のミリ秒）
    text: text,
  };

  todos.push(newTodo); // 配列に追加
  renderTodos();       // 画面を更新
  todoInput.value = ''; // 入力欄をクリア
}
```

**ポイント:** `Date.now()` は現在時刻のミリ秒を返します。  
同じタイミングで大量に追加しない限りユニークな値になるため、簡易的な ID として使っています。

---

### Todo の削除（Step 2）

```js
function deleteTodo(id) {
  todos = todos.filter(function(todo) {
    return todo.id !== id; // 対象以外のみ残す
  });
  renderTodos();
}
```

**ポイント:** `Array.filter` は元の配列を変更せず、条件を満たす要素だけからなる新しい配列を返します。  
`todo.id !== id`（対象 ID ではない）という条件を指定することで、削除したい Todo だけを取り除いています。

---

### Todo の修正（Step 3）

```js
var editingId = null; // 編集中の Todo の ID（編集していないときは null）

function startEdit(id) {
  editingId = id;
  renderTodos(); // 編集行だけ入力欄に切り替わる
}

function saveTodo(id, newText) {
  if (newText.trim() === '') return; // 空文字は保存しない

  todos = todos.map(function(todo) {
    if (todo.id === id) {
      return { id: todo.id, text: newText.trim() }; // 対象だけ更新
    }
    return todo;
  });

  editingId = null;
  renderTodos();
}
```

**ポイント:**
- `Array.map` は各要素を変換した新配列を返します。対象 ID の Todo だけ新しいテキストを持つオブジェクトに変換し、それ以外はそのまま返しています。
- `editingId` という変数 1 つで「どの行が編集モードか」を管理しています。`renderTodos()` はこの値を見て、編集行だけ `<input>` を表示します。

---

### 再描画の仕組み

```js
function renderTodos() {
  todoList.innerHTML = ''; // 既存の表示をリセット

  todos.forEach(function(todo) {
    var li = document.createElement('li');
    // ... ボタンや入力欄を作成して li に追加 ...
    todoList.appendChild(li);
  });
}
```

`renderTodos()` はリストを一度空にしてから、配列の全要素を HTML 要素として作り直します。  
データが変わるたびにこの関数を呼ぶだけで常に最新の状態が表示されます。

---

## 動作確認手順

### Todo 追加

1. 入力欄に「牛乳を買う」と入力する
2. 追加ボタンをクリックする（または Enter キーを押す）
3. リストに「牛乳を買う」が表示されることを確認する
4. 入力欄が空になっていることを確認する
5. 空文字のまま追加ボタンをクリックし、何も追加されないことを確認する

### Todo 削除

1. 複数の Todo を追加する
2. 任意の Todo の削除ボタンをクリックする
3. クリックした Todo だけが消え、他の Todo は残っていることを確認する

### Todo 修正

1. 任意の Todo の編集ボタンをクリックする
2. 対象行が入力欄に切り替わることを確認する
3. テキストを変更して保存ボタンをクリックする
4. 変更後のテキストが表示されることを確認する
5. 別の Todo の内容が変わっていないことを確認する
6. 編集中に入力欄を空にして保存ボタンをクリックし、保存されないことを確認する
7. キャンセルボタンをクリックし、元のテキストに戻ることを確認する
