// Floating hearts
function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.innerHTML = ['❤️','💖','💕','💗','💞','💘'][Math.floor(Math.random()*6)];
  
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (Math.random() * 1.4 + 1.1) + 'rem';
  heart.style.animationDuration = (Math.random() * 5 + 7) + 's';
  
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 12000);
}

setInterval(createHeart, 450);


// No button logic
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const surprise = document.getElementById('surprise');
const container = document.querySelector('.container');

function getSafeArea() {
  const rect = container.getBoundingClientRect();
  const padding = 50;
  
  return {
    minX: rect.left + padding,
    maxX: rect.right - noBtn.offsetWidth - padding,
    minY: rect.top + padding,
    maxY: rect.bottom - noBtn.offsetHeight - padding
  };
}

function moveNoButton() {
  const area = getSafeArea();
  
  let newX = Math.random() * (area.maxX - area.minX) + area.minX;
  let newY = Math.random() * (area.maxY - area.minY) + area.minY;
  
  // Yes button এর কাছে গেলে দূরে সরাও
  const yesRect = yesBtn.getBoundingClientRect();
  const distance = Math.hypot(newX - yesRect.left - yesRect.width/2, newY - yesRect.top - yesRect.height/2);
  
  if (distance < 220) {
    const angle = Math.atan2(newY - (yesRect.top + yesRect.height/2), newX - (yesRect.left + yesRect.width/2));
    newX += Math.cos(angle) * 280;
    newY += Math.sin(angle) * 280;
    
    // আবার সীমার মধ্যে আনো
    newX = Math.max(area.minX, Math.min(area.maxX, newX));
    newY = Math.max(area.minY, Math.min(area.maxY, newY));
  }

  noBtn.style.position = 'absolute';
  noBtn.style.left = newX + 'px';
  noBtn.style.top  = newY + 'px';
  
  // Optional mobile vibration
  if (navigator.vibrate) navigator.vibrate(40);
}

noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  moveNoButton();
});

noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveNoButton();
});

yesBtn.addEventListener('click', () => {
  surprise.style.display = 'block';
  noBtn.style.display = 'none';
});