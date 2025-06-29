let count = parseInt(localStorage.getItem('clickCount')) || 0;

const countElement = document.getElementById('count');
countElement.textContent = `クリック数: ${count}`;

document.getElementById('clickButton').addEventListener('click', () => {
  count++;
  countElement.textContent = `クリック数: ${count}`;
  localStorage.setItem('clickCount', count);
});
