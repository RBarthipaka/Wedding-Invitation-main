/**
 * ROYAL INDIAN WEDDING INVITATION
 * Groom: Chi. Rajesh Goud & Bride: Chi.La.Sow. Spandana Keerthi
 * Date: November 25, 2026 | Mahabubabad
 */

document.addEventListener('DOMContentLoaded', () => {
  initMusicPlayer();
  initEnvelope();
  initPetals();
  initCountdown();
  initLanguageSwitcher();
  initLightbox();
  initCopyAddress();
  initBlessings();
  initCardTilt();
});

/* ==========================================================
   1. MULTI-TRACK WEDDING MUSIC PLAYER (2 SONGS ONLY)
   ========================================================== */
const playlist = [
  {
    title: "Madhuvaramae",
    fullTitle: "Madhuvaramae | Return of The Dragon",
    sub: "Leon James | Pradeep Ranganathan, Kayadu Lohar",
    src: "./assets/mp3/madhuvaramae.webm"
  },
  {
    title: "Mangala Nadaswaram",
    fullTitle: "Mangala Nadaswaram & Shehnai",
    sub: "Auspicious Traditional Wedding Dhun",
    src: "./assets/mp3/asd.mp3"
  }
];

let currentTrackIndex = 0;
let isAudioPlaying = false;
let audioPlayer = null;

function initMusicPlayer() {
  audioPlayer = document.getElementById('wedding-audio');
  const controller = document.getElementById('music-controller');
  const disc = document.getElementById('music-disc');
  const playIcon = document.getElementById('music-disc-icon');
  const titleEl = document.getElementById('music-title');
  const statusEl = document.getElementById('music-status-text');
  const prevBtn = document.getElementById('prev-track-btn');
  const nextBtn = document.getElementById('next-track-btn');
  const playlistBtn = document.getElementById('playlist-toggle-btn');
  const drawer = document.getElementById('playlist-drawer');
  const closeDrawerBtn = document.getElementById('playlist-close');
  const playlistItems = document.querySelectorAll('.playlist-item');

  if (!audioPlayer) return;

  function loadTrack(index, playImmediate = true) {
    currentTrackIndex = (index + playlist.length) % playlist.length;
    const track = playlist[currentTrackIndex];

    audioPlayer.src = track.src;
    audioPlayer.load();

    if (titleEl) titleEl.textContent = track.title;
    if (statusEl) {
      statusEl.innerHTML = isAudioPlaying 
        ? 'Playing <div class="sound-wave"><span></span><span></span><span></span></div>' 
        : 'Paused';
    }

    // Update playlist UI
    playlistItems.forEach((item, idx) => {
      if (idx === currentTrackIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    if (playImmediate) {
      audioPlayer.play().then(() => {
        isAudioPlaying = true;
        if (controller) controller.classList.add('playing');
        if (playIcon) playIcon.className = 'fa fa-pause';
        if (statusEl) statusEl.innerHTML = 'Playing <div class="sound-wave"><span></span><span></span><span></span></div>';
      }).catch(err => {
        console.log("Audio autoplay restriction:", err);
      });
    }
  }

  function togglePlay() {
    if (audioPlayer.paused) {
      audioPlayer.play().then(() => {
        isAudioPlaying = true;
        if (controller) controller.classList.add('playing');
        if (playIcon) playIcon.className = 'fa fa-pause';
        if (statusEl) statusEl.innerHTML = 'Playing <div class="sound-wave"><span></span><span></span><span></span></div>';
      }).catch(err => console.log(err));
    } else {
      audioPlayer.pause();
      isAudioPlaying = false;
      if (controller) controller.classList.remove('playing');
      if (playIcon) playIcon.className = 'fa fa-play';
      if (statusEl) statusEl.innerHTML = 'Paused';
    }
  }

  if (disc) disc.addEventListener('click', togglePlay);

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      loadTrack(currentTrackIndex - 1, true);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      loadTrack(currentTrackIndex + 1, true);
    });
  }

  // Auto-play next track when current ends
  audioPlayer.addEventListener('ended', () => {
    loadTrack(currentTrackIndex + 1, true);
  });

  // Toggle Playlist Drawer
  if (playlistBtn) {
    playlistBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (drawer) drawer.classList.toggle('active');
    });
  }

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', () => {
      if (drawer) drawer.classList.remove('active');
    });
  }

  // Click track inside playlist
  playlistItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.dataset.index, 10);
      loadTrack(idx, true);
      if (drawer) drawer.classList.remove('active');
    });
  });

  // Close drawer when clicking outside
  document.addEventListener('click', (e) => {
    if (drawer && drawer.classList.contains('active') && !drawer.contains(e.target) && e.target !== playlistBtn) {
      drawer.classList.remove('active');
    }
  });

  // Auto-start on first user interaction if not started yet
  const firstPlay = () => {
    if (audioPlayer.paused && !isAudioPlaying) {
      audioPlayer.play().then(() => {
        isAudioPlaying = true;
        if (controller) controller.classList.add('playing');
        if (playIcon) playIcon.className = 'fa fa-pause';
        if (statusEl) statusEl.innerHTML = 'Playing <div class="sound-wave"><span></span><span></span><span></span></div>';
      }).catch(() => {});
    }
    window.removeEventListener('click', firstPlay);
    window.removeEventListener('touchstart', firstPlay);
  };

  window.addEventListener('click', firstPlay, { once: true });
  window.addEventListener('touchstart', firstPlay, { once: true });
}

