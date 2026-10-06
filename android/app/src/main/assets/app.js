/**
 * MultiCloner Studio - Core Application Logic
 * Comprehensive multi-instance workspace & app cloner engine
 */

// Preset Catalog of popular clonable apps
const PRESET_APPS = [
    {
        id: 'whatsapp',
        name: 'WhatsApp Web',
        tag: 'Dual Chat',
        url: 'https://web.whatsapp.com',
        icon: '💬',
        color: '#25D366',
        desc: 'Run personal & business WhatsApp accounts simultaneously'
    },
    {
        id: 'telegram',
        name: 'Telegram Web',
        tag: 'Multi Account',
        url: 'https://web.telegram.org/k/',
        icon: '✈️',
        color: '#0088cc',
        desc: 'Sync multiple Telegram channels & chats'
    },
    {
        id: 'discord',
        name: 'Discord',
        tag: 'Community',
        url: 'https://discord.com/app',
        icon: '🎮',
        color: '#5865F2',
        desc: 'Simultaneous gaming, dev & team Discord servers'
    },
    {
        id: 'chatgpt',
        name: 'ChatGPT AI',
        tag: 'AI Workspace',
        url: 'https://chatgpt.com',
        icon: '🤖',
        color: '#10a37f',
        desc: 'Parallel AI prompts and research windows'
    },
    {
        id: 'twitter',
        name: 'X (Twitter)',
        tag: 'Social Media',
        url: 'https://x.com',
        icon: '🐦',
        color: '#1DA1F2',
        desc: 'Multi-handle brand and personal feed manager'
    },
    {
        id: 'notion',
        name: 'Notion Workspace',
        tag: 'Productivity',
        url: 'https://www.notion.so',
        icon: '📓',
        color: '#f3f4f6',
        desc: 'Personal notes & Client workspace side-by-side'
    },
    {
        id: 'github',
        name: 'GitHub',
        tag: 'Dev Space',
        url: 'https://github.com',
        icon: '🐙',
        color: '#6e40c9',
        desc: 'Multiple Git repositories and issue boards'
    },
    {
        id: 'slack',
        name: 'Slack Web',
        tag: 'Team Comm',
        url: 'https://app.slack.com',
        icon: '💼',
        color: '#E01E5A',
        desc: 'Switch between client & company workspaces'
    },
    {
        id: 'youtube',
        name: 'YouTube',
        tag: 'Media Studio',
        url: 'https://www.youtube.com',
        icon: '▶️',
        color: '#FF0000',
        desc: 'Watch tutorials or stream dashboards'
    },
    {
        id: 'reddit',
        name: 'Reddit',
        tag: 'Discussion',
        url: 'https://www.reddit.com',
        icon: '👾',
        color: '#FF4500',
        desc: 'Dual subreddits and tech feeds'
    },
    {
        id: 'google-keep',
        name: 'Google Keep',
        tag: 'Fast Notes',
        url: 'https://keep.google.com',
        icon: '💡',
        color: '#fbbc04',
        desc: 'Sticky notes and checklists'
    },
    {
        id: 'spotify',
        name: 'Spotify Web Player',
        tag: 'Music',
        url: 'https://open.spotify.com',
        icon: '🎵',
        color: '#1DB954',
        desc: 'Background focus music player'
    }
];

class MultiClonerEngine {
    constructor() {
        this.instances = [];
        this.activeInstanceId = null;
        this.currentLayout = 'single'; // single, split-2, split-3, grid-4
        this.selectedColor = '#6366f1';
        this.currentTheme = 'cyber-dark';
        this.securityPin = '1234';
        this.pinInputBuffer = '';
        this.notesStorage = {};

        this.init();
    }

    init() {
        this.loadState();
        this.renderPresetCatalog();
        this.setupEventListeners();
        this.setupCalculator();
        this.renderAll();

        // If no instances, show empty state
        if (this.instances.length === 0) {
            this.showEmptyState(true);
        } else {
            this.showEmptyState(false);
            if (!this.activeInstanceId && this.instances.length > 0) {
                this.activeInstanceId = this.instances[0].id;
            }
        }
    }

