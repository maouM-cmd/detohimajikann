const logPanel = document.getElementById("logPanel");
const commandInput = document.getElementById("commandInput");
const answerInput = document.getElementById("answerInput");

const sendCommandBtn = document.getElementById("sendCommandBtn");
const postAnswerBtn = document.getElementById("postAnswerBtn");
const randomModeBtn = document.getElementById("randomModeBtn");
const judgeBtn = document.getElementById("judgeBtn");
const modeButtons = document.querySelectorAll("button[data-mode]");

let currentMode = null;
let roundTopic = "";
const answers = [];

const fictionTopics = [
  "パルプンテ・フラペチーノ",
  "エレクトリカル・納豆・パレード",
  "透明なタピオカミルクティー",
  "逆再生ジェットコースター",
  "シンデレラ城の地下にある秘密の居酒屋",
];

const scandals = [
  "ディズニーランドの鳩を全てカラスに塗ろうとした",
  "ポップコーンの塩味とキャラメル味を分別しようとして列を止めた",
  "パレードのダンサーに混ざって踊ろうとした",
  "銅像に話しかけて悩み相談をしていた",
  "隠れミッキーを油性ペンで塗りつぶして『隠れホクロ』にした",
];

const loveTargets = [
  "食べかけのチュロス",
  "やや溶けたアイス",
  "知らない人の落とし物っぽいハンカチ",
  "列の足元テープ",
  "3時間握られてるペットボトル",
];

const roastComments = [
  "語彙力がIQ2なので減点。勢いは100点。",
  "論理は崩壊してるのに説得力だけあるの怖い。",
  "その嘘、来週には教科書に載るかもしれない。",
  "言い訳が滑らかすぎる。常習犯の香り。",
  "狂気の温度が高い。審査員の眉毛が消えました。",
];

function addLog(author, text, type = "bot") {
  const entry = document.createElement("div");
  entry.className = `entry ${type}`;
  entry.innerHTML = `<strong>${author}</strong><p>${text}</p>`;
  logPanel.appendChild(entry);
  logPanel.scrollTop = logPanel.scrollHeight;
}

function randomOf(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function resetRound(mode) {
  currentMode = mode;
  roundTopic = "";
  answers.length = 0;
}

function promptMode(mode) {
  resetRound(mode);

  if (mode === "1") {
    roundTopic = randomOf(fictionTopics);
    addLog(
      "GM",
      `> 【 🤥 第一回 チキチキ！虚構解説選手権 】<br>今回のお題は…<br><br>『${roundTopic}』<br><br>Haruki & のえちゃん、知ったかぶりで解説してください。常識ですが？`,
    );
    return;
  }

  if (mode === "2") {
    roundTopic = randomOf(scandals);
    const suspect = Math.random() > 0.5 ? "Haruki" : "のえちゃん";
    addLog(
      "GM",
      `🚨 BREAKING NEWS 🚨<br>${suspect}容疑者が「${roundTopic}」疑いで送検されました。<br>さあ容疑者、30秒で言い訳をどうぞ！記者は容赦しません。`,
    );
    return;
  }

  roundTopic = randomOf(loveTargets);
  addLog(
    "GM",
    `💌【限界ラブレター・チャレンジ】<br>ターゲット：『${roundTopic}』<br>これに対して、恋愛ドラマ最終回クラスの激重プロポーズを叫んでください。狂気歓迎。`,
  );
}

function judgeRound() {
  if (!currentMode) {
    addLog("GM", "まだ試合始まってません。『ゲームスタート』って言って。言って？？");
    return;
  }

  if (answers.length === 0) {
    addLog("GM", "回答ゼロで判定しろは無茶振り。いや私が無茶振り担当だったわ。回答を投下して。");
    return;
  }

  const winner = Math.random() > 0.5 ? "Haruki" : "のえちゃん";
  const comment = randomOf(roastComments);

  addLog(
    "GM",
    `【 判定結果 】🏆 勝者：${winner}<br>寸評：${comment}<br>審査基準？独断と偏見とテンションです。異議は却下。`,
    "judge",
  );
}

sendCommandBtn.addEventListener("click", () => {
  const cmd = commandInput.value.trim();
  addLog("You", cmd, "user");

  if (cmd === "ゲームスタート") {
    addLog(
      "GM",
      "どの地獄（ゲーム）を味わいますか？1〜3で選んでください（勝手に選んでもいいよ）",
    );
    return;
  }

  addLog("GM", "コマンド未対応です。『ゲームスタート』って言えば全部始まる。人生も多分。", "bot");
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    promptMode(button.dataset.mode);
  });
});

randomModeBtn.addEventListener("click", () => {
  const mode = String(Math.floor(Math.random() * 3) + 1);
  addLog("GM", `🎲 乱数に魂を売却。モード${mode}を執行します。`);
  promptMode(mode);
});

postAnswerBtn.addEventListener("click", () => {
  const answer = answerInput.value.trim();
  if (!answer) return;

  answers.push(answer);
  addLog("回答", answer, "user");
  answerInput.value = "";

  if (currentMode === "2" && answers.length === 1) {
    const hardQuestion = "記者質問：反省してるなら、なぜその場で踊ったんですか？説明を。";
    addLog("GM", hardQuestion);
  }
});

judgeBtn.addEventListener("click", judgeRound);

addLog("GM", "接続完了。私はスパルタ司会者です。優しくはします。多分。", "bot");
