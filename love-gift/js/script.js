/* =========================================================
   LOVE GIFT — LOGIC
   You shouldn't need to edit this file. Edit js/config.js instead.
   ========================================================= */

const TOTAL = 7;
let current = 1;

// ---------- Render text content from CONFIG ----------
document.getElementById('lockTitle').textContent = CONFIG.lockTitle;
document.getElementById('lockSub').textContent = CONFIG.lockSubtitle;

document.getElementById('jarHeading').innerHTML = CONFIG.jarHeading;
document.getElementById('jarSub').textContent = CONFIG.jarSubtitle;

document.getElementById('songTitle').textContent = CONFIG.songTitle;
document.getElementById('songArtist').textContent = CONFIG.songArtist;
document.getElementById('lyricLine').textContent = CONFIG.lyrics[0];
document.getElementById('timeTotal').textContent = "2:49";

document.getElementById('memHeading').innerHTML = CONFIG.memoriesHeading;
document.getElementById('memCaption').textContent = CONFIG.memoriesCaption;

document.getElementById('giftHeading').textContent = CONFIG.giftHeading;
document.getElementById('giftSub').textContent = CONFIG.giftSubtitle;

document.getElementById('awardTitle').textContent = CONFIG.awardTitle;
document.getElementById('awardPresented').textContent = CONFIG.awardPresentedTo;
document.getElementById('awardName').textContent = CONFIG.herName;
document.getElementById('awardMsg').textContent = CONFIG.awardMessage;

// Album art image (optional)
if(CONFIG.albumArtImage){
  const art = document.getElementById('albumArt');
  art.innerHTML = `<img src="${CONFIG.albumArtImage}" alt="album art">`;
}

// ---------- Build heart jar ----------
const jarGrid = document.getElementById('jarGrid');
CONFIG.hearts.forEach(h=>{
  const chip = document.createElement('div');
  chip.className = 'heart-chip';
  chip.textContent = h.label;
  chip.addEventListener('click', ()=>{
    document.getElementById('jarNote').textContent = h.note;
  });
  jarGrid.appendChild(chip);
});

// ---------- Build memories strip ----------
const memStrip = document.getElementById('memStrip');
CONFIG.memories.forEach(m=>{
  const wrap = document.createElement('div');
  wrap.className = 'mem-photo';
  const img = document.createElement('img');
  img.src = 'assets/photos/' + m.photo;
  img.alt = m.caption;
  img.onerror = function(){ this.remove(); }; // falls back to the striped placeholder background
  const cap = document.createElement('div');
  cap.className = 'cap';
  cap.textContent = m.caption;
  wrap.appendChild(img);
  wrap.appendChild(cap);
  memStrip.appendChild(wrap);
});

// ---------- Build gift box items ----------
const giftItemsEl = document.getElementById('giftItems');
CONFIG.giftItems.forEach(item=>{
  const el = document.createElement('div');
  el.className = 'gift-item';
  el.textContent = item.emoji;
  el.addEventListener('click', ()=>{
    document.getElementById('modalEmoji').textContent = item.emoji;
    document.getElementById('modalMsg').textContent = item.message;
    document.getElementById('itemModal').classList.add('show');
  });
  giftItemsEl.appendChild(el);
});
function closeModal(){ document.getElementById('itemModal').classList.remove('show'); }

// ---------- Progress dots ----------
const progressEl = document.getElementById('progress');
for(let i=1;i<=TOTAL;i++){
  const seg = document.createElement('div');
  seg.className = 'seg';
  seg.id = 'seg'+i;
  progressEl.appendChild(seg);
}
function updateProgress(){
  for(let i=1;i<=TOTAL;i++){
    document.getElementById('seg'+i).classList.toggle('done', i<=current);
  }
}
function goTo(n){
  document.getElementById('s'+current).classList.remove('active');
  current = n;
  document.getElementById('s'+current).classList.add('active');
  updateProgress();
  if(current === 4){ startLyrics(); }
}
updateProgress();

// Next-arrow buttons for screens 3, 4, 5, and 6
[3,4,5].forEach(n=>{
  const btn = document.createElement('button');
  btn.className = 'next-btn';
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';
  btn.onclick = ()=>goTo(n+1);
  document.getElementById('s'+n).appendChild(btn);
});
const s6next = document.createElement('button');
s6next.className = 'next-btn';
s6next.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';
s6next.onclick = ()=>goTo(7);
document.getElementById('s6').appendChild(s6next);