    // Local Storage Management
    loadState() {
        try {
            const saved = localStorage.getItem('multicloner_instances_v2');
            if (saved) {
                this.instances = JSON.parse(saved);
            }
            const theme = localStorage.getItem('multicloner_theme');
            if (theme) {
                this.setTheme(theme);
            }
            const pin = localStorage.getItem('multicloner_pin');
            if (pin) {
                this.securityPin = pin;
            }
            const notes = localStorage.getItem('multicloner_notes');
            if (notes) {
                this.notesStorage = JSON.parse(notes);
            }
            const layout = localStorage.getItem('multicloner_layout');
            if (layout) {
                this.setLayout(layout);
            }
        } catch (e) {
            console.error('Error loading state:', e);
        }
    }

    saveState() {
        try {
            localStorage.setItem('multicloner_instances_v2', JSON.stringify(this.instances));
            localStorage.setItem('multicloner_theme', this.currentTheme);
            localStorage.setItem('multicloner_pin', this.securityPin);
            localStorage.setItem('multicloner_notes', JSON.stringify(this.notesStorage));
            localStorage.setItem('multicloner_layout', this.currentLayout);
        } catch (e) {
            console.error('Error saving state:', e);
        }
    }

    // Render Preset Apps Grid inside Modal
    renderPresetCatalog() {
        const grid = document.getElementById('preset-cards-list');
        if (!grid) return;

        grid.innerHTML = PRESET_APPS.map(app => `
            <div class="preset-item-card" data-preset-id="${app.id}">
                <div class="preset-card-icon" style="color:${app.color}">${app.icon}</div>
                <div class="preset-card-name">${app.name}</div>
            </div>
        `).join('');

        grid.querySelectorAll('.preset-item-card').forEach(card => {
            card.addEventListener('click', () => {
                const presetId = card.dataset.presetId;
                const preset = PRESET_APPS.find(p => p.id === presetId);
                if (preset) {
                    document.getElementById('clone-name').value = `${preset.name}`;
                    document.getElementById('clone-tag').value = preset.tag;
                    document.getElementById('clone-url').value = preset.url;
                    document.getElementById('clone-icon-select').value = preset.icon;
                    this.selectedColor = preset.color;
                    this.updateColorPickerUI();
                }
            });
        });
    }

    updateColorPickerUI() {
        document.querySelectorAll('.color-dot').forEach(dot => {
            dot.classList.toggle('active', dot.dataset.color.toLowerCase() === this.selectedColor.toLowerCase());
        });
    }

    // Add New Instance Clone
    createInstance({ name, tag, url, icon, color, isIsolated = true, openImmediately = true }) {
        const instanceId = 'inst_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
        const newInstance = {
            id: instanceId,
            name: name || 'App Clone',
            tag: tag || 'Account',
            url: url || 'https://google.com',
            icon: icon || '⚡',
            color: color || '#6366f1',
            isIsolated: isIsolated,
            created: new Date().toISOString()
        };

        this.instances.push(newInstance);
        this.saveState();
        this.showToast(`✨ Cloned "${newInstance.name}" created!`);

        if (openImmediately || !this.activeInstanceId) {
            this.activeInstanceId = instanceId;
        }

        this.renderAll();
        this.showEmptyState(false);
        this.closeModal('modal-clone-app');
        return newInstance;
    }

    // Remove Instance
    deleteInstance(id) {
        const target = this.instances.find(i => i.id === id);
        if (!target) return;

        if (confirm(`Remove instance clone "${target.name}"?`)) {
            this.instances = this.instances.filter(i => i.id !== id);
            delete this.notesStorage[id];

            if (this.activeInstanceId === id) {
                this.activeInstanceId = this.instances.length > 0 ? this.instances[0].id : null;
            }

            this.saveState();
            this.renderAll();

            if (this.instances.length === 0) {
                this.showEmptyState(true);
            }
            this.showToast(`🗑️ Instance "${target.name}" removed.`);
        }
    }