/* ==========================================================
   2. ROYAL ENVELOPE MODAL (OPENING CEREMONY)
   ========================================================== */
function initEnvelope() {
  const overlay = document.getElementById('envelope-overlay');
  const openBtn = document.getElementById('open-envelope-btn');
  const skipBtn = document.getElementById('skip-envelope-btn');

  if (!overlay) return;

  function openCard() {
    overlay.classList.add('opened');

    // Trigger music
    if (audioPlayer && audioPlayer.paused) {
      audioPlayer.play().then(() => {
        isAudioPlaying = true;
        const controller = document.getElementById('music-controller');
        const playIcon = document.getElementById('music-disc-icon');
        const statusEl = document.getElementById('music-status-text');
        if (controller) controller.classList.add('playing');
        if (playIcon) playIcon.className = 'fa fa-pause';
        if (statusEl) statusEl.innerHTML = 'Playing <div class="sound-wave"><span></span><span></span><span></span></div>';
      }).catch(() => {});
    }

    // Shower celebratory petals & confetti
    if (window.burstPetals) {
      window.burstPetals(40);
    }
  }

  if (openBtn) openBtn.addEventListener('click', openCard);
  if (skipBtn) skipBtn.addEventListener('click', openCard);
}

/* ==========================================================
   3. HIGH PERFORMANCE PETALS, MARIGOLDS & SPARKLES CANVAS
   ========================================================== */
function initPetals() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const petalCount = window.innerWidth < 768 ? 22 : 38;

  const colors = [
    'rgba(240, 95, 120, 0.78)',  // Rose Petal Pink
    'rgba(215, 35, 65, 0.75)',   // Deep Crimson Rose
    'rgba(255, 190, 30, 0.85)',  // Golden Marigold
    'rgba(245, 140, 20, 0.80)',  // Orange Marigold
    'rgba(212, 175, 55, 0.85)'   // Gold Sparkle Dust
  ];

  class Petal {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * -height * 0.5;
      this.size = Math.random() * 8 + 5;
      this.speedX = (Math.random() - 0.5) * 1.5;
      this.speedY = Math.random() * 1.4 + 1.1;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 2;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.isSparkle = Math.random() > 0.72;
      this.opacity = Math.random() * 0.6 + 0.4;
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.y * 0.015) + this.speedX;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 20) {
        this.reset();
        this.y = -20;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;

      if (this.isSparkle) {
        // 4-point gold star sparkle
        ctx.fillStyle = '#fce588';
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          ctx.lineTo(Math.cos((i * Math.PI) / 2) * (this.size * 0.6), Math.sin((i * Math.PI) / 2) * (this.size * 0.6));
          ctx.lineTo(Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (this.size * 0.2), Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (this.size * 0.2));
        }
        ctx.closePath();
        ctx.fill();
      } else {
        // Organic curved flower petal
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
  }

  window.burstPetals = function(count = 25) {
    for (let i = 0; i < count; i++) {
      const p = new Petal();
      p.x = width * 0.5 + (Math.random() - 0.5) * 260;
      p.y = height * 0.35 + (Math.random() - 0.5) * 120;
      p.speedY = Math.random() * 3 + 2;
      petals.push(p);
    }
  };

  function animate() {
    ctx.clearRect(0, 0, width, height);
    petals.forEach(petal => {
      petal.update();
      petal.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================
   4. LIVE COUNTDOWN TIMER TO MUHURTHAM
   Muhurtham: November 25, 2026, 09:19:00 AM IST (UTC+05:30)
   ========================================================== */
function initCountdown() {
  const weddingTime = new Date('2026-11-25T09:19:00+05:30').getTime();

  const daysEl = document.getElementById('days-count');
  const hoursEl = document.getElementById('hours-count');
  const minsEl = document.getElementById('minutes-count');
  const secsEl = document.getElementById('seconds-count');
  const noteEl = document.getElementById('countdown-note');

  if (!daysEl) return;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = weddingTime - now;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      if (noteEl) noteEl.innerHTML = '💍 <strong>The Auspicious Wedding Has Begun! Bless the Couple!</strong>';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days < 10 ? '0' + days : days;
    hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    minsEl.textContent = minutes < 10 ? '0' + minutes : minutes;
    secsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================
   5. BILINGUAL LANGUAGE SWITCHER (EN / TE / BOTH)
   ========================================================== */
function initLanguageSwitcher() {
  const btns = document.querySelectorAll('.lang-btn');
  if (!btns.length) return;

  document.body.classList.add('lang-both-active');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.dataset.lang; // 'en', 'te', 'both'
      document.body.classList.remove('lang-en-active', 'lang-te-active', 'lang-both-active');

      if (mode === 'en') {
        document.body.classList.add('lang-en-active');
      } else if (mode === 'te') {
        document.body.classList.add('lang-te-active');
      } else {
        document.body.classList.add('lang-both-active');
      }
    });
  });
}

/* ==========================================================
   6. INTERACTIVE "BLESS THE COUPLE" (అక్షింతల ఆశీర్వాదం)
   ========================================================== */
let blessingCount = 148;
const blessingPhrases = [
  "శతమానం భవతి శతాయుః పురుషః! 🌸",
  "Happy Married Life Rajesh & Keerthi! 💍",
  "దీర్ఘ సుమంగళీ భవ! 🙏",
  "May your love grow stronger every day! ✨",
  "కళ్యాణం కమనీయం! శుభం భూయాత్! 🌺",
  "Hearty congratulations from near and dear! 💖"
];

function initBlessings() {
  const blessBtn = document.getElementById('bless-couple-btn');
  const countBadge = document.getElementById('bless-count-badge');

  if (!blessBtn) return;

  blessBtn.addEventListener('click', () => {
    blessingCount++;
    if (countBadge) {
      countBadge.textContent = blessingCount + "+";
    }

    // Shower rice & petals
    if (window.burstPetals) {
      window.burstPetals(35);
    }

    // Random blessing toast message
    const phrase = blessingPhrases[Math.floor(Math.random() * blessingPhrases.length)];
    showBlessingToast(phrase);
  });
}

function showBlessingToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'floating-blessing-toast telugu-text';
  toast.innerHTML = msg;
  document.body.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 2400);
}

/* ==========================================================
   7. 3D CARD TILT & PARALLAX EFFECT
   ========================================================== */
function initCardTilt() {
  const frame = document.querySelector('.invitation-frame');
  if (!frame || window.innerWidth < 992) return;

  frame.addEventListener('mousemove', (e) => {
    const rect = frame.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;

    frame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  frame.addEventListener('mouseleave', () => {
    frame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    frame.style.transition = 'transform 0.5s ease';
  });

  frame.addEventListener('mouseenter', () => {
    frame.style.transition = 'none';
  });
}

/* ==========================================================
   8. LIGHTBOX FOR GALLERY & PHYSICAL CARD
   ========================================================== */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');

  if (!modal || !modalImg) return;

  document.querySelectorAll('.zoomable-img').forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.dataset.fullsrc || img.src;
      modal.classList.add('active');
    });
  });

  function closeModal() {
    modal.classList.remove('active');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================
   9. COPY ADDRESS & TOAST NOTIFICATION
   ========================================================== */
function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function initCopyAddress() {
  const copyBtn = document.getElementById('copy-address-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const address = "Aarthi Reddy Gardens, Yellandu Bypass Road, Mahabubabad, Telangana 506101";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(address).then(() => {
        showToast("📍 Venue address copied to clipboard!");
      }).catch(() => {
        fallbackCopy(address);
      });
    } else {
      fallbackCopy(address);
    }
  });

  function fallbackCopy(text) {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    showToast("📍 Venue address copied to clipboard!");
  }
}
