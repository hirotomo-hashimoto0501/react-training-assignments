// ============================================================
// Step 1: Todo追加機能
// Step 2: Todo削除機能
// Step 3: Todo修正機能
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

// 現在編集中のTodoのid（編集していないときは null）
var editingId = null;

// ------------------------------------------------------------
// 編集モードを開始する関数
// ------------------------------------------------------------
function startEdit(id) {
  // 編集中のidを記録し、renderTodosで編集UIを表示するトリガーにする
  editingId = id;
  renderTodos();
}

// ------------------------------------------------------------
// 編集内容を保存する関数
// ------------------------------------------------------------
function saveTodo(id, newText) {
  // 空文字の場合は保存しない
  if (newText.trim() === '') {
    return;
  }

  // todos配列の中から対象のTodoを探してtextを更新する
  todos = todos.map(function(todo) {
    if (todo.id === id) {
      // 同じidのTodoだけtextを新しい値に置き換える
      return { id: todo.id, text: newText.trim() };
    }
    return todo;
  });

  // 編集状態を終了する
  editingId = null;

  // 画面を更新する
  renderTodos();
}

// ------------------------------------------------------------
// 編集をキャンセルする関数
// ------------------------------------------------------------
function cancelEdit() {
  // 編集中のidをリセットして通常表示に戻す
  editingId = null;
  renderTodos();
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

    if (todo.id === editingId) {
      // ---- 編集モード: テキスト入力欄と保存・キャンセルボタンを表示 ----

      // 現在のテキストを初期値とした入力欄を作成する
      var editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.className = 'edit-input';
      editInput.value = todo.text;

      // 保存ボタンを作成する
      var saveButton = document.createElement('button');
      saveButton.className = 'save-button';
      saveButton.textContent = '保存';
      saveButton.addEventListener('click', function() {
        saveTodo(todo.id, editInput.value);
      });

      // キャンセルボタンを作成する
      var cancelButton = document.createElement('button');
      cancelButton.className = 'cancel-button';
      cancelButton.textContent = 'キャンセル';
      cancelButton.addEventListener('click', function() {
        cancelEdit();
      });

      li.appendChild(editInput);
      li.appendChild(saveButton);
      li.appendChild(cancelButton);
    } else {
      // ---- 通常モード: テキストと編集・削除ボタンを表示 ----

      // Todo本文を表示する <span> を作成する
      var span = document.createElement('span');
      span.className = 'todo-text';
      span.textContent = todo.text;

      // 編集ボタンを作成する
      var editButton = document.createElement('button');
      editButton.className = 'edit-button';
      editButton.textContent = '編集';
      editButton.addEventListener('click', function() {
        startEdit(todo.id);
      });

      // 削除ボタンを作成する
      var deleteButton = document.createElement('button');
      deleteButton.className = 'delete-button';
      deleteButton.textContent = '削除';
      // クリックしたとき、このTodoのidを渡して削除関数を呼ぶ
      deleteButton.addEventListener('click', function() {
        deleteTodo(todo.id);
      });

      li.appendChild(span);
      li.appendChild(editButton);
      li.appendChild(deleteButton);
    }

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
