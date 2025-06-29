let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
let autoClickEnabled = JSON.parse(localStorage.getItem('autoClickEnabled')) || false;
let quickClickEnabled = JSON.parse(localStorage.getItem('quickClickEnabled')) || false;

const countElement = document.getElementById('count');
const clickButton = document.getElementById('clickButton');
const autoClickButton = document.getElementById('autoClickButton');
const quickClickButton = document.getElementById('quickClickButton');

const normalSpeed = 1000; // 1秒
const quickSpeed = 200;   // 0.2秒

let autoClickInterval = null;

function updateCount() {
  clickCount++;
  countElement.textContent = `クリック数: ${clickCount}`;
  localStorage.setItem('clickCount', clickCount);
}

// クリックボタンを押した時
clickButton.addEventListener('click', () => {
  updateCount();
});

// オートクリックON/OFF切替
autoClickButton.addEventListener('click', () => {
  autoClickEnabled = !autoClickEnabled;
  localStorage.setItem('autoClickEnabled', autoClickEnabled);
  updateAutoClickState();
});

// クイッククリックON/OFF切替
quickClickButton.addEventListener('click', () => {
  quickClickEnabled = !quickClickEnabled;
  localStorage.setItem('quickClickEnabled', quickClickEnabled);
  updateAutoClickState();
});

function updateAutoClickState() {
  // ボタンの色を切替
  autoClickButton.classList.toggle('active', autoClickEnabled);
  quickClickButton.classList.toggle('active', quickClickEnabled);

  autoClickButton.textContent = `オートクリック：${autoClickEnabled ? 'ON' : 'OFF'}`;
  quickClickButton.textContent = `クイッククリック：${quickClickEnabled ? 'ON' : 'OFF'}`;

  // すでにintervalがあればクリア
  if (autoClickInterval) {
    clearInterval(autoClickInterval);
    autoClickInterval = null;
  }

  // オートクリックがONならinterval開始
  if (autoClickEnabled) {
    let intervalTime = quickClickEnabled ? quickSpeed : normalSpeed;
    autoClickInterval = setInterval(updateCount, intervalTime);
  }
}

// 初期表示・設定復元
countElement.textContent = `クリック数: ${clickCount}`;
updateAutoClickState();