// ---------- Screen 1: passcode ----------
let entered = '';
let attempt = 0;
const dotsRow = document.getElementById('dotsRow');
const tryMsg = document.getElementById('tryAgainMsg');
function renderDots(){
  const dots = dotsRow.querySelectorAll('.pc-dot');
  dots.forEach((d,i)=> d.classList.toggle('filled', i < entered.length));
}
document.querySelectorAll('#numpad .num[data-n]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    if(entered.length >= 4) return;
    entered += btn.dataset.n;
    renderDots();
    if(entered.length === 4){
      setTimeout(checkCode, 250);
    }
  });
});
document.getElementById('delBtn').addEventListener('click', ()=>{
  entered = entered.slice(0,-1);
  renderDots();
});
function checkCode(){
  // If a real passcode is set in config.js, require it. Otherwise: wrong once, then unlock.
  if(CONFIG.passcode){
    if(entered === CONFIG.passcode){
      tryMsg.textContent = 'Unlocked 💛';
      setTimeout(()=> goTo(2), 500);
      return;
    }
    dotsRow.classList.add('shake');
    tryMsg.textContent = 'Wrong code, try again 🥺';
    setTimeout(()=>{
      dotsRow.classList.remove('shake');
      entered = '';
      renderDots();
    }, 450);
    return;
  }
  attempt++;
  if(attempt === 1){
    dotsRow.classList.add('shake');
    tryMsg.textContent = 'Wrong code, try again 🥺';
    setTimeout(()=>{
      dotsRow.classList.remove('shake');
      entered = '';
      renderDots();
    }, 450);
  } else {
    tryMsg.textContent = 'Unlocked 💛';
    setTimeout(()=> goTo(2), 500);
  }
}

// ---------- Screen 4: song ----------
let lyricIdx = 0;
let lyricTimer = null;
let playing = false;
const audioEl = document.getElementById('audioEl');
if(CONFIG.audioFile){
  audioEl.src = 'assets/audio/' + CONFIG.audioFile;
}

function startLyrics(){
  if(lyricTimer) return;
  lyricTimer = setInterval(()=>{
    lyricIdx = (lyricIdx+1) % CONFIG.lyrics.length;
    document.getElementById('lyricLine').textContent = CONFIG.lyrics[lyricIdx];
  }, 2600);
}

function formatTime(s){
  const m = Math.floor(s/60);
  const sec = Math.floor(s%60).toString().padStart(2,'0');
  return `${m}:${sec}`;
}

document.getElementById('playBtn').addEventListener('click', function(){
  playing = !playing;
  const fill = document.getElementById('fillBar');
  const btn = this;

  if(CONFIG.audioFile){
    // Real audio playback
    if(playing){
      audioEl.play().catch(()=>{});
      btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>';
    } else {
      audioEl.pause();
      btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
    }
  } else {
    // Fake animated player (no audio file provided)
    if(playing){
      fill.style.transition = 'width 4s linear';
      fill.style.width = '100%';
      btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>';
    } else {
      fill.style.transition = 'none';
      fill.style.width = '0%';
      btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
    }
  }
});

if(CONFIG.audioFile){
  audioEl.addEventListener('timeupdate', ()=>{
    const pct = (audioEl.currentTime / (audioEl.duration||1)) * 100;
    document.getElementById('fillBar').style.width = pct + '%';
    document.getElementById('timeCurrent').textContent = formatTime(audioEl.currentTime);
  });
  audioEl.addEventListener('loadedmetadata', ()=>{
    document.getElementById('timeTotal').textContent = formatTime(audioEl.duration);
  });
  document.getElementById('track').addEventListener('click', (e)=>{
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioEl.currentTime = pct * (audioEl.duration||0);
  });
}

// ---------- Floating particles ----------
const particleLayer = document.getElementById('particleLayer');
function spawnParticle(){
  const p = document.createElement('span');
  p.className = 'particle';
  p.textContent = CONFIG.particleEmojis[Math.floor(Math.random()*CONFIG.particleEmojis.length)];
  const leftPos = 5 + Math.random()*90;
  const duration = 5 + Math.random()*4;
  const drift = (Math.random()*80 - 40) + 'px';
  const spin = (Math.random()*260 - 130) + 'deg';
  const size = 14 + Math.random()*14;
  p.style.left = leftPos + '%';
  p.style.fontSize = size + 'px';
  p.style.animationDuration = duration + 's';
  p.style.setProperty('--drift', drift);
  p.style.setProperty('--spin', spin);
  particleLayer.appendChild(p);
  setTimeout(()=> p.remove(), duration*1000 + 200);
}
setInterval(spawnParticle, CONFIG.particleFrequencyMs);
for(let i=0;i<6;i++){ setTimeout(spawnParticle, i*200); }
