// ============================================================
// Step 1: Todo追加機能
// Step 2: Todo削除機能
// ============================================================

// Todoデータを管理する配列
// 各Todoは { id: number, text: string } の形で格納する
var todos = [];

// HTML要素の取得
var todoInput = document.getElementById('todo-input');
var addButton = document.getElementById('add-button');
var todoList  = document.getElementById('todo-list');

// ------------------------------------------------------------
// Todoを追加する関数
// ------------------------------------------------------------
function addTodo() {
  // 入力欄の文字を取得し、前後の空白を除去する
  var text = todoInput.value.trim();

  // 空文字の場合は追加しない
  if (text === '') {
    return;
  }

  // 新しいTodoオブジェクトを作成する
  // id には現在時刻（ミリ秒）を使い、各Todoを一意に識別できるようにする
  var newTodo = {
    id: Date.now(),
    text: text,
  };

  // 配列に追加する
  todos.push(newTodo);

  // 画面を更新する
  renderTodos();

  // 入力欄を空にする
  todoInput.value = '';
}

// ------------------------------------------------------------
// Todoを削除する関数
// ------------------------------------------------------------
function deleteTodo(id) {
  // filter を使い、対象のid以外のTodoだけを残した新しい配列を作る
  todos = todos.filter(function(todo) {
    return todo.id !== id;
  });

  // 画面を更新する
  renderTodos();
}

// ------------------------------------------------------------
// Todoリストを画面に描画する関数
// ------------------------------------------------------------
function renderTodos() {
  // 既存のリストをすべて削除する（再描画のためにリセット）
  todoList.innerHTML = '';

  // todos配列の要素を1つずつ処理してリストを作る
  todos.forEach(function(todo) {
    // <li> 要素を作成する
    var li = document.createElement('li');
    li.className = 'todo-item';

    // Todo本文を表示する <span> を作成する
    var span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text;

    // 削除ボタンを作成する
    var deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = '削除';
    // クリックしたとき、このTodoのidを渡して削除関数を呼ぶ
    deleteButton.addEventListener('click', function() {
      deleteTodo(todo.id);
    });

    // <li> に要素を追加する
    li.appendChild(span);
    li.appendChild(deleteButton);

    // <ul> に <li> を追加する
    todoList.appendChild(li);
  });
}

// ------------------------------------------------------------
// イベントリスナーの設定
// ------------------------------------------------------------

// 追加ボタンをクリックしたとき
addButton.addEventListener('click', function() {
  addTodo();
});

// 入力欄でEnterキーを押したとき
todoInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
});
