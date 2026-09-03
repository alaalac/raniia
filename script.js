// 👉 change the password here
  const PASSWORD = "rey";

  const sceneLock = document.getElementById('scene-lock');
  const sceneCelebrate = document.getElementById('scene-celebrate');
  const sceneLetter = document.getElementById('scene-letter');

  const input = document.getElementById('password-input');
  const unlockBtn = document.getElementById('unlock-btn');
  const wrongMsg = document.getElementById('wrong-msg');
  const lockCard = document.querySelector('.lock-card');
  const bdAudio = document.getElementById('bd-audio');

  function tryUnlock(){
    if(input.value.trim().toLowerCase() === PASSWORD.toLowerCase()){
      sceneLock.classList.remove('active');
      sceneCelebrate.classList.add('active');
      launchConfetti();
      // starting playback inside this click handler is what lets it bypass
      // the browser's autoplay-blocking rules
      bdAudio.play().catch(() => { /* she can hit play manually if this fails */ });
    } else {
      wrongMsg.classList.add('show');
      lockCard.classList.remove('shake');
      void lockCard.offsetWidth; // restart animation
      lockCard.classList.add('shake');
    }
  }

  unlockBtn.addEventListener('click', tryUnlock);
  input.addEventListener('keydown', e => { if(e.key === 'Enter') tryUnlock(); });

  document.getElementById('to-letter-btn').addEventListener('click', () => {
    sceneCelebrate.classList.remove('active');
    sceneLetter.classList.add('active');
  });

  function revealLetter(){
    document.getElementById('ask-block').style.display = 'none';
    document.getElementById('letter-card').classList.add('show');
  }
  document.getElementById('yes1').addEventListener('click', revealLetter);
  document.getElementById('yes2').addEventListener('click', revealLetter);

  // gentle confetti burst when unlocked
  function launchConfetti(){
    const colors = ['#f5c9d6','#c9b6e4','#e3b34a','#fffdf9','#e78aa4'];
    for(let i=0;i<28;i++){
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random()*100 + 'vw';
      c.style.background = colors[Math.floor(Math.random()*colors.length)];
      c.style.animationDuration = (2.5 + Math.random()*2) + 's';
      c.style.animationDelay = (Math.random()*0.6) + 's';
      sceneCelebrate.appendChild(c);
      setTimeout(() => c.remove(), 5000);
    }
  }