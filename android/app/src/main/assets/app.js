/**
 * MULTIAPP - UNIVERSAL PHONE APPS CLONING & DUAL SPACE ENGINE
 * Supports cloning ANY application from the user's phone:
 * FRND, WhatsApp, PhonePe, Paytm, Google Pay, Instagram, Telegram,
 * Facebook, BGMI, Free Fire, Netflix, Spotify, or any custom app/APK!
 */

(function () {
  'use strict';

  // ==========================================
  // 1. SOUND FX ENGINE (Web Audio API)
  // ==========================================
  const SoundFX = {
    ctx: null,
    enabled: true,

    init() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      } catch (e) {
        console.warn('Web Audio not supported:', e);
      }
    },

    resume() {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    },

    playClick() {
      if (!this.enabled || !this.ctx) return;
      this.resume();
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(650, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
      } catch (e) {}
    },

    playPop() {
      if (!this.enabled || !this.ctx) return;
      this.resume();
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(920, this.ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
      } catch (e) {}
    },

    playDelete() {
      if (!this.enabled || !this.ctx) return;
      this.resume();
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.12);
      } catch (e) {}
    },

    playSuccess() {
      if (!this.enabled || !this.ctx) return;
      this.resume();
      try {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const startTime = this.ctx.currentTime + idx * 0.08;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.14, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.28);
        });
      } catch (e) {}
    },

    playGift() {
      if (!this.enabled || !this.ctx) return;
      this.resume();
      try {
        const chord = [784, 988, 1175]; // G major chime
        chord.forEach((freq) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
          gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.4);
        });
      } catch (e) {}
    }
  };

  // ==========================================
  // 2. TOAST NOTIFICATIONS
  // ==========================================
  const Toast = {
    container: document.getElementById('toastContainer'),

    show(message, type = 'info') {
      if (!this.container) return;
      const el = document.createElement('div');
      el.className = `toast-msg toast-${type}`;
      el.textContent = message;
      this.container.appendChild(el);
      setTimeout(() => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(-10px)';
        el.style.transition = 'all 0.3s ease';
        setTimeout(() => el.remove(), 300);
      }, 2600);
    }
  };

  // ==========================================
  // 3. COMPLETE CATALOG OF PHONE APPLICATIONS
  // ==========================================
  const PHONE_LIBRARY_APPS = [
    { id: 'frnd', name: 'FRND', type: 'frnd', category: 'social', icon: '💖', colorClass: 'app-color-frnd', size: '36 MB', package: 'in.frnd.app' },
    { id: 'whatsapp', name: 'WhatsApp', type: 'chat', category: 'messaging', icon: '💬', colorClass: 'app-color-whatsapp', size: '48 MB', package: 'com.whatsapp' },
    { id: 'phonepe', name: 'PhonePe', type: 'upi', category: 'finance', icon: '💸', colorClass: 'app-color-phonepe', size: '52 MB', package: 'com.phonepe.app' },
    { id: 'gpay', name: 'Google Pay', type: 'upi', category: 'finance', icon: '⚡', colorClass: 'app-color-gpay', size: '42 MB', package: 'com.google.android.apps.nbu.paisa.user' },
    { id: 'paytm', name: 'Paytm', type: 'upi', category: 'finance', icon: '💳', colorClass: 'app-color-paytm', size: '64 MB', package: 'net.one97.paytm' },
    { id: 'instagram', name: 'Instagram', type: 'social', category: 'social', icon: '📸', colorClass: 'app-color-instagram', size: '54 MB', package: 'com.instagram.android' },
    { id: 'telegram', name: 'Telegram', type: 'chat', category: 'messaging', icon: '✈️', colorClass: 'app-color-telegram', size: '41 MB', package: 'org.telegram.messenger' },
    { id: 'facebook', name: 'Facebook', type: 'social', category: 'social', icon: '📘', colorClass: 'app-color-facebook', size: '62 MB', package: 'com.facebook.katana' },
    { id: 'bgmi', name: 'BGMI Mobile', type: 'game', category: 'gaming', icon: '🎮', colorClass: 'app-color-bgmi', size: '740 MB', package: 'com.pubg.imobile' },
    { id: 'freefire', name: 'Free Fire MAX', type: 'game', category: 'gaming', icon: '🔥', colorClass: 'app-color-freefire', size: '620 MB', package: 'com.dts.freefiremax' },
    { id: 'snapchat', name: 'Snapchat', type: 'social', category: 'social', icon: '👻', colorClass: 'app-color-snapchat', size: '58 MB', package: 'com.snapchat.android' },
    { id: 'netflix', name: 'Netflix', type: 'media', category: 'utility', icon: '🎬', colorClass: 'app-color-netflix', size: '38 MB', package: 'com.netflix.mediaclient' },
    { id: 'spotify', name: 'Spotify', type: 'media', category: 'utility', icon: '🎧', colorClass: 'app-color-spotify', size: '45 MB', package: 'com.spotify.music' },
    { id: 'youtube', name: 'YouTube', type: 'media', category: 'utility', icon: '▶️', colorClass: 'app-color-youtube', size: '44 MB', package: 'com.google.android.youtube' },
    { id: 'truecaller', name: 'Truecaller', type: 'universal', category: 'utility', icon: '📞', colorClass: 'app-color-truecaller', size: '50 MB', package: 'com.truecaller' },
    { id: 'tinder', name: 'Tinder', type: 'social', category: 'social', icon: '🔥', colorClass: 'app-color-tinder', size: '44 MB', package: 'com.tinder' },
    { id: 'amazon', name: 'Amazon', type: 'universal', category: 'utility', icon: '🛍️', colorClass: 'app-color-amazon', size: '56 MB', package: 'in.amazon.mShop.android.shopping' },
    { id: 'flipkart', name: 'Flipkart', type: 'universal', category: 'utility', icon: '🛒', colorClass: 'app-color-flipkart', size: '49 MB', package: 'com.flipkart.android' },
    { id: 'zomato', name: 'Zomato', type: 'universal', category: 'utility', icon: '🍔', colorClass: 'app-color-zomato', size: '55 MB', package: 'com.application.zomato' },
    { id: 'uber', name: 'Uber', type: 'universal', category: 'utility', icon: '🚗', colorClass: 'app-color-uber', size: '61 MB', package: 'com.ubercab' }
  ];

  // Initial clones demonstrating that ANY phone app can be cloned
  const INITIAL_DEFAULT_CLONES = [
    { cloneId: 'cl_frnd_1', appId: 'frnd', name: 'FRND', cloneNum: 1, icon: '💖', colorClass: 'app-color-frnd' },
    { cloneId: 'cl_whatsapp_1', appId: 'whatsapp', name: 'WhatsApp', cloneNum: 1, icon: '💬', colorClass: 'app-color-whatsapp' },
    { cloneId: 'cl_phonepe_1', appId: 'phonepe', name: 'PhonePe', cloneNum: 1, icon: '💸', colorClass: 'app-color-phonepe' },
    { cloneId: 'cl_instagram_1', appId: 'instagram', name: 'Instagram', cloneNum: 1, icon: '📸', colorClass: 'app-color-instagram' },
    { cloneId: 'cl_telegram_1', appId: 'telegram', name: 'Telegram', cloneNum: 1, icon: '✈️', colorClass: 'app-color-telegram' }
  ];

  // ==========================================
  // 4. APPLICATION STATE
  // ==========================================
  const MultiAppState = {
    clones: [],
    isVip: false,
    ultraMode: false,
    soundEnabled: true,
    pinLockCode: null,
    enteredPin: '',
    selectedPlanPrice: 249,
    currentRunningClone: null,
    isMicActive: false,
    currentFilter: 'all',
    searchQuery: '',

    init() {
      const savedClones = localStorage.getItem('multiapp_universal_clones_v2');
      if (savedClones) {
        try {
          this.clones = JSON.parse(savedClones);
        } catch (e) {
          this.clones = [...INITIAL_DEFAULT_CLONES];
        }
      } else {
        this.clones = [...INITIAL_DEFAULT_CLONES];
        this.saveClones();
      }

      const savedVip = localStorage.getItem('multiapp_vip');
      if (savedVip !== null) this.isVip = savedVip === 'true';

      const savedSound = localStorage.getItem('multiapp_sound');
      if (savedSound !== null) this.soundEnabled = savedSound === 'true';
      SoundFX.enabled = this.soundEnabled;

      const savedPin = localStorage.getItem('multiapp_pin');
      if (savedPin) this.pinLockCode = savedPin;
    },

    saveClones() {
      localStorage.setItem('multiapp_universal_clones_v2', JSON.stringify(this.clones));
    },

    setVip(val) {
      this.isVip = !!val;
      localStorage.setItem('multiapp_vip', this.isVip ? 'true' : 'false');
      MultiAppUI.renderVipState();
    },

    setSound(val) {
      this.soundEnabled = !!val;
      SoundFX.enabled = this.soundEnabled;
      localStorage.setItem('multiapp_sound', this.soundEnabled ? 'true' : 'false');
      MultiAppUI.renderSoundState();
    },

    getNextCloneNumberForApp(appId) {
      const existing = this.clones.filter(c => c.appId === appId);
      if (existing.length === 0) return 1;
      const maxNum = Math.max(...existing.map(c => c.cloneNum || 1));
      return maxNum + 1;
    },

    cloneApp(appDef) {
      const nextNum = this.getNextCloneNumberForApp(appDef.id);
      const newClone = {
        cloneId: `cl_${appDef.id}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        appId: appDef.id,
        name: appDef.name,
        cloneNum: nextNum,
        icon: appDef.icon,
        colorClass: appDef.colorClass || 'app-color-custom',
        type: appDef.type || 'universal',
        package: appDef.package || `com.${appDef.id}.dual`
      };

      this.clones.push(newClone);
      this.saveClones();
      MultiAppUI.renderClones();
      SoundFX.playPop();
      Toast.show(`Cloned ${appDef.name} #${nextNum} into Dual Space!`, 'success');
      return newClone;
    },

    duplicateClone(cloneId) {
      const target = this.clones.find(c => c.cloneId === cloneId);
      if (!target) return;
      const appDef = PHONE_LIBRARY_APPS.find(a => a.id === target.appId) || {
        id: target.appId,
        name: target.name,
        icon: target.icon,
        colorClass: target.colorClass,
        type: target.type || 'universal'
      };
      this.cloneApp(appDef);
    },

    deleteClone(cloneId) {
      const clone = this.clones.find(c => c.cloneId === cloneId);
      const cloneName = clone ? `${clone.name} #${clone.cloneNum}` : 'Clone';
      this.clones = this.clones.filter(c => c.cloneId !== cloneId);
      this.saveClones();
      MultiAppUI.renderClones();
      SoundFX.playDelete();
      Toast.show(`Removed ${cloneName} from Dual Space`, 'info');
    },

    removeAllClones() {
      this.clones = [];
      this.saveClones();
      MultiAppUI.renderClones();
      SoundFX.playDelete();
      Toast.show('All Dual Space Clones Removed!', 'info');
    },

    resetToDemo() {
      this.clones = [...INITIAL_DEFAULT_CLONES];
      this.saveClones();
      MultiAppUI.renderClones();
      SoundFX.playSuccess();
      Toast.show('Reset to Demo Clones (FRND, WhatsApp, PhonePe, Instagram, Telegram)', 'success');
    }
  };

  // ==========================================
  // 5. UI CONTROLLER
  // ==========================================
  const MultiAppUI = {
    // Containers
    phoneFrame: document.getElementById('phoneFrame'),
    clonesContainer: document.getElementById('maClonesContainer'),
    emptyState: document.getElementById('maEmptyState'),
    screenSplash: document.getElementById('screenSplash'),
    menuDropdown: document.getElementById('maMenuDropdown'),

    // Modals
    sandboxOverlay: document.getElementById('sandboxAppOverlay'),
    settingsModal: document.getElementById('settingsModal'),
    paymentModal: document.getElementById('paymentModal'),
    adOverlay: document.getElementById('adInterstitialOverlay'),
    pinModal: document.getElementById('pinLockModal'),
    storageModal: document.getElementById('storageModal'),
    phoneAppsModal: document.getElementById('phoneAppsModal'),

    init() {
      // 1. Splash screen transition
      setTimeout(() => {
        if (this.screenSplash) {
          this.screenSplash.classList.add('fade-out');
          setTimeout(() => this.screenSplash.remove(), 500);
        }
      }, 700);

      const btnSkipSplash = document.getElementById('btnSkipSplash');
      if (btnSkipSplash) {
        btnSkipSplash.addEventListener('click', () => {
          if (this.screenSplash) {
            this.screenSplash.classList.add('fade-out');
            setTimeout(() => this.screenSplash.remove(), 300);
          }
        });
      }

      // 2. Render initial interface
      this.renderClones();
      this.renderVipState();
      this.renderSoundState();
      this.renderPhoneAppsGrid();

      // 3. Bind all event listeners
      this.bindEvents();
    },

    renderClones() {
      if (!this.clonesContainer) return;

      if (MultiAppState.clones.length === 0) {
        this.clonesContainer.innerHTML = '';
        if (this.emptyState) this.emptyState.style.display = 'flex';
        return;
      }

      if (this.emptyState) this.emptyState.style.display = 'none';

      // Build clone cards for ANY phone app
      this.clonesContainer.innerHTML = MultiAppState.clones.map(clone => {
        const isFrnd = clone.appId === 'frnd';

        // FRND has cursive typography, other apps have high-res emoji or icon
        const iconContent = isFrnd
          ? `<span class="frnd-cursive-text">frnd</span>`
          : `<span class="app-emoji-icon">${clone.icon || '📱'}</span>`;

        return `
          <div class="ma-clone-card" data-clone-id="${clone.cloneId}" id="card_${clone.cloneId}">
            <!-- Top-left diagonal triangle ribbon with clone index -->
            <div class="ma-corner-ribbon">
              <span>${clone.cloneNum || 1}</span>
            </div>

            <!-- Card Left: App Icon & Name Label -->
            <div class="ma-card-left" data-action="launch" data-clone-id="${clone.cloneId}" title="Launch ${clone.name} Clone #${clone.cloneNum}">
              <div class="frnd-app-icon-wrap">
                <div class="frnd-icon-bg ${clone.colorClass || 'app-color-custom'}">
                  ${iconContent}
                </div>
                <div class="frnd-work-badge" title="Dual Space Work Sandbox">
                  <svg viewBox="0 0 24 24" width="9" height="9" fill="#ffffff">
                    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                  </svg>
                </div>
              </div>
              <span class="ma-clone-label">${clone.name}</span>
            </div>

            <!-- Card Right: Big Plus (+) to create duplicate clone of THIS app + delete (✕) button -->
            <div class="ma-card-right">
              <button class="ma-card-add-btn" data-action="duplicate" data-clone-id="${clone.cloneId}" title="Clone another instance of ${clone.name}" aria-label="Add Clone">
                +
              </button>
              <button class="ma-card-del-btn" data-action="delete" data-clone-id="${clone.cloneId}" title="Remove this clone" aria-label="Remove Clone">
                ✕
              </button>
            </div>
          </div>
        `;
      }).join('');
    },

    renderPhoneAppsGrid() {
      const grid = document.getElementById('phoneAppsGrid');
      if (!grid) return;

      let filtered = PHONE_LIBRARY_APPS;
      if (MultiAppState.currentFilter !== 'all') {
        filtered = filtered.filter(a => a.category === MultiAppState.currentFilter);
      }
      if (MultiAppState.searchQuery) {
        const q = MultiAppState.searchQuery.toLowerCase();
        filtered = filtered.filter(a => a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));
      }

      if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #94A3B8; padding: 20px;">No phone apps found matching "${MultiAppState.searchQuery}". Try adding custom app below!</div>`;
        return;
      }

      grid.innerHTML = filtered.map(app => `
        <div class="phone-app-card" data-app-id="${app.id}" title="Tap to clone ${app.name} into Dual Space">
          <div class="phone-app-icon">${app.icon}</div>
          <span class="phone-app-name">${app.name}</span>
          <span class="phone-app-size">${app.size}</span>
        </div>
      `).join('');
    },

    renderVipState() {
      const devVipLabel = document.getElementById('devVipLabel');
      if (devVipLabel) {
        devVipLabel.textContent = MultiAppState.isVip ? 'VIP Active 👑' : 'Free User';
        devVipLabel.style.color = MultiAppState.isVip ? '#FFD700' : '#38BDF8';
      }
    },

    renderSoundState() {
      const soundLabel = document.getElementById('soundLabel');
      const soundIcon = document.getElementById('soundIcon');
      if (soundLabel) soundLabel.textContent = MultiAppState.soundEnabled ? 'ON' : 'OFF';
      if (soundIcon) soundIcon.textContent = MultiAppState.soundEnabled ? '🔊' : '🔇';
    },

    launchDynamicSandbox(cloneId) {
      const clone = MultiAppState.clones.find(c => c.cloneId === cloneId);
      if (!clone) return;
      MultiAppState.currentRunningClone = clone;
      SoundFX.playClick();

      // Top bar details
      const headerTitle = document.getElementById('sandboxHeaderTitle');
      if (headerTitle) headerTitle.textContent = clone.name;

      const headerIcon = document.getElementById('sandboxHeaderIcon');
      if (headerIcon) headerIcon.textContent = clone.icon || '📱';

      const cloneBadge = document.getElementById('sandboxCloneBadge');
      if (cloneBadge) cloneBadge.textContent = `Clone #${clone.cloneNum || 1}`;

      const headerExtra = document.getElementById('sandboxHeaderExtra');
      if (headerExtra) headerExtra.textContent = `🪙 Dual #${clone.cloneNum || 1}`;

      // Render custom inside view based on app type
      const dynamicBody = document.getElementById('sandboxDynamicBody');
      if (dynamicBody) {
        dynamicBody.innerHTML = this.getSandboxBodyHtmlForApp(clone);
        this.bindSandboxInternalEvents(clone);
      }

      if (this.sandboxOverlay) {
        this.sandboxOverlay.classList.add('active');
      }

      Toast.show(`Opened ${clone.name} Dual Space Sandbox [Clone #${clone.cloneNum}]`, 'success');
    },

    getSandboxBodyHtmlForApp(clone) {
      const appId = clone.appId;
      const cloneNum = clone.cloneNum || 1;

      // 1. FRND App UI (Live Audio Voice Rooms & Dating)
      if (appId === 'frnd') {
        return `
          <div class="frnd-hero-banner">
            <div class="banner-badge">LIVE AUDIO DATING • CLONE #${cloneNum}</div>
            <h3>Dil Ki Baatein Voice Club</h3>
            <p>Connect with people over live voice calls & friendship rooms in Dual Space</p>
          </div>

          <div class="frnd-live-room-box">
            <div class="room-header-row">
              <div class="room-title-wrap">
                <span class="live-dot-pulse"></span>
                <strong>RJ Priya's Chai & Dosti Room</strong>
              </div>
              <span class="listeners-pill">🎧 48 Listening</span>
            </div>

            <div class="voice-avatars-grid">
              <div class="voice-user active-speaker">
                <div class="avatar-ring waves-anim">🌸</div>
                <span class="user-name">RJ Priya</span>
                <span class="user-mic-status">🎙️ Speaking...</span>
              </div>
              <div class="voice-user active-speaker">
                <div class="avatar-ring waves-anim-delay">🎸</div>
                <span class="user-name">Aarav</span>
                <span class="user-mic-status">🎙️ Speaking...</span>
              </div>
              <div class="voice-user">
                <div class="avatar-ring">💫</div>
                <span class="user-name">Simran</span>
                <span class="user-mic-status">🎧 Listening</span>
              </div>
              <div class="voice-user">
                <div class="avatar-ring user-own-avatar">😎</div>
                <span class="user-name">You (#${cloneNum})</span>
                <span class="user-mic-status" id="userCloneMicStatus">🔇 Muted</span>
              </div>
            </div>

            <div class="room-action-bar">
              <button class="btn-toggle-mic" id="btnToggleFrndMic">🎙️ Unmute Mic</button>
              <button class="btn-send-gift" id="btnSendRose">🌹 Rose</button>
              <button class="btn-send-gift" id="btnSendHeart">💖 Heart</button>
              <button class="btn-send-gift" id="btnSendCrown">👑 Crown</button>
            </div>
            <div class="floating-gifts-stage" id="floatingGiftsStage"></div>
          </div>

          <div class="specs-card" style="margin-top: 14px;">
            <h4>🔒 Dual Space Sandbox Details</h4>
            <div class="spec-row"><span class="lbl">Virtual UID:</span><span class="val font-mono">u10_a${100 + cloneNum}</span></div>
            <div class="spec-row"><span class="lbl">Virtual IMEI:</span><span class="val font-mono">864910283019${cloneNum}4</span></div>
            <div class="spec-row"><span class="lbl">Data Path:</span><span class="val font-mono">/data/user/10/in.frnd.app.clone_${cloneNum}/</span></div>
          </div>
        `;
      }

      // 2. WhatsApp / Telegram UI (Chat & Messenger)
      if (appId === 'whatsapp' || appId === 'telegram') {
        const appTitle = appId === 'whatsapp' ? 'WhatsApp' : 'Telegram';
        return `
          <div class="sandbox-view-chat">
            <div class="chat-contacts-header">
              <div>
                <strong>${appTitle} Messenger Dual Space</strong>
                <div style="font-size: 0.72rem; color: #94A3B8;">Isolated Account • Linked to Secondary Number</div>
              </div>
              <span class="chat-account-pill">+91 98765-4321${cloneNum}</span>
            </div>

            <div class="chat-messages-scroll" id="chatMessagesScroll">
              <div class="chat-bubble incoming">
                <b>Pooja (Project Team)</b><br>
                Hey! Are you online on this second account?
                <span class="chat-time">10:42 AM</span>
              </div>
              <div class="chat-bubble outgoing">
                Yes, this is my Dual Space parallel account #${cloneNum}! Completely separated from my main phone.
                <span class="chat-time">10:43 AM ✓✓</span>
              </div>
              <div class="chat-bubble incoming">
                <b>Rahul Sharma</b><br>
                Shared document for client review. Check when free!
                <span class="chat-time">11:15 AM</span>
              </div>
            </div>

            <div class="chat-input-bar">
              <input type="text" id="sandboxChatInput" placeholder="Type message in ${appTitle} Clone #${cloneNum}...">
              <button class="btn-send-chat" id="btnSendSandboxChat">Send</button>
            </div>

            <div class="specs-card" style="margin-top: 14px;">
              <h4>🔒 Sandbox Data Isolation</h4>
              <div class="spec-row"><span class="lbl">Secondary Phone:</span><span class="val font-mono">+91 98765-4321${cloneNum}</span></div>
              <div class="spec-row"><span class="lbl">Database File:</span><span class="val font-mono">/data/user/10/com.${appId}.clone_${cloneNum}/msgstore.db</span></div>
            </div>
          </div>
        `;
      }

      // 3. PhonePe / Google Pay / Paytm UI (UPI & Banking)
      if (appId === 'phonepe' || appId === 'gpay' || appId === 'paytm') {
        const walletName = clone.name;
        return `
          <div class="sandbox-view-upi">
            <div class="upi-balance-card">
              <div class="upi-bal-title">${walletName} Dual UPI Account #${cloneNum}</div>
              <div class="upi-bal-amount">₹14,520.00</div>
              <div style="font-size: 0.72rem; opacity: 0.9;">State Bank of India (Secondary UPI ID: user${cloneNum}@upi)</div>

              <div class="upi-actions-grid">
                <button class="upi-act-btn" onclick="Toast.show('Camera Scanner Opened in Sandbox', 'info');">
                  <span>📷</span> Scan QR
                </button>
                <button class="upi-act-btn" onclick="Toast.show('Contact Transfer Ready', 'info');">
                  <span>📱</span> To Mobile
                </button>
                <button class="upi-act-btn" onclick="Toast.show('Bank Transfer Ready', 'info');">
                  <span>🏦</span> To Bank
                </button>
                <button class="upi-act-btn" onclick="Toast.show('UPI Balance Refreshed: ₹14,520', 'success');">
                  <span>🔄</span> Balance
                </button>
              </div>
            </div>

            <div class="upi-tx-history">
              <div class="upi-tx-title">Recent Transactions (${walletName} Clone #${cloneNum})</div>
              <div class="upi-tx-item">
                <div>
                  <strong>Swiggy Food Delivery</strong>
                  <div style="font-size: 0.68rem; color: #94A3B8;">UPI Ref: 4092104812</div>
                </div>
                <span style="color: #EF4444; font-weight: 700;">- ₹280.00</span>
              </div>
              <div class="upi-tx-item">
                <div>
                  <strong>Received from Rahul</strong>
                  <div style="font-size: 0.68rem; color: #94A3B8;">UPI Ref: 4092104990</div>
                </div>
                <span style="color: #10B981; font-weight: 700;">+ ₹1,500.00</span>
              </div>
            </div>

            <div class="specs-card">
              <h4>🔒 Encrypted Banking Sandbox</h4>
              <div class="spec-row"><span class="lbl">Secure Element:</span><span class="val text-success">Hardware Emulated</span></div>
              <div class="spec-row"><span class="lbl">Device Fingerprint:</span><span class="val font-mono">VIRTUAL_DEVICE_00${cloneNum}</span></div>
            </div>
          </div>
        `;
      }

      // 4. Instagram / Facebook / Snapchat UI (Social & Reels)
      if (appId === 'instagram' || appId === 'facebook' || appId === 'snapchat') {
        return `
          <div class="sandbox-view-social">
            <div class="social-profile-bar">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.5rem;">${clone.icon}</span>
                <div>
                  <strong>@user_parallel_${cloneNum}</strong>
                  <div style="font-size: 0.7rem; color: #94A3B8;">Dual Profile #${cloneNum} • 482 Followers</div>
                </div>
              </div>
              <span class="chat-account-pill">Account #${cloneNum}</span>
            </div>

            <div class="social-post-card">
              <div class="post-header">
                <span>📸</span>
                <span>@urban_explorer</span>
              </div>
              <div class="post-image-placeholder">
                <span>🌄</span>
              </div>
              <div class="post-actions-row">
                <span onclick="Toast.show('Liked post on Clone #${cloneNum}!', 'success');">❤️ 1,248</span>
                <span onclick="Toast.show('Comments loaded', 'info');">💬 84</span>
                <span onclick="Toast.show('Post shared', 'info');">✈️</span>
              </div>
            </div>

            <div class="specs-card">
              <h4>🔒 Social Media Sandbox</h4>
              <div class="spec-row"><span class="lbl">Session Token:</span><span class="val font-mono">Bearer_dual_sess_${cloneNum}</span></div>
              <div class="spec-row"><span class="lbl">Cookies & Media:</span><span class="val text-success">Separate Isolated Storage</span></div>
            </div>
          </div>
        `;
      }

      // 5. BGMI / Free Fire UI (Gaming & Turbo FPS)
      if (appId === 'bgmi' || appId === 'freefire') {
        return `
          <div class="sandbox-view-game">
            <div class="game-hero-banner">
              <div class="banner-badge">60 FPS TURBO ENGINE • ANTI-BAN DUAL SPACE</div>
              <h3>${clone.name} Sandbox #${cloneNum}</h3>
              <p>Isolated Gaming Profile with Virtualized Android ID</p>
            </div>

            <div class="game-stats-row">
              <div class="game-stat-item">
                <span class="game-stat-val">60</span>
                <span class="game-stat-lbl">FPS Turbo</span>
              </div>
              <div class="game-stat-item">
                <span class="game-stat-val">18ms</span>
                <span class="game-stat-lbl">Ping Low</span>
              </div>
              <div class="game-stat-item">
                <span class="game-stat-val">u10_g${cloneNum}</span>
                <span class="game-stat-lbl">Game UID</span>
              </div>
            </div>

            <button class="btn-launch-game-match" onclick="Toast.show('Launching ${clone.name} in 60 FPS Sandbox...', 'success');">
              🎮 Start Game in Dual Space #${cloneNum}
            </button>

            <div class="specs-card">
              <h4>🛡️ Game Sandbox Diagnostics</h4>
              <div class="spec-row"><span class="lbl">Anti-Cheat Mask:</span><span class="val text-success font-bold">Passed (Mock HWID)</span></div>
              <div class="spec-row"><span class="lbl">Virtual IMEI:</span><span class="val font-mono">862410948201${cloneNum}9</span></div>
            </div>
          </div>
        `;
      }

      // 6. Universal / Custom App UI
      return `
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div class="specs-card" style="text-align: center; padding: 24px;">
            <div style="font-size: 3rem; margin-bottom: 8px;">${clone.icon || '📱'}</div>
            <h3>${clone.name} Dual Space #${cloneNum}</h3>
            <p style="font-size: 0.8rem; color: #94A3B8; margin-top: 4px;">
              Running in an isolated Android 64-bit parallel sandbox container.
            </p>
          </div>

          <div class="specs-card">
            <h4>⚙️ Sandbox Environment Specs</h4>
            <div class="spec-row"><span class="lbl">App Name:</span><span class="val font-bold">${clone.name}</span></div>
            <div class="spec-row"><span class="lbl">Clone Number:</span><span class="val">#${cloneNum}</span></div>
            <div class="spec-row"><span class="lbl">Virtual UID:</span><span class="val font-mono">u10_a${150 + cloneNum}</span></div>
            <div class="spec-row"><span class="lbl">Virtual IMEI:</span><span class="val font-mono">863920194820${cloneNum}7</span></div>
            <div class="spec-row"><span class="lbl">Storage Directory:</span><span class="val font-mono">/data/user/10/com.${clone.appId}.clone_${cloneNum}/</span></div>
            <div class="spec-row"><span class="lbl">Data Isolation:</span><span class="val text-success font-bold">100% Encrypted Dual Space</span></div>
          </div>

          <div style="display: flex; gap: 10px;">
            <button class="btn-sm-danger" style="flex:1; padding: 12px;" onclick="Toast.show('Cleaned cache for this clone', 'success');">
              🧹 Clean App Cache
            </button>
            <button class="btn-sm-primary" style="flex:1; padding: 12px;" onclick="MultiAppUI.closeSandbox();">
              ← Exit to MultiApp
            </button>
          </div>
        </div>
      `;
    },

    bindSandboxInternalEvents(clone) {
      // Mic toggle for FRND
      const btnToggleMic = document.getElementById('btnToggleFrndMic');
      const userMicStatus = document.getElementById('userCloneMicStatus');
      if (btnToggleMic) {
        btnToggleMic.addEventListener('click', () => {
          MultiAppState.isMicActive = !MultiAppState.isMicActive;
          SoundFX.playClick();
          if (MultiAppState.isMicActive) {
            btnToggleMic.classList.add('active');
            btnToggleMic.textContent = '🎙️ Mute Mic';
            if (userMicStatus) {
              userMicStatus.textContent = '🔊 Talking...';
              userMicStatus.style.color = '#10B981';
            }
            Toast.show('Microphone Active • You are Live on Stage', 'info');
          } else {
            btnToggleMic.classList.remove('active');
            btnToggleMic.textContent = '🎙️ Unmute Mic';
            if (userMicStatus) {
              userMicStatus.textContent = '🔇 Muted';
              userMicStatus.style.color = '#94A3B8';
            }
          }
        });
      }

      // Gifts for FRND
      const btnSendRose = document.getElementById('btnSendRose');
      if (btnSendRose) btnSendRose.addEventListener('click', () => this.spawnFloatingGift('🌹'));

      const btnSendHeart = document.getElementById('btnSendHeart');
      if (btnSendHeart) btnSendHeart.addEventListener('click', () => this.spawnFloatingGift('💖'));

      const btnSendCrown = document.getElementById('btnSendCrown');
      if (btnSendCrown) btnSendCrown.addEventListener('click', () => this.spawnFloatingGift('👑'));

      // Send chat messages for WhatsApp / Telegram
      const btnSendChat = document.getElementById('btnSendSandboxChat');
      const chatInput = document.getElementById('sandboxChatInput');
      const messagesScroll = document.getElementById('chatMessagesScroll');
      if (btnSendChat && chatInput && messagesScroll) {
        const send = () => {
          const val = chatInput.value.trim();
          if (!val) return;
          SoundFX.playPop();
          chatInput.value = '';
          const bubble = document.createElement('div');
          bubble.className = 'chat-bubble outgoing';
          bubble.innerHTML = `${val}<span class="chat-time">Just now ✓✓</span>`;
          messagesScroll.appendChild(bubble);
          messagesScroll.scrollTop = messagesScroll.scrollHeight;
          Toast.show('Message sent from Dual Space account!', 'success');
        };
        btnSendChat.addEventListener('click', send);
        chatInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') send();
        });
      }
    },

    spawnFloatingGift(emoji) {
      SoundFX.playGift();
      const stage = document.getElementById('floatingGiftsStage');
      if (!stage) return;
      const el = document.createElement('div');
      el.className = 'floating-item';
      el.textContent = emoji;
      el.style.left = `${Math.floor(Math.random() * 70 + 15)}%`;
      stage.appendChild(el);
      setTimeout(() => el.remove(), 2000);
      Toast.show(`Sent ${emoji} Gift!`, 'success');
    },

    closeSandbox() {
      SoundFX.playClick();
      if (this.sandboxOverlay) {
        this.sandboxOverlay.classList.remove('active');
      }
    },

    openPhoneAppsModal() {
      SoundFX.playClick();
      this.closeMenu();
      if (this.phoneAppsModal) {
        this.phoneAppsModal.classList.add('active');
        const searchInput = document.getElementById('phoneAppsSearchInput');
        if (searchInput) searchInput.focus();
      }
    },

    closePhoneAppsModal() {
      SoundFX.playClick();
      if (this.phoneAppsModal) {
        this.phoneAppsModal.classList.remove('active');
      }
    },

    bindEvents() {
      // 1. Delegate clicks on clones container
      if (this.clonesContainer) {
        this.clonesContainer.addEventListener('click', (e) => {
          // Plus button on specific card -> clone THAT app again!
          const addBtn = e.target.closest('[data-action="duplicate"]');
          if (addBtn) {
            e.stopPropagation();
            const cloneId = addBtn.getAttribute('data-clone-id');
            MultiAppState.duplicateClone(cloneId);
            return;
          }

          // Delete button on specific card -> delete that clone!
          const delBtn = e.target.closest('[data-action="delete"]');
          if (delBtn) {
            e.stopPropagation();
            const cloneId = delBtn.getAttribute('data-clone-id');
            MultiAppState.deleteClone(cloneId);
            return;
          }

          // Card body -> launch that app in sandbox!
          const card = e.target.closest('.ma-clone-card');
          if (card) {
            const cloneId = card.getAttribute('data-clone-id');
            this.launchDynamicSandbox(cloneId);
          }
        });
      }

      // Empty state create button
      const btnCreateFirst = document.getElementById('btnCreateFirstClone');
      if (btnCreateFirst) {
        btnCreateFirst.addEventListener('click', () => this.openPhoneAppsModal());
      }

      // Floating Action Button (FAB) at bottom-right -> OPENS PHONE APPS SELECTOR
      const fab = document.getElementById('maFabAdd');
      if (fab) {
        fab.addEventListener('click', () => this.openPhoneAppsModal());
      }

      // Top Desktop Toolbar "Clone Any Phone App"
      const btnToolbarAddPhoneApp = document.getElementById('btnToolbarAddPhoneApp');
      if (btnToolbarAddPhoneApp) {
        btnToolbarAddPhoneApp.addEventListener('click', () => this.openPhoneAppsModal());
      }

      // Top Desktop Toolbar "Remove All"
      const btnToolbarRemoveAll = document.getElementById('btnToolbarRemoveAll');
      if (btnToolbarRemoveAll) {
        btnToolbarRemoveAll.addEventListener('click', () => {
          if (confirm('Are you sure you want to remove all clones?')) {
            MultiAppState.removeAllClones();
          }
        });
      }

      // Top Desktop Toolbar "Reset Demo"
      const btnReset = document.getElementById('btnResetData');
      if (btnReset) {
        btnReset.addEventListener('click', () => MultiAppState.resetToDemo());
      }

      // Top Desktop Toolbar Sound toggle
      const btnToggleSound = document.getElementById('btnToggleSound');
      if (btnToggleSound) {
        btnToggleSound.addEventListener('click', () => {
          MultiAppState.setSound(!MultiAppState.soundEnabled);
          Toast.show(`Sound Effects ${MultiAppState.soundEnabled ? 'Enabled' : 'Muted'}`, 'info');
        });
      }

      // Top Desktop Toolbar VIP toggle
      const btnDevVipToggle = document.getElementById('btnDevVipToggle');
      if (btnDevVipToggle) {
        btnDevVipToggle.addEventListener('click', () => {
          MultiAppState.setVip(!MultiAppState.isVip);
          Toast.show(`VIP Mode ${MultiAppState.isVip ? 'Activated 👑' : 'Deactivated'}`, 'info');
        });
      }

      // Top Desktop Toolbar Frame view toggle
      const btnToggleFrame = document.getElementById('btnToggleFrame');
      const frameLabel = document.getElementById('frameLabel');
      if (btnToggleFrame) {
        btnToggleFrame.addEventListener('click', () => {
          SoundFX.playClick();
          const isFull = this.phoneFrame.classList.toggle('fullscreen-view');
          if (frameLabel) frameLabel.textContent = isFull ? 'Full Screen' : 'Phone Mockup';
        });
      }

      // Header ⚙️ Settings
      const btnSettings = document.getElementById('btnMaSettings');
      if (btnSettings) {
        btnSettings.addEventListener('click', () => {
          SoundFX.playClick();
          this.closeMenu();
          if (this.settingsModal) this.settingsModal.classList.add('active');
        });
      }
      const btnCloseSettings = document.getElementById('btnCloseSettings');
      if (btnCloseSettings) {
        btnCloseSettings.addEventListener('click', () => {
          SoundFX.playClick();
          if (this.settingsModal) this.settingsModal.classList.remove('active');
        });
      }

      // Header ⋮ Menu dropdown toggle
      const btnMenu = document.getElementById('btnMaMenu');
      if (btnMenu) {
        btnMenu.addEventListener('click', (e) => {
          e.stopPropagation();
          SoundFX.playClick();
          if (this.menuDropdown) this.menuDropdown.classList.toggle('show');
        });
      }

      // Close menu on outer click
      document.addEventListener('click', () => this.closeMenu());

      // Menu actions
      const menuBtnClonePhoneApp = document.getElementById('menuBtnClonePhoneApp');
      if (menuBtnClonePhoneApp) {
        menuBtnClonePhoneApp.addEventListener('click', () => this.openPhoneAppsModal());
      }
      const menuBtnAddFrnd = document.getElementById('menuBtnAddFrndClone');
      if (menuBtnAddFrnd) {
        menuBtnAddFrnd.addEventListener('click', () => {
          this.closeMenu();
          const frndDef = PHONE_LIBRARY_APPS.find(a => a.id === 'frnd');
          if (frndDef) MultiAppState.cloneApp(frndDef);
        });
      }
      const menuBtnAddWA = document.getElementById('menuBtnAddWhatsApp');
      if (menuBtnAddWA) {
        menuBtnAddWA.addEventListener('click', () => {
          this.closeMenu();
          const waDef = PHONE_LIBRARY_APPS.find(a => a.id === 'whatsapp');
          if (waDef) MultiAppState.cloneApp(waDef);
        });
      }
      const menuBtnAddPhonePe = document.getElementById('menuBtnAddPhonePe');
      if (menuBtnAddPhonePe) {
        menuBtnAddPhonePe.addEventListener('click', () => {
          this.closeMenu();
          const peDef = PHONE_LIBRARY_APPS.find(a => a.id === 'phonepe');
          if (peDef) MultiAppState.cloneApp(peDef);
        });
      }
      const menuBtnRemoveAll = document.getElementById('menuBtnRemoveAllClones');
      if (menuBtnRemoveAll) {
        menuBtnRemoveAll.addEventListener('click', () => {
          this.closeMenu();
          if (confirm('Remove all clones from MultiApp?')) {
            MultiAppState.removeAllClones();
          }
        });
      }
      const menuBtnVip = document.getElementById('menuBtnVip');
      if (menuBtnVip) {
        menuBtnVip.addEventListener('click', () => {
          this.closeMenu();
          if (this.paymentModal) this.paymentModal.classList.add('active');
        });
      }
      const menuBtnStorage = document.getElementById('menuBtnStorage');
      if (menuBtnStorage) {
        menuBtnStorage.addEventListener('click', () => {
          this.closeMenu();
          if (this.storageModal) this.storageModal.classList.add('active');
        });
      }
      const menuBtnAbout = document.getElementById('menuBtnAbout');
      if (menuBtnAbout) {
        menuBtnAbout.addEventListener('click', () => {
          this.closeMenu();
          alert('MultiApp Dual Space v4.2\nUniversal Phone Apps Parallel Sandboxing\nClone and run multiple accounts of WhatsApp, PhonePe, FRND, Instagram, BGMI, and any phone app.');
        });
      }

      // Top Shelf Items
      const toolBuyVip = document.getElementById('toolBuyVip');
      if (toolBuyVip) {
        toolBuyVip.addEventListener('click', () => {
          SoundFX.playClick();
          if (this.paymentModal) this.paymentModal.classList.add('active');
        });
      }
      const toolFreeVip = document.getElementById('toolFreeVip');
      if (toolFreeVip) {
        toolFreeVip.addEventListener('click', () => {
          SoundFX.playClick();
          this.startFreeVipAdFlow();
        });
      }
      const toolPrivacySpace = document.getElementById('toolPrivacySpace');
      if (toolPrivacySpace) {
        toolPrivacySpace.addEventListener('click', () => {
          SoundFX.playClick();
          MultiAppState.enteredPin = '';
          this.updatePinDots();
          if (this.pinModal) this.pinModal.classList.add('active');
        });
      }
      const toolStorageManager = document.getElementById('toolStorageManager');
      if (toolStorageManager) {
        toolStorageManager.addEventListener('click', () => {
          SoundFX.playClick();
          if (this.storageModal) this.storageModal.classList.add('active');
        });
      }
      const toolTelegram = document.getElementById('toolTelegram');
      if (toolTelegram) {
        toolTelegram.addEventListener('click', () => {
          SoundFX.playClick();
          Toast.show('Connecting to MultiApp Official Telegram Channel...', 'info');
        });
      }
      const toolMaUltra = document.getElementById('toolMaUltra');
      if (toolMaUltra) {
        toolMaUltra.addEventListener('click', () => {
          MultiAppState.ultraMode = !MultiAppState.ultraMode;
          SoundFX.playSuccess();
          Toast.show(`MA Ultra Speed ${MultiAppState.ultraMode ? 'Engaged ⚡ (0-Lag Parallel Execution)' : 'Disabled'}`, 'info');
        });
      }

      // Phone Apps Library Modal Interactions
      const btnClosePhoneApps = document.getElementById('btnClosePhoneAppsModal');
      if (btnClosePhoneApps) {
        btnClosePhoneApps.addEventListener('click', () => this.closePhoneAppsModal());
      }

      // Filter pills inside Phone Apps Modal
      const filterPills = document.querySelectorAll('.app-filter-pill');
      filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
          SoundFX.playClick();
          filterPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          MultiAppState.currentFilter = pill.getAttribute('data-cat') || 'all';
          this.renderPhoneAppsGrid();
        });
      });

      // Search input inside Phone Apps Modal
      const searchInput = document.getElementById('phoneAppsSearchInput');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          MultiAppState.searchQuery = e.target.value.trim();
          this.renderPhoneAppsGrid();
        });
      }

      // Clicking any app card inside Phone Apps Modal -> CLONES IT!
      const phoneAppsGrid = document.getElementById('phoneAppsGrid');
      if (phoneAppsGrid) {
        phoneAppsGrid.addEventListener('click', (e) => {
          const card = e.target.closest('.phone-app-card');
          if (card) {
            const appId = card.getAttribute('data-app-id');
            const appDef = PHONE_LIBRARY_APPS.find(a => a.id === appId);
            if (appDef) {
              MultiAppState.cloneApp(appDef);
              this.closePhoneAppsModal();
              // Scroll down to newly created card
              const scrollBody = document.getElementById('maBodyScroll');
              if (scrollBody) scrollBody.scrollTop = scrollBody.scrollHeight;
            }
          }
        });
      }

      // Custom App / APK Clone button
      const btnAddCustom = document.getElementById('btnAddCustomApp');
      const customNameInput = document.getElementById('customAppNameInput');
      const customIconSelect = document.getElementById('customAppIconSelect');
      if (btnAddCustom && customNameInput) {
        btnAddCustom.addEventListener('click', () => {
          const name = customNameInput.value.trim();
          if (!name) {
            Toast.show('Please enter an app name', 'info');
            return;
          }
          const icon = customIconSelect ? customIconSelect.value : '📱';
          const customDef = {
            id: `custom_${Date.now()}`,
            name: name,
            icon: icon,
            colorClass: 'app-color-custom',
            type: 'universal',
            package: `com.custom.${name.toLowerCase().replace(/\s+/g, '_')}`
          };
          MultiAppState.cloneApp(customDef);
          customNameInput.value = '';
          this.closePhoneAppsModal();
          const scrollBody = document.getElementById('maBodyScroll');
          if (scrollBody) scrollBody.scrollTop = scrollBody.scrollHeight;
        });
      }

      // Sandbox topbar Back button
      const btnCloseSandbox = document.getElementById('btnCloseSandbox');
      if (btnCloseSandbox) {
        btnCloseSandbox.addEventListener('click', () => this.closeSandbox());
      }

      // Android Navigation bar keys
      const navBack = document.getElementById('navKeyBack');
      if (navBack) {
        navBack.addEventListener('click', () => {
          SoundFX.playClick();
          if (this.sandboxOverlay && this.sandboxOverlay.classList.contains('active')) {
            this.closeSandbox();
          } else if (this.phoneAppsModal && this.phoneAppsModal.classList.contains('active')) {
            this.closePhoneAppsModal();
          } else {
            Toast.show('MultiApp Home', 'info');
          }
        });
      }
      const navHome = document.getElementById('navKeyHome');
      if (navHome) {
        navHome.addEventListener('click', () => {
          SoundFX.playClick();
          if (this.sandboxOverlay && this.sandboxOverlay.classList.contains('active')) {
            this.closeSandbox();
          }
          if (this.phoneAppsModal && this.phoneAppsModal.classList.contains('active')) {
            this.closePhoneAppsModal();
          }
          const scrollBody = document.getElementById('maBodyScroll');
          if (scrollBody) scrollBody.scrollTop = 0;
        });
      }
      const navRecent = document.getElementById('navKeyRecent');
      if (navRecent) {
        navRecent.addEventListener('click', () => {
          SoundFX.playClick();
          Toast.show(`Running Dual Spaces: ${MultiAppState.clones.length} Apps Active`, 'info');
        });
      }

      // PIN Keypad
      const pinKeypad = document.getElementById('pinKeypad');
      if (pinKeypad) {
        pinKeypad.addEventListener('click', (e) => {
          const keyBtn = e.target.closest('.key-btn');
          if (!keyBtn) return;
          SoundFX.playClick();

          if (keyBtn.id === 'btnCancelPin') {
            if (this.pinModal) this.pinModal.classList.remove('active');
            MultiAppState.enteredPin = '';
            return;
          }

          if (keyBtn.id === 'btnDeletePin') {
            MultiAppState.enteredPin = MultiAppState.enteredPin.slice(0, -1);
            this.updatePinDots();
            return;
          }

          const digit = keyBtn.getAttribute('data-key');
          if (digit && MultiAppState.enteredPin.length < 4) {
            MultiAppState.enteredPin += digit;
            this.updatePinDots();

            if (MultiAppState.enteredPin.length === 4) {
              setTimeout(() => {
                SoundFX.playSuccess();
                if (this.pinModal) this.pinModal.classList.remove('active');
                Toast.show('Privacy Space Unlocked 🔓', 'success');
                MultiAppState.enteredPin = '';
              }, 250);
            }
          }
        });
      }

      // Payment modal checkout
      const btnClosePayment = document.getElementById('btnClosePayment');
      if (btnClosePayment) {
        btnClosePayment.addEventListener('click', () => {
          SoundFX.playClick();
          if (this.paymentModal) this.paymentModal.classList.remove('active');
        });
      }
      const planCards = document.querySelectorAll('.plan-card');
      planCards.forEach(card => {
        card.addEventListener('click', () => {
          SoundFX.playClick();
          planCards.forEach(c => {
            c.classList.remove('active');
            const radio = c.querySelector('.plan-radio');
            if (radio) radio.classList.remove('checked');
          });
          card.classList.add('active');
          const radio = card.querySelector('.plan-radio');
          if (radio) radio.classList.add('checked');
          const price = card.getAttribute('data-price');
          MultiAppState.selectedPlanPrice = price;
          const payAmountLabel = document.getElementById('btnPayAmount');
          if (payAmountLabel) payAmountLabel.textContent = `₹${price}`;
        });
      });
      const btnConfirmPayment = document.getElementById('btnConfirmPayment');
      if (btnConfirmPayment) {
        btnConfirmPayment.addEventListener('click', () => {
          SoundFX.playSuccess();
          MultiAppState.setVip(true);
          if (this.paymentModal) this.paymentModal.classList.remove('active');
          Toast.show('👑 VIP Pass Activated! Unlimited Clones for All Phone Apps', 'success');
        });
      }

      // Storage Clean Action
      const btnCleanStorage = document.getElementById('btnExecuteCleanStorage');
      if (btnCleanStorage) {
        btnCleanStorage.addEventListener('click', () => {
          SoundFX.playSuccess();
          const cacheMb = document.getElementById('storageCacheMb');
          if (cacheMb) cacheMb.textContent = '0 MB';
          const usagePct = document.getElementById('storageUsagePct');
          if (usagePct) usagePct.textContent = '4%';
          btnCleanStorage.disabled = true;
          btnCleanStorage.textContent = '✅ Sandbox Cache Cleaned!';
          Toast.show('Cleaned 146 MB junk cache from all Dual Space clones!', 'success');
          setTimeout(() => {
            if (this.storageModal) this.storageModal.classList.remove('active');
            btnCleanStorage.disabled = false;
            btnCleanStorage.textContent = '🧹 Clean Junk Cache & Free 146 MB';
          }, 1400);
        });
      }
      const btnCloseStorage = document.getElementById('btnCloseStorage');
      if (btnCloseStorage) {
        btnCloseStorage.addEventListener('click', () => {
          SoundFX.playClick();
          if (this.storageModal) this.storageModal.classList.remove('active');
        });
      }

      // Ad close button
      const btnCloseAd = document.getElementById('btnCloseAd');
      if (btnCloseAd) {
        btnCloseAd.addEventListener('click', () => {
          if (this.adOverlay) this.adOverlay.classList.remove('active');
        });
      }

      // Settings Remove All button
      const btnSettingsRemoveAll = document.getElementById('btnSettingsRemoveAll');
      if (btnSettingsRemoveAll) {
        btnSettingsRemoveAll.addEventListener('click', () => {
          if (confirm('Delete all active clones?')) {
            MultiAppState.removeAllClones();
            if (this.settingsModal) this.settingsModal.classList.remove('active');
          }
        });
      }
      // Settings Clean cache
      const btnClearCache = document.getElementById('btnClearCache');
      if (btnClearCache) {
        btnClearCache.addEventListener('click', () => {
          SoundFX.playSuccess();
          Toast.show('Cleared 128 MB cache from Dual Space', 'success');
        });
      }
      // Settings Sound toggle
      const toggleSound = document.getElementById('toggleSoundSettings');
      if (toggleSound) {
        toggleSound.checked = MultiAppState.soundEnabled;
        toggleSound.addEventListener('change', () => {
          MultiAppState.setSound(toggleSound.checked);
        });
      }
      // Settings Ultra Speed toggle
      const toggleUltra = document.getElementById('toggleUltraEngine');
      if (toggleUltra) {
        toggleUltra.checked = MultiAppState.ultraMode;
        toggleUltra.addEventListener('change', () => {
          MultiAppState.ultraMode = toggleUltra.checked;
          SoundFX.playSuccess();
          Toast.show(`Ultra Speed Mode ${toggleUltra.checked ? 'Active ⚡' : 'Disabled'}`, 'info');
        });
      }
    },

    closeMenu() {
      if (this.menuDropdown) this.menuDropdown.classList.remove('show');
    },

    updatePinDots() {
      const dots = document.querySelectorAll('.pin-dot');
      dots.forEach((dot, idx) => {
        if (idx < MultiAppState.enteredPin.length) {
          dot.classList.add('filled');
        } else {
          dot.classList.remove('filled');
        }
      });
    },

    startFreeVipAdFlow() {
      if (!this.adOverlay) return;
      this.adOverlay.classList.add('active');

      const countdownText = document.getElementById('adCountdownText');
      const closeBtn = document.getElementById('btnCloseAd');
      const claimBtn = document.getElementById('btnAdClaimReward');

      if (closeBtn) closeBtn.disabled = true;
      if (claimBtn) claimBtn.disabled = true;

      let remaining = 5;
      if (countdownText) countdownText.textContent = `Reward in ${remaining}s`;

      const timer = setInterval(() => {
        remaining--;
        if (countdownText) countdownText.textContent = remaining > 0 ? `Reward in ${remaining}s` : 'Reward Ready!';

        if (remaining <= 0) {
          clearInterval(timer);
          if (closeBtn) closeBtn.disabled = false;
          if (claimBtn) {
            claimBtn.disabled = false;
            claimBtn.onclick = () => {
              SoundFX.playSuccess();
              MultiAppState.setVip(true);
              this.adOverlay.classList.remove('active');
              Toast.show('🎉 24 Hours Free VIP Activated!', 'success');
            };
          }
        }
      }, 1000);
    }
  };

  // ==========================================
  // 6. INITIALIZATION
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    SoundFX.init();
    MultiAppState.init();
    MultiAppUI.init();
  });

  document.addEventListener('click', () => SoundFX.resume(), { once: true });

})();
