import { useEffect, useState } from 'react';

// 時計の表示更新間隔（ミリ秒）。1000ms = 1秒
const UPDATE_INTERVAL_MS = 1000;

// 数値を必ず2桁の文字列にそろえる補助関数
// 例: 5 → "05", 12 → "12"
// padStart(2, '0') は「2文字に満たない場合、先頭を '0' で埋める」という意味
const padZero = (value: number): string => {
  return String(value).padStart(2, '0');
};

// Dateオブジェクトを "HH:MM:SS" 形式の文字列に変換する補助関数
const formatTime = (date: Date): string => {
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
};

// 現在の時刻を表示する時計コンポーネント。
// 「1秒ごとに現在時刻へ書き換える」ために、次の2つのReactの仕組みを使う。
//   - useState : 現在時刻を state として持つ。state が変わると画面が再描画される
//   - useEffect: 画面表示後に setInterval を仕掛けて、1秒ごとに state を更新する
function Clock() {
  // 現在時刻を保持する state
  // useState の引数に関数を渡すと、最初の1回だけ実行される（初期表示を「現在時刻」にするため）
  const [now, setNow] = useState<Date>(() => new Date());

  // useEffect: コンポーネントが画面に表示されたあとに実行される処理
  // 第2引数が空配列 [] なので、「最初に表示されたとき1回だけ」実行される
  useEffect(() => {
    // 1秒ごとに state を現在時刻で上書きする
    // setNow が呼ばれるたびに Clock が再描画され、画面の時刻が書き換わる
    const timerId = setInterval(() => {
      setNow(new Date());
    }, UPDATE_INTERVAL_MS);

    // クリーンアップ関数
    // コンポーネントが画面から消えるときに実行される。
    // タイマーを止めないと、表示されていないのに裏で動き続ける（メモリリーク）ため、必ず後始末する。
    // ※ main.tsx の StrictMode は開発中に「表示→後始末→再表示」を1度行うため、
    //    後始末を書き忘れるとタイマーが二重に動いてしまい、バグに気づける。
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="clock">
      {/* dateTime属性は機械が読むための時刻情報。見た目には影響しない */}
      <time className="clock-time" dateTime={now.toISOString()}>
        {formatTime(now)}
      </time>
    </div>
  );
}

export default Clock;