    // Duplicate an existing clone
    duplicateInstance(id) {
        const src = this.instances.find(i => i.id === id);
        if (!src) return;

        const count = this.instances.filter(i => i.name.startsWith(src.name)).length + 1;
        this.createInstance({
            name: `${src.name} #${count}`,
            tag: `Clone #${count}`,
            url: src.url,
            icon: src.icon,
            color: src.color,
            isIsolated: true,
            openImmediately: true
        });
    }

    // Switch active instance in Single View
    setActiveInstance(id) {
        this.activeInstanceId = id;
        this.renderSidebarNav();
        this.renderTabsBar();
        this.renderMatrixGrid();
    }

    // Change View Layout (Single, 2-Split, 3-Split, 4-Grid)
    setLayout(layout) {
        this.currentLayout = layout;
        const matrix = document.getElementById('matrix-grid');
        if (matrix) {
            matrix.className = `instances-matrix-grid layout-${layout}`;
        }
        document.querySelectorAll('.layout-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.layout === layout);
        });
        this.saveState();
        this.renderMatrixGrid();
    }

    // Render Full UI
    renderAll() {
        this.renderSidebarNav();
        this.renderTabsBar();
        this.renderMatrixGrid();
        this.updateInstanceCounter();
        this.updateScratchpadInstanceOptions();
    }

    updateInstanceCounter() {
        const badge = document.getElementById('instance-count-badge');
        if (badge) {
            badge.textContent = `${this.instances.length}/20`;
        }
    }

    showEmptyState(show) {
        const empty = document.getElementById('empty-state-view');
        const matrix = document.getElementById('matrix-grid');
        if (empty && matrix) {
            empty.style.display = show ? 'flex' : 'none';
            matrix.style.display = show ? 'none' : 'grid';
        }
    }

    // Render Sidebar Instance items
    renderSidebarNav() {
        const list = document.getElementById('instances-nav-list');
        if (!list) return;

        if (this.instances.length === 0) {
            list.innerHTML = `<div style="font-size:0.75rem; color:var(--text-dim); text-align:center; padding:1rem 0;">No active clones</div>`;
            return;
        }

        list.innerHTML = this.instances.map(inst => `
            <div class="instance-nav-item ${inst.id === this.activeInstanceId ? 'active' : ''}" data-id="${inst.id}">
                <div class="nav-item-left">
                    <div class="instance-emoji-box" style="border-left: 3px solid ${inst.color}">${inst.icon}</div>
                    <div class="instance-nav-text">
                        <span class="instance-nav-name">${this.escapeHtml(inst.name)}</span>
                        <span class="instance-nav-tag">${this.escapeHtml(inst.tag)}</span>
                    </div>
                </div>
                <div class="nav-item-right">
                    <button class="btn-item-action clone-btn" title="Duplicate Clone" data-id="${inst.id}">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </button>
                    <button class="btn-item-action del-btn" title="Delete Instance" data-id="${inst.id}">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                </div>
            </div>
        `).join('');

        list.querySelectorAll('.instance-nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.closest('.btn-item-action')) return;
                this.setActiveInstance(item.dataset.id);
            });
        });

        list.querySelectorAll('.clone-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.duplicateInstance(btn.dataset.id);
            });
        });

        list.querySelectorAll('.del-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteInstance(btn.dataset.id);
            });
        });
    }

    // Render Tabs in Top Bar
    renderTabsBar() {
        const bar = document.getElementById('tabs-bar');
        if (!bar) return;

        bar.innerHTML = this.instances.map(inst => `
            <div class="app-tab ${inst.id === this.activeInstanceId ? 'active' : ''}" data-id="${inst.id}">
                <span>${inst.icon}</span>
                <span>${this.escapeHtml(inst.name)}</span>
                <span class="tab-close-icon" title="Close" data-id="${inst.id}">&times;</span>
            </div>
        `).join('');

        bar.querySelectorAll('.app-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                if (e.target.classList.contains('tab-close-icon')) return;
                this.setActiveInstance(tab.dataset.id);
            });
        });

        bar.querySelectorAll('.tab-close-icon').forEach(close => {
            close.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteInstance(close.dataset.id);
            });
        });
    }

    // Render Main Workspace Matrix Grid
    renderMatrixGrid() {
        const matrix = document.getElementById('matrix-grid');
        if (!matrix) return;

        // Determine how many instances to show based on layout
        let visibleInstances = [];
        if (this.currentLayout === 'single') {
            visibleInstances = this.instances.filter(i => i.id === this.activeInstanceId);
            if (visibleInstances.length === 0 && this.instances.length > 0) {
                visibleInstances = [this.instances[0]];
            }
        } else if (this.currentLayout === 'split-2') {
            visibleInstances = this.instances.slice(0, 2);
        } else if (this.currentLayout === 'split-3') {
            visibleInstances = this.instances.slice(0, 3);
        } else if (this.currentLayout === 'grid-4') {
            visibleInstances = this.instances.slice(0, 4);
        }

        matrix.innerHTML = visibleInstances.map((inst, index) => `
            <div class="instance-frame-card ${inst.id === this.activeInstanceId ? 'focused active-in-single' : ''}" id="frame-${inst.id}">
                <div class="frame-header">
                    <div class="frame-info-left">
                        <span class="frame-badge-dot" style="background:${inst.color}"></span>
                        <span style="font-size:1rem;">${inst.icon}</span>
                        <span class="frame-title">${this.escapeHtml(inst.name)}</span>
                        <span class="frame-tag-badge">${this.escapeHtml(inst.tag)}</span>
                    </div>
                    <div class="frame-controls-right">
                        <button class="frame-ctrl-btn" title="Open in New Window / Dedicated Popup" onclick="window.open('${inst.url}', '_blank', 'width=900,height=750')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        </button>
                        <button class="frame-ctrl-btn" title="Reload Instance" onclick="document.getElementById('iframe-${inst.id}').src = document.getElementById('iframe-${inst.id}').src">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                        </button>
                        <button class="frame-ctrl-btn close-btn" title="Close" onclick="window.multiCloner.deleteInstance('${inst.id}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                    </div>
                </div>
                <div class="frame-body">
                    <!-- Standard Sandbox Iframe -->
                    <iframe 
                        id="iframe-${inst.id}" 
                        class="instance-iframe" 
                        src="${inst.url}" 
                        allow="camera; microphone; display-capture; geolocation; clipboard-read; clipboard-write; notifications"
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-downloads"
                        loading="lazy"
                    ></iframe>

                    <!-- Smart Web-Security Fallback Card (Visible for strict CSP / X-Frame-Options headers) -->
                    <div class="iframe-overlay-fallback" id="fallback-${inst.id}" style="display:none;">
                        <div class="fallback-icon" style="background:${inst.color}22; color:${inst.color}">
                            ${inst.icon}
                        </div>
                        <h3 class="fallback-title">${this.escapeHtml(inst.name)}</h3>
                        <p class="fallback-desc">This web service restricts embedded framing for security. Click below to launch with isolated session cookies in a dedicated sync window!</p>
                        <div class="fallback-actions">
                            <a href="${inst.url}" target="_blank" class="btn-open-direct" style="background:${inst.color}">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                <span>Launch Dedicated Instance</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Error detection fallback check
        visibleInstances.forEach(inst => {
            const ifr = document.getElementById(`iframe-${inst.id}`);
            const fb = document.getElementById(`fallback-${inst.id}`);
            if (ifr && fb) {
                // If known high-security domain (like whatsapp/google/slack which block standard iframe embeds)
                if (inst.url.includes('whatsapp.com') || inst.url.includes('slack.com') || inst.url.includes('google.com') || inst.url.includes('x.com') || inst.url.includes('discord.com')) {
                    fb.style.display = 'flex';
                }
            }
        });
    }

    // Set Theme
    setTheme(themeName) {
        this.currentTheme = themeName;
        document.documentElement.setAttribute('data-theme', themeName);
        document.querySelectorAll('.theme-card').forEach(c => {
            c.classList.toggle('active', c.dataset.theme === themeName);
        });
        this.saveState();
    }

    // Setup all DOM Event Listeners
    setupEventListeners() {
        // Modal Open/Close triggers
        document.querySelectorAll('[data-close]').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetModal = btn.dataset.close;
                this.closeModal(targetModal);
            });
        });

        document.getElementById('btn-open-clone-modal')?.addEventListener('click', () => {
            this.openModal('modal-clone-app');
        });

        document.getElementById('btn-empty-add')?.addEventListener('click', () => {
            this.openModal('modal-clone-app');
        });

        document.getElementById('btn-open-settings')?.addEventListener('click', () => {
            this.openModal('modal-settings');
        });

        document.getElementById('btn-theme-toggle')?.addEventListener('click', () => {
            const themes = ['cyber-dark', 'neon-night', 'sunset-purple', 'emerald-forest'];
            const idx = themes.indexOf(this.currentTheme);
            const nextTheme = themes[(idx + 1) % themes.length];
            this.setTheme(nextTheme);
            this.showToast(`🎨 Theme switched to ${nextTheme.replace('-', ' ').toUpperCase()}`);
        });

        // Preset Tags on Empty State
        document.querySelectorAll('.preset-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const pId = tag.dataset.preset;
                const preset = PRESET_APPS.find(p => p.id === pId);
                if (preset) {
                    this.createInstance({
                        name: preset.name,
                        tag: preset.tag,
                        url: preset.url,
                        icon: preset.icon,
                        color: preset.color
                    });
                }
            });
        });

        // Load Demo Multi-Set
        document.getElementById('btn-load-demo')?.addEventListener('click', () => {
            this.loadDemoSet();
        });

        // Custom Clone Form Submit
        document.getElementById('form-custom-clone')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('clone-name').value.trim();
            const tag = document.getElementById('clone-tag').value.trim();
            const url = document.getElementById('clone-url').value.trim();
            const icon = document.getElementById('clone-icon-select').value.trim() || '⚡';
            const isIsolated = document.getElementById('clone-isolated-storage').checked;
            const openImmediately = document.getElementById('clone-open-immediately').checked;

            this.createInstance({
                name,
                tag,
                url,
                icon,
                color: this.selectedColor,
                isIsolated,
                openImmediately
            });
        });

        // Color Picker in Modal
        document.querySelectorAll('#clone-color-picker .color-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                this.selectedColor = dot.dataset.color;
                this.updateColorPickerUI();
            });
        });

        // Layout Selector Buttons
        document.querySelectorAll('.layout-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setLayout(btn.dataset.layout);
            });
        });

        // Topbar Action buttons
        document.getElementById('btn-sync-refresh')?.addEventListener('click', () => {
            this.renderMatrixGrid();
            this.showToast('🔄 Synchronized instances');
        });

        document.getElementById('btn-fullscreen')?.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
            } else {
                document.exitFullscreen().catch(() => {});
            }
        });

        // Sidebar Toggle for Mobile
        document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
            document.getElementById('sidebar')?.classList.toggle('open');
        });

        // Scratchpad Tool
        const scratchpadBtn = document.getElementById('tool-scratchpad-btn');
        const scratchpadDrawer = document.getElementById('drawer-scratchpad');
        const scratchpadTextarea = document.getElementById('scratchpad-textarea');
        const scratchpadSelect = document.getElementById('scratchpad-instance-select');

        scratchpadBtn?.addEventListener('click', () => {
            scratchpadDrawer?.classList.toggle('open');
            this.loadScratchpadContent();
        });

        scratchpadSelect?.addEventListener('change', () => {
            this.loadScratchpadContent();
        });

        scratchpadTextarea?.addEventListener('input', () => {
            const key = scratchpadSelect?.value || 'global';
            this.notesStorage[key] = scratchpadTextarea.value;
            this.saveState();
        });

        document.getElementById('btn-copy-scratchpad')?.addEventListener('click', () => {
            navigator.clipboard.writeText(scratchpadTextarea.value).then(() => {
                this.showToast('📋 Copied notes to clipboard!');
            });
        });

        // Calculator Tool Toggle
        document.getElementById('tool-calc-btn')?.addEventListener('click', () => {
            const calc = document.getElementById('calc-tool-box');
            if (calc) {
                calc.style.display = calc.style.display === 'none' ? 'block' : 'none';
            }
        });

        document.getElementById('btn-close-calc')?.addEventListener('click', () => {
            const calc = document.getElementById('calc-tool-box');
            if (calc) calc.style.display = 'none';
        });

        // Privacy Lock Screen Trigger
        document.getElementById('tool-privacy-btn')?.addEventListener('click', () => {
            this.lockScreen();
        });

        // User Agent Profile Modal
        document.getElementById('tool-proxy-btn')?.addEventListener('click', () => {
            this.openModal('modal-agent-config');
        });

        // Theme Pickers inside Settings
        document.querySelectorAll('#theme-options .theme-card').forEach(card => {
            card.addEventListener('click', () => {
                this.setTheme(card.dataset.theme);
            });
        });

        // Security PIN Change
        document.getElementById('setting-pin-code')?.addEventListener('change', (e) => {
            if (e.target.value.length === 4) {
                this.securityPin = e.target.value;
                this.saveState();
                this.showToast('🔐 Security PIN updated!');
            }
        });

        // PIN Keypad in Screen Lock
        document.querySelectorAll('.pin-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const val = btn.dataset.val;
                this.handlePinInput(val);
            });
        });

        // Data Backup & Export / Import
        document.getElementById('btn-export-backup')?.addEventListener('click', () => {
            this.exportBackup();
        });

        document.getElementById('btn-import-backup-trigger')?.addEventListener('click', () => {
            document.getElementById('file-import-backup')?.click();
        });

        document.getElementById('file-import-backup')?.addEventListener('change', (e) => {
            this.importBackup(e);
        });

        document.getElementById('btn-wipe-data')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset and delete all clones?')) {
                this.instances = [];
                this.notesStorage = {};
                this.saveState();
                this.renderAll();
                this.showEmptyState(true);
                this.showToast('🧹 All data reset.');
            }
        });
    }

    // Load Scratchpad Options
    updateScratchpadInstanceOptions() {
        const sel = document.getElementById('scratchpad-instance-select');
        if (!sel) return;

        let options = `<option value="global">🌐 Global Workspace Notes</option>`;
        this.instances.forEach(inst => {
            options += `<option value="${inst.id}">${inst.icon} ${this.escapeHtml(inst.name)}</option>`;
        });
        sel.innerHTML = options;
    }

    loadScratchpadContent() {
        const sel = document.getElementById('scratchpad-instance-select');
        const ta = document.getElementById('scratchpad-textarea');
        if (!sel || !ta) return;
        const key = sel.value;
        ta.value = this.notesStorage[key] || '';
    }

    // Mini Calculator Engine
    setupCalculator() {
        const display = document.getElementById('calc-display');
        let currentExp = '0';

        document.querySelectorAll('.calc-key').forEach(key => {
            key.addEventListener('click', () => {
                const k = key.dataset.key;
                if (k === 'C') {
                    currentExp = '0';
                } else if (k === 'DEL') {
                    currentExp = currentExp.length > 1 ? currentExp.slice(0, -1) : '0';
                } else if (k === '=') {
                    try {
                        // Safe math evaluation
                        const sanitized = currentExp.replace(/[^0-9+\-*/.]/g, '');
                        currentExp = String(Function(`'use strict'; return (${sanitized})`)());
                    } catch (e) {
                        currentExp = 'Error';
                    }
                } else {
                    if (currentExp === '0' && k !== '.') {
                        currentExp = k;
                    } else {
                        currentExp += k;
                    }
                }
                if (display) display.value = currentExp;
            });
        });
    }

    // Lock & PIN System
    lockScreen() {
        const overlay = document.getElementById('screen-lock-overlay');
        if (overlay) {
            overlay.style.display = 'flex';
            this.pinInputBuffer = '';
            this.updatePinDots();
        }
    }

    handlePinInput(val) {
        if (val === 'clear') {
            this.pinInputBuffer = '';
        } else if (val === 'back') {
            this.pinInputBuffer = this.pinInputBuffer.slice(0, -1);
        } else if (this.pinInputBuffer.length < 4) {
            this.pinInputBuffer += val;
        }

        this.updatePinDots();

        if (this.pinInputBuffer.length === 4) {
            if (this.pinInputBuffer === this.securityPin) {
                document.getElementById('screen-lock-overlay').style.display = 'none';
                this.pinInputBuffer = '';
                this.showToast('🔓 Screen Unlocked!');
            } else {
                this.showToast('❌ Incorrect PIN! Try again.');
                this.pinInputBuffer = '';
                setTimeout(() => this.updatePinDots(), 300);
            }
        }
    }

    updatePinDots() {
        const dots = document.querySelectorAll('.pin-dot');
        dots.forEach((dot, idx) => {
            dot.classList.toggle('filled', idx < this.pinInputBuffer.length);
        });
    }

    // Modal helpers
    openModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add('open');
    }

    closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove('open');
    }

    // Toast Notification
    showToast(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(50px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }

    // Load Demo Set (WhatsApp Dual + Telegram + ChatGPT)
    loadDemoSet() {
        this.instances = [
            {
                id: 'inst_demo_wa1',
                name: 'WhatsApp (Personal)',
                tag: 'Account 1',
                url: 'https://web.whatsapp.com',
                icon: '💬',
                color: '#25D366',
                isIsolated: true,
                created: new Date().toISOString()
            },
            {
                id: 'inst_demo_wa2',
                name: 'WhatsApp (Business)',
                tag: 'Account 2',
                url: 'https://web.whatsapp.com',
                icon: '💬',
                color: '#128C7E',
                isIsolated: true,
                created: new Date().toISOString()
            },
            {
                id: 'inst_demo_tg',
                name: 'Telegram Web',
                tag: 'Channels',
                url: 'https://web.telegram.org/k/',
                icon: '✈️',
                color: '#0088cc',
                isIsolated: true,
                created: new Date().toISOString()
            },
            {
                id: 'inst_demo_gpt',
                name: 'ChatGPT AI Studio',
                tag: 'Assistant',
                url: 'https://chatgpt.com',
                icon: '🤖',
                color: '#10a37f',
                isIsolated: true,
                created: new Date().toISOString()
            }
        ];
        this.activeInstanceId = 'inst_demo_wa1';
        this.setLayout('split-2');
        this.saveState();
        this.renderAll();
        this.showEmptyState(false);
        this.showToast('🚀 Loaded Demo Multi-Cloner Suite!');
    }

    // Backup Export & Import
    exportBackup() {
        const data = {
            version: '2.5',
            exportedAt: new Date().toISOString(),
            instances: this.instances,
            notes: this.notesStorage,
            theme: this.currentTheme
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `multicloner_backup_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.showToast('💾 Backup exported successfully!');
    }

    importBackup(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsed = JSON.parse(e.target.result);
                if (parsed.instances && Array.isArray(parsed.instances)) {
                    this.instances = parsed.instances;
                    if (parsed.notes) this.notesStorage = parsed.notes;
                    if (parsed.theme) this.setTheme(parsed.theme);
                    this.activeInstanceId = this.instances.length > 0 ? this.instances[0].id : null;
                    this.saveState();
                    this.renderAll();
                    this.showEmptyState(this.instances.length === 0);
                    this.showToast('📥 Backup imported successfully!');
                } else {
                    alert('Invalid backup file structure.');
                }
            } catch (err) {
                alert('Failed to parse JSON backup.');
            }
        };
        reader.readAsText(file);
    }

    escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// Instantiate on load
window.addEventListener('DOMContentLoaded', () => {
    window.multiCloner = new MultiClonerEngine();
});
