// Floating hearts – একটু বেশি crazy করে দিলাম
function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.innerHTML = ['❤️','💖','💕','💗','💞','💘','🩷','🫀','💓','💗'][Math.floor(Math.random()*10)];
  
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (Math.random() * 2 + 1.3) + 'rem';
  heart.style.animationDuration = (Math.random() * 3.5 + 4.5) + 's';
  
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}

setInterval(createHeart, 250);


// No button – SUPER CRAZY LONG JUMPS
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const surprise = document.getElementById('surprise');
const container = document.querySelector('.container');

function getSafeArea() {
  const rect = container.getBoundingClientRect();
  const padding = 30; // edges থেকে একটু দূরে রাখার জন্য
  
  return {
    minX: rect.left + padding,
    maxX: rect.right - noBtn.offsetWidth - padding,
    minY: rect.top + padding,
    maxY: rect.bottom - noBtn.offsetHeight - padding,
    width: rect.width - noBtn.offsetWidth - padding*2,
    height: rect.height - noBtn.offsetHeight - padding*2
  };
}

function moveNoButtonCrazy() {
  const area = getSafeArea();
  
  // প্রথমে একদম random position – full area use করবে
  let newX = area.minX + Math.random() * area.width;
  let newY = area.minY + Math.random() * area.height;
  
  // Yes button এর position
  const yesRect = yesBtn.getBoundingClientRect();
  const yesCX = yesRect.left + yesRect.width / 2;
  const yesCY = yesRect.top + yesRect.height / 2;
  
  // যদি খুব কাছে চলে যায় → random দিকে অনেক দূরে ঠেলে দাও
  let dist = Math.hypot(newX - yesCX, newY - yesCY);
  if (dist < 320) {  // 320px এর মধ্যে এলে push
    const angle = Math.random() * Math.PI * 2; // পুরো 360° random
    const pushForce = 450 + Math.random() * 400; // 450 থেকে 850px পর্যন্ত push
    
    newX = yesCX + Math.cos(angle) * pushForce;
    newY = yesCY + Math.sin(angle) * pushForce;
    
    // আবার safe area এর মধ্যে clamp (ফোর্স করে ভিতরে রাখা)
    newX = Math.max(area.minX, Math.min(area.maxX, newX));
    newY = Math.max(area.minY, Math.min(area.maxY, newY));
  }
  
  // Final set position
  noBtn.style.position = 'absolute';
  noBtn.style.left = newX + 'px';
  noBtn.style.top  = newY + 'px';
  
  // Crazy visual + shake
  const rot = (Math.random() * 60 - 30).toFixed(1);
  const scale = (Math.random() * 0.4 + 0.8).toFixed(2);
  noBtn.style.transform = `rotate(${rot}deg) scale(${scale}) translateZ(0)`;
  
  setTimeout(() => {
    noBtn.style.transform = 'rotate(0deg) scale(1)';
  }, 380);
  
  // Vibration – আরও intense
  if (navigator.vibrate) {
    navigator.vibrate([25, 15, 35, 15, 25]);
  }
}

// Events
noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  moveNoButtonCrazy();
});

noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveNoButtonCrazy();
});

yesBtn.addEventListener('click', () => {
  surprise.style.display = 'block';
  noBtn.style.display = 'none';
});
