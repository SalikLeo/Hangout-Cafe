// Modern Tailwind-style SVG Icons
const ICONS = {
    view: `<svg class="action-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
    edit: `<svg class="action-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`,
    check: `<svg class="action-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    print: `<svg class="action-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>`,
    delete: `<svg class="action-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`,
    cross: `<svg class="action-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    star: `<svg class="action-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    starFilled: `<svg class="action-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    payout: `<svg class="action-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg>`,
    list: `<svg class="action-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><line x1="9" y1="12" x2="15" y2="12"></line><line x1="9" y1="16" x2="13" y2="16"></line></svg>`,
    clock: `<svg class="action-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`
};

// Data Storage using localStorage (must be defined before password functions)
const Storage = {
    get: (key) => {
        const data = localStorage.getItem(key);
        if (data === null) {
            // Return appropriate default based on key
            if (key === 'menuItemOrder') {
                return {};
            }
            if (key === 'loginPassword' || key === 'adminPassword') {
                return null;
            }
            return [];
        }
        // Handle passwords as plain strings
        if (key === 'loginPassword' || key === 'adminPassword') {
            // Try to parse as JSON first (in case it was stored as JSON), otherwise return as-is
            try {
                const parsed = JSON.parse(data);
                return typeof parsed === 'string' ? parsed : data;
            } catch (e) {
                return data;
            }
        }
        return JSON.parse(data);
    },
    set: (key, value) => {
        // Handle passwords as plain strings
        if (key === 'loginPassword' || key === 'adminPassword') {
            localStorage.setItem(key, value);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
};

// Password management functions
function getLoginPassword() {
    return Storage.get('loginPassword') ?? '';
}

function getAdminPassword() {
    return Storage.get('adminPassword') ?? '';
}

// Authentication check: Only redirect to login if login password is set and user is not authenticated
const currentLoginPasswordOnLoad = getLoginPassword();
if (currentLoginPasswordOnLoad !== '' && sessionStorage.getItem('authenticated') !== 'true') {
    window.location.replace('login.html');
} else {
    sessionStorage.setItem('authenticated', 'true');
}

// Clear unlocked tabs on every page load/refresh
// This ensures staff password is required again after any refresh
sessionStorage.removeItem('unlockedTabs');

// Helper to ensure callback runs whether DOM is still loading or already ready
function onDOMReady(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

// Initialize when DOM is loaded
onDOMReady(() => {
    // Populate Year Dropdown
    const yearSelect = document.getElementById('reportAnnualYear');
    if (yearSelect) {
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= 2020; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            if (i === currentYear) option.selected = true;
            yearSelect.appendChild(option);
        }
    }
});

// Staff password & lockable tabs configuration
const APP_LOCKABLE_TABS = [
    { key: 'pos', name: 'POS / New Order' },
    { key: 'holdOrders', name: 'Hold Orders' },
    { key: 'sales', name: 'Sales' },
    { key: 'menu', name: 'Menu' },
    { key: 'employees', name: 'Employees' },
    { key: 'expenses', name: 'Expenses' },
    { key: 'stock', name: 'Stock' },
    { key: 'tables', name: 'Tables' },
    { key: 'reports', name: 'Reports' },
    { key: 'dashboard', name: 'Dashboard' },
    { key: 'settings', name: 'Settings' }
];

const ALLOWED_TABS_WITHOUT_STAFF_PASSWORD = ['pos', 'holdOrders'];

function isTabLocked(tab) {
    const adminPass = getAdminPassword();
    const loginPass = getLoginPassword();
    const hasPassword = (adminPass !== '' || loginPass !== '');
    if (!hasPassword) return false;

    let lockedTabs = Storage.get('locked_tabs');
    if (!Array.isArray(lockedTabs)) {
        lockedTabs = ['sales', 'menu', 'employees', 'expenses', 'stock', 'tables', 'reports', 'dashboard', 'settings'];
    }
    return lockedTabs.includes(tab);
}

// ==========================================
// CAFE SETTINGS & BACKUP/RESTORE MANAGEMENT
// ==========================================
function getCafeSettings() {
    const defaults = {
        restaurantName: 'Hangout Lounge & Co.',
        phone: '0300-9509536',
        address: 'Wah Cantt',
        website: 'www.hangoutlounge.com',
        returnPolicy: 'Thank you for visiting Hangout Lounge & Co.!',
        logo: 'assets/logo.jpg'
    };
    try {
        const saved = Storage.get('cafeSettings');
        if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
            return {
                ...defaults,
                ...saved,
                // Locked store details
                restaurantName: 'Hangout Lounge & Co.',
                phone: '0300-9509536',
                address: 'Wah Cantt'
            };
        }
    } catch (e) {
        console.error('Error reading cafe settings:', e);
    }
    return defaults;
}

function saveCafeSettingsToStorage(settings) {
    const sanitized = {
        ...settings,
        restaurantName: 'Hangout Lounge & Co.',
        phone: '0300-9509536',
        address: 'Wah Cantt'
    };
    Storage.set('cafeSettings', sanitized);
    return sanitized;
}

function loadCafeSettings() {
    const s = getCafeSettings();
    
    const nameEl = document.getElementById('setRestaurantName');
    const phoneEl = document.getElementById('setRestaurantPhone');
    const webEl = document.getElementById('setRestaurantWebsite');
    const addrEl = document.getElementById('setRestaurantAddress');
    const policyEl = document.getElementById('setRestaurantReturnPolicy');
    const logoPathInput = document.getElementById('settingLogoPath');
    const logoPreview = document.getElementById('settingLogoPreview');
    const logoPlaceholder = document.getElementById('settingLogoPlaceholder');

    if (nameEl) nameEl.value = s.restaurantName || 'Hangout Lounge & Co.';
    if (phoneEl) phoneEl.value = s.phone || '0300-9509536';
    if (webEl) webEl.value = s.website || '';
    if (addrEl) addrEl.value = s.address || 'Wah Cantt';
    if (policyEl) policyEl.value = s.returnPolicy || '';
    if (logoPathInput) logoPathInput.value = s.logo || '';

    if (logoPreview && logoPlaceholder) {
        if (s.logo) {
            logoPreview.src = s.logo;
            logoPreview.style.display = 'block';
            logoPlaceholder.style.display = 'none';
        } else {
            logoPreview.src = '';
            logoPreview.style.display = 'none';
            logoPlaceholder.style.display = 'flex';
        }
    }

    // Password fields
    const currentPass = getAdminPassword() || getLoginPassword() || '';
    const passInput = document.getElementById('setStaffPassword');
    const confirmInput = document.getElementById('setStaffPasswordConfirm');
    const removeBtn = document.getElementById('btnRemoveStaffPassword');

    if (passInput) passInput.value = currentPass;
    if (confirmInput) confirmInput.value = currentPass;
    if (removeBtn) {
        removeBtn.style.display = currentPass ? 'inline-flex' : 'none';
    }

    renderLockedTabsDropdown();
}

function renderLockedTabsDropdown() {
    const menu = document.getElementById('lockedTabsDropdownMenu');
    const summaryText = document.getElementById('lockedTabsSummaryText');
    if (!menu || !summaryText) return;

    let lockedTabs = Storage.get('locked_tabs');
    if (!Array.isArray(lockedTabs)) {
        lockedTabs = ['sales', 'menu', 'employees', 'expenses', 'stock', 'tables', 'reports', 'dashboard', 'settings'];
    }

    menu.innerHTML = APP_LOCKABLE_TABS.map(tab => {
        const isChecked = lockedTabs.includes(tab.key);
        return `
            <label class="locked-tab-checkbox-item">
                <span>${tab.name}</span>
                <input type="checkbox" value="${tab.key}" ${isChecked ? 'checked' : ''} onchange="handleLockedTabChange(this)">
            </label>
        `;
    }).join('');

    updateLockedTabsSummaryText(lockedTabs);
}

function updateLockedTabsSummaryText(lockedTabs) {
    const summaryText = document.getElementById('lockedTabsSummaryText');
    if (!summaryText) return;
    if (!lockedTabs || lockedTabs.length === 0) {
        summaryText.textContent = 'No Tabs Locked';
    } else if (lockedTabs.length === APP_LOCKABLE_TABS.length) {
        summaryText.textContent = 'All Tabs Locked';
    } else {
        summaryText.textContent = `${lockedTabs.length} Tab(s) Locked`;
    }
}

function handleLockedTabChange(checkbox) {
    let lockedTabs = Storage.get('locked_tabs');
    if (!Array.isArray(lockedTabs)) {
        lockedTabs = ['sales', 'menu', 'employees', 'expenses', 'stock', 'tables', 'reports', 'dashboard', 'settings'];
    }
    const val = checkbox.value;
    if (checkbox.checked) {
        if (!lockedTabs.includes(val)) lockedTabs.push(val);
    } else {
        lockedTabs = lockedTabs.filter(k => k !== val);
    }
    Storage.set('locked_tabs', lockedTabs);
    updateLockedTabsSummaryText(lockedTabs);
}

function toggleLockedTabsMenu(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const menu = document.getElementById('lockedTabsDropdownMenu');
    if (menu) {
        menu.classList.toggle('show');
    }
}

// Close locked tabs dropdown on outside click
document.addEventListener('click', (e) => {
    const menu = document.getElementById('lockedTabsDropdownMenu');
    const btn = document.getElementById('lockedTabsDropdownBtn');
    if (menu && menu.classList.contains('show')) {
        if (!menu.contains(e.target) && (!btn || !btn.contains(e.target))) {
            menu.classList.remove('show');
        }
    }
});

async function chooseLogoFile() {
    try {
        let selectedPath = null;
        let base64Data = null;

        if (window.require) {
            try {
                const { ipcRenderer } = window.require('electron');
                const res = await ipcRenderer.invoke('select-logo-file');
                if (res) {
                    selectedPath = res.filePath;
                    base64Data = res.base64;
                }
            } catch (e) {
                console.warn('IPC select-logo-file error:', e);
            }
        }

        if (!selectedPath && !base64Data) {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        applySelectedLogo(event.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
            return;
        }

        applySelectedLogo(base64Data || selectedPath);
    } catch (err) {
        console.error('Error choosing logo:', err);
        showCustomAlert('Failed to select logo: ' + err.message, 'Logo Error');
    }
}

function applySelectedLogo(logoData) {
    if (!logoData) return;
    const s = getCafeSettings();
    s.logo = logoData;
    saveCafeSettingsToStorage(s);

    const logoPathInput = document.getElementById('settingLogoPath');
    const logoPreview = document.getElementById('settingLogoPreview');
    const logoPlaceholder = document.getElementById('settingLogoPlaceholder');
    const sidebarLogo = document.getElementById('logoImage');

    if (logoPathInput) logoPathInput.value = logoData;
    if (logoPreview) {
        logoPreview.src = logoData;
        logoPreview.style.display = 'block';
    }
    if (logoPlaceholder) logoPlaceholder.style.display = 'none';
    if (sidebarLogo) sidebarLogo.src = logoData;

    if (window.require) {
        try {
            const { ipcRenderer } = window.require('electron');
            ipcRenderer.invoke('sync-app-logo-data', logoData);
        } catch (e) {}
    }

    showCustomAlert('Logo updated successfully and synced with the application icon.', 'Logo Updated');
}

function removeLogoFile() {
    showCustomConfirm('Are you sure you want to remove the custom logo and revert to default?', () => {
        const s = getCafeSettings();
        s.logo = 'assets/logo.jpg';
        saveCafeSettingsToStorage(s);

        const logoPathInput = document.getElementById('settingLogoPath');
        const logoPreview = document.getElementById('settingLogoPreview');
        const sidebarLogo = document.getElementById('logoImage');

        if (logoPathInput) logoPathInput.value = 'assets/logo.jpg';
        if (logoPreview) {
            logoPreview.src = 'assets/logo.jpg';
            logoPreview.style.display = 'block';
        }
        if (sidebarLogo) sidebarLogo.src = 'assets/logo.jpg';

        if (window.require) {
            try {
                const { ipcRenderer } = window.require('electron');
                ipcRenderer.invoke('sync-app-logo-data', 'assets/logo.jpg');
            } catch (e) {}
        }
        showCustomAlert('Logo reset to default.', 'Logo Reset');
    });
}

function saveCafeSettings() {
    const webEl = document.getElementById('setRestaurantWebsite');
    const policyEl = document.getElementById('setRestaurantReturnPolicy');
    const logoPathInput = document.getElementById('settingLogoPath');
    const passInput = document.getElementById('setStaffPassword');
    const confirmInput = document.getElementById('setStaffPasswordConfirm');

    const newPass = passInput ? passInput.value.trim() : '';
    const newPassConfirm = confirmInput ? confirmInput.value.trim() : '';

    if (newPass !== newPassConfirm) {
        showCustomAlert('Security passwords do not match! Please check and try again.', 'Validation Error');
        return;
    }

    // Save passwords
    if (newPass) {
        Storage.set('adminPassword', newPass);
        Storage.set('loginPassword', newPass);
    } else {
        Storage.set('adminPassword', '');
        Storage.set('loginPassword', '');
    }

    const prev = getCafeSettings();
    const updated = {
        ...prev,
        website: webEl ? webEl.value.trim() : prev.website,
        returnPolicy: policyEl ? policyEl.value.trim() : prev.returnPolicy,
        logo: logoPathInput ? logoPathInput.value.trim() : prev.logo
    };
    saveCafeSettingsToStorage(updated);

    loadCafeSettings();
    showCustomAlert('Settings and profile saved successfully!', 'Settings Saved');
}

function removeStaffSecurityPassword() {
    showCustomConfirm('Are you sure you want to remove the security password and disable tab lock protection?', () => {
        Storage.set('adminPassword', '');
        Storage.set('loginPassword', '');
        Storage.set('locked_tabs', []);
        sessionStorage.removeItem('unlockedTabs');
        loadCafeSettings();
        showCustomAlert('Security password removed. Tab protection disabled.', 'Password Removed');
    });
}

// Backup & Restore Data Functions
async function handleAppBackup() {
    try {
        const backupData = {
            appName: 'Hangout Lounge & Co.',
            version: '1.0.0',
            exportedAt: new Date().toISOString(),
            storage: {}
        };

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                backupData.storage[key] = localStorage.getItem(key);
            }
        }

        if (window.require) {
            try {
                const { ipcRenderer } = window.require('electron');
                const res = await ipcRenderer.invoke('backup-data-file', backupData);
                if (res && res.success) {
                    showCustomAlert(`Backup created successfully!\n\nSaved at:\n${res.filePath}`, 'Backup Successful');
                    return;
                } else if (res && res.error && res.error !== 'Cancelled') {
                    showCustomAlert('Backup failed: ' + res.error, 'Backup Error');
                    return;
                } else if (res && res.error === 'Cancelled') {
                    return;
                }
            } catch (ipcErr) {
                console.warn('IPC backup-data-file error:', ipcErr);
            }
        }

        // Browser fallback download
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
        const downloadAnchor = document.createElement('a');
        const now = new Date();
        const dateStr = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `HangoutCafe-Backup-${dateStr}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        showCustomAlert('Backup file downloaded successfully!', 'Backup Successful');

    } catch (err) {
        console.error('Backup error:', err);
        showCustomAlert('Failed to generate backup: ' + err.message, 'Backup Error');
    }
}

async function handleAppRestore() {
    showCustomConfirm(
        'Restoring a backup will overwrite ALL current data (orders, sales, stock, expenses, menu, settings) and reload the app.\n\nAre you sure you want to proceed?',
        async () => {
            try {
                if (window.require) {
                    try {
                        const { ipcRenderer } = window.require('electron');
                        const res = await ipcRenderer.invoke('restore-data-file');
                        if (res && res.success && res.data) {
                            applyRestoredData(res.data);
                            return;
                        } else if (res && res.error && res.error !== 'Cancelled') {
                            showCustomAlert('Failed to read backup file: ' + res.error, 'Restore Error');
                            return;
                        } else if (res && res.error === 'Cancelled') {
                            return;
                        }
                    } catch (ipcErr) {
                        console.warn('IPC restore-data-file error:', ipcErr);
                    }
                }

                // Browser file picker fallback
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = '.json,.bak';
                fileInput.onchange = (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        try {
                            const parsed = JSON.parse(event.target.result);
                            applyRestoredData(parsed);
                        } catch (err) {
                            showCustomAlert('Invalid backup file format: ' + err.message, 'Restore Error');
                        }
                    };
                    reader.readAsText(file);
                };
                fileInput.click();

            } catch (err) {
                console.error('Restore error:', err);
                showCustomAlert('Failed to restore data: ' + err.message, 'Restore Error');
            }
        },
        null,
        {
            title: 'Restore Database',
            confirmText: 'Select Backup File',
            type: 'warning'
        }
    );
}

function applyRestoredData(backupObj) {
    if (!backupObj || typeof backupObj !== 'object') {
        showCustomAlert('Invalid backup data structure.', 'Restore Failed');
        return;
    }

    const storageData = backupObj.storage || backupObj;
    if (typeof storageData !== 'object') {
        showCustomAlert('Invalid backup data payload.', 'Restore Failed');
        return;
    }

    // Clear current localStorage
    localStorage.clear();

    // Rehydrate
    for (const [key, val] of Object.entries(storageData)) {
        if (key && val !== null && val !== undefined) {
            localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
        }
    }

    // Sync restored logo if available
    try {
        const s = getCafeSettings();
        if (s && s.logo && window.require) {
            const { ipcRenderer } = window.require('electron');
            ipcRenderer.invoke('sync-app-logo-data', s.logo);
        }
    } catch (e) {}

    showCustomAlert('Data restored successfully! The application will now reload.', 'Restore Complete', () => {
        window.location.reload();
    });
}

function handleAppClearData() {
    showCustomConfirm(
        'WARNING: This will permanently delete all transaction history, sales, orders, hold orders, expenses, and custom stock.\n\nThis action CANNOT be undone. Are you absolutely sure?',
        () => {
            const preservedExpiry = localStorage.getItem('appExpiryConfig');
            const preservedLogin = localStorage.getItem('loginPassword');
            const preservedAdmin = localStorage.getItem('adminPassword');
            const preservedSettings = localStorage.getItem('cafeSettings');

            localStorage.clear();

            if (preservedExpiry) localStorage.setItem('appExpiryConfig', preservedExpiry);
            if (preservedLogin) localStorage.setItem('loginPassword', preservedLogin);
            if (preservedAdmin) localStorage.setItem('adminPassword', preservedAdmin);
            if (preservedSettings) localStorage.setItem('cafeSettings', preservedSettings);

            showCustomAlert('All application transaction data has been cleared.', 'Data Cleared', () => {
                window.location.reload();
            });
        },
        null,
        {
            title: 'Clear All App Data',
            confirmText: 'Yes, Clear All Data',
            type: 'danger'
        }
    );
}

let pendingTabSwitch = null;

// Global delete confirmation state
let pendingDeleteAction = null;
let pendingDeleteButton = null;
let originalButtonHTML = null;

// Global unbook confirmation state
let pendingUnbookAction = null;
let pendingUnbookCard = null;
let unbookConfirmationContainer = null;

// ==========================================
// CUSTOM APP MESSAGE BOX & CONFIRM MODALS
// ==========================================
window.showCustomAlert = function(msg, title = 'Hangout Lounge & Co.', callback = null) {
    const modal = document.getElementById('customMessageBoxModal');
    const titleEl = document.getElementById('customMsgBoxTitle');
    const msgEl = document.getElementById('customMsgBoxMessage');
    const actionsEl = document.getElementById('customMsgBoxActions');
    const iconContainer = document.getElementById('customMsgBoxIconContainer');
    const iconEl = document.getElementById('customMsgBoxIcon');

    if (!modal || !msgEl || !actionsEl) {
        if (typeof callback === 'function') callback();
        return;
    }

    let messageText = String(msg || '');
    if (typeof t === 'function') messageText = t(messageText);

    if (titleEl) titleEl.textContent = title;
    msgEl.textContent = messageText;

    // Detect type for icon & style
    let type = 'info';
    let icon = 'ℹ️';
    if (/error|fail|cannot|invalid|wrong|not found|exceed|warning|⚠️|caution/i.test(messageText)) {
        type = 'danger';
        icon = '⚠️';
    } else if (/success|completed|saved|cleared|reset/i.test(messageText)) {
        type = 'success';
        icon = '✅';
    } else if (/please|select|enter/i.test(messageText)) {
        type = 'warning';
        icon = '🔔';
    }

    if (iconContainer) {
        iconContainer.className = 'custom-msgbox-icon type-' + type;
    }
    if (iconEl) {
        iconEl.textContent = icon;
    }

    actionsEl.innerHTML = `
        <button type="button" id="customMsgBoxOkBtn" class="custom-msgbox-btn custom-msgbox-btn-primary">OK</button>
    `;

    modal.style.display = 'flex';
    requestAnimationFrame(() => {
        modal.classList.add('show');
        const okBtn = document.getElementById('customMsgBoxOkBtn');
        if (okBtn) okBtn.focus();
    });

    const keyHandler = (e) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
            e.preventDefault();
            closeHandler();
        }
    };

    const closeHandler = () => {
        document.removeEventListener('keydown', keyHandler);
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            if (typeof callback === 'function') callback();
        }, 160);
    };

    document.addEventListener('keydown', keyHandler);
    const okBtn = document.getElementById('customMsgBoxOkBtn');
    if (okBtn) {
        okBtn.onclick = closeHandler;
    }
};

window.showCustomConfirm = function(msg, onConfirm, onCancel = null, options = {}) {
    const modal = document.getElementById('customMessageBoxModal');
    const titleEl = document.getElementById('customMsgBoxTitle');
    const msgEl = document.getElementById('customMsgBoxMessage');
    const actionsEl = document.getElementById('customMsgBoxActions');
    const iconContainer = document.getElementById('customMsgBoxIconContainer');
    const iconEl = document.getElementById('customMsgBoxIcon');

    if (!modal || !msgEl || !actionsEl) {
        if (typeof onConfirm === 'function') onConfirm();
        return;
    }

    let messageText = String(msg || '');
    if (typeof t === 'function') messageText = t(messageText);

    const title = options.title || 'Confirmation';
    const confirmText = options.confirmText || 'Confirm';
    const cancelText = options.cancelText || 'Cancel';
    const type = options.type || (confirmText.toLowerCase().includes('delete') || confirmText.toLowerCase().includes('clear') || confirmText.toLowerCase().includes('reset') ? 'danger' : 'warning');
    const icon = options.icon || (type === 'danger' ? '🗑️' : '❓');

    if (titleEl) titleEl.textContent = title;
    msgEl.textContent = messageText;

    if (iconContainer) {
        iconContainer.className = 'custom-msgbox-icon type-' + type;
    }
    if (iconEl) {
        iconEl.textContent = icon;
    }

    const confirmBtnClass = type === 'danger' ? 'custom-msgbox-btn-danger' : 'custom-msgbox-btn-primary';

    actionsEl.innerHTML = `
        <button type="button" id="customMsgBoxCancelBtn" class="custom-msgbox-btn custom-msgbox-btn-cancel">${cancelText}</button>
        <button type="button" id="customMsgBoxConfirmBtn" class="custom-msgbox-btn ${confirmBtnClass}">${confirmText}</button>
    `;

    modal.style.display = 'flex';
    requestAnimationFrame(() => {
        modal.classList.add('show');
        const confirmBtn = document.getElementById('customMsgBoxConfirmBtn');
        if (confirmBtn) confirmBtn.focus();
    });

    const finish = (isConfirmed) => {
        document.removeEventListener('keydown', keyHandler);
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            if (isConfirmed && typeof onConfirm === 'function') {
                onConfirm();
            } else if (!isConfirmed && typeof onCancel === 'function') {
                onCancel();
            }
        }, 160);
    };

    const keyHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            finish(true);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            finish(false);
        }
    };

    document.addEventListener('keydown', keyHandler);

    const cancelBtn = document.getElementById('customMsgBoxCancelBtn');
    const confirmBtn = document.getElementById('customMsgBoxConfirmBtn');

    if (cancelBtn) cancelBtn.onclick = () => finish(false);
    if (confirmBtn) confirmBtn.onclick = () => finish(true);
};

// Global overrides for native browser dialogs to always use the app-designed modal box
window.alert = function(msg) {
    if (typeof showCustomAlert === 'function') {
        showCustomAlert(msg);
    }
};

window.confirm = function(msg) {
    if (typeof showCustomConfirm === 'function') {
        showCustomConfirm(msg, () => {});
    }
    return true;
};

window.prompt = function(msg, defaultVal) {
    if (typeof showCustomAlert === 'function') {
        showCustomAlert(msg || 'Action Required');
    }
    return defaultVal || '';
};

// Generic delete confirmation with tick/cross buttons
window.showDeleteConfirmation = (buttonElement, deleteFunction, ...args) => {
    // Cancel any existing pending delete
    if (pendingDeleteButton && pendingDeleteButton !== buttonElement) {
        cancelDeleteConfirmation();
    }

    pendingDeleteAction = () => deleteFunction(...args);

    // Store original button HTML
    originalButtonHTML = buttonElement.outerHTML;

    // Replace button with tick/cross buttons (inline, smaller size)
    const container = document.createElement('span');
    container.style.cssText = 'display: inline-flex; gap: 4px; align-items: center; vertical-align: middle;';
    container.innerHTML = `
        <button type="button" onclick="confirmDelete()" class="btn-action btn-action-save" style="width: 28px; height: 28px; min-width: 28px;" title="Confirm Delete">${ICONS.check}</button>
        <button type="button" onclick="cancelDeleteConfirmation()" class="btn-action btn-action-delete" style="width: 28px; height: 28px; min-width: 28px;" title="Cancel">${ICONS.cross}</button>
    `;

    buttonElement.replaceWith(container);
    pendingDeleteButton = container;
};

window.confirmDelete = () => {
    if (pendingDeleteAction) {
        pendingDeleteAction();
        cancelDeleteConfirmation();
    }
};

window.cancelDeleteConfirmation = () => {
    if (pendingDeleteButton && originalButtonHTML) {
        const container = pendingDeleteButton;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = originalButtonHTML;
        const restoredButton = tempDiv.firstElementChild;
        container.replaceWith(restoredButton);
    }

    pendingDeleteAction = null;
    pendingDeleteButton = null;
    originalButtonHTML = null;
};

// Staff password modal functions
window.openStaffPasswordModal = (tab) => {
    if (getAdminPassword() === '' && getLoginPassword() === '') {
        switchToTab(tab);
        // Ensure the nav button is also updated
        const navButton = document.querySelector(`.nav-item[data-tab="${tab}"]`);
        if (navButton) {
            document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
            navButton.classList.add('active');
        }
        return;
    }
    pendingTabSwitch = tab;
    const modal = document.getElementById('staffPasswordModal');
    if (modal) {
        modal.style.display = 'flex';
        document.getElementById('staffPasswordInput').value = '';
        document.getElementById('staffPasswordError').style.display = 'none';
        setTimeout(() => {
            document.getElementById('staffPasswordInput').focus();
        }, 100);
    }
};

window.closeStaffPasswordModal = () => {
    const modal = document.getElementById('staffPasswordModal');
    if (modal) {
        modal.style.display = 'none';
        pendingTabSwitch = null;
        document.getElementById('staffPasswordInput').value = '';
        document.getElementById('staffPasswordError').style.display = 'none';
    }
};

window.handleStaffPassword = (event) => {
    event.preventDefault();
    const passwordInput = document.getElementById('staffPasswordInput');
    const errorMessage = document.getElementById('staffPasswordError');
    const enteredPassword = passwordInput.value.trim();

    const adminPass = getAdminPassword();
    const loginPass = getLoginPassword();
    const isCorrect = (adminPass !== '' && enteredPassword === adminPass) || 
                      (loginPass !== '' && enteredPassword === loginPass);

    if (isCorrect) {
        // Track the unlocked tab
        if (pendingTabSwitch) {
            const unlockedTabs = JSON.parse(sessionStorage.getItem('unlockedTabs') || '[]');
            if (!unlockedTabs.includes(pendingTabSwitch)) {
                unlockedTabs.push(pendingTabSwitch);
                sessionStorage.setItem('unlockedTabs', JSON.stringify(unlockedTabs));
            }
        }

        // Get the tab to switch to before closing modal
        const tabToSwitch = pendingTabSwitch;
        closeStaffPasswordModal();

        // Switch to the pending tab after a small delay to ensure modal is closed
        if (tabToSwitch) {
            setTimeout(() => {
                switchToTab(tabToSwitch);
                // Ensure the nav button is also updated
                const navButton = document.querySelector(`.nav-item[data-tab="${tabToSwitch}"]`);
                if (navButton) {
                    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
                    navButton.classList.add('active');
                }
            }, 150);
        }
    } else {
        errorMessage.style.display = 'block';
        passwordInput.value = '';
        passwordInput.focus();
    }
};

// Generic password modal for delete/edit actions
let pendingActionCallback = null;
let pendingActionPasswordType = 'admin';

window.openActionPasswordModal = (callback, passwordType = 'admin') => {
    const requiredPassword = passwordType === 'login' ? getLoginPassword() : getAdminPassword();
    if (requiredPassword === '') {
        if (callback) callback();
        return;
    }
    pendingActionCallback = callback;
    pendingActionPasswordType = passwordType;
    const modal = document.getElementById('actionPasswordModal');
    if (modal) {
        modal.style.display = 'flex';
        
        // Update modal title and text based on type
        const headerText = modal.querySelector('.modal-header h3');
        const bodyText = modal.querySelector('.modal-body p');
        if (headerText) headerText.textContent = passwordType === 'login' ? 'Login Password Required' : 'Admin Access Required';
        if (bodyText) bodyText.textContent = passwordType === 'login' ? 'This section requires login password to access.' : 'This section requires admin password to access.';
        const passwordInput = document.getElementById('actionPasswordInput');
        if (passwordInput) {
            passwordInput.value = '';
            passwordInput.focus();
        }
        const errorMessage = document.getElementById('actionPasswordError');
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
    }
};

window.closeActionPasswordModal = (clearCallback = true) => {
    const modal = document.getElementById('actionPasswordModal');
    if (modal) {
        modal.style.display = 'none';
        const passwordInput = document.getElementById('actionPasswordInput');
        if (passwordInput) {
            passwordInput.value = '';
        }
        const errorMessage = document.getElementById('actionPasswordError');
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
    }
    // Only clear callback if explicitly requested (not when password is correct)
    if (clearCallback) {
        pendingActionCallback = null;
    }
};

window.handleActionPassword = (event) => {
    event.preventDefault();
    const passwordInput = document.getElementById('actionPasswordInput');
    const errorMessage = document.getElementById('actionPasswordError');
    const enteredPassword = passwordInput.value.trim();

    const requiredPassword = pendingActionPasswordType === 'login' ? getLoginPassword() : getAdminPassword();

    if (enteredPassword === requiredPassword) {
        // Store the callback before closing modal
        const callback = pendingActionCallback;

        // Close modal without clearing callback
        closeActionPasswordModal(false);

        // Execute the pending action after a small delay
        if (callback) {
            setTimeout(() => {
                callback();
                pendingActionCallback = null;
            }, 150);
        }
    } else {
        if (errorMessage) {
            errorMessage.style.display = 'block';
        }
        if (passwordInput) {
            passwordInput.value = '';
            passwordInput.focus();
        }
    }
};

// ==========================================
// SUPERADMIN & APP EXPIRY LOCK TIMER
// ==========================================
const SUPERADMIN_PASSWORDS = ['Salikleo.1212', 'salikleo.1212', 'Salik@786', 'salik786', 'Salik@SuperAdmin786', 'admin@salik786'];
let isSuperadminTimerUnlocked = false;

// Initialize or update default 7-day timer if not already set or updated
(function initDefault7DayTimer() {
    try {
        const existing = Storage.get('appExpiryConfig');
        if (!existing || !existing.expiresAt) {
            const duration = 7;
            const unit = 'days';
            const expiresAt = Date.now() + (7 * 24 * 60 * 60 * 1000);
            Storage.set('appExpiryConfig', {
                enabled: true,
                expiresAt: expiresAt,
                duration: duration,
                unit: unit,
                setAt: Date.now()
            });
        }
    } catch(e) {}
})();

function verifySuperadminPassword(entered) {
    if (!entered) return false;
    return SUPERADMIN_PASSWORDS.includes(entered.trim());
}

window.unlockTimerSettings = () => {
    const input = document.getElementById('superadminAuthInput');
    const err = document.getElementById('superadminAuthError');
    const entered = input ? input.value.trim() : '';

    if (verifySuperadminPassword(entered)) {
        isSuperadminTimerUnlocked = true;
        if (err) err.style.display = 'none';
        if (input) input.value = '';
        renderTimerControls();
    } else {
        if (err) {
            err.textContent = 'Incorrect Superadmin Password.';
            err.style.display = 'block';
        }
    }
};

window.saveExpiryTimer = () => {
    const durationInput = document.getElementById('expiryDurationInput');
    const unitSelect = document.getElementById('expiryUnitSelect');
    const duration = parseFloat(durationInput?.value) || 0;
    const unit = unitSelect?.value || 'days';

    if (duration <= 0) {
        showCustomAlert('Please enter a valid duration greater than 0.');
        return;
    }

    let ms = 0;
    if (unit === 'minutes') ms = duration * 60 * 1000;
    else if (unit === 'hours') ms = duration * 60 * 60 * 1000;
    else if (unit === 'days') ms = duration * 24 * 60 * 60 * 1000;

    const expiresAt = Date.now() + ms;
    const config = {
        enabled: true,
        expiresAt: expiresAt,
        duration: duration,
        unit: unit,
        setAt: Date.now()
    };

    Storage.set('appExpiryConfig', config);
    showCustomAlert(`App lock timer set for ${duration} ${unit}. The application will automatically lock on ${new Date(expiresAt).toLocaleString()}.`);
    renderTimerControls();
    checkAppExpiry();
};

window.disableExpiryTimer = () => {
    Storage.set('appExpiryConfig', { enabled: false });
    showCustomAlert('App lock timer has been disabled.');
    renderTimerControls();
};

function renderTimerControls() {
    const config = Storage.get('appExpiryConfig');
    const badge = document.getElementById('expiryTimerStatusBadge');
    const promptDiv = document.getElementById('superadminAuthPrompt');
    const controlsDiv = document.getElementById('superadminTimerControls');
    const detailsDiv = document.getElementById('expiryTimerDetails');
    const durationInput = document.getElementById('expiryDurationInput');
    const unitSelect = document.getElementById('expiryUnitSelect');

    if (!config || !config.enabled || !config.expiresAt) {
        if (badge) {
            badge.textContent = 'Disabled';
            badge.style.background = '#e2e8f0';
            badge.style.color = '#64748b';
        }
        if (detailsDiv) detailsDiv.innerHTML = 'Timer is currently inactive. The application will not automatically lock.';
    } else {
        const remainingMs = config.expiresAt - Date.now();
        const expiryDateStr = new Date(config.expiresAt).toLocaleString();

        if (remainingMs <= 0) {
            if (badge) {
                badge.textContent = 'EXPIRED';
                badge.style.background = '#fee2e2';
                badge.style.color = '#dc2626';
            }
            if (detailsDiv) detailsDiv.innerHTML = `⚠️ <b style="color: #dc2626;">App is currently EXPIRED</b> since ${expiryDateStr}.`;
        } else {
            const remHours = Math.floor(remainingMs / (1000 * 60 * 60));
            const remMins = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
            const remDays = Math.floor(remHours / 24);
            let timeStr = '';
            if (remDays > 0) timeStr = `${remDays}d ${remHours % 24}h remaining`;
            else if (remHours > 0) timeStr = `${remHours}h ${remMins}m remaining`;
            else timeStr = `${remMins}m remaining`;

            if (badge) {
                badge.textContent = `Active (${timeStr})`;
                badge.style.background = '#dcfce7';
                badge.style.color = '#15803d';
            }
            if (detailsDiv) detailsDiv.innerHTML = `⏱️ <b>Expires on:</b> ${expiryDateStr} (${timeStr}).`;
        }

        if (durationInput && config.duration) durationInput.value = config.duration;
        if (unitSelect && config.unit) unitSelect.value = config.unit;
    }

    if (isSuperadminTimerUnlocked) {
        if (promptDiv) promptDiv.style.display = 'none';
        if (controlsDiv) controlsDiv.style.display = 'flex';
    } else {
        if (promptDiv) promptDiv.style.display = 'flex';
        if (controlsDiv) controlsDiv.style.display = 'none';
    }
}

function checkAppExpiry() {
    const config = Storage.get('appExpiryConfig');
    const overlay = document.getElementById('appLockOverlay');
    if (!overlay) return;

    if (config && config.enabled && config.expiresAt) {
        if (Date.now() >= config.expiresAt) {
            overlay.style.display = 'flex';
        } else {
            overlay.style.display = 'none';
        }
    } else {
        overlay.style.display = 'none';
    }
}

window.unlockAppFromOverlay = () => {
    const input = document.getElementById('lockSuperadminPassword');
    const err = document.getElementById('lockErrorMsg');
    const entered = input ? input.value.trim() : '';

    if (verifySuperadminPassword(entered)) {
        if (err) err.style.display = 'none';
        if (input) input.value = '';

        // Disable expired timer so developer can work freely
        Storage.set('appExpiryConfig', { enabled: false });
        const overlay = document.getElementById('appLockOverlay');
        if (overlay) overlay.style.display = 'none';
        showCustomAlert('Application successfully unlocked! The timer has been reset/disabled.', 'Hangout Lounge & Co.');
        renderTimerControls();
    } else {
        if (err) {
            err.textContent = 'Incorrect Superadmin Password. Access Denied.';
            err.style.display = 'block';
        }
    }
};

window.closeAppFromOverlay = () => {
    try {
        window.__allowClose = true;
        window.close();
    } catch (e) {
        window.close();
    }
};

// Start periodic expiry checking
setInterval(checkAppExpiry, 10000);
onDOMReady(() => {
    checkAppExpiry();
});

// Advanced Settings Modal Functions
window.openAdvancedSettingsModal = () => {
    const modal = document.getElementById('advancedSettingsModal');
    if (modal) {
        modal.style.display = 'flex';
        // Reset form
        document.getElementById('advancedSettingsForm').reset();
        document.getElementById('advancedSettingsError').style.display = 'none';
        document.getElementById('advancedSettingsSuccess').style.display = 'none';
        renderTimerControls();
    }
};

window.closeAdvancedSettingsModal = () => {
    const modal = document.getElementById('advancedSettingsModal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('advancedSettingsForm').reset();
        document.getElementById('advancedSettingsError').style.display = 'none';
        document.getElementById('advancedSettingsSuccess').style.display = 'none';
    }
};

// Toggle password visibility
window.togglePasswordVisibility = (inputId, button) => {
    const input = document.getElementById(inputId);
    if (!input) return;

    if (input.type === 'password') {
        input.type = 'text';
        button.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
        button.title = 'Hide password';
    } else {
        input.type = 'password';
        button.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
        button.title = 'Show password';
    }
};

window.saveAdvancedSettings = (event) => {
    event.preventDefault();
    const errorDiv = document.getElementById('advancedSettingsError');
    const successDiv = document.getElementById('advancedSettingsSuccess');
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';

    // Get password values
    const currentLoginPassword = document.getElementById('currentLoginPassword').value.trim();
    const newLoginPassword = document.getElementById('newLoginPassword').value.trim();
    const currentAdminPassword = document.getElementById('currentAdminPassword').value.trim();
    const newAdminPassword = document.getElementById('newAdminPassword').value.trim();

    let hasChanges = false;
    let errors = [];

    // Validate and update login password
    if (newLoginPassword) {
        const stored = getLoginPassword();
        if (stored !== '' && !currentLoginPassword) {
            errors.push('Please enter current login password.');
        } else if (stored !== '' && currentLoginPassword !== stored) {
            errors.push('Current login password is incorrect.');
        } else {
            Storage.set('loginPassword', newLoginPassword);
            hasChanges = true;
        }
    }

    // Validate and update admin password
    if (newAdminPassword) {
        const stored = getAdminPassword();
        if (stored !== '' && !currentAdminPassword) {
            errors.push('Please enter current admin password.');
        } else if (stored !== '' && currentAdminPassword !== stored) {
            errors.push('Current admin password is incorrect.');
        } else {
            Storage.set('adminPassword', newAdminPassword);
            hasChanges = true;
        }
    }

    // Check if no changes were made
    if (!currentLoginPassword && !newLoginPassword && !currentAdminPassword && !newAdminPassword) {
        errors.push('Please make at least one change.');
    }

    // Display errors or success
    if (errors.length > 0) {
        errorDiv.textContent = errors.join(' ');
        errorDiv.style.display = 'block';
    } else if (hasChanges) {
        successDiv.textContent = 'Settings saved successfully!';
        successDiv.style.display = 'block';

        // Clear password fields
        document.getElementById('currentLoginPassword').value = '';
        document.getElementById('newLoginPassword').value = '';
        document.getElementById('currentAdminPassword').value = '';
        document.getElementById('newAdminPassword').value = '';

        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 3000);
    }
};

window.removePassword = (type) => {
    const currentInputId = type === 'login' ? 'currentLoginPassword' : 'currentAdminPassword';
    const currentPasswordInput = document.getElementById(currentInputId);
    const enteredPassword = currentPasswordInput.value.trim();
    const storedPassword = type === 'login' ? getLoginPassword() : getAdminPassword();
    const errorDiv = document.getElementById('advancedSettingsError');
    const successDiv = document.getElementById('advancedSettingsSuccess');

    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';

    if (!enteredPassword) {
        errorDiv.textContent = `Please enter current ${type} password to disable it.`;
        errorDiv.style.display = 'block';
        currentPasswordInput.focus();
        return;
    }

    if (enteredPassword !== storedPassword) {
        errorDiv.textContent = `Incorrect current ${type} password.`;
        errorDiv.style.display = 'block';
        currentPasswordInput.value = '';
        currentPasswordInput.focus();
        return;
    }

    // Clear the password
    Storage.set(type === 'login' ? 'loginPassword' : 'adminPassword', '');

    successDiv.textContent = `${type === 'login' ? 'Login' : 'Admin'} password has been disabled.`;
    successDiv.style.display = 'block';

    // Reset inputs
    document.getElementById('currentLoginPassword').value = '';
    document.getElementById('newLoginPassword').value = '';
    document.getElementById('currentAdminPassword').value = '';
    document.getElementById('newAdminPassword').value = '';

    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 3000);
};

// Function to switch to a tab
function switchToTab(tab) {
    // Find the nav button for this tab
    const navButton = document.querySelector(`.nav-item[data-tab="${tab}"]`);
    if (!navButton) return;

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    navButton.classList.add('active');

    // Update active tab content
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    const targetTab = document.getElementById(tab);
    if (targetTab) {
        targetTab.classList.add('active');
    }

    // Scroll to top when switching tabs
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.scrollTop = 0;
    }

    // Show/hide order section and adjust layout
    const orderSectionWrapper = document.getElementById('orderSectionWrapper');

    if (tab === 'pos') {
        // Show order section for POS
        if (orderSectionWrapper) orderSectionWrapper.classList.add('show');
        if (mainContent) mainContent.classList.add('has-order-section');
        loadCategories();
        loadMenuItems();
        loadWaitersDropdown();
        loadTablesDropdown();
        updateCart();
        updateOrderDate();
    } else {
        // Hide order section for other tabs
        if (orderSectionWrapper) orderSectionWrapper.classList.remove('show');
        if (mainContent) mainContent.classList.remove('has-order-section');

        if (tab === 'menu') {
            loadMenuCategories();
            loadMenuItemsList();
            setupMenuItemsSearch();
        }
        else if (tab === 'sales') {
            setupSalesFilters();
            // Ensure Sales History tab is active on initial load (this will properly reset all buttons)
            switchSalesView('history');
            loadSales();
        }
        else if (tab === 'dashboard') {
            loadDashboard();
            setTimeout(() => {
                if (!salesChart || !profitChart || !customerChart) {
                    initCharts();
                }
                updateCharts();
            }, 100);
        }
        else if (tab === 'holdOrders') loadHoldOrders();
        else if (tab === 'employees') {
            setupEmployeeFilters();
            loadEmployees();
            loadWaiters();
        }
        else if (tab === 'expenses') {
            setupExpensesFilters();
            loadExpenses();
        }
        else if (tab === 'stock') loadStock();
        else if (tab === 'tables') loadTables();
        else if (tab === 'settings') loadCafeSettings();
        else if (tab === 'reports') {
            const today = getLocalISODate();
            const thisMonth = getLocalISOMonth();
            const dateInput = document.getElementById('reportDailyDate');
            if (dateInput && !dateInput.value) dateInput.value = today;
            const monthInput = document.getElementById('reportMonthlyMonth');
            if (monthInput && !monthInput.value) monthInput.value = thisMonth;
            const yearSelect = document.getElementById('reportAnnualYear');
            if (yearSelect && yearSelect.options.length === 0) {
                yearSelect.innerHTML = getFilterYearOptions(new Date().getFullYear());
            }
        }
    }
    if (window.setupSearchClearButtons) {
        window.setupSearchClearButtons();
    }
}

// Global variables
let currentDiscount = { type: null, value: 0 }; // Track current discount
const SALES_TAX_RATE = 0; // Tax removed
const SERVICE_CHARGE_RATE = 0; // Service charges removed

// Image cache for optimized display images
const imageDisplayCache = new Map();

// Compress image for display (smaller than upload compression for better performance)
function compressImageForDisplay(imageSrc, maxWidth = 200, maxHeight = 200, quality = 0.6, callback) {
    if (!callback) return;

    // Check cache first
    const cacheKey = `${imageSrc}_${maxWidth}_${maxHeight}_${quality}`;
    if (imageDisplayCache.has(cacheKey)) {
        callback(imageDisplayCache.get(cacheKey));
        return;
    }

    // If it's already a placeholder or data URL that's small, return as-is
    if (!imageSrc || imageSrc.startsWith('data:image/svg+xml')) {
        callback(imageSrc);
        return;
    }

    // If image is already small (less than 50KB in base64), skip compression
    if (imageSrc.startsWith('data:image') && imageSrc.length < 50000) {
        callback(imageSrc);
        return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    // Set timeout to prevent hanging
    const timeout = setTimeout(() => {
        callback(imageSrc); // Fallback to original on timeout
    }, 5000);

    img.onload = function () {
        clearTimeout(timeout);
        try {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // Skip if image is already small enough
            if (width <= maxWidth && height <= maxHeight) {
                callback(imageSrc);
                return;
            }

            // Calculate new dimensions
            if (width > height) {
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Convert to base64 with compression
            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

            // Only cache if compression actually reduced size
            if (compressedDataUrl.length < imageSrc.length) {
                imageDisplayCache.set(cacheKey, compressedDataUrl);

                // Limit cache size to prevent memory issues
                if (imageDisplayCache.size > 100) {
                    const firstKey = imageDisplayCache.keys().next().value;
                    imageDisplayCache.delete(firstKey);
                }

                callback(compressedDataUrl);
            } else {
                // Original was smaller, use it
                callback(imageSrc);
            }
        } catch (error) {
            clearTimeout(timeout);
            console.error('Error compressing image:', error);
            callback(imageSrc); // Fallback to original
        }
    };

    img.onerror = function () {
        clearTimeout(timeout);
        callback(imageSrc); // Fallback to original on error
    };

    img.src = imageSrc;
}

// Lazy loading setup for menu images
let imageObserver = null;

function setupLazyLoading() {
    // First, load any images that are already visible (fallback for IntersectionObserver)
    document.querySelectorAll('img[data-src]').forEach(img => {
        const rect = img.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight + 100 && rect.bottom > -100;
        if (isVisible) {
            const originalSrc = img.dataset.src;
            if (originalSrc) {
                compressImageForDisplay(originalSrc, 200, 200, 0.6, (compressedSrc) => {
                    img.src = compressedSrc;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                });
            }
        }
    });

    // Then setup IntersectionObserver for remaining images
    if ('IntersectionObserver' in window) {
        // Disconnect existing observer if any
        if (imageObserver) {
            imageObserver.disconnect();
        }

        imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const originalSrc = img.dataset.src;
                    if (originalSrc) {
                        // Compress and load image
                        compressImageForDisplay(originalSrc, 200, 200, 0.6, (compressedSrc) => {
                            if (img.parentElement) { // Make sure image is still in DOM
                                img.src = compressedSrc;
                                img.removeAttribute('data-src');
                                img.classList.add('loaded');
                            }
                        });
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px' // Start loading 100px before image enters viewport
        });

        // Observe all remaining lazy images
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback: load all images if IntersectionObserver is not supported
        document.querySelectorAll('img[data-src]').forEach(img => {
            const originalSrc = img.dataset.src;
            if (originalSrc) {
                compressImageForDisplay(originalSrc, 200, 200, 0.6, (compressedSrc) => {
                    img.src = compressedSrc;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                });
            }
        });
    }
}

// Debounce function for search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Order number helpers
function extractOrderNumber(value) {
    if (!value) return null;
    const match = String(value).match(/(\d+)/);
    return match ? match[1] : null;
}

function initializeOrderSequence() {
    let seq = Storage.get('orderSequence');
    if (seq) return seq;
    const sales = Storage.get('sales') || [];
    const holdOrders = Storage.get('holdOrders') || [];
    let max = 0;
    [...sales, ...holdOrders].forEach(order => {
        const numStr = order?.orderNumber || extractOrderNumber(order?.orderId || order?.id);
        const num = parseInt(numStr, 10);
        if (!isNaN(num) && num > max) max = num;
    });
    Storage.set('orderSequence', max);
    return max;
}

function getNextOrderNumber() {
    let seq = Storage.get('orderSequence');
    if (seq === null || seq === undefined) {
        seq = initializeOrderSequence() || 0;
    }
    const next = Number(seq) + 1;
    Storage.set('orderSequence', next);
    return String(next).padStart(7, '0');
}

// Format number with commas only for 10,000+
function formatNumber(num) {
    const rounded = Math.round(num);
    if (rounded >= 10000) {
        return rounded.toLocaleString();
    }
    return rounded.toString();
}

// Format quantity to show decimals when needed
function formatQuantity(num) {
    if (num % 1 === 0) {
        // It's a whole number, show without decimals
        return num.toString();
    } else {
        // It has decimals, show up to 2 decimal places
        return parseFloat(num).toFixed(2).replace(/\.?0+$/, '');
    }
}

// Format date as "12-Dec-2025"
function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';

    const day = d.getDate().toString().padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
}

// Helper function to format items as HTML table for receipts
function formatReceiptItems(items) {
    if (!items || items.length === 0) return '';

    let result = '<table class="receipt-items-table" style="width: 100%; border-collapse: collapse; margin: 5px 0; font-family: \'Poppins\', sans-serif !important; border: 1.5px solid #000; background: #fff;">';
    result += '<thead style="background: #fff !important; color: #000 !important; font-family: \'Poppins\', sans-serif !important;">';
    result += '<tr style="border-bottom: 1.5px solid #000; background: #fff !important; font-family: \'Poppins\', sans-serif !important;">';
    result += '<th style="text-align: center; padding: 4px 2px; font-size: 10.5px; font-weight: 600; border-right: 1px solid #000; width: 7%; color: #000 !important; background: #fff !important; font-family: \'Poppins\', sans-serif !important;">#</th>';
    result += '<th style="text-align: left; padding: 4px 5px; font-size: 10.5px; font-weight: 600; border-right: 1px solid #000; width: 48%; color: #000 !important; background: #fff !important; font-family: \'Poppins\', sans-serif !important;">ITEM</th>';
    result += '<th style="text-align: center; padding: 4px 2px; font-size: 10.5px; font-weight: 600; border-right: 1px solid #000; width: 10%; color: #000 !important; background: #fff !important; font-family: \'Poppins\', sans-serif !important;">QTY</th>';
    result += '<th style="text-align: right; padding: 4px 4px; font-size: 10.5px; font-weight: 600; border-right: 1px solid #000; width: 17%; color: #000 !important; background: #fff !important; font-family: \'Poppins\', sans-serif !important;">RATE</th>';
    result += '<th style="text-align: right; padding: 4px 5px; font-size: 10.5px; font-weight: 600; width: 18%; color: #000 !important; background: #fff !important; font-family: \'Poppins\', sans-serif !important;">AMOUNT</th>';
    result += '</tr>';
    result += '</thead>';
    result += '<tbody style="background: #fff !important; font-family: \'Poppins\', sans-serif !important;">';

    items.forEach((item, index) => {
        const num = index + 1;
        const name = escapeHtml(item.name || item.itemName || item.dishName || 'Unknown');
        const quantity = formatQuantity(item.quantity || 0);
        const unitPrice = item.price || 0;
        const totalPrice = unitPrice * (item.quantity || 0);
        const isLast = index === items.length - 1;
        const bottomBorder = isLast ? '' : 'border-bottom: 1px solid #000;';

        result += `<tr style="${bottomBorder} font-family: 'Poppins', sans-serif !important;">`;
        result += `<td style="text-align: center; padding: 4px 2px; font-size: 10px; font-weight: 400; color: #666; border-right: 1px solid #000; font-family: 'Poppins', sans-serif !important;">${num}</td>`;
        result += `<td style="text-align: left; padding: 4px 5px; font-size: 10.5px; font-weight: 500; color: #000; border-right: 1px solid #000; line-height: 1.25; font-family: 'Poppins', sans-serif !important;">${name}</td>`;
        result += `<td style="text-align: center; padding: 4px 2px; font-size: 11px; font-weight: 600; color: #000; border-right: 1px solid #000; font-family: 'Poppins', sans-serif !important;">${quantity}</td>`;
        result += `<td style="text-align: right; padding: 4px 4px; font-size: 10.5px; font-weight: 500; color: #000; border-right: 1px solid #000; font-family: 'Poppins', sans-serif !important;">${formatNumber(unitPrice)}</td>`;
        result += `<td style="text-align: right; padding: 4px 5px; font-size: 11px; font-weight: 600; color: #000; font-family: 'Poppins', sans-serif !important;">${formatNumber(totalPrice)}</td>`;
        result += '</tr>';
    });

    result += '</tbody>';
    result += '</table>\n';

    return result;
}

// Helper function to format receipt summary as clean key-value rows
function formatReceiptSummary(subtotal, discountAmount, tax, serviceCharges, total) {
    let result = '<div class="receipt-summary" style="margin-top: 6px; font-size: 12px; line-height: 1.6; color: #000; font-family: \'Poppins\', sans-serif !important;">';
    result += `<div style="display: flex; justify-content: space-between; font-family: 'Poppins', sans-serif !important;"><span style="font-weight: 400; color: #444; font-family: 'Poppins', sans-serif !important;">${t('Subtotal')}</span><span style="font-weight: 500; color: #111; font-family: 'Poppins', sans-serif !important;">Rs. ${formatNumber(subtotal)}</span></div>`;

    if (discountAmount > 0) {
        result += `<div style="display: flex; justify-content: space-between;"><span style="font-weight: 400; color: #444;">${t('Discount')}</span><span style="font-weight: 500; color: #111;">-Rs. ${formatNumber(discountAmount)}</span></div>`;
    }

    if (tax > 0) {
        result += `<div style="display: flex; justify-content: space-between;"><span style="font-weight: 400; color: #444;">GST (5%)</span><span style="font-weight: 500; color: #111;">Rs. ${formatNumber(tax)}</span></div>`;
    }

    if (serviceCharges > 0) {
        result += `<div style="display: flex; justify-content: space-between;"><span style="font-weight: 400; color: #444;">Service Charges (10%)</span><span style="font-weight: 500; color: #111;">Rs. ${formatNumber(serviceCharges)}</span></div>`;
    }

    result += '<div style="border-top: 1.5px solid #000; margin: 5px 0 4px 0;"></div>';
    result += `<div style="display: flex; justify-content: space-between; align-items: center;"><span style="font-size: 13.5px; font-weight: 700; letter-spacing: 0.3px; text-transform: uppercase; color: #000;">${t('TOTAL PAYABLE') || 'TOTAL PAYABLE'}</span><span style="font-size: 14.5px; font-weight: 700; color: #000;">Rs. ${formatNumber(total)}</span></div>`;
    result += '</div>\n';

    return result;
}

// Master helper function to generate the complete modern receipt HTML
function generateFullReceiptHTML(order) {
    if (!order) return '';

    const displayOrderNumber = (order.orderNumber || extractOrderNumber(order.orderId || order.id) || '').toString().padStart(7, '0');

    // Extract items list
    const itemsList = (order.items && Array.isArray(order.items) && order.items.length > 0)
        ? order.items
        : ((order.itemName || order.dishName)
            ? [{ name: order.itemName || order.dishName || 'Unknown', quantity: order.quantity || 0, price: order.price || 0 }]
            : []);

    // Calculate subtotal, discount, tax, service charges, total
    const subtotal = order.subtotal !== undefined
        ? order.subtotal
        : itemsList.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);

    const discountAmount = getDiscountAmountFromOrder(order, subtotal);
    const paymentMethod = order.paymentMethod || 'cash';
    const isParcel = (paymentMethod === 'delivery' || paymentMethod === 'parcel');
    const tax = isParcel ? 0 : (order.tax !== undefined ? order.tax : 0);
    const serviceCharges = isParcel ? 0 : (order.serviceCharges !== undefined ? order.serviceCharges : 0);
    const total = order.total !== undefined ? order.total : (subtotal - discountAmount + tax + serviceCharges);

    // Date & Time formatting
    let dateStr = '';
    let timeStr = '';
    let orderDateObj = new Date();

    if (order.date) {
        if (typeof order.date === 'string' && order.time) {
            dateStr = order.date;
            timeStr = order.time;
        } else {
            orderDateObj = new Date(order.date);
            dateStr = formatDate(orderDateObj);
            timeStr = order.time || formatTime(orderDateObj);
        }
    } else if (order.createdAt) {
        orderDateObj = new Date(order.createdAt);
        dateStr = formatDate(orderDateObj);
        timeStr = formatTime(orderDateObj);
    } else {
        dateStr = formatDate(orderDateObj);
        timeStr = formatTime(orderDateObj);
    }

    const waitingTime = (order && order.waitingTime !== undefined && order.waitingTime !== null) ? order.waitingTime : getWaitingTime();
    const receiveTime = calculateReceiveTime(timeStr, orderDateObj, waitingTime);

    const itemsHtml = formatReceiptItems(itemsList);
    const summaryHtml = formatReceiptSummary(subtotal, discountAmount, tax, serviceCharges, total);

    const cafeSettings = (typeof getCafeSettings === 'function') ? getCafeSettings() : {
        restaurantName: 'Hangout Lounge & Co.',
        phone: '0300-9509536',
        address: 'Wah Cantt',
        returnPolicy: 'THANK YOU FOR VISITING HANGOUT LOUNGE & CO.!',
        logo: 'assets/logo.jpg'
    };
    const storeName = cafeSettings.restaurantName || 'Hangout Lounge & Co.';
    const storeAddress = cafeSettings.address || 'Wah Cantt';
    const storePhone = cafeSettings.phone || '0300-9509536';
    const returnNotice = cafeSettings.returnPolicy || 'THANK YOU FOR VISITING HANGOUT LOUNGE & CO.!';

    return `
        <div class="receipt-container" style="font-family: 'Poppins', sans-serif !important; width: 100%; max-width: 320px; margin: 0 auto; color: #000; box-sizing: border-box; text-align: left; background: #fff; line-height: 1.4;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 6px; font-family: 'Poppins', sans-serif !important;">
                <div style="font-size: 17px; font-weight: 700; letter-spacing: 0.3px; text-transform: uppercase; color: #000; margin-bottom: 2px; font-family: 'Poppins', sans-serif !important;">${escapeHtml(storeName)}</div>
                <div style="font-size: 11px; font-weight: 500; color: #333; line-height: 1.35; font-family: 'Poppins', sans-serif !important;">${escapeHtml(storeAddress)}</div>
                <div style="font-size: 11px; font-weight: 500; color: #333; line-height: 1.35; font-family: 'Poppins', sans-serif !important;">Phone: ${escapeHtml(storePhone)}</div>
            </div>

            <!-- Dashed Divider -->
            <div style="border-top: 1px dashed #999; margin: 7px 0;"></div>

            <!-- Order Metadata -->
            <div style="font-size: 11.5px; line-height: 1.55; color: #000; font-family: 'Poppins', sans-serif !important;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Poppins', sans-serif !important;">
                    <span style="font-weight: 600; font-family: 'Poppins', sans-serif !important;">Order ID:</span>
                    <span style="font-weight: 600; font-size: 13px; font-family: 'Poppins', sans-serif !important;">#${displayOrderNumber}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Poppins', sans-serif !important;">
                    <span style="font-weight: 600; font-family: 'Poppins', sans-serif !important;">Date & Time:</span>
                    <span style="font-weight: 600; font-size: 13px; color: #000; font-family: 'Poppins', sans-serif !important;">${dateStr}, ${timeStr}</span>
                </div>
                ${receiveTime ? `
                <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Poppins', sans-serif !important;">
                    <span style="font-weight: 600; font-family: 'Poppins', sans-serif !important;">Order Receive Time:</span>
                    <span style="font-weight: 600; font-size: 13px; color: #000; font-family: 'Poppins', sans-serif !important;">${receiveTime}</span>
                </div>` : ''}
                ${order.customerName && order.customerName !== '-' ? `
                <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Poppins', sans-serif !important;">
                    <span style="font-weight: 600; font-family: 'Poppins', sans-serif !important;">Customer:</span>
                    <span style="font-weight: 400; color: #333; font-family: 'Poppins', sans-serif !important;">${escapeHtml(order.customerName)}</span>
                </div>` : ''}
                ${order.customerPhone ? `
                <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Poppins', sans-serif !important;">
                    <span style="font-weight: 600; font-family: 'Poppins', sans-serif !important;">Phone:</span>
                    <span style="font-weight: 400; color: #333; font-family: 'Poppins', sans-serif !important;">${escapeHtml(order.customerPhone)}</span>
                </div>` : ''}
                ${order.tableNo ? `
                <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Poppins', sans-serif !important;">
                    <span style="font-weight: 600; font-family: 'Poppins', sans-serif !important;">Table No:</span>
                    <span style="font-weight: 400; color: #333; font-family: 'Poppins', sans-serif !important;">${escapeHtml(order.tableNo)}</span>
                </div>` : ''}
                ${order.waiter ? `
                <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Poppins', sans-serif !important;">
                    <span style="font-weight: 600; font-family: 'Poppins', sans-serif !important;">Waiter:</span>
                    <span style="font-weight: 400; color: #333; font-family: 'Poppins', sans-serif !important;">${escapeHtml(order.waiter)}</span>
                </div>` : ''}
                ${order.deliveryAddress ? `
                <div style="display: flex; justify-content: space-between; align-items: baseline; font-family: 'Poppins', sans-serif !important;">
                    <span style="font-weight: 600; font-family: 'Poppins', sans-serif !important;">Delivery Address:</span>
                    <span style="font-weight: 400; color: #333; font-family: 'Poppins', sans-serif !important;">${escapeHtml(order.deliveryAddress)}</span>
                </div>` : ''}
            </div>

            <!-- Dashed Divider -->
            <div style="border-top: 1px dashed #999; margin: 6px 0 7px 0;"></div>

            <!-- Items Table -->
            ${itemsHtml}

            <!-- Summary -->
            ${summaryHtml}

            <!-- Dashed Divider -->
            <div style="border-top: 1px dashed #999; margin: 7px 0 6px 0;"></div>

            <!-- Thank You / Return Policy Notice -->
            <div style="text-align: center; font-size: 9.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2px; color: #000; font-family: 'Poppins', sans-serif !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 1px;">${escapeHtml(returnNotice)}</div>

            <!-- Tear Cut Line -->
            <div style="text-align: center; font-size: 10px; color: #777; margin-top: 6px; letter-spacing: 2px; font-family: 'Poppins', sans-serif !important;">✂ - - - - - - - - - - - - - - - - - - -</div>
        </div>
    `;
}

// Master helper function to open and print receipt window
function openReceiptPrintWindow(receiptHTML, title) {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.open();
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>${title || 'Receipt'}</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
                <style>
                    *, *::before, *::after {
                        box-sizing: border-box;
                        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
                    }
                    body, div, span, p, h1, h2, h3, h4, table, th, td, tr, b, strong {
                        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
                    }
                    body {
                        padding: 8px;
                        font-size: 12px;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: center;
                        min-height: auto;
                        margin: 0 auto;
                        max-width: 80mm;
                        background: #fff;
                        color: #000;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    @media print {
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                        body {
                            padding: 3mm 0;
                            margin: 0;
                            min-height: auto;
                            display: block;
                            height: auto;
                            max-width: 100%;
                            width: 100%;
                            background: #fff;
                            color: #000;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                        @page {
                            size: 80mm auto;
                            margin: 3mm;
                        }
                    }
                </style>
            </head>
            <body>
                <div id="receiptContent" style="width: 100%;">
                    ${receiptHTML}
                </div>
                <script>
                    var hasPrinted = false;
                    function triggerPrint() {
                        if (hasPrinted) return;
                        hasPrinted = true;
                        try {
                            window.focus();
                            window.print();
                        } catch(e) {
                            console.error(e);
                        }
                    }
                    window.addEventListener('afterprint', function() {
                        setTimeout(function() {
                            try { window.close(); } catch(e) {}
                        }, 150);
                    });
                    function schedulePrint() {
                        if (document.fonts && document.fonts.ready) {
                            document.fonts.ready.then(function() {
                                if (window.requestAnimationFrame) {
                                    window.requestAnimationFrame(function() {
                                        window.requestAnimationFrame(function() {
                                            setTimeout(triggerPrint, 250);
                                        });
                                    });
                                } else {
                                    setTimeout(triggerPrint, 250);
                                }
                            }).catch(function() {
                                setTimeout(triggerPrint, 250);
                            });
                        } else {
                            if (window.requestAnimationFrame) {
                                window.requestAnimationFrame(function() {
                                    window.requestAnimationFrame(function() {
                                        setTimeout(triggerPrint, 250);
                                    });
                                });
                            } else {
                                setTimeout(triggerPrint, 250);
                            }
                        }
                    }
                    if (document.readyState === 'complete') {
                        schedulePrint();
                    } else {
                        window.addEventListener('load', schedulePrint, { once: true });
                        setTimeout(schedulePrint, 500);
                    }
                </script>
            </body>
        </html>
    `);
    printWindow.document.close();
}

function formatKOTItems(items) {
    if (!items || items.length === 0) return '';

    // Return HTML table format with 2 columns (Item, Qty) for KOT with bordered table (clean white background)
    let result = '<table class="kot-items-table" style="width: 100%; border-collapse: collapse; margin: 4px 0; font-size: 12px; font-family: \'Poppins\', sans-serif !important; border: 1.5px solid #000; background: #fff;">';
    result += '<thead style="background: #fff !important; color: #000 !important; font-family: \'Poppins\', sans-serif !important;">';
    result += '<tr style="border-bottom: 1.5px solid #000; background: #fff !important;">';
    result += '<th style="text-align: left; padding: 4px 8px; font-weight: 600; font-size: 11px; width: 70%; border-right: 1px solid #000; color: #000 !important; text-transform: uppercase;">ITEM</th>';
    result += '<th style="text-align: center; padding: 4px 8px; font-weight: 600; font-size: 11px; width: 30%; color: #000 !important; text-transform: uppercase;">QTY</th>';
    result += '</tr>';
    result += '</thead>';
    result += '<tbody style="background: #fff !important; font-family: \'Poppins\', sans-serif !important;">';

    items.forEach((item, index) => {
        const name = escapeHtml(item.name || 'Unknown');
        const quantity = formatQuantity(item.quantity || 0);
        const isLast = index === items.length - 1;
        const bottomBorder = isLast ? '' : 'border-bottom: 1px solid #000;';

        result += `<tr style="${bottomBorder} font-family: 'Poppins', sans-serif !important;">`;
        result += `<td style="text-align: left; padding: 4px 8px; font-weight: 500; font-size: 10.5px; border-right: 1px solid #000; color: #000; line-height: 1.25;">${name}</td>`;
        result += `<td style="text-align: center; padding: 4px 8px; font-weight: 600; font-size: 11.5px; color: #000;">${quantity}</td>`;
        result += '</tr>';
    });

    result += '</tbody>';
    result += '</table>';

    return result;
}

// Format time as "09:00 PM"
function formatTime(date) {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';

    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// Calculate order receive time (only calculated and shown when waiting minutes are entered)
function calculateReceiveTime(orderTime, orderDate, customWaitingMinutes) {
    if (!orderTime && !orderDate) return '';

    // Determine waiting minutes to add
    let minutesToAdd = null;
    if (customWaitingMinutes !== undefined && customWaitingMinutes !== null && customWaitingMinutes !== '') {
        const parsed = parseInt(customWaitingMinutes, 10);
        if (!isNaN(parsed) && parsed > 0) {
            minutesToAdd = parsed;
        }
    } else if (typeof getWaitingTime === 'function') {
        const inputMinutes = getWaitingTime();
        if (inputMinutes !== null && inputMinutes > 0) {
            minutesToAdd = inputMinutes;
        }
    }

    // Only show receive time if user explicitly entered waiting minutes
    if (minutesToAdd === null || minutesToAdd === undefined || minutesToAdd <= 0) {
        return '';
    }

    let orderDateTime;

    // If we have a date object, use it directly
    if (orderDate instanceof Date) {
        orderDateTime = new Date(orderDate);
    } else if (orderDate) {
        // Try to parse date string (could be ISO string or formatted date)
        orderDateTime = new Date(orderDate);
        // If parsing failed, try to parse formatted date like "09-Jan-2026"
        if (isNaN(orderDateTime.getTime())) {
            // Try parsing common date formats
            const dateStr = String(orderDate);
            const dateMatch = dateStr.match(/(\d{1,2})-(\w{3})-(\d{4})/);
            if (dateMatch) {
                const day = parseInt(dateMatch[1], 10);
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const month = monthNames.indexOf(dateMatch[2]);
                const year = parseInt(dateMatch[3], 10);
                if (month !== -1) {
                    orderDateTime = new Date(year, month, day);
                } else {
                    orderDateTime = new Date();
                }
            } else {
                orderDateTime = new Date();
            }
        }
    } else {
        // Use current date if no date provided
        orderDateTime = new Date();
    }

    // If we have a time string (like "02:09 PM"), parse it
    if (orderTime && typeof orderTime === 'string') {
        const timeMatch = orderTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
        if (timeMatch) {
            let hours = parseInt(timeMatch[1], 10);
            const minutes = parseInt(timeMatch[2], 10);
            const ampm = timeMatch[3].toUpperCase();

            // Convert to 24-hour format
            if (ampm === 'PM' && hours !== 12) {
                hours += 12;
            } else if (ampm === 'AM' && hours === 12) {
                hours = 0;
            }

            // Set the time on the date object
            orderDateTime.setHours(hours, minutes, 0, 0);
        }
    }

    // Validate that we have a valid date/time
    if (isNaN(orderDateTime.getTime())) {
        orderDateTime = new Date();
    }

    orderDateTime.setMinutes(orderDateTime.getMinutes() + minutesToAdd);

    // Format and return
    try {
        const receiveTime = orderDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        if (receiveTime && receiveTime.trim()) {
            return receiveTime;
        }
    } catch (e) {
        const fallbackTime = new Date();
        fallbackTime.setMinutes(fallbackTime.getMinutes() + minutesToAdd);
        return fallbackTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }

    return '';
}

// Alert override to use custom modal
window.alert = (msg) => {
    if (typeof showCustomAlert === 'function') {
        showCustomAlert(msg);
    }
};

function t(text) {
    return text;
}

function formatPaymentMethod(method) {
    const m = (method || 'cash').toString().toLowerCase();
    if (m === 'delivery' || m === 'parcel') return 'Parcel';
    if (m === 'cash') return 'Gents';
    if (m === 'online') return 'Family';
    return m.charAt(0).toUpperCase() + m.slice(1);
}

// Location label for Sales/Prints
function formatLocation(method) {
    const m = (method || 'cash').toString().toLowerCase();
    if (m === 'delivery' || m === 'parcel') return 'Parcel';
    if (m === 'cash') return '';
    if (m === 'online') return 'Family Hall';
    return m.charAt(0).toUpperCase() + m.slice(1);
}

// Format time like "2:34 PM" (used for payouts, etc.)
function formatTimeShort(date) {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

// Format time like "2:34:56 PM" (used for live clock)
function formatTimeShortWithSeconds(date) {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' });
}

// Convert 24-hour time string (e.g., "13:30") to 12-hour format (e.g., "1:30 PM")
function formatTime12Hour(time24) {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const min = minutes || '00';
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour);
    return `${hour12}:${min} ${period}`;
}

function getDiscountAmountFromOrder(order, subtotalFallback = 0) {
    if (!order) return 0;
    const discount = order.discount;
    if (!discount) return 0;
    if (typeof discount.amount === 'number') return discount.amount;
    const subtotal = typeof order.subtotal === 'number' ? order.subtotal : subtotalFallback;
    if (discount.type === 'fixed') return Math.min(Number(discount.value || 0), subtotal);
    if (discount.type === 'percentage') return (subtotal * Number(discount.value || 0)) / 100;
    return 0;
}

// Cart Management
let cart = [];
let originalHoldOrderItems = []; // Store items before editing a hold order
let editingHoldOrderId = null; // Track which hold order is being edited
let currentCustomerName = ''; // Store customer name for receipts

// Function to show inline message over a button
function showButtonMessage(buttonElement, message) {
    if (!buttonElement) return;

    // Remove any existing message
    const existingMessage = document.querySelector('.button-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = 'button-message';
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        background: #e74c3c;
        color: white;
        padding: 10px 18px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        white-space: nowrap;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
        pointer-events: none;
        font-family: 'Poppins', 'Inter', sans-serif;
    `;

    // Position message above the button using fixed positioning
    const buttonRect = buttonElement.getBoundingClientRect();
    messageEl.style.top = `${buttonRect.top - 45}px`;
    messageEl.style.left = `${buttonRect.left + (buttonRect.width / 2)}px`;
    messageEl.style.transform = 'translateX(-50%)';

    document.body.appendChild(messageEl);

    // Function to remove the message
    const removeMessage = () => {
        if (messageEl.parentElement) {
            messageEl.remove();
        }
    };

    // Remove message when clicking anywhere
    const clickHandler = (e) => {
        // Don't remove if clicking on the message itself
        if (!messageEl.contains(e.target)) {
            removeMessage();
            document.removeEventListener('click', clickHandler);
        }
    };

    // Add click listener after a small delay to avoid immediate removal
    setTimeout(() => {
        document.addEventListener('click', clickHandler);
    }, 10);

    // Remove message after 3 seconds
    setTimeout(() => {
        removeMessage();
        document.removeEventListener('click', clickHandler);
    }, 3000);
}

// Sidebar Navigation
document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;

        // If editing an order and switching away from POS, cancel edit
        if (editingHoldOrderId && tab !== 'pos') {
            showCustomConfirm('You are editing an order. Cancel editing and switch tab?', () => {
                cancelEditHoldOrder();
                if (isTabLocked(tab)) {
                    const unlockedTabs = JSON.parse(sessionStorage.getItem('unlockedTabs') || '[]');
                    if (!unlockedTabs.includes(tab)) {
                        openStaffPasswordModal(tab);
                        return;
                    }
                }
                switchToTab(tab);
                document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
            return;
        }

        // Check if tab requires staff password
        if (isTabLocked(tab)) {
            // Check if THIS SPECIFIC TAB is authenticated
            const unlockedTabs = JSON.parse(sessionStorage.getItem('unlockedTabs') || '[]');
            if (!unlockedTabs.includes(tab)) {
                // Show password prompt
                openStaffPasswordModal(tab);
                return; // Don't switch tabs yet
            }
        }

        // Switch to the tab
        switchToTab(tab);
    });
});

try {
    localStorage.removeItem('appLanguage');
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
} catch (_) {}

// Check on page load if current tab requires staff password
onDOMReady(() => {
    // Small delay to ensure DOM is fully ready
    setTimeout(() => {
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab) {
            const tabId = activeTab.id;
            if (isTabLocked(tabId)) {
                const unlockedTabs = JSON.parse(sessionStorage.getItem('unlockedTabs') || '[]');
                if (!unlockedTabs.includes(tabId)) {
                    // Switch to POS tab if not authenticated
                    switchToTab('pos');
                }
            } else if (tabId === 'pos') {
                switchToTab('pos');
            }
        } else {
            switchToTab('pos');
        }
    }, 50);
});

// Menu Category Management
let editingCategoryId = null;

// Add Category Modal Form Handler
const addCategoryForm = document.getElementById('addCategoryForm');
if (addCategoryForm) {
    addCategoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const categories = Storage.get('menuCategories');
        const name = document.getElementById('addCategoryName').value.trim();

        if (!name) {
            alert('Please enter a category name');
            return;
        }

        if (editingCategoryId !== null) {
            // Edit existing category
            const index = categories.findIndex(c => c.id === editingCategoryId);
            if (index !== -1) {
                // Check if another category with the same name exists (excluding current one)
                const existingCategory = categories.find(c => c.name.toLowerCase() === name.toLowerCase() && c.id !== editingCategoryId);
                if (existingCategory) {
                    alert('Category already exists!');
                    return;
                }
                categories[index].name = name;
            }
            editingCategoryId = null;
        } else {
            // Add new category
            // Check if category already exists
            const existingCategory = categories.find(c => c.name.toLowerCase() === name.toLowerCase());
            if (existingCategory) {
                alert('Category already exists!');
                return;
            }

            const newCategory = {
                id: Date.now(),
                name: name
            };
            categories.push(newCategory);
        }

        Storage.set('menuCategories', categories);
        document.getElementById('addCategoryName').value = '';
        const submitBtn = document.getElementById('addCategorySubmitBtn');
        if (submitBtn) submitBtn.textContent = 'Add Category';
        editingCategoryId = null;

        loadMenuCategories();
        loadMenuItemsList();
        updateCategoryDropdowns();
        if (document.getElementById('pos')?.classList.contains('active')) {
            loadCategories();
            loadMenuItems();
        }
    });
}

function loadMenuCategories() {
    const categories = Storage.get('menuCategories') || [];
    const container = document.getElementById('categoryTableBody');
    if (!container) return;

    container.innerHTML = '';

    if (categories.length === 0) {
        container.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 30px; color: #94a3b8; font-size: 14px; font-family: 'Poppins', 'Inter', sans-serif;">
                    No categories found. Add a category above.
                </td>
            </tr>
        `;
        return;
    }

    const menuItems = Storage.get('menuItems') || [];

    categories.forEach((category, index) => {
        const catId = typeof category.id === 'number' ? category.id : parseInt(category.id);
        const itemCount = menuItems.filter(item => {
            const itemCategoryId = typeof item.categoryId === 'number' ? item.categoryId : parseInt(item.categoryId);
            return itemCategoryId === catId;
        }).length;

        const tr = document.createElement('tr');
        tr.style.cssText = 'border-bottom: 1px solid #f1f5f9; transition: background 0.15s ease;';
        tr.onmouseover = () => { tr.style.background = '#f8fafc'; };
        tr.onmouseout = () => { tr.style.background = 'transparent'; };

        tr.innerHTML = `
            <td style="text-align: center; font-weight: 700; font-size: 15px; color: #64748b; padding: 13px 8px; border-right: 1px solid #f1f5f9; font-family: 'Poppins', 'Inter', sans-serif;">
                ${index + 1}
            </td>
            <td style="font-weight: 700; font-size: 14.5px; color: #1e293b; padding: 13px 16px; border-right: 1px solid #f1f5f9; font-family: 'Poppins', 'Inter', sans-serif;">
                ${escapeHtml(category.name || 'Unnamed')}
            </td>
            <td style="text-align: center; font-weight: 800; font-size: 16px; color: #0f172a; padding: 13px 14px; border-right: 1px solid #f1f5f9; font-family: 'Poppins', 'Inter', sans-serif;">
                ${itemCount}
            </td>
            <td style="text-align: center; padding: 13px 14px;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 14px;">
                    <button type="button" class="category-table-action-btn delete-btn" onclick="deleteCategory(${category.id}, this)" title="${itemCount > 0 ? `Cannot delete: contains ${itemCount} item(s)` : 'Delete'}" style="background: none; border: none; cursor: pointer; padding: 4px; display: inline-flex; align-items: center; justify-content: center; color: #ef4444; transition: transform 0.15s, color 0.15s;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                    <button type="button" class="category-table-action-btn edit-btn" onclick="editCategory(${category.id})" title="Edit" style="background: none; border: none; cursor: pointer; padding: 4px; display: inline-flex; align-items: center; justify-content: center; color: #f59e0b; transition: transform 0.15s, color 0.15s;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        container.appendChild(tr);
    });
}

window.editCategory = (id) => {
    const categories = Storage.get('menuCategories');
    const category = categories.find(c => c.id === id);
    if (category) {
        editingCategoryId = id;
        const modal = document.getElementById('addCategoryModal');
        const modalTitle = document.getElementById('categoryModalTitle');
        const submitBtn = document.getElementById('addCategorySubmitBtn');
        const nameInput = document.getElementById('addCategoryName');
        if (modal && modalTitle && submitBtn && nameInput) {
            modalTitle.textContent = 'Categories';
            submitBtn.textContent = 'Update Category';
            nameInput.value = category.name;
            nameInput.focus();
            modal.style.display = 'flex';
        }
    }
};

window.deleteCategory = (id, buttonElement) => {
    const menuItems = Storage.get('menuItems') || [];
    const itemsCount = menuItems.filter(item => {
        const itemCatId = typeof item.categoryId === 'number' ? item.categoryId : parseInt(item.categoryId);
        const targetId = typeof id === 'number' ? id : parseInt(id);
        return itemCatId === targetId;
    }).length;

    if (itemsCount > 0) {
        alert(`Cannot delete this category because it contains ${itemsCount} item(s). Please remove or reassign all items first.`);
        return;
    }

    if (buttonElement) {
        showDeleteConfirmation(buttonElement, deleteCategoryConfirmed, id);
        return;
    }
    deleteCategoryConfirmed(id);
};

function deleteCategoryConfirmed(id) {
    const menuItems = Storage.get('menuItems') || [];
    const itemsCount = menuItems.filter(item => {
        const itemCatId = typeof item.categoryId === 'number' ? item.categoryId : parseInt(item.categoryId);
        const targetId = typeof id === 'number' ? id : parseInt(id);
        return itemCatId === targetId;
    }).length;

    if (itemsCount > 0) {
        alert(`Cannot delete this category because it contains ${itemsCount} item(s). Please remove or reassign all items first.`);
        return;
    }

    const categories = Storage.get('menuCategories') || [];
    const filtered = categories.filter(c => c.id !== id);
    Storage.set('menuCategories', filtered);

    loadMenuCategories();
    loadMenuItemsList();
    updateCategoryDropdowns();
    if (document.getElementById('pos')?.classList.contains('active')) {
        loadCategories();
        loadMenuItems();
    }
}

// Menu Item Management
let editingMenuItemId = null;

window.openAddMenuItemModal = () => {
    const modal = document.getElementById('addMenuItemModal');
    if (!modal) return;

    // Update category dropdown
    const categorySelect = document.getElementById('addMenuItemCategory');
    if (categorySelect) {
        const categories = Storage.get('menuCategories') || [];
        categorySelect.innerHTML = '<option value="">Select Category</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            categorySelect.appendChild(option);
        });
    }

    // Reset form
    document.getElementById('addMenuItemForm').reset();
    clearMenuItemImage();

    // Add image preview handler
    const imageInput = document.getElementById('addMenuItemImage');
    if (imageInput) {
        imageInput.onchange = function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    const preview = document.getElementById('addMenuItemImagePreview');
                    const previewImg = document.getElementById('addMenuItemImagePreviewImg');
                    if (preview && previewImg) {
                        previewImg.src = event.target.result;
                        preview.style.display = 'block';
                    }
                };
                reader.readAsDataURL(file);
            }
        };
    }

    checkAddNextItemButton();
    modal.style.display = 'flex';
};

// Function to clear menu item image
window.clearMenuItemImage = () => {
    const imageInput = document.getElementById('addMenuItemImage');
    const preview = document.getElementById('addMenuItemImagePreview');
    const previewImg = document.getElementById('addMenuItemImagePreviewImg');
    if (imageInput) imageInput.value = '';
    if (preview) preview.style.display = 'none';
    if (previewImg) previewImg.src = '';
};

// Function to convert image file to base64
function convertImageToBase64(file, callback) {
    if (!file) {
        callback(null);
        return;
    }

    // Compress and resize image for better performance
    const maxWidth = 300;
    const maxHeight = 300;
    const quality = 0.6;

    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // Calculate new dimensions
            if (width > height) {
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Convert to base64 with compression
            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            callback(compressedDataUrl);
        };
        img.onerror = function () {
            callback(null);
        };
        img.src = event.target.result;
    };
    reader.onerror = function () {
        callback(null);
    };
    reader.readAsDataURL(file);
}

// Function to check if all fields are filled and enable/disable "Add Next Item" button
function checkAddNextItemButton() {
    const addNextItemBtn = document.getElementById('addNextItemBtn');
    if (!addNextItemBtn) return;

    const categoryId = document.getElementById('addMenuItemCategory')?.value;
    const name = document.getElementById('addMenuItemName')?.value.trim();
    const price = document.getElementById('addMenuItemPrice')?.value;

    const allFieldsFilled = categoryId && name && price && parseInt(price) > 0;

    if (allFieldsFilled) {
        addNextItemBtn.disabled = false;
        addNextItemBtn.style.background = '#4caf50';
        addNextItemBtn.style.cursor = 'pointer';
        addNextItemBtn.style.opacity = '1';
    } else {
        addNextItemBtn.disabled = true;
        addNextItemBtn.style.background = '#9e9e9e';
        addNextItemBtn.style.cursor = 'not-allowed';
        addNextItemBtn.style.opacity = '0.6';
    }
}

// Function to add item and reset fields for next item
window.addNextMenuItem = () => {
    const menuItems = Storage.get('menuItems') || [];
    const categoryIdValue = document.getElementById('addMenuItemCategory').value;
    const categoryId = categoryIdValue ? parseInt(categoryIdValue) : null;
    const name = document.getElementById('addMenuItemName').value.trim();
    const price = parseInt(document.getElementById('addMenuItemPrice').value);
    const imageFile = document.getElementById('addMenuItemImage')?.files[0];

    if (!categoryId) {
        alert('Please select a category');
        return;
    }

    if (!name) {
        alert('Please enter an item name');
        return;
    }

    if (!price || price < 0) {
        alert('Please enter a valid price');
        return;
    }

    // Convert image to base64
    convertImageToBase64(imageFile, (imageData) => {
        const newItem = {
            id: Date.now(),
            categoryId: categoryId,
            name,
            price,
            image: imageData || null
        };
        menuItems.push(newItem);

        // Add new item to the order for its category
        const itemOrder = Storage.get('menuItemOrder') || {};
        const categoryKey = categoryId.toString();
        if (!itemOrder[categoryKey]) {
            itemOrder[categoryKey] = [];
        }
        itemOrder[categoryKey].push(newItem.id);

        // Also add to 'all' category order if it exists
        if (itemOrder['all']) {
            itemOrder['all'].push(newItem.id);
        }

        Storage.set('menuItemOrder', itemOrder);
        Storage.set('menuItems', menuItems);

        // Automatically create stock item for the new menu item
        createStockItemForMenuItem(newItem.name);

        // Reset fields but keep category and modal open
        const savedCategory = categoryId.toString();

        document.getElementById('addMenuItemName').value = '';
        document.getElementById('addMenuItemPrice').value = '';
        document.getElementById('addMenuItemCategory').value = savedCategory;
        clearMenuItemImage();
        checkAddNextItemButton();

        // Refresh the lists
        loadMenuItemsList();
        loadMenuCategories();
        updateCategoryDropdowns();
        if (document.getElementById('pos')?.classList.contains('active')) {
            loadCategories();
            loadMenuItems();
        }

        // Focus on item name field for quick entry
        document.getElementById('addMenuItemName').focus();
    });
};

window.closeAddMenuItemModal = () => {
    const modal = document.getElementById('addMenuItemModal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('addMenuItemForm').reset();
        clearMenuItemImage();
        if (typeof resetAddMenuItemInlineRecipe === 'function') resetAddMenuItemInlineRecipe();
    }
};

window.openAddCategoryModal = () => {
    editingCategoryId = null;
    const modal = document.getElementById('addCategoryModal');
    const modalTitle = document.getElementById('categoryModalTitle');
    const submitBtn = document.getElementById('addCategorySubmitBtn');
    if (modal && modalTitle && submitBtn) {
        modalTitle.textContent = 'Categories';
        submitBtn.textContent = 'Add Category';
        document.getElementById('addCategoryForm').reset();
        modal.style.display = 'flex';
        // Load categories when modal opens
        loadMenuCategories();
    }
};

window.closeAddCategoryModal = () => {
    editingCategoryId = null;
    const modal = document.getElementById('addCategoryModal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('addCategoryForm')?.reset();
        const submitBtn = document.getElementById('addCategorySubmitBtn');
        if (submitBtn) submitBtn.textContent = 'Add Category';
    }
};

// Add Menu Item Form handler
const addMenuItemForm = document.getElementById('addMenuItemForm');
if (addMenuItemForm) {
    addMenuItemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const menuItems = Storage.get('menuItems') || [];
        const categoryIdValue = document.getElementById('addMenuItemCategory').value;
        const categoryId = categoryIdValue ? parseInt(categoryIdValue) : null;
        const name = document.getElementById('addMenuItemName').value.trim();
        const price = parseInt(document.getElementById('addMenuItemPrice').value);
        const imageFile = document.getElementById('addMenuItemImage')?.files[0];

        if (!categoryId) {
            alert('Please select a category');
            return;
        }

        if (!name) {
            alert('Please enter an item name');
            return;
        }

        if (!price || price < 0) {
            alert('Please enter a valid price');
            return;
        }

        // Convert image to base64
        convertImageToBase64(imageFile, (imageData) => {
            const newItem = {
                id: Date.now(),
                categoryId: categoryId,
                name,
                price,
                image: imageData || null
            };
            menuItems.push(newItem);

            // Add new item to the order for its category
            const itemOrder = Storage.get('menuItemOrder') || {};
            const categoryKey = categoryId.toString();
            if (!itemOrder[categoryKey]) {
                itemOrder[categoryKey] = [];
            }
            itemOrder[categoryKey].push(newItem.id);

            // Also add to 'all' category order if it exists
            if (itemOrder['all']) {
                itemOrder['all'].push(newItem.id);
            }

            Storage.set('menuItemOrder', itemOrder);
            Storage.set('menuItems', menuItems);

            // Automatically create stock item for the new menu item
            createStockItemForMenuItem(newItem.name);

            closeAddMenuItemModal();
            loadMenuItemsList();
            loadMenuCategories();
            updateCategoryDropdowns();
            if (document.getElementById('pos')?.classList.contains('active')) {
                loadCategories();
                loadMenuItems();
            }
        });
    });
}

window.loadMenuItemsList = function loadMenuItemsList() {
    const menuItems = Storage.get('menuItems');
    const categories = Storage.get('menuCategories');
    const filterValue = document.getElementById('menuItemFilter')?.value || 'all';
    const searchQuery = document.getElementById('menuItemSearch')?.value.trim().toLowerCase() || '';
    const sortFilter = document.getElementById('menuItemSortFilter')?.value || 'date-desc';

    let filteredItems = filterValue === 'all'
        ? menuItems
        : menuItems.filter(item => {
            // Ensure both are numbers for comparison
            const itemCategoryId = typeof item.categoryId === 'number' ? item.categoryId : parseInt(item.categoryId);
            const filterCatId = parseInt(filterValue);
            return itemCategoryId === filterCatId;
        });

    // Apply search filter
    if (searchQuery) {
        filteredItems = filteredItems.filter(item => {
            const itemName = item.name.toLowerCase();
            return itemName.includes(searchQuery);
        });
    }

    // Apply sorting
    filteredItems.sort((a, b) => {
        if (sortFilter === 'date-desc') {
            // Sort by ID descending (newest first, since ID is based on Date.now())
            return (b.id || 0) - (a.id || 0);
        } else if (sortFilter === 'date-asc') {
            // Sort by ID ascending (oldest first)
            return (a.id || 0) - (b.id || 0);
        } else if (sortFilter === 'name-asc') {
            return a.name.localeCompare(b.name);
        } else if (sortFilter === 'name-desc') {
            return b.name.localeCompare(a.name);
        } else if (sortFilter === 'price-asc') {
            return (a.price || 0) - (b.price || 0);
        } else if (sortFilter === 'price-desc') {
            return (b.price || 0) - (a.price || 0);
        } else if (sortFilter === 'category-asc' || sortFilter === 'category-desc') {
            // Get category names for comparison
            const aCategoryId = typeof a.categoryId === 'number' ? a.categoryId : parseInt(a.categoryId);
            const bCategoryId = typeof b.categoryId === 'number' ? b.categoryId : parseInt(b.categoryId);
            const aCategory = categories.find(c => {
                const catId = typeof c.id === 'number' ? c.id : parseInt(c.id);
                return catId === aCategoryId;
            });
            const bCategory = categories.find(c => {
                const catId = typeof c.id === 'number' ? c.id : parseInt(c.id);
                return catId === bCategoryId;
            });
            const aCategoryName = aCategory ? aCategory.name : '';
            const bCategoryName = bCategory ? bCategory.name : '';

            if (sortFilter === 'category-asc') {
                return aCategoryName.localeCompare(bCategoryName);
            } else {
                return bCategoryName.localeCompare(aCategoryName);
            }
        }
        return 0;
    });

    const tbody = document.getElementById('menuItemTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    const countEl = document.getElementById('menuItemCount');
    if (countEl) countEl.textContent = 'Count: ' + filteredItems.length;

    const favorites = Storage.get('favorites') || [];
    const recipesMap = typeof getItemRecipesMap === 'function' ? getItemRecipesMap() : (Storage.get('itemRecipes') || {});
    const stocks = typeof syncAndGetStockItems === 'function' ? syncAndGetStockItems() : (Storage.get('stocks') || []);
    const stockById = {};
    stocks.forEach(s => { stockById[String(s.id)] = s; });

    filteredItems.forEach(item => {
        // Ensure type-safe comparison when finding category
        const itemCategoryId = typeof item.categoryId === 'number' ? item.categoryId : parseInt(item.categoryId);
        const category = categories.find(c => {
            const catId = typeof c.id === 'number' ? c.id : parseInt(c.id);
            return catId === itemCategoryId;
        });
        const isFavorite = favorites.includes(item.id);

        const tr = document.createElement('tr');
        tr.setAttribute('data-item-id', item.id);
        tr.innerHTML = `
            <td class="category-cell">${category ? category.name : 'N/A'}</td>
            <td class="name-cell">
                <div style="font-weight: 700; color: #1e293b; font-size: 14.5px;">${escapeHtml(item.name)}</div>
            </td>
            <td class="price-cell">Rs.${formatNumber(item.price)}</td>
            <td class="image-cell" style="text-align: center; padding: 8px;">
                ${item.image ? `<img src="${item.image}" alt="${item.name}" style="max-width: 60px; max-height: 60px; border-radius: 4px; border: 1px solid #e0e0e0; object-fit: cover;">` : '<span style="color: #999; font-size: 12px;">No image</span>'}
            </td>
            <td class="actions-cell">
                <div class="table-actions-cell">
                    <button class="btn-action btn-action-edit" onclick="editMenuItemInline(${item.id})" title="Edit Item">${ICONS.edit}</button>
                    <button class="btn-action btn-action-delete" onclick="deleteMenuItem(${item.id}, this)" title="Delete Item">${ICONS.delete}</button>
                    <button class="btn-action btn-action-favorite ${isFavorite ? 'active' : ''}" onclick="${isFavorite ? `removeFromFavorites(${item.id})` : `addToFavorites(${item.id})`}" title="${isFavorite ? 'Remove from Favourites' : 'Add to Favourites'}">
                        ${isFavorite ? ICONS.starFilled : ICONS.star}
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.editMenuItemInline = (id) => {
    // Require password before editing
    openActionPasswordModal(() => {
        const menuItems = Storage.get('menuItems');
        const categories = Storage.get('menuCategories');
        const item = menuItems.find(i => i.id === id);
        if (!item) return;

        const tr = document.querySelector(`tr[data-item-id="${id}"]`);
        if (!tr) return;

        editMenuItemInlineInternal(id, item, categories, tr);
    });
};

function editMenuItemInlineInternal(id, item, categories, tr) {

    // Get current values
    const itemCategoryId = typeof item.categoryId === 'number' ? item.categoryId : parseInt(item.categoryId);
    const currentCategory = categories.find(c => {
        const catId = typeof c.id === 'number' ? c.id : parseInt(c.id);
        return catId === itemCategoryId;
    });

    // Create category dropdown
    let categoryOptions = '<option value="">Select Category</option>';
    categories.forEach(cat => {
        const selected = (typeof cat.id === 'number' ? cat.id : parseInt(cat.id)) === itemCategoryId ? 'selected' : '';
        categoryOptions += `<option value="${cat.id}" ${selected}>${cat.name}</option>`;
    });

    // Replace cells with editable inputs
    tr.innerHTML = `
        <td class="category-cell">
            <select class="inline-edit-category" style="width: 100%; padding: 6px; border: 2px solid #4a90e2; border-radius: 4px; font-size: 14px;">
                ${categoryOptions}
            </select>
        </td>
        <td class="name-cell">
            <input type="text" class="inline-edit-name" value="${item.name}" style="width: 100%; padding: 6px; border: 2px solid #4a90e2; border-radius: 4px; font-size: 14px; box-sizing: border-box;">
        </td>
        <td class="price-cell">
            <input type="number" class="inline-edit-price" value="${item.price}" step="1" min="0" style="width: 100%; padding: 6px; border: 2px solid #4a90e2; border-radius: 4px; font-size: 14px; box-sizing: border-box;">
        </td>
        <td class="image-cell" style="vertical-align: top; padding: 8px;">
            <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
                ${item.image ? `
                    <div style="margin-bottom: 4px;">
                        <img src="${item.image}" alt="Current image" style="max-width: 80px; max-height: 80px; border-radius: 4px; border: 2px solid #e0e0e0; object-fit: cover;">
                    </div>
                ` : '<div style="color: #999; font-size: 12px; margin-bottom: 4px;">No image</div>'}
                <input type="file" class="inline-edit-image" accept="image/*" style="font-size: 12px; padding: 4px;">
                ${item.image ? `<button type="button" class="inline-edit-remove-image" onclick="removeImageFromEdit(${id})" style="background: #e74c3c; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: 500; margin-top: 4px;">Remove Image</button>` : ''}
            </div>
        </td>
        <td class="actions-cell">
            <div class="table-actions-cell">
                <button class="btn-action btn-action-save" onclick="saveMenuItemInline(${id})" title="Save">${ICONS.check}</button>
                <button class="btn-action btn-action-cancel" onclick="cancelMenuItemInline(${id})" title="Cancel">${ICONS.cross}</button>
            </div>
        </td>
    `;

    // Add image preview handler
    const imageInput = tr.querySelector('.inline-edit-image');
    if (imageInput) {
        imageInput.onchange = function (e) {
            const file = e.target.files[0];
            if (file) {
                // Clear remove image flag if a new image is selected
                delete tr.dataset.removeImage;

                const reader = new FileReader();
                reader.onload = function (event) {
                    // Update the preview image if it exists, or create a new preview
                    const imageCell = tr.querySelector('.image-cell');
                    const existingPreview = imageCell.querySelector('img');
                    if (existingPreview) {
                        existingPreview.src = event.target.result;
                    } else {
                        const noImageDiv = imageCell.querySelector('div[style*="No image"]');
                        if (noImageDiv) {
                            noImageDiv.innerHTML = `<img src="${event.target.result}" alt="Preview" style="max-width: 80px; max-height: 80px; border-radius: 4px; border: 2px solid #e0e0e0; object-fit: cover;">`;
                        }
                    }
                    // Show remove button if not already shown
                    if (!imageCell.querySelector('.inline-edit-remove-image')) {
                        const removeBtn = document.createElement('button');
                        removeBtn.type = 'button';
                        removeBtn.className = 'inline-edit-remove-image';
                        removeBtn.onclick = () => removeImageFromEdit(id);
                        removeBtn.textContent = 'Remove Image';
                        removeBtn.style.cssText = 'background: #e74c3c; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: 500; margin-top: 4px;';
                        imageCell.querySelector('div').appendChild(removeBtn);
                    }
                };
                reader.readAsDataURL(file);
            }
        };
    }
};

window.removeImageFromEdit = (id) => {
    const tr = document.querySelector(`tr[data-item-id="${id}"]`);
    if (!tr) return;

    // Set flag to remove image when saving
    tr.dataset.removeImage = 'true';

    // Update the UI to show "No image"
    const imageCell = tr.querySelector('.image-cell');
    if (imageCell) {
        const div = imageCell.querySelector('div');
        if (div) {
            // Remove existing image preview
            const img = div.querySelector('img');
            if (img) {
                img.remove();
            }

            // Show "No image" text
            const noImageDiv = div.querySelector('div[style*="No image"]');
            if (!noImageDiv) {
                const noImageText = document.createElement('div');
                noImageText.style.cssText = 'color: #999; font-size: 12px; margin-bottom: 4px;';
                noImageText.textContent = 'No image';
                div.insertBefore(noImageText, div.firstChild);
            }

            // Remove the remove button
            const removeBtn = div.querySelector('.inline-edit-remove-image');
            if (removeBtn) {
                removeBtn.remove();
            }

            // Clear the file input
            const imageInput = div.querySelector('.inline-edit-image');
            if (imageInput) {
                imageInput.value = '';
            }
        }
    }
};

window.saveMenuItemInline = (id) => {
    const menuItems = Storage.get('menuItems');
    const item = menuItems.find(i => i.id === id);
    if (!item) return;

    const tr = document.querySelector(`tr[data-item-id="${id}"]`);
    if (!tr) return;

    const categorySelect = tr.querySelector('.inline-edit-category');
    const nameInput = tr.querySelector('.inline-edit-name');
    const priceInput = tr.querySelector('.inline-edit-price');
    const imageInput = tr.querySelector('.inline-edit-image');
    const imageFile = imageInput?.files[0];

    const newCategoryId = parseInt(categorySelect.value);
    const newName = nameInput.value.trim();
    const newPrice = parseInt(priceInput.value);

    if (!newCategoryId) {
        alert('Please select a category');
        return;
    }

    if (!newName) {
        alert('Please enter an item name');
        return;
    }

    if (!newPrice || newPrice < 0) {
        alert('Please enter a valid price');
        return;
    }

    // Check if image should be removed
    const shouldRemoveImage = tr.dataset.removeImage === 'true';

    // Convert new image to base64 if provided
    if (imageFile) {
        convertImageToBase64(imageFile, (imageData) => {
            updateMenuItemWithImage(id, newCategoryId, newName, newPrice, imageData, shouldRemoveImage);
        });
    } else {
        // No new image, but check if we should remove existing one
        const newImageData = shouldRemoveImage ? null : (item.image || null);
        updateMenuItemWithImage(id, newCategoryId, newName, newPrice, newImageData, false);
    }
};

// Helper function to update menu item with image
function updateMenuItemWithImage(id, newCategoryId, newName, newPrice, imageData, shouldRemoveImage) {
    const menuItems = Storage.get('menuItems');
    const index = menuItems.findIndex(i => i.id === id);
    if (index !== -1) {
        const oldItem = menuItems[index];
        const oldName = oldItem.name;
        const oldPrice = oldItem.price;
        // Use new image data if provided, otherwise keep existing (unless removing)
        const finalImage = shouldRemoveImage ? null : (imageData !== undefined ? imageData : (oldItem.image || null));
        menuItems[index] = { id: id, categoryId: newCategoryId, name: newName, price: newPrice, image: finalImage };

        // If category changed, update the order
        if (oldItem.categoryId !== newCategoryId) {
            const itemOrder = Storage.get('menuItemOrder') || {};
            const oldCategoryKey = oldItem.categoryId.toString();
            const newCategoryKey = newCategoryId.toString();

            // Remove from old category order
            if (itemOrder[oldCategoryKey]) {
                itemOrder[oldCategoryKey] = itemOrder[oldCategoryKey].filter(itemId => itemId !== id);
            }

            // Add to new category order
            if (!itemOrder[newCategoryKey]) {
                itemOrder[newCategoryKey] = [];
            }
            if (!itemOrder[newCategoryKey].includes(id)) {
                itemOrder[newCategoryKey].push(id);
            }

            Storage.set('menuItemOrder', itemOrder);
        }

        // Update item name and price in hold orders
        if (oldName !== newName || oldPrice !== newPrice) {
            const holdOrders = Storage.get('holdOrders') || [];
            holdOrders.forEach(order => {
                if (order.items && Array.isArray(order.items)) {
                    order.items.forEach(item => {
                        if (item.id === id) {
                            item.name = newName;
                            item.price = newPrice;
                            // Recalculate total if price changed
                            if (oldPrice !== newPrice) {
                                item.total = newPrice * (item.quantity || 1);
                            }
                        }
                    });
                    // Recalculate order totals if price changed
                    if (oldPrice !== newPrice) {
                        order.subtotal = order.items.reduce((sum, item) => sum + (item.total || item.price * item.quantity), 0);
                        order.tax = 0;
                        order.total = order.subtotal;
                    }
                }
            });
            Storage.set('holdOrders', holdOrders);
        }

        // Update item name and price in sales
        if (oldName !== newName || oldPrice !== newPrice) {
            const sales = Storage.get('sales') || [];
            sales.forEach(sale => {
                if (sale.items && Array.isArray(sale.items)) {
                    let saleUpdated = false;
                    sale.items.forEach(item => {
                        // Match by ID if available, otherwise match by name (for backward compatibility)
                        if ((item.id === id) || (!item.id && item.name === oldName)) {
                            item.name = newName;
                            item.price = newPrice;
                            // Add ID if missing for future updates
                            if (!item.id) {
                                item.id = id;
                            }
                            // Recalculate total if price changed
                            if (oldPrice !== newPrice) {
                                item.total = newPrice * (item.quantity || 1);
                                saleUpdated = true;
                            }
                        }
                    });
                    // Recalculate sale totals if price changed
                    if (saleUpdated) {
                        sale.subtotal = sale.items.reduce((sum, item) => sum + (item.total || item.price * item.quantity), 0);
                        sale.tax = 0;
                        sale.total = sale.subtotal;
                    }
                }
            });
            Storage.set('sales', sales);
        }

        // Update item name and price in current cart
        if (oldName !== newName || oldPrice !== newPrice) {
            cart.forEach(cartItem => {
                if (cartItem.id === id) {
                    cartItem.name = newName;
                    cartItem.price = newPrice;
                }
            });
            updateCart();
        }
    }

    Storage.set('menuItems', menuItems);
    loadMenuItemsList();
    loadMenuCategories();
    updateCategoryDropdowns();

    // Refresh views if they're active
    if (document.getElementById('pos')?.classList.contains('active')) {
        loadCategories();
        loadMenuItems();
    }
    if (document.getElementById('holdOrders')?.classList.contains('active')) {
        loadHoldOrders();
    }
    if (document.getElementById('sales')?.classList.contains('active')) {
        loadSales();
    }
};

window.cancelMenuItemInline = (id) => {
    // Clear any image removal flag
    const tr = document.querySelector(`tr[data-item-id="${id}"]`);
    if (tr) {
        delete tr.dataset.removeImage;
    }
    loadMenuItemsList();
};

// Keep old function for backward compatibility but make it call inline version
window.editMenuItem = (id) => {
    editMenuItemInline(id);
};

window.deleteMenuItem = (id, buttonElement) => {
    // Require password before deletion
    openActionPasswordModal(() => {
        // Re-find the button element after password verification
        let btnElement = buttonElement;
        if (!btnElement) {
            // Try to find the button in the DOM
            const tr = document.querySelector(`tr[data-item-id="${id}"]`);
            if (tr) {
                btnElement = tr.querySelector('.btn-delete');
            }
        }

        if (btnElement && btnElement.parentElement) {
            showDeleteConfirmation(btnElement, deleteMenuItemConfirmed, id);
        } else {
            // If button not found, directly delete
            deleteMenuItemConfirmed(id);
        }
    });
};

function deleteMenuItemConfirmed(id) {
    const menuItems = Storage.get('menuItems');
    const itemToDelete = menuItems.find(item => item.id === id);
    const filtered = menuItems.filter(item => item.id !== id);
    Storage.set('menuItems', filtered);

    // Remove item from all category orders
    if (itemToDelete) {
        const itemOrder = Storage.get('menuItemOrder') || {};
        const categoryKey = itemToDelete.categoryId.toString();

        // Remove from specific category order
        if (itemOrder[categoryKey]) {
            itemOrder[categoryKey] = itemOrder[categoryKey].filter(itemId => itemId !== id);
        }

        // Remove from 'all' category order
        if (itemOrder['all']) {
            itemOrder['all'] = itemOrder['all'].filter(itemId => itemId !== id);
        }

        Storage.set('menuItemOrder', itemOrder);
    }

    loadMenuItemsList();
    loadMenuCategories();
    updateCategoryDropdowns();
    if (document.getElementById('pos')?.classList.contains('active')) {
        loadCategories();
        loadMenuItems();
    }
}

function updateCategoryDropdowns() {
    const categories = Storage.get('menuCategories');

    // Update menu item filter dropdown
    const filterSelect = document.getElementById('menuItemFilter');
    if (filterSelect) {
        const currentValue = filterSelect.value;
        filterSelect.innerHTML = '<option value="all">All Categories</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            filterSelect.appendChild(option);
        });
        filterSelect.value = currentValue;
    }
}

// Filter change handler
const menuItemFilter = document.getElementById('menuItemFilter');
if (menuItemFilter) {
    menuItemFilter.addEventListener('change', loadMenuItemsList);
}

// Sort change handler
const menuItemSortFilter = document.getElementById('menuItemSortFilter');
if (menuItemSortFilter) {
    menuItemSortFilter.addEventListener('change', loadMenuItemsList);
}

// Search functionality
window.searchMenuItems = () => {
    loadMenuItemsList();
};

// Sales Management - Form removed, only displaying sales history

// ==========================================
// TIME FILTER GLOBAL HELPERS & HANDLERS
// ==========================================
function getLocalISODate(dateObj = new Date()) {
    const d = new Date(dateObj);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split('T')[0];
}

function getLocalISOMonth(dateObj = new Date()) {
    return getLocalISODate(dateObj).substring(0, 7);
}

function getFilterYearOptions(selectedYear) {
    const currentYear = new Date().getFullYear();
    const target = Number(selectedYear) || currentYear;
    let options = '';
    const maxYear = Math.max(currentYear + 2, target);
    const minYear = Math.min(2020, target);
    for (let y = maxYear; y >= minYear; y--) {
        options += `<option value="${y}" ${y === target ? 'selected' : ''}>${y}</option>`;
    }
    return options;
}

// Sales History Filter Handlers
window.handleSalesDateFilterChange = function() {
    const filterSelect = document.getElementById('salesDateFilter');
    const container = document.getElementById('salesTimeValueContainer');
    if (!filterSelect || !container) return;

    const filter = filterSelect.value;
    const todayStr = getLocalISODate();
    const monthStr = getLocalISOMonth();
    const currentYear = new Date().getFullYear();

    if (filter === 'today') {
        container.innerHTML = `<input type="date" id="salesDateInput" value="${todayStr}" onchange="loadSales(); updateSalesResetBtn();" style="padding: 10px 14px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: white; outline: none; font-family: 'Inter', sans-serif;">`;
    } else if (filter === 'month') {
        container.innerHTML = `<input type="month" id="salesMonthInput" value="${monthStr}" onchange="loadSales(); updateSalesResetBtn();" style="padding: 10px 14px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: white; outline: none; font-family: 'Inter', sans-serif;">`;
    } else if (filter === 'year') {
        container.innerHTML = `<select id="salesYearInput" onchange="loadSales(); updateSalesResetBtn();" style="padding: 10px 14px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: white; outline: none; font-family: 'Inter', sans-serif; cursor: pointer;">${getFilterYearOptions(currentYear)}</select>`;
    } else {
        container.innerHTML = '';
    }

    updateSalesResetBtn();
    loadSales();
};

window.updateSalesResetBtn = function() {
    const filterSelect = document.getElementById('salesDateFilter');
    const resetBtn = document.getElementById('salesResetFilterBtn');
    if (!filterSelect || !resetBtn) return;

    const filter = filterSelect.value;
    const dateInput = document.getElementById('salesDateInput');
    const todayStr = getLocalISODate();

    let isDefault = (filter === 'today' && (!dateInput || dateInput.value === todayStr));
    resetBtn.style.display = isDefault ? 'none' : 'inline-flex';
};

window.resetSalesFilter = function() {
    const filterSelect = document.getElementById('salesDateFilter');
    if (filterSelect) {
        filterSelect.value = 'today';
        handleSalesDateFilterChange();
    }
};

// Tax History Filter Handlers
window.handleTaxHistoryFilterChange = function() {
    const filterSelect = document.getElementById('taxHistoryFilter');
    const container = document.getElementById('taxHistoryTimeValueContainer');
    if (!filterSelect || !container) return;

    const filter = filterSelect.value;
    const todayStr = getLocalISODate();
    const monthStr = getLocalISOMonth();
    const currentYear = new Date().getFullYear();

    if (filter === 'today') {
        container.innerHTML = `<input type="date" id="taxHistoryDateInput" value="${todayStr}" onchange="loadTaxHistory(); updateTaxHistoryResetBtn();" style="padding: 10px 14px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: white; outline: none; font-family: 'Inter', sans-serif;">`;
    } else if (filter === 'month') {
        container.innerHTML = `<input type="month" id="taxHistoryMonthInput" value="${monthStr}" onchange="loadTaxHistory(); updateTaxHistoryResetBtn();" style="padding: 10px 14px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: white; outline: none; font-family: 'Inter', sans-serif;">`;
    } else if (filter === 'year') {
        container.innerHTML = `<select id="taxHistoryYearInput" onchange="loadTaxHistory(); updateTaxHistoryResetBtn();" style="padding: 10px 14px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: white; outline: none; font-family: 'Inter', sans-serif; cursor: pointer;">${getFilterYearOptions(currentYear)}</select>`;
    } else {
        container.innerHTML = '';
    }

    updateTaxHistoryResetBtn();
    loadTaxHistory();
};

window.updateTaxHistoryResetBtn = function() {
    const filterSelect = document.getElementById('taxHistoryFilter');
    const resetBtn = document.getElementById('taxHistoryResetFilterBtn');
    if (!filterSelect || !resetBtn) return;

    const filter = filterSelect.value;
    const dateInput = document.getElementById('taxHistoryDateInput');
    const todayStr = getLocalISODate();

    let isDefault = (filter === 'today' && (!dateInput || dateInput.value === todayStr));
    resetBtn.style.display = isDefault ? 'none' : 'inline-flex';
};

window.resetTaxHistoryFilter = function() {
    const filterSelect = document.getElementById('taxHistoryFilter');
    if (filterSelect) {
        filterSelect.value = 'today';
        handleTaxHistoryFilterChange();
    }
};

// Items Sales Filter Handlers
window.handleItemsSalesDateFilterChange = function() {
    const filterSelect = document.getElementById('itemsSalesDateFilter');
    const container = document.getElementById('itemsSalesTimeValueContainer');
    if (!filterSelect || !container) return;

    const filter = filterSelect.value;
    const todayStr = getLocalISODate();
    const monthStr = getLocalISOMonth();
    const currentYear = new Date().getFullYear();

    if (filter === 'today') {
        container.innerHTML = `<input type="date" id="itemsSalesDateInput" value="${todayStr}" onchange="loadItemsSales(); updateItemsSalesResetBtn();" style="padding: 10px 14px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: white; outline: none; font-family: 'Inter', sans-serif;">`;
    } else if (filter === 'month') {
        container.innerHTML = `<input type="month" id="itemsSalesMonthInput" value="${monthStr}" onchange="loadItemsSales(); updateItemsSalesResetBtn();" style="padding: 10px 14px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: white; outline: none; font-family: 'Inter', sans-serif;">`;
    } else if (filter === 'year') {
        container.innerHTML = `<select id="itemsSalesYearInput" onchange="loadItemsSales(); updateItemsSalesResetBtn();" style="padding: 10px 14px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: white; outline: none; font-family: 'Inter', sans-serif; cursor: pointer;">${getFilterYearOptions(currentYear)}</select>`;
    } else {
        container.innerHTML = '';
    }

    updateItemsSalesResetBtn();
    loadItemsSales();
};

window.updateItemsSalesResetBtn = function() {
    const filterSelect = document.getElementById('itemsSalesDateFilter');
    const resetBtn = document.getElementById('itemsSalesResetFilterBtn');
    if (!filterSelect || !resetBtn) return;

    const filter = filterSelect.value;
    const dateInput = document.getElementById('itemsSalesDateInput');
    const todayStr = getLocalISODate();

    let isDefault = (filter === 'today' && (!dateInput || dateInput.value === todayStr));
    resetBtn.style.display = isDefault ? 'none' : 'inline-flex';
};

window.resetItemsSalesFilter = function() {
    const filterSelect = document.getElementById('itemsSalesDateFilter');
    if (filterSelect) {
        filterSelect.value = 'today';
        handleItemsSalesDateFilterChange();
    }
};

// Expense Filter Handlers
window.handleExpenseDateFilterChange = function() {
    const filterSelect = document.getElementById('expenseDateFilter');
    const container = document.getElementById('expenseTimeValueContainer');
    if (!filterSelect || !container) return;

    const filter = filterSelect.value;
    const todayStr = getLocalISODate();
    const monthStr = getLocalISOMonth();
    const currentYear = new Date().getFullYear();

    if (filter === 'today') {
        container.innerHTML = `<input type="date" id="expenseDateInput" value="${todayStr}" onchange="loadExpenses(); updateExpenseResetBtn();" style="padding: 10px 14px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: white; outline: none; font-family: 'Inter', sans-serif;">`;
    } else if (filter === 'month') {
        container.innerHTML = `<input type="month" id="expenseMonthInput" value="${monthStr}" onchange="loadExpenses(); updateExpenseResetBtn();" style="padding: 10px 14px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: white; outline: none; font-family: 'Inter', sans-serif;">`;
    } else if (filter === 'year') {
        container.innerHTML = `<select id="expenseYearInput" onchange="loadExpenses(); updateExpenseResetBtn();" style="padding: 10px 14px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: white; outline: none; font-family: 'Inter', sans-serif; cursor: pointer;">${getFilterYearOptions(currentYear)}</select>`;
    } else {
        container.innerHTML = '';
    }

    updateExpenseResetBtn();
    loadExpenses();
};

window.updateExpenseResetBtn = function() {
    const filterSelect = document.getElementById('expenseDateFilter');
    const resetBtn = document.getElementById('expenseResetFilterBtn');
    if (!filterSelect || !resetBtn) return;

    const filter = filterSelect.value;
    const dateInput = document.getElementById('expenseDateInput');
    const todayStr = getLocalISODate();

    let isDefault = (filter === 'today' && (!dateInput || dateInput.value === todayStr));
    resetBtn.style.display = isDefault ? 'none' : 'inline-flex';
};

window.resetExpenseFilter = function() {
    const filterSelect = document.getElementById('expenseDateFilter');
    if (filterSelect) {
        filterSelect.value = 'today';
        handleExpenseDateFilterChange();
    }
};

window.loadSales = function loadSales() {
    const sales = Storage.get('sales') || [];
    const tbody = document.getElementById('salesTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    // Get filter values
    const dateFilter = document.getElementById('salesDateFilter')?.value || 'all';
    const paymentFilter = document.getElementById('salesPaymentFilter')?.value || 'all';
    const sortFilter = document.getElementById('salesSortFilter')?.value || 'date-desc';

    // Populate tables filter dropdown
    const tableFilterSelect = document.getElementById('salesTableFilter');
    let tableFilter = 'all';
    if (tableFilterSelect) {
        tableFilter = tableFilterSelect.value || 'all';
        const tables = Storage.get('tables') || [];
        tableFilterSelect.innerHTML = '<option value="all">All Tables</option>';
        // Sort tables by number
        tables.sort((a, b) => a.number - b.number).forEach(t => {
            const option = document.createElement('option');
            option.value = String(t.number);
            option.textContent = `Table ${t.number}`;
            tableFilterSelect.appendChild(option);
        });
        tableFilterSelect.value = tableFilter;
    }

    // Group sales by orderId if they have one, otherwise group by date/time for old sales
    const orderMap = {};
    const ungroupedSales = [];

    // First pass: separate grouped orders from individual items
    sales.forEach(sale => {
        if (sale.items && Array.isArray(sale.items)) {
            // Already grouped as order
            const orderId = sale.orderId || sale.id;
            orderMap[orderId] = sale;
        } else {
            // Individual item (old format)
            ungroupedSales.push(sale);
        }
    });

    // Group ungrouped sales by date/time (within 5 seconds) and payment method
    const groupedByTime = {};
    ungroupedSales.forEach(sale => {
        const saleDate = new Date(sale.date);
        const timeKey = Math.floor(saleDate.getTime() / 5000) * 5000; // Group by 5-second intervals
        const groupKey = `${timeKey}-${(sale.paymentMethod || 'cash')}`;

        if (!groupedByTime[groupKey]) {
            groupedByTime[groupKey] = {
                id: `ORD-${timeKey}`,
                orderId: `ORD-${timeKey}`,
                date: sale.date,
                paymentMethod: sale.paymentMethod || 'cash',
                items: [],
                total: 0,
                subtotal: 0,
                tax: 0
            };
        }

        groupedByTime[groupKey].items.push({
            name: sale.itemName || sale.dishName || 'Unknown',
            quantity: sale.quantity,
            price: sale.price,
            total: sale.total
        });
        groupedByTime[groupKey].total += sale.total;
        groupedByTime[groupKey].subtotal += sale.total;
    });

    // Calculate tax for grouped orders
    Object.values(groupedByTime).forEach(order => {
        order.tax = 0;
        order.total = order.subtotal;
        orderMap[order.orderId] = order;
    });

    // Convert to array
    let orders = Object.values(orderMap);

    // Apply date filter
    const selectedDate = document.getElementById('salesDateInput')?.value || getLocalISODate();
    const selectedMonth = document.getElementById('salesMonthInput')?.value || getLocalISOMonth();
    const selectedYear = document.getElementById('salesYearInput')?.value || String(new Date().getFullYear());

    if (dateFilter !== 'all') {
        orders = orders.filter(order => {
            if (!order.date) return false;
            const orderDate = new Date(order.date);
            if (isNaN(orderDate.getTime())) return false;
            const isoDate = getLocalISODate(orderDate);

            if (dateFilter === 'today') {
                return isoDate === selectedDate;
            } else if (dateFilter === 'month') {
                return isoDate.substring(0, 7) === selectedMonth;
            } else if (dateFilter === 'year') {
                return String(orderDate.getFullYear()) === String(selectedYear);
            }
            return true;
        });
    }

    // Apply payment method filter
    if (paymentFilter !== 'all') {
        orders = orders.filter(order => {
            const method = (order.paymentMethod || 'cash').toLowerCase().trim();
            const filterValue = paymentFilter.toLowerCase().trim();
            const matches = method === filterValue;
            return matches;
        });
    }

    // Apply table filter
    if (tableFilter !== 'all') {
        orders = orders.filter(order => String(order.tableNo) === tableFilter);
    }

    // Apply sorting
    if (sortFilter === 'date-desc') {
        orders.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortFilter === 'date-asc') {
        orders.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortFilter === 'amount-desc') {
        orders.sort((a, b) => (b.total || 0) - (a.total || 0));
    } else if (sortFilter === 'amount-asc') {
        orders.sort((a, b) => (a.total || 0) - (b.total || 0));
    }

    orders.forEach(order => {
        const tr = document.createElement('tr');
        const orderDate = new Date(order.date);
        const dateStr = formatDate(orderDate);
        const timeStr = formatTime(orderDate);

        // Use orderId if available, otherwise use id
        const orderIdentifier = order.orderId || order.id;
        const displayOrderNumber = (order.orderNumber || extractOrderNumber(orderIdentifier) || '').toString().padStart(7, '0');
        let paymentMethod = formatLocation(order.paymentMethod);
        if (order.tableNo) {
            paymentMethod += ` (T ${order.tableNo})`;
        }

        const waiterName = order.waiter ? escapeHtml(order.waiter) : '-';
        const customerName = order.customerName ? escapeHtml(order.customerName) : '-';
        tr.innerHTML = `
            <td>#${displayOrderNumber}</td>
            <td>${dateStr} ${timeStr}</td>
            <td>${paymentMethod}</td>
            <td>${customerName}</td>
            <td>${waiterName}</td>
            <td>Rs.${formatNumber(order.total || 0)}</td>
            <td>
                <div class="table-actions-cell">
                    <button class="btn-action btn-action-view" onclick="viewSale('${orderIdentifier}')" title="View Sale Details">${ICONS.view}</button>
                    <button class="btn-action btn-action-print" onclick="printReceiptForSale('${orderIdentifier}')" title="Print Receipt">${ICONS.print}</button>
                    <button class="btn-action btn-action-delete" onclick="deleteSale('${orderIdentifier}', this)" title="Delete Sale">${ICONS.delete}</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Update summary (based on filtered orders)
    const totalOrders = orders.length;

    const countEl = document.getElementById('salesCount');
    if (countEl) countEl.textContent = 'Count: ' + orders.length;

    // Calculate today's sales from filtered orders
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    today.setHours(0, 0, 0, 0);
    const todayEnd = new Date(today);
    todayEnd.setHours(23, 59, 59, 999);

    const todaySales = orders
        .filter(o => {
            if (!o.date) return false;
            const orderDate = new Date(o.date);
            return orderDate >= today && orderDate <= todayEnd;
        })
        .reduce((sum, o) => sum + (o.total || 0), 0);

    // Calculate this week's sales (Monday to Sunday)
    const currentDay = now.getDay();
    const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1; // Convert Sunday (0) to 6
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - daysFromMonday);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const weekSales = orders
        .filter(o => {
            if (!o.date) return false;
            const orderDate = new Date(o.date);
            return orderDate >= weekStart && orderDate <= weekEnd;
        })
        .reduce((sum, o) => sum + (o.total || 0), 0);

    // Calculate overall stats from all orders in store
    const allStoredOrders = Object.values(orderMap);
    const thisYearNum = now.getFullYear();
    const thisMonthIso = getLocalISOMonth(now);

    const yearSales = allStoredOrders
        .filter(o => {
            if (!o.date) return false;
            const orderDate = new Date(o.date);
            return !isNaN(orderDate.getTime()) && orderDate.getFullYear() === thisYearNum;
        })
        .reduce((sum, o) => sum + (o.total || 0), 0);

    const monthSales = allStoredOrders
        .filter(o => {
            if (!o.date) return false;
            const orderDate = new Date(o.date);
            return !isNaN(orderDate.getTime()) && getLocalISODate(orderDate).substring(0, 7) === thisMonthIso;
        })
        .reduce((sum, o) => sum + (o.total || 0), 0);

    // Calculate average order price (based on filtered orders)
    const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const averageOrderPrice = totalOrders > 0 ? totalSales / totalOrders : 0;

    // Calculate today's tax
    const todayTax = orders
        .filter(o => {
            if (!o.date) return false;
            const orderDate = new Date(o.date);
            return orderDate >= today && orderDate <= todayEnd;
        })
        .reduce((sum, o) => {
            // Exclude tax for Parcel/Delivery orders
            const paymentMethod = o.paymentMethod || 'cash';
            if (paymentMethod === 'delivery' || paymentMethod === 'parcel') {
                return sum; // No tax for parcel orders
            }
            // Use order.tax if available, otherwise calculate from subtotal
            if (o.tax) {
                return sum + o.tax;
            } else if (o.subtotal) {
                // Calculate tax from subtotal (5% of subtotal after discount)
                const discountAmount = o.discount && o.discount.amount ? o.discount.amount : 0;
                const discountedSubtotal = Math.max(0, o.subtotal - discountAmount);
                return sum + (discountedSubtotal * SALES_TAX_RATE);
            } else {
                // Fallback: estimate tax from total (assuming total includes tax)
                // If total is 105, subtotal is ~100, tax is ~5
                return sum + (o.total || 0) * (SALES_TAX_RATE / (1 + SALES_TAX_RATE));
            }
        }, 0);

    // Calculate weekly tax
    const weeklyTax = orders
        .filter(o => {
            if (!o.date) return false;
            const orderDate = new Date(o.date);
            return orderDate >= weekStart && orderDate <= weekEnd;
        })
        .reduce((sum, o) => {
            // Exclude tax for Parcel/Delivery orders
            const paymentMethod = o.paymentMethod || 'cash';
            if (paymentMethod === 'delivery' || paymentMethod === 'parcel') {
                return sum; // No tax for parcel orders
            }
            // Use order.tax if available, otherwise calculate from subtotal
            if (o.tax) {
                return sum + o.tax;
            } else if (o.subtotal) {
                // Calculate tax from subtotal (5% of subtotal after discount)
                const discountAmount = o.discount && o.discount.amount ? o.discount.amount : 0;
                const discountedSubtotal = Math.max(0, o.subtotal - discountAmount);
                return sum + (discountedSubtotal * SALES_TAX_RATE);
            } else {
                // Fallback: estimate tax from total (assuming total includes tax)
                return sum + (o.total || 0) * (SALES_TAX_RATE / (1 + SALES_TAX_RATE));
            }
        }, 0);

    // Calculate monthly tax
    const monthlyTax = orders
        .filter(o => {
            if (!o.date) return false;
            const orderDate = new Date(o.date);
            return orderDate >= monthStart && orderDate <= monthEnd;
        })
        .reduce((sum, o) => {
            // Exclude tax for Parcel/Delivery orders
            const paymentMethod = o.paymentMethod || 'cash';
            if (paymentMethod === 'delivery' || paymentMethod === 'parcel') {
                return sum; // No tax for parcel orders
            }
            // Use order.tax if available, otherwise calculate from subtotal
            if (o.tax) {
                return sum + o.tax;
            } else if (o.subtotal) {
                // Calculate tax from subtotal (5% of subtotal after discount)
                const discountAmount = o.discount && o.discount.amount ? o.discount.amount : 0;
                const discountedSubtotal = Math.max(0, o.subtotal - discountAmount);
                return sum + (discountedSubtotal * SALES_TAX_RATE);
            } else {
                // Fallback: estimate tax from total (assuming total includes tax)
                return sum + (o.total || 0) * (SALES_TAX_RATE / (1 + SALES_TAX_RATE));
            }
        }, 0);

    // Calculate annual tax
    const yearStart = new Date(now.getFullYear(), 0, 1);
    yearStart.setHours(0, 0, 0, 0);
    const yearEnd = new Date(now.getFullYear(), 11, 31);
    yearEnd.setHours(23, 59, 59, 999);

    const annualTax = orders
        .filter(o => {
            if (!o.date) return false;
            const orderDate = new Date(o.date);
            return orderDate >= yearStart && orderDate <= yearEnd;
        })
        .reduce((sum, o) => {
            // Exclude tax for Parcel/Delivery orders
            const paymentMethod = o.paymentMethod || 'cash';
            if (paymentMethod === 'delivery' || paymentMethod === 'parcel') {
                return sum; // No tax for parcel orders
            }
            // Use order.tax if available, otherwise calculate from subtotal
            if (o.tax) {
                return sum + o.tax;
            } else if (o.subtotal) {
                // Calculate tax from subtotal (5% of subtotal after discount)
                const discountAmount = o.discount && o.discount.amount ? o.discount.amount : 0;
                const discountedSubtotal = Math.max(0, o.subtotal - discountAmount);
                return sum + (discountedSubtotal * SALES_TAX_RATE);
            } else {
                // Fallback: estimate tax from total (assuming total includes tax)
                return sum + (o.total || 0) * (SALES_TAX_RATE / (1 + SALES_TAX_RATE));
            }
        }, 0);

    const totalOrdersEl = document.getElementById('totalOrders');
    const todaySalesEl = document.getElementById('todaySales');
    const yearSalesEl = document.getElementById('yearSales');
    const monthSalesEl = document.getElementById('monthSales');
    const averageOrderPriceEl = document.getElementById('averageOrderPrice');
    const taxTodayEl = document.getElementById('taxToday');
    const monthlyTaxEl = document.getElementById('monthlyTax');
    const annualTaxEl = document.getElementById('annualTax');

    if (totalOrdersEl) totalOrdersEl.textContent = formatNumber(totalOrders);
    if (todaySalesEl) todaySalesEl.textContent = `Rs.${formatNumber(totalSales)}`;
    if (yearSalesEl) yearSalesEl.textContent = `Rs.${formatNumber(yearSales)}`;
    if (monthSalesEl) monthSalesEl.textContent = `Rs.${formatNumber(monthSales)}`;
    if (averageOrderPriceEl) averageOrderPriceEl.textContent = `Rs.${formatNumber(averageOrderPrice)}`;
    if (taxTodayEl) taxTodayEl.textContent = `Rs.${formatNumber(todayTax)}`;
    if (monthlyTaxEl) monthlyTaxEl.textContent = `Rs.${formatNumber(monthlyTax)}`;
    if (annualTaxEl) annualTaxEl.textContent = `Rs.${formatNumber(annualTax)}`;

    // Also update Tax History tab cards
    const taxTodayHistoryEl = document.getElementById('taxTodayHistory');
    const monthlyTaxHistoryEl = document.getElementById('monthlyTaxHistory');
    const annualTaxHistoryEl = document.getElementById('annualTaxHistory');

    if (taxTodayHistoryEl) taxTodayHistoryEl.textContent = `Rs.${formatNumber(todayTax)}`;
    if (monthlyTaxHistoryEl) monthlyTaxHistoryEl.textContent = `Rs.${formatNumber(monthlyTax)}`;
    if (annualTaxHistoryEl) annualTaxHistoryEl.textContent = `Rs.${formatNumber(annualTax)}`;
}

window.loadTaxHistory = function loadTaxHistory() {
    const sales = Storage.get('sales') || [];
    const tbody = document.getElementById('taxHistoryTableBody');
    const filterSelect = document.getElementById('taxHistoryFilter');

    if (!tbody) return;

    const filter = filterSelect ? filterSelect.value : 'today';

    // Filter orders based on selected period
    let filteredSales = [...sales];
    const now = new Date();

    const selectedDate = document.getElementById('taxHistoryDateInput')?.value || getLocalISODate();
    const selectedMonth = document.getElementById('taxHistoryMonthInput')?.value || getLocalISOMonth();
    const selectedYear = document.getElementById('taxHistoryYearInput')?.value || String(new Date().getFullYear());

    if (filter !== 'all') {
        filteredSales = sales.filter(sale => {
            if (!sale.date) return false;
            const saleDate = new Date(sale.date);
            if (isNaN(saleDate.getTime())) return false;
            const isoDate = getLocalISODate(saleDate);

            if (filter === 'today') {
                return isoDate === selectedDate;
            } else if (filter === 'month') {
                return isoDate.substring(0, 7) === selectedMonth;
            } else if (filter === 'year') {
                return String(saleDate.getFullYear()) === String(selectedYear);
            }
            return true;
        });
    }
    // If filter === 'all', use all sales (filteredSales already contains all sales)

    // Sort by date (newest first)
    filteredSales.sort((a, b) => new Date(b.date) - new Date(a.date));

    tbody.innerHTML = '';

    const countEl = document.getElementById('taxHistoryCount');
    if (countEl) countEl.textContent = 'Count: ' + filteredSales.length;

    if (filteredSales.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 40px; color: #999;">No orders found</td></tr>';
        return;
    }

    filteredSales.forEach(sale => {
        const tr = document.createElement('tr');
        const orderDate = sale.date ? new Date(sale.date) : new Date();
        const dateStr = formatDate(orderDate);
        const timeStr = formatTime(orderDate);
        const displayOrderNumber = (sale.orderNumber || extractOrderNumber(sale.orderId || sale.id) || '').toString().padStart(7, '0');

        // Calculate tax - exclude tax for Parcel/Delivery orders
        const paymentMethod = sale.paymentMethod || 'cash';
        const isParcelOrder = (paymentMethod === 'delivery' || paymentMethod === 'parcel');

        let taxAmount = 0;
        if (!isParcelOrder) {
            if (sale.tax) {
                taxAmount = sale.tax;
            } else if (sale.subtotal) {
                const discountAmount = sale.discount && sale.discount.amount ? sale.discount.amount : 0;
                const discountedSubtotal = Math.max(0, sale.subtotal - discountAmount);
                taxAmount = discountedSubtotal * SALES_TAX_RATE;
            } else {
                // Fallback: estimate tax from total
                taxAmount = (sale.total || 0) * (SALES_TAX_RATE / (1 + SALES_TAX_RATE));
            }
        }

        const subtotal = sale.subtotal || 0;
        const discountAmount = sale.discount && sale.discount.amount ? sale.discount.amount : 0;
        const total = sale.total || 0;

        tr.innerHTML = `
            <td>#${displayOrderNumber}</td>
            <td>${dateStr} ${timeStr}</td>
            <td>${formatLocation(sale.paymentMethod)}</td>
            <td>Rs.${formatNumber(subtotal)}</td>
            <td>${discountAmount > 0 ? `-Rs.${formatNumber(discountAmount)}` : 'Rs.0'}</td>
            <td>Rs.${formatNumber(taxAmount)}</td>
            <td>Rs.${formatNumber(total)}</td>
            <td>
                <div class="table-actions-cell">
                    <button class="btn-action btn-action-print" onclick="printReceiptForSale('${sale.orderId || sale.id}')" title="Print Receipt">${ICONS.print}</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.printTaxHistory = () => {
    const sales = Storage.get('sales') || [];
    const printWindow = window.open('', '_blank');
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const currentDate = dateStr + ' ' + timeStr;

    // Get filter value (same as loadTaxHistory)
    const filter = document.getElementById('taxHistoryFilter')?.value || 'today';

    // Filter orders based on selected period (same logic as loadTaxHistory)
    let filteredSales = [...sales];
    const nowFilter = new Date();

    if (filter === 'today') {
        const today = new Date(nowFilter.getFullYear(), nowFilter.getMonth(), nowFilter.getDate());
        today.setHours(0, 0, 0, 0);
        const todayEnd = new Date(today);
        todayEnd.setHours(23, 59, 59, 999);
        filteredSales = sales.filter(sale => {
            if (!sale.date) return false;
            const saleDate = new Date(sale.date);
            return saleDate >= today && saleDate <= todayEnd;
        });
    } else if (filter === 'week') {
        const today = new Date(nowFilter.getFullYear(), nowFilter.getMonth(), nowFilter.getDate());
        today.setHours(0, 0, 0, 0);
        const currentDay = nowFilter.getDay();
        const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1;
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - daysFromMonday);
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);
        filteredSales = sales.filter(sale => {
            if (!sale.date) return false;
            const saleDate = new Date(sale.date);
            return saleDate >= weekStart && saleDate <= weekEnd;
        });
    } else if (filter === 'month') {
        const monthStart = new Date(nowFilter.getFullYear(), nowFilter.getMonth(), 1);
        monthStart.setHours(0, 0, 0, 0);
        const monthEnd = new Date(nowFilter.getFullYear(), nowFilter.getMonth() + 1, 0);
        monthEnd.setHours(23, 59, 59, 999);
        filteredSales = sales.filter(sale => {
            if (!sale.date) return false;
            const saleDate = new Date(sale.date);
            return saleDate >= monthStart && saleDate <= monthEnd;
        });
    } else if (filter === 'year') {
        const yearStart = new Date(nowFilter.getFullYear(), 0, 1);
        yearStart.setHours(0, 0, 0, 0);
        const yearEnd = new Date(nowFilter.getFullYear(), 11, 31);
        yearEnd.setHours(23, 59, 59, 999);
        filteredSales = sales.filter(sale => {
            if (!sale.date) return false;
            const saleDate = new Date(sale.date);
            return saleDate >= yearStart && saleDate <= yearEnd;
        });
    } else if (filter === 'specific-month') {
        const selectedMonth = document.getElementById('taxHistoryMonthFilter')?.value;
        if (selectedMonth) {
            const [year, month] = selectedMonth.split('-').map(Number);
            filteredSales = sales.filter(sale => {
                if (!sale.date) return false;
                const saleDate = new Date(sale.date);
                return saleDate.getFullYear() === year && (saleDate.getMonth() + 1) === month;
            });
        }
    }

    // Sort by date (newest first)
    filteredSales.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Get filter label
    let filterLabel = 'All Time';
    if (filter === 'today') filterLabel = 'Daily';
    else if (filter === 'week') filterLabel = 'Weekly';
    else if (filter === 'month') filterLabel = 'Monthly';
    else if (filter === 'year') filterLabel = 'Annual';
    else if (filter === 'specific-month') {
        const selectedMonth = document.getElementById('taxHistoryMonthFilter')?.value;
        filterLabel = selectedMonth ? `Month: ${selectedMonth}` : 'Specific Month';
    }

    // Build tax history table rows
    let taxRows = '';
    let totalTax = 0;
    let totalSubtotal = 0;
    let totalDiscount = 0;
    let totalAmount = 0;

    if (filteredSales.length === 0) {
        taxRows = '<tr><td colspan="5" style="text-align: center; padding: 10px;">No tax data available</td></tr>';
    } else {
        filteredSales.forEach(sale => {
            const orderDate = sale.date ? new Date(sale.date) : new Date();
            const dateStr = formatDate(orderDate);
            const timeStr = formatTime(orderDate);
            const displayOrderNumber = (sale.orderNumber || extractOrderNumber(sale.orderId || sale.id) || '').toString().padStart(7, '0');

            // Calculate tax - exclude tax for Parcel/Delivery orders
            const paymentMethod = sale.paymentMethod || 'cash';
            const isParcelOrder = (paymentMethod === 'delivery' || paymentMethod === 'parcel');

            let taxAmount = 0;
            if (!isParcelOrder) {
                if (sale.tax) {
                    taxAmount = sale.tax;
                } else if (sale.subtotal) {
                    const discountAmount = sale.discount && sale.discount.amount ? sale.discount.amount : 0;
                    const discountedSubtotal = Math.max(0, sale.subtotal - discountAmount);
                    taxAmount = discountedSubtotal * SALES_TAX_RATE;
                } else {
                    taxAmount = (sale.total || 0) * (SALES_TAX_RATE / (1 + SALES_TAX_RATE));
                }
            }

            const subtotal = sale.subtotal || 0;
            const discountAmount = sale.discount && sale.discount.amount ? sale.discount.amount : 0;
            const total = sale.total || 0;

            totalTax += taxAmount;
            totalSubtotal += subtotal;
            totalDiscount += discountAmount;
            totalAmount += total;

            taxRows += `
                <tr>
                    <td style="text-align: left; padding: 1px 2px;">#${displayOrderNumber}</td>
                    <td style="text-align: left; padding: 1px 2px; font-size: 8px;">${dateStr}<br>${timeStr}</td>
                    <td style="text-align: right; padding: 1px 2px;">Rs.${formatNumber(subtotal)}</td>
                    <td style="text-align: right; padding: 1px 2px;">Rs.${formatNumber(taxAmount)}</td>
                    <td style="text-align: right; padding: 1px 2px;">Rs.${formatNumber(total)}</td>
                </tr>
            `;
        });
    }

    // Build summary row
    const summaryRow = `
        <tr style="border-top: 2px solid #000; font-weight: 700;">
            <td style="text-align: left; padding: 2px 2px;">TOTAL</td>
            <td style="text-align: left; padding: 2px 2px;">${filteredSales.length} Orders</td>
            <td style="text-align: right; padding: 2px 2px;">Rs.${formatNumber(totalSubtotal)}</td>
            <td style="text-align: right; padding: 2px 2px;">Rs.${formatNumber(totalTax)}</td>
            <td style="text-align: right; padding: 2px 2px;">Rs.${formatNumber(totalAmount)}</td>
        </tr>
    `;

    printWindow.document.write(`
        <html>
            <head>
                <title>Tax History Report</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
                <style>
                    *, *::before, *::after {
                        box-sizing: border-box;
                        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
                    }
                    body {
                        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
                        padding: 10px;
                        font-size: 11px;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: center;
                        min-height: auto;
                        margin: 0;
                        max-width: 80mm;
                        margin: 0 auto;
                    }
                    .receipt-logo {
                        max-width: 100px;
                        max-height: 100px;
                        width: auto;
                        height: auto;
                        margin: 0 auto 8px auto;
                        display: block;
                        object-fit: contain;
                    }
                    .header-section {
                        text-align: center;
                        margin-bottom: 10px;
                        font-weight: 600;
                    }
                    .restaurant-name {
                        font-size: 16px;
                        font-weight: 900;
                        margin-bottom: 4px;
                    }
                    .report-title {
                        font-size: 14px;
                        font-weight: 700;
                        margin: 8px 0;
                    }
                    .report-info {
                        font-size: 10px;
                        margin: 4px 0;
                        font-weight: 600;
                    }
                    .separator {
                        border-top: 1px dashed #000;
                        margin: 6px 0;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 4px 0;
                        font-size: 9px;
                    }
                    thead {
                        border-bottom: 2px solid #000;
                    }
                    th {
                        padding: 6px 2px;
                        text-align: left;
                        font-weight: 700;
                        font-size: 10px;
                    }
                    th:nth-child(3),
                    th:nth-child(4),
                    th:nth-child(5) {
                        text-align: right;
                    }
                    td {
                        padding: 2px 2px;
                        border-bottom: 1px dotted #ccc;
                        font-size: 9px;
                        font-weight: 600;
                        line-height: 1.2;
                    }
                    td:nth-child(3),
                    td:nth-child(4),
                    td:nth-child(5) {
                        text-align: right;
                    }
                    .summary-section {
                        text-align: center;
                        margin-top: 8px;
                        font-size: 10px;
                        font-weight: 600;
                    }
                    @media print {
                        * {
                            margin: 0;
                            padding: 0;
                        }
                        body {
                            padding: 5mm 0;
                            margin: 0;
                            min-height: auto;
                            display: block;
                            height: auto;
                            max-width: 80mm;
                        }
                        .receipt-logo {
                            max-width: 80px;
                            max-height: 80px;
                            margin: 0 auto 6px auto;
                        }
                        table {
                            font-size: 9px;
                            border-spacing: 0;
                        }
                        th, td {
                            font-size: 9px;
                            padding: 1px 1px;
                            font-weight: 600 !important;
                            line-height: 1.2 !important;
                        }
                        .header-section, .report-info, .summary-section {
                            font-weight: 600 !important;
                        }
                        @page {
                            size: 80mm auto;
                            margin: 5mm;
                        }
                    }
                </style>
            </head>
            <body>

                <div class="header-section">
                    <div class="restaurant-name">Hangout Lounge & Co.</div>
                    <div class="report-info">Contact: 0300-9509536</div>
                    <div class="report-info">Wah Cantt</div>
                    <div class="separator"></div>
                    <div class="report-title">TAX HISTORY REPORT</div>
                    <div class="separator"></div>
                    <div class="report-info">Date: ${currentDate}</div>
                    <div class="report-info">Filter: ${filterLabel}</div>
                    <div class="separator"></div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Subtotal</th>
                            <th>GST (5%)</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${taxRows}
                        ${summaryRow}
                    </tbody>
                </table>
                <div class="summary-section">
                    <div class="separator"></div>
                    <div style="font-weight: 700; margin: 4px 0;">Total Tax: Rs.${formatNumber(totalTax)}</div>
                    <div style="margin: 4px 0;">Thank You!</div>
                    <div style="margin-top: 10px;"></div>
                </div>
                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                        }, 100);
                    };
                </script>
            </body>
        </html>
    `);
    printWindow.document.close();
};

window.loadItemsSales = function loadItemsSales() {
    const sales = Storage.get('sales') || [];
    const tbody = document.getElementById('itemsSalesTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    // Get filter values
    const dateFilter = document.getElementById('itemsSalesDateFilter')?.value || 'all';
    const sortFilter = document.getElementById('itemsSalesSortFilter')?.value || 'quantity-desc';
    const searchTerm = (document.getElementById('itemsSalesSearch')?.value || '').toLowerCase().trim();

    // Filter sales by date range
    let filteredSales = [...sales];
    const now = new Date();

    const selectedDate = document.getElementById('itemsSalesDateInput')?.value || getLocalISODate();
    const selectedMonth = document.getElementById('itemsSalesMonthInput')?.value || getLocalISOMonth();
    const selectedYear = document.getElementById('itemsSalesYearInput')?.value || String(new Date().getFullYear());

    if (dateFilter !== 'all') {
        filteredSales = sales.filter(sale => {
            if (!sale.date) return false;
            const saleDate = new Date(sale.date);
            if (isNaN(saleDate.getTime())) return false;
            const isoDate = getLocalISODate(saleDate);

            if (dateFilter === 'today') {
                return isoDate === selectedDate;
            } else if (dateFilter === 'month') {
                return isoDate.substring(0, 7) === selectedMonth;
            } else if (dateFilter === 'year') {
                return String(saleDate.getFullYear()) === String(selectedYear);
            }
            return true;
        });
    }
    // If dateFilter === 'all', use all sales (filteredSales already contains all sales)

    // Aggregate items from filtered sales
    const itemMap = {};

    filteredSales.forEach(sale => {

        // Process items from this sale
        if (sale.items && Array.isArray(sale.items)) {
            sale.items.forEach(item => {
                const itemName = item.name || 'Unknown';
                if (!itemMap[itemName]) {
                    itemMap[itemName] = {
                        name: itemName,
                        totalQuantity: 0,
                        totalRevenue: 0,
                        priceSum: 0,
                        priceCount: 0
                    };
                }

                const quantity = item.quantity || 0;
                const price = item.price || 0;
                const total = item.total || (price * quantity);

                itemMap[itemName].totalQuantity += quantity;
                itemMap[itemName].totalRevenue += total;
                itemMap[itemName].priceSum += price;
                itemMap[itemName].priceCount += 1;
            });
        } else {
            // Handle old format
            const itemName = sale.itemName || sale.dishName || 'Unknown';
            if (!itemMap[itemName]) {
                itemMap[itemName] = {
                    name: itemName,
                    totalQuantity: 0,
                    totalRevenue: 0,
                    priceSum: 0,
                    priceCount: 0
                };
            }

            const quantity = sale.quantity || 0;
            const price = sale.price || 0;
            const total = sale.total || (price * quantity);

            itemMap[itemName].totalQuantity += quantity;
            itemMap[itemName].totalRevenue += total;
            itemMap[itemName].priceSum += price;
            itemMap[itemName].priceCount += 1;
        }
    });

    // Convert to array and calculate averages
    let items = Object.values(itemMap).map(item => ({
        name: item.name,
        totalQuantity: item.totalQuantity,
        totalRevenue: item.totalRevenue,
        averagePrice: item.priceCount > 0 ? item.priceSum / item.priceCount : 0
    }));

    // Apply search filter
    if (searchTerm) {
        items = items.filter(item =>
            item.name.toLowerCase().includes(searchTerm)
        );
    }

    // Apply sorting
    if (sortFilter === 'quantity-desc') {
        items.sort((a, b) => b.totalQuantity - a.totalQuantity);
    } else if (sortFilter === 'quantity-asc') {
        items.sort((a, b) => a.totalQuantity - b.totalQuantity);
    } else if (sortFilter === 'revenue-desc') {
        items.sort((a, b) => b.totalRevenue - a.totalRevenue);
    } else if (sortFilter === 'revenue-asc') {
        items.sort((a, b) => a.totalRevenue - b.totalRevenue);
    } else if (sortFilter === 'name-asc') {
        items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortFilter === 'name-desc') {
        items.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Display items
    const countEl = document.getElementById('itemsSalesCount');
    if (countEl) countEl.textContent = 'Count: ' + items.length;

    if (items.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="4" style="text-align: center; padding: 20px; color: #999;">No sales data available</td>`;
        tbody.appendChild(tr);
    } else {
        items.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight: 600; color: #333;">${item.name}</td>
                <td>${item.totalQuantity}</td>
                <td style="font-weight: 600; color: #1e3a5f;">Rs. ${formatNumber(item.totalRevenue)}</td>
                <td>Rs. ${formatNumber(item.averagePrice)}</td>
            `;
            tbody.appendChild(tr);
        });
    }
}

window.switchSalesView = (view) => {
    const salesHistorySection = document.getElementById('salesHistorySection');
    const itemsSalesSection = document.getElementById('itemsSalesSection');
    const salesHistoryBtn = document.getElementById('salesHistoryBtn');
    const itemsSalesBtn = document.getElementById('itemsSalesBtn');

    if (!salesHistorySection || !itemsSalesSection || !salesHistoryBtn || !itemsSalesBtn) return;

    // Reset all buttons
    [salesHistoryBtn, itemsSalesBtn].forEach(btn => {
        btn.style.background = 'transparent';
        btn.style.color = '#666';
        btn.style.border = '1px solid transparent';
        btn.style.padding = '10px 18px';
        btn.style.fontSize = '16px';
        btn.style.fontWeight = '500';
        btn.style.boxShadow = 'none';
    });

    // Hide all sections
    salesHistorySection.style.display = 'none';
    itemsSalesSection.style.display = 'none';

    if (view === 'history') {
        salesHistorySection.style.display = 'block';
        salesHistoryBtn.style.background = '#4a90e2';
        salesHistoryBtn.style.color = '#ffffff';
        salesHistoryBtn.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        salesHistoryBtn.style.fontWeight = '600';
        salesHistoryBtn.style.boxShadow = '0 2px 4px rgba(74, 144, 226, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
    } else if (view === 'items') {
        itemsSalesSection.style.display = 'block';
        itemsSalesBtn.style.background = '#4a90e2';
        itemsSalesBtn.style.color = '#ffffff';
        itemsSalesBtn.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        itemsSalesBtn.style.fontWeight = '600';
        itemsSalesBtn.style.boxShadow = '0 2px 4px rgba(74, 144, 226, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
        loadItemsSales(); // Load data when switching to items view
    }
};

window.deleteSale = (orderId, buttonElement) => {
    // Require password before deletion
    openActionPasswordModal(() => {
        // Re-find the button element after password verification
        let btnElement = buttonElement;
        if (!btnElement || !btnElement.parentElement || !document.contains(buttonElement)) {
            // Try to find the button in the DOM by looking for the order row
            const salesRows = document.querySelectorAll('#salesTableBody tr');
            for (let row of salesRows) {
                const deleteBtn = row.querySelector('button[onclick*="deleteSale"]');
                if (deleteBtn) {
                    const onclickAttr = deleteBtn.getAttribute('onclick') || '';
                    if (onclickAttr.includes(`"${orderId}"`) || onclickAttr.includes(`'${orderId}'`) || onclickAttr.includes(`(${orderId},`)) {
                        btnElement = deleteBtn;
                        break;
                    }
                }
            }
        }

        if (btnElement && btnElement.parentElement && document.contains(btnElement)) {
            showDeleteConfirmation(btnElement, deleteSaleConfirmed, orderId);
        } else {
            // If button not found, directly delete (skip confirmation)
            deleteSaleConfirmed(orderId);
        }
    });
};

function deleteSaleConfirmed(orderId) {
    const sales = Storage.get('sales');
    // Delete all items with this orderId
    const filtered = sales.filter(s => s.orderId !== orderId && s.id !== orderId);
    Storage.set('sales', filtered);
    loadSales();
}

window.clearAllSales = () => {
    showCustomConfirm('Are you sure you want to clear ALL sales? This action cannot be undone!', () => {
        Storage.set('sales', []);
        loadSales();
        const itemsSalesSection = document.getElementById('itemsSalesSection');
        if (itemsSalesSection && itemsSalesSection.style.display !== 'none') {
            loadItemsSales();
        }
        showCustomAlert('All sales have been cleared.');
    }, null, { title: 'Clear All Sales', confirmText: 'Clear All', type: 'danger' });
};

window.viewSale = (orderId) => {
    const sales = Storage.get('sales');
    const order = sales.find(s => s.orderId === orderId || s.id === orderId);

    if (!order) {
        showCustomAlert('Order not found!');
        return;
    }

    const modal = document.getElementById('saleModal');
    const modalBody = document.getElementById('saleModalBody');

    if (!modal || !modalBody) return;

    const orderDate = new Date(order.date);
    const dateStr = formatDate(orderDate);
    const timeStr = formatTime(orderDate);
    const receiveTime = calculateReceiveTime(timeStr, orderDate, order.waitingTime);
    const displayOrderNumber = (order.orderNumber || extractOrderNumber(order.orderId || order.id) || '').toString().padStart(7, '0');
    const receiptHTML = generateFullReceiptHTML(order);

    modalBody.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4px 0 10px 0;">
            <!-- Thermal Receipt Preview Card -->
            <div style="background: #ffffff; width: 100%; max-width: 350px; padding: 20px 18px; border: 1.5px solid #d1d5db; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.07); color: #000;">
                ${receiptHTML}
            </div>

            <!-- Receipt Actions -->
            <div style="display: flex; gap: 12px; margin-top: 18px; width: 100%; max-width: 350px; justify-content: center;">
                <button type="button" onclick="closeSaleModal()" style="flex: 1; padding: 10px 16px; border-radius: 10px; border: 1.5px solid #d1d5db; background: #f3f4f6; color: #374151; font-weight: 600; font-size: 14px; cursor: pointer; font-family: 'Poppins', sans-serif;">Close</button>
                <button type="button" onclick="printReceiptForSale('${order.orderId || order.id}')" style="flex: 1; padding: 10px 16px; border-radius: 10px; border: none; background: #10b981; color: white; font-weight: 600; font-size: 14px; cursor: pointer; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3); display: flex; align-items: center; justify-content: center; gap: 6px; font-family: 'Poppins', sans-serif;">
                    <span>🖨️</span> Print
                </button>
            </div>
        </div>
    `;

    const headerTitle = modal.querySelector('.modal-header h3');
    if (headerTitle) headerTitle.textContent = `Receipt Preview - #${displayOrderNumber}`;

    modal.style.display = 'flex';
};

window.closeSaleModal = () => {
    const modal = document.getElementById('saleModal');
    if (modal) {
        modal.style.display = 'none';
    }
};

window.printReceiptForSale = (orderId) => {
    const sales = Storage.get('sales');
    const order = sales.find(s => s.orderId === orderId || s.id === orderId);

    if (!order) {
        showAppToast('Order not found!', 'error');
        return;
    }

    const displayOrderNumber = (order.orderNumber || extractOrderNumber(order.orderId || order.id) || '').toString().padStart(7, '0');
    const receiptHTML = generateFullReceiptHTML(order);
    openReceiptPrintWindow(receiptHTML, `Receipt - #${displayOrderNumber}`);
};

// updateDishDropdown function removed - form no longer exists

// Items Available Management - Removed

// Employee Management
let editingEmployeeId = null;
let currentAttendanceEmployeeId = null;

const employeeForm = document.getElementById('employeeForm');
if (employeeForm) {
    employeeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const employees = Storage.get('employees') || [];
        const name = document.getElementById('employeeName').value.trim();
        const salary = parseInt(document.getElementById('employeeSalary').value) || 0;
        const salaryDate = document.getElementById('employeeSalaryDate').value;

        if (editingEmployeeId !== null) {
            const index = employees.findIndex(emp => emp.id === editingEmployeeId);
            if (index !== -1) {
                const oldSalary = employees[index].salary || 0;
                employees[index] = {
                    ...employees[index],
                    name,
                    salary,
                    salaryDate
                };
            }
            editingEmployeeId = null;
        } else {
            const newEmployee = {
                id: Date.now(),
                name,
                salary,
                salaryDate,
                payouts: [] // Array of payout objects: {id, amount, date, notes}
            };
            employees.push(newEmployee);
        }

        Storage.set('employees', employees);
        document.getElementById('employeeForm').reset();
        closeAddEmployeeModal();
        loadEmployees();
    });
}

window.loadEmployees = function loadEmployees() {
    const employees = Storage.get('employees') || [];
    const tbody = document.getElementById('employeeTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    // Get filter values
    const searchQuery = document.getElementById('employeeSearch')?.value.toLowerCase() || '';
    let selectedMonth = document.getElementById('employeeMonthFilter')?.value;
    const now = new Date();
    const currentYearMonth = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    if (!selectedMonth) {
        selectedMonth = currentYearMonth;
        const monthInput = document.getElementById('employeeMonthFilter');
        if (monthInput) monthInput.value = currentYearMonth;
    }
    const [year, month] = selectedMonth.split('-').map(Number);

    // Migrate old employee data (convert numeric payouts to array)
    employees.forEach(emp => {
        if (!Array.isArray(emp.payouts) && typeof emp.payouts === 'number' && emp.payouts > 0) {
            // Convert old numeric payout to array format
            emp.payouts = [{
                id: Date.now(),
                amount: emp.payouts,
                date: emp.salaryDate || new Date().toISOString().split('T')[0],
                notes: 'Migrated from old format'
            }];
        } else if (!Array.isArray(emp.payouts)) {
            emp.payouts = [];
        }

        // Ensure each payout has time/createdAt (derive from id if possible)
        if (Array.isArray(emp.payouts)) {
            emp.payouts.forEach(p => {
                if (!p) return;
                if (!p.createdAt) {
                    const ts = typeof p.id === 'number' ? p.id : Date.now();
                    p.createdAt = new Date(ts).toISOString();
                }
                if (!p.time) {
                    p.time = formatTimeShort(new Date(p.createdAt));
                }
            });
        }
    });
    if (employees.some(emp => !Array.isArray(emp.payouts))) {
        Storage.set('employees', employees);
    }

    // Apply filters
    let filteredEmployees = employees.filter(emp => {
        const matchesSearch = searchQuery === '' || emp.name.toLowerCase().includes(searchQuery);

        let matchesDate = true;
        if (emp.salaryDate) {
            const sDate = new Date(emp.salaryDate);
            const sYear = sDate.getFullYear();
            const sMonth = sDate.getMonth() + 1;
            matchesDate = (sYear < year) || (sYear === year && sMonth <= month);
        }

        return matchesSearch && matchesDate;
    });

    // Sort by name
    filteredEmployees.sort((a, b) => a.name.localeCompare(b.name));

    // Update summary cards
    const filteredTotalEmployees = filteredEmployees.length;
    const totalSalary = filteredEmployees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
    const totalPayouts = filteredEmployees.reduce((sum, emp) => {
        let payouts = Array.isArray(emp.payouts) ? emp.payouts : [];
        payouts = payouts.filter(p => {
            const pDate = new Date(p.date || p.createdAt);
            return pDate.getFullYear() === year && (pDate.getMonth() + 1) === month;
        });
        return sum + payouts.reduce((pSum, p) => pSum + (p.amount || 0), 0);
    }, 0);
    const remainingSalary = totalSalary - totalPayouts;

    const totalEmployeesEl = document.getElementById('totalEmployees');
    const totalSalaryEl = document.getElementById('totalSalary');
    const totalPayoutsEl = document.getElementById('totalPayouts');
    const remainingSalaryEl = document.getElementById('remainingSalary');
    const employeeCountTitle = document.getElementById('employeeCountTitle');

    if (totalEmployeesEl) totalEmployeesEl.textContent = formatNumber(filteredTotalEmployees);
    if (totalSalaryEl) totalSalaryEl.textContent = `Rs. ${formatNumber(totalSalary)}`;
    if (totalPayoutsEl) totalPayoutsEl.textContent = `Rs. ${formatNumber(totalPayouts)}`;
    if (remainingSalaryEl) remainingSalaryEl.textContent = `Rs. ${formatNumber(remainingSalary)}`;
    if (employeeCountTitle) {
        employeeCountTitle.textContent = `Employee Management (${selectedMonth})`;
    }

    const countEl = document.getElementById('employeeCount');
    if (countEl) countEl.textContent = 'Count: ' + filteredEmployees.length;

    if (filteredEmployees.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: #999;">No employees found</td></tr>';
        return;
    }

    filteredEmployees.forEach(employee => {
        const salary = employee.salary || 0;
        let payouts = Array.isArray(employee.payouts) ? employee.payouts : [];

        // Apply same payout filtering for table display
        payouts = payouts.filter(p => {
            const pDate = new Date(p.date || p.createdAt);
            return pDate.getFullYear() === year && (pDate.getMonth() + 1) === month;
        });

        const totalPayoutAmount = payouts.reduce((sum, p) => sum + (p.amount || 0), 0);
        const remaining = salary - totalPayoutAmount;
        const salaryDate = employee.salaryDate ? formatDate(new Date(employee.salaryDate)) : '-';
        const payoutsText = payouts.length > 0
            ? `Rs. ${formatNumber(totalPayoutAmount)} (${payouts.length} payout${payouts.length !== 1 ? 's' : ''})`
            : '—';

        // Main row
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-weight: 700;">${employee.name}</td>
            <td>${salaryDate}</td>
            <td style="font-weight: 700;">Rs. ${formatNumber(salary)}</td>
            <td>${payoutsText}</td>
            <td style="font-weight: 700; color: #4caf50;">Rs. ${formatNumber(remaining)}</td>
            <td>
                <div class="table-actions-cell">
                    <button class="btn-action btn-action-payouts-list" onclick="openPayoutsListModal(${employee.id})" id="payoutToggleBtn_${employee.id}" ${payouts.length === 0 ? 'disabled style="opacity: 0.45; cursor: not-allowed;"' : ''} title="View Payouts (${payouts.length})">${ICONS.list}</button>
                    <button class="btn-action btn-action-attendance" onclick="openAttendanceModal(${employee.id})" title="Attendance">${ICONS.clock}</button>
                    <button class="btn-action btn-action-payout" onclick="openAddPayoutModal(${employee.id})" title="Add Payout">${ICONS.payout}</button>
                    <button class="btn-action btn-action-edit" onclick="editEmployee(${employee.id})" title="Edit Employee">${ICONS.edit}</button>
                    <button class="btn-action btn-action-delete" onclick="deleteEmployee(${employee.id}, this)" title="Delete Employee">${ICONS.delete}</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.openAddEmployeeModal = () => {
    editingEmployeeId = null;
    document.getElementById('employeeModalTitle').textContent = 'Add Employee';
    document.getElementById('employeeForm').reset();
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('employeeSalaryDate').value = today;
    document.getElementById('addEmployeeModal').style.display = 'flex';
};

window.closeAddEmployeeModal = () => {
    editingEmployeeId = null;
    document.getElementById('employeeForm').reset();
    document.getElementById('addEmployeeModal').style.display = 'none';
};

window.editEmployee = (id) => {
    // Require password before editing
    openActionPasswordModal(() => {
        const employees = Storage.get('employees') || [];
        const employee = employees.find(emp => emp.id === id);
        if (employee) {
            editingEmployeeId = id;
            document.getElementById('employeeModalTitle').textContent = 'Edit Employee';
            document.getElementById('employeeName').value = employee.name;
            document.getElementById('employeeSalary').value = employee.salary || '';
            document.getElementById('employeeSalaryDate').value = employee.salaryDate || new Date().toISOString().split('T')[0];
            document.getElementById('addEmployeeModal').style.display = 'flex';
        }
    });
};

let editingPayoutId = null;
let currentPayoutEmployeeId = null;

window.openAddPayoutModal = (employeeId) => {
    const employees = Storage.get('employees') || [];
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return;

    editingPayoutId = null;
    currentPayoutEmployeeId = employeeId;
    document.getElementById('payoutModalTitle').textContent = 'Add Daily Payout';
    document.getElementById('payoutEmployeeName').textContent = employee.name;

    const salary = employee.salary || 0;
    const payouts = Array.isArray(employee.payouts) ? employee.payouts : [];
    const totalPayoutAmount = payouts.reduce((sum, p) => sum + (p.amount || 0), 0);
    const remaining = salary - totalPayoutAmount;
    document.getElementById('payoutRemainingSalary').textContent = formatNumber(remaining);
    document.getElementById('payoutAfterAmount').textContent = formatNumber(remaining);

    document.getElementById('payoutForm').reset();
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('payoutDate').value = today;
    document.getElementById('addPayoutModal').style.display = 'flex';

    // Add real-time calculation for "After this Payout"
    updatePayoutAfterAmount(remaining);
};

window.closeAddPayoutModal = () => {
    document.getElementById('addPayoutModal').style.display = 'none';
    editingPayoutId = null;
    currentPayoutEmployeeId = null;

    // Remove event listener
    const amountInput = document.getElementById('payoutAmount');
    if (amountInput && payoutAmountHandler) {
        amountInput.removeEventListener('input', payoutAmountHandler);
        payoutAmountHandler = null;
    }
};

// Payouts list (Excel-like) modal
let currentPayoutsListEmployeeId = null;
let currentPayoutsListEditingPayoutId = null;

function escapeHtml(str) {
    return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function renderPayoutsListModal(employeeId) {
    const employees = Storage.get('employees') || [];
    const employee = employees.find(e => String(e.id) === String(employeeId));
    const nameEl = document.getElementById('payoutsListEmployeeName');
    const summaryEl = document.getElementById('payoutsListSummary');
    const tbody = document.getElementById('payoutsListTbody');
    if (!employee || !tbody) return;

    const salary = employee.salary || 0;
    const payouts = Array.isArray(employee.payouts) ? employee.payouts : [];
    const totalPayoutAmount = payouts.reduce((sum, p) => sum + (p?.amount || 0), 0);
    const remaining = salary - totalPayoutAmount;

    if (nameEl) nameEl.textContent = employee.name || '';
    if (summaryEl) summaryEl.textContent = `Total Payouts: Rs. ${formatNumber(totalPayoutAmount)} • Remaining: Rs. ${formatNumber(remaining)} • Entries: ${payouts.length}`;

    if (payouts.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 24px; color:#999; font-weight: 700;">No payouts found</td></tr>`;
        return;
    }

    // Sort newest first using createdAt/id as fallback
    const sorted = [...payouts].sort((a, b) => {
        const at = a?.createdAt ? new Date(a.createdAt).getTime() : (typeof a?.id === 'number' ? a.id : 0);
        const bt = b?.createdAt ? new Date(b.createdAt).getTime() : (typeof b?.id === 'number' ? b.id : 0);
        return bt - at;
    });

    tbody.innerHTML = sorted.map((p, idx) => {
        const payoutDate = p?.date ? formatDate(new Date(p.date + 'T00:00:00')) : '-';
        const payoutTime = p?.time || (p?.createdAt ? formatTimeShort(new Date(p.createdAt)) : '');
        const notes = (p?.notes || '').trim();
        const amount = p?.amount || 0;
        const isEditing = currentPayoutsListEditingPayoutId && String(currentPayoutsListEditingPayoutId) === String(p?.id);
        const dateValue = p?.date || '';
        const timeValue = payoutTime || '';
        const notesValue = notes || '';
        const amountValue = Number(amount || 0);

        if (isEditing) {
            return `
                <tr>
                    <td style="text-align:center; font-weight: 800;">${idx + 1}</td>
                    <td>${payoutDate}</td>
                    <td>${payoutTime || '-'}</td>
                    <td style="text-align:right;">
                        <input id="payoutsEditAmount" type="number" min="0" step="1" value="${escapeHtml(amountValue)}" style="width: 100%; padding: 6px 8px; border: 1px solid #d8d8d8; border-radius: 6px; font-size: 13px; text-align: right;" />
                    </td>
                    <td>
                        <input id="payoutsEditNotes" type="text" value="${escapeHtml(notesValue)}" placeholder="Notes" style="width: 100%; padding: 6px 8px; border: 1px solid #d8d8d8; border-radius: 6px; font-size: 13px;" />
                    </td>
                    <td style="text-align:center; white-space: nowrap;">
                        <div class="table-actions-cell center">
                            <button class="btn-action btn-action-save" onclick="saveInlinePayoutEdit(${employee.id}, ${p.id})" title="Save">${ICONS.check}</button>
                            <button class="btn-action btn-action-cancel" onclick="cancelInlinePayoutEdit()" title="Cancel">${ICONS.cross}</button>
                        </div>
                    </td>
                </tr>
            `;
        }
        return `
            <tr>
                <td style="text-align:center; font-weight: 800;">${idx + 1}</td>
                <td>${payoutDate}</td>
                <td>${payoutTime || '-'}</td>
                <td style="text-align:right; font-weight: 800;">Rs. ${formatNumber(amount)}</td>
                <td style="white-space: pre-wrap;">${notes ? escapeHtml(notes) : '<span style="color:#999;">—</span>'}</td>
                <td style="text-align:center; white-space: nowrap;">
                    <div class="table-actions-cell center">
                        <button class="btn-action btn-action-edit" onclick="startInlinePayoutEdit(${employee.id}, ${p.id})" title="Edit">${ICONS.edit}</button>
                        <button class="btn-action btn-action-delete" onclick="deletePayout(${employee.id}, ${p.id}, this)" title="Delete">${ICONS.delete}</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

window.openPayoutsListModal = (employeeId) => {
    currentPayoutsListEmployeeId = employeeId;
    currentPayoutsListEditingPayoutId = null;
    const modal = document.getElementById('payoutsListModal');
    if (modal) modal.style.display = 'flex';
    renderPayoutsListModal(employeeId);
};

window.closePayoutsListModal = () => {
    const modal = document.getElementById('payoutsListModal');
    if (modal) modal.style.display = 'none';
    currentPayoutsListEmployeeId = null;
    currentPayoutsListEditingPayoutId = null;
};

window.startInlinePayoutEdit = (employeeId, payoutId) => {
    currentPayoutsListEmployeeId = employeeId;
    currentPayoutsListEditingPayoutId = payoutId;
    renderPayoutsListModal(employeeId);
    // Focus amount for quick edit
    setTimeout(() => {
        const el = document.getElementById('payoutsEditAmount');
        if (el) el.focus();
    }, 0);
};

window.cancelInlinePayoutEdit = () => {
    if (!currentPayoutsListEmployeeId) return;
    currentPayoutsListEditingPayoutId = null;
    renderPayoutsListModal(currentPayoutsListEmployeeId);
};

window.saveInlinePayoutEdit = (employeeId, payoutId) => {
    const amountEl = document.getElementById('payoutsEditAmount');
    const notesEl = document.getElementById('payoutsEditNotes');
    if (!amountEl || !notesEl) return;

    const amount = parseInt(amountEl.value, 10) || 0;
    const notes = (notesEl.value || '').trim();

    if (amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    const employees = Storage.get('employees') || [];
    const employee = employees.find(emp => String(emp.id) === String(employeeId));
    if (!employee) return;
    const payouts = Array.isArray(employee.payouts) ? employee.payouts : [];
    const index = payouts.findIndex(p => String(p?.id) === String(payoutId));
    if (index === -1) return;

    const prev = payouts[index] || {};
    payouts[index] = {
        ...prev,
        id: prev.id,
        amount,
        notes,
        // Keep date and time unchanged
        date: prev.date,
        time: prev.time,
        // Keep createdAt unless missing
        createdAt: prev.createdAt || new Date().toISOString()
    };

    employee.payouts = payouts;
    Storage.set('employees', employees);
    loadEmployees();

    currentPayoutsListEmployeeId = employeeId;
    currentPayoutsListEditingPayoutId = null;
    renderPayoutsListModal(employeeId);
};

window.openAddPayoutFromPayoutsList = () => {
    if (!currentPayoutsListEmployeeId) return;
    // Avoid stacking two overlays
    const listModal = document.getElementById('payoutsListModal');
    if (listModal) listModal.style.display = 'none';
    openAddPayoutModal(currentPayoutsListEmployeeId);
};

function getLocalISODate(d = new Date()) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function getEmployeeAttendance() {
    return Storage.get('employeeAttendance') || [];
}

function setEmployeeAttendance(records) {
    Storage.set('employeeAttendance', records);
}

function renderAttendance(employeeId) {
    const listEl = document.getElementById('attendanceList');
    const inBtn = document.getElementById('attendanceTimeInBtn');
    const outBtn = document.getElementById('attendanceTimeOutBtn');
    if (!listEl) return;

    const records = getEmployeeAttendance()
        .filter(r => String(r.employeeId) === String(employeeId))
        .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    const today = getLocalISODate();
    const todayRec = records.find(r => r.date === today);
    if (inBtn) inBtn.disabled = !!(todayRec && todayRec.timeIn);
    if (outBtn) outBtn.disabled = !(todayRec && todayRec.timeIn) || !!(todayRec && todayRec.timeOut);

    if (records.length === 0) {
        listEl.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 24px; color:#999; font-weight: 600;">${t('No attendance found')}</td></tr>`;
        return;
    }

    listEl.innerHTML = records.map((rec, idx) => {
        const d = rec.date ? formatDate(new Date(rec.date + 'T00:00:00')) : '-';
        const ti = rec.timeIn || '-';
        const to = rec.timeOut || '-';
        const isComplete = !!(rec.timeIn && rec.timeOut);
        const isIn = !!(rec.timeIn && !rec.timeOut);
        const statusBg = isComplete ? '#e8f5e9' : (isIn ? '#fff3e0' : '#f5f5f5');
        const statusColor = isComplete ? '#2e7d32' : (isIn ? '#e65100' : '#757575');
        const statusBorder = isComplete ? '#c8e6c9' : (isIn ? '#ffe0b2' : '#e0e0e0');
        const statusText = isComplete ? 'Complete' : (isIn ? 'In' : '—');
        const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8f9fa';

        return `
            <tr style="background: ${rowBg}; border-bottom: 1px solid #eef0f3;">
                <td style="padding: 12px 14px; font-weight: 600; color: #2c3e50; white-space: nowrap;">${d}</td>
                <td style="padding: 12px 14px; color: #333; font-weight: 500; white-space: nowrap;">${ti}</td>
                <td style="padding: 12px 14px; color: #333; font-weight: 500; white-space: nowrap;">${to}</td>
                <td style="padding: 12px 14px; text-align: center; white-space: nowrap;">
                    <span style="background: ${statusBg}; color: ${statusColor}; border: 1px solid ${statusBorder}; padding: 4px 12px; border-radius: 12px; font-weight: 700; font-size: 12px; display: inline-block;">
                        ${statusText}
                    </span>
                </td>
            </tr>
        `;
    }).join('');
}

window.openAttendanceModal = (employeeId) => {
    const employees = Storage.get('employees') || [];
    const employee = employees.find(e => String(e.id) === String(employeeId));
    if (!employee) return;
    currentAttendanceEmployeeId = employeeId;
    const modal = document.getElementById('attendanceModal');
    const nameEl = document.getElementById('attendanceEmployeeName');
    const titleEl = document.getElementById('attendanceModalTitle');
    if (titleEl) titleEl.textContent = t('Attendance');
    if (nameEl) nameEl.textContent = `${employee.name}`;
    if (modal) modal.style.display = 'flex';
    renderAttendance(employeeId);
};

window.closeAttendanceModal = () => {
    const modal = document.getElementById('attendanceModal');
    if (modal) modal.style.display = 'none';
    currentAttendanceEmployeeId = null;
};

window.attendanceTimeIn = () => {
    if (!currentAttendanceEmployeeId) return;
    const now = new Date();
    const today = getLocalISODate(now);
    const records = getEmployeeAttendance();
    let rec = records.find(r => String(r.employeeId) === String(currentAttendanceEmployeeId) && r.date === today);
    if (!rec) {
        rec = { employeeId: currentAttendanceEmployeeId, date: today, timeIn: formatTime(now), timeOut: null, createdAt: now.toISOString() };
        records.push(rec);
    } else if (!rec.timeIn) {
        rec.timeIn = formatTime(now);
    }
    setEmployeeAttendance(records);
    renderAttendance(currentAttendanceEmployeeId);
};

window.attendanceTimeOut = () => {
    if (!currentAttendanceEmployeeId) return;
    const now = new Date();
    const today = getLocalISODate(now);
    const records = getEmployeeAttendance();
    const rec = records.find(r => String(r.employeeId) === String(currentAttendanceEmployeeId) && r.date === today);
    if (!rec || !rec.timeIn) {
        alert('Please Time In first');
        return;
    }
    if (!rec.timeOut) {
        rec.timeOut = formatTime(now);
    }
    setEmployeeAttendance(records);
    renderAttendance(currentAttendanceEmployeeId);
};

window.editPayout = (employeeId, payoutId) => {
    const employees = Storage.get('employees') || [];
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return;

    const payouts = Array.isArray(employee.payouts) ? employee.payouts : [];
    const payout = payouts.find(p => p.id === payoutId);
    if (!payout) return;

    editingPayoutId = payoutId;
    currentPayoutEmployeeId = employeeId;
    document.getElementById('payoutModalTitle').textContent = 'Edit Daily Payout';
    document.getElementById('payoutEmployeeName').textContent = employee.name;

    const salary = employee.salary || 0;
    // When editing, add back the current payout amount to remaining salary
    const currentPayoutAmount = payout.amount || 0;
    const totalPayoutAmount = payouts.reduce((sum, p) => sum + (p.amount || 0), 0);
    const remaining = salary - totalPayoutAmount + currentPayoutAmount; // Add back the payout being edited
    document.getElementById('payoutRemainingSalary').textContent = formatNumber(remaining);

    document.getElementById('payoutAmount').value = payout.amount || '';
    document.getElementById('payoutDate').value = payout.date || '';
    document.getElementById('payoutNotes').value = payout.notes || '';
    document.getElementById('addPayoutModal').style.display = 'flex';

    // Add real-time calculation for "After this Payout"
    updatePayoutAfterAmount(remaining);
};

let payoutAmountHandler = null;

function updatePayoutAfterAmount(baseRemaining) {
    const amountInput = document.getElementById('payoutAmount');
    const afterAmountEl = document.getElementById('payoutAfterAmount');

    if (!amountInput || !afterAmountEl) return;

    // Remove existing event listener if any
    if (payoutAmountHandler) {
        amountInput.removeEventListener('input', payoutAmountHandler);
    }

    // Create new handler
    payoutAmountHandler = () => {
        const payoutAmount = parseInt(amountInput.value) || 0;
        const currencyEl = document.getElementById('payoutAfterAmountCurrency');

        // Change color and text based on whether amount exceeds remaining
        if (payoutAmount > baseRemaining) {
            afterAmountEl.style.color = '#e74c3c'; // Red if exceeds
            afterAmountEl.textContent = 'Exceeds limit!';
            if (currencyEl) currencyEl.style.display = 'none'; // Hide Rs. when exceeds
        } else {
            const afterAmount = baseRemaining - payoutAmount;
            afterAmountEl.style.color = '#4caf50'; // Green if valid
            afterAmountEl.textContent = formatNumber(afterAmount);
            if (currencyEl) currencyEl.style.display = 'inline'; // Show Rs. when valid
        }

        // Add visual feedback to input field
        if (payoutAmount > baseRemaining) {
            amountInput.style.borderColor = '#e74c3c';
            amountInput.style.borderWidth = '2px';
        } else {
            amountInput.style.borderColor = '#e0e0e0';
            amountInput.style.borderWidth = '2px';
        }
    };

    // Add event listener
    amountInput.addEventListener('input', payoutAmountHandler);

    // Trigger initial calculation
    payoutAmountHandler();
}

window.deletePayout = (employeeId, payoutId, buttonElement) => {
    if (buttonElement) {
        showDeleteConfirmation(buttonElement, deletePayoutConfirmed, employeeId, payoutId);
        return;
    }
    deletePayoutConfirmed(employeeId, payoutId);
};

function deletePayoutConfirmed(employeeId, payoutId) {
    const employees = Storage.get('employees') || [];
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return;

    const payouts = Array.isArray(employee.payouts) ? employee.payouts : [];
    employee.payouts = payouts.filter(p => p.id !== payoutId);
    Storage.set('employees', employees);
    loadEmployees();
    loadExpenses();
    if (typeof loadDashboard === 'function') loadDashboard();
    if (currentPayoutsListEmployeeId && String(currentPayoutsListEmployeeId) === String(employeeId)) {
        renderPayoutsListModal(employeeId);
    }
}

window.resetEmployeePayouts = (employeeId) => {
    const employees = Storage.get('employees') || [];
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return;

    employee.payouts = [];
    Storage.set('employees', employees);
    loadEmployees();
    loadExpenses();
    if (typeof loadDashboard === 'function') loadDashboard();
    if (currentPayoutsListEmployeeId && String(currentPayoutsListEmployeeId) === String(employeeId)) {
        renderPayoutsListModal(employeeId);
    }
};

window.showResetPayoutsConfirmation = () => {
    const container = document.getElementById('resetPayoutsButtonContainer');
    if (!container) return;

    container.innerHTML = `
        <button type="button" onclick="confirmResetPayouts()" style="background: #4caf50; color: white; border: none; padding: 4px 8px; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 12px; min-width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; line-height: 1;" title="Confirm">✓</button>
        <button type="button" onclick="cancelResetPayouts()" style="background: #f44336; color: white; border: none; padding: 4px 8px; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 12px; min-width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; line-height: 1;" title="Cancel">✕</button>
    `;
};

window.confirmResetPayouts = () => {
    if (!currentPayoutsListEmployeeId) return;
    resetEmployeePayouts(currentPayoutsListEmployeeId);
    cancelResetPayouts(); // Reset the button state
};

window.cancelResetPayouts = () => {
    const container = document.getElementById('resetPayoutsButtonContainer');
    if (!container) return;

    container.innerHTML = `
        <button type="button" id="resetPayoutsButton" onclick="showResetPayoutsConfirmation()" style="background: #2196f3; color: white; border: none; padding: 10px 14px; border-radius: 10px; cursor: pointer; font-weight: 700; font-size: 14px; min-width: 120px;">↻ Reset Payouts</button>
    `;
};

window.resetEmployeePayoutsFromList = () => {
    if (!currentPayoutsListEmployeeId) return;
    resetEmployeePayouts(currentPayoutsListEmployeeId);
};

// Payout form handler
const payoutForm = document.getElementById('payoutForm');
if (payoutForm) {
    payoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentPayoutEmployeeId) return;

        const employees = Storage.get('employees') || [];
        const employee = employees.find(emp => emp.id === currentPayoutEmployeeId);
        if (!employee) return;

        const amount = parseInt(document.getElementById('payoutAmount').value) || 0;
        const date = document.getElementById('payoutDate').value;
        const notes = document.getElementById('payoutNotes').value.trim();

        if (amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        // Calculate remaining salary (excluding the payout being edited if editing)
        let payouts = Array.isArray(employee.payouts) ? employee.payouts : [];
        const salary = employee.salary || 0;
        let totalPayouts = payouts.reduce((sum, p) => sum + (p.amount || 0), 0);

        // If editing, subtract the old payout amount
        if (editingPayoutId !== null) {
            const oldPayout = payouts.find(p => p.id === editingPayoutId);
            if (oldPayout) {
                totalPayouts -= (oldPayout.amount || 0);
            }
        }

        const remainingSalary = salary - totalPayouts;

        // Validate that amount doesn't exceed remaining salary
        if (amount > remainingSalary) {
            alert(`Amount cannot exceed remaining salary of Rs. ${formatNumber(remainingSalary)}`);
            return;
        }

        const now = new Date();
        const nowIso = now.toISOString();
        const nowTime = formatTimeShort(now);

        if (editingPayoutId !== null) {
            // Edit existing payout
            const index = payouts.findIndex(p => p.id === editingPayoutId);
            if (index !== -1) {
                const prev = payouts[index] || {};
                payouts[index] = {
                    ...prev,
                    id: editingPayoutId,
                    amount,
                    date,
                    notes,
                    createdAt: prev.createdAt || nowIso,
                    time: prev.time || formatTimeShort(new Date(prev.createdAt || nowIso))
                };
            }
        } else {
            // Add new payout
            const newPayout = {
                id: Date.now(),
                amount,
                date,
                notes,
                createdAt: nowIso,
                time: nowTime
            };
            payouts.push(newPayout);
        }

        employee.payouts = payouts;
        Storage.set('employees', employees);
        loadEmployees();
        loadExpenses();
        if (typeof loadDashboard === 'function') loadDashboard();
        closeAddPayoutModal();
        if (currentPayoutsListEmployeeId && String(currentPayoutsListEmployeeId) === String(currentPayoutEmployeeId)) {
            renderPayoutsListModal(currentPayoutEmployeeId);
        }
    });
}

window.deleteEmployee = (id, buttonElement) => {
    // Require password before deletion
    openActionPasswordModal(() => {
        // Re-find the button element after password verification
        let btnElement = buttonElement;
        if (!btnElement || !btnElement.parentElement || !document.contains(buttonElement)) {
            // Try to find the button in the DOM by looking for the employee row
            const employeeRows = document.querySelectorAll('#employeeTableBody tr, .employee-row');
            for (let row of employeeRows) {
                const deleteBtn = row.querySelector('button[onclick*="deleteEmployee"]');
                if (deleteBtn) {
                    const onclickAttr = deleteBtn.getAttribute('onclick') || '';
                    if (onclickAttr.includes(`"${id}"`) || onclickAttr.includes(`'${id}'`) || onclickAttr.includes(`(${id},`)) {
                        btnElement = deleteBtn;
                        break;
                    }
                }
            }
        }

        if (btnElement && btnElement.parentElement && document.contains(btnElement)) {
            showDeleteConfirmation(btnElement, deleteEmployeeConfirmed, id);
        } else {
            // If button not found, directly delete (skip confirmation)
            deleteEmployeeConfirmed(id);
        }
    });
};

function deleteEmployeeConfirmed(id) {
    const employees = Storage.get('employees') || [];
    const filtered = employees.filter(emp => emp.id !== id);
    Storage.set('employees', filtered);
    loadEmployees();
    loadExpenses();
    if (typeof loadDashboard === 'function') loadDashboard();
}

// Waiters Management
let editingWaiterId = null;

window.loadWaiters = function loadWaiters() {
    const waiters = Storage.get('waiters') || [];
    const tbody = document.getElementById('waiterTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    // Get search query
    const searchQuery = (document.getElementById('waiterSearch')?.value || '').toLowerCase().trim();

    // Filter waiters based on search
    let filteredWaiters = waiters;
    if (searchQuery) {
        filteredWaiters = waiters.filter(waiter =>
            (waiter.name || '').toLowerCase().includes(searchQuery)
        );
    }

    const countEl = document.getElementById('waiterCount');
    if (countEl) countEl.textContent = 'Count: ' + filteredWaiters.length;

    if (filteredWaiters.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 40px; color: #999;">No waiters found. Add a waiter to get started.</td></tr>';
        return;
    }

    // Get only completed orders (sales) to count waiter orders - exclude hold orders
    const sales = Storage.get('sales') || [];

    // Sort by name
    filteredWaiters.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

    filteredWaiters.forEach(waiter => {
        // Count only completed orders (sales) for this waiter - exclude hold orders
        const orderCount = sales.filter(sale => {
            const saleWaiter = sale.waiter || '';
            return saleWaiter.toLowerCase() === (waiter.name || '').toLowerCase();
        }).length;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="padding: 12px; font-weight: 600; color: #333;">${escapeHtml(waiter.name || 'N/A')}</td>
            <td style="padding: 12px; text-align: center; font-weight: 600; color: #4a90e2;">${orderCount}</td>
            <td style="padding: 10px 12px; text-align: center;">
                <div class="table-actions-cell center">
                    <button class="btn-action btn-action-edit" onclick="editWaiter(${waiter.id})" title="Edit Waiter">${ICONS.edit}</button>
                    <button class="btn-action btn-action-delete" onclick="deleteWaiter(${waiter.id}, this)" title="Delete Waiter">${ICONS.delete}</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
};

// Handle waiter form submission
onDOMReady(() => {
    const waiterForm = document.getElementById('waiterForm');
    if (waiterForm) {
        waiterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const waiters = Storage.get('waiters') || [];
            const name = document.getElementById('waiterName').value.trim();

            if (!name) {
                alert('Please enter a waiter name');
                return;
            }

            if (editingWaiterId) {
                // Update existing waiter
                const index = waiters.findIndex(w => w.id === editingWaiterId);
                if (index !== -1) {
                    // Check if another waiter with the same name exists (excluding current one)
                    const existingWaiter = waiters.find(w => w.name.toLowerCase() === name.toLowerCase() && w.id !== editingWaiterId);
                    if (existingWaiter) {
                        alert('A waiter with this name already exists!');
                        return;
                    }
                    waiters[index].name = name;
                    waiters[index].updatedAt = new Date().toISOString();
                }
            } else {
                // Check if waiter already exists
                const existingWaiter = waiters.find(w => w.name.toLowerCase() === name.toLowerCase());
                if (existingWaiter) {
                    alert('A waiter with this name already exists!');
                    return;
                }

                // Add new waiter
                const newWaiter = {
                    id: Date.now(),
                    name: name,
                    createdAt: new Date().toISOString()
                };
                waiters.push(newWaiter);
            }

            Storage.set('waiters', waiters);
            closeAddWaiterModal();
            loadWaiters();
            loadWaitersDropdown(); // Update POS dropdown
        });
    }
});

window.openAddWaiterModal = function openAddWaiterModal() {
    editingWaiterId = null;
    const form = document.getElementById('waiterForm');
    const modalTitle = document.getElementById('waiterModalTitle');

    if (form) form.reset();
    if (modalTitle) modalTitle.textContent = 'Add Waiter';

    document.getElementById('addWaiterModal').style.display = 'flex';
};

window.closeAddWaiterModal = function closeAddWaiterModal() {
    editingWaiterId = null;
    const form = document.getElementById('waiterForm');
    if (form) form.reset();
    document.getElementById('addWaiterModal').style.display = 'none';
};

window.editWaiter = function editWaiter(id) {
    // Require password before editing
    openActionPasswordModal(() => {
        const waiters = Storage.get('waiters') || [];
        const waiter = waiters.find(w => w.id === id);

        if (!waiter) {
            alert('Waiter not found!');
            return;
        }

        editingWaiterId = id;
        const form = document.getElementById('waiterForm');
        const modalTitle = document.getElementById('waiterModalTitle');

        if (modalTitle) modalTitle.textContent = 'Edit Waiter';
        if (form) {
            document.getElementById('waiterName').value = waiter.name || '';
        }

        document.getElementById('addWaiterModal').style.display = 'flex';
    });
};

window.deleteWaiter = function deleteWaiter(id, buttonElement) {
    // Require password before deleting
    if (buttonElement) {
        openActionPasswordModal(() => {
            const waiters = Storage.get('waiters') || [];
            const waiter = waiters.find(w => w.id === id);
            if (!waiter) {
                alert('Waiter not found!');
                return;
            }

            showCustomConfirm(`Are you sure you want to delete "${waiter.name}"?`, () => {
                const filtered = waiters.filter(w => w.id !== id);
                Storage.set('waiters', filtered);
                loadWaiters();
                loadWaitersDropdown(); // Update POS dropdown
            }, null, { title: 'Delete Waiter', confirmText: 'Delete', type: 'danger' });
        });
    } else {
        const waiters = Storage.get('waiters') || [];
        const filtered = waiters.filter(w => w.id !== id);
        Storage.set('waiters', filtered);
        loadWaiters();
        loadWaitersDropdown(); // Update POS dropdown
    }
};

// Reset waiter selection to default
function resetWaiterSelection() {
    const waiterSelect = document.getElementById('selectedWaiter');
    if (waiterSelect) {
        waiterSelect.value = '';
    }
}

// Table selection functions
function setSelectedTableValue(number, displayText) {
    const hiddenInput = document.getElementById('selectedTable');
    const displayInput = document.getElementById('tableSearchInput');
    const dropdownContent = document.getElementById('tableDropdownContent');
    
    if (hiddenInput) hiddenInput.value = number;
    if (displayInput) displayInput.value = displayText || '-- Select Table No --';
    if (dropdownContent) dropdownContent.style.display = 'none';
}

function resetTableSelection() {
    setSelectedTableValue('', '');
}

// Load tables into the searchable dropdown, excluding busy ones currently in active hold orders
function loadTablesDropdown(callback) {
    const tableItemsContainer = document.getElementById('tableListItems');
    if (!tableItemsContainer) {
        if (callback) callback();
        return;
    }

    const tables = Storage.get('tables') || [];
    const holdOrders = Storage.get('holdOrders') || [];

    // Find table numbers currently selected in pending/active hold orders
    const busyTables = new Set();
    holdOrders.forEach(order => {
        if (order.status === 'pending' && order.tableNo) {
            busyTables.add(String(order.tableNo));
        }
    });

    // Check if we are currently editing a hold order
    let currentEditingTable = null;
    if (editingHoldOrderId) {
        const currentEditingOrder = holdOrders.find(o => o.id === editingHoldOrderId);
        if (currentEditingOrder && currentEditingOrder.tableNo) {
            currentEditingTable = String(currentEditingOrder.tableNo);
        }
    }

    // Filter tables: exclude busy ones unless it is the one currently being edited
    const availableTables = tables.filter(t => {
        const numStr = String(t.number);
        const isBusy = busyTables.has(numStr);
        const isOwn = currentEditingTable && numStr === currentEditingTable;
        return !isBusy || isOwn;
    });

    // Sort by table number
    availableTables.sort((a, b) => a.number - b.number);

    // Clear existing items
    tableItemsContainer.innerHTML = '';

    // Add table options
    availableTables.forEach(t => {
        const item = document.createElement('div');
        item.style.cssText = 'padding: 4px 10px; cursor: pointer; font-size: 13px; color: #1f2937; font-family: "Inter", sans-serif; transition: background 0.15s; border-radius: 4px; margin: 0 4px;';
        item.textContent = `Table ${t.number} (${t.seats || 0} seats)`;
        item.setAttribute('data-table-no', t.number);
        
        item.onmouseenter = () => { item.style.backgroundColor = '#f3f4f6'; };
        item.onmouseleave = () => { item.style.backgroundColor = 'transparent'; };
        item.onclick = () => {
            setSelectedTableValue(t.number, `Table ${t.number}`);
        };
        tableItemsContainer.appendChild(item);
    });

    if (callback) {
        callback();
    }
}

// Customer Name functions
function getCustomerName() {
    const inputEl = document.getElementById('customerNameInput');
    if (inputEl) {
        return inputEl.value.trim() || '';
    }
    return '';
}

function resetCustomerName() {
    const inputEl = document.getElementById('customerNameInput');
    if (inputEl) {
        inputEl.value = '';
    }
    currentCustomerName = '';
}

function getWaitingTime() {
    const inputEl = document.getElementById('waitingTimeInput');
    if (inputEl && inputEl.value !== '') {
        const val = parseInt(inputEl.value, 10);
        return (!isNaN(val) && val >= 0) ? val : null;
    }
    return null;
}

function resetWaitingTime() {
    const inputEl = document.getElementById('waitingTimeInput');
    if (inputEl) {
        inputEl.value = '';
    }
}

// Load waiters into the POS dropdown
function loadWaitersDropdown(callback) {
    const waiterSelect = document.getElementById('selectedWaiter');
    if (!waiterSelect) {
        if (callback) callback();
        return;
    }

    const waiters = Storage.get('waiters') || [];

    // Clear existing options except the first one
    waiterSelect.innerHTML = '<option value="">-- Select Waiter --</option>';

    // Sort waiters by name
    const sortedWaiters = [...waiters].sort((a, b) => {
        const nameA = (a.name || '').toLowerCase();
        const nameB = (b.name || '').toLowerCase();
        return nameA.localeCompare(nameB);
    });

    // Add waiters as options
    sortedWaiters.forEach(waiter => {
        if (waiter.name) {
            const option = document.createElement('option');
            option.value = waiter.name;
            option.textContent = waiter.name;
            waiterSelect.appendChild(option);
        }
    });

    // Call callback if provided (after options are added)
    if (callback) {
        callback();
    }
}

window.togglePayouts = (employeeId) => {
    openPayoutsListModal(employeeId);
};

window.openAddEmployeeModal = openAddEmployeeModal;
window.closeAddEmployeeModal = closeAddEmployeeModal;
window.openAddPayoutModal = openAddPayoutModal;
window.closeAddPayoutModal = closeAddPayoutModal;
window.editPayout = editPayout;
window.deletePayout = deletePayout;
window.resetEmployeePayouts = resetEmployeePayouts;
window.resetEmployeePayoutsFromList = resetEmployeePayoutsFromList;
window.showResetPayoutsConfirmation = showResetPayoutsConfirmation;
window.confirmResetPayouts = confirmResetPayouts;
window.cancelResetPayouts = cancelResetPayouts;

window.printEmployees = () => {
    const employees = Storage.get('employees') || [];
    const waiters = Storage.get('waiters') || [];
    const sales = Storage.get('sales') || [];
    const printWindow = window.open('', '_blank');
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const currentDate = dateStr + ' ' + timeStr;

    // Get filter values (same as loadEmployees)
    const searchQuery = document.getElementById('employeeSearch')?.value.toLowerCase() || '';
    let selectedMonth = document.getElementById('employeeMonthFilter')?.value;
    const currentYearMonth = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    if (!selectedMonth) selectedMonth = currentYearMonth;
    const [year, month] = selectedMonth.split('-').map(Number);

    // Apply filters to employees (same as loadEmployees)
    let filteredEmployees = employees.filter(emp => {
        const matchesSearch = searchQuery === '' || emp.name.toLowerCase().includes(searchQuery);

        let matchesDate = true;
        if (emp.salaryDate) {
            const sDate = new Date(emp.salaryDate);
            const sYear = sDate.getFullYear();
            const sMonth = sDate.getMonth() + 1;
            matchesDate = (sYear < year) || (sYear === year && sMonth <= month);
        }

        return matchesSearch && matchesDate;
    });

    // Sort by name
    filteredEmployees.sort((a, b) => a.name.localeCompare(b.name));

    // Build employee table rows
    let employeeRows = '';
    if (filteredEmployees.length === 0) {
        employeeRows = '<tr><td colspan="4" style="text-align: center; padding: 10px;">No employee data found</td></tr>';
    } else {
        filteredEmployees.forEach(emp => {
            const salary = emp.salary || 0;
            let payouts = Array.isArray(emp.payouts) ? emp.payouts : [];

            // Apply same payout filtering for monthly view
            payouts = payouts.filter(p => {
                const pDate = new Date(p.date || p.createdAt);
                return pDate.getFullYear() === year && (pDate.getMonth() + 1) === month;
            });

            const totalPayoutAmount = payouts.reduce((sum, p) => sum + (p.amount || 0), 0);
            const remaining = salary - totalPayoutAmount;

            employeeRows += `
                <tr>
                    <td style="text-align: left; padding: 1px 2px;">${escapeHtml(emp.name)}</td>
                    <td style="text-align: right; padding: 1px 2px;">Rs.${formatNumber(salary)}</td>
                    <td style="text-align: right; padding: 1px 2px;">Rs.${formatNumber(totalPayoutAmount)}</td>
                    <td style="text-align: right; padding: 1px 2px;">Rs.${formatNumber(remaining)}</td>
                </tr>
            `;
        });
    }

    // Filter waiters if searching
    let filteredWaiters = waiters;
    if (searchQuery) {
        filteredWaiters = waiters.filter(w => (w.name || '').toLowerCase().includes(searchQuery));
    }

    // Build waiters table rows
    let waiterRows = '';
    if (filteredWaiters.length > 0) {
        filteredWaiters.forEach(waiter => {
            // Apply date filters to order counts if possible? 
            // Currently loadEmployees doesn't filter waiter order counts by month, 
            // but we could if we wanted. For now let's keep it consistent.
            const orderCount = sales.filter(sale => {
                const saleWaiter = sale.waiter || '';
                return saleWaiter.toLowerCase() === (waiter.name || '').toLowerCase();
            }).length;

            waiterRows += `
                <tr>
                    <td style="text-align: left; padding: 1px 2px;">${escapeHtml(waiter.name || 'N/A')}</td>
                    <td style="text-align: right; padding: 1px 2px;">${orderCount}</td>
                </tr>
            `;
        });
    }

    // Filter label for header
    let reportLabel = 'EMPLOYEE REPORT';
    if (dateFilter === 'specific-month' && selectedMonth) {
        reportLabel = `EMPLOYEE REPORT (${selectedMonth})`;
    }

    printWindow.document.write(`
        <html>
            <head>
                <title>Employee Report</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
                <style>
                    *, *::before, *::after {
                        box-sizing: border-box;
                        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
                    }
                    body {
                        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
                        padding: 10px;
                        font-size: 11px;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: center;
                        min-height: auto;
                        margin: 0;
                        max-width: 80mm;
                        margin: 0 auto;
                    }
                    .receipt-logo {
                        max-width: 100px;
                        max-height: 100px;
                        width: auto;
                        height: auto;
                        margin: 0 auto 8px auto;
                        display: block;
                        object-fit: contain;
                    }
                    .header-section {
                        text-align: center;
                        margin-bottom: 10px;
                        font-weight: 600;
                    }
                    .restaurant-name {
                        font-size: 16px;
                        font-weight: 900;
                        margin-bottom: 4px;
                    }
                    .report-title {
                        font-size: 14px;
                        font-weight: 700;
                        margin: 8px 0;
                    }
                    .report-info {
                        font-size: 10px;
                        margin: 4px 0;
                        font-weight: 600;
                    }
                    .separator {
                        border-top: 1px dashed #000;
                        margin: 6px 0;
                    }
                    .section-title {
                        font-size: 11px;
                        font-weight: 700;
                        margin: 8px 0 4px 0;
                        text-align: center;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 4px 0;
                        font-size: 9px;
                    }
                    thead {
                        border-bottom: 2px solid #000;
                    }
                    th {
                        padding: 6px 2px;
                        text-align: left;
                        font-weight: 700;
                        font-size: 10px;
                    }
                    th:nth-child(2),
                    th:nth-child(3),
                    th:nth-child(4) {
                        text-align: right;
                    }
                    td {
                        padding: 2px 2px;
                        border-bottom: 1px dotted #ccc;
                        font-size: 9px;
                        font-weight: 600;
                        line-height: 1.2;
                    }
                    td:nth-child(2),
                    td:nth-child(3),
                    td:nth-child(4) {
                        text-align: right;
                    }
                    .summary-section {
                        text-align: center;
                        margin-top: 8px;
                        font-size: 10px;
                        font-weight: 600;
                    }
                    @media print {
                        * {
                            margin: 0;
                            padding: 0;
                        }
                        body {
                            padding: 5mm 0;
                            margin: 0;
                            min-height: auto;
                            display: block;
                            height: auto;
                            max-width: 80mm;
                        }
                        .receipt-logo {
                            max-width: 80px;
                            max-height: 80px;
                            margin: 0 auto 6px auto;
                        }
                        table {
                            font-size: 9px;
                            border-spacing: 0;
                        }
                        th, td {
                            font-size: 9px;
                            padding: 1px 1px;
                            font-weight: 600 !important;
                            line-height: 1.2 !important;
                        }
                        .header-section, .report-info, .summary-section, .section-title {
                            font-weight: 600 !important;
                        }
                        @page {
                            size: 80mm auto;
                            margin: 5mm;
                        }
                    }
                </style>
            </head>
            <body>

                <div class="header-section">
                    <div class="restaurant-name">Hangout Lounge & Co.</div>
                    <div class="report-info">Contact: 0300-9509536</div>
                    <div class="report-info">Wah Cantt</div>
                    <div class="separator"></div>
                    <div class="separator"></div>
                    <div class="report-title">${reportLabel}</div>
                    <div class="separator"></div>
                    <div class="separator"></div>
                    <div class="report-info">Date: ${currentDate}</div>
                    <div class="separator"></div>
                </div>
                
                <div class="section-title">EMPLOYEES</div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Salary</th>
                            <th>Payouts</th>
                            <th>Remaining</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${employeeRows}
                    </tbody>
                </table>
                
                ${waiters.length > 0 ? `
                <div class="separator"></div>
                <div class="section-title">WAITERS</div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Orders</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${waiterRows}
                    </tbody>
                </table>
                ` : ''}
                
                <div class="summary-section">
                    <div class="separator"></div>
                    <div style="font-weight: 700; margin: 4px 0;">Total Employees: ${filteredEmployees.length}</div>
                    ${filteredWaiters.length > 0 ? `<div style="font-weight: 700; margin: 4px 0;">Total Waiters: ${filteredWaiters.length}</div>` : ''}
                    <div style="margin: 4px 0;">Thank You!</div>
                    <div style="margin-top: 10px;"></div>
                </div>
                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                        }, 100);
                    };
                </script>
            </body>
        </html>
    `);
    printWindow.document.close();
};

window.printSales = () => {
    const sales = Storage.get('sales') || [];
    const expenses = Storage.get('expenses') || [];

    // Get filter values (same as loadSales)
    const dateFilter = document.getElementById('salesDateFilter')?.value || 'all';
    const paymentFilter = document.getElementById('salesPaymentFilter')?.value || 'all';
    const sortFilter = document.getElementById('salesSortFilter')?.value || 'date-desc';

    // Group sales by orderId (same logic as loadSales)
    const orderMap = {};
    const ungroupedSales = [];

    sales.forEach(sale => {
        if (sale.items && Array.isArray(sale.items)) {
            const orderId = sale.orderId || sale.id;
            orderMap[orderId] = sale;
        } else {
            ungroupedSales.push(sale);
        }
    });

    const groupedByTime = {};
    ungroupedSales.forEach(sale => {
        const saleDate = new Date(sale.date);
        const timeKey = Math.floor(saleDate.getTime() / 5000) * 5000;
        const groupKey = `${timeKey}-${(sale.paymentMethod || 'cash')}`;

        if (!groupedByTime[groupKey]) {
            groupedByTime[groupKey] = {
                id: `ORD-${timeKey}`,
                orderId: `ORD-${timeKey}`,
                date: sale.date,
                paymentMethod: sale.paymentMethod || 'cash',
                items: [],
                total: 0,
                subtotal: 0,
                tax: 0
            };
        }

        groupedByTime[groupKey].items.push({
            name: sale.itemName || sale.dishName || 'Unknown',
            quantity: sale.quantity,
            price: sale.price,
            total: sale.total
        });
        groupedByTime[groupKey].total += sale.total;
        groupedByTime[groupKey].subtotal += sale.total;
    });

    Object.values(groupedByTime).forEach(order => {
        order.tax = 0;
        order.total = order.subtotal;
        orderMap[order.orderId] = order;
    });

    let orders = Object.values(orderMap);

    // Prepare date objects for filtering
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    today.setHours(0, 0, 0, 0);
    const todayEnd = new Date(today);
    todayEnd.setHours(23, 59, 59, 999);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    // Apply date filter to orders
    if (dateFilter !== 'all') {
        orders = orders.filter(order => {
            if (!order.date) return false;
            const orderDate = new Date(order.date);
            if (dateFilter === 'custom') {
                const startDate = document.getElementById('salesStartDate')?.value;
                const endDate = document.getElementById('salesEndDate')?.value;
                if (startDate || endDate) {
                    if (startDate) {
                        const start = new Date(startDate);
                        start.setHours(0, 0, 0, 0);
                        if (orderDate < start) return false;
                    }
                    if (endDate) {
                        const end = new Date(endDate);
                        end.setHours(23, 59, 59, 999);
                        if (orderDate > end) return false;
                    }
                    return true;
                }
                return false;
            } else if (dateFilter === 'today') {
                return orderDate >= today && orderDate <= todayEnd;
            } else if (dateFilter === 'week') {
                return orderDate >= weekAgo && orderDate <= todayEnd;
            } else if (dateFilter === 'month') {
                return orderDate >= monthAgo && orderDate <= todayEnd;
            } else if (dateFilter === 'specific-month') {
                const selectedMonth = document.getElementById('salesMonthFilter')?.value;
                if (selectedMonth) {
                    const [year, month] = selectedMonth.split('-').map(Number);
                    return orderDate.getFullYear() === year && (orderDate.getMonth() + 1) === month;
                }
                return true;
            }
            return true;
        });
    }

    // Filter expenses by the same date range
    let filteredExpenses = [...expenses];
    if (dateFilter !== 'all') {
        filteredExpenses = filteredExpenses.filter(exp => {
            if (!exp.date) return false;
            const expDate = new Date(exp.date);
            if (dateFilter === 'custom') {
                const startDate = document.getElementById('salesStartDate')?.value;
                const endDate = document.getElementById('salesEndDate')?.value;
                if (startDate || endDate) {
                    if (startDate) {
                        const start = new Date(startDate);
                        start.setHours(0, 0, 0, 0);
                        if (expDate < start) return false;
                    }
                    if (endDate) {
                        const end = new Date(endDate);
                        end.setHours(23, 59, 59, 999);
                        if (expDate > end) return false;
                    }
                    return true;
                }
                return false;
            } else if (dateFilter === 'today') {
                return expDate >= today && expDate <= todayEnd;
            } else if (dateFilter === 'week') {
                return expDate >= weekAgo && expDate <= todayEnd;
            } else if (dateFilter === 'month') {
                return expDate >= monthAgo && expDate <= todayEnd;
            } else if (dateFilter === 'specific-month') {
                const selectedMonth = document.getElementById('salesMonthFilter')?.value;
                if (selectedMonth) {
                    const [year, month] = selectedMonth.split('-').map(Number);
                    return expDate.getFullYear() === year && (expDate.getMonth() + 1) === month;
                }
                return true;
            }
            return true;
        });
    }

    // Apply payment method filter to orders (only if not 'all')
    if (paymentFilter !== 'all') {
        orders = orders.filter(order => {
            const method = (order.paymentMethod || 'cash').toLowerCase().trim();
            const filterValue = paymentFilter.toLowerCase().trim();
            return method === filterValue;
        });
    }

    // Calculate Global Totals
    const totalOrders = orders.length;
    const totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const totalServiceCharges = orders.reduce((sum, order) => sum + (order.tax || 0), 0);
    const totalDiscount = orders.reduce((sum, order) => sum + (order.discount?.amount || 0), 0);
    const totalSubtotal = orders.reduce((sum, order) => sum + (order.subtotal || order.total || 0), 0);
    const netSale = totalSales; // Net Sale now shows the total collected amount
    const avgSale = totalOrders > 0 ? totalSales / totalOrders : 0;
    const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
    const cashInHand = totalSales - totalExpenses;

    // Calculate Order Type Wise Metrics
    const getMetrics = (methodList) => {
        const filtered = orders.filter(o => methodList.includes((o.paymentMethod || 'cash').toLowerCase()));
        const count = filtered.length;
        const total = filtered.reduce((sum, o) => sum + (o.total || 0), 0);
        const avg = count > 0 ? total / count : 0;
        return { count, total, avg };
    };

    const gents = getMetrics(['cash']);
    const family = getMetrics(['online']);
    const parcel = getMetrics(['delivery', 'parcel']);

    // Get filter labels for header
    let dateFilterLabel = 'All Time';
    if (dateFilter === 'today') dateFilterLabel = 'Today';
    else if (dateFilter === 'week') dateFilterLabel = 'Weekly';
    else if (dateFilter === 'month') dateFilterLabel = 'Monthly';
    else if (dateFilter === 'specific-month') {
        const selectedMonth = document.getElementById('salesMonthFilter')?.value;
        dateFilterLabel = selectedMonth ? `Month: ${selectedMonth}` : 'Specific Month';
    } else if (dateFilter === 'custom') dateFilterLabel = 'Custom';

    const printWindow = window.open('', '_blank');
    const nowFull = new Date();
    const dateStr = nowFull.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const timeStr = nowFull.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const currentDate = dateStr + ' ' + timeStr;

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Sales Report</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
                <style>
                    *, *::before, *::after {
                        box-sizing: border-box;
                        font-family: 'Poppins', sans-serif !important;
                    }
                    body {
                        font-family: 'Poppins', sans-serif !important;
                        padding: 8px;
                        font-size: 12px;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: center;
                        min-height: auto;
                        margin: 0 auto;
                        max-width: 80mm;
                        background: #fff;
                        color: #000;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .header-section {
                        text-align: center;
                        margin-bottom: 6px;
                        width: 100%;
                    }
                    .restaurant-name {
                        font-size: 18px;
                        font-weight: 800;
                        letter-spacing: 0.3px;
                        text-transform: uppercase;
                        margin-bottom: 2px;
                        color: #000;
                    }
                    .report-title-badge {
                        display: inline-block;
                        border: 1.5px solid #000;
                        padding: 2px 14px;
                        font-size: 11px;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        margin: 4px 0 2px 0;
                    }
                    .report-info {
                        font-size: 11px;
                        font-weight: 500;
                        color: #333;
                        line-height: 1.35;
                    }
                    .separator {
                        border-top: 1px dashed #999;
                        margin: 6px 0 7px 0;
                        width: 100%;
                    }
                    .section-title {
                        font-size: 12px;
                        font-weight: 700;
                        margin: 6px 0 4px 0;
                        text-align: left;
                        width: 100%;
                        text-transform: uppercase;
                        letter-spacing: 0.3px;
                    }
                    @media print {
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                        body {
                            padding: 3mm 0;
                            margin: 0;
                            max-width: 100%;
                            width: 100%;
                            background: #fff;
                            color: #000;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                        @page {
                            size: 80mm auto;
                            margin: 3mm;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="header-section">
                    <div class="restaurant-name">Hangout Lounge & Co.</div>
                    <div class="report-info">Wah Cantt</div>
                    <div class="report-info">Phone: 0300-9509536</div>
                    <div><span class="report-title-badge">SALES REPORT</span></div>
                    <div class="separator"></div>
                    <div style="font-size: 11.5px; text-align: left; line-height: 1.5; color: #000;">
                        <div style="display: flex; justify-content: space-between;"><span style="font-weight: 600;">Date:</span> <span style="font-weight: 400; color: #333;">${currentDate}</span></div>
                        <div style="display: flex; justify-content: space-between;"><span style="font-weight: 600;">Filter:</span> <span style="font-weight: 400; color: #333;">${dateFilterLabel}</span></div>
                    </div>
                </div>

                <div class="separator"></div>

                <div style="width: 100%; font-size: 11.5px; line-height: 1.6; color: #000;">
                    <div style="display: flex; justify-content: space-between;"><span style="font-weight: 400; color: #444;">Transactions:</span> <span style="font-weight: 600; color: #111;">${totalOrders}</span></div>
                    <div style="display: flex; justify-content: space-between;"><span style="font-weight: 400; color: #444;">Cash:</span> <span style="font-weight: 500; color: #111;">Rs. ${formatNumber(totalSubtotal)}</span></div>
                    <div style="display: flex; justify-content: space-between;"><span style="font-weight: 400; color: #444;">Service Charges:</span> <span style="font-weight: 500; color: #111;">Rs. ${formatNumber(totalServiceCharges)}</span></div>
                    <div style="display: flex; justify-content: space-between;"><span style="font-weight: 400; color: #444;">Discount:</span> <span style="font-weight: 500; color: #111;">${totalDiscount > 0 ? 'Rs. ' + formatNumber(totalDiscount) : '0'}</span></div>
                    <div style="display: flex; justify-content: space-between;"><span style="font-weight: 600; color: #000;">Net Sale:</span> <span style="font-weight: 600; color: #000;">Rs. ${formatNumber(netSale)}</span></div>
                    <div style="display: flex; justify-content: space-between;"><span style="font-weight: 400; color: #444;">Average Sale:</span> <span style="font-weight: 500; color: #111;">Rs. ${formatNumber(Math.round(avgSale))}</span></div>
                    <div style="display: flex; justify-content: space-between;"><span style="font-weight: 400; color: #444;">Expenses:</span> <span style="font-weight: 500; color: #111;">Rs. ${formatNumber(totalExpenses)}</span></div>
                    <div style="border-top: 1.5px solid #000; margin: 5px 0 4px 0;"></div>
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13.5px;"><span style="font-weight: 700; text-transform: uppercase;">Cash In Hand:</span> <span style="font-weight: 700;">Rs. ${formatNumber(cashInHand)}</span></div>
                </div>

                <div class="separator"></div>
                <div style="text-align: center; font-size: 10.5px; font-weight: 500; color: #555; margin-top: 4px;">
                    Report Generated Successfully
                </div>

                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                        }, 180);
                    };
                    window.addEventListener('afterprint', function() {
                        window.close();
                    });
                </script>
            </body>
        </html>
    `);
    printWindow.document.close();
};

window.printItemsSales = () => {
    const sales = Storage.get('sales') || [];

    // Get filter values (same as loadItemsSales)
    const dateFilter = document.getElementById('itemsSalesDateFilter')?.value || 'all';
    const sortFilter = document.getElementById('itemsSalesSortFilter')?.value || 'quantity-desc';
    const searchTerm = (document.getElementById('itemsSalesSearch')?.value || '').toLowerCase().trim();

    // Filter sales by date range (same logic as loadItemsSales)
    let filteredSales = [...sales];
    const now = new Date();

    if (dateFilter === 'today') {
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        today.setHours(0, 0, 0, 0);
        const todayEnd = new Date(today);
        todayEnd.setHours(23, 59, 59, 999);
        filteredSales = sales.filter(sale => {
            if (!sale.date) return false;
            const saleDate = new Date(sale.date);
            return saleDate >= today && saleDate <= todayEnd;
        });
    } else if (dateFilter === 'week') {
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        today.setHours(0, 0, 0, 0);
        const currentDay = now.getDay();
        const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1;
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - daysFromMonday);
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);
        filteredSales = sales.filter(sale => {
            if (!sale.date) return false;
            const saleDate = new Date(sale.date);
            return saleDate >= weekStart && saleDate <= weekEnd;
        });
    } else if (dateFilter === 'month') {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        monthStart.setHours(0, 0, 0, 0);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        monthEnd.setHours(23, 59, 59, 999);
        filteredSales = sales.filter(sale => {
            if (!sale.date) return false;
            const saleDate = new Date(sale.date);
            return saleDate >= monthStart && saleDate <= monthEnd;
        });
    } else if (dateFilter === 'year') {
        const yearStart = new Date(now.getFullYear(), 0, 1);
        yearStart.setHours(0, 0, 0, 0);
        const yearEnd = new Date(now.getFullYear(), 11, 31);
        yearEnd.setHours(23, 59, 59, 999);
        filteredSales = sales.filter(sale => {
            if (!sale.date) return false;
            const saleDate = new Date(sale.date);
            return saleDate >= yearStart && saleDate <= yearEnd;
        });
    }

    // Aggregate items from filtered sales (same logic as loadItemsSales)
    const itemMap = {};

    filteredSales.forEach(sale => {
        // Process items from this sale
        if (sale.items && Array.isArray(sale.items)) {
            sale.items.forEach(item => {
                const itemName = item.name || 'Unknown';
                if (!itemMap[itemName]) {
                    itemMap[itemName] = {
                        name: itemName,
                        totalQuantity: 0,
                        totalRevenue: 0,
                        priceSum: 0,
                        priceCount: 0
                    };
                }

                const quantity = item.quantity || 0;
                const price = item.price || 0;
                const total = item.total || (price * quantity);

                itemMap[itemName].totalQuantity += quantity;
                itemMap[itemName].totalRevenue += total;
                itemMap[itemName].priceSum += price;
                itemMap[itemName].priceCount += 1;
            });
        } else {
            // Handle old format
            const itemName = sale.itemName || sale.dishName || 'Unknown';
            if (!itemMap[itemName]) {
                itemMap[itemName] = {
                    name: itemName,
                    totalQuantity: 0,
                    totalRevenue: 0,
                    priceSum: 0,
                    priceCount: 0
                };
            }

            const quantity = sale.quantity || 0;
            const price = sale.price || 0;
            const total = sale.total || (price * quantity);

            itemMap[itemName].totalQuantity += quantity;
            itemMap[itemName].totalRevenue += total;
            itemMap[itemName].priceSum += price;
            itemMap[itemName].priceCount += 1;
        }
    });

    // Convert to array and calculate averages
    let items = Object.values(itemMap).map(item => ({
        name: item.name,
        totalQuantity: item.totalQuantity,
        totalRevenue: item.totalRevenue,
        averagePrice: item.priceCount > 0 ? item.priceSum / item.priceCount : 0
    }));

    // Apply search filter
    if (searchTerm) {
        items = items.filter(item =>
            item.name.toLowerCase().includes(searchTerm)
        );
    }

    // Apply sorting
    if (sortFilter === 'quantity-desc') {
        items.sort((a, b) => b.totalQuantity - a.totalQuantity);
    } else if (sortFilter === 'quantity-asc') {
        items.sort((a, b) => a.totalQuantity - b.totalQuantity);
    } else if (sortFilter === 'revenue-desc') {
        items.sort((a, b) => b.totalRevenue - a.totalRevenue);
    } else if (sortFilter === 'revenue-asc') {
        items.sort((a, b) => a.totalRevenue - b.totalRevenue);
    } else if (sortFilter === 'name-asc') {
        items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortFilter === 'name-desc') {
        items.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Calculate totals
    const totalQuantity = items.reduce((sum, item) => sum + item.totalQuantity, 0);
    const totalRevenue = items.reduce((sum, item) => sum + item.totalRevenue, 0);
    const totalItems = items.length;

    // Get filter label
    let filterLabel = 'All Time';
    if (dateFilter === 'today') filterLabel = 'Daily';
    else if (dateFilter === 'week') filterLabel = 'Weekly';
    else if (dateFilter === 'month') filterLabel = 'Monthly';
    else if (dateFilter === 'year') filterLabel = 'Annual';
    else if (dateFilter === 'specific-month') {
        const selectedMonth = document.getElementById('itemsSalesMonthFilter')?.value;
        filterLabel = selectedMonth ? `Month: ${selectedMonth}` : 'Specific Month';
    }

    // Create receipt-style content for 80mm paper
    const nowDate = new Date();
    const dateStr = nowDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const timeStr = nowDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const currentDate = dateStr + ' ' + timeStr;

    // Build table HTML for items
    let tableRows = '';
    if (items.length === 0) {
        tableRows = '<tr><td colspan="4" style="text-align: center; padding: 10px; font-size: 11.5px; font-weight: 500;">No items sales data available</td></tr>';
    } else {
        items.forEach((item, index) => {
            const itemName = escapeHtml(item.name);
            const isLast = index === items.length - 1;
            const bottomBorder = isLast ? '' : 'border-bottom: 1px solid #000;';
            tableRows += `
                <tr style="${bottomBorder}">
                    <td style="text-align: left; padding: 4px 6px; font-size: 11.5px; font-weight: 500; border-right: 1px solid #000; color: #000;">${itemName}</td>
                    <td style="text-align: center; padding: 4px 4px; font-size: 12px; font-weight: 600; border-right: 1px solid #000; color: #000;">${formatQuantity(item.totalQuantity)}</td>
                    <td style="text-align: right; padding: 4px 5px; font-size: 11.5px; font-weight: 500; border-right: 1px solid #000; color: #000;">Rs.${formatNumber(item.averagePrice)}</td>
                    <td style="text-align: right; padding: 4px 6px; font-size: 12px; font-weight: 600; color: #000;">Rs.${formatNumber(item.totalRevenue)}</td>
                </tr>
            `;
        });
    }

    // Build summary row
    const summaryRow = `
        <tr style="border-top: 1.5px solid #000; font-weight: 700;">
            <td style="text-align: left; padding: 5px 6px; font-size: 12px; font-weight: 700; border-right: 1px solid #000; color: #000;">TOTAL</td>
            <td style="text-align: center; padding: 5px 4px; font-size: 12px; font-weight: 700; border-right: 1px solid #000; color: #000;">-</td>
            <td style="text-align: right; padding: 5px 5px; font-size: 12px; font-weight: 700; border-right: 1px solid #000; color: #000;">-</td>
            <td style="text-align: right; padding: 5px 6px; font-size: 13px; font-weight: 700; color: #000;">Rs.${formatNumber(totalRevenue)}</td>
        </tr>
    `;

    // Open print dialog
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Items Sales Report</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
                <style>
                    *, *::before, *::after {
                        box-sizing: border-box;
                        font-family: 'Poppins', sans-serif !important;
                    }
                    body {
                        font-family: 'Poppins', sans-serif !important;
                        padding: 8px;
                        font-size: 12px;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: center;
                        min-height: auto;
                        margin: 0 auto;
                        max-width: 80mm;
                        background: #fff;
                        color: #000;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .header-section {
                        text-align: center;
                        margin-bottom: 6px;
                        width: 100%;
                    }
                    .restaurant-name {
                        font-size: 18px;
                        font-weight: 800;
                        letter-spacing: 0.3px;
                        text-transform: uppercase;
                        margin-bottom: 2px;
                        color: #000;
                    }
                    .report-title-badge {
                        display: inline-block;
                        border: 1.5px solid #000;
                        padding: 2px 14px;
                        font-size: 11px;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        margin: 4px 0 2px 0;
                    }
                    .report-info {
                        font-size: 11px;
                        font-weight: 500;
                        color: #333;
                        line-height: 1.35;
                    }
                    .separator {
                        border-top: 1px dashed #999;
                        margin: 6px 0 7px 0;
                        width: 100%;
                    }
                    @media print {
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                        body {
                            padding: 3mm 0;
                            margin: 0;
                            max-width: 100%;
                            width: 100%;
                            background: #fff;
                            color: #000;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                        @page {
                            size: 80mm auto;
                            margin: 3mm;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="header-section">
                    <div class="restaurant-name">Hangout Lounge & Co.</div>
                    <div class="report-info">Wah Cantt</div>
                    <div class="report-info">Phone: 0300-9509536</div>
                    <div><span class="report-title-badge">ITEMS SALES REPORT</span></div>
                    <div class="separator"></div>
                    <div style="font-size: 11.5px; text-align: left; line-height: 1.5; color: #000;">
                        <div style="display: flex; justify-content: space-between;"><span style="font-weight: 600;">Date:</span> <span style="font-weight: 400; color: #333;">${currentDate}</span></div>
                        <div style="display: flex; justify-content: space-between;"><span style="font-weight: 600;">Filter:</span> <span style="font-weight: 400; color: #333;">${filterLabel}</span></div>
                    </div>
                </div>

                <div class="separator"></div>

                <table style="width: 100%; border-collapse: collapse; margin: 4px 0 6px 0; border: 1.5px solid #000; background: #fff;">
                    <thead>
                        <tr style="border-bottom: 1.5px solid #000;">
                            <th style="text-align: left; padding: 4px 6px; font-size: 11px; font-weight: 600; border-right: 1px solid #000; width: 44%; color: #000;">ITEM</th>
                            <th style="text-align: center; padding: 4px 3px; font-size: 11px; font-weight: 600; border-right: 1px solid #000; width: 14%; color: #000;">QTY</th>
                            <th style="text-align: right; padding: 4px 5px; font-size: 11px; font-weight: 600; border-right: 1px solid #000; width: 20%; color: #000;">PRICE</th>
                            <th style="text-align: right; padding: 4px 6px; font-size: 11px; font-weight: 600; width: 22%; color: #000;">REVENUE</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                        ${summaryRow}
                    </tbody>
                </table>

                <div class="separator"></div>
                <div style="width: 100%; font-size: 11.5px; line-height: 1.5; color: #000; text-align: center; margin-top: 4px;">
                    <div style="font-weight: 600;">Total Items: ${totalItems}</div>
                    <div style="font-size: 10.5px; color: #555; margin-top: 4px;">Report Generated Successfully</div>
                </div>
                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                        }, 180);
                    };
                    window.addEventListener('afterprint', function() {
                        window.close();
                    });
                </script>
            </body>
        </html>
    `);
    printWindow.document.close();
};

window.printExpenses = () => {
    const expenses = getCombinedExpenses();
    const printWindow = window.open('', '_blank');
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const currentDate = dateStr + ' ' + timeStr;

    // Get filter values (same as loadExpenses)
    const categoryFilter = document.getElementById('expenseCategoryFilter')?.value || 'all';
    const dateFilter = document.getElementById('expenseDateFilter')?.value || 'all';
    const startDate = document.getElementById('expenseStartDate')?.value;
    const endDate = document.getElementById('expenseEndDate')?.value;
    const searchQuery = document.getElementById('expenseSearch')?.value.trim().toLowerCase() || '';
    const sortFilter = document.getElementById('expenseSortFilter')?.value || 'date-desc';

    // Apply filters (same logic as loadExpenses)
    const nowFilter = new Date();
    const today = new Date(nowFilter.getFullYear(), nowFilter.getMonth(), nowFilter.getDate());
    today.setHours(0, 0, 0, 0);
    const todayEnd = new Date(today);
    todayEnd.setHours(23, 59, 59, 999);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    let filteredExpenses = expenses.filter(exp => {
        const matchesCategory = categoryFilter === 'all' || exp.category === categoryFilter;
        const matchesSearch = !searchQuery ||
            (exp.title || '').toLowerCase().includes(searchQuery) ||
            (exp.category || '').toLowerCase().includes(searchQuery);

        let matchesDateRange = true;
        if (dateFilter === 'custom') {
            if (startDate || endDate) {
                const expDate = new Date(exp.date);
                expDate.setHours(0, 0, 0, 0);
                if (startDate) {
                    const start = new Date(startDate);
                    start.setHours(0, 0, 0, 0);
                    if (expDate < start) matchesDateRange = false;
                }
                if (endDate) {
                    const end = new Date(endDate);
                    end.setHours(23, 59, 59, 999);
                    if (expDate > end) matchesDateRange = false;
                }
            }
        } else if (dateFilter === 'today') {
            const expDate = new Date(exp.date);
            expDate.setHours(0, 0, 0, 0);
            matchesDateRange = expDate.getTime() === today.getTime();
        } else if (dateFilter === 'week') {
            const expDate = new Date(exp.date);
            expDate.setHours(0, 0, 0, 0);
            matchesDateRange = expDate >= weekAgo && expDate <= todayEnd;
        } else if (dateFilter === 'month') {
            const expDate = new Date(exp.date);
            expDate.setHours(0, 0, 0, 0);
            matchesDateRange = expDate >= monthAgo && expDate <= todayEnd;
        } else if (dateFilter === 'specific-month') {
            const selectedMonth = document.getElementById('expenseMonthFilter')?.value;
            if (selectedMonth) {
                const [year, month] = selectedMonth.split('-').map(Number);
                const expDate = new Date(exp.date);
                matchesDateRange = expDate.getFullYear() === year && (expDate.getMonth() + 1) === month;
            }
        }

        return matchesCategory && matchesDateRange && matchesSearch;
    });

    // Apply sorting
    if (sortFilter === 'date-desc') {
        // Sort by expense date (not createdAt) - newest expense date first
        filteredExpenses.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            // If dates are the same, use createdAt as tiebreaker (newer entry first)
            if (dateA.getTime() === dateB.getTime()) {
                const createdA = a.createdAt ? new Date(a.createdAt) : new Date(0);
                const createdB = b.createdAt ? new Date(b.createdAt) : new Date(0);
                return createdB - createdA;
            }
            return dateB - dateA; // Latest expense date first
        });
    } else if (sortFilter === 'date-asc') {
        // Sort by expense date (not createdAt) - oldest expense date first
        filteredExpenses.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            // If dates are the same, use createdAt as tiebreaker (older entry first)
            if (dateA.getTime() === dateB.getTime()) {
                const createdA = a.createdAt ? new Date(a.createdAt) : new Date(0);
                const createdB = b.createdAt ? new Date(b.createdAt) : new Date(0);
                return createdA - createdB;
            }
            return dateA - dateB; // Oldest expense date first
        });
    } else if (sortFilter === 'amount-desc') {
        filteredExpenses.sort((a, b) => (b.amount || 0) - (a.amount || 0));
    } else if (sortFilter === 'amount-asc') {
        filteredExpenses.sort((a, b) => (a.amount || 0) - (b.amount || 0));
    }

    // Calculate totals
    const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);

    // Get filter labels
    let dateFilterLabel = 'All Time';
    if (dateFilter === 'today') dateFilterLabel = 'Today';
    else if (dateFilter === 'week') dateFilterLabel = 'Weekly';
    else if (dateFilter === 'month') dateFilterLabel = 'Monthly';
    else if (dateFilter === 'specific-month') {
        const selectedMonth = document.getElementById('expenseMonthFilter')?.value;
        dateFilterLabel = selectedMonth ? `Month: ${selectedMonth}` : 'Specific Month';
    } else if (dateFilter === 'custom') dateFilterLabel = 'Custom';

    let categoryFilterLabel = 'All';
    if (categoryFilter !== 'all') {
        categoryFilterLabel = categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1);
    }

    let expenseRows = '';
    if (filteredExpenses.length === 0) {
        expenseRows = '<tr><td colspan="4" style="text-align: center; padding: 10px; font-size: 11.5px; font-weight: 500;">No expenses found</td></tr>';
    } else {
        filteredExpenses.forEach((exp, index) => {
            const expenseDate = new Date(exp.date);
            const dateStr = formatDate(expenseDate);
            const title = escapeHtml(exp.title || 'N/A');
            const category = escapeHtml(exp.category || 'N/A');
            const isLast = index === filteredExpenses.length - 1;
            const bottomBorder = isLast ? '' : 'border-bottom: 1px solid #000;';

            expenseRows += `
                <tr style="${bottomBorder}">
                    <td style="text-align: left; padding: 4px 5px; font-size: 10.5px; font-weight: 500; border-right: 1px solid #000; color: #000;">${dateStr}</td>
                    <td style="text-align: left; padding: 4px 6px; font-size: 11px; font-weight: 500; border-right: 1px solid #000; color: #000;">${title}</td>
                    <td style="text-align: left; padding: 4px 5px; font-size: 10.5px; font-weight: 500; border-right: 1px solid #000; color: #000;">${category}</td>
                    <td style="text-align: right; padding: 4px 6px; font-size: 11.5px; font-weight: 600; color: #000;">Rs.${formatNumber(exp.amount || 0)}</td>
                </tr>
            `;
        });
    }

    // Build summary row
    const summaryRow = `
        <tr style="border-top: 1.5px solid #000; font-weight: 700;">
            <td style="text-align: left; padding: 5px 5px; font-size: 11.5px; font-weight: 700; border-right: 1px solid #000; color: #000;">TOTAL</td>
            <td style="text-align: left; padding: 5px 6px; font-size: 11px; font-weight: 700; border-right: 1px solid #000; color: #000;">${filteredExpenses.length} Items</td>
            <td style="text-align: left; padding: 5px 5px; font-size: 11px; font-weight: 700; border-right: 1px solid #000; color: #000;">-</td>
            <td style="text-align: right; padding: 5px 6px; font-size: 12.5px; font-weight: 700; color: #000;">Rs.${formatNumber(totalExpenses)}</td>
        </tr>
    `;

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Expenses Report</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
                <style>
                    *, *::before, *::after {
                        box-sizing: border-box;
                        font-family: 'Poppins', sans-serif !important;
                    }
                    body {
                        font-family: 'Poppins', sans-serif !important;
                        padding: 8px;
                        font-size: 12px;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: center;
                        min-height: auto;
                        margin: 0 auto;
                        max-width: 80mm;
                        background: #fff;
                        color: #000;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .header-section {
                        text-align: center;
                        margin-bottom: 6px;
                        width: 100%;
                    }
                    .restaurant-name {
                        font-size: 18px;
                        font-weight: 800;
                        letter-spacing: 0.3px;
                        text-transform: uppercase;
                        margin-bottom: 2px;
                        color: #000;
                    }
                    .report-title-badge {
                        display: inline-block;
                        border: 1.5px solid #000;
                        padding: 2px 14px;
                        font-size: 11px;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        margin: 4px 0 2px 0;
                    }
                    .report-info {
                        font-size: 11px;
                        font-weight: 500;
                        color: #333;
                        line-height: 1.35;
                    }
                    .separator {
                        border-top: 1px dashed #999;
                        margin: 6px 0 7px 0;
                        width: 100%;
                    }
                    @media print {
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                        body {
                            padding: 3mm 0;
                            margin: 0;
                            max-width: 100%;
                            width: 100%;
                            background: #fff;
                            color: #000;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                        @page {
                            size: 80mm auto;
                            margin: 3mm;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="header-section">
                    <div class="restaurant-name">Hangout Lounge & Co.</div>
                    <div class="report-info">Wah Cantt</div>
                    <div class="report-info">Phone: 0300-9509536</div>
                    <div><span class="report-title-badge">EXPENSES REPORT</span></div>
                    <div class="separator"></div>
                    <div style="font-size: 11.5px; text-align: left; line-height: 1.5; color: #000;">
                        <div style="display: flex; justify-content: space-between;"><span style="font-weight: 600;">Date:</span> <span style="font-weight: 400; color: #333;">${currentDate}</span></div>
                        <div style="display: flex; justify-content: space-between;"><span style="font-weight: 600;">Filter:</span> <span style="font-weight: 400; color: #333;">${dateFilterLabel} | ${categoryFilterLabel}</span></div>
                    </div>
                </div>

                <div class="separator"></div>

                <table style="width: 100%; border-collapse: collapse; margin: 4px 0 6px 0; border: 1.5px solid #000; background: #fff;">
                    <thead>
                        <tr style="border-bottom: 1.5px solid #000;">
                            <th style="text-align: left; padding: 4px 5px; font-size: 11px; font-weight: 600; border-right: 1px solid #000; width: 22%; color: #000;">DATE</th>
                            <th style="text-align: left; padding: 4px 6px; font-size: 11px; font-weight: 600; border-right: 1px solid #000; width: 34%; color: #000;">TITLE</th>
                            <th style="text-align: left; padding: 4px 5px; font-size: 11px; font-weight: 600; border-right: 1px solid #000; width: 22%; color: #000;">CATEGORY</th>
                            <th style="text-align: right; padding: 4px 6px; font-size: 11px; font-weight: 600; width: 22%; color: #000;">AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${expenseRows}
                        ${summaryRow}
                    </tbody>
                </table>
                <div class="separator"></div>
                <div style="width: 100%; font-size: 11.5px; line-height: 1.5; color: #000; text-align: center; margin-top: 4px;">
                    <div style="font-weight: 600;">Total Expenses: Rs. ${formatNumber(totalExpenses)}</div>
                    <div style="font-size: 10.5px; color: #555; margin-top: 4px;">Report Generated Successfully</div>
                </div>

                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                        }, 180);
                    };
                    window.addEventListener('afterprint', function() {
                        window.close();
                    });
                </script>
            </body>
        </html>
    `);
    printWindow.document.close();
};

// Expenses Management
let editingExpenseId = null;

// Get all expenses combined with employee payouts
function getCombinedExpenses() {
    const rawExpenses = Storage.get('expenses') || [];
    const employees = Storage.get('employees') || [];

    const payoutExpenses = [];
    employees.forEach(emp => {
        const payouts = Array.isArray(emp.payouts) ? emp.payouts : [];
        payouts.forEach(p => {
            const date = p.date || (p.createdAt ? p.createdAt.split('T')[0] : getLocalISODate());
            payoutExpenses.push({
                id: `payout_${emp.id}_${p.id}`,
                payoutId: p.id,
                employeeId: emp.id,
                employeeName: emp.name,
                isEmployeePayout: true,
                title: `Salary Payout - ${emp.name}${p.notes ? ` (${p.notes})` : ''}`,
                amount: parseFloat(p.amount) || 0,
                category: 'salary',
                date: date,
                createdAt: p.createdAt || (date ? `${date}T00:00:00.000Z` : new Date().toISOString()),
                time: p.time || ''
            });
        });
    });

    return [...rawExpenses, ...payoutExpenses];
}

// Initialize expense categories
function initializeExpenseCategories() {
    let categories = Storage.get('expenseCategories');
    if (!categories || categories.length === 0) {
        categories = ['kitchen', 'bill', 'factory', 'salary'];
        Storage.set('expenseCategories', categories);
    } else if (!categories.includes('salary')) {
        categories.push('salary');
        Storage.set('expenseCategories', categories);
    }
}

// Category Management
const expenseCategoryForm = document.getElementById('expenseCategoryForm');
if (expenseCategoryForm) {
    expenseCategoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const categories = Storage.get('expenseCategories') || [];
        const categoryName = document.getElementById('newCategoryName').value.trim().toLowerCase();

        if (!categoryName) return;

        if (editingExpenseCategoryName !== null) {
            // Update existing category
            const oldName = editingExpenseCategoryName;
            const index = categories.indexOf(oldName);

            if (index !== -1 && categoryName !== oldName) {
                // Check if new name already exists
                if (categories.includes(categoryName)) {
                    alert('Category with this name already exists!');
                    return;
                }

                // Update category name
                categories[index] = categoryName;

                // Update all expenses with this category
                const expenses = Storage.get('expenses') || [];
                expenses.forEach(exp => {
                    if (exp.category === oldName) {
                        exp.category = categoryName;
                    }
                });
                Storage.set('expenses', expenses);
            }

            editingExpenseCategoryName = null;
        } else {
            // Add new category
            if (categories.includes(categoryName)) {
                alert('Category with this name already exists!');
                return;
            }
            categories.push(categoryName);
        }

        Storage.set('expenseCategories', categories);
        document.getElementById('newCategoryName').value = '';

        // Reset button text
        const submitButton = document.querySelector('#expenseCategoryForm button[type="submit"]');
        if (submitButton) {
            submitButton.textContent = 'Add Category';
        }

        loadExpenseCategories();
        updateExpenseCategoryDropdown();
        loadExpenses(); // Refresh expenses to show updated category names
    });
}

let editingExpenseCategoryName = null;

function loadExpenseCategories() {
    const categories = Storage.get('expenseCategories') || [];
    const container = document.getElementById('expenseCategoriesList');
    if (!container) return;

    container.innerHTML = '';

    if (categories.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 20px; color: #999;">No categories found</div>';
        return;
    }

    categories.forEach(category => {
        const categoryRow = document.createElement('div');
        categoryRow.style.cssText = 'display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 12px 15px; background: #f8f8f8; border-radius: 6px; border: 1px solid #e0e0e0;';
        categoryRow.innerHTML = `
            <span style="font-weight: 600; color: #333; text-transform: capitalize; flex: 1;">${category}</span>
            <div class="table-actions-cell">
                <button class="btn-action btn-action-edit" onclick="editExpenseCategory('${category}')" title="Edit Category">${ICONS.edit}</button>
                <button class="btn-action btn-action-delete" onclick="deleteExpenseCategory('${category}', this)" title="Delete Category">${ICONS.delete}</button>
            </div>
        `;
        container.appendChild(categoryRow);
    });
}

window.editExpenseCategory = (categoryName) => {
    editingExpenseCategoryName = categoryName;
    document.getElementById('newCategoryName').value = categoryName;
    document.getElementById('newCategoryName').focus();

    // Change button text
    const submitButton = document.querySelector('#expenseCategoryForm button[type="submit"]');
    if (submitButton) {
        submitButton.textContent = 'Update Category';
    }
};

window.deleteExpenseCategory = (category, buttonElement) => {
    if (buttonElement) {
        showDeleteConfirmation(buttonElement, deleteExpenseCategoryConfirmed, category);
        return;
    }
    deleteExpenseCategoryConfirmed(category);
};

function deleteExpenseCategoryConfirmed(category) {
    const categories = Storage.get('expenseCategories') || [];
    const filtered = categories.filter(cat => cat !== category);
    Storage.set('expenseCategories', filtered);
    loadExpenseCategories();
    updateExpenseCategoryDropdown();
}

function updateExpenseCategoryDropdown() {
    const categories = Storage.get('expenseCategories') || [];
    const select = document.getElementById('expenseCategory');
    const filterSelect = document.getElementById('expenseCategoryFilter');

    if (select) {
        const currentValue = select.value;
        select.innerHTML = '<option value="">Select Category</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            select.appendChild(option);
        });
        if (currentValue && categories.includes(currentValue)) {
            select.value = currentValue;
        }
    }

    if (filterSelect) {
        const currentValue = filterSelect.value;
        filterSelect.innerHTML = '<option value="all">All Categories</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            filterSelect.appendChild(option);
        });
        if (currentValue && (currentValue === 'all' || categories.includes(currentValue))) {
            filterSelect.value = currentValue;
        }
    }
}

const expenseForm = document.getElementById('expenseForm');
if (expenseForm) {
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const expenses = Storage.get('expenses') || [];
        const date = document.getElementById('expenseDate').value;
        const category = document.getElementById('expenseCategory').value.trim().toLowerCase();
        const title = document.getElementById('expenseTitle').value.trim();
        const amount = parseFloat(document.getElementById('expenseAmount').value) || 0;

        if (editingExpenseId !== null) {
            const index = expenses.findIndex(exp => exp.id === editingExpenseId);
            if (index !== -1) {
                const existingExpense = expenses[index];
                expenses[index] = {
                    id: editingExpenseId,
                    date,
                    category,
                    title,
                    amount,
                    createdAt: existingExpense.createdAt || (existingExpense.id && typeof existingExpense.id === 'number' && existingExpense.id > 1000000000000 ? new Date(existingExpense.id).toISOString() : new Date().toISOString())
                };
            }
            editingExpenseId = null;
        } else {
            const now = new Date();
            const newExpense = {
                id: Date.now(),
                date,
                category,
                title,
                amount,
                createdAt: now.toISOString()
            };
            expenses.push(newExpense);
        }

        Storage.set('expenses', expenses);
        document.getElementById('expenseForm').reset();
        closeAddExpenseModal();
        loadExpenses();
        if (typeof loadDashboard === 'function') loadDashboard();
    });
}

window.loadExpenses = function loadExpenses() {
    const expenses = getCombinedExpenses();
    const tbody = document.getElementById('expenseTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    // Get filter values
    const categoryFilter = document.getElementById('expenseCategoryFilter')?.value || 'all';
    const dateFilter = document.getElementById('expenseDateFilter')?.value || 'all';
    const startDate = document.getElementById('expenseStartDate')?.value;
    const endDate = document.getElementById('expenseEndDate')?.value;
    const searchQuery = document.getElementById('expenseSearch')?.value.trim().toLowerCase() || '';

    // Update category filter dropdown
    updateExpenseCategoryDropdown();

    // Calculate summary totals
    const now = new Date();
    const todayStr = getLocalISODate(now);
    const thisMonthStr = getLocalISOMonth(now);
    const thisYearNum = now.getFullYear();

    const todayExpenses = expenses.filter(exp => {
        if (!exp.date) return false;
        const expDate = new Date(exp.date);
        return !isNaN(expDate.getTime()) && getLocalISODate(expDate) === todayStr;
    }).reduce((sum, exp) => sum + (exp.amount || 0), 0);

    const monthExpenses = expenses.filter(exp => {
        if (!exp.date) return false;
        const expDate = new Date(exp.date);
        return !isNaN(expDate.getTime()) && getLocalISODate(expDate).substring(0, 7) === thisMonthStr;
    }).reduce((sum, exp) => sum + (exp.amount || 0), 0);

    const yearExpenses = expenses.filter(exp => {
        if (!exp.date) return false;
        const expDate = new Date(exp.date);
        return !isNaN(expDate.getTime()) && expDate.getFullYear() === thisYearNum;
    }).reduce((sum, exp) => sum + (exp.amount || 0), 0);

    // Update summary cards
    const expensesTodayEl = document.getElementById('expensesToday');
    const expensesMonthEl = document.getElementById('expensesMonth');
    const expensesYearEl = document.getElementById('expensesYear');

    if (expensesTodayEl) expensesTodayEl.textContent = `Rs. ${formatNumber(todayExpenses)}`;
    if (expensesMonthEl) expensesMonthEl.textContent = `Rs. ${formatNumber(monthExpenses)}`;
    if (expensesYearEl) expensesYearEl.textContent = `Rs. ${formatNumber(yearExpenses)}`;

    // Apply filters
    const selectedDate = document.getElementById('expenseDateInput')?.value || getLocalISODate();
    const selectedMonth = document.getElementById('expenseMonthInput')?.value || getLocalISOMonth();
    const selectedYear = document.getElementById('expenseYearInput')?.value || String(new Date().getFullYear());

    let filteredExpenses = expenses.filter(exp => {
        const matchesCategory = categoryFilter === 'all' || exp.category === categoryFilter;

        // Search filter
        const matchesSearch = !searchQuery ||
            (exp.title || '').toLowerCase().includes(searchQuery) ||
            (exp.category || '').toLowerCase().includes(searchQuery);

        let matchesDateRange = true;

        if (dateFilter !== 'all') {
            if (!exp.date) {
                matchesDateRange = false;
            } else {
                const expDate = new Date(exp.date);
                if (isNaN(expDate.getTime())) {
                    matchesDateRange = false;
                } else {
                    const isoDate = getLocalISODate(expDate);
                    if (dateFilter === 'today') {
                        matchesDateRange = (isoDate === selectedDate);
                    } else if (dateFilter === 'month') {
                        matchesDateRange = (isoDate.substring(0, 7) === selectedMonth);
                    } else if (dateFilter === 'year') {
                        matchesDateRange = (String(expDate.getFullYear()) === String(selectedYear));
                    }
                }
            }
        }

        return matchesCategory && matchesDateRange && matchesSearch;
    });

    // Get sort filter
    const sortFilter = document.getElementById('expenseSortFilter')?.value || 'date-desc';

    // Apply sorting
    if (sortFilter === 'date-desc') {
        // Sort by expense date (not createdAt) - newest expense date first
        filteredExpenses.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            // If dates are the same, use createdAt as tiebreaker (newer entry first)
            if (dateA.getTime() === dateB.getTime()) {
                const createdA = a.createdAt ? new Date(a.createdAt) : new Date(0);
                const createdB = b.createdAt ? new Date(b.createdAt) : new Date(0);
                return createdB - createdA;
            }
            return dateB - dateA; // Latest expense date first
        });
    } else if (sortFilter === 'date-asc') {
        // Sort by expense date (not createdAt) - oldest expense date first
        filteredExpenses.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            // If dates are the same, use createdAt as tiebreaker (older entry first)
            if (dateA.getTime() === dateB.getTime()) {
                const createdA = a.createdAt ? new Date(a.createdAt) : new Date(0);
                const createdB = b.createdAt ? new Date(b.createdAt) : new Date(0);
                return createdA - createdB;
            }
            return dateA - dateB; // Oldest expense date first
        });
    } else if (sortFilter === 'amount-desc') {
        filteredExpenses.sort((a, b) => (b.amount || 0) - (a.amount || 0));
    } else if (sortFilter === 'amount-asc') {
        filteredExpenses.sort((a, b) => (a.amount || 0) - (b.amount || 0));
    }

    // Calculate total expenses
    const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
    const totalExpensesEl = document.getElementById('totalExpensesAmount');
    if (totalExpensesEl) totalExpensesEl.textContent = `Rs. ${formatNumber(totalExpenses)}`;

    if (filteredExpenses.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px; color: #999;">No expenses found</td></tr>';
        return;
    }

    // Category colors for tags
    const categories = Storage.get('expenseCategories') || [];
    const categoryColors = ['#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#00bcd4', '#4caf50', '#8bc34a', '#ffc107', '#ff9800', '#f44336'];
    const colorMap = {
        'salary': '#27ae60'
    };
    categories.forEach((cat, index) => {
        if (!colorMap[cat]) {
            colorMap[cat] = categoryColors[index % categoryColors.length];
        }
    });

    filteredExpenses.forEach(expense => {
        const tr = document.createElement('tr');
        const expenseDate = new Date(expense.date);
        const dateStr = formatDate(expenseDate);

        // Get time from createdAt if available, otherwise derive from id (timestamp)
        let timeStr = expense.time || '';
        if (!timeStr) {
            if (expense.createdAt) {
                timeStr = formatTime(new Date(expense.createdAt));
            } else if (expense.id && typeof expense.id === 'number' && expense.id > 1000000000000) {
                timeStr = formatTime(new Date(expense.id));
            } else {
                timeStr = '';
            }
        }

        const dateTimeStr = timeStr ? `${dateStr} ${timeStr}` : dateStr;
        const categoryColor = colorMap[expense.category] || '#999';

        const editAction = expense.isEmployeePayout
            ? `onclick="editPayout(${expense.employeeId}, ${expense.payoutId})"`
            : `onclick="editExpense(${expense.id})"`;

        const deleteAction = expense.isEmployeePayout
            ? `onclick="deleteExpensePayout('${expense.employeeId}', '${expense.payoutId}', this)"`
            : `onclick="deleteExpense(${expense.id}, this)"`;

        tr.innerHTML = `
            <td>
                <div style="font-weight: 600; color: #333; display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                    <span>${expense.title || 'Untitled'}</span>
                    ${expense.isEmployeePayout ? '<span style="font-size: 11px; background: #e8f5e9; color: #2e7d32; border: 1px solid #c8e6c9; padding: 1px 7px; border-radius: 4px; font-weight: 600;">Staff Payout</span>' : ''}
                </div>
            </td>
            <td style="font-weight: 700; color: #1e3a5f;">Rs. ${formatNumber(expense.amount || 0)}</td>
            <td>
                <span style="background: ${categoryColor}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 500; text-transform: capitalize;">${expense.category || 'uncategorized'}</span>
            </td>
            <td>${dateTimeStr}</td>
            <td>
                <div class="table-actions-cell">
                    <button class="btn-action btn-action-edit" ${editAction} title="Edit Expense">${ICONS.edit}</button>
                    <button class="btn-action btn-action-delete" ${deleteAction} title="Delete Expense">${ICONS.delete}</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.toggleExpenseCategories = () => {
    loadExpenseCategories();
    document.getElementById('expenseCategoryModal').style.display = 'flex';
};

window.closeExpenseCategoryModal = () => {
    document.getElementById('expenseCategoryModal').style.display = 'none';
    document.getElementById('expenseCategoryForm').reset();
    editingExpenseCategoryName = null;

    // Reset button text
    const submitButton = document.querySelector('#expenseCategoryForm button[type="submit"]');
    if (submitButton) {
        submitButton.textContent = 'Add Category';
    }
};

window.openAddExpenseModal = () => {
    editingExpenseId = null;
    document.getElementById('expenseModalTitle').textContent = 'Add Expense';
    document.getElementById('expenseForm').reset();
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('expenseDate').value = today;
    updateExpenseCategoryDropdown();
    document.getElementById('addExpenseModal').style.display = 'flex';
};

window.closeAddExpenseModal = () => {
    editingExpenseId = null;
    document.getElementById('expenseForm').reset();
    document.getElementById('addExpenseModal').style.display = 'none';
};

window.editExpense = (id) => {
    if (typeof id === 'string' && id.startsWith('payout_')) {
        const parts = id.split('_');
        const empId = isNaN(Number(parts[1])) ? parts[1] : Number(parts[1]);
        const pId = isNaN(Number(parts[2])) ? parts[2] : Number(parts[2]);
        editPayout(empId, pId);
        return;
    }

    // Require password before editing
    openActionPasswordModal(() => {
        const expenses = Storage.get('expenses') || [];
        const expense = expenses.find(exp => exp.id === id);
        if (expense) {
            editingExpenseId = id;
            document.getElementById('expenseModalTitle').textContent = 'Edit Expense';
            document.getElementById('expenseDate').value = expense.date;
            document.getElementById('expenseCategory').value = expense.category;
            document.getElementById('expenseTitle').value = expense.title || '';
            document.getElementById('expenseAmount').value = expense.amount || '';
            updateExpenseCategoryDropdown();
            document.getElementById('addExpenseModal').style.display = 'flex';
        } else {
            alert('Expense not found!');
        }
    });
};

window.deleteExpense = (id, buttonElement) => {
    if (typeof id === 'string' && id.startsWith('payout_')) {
        const parts = id.split('_');
        const empId = parts[1];
        const pId = parts[2];
        deleteExpensePayout(empId, pId, buttonElement);
        return;
    }

    // Require password before deleting
    openActionPasswordModal(() => {
        // Re-find button element after password verification (in case DOM changed)
        if (!buttonElement) {
            const expenseTable = document.getElementById('expenseTableBody');
            if (expenseTable) {
                const rows = expenseTable.querySelectorAll('tr');
                for (let row of rows) {
                    const deleteBtn = row.querySelector(`button[onclick*="deleteExpense(${id}"]`);
                    if (deleteBtn) {
                        buttonElement = deleteBtn;
                        break;
                    }
                }
            }
        }

        if (buttonElement) {
            showDeleteConfirmation(buttonElement, deleteExpenseConfirmed, id);
        } else {
            // If button not found, directly delete (skip confirmation)
            deleteExpenseConfirmed(id);
        }
    });
};

window.deleteExpensePayout = (employeeId, payoutId, buttonElement) => {
    openActionPasswordModal(() => {
        if (buttonElement) {
            showDeleteConfirmation(buttonElement, deleteExpensePayoutConfirmed, employeeId, payoutId);
        } else {
            deleteExpensePayoutConfirmed(employeeId, payoutId);
        }
    });
};

function deleteExpensePayoutConfirmed(employeeId, payoutId) {
    const employees = Storage.get('employees') || [];
    const emp = employees.find(e => String(e.id) === String(employeeId));
    if (!emp) return;

    emp.payouts = (Array.isArray(emp.payouts) ? emp.payouts : []).filter(p => String(p.id) !== String(payoutId));
    Storage.set('employees', employees);

    loadExpenses();
    loadEmployees();
    if (currentPayoutsListEmployeeId && String(currentPayoutsListEmployeeId) === String(employeeId)) {
        renderPayoutsListModal(employeeId);
    }
    if (typeof loadDashboard === 'function') loadDashboard();
}

function deleteExpenseConfirmed(id) {
    const expenses = Storage.get('expenses') || [];
    const filtered = expenses.filter(exp => exp.id !== id);
    Storage.set('expenses', filtered);
    loadExpenses();
    if (typeof loadDashboard === 'function') loadDashboard();
}

// ==========================================
// STOCK & INGREDIENT MANAGEMENT SYSTEM
// ==========================================
let editingStockId = null;
let currentQuickAdjustStockId = null;
let currentQuickAdjustType = 'add';

// Default starter cafe raw materials & ingredients for Hangout Lounge & Co.
const DEFAULT_CAFE_STOCK_ITEMS = [
    // Poultry, Meat & Seafood
    { itemName: "Chicken (Boneless)", quantity: 25, unit: "kg", unitPrice: 650, minLevel: 5 },
    { itemName: "Chicken (With Bone)", quantity: 20, unit: "kg", unitPrice: 420, minLevel: 5 },
    { itemName: "Chicken Wings", quantity: 12, unit: "kg", unitPrice: 480, minLevel: 3 },
    { itemName: "Chicken Patty (Zinger / Burger)", quantity: 50, unit: "pcs", unitPrice: 110, minLevel: 15 },
    { itemName: "Beef Meat (Boneless)", quantity: 15, unit: "kg", unitPrice: 1050, minLevel: 3 },
    { itemName: "Beef Mince / Qeema", quantity: 12, unit: "kg", unitPrice: 1100, minLevel: 3 },
    { itemName: "Mutton Meat", quantity: 10, unit: "kg", unitPrice: 1800, minLevel: 2 },
    { itemName: "Fish Fillet", quantity: 10, unit: "kg", unitPrice: 950, minLevel: 2 },

    // Fresh Vegetables & Herbs
    { itemName: "Potatoes (Aloo)", quantity: 40, unit: "kg", unitPrice: 90, minLevel: 10 },
    { itemName: "Tomatoes (Tamatar)", quantity: 25, unit: "kg", unitPrice: 120, minLevel: 5 },
    { itemName: "Onions (Piyaz)", quantity: 30, unit: "kg", unitPrice: 110, minLevel: 8 },
    { itemName: "Garlic & Ginger Paste", quantity: 10, unit: "kg", unitPrice: 450, minLevel: 2 },
    { itemName: "Green Chillies (Hari Mirch)", quantity: 5, unit: "kg", unitPrice: 180, minLevel: 1 },
    { itemName: "Fresh Coriander & Mint", quantity: 15, unit: "pack", unitPrice: 40, minLevel: 3 },
    { itemName: "Capsicum (Shimla Mirch)", quantity: 8, unit: "kg", unitPrice: 160, minLevel: 2 },
    { itemName: "Iceberg / Salad Lettuce", quantity: 6, unit: "kg", unitPrice: 220, minLevel: 2 },
    { itemName: "Lemons", quantity: 4, unit: "kg", unitPrice: 200, minLevel: 1 },
    { itemName: "Mushrooms (Sliced)", quantity: 8, unit: "can", unitPrice: 320, minLevel: 2 },
    { itemName: "Black Olives & Jalapenos", quantity: 8, unit: "can", unitPrice: 380, minLevel: 2 },

    // Dairy & Eggs
    { itemName: "Eggs", quantity: 150, unit: "pcs", unitPrice: 28, minLevel: 30 },
    { itemName: "Milk (Fresh / Packed)", quantity: 40, unit: "L", unitPrice: 260, minLevel: 10 },
    { itemName: "Mozzarella Cheese", quantity: 15, unit: "kg", unitPrice: 1400, minLevel: 3 },
    { itemName: "Cheddar Cheese Slices", quantity: 20, unit: "pack", unitPrice: 550, minLevel: 5 },
    { itemName: "Cooking Cream (Tetra)", quantity: 20, unit: "pack", unitPrice: 210, minLevel: 5 },
    { itemName: "Yogurt / Dahi", quantity: 15, unit: "kg", unitPrice: 220, minLevel: 3 },
    { itemName: "Butter / Makhan", quantity: 8, unit: "kg", unitPrice: 950, minLevel: 2 },

    // Bakery, Breads & Grains
    { itemName: "Burger Buns", quantity: 60, unit: "pcs", unitPrice: 40, minLevel: 15 },
    { itemName: "Sandwich Bread", quantity: 20, unit: "pack", unitPrice: 130, minLevel: 5 },
    { itemName: "Tortilla / Shawarma Wraps", quantity: 15, unit: "pack", unitPrice: 280, minLevel: 4 },
    { itemName: "Pizza Dough Base / Maida", quantity: 30, unit: "kg", unitPrice: 140, minLevel: 8 },
    { itemName: "Basmati Rice", quantity: 35, unit: "kg", unitPrice: 320, minLevel: 8 },
    { itemName: "Flour (Atta / Maida)", quantity: 40, unit: "kg", unitPrice: 130, minLevel: 10 },

    // Cooking Oils, Sauces & Condiments
    { itemName: "Cooking Oil", quantity: 40, unit: "L", unitPrice: 460, minLevel: 10 },
    { itemName: "Mayonnaise", quantity: 15, unit: "kg", unitPrice: 380, minLevel: 3 },
    { itemName: "Tomato Ketchup / Sauce", quantity: 12, unit: "kg", unitPrice: 320, minLevel: 3 },
    { itemName: "Garlic Mayo Sauce", quantity: 8, unit: "kg", unitPrice: 420, minLevel: 2 },
    { itemName: "Pizza Sauce", quantity: 10, unit: "kg", unitPrice: 480, minLevel: 2 },
    { itemName: "BBQ Sauce", quantity: 8, unit: "bottle", unitPrice: 350, minLevel: 2 },
    { itemName: "Chilli Garlic Sauce", quantity: 10, unit: "kg", unitPrice: 340, minLevel: 2 },
    { itemName: "Soy Sauce & Vinegar", quantity: 10, unit: "bottle", unitPrice: 160, minLevel: 3 },

    // Spices, Seasonings & Dry Goods
    { itemName: "Special Karahi / Handi Masala", quantity: 6, unit: "kg", unitPrice: 850, minLevel: 1.5 },
    { itemName: "Biryani Masala Mix", quantity: 5, unit: "kg", unitPrice: 750, minLevel: 1 },
    { itemName: "Red Chilli, Salt & Turmeric", quantity: 10, unit: "kg", unitPrice: 550, minLevel: 2 },
    { itemName: "Black Pepper & White Pepper", quantity: 4, unit: "kg", unitPrice: 1200, minLevel: 1 },
    { itemName: "Oregano & Herbs", quantity: 6, unit: "pack", unitPrice: 280, minLevel: 1 },

    // Beverages, Tea, Coffee & Sweets
    { itemName: "Tea Leaves (Patti)", quantity: 8, unit: "kg", unitPrice: 1200, minLevel: 2 },
    { itemName: "Green Tea / Kehwa Leaves", quantity: 10, unit: "pack", unitPrice: 250, minLevel: 2 },
    { itemName: "Coffee Beans / Powder", quantity: 4, unit: "kg", unitPrice: 2800, minLevel: 1 },
    { itemName: "Sugar", quantity: 35, unit: "kg", unitPrice: 160, minLevel: 10 },
    { itemName: "Nutella / Chocolate Spread", quantity: 6, unit: "kg", unitPrice: 1800, minLevel: 1.5 },
    { itemName: "Ice Cream Base / Falooda Mix", quantity: 15, unit: "L", unitPrice: 600, minLevel: 3 },
    { itemName: "Rooh Afza / Syrups", quantity: 8, unit: "bottle", unitPrice: 320, minLevel: 2 }
];

// Retrieve or initialize stocks
function syncAndGetStockItems() {
    let savedStocks = Storage.get('stocks');
    const isSeededV3 = Storage.get('stock_ingredients_seeded_v3');
    
    // Automatically seed/upgrade stock if empty or if previous session contained legacy/menu-mirror stock
    if (!savedStocks || !Array.isArray(savedStocks) || savedStocks.length === 0 || !isSeededV3) {
        const baseId = Date.now();
        savedStocks = DEFAULT_CAFE_STOCK_ITEMS.map((item, index) => ({
            id: 'stock_' + (baseId + index),
            itemName: item.itemName,
            quantity: item.quantity,
            unit: item.unit,
            unitPrice: item.unitPrice,
            minLevel: item.minLevel,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }));
        Storage.set('stocks', savedStocks);
        Storage.set('stock_ingredients_seeded_v3', true);
    }

    return savedStocks;
}

// Reset/reseed stock items to standard restaurant ingredients without touching menu items
window.resetStockToDefaultIngredients = function resetStockToDefaultIngredients(showPrompt = true) {
    const doReset = () => {
        const baseId = Date.now();
        const freshStocks = DEFAULT_CAFE_STOCK_ITEMS.map((item, index) => ({
            id: 'stock_' + (baseId + index),
            itemName: item.itemName,
            quantity: item.quantity,
            unit: item.unit,
            unitPrice: item.unitPrice,
            minLevel: item.minLevel,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }));
        Storage.set('stocks', freshStocks);
        Storage.set('stock_ingredients_seeded_v3', true);
        loadStock();
        if (typeof showCustomAlert === 'function') {
            showCustomAlert('Stock inventory successfully updated to standard restaurant raw ingredients!', 'Stock Reset');
        }
    };

    if (showPrompt) {
        if (typeof showCustomConfirm === 'function') {
            showCustomConfirm('Are you sure you want to reset the stock inventory to standard raw ingredients (Potatoes, Chicken, Eggs, Milk, Buns, Spices, Sauces, etc.)?\n\nNote: Your menu items will remain completely untouched and safe.', doReset, null, {
                title: 'Reset Stock Inventory',
                confirmText: 'Reset Inventory',
                type: 'warning',
                icon: '📦'
            });
        } else {
            doReset();
        }
    } else {
        doReset();
    }
};

window.loadStock = function loadStock() {
    const stocks = syncAndGetStockItems();
    const tbody = document.getElementById('stockTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    // Get search query
    const searchQuery = (document.getElementById('stockSearch')?.value || '').toLowerCase().trim();

    // Filter stocks based on search
    let filteredStocks = stocks;
    if (searchQuery) {
        filteredStocks = stocks.filter(stock =>
            (stock.itemName || '').toLowerCase().includes(searchQuery) ||
            (stock.unit || '').toLowerCase().includes(searchQuery)
        );
    }

    // Apply sorting
    const sortFilter = document.getElementById('stockSortFilter')?.value || 'quantity-desc';
    filteredStocks = [...filteredStocks].sort((a, b) => {
        const qtyA = parseFloat(a.quantity || 0);
        const qtyB = parseFloat(b.quantity || 0);
        const priceA = parseFloat(a.unitPrice || 0);
        const priceB = parseFloat(b.unitPrice || 0);
        const valueA = qtyA * priceA;
        const valueB = qtyB * priceB;

        switch (sortFilter) {
            case 'name-asc':
                return (a.itemName || '').localeCompare(b.itemName || '');
            case 'name-desc':
                return (b.itemName || '').localeCompare(a.itemName || '');
            case 'quantity-asc':
                return qtyA - qtyB;
            case 'quantity-desc':
                return qtyB - qtyA;
            case 'price-asc':
                return priceA - priceB;
            case 'price-desc':
                return priceB - priceA;
            case 'value-asc':
                return valueA - valueB;
            case 'value-desc':
                return valueB - valueA;
            default:
                return 0;
        }
    });

    if (filteredStocks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 40px; color: #999;">No stock items found. Click "+ Add Stock Item" to add ingredients.</td></tr>';
        updateStockSummary(stocks);
        return;
    }

    filteredStocks.forEach(stock => {
        const tr = document.createElement('tr');
        tr.setAttribute('data-stock-id', stock.id);
        const quantity = parseFloat(stock.quantity || 0);
        const unitPrice = parseFloat(stock.unitPrice || 0);
        const totalValue = quantity * unitPrice;
        const minLevel = parseFloat(stock.minLevel || 0);
        const isOutOfStock = quantity <= 0;
        const isLowStock = !isOutOfStock && minLevel > 0 && quantity <= minLevel;

        // Determine status text and styling
        let statusText, statusStyle;
        if (isOutOfStock) {
            statusText = 'Out of Stock';
            statusStyle = 'background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5;';
        } else if (isLowStock) {
            statusText = 'Low Stock';
            statusStyle = 'background: #fef3c7; color: #d97706; border: 1px solid #fde68a;';
        } else {
            statusText = 'In Stock';
            statusStyle = 'background: #dcfce7; color: #16a34a; border: 1px solid #bbf7d0;';
        }

        tr.innerHTML = `
            <td style="padding: 6px 10px; font-size: 13px;">
                <a href="javascript:void(0)" onclick="openStockItemLedgerModal('${stock.id}')"
                    style="color: #2563eb; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; transition: all 0.15s;"
                    onmouseover="this.style.textDecoration='underline'; this.style.color='#1d4ed8';"
                    onmouseout="this.style.textDecoration='none'; this.style.color='#2563eb';"
                    title="Click to view Excel stock ledger & full add/removal history">
                    <span>${escapeHtml(stock.itemName || 'N/A')}</span>
                    <span style="font-size: 12px; color: #2563eb; opacity: 0.85;">📊</span>
                </a>
            </td>
            <td style="padding: 6px 10px; text-align: right; font-weight: 700; color: #0f172a; font-size: 13px;">${formatQuantity(quantity)}</td>
            <td style="padding: 6px 10px; color: #64748b; font-weight: 600; font-size: 12.5px;">${escapeHtml(stock.unit || 'pcs')}</td>
            <td style="padding: 6px 10px; text-align: right; color: #334155; font-weight: 500; font-size: 12.5px;">Rs. ${formatNumber(unitPrice)}</td>
            <td style="padding: 6px 10px; text-align: right; font-weight: 700; color: #0f766e; font-size: 13px;">Rs. ${formatNumber(totalValue)}</td>
            <td style="padding: 6px 10px; text-align: right; color: #64748b; font-weight: 500; font-size: 12.5px;">${minLevel > 0 ? formatNumber(minLevel) : '-'}</td>
            <td style="padding: 6px 10px; text-align: center;">
                <span style="display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 11.5px; font-weight: 700; letter-spacing: 0.2px; ${statusStyle}">
                    ${statusText}
                </span>
            </td>
            <td style="padding: 5px 10px; text-align: center;">
                <div class="table-actions-cell center" style="display: flex; gap: 4px; justify-content: center; align-items: center;">
                    <button class="btn-action" style="background: #e0f2fe; color: #0284c7; border: 1px solid #bae6fd; font-size: 11.5px; font-weight: 700; padding: 2px 6px; border-radius: 5px;" onclick="openQuickAdjustModal('${stock.id}')" title="Quick +/- Adjust Stock">+/-</button>
                    <button class="btn-action btn-action-edit" onclick="editStock('${stock.id}')" title="Edit Item Details">${ICONS.edit}</button>
                    <button class="btn-action btn-action-delete" onclick="deleteStock('${stock.id}', this)" title="Delete Stock Item">${ICONS.delete}</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Update summary
    updateStockSummary(stocks);

    // Setup search functionality
    const searchInput = document.getElementById('stockSearch');
    if (searchInput && !searchInput.dataset.bound) {
        searchInput.dataset.bound = 'true';
        searchInput.addEventListener('input', () => {
            loadStock();
        });
    }
};

function updateStockSummary(stocks) {
    const totalItems = stocks.length;
    const totalValue = stocks.reduce((sum, stock) => {
        const quantity = parseFloat(stock.quantity || 0);
        const unitPrice = parseFloat(stock.unitPrice || 0);
        return sum + (quantity * unitPrice);
    }, 0);

    const lowStockCount = stocks.filter(stock => {
        const quantity = parseFloat(stock.quantity || 0);
        const minLevel = parseFloat(stock.minLevel || 0);
        return (minLevel > 0 && quantity <= minLevel) || quantity <= 0;
    }).length;

    const totalItemsEl = document.getElementById('totalStockItems');
    const totalValueEl = document.getElementById('totalStockValue');
    const lowStockEl = document.getElementById('lowStockItems');

    if (totalItemsEl) totalItemsEl.textContent = totalItems;
    if (totalValueEl) totalValueEl.textContent = `Rs. ${formatNumber(totalValue)}`;
    if (lowStockEl) lowStockEl.textContent = lowStockCount;
}

// Helper to populate datalist and select dropdown for quick ingredient search
function populateStockQuickSearchList() {
    const stocks = syncAndGetStockItems();
    const select = document.getElementById('consumptionQuickSelect');
    if (select) {
        select.innerHTML = '<option value="">-- Choose Ingredient to Add (e.g. Eggs, Oil, Potatoes) --</option>' +
            stocks.map(s => `<option value="${s.id}">${escapeHtml(s.itemName)} (Available: ${formatQuantity(s.quantity)} ${s.unit})</option>`).join('');
    }
    const dataList = document.getElementById('stockQuickSearchList');
    if (dataList) {
        dataList.innerHTML = stocks.map(s => `<option value="${escapeHtml(s.itemName)}">${escapeHtml(s.itemName)} (${formatQuantity(s.quantity)} ${s.unit} available)</option>`).join('');
    }
}

// Auto-check and show previous price when user types or chooses an item in Add Stock
window.checkExistingStockItemOnInput = function checkExistingStockItemOnInput() {
    const nameInput = document.getElementById('stockItemName');
    const hintEl = document.getElementById('stockExistingItemHint');
    const modeContainer = document.getElementById('stockAddModeContainer');
    const priceInput = document.getElementById('stockUnitPrice');
    const priceSubHint = document.getElementById('stockUnitPriceSubHint');
    const unitSelect = document.getElementById('stockUnit');
    const minLevelInput = document.getElementById('stockMinLevel');
    const qtyLabel = document.getElementById('stockQuantityLabel');

    if (!nameInput) return;

    const rawName = (nameInput.value || '').trim();
    if (!rawName) {
        if (hintEl) hintEl.style.display = 'none';
        if (modeContainer) modeContainer.style.display = 'none';
        if (priceSubHint) priceSubHint.textContent = '';
        if (qtyLabel) qtyLabel.textContent = 'Quantity *';
        return;
    }

    const stocks = syncAndGetStockItems();
    // Exclude the current editing item if editing
    const found = stocks.find(s => (!editingStockId || String(s.id) !== String(editingStockId)) && s.itemName && s.itemName.trim().toLowerCase() === rawName.toLowerCase());

    if (found) {
        const prevPrice = parseFloat(found.unitPrice || 0);
        const currQty = parseFloat(found.quantity || 0);

        if (hintEl) {
            hintEl.style.display = 'flex';
            hintEl.innerHTML = `
                <span style="font-size: 16px;">📦</span>
                <div>
                    <strong>Existing Stock Found:</strong> "${escapeHtml(found.itemName)}" &nbsp;|&nbsp; 
                    Current In-Stock: <strong style="color: #0f172a;">${formatQuantity(currQty)} ${escapeHtml(found.unit)}</strong> &nbsp;|&nbsp; 
                    Last Purchase Price: <strong style="color: #15803d;">Rs. ${formatNumber(prevPrice)} / ${escapeHtml(found.unit)}</strong>
                </div>
            `;
        }

        if (modeContainer && !editingStockId) {
            modeContainer.style.display = 'block';
        }

        if (unitSelect && found.unit) {
            unitSelect.value = found.unit;
        }

        if (minLevelInput && (minLevelInput.value === '' || minLevelInput.value === '0') && found.minLevel) {
            minLevelInput.value = found.minLevel;
        }

        // Prefill previous price by default if empty or unchanged
        if (priceInput && (!priceInput.dataset.userEdited || priceInput.value === '')) {
            priceInput.value = prevPrice > 0 ? prevPrice : '';
        }

        if (priceSubHint) {
            priceSubHint.textContent = `(Previous: Rs. ${formatNumber(prevPrice)}/${found.unit})`;
        }

        updateStockQtyLabel();
    } else {
        if (hintEl) hintEl.style.display = 'none';
        if (modeContainer) modeContainer.style.display = 'none';
        if (priceSubHint) priceSubHint.textContent = '';
        if (qtyLabel) qtyLabel.textContent = 'Quantity *';
    }
};

window.updateStockQtyLabel = function updateStockQtyLabel() {
    const qtyLabel = document.getElementById('stockQuantityLabel');
    const modeAdd = document.querySelector('input[name="stockAddMode"]:checked')?.value;
    if (!qtyLabel) return;

    if (modeAdd === 'add') {
        qtyLabel.textContent = 'Quantity to Add *';
    } else if (modeAdd === 'set') {
        qtyLabel.textContent = 'Total Stock Quantity *';
    } else {
        qtyLabel.textContent = 'Quantity *';
    }
};

window.openAddStockModal = function openAddStockModal() {
    editingStockId = null;
    const form = document.getElementById('stockForm');
    const modalTitle = document.getElementById('stockModalTitle');

    if (form) form.reset();
    if (modalTitle) modalTitle.textContent = 'Add Stock Item / Ingredient';

    document.getElementById('stockQuantity').value = '';
    document.getElementById('stockUnitPrice').value = '';
    document.getElementById('stockMinLevel').value = '';
    document.getElementById('stockUnit').value = 'kg';

    const priceInput = document.getElementById('stockUnitPrice');
    if (priceInput) delete priceInput.dataset.userEdited;

    const hintEl = document.getElementById('stockExistingItemHint');
    if (hintEl) hintEl.style.display = 'none';

    const modeContainer = document.getElementById('stockAddModeContainer');
    if (modeContainer) modeContainer.style.display = 'none';

    const priceSubHint = document.getElementById('stockUnitPriceSubHint');
    if (priceSubHint) priceSubHint.textContent = '';

    const qtyLabel = document.getElementById('stockQuantityLabel');
    if (qtyLabel) qtyLabel.textContent = 'Quantity *';

    populateStockQuickSearchList();
    if (typeof filterAddStockPresets === 'function') filterAddStockPresets('meat');

    document.getElementById('addStockModal').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('stockItemName')?.focus();
    }, 50);
};

window.closeAddStockModal = function closeAddStockModal() {
    document.getElementById('addStockModal').style.display = 'none';
    const form = document.getElementById('stockForm');
    if (form) form.reset();
    editingStockId = null;
};

window.editStock = function editStock(id) {
    openActionPasswordModal(() => {
        const stocks = syncAndGetStockItems();
        const stock = stocks.find(s => String(s.id) === String(id));

        if (!stock) {
            alert('Stock item not found!');
            return;
        }

        editingStockId = String(stock.id);
        const form = document.getElementById('stockForm');
        const modalTitle = document.getElementById('stockModalTitle');

        if (modalTitle) modalTitle.textContent = `Edit Stock: ${stock.itemName}`;

        document.getElementById('stockItemName').value = stock.itemName || '';
        document.getElementById('stockQuantity').value = stock.quantity !== undefined ? stock.quantity : 0;
        document.getElementById('stockUnit').value = stock.unit || 'kg';
        document.getElementById('stockUnitPrice').value = stock.unitPrice !== undefined ? stock.unitPrice : 0;
        document.getElementById('stockMinLevel').value = stock.minLevel !== undefined ? stock.minLevel : 0;

        const hintEl = document.getElementById('stockExistingItemHint');
        if (hintEl) {
            hintEl.style.display = 'flex';
            hintEl.innerHTML = `
                <span style="font-size: 16px;">💡</span>
                <div>
                    Current Rate: <strong>Rs. ${formatNumber(stock.unitPrice || 0)} / ${stock.unit}</strong> | Available: <strong>${formatQuantity(stock.quantity)} ${stock.unit}</strong>
                </div>
            `;
        }

        const modeContainer = document.getElementById('stockAddModeContainer');
        if (modeContainer) modeContainer.style.display = 'none';

        const qtyLabel = document.getElementById('stockQuantityLabel');
        if (qtyLabel) qtyLabel.textContent = 'Current Total Quantity *';

        const priceSubHint = document.getElementById('stockUnitPriceSubHint');
        if (priceSubHint) priceSubHint.textContent = `(Previous: Rs. ${formatNumber(stock.unitPrice || 0)}/${stock.unit})`;

        document.getElementById('addStockModal').style.display = 'flex';
    });
};

window.deleteStock = function deleteStock(id, buttonElement) {
    openActionPasswordModal(() => {
        let btnElement = buttonElement;
        if (!btnElement || !btnElement.parentElement || !document.contains(buttonElement)) {
            const stockRows = document.querySelectorAll('#stockTableBody tr');
            for (let row of stockRows) {
                if (row.getAttribute('data-stock-id') === String(id)) {
                    const deleteBtn = row.querySelector('button[onclick*="deleteStock"]');
                    if (deleteBtn) {
                        btnElement = deleteBtn;
                        break;
                    }
                }
            }
        }

        if (btnElement) {
            showDeleteConfirmation(btnElement, deleteStockConfirmed, id);
        } else {
            deleteStockConfirmed(id);
        }
    });
};

function deleteStockConfirmed(id) {
    let stocks = Storage.get('stocks') || [];
    stocks = stocks.filter(s => String(s.id) !== String(id));
    Storage.set('stocks', stocks);
    loadStock();
}

function createStockItemForMenuItem(itemName) {
    // Legacy support stub
    if (document.getElementById('stock')?.classList.contains('active')) {
        loadStock();
    }
}

// Automatic stock deduction on sale is permanently disabled per user requirement.
// The user manually records daily ingredient consumption at the end of the day.
function updateStockFromSale(items) {
    return;
}

// ==========================================
// QUICK ADJUST STOCK (+ / -)
// ==========================================
window.openQuickAdjustModal = function openQuickAdjustModal(stockId) {
    const stocks = syncAndGetStockItems();
    const item = stocks.find(s => String(s.id) === String(stockId));
    if (!item) return;

    currentQuickAdjustStockId = String(stockId);
    currentQuickAdjustType = 'add';

    const prevPrice = parseFloat(item.unitPrice || 0);

    const infoEl = document.getElementById('quickAdjustItemInfo');
    if (infoEl) {
        infoEl.innerHTML = `
            <div style="font-size: 15px; font-weight: 700; color: #0f172a;">${escapeHtml(item.itemName)}</div>
            <div style="font-size: 13px; color: #475569; margin-top: 4px; display: flex; justify-content: space-between;">
                <span>Available: <strong style="color: #0284c7;">${formatQuantity(item.quantity)} ${escapeHtml(item.unit)}</strong></span>
                <span>Current Rate: <strong style="color: #15803d;">Rs. ${formatNumber(prevPrice)} / ${escapeHtml(item.unit)}</strong></span>
            </div>
        `;
    }

    document.getElementById('quickAdjustQty').value = '';
    document.getElementById('quickAdjustNote').value = '';

    const priceInput = document.getElementById('quickAdjustUnitPrice');
    if (priceInput) priceInput.value = prevPrice > 0 ? prevPrice : '';

    const prevRateHint = document.getElementById('quickAdjustPrevRateHint');
    if (prevRateHint) prevRateHint.textContent = `(Previous: Rs. ${formatNumber(prevPrice)}/${item.unit})`;

    setQuickAdjustType('add');
    document.getElementById('quickStockAdjustModal').style.display = 'flex';
};

window.closeQuickAdjustModal = function closeQuickAdjustModal() {
    document.getElementById('quickStockAdjustModal').style.display = 'none';
    currentQuickAdjustStockId = null;
};

window.setQuickAdjustType = function setQuickAdjustType(type) {
    currentQuickAdjustType = type;
    const addBtn = document.getElementById('quickAdjustTypeAdd');
    const subBtn = document.getElementById('quickAdjustTypeSubtract');
    const rateGroup = document.getElementById('quickAdjustRateGroup');

    if (type === 'add') {
        addBtn.style.background = '#10b981';
        addBtn.style.borderColor = '#10b981';
        addBtn.style.color = 'white';

        subBtn.style.background = '#f8fafc';
        subBtn.style.borderColor = '#e2e8f0';
        subBtn.style.color = '#334155';

        if (rateGroup) rateGroup.style.display = 'block';
    } else {
        subBtn.style.background = '#ef4444';
        subBtn.style.borderColor = '#ef4444';
        subBtn.style.color = 'white';

        addBtn.style.background = '#f8fafc';
        addBtn.style.borderColor = '#e2e8f0';
        addBtn.style.color = '#334155';

        if (rateGroup) rateGroup.style.display = 'none';
    }
};

window.submitQuickAdjust = function submitQuickAdjust() {
    const qty = parseFloat(document.getElementById('quickAdjustQty').value);
    if (isNaN(qty) || qty <= 0) {
        alert('Please enter a valid quantity greater than 0.');
        return;
    }

    const note = (document.getElementById('quickAdjustNote').value || '').trim();
    const stocks = syncAndGetStockItems();
    const item = stocks.find(s => String(s.id) === String(currentQuickAdjustStockId));

    if (!item) {
        alert('Stock item not found.');
        return;
    }

    const currentQty = parseFloat(item.quantity) || 0;
    const oldPrice = parseFloat(item.unitPrice || 0);

    const performQuickAdjust = () => {
        let newPrice = oldPrice;
        if (currentQuickAdjustType === 'add') {
            const enteredPrice = parseFloat(document.getElementById('quickAdjustUnitPrice')?.value);
            if (!isNaN(enteredPrice) && enteredPrice >= 0) {
                newPrice = enteredPrice;
                item.unitPrice = newPrice;
            }
        }

        const newQty = currentQuickAdjustType === 'add' ? currentQty + qty : Math.max(0, currentQty - qty);
        item.quantity = newQty;
        item.updatedAt = new Date().toISOString();

        Storage.set('stocks', stocks);

        // Record in Stock Ledger
        const priceNote = (currentQuickAdjustType === 'add' && newPrice !== oldPrice && oldPrice > 0)
            ? ` (Rate updated: Rs. ${oldPrice} -> Rs. ${newPrice}/${item.unit})`
            : ` (@ Rs. ${newPrice}/${item.unit})`;

        recordStockLedgerEntry({
            stockId: item.id,
            itemName: item.itemName,
            type: currentQuickAdjustType === 'add' ? 'adjustment_add' : 'adjustment_sub',
            typeLabel: currentQuickAdjustType === 'add' ? 'Quick Stock Added (+)' : 'Quick Stock Deducted (-)',
            changeQty: currentQuickAdjustType === 'add' ? qty : -qty,
            previousQty: currentQty,
            resultingQty: newQty,
            unit: item.unit,
            unitPrice: newPrice,
            note: (note ? `${note}` : (currentQuickAdjustType === 'add' ? 'Manual stock addition (+)' : 'Manual stock subtraction (-)')) + priceNote,
            date: getLocalISODate(),
            timestamp: new Date().toISOString()
        });

        // Also log in consumption history if it was a subtraction
        if (currentQuickAdjustType === 'subtract') {
            const consumptions = Storage.get('stockConsumptions') || [];
            consumptions.unshift({
                id: 'cons_' + Date.now(),
                date: new Date().toISOString().slice(0, 10),
                timestamp: new Date().toISOString(),
                note: note || 'Quick stock subtraction',
                items: [
                    {
                        stockId: item.id,
                        itemName: item.itemName,
                        deductedQty: qty,
                        unit: item.unit,
                        note: note
                    }
                ]
            });
            Storage.set('stockConsumptions', consumptions);
        }

        closeQuickAdjustModal();
        loadStock();
        if (typeof showCustomAlert === 'function') {
            showCustomAlert(`Stock updated: ${item.itemName} is now ${formatQuantity(newQty)} ${item.unit}.`, 'Success');
        }
    };

    if (currentQuickAdjustType === 'subtract' && qty > currentQty) {
        if (typeof showCustomConfirm === 'function') {
            showCustomConfirm(
                `Warning: Deducting ${qty} ${item.unit} will result in negative stock (${(currentQty - qty).toFixed(2)} ${item.unit}). Do you want to proceed?`,
                performQuickAdjust,
                null,
                {
                    title: 'Negative Stock Warning',
                    confirmText: 'Proceed Anyway',
                    type: 'danger',
                    icon: '⚠️'
                }
            );
            return;
        }
    }

    performQuickAdjust();
};

// ==========================================
// DAILY STOCK CONSUMPTION / DEDUCTION (END OF DAY)
// ==========================================
function getDailySoldItemsSummary(dateStr) {
    const sales = Storage.get('sales') || [];
    const targetDate = dateStr || getLocalISODate();
    
    const daySales = sales.filter(s => {
        if (!s.date) return false;
        try {
            const sDate = s.date.includes('T') ? getLocalISODate(new Date(s.date)) : s.date.slice(0, 10);
            return sDate === targetDate;
        } catch (e) {
            return false;
        }
    });

    const itemMap = {};
    daySales.forEach(sale => {
        (sale.items || []).forEach(item => {
            const name = (item.name || 'Unnamed').trim();
            const qty = parseFloat(item.quantity) || 0;
            itemMap[name] = (itemMap[name] || 0) + qty;
        });
    });

    return {
        date: targetDate,
        totalOrders: daySales.length,
        items: Object.keys(itemMap).map(name => ({
            name: name,
            quantity: itemMap[name]
        })).sort((a, b) => b.quantity - a.quantity)
    };
}

window.openDailyConsumptionModal = function openDailyConsumptionModal() {
    switchStockView('deduct');
};

window.closeDailyConsumptionModal = function closeDailyConsumptionModal() {
    switchStockView('inventory');
};

window.clearConsumptionRows = function clearConsumptionRows() {
    const container = document.getElementById('consumptionRowsContainer');
    if (container) {
        container.innerHTML = '';
        checkAndRenderEmptyConsumptionPlaceholder();
        updateConsumptionRowCount();
    }
    const searchInput = document.getElementById('consumptionSearchInput');
    if (searchInput) searchInput.value = '';
    closeConsumptionDropdown();
};

window.initStockDeductView = function initStockDeductView() {
    const todayStr = getLocalISODate();
    const dateInput = document.getElementById('consumptionDate');
    if (dateInput && !dateInput.value) {
        dateInput.value = todayStr;
    }
    updateConsumptionModalDateResetBtn();

    const searchInput = document.getElementById('consumptionSearchInput');
    if (searchInput) searchInput.value = '';
    closeConsumptionDropdown();

    loadDailySalesSummaryForConsumption();

    const container = document.getElementById('consumptionRowsContainer');
    if (container && container.querySelectorAll('tr').length === 0) {
        checkAndRenderEmptyConsumptionPlaceholder();
        updateConsumptionRowCount();
    }

    updateDeductViewKPIs();

    if (typeof handleConsumptionDateFilterChange === 'function') {
        handleConsumptionDateFilterChange();
    } else {
        renderConsumptionHistoryList();
    }
};

window.updateDeductViewKPIs = function updateDeductViewKPIs() {
    const consumptions = Storage.get('stockConsumptions') || [];
    const todayStr = getLocalISODate();
    const stocks = syncAndGetStockItems();
    const stockMap = {};
    stocks.forEach(s => { stockMap[String(s.id)] = s; stockMap[(s.itemName || '').toLowerCase()] = s; });

    let todayItemsCount = 0;
    let todayEstimatedValue = 0;

    consumptions.forEach(log => {
        const cDate = log.date || (log.timestamp ? log.timestamp.split('T')[0] : '');
        if (cDate === todayStr) {
            (log.items || []).forEach(item => {
                const qty = parseFloat(item.finalDeductQty || item.enteredQty || item.deductedQty) || 0;
                todayItemsCount += qty > 0 ? 1 : 0;
                const stock = stockMap[String(item.stockId)] || stockMap[(item.itemName || '').toLowerCase()];
                const price = stock ? (parseFloat(stock.unitPrice) || 0) : 0;
                todayEstimatedValue += (qty * price);
            });
        }
    });

    const todayItemsEl = document.getElementById('deductSummaryTodayItems');
    if (todayItemsEl) todayItemsEl.textContent = `${todayItemsCount} item(s)`;

    const todayValEl = document.getElementById('deductSummaryTodayValue');
    if (todayValEl) todayValEl.textContent = `Rs. ${formatNumber(todayEstimatedValue)}`;

    const totalLogsEl = document.getElementById('deductSummaryTotalLogs');
    if (totalLogsEl) totalLogsEl.textContent = `${consumptions.length} log(s)`;
};

window.handleConsumptionModalDateChange = function handleConsumptionModalDateChange() {
    updateConsumptionModalDateResetBtn();
    loadDailySalesSummaryForConsumption();
};

window.updateConsumptionModalDateResetBtn = function updateConsumptionModalDateResetBtn() {
    const dateInput = document.getElementById('consumptionDate');
    const resetBtn = document.getElementById('consumptionModalResetDateBtn');
    if (!dateInput || !resetBtn) return;

    const todayStr = getLocalISODate();
    const isToday = (dateInput.value === todayStr);
    resetBtn.style.display = isToday ? 'none' : 'inline-flex';
};

window.resetConsumptionModalDate = function resetConsumptionModalDate() {
    const dateInput = document.getElementById('consumptionDate');
    if (dateInput) {
        dateInput.value = getLocalISODate();
    }
    updateConsumptionModalDateResetBtn();
    loadDailySalesSummaryForConsumption();
};

window.loadDailySalesSummaryForConsumption = function loadDailySalesSummaryForConsumption() {
    const dateInput = document.getElementById('consumptionDate');
    const selectedDate = (dateInput && dateInput.value) ? dateInput.value : getLocalISODate();

    const summary = getDailySoldItemsSummary(selectedDate);
    const ordersEl = document.getElementById('consumptionOrdersSummary');

    if (ordersEl) {
        ordersEl.textContent = `Total Orders: ${summary.totalOrders}`;
    }
};

let highlightedDropdownIndex = -1;

window.openConsumptionDropdown = function openConsumptionDropdown() {
    const menu = document.getElementById('consumptionDropdownMenu');
    if (!menu) return;
    menu.style.display = 'block';
    filterConsumptionDropdown();
};

window.closeConsumptionDropdown = function closeConsumptionDropdown() {
    const menu = document.getElementById('consumptionDropdownMenu');
    if (menu) menu.style.display = 'none';
    highlightedDropdownIndex = -1;
};

window.toggleConsumptionDropdown = function toggleConsumptionDropdown() {
    const menu = document.getElementById('consumptionDropdownMenu');
    const input = document.getElementById('consumptionSearchInput');
    if (!menu) return;
    if (menu.style.display === 'block') {
        closeConsumptionDropdown();
    } else {
        if (input) input.focus();
        openConsumptionDropdown();
    }
};

window.filterConsumptionDropdown = function filterConsumptionDropdown() {
    const input = document.getElementById('consumptionSearchInput');
    const menu = document.getElementById('consumptionDropdownMenu');
    if (!menu) return;

    const query = (input ? input.value : '').toLowerCase().trim();
    const stocks = syncAndGetStockItems();

    // Get all already added stock IDs in current table
    const alreadyAddedIds = new Set(
        Array.from(document.querySelectorAll('#consumptionRowsContainer input.cons-stock-id'))
            .map(el => String(el.value))
    );

    const filtered = stocks.filter(s => {
        if (!query) return true;
        return s.itemName.toLowerCase().includes(query) || (s.unit && s.unit.toLowerCase().includes(query));
    });

    if (filtered.length === 0) {
        menu.innerHTML = `<div style="padding: 10px; color: #94a3b8; font-size: 12px; text-align: center;">No matching ingredients found for "${escapeHtml(query)}"</div>`;
        highlightedDropdownIndex = -1;
        return;
    }

    highlightedDropdownIndex = -1;
    menu.innerHTML = filtered.map((stock, idx) => {
        const isAdded = alreadyAddedIds.has(String(stock.id));
        if (isAdded) {
            return `
                <div class="cons-dropdown-item cons-dropdown-item-disabled" data-id="${stock.id}" data-idx="${idx}" data-disabled="true"
                    title="Already added to deduction list">
                    <span style="font-weight: 600; color: #64748b;">${escapeHtml(stock.itemName)}</span>
                    <span style="font-size: 11px; font-weight: 600; color: #64748b; background: #f1f5f9; padding: 1px 6px; border-radius: 4px; border: 1px solid #e2e8f0;">✓ Added (${formatQuantity(stock.quantity)} ${stock.unit})</span>
                </div>
            `;
        }
        return `
            <div class="cons-dropdown-item" data-id="${stock.id}" data-idx="${idx}"
                onclick="selectConsumptionDropdownItem('${stock.id}')">
                <span style="font-weight: 600; color: #0f172a;">${escapeHtml(stock.itemName)}</span>
                <span style="font-size: 11px; font-weight: 600; color: #059669; background: #ecfdf5; padding: 1px 7px; border-radius: 4px; border: 1px solid #d1fae5;">Available: ${formatQuantity(stock.quantity)} ${stock.unit}</span>
            </div>
        `;
    }).join('');
};

window.handleConsumptionSearchKeydown = function handleConsumptionSearchKeydown(event) {
    const menu = document.getElementById('consumptionDropdownMenu');
    const items = menu ? Array.from(menu.querySelectorAll('.cons-dropdown-item')) : [];

    if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (menu.style.display !== 'block') {
            openConsumptionDropdown();
            return;
        }
        if (items.length > 0) {
            if (highlightedDropdownIndex >= 0 && items[highlightedDropdownIndex]) {
                items[highlightedDropdownIndex].classList.remove('active');
            }
            let nextIdx = (highlightedDropdownIndex + 1) % items.length;
            for (let i = 0; i < items.length; i++) {
                if (items[nextIdx] && items[nextIdx].dataset.disabled !== 'true') {
                    break;
                }
                nextIdx = (nextIdx + 1) % items.length;
            }
            highlightedDropdownIndex = nextIdx;
            if (items[highlightedDropdownIndex] && items[highlightedDropdownIndex].dataset.disabled !== 'true') {
                items[highlightedDropdownIndex].classList.add('active');
                items[highlightedDropdownIndex].scrollIntoView({ block: 'nearest' });
            }
        }
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (items.length > 0) {
            if (highlightedDropdownIndex >= 0 && items[highlightedDropdownIndex]) {
                items[highlightedDropdownIndex].classList.remove('active');
            }
            let prevIdx = (highlightedDropdownIndex - 1 + items.length) % items.length;
            for (let i = 0; i < items.length; i++) {
                if (items[prevIdx] && items[prevIdx].dataset.disabled !== 'true') {
                    break;
                }
                prevIdx = (prevIdx - 1 + items.length) % items.length;
            }
            highlightedDropdownIndex = prevIdx;
            if (items[highlightedDropdownIndex] && items[highlightedDropdownIndex].dataset.disabled !== 'true') {
                items[highlightedDropdownIndex].classList.add('active');
                items[highlightedDropdownIndex].scrollIntoView({ block: 'nearest' });
            }
        }
    } else if (event.key === 'Enter') {
        event.preventDefault();
        if (items.length > 0 && highlightedDropdownIndex >= 0 && items[highlightedDropdownIndex] && items[highlightedDropdownIndex].dataset.disabled !== 'true') {
            const stockId = items[highlightedDropdownIndex].dataset.id;
            if (stockId) selectConsumptionDropdownItem(stockId);
        } else {
            const input = document.getElementById('consumptionSearchInput');
            const q = (input ? input.value : '').toLowerCase().trim();
            if (q) {
                const alreadyAddedIds = new Set(
                    Array.from(document.querySelectorAll('#consumptionRowsContainer input.cons-stock-id'))
                        .map(el => String(el.value))
                );
                const stocks = syncAndGetStockItems();
                const matched = stocks.find(s => !alreadyAddedIds.has(String(s.id)) && (s.itemName.toLowerCase() === q || s.itemName.toLowerCase().includes(q)));
                if (matched) {
                    selectConsumptionDropdownItem(matched.id);
                }
            }
        }
    } else if (event.key === 'Escape') {
        closeConsumptionDropdown();
    }
};


window.selectConsumptionDropdownItem = function selectConsumptionDropdownItem(stockId) {
    if (!stockId) return;

    // Check if ingredient already exists in table
    const existingHidden = document.querySelector(`#consumptionRowsContainer input.cons-stock-id[value="${stockId}"]`);
    if (existingHidden) {
        const existingRow = existingHidden.closest('tr');
        if (existingRow) {
            existingRow.style.transition = 'background-color 0.3s ease';
            existingRow.style.backgroundColor = '#fef3c7';
            setTimeout(() => { existingRow.style.backgroundColor = ''; }, 1000);
            const qtyInput = existingRow.querySelector('.cons-qty-input');
            if (qtyInput) {
                qtyInput.focus();
                qtyInput.select();
            }
        }
    } else {
        addConsumptionRow(stockId);
    }

    const input = document.getElementById('consumptionSearchInput');
    if (input) input.value = '';
    closeConsumptionDropdown();
};

document.addEventListener('click', function(e) {
    const searchContainer = document.getElementById('consumptionSearchInput');
    const menu = document.getElementById('consumptionDropdownMenu');
    if (menu && menu.style.display === 'block') {
        if (searchContainer && !searchContainer.contains(e.target) && !menu.contains(e.target)) {
            closeConsumptionDropdown();
        }
    }
});

window.addConsumptionRow = function addConsumptionRow(prefillStockId = '', prefillQty = '', prefillUnit = '', prefillNote = '') {
    const container = document.getElementById('consumptionRowsContainer');
    if (!container) return;

    // Remove empty placeholder row if present
    const emptyRow = document.getElementById('consumptionEmptyRow');
    if (emptyRow) emptyRow.remove();

    const stocks = syncAndGetStockItems();
    let stock = null;
    if (prefillStockId) {
        stock = stocks.find(s => String(s.id) === String(prefillStockId) || s.itemName.toLowerCase() === String(prefillStockId).toLowerCase());
    }
    if (!stock && stocks.length > 0) {
        stock = stocks.find(s => !document.querySelector(`#consumptionRowsContainer input.cons-stock-id[value="${s.id}"]`)) || stocks[0];
    }
    if (!stock) return;

    const rowId = 'c_row_' + Date.now() + '_' + Math.floor(Math.random() * 1000);

    const tr = document.createElement('tr');
    tr.id = rowId;
    tr.className = 'cons-excel-row';

    const currentCount = container.querySelectorAll('tr:not(#consumptionEmptyRow)').length + 1;

    tr.style.cssText = 'height: 30px !important; max-height: 30px !important;';

    tr.innerHTML = `
        <td style="text-align: center; color: #64748b; font-size: 11px; font-weight: 700; padding: 0 4px !important; background: #f8fafc; user-select: none; width: 32px; height: 30px !important; max-height: 30px !important;">
            <span class="cons-row-index">${currentCount}</span>
        </td>
        <td style="padding: 2px 6px !important; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; height: 30px !important; max-height: 30px !important;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; width: 100%;">
                <span style="font-weight: 600; color: #0f172a; font-size: 12.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.2;">
                    ${escapeHtml(stock.itemName)}
                </span>
                <span style="font-size: 10.5px; color: #059669; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 1px 5px; border-radius: 3px; font-weight: 600; white-space: nowrap; flex-shrink: 0; line-height: 15px; height: 15px;">
                    ${formatQuantity(stock.quantity)} ${stock.unit}
                </span>
            </div>
            <input type="hidden" class="cons-stock-id" value="${stock.id}" data-name="${escapeHtml(stock.itemName)}" data-available="${stock.quantity}" data-unit="${escapeHtml(stock.unit)}">
        </td>
        <td style="position: relative; padding: 2px 4px !important; height: 30px !important; max-height: 30px !important;">
            <div style="display: flex; align-items: center; position: relative; width: 100%; height: 24px;">
                <input type="number" class="cons-excel-input cons-qty-input" step="any" min="0.001" placeholder="0" value="${prefillQty}" required
                    oninput="updateConsumptionRowBalance('${rowId}')"
                    style="font-weight: 700; padding-right: 28px !important; height: 24px !important; line-height: 24px !important; font-size: 12.5px;">
                <span id="${rowId}_unitBadge" style="position: absolute; right: 4px; font-size: 10.5px; font-weight: 600; color: #64748b; pointer-events: none; user-select: none; line-height: 24px;">
                    ${escapeHtml(stock.unit)}
                </span>
            </div>
        </td>
        <td style="padding: 2px 4px !important; height: 30px !important; max-height: 30px !important;">
            <input type="text" class="cons-excel-input cons-note-input" placeholder="e.g. Daily sales deduction" value="${escapeHtml(prefillNote)}"
                style="color: #334155; height: 24px !important; line-height: 24px !important; font-size: 12px;">
        </td>
        <td style="text-align: center; width: 28px; padding: 0 !important; height: 30px !important; max-height: 30px !important;">
            <button type="button" class="cons-excel-del-btn" onclick="removeConsumptionRow('${rowId}')"
                title="Remove row">✕</button>
        </td>
    `;

    container.appendChild(tr);

    if (prefillQty) {
        updateConsumptionRowBalance(rowId);
    }
    updateConsumptionRowCount();

    setTimeout(() => {
        const row = document.getElementById(rowId);
        if (row) {
            const qtyInput = row.querySelector('.cons-qty-input');
            if (qtyInput) {
                qtyInput.focus();
                qtyInput.select();
            }
        }
    }, 50);

    return rowId;
};

window.updateConsumptionRowBalance = function updateConsumptionRowBalance(rowId) {
    const row = document.getElementById(rowId);
    if (!row) return;

    const hiddenStockInput = row.querySelector('.cons-stock-id');
    const qtyInput = row.querySelector('.cons-qty-input');

    if (!hiddenStockInput || !qtyInput) return;

    const availableQty = parseFloat(hiddenStockInput.dataset.available || 0);
    const stockUnit = hiddenStockInput.dataset.unit || '';
    const enteredQty = parseFloat(qtyInput.value) || 0;

    if (!qtyInput.value || isNaN(enteredQty)) {
        qtyInput.classList.remove('qty-error');
        qtyInput.title = '';
        return;
    }

    const remaining = availableQty - enteredQty;

    if (remaining < 0) {
        qtyInput.classList.add('qty-error');
        qtyInput.title = `⚠️ Shortage: Remaining stock will be ${formatQuantity(remaining)} ${stockUnit}`;
    } else {
        qtyInput.classList.remove('qty-error');
        qtyInput.title = `Remaining stock: ${formatQuantity(remaining)} ${stockUnit}`;
    }
};

window.removeConsumptionRow = function removeConsumptionRow(rowId) {
    const row = document.getElementById(rowId);
    if (row) {
        row.remove();
        const indices = document.querySelectorAll('#consumptionRowsContainer .cons-row-index');
        indices.forEach((el, i) => { el.textContent = i + 1; });
        checkAndRenderEmptyConsumptionPlaceholder();
        updateConsumptionRowCount();
        // Refresh dropdown menu if open
        const menu = document.getElementById('consumptionDropdownMenu');
        if (menu && menu.style.display === 'block') {
            filterConsumptionDropdown();
        }
    }
};

function checkAndRenderEmptyConsumptionPlaceholder() {
    const container = document.getElementById('consumptionRowsContainer');
    if (!container) return;
    const rows = container.querySelectorAll('tr:not(#consumptionEmptyRow)');
    if (rows.length === 0) {
        container.innerHTML = `
            <tr id="consumptionEmptyRow">
                <td colspan="5" style="text-align: center; padding: 14px 10px; color: #64748b; font-size: 11.5px; background: #ffffff; border: none;">
                    👆 Choose an ingredient from the search bar above to add it to your deduction list.
                </td>
            </tr>
        `;
    }
}

function updateConsumptionRowCount() {
    const rows = document.querySelectorAll('#consumptionRowsContainer tr:not(#consumptionEmptyRow)');
    const countEl = document.getElementById('consumptionTotalRowsCount');
    if (countEl) {
        countEl.textContent = rows.length;
    }
}

// Convert units smoothly (e.g. g -> kg, mL -> L)
function convertDeductionToStockUnit(deductQty, deductUnit, stockUnit) {
    const dUnit = (deductUnit || '').toLowerCase().trim();
    const sUnit = (stockUnit || '').toLowerCase().trim();
    const qty = parseFloat(deductQty) || 0;

    if (!dUnit || dUnit === sUnit) return qty;

    // Weight conversions
    if (dUnit === 'g' && sUnit === 'kg') return qty / 1000;
    if (dUnit === 'mg' && sUnit === 'kg') return qty / 1000000;
    if (dUnit === 'mg' && sUnit === 'g') return qty / 1000;
    if (dUnit === 'kg' && sUnit === 'g') return qty * 1000;

    // Volume conversions
    if (dUnit === 'ml' && sUnit === 'l') return qty / 1000;
    if (dUnit === 'l' && sUnit === 'ml') return qty * 1000;

    // Default 1:1 if units are different custom types (e.g. pcs, pack)
    return qty;
}

window.submitDailyConsumption = function submitDailyConsumption() {
    const rows = document.querySelectorAll('#consumptionRowsContainer tr:not(#consumptionEmptyRow)');
    if (rows.length === 0) {
        alert('Please select at least one ingredient to deduct.');
        return;
    }

    const dateInput = document.getElementById('consumptionDate');
    const consumptionDate = (dateInput && dateInput.value) ? dateInput.value : getLocalISODate();

    const stocks = syncAndGetStockItems();
    const deductions = [];
    let hasError = false;

    rows.forEach(row => {
        const hiddenStockInput = row.querySelector('.cons-stock-id');
        const qtyInput = row.querySelector('.cons-qty-input');
        const noteInput = row.querySelector('.cons-note-input');

        if (!hiddenStockInput || !qtyInput) return;

        const stockId = hiddenStockInput.value;
        const itemName = hiddenStockInput.dataset.name || 'Ingredient';
        const qtyVal = parseFloat(qtyInput.value);
        const note = (noteInput ? noteInput.value : '').trim();

        if (!stockId) {
            alert('Please select an ingredient for all rows.');
            hasError = true;
            return;
        }

        if (isNaN(qtyVal) || qtyVal <= 0) {
            alert(`Please enter a valid quantity greater than 0 for "${itemName}".`);
            hasError = true;
            qtyInput.focus();
            return;
        }

        const stockItem = stocks.find(s => String(s.id) === String(stockId));
        if (!stockItem) {
            alert(`Stock item "${itemName}" not found.`);
            hasError = true;
            return;
        }

        const finalDeductInStockUnit = qtyVal;

        deductions.push({
            stockId: stockItem.id,
            itemName: stockItem.itemName,
            enteredQty: qtyVal,
            enteredUnit: stockItem.unit,
            finalDeductQty: finalDeductInStockUnit,
            stockUnit: stockItem.unit,
            note: note
        });
    });

    if (hasError || deductions.length === 0) return;

    // Apply deductions to stock items
    let warningMsg = '';
    deductions.forEach(d => {
        const stockItem = stocks.find(s => String(s.id) === String(d.stockId));
        if (stockItem) {
            const currentQty = parseFloat(stockItem.quantity) || 0;
            const newQty = Math.max(0, currentQty - d.finalDeductQty);
            if (currentQty < d.finalDeductQty) {
                warningMsg += `\n• ${stockItem.itemName}: available was ${currentQty} ${stockItem.unit}, deducted ${d.finalDeductQty} ${stockItem.unit}.`;
            }
            stockItem.quantity = newQty;
            stockItem.updatedAt = new Date().toISOString();

            // Record in Stock Ledger
            recordStockLedgerEntry({
                stockId: stockItem.id,
                itemName: stockItem.itemName,
                type: 'consumption',
                typeLabel: 'Daily Consumption',
                changeQty: -d.finalDeductQty,
                previousQty: currentQty,
                resultingQty: newQty,
                unit: stockItem.unit,
                unitPrice: stockItem.unitPrice || 0,
                note: (d.note ? `${d.note} — ` : '') + `Daily sales deduction (${d.finalDeductQty} ${d.stockUnit})`,
                date: consumptionDate,
                timestamp: new Date().toISOString()
            });
        }
    });

    Storage.set('stocks', stocks);

    // Save consumption history log
    const consumptions = Storage.get('stockConsumptions') || [];
    consumptions.unshift({
        id: 'cons_' + Date.now(),
        date: consumptionDate,
        timestamp: new Date().toISOString(),
        items: deductions
    });
    Storage.set('stockConsumptions', consumptions);

    clearConsumptionRows();
    updateDeductViewKPIs();
    renderConsumptionHistoryList();
    loadStock();

    const successMsg = `Daily stock consumption for ${consumptionDate} recorded successfully! ${deductions.length} ingredient(s) subtracted from stock.` + (warningMsg ? `\n\nStock Alert:${warningMsg}` : '');
    if (typeof showCustomAlert === 'function') {
        showCustomAlert('Stock Deducted Successfully', successMsg, 'success');
    } else {
        alert(successMsg);
    }
};

// ==========================================
// CONSUMPTION HISTORY LOGS
// ==========================================
// Switch between Stock Inventory table, Deduct Stock page, Daily Consumption Logs page, and Item Ledger page
window.switchStockView = function switchStockView(view) {
    const invSection = document.getElementById('stockInventorySection');
    const deductSection = document.getElementById('stockDeductSection');
    const logsSection = document.getElementById('stockConsumptionLogsSection');
    const ledgerSection = document.getElementById('stockItemLedgerSection');

    // Update all switcher buttons
    const invBtns = document.querySelectorAll('.stock-inventory-btn');
    const deductBtns = document.querySelectorAll('.stock-deduct-btn');
    const logsBtns = document.querySelectorAll('.stock-logs-btn');

    const setActiveBtn = (btns, isActive) => {
        btns.forEach(btn => {
            if (isActive) {
                btn.style.background = '#4a90e2';
                btn.style.color = '#ffffff';
                btn.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                btn.style.fontWeight = '600';
                btn.style.boxShadow = '0 2px 4px rgba(74, 144, 226, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
            } else {
                btn.style.background = 'transparent';
                btn.style.color = '#666';
                btn.style.border = '1px solid transparent';
                btn.style.fontWeight = '500';
                btn.style.boxShadow = 'none';
            }
        });
    };

    if (invSection) invSection.style.display = 'none';
    if (deductSection) deductSection.style.display = 'none';
    if (logsSection) logsSection.style.display = 'none';
    if (ledgerSection) ledgerSection.style.display = 'none';

    setActiveBtn(invBtns, false);
    setActiveBtn(deductBtns, false);
    setActiveBtn(logsBtns, false);

    if (view === 'deduct') {
        if (deductSection) deductSection.style.display = 'block';
        setActiveBtn(deductBtns, true);
        initStockDeductView();
    } else if (view === 'consumption') {
        if (logsSection) logsSection.style.display = 'block';
        setActiveBtn(logsBtns, true);
        if (typeof handleConsumptionDateFilterChange === 'function') {
            handleConsumptionDateFilterChange();
        } else {
            renderConsumptionHistoryList();
        }
    } else if (view === 'ledger') {
        if (ledgerSection) ledgerSection.style.display = 'block';
    } else {
        if (invSection) invSection.style.display = 'block';
        setActiveBtn(invBtns, true);
        loadStock();
    }
};

window.openConsumptionHistoryModal = function openConsumptionHistoryModal() {
    switchStockView('consumption');
};

window.closeConsumptionHistoryModal = function closeConsumptionHistoryModal() {
    switchStockView('inventory');
};

// Consumption Date Filters
window.handleConsumptionDateFilterChange = function handleConsumptionDateFilterChange() {
    const filterSelect = document.getElementById('consumptionDateFilter');
    const container = document.getElementById('consumptionTimeValueContainer');
    if (!filterSelect || !container) return;

    const filter = filterSelect.value;
    const todayStr = getLocalISODate();
    const monthStr = getLocalISOMonth();
    const currentYear = new Date().getFullYear();

    if (filter === 'today') {
        container.innerHTML = `<input type="date" id="consumptionDateInput" value="${todayStr}" onchange="renderConsumptionHistoryList(); updateConsumptionResetBtn();" style="padding: 8px 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 13.5px; background: white; outline: none; font-family: 'Inter', sans-serif;">`;
    } else if (filter === 'month') {
        container.innerHTML = `<input type="month" id="consumptionMonthInput" value="${monthStr}" onchange="renderConsumptionHistoryList(); updateConsumptionResetBtn();" style="padding: 8px 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 13.5px; background: white; outline: none; font-family: 'Inter', sans-serif;">`;
    } else if (filter === 'year') {
        container.innerHTML = `<select id="consumptionYearInput" onchange="renderConsumptionHistoryList(); updateConsumptionResetBtn();" style="padding: 8px 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 13.5px; background: white; outline: none; font-family: 'Inter', sans-serif; cursor: pointer;">${getFilterYearOptions(currentYear)}</select>`;
    } else {
        container.innerHTML = '';
    }

    updateConsumptionResetBtn();
    renderConsumptionHistoryList();
};

window.updateConsumptionResetBtn = function updateConsumptionResetBtn() {
    const filterSelect = document.getElementById('consumptionDateFilter');
    const resetBtn = document.getElementById('consumptionResetFilterBtn');
    if (!filterSelect || !resetBtn) return;

    const filter = filterSelect.value;
    const dateInput = document.getElementById('consumptionDateInput');
    const todayStr = getLocalISODate();

    let isDefault = (filter === 'today' && (!dateInput || dateInput.value === todayStr));
    resetBtn.style.display = isDefault ? 'none' : 'inline-flex';
};

window.resetConsumptionFilter = function resetConsumptionFilter() {
    const filterSelect = document.getElementById('consumptionDateFilter');
    if (filterSelect) filterSelect.value = 'today';
    handleConsumptionDateFilterChange();
};

window.renderConsumptionHistoryList = function renderConsumptionHistoryList() {
    const tbody = document.getElementById('consumptionHistoryTableBody');
    if (!tbody) return;

    const consumptions = Storage.get('stockConsumptions') || [];
    const search = (document.getElementById('consumptionPageSearch')?.value || document.getElementById('consumptionLogSearch')?.value || '').toLowerCase().trim();
    const filterSelect = document.getElementById('consumptionDateFilter');
    const filter = filterSelect ? filterSelect.value : 'all';

    const stocks = syncAndGetStockItems();
    const stockMap = {};
    stocks.forEach(s => { stockMap[String(s.id)] = s; stockMap[s.itemName.toLowerCase()] = s; });

    let filtered = consumptions;

    // Apply Date Filtering
    if (filter === 'today') {
        const dateInput = document.getElementById('consumptionDateInput');
        const selectedDate = dateInput ? dateInput.value : getLocalISODate();
        filtered = filtered.filter(c => {
            const cDate = c.date || (c.timestamp ? c.timestamp.split('T')[0] : '');
            return cDate === selectedDate;
        });
    } else if (filter === 'month') {
        const monthInput = document.getElementById('consumptionMonthInput');
        const selectedMonth = monthInput ? monthInput.value : getLocalISOMonth();
        filtered = filtered.filter(c => {
            const cDate = c.date || (c.timestamp ? c.timestamp.split('T')[0] : '');
            return cDate.startsWith(selectedMonth);
        });
    } else if (filter === 'year') {
        const yearInput = document.getElementById('consumptionYearInput');
        const selectedYear = yearInput ? yearInput.value : String(new Date().getFullYear());
        filtered = filtered.filter(c => {
            const cDate = c.date || (c.timestamp ? c.timestamp.split('T')[0] : '');
            return cDate.startsWith(selectedYear);
        });
    }

    // Apply Search Filtering
    if (search) {
        filtered = filtered.filter(c => {
            const dateStr = (c.date || '').toLowerCase();
            const noteStr = (c.note || '').toLowerCase();
            const itemsStr = (c.items || []).map(i => `${i.itemName} ${i.note}`).join(' ').toLowerCase();
            return dateStr.includes(search) || noteStr.includes(search) || itemsStr.includes(search);
        });
    }

    // Sort newest first
    filtered.sort((a, b) => new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date));

    // Update Summary Cards
    let totalItemsDeductedCount = 0;
    let totalEstimatedValue = 0;

    filtered.forEach(log => {
        (log.items || []).forEach(item => {
            const qty = parseFloat(item.finalDeductQty || item.enteredQty || item.deductedQty) || 0;
            totalItemsDeductedCount += qty > 0 ? 1 : 0;
            const stock = stockMap[String(item.stockId)] || stockMap[(item.itemName || '').toLowerCase()];
            const price = stock ? (parseFloat(stock.unitPrice) || 0) : 0;
            totalEstimatedValue += (qty * price);
        });
    });

    const logsCountEl = document.getElementById('totalConsumptionLogsCount');
    if (logsCountEl) logsCountEl.textContent = filtered.length;

    const itemsCountEl = document.getElementById('totalConsumptionItemsCount');
    if (itemsCountEl) itemsCountEl.textContent = totalItemsDeductedCount;

    const valEl = document.getElementById('totalConsumptionValueDeducted');
    if (valEl) valEl.textContent = `Rs. ${formatNumber(totalEstimatedValue)}`;

    tbody.innerHTML = '';

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 35px; color: #94a3b8; font-size: 14px;">No consumption logs found for the selected period.</td></tr>';
        return;
    }

    filtered.forEach(log => {
        const dateObj = new Date(log.timestamp || log.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

        (log.items || []).forEach((item, itemIdx) => {
            const qty = parseFloat(item.finalDeductQty || item.enteredQty || item.deductedQty) || 0;
            const stock = stockMap[String(item.stockId)] || stockMap[(item.itemName || '').toLowerCase()];
            const price = stock ? (parseFloat(stock.unitPrice) || 0) : 0;
            const itemEstimatedValue = qty * price;
            const unitStr = item.enteredUnit || item.stockUnit || item.unit || '';
            const noteStr = item.note || log.note || 'Daily Sales Consumption';

            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid #f1f5f9';
            tr.innerHTML = `
                <td style="padding: 10px 12px; font-weight: 600; color: #1e293b; white-space: nowrap; font-size: 13px;">
                    ${formattedDate}, <span style="color: #64748b; font-size: 12px; font-weight: 500;">${formattedTime}</span>
                </td>
                <td style="padding: 10px 12px; font-weight: 700; color: #0f172a; font-size: 13.5px;">
                    ${escapeHtml(item.itemName)}
                </td>
                <td style="padding: 10px 12px; text-align: right; white-space: nowrap;">
                    <span style="color: #dc2626; font-weight: 700; font-size: 13px;">-${formatQuantity(qty)} ${escapeHtml(unitStr)}</span>
                </td>
                <td style="padding: 10px 12px; text-align: right; font-weight: 700; color: #0f766e; font-size: 13px; white-space: nowrap;">
                    ${itemEstimatedValue > 0 ? `Rs. ${formatNumber(itemEstimatedValue)}` : '-'}
                </td>
                <td style="padding: 10px 12px; color: #475569; font-size: 12.5px;">
                    ${escapeHtml(noteStr)}
                </td>
                <td style="padding: 10px 12px; text-align: center; white-space: nowrap;">
                    <button type="button" onclick="deleteConsumptionRecord('${log.id}', ${itemIdx})"
                        style="background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 700;"
                        title="Revert this item deduction">Revert</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    });
};

window.printConsumptionLogsReport = function printConsumptionLogsReport() {
    const filterSelect = document.getElementById('consumptionDateFilter');
    const filter = filterSelect ? filterSelect.value : 'all';
    const searchInput = document.getElementById('consumptionSearchInput');
    const search = searchInput ? searchInput.value.trim().toLowerCase() : '';

    let filterLabel = 'All Time';
    const consumptions = Storage.get('stockConsumptions') || [];
    const stocks = syncAndGetStockItems();
    const stockMap = {};
    stocks.forEach(s => { stockMap[String(s.id)] = s; stockMap[(s.itemName || '').toLowerCase()] = s; });

    let filtered = [...consumptions];

    if (filter === 'today') {
        const dateInput = document.getElementById('consumptionDateInput');
        const selectedDate = dateInput ? dateInput.value : getLocalISODate();
        filterLabel = `Daily: ${selectedDate}`;
        filtered = filtered.filter(c => {
            const cDate = c.date || (c.timestamp ? c.timestamp.split('T')[0] : '');
            return cDate === selectedDate;
        });
    } else if (filter === 'month') {
        const monthInput = document.getElementById('consumptionMonthInput');
        const selectedMonth = monthInput ? monthInput.value : getLocalISOMonth();
        filterLabel = `Monthly: ${selectedMonth}`;
        filtered = filtered.filter(c => {
            const cDate = c.date || (c.timestamp ? c.timestamp.split('T')[0] : '');
            return cDate.startsWith(selectedMonth);
        });
    } else if (filter === 'year') {
        const yearInput = document.getElementById('consumptionYearInput');
        const selectedYear = yearInput ? yearInput.value : String(new Date().getFullYear());
        filterLabel = `Annual: ${selectedYear}`;
        filtered = filtered.filter(c => {
            const cDate = c.date || (c.timestamp ? c.timestamp.split('T')[0] : '');
            return cDate.startsWith(selectedYear);
        });
    }

    if (search) {
        filtered = filtered.filter(c => {
            const dateStr = (c.date || '').toLowerCase();
            const noteStr = (c.note || '').toLowerCase();
            const itemsStr = (c.items || []).map(i => `${i.itemName} ${i.note}`).join(' ').toLowerCase();
            return dateStr.includes(search) || noteStr.includes(search) || itemsStr.includes(search);
        });
    }

    filtered.sort((a, b) => new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date));

    if (filtered.length === 0) {
        alert('No consumption logs found for the selected period.');
        return;
    }

    let totalItemsDeductedCount = 0;
    let totalEstimatedValue = 0;
    const itemRows = [];

    filtered.forEach(log => {
        const dateObj = new Date(log.timestamp || log.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

        (log.items || []).forEach((item) => {
            const qty = parseFloat(item.finalDeductQty || item.enteredQty || item.deductedQty) || 0;
            totalItemsDeductedCount += qty > 0 ? 1 : 0;
            const stock = stockMap[String(item.stockId)] || stockMap[(item.itemName || '').toLowerCase()];
            const price = stock ? (parseFloat(stock.unitPrice) || 0) : 0;
            const itemEstimatedValue = qty * price;
            totalEstimatedValue += itemEstimatedValue;
            const unitStr = item.enteredUnit || item.stockUnit || item.unit || '';
            const noteStr = item.note || log.note || 'Daily Sales Consumption';

            itemRows.push({
                dateTime: `${formattedDate}, ${formattedTime}`,
                itemName: item.itemName,
                qtyStr: `-${formatQuantity(qty)} ${unitStr}`,
                valStr: itemEstimatedValue > 0 ? `Rs. ${formatNumber(itemEstimatedValue)}` : '-',
                noteStr: noteStr
            });
        });
    });

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Stock Consumption Report - Hangout Lounge & Co.</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
            <style>
                *, *::before, *::after {
                    box-sizing: border-box;
                    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
                }
                body {
                    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
                    padding: 8px;
                    font-size: 11.5px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    min-height: auto;
                    margin: 0 auto;
                    max-width: 80mm;
                    background: #fff;
                    color: #000;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                .header-section {
                    text-align: center;
                    margin-bottom: 6px;
                    width: 100%;
                }
                .restaurant-name {
                    font-size: 17px;
                    font-weight: 800;
                    letter-spacing: 0.3px;
                    text-transform: uppercase;
                    margin-bottom: 2px;
                    color: #000;
                }
                .report-info {
                    font-size: 11px;
                    font-weight: 500;
                    color: #333;
                    line-height: 1.35;
                }
                .report-title-badge {
                    display: inline-block;
                    border: 1.5px solid #000;
                    padding: 2px 12px;
                    font-size: 10.5px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin: 5px 0 3px 0;
                }
                .separator {
                    border-top: 1px dashed #999;
                    margin: 6px 0;
                    width: 100%;
                }
                .meta-box {
                    font-size: 11px;
                    text-align: left;
                    line-height: 1.5;
                    color: #000;
                    width: 100%;
                }
                .summary-box {
                    width: 100%;
                    font-size: 11.5px;
                    line-height: 1.55;
                    color: #000;
                }
                .report-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 5px 0;
                    border: 1.5px solid #000;
                    background: #fff;
                    font-size: 10.5px;
                }
                .report-table th {
                    text-align: left;
                    padding: 4px 4px;
                    font-size: 10px;
                    font-weight: 700;
                    border-bottom: 1.5px solid #000;
                    border-right: 1px solid #000;
                    text-transform: uppercase;
                    color: #000;
                    background: #f8f9fa;
                }
                .report-table th:last-child {
                    border-right: none;
                }
                .report-table td {
                    padding: 4px 4px;
                    border-bottom: 1px solid #ccc;
                    border-right: 1px solid #000;
                    color: #000;
                    vertical-align: top;
                }
                .report-table td:last-child {
                    border-right: none;
                }
                .report-table tr:last-child td {
                    border-bottom: none;
                }
                .section-title {
                    font-size: 11.5px;
                    font-weight: 700;
                    margin: 6px 0 3px 0;
                    text-align: left;
                    width: 100%;
                    text-transform: uppercase;
                    letter-spacing: 0.3px;
                }
                @media print {
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    body {
                        padding: 3mm 0;
                        margin: 0;
                        max-width: 100%;
                        width: 100%;
                        background: #fff;
                        color: #000;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    @page {
                        size: 80mm auto;
                        margin: 3mm;
                    }
                }
            </style>
        </head>
        <body>
            <div class="header-section">
                <div class="restaurant-name">Hangout Lounge & Co.</div>
                <div class="report-info">Wah Cantt</div>
                <div class="report-info">Phone: 0300-9509536</div>
                <div><span class="report-title-badge">STOCK CONSUMPTION REPORT</span></div>
                <div class="separator"></div>
                <div class="meta-box">
                    <div style="display: flex; justify-content: space-between;"><span style="font-weight: 600;">Period:</span> <span style="font-weight: 400; color: #333;">${filterLabel}</span></div>
                    <div style="display: flex; justify-content: space-between;"><span style="font-weight: 600;">Date:</span> <span style="font-weight: 400; color: #333;">${new Date().toLocaleString()}</span></div>
                </div>
            </div>

            <div class="separator"></div>

            <div class="summary-box">
                <div style="display: flex; justify-content: space-between;"><span style="font-weight: 400; color: #444;">Total Log Entries:</span> <span style="font-weight: 600; color: #111;">${filtered.length}</span></div>
                <div style="display: flex; justify-content: space-between;"><span style="font-weight: 400; color: #444;">Items / Batches Deducted:</span> <span style="font-weight: 600; color: #111;">${totalItemsDeductedCount}</span></div>
                <div style="display: flex; justify-content: space-between;"><span style="font-weight: 600; color: #000;">Total Estimated Value:</span> <span style="font-weight: 700; color: #000;">Rs. ${formatNumber(totalEstimatedValue)}</span></div>
            </div>

            <div class="separator"></div>
            <div class="section-title">Consumption Details</div>

            <table class="report-table">
                <thead>
                    <tr>
                        <th style="width: 45%;">Item / Time</th>
                        <th style="width: 25%; text-align: right;">Deducted</th>
                        <th style="width: 30%; text-align: right;">Est. Value</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemRows.map(r => `
                        <tr>
                            <td>
                                <div style="font-weight: 700; color: #000;">${escapeHtml(r.itemName)}</div>
                                <div style="font-size: 9.5px; color: #555;">${escapeHtml(r.dateTime)}</div>
                                ${r.noteStr ? `<div style="font-size: 9px; color: #777; font-style: italic;">${escapeHtml(r.noteStr)}</div>` : ''}
                            </td>
                            <td style="text-align: right; font-weight: 600; color: #000; white-space: nowrap;">
                                ${escapeHtml(r.qtyStr)}
                            </td>
                            <td style="text-align: right; font-weight: 700; color: #000; white-space: nowrap;">
                                ${escapeHtml(r.valStr)}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div class="separator"></div>
            <div style="text-align: center; font-size: 10px; font-weight: 500; color: #555; margin-top: 4px;">
                Report Generated Successfully
            </div>

            <script>
                var hasPrinted = false;
                function triggerPrint() {
                    if (hasPrinted) return;
                    hasPrinted = true;
                    try {
                        window.focus();
                        window.print();
                    } catch(e) {
                        console.error(e);
                    }
                }
                window.addEventListener('afterprint', function() {
                    setTimeout(function() {
                        try { window.close(); } catch(e) {}
                    }, 150);
                });
                function schedulePrint() {
                    if (document.fonts && document.fonts.ready) {
                        document.fonts.ready.then(function() {
                            setTimeout(triggerPrint, 350);
                        }).catch(function() {
                            setTimeout(triggerPrint, 350);
                        });
                    } else {
                        setTimeout(triggerPrint, 350);
                    }
                }
                if (document.readyState === 'complete') {
                    schedulePrint();
                } else {
                    window.addEventListener('load', schedulePrint, { once: true });
                    setTimeout(schedulePrint, 500);
                }
            <\/script>
        </body>
        </html>
    `);
    printWindow.document.close();
};

window.printDailyClosingSummaryReport = function printDailyClosingSummaryReport() {
    const todayISO = getLocalISODate();
    const sales = Storage.get('sales') || [];
    const expenses = (typeof getCombinedExpenses === 'function') ? getCombinedExpenses() : (Storage.get('expenses') || []);
    const consumptions = Storage.get('stockConsumptions') || [];
    const stocks = syncAndGetStockItems();
    const stockMap = {};
    stocks.forEach(s => { stockMap[String(s.id)] = s; stockMap[(s.itemName || '').toLowerCase()] = s; });

    // Filter Today's sales
    const todaySales = sales.filter(s => {
        if (!s.date) return false;
        const dStr = s.date.includes('T') ? getLocalISODate(new Date(s.date)) : s.date.slice(0, 10);
        return dStr === todayISO;
    });

    let grossSales = 0;
    let cashSales = 0;
    let onlineSales = 0;
    let totalTax = 0;
    let totalDiscount = 0;

    todaySales.forEach(s => {
        const tot = parseFloat(s.total) || 0;
        grossSales += tot;
        totalTax += parseFloat(s.tax) || 0;
        totalDiscount += (s.discount && s.discount.amount) ? parseFloat(s.discount.amount) : 0;
        const pm = (s.paymentMethod || s.payment || 'cash').toLowerCase();
        if (pm === 'online' || pm === 'card' || pm === 'digital' || pm === 'family') {
            onlineSales += tot;
        } else {
            cashSales += tot;
        }
    });

    // Today's Operating Expenses
    const todayExpenses = expenses.filter(e => {
        if (!e.date) return false;
        const dStr = e.date.includes('T') ? getLocalISODate(new Date(e.date)) : e.date.slice(0, 10);
        return dStr === todayISO;
    });
    const totalExpenses = todayExpenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

    // Today's Ingredient Deductions
    const todayConsumptions = consumptions.filter(c => {
        const dStr = c.date || (c.timestamp ? c.timestamp.split('T')[0] : '');
        return dStr === todayISO;
    });

    let totalIngredientCost = 0;
    const ingredientRows = [];
    todayConsumptions.forEach(c => {
        (c.items || []).forEach(item => {
            const qty = parseFloat(item.finalDeductQty || item.enteredQty || item.deductedQty) || 0;
            const stock = stockMap[String(item.stockId)] || stockMap[(item.itemName || '').toLowerCase()];
            const price = stock ? (parseFloat(stock.unitPrice) || 0) : 0;
            const itemCost = qty * price;
            totalIngredientCost += itemCost;
            ingredientRows.push({
                name: item.itemName,
                qty: `${formatQuantity(qty)} ${item.enteredUnit || item.stockUnit || item.unit || ''}`,
                cost: itemCost
            });
        });
    });

    const netProfit = grossSales - totalIngredientCost - totalExpenses;
    const profitMargin = grossSales > 0 ? ((netProfit / grossSales) * 100).toFixed(1) : 0;

    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
    const timeFormatted = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Daily Closing Summary - Hangout Lounge & Co.</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 25px; color: #0f172a; max-width: 550px; margin: 0 auto; font-size: 13px; }
                .header { text-align: center; border-bottom: 2px dashed #94a3b8; padding-bottom: 12px; margin-bottom: 15px; }
                h1 { margin: 0 0 4px 0; font-size: 22px; color: #0f172a; font-weight: 800; }
                .badge { display: inline-block; background: #0f172a; color: white; padding: 4px 14px; border-radius: 14px; font-weight: 700; font-size: 11.5px; text-transform: uppercase; margin-top: 5px; }
                .meta { color: #64748b; font-size: 12px; margin-top: 6px; }
                .kpi-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 15px 0; }
                .kpi-card { border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 12px; background: #f8fafc; }
                .kpi-title { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; }
                .kpi-val { font-size: 19px; font-weight: 800; color: #0f172a; margin-top: 3px; }
                .profit-card { grid-column: span 2; border: 2px solid #10b981; background: #ecfdf5; }
                .profit-val { font-size: 24px; font-weight: 900; color: #059669; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
                th, td { padding: 7px 9px; border-bottom: 1px solid #e2e8f0; }
                th { background: #f1f5f9; text-align: left; font-size: 11px; text-transform: uppercase; color: #475569; font-weight: 700; }
                .section-title { font-weight: 700; font-size: 13.5px; color: #1e293b; margin-top: 18px; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 4px; }
                @media print { body { padding: 0; } }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Hangout Lounge & Co.</h1>
                <div class="badge">🌙 Daily Financial Closing Summary</div>
                <div class="meta">${dateFormatted} | ${timeFormatted}</div>
            </div>

            <div class="kpi-grid">
                <div class="kpi-card">
                    <div class="kpi-title">💵 Gross Sales Revenue</div>
                    <div class="kpi-val">Rs. ${formatNumber(grossSales)}</div>
                    <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Cash: Rs. ${formatNumber(cashSales)} | Online: Rs. ${formatNumber(onlineSales)}</div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-title">🥩 Ingredient Cost (Stock)</div>
                    <div class="kpi-val" style="color: #dc2626;">Rs. ${formatNumber(totalIngredientCost)}</div>
                    <div style="font-size: 11px; color: #64748b; margin-top: 2px;">${ingredientRows.length} ingredient(s) deducted</div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-title">🏷️ Operating Expenses</div>
                    <div class="kpi-val" style="color: #ea580c;">Rs. ${formatNumber(totalExpenses)}</div>
                    <div style="font-size: 11px; color: #64748b; margin-top: 2px;">${todayExpenses.length} expense entry(s)</div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-title">🧾 Total Orders</div>
                    <div class="kpi-val" style="color: #2563eb;">${todaySales.length}</div>
                    <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Discounts: Rs. ${formatNumber(totalDiscount)}</div>
                </div>
                <div class="kpi-card profit-card">
                    <div class="kpi-title" style="color: #047857; display: flex; justify-content: space-between; align-items: center;">
                        <span>📈 NET ACTUAL PROFIT</span>
                        <span style="font-size: 11px; background: rgba(16,185,129,0.2); padding: 2px 8px; border-radius: 10px;">Margin: ${profitMargin}%</span>
                    </div>
                    <div class="profit-val">Rs. ${formatNumber(netProfit)}</div>
                    <div style="font-size: 11.5px; color: #065f46; margin-top: 2px;">(Total Revenue - Ingredient Cost - Operating Expenses)</div>
                </div>
            </div>

            ${ingredientRows.length > 0 ? `
                <div class="section-title">Ingredients Deducted Today (${ingredientRows.length})</div>
                <table>
                    <thead>
                        <tr>
                            <th>Ingredient</th>
                            <th style="text-align: right;">Qty Used</th>
                            <th style="text-align: right;">Est. Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${ingredientRows.map(r => `
                            <tr>
                                <td style="font-weight: 600;">${escapeHtml(r.name)}</td>
                                <td style="text-align: right;">${escapeHtml(r.qty)}</td>
                                <td style="text-align: right; font-weight: 700; color: #0f766e;">Rs. ${formatNumber(r.cost)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            ` : ''}

            <script>
                window.onload = function() { window.print(); window.close(); };
            <\/script>
        </body>
        </html>
    `);
    printWindow.document.close();
};

window.deleteConsumptionRecord = function deleteConsumptionRecord(logId, itemIndex) {
    openActionPasswordModal(() => {
        const consumptions = Storage.get('stockConsumptions') || [];
        const log = consumptions.find(c => c.id === logId);
        if (!log) return;

        const isSingleItem = itemIndex !== undefined && itemIndex !== null && log.items && log.items[itemIndex];
        const targetItem = isSingleItem ? log.items[itemIndex] : null;

        const confirmMsg = targetItem 
            ? `Do you want to revert the deduction of ${targetItem.itemName} (${formatQuantity(targetItem.finalDeductQty || targetItem.enteredQty || targetItem.deductedQty)} ${targetItem.enteredUnit || targetItem.unit || ''}) and restore it to stock?`
            : 'Do you want to revert this consumption log and restore the deducted quantities back to inventory?';

        const doRevert = () => {
            const stocks = syncAndGetStockItems();
            const itemsToRevert = targetItem ? [targetItem] : (log.items || []);

            itemsToRevert.forEach(item => {
                const stockItem = stocks.find(s => String(s.id) === String(item.stockId) || s.itemName.toLowerCase() === (item.itemName || '').toLowerCase());
                if (stockItem) {
                    const restoreQty = parseFloat(item.finalDeductQty || item.enteredQty || item.deductedQty) || 0;
                    const prevQty = parseFloat(stockItem.quantity) || 0;
                    const newQty = prevQty + restoreQty;
                    stockItem.quantity = newQty;
                    stockItem.updatedAt = new Date().toISOString();

                    // Record Revert in Stock Ledger
                    recordStockLedgerEntry({
                        stockId: stockItem.id,
                        itemName: stockItem.itemName,
                        type: 'revert',
                        typeLabel: 'Consumption Reverted (+)',
                        changeQty: restoreQty,
                        previousQty: prevQty,
                        resultingQty: newQty,
                        unit: stockItem.unit,
                        unitPrice: stockItem.unitPrice || 0,
                        note: `Reverted daily deduction: ${item.itemName}`,
                        date: getLocalISODate(),
                        timestamp: new Date().toISOString()
                    });
                }
            });

            Storage.set('stocks', stocks);

            if (targetItem && log.items.length > 1) {
                log.items.splice(itemIndex, 1);
                Storage.set('stockConsumptions', consumptions);
            } else {
                const filteredLogs = consumptions.filter(c => c.id !== logId);
                Storage.set('stockConsumptions', filteredLogs);
            }

            renderConsumptionHistoryList();
            loadStock();
            if (typeof updateDeductViewKPIs === 'function') updateDeductViewKPIs();
            if (typeof showCustomAlert === 'function') {
                showCustomAlert('Consumption record reverted and stock quantity restored.', 'Restored');
            }
        };

        if (typeof showCustomConfirm === 'function') {
            showCustomConfirm(confirmMsg, doRevert, null, {
                title: 'Revert Stock Deduction',
                confirmText: 'Revert',
                cancelText: 'Cancel',
                type: 'warning',
                icon: '↩️'
            });
        } else {
            doRevert();
        }
    });
};

// ==========================================
// STOCK LEDGER & TRANSACTION HISTORY (EXCEL VIEW)
// ==========================================
function recordStockLedgerEntry(entry) {
    if (!entry || !entry.stockId) return;
    const ledger = Storage.get('stockLedgerLogs') || [];
    const newEntry = {
        id: 'ledg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        stockId: String(entry.stockId),
        itemName: entry.itemName || 'Stock Item',
        type: entry.type || 'addition',
        typeLabel: entry.typeLabel || (entry.changeQty >= 0 ? 'Stock Added (+)' : 'Stock Deducted (-)'),
        changeQty: parseFloat(entry.changeQty) || 0,
        previousQty: parseFloat(entry.previousQty) || 0,
        resultingQty: parseFloat(entry.resultingQty) || 0,
        unit: entry.unit || 'pcs',
        unitPrice: parseFloat(entry.unitPrice) || 0,
        note: entry.note || '',
        date: entry.date || getLocalISODate(),
        timestamp: entry.timestamp || new Date().toISOString()
    };
    ledger.unshift(newEntry);
    Storage.set('stockLedgerLogs', ledger);
    return newEntry;
}

let currentLedgerStockItem = null;
let currentLedgerEntries = [];

window.openStockItemLedgerModal = function openStockItemLedgerModal(stockId) {
    const stocks = syncAndGetStockItems();
    const item = stocks.find(s => String(s.id) === String(stockId));
    if (!item) {
        if (typeof showCustomAlert === 'function') {
            showCustomAlert('Stock item not found.', 'Error');
        } else {
            alert('Stock item not found.');
        }
        return;
    }

    currentLedgerStockItem = item;

    // Set title and subtitle
    const titleEl = document.getElementById('pageItemLedgerTitle') || document.getElementById('itemStockLedgerTitle');
    const subtitleEl = document.getElementById('pageItemLedgerSubtitle') || document.getElementById('itemStockLedgerSubtitle');
    if (titleEl) titleEl.textContent = `${item.itemName} — Excel Stock Ledger`;
    if (subtitleEl) subtitleEl.textContent = `Unit: ${item.unit} | Unit Cost: Rs. ${formatNumber(item.unitPrice || 0)} | Min Alert: ${item.minLevel || 0} ${item.unit}`;

    // Reset filters
    const searchInput = document.getElementById('ledgerSearchInput');
    const typeFilter = document.getElementById('ledgerTypeFilter');
    if (searchInput) searchInput.value = '';
    if (typeFilter) typeFilter.value = 'all';

    // Fetch and assemble transactions
    const ledgerLogs = Storage.get('stockLedgerLogs') || [];
    let itemLogs = ledgerLogs.filter(l => String(l.stockId) === String(item.id) || (l.itemName && l.itemName.trim().toLowerCase() === item.itemName.trim().toLowerCase()));

    // Also scan historical consumptions if not in ledgerLogs yet
    const consumptions = Storage.get('stockConsumptions') || [];
    consumptions.forEach(c => {
        (c.items || []).forEach(ci => {
            if (String(ci.stockId) === String(item.id) || (ci.itemName && ci.itemName.trim().toLowerCase() === item.itemName.trim().toLowerCase())) {
                const deductQty = parseFloat(ci.finalDeductQty || ci.enteredQty || ci.deductedQty) || 0;
                const dateKey = c.date || c.timestamp?.slice(0, 10) || getLocalISODate();
                
                const exists = itemLogs.some(l => l.timestamp === c.timestamp || (l.date === dateKey && Math.abs(l.changeQty - (-deductQty)) < 0.001));
                if (!exists) {
                    itemLogs.push({
                        id: 'hist_' + c.id + '_' + (ci.stockId || '0'),
                        stockId: String(item.id),
                        itemName: item.itemName,
                        type: 'consumption',
                        typeLabel: 'Daily Consumption',
                        changeQty: -deductQty,
                        previousQty: 0,
                        resultingQty: 0,
                        unit: ci.stockUnit || ci.enteredUnit || item.unit,
                        note: ci.note ? `${ci.note} (Daily Sales Deduct)` : 'Daily Sales Consumption',
                        date: dateKey,
                        timestamp: c.timestamp || new Date(dateKey).toISOString()
                    });
                }
            }
        });
    });

    // If itemLogs is empty, synthesize initial entry based on creation or current stock
    if (itemLogs.length === 0) {
        itemLogs.push({
            id: 'init_' + item.id,
            stockId: String(item.id),
            itemName: item.itemName,
            type: 'initial',
            typeLabel: 'Current / Initial Stock',
            changeQty: parseFloat(item.quantity) || 0,
            previousQty: 0,
            resultingQty: parseFloat(item.quantity) || 0,
            unit: item.unit,
            unitPrice: item.unitPrice || 0,
            note: 'Initial inventory record',
            date: (item.createdAt || item.updatedAt || new Date().toISOString()).slice(0, 10),
            timestamp: item.createdAt || item.updatedAt || new Date().toISOString()
        });
    }

    // Sort newest first
    itemLogs.sort((a, b) => new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date));
    currentLedgerEntries = itemLogs;

    // Calculate Summary Metrics
    const currentQty = parseFloat(item.quantity) || 0;
    let totalAdded = 0;
    let totalDeducted = 0;

    itemLogs.forEach(entry => {
        const cq = parseFloat(entry.changeQty) || 0;
        if (cq > 0) totalAdded += cq;
        else if (cq < 0) totalDeducted += Math.abs(cq);
    });

    const currEl = document.getElementById('ledgerCurrentStockQty');
    const addEl = document.getElementById('ledgerTotalAddedQty');
    const dedEl = document.getElementById('ledgerTotalDeductedQty');
    const txEl = document.getElementById('ledgerTotalTransactions');

    if (currEl) currEl.textContent = `${formatQuantity(currentQty)} ${item.unit}`;
    if (addEl) addEl.textContent = `+${formatQuantity(totalAdded)} ${item.unit}`;
    if (dedEl) dedEl.textContent = `-${formatQuantity(totalDeducted)} ${item.unit}`;
    if (txEl) txEl.textContent = `${itemLogs.length} Records`;

    renderStockItemLedgerTable(itemLogs);
    switchStockView('ledger');
};

window.closeStockItemLedgerModal = function closeStockItemLedgerModal() {
    switchStockView('inventory');
    currentLedgerStockItem = null;
    currentLedgerEntries = [];
};

window.renderStockItemLedgerTable = function renderStockItemLedgerTable(entries) {
    const tbody = document.getElementById('stockLedgerTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (!entries || entries.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 40px; color: #94a3b8; font-size: 14px;">
                    No transactions found matching your filter criteria.
                </td>
            </tr>
        `;
        return;
    }

    entries.forEach((entry, index) => {
        const tr = document.createElement('tr');
        const dt = new Date(entry.timestamp || entry.date);
        const formattedDate = !isNaN(dt.getTime()) ? dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : entry.date;
        const formattedTime = !isNaN(dt.getTime()) ? dt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : '';

        const changeQty = parseFloat(entry.changeQty) || 0;
        const isAddition = changeQty > 0;
        const isDeduction = changeQty < 0;

        let badgeClass = 'type-adjust';
        if (isAddition) badgeClass = 'type-in';
        else if (isDeduction) badgeClass = 'type-out';

        const qtyDisplay = (isAddition ? '+' : '') + formatQuantity(changeQty);
        const qtyColor = isAddition ? '#15803d' : (isDeduction ? '#b91c1c' : '#475569');

        tr.innerHTML = `
            <td style="text-align: center; font-weight: 700; color: #64748b; font-size: 12px;">${index + 1}</td>
            <td style="font-weight: 600; color: #1e293b; white-space: nowrap;">
                <div>${formattedDate}</div>
                <div style="font-size: 11px; color: #64748b; font-weight: 500;">${formattedTime}</div>
            </td>
            <td style="text-align: center;">
                <span class="stock-ledger-badge ${badgeClass}">
                    ${escapeHtml(entry.typeLabel || (isAddition ? 'Added' : 'Deducted'))}
                </span>
            </td>
            <td style="text-align: right; font-weight: 800; font-size: 14px; color: ${qtyColor}; white-space: nowrap;">
                ${qtyDisplay}
            </td>
            <td style="text-align: right; color: #64748b; font-weight: 600;">
                ${entry.previousQty !== undefined && entry.previousQty !== null ? formatQuantity(entry.previousQty) : '-'}
            </td>
            <td style="text-align: right; font-weight: 800; color: #0f172a;">
                ${entry.resultingQty !== undefined && entry.resultingQty !== null ? formatQuantity(entry.resultingQty) : '-'}
            </td>
            <td style="text-align: center; color: #475569; font-weight: 600;">
                ${escapeHtml(entry.unit || (currentLedgerStockItem ? currentLedgerStockItem.unit : ''))}
            </td>
            <td style="color: #334155; font-size: 12.5px;">
                ${escapeHtml(entry.note || '-')}
            </td>
        `;
        tbody.appendChild(tr);
    });
};

window.filterStockItemLedgerTable = function filterStockItemLedgerTable() {
    if (!currentLedgerEntries) return;
    const search = (document.getElementById('ledgerSearchInput')?.value || '').toLowerCase().trim();
    const typeFilter = document.getElementById('ledgerTypeFilter')?.value || 'all';

    let filtered = currentLedgerEntries.filter(entry => {
        const matchesSearch = !search ||
            (entry.note || '').toLowerCase().includes(search) ||
            (entry.typeLabel || '').toLowerCase().includes(search) ||
            (entry.date || '').toLowerCase().includes(search);

        let matchesType = true;
        const cq = parseFloat(entry.changeQty) || 0;
        if (typeFilter === 'in') {
            matchesType = cq > 0;
        } else if (typeFilter === 'out') {
            matchesType = cq < 0;
        }

        return matchesSearch && matchesType;
    });

    renderStockItemLedgerTable(filtered);
};

window.exportStockLedgerToCSV = function exportStockLedgerToCSV() {
    if (!currentLedgerStockItem || !currentLedgerEntries || currentLedgerEntries.length === 0) {
        if (typeof showCustomAlert === 'function') {
            showCustomAlert('No ledger entries to export.', 'Notice');
        } else {
            alert('No ledger entries to export.');
        }
        return;
    }

    const item = currentLedgerStockItem;
    const headers = ['#', 'Date', 'Time', 'Transaction Type', 'Qty Changed', 'Prev Stock', 'Balance Stock', 'Unit', 'Notes'];
    const rows = currentLedgerEntries.map((e, idx) => {
        const dt = new Date(e.timestamp || e.date);
        const dateStr = !isNaN(dt.getTime()) ? dt.toLocaleDateString('en-US') : e.date;
        const timeStr = !isNaN(dt.getTime()) ? dt.toLocaleTimeString('en-US') : '';
        const qtyChanged = (parseFloat(e.changeQty) > 0 ? '+' : '') + formatQuantity(e.changeQty);
        const prevStock = e.previousQty !== undefined ? formatQuantity(e.previousQty) : '';
        const balStock = e.resultingQty !== undefined ? formatQuantity(e.resultingQty) : '';
        const cleanNote = (e.note || '').replace(/"/g, '""');

        return [
            idx + 1,
            `"${dateStr}"`,
            `"${timeStr}"`,
            `"${e.typeLabel || ''}"`,
            `"${qtyChanged}"`,
            `"${prevStock}"`,
            `"${balStock}"`,
            `"${e.unit || item.unit}"`,
            `"${cleanNote}"`
        ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    const safeName = (item.itemName || 'stock_item').replace(/[^a-zA-Z0-9_-]/g, '_');
    link.setAttribute('download', `Stock_Ledger_${safeName}_${getLocalISODate()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

window.printStockItemLedgerReport = function printStockItemLedgerReport() {
    if (!currentLedgerStockItem || !currentLedgerEntries) return;

    const item = currentLedgerStockItem;
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    let rowsHtml = '';
    currentLedgerEntries.forEach((e, idx) => {
        const dt = new Date(e.timestamp || e.date);
        const dStr = !isNaN(dt.getTime()) ? dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : e.date;
        const tStr = !isNaN(dt.getTime()) ? dt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : '';
        const cq = parseFloat(e.changeQty) || 0;
        const isAdd = cq > 0;
        const isSub = cq < 0;
        const color = isAdd ? '#15803d' : (isSub ? '#b91c1c' : '#333');
        const qtyDisplay = (isAdd ? '+' : '') + formatQuantity(cq);

        rowsHtml += `
            <tr>
                <td style="text-align: center; border-right: 1px solid #000; padding: 3px 4px; font-size: 10px;">${idx + 1}</td>
                <td style="border-right: 1px solid #000; padding: 3px 4px; font-size: 10px;">${dStr} ${tStr}</td>
                <td style="border-right: 1px solid #000; padding: 3px 4px; font-size: 10px;">${escapeHtml(e.typeLabel || '')}</td>
                <td style="text-align: right; border-right: 1px solid #000; padding: 3px 4px; font-weight: 700; color: ${color}; font-size: 10px;">${qtyDisplay}</td>
                <td style="text-align: right; border-right: 1px solid #000; padding: 3px 4px; font-weight: 700; font-size: 10px;">${e.resultingQty !== undefined ? formatQuantity(e.resultingQty) : '-'} ${e.unit || item.unit}</td>
                <td style="padding: 3px 4px; font-size: 9.5px;">${escapeHtml(e.note || '-')}</td>
            </tr>
        `;
    });

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Stock Ledger — ${escapeHtml(item.itemName)}</title>
            <style>
                body { font-family: 'Poppins', -apple-system, sans-serif; font-size: 11px; width: 80mm; max-width: 80mm; margin: 0 auto; padding: 8px; color: #000; background: #fff; }
                .text-center { text-align: center; }
                .text-right { text-align: right; }
                .bold { font-weight: 700; }
                .header h1 { font-size: 16px; margin: 0 0 2px 0; text-transform: uppercase; }
                .divider { border-bottom: 1.5px dashed #000; margin: 5px 0; }
                table { width: 100%; border-collapse: collapse; border: 1.5px solid #000; margin-top: 5px; }
                th { background: #fff; border-bottom: 1.5px solid #000; padding: 3px 4px; font-size: 9.5px; font-weight: 700; text-transform: uppercase; }
                td { border-bottom: 1px solid #ddd; }
                @media print { body { width: 100%; margin: 0; padding: 2mm; } @page { size: 80mm auto; margin: 2mm; } }
            </style>
        </head>
        <body>
            <div class="header text-center">
                <h1>Hangout Lounge & Co.</h1>
                <p style="margin: 2px 0;">Wah Cantt | 0300-9509536</p>
                <div style="border: 1.5px solid #000; display: inline-block; padding: 2px 10px; font-weight: 700; text-transform: uppercase; margin: 4px 0;">
                    ITEM STOCK LEDGER
                </div>
                <div style="font-size: 12px; font-weight: 800; margin-top: 2px;">${escapeHtml(item.itemName)}</div>
                <div style="font-size: 10.5px; color: #444;">Current Stock: <strong>${formatQuantity(item.quantity)} ${escapeHtml(item.unit)}</strong></div>
                <div style="font-size: 10px; color: #666;">Generated: ${dateStr} ${timeStr}</div>
            </div>
            <div class="divider"></div>
            <table>
                <thead>
                    <tr>
                        <th style="width: 25px; border-right: 1px solid #000;">#</th>
                        <th style="border-right: 1px solid #000;">DATE</th>
                        <th style="border-right: 1px solid #000;">ACTION</th>
                        <th style="border-right: 1px solid #000; text-align: right;">QTY</th>
                        <th style="border-right: 1px solid #000; text-align: right;">BAL</th>
                        <th>NOTE</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
            <div style="margin-top: 8px; text-align: center; font-size: 10px; font-weight: 600;">
                End of Ledger Report
            </div>
            <script>
                window.onload = function() {
                    setTimeout(function() { window.print(); }, 250);
                };
            </script>
        </body>
        </html>
    `;

    openReportPrintWindow(html, `Stock Ledger - ${item.itemName}`);
};

// Handle Stock form submission (Add / Edit)
onDOMReady(() => {
    const stockForm = document.getElementById('stockForm');
    if (stockForm) {
        stockForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const stocks = syncAndGetStockItems();
            const itemName = (document.getElementById('stockItemName').value || '').trim();
            const enteredQuantity = parseFloat(document.getElementById('stockQuantity').value) || 0;
            const unit = document.getElementById('stockUnit').value || 'kg';
            const unitPrice = parseFloat(document.getElementById('stockUnitPrice').value) || 0;
            const minLevel = parseFloat(document.getElementById('stockMinLevel').value) || 0;
            const addMode = document.querySelector('input[name="stockAddMode"]:checked')?.value || 'add';

            if (!itemName) {
                alert('Please enter an item or ingredient name.');
                return;
            }

            const targetIndex = stocks.findIndex(s => 
                (editingStockId && String(s.id) === String(editingStockId)) ||
                (!editingStockId && s.itemName && s.itemName.trim().toLowerCase() === itemName.toLowerCase())
            );

            if (targetIndex !== -1) {
                const oldItem = stocks[targetIndex];
                const oldQty = parseFloat(oldItem.quantity) || 0;
                const oldPrice = parseFloat(oldItem.unitPrice || 0);

                let newQty = enteredQuantity;
                let changeQty = enteredQuantity - oldQty;
                let actionType = 'addition';
                let actionLabel = 'Stock Added (+)';
                let noteMsg = '';

                if (!editingStockId && addMode === 'add') {
                    // User added newly purchased batch to existing stock
                    newQty = oldQty + enteredQuantity;
                    changeQty = enteredQuantity;
                    actionType = 'addition';
                    actionLabel = 'Stock Purchase Added (+)';
                    const priceDiffNote = (unitPrice !== oldPrice && oldPrice > 0)
                        ? ` (Price updated: Rs. ${oldPrice} -> Rs. ${unitPrice}/${unit})`
                        : ` (@ Rs. ${unitPrice}/${unit})`;
                    noteMsg = `Purchased +${enteredQuantity} ${unit}${priceDiffNote}`;
                } else {
                    // Direct edit/overwrite
                    newQty = enteredQuantity;
                    changeQty = enteredQuantity - oldQty;
                    actionType = changeQty >= 0 ? 'addition' : 'deduction';
                    actionLabel = changeQty >= 0 ? 'Stock Updated / Added (+)' : 'Stock Updated / Reduced (-)';
                    noteMsg = `Stock edited (${oldQty} -> ${newQty} ${unit}) @ Rs. ${unitPrice}/${unit}`;
                }

                stocks[targetIndex] = {
                    ...stocks[targetIndex],
                    itemName,
                    quantity: newQty,
                    unit,
                    unitPrice,
                    minLevel,
                    updatedAt: new Date().toISOString()
                };

                // Record edit in ledger
                if (Math.abs(changeQty) > 0.0001 || unitPrice !== oldPrice) {
                    recordStockLedgerEntry({
                        stockId: stocks[targetIndex].id,
                        itemName,
                        type: actionType,
                        typeLabel: actionLabel,
                        changeQty: changeQty,
                        previousQty: oldQty,
                        resultingQty: newQty,
                        unit,
                        unitPrice,
                        note: noteMsg,
                        date: getLocalISODate(),
                        timestamp: new Date().toISOString()
                    });
                }
            } else {
                const newStockId = 'stock_' + Date.now();
                stocks.push({
                    id: newStockId,
                    itemName,
                    quantity: enteredQuantity,
                    unit,
                    unitPrice,
                    minLevel,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });

                // Record initial stock in ledger
                recordStockLedgerEntry({
                    stockId: newStockId,
                    itemName,
                    type: 'initial',
                    typeLabel: 'New Item Created / Initial Stock',
                    changeQty: enteredQuantity,
                    previousQty: 0,
                    resultingQty: enteredQuantity,
                    unit,
                    unitPrice,
                    note: `Initial stock @ Rs. ${unitPrice}/${unit}`,
                    date: getLocalISODate(),
                    timestamp: new Date().toISOString()
                });
            }

            Storage.set('stocks', stocks);
            loadStock();
            closeAddStockModal();
            if (typeof showCustomAlert === 'function') {
                showCustomAlert(`Saved: ${itemName} stock updated successfully.`, 'Stock Saved');
            }
        });
    }
});

// Table Management
let editingTableId = null;
let currentBookingTableId = null;
let tablesFilter = 'all';

const tableColors = ['#4a90e2', '#4caf50', '#ff9800', '#9c27b0', '#f44336', '#00bcd4', '#795548', '#607d8b'];

// Dynamic date/week utility helpers
function getISOWeekString(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    const pad = (val) => String(val).padStart(2, '0');
    return `${d.getUTCFullYear()}-W${pad(weekNo)}`;
}

function getISOWeekAndYear(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return { year: d.getUTCFullYear(), week: weekNo };
}

function isOrderInTableTimeFilter(orderDateStr, filterType, filterValue) {
    if (!orderDateStr) return false;
    
    const orderDate = new Date(orderDateStr);
    if (isNaN(orderDate.getTime())) return false;
    
    if (filterType === 'alltime' || !filterValue) {
        return true;
    }
    
    const isoDate = getLocalISODate(orderDate);
    
    if (filterType === 'daily') {
        return isoDate === filterValue;
    }
    
    if (filterType === 'monthly') {
        return isoDate.substring(0, 7) === filterValue;
    }
    
    if (filterType === 'annual') {
        return String(orderDate.getFullYear()) === String(filterValue);
    }
    
    return false;
}

window.handleTableTimeFilterTypeChange = function() {
    const filterSelect = document.getElementById('tableTimeFilterType');
    const container = document.getElementById('tableTimeValueContainer');
    if (!filterSelect || !container) return;

    const filterType = filterSelect.value;
    const todayStr = getLocalISODate();
    const monthStr = getLocalISOMonth();
    const currentYear = new Date().getFullYear();

    container.innerHTML = '';

    if (filterType === 'daily') {
        container.innerHTML = `
            <label style="font-size: 12px; font-weight: 600; color: #4b5563; font-family: 'Inter', sans-serif;">Select Date</label>
            <input type="date" id="tableTimeDateInput" value="${todayStr}" onchange="loadTables(); updateTableResetBtn();" style="padding: 8px 12px; border: 1.5px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; font-family: 'Inter', sans-serif; height: 38px;">
        `;
    } else if (filterType === 'monthly') {
        container.innerHTML = `
            <label style="font-size: 12px; font-weight: 600; color: #4b5563; font-family: 'Inter', sans-serif;">Select Month</label>
            <input type="month" id="tableTimeMonthInput" value="${monthStr}" onchange="loadTables(); updateTableResetBtn();" style="padding: 8px 12px; border: 1.5px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; font-family: 'Inter', sans-serif; height: 38px;">
        `;
    } else if (filterType === 'annual') {
        container.innerHTML = `
            <label style="font-size: 12px; font-weight: 600; color: #4b5563; font-family: 'Inter', sans-serif;">Select Year</label>
            <select id="tableTimeYearInput" onchange="loadTables(); updateTableResetBtn();" style="padding: 8px 12px; border: 1.5px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; background: white; font-family: 'Inter', sans-serif; height: 38px; cursor: pointer;">
                ${getFilterYearOptions(currentYear)}
            </select>
        `;
    }

    updateTableResetBtn();
    loadTables();
};

window.updateTableResetBtn = function() {
    const filterSelect = document.getElementById('tableTimeFilterType');
    const resetBtn = document.getElementById('tableResetFilterBtn');
    if (!filterSelect || !resetBtn) return;

    const filterType = filterSelect.value;
    const dateInput = document.getElementById('tableTimeDateInput');
    const todayStr = getLocalISODate();

    let isDefault = (filterType === 'daily' && (!dateInput || dateInput.value === todayStr));
    resetBtn.style.display = isDefault ? 'none' : 'inline-flex';
};

window.resetTableTimeFilter = function() {
    const filterSelect = document.getElementById('tableTimeFilterType');
    if (filterSelect) {
        filterSelect.value = 'daily';
        handleTableTimeFilterTypeChange();
    }
};

function toggleOrdersRow(tableId, parentTr) {
    const detailRow = document.getElementById(`orders-row-${tableId}`);
    if (!detailRow) return;

    const isVisible = detailRow.style.display !== 'none';
    const toggleCell = parentTr.querySelector('.expand-toggle');

    if (isVisible) {
        detailRow.style.display = 'none';
        if (toggleCell) toggleCell.innerHTML = '&#9654;'; // ▶
    } else {
        detailRow.style.display = 'table-row';
        if (toggleCell) toggleCell.innerHTML = '&#9660;'; // ▼
    }
}

function loadTables() {
    let tables = Storage.get('tables') || [];
    // Normalize legacy table ids (number -> string) so actions keep working
    let tablesChanged = false;
    if (Array.isArray(tables)) {
        tables.forEach((t, idx) => {
            if (!t) return;
            if (t.id === undefined || t.id === null || t.id === '') {
                t.id = `${Date.now()}_${idx}_${Math.random().toString(16).slice(2)}`;
                tablesChanged = true;
            } else if (typeof t.id !== 'string') {
                t.id = String(t.id);
                tablesChanged = true;
            }
        });
        if (tablesChanged) Storage.set('tables', tables);
    } else {
        tables = [];
    }
    const grid = document.getElementById('tablesGrid');
    if (!grid) return;

    grid.innerHTML = '';

    // Fetch sales and hold orders to match orders with tables
    const sales = Storage.get('sales') || [];
    const holdOrders = Storage.get('holdOrders') || [];

    // Get selected time filter type and selected value
    const timeFilterType = document.getElementById('tableTimeFilterType')?.value || 'alltime';
    let timeFilterValue = '';
    if (timeFilterType === 'daily') {
        timeFilterValue = document.getElementById('tableTimeDateInput')?.value || '';
    } else if (timeFilterType === 'weekly') {
        timeFilterValue = document.getElementById('tableTimeWeekInput')?.value || '';
    } else if (timeFilterType === 'monthly') {
        timeFilterValue = document.getElementById('tableTimeMonthInput')?.value || '';
    } else if (timeFilterType === 'annual') {
        timeFilterValue = document.getElementById('tableTimeYearInput')?.value || '';
    }

    // Match orders for each table and compute aggregate statistics
    tables.forEach(table => {
        const tableNumStr = String(table.number);

        // Find matching sales (completed)
        const matchingSales = sales.filter(sale => {
            const matchTable = String(sale.tableNo) === tableNumStr;
            const matchTime = isOrderInTableTimeFilter(sale.date, timeFilterType, timeFilterValue);
            return matchTable && matchTime;
        });

        // Find matching hold orders (pending)
        const matchingHolds = holdOrders.filter(hold => {
            const matchTable = String(hold.tableNo) === tableNumStr;
            const holdDate = hold.createdAt || hold.date;
            const matchTime = isOrderInTableTimeFilter(holdDate, timeFilterType, timeFilterValue);
            return matchTable && matchTime;
        });

        // Merge matching orders
        table.matchingOrders = [
            ...matchingHolds.map(h => ({
                id: h.id,
                orderId: h.orderId,
                orderNumber: h.orderNumber,
                date: h.createdAt || h.date,
                total: h.total || 0,
                status: 'pending',
                items: h.items || []
            })),
            ...matchingSales.map(s => ({
                id: s.id,
                orderId: s.orderId,
                orderNumber: s.orderNumber,
                date: s.date,
                total: s.total || 0,
                status: 'completed',
                items: s.items || []
            }))
        ];

        // Sort table's matching orders chronologically (newest first)
        table.matchingOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Aggregate statistics (completed orders only)
        const completedOrders = table.matchingOrders.filter(o => o.status === 'completed');
        table.totalOrdersCount = completedOrders.length;
        table.totalRevenue = completedOrders.reduce((sum, order) => sum + (order.total || 0), 0);
    });

    // Filter tables by book status (All, Booked, Available)
    let filteredTables = tables;
    if (tablesFilter === 'booked') {
        filteredTables = tables.filter(table => table.status === 'booked');
    } else if (tablesFilter === 'available') {
        filteredTables = tables.filter(table => table.status === 'available' || !table.status);
    }

    // Sort the tables list
    const sortBy = document.getElementById('tableSortBy')?.value || 'number-asc';
    filteredTables.sort((a, b) => {
        if (sortBy === 'number-asc') {
            return parseInt(a.number, 10) - parseInt(b.number, 10);
        } else if (sortBy === 'number-desc') {
            return parseInt(b.number, 10) - parseInt(a.number, 10);
        } else if (sortBy === 'seats-asc') {
            return (a.seats || 0) - (b.seats || 0);
        } else if (sortBy === 'seats-desc') {
            return (b.seats || 0) - (a.seats || 0);
        } else if (sortBy === 'orders-asc') {
            return a.totalOrdersCount - b.totalOrdersCount;
        } else if (sortBy === 'orders-desc') {
            return b.totalOrdersCount - a.totalOrdersCount;
        } else if (sortBy === 'revenue-asc') {
            return a.totalRevenue - b.totalRevenue;
        } else if (sortBy === 'revenue-desc') {
            return b.totalRevenue - a.totalRevenue;
        }
        return 0;
    });
    
    // Store globally for print report
    window.currentFilteredTables = filteredTables;

    if (filteredTables.length === 0) {
        grid.innerHTML = '<div style="text-align: center; padding: 40px; color: #999; font-family: \'Inter\', sans-serif;">No tables found. Add a table to get started.</div>';
        return;
    }

    // Create the table list HTML structure
    const tableContainer = document.createElement('div');
    tableContainer.style.cssText = 'width: 100%; overflow-x: auto; background: white; border-radius: 12px; border: 1px solid #e5e7eb; box-shadow: 0 4px 15px rgba(0,0,0,0.05);';

    const tableElement = document.createElement('table');
    tableElement.style.cssText = 'width: 100%; border-collapse: collapse; text-align: left; font-family: \'Inter\', sans-serif;';
    tableElement.innerHTML = `
        <thead>
            <tr style="background-color: #f3f4f6; border-bottom: 2px solid #e5e7eb; color: #374151; font-weight: 700; font-size: 14px;">
                <th style="padding: 6px 12px; width: 40px; text-align: center;"></th>
                <th style="padding: 6px 12px;">Table Number</th>
                <th style="padding: 6px 12px;">Seats</th>
                <th style="padding: 6px 12px;">Status</th>
                <th style="padding: 6px 12px;">Booking Info</th>
                <th style="padding: 6px 12px; text-align: center;">Orders Count</th>
                <th style="padding: 6px 12px; text-align: right;">Total Revenue</th>
                <th style="padding: 6px 12px; text-align: center;">Actions</th>
            </tr>
        </thead>
        <tbody id="tableListBody"></tbody>
    `;

    tableContainer.appendChild(tableElement);
    grid.appendChild(tableContainer);

    const tableListBody = tableElement.querySelector('#tableListBody');

    filteredTables.forEach(table => {
        const tr = document.createElement('tr');
        tr.style.cssText = 'border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #4b5563; transition: background 0.15s; cursor: pointer;';
        tr.onmouseenter = () => { tr.style.backgroundColor = '#f9fafb'; };
        tr.onmouseleave = () => { tr.style.backgroundColor = 'transparent'; };

        const status = table.status || 'available';
        const statusColor = status === 'booked' ? '#10b981' : '#3b82f6';
        const statusBg = status === 'booked' ? '#ecfdf5' : '#eff6ff';
        const statusBadge = `<span style="background: ${statusBg}; color: ${statusColor}; padding: 4px 10px; border-radius: 9999px; font-weight: 600; font-size: 12px; display: inline-block;">${status === 'booked' ? 'Booked' : 'Available'}</span>`;

        let bookingInfo = '<span style="color: #9ca3af;">-</span>';
        if (status === 'booked' && table.customerName) {
            const dateInfo = table.bookingDate ? formatDate(new Date(table.bookingDate + 'T00:00:00')) : '';
            const timeInfo = table.bookingTime ? formatTime12Hour(table.bookingTime) : '';
            bookingInfo = `
                <div style="font-weight: 600; color: #1f2937;">${escapeHtml(table.customerName)}</div>
                <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">📞 ${escapeHtml(table.customerContact || 'N/A')}</div>
                ${dateInfo || timeInfo ? `<div style="font-size: 12px; color: #6b7280; margin-top: 2px;">📅 ${dateInfo} ${timeInfo ? '• ' + timeInfo : ''}</div>` : ''}
            `;
        }

        const totalOrders = table.totalOrdersCount;
        const totalRevenue = table.totalRevenue;

        tr.innerHTML = `
            <td style="padding: 6px 12px; text-align: center; font-size: 12px; color: #9ca3af; user-select: none;" class="expand-toggle">
                ${totalOrders > 0 ? '&#9654;' : ''}
            </td>
            <td style="padding: 6px 12px; font-weight: 700; color: #1f2937;">Table ${table.number}</td>
            <td style="padding: 6px 12px; font-weight: 500;">${table.seats} seats</td>
            <td style="padding: 6px 12px;">${statusBadge}</td>
            <td style="padding: 6px 12px;">${bookingInfo}</td>
            <td style="padding: 6px 12px; text-align: center; font-weight: 600; color: #1f2937;">${totalOrders}</td>
            <td style="padding: 6px 12px; text-align: right; font-weight: 600; color: #10b981;">Rs. ${formatNumber(totalRevenue)}</td>
            <td style="padding: 6px 12px; text-align: center;">
                <div style="display: flex; gap: 8px; justify-content: center; align-items: center;">
                    ${status === 'booked' ? 
                        `<button class="unbook-btn-list" data-table-id="${table.id}" style="background: #10b981; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; outline: none; transition: background 0.2s;">Unbook</button>` :
                        `<button onclick="event.stopPropagation(); openBookTableModal('${table.id}')" style="background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; outline: none; transition: background 0.2s;">Book Now</button>`
                    }
                    ${status === 'booked' ?
                        `<button onclick="event.stopPropagation(); editTableBooking('${table.id}')" style="background: #eab308; color: white; border: none; padding: 6px 8px; border-radius: 6px; cursor: pointer; font-size: 12px; outline: none;" title="Edit Booking">✏️</button>` : ''
                    }
                    <button onclick="event.stopPropagation(); editTable('${table.id}')" style="background: #9ca3af; color: white; border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500; outline: none; transition: background 0.2s;">Edit</button>
                    <button onclick="event.stopPropagation(); deleteTable('${table.id}', this)" style="background: #ef4444; color: white; border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500; outline: none; transition: background 0.2s;">Delete</button>
                </div>
            </td>
        `;

        tr.onclick = (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
            if (totalOrders > 0) {
                toggleOrdersRow(table.id, tr);
            }
        };

        tableListBody.appendChild(tr);

        // Bind Unbook click handler safely
        if (status === 'booked') {
            const unbookBtn = tr.querySelector('.unbook-btn-list');
            if (unbookBtn) {
                unbookBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showCustomConfirm(`Are you sure you want to unbook Table ${table.number}?`, () => {
                        unbookTableConfirmed(table.id);
                    }, null, { title: 'Unbook Table', confirmText: 'Unbook', type: 'warning' });
                });
            }
        }

        // Render details row if there are orders
        if (totalOrders > 0) {
            const detailTr = document.createElement('tr');
            detailTr.id = `orders-row-${table.id}`;
            detailTr.style.cssText = 'display: none; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;';

            let ordersRowsHTML = '';
            table.matchingOrders.forEach(order => {
                const dateObj = new Date(order.date);
                const orderTimeStr = isNaN(dateObj.getTime()) ? '-' : `${formatDate(dateObj)} ${formatTime(dateObj)}`;
                const itemsStr = order.items.map(item => `${item.name} x${item.quantity}`).join(', ');
                const statusBadgeOrder = order.status === 'completed'
                    ? '<span style="background: #ecfdf5; color: #10b981; padding: 2px 8px; border-radius: 9999px; font-weight: 600; font-size: 11px;">Completed</span>'
                    : '<span style="background: #fffbeb; color: #f59e0b; padding: 2px 8px; border-radius: 9999px; font-weight: 600; font-size: 11px;">Pending</span>';

                ordersRowsHTML += `
                    <tr style="border-bottom: 1px solid #f3f4f6; font-size: 13px;">
                        <td style="padding: 10px; font-weight: 600; color: #1f2937;">${escapeHtml(order.orderId || order.id)}</td>
                        <td style="padding: 10px;">${orderTimeStr}</td>
                        <td style="padding: 10px; max-width: 320px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="${escapeHtml(itemsStr)}">${escapeHtml(itemsStr)}</td>
                        <td style="padding: 10px; text-align: right; font-weight: 600; color: #1f2937;">Rs. ${formatNumber(order.total)}</td>
                        <td style="padding: 10px; text-align: center;">${statusBadgeOrder}</td>
                        <td style="padding: 10px; text-align: center;">
                            ${order.status === 'completed'
                                ? `<button onclick="event.stopPropagation(); window.printReceiptForSale('${order.id}')" style="background: transparent; border: 1px solid #d1d5db; color: #4b5563; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-size: 11px; font-weight: 500;">Print</button>`
                                : `<button onclick="event.stopPropagation(); editHoldOrder('${order.id}')" style="background: #3b82f6; color: white; border: none; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-size: 11px; font-weight: 500;">Edit Order</button>`
                            }
                        </td>
                    </tr>
                `;
            });

            detailTr.innerHTML = `
                <td colspan="8" style="padding: 15px 30px;">
                    <div style="background: white; border: 1px solid #e5e7eb; border-radius: 10px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                        <h4 style="margin: 0 0 12px 0; font-size: 13px; font-weight: 700; color: #374151; font-family: 'Inter', sans-serif;">Order History (${totalOrders} orders)</h4>
                        <table style="width: 100%; border-collapse: collapse; text-align: left;">
                            <thead>
                                <tr style="background: #f9fafb; border-bottom: 2px solid #e5e7eb; color: #4b5563; font-weight: 600; font-size: 12px;">
                                    <th style="padding: 10px;">Order ID</th>
                                    <th style="padding: 10px;">Date & Time</th>
                                    <th style="padding: 10px;">Items</th>
                                    <th style="padding: 10px; text-align: right;">Total</th>
                                    <th style="padding: 10px; text-align: center;">Status</th>
                                    <th style="padding: 10px; text-align: center;">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${ordersRowsHTML}
                            </tbody>
                        </table>
                    </div>
                </td>
            `;
            tableListBody.appendChild(detailTr);
        }
    });
}

window.filterTables = (filter) => {
    tablesFilter = filter;
    const allBtn = document.getElementById('tablesFilterAll');
    const bookedBtn = document.getElementById('tablesFilterBooked');
    const availableBtn = document.getElementById('tablesFilterAvailable');

    // Reset all buttons to inactive state
    if (allBtn) {
        allBtn.style.background = 'transparent';
        allBtn.style.color = '#666';
        allBtn.style.border = '1px solid transparent';
        allBtn.style.padding = '10px 18px';
        allBtn.style.fontSize = '16px';
        allBtn.style.boxShadow = 'none';
        allBtn.style.fontWeight = '500';
    }
    if (bookedBtn) {
        bookedBtn.style.background = 'transparent';
        bookedBtn.style.color = '#666';
        bookedBtn.style.border = '1px solid transparent';
        bookedBtn.style.padding = '10px 18px';
        bookedBtn.style.fontSize = '16px';
        bookedBtn.style.boxShadow = 'none';
        bookedBtn.style.fontWeight = '500';
    }
    if (availableBtn) {
        availableBtn.style.background = 'transparent';
        availableBtn.style.color = '#666';
        availableBtn.style.border = '1px solid transparent';
        availableBtn.style.padding = '10px 18px';
        availableBtn.style.fontSize = '16px';
        availableBtn.style.boxShadow = 'none';
        availableBtn.style.fontWeight = '500';
    }

    // Set active button with modern styling
    if (filter === 'all' && allBtn) {
        allBtn.style.background = '#4a90e2';
        allBtn.style.color = '#ffffff';
        allBtn.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        allBtn.style.padding = '10px 18px';
        allBtn.style.fontSize = '16px';
        allBtn.style.boxShadow = '0 2px 4px rgba(74, 144, 226, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
        allBtn.style.fontWeight = '600';
    } else if (filter === 'booked' && bookedBtn) {
        bookedBtn.style.background = '#4a90e2';
        bookedBtn.style.color = '#ffffff';
        bookedBtn.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        bookedBtn.style.padding = '10px 18px';
        bookedBtn.style.fontSize = '16px';
        bookedBtn.style.boxShadow = '0 2px 4px rgba(74, 144, 226, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
        bookedBtn.style.fontWeight = '600';
    } else if (filter === 'available' && availableBtn) {
        availableBtn.style.background = '#4a90e2';
        availableBtn.style.color = '#ffffff';
        availableBtn.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        availableBtn.style.padding = '10px 18px';
        availableBtn.style.fontSize = '16px';
        availableBtn.style.boxShadow = '0 2px 4px rgba(74, 144, 226, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
        availableBtn.style.fontWeight = '600';
    }

    loadTables();
};

window.printTablesReport = () => {
    const tables = window.currentFilteredTables || [];
    const activeTables = tables.filter(t => t.totalOrdersCount > 0);

    if (activeTables.length === 0) {
        alert('No tables with orders found to print for the selected time filter.');
        return;
    }

    const timeFilterType = document.getElementById('tableTimeFilterType')?.value || 'alltime';
    let filterLabel = 'All-Time';
    if (timeFilterType === 'daily') filterLabel = 'Daily';
    else if (timeFilterType === 'weekly') filterLabel = 'Weekly';
    else if (timeFilterType === 'monthly') filterLabel = 'Monthly';
    else if (timeFilterType === 'annual') filterLabel = 'Annual';

    // Generate HTML for the print window
    let html = `
        <html>
            <head>
                <title>Tables Report</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
                <style>
                    *, *::before, *::after {
                        box-sizing: border-box;
                        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
                    }
                    body {
                        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
                        padding: 10px 0;
                        margin: 0;
                        width: 80mm;
                        color: #000;
                        background: #fff;
                    }
                    h2 { text-align: center; margin-bottom: 2px; font-size: 16px; font-weight: bold; }
                    .filter-info { text-align: center; margin-bottom: 10px; font-size: 12px; border-bottom: 1px dashed #000; padding-bottom: 5px; }
                    table { width: 100%; border-collapse: collapse; font-size: 12px; }
                    th, td { border-bottom: 1px dashed #eee; padding: 4px 2px; text-align: center; }
                    th { font-weight: bold; border-bottom: 1px solid #000; border-top: 1px dashed #000; }
                    .text-left { text-align: left; }
                    .text-right { text-align: right; }
                    .totals { font-weight: bold; border-top: 1px solid #000; border-bottom: 1px solid #000; }
                    .totals td { padding: 6px 2px; border: none; }
                </style>
            </head>
            <body>
                <h2>TABLES REPORT</h2>
                <div class="filter-info">Filter: ${filterLabel}</div>
                <table>
                    <thead>
                        <tr>
                            <th class="text-left">Table</th>
                            <th>Ord</th>
                            <th class="text-right">Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    let totalAllOrders = 0;
    let totalAllRevenue = 0;

    activeTables.forEach(t => {
        totalAllOrders += t.totalOrdersCount;
        totalAllRevenue += t.totalRevenue;
        html += `
            <tr>
                <td class="text-left">T-${t.number}</td>
                <td>${t.totalOrdersCount}</td>
                <td class="text-right">${formatNumber(t.totalRevenue)}</td>
            </tr>
        `;
    });

    html += `
                    </tbody>
                    <tfoot>
                        <tr class="totals">
                            <td class="text-left">Total:</td>
                            <td>${totalAllOrders}</td>
                            <td class="text-right">${formatNumber(totalAllRevenue)}</td>
                        </tr>
                    </tfoot>
                </table>
                <script>
                    window.onload = function() {
                        setTimeout(() => {
                            window.print();
                            window.close();
                        }, 500);
                    };
                </script>
            </body>
        </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(html);
    printWindow.document.close();
};

window.openAddTableModal = () => {
    editingTableId = null;
    const modalTitle = document.getElementById('tableModalTitle');
    const tableForm = document.getElementById('tableForm');
    const modal = document.getElementById('addTableModal');

    if (!modalTitle || !tableForm || !modal) {
        console.error('Table modal elements not found');
        return;
    }

    modalTitle.textContent = 'Add Table';
    tableForm.reset();
    modal.style.display = 'flex';
};

window.closeAddTableModal = () => {
    document.getElementById('addTableModal').style.display = 'none';
    document.getElementById('tableForm').reset();
    editingTableId = null;
};

window.openBookTableModal = (tableId) => {
    currentBookingTableId = String(tableId);
    const form = document.getElementById('bookTableForm');
    form.reset();

    // Check if table is already booked and populate form with existing details
    const tables = Storage.get('tables') || [];
    const table = tables.find(t => String(t.id) === String(tableId));
    if (table && table.status === 'booked' && table.customerName) {
        const customerNameInput = document.getElementById('customerName');
        const customerContactInput = document.getElementById('customerContact');
        const bookingDateInput = document.getElementById('bookingDate');
        const bookingTimeInput = document.getElementById('bookingTime');
        if (customerNameInput) {
            customerNameInput.value = table.customerName || '';
        }
        if (customerContactInput) {
            customerContactInput.value = table.customerContact || '';
        }
        if (bookingDateInput) {
            bookingDateInput.value = table.bookingDate || '';
        }
        if (bookingTimeInput) {
            bookingTimeInput.value = table.bookingTime || '';
        }
    } else {
        // Set default date and time to current date/time for new bookings
        const bookingDateInput = document.getElementById('bookingDate');
        const bookingTimeInput = document.getElementById('bookingTime');
        if (bookingDateInput) {
            const today = new Date();
            const dateStr = today.toISOString().split('T')[0];
            bookingDateInput.value = dateStr;
        }
        if (bookingTimeInput) {
            const now = new Date();
            const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
            bookingTimeInput.value = timeStr;
        }
    }

    document.getElementById('bookTableModal').style.display = 'flex';
};

window.editTableBooking = (tableId) => {
    openActionPasswordModal(() => {
        openBookTableModal(tableId);
    });
};

window.closeBookTableModal = () => {
    document.getElementById('bookTableModal').style.display = 'none';
    document.getElementById('bookTableForm').reset();
    currentBookingTableId = null;
};

window.editTable = (id) => {
    openActionPasswordModal(() => {
        const tables = Storage.get('tables') || [];
        const table = tables.find(t => String(t.id) === String(id));
        if (!table) {
            alert('Table not found!');
            return;
        }

        editingTableId = String(id);
        document.getElementById('tableModalTitle').textContent = 'Edit Table';
        document.getElementById('tableNumber').value = table.number;
        document.getElementById('tableSeats').value = table.seats;
        document.getElementById('addTableModal').style.display = 'flex';
    });
};

window.deleteTable = (id, buttonElement) => {
    openActionPasswordModal(() => {
        // Re-find the button element after password verification
        let btnElement = buttonElement;
        if (!btnElement || !btnElement.parentElement || !document.contains(buttonElement)) {
            // Try to find the button in the DOM by looking for the table card
            const tableCards = document.querySelectorAll('.table-card, [data-table-id]');
            for (let card of tableCards) {
                if (card.getAttribute('data-table-id') === String(id)) {
                    const deleteBtn = card.querySelector('button[onclick*="deleteTable"]');
                    if (deleteBtn) {
                        btnElement = deleteBtn;
                        break;
                    }
                }
            }
        }

        if (btnElement) {
            showDeleteConfirmation(btnElement, deleteTableConfirmed, id);
        } else {
            // If button not found, directly delete (skip confirmation)
            deleteTableConfirmed(id);
        }
    });
};

function deleteTableConfirmed(id) {
    const tables = Storage.get('tables') || [];
    const filtered = tables.filter(t => String(t.id) !== String(id));
    Storage.set('tables', filtered);
    loadTables();
}

window.searchExpenses = () => {
    loadExpenses();
};

// Dashboard Management
function loadDashboard() {
    // Get all data
    const sales = Storage.get('sales') || [];
    const expenses = getCombinedExpenses();
    const employees = Storage.get('employees') || [];
    const menuItems = Storage.get('menuItems') || [];
    const holdOrders = Storage.get('holdOrders') || [];
    const tables = Storage.get('tables') || [];

    // Calculate today's date range
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    today.setHours(0, 0, 0, 0);
    const todayEnd = new Date(today);
    todayEnd.setHours(23, 59, 59, 999);

    // Calculate week date range
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    // Calculate month date range
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    // Today's Sales
    const todaySales = sales.filter(sale => {
        if (!sale.date) return false;
        const saleDate = new Date(sale.date);
        saleDate.setHours(0, 0, 0, 0);
        return saleDate.getTime() === today.getTime();
    }).reduce((sum, sale) => {
        // Use sale.total if available (includes tax), otherwise calculate with tax
        if (sale.total) {
            return sum + sale.total;
        } else if (sale.items && Array.isArray(sale.items)) {
            const subtotal = sale.items.reduce((s, item) => s + (item.price * item.quantity), 0);
            return sum + subtotal;
        } else {
            // For old sales without items array, use amount and add tax if needed
            const amount = sale.amount || sale.total || 0;
            // If it's an old sale, assume it might not have tax, so add it
            const subtotal = amount;
            return sum + subtotal;
        }
    }, 0);

    // Today's Expenses
    const todayExpenses = expenses.filter(exp => {
        if (!exp.date) return false;
        const expDate = new Date(exp.date);
        expDate.setHours(0, 0, 0, 0);
        return expDate.getTime() === today.getTime();
    }).reduce((sum, exp) => sum + (exp.amount || 0), 0);

    // Today's Profit
    const todayProfit = todaySales - todayExpenses;

    // This Week Sales
    const weekSales = sales.filter(sale => {
        if (!sale.date) return false;
        const saleDate = new Date(sale.date);
        saleDate.setHours(0, 0, 0, 0);
        return saleDate >= weekAgo && saleDate <= todayEnd;
    }).reduce((sum, sale) => {
        // Use sale.total if available (includes tax), otherwise calculate with tax
        if (sale.total) {
            return sum + sale.total;
        } else if (sale.items && Array.isArray(sale.items)) {
            const subtotal = sale.items.reduce((s, item) => s + (item.price * item.quantity), 0);
            return sum + subtotal;
        } else {
            // For old sales without items array, use amount and add tax if needed
            const amount = sale.amount || sale.total || 0;
            // If it's an old sale, assume it might not have tax, so add it
            const subtotal = amount;
            return sum + subtotal;
        }
    }, 0);

    // This Week Expenses
    const weekExpenses = expenses.filter(exp => {
        if (!exp.date) return false;
        const expDate = new Date(exp.date);
        expDate.setHours(0, 0, 0, 0);
        return expDate >= weekAgo && expDate <= todayEnd;
    }).reduce((sum, exp) => sum + (exp.amount || 0), 0);

    // This Month Sales
    const monthSales = sales.filter(sale => {
        if (!sale.date) return false;
        const saleDate = new Date(sale.date);
        saleDate.setHours(0, 0, 0, 0);
        return saleDate >= monthAgo && saleDate <= todayEnd;
    }).reduce((sum, sale) => {
        // Use sale.total if available (includes tax), otherwise calculate with tax
        if (sale.total) {
            return sum + sale.total;
        } else if (sale.items && Array.isArray(sale.items)) {
            const subtotal = sale.items.reduce((s, item) => s + (item.price * item.quantity), 0);
            return sum + subtotal;
        } else {
            // For old sales without items array, use amount and add tax if needed
            const amount = sale.amount || sale.total || 0;
            // If it's an old sale, assume it might not have tax, so add it
            const subtotal = amount;
            return sum + subtotal;
        }
    }, 0);

    // This Month Expenses
    const monthExpenses = expenses.filter(exp => {
        if (!exp.date) return false;
        const expDate = new Date(exp.date);
        expDate.setHours(0, 0, 0, 0);
        return expDate >= monthAgo && expDate <= todayEnd;
    }).reduce((sum, exp) => sum + (exp.amount || 0), 0);

    // Tables Status - count only available (unbooked) tables
    const availableTables = tables.filter(t => t.status !== 'booked').length;

    // Today's Discounts (total)
    const todayDiscounts = sales.filter(sale => {
        if (!sale.date) return false;
        const saleDate = new Date(sale.date);
        saleDate.setHours(0, 0, 0, 0);
        return saleDate.getTime() === today.getTime();
    }).reduce((sum, sale) => {
        const subtotalFallback = (typeof sale.subtotal === 'number')
            ? sale.subtotal
            : (sale.items && Array.isArray(sale.items) ? sale.items.reduce((s, it) => s + (it.price * it.quantity), 0) : (sale.total || 0));
        return sum + getDiscountAmountFromOrder(sale, subtotalFallback);
    }, 0);

    // Weekly Discounts (total)
    const weeklyDiscounts = sales.filter(sale => {
        if (!sale.date) return false;
        const saleDate = new Date(sale.date);
        saleDate.setHours(0, 0, 0, 0);
        return saleDate >= weekAgo && saleDate <= todayEnd;
    }).reduce((sum, sale) => {
        const subtotalFallback = (typeof sale.subtotal === 'number')
            ? sale.subtotal
            : (sale.items && Array.isArray(sale.items) ? sale.items.reduce((s, it) => s + (it.price * it.quantity), 0) : (sale.total || 0));
        return sum + getDiscountAmountFromOrder(sale, subtotalFallback);
    }, 0);

    // Calculate Today's and Weekly Order Counts
    const todayOrdersCount = sales.filter(sale => {
        if (!sale.date) return false;
        const saleDate = new Date(sale.date);
        saleDate.setHours(0, 0, 0, 0);
        return saleDate.getTime() === today.getTime();
    }).length;

    const weeklyOrdersCount = sales.filter(sale => {
        if (!sale.date) return false;
        const saleDate = new Date(sale.date);
        saleDate.setHours(0, 0, 0, 0);
        return saleDate >= weekAgo && saleDate <= todayEnd;
    }).length;

    // Update Dashboard Elements
    const todaySalesEl = document.getElementById('dashboardTodaySales');
    const todayExpensesEl = document.getElementById('dashboardTodayExpenses');
    const todayProfitEl = document.getElementById('dashboardTodayProfit');
    const holdOrdersEl = document.getElementById('dashboardHoldOrders');
    const todayDiscountsEl = document.getElementById('dashboardTodayDiscounts');
    const weeklyDiscountsEl = document.getElementById('dashboardWeeklyDiscounts');
    const todayOrdersCountEl = document.getElementById('dashboardTodayOrdersCount');
    const weeklyOrdersCountEl = document.getElementById('dashboardWeeklyOrdersCount');
    const weekSalesEl = document.getElementById('dashboardWeekSales');
    const weekExpensesEl = document.getElementById('dashboardWeekExpenses');
    const monthSalesEl = document.getElementById('dashboardMonthSales');
    const monthExpensesEl = document.getElementById('dashboardMonthExpenses');
    const recentSalesEl = document.getElementById('dashboardRecentSales');

    // Calculate Today's Stock Consumptions (Ingredient Cost)
    const todayISO = getLocalISODate();
    const consumptions = Storage.get('stockConsumptions') || [];
    const stockMap = {};
    syncAndGetStockItems().forEach(s => { stockMap[String(s.id)] = s; stockMap[(s.itemName || '').toLowerCase()] = s; });

    let todayIngredientsCost = 0;
    let todayIngredientsCount = 0;
    consumptions.forEach(c => {
        const cDate = c.date || (c.timestamp ? c.timestamp.split('T')[0] : '');
        if (cDate === todayISO) {
            (c.items || []).forEach(item => {
                const qty = parseFloat(item.finalDeductQty || item.enteredQty || item.deductedQty) || 0;
                const stock = stockMap[String(item.stockId)] || stockMap[(item.itemName || '').toLowerCase()];
                const price = stock ? (parseFloat(stock.unitPrice) || 0) : 0;
                todayIngredientsCost += (qty * price);
                if (qty > 0) todayIngredientsCount++;
            });
        }
    });

    // Cash vs Online Breakdown for Today
    let todayCashSales = 0;
    let todayOnlineSales = 0;
    const todaySalesList = sales.filter(sale => {
        if (!sale.date) return false;
        const saleDate = new Date(sale.date);
        saleDate.setHours(0, 0, 0, 0);
        return saleDate.getTime() === today.getTime();
    });

    todaySalesList.forEach(sale => {
        let tot = 0;
        if (sale.total) {
            tot = sale.total;
        } else if (sale.items && Array.isArray(sale.items)) {
            tot = sale.items.reduce((s, item) => s + (item.price * item.quantity), 0);
        } else {
            tot = sale.amount || 0;
        }
        const pm = (sale.paymentMethod || sale.payment || 'cash').toLowerCase();
        if (pm === 'online' || pm === 'card' || pm === 'digital' || pm === 'family') {
            todayOnlineSales += tot;
        } else {
            todayCashSales += tot;
        }
    });

    const todayNetActualProfit = todaySales - todayIngredientsCost - todayExpenses;
    const profitMargin = todaySales > 0 ? ((todayNetActualProfit / todaySales) * 100).toFixed(1) : 0;

    // Update EOD Card Elements
    const eodDateEl = document.getElementById('dashboardClosingDateText');
    const eodGrossSalesEl = document.getElementById('eodGrossSales');
    const eodCashSalesEl = document.getElementById('eodCashSales');
    const eodOnlineSalesEl = document.getElementById('eodOnlineSales');
    const eodIngredientsCostEl = document.getElementById('eodIngredientsCost');
    const eodIngredientsItemsCountEl = document.getElementById('eodIngredientsItemsCount');
    const eodExpensesEl = document.getElementById('eodExpenses');
    const eodNetProfitEl = document.getElementById('eodNetProfit');
    const eodProfitMarginBadgeEl = document.getElementById('eodProfitMarginBadge');

    if (eodDateEl) {
        const formattedToday = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
        eodDateEl.textContent = `Daily Closing for ${formattedToday}`;
    }
    if (eodGrossSalesEl) eodGrossSalesEl.textContent = `Rs. ${formatNumber(todaySales)}`;
    if (eodCashSalesEl) eodCashSalesEl.textContent = `Rs. ${formatNumber(todayCashSales)}`;
    if (eodOnlineSalesEl) eodOnlineSalesEl.textContent = `Rs. ${formatNumber(todayOnlineSales)}`;
    if (eodIngredientsCostEl) eodIngredientsCostEl.textContent = `Rs. ${formatNumber(todayIngredientsCost)}`;
    if (eodIngredientsItemsCountEl) eodIngredientsItemsCountEl.textContent = `${todayIngredientsCount} ingredient(s) deducted today`;
    if (eodExpensesEl) eodExpensesEl.textContent = `Rs. ${formatNumber(todayExpenses)}`;
    if (eodNetProfitEl) {
        eodNetProfitEl.textContent = `Rs. ${formatNumber(todayNetActualProfit)}`;
        eodNetProfitEl.style.color = todayNetActualProfit >= 0 ? '#34d399' : '#f87171';
    }
    if (eodProfitMarginBadgeEl) {
        eodProfitMarginBadgeEl.textContent = `${profitMargin}% Margin`;
        eodProfitMarginBadgeEl.style.background = todayNetActualProfit >= 0 ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)';
        eodProfitMarginBadgeEl.style.color = todayNetActualProfit >= 0 ? '#a7f3d0' : '#fca5a5';
    }

    if (todaySalesEl) todaySalesEl.textContent = `Rs. ${formatNumber(todaySales)}`;
    if (todayExpensesEl) todayExpensesEl.textContent = `Rs. ${formatNumber(todayExpenses)}`;
    if (todayProfitEl) {
        todayProfitEl.textContent = `Rs. ${formatNumber(todayProfit)}`;
        todayProfitEl.style.color = todayProfit >= 0 ? '#27ae60' : '#e74c3c';
    }
    if (holdOrdersEl) holdOrdersEl.textContent = formatNumber(holdOrders.length);
    if (todayDiscountsEl) todayDiscountsEl.textContent = `Rs. ${formatNumber(todayDiscounts)}`;
    if (weeklyDiscountsEl) weeklyDiscountsEl.textContent = `Rs. ${formatNumber(weeklyDiscounts)}`;
    if (todayOrdersCountEl) todayOrdersCountEl.textContent = formatNumber(todayOrdersCount);
    if (weeklyOrdersCountEl) weeklyOrdersCountEl.textContent = formatNumber(weeklyOrdersCount);
    if (weekSalesEl) weekSalesEl.textContent = `Rs. ${formatNumber(weekSales)}`;
    if (weekExpensesEl) weekExpensesEl.textContent = `Rs. ${formatNumber(weekExpenses)}`;
    if (monthSalesEl) monthSalesEl.textContent = `Rs. ${formatNumber(monthSales)}`;
    if (monthExpensesEl) monthExpensesEl.textContent = `Rs. ${formatNumber(monthExpenses)}`;

    // Load Recent Sales
    if (recentSalesEl) {
        const recentSales = sales
            .sort((a, b) => new Date(b.date || b.timestamp) - new Date(a.date || a.timestamp))
            .slice(0, 5);

        if (recentSales.length === 0) {
            recentSalesEl.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No recent sales</p>';
        } else {
            recentSalesEl.innerHTML = recentSales.map(sale => {
                const saleDate = sale.date ? new Date(sale.date) : (sale.timestamp ? new Date(sale.timestamp) : new Date());
                const dateStr = formatDate(saleDate);
                const timeStr = formatTime(saleDate);
                // Use sale.total if available (includes tax), otherwise calculate with tax
                let total;
                if (sale.total) {
                    total = sale.total;
                } else if (sale.items && Array.isArray(sale.items)) {
                    const subtotal = sale.items.reduce((s, item) => s + (item.price * item.quantity), 0);
                    total = subtotal;
                } else {
                    const amount = sale.amount || 0;
                    const subtotal = amount;
                    total = subtotal;
                }
                const paymentMethod = formatPaymentMethod(sale.paymentMethod || sale.payment || 'N/A');

                return `
                    <div style="padding: 15px; border-bottom: 1px solid #e0e0e0; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="font-weight: 600; color: #333; margin-bottom: 5px;">${dateStr} ${timeStr}</div>
                            <div style="font-size: 12px; color: #666;">Payment: ${paymentMethod}</div>
                        </div>
                        <div style="font-weight: 700; color: #1e3a5f; font-size: 18px;">Rs. ${formatNumber(total)}</div>
                    </div>
                `;
            }).join('');
        }
    }

    // Update charts
    updateCharts();

    // Initialize sales chart view buttons
    if (typeof changeSalesChartView === 'function') {
        changeSalesChartView(currentSalesChartView);
    }

    // Initialize profit chart view buttons
    if (typeof changeProfitChartView === 'function') {
        changeProfitChartView(currentProfitChartView);
    }

    // Initialize customer chart view buttons
    if (typeof changeCustomerChartView === 'function') {
        changeCustomerChartView(currentCustomerChartView);
    }

    // Update customer count comparison
    updateCustomerCountComparison();
}

// Chart Management
let salesChart = null;
let profitChart = null;
let customerChart = null;
let currentSalesChartView = 'daily';
let currentProfitChartView = 'daily';
let currentCustomerChartView = 'daily';

// Initialize charts
function initCharts() {
    const salesCtx = document.getElementById('salesChart');
    const profitCtx = document.getElementById('profitChart');
    const customerCtx = document.getElementById('customerChart');

    if (!salesCtx || !profitCtx || !customerCtx) return;

    // Destroy existing charts if they exist
    if (salesChart) salesChart.destroy();
    if (profitChart) profitChart.destroy();
    if (customerChart) customerChart.destroy();

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return 'Rs. ' + formatNumber(context.parsed.y);
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return 'Rs. ' + formatNumber(value);
                    }
                },
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        elements: {
            bar: {
                borderRadius: 0
            }
        }
    };

    salesChart = new Chart(salesCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Sales',
                data: [],
                backgroundColor: '#4a90e2',
                borderColor: '#4a90e2',
                borderWidth: 0
            }]
        },
        options: chartOptions
    });

    profitChart = new Chart(profitCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Profit',
                data: [],
                backgroundColor: '#27ae60',
                borderColor: '#27ae60',
                borderWidth: 0
            }]
        },
        options: chartOptions
    });

    // Customer count chart (bar)
    customerChart = new Chart(customerCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Customers',
                data: [],
                backgroundColor: '#ff9800',
                borderColor: '#ff9800',
                borderWidth: 0,
                borderRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.parsed.y + ' customers';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        callback: function (value) {
                            return value;
                        }
                    },
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            elements: {
                bar: {
                    borderRadius: 0
                }
            }
        }
    });
}

// Update charts based on current view
function updateCharts() {
    if (!salesChart || !profitChart || !customerChart) {
        initCharts();
    }

    // Update charts separately
    updateSalesChart();
    updateProfitChart();
    updateCustomerChart();
}

// Update sales chart based on current sales chart view
function updateSalesChart() {
    if (!salesChart) {
        if (!salesChart || !profitChart || !customerChart) {
            initCharts();
        }
    }

    const sales = Storage.get('sales') || [];
    let labels = [];
    let salesData = [];

    if (currentSalesChartView === 'daily') {
        labels = Array.from({ length: 24 }, (_, i) => {
            if (i === 0) return '12am';
            if (i === 12) return '12pm';
            if (i < 12) return `${i}am`;
            return `${i - 12}pm`;
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayEnd = new Date(today);
        todayEnd.setHours(23, 59, 59, 999);

        salesData = new Array(24).fill(0);

        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            if (saleDate >= today && saleDate <= todayEnd) {
                const hour = saleDate.getHours();
                let total = 0;
                if (sale.total) {
                    total = sale.total;
                } else if (sale.items && Array.isArray(sale.items)) {
                    total = sale.items.reduce((s, item) => s + (item.price * item.quantity), 0);
                } else {
                    total = sale.amount || sale.total || 0;
                }
                salesData[hour] += total;
            }
        });

    } else if (currentSalesChartView === 'weekly') {
        const now = new Date();
        const currentDay = now.getDay();
        const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1;

        const monday = new Date(now);
        monday.setDate(now.getDate() - daysFromMonday);
        monday.setHours(0, 0, 0, 0);

        const days = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            date.setHours(0, 0, 0, 0);
            days.push(date);
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            labels.push(dayNames[date.getDay()] + ' ' + date.getDate());
        }

        salesData = new Array(7).fill(0);

        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            saleDate.setHours(0, 0, 0, 0);
            const dayIndex = days.findIndex(d => d.getTime() === saleDate.getTime());
            if (dayIndex !== -1) {
                let total = 0;
                if (sale.total) {
                    total = sale.total;
                } else if (sale.items && Array.isArray(sale.items)) {
                    total = sale.items.reduce((s, item) => s + (item.price * item.quantity), 0);
                } else {
                    total = sale.amount || sale.total || 0;
                }
                salesData[dayIndex] += total;
            }
        });

    } else if (currentSalesChartView === 'monthly') {
        const now = new Date();
        const weeks = [];
        for (let i = 3; i >= 0; i--) {
            const weekStart = new Date(now);
            weekStart.setDate(weekStart.getDate() - (i * 7));
            weekStart.setHours(0, 0, 0, 0);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            weekEnd.setHours(23, 59, 59, 999);
            weeks.push({ start: weekStart, end: weekEnd });
            labels.push(`Week ${4 - i}`);
        }

        salesData = new Array(4).fill(0);

        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            const weekIndex = weeks.findIndex(w => saleDate >= w.start && saleDate <= w.end);
            if (weekIndex !== -1) {
                let total = 0;
                if (sale.total) {
                    total = sale.total;
                } else if (sale.items && Array.isArray(sale.items)) {
                    total = sale.items.reduce((s, item) => s + (item.price * item.quantity), 0);
                } else {
                    total = sale.amount || sale.total || 0;
                }
                salesData[weekIndex] += total;
            }
        });

    } else if (currentSalesChartView === 'annual') {
        const now = new Date();
        const months = [];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for (let i = 11; i >= 0; i--) {
            const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const start = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1, 0, 0, 0, 0);
            const end = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0, 23, 59, 59, 999);
            months.push({ start, end });
            labels.push(`${monthNames[start.getMonth()]} '${String(start.getFullYear()).slice(-2)}`);
        }

        salesData = new Array(12).fill(0);

        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            const monthIndex = months.findIndex(m => saleDate >= m.start && saleDate <= m.end);
            if (monthIndex !== -1) {
                let total = 0;
                if (sale.total) {
                    total = sale.total;
                } else if (sale.items && Array.isArray(sale.items)) {
                    total = sale.items.reduce((s, item) => s + (item.price * item.quantity), 0);
                } else {
                    total = sale.amount || sale.total || 0;
                }
                salesData[monthIndex] += total;
            }
        });

    } else if (currentSalesChartView === 'yearly') {
        // Yearly view: Group by years
        const now = new Date();
        const currentYear = now.getFullYear();

        // Get all unique years from sales data
        const yearsSet = new Set();
        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            yearsSet.add(saleDate.getFullYear());
        });

        // Create array of years (at least last 5 years, or all years if more)
        const years = Array.from(yearsSet).sort((a, b) => a - b);
        const minYear = Math.min(...years, currentYear - 4);
        const maxYear = Math.max(...years, currentYear);

        for (let year = minYear; year <= maxYear; year++) {
            labels.push(String(year));
        }

        salesData = new Array(labels.length).fill(0);

        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            const year = saleDate.getFullYear();
            const yearIndex = labels.indexOf(String(year));
            if (yearIndex !== -1) {
                let total = 0;
                if (sale.total) {
                    total = sale.total;
                } else if (sale.items && Array.isArray(sale.items)) {
                    total = sale.items.reduce((s, item) => s + (item.price * item.quantity), 0);
                } else {
                    total = sale.amount || sale.total || 0;
                }
                salesData[yearIndex] += total;
            }
        });
    }

    salesChart.data.labels = labels;
    salesChart.data.datasets[0].data = salesData;
    salesChart.update();
}

// Update profit chart based on current profit chart view
function updateProfitChart() {
    if (!profitChart) {
        if (!salesChart || !profitChart || !customerChart) {
            initCharts();
        }
    }

    const sales = Storage.get('sales') || [];
    const expenses = Storage.get('expenses') || [];
    let labels = [];
    let salesData = [];
    let profitData = [];

    if (currentProfitChartView === 'daily') {
        labels = Array.from({ length: 24 }, (_, i) => {
            if (i === 0) return '12am';
            if (i === 12) return '12pm';
            if (i < 12) return `${i}am`;
            return `${i - 12}pm`;
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayEnd = new Date(today);
        todayEnd.setHours(23, 59, 59, 999);

        salesData = new Array(24).fill(0);
        const expensesByHour = new Array(24).fill(0);

        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            if (saleDate >= today && saleDate <= todayEnd) {
                const hour = saleDate.getHours();
                let total = 0;
                if (sale.total) {
                    total = sale.total;
                } else if (sale.items && Array.isArray(sale.items)) {
                    total = sale.items.reduce((s, item) => s + (item.price * item.quantity), 0);
                } else {
                    total = sale.amount || sale.total || 0;
                }
                salesData[hour] += total;
            }
        });

        expenses.forEach(exp => {
            if (!exp.date) return;
            const expDate = new Date(exp.date);
            if (expDate >= today && expDate <= todayEnd) {
                const hour = expDate.getHours();
                expensesByHour[hour] += (exp.amount || 0);
            }
        });

        profitData = salesData.map((sales, hour) => sales - expensesByHour[hour]);

    } else if (currentProfitChartView === 'weekly') {
        const now = new Date();
        const currentDay = now.getDay();
        const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1;

        const monday = new Date(now);
        monday.setDate(now.getDate() - daysFromMonday);
        monday.setHours(0, 0, 0, 0);

        const days = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            date.setHours(0, 0, 0, 0);
            days.push(date);
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            labels.push(dayNames[date.getDay()] + ' ' + date.getDate());
        }

        salesData = new Array(7).fill(0);
        const expensesByDay = new Array(7).fill(0);

        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            saleDate.setHours(0, 0, 0, 0);
            const dayIndex = days.findIndex(d => d.getTime() === saleDate.getTime());
            if (dayIndex !== -1) {
                let total = 0;
                if (sale.total) {
                    total = sale.total;
                } else if (sale.items && Array.isArray(sale.items)) {
                    total = sale.items.reduce((s, item) => s + (item.price * item.quantity), 0);
                } else {
                    total = sale.amount || sale.total || 0;
                }
                salesData[dayIndex] += total;
            }
        });

        expenses.forEach(exp => {
            if (!exp.date) return;
            const expDate = new Date(exp.date);
            expDate.setHours(0, 0, 0, 0);
            const dayIndex = days.findIndex(d => d.getTime() === expDate.getTime());
            if (dayIndex !== -1) {
                expensesByDay[dayIndex] += (exp.amount || 0);
            }
        });

        profitData = salesData.map((sales, day) => sales - expensesByDay[day]);

    } else if (currentProfitChartView === 'monthly') {
        const now = new Date();
        const weeks = [];
        for (let i = 3; i >= 0; i--) {
            const weekStart = new Date(now);
            weekStart.setDate(weekStart.getDate() - (i * 7));
            weekStart.setHours(0, 0, 0, 0);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            weekEnd.setHours(23, 59, 59, 999);
            weeks.push({ start: weekStart, end: weekEnd });
            labels.push(`Week ${4 - i}`);
        }

        salesData = new Array(4).fill(0);
        const expensesByWeek = new Array(4).fill(0);

        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            const weekIndex = weeks.findIndex(w => saleDate >= w.start && saleDate <= w.end);
            if (weekIndex !== -1) {
                let total = 0;
                if (sale.total) {
                    total = sale.total;
                } else if (sale.items && Array.isArray(sale.items)) {
                    total = sale.items.reduce((s, item) => s + (item.price * item.quantity), 0);
                } else {
                    total = sale.amount || sale.total || 0;
                }
                salesData[weekIndex] += total;
            }
        });

        expenses.forEach(exp => {
            if (!exp.date) return;
            const expDate = new Date(exp.date);
            const weekIndex = weeks.findIndex(w => expDate >= w.start && expDate <= w.end);
            if (weekIndex !== -1) {
                expensesByWeek[weekIndex] += (exp.amount || 0);
            }
        });

        profitData = salesData.map((sales, week) => sales - expensesByWeek[week]);

    } else if (currentProfitChartView === 'annual') {
        const now = new Date();
        const months = [];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for (let i = 11; i >= 0; i--) {
            const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const start = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1, 0, 0, 0, 0);
            const end = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0, 23, 59, 59, 999);
            months.push({ start, end });
            labels.push(`${monthNames[start.getMonth()]} '${String(start.getFullYear()).slice(-2)}`);
        }

        salesData = new Array(12).fill(0);
        const expensesByMonth = new Array(12).fill(0);

        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            const monthIndex = months.findIndex(m => saleDate >= m.start && saleDate <= m.end);
            if (monthIndex !== -1) {
                let total = 0;
                if (sale.total) {
                    total = sale.total;
                } else if (sale.items && Array.isArray(sale.items)) {
                    total = sale.items.reduce((s, item) => s + (item.price * item.quantity), 0);
                } else {
                    total = sale.amount || sale.total || 0;
                }
                salesData[monthIndex] += total;
            }
        });

        expenses.forEach(exp => {
            if (!exp.date) return;
            const expDate = new Date(exp.date);
            const monthIndex = months.findIndex(m => expDate >= m.start && expDate <= m.end);
            if (monthIndex !== -1) {
                expensesByMonth[monthIndex] += (exp.amount || 0);
            }
        });

        profitData = salesData.map((sales, idx) => sales - expensesByMonth[idx]);

    } else if (currentProfitChartView === 'yearly') {
        // Yearly view: Group by years
        const now = new Date();
        const currentYear = now.getFullYear();

        // Get all unique years from sales and expenses data
        const yearsSet = new Set();
        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            yearsSet.add(saleDate.getFullYear());
        });
        expenses.forEach(exp => {
            if (!exp.date) return;
            const expDate = new Date(exp.date);
            yearsSet.add(expDate.getFullYear());
        });

        // Create array of years (at least last 5 years, or all years if more)
        const years = Array.from(yearsSet).sort((a, b) => a - b);
        const minYear = Math.min(...years, currentYear - 4);
        const maxYear = Math.max(...years, currentYear);

        for (let year = minYear; year <= maxYear; year++) {
            labels.push(String(year));
        }

        salesData = new Array(labels.length).fill(0);
        const expensesByYear = new Array(labels.length).fill(0);

        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            const year = saleDate.getFullYear();
            const yearIndex = labels.indexOf(String(year));
            if (yearIndex !== -1) {
                let total = 0;
                if (sale.total) {
                    total = sale.total;
                } else if (sale.items && Array.isArray(sale.items)) {
                    total = sale.items.reduce((s, item) => s + (item.price * item.quantity), 0);
                } else {
                    total = sale.amount || sale.total || 0;
                }
                salesData[yearIndex] += total;
            }
        });

        expenses.forEach(exp => {
            if (!exp.date) return;
            const expDate = new Date(exp.date);
            const year = expDate.getFullYear();
            const yearIndex = labels.indexOf(String(year));
            if (yearIndex !== -1) {
                expensesByYear[yearIndex] += (exp.amount || 0);
            }
        });

        profitData = salesData.map((sales, idx) => sales - expensesByYear[idx]);
    }

    profitChart.data.labels = labels;
    profitChart.data.datasets[0].data = profitData;
    profitChart.update();
}

// Change sales chart view
window.changeSalesChartView = (view) => {
    currentSalesChartView = view;

    const dailyBtn = document.getElementById('salesChartViewDaily');
    const weeklyBtn = document.getElementById('salesChartViewWeekly');
    const monthlyBtn = document.getElementById('salesChartViewMonthly');
    const annualBtn = document.getElementById('salesChartViewAnnual');
    const yearlyBtn = document.getElementById('salesChartViewYearly');

    if (dailyBtn) {
        if (view === 'daily') {
            dailyBtn.style.background = '#4a90e2';
            dailyBtn.style.color = '#ffffff';
            dailyBtn.style.fontWeight = '600';
        } else {
            dailyBtn.style.background = 'rgba(74, 144, 226, 0.1)';
            dailyBtn.style.color = '#4a90e2';
            dailyBtn.style.fontWeight = '500';
        }
    }

    if (weeklyBtn) {
        if (view === 'weekly') {
            weeklyBtn.style.background = '#4a90e2';
            weeklyBtn.style.color = '#ffffff';
            weeklyBtn.style.fontWeight = '600';
        } else {
            weeklyBtn.style.background = 'rgba(74, 144, 226, 0.1)';
            weeklyBtn.style.color = '#4a90e2';
            weeklyBtn.style.fontWeight = '500';
        }
    }

    if (monthlyBtn) {
        if (view === 'monthly') {
            monthlyBtn.style.background = '#4a90e2';
            monthlyBtn.style.color = '#ffffff';
            monthlyBtn.style.fontWeight = '600';
        } else {
            monthlyBtn.style.background = 'rgba(74, 144, 226, 0.1)';
            monthlyBtn.style.color = '#4a90e2';
            monthlyBtn.style.fontWeight = '500';
        }
    }

    if (annualBtn) {
        if (view === 'annual') {
            annualBtn.style.background = '#4a90e2';
            annualBtn.style.color = '#ffffff';
            annualBtn.style.fontWeight = '600';
        } else {
            annualBtn.style.background = 'rgba(74, 144, 226, 0.1)';
            annualBtn.style.color = '#4a90e2';
            annualBtn.style.fontWeight = '500';
        }
    }

    if (yearlyBtn) {
        if (view === 'yearly') {
            yearlyBtn.style.background = '#4a90e2';
            yearlyBtn.style.color = '#ffffff';
            yearlyBtn.style.fontWeight = '600';
        } else {
            yearlyBtn.style.background = 'rgba(74, 144, 226, 0.1)';
            yearlyBtn.style.color = '#4a90e2';
            yearlyBtn.style.fontWeight = '500';
        }
    }

    updateSalesChart();
}

// Change profit chart view
window.changeProfitChartView = (view) => {
    currentProfitChartView = view;

    const dailyBtn = document.getElementById('profitChartViewDaily');
    const weeklyBtn = document.getElementById('profitChartViewWeekly');
    const monthlyBtn = document.getElementById('profitChartViewMonthly');
    const annualBtn = document.getElementById('profitChartViewAnnual');
    const yearlyBtn = document.getElementById('profitChartViewYearly');

    if (dailyBtn) {
        if (view === 'daily') {
            dailyBtn.style.background = '#4a90e2';
            dailyBtn.style.color = '#ffffff';
            dailyBtn.style.fontWeight = '600';
        } else {
            dailyBtn.style.background = 'rgba(74, 144, 226, 0.1)';
            dailyBtn.style.color = '#4a90e2';
            dailyBtn.style.fontWeight = '500';
        }
    }

    if (weeklyBtn) {
        if (view === 'weekly') {
            weeklyBtn.style.background = '#4a90e2';
            weeklyBtn.style.color = '#ffffff';
            weeklyBtn.style.fontWeight = '600';
        } else {
            weeklyBtn.style.background = 'rgba(74, 144, 226, 0.1)';
            weeklyBtn.style.color = '#4a90e2';
            weeklyBtn.style.fontWeight = '500';
        }
    }

    if (monthlyBtn) {
        if (view === 'monthly') {
            monthlyBtn.style.background = '#4a90e2';
            monthlyBtn.style.color = '#ffffff';
            monthlyBtn.style.fontWeight = '600';
        } else {
            monthlyBtn.style.background = 'rgba(74, 144, 226, 0.1)';
            monthlyBtn.style.color = '#4a90e2';
            monthlyBtn.style.fontWeight = '500';
        }
    }

    if (annualBtn) {
        if (view === 'annual') {
            annualBtn.style.background = '#4a90e2';
            annualBtn.style.color = '#ffffff';
            annualBtn.style.fontWeight = '600';
        } else {
            annualBtn.style.background = 'rgba(74, 144, 226, 0.1)';
            annualBtn.style.color = '#4a90e2';
            annualBtn.style.fontWeight = '500';
        }
    }

    if (yearlyBtn) {
        if (view === 'yearly') {
            yearlyBtn.style.background = '#4a90e2';
            yearlyBtn.style.color = '#ffffff';
            yearlyBtn.style.fontWeight = '600';
        } else {
            yearlyBtn.style.background = 'rgba(74, 144, 226, 0.1)';
            yearlyBtn.style.color = '#4a90e2';
            yearlyBtn.style.fontWeight = '500';
        }
    }

    updateProfitChart();
}

// Update customer chart based on current customer chart view
function updateCustomerChart() {
    if (!customerChart) {
        if (!salesChart || !profitChart || !customerChart) {
            initCharts();
        }
    }

    const sales = Storage.get('sales') || [];

    let labels = [];
    let customerData = [];

    if (currentCustomerChartView === 'daily') {
        // Daily view: Group by hours (0-23)
        labels = Array.from({ length: 24 }, (_, i) => {
            if (i === 0) return '12am';
            if (i === 12) return '12pm';
            if (i < 12) return `${i}am`;
            return `${i - 12}pm`;
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayEnd = new Date(today);
        todayEnd.setHours(23, 59, 59, 999);

        customerData = new Array(24).fill(0);

        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            if (saleDate >= today && saleDate <= todayEnd) {
                const hour = saleDate.getHours();
                customerData[hour] += 1;
            }
        });

    } else if (currentCustomerChartView === 'weekly') {
        // Weekly view: Group by days (current week starting from Monday)
        const now = new Date();
        const currentDay = now.getDay();
        const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1;

        const monday = new Date(now);
        monday.setDate(now.getDate() - daysFromMonday);
        monday.setHours(0, 0, 0, 0);

        const days = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            date.setHours(0, 0, 0, 0);
            days.push(date);
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            labels.push(dayNames[date.getDay()] + ' ' + date.getDate());
        }

        customerData = new Array(7).fill(0);

        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            saleDate.setHours(0, 0, 0, 0);
            const dayIndex = days.findIndex(d => d.getTime() === saleDate.getTime());
            if (dayIndex !== -1) {
                customerData[dayIndex] += 1;
            }
        });

    } else if (currentCustomerChartView === 'monthly') {
        // Monthly view: Group by weeks (last 4 weeks)
        const now = new Date();
        const weeks = [];
        for (let i = 3; i >= 0; i--) {
            const weekStart = new Date(now);
            weekStart.setDate(weekStart.getDate() - (i * 7));
            weekStart.setHours(0, 0, 0, 0);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            weekEnd.setHours(23, 59, 59, 999);
            weeks.push({ start: weekStart, end: weekEnd });
            labels.push(`Week ${4 - i}`);
        }

        customerData = new Array(4).fill(0);

        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            const weekIndex = weeks.findIndex(w => saleDate >= w.start && saleDate <= w.end);
            if (weekIndex !== -1) {
                customerData[weekIndex] += 1;
            }
        });

    } else if (currentCustomerChartView === 'annual') {
        // Annual view: Group by months (last 12 months)
        const now = new Date();
        const months = [];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for (let i = 11; i >= 0; i--) {
            const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const start = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1, 0, 0, 0, 0);
            const end = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0, 23, 59, 59, 999);
            months.push({ start, end });
            labels.push(`${monthNames[start.getMonth()]} '${String(start.getFullYear()).slice(-2)}`);
        }

        customerData = new Array(12).fill(0);

        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            const monthIndex = months.findIndex(m => saleDate >= m.start && saleDate <= m.end);
            if (monthIndex !== -1) {
                customerData[monthIndex] += 1;
            }
        });

    } else if (currentCustomerChartView === 'yearly') {
        // Yearly view: Group by years
        const now = new Date();
        const currentYear = now.getFullYear();

        // Get all unique years from sales data
        const yearsSet = new Set();
        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            yearsSet.add(saleDate.getFullYear());
        });

        // Create array of years (at least last 5 years, or all years if more)
        const years = Array.from(yearsSet).sort((a, b) => a - b);
        const minYear = Math.min(...years, currentYear - 4);
        const maxYear = Math.max(...years, currentYear);

        for (let year = minYear; year <= maxYear; year++) {
            labels.push(String(year));
        }

        customerData = new Array(labels.length).fill(0);

        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            const year = saleDate.getFullYear();
            const yearIndex = labels.indexOf(String(year));
            if (yearIndex !== -1) {
                customerData[yearIndex] += 1;
            }
        });
    }

    customerChart.data.labels = labels;
    customerChart.data.datasets[0].data = customerData;
    customerChart.update();

    // Calculate and display percentage comparison
    updateCustomerCountComparison();
}

// Calculate and display customer count percentage comparison
function updateCustomerCountComparison() {
    const sales = Storage.get('sales') || [];
    const comparisonEl = document.getElementById('customerCountComparison');
    if (!comparisonEl) return;

    let currentCount = 0;
    let previousCount = 0;
    let comparisonText = '';

    if (currentCustomerChartView === 'daily') {
        // Today vs Yesterday
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayEnd = new Date(today);
        todayEnd.setHours(23, 59, 59, 999);

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayEnd = new Date(yesterday);
        yesterdayEnd.setHours(23, 59, 59, 999);

        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            if (saleDate >= today && saleDate <= todayEnd) {
                currentCount += 1;
            } else if (saleDate >= yesterday && saleDate <= yesterdayEnd) {
                previousCount += 1;
            }
        });

        comparisonText = 'yesterday';

    } else if (currentCustomerChartView === 'weekly') {
        // Current week vs Previous week
        const now = new Date();
        const currentDay = now.getDay();
        const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1;

        const currentWeekMonday = new Date(now);
        currentWeekMonday.setDate(now.getDate() - daysFromMonday);
        currentWeekMonday.setHours(0, 0, 0, 0);
        const currentWeekSunday = new Date(currentWeekMonday);
        currentWeekSunday.setDate(currentWeekMonday.getDate() + 6);
        currentWeekSunday.setHours(23, 59, 59, 999);

        const previousWeekMonday = new Date(currentWeekMonday);
        previousWeekMonday.setDate(currentWeekMonday.getDate() - 7);
        const previousWeekSunday = new Date(previousWeekMonday);
        previousWeekSunday.setDate(previousWeekMonday.getDate() + 6);
        previousWeekSunday.setHours(23, 59, 59, 999);

        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            if (saleDate >= currentWeekMonday && saleDate <= currentWeekSunday) {
                currentCount += 1;
            } else if (saleDate >= previousWeekMonday && saleDate <= previousWeekSunday) {
                previousCount += 1;
            }
        });

        comparisonText = 'previous week';

    } else if (currentCustomerChartView === 'monthly') {
        // Current month vs Previous month
        const now = new Date();
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        currentMonthStart.setHours(0, 0, 0, 0);
        const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        currentMonthEnd.setHours(23, 59, 59, 999);

        const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        previousMonthStart.setHours(0, 0, 0, 0);
        const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        previousMonthEnd.setHours(23, 59, 59, 999);

        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            if (saleDate >= currentMonthStart && saleDate <= currentMonthEnd) {
                currentCount += 1;
            } else if (saleDate >= previousMonthStart && saleDate <= previousMonthEnd) {
                previousCount += 1;
            }
        });

        comparisonText = 'previous month';

    } else if (currentCustomerChartView === 'yearly') {
        // Current year vs Previous year
        const now = new Date();
        const currentYearStart = new Date(now.getFullYear(), 0, 1);
        currentYearStart.setHours(0, 0, 0, 0);
        const currentYearEnd = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

        const previousYearStart = new Date(now.getFullYear() - 1, 0, 1);
        previousYearStart.setHours(0, 0, 0, 0);
        const previousYearEnd = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);

        sales.forEach(sale => {
            if (!sale.date) return;
            const saleDate = new Date(sale.date);
            if (saleDate >= currentYearStart && saleDate <= currentYearEnd) {
                currentCount += 1;
            } else if (saleDate >= previousYearStart && saleDate <= previousYearEnd) {
                previousCount += 1;
            }
        });

        comparisonText = 'previous year';
    }

    // Calculate percentage change
    let percentage = 0;
    let displayText = '';

    if (previousCount === 0) {
        if (currentCount > 0) {
            displayText = `100% more than ${comparisonText}`;
        } else {
            displayText = `No change from ${comparisonText}`;
        }
    } else {
        percentage = ((currentCount - previousCount) / previousCount) * 100;
        if (percentage > 0) {
            displayText = `${formatNumber(Math.abs(percentage).toFixed(1))}% more than ${comparisonText}`;
        } else if (percentage < 0) {
            displayText = `${formatNumber(Math.abs(percentage).toFixed(1))}% less than ${comparisonText}`;
        } else {
            displayText = `No change from ${comparisonText}`;
        }
    }

    comparisonEl.textContent = displayText;
}

// Change customer chart view
window.changeCustomerChartView = (view) => {
    currentCustomerChartView = view;

    // Update button styles
    const dailyBtn = document.getElementById('customerChartViewDaily');
    const weeklyBtn = document.getElementById('customerChartViewWeekly');
    const monthlyBtn = document.getElementById('customerChartViewMonthly');
    const annualBtn = document.getElementById('customerChartViewAnnual');
    const yearlyBtn = document.getElementById('customerChartViewYearly');

    if (dailyBtn) {
        if (view === 'daily') {
            dailyBtn.style.background = '#4a90e2';
            dailyBtn.style.color = '#ffffff';
            dailyBtn.style.fontWeight = '600';
        } else {
            dailyBtn.style.background = 'rgba(74, 144, 226, 0.1)';
            dailyBtn.style.color = '#4a90e2';
            dailyBtn.style.fontWeight = '500';
        }
    }

    if (weeklyBtn) {
        if (view === 'weekly') {
            weeklyBtn.style.background = '#4a90e2';
            weeklyBtn.style.color = '#ffffff';
            weeklyBtn.style.fontWeight = '600';
        } else {
            weeklyBtn.style.background = 'rgba(74, 144, 226, 0.1)';
            weeklyBtn.style.color = '#4a90e2';
            weeklyBtn.style.fontWeight = '500';
        }
    }

    if (monthlyBtn) {
        if (view === 'monthly') {
            monthlyBtn.style.background = '#4a90e2';
            monthlyBtn.style.color = '#ffffff';
            monthlyBtn.style.fontWeight = '600';
        } else {
            monthlyBtn.style.background = 'rgba(74, 144, 226, 0.1)';
            monthlyBtn.style.color = '#4a90e2';
            monthlyBtn.style.fontWeight = '500';
        }
    }

    if (annualBtn) {
        if (view === 'annual') {
            annualBtn.style.background = '#4a90e2';
            annualBtn.style.color = '#ffffff';
            annualBtn.style.fontWeight = '600';
        } else {
            annualBtn.style.background = 'rgba(74, 144, 226, 0.1)';
            annualBtn.style.color = '#4a90e2';
            annualBtn.style.fontWeight = '500';
        }
    }

    if (yearlyBtn) {
        if (view === 'yearly') {
            yearlyBtn.style.background = '#4a90e2';
            yearlyBtn.style.color = '#ffffff';
            yearlyBtn.style.fontWeight = '600';
        } else {
            yearlyBtn.style.background = 'rgba(74, 144, 226, 0.1)';
            yearlyBtn.style.color = '#4a90e2';
            yearlyBtn.style.fontWeight = '500';
        }
    }

    updateCustomerChart();
    updateCustomerCountComparison();
}

// Change chart view
window.changeChartView = (view) => {
    currentChartView = view;

    // Update button styles
    const dailyBtn = document.getElementById('chartViewDaily');
    const weeklyBtn = document.getElementById('chartViewWeekly');
    const monthlyBtn = document.getElementById('chartViewMonthly');

    if (dailyBtn) {
        if (view === 'daily') {
            dailyBtn.style.background = '#4a90e2';
            dailyBtn.style.color = '#ffffff';
            dailyBtn.style.fontWeight = '600';
        } else {
            dailyBtn.style.background = 'rgba(74, 144, 226, 0.1)';
            dailyBtn.style.color = '#4a90e2';
            dailyBtn.style.fontWeight = '500';
        }
    }

    if (weeklyBtn) {
        if (view === 'weekly') {
            weeklyBtn.style.background = '#4a90e2';
            weeklyBtn.style.color = '#ffffff';
            weeklyBtn.style.fontWeight = '600';
        } else {
            weeklyBtn.style.background = 'rgba(74, 144, 226, 0.1)';
            weeklyBtn.style.color = '#4a90e2';
            weeklyBtn.style.fontWeight = '500';
        }
    }

    if (monthlyBtn) {
        if (view === 'monthly') {
            monthlyBtn.style.background = '#4a90e2';
            monthlyBtn.style.color = '#ffffff';
            monthlyBtn.style.fontWeight = '600';
        } else {
            monthlyBtn.style.background = 'rgba(74, 144, 226, 0.1)';
            monthlyBtn.style.color = '#4a90e2';
            monthlyBtn.style.fontWeight = '500';
        }
    }

    updateCharts();
}

window.showUnbookConfirmation = (cardElement, tableId) => {
    // Cancel any existing pending unbook
    if (pendingUnbookCard && pendingUnbookCard !== cardElement) {
        cancelUnbookConfirmation();
    }

    pendingUnbookAction = () => unbookTableConfirmed(tableId);
    pendingUnbookCard = cardElement;

    // Remove existing confirmation container if any
    const existingContainer = cardElement.querySelector('.unbook-confirmation-container');
    if (existingContainer) {
        existingContainer.remove();
    }

    // Hide the "Unbook" button
    const unbookButton = cardElement.querySelector('.unbook-btn');
    if (unbookButton) {
        unbookButton.style.display = 'none';
    }

    // Create confirmation container
    const container = document.createElement('div');
    container.className = 'unbook-confirmation-container';
    container.style.cssText = 'display: flex; gap: 4px; align-items: center; justify-content: center; margin-top: 8px; padding: 8px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;';
    container.onclick = (e) => e.stopPropagation(); // Prevent opening booking modal
    container.innerHTML = `
        <span style="font-size: 12px; font-weight: 600; color: #6b7280; margin-right: 4px; font-family: \'Poppins\', \'Inter\', sans-serif;">Unbook?</span>
        <button type="button" onclick="event.stopPropagation(); confirmUnbook();" style="background: #4caf50; color: white; border: none; padding: 4px 8px; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 12px; min-width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; line-height: 1;" title="Confirm">✓</button>
        <button type="button" onclick="event.stopPropagation(); cancelUnbookConfirmation();" style="background: #f44336; color: white; border: none; padding: 4px 8px; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 12px; min-width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; line-height: 1;" title="Cancel">✕</button>
    `;

    // Insert before the action buttons
    const actionButtonsDiv = cardElement.querySelector('div[style*="display: flex; gap: 6px"]');
    if (actionButtonsDiv) {
        actionButtonsDiv.parentNode.insertBefore(container, actionButtonsDiv);
    } else {
        cardElement.appendChild(container);
    }

    unbookConfirmationContainer = container;
};

window.confirmUnbook = () => {
    if (pendingUnbookAction) {
        pendingUnbookAction();
        cancelUnbookConfirmation();
    }
};

window.cancelUnbookConfirmation = () => {
    if (unbookConfirmationContainer && pendingUnbookCard) {
        unbookConfirmationContainer.remove();

        // Restore the "Unbook" button
        const unbookButton = pendingUnbookCard.querySelector('.unbook-btn');
        if (unbookButton) {
            unbookButton.style.display = '';
        }
    }

    pendingUnbookAction = null;
    pendingUnbookCard = null;
    unbookConfirmationContainer = null;
};

function unbookTableConfirmed(id) {
    const tables = Storage.get('tables') || [];
    const table = tables.find(t => String(t.id) === String(id));
    if (table) {
        table.status = 'available';
        table.customerName = null;
        table.customerContact = null;
        Storage.set('tables', tables);
        loadTables();
    }
}

window.unbookTable = (id) => {
    unbookTableConfirmed(id);
};

// Functions are already assigned to window above

let selectedCategory = 'all';
let menuItemQuantities = {}; // Track quantities for each menu item
let draggedElement = null; // Track element being dragged
window.searchQuery = ''; // Track search query
let searchQuery = window.searchQuery; // Alias for backward compatibility
window.positionManagementMode = false; // Track if position management mode is active

let showCategories = localStorage.getItem('posShowCategories') !== 'false';

function updateCategoriesToggleUI() {
    const track = document.getElementById('categoriesSwitchTrack');
    const container = document.getElementById('categoryButtons');
    if (track) {
        track.classList.toggle('active', showCategories);
    }
    if (container) {
        container.style.display = showCategories ? 'flex' : 'none';
    }
}

window.toggleCategoriesVisibility = function toggleCategoriesVisibility() {
    showCategories = !showCategories;
    localStorage.setItem('posShowCategories', showCategories);
    updateCategoriesToggleUI();
};

// Favorites Management
window.addToFavorites = (itemId) => {
    let favorites = Storage.get('favorites') || [];
    if (!favorites.includes(itemId)) {
        favorites.push(itemId);
        Storage.set('favorites', favorites);
        loadMenuItemsList();
        // Reload categories if POS tab is active
        if (document.getElementById('pos')?.classList.contains('active')) {
            loadCategories();
            loadMenuItems();
        }
    }
};

window.removeFromFavorites = (itemId) => {
    let favorites = Storage.get('favorites') || [];
    favorites = favorites.filter(id => id !== itemId);
    Storage.set('favorites', favorites);
    loadMenuItemsList();
    // Reload categories if POS tab is active
    if (document.getElementById('pos')?.classList.contains('active')) {
        loadCategories();
        // If currently viewing favorites, reload menu items
        if (selectedCategory === 'favorites') {
            selectedCategory = 'all';
            loadCategories();
            loadMenuItems();
        } else {
            loadMenuItems();
        }
    }
};

// POS Functions
function updateActiveCategoryButton() {
    const containers = document.querySelectorAll('.category-dropdown-container');
    containers.forEach(container => {
        const btn = container.querySelector('.category-btn');
        const key = container.dataset.categoryKey;
        if (!btn) return;

        let isActive = false;
        if (selectedCategory === 'all' && key === 'all') {
            isActive = true;
        } else if (selectedCategory === 'favorites' && key === 'favorites') {
            isActive = true;
        } else if (typeof selectedCategory === 'number' && parseInt(key) === selectedCategory) {
            isActive = true;
        } else if (String(selectedCategory) === String(key)) {
            isActive = true;
        }

        if (isActive) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function loadCategories() {
    const categoryButtons = document.getElementById('categoryButtons');
    if (!categoryButtons) return;

    updateCategoriesToggleUI();

    const menuCategories = Storage.get('menuCategories') || [];
    const favorites = Storage.get('favorites') || [];
    const menuItems = Storage.get('menuItems') || [];
    categoryButtons.innerHTML = '';

    // Helper to create category dropdown
    const createCategoryDropdown = (title, count, isActive, categoryKey, items) => {
        const container = document.createElement('div');
        container.className = 'category-dropdown-container';
        container.dataset.categoryKey = categoryKey;

        const btn = document.createElement('div');
        btn.className = `category-btn ${isActive ? 'active' : ''}`;
        btn.innerHTML = `
            <span class="cat-content">
                <span class="cat-name">${escapeHtml(title)}</span>
                <span class="cat-badge">${count}</span>
            </span>
            <span class="cat-arrow-btn" title="View ${escapeHtml(title)} items">
                <svg class="cat-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 9l6 6 6-6"/>
                </svg>
            </span>
        `;

        // Clicking the category button selects the category and closes any open dropdowns
        btn.onclick = (e) => {
            document.querySelectorAll('.category-dropdown-container.open').forEach(c => c.classList.remove('open'));
            selectCategory(categoryKey, false);
        };

        // Clicking only the dropdown arrow button toggles the dropdown menu
        const arrowBtn = btn.querySelector('.cat-arrow-btn');
        if (arrowBtn) {
            arrowBtn.onclick = (e) => {
                e.stopPropagation();
                const isOpen = container.classList.contains('open');
                // Close any other open category dropdowns
                document.querySelectorAll('.category-dropdown-container.open').forEach(c => {
                    if (c !== container) c.classList.remove('open');
                });
                if (!isOpen) {
                    container.classList.add('open');
                    const menu = container.querySelector('.category-dropdown-menu');
                    if (menu) {
                        const rect = btn.getBoundingClientRect();
                        const menuWidth = 260;
                        if (rect.left + menuWidth > window.innerWidth - 20) {
                            menu.style.left = 'auto';
                            menu.style.right = '0';
                        } else {
                            menu.style.left = '0';
                            menu.style.right = 'auto';
                        }
                    }
                } else {
                    container.classList.remove('open');
                }
            };
        }

        const menu = document.createElement('div');
        menu.className = 'category-dropdown-menu';

        if (items && items.length > 0) {
            items.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'category-dropdown-item';
                itemEl.innerHTML = `
                    <span class="cd-item-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</span>
                    <span class="cd-item-price">Rs.${formatNumber(item.price)}</span>
                `;
                itemEl.onclick = (e) => {
                    e.stopPropagation();
                    addToCart(item);
                    container.classList.remove('open');
                };
                menu.appendChild(itemEl);
            });
        } else {
            const emptyEl = document.createElement('div');
            emptyEl.style.cssText = 'padding: 10px; color: #94a3b8; text-align: center; font-size: 12px; font-weight: 500;';
            emptyEl.textContent = 'No items';
            menu.appendChild(emptyEl);
        }

        container.appendChild(btn);
        container.appendChild(menu);
        return container;
    };

    // 1. "All Items"
    const isAllActive = selectedCategory === 'all';
    categoryButtons.appendChild(createCategoryDropdown('All Items', menuItems.length, isAllActive, 'all', menuItems));

    // 2. "Favourites"
    const favItems = menuItems.filter(item => favorites.includes(item.id));
    const isFavoritesActive = selectedCategory === 'favorites';
    categoryButtons.appendChild(createCategoryDropdown('Favourites', favItems.length, isFavoritesActive, 'favorites', favItems));

    // 3. Categories
    menuCategories.forEach((cat) => {
        const catId = typeof cat.id === 'number' ? cat.id : parseInt(cat.id);
        const catItems = menuItems.filter(item => {
            const itemCategoryId = typeof item.categoryId === 'number' ? item.categoryId : parseInt(item.categoryId);
            return itemCategoryId === catId;
        });
        const isActive = typeof selectedCategory === 'number'
            ? selectedCategory === catId
            : (selectedCategory === 'all' || selectedCategory === 'favorites' ? false : parseInt(selectedCategory) === catId);

        categoryButtons.appendChild(createCategoryDropdown(cat.name || 'Category', catItems.length, isActive, catId, catItems));
    });
}

function selectCategory(categoryId, reloadCategories = true) {
    // Ensure selectedCategory is stored correctly
    if (categoryId === 'all') {
        selectedCategory = 'all';
    } else if (categoryId === 'favorites') {
        selectedCategory = 'favorites';
    } else {
        selectedCategory = typeof categoryId === 'number' ? categoryId : parseInt(categoryId);
    }
    // Clear search when switching categories
    window.searchQuery = '';
    searchQuery = '';
    const menuSearchInput = document.getElementById('menuSearch');
    if (menuSearchInput) {
        menuSearchInput.value = '';
    }
    if (reloadCategories) {
        loadCategories();
    } else {
        updateActiveCategoryButton();
    }
    loadMenuItems();
}

// Global outside click, pointerdown, escape, and scroll handler to close open category dropdowns
document.addEventListener('pointerdown', (e) => {
    if (!e.target.closest('.category-dropdown-container')) {
        document.querySelectorAll('.category-dropdown-container.open').forEach(c => c.classList.remove('open'));
    }
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.category-dropdown-container')) {
        document.querySelectorAll('.category-dropdown-container.open').forEach(c => c.classList.remove('open'));
    }
}, true);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.category-dropdown-container.open').forEach(c => c.classList.remove('open'));
    }
});

window.addEventListener('scroll', (e) => {
    // Do not close if the user is scrolling inside the category dropdown menu itself
    if (e.target && (e.target.classList?.contains('category-dropdown-menu') || e.target.closest?.('.category-dropdown-menu'))) {
        return;
    }
    document.querySelectorAll('.category-dropdown-container.open').forEach(c => c.classList.remove('open'));
}, { passive: true, capture: true });

window.loadMenuItems = function loadMenuItems() {
    const menuItems = Storage.get('menuItems');
    const favorites = Storage.get('favorites') || [];

    let filteredItems;

    // If search query exists, search through entire menu regardless of category
    if (searchQuery && searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        filteredItems = menuItems.filter(item =>
            item.name.toLowerCase().includes(query)
        );
    } else {
        // Apply category filter only when there's no search query
        if (selectedCategory === 'all') {
            filteredItems = menuItems;
        } else if (selectedCategory === 'favorites') {
            // Show only favorite items
            filteredItems = menuItems.filter(item => favorites.includes(item.id));
        } else {
            filteredItems = menuItems.filter(item => {
                // Ensure both are numbers for comparison
                const itemCategoryId = typeof item.categoryId === 'number' ? item.categoryId : parseInt(item.categoryId);
                const selectedCatId = typeof selectedCategory === 'number' ? selectedCategory : parseInt(selectedCategory);
                return itemCategoryId === selectedCatId;
            });
        }
    }

    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid) return;

    menuGrid.innerHTML = '';

    if (filteredItems.length === 0) {
        menuGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #888;">No menu items available. Add items in the Menu section.</div>';
        return;
    }

    // Get saved order for current category
    let itemOrder = Storage.get('menuItemOrder');
    if (!itemOrder || typeof itemOrder !== 'object') {
        itemOrder = {};
    }

    const categoryKey = selectedCategory === 'all' ? 'all' :
        selectedCategory === 'favorites' ? 'favorites' :
            selectedCategory.toString();
    let savedOrder = itemOrder[categoryKey] ? [...itemOrder[categoryKey]] : [];

    // Filter saved order to only include items that still exist in filteredItems
    const existingInSavedOrder = savedOrder.filter(id => filteredItems.some(item => item.id === id));

    // Find items not in saved order (new items or items that were removed and re-added)
    const missingItems = filteredItems.filter(item => !savedOrder.includes(item.id));

    // Build final order: existing items in saved order first, then missing items at the end
    let finalOrder = [...existingInSavedOrder];
    if (missingItems.length > 0) {
        missingItems.forEach(item => finalOrder.push(item.id));
        // Update saved order with new items
        itemOrder[categoryKey] = finalOrder;
        Storage.set('menuItemOrder', itemOrder);
    } else if (existingInSavedOrder.length > 0 && existingInSavedOrder.length !== savedOrder.length) {
        // Some items were removed, update the saved order
        itemOrder[categoryKey] = existingInSavedOrder;
        Storage.set('menuItemOrder', itemOrder);
        finalOrder = existingInSavedOrder;
    } else if (finalOrder.length === 0 && filteredItems.length > 0) {
        // No saved order exists, create one from current items
        finalOrder = filteredItems.map(item => item.id);
        itemOrder[categoryKey] = finalOrder;
        Storage.set('menuItemOrder', itemOrder);
    }

    // Use finalOrder for sorting
    const orderToUse = finalOrder.length > 0 ? finalOrder : filteredItems.map(item => item.id);

    // Sort items according to saved order
    const sortedItems = [...filteredItems].sort((a, b) => {
        const indexA = orderToUse.indexOf(a.id);
        const indexB = orderToUse.indexOf(b.id);
        if (indexA === -1 && indexB === -1) return 0;
        if (indexA === -1) return 1; // a comes after b
        if (indexB === -1) return -1; // b comes after a
        return indexA - indexB; // Both in saved order, use their positions
    });

    // Create placeholder image data URI (simple gray placeholder with plate icon)
    const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y1ZjVmNSIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2RkZCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTcwIDEwMEwxMDAgNzBMMTMwIDEwMEwxMDAgMTMwWiIgZmlsbD0iI2RkZCIvPjwvc3ZnPg==';

    // Use requestAnimationFrame for smoother rendering
    const renderBatch = (startIndex) => {
        const batchSize = 10; // Render 10 items per frame
        const endIndex = Math.min(startIndex + batchSize, sortedItems.length);

        for (let i = startIndex; i < endIndex; i++) {
            const item = sortedItems[i];
            const cartItem = cart.find(cartItem => cartItem.id === item.id);
            const quantity = cartItem ? cartItem.quantity : (menuItemQuantities[item.id] || 0);

            const card = document.createElement('div');
            card.className = 'menu-item-card';
            card.dataset.itemId = item.id;

            // Always load images immediately, compress in background
            const imageSrc = item.image || placeholderImage;

            card.innerHTML = `
                <div class="menu-item-image-container">
                    <img src="${imageSrc}" 
                         alt="${item.name}" 
                         class="menu-item-image"
                         loading="lazy"
                         onerror="this.src='${placeholderImage}'">
                </div>
                <div class="menu-item-header">
                    <div class="menu-item-name">${item.name}</div>
                </div>
                <div class="menu-item-price">Rs.${formatNumber(item.price)}</div>
                ${quantity > 0 ? `<div class="menu-item-quantity-counter">x${formatQuantity(quantity)}</div>` : ''}
            `;

            // Compress images in background for better performance
            if (item.image && !imageSrc.startsWith('data:image/svg+xml')) {
                const img = card.querySelector('img');
                if (img) {
                    // Show original immediately, then replace with compressed version when ready
                    compressImageForDisplay(imageSrc, 200, 200, 0.6, (compressedSrc) => {
                        if (img.parentElement && img.src === imageSrc) { // Only replace if still showing original
                            img.src = compressedSrc;
                            img.classList.add('loaded');
                        }
                    });
                }
            }

            // Add click event to add item to cart (only if not in position management mode)
            card.addEventListener('click', function (e) {
                if (!window.positionManagementMode) {
                    // Add item to cart
                    updateMenuQuantity(item.id, 1);
                }
            });

            // Add right-click event to reduce quantity by 1
            card.addEventListener('contextmenu', function (e) {
                e.preventDefault(); // Prevent default context menu
                if (!window.positionManagementMode) {
                    updateMenuQuantity(item.id, -1);
                }
            });

            // Enable drag-and-drop if position management mode is active
            if (window.positionManagementMode) {
                card.draggable = true;
                card.addEventListener('dragstart', handleDragStart);
                card.addEventListener('dragend', handleDragEnd);
                card.addEventListener('dragover', handleDragOver);
                card.addEventListener('dragenter', handleDragEnter);
                card.addEventListener('dragleave', handleDragLeave);
                card.addEventListener('drop', handleDrop);
                card.style.cursor = 'move';
            }

            menuGrid.appendChild(card);
        }

        // Continue with next batch if there are more items
        if (endIndex < sortedItems.length) {
            requestAnimationFrame(() => renderBatch(endIndex));
        } else {
            // All items rendered, setup lazy loading
            setTimeout(() => {
                setupLazyLoading();
            }, 100);
        }
    };

    // Start rendering in batches
    if (sortedItems.length > 0) {
        renderBatch(0);
    } else {
        setTimeout(() => {
            setupLazyLoading();
        }, 100);
    }

    // Also setup lazy loading on scroll (for images that become visible)
    const menuContainer = document.querySelector('.menu-items-container');
    if (menuContainer) {
        const scrollHandler = debounce(() => {
            setupLazyLoading();
        }, 200);
        menuContainer.addEventListener('scroll', scrollHandler);
    }

    // Pre-compress images in background for better performance
    setTimeout(() => {
        sortedItems.forEach(item => {
            if (item.image && !item.image.startsWith('data:image/svg+xml')) {
                // Pre-compress and cache images that are likely to be viewed
                compressImageForDisplay(item.image, 200, 200, 0.6, () => { });
            }
        });
    }, 500);

    // Scroll to top when reloading items
    const menuContainerEl = document.querySelector('.menu-items-container');
    if (menuContainerEl) {
        menuContainerEl.scrollTop = 0;
    }
}

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    // Prevent quantity buttons from interfering with drag
    e.dataTransfer.setData('text/plain', '');
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    document.querySelectorAll('.menu-item-card').forEach(card => {
        card.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    if (this !== draggedElement) {
        this.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (e.preventDefault) {
        e.preventDefault();
    }

    if (draggedElement !== this) {
        const menuGrid = document.getElementById('menuGrid');
        const allCards = Array.from(menuGrid.querySelectorAll('.menu-item-card'));
        const draggedIndex = allCards.indexOf(draggedElement);
        const targetIndex = allCards.indexOf(this);

        if (draggedIndex < targetIndex) {
            menuGrid.insertBefore(draggedElement, this.nextSibling);
        } else {
            menuGrid.insertBefore(draggedElement, this);
        }

        // Save new order immediately
        saveItemOrder();
    }

    this.classList.remove('drag-over');
    return false;
}

function saveItemOrder() {
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid) return;

    const cards = Array.from(menuGrid.querySelectorAll('.menu-item-card'));
    const itemIds = cards.map(card => parseInt(card.dataset.itemId));

    // Only save if we have items
    if (itemIds.length === 0) return;

    // Get current order
    let itemOrder = Storage.get('menuItemOrder');
    if (!itemOrder || typeof itemOrder !== 'object') {
        itemOrder = {};
    }

    const categoryKey = selectedCategory === 'all' ? 'all' : selectedCategory.toString();

    // Save the exact order as it appears in the DOM
    itemOrder[categoryKey] = itemIds;

    // Save immediately
    Storage.set('menuItemOrder', itemOrder);
}

function updateMenuQuantity(itemId, change) {
    const menuItems = Storage.get('menuItems');
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    const cartItem = cart.find(cartItem => cartItem.id === itemId);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            removeFromCart(itemId);
        }
    } else if (change > 0) {
        addToCart(item);
    }

    updateCart();

    // Update quantity display without rebuilding entire grid to preserve order
    const menuGrid = document.getElementById('menuGrid');
    if (menuGrid) {
        const card = menuGrid.querySelector(`[data-item-id="${itemId}"]`);
        if (card) {
            const currentCartItem = cart.find(cartItem => cartItem.id === itemId);
            const quantity = currentCartItem ? currentCartItem.quantity : (menuItemQuantities[itemId] || 0);

            // Update quantity counter
            let counter = card.querySelector('.menu-item-quantity-counter');
            if (quantity > 0) {
                if (!counter) {
                    counter = document.createElement('div');
                    counter.className = 'menu-item-quantity-counter';
                    card.appendChild(counter);
                }
                counter.textContent = `x${formatQuantity(quantity)}`;
            } else {
                if (counter) {
                    counter.remove();
                }
            }

            const qtyDisplay = card.querySelector('.menu-qty-display');
            if (qtyDisplay) {
                // Update input value - use empty string for 0 to show placeholder
                qtyDisplay.value = quantity === 0 ? '' : quantity;
                return; // Successfully updated, don't reload
            }

            // If no qtyDisplay but counter was updated, return anyway
            if (counter || quantity === 0) {
                return;
            }
        }
        // Only reload if card doesn't exist (shouldn't happen in normal flow)
        // But preserve order by not reloading unnecessarily
    }
    // Only reload if menuGrid doesn't exist (tab not active)
}

// Function to set quantity directly from input
window.setMenuQuantity = function (itemId, quantity) {
    const menuItems = Storage.get('menuItems');
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    quantity = parseFloat(quantity) || 0;
    quantity = Math.max(0, quantity); // Ensure non-negative

    const cartItem = cart.find(cartItem => cartItem.id === itemId);

    if (quantity <= 0) {
        // Remove from cart if quantity is 0
        if (cartItem) {
            removeFromCart(itemId);
        }
    } else {
        // Set quantity
        if (cartItem) {
            cartItem.quantity = quantity;
        } else {
            // Add to cart with specified quantity
            addToCart(item);
            const newCartItem = cart.find(cartItem => cartItem.id === itemId);
            if (newCartItem) {
                newCartItem.quantity = quantity;
            }
        }
    }

    updateCart();

    // Update quantity display without rebuilding entire grid to preserve order
    const menuGrid = document.getElementById('menuGrid');
    if (menuGrid) {
        const card = menuGrid.querySelector(`[data-item-id="${itemId}"]`);
        if (card) {
            const qtyDisplay = card.querySelector('.menu-qty-display');
            if (qtyDisplay) {
                // Use empty string for 0 to show placeholder
                qtyDisplay.value = quantity === 0 ? '' : quantity;
            }
        }
    }
};

function updateCardQuantityBadge(itemId) {
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid) return;

    if (itemId !== undefined && itemId !== null) {
        const card = menuGrid.querySelector(`[data-item-id="${itemId}"]`);
        if (card) {
            const cartItem = cart.find(i => i.id === itemId);
            const quantity = cartItem ? cartItem.quantity : (menuItemQuantities[itemId] || 0);

            let counter = card.querySelector('.menu-item-quantity-counter');
            if (quantity > 0) {
                if (!counter) {
                    counter = document.createElement('div');
                    counter.className = 'menu-item-quantity-counter';
                    card.appendChild(counter);
                }
                counter.textContent = `x${formatQuantity(quantity)}`;
            } else {
                if (counter) {
                    counter.remove();
                }
            }
        }
    } else {
        const cards = menuGrid.querySelectorAll('.menu-item-card');
        cards.forEach(card => {
            const id = parseInt(card.dataset.itemId) || card.dataset.itemId;
            const cartItem = cart.find(i => i.id == id);
            const quantity = cartItem ? cartItem.quantity : (menuItemQuantities[id] || 0);

            let counter = card.querySelector('.menu-item-quantity-counter');
            if (quantity > 0) {
                if (!counter) {
                    counter = document.createElement('div');
                    counter.className = 'menu-item-quantity-counter';
                    card.appendChild(counter);
                }
                counter.textContent = `x${formatQuantity(quantity)}`;
            } else {
                if (counter) {
                    counter.remove();
                }
            }
        });
    }
}
window.updateCardQuantityBadge = updateCardQuantityBadge;

function addToCart(itemIdOrItem) {
    const menuItems = Storage.get('menuItems');
    const item = typeof itemIdOrItem === 'number'
        ? menuItems.find(i => i.id === itemIdOrItem)
        : itemIdOrItem;

    if (!item) return;

    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }
    updateCart();
    updateCardQuantityBadge(item.id);
}

function removeFromCart(dishId) {
    cart = cart.filter(item => item.id !== dishId);
    updateCart();
    updateCardQuantityBadge(dishId);
}

// Function to set cart quantity directly from input
window.setCartQuantityDirect = function (itemId, quantity) {
    const cartItem = cart.find(item => item.id === itemId);
    if (!cartItem) return;

    quantity = parseFloat(quantity) || 0;
    quantity = Math.max(0, quantity); // Ensure minimum 0

    if (quantity <= 0) {
        removeFromCart(itemId);
    } else {
        cartItem.quantity = quantity;
        updateCart();
        updateCardQuantityBadge(itemId);
    }
};

window.setCartPriceDirect = function (itemId, totalSellPrice) {
    const cartItem = cart.find(item => item.id === itemId);
    if (!cartItem) return;

    totalSellPrice = parseFloat(totalSellPrice) || 0;
    const basePrice = cartItem.price;

    if (basePrice > 0) {
        cartItem.quantity = totalSellPrice / basePrice;
        if (cartItem.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCart();
            updateCardQuantityBadge(itemId);
        }
    }
};

function updateQuantity(dishId, change) {
    const item = cart.find(item => item.id === dishId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(dishId);
        } else {
            updateCart();
            updateCardQuantityBadge(dishId);
        }
    }
}

// Show discount modal
function showDiscountModal() {
    document.getElementById('discountModal').style.display = 'flex';
    document.getElementById('discountValue').value = '';
    document.getElementById('discountError').style.display = 'none';
    document.getElementById('discountType').value = 'fixed';
    setTimeout(() => {
        document.getElementById('discountValue')?.focus();
    }, 50);
}

window.closeDiscountModal = function closeDiscountModal() {
    const modal = document.getElementById('discountModal');
    if (modal) modal.style.display = 'none';
};

window.setInlineDiscountType = function(type) {
    if (!currentDiscount) currentDiscount = { type: 'fixed', value: 0 };
    currentDiscount.type = type;
    const btnRs = document.getElementById('discountTypeRs');
    const btnPct = document.getElementById('discountTypePct');
    if (btnRs) btnRs.classList.toggle('active', type === 'fixed');
    if (btnPct) btnPct.classList.toggle('active', type === 'percentage');
    updateCartTotalsOnly();
};

window.handleInlineDiscountInput = function(val) {
    const num = parseFloat(val) || 0;
    if (!currentDiscount) currentDiscount = { type: 'fixed', value: 0 };
    if (!currentDiscount.type) currentDiscount.type = 'fixed';
    currentDiscount.value = num;
    updateCartTotalsOnly();
};

function updateCartTotalsOnly() {
    let subtotal = 0;
    if (Array.isArray(cart)) {
        cart.forEach(item => {
            subtotal += ((item.price || 0) * (item.quantity || 0));
        });
    }

    let discountAmount = 0;
    if (currentDiscount && currentDiscount.value > 0) {
        if (currentDiscount.type === 'percentage') {
            discountAmount = (subtotal * currentDiscount.value) / 100;
        } else {
            discountAmount = Math.min(currentDiscount.value, subtotal);
        }
    }

    const grandTotal = Math.max(0, subtotal - discountAmount);

    const cartSubtotal = document.getElementById('cartSubtotal');
    if (cartSubtotal) cartSubtotal.textContent = `Rs.${formatNumber(subtotal)}`;

    const cartTotal = document.getElementById('cartTotal');
    if (cartTotal) cartTotal.textContent = `Rs.${formatNumber(grandTotal)}`;

    let discountRow = document.getElementById('discountAmountRow');
    if (discountAmount > 0) {
        if (!discountRow) {
            const subtotalRow = document.getElementById('subtotalRow');
            if (subtotalRow && subtotalRow.parentNode) {
                discountRow = document.createElement('div');
                discountRow.id = 'discountAmountRow';
                discountRow.className = 'summary-item';
                discountRow.style.cssText = 'display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #ef4444; font-weight: 600; padding: 1px 0;';
                subtotalRow.parentNode.insertBefore(discountRow, subtotalRow.nextSibling);
            }
        }
        if (discountRow) {
            const label = currentDiscount.type === 'percentage' ? `${currentDiscount.value}%` : 'Fixed';
            discountRow.innerHTML = `<span>Discount (${label})</span><span>-Rs.${formatNumber(discountAmount)}</span>`;
            discountRow.style.display = 'flex';
        }
    } else if (discountRow) {
        discountRow.style.display = 'none';
    }
}

// Apply discount to the cart (legacy support)
function applyDiscount() {
    const discountType = document.getElementById('discountType')?.value || 'fixed';
    const discountValue = parseFloat(document.getElementById('discountValue')?.value || 0);
    const errorElement = document.getElementById('discountError');

    if (isNaN(discountValue) || discountValue <= 0) {
        if (errorElement) {
            errorElement.textContent = 'Please enter a valid discount amount';
            errorElement.style.display = 'block';
        }
        return;
    }

    if (discountType === 'percentage' && (discountValue < 0 || discountValue > 100)) {
        if (errorElement) {
            errorElement.textContent = 'Percentage must be between 0 and 100';
            errorElement.style.display = 'block';
        }
        return;
    }

    currentDiscount = { type: discountType, value: discountValue };
    const modal = document.getElementById('discountModal');
    if (modal) modal.style.display = 'none';
    updateCart();
}

// Clear any applied discount
function clearDiscount() {
    currentDiscount = { type: 'fixed', value: 0 };
    const inlineInput = document.getElementById('inlineDiscountInput');
    if (inlineInput) inlineInput.value = '';
    updateCartTotalsOnly();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const orderHeaderTitle = document.getElementById('orderHeaderTitle');

    if (!cartItems) return;

    // Update order header with items count
    if (orderHeaderTitle) {
        orderHeaderTitle.textContent = `Order Details (${cart.length})`;
    }

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">No items in cart</div>';
        currentDiscount = { type: 'fixed', value: 0 };
        const inlineInput = document.getElementById('inlineDiscountInput');
        if (inlineInput && document.activeElement !== inlineInput) {
            inlineInput.value = '';
        }
        updateCardQuantityBadge();
        updateCartTotalsOnly();
        return;
    }

    cartItems.innerHTML = '';

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;

        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-item-left">
                <div class="order-item-name">${item.name}</div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div class="order-item-qty">x${formatQuantity(item.quantity)}</div>
                    <div class="order-item-price">Rs.${formatNumber(itemTotal)}</div>
                </div>
            </div>
            <div class="order-item-right">
                <div class="order-item-actions">
                    <button type="button" class="order-action-btn order-item-remove" title="Remove" onclick="removeFromCart(${item.id})">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                    <button type="button" class="order-action-btn order-item-subtract" title="Decrease" onclick="updateQuantity(${item.id}, -1)">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                    <input type="number" class="order-item-qty-input" value="${item.quantity}" min="0" step="0.01" data-original-value="${item.quantity}" onchange="setCartQuantityDirect(${item.id}, parseFloat(this.value) || 0); this.setAttribute('data-original-value', this.value);" onblur="if(this.value === '' || parseFloat(this.value) <= 0) { this.value = this.getAttribute('data-original-value') || 1; setCartQuantityDirect(${item.id}, parseFloat(this.value) || 1); }" onclick="event.stopPropagation();">
                    <input type="number" class="order-item-price-input" value="${Math.round(itemTotal)}" min="0" step="1" onchange="setCartPriceDirect(${item.id}, this.value)" onclick="event.stopPropagation();">
                    <button type="button" class="order-action-btn order-item-add" title="Increase" onclick="updateQuantity(${item.id}, 1)">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        cartItems.appendChild(orderItem);
    });

    const inlineInput = document.getElementById('inlineDiscountInput');
    if (inlineInput && document.activeElement !== inlineInput) {
        inlineInput.value = (currentDiscount && currentDiscount.value > 0) ? currentDiscount.value : '';
    }
    const btnRs = document.getElementById('discountTypeRs');
    const btnPct = document.getElementById('discountTypePct');
    if (btnRs) btnRs.classList.toggle('active', !currentDiscount || currentDiscount.type !== 'percentage');
    if (btnPct) btnPct.classList.toggle('active', currentDiscount && currentDiscount.type === 'percentage');

    updateCartTotalsOnly();
}

function clearCart() {
    if (!cart || cart.length === 0) return;
    showCustomConfirm('Clear all items from cart?', () => {
        cart = [];
        resetCustomerName();
        resetWaitingTime();
        updateCart();
    }, null, { title: 'Clear Cart', confirmText: 'Clear All', type: 'warning' });
}

let selectedPaymentMethod = 'cash';

function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    const cashBtn = document.querySelector('.cash-btn');
    const onlineBtn = document.querySelector('.online-btn');
    const deliveryBtn = document.querySelector('.delivery-btn');

    // Reset all buttons to inactive state
    [cashBtn, onlineBtn, deliveryBtn].forEach(btn => {
        if (btn) {
            btn.classList.remove('active');
            btn.style.background = 'transparent';
            btn.style.color = '#666';
            btn.style.border = '1px solid transparent';
            btn.style.fontWeight = '500';
            btn.style.boxShadow = 'none';
        }
    });

    // Set active button
    let activeBtn = null;
    if (method === 'cash' && cashBtn) {
        activeBtn = cashBtn;
    } else if (method === 'online' && onlineBtn) {
        activeBtn = onlineBtn;
    } else if (method === 'delivery' && deliveryBtn) {
        activeBtn = deliveryBtn;
    }

    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.style.background = '#8B4513';
        activeBtn.style.color = '#ffffff';
        activeBtn.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        activeBtn.style.fontWeight = '600';
        activeBtn.style.boxShadow = '0 2px 4px rgba(139, 69, 19, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
    }

    // Update cart to recalculate tax when payment method changes
    updateCart();
}

function holdOrder() {
    if (cart.length === 0) {
        const holdOrderBtn = document.getElementById('holdOrderBtn');
        if (holdOrderBtn) {
            showButtonMessage(holdOrderBtn, 'Cart is empty!');
        }
        return;
    }

    // If editing an order, save changes instead
    if (editingHoldOrderId) {
        saveHoldOrderChanges();
        return;
    }

    // Skip confirmation - directly hold and print
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Calculate discount
    let discountAmount = 0;
    if (currentDiscount.type === 'fixed') {
        discountAmount = Math.min(currentDiscount.value, subtotal);
    } else if (currentDiscount.type === 'percentage') {
        discountAmount = (subtotal * currentDiscount.value) / 100;
    }

    // Calculate GST and Service Charges
    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const tax = (selectedPaymentMethod === 'delivery' || selectedPaymentMethod === 'parcel') ? 0 : discountedSubtotal * SALES_TAX_RATE;
    const serviceCharges = (selectedPaymentMethod === 'delivery' || selectedPaymentMethod === 'parcel') ? 0 : discountedSubtotal * SERVICE_CHARGE_RATE;
    const total = discountedSubtotal + tax + serviceCharges;

    const holdOrders = Storage.get('holdOrders');
    const orderNumber = getNextOrderNumber();
    const orderId = `ORD-${orderNumber}`;
    const now = new Date();

    const displayOrderNumber = (orderNumber || '').toString().padStart(7, '0');

    // Get selected waiter from dropdown
    const selectedWaiterElement = document.getElementById('selectedWaiter');
    const selectedWaiter = selectedWaiterElement ? selectedWaiterElement.value.trim() : '';

    const selectedTableElement = document.getElementById('selectedTable');
    const selectedTableNo = selectedTableElement ? selectedTableElement.value.trim() : '';

    const heldOrder = {
        id: orderId,
        orderId: orderId,
        orderNumber: orderNumber,
        date: formatDate(now),
        time: formatTime(now),
        items: cart.map(item => ({ ...item })), // Create a copy
        subtotal: subtotal,
        ...(currentDiscount.type ? {
            discount: { type: currentDiscount.type, value: currentDiscount.value, amount: discountAmount }
        } : {}),
        tax: tax,
        serviceCharges: serviceCharges,
        total: total,
        paymentMethod: selectedPaymentMethod,
        waiter: selectedWaiter || null,
        tableNo: selectedTableNo || null,
        customerName: getCustomerName() || null,
        waitingTime: getWaitingTime(),
        status: 'pending',
        createdAt: now.toISOString()
    };

    holdOrders.push(heldOrder);
    Storage.set('holdOrders', holdOrders);

    // Build Customer Receipt + KOT from the held order (so it prints even after cart clears)
    const receipt = generateFullReceiptHTML(heldOrder);

    // Build KOT as HTML instead of plain text
    const kotItemsTable = formatKOTItems(heldOrder.items);
    const receiveTime = calculateReceiveTime(heldOrder.time, heldOrder.date, heldOrder.waitingTime);
    const kotHTML = `
        <div style="text-align: center; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; width: 100%; line-height: 1.2;">
            <div style="font-size: 20px; font-weight: 900; margin-bottom: 2px;">Hangout Lounge & Co.</div>

            <div style="font-size: 16px; font-weight: 900; margin: 3px 0;">====== KOT ======</div>
            <div style="font-size: 14px; margin-bottom: 2px;"><strong>${t('Order No.')} ${displayOrderNumber}</strong></div>
            <div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Customer: ${heldOrder.customerName ? escapeHtml(heldOrder.customerName) : '-'}</div>
            <div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">${t('Date')}: ${heldOrder.date} ${heldOrder.time}</div>
            ${receiveTime ? `<div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Order Receive Time: ${receiveTime}</div>` : ''}
            ${heldOrder.tableNo ? `<div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Table No: ${escapeHtml(heldOrder.tableNo)}</div>` : ''}
            <div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Waiter: ${heldOrder.waiter ? escapeHtml(heldOrder.waiter) : '-'}</div>
            <div style="border-top: 1px dashed #000; margin: 4px 0; padding-top: 4px; width: 100%;">
                <div style="font-size: 12px; font-weight: 700; margin-bottom: 3px; text-align: center;">${t('ITEMS:')}</div>
                <div style="width: 100%; display: block;">
                    ${kotItemsTable}
                </div>
            </div>
            <div style="border-top: 1px dashed #000; margin-top: 5px; padding-top: 4px;">
                <div style="font-size: 12px; font-weight: 700;">======================</div>
            </div>
        </div>
    `;

    // Store cart data temporarily for undo
    const cartBackup = JSON.parse(JSON.stringify(cart));
    const menuItemQuantitiesBackup = JSON.parse(JSON.stringify(menuItemQuantities));

    // Clear cart
    cart = [];
    menuItemQuantities = {};
    updateCart();
    loadMenuItems();
    resetTableSelection();
    resetCustomerName();
    resetWaitingTime();

    // Skip success modal when printing receipts (user requested)
    // showHoldOrderSuccessModal(orderId, heldOrder.id, cartBackup, menuItemQuantitiesBackup);

    // Refresh hold orders if on hold orders tab
    if (document.getElementById('holdOrders')?.classList.contains('active')) {
        loadHoldOrders();
    }

    // Print KOT only (separate window)
    printKOTWindow(kotHTML, displayOrderNumber);
}

function showHoldOrderSuccessModal(orderId, heldOrderId, cartBackup, menuItemQuantitiesBackup) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('holdOrderSuccessModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'holdOrderSuccessModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 400px;">
                <div class="modal-header">
                    <h3>Order Held</h3>
                    <span class="modal-close" onclick="closeHoldOrderSuccessModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <p id="holdOrderSuccessMessage"></p>
                </div>
                <div style="padding: 15px; display: flex; gap: 10px; justify-content: flex-end; border-top: 1px solid #e0e0e0;">
                    <button onclick="undoHoldOrder()" style="background: #757575; color: white; border: none; padding: 8px 20px; border-radius: 4px; cursor: pointer; font-weight: 500;">Undo</button>
                    <button onclick="closeHoldOrderSuccessModal()" style="background: #4a90e2; color: white; border: none; padding: 8px 20px; border-radius: 4px; cursor: pointer; font-weight: 500;">OK</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    document.getElementById('holdOrderSuccessMessage').textContent = `Order ${orderId} has been held successfully!`;

    // Store undo data
    window.pendingUndoData = {
        heldOrderId: heldOrderId,
        cartBackup: cartBackup,
        menuItemQuantitiesBackup: menuItemQuantitiesBackup
    };

    modal.style.display = 'flex';
}

function closeHoldOrderSuccessModal() {
    const modal = document.getElementById('holdOrderSuccessModal');
    if (modal) {
        modal.style.display = 'none';
    }
    window.pendingUndoData = null;
}

function undoHoldOrder() {
    if (!window.pendingUndoData) return;

    const { heldOrderId, cartBackup, menuItemQuantitiesBackup } = window.pendingUndoData;

    // Remove the held order
    const holdOrders = Storage.get('holdOrders');
    const filtered = holdOrders.filter(o => o.id !== heldOrderId);
    Storage.set('holdOrders', filtered);

    // Restore cart
    cart = cartBackup;
    menuItemQuantities = menuItemQuantitiesBackup;
    updateCart();
    loadMenuItems();

    // Close modal
    closeHoldOrderSuccessModal();

    // Refresh hold orders if on hold orders tab
    if (document.getElementById('holdOrders')?.classList.contains('active')) {
        loadHoldOrders();
    }
}

function loadHoldOrders() {
    const holdOrders = Storage.get('holdOrders');
    const tbody = document.getElementById('holdOrdersTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    // Filter only pending orders
    const pendingOrders = holdOrders.filter(order => order.status === 'pending');

    const countEl = document.getElementById('holdOrdersCount');
    if (countEl) countEl.textContent = 'Count: ' + pendingOrders.length;

    if (pendingOrders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 40px; color: #999;">No pending orders</td></tr>';
        return;
    }

    // Sort by date/time (newest first)
    const sortedOrders = [...pendingOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    sortedOrders.forEach(order => {
        const itemsList = order.items.map(item => `${item.name} x${item.quantity}`).join(', ');
        const tr = document.createElement('tr');
        const orderDate = order.date ? new Date(order.date) : (order.createdAt ? new Date(order.createdAt) : new Date());
        const dateStr = formatDate(orderDate);
        const timeStr = order.time || formatTime(orderDate);
        const displayOrderNumber = (order.orderNumber || extractOrderNumber(order.orderId || order.id) || '').toString().padStart(7, '0');
        const waiterName = order.waiter ? escapeHtml(order.waiter) : '-';
        const customerName = order.customerName ? escapeHtml(order.customerName) : '-';
        
        let locationText = formatLocation(order.paymentMethod);
        if (order.tableNo) {
            locationText += ` (Table ${order.tableNo})`;
        }

        tr.innerHTML = `
            <td>#${displayOrderNumber}</td>
            <td>${dateStr} ${timeStr}</td>
            <td>${itemsList}</td>
            <td>Rs.${formatNumber(order.total)}</td>
            <td>${locationText}</td>
            <td>${customerName}</td>
            <td>${waiterName}</td>
            <td>
                <div class="table-actions-cell">
                    <button class="btn-action btn-action-edit" onclick="editHoldOrder('${order.id}')" title="Edit Order">${ICONS.edit}</button>
                    <button id="completeBtn_${order.id}" class="btn-action btn-action-complete" onclick="showCompleteConfirmation('${order.id}', this)" title="Complete Order">${ICONS.check}</button>
                    <button class="btn-action btn-action-print" onclick="printReceiptForOrder('${order.id}')" title="Print Receipt">${ICONS.print}</button>
                    <button class="btn-action btn-action-delete" onclick="deleteHoldOrder('${order.id}', this)" title="Delete Order">${ICONS.delete}</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function showCompleteConfirmation(orderId, buttonElement) {
    // Replace the Complete button with tick/cross buttons in a container
    const buttonContainer = buttonElement.parentElement;

    // Create a container div to hold both buttons side by side
    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.style.cssText = 'display: inline-flex; gap: 4px; align-items: center; vertical-align: middle;';
    buttonsWrapper.setAttribute('data-order-id', orderId);

    // Create tick and cross buttons
    const tickButton = document.createElement('button');
    tickButton.className = 'btn-action btn-action-complete';
    tickButton.title = 'Confirm Complete Order';
    tickButton.innerHTML = ICONS.check;
    tickButton.setAttribute('data-order-id', orderId);

    const crossButton = document.createElement('button');
    crossButton.className = 'btn-action btn-action-cancel';
    crossButton.title = 'Cancel';
    crossButton.innerHTML = ICONS.cross;
    crossButton.setAttribute('data-order-id', orderId);

    // Add buttons to wrapper
    buttonsWrapper.appendChild(tickButton);
    buttonsWrapper.appendChild(crossButton);

    tickButton.onclick = () => {
        markOrderSuccessful(orderId, true);
    };

    crossButton.onclick = () => {
        // Restore original Complete button
        const container = buttonsWrapper.parentElement;
        const newCompleteBtn = document.createElement('button');
        newCompleteBtn.id = `completeBtn_${orderId}`;
        newCompleteBtn.className = 'btn-action btn-action-complete';
        newCompleteBtn.title = 'Complete Order';
        newCompleteBtn.innerHTML = ICONS.check;
        newCompleteBtn.onclick = () => showCompleteConfirmation(orderId, newCompleteBtn);
        // Replace buttons wrapper with Complete button
        container.replaceChild(newCompleteBtn, buttonsWrapper);
    };

    // Replace Complete button with the buttons wrapper
    buttonElement.replaceWith(buttonsWrapper);
}

function markOrderSuccessful(orderId, skipConfirmation = false) {
    if (!skipConfirmation) {
        showCustomConfirm('Mark this order as successful and move to sales?', () => {
            markOrderSuccessful(orderId, true);
        }, null, { title: 'Complete Order', confirmText: 'Complete', type: 'info' });
        return false;
    }

    const holdOrders = Storage.get('holdOrders');
    const order = holdOrders.find(o => o.id === orderId);

    if (!order) {
        alert('Order not found!');
        return false;
    }

    // Move to sales as a single order
    const sales = Storage.get('sales');
    const orderNumber = order.orderNumber || getNextOrderNumber();
    const saleOrderId = order.orderId || `ORD-${orderNumber}`;
    const subtotal = order.subtotal || order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Calculate / preserve discount from held order
    let discountAmount = 0;
    let discountToSave = null;
    if (order.discount && order.discount.type) {
        if (typeof order.discount.amount === 'number') {
            discountAmount = order.discount.amount;
        } else if (order.discount.type === 'fixed') {
            discountAmount = Math.min(Number(order.discount.value || 0), subtotal);
        } else if (order.discount.type === 'percentage') {
            discountAmount = (subtotal * Number(order.discount.value || 0)) / 100;
        }
        if (discountAmount > 0) {
            discountToSave = { type: order.discount.type, value: Number(order.discount.value || 0), amount: discountAmount };
        }
    }

    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    // Exclude tax for Parcel/Delivery orders
    const paymentMethod = order.paymentMethod || 'cash';
    const tax = (paymentMethod === 'delivery' || paymentMethod === 'parcel') ? 0 : (discountedSubtotal * SALES_TAX_RATE);
    const serviceCharges = (paymentMethod === 'delivery' || paymentMethod === 'parcel') ? 0 : (discountedSubtotal * SERVICE_CHARGE_RATE);
    const total = discountedSubtotal + tax + serviceCharges;

    const newSale = {
        id: saleOrderId,
        orderId: saleOrderId,
        orderNumber: orderNumber,
        items: order.items.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity
        })),
        subtotal: subtotal,
        ...(discountToSave ? { discount: discountToSave } : {}),
        tax: tax,
        serviceCharges: serviceCharges,
        total: total,
        paymentMethod: paymentMethod,
        waiter: order.waiter || null,
        customerName: order.customerName || null,
        tableNo: order.tableNo || null,
        date: order.createdAt || new Date().toISOString()
    };

    sales.push(newSale);
    Storage.set('sales', sales);

    // Update stock quantities based on sale items
    updateStockFromSale(newSale.items);

    // Remove from hold orders
    const filtered = holdOrders.filter(o => o.id !== orderId);
    Storage.set('holdOrders', filtered);

    loadHoldOrders();

    // Refresh sales if on sales tab
    if (document.getElementById('sales')?.classList.contains('active')) {
        loadSales();
    }

    return true;
}

function printReceiptForOrder(orderId) {
    const holdOrders = Storage.get('holdOrders');
    const order = holdOrders.find(o => o.id === orderId);

    if (!order) {
        showAppToast('Order not found!', 'error');
        return;
    }

    const displayOrderNumber = (order.orderNumber || extractOrderNumber(order.orderId || order.id) || '').toString().padStart(7, '0');
    const receiptHTML = generateFullReceiptHTML(order);
    openReceiptPrintWindow(receiptHTML, `Receipt - #${displayOrderNumber}`);
}

function showCompleteOrderConfirmation() {
    if (cart.length === 0) {
        const completeOrderBtn = document.getElementById('completeOrderBtn');
        if (completeOrderBtn) {
            showButtonMessage(completeOrderBtn, 'Cart is empty!');
        }
        return;
    }

    const completeOrderBtn = document.getElementById('completeOrderBtn');
    if (!completeOrderBtn) return;

    // Get the button's computed style to match dimensions
    const btnStyle = window.getComputedStyle(completeOrderBtn);
    const buttonContainer = completeOrderBtn.parentElement;

    // Create a container div to hold both buttons side by side, matching the original button's dimensions
    const buttonsWrapper = document.createElement('div');
    // Match the button's grid column positioning and dimensions
    buttonsWrapper.style.cssText = `display: flex; gap: 4px; align-items: center; justify-content: center; padding: ${btnStyle.padding}; min-height: ${btnStyle.minHeight || '50px'}; border-radius: ${btnStyle.borderRadius}; box-shadow: ${btnStyle.boxShadow}; width: 100%;`;

    // Create tick and cross buttons - make them fit within the button space
    const tickButton = document.createElement('button');
    tickButton.className = 'action-btn';
    tickButton.style.cssText = 'background: #4caf50; font-family: "Poppins", "Inter", sans-serif; letter-spacing: 0.1px; flex: 1; height: 100%; min-height: 40px; display: flex; align-items: center; justify-content: center; padding: 0; border-radius: 8px; cursor: pointer; color: white; font-size: 18px; font-weight: bold; border: 1px solid rgba(255, 255, 255, 0.2); box-shadow: 0 2px 4px rgba(76, 175, 80, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);';
    tickButton.innerHTML = '✓';

    const crossButton = document.createElement('button');
    crossButton.className = 'action-btn';
    crossButton.style.cssText = 'background: #f44336; font-family: "Poppins", "Inter", sans-serif; letter-spacing: 0.1px; flex: 1; height: 100%; min-height: 40px; display: flex; align-items: center; justify-content: center; padding: 0; border-radius: 8px; cursor: pointer; color: white; font-size: 18px; font-weight: bold; border: 1px solid rgba(255, 255, 255, 0.2); box-shadow: 0 2px 4px rgba(244, 67, 54, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);';
    crossButton.innerHTML = '✕';

    // Add buttons to wrapper
    buttonsWrapper.appendChild(tickButton);
    buttonsWrapper.appendChild(crossButton);

    // Function to restore the Complete Order button
    const restoreCompleteButton = () => {
        const container = buttonsWrapper.parentElement;
        if (container && container.contains(buttonsWrapper)) {
            const newCompleteBtn = document.createElement('button');
            newCompleteBtn.id = 'completeOrderBtn';
            newCompleteBtn.className = 'action-btn complete-order-btn';
            newCompleteBtn.textContent = 'Complete Order';
            newCompleteBtn.onclick = () => showCompleteOrderConfirmation();
            container.replaceChild(newCompleteBtn, buttonsWrapper);
        }
    };

    tickButton.onclick = () => {
        restoreCompleteButton();
        completeOrder(true);
    };

    crossButton.onclick = () => {
        restoreCompleteButton();
    };

    // Replace Complete Order button with the buttons wrapper
    completeOrderBtn.replaceWith(buttonsWrapper);
}

function completeOrder(skipConfirmation = false) {
    if (cart.length === 0) {
        const completeOrderBtn = document.getElementById('completeOrderBtn');
        if (completeOrderBtn) {
            showButtonMessage(completeOrderBtn, 'Cart is empty!');
        }
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Calculate discount
    let discountAmount = 0;
    if (currentDiscount.type === 'fixed') {
        discountAmount = Math.min(currentDiscount.value, subtotal);
    } else if (currentDiscount.type === 'percentage') {
        discountAmount = (subtotal * currentDiscount.value) / 100;
    }

    // Calculate GST and Service Charges
    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const tax = (selectedPaymentMethod === 'delivery' || selectedPaymentMethod === 'parcel') ? 0 : discountedSubtotal * SALES_TAX_RATE;
    const serviceCharges = (selectedPaymentMethod === 'delivery' || selectedPaymentMethod === 'parcel') ? 0 : discountedSubtotal * SERVICE_CHARGE_RATE;
    const total = discountedSubtotal + tax + serviceCharges;

    // Ask to complete order (only if not skipping confirmation)
    if (!skipConfirmation) {
        showCustomConfirm('Complete this order?\n\nThe order will be saved to sales.', () => {
            completeOrder(true);
        }, null, { title: 'Complete Order', confirmText: 'Save Order', type: 'info' });
        return;
    }

    // Save to sales
    const sales = Storage.get('sales') || [];
    const orderNumber = getNextOrderNumber();
    const orderId = `ORD-${orderNumber}`;
    // Get selected waiter from dropdown
    const selectedWaiterElement = document.getElementById('selectedWaiter');
    const selectedWaiter = selectedWaiterElement ? selectedWaiterElement.value.trim() : '';

    const selectedTableElement = document.getElementById('selectedTable');
    const selectedTableNo = selectedTableElement ? selectedTableElement.value.trim() : '';

    const newSale = {
        id: orderId,
        orderId: orderId,
        orderNumber: orderNumber,
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity
        })),
        subtotal: subtotal,
        discount: {
            type: currentDiscount.type,
            value: currentDiscount.value,
            amount: discountAmount
        },
        tax: tax,
        serviceCharges: serviceCharges,
        total: total,
        paymentMethod: selectedPaymentMethod,
        waiter: selectedWaiter || null,
        tableNo: selectedTableNo || null,
        date: new Date().toISOString()
    };

    sales.push(newSale);
    Storage.set('sales', sales);

    // Update stock quantities based on sale items
    updateStockFromSale(newSale.items);

    // Clear cart after saving order
    cart = [];
    menuItemQuantities = {};
    updateCart();
    loadMenuItems();

    // Reset waiter and table selection
    resetWaiterSelection();
    resetTableSelection();

    // Refresh sales if on sales tab
    if (document.getElementById('sales')?.classList.contains('active')) {
        loadSales();
    }
}

function editHoldOrder(orderId) {
    // Require password before editing
    openActionPasswordModal(() => {
        const holdOrders = Storage.get('holdOrders');
        const order = holdOrders.find(o => o.id === orderId);

        if (!order) {
            alert('Order not found!');
            return;
        }

        // Load order items into cart
        cart = order.items.map(item => ({ ...item })); // Create a copy
        originalHoldOrderItems = order.items.map(item => ({ ...item })); // Store ORIGINAL for comparison
        editingHoldOrderId = orderId;

        editHoldOrderInternal(orderId, order);
    }, 'login');
}

function editHoldOrderInternal(orderId, order) {
    // Restore discount (if any)
    if (order.discount && order.discount.type) {
        currentDiscount = { type: order.discount.type, value: Number(order.discount.value || 0) };
    } else {
        currentDiscount = { type: null, value: 0 };
    }

    // Set payment method
    selectedPaymentMethod = order.paymentMethod || 'cash';

    // Switch to POS tab (edit page) first
    switchToTab('pos');

    // Use setTimeout to ensure tab switch completes before updating UI elements
    setTimeout(() => {
        // Update UI to show editing state
        const orderHeaderTitle = document.getElementById('orderHeaderTitle');
        const editingOrderInfo = document.getElementById('editingOrderInfo');
        const editingOrderId = document.getElementById('editingOrderId');
        const holdOrderBtn = document.getElementById('holdOrderBtn');
        const saveChangesBtn = document.getElementById('saveChangesBtn');
        const cancelEditBtn = document.getElementById('cancelEditBtn');
        const kotBtn = document.getElementById('kotBtn');
        const kotOrderBtn = document.getElementById('kotOrderBtn');
        const orderBtn = document.getElementById('orderBtn');
        const holdListBtn = document.getElementById('holdListBtn');
        const cashOrderBtn = document.getElementById('cashOrderBtn');
        const kotsBtn = document.getElementById('kotsBtn'); // New button to hide during edit

        if (orderHeaderTitle) orderHeaderTitle.textContent = 'Editing Order';
        if (editingOrderInfo) editingOrderInfo.style.display = 'block';
        if (editingOrderId) editingOrderId.textContent = order.orderId;
        if (holdOrderBtn) holdOrderBtn.style.display = 'none';
        if (holdListBtn) holdListBtn.style.display = 'none'; // Hide Hold Orders List button in edit mode
        if (cashOrderBtn) cashOrderBtn.style.display = 'none'; // Hide Cash Order button in edit mode
        if (saveChangesBtn) saveChangesBtn.style.display = 'block';
        if (cancelEditBtn) cancelEditBtn.style.display = 'block';
        if (kotBtn) kotBtn.style.display = 'none';
        if (kotOrderBtn) kotOrderBtn.style.display = 'none';
        if (orderBtn) orderBtn.style.display = 'none';
        if (kotsBtn) kotsBtn.style.display = 'none'; // Hide KOTS button in edit mode

        // Set payment method (after tab switch)
        selectPaymentMethod(selectedPaymentMethod);

        // Set waiter dropdown value if order has a waiter
        if (order.waiter) {
            loadWaitersDropdown(() => {
                const waiterSelect = document.getElementById('selectedWaiter');
                if (waiterSelect && order.waiter) {
                    // Try to find the option that matches the order's waiter
                    const waiterName = order.waiter.trim();
                    const options = waiterSelect.options;
                    let found = false;

                    for (let i = 0; i < options.length; i++) {
                        if (options[i].value === waiterName) {
                            waiterSelect.selectedIndex = i;
                            found = true;
                            break;
                        }
                    }

                    // If not found in options, try setting value directly (in case waiter was deleted)
                    if (!found && waiterName) {
                        waiterSelect.value = waiterName;
                    }
                }
            });
        } else {
            // Load dropdown and reset to default
            loadWaitersDropdown();
        }

        // Set table dropdown value if order has a table
        if (order.tableNo) {
            setSelectedTableValue(order.tableNo, `Table ${order.tableNo}`);
        } else {
            setSelectedTableValue('', '');
        }
        loadTablesDropdown();

        // Set customer name if order has one
        const customerNameInput = document.getElementById('customerNameInput');
        if (customerNameInput && order.customerName) {
            customerNameInput.value = order.customerName;
        } else if (customerNameInput) {
            customerNameInput.value = '';
        }

        // Set waiting time if order has one
        const waitingTimeInput = document.getElementById('waitingTimeInput');
        if (waitingTimeInput && order.waitingTime !== undefined && order.waitingTime !== null) {
            waitingTimeInput.value = order.waitingTime;
        } else if (waitingTimeInput) {
            waitingTimeInput.value = '';
        }

        // Update cart display after switching (to ensure it shows the loaded order)
        updateCart();
        loadMenuItems();
    }, 100);
}

function saveHoldOrderChanges() {
    if (cart.length === 0) {
        const saveChangesBtn = document.getElementById('saveChangesBtn');
        if (saveChangesBtn) {
            showButtonMessage(saveChangesBtn, 'Cart is empty! Cannot save empty order.');
        }
        return;
    }

    if (!editingHoldOrderId) {
        alert('No order being edited!');
        return;
    }

    const holdOrders = Storage.get('holdOrders');
    const orderIndex = holdOrders.findIndex(o => o.id === editingHoldOrderId);

    if (orderIndex === -1) {
        alert('Order not found!');
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Calculate discount
    let discountAmount = 0;
    if (currentDiscount.type === 'fixed') {
        discountAmount = Math.min(currentDiscount.value, subtotal);
    } else if (currentDiscount.type === 'percentage') {
        discountAmount = (subtotal * currentDiscount.value) / 100;
    }

    // Calculate GST and Service Charges
    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const tax = (selectedPaymentMethod === 'delivery' || selectedPaymentMethod === 'parcel') ? 0 : discountedSubtotal * SALES_TAX_RATE;
    const serviceCharges = (selectedPaymentMethod === 'delivery' || selectedPaymentMethod === 'parcel') ? 0 : discountedSubtotal * SERVICE_CHARGE_RATE;
    const total = discountedSubtotal + tax + serviceCharges;

    // Get selected waiter from dropdown
    const selectedWaiterElement = document.getElementById('selectedWaiter');
    const selectedWaiter = selectedWaiterElement ? selectedWaiterElement.value.trim() : '';

    const selectedTableElement = document.getElementById('selectedTable');
    const selectedTableNo = selectedTableElement ? selectedTableElement.value.trim() : '';

    // Update the order
    holdOrders[orderIndex].items = cart.map(item => ({ ...item })); // Create a copy
    holdOrders[orderIndex].subtotal = subtotal;
    if (currentDiscount.type) {
        holdOrders[orderIndex].discount = { type: currentDiscount.type, value: currentDiscount.value, amount: discountAmount };
    } else {
        delete holdOrders[orderIndex].discount;
    }
    holdOrders[orderIndex].tax = tax;
    holdOrders[orderIndex].serviceCharges = serviceCharges;
    holdOrders[orderIndex].total = total;
    holdOrders[orderIndex].paymentMethod = selectedPaymentMethod;
    holdOrders[orderIndex].waiter = selectedWaiter || null;
    holdOrders[orderIndex].tableNo = selectedTableNo || null;
    holdOrders[orderIndex].customerName = getCustomerName() || null;
    holdOrders[orderIndex].waitingTime = getWaitingTime();
    holdOrders[orderIndex].updatedAt = new Date().toISOString();

    // Identify newly added items or increased quantities for the Kitchen
    const newItemsForKOT = [];
    cart.forEach(currentItem => {
        const originalItem = originalHoldOrderItems.find(o => o.id === currentItem.id);
        if (!originalItem) {
            // Completely new item
            newItemsForKOT.push({ ...currentItem });
        } else if (currentItem.quantity > originalItem.quantity) {
            // Increased quantity - print KOT for the additional amount
            newItemsForKOT.push({
                ...currentItem,
                quantity: currentItem.quantity - originalItem.quantity
            });
        }
    });

    Storage.set('holdOrders', holdOrders);

    // Print separate KOTs for NEW items ONLY
    if (newItemsForKOT.length > 0) {
        const displayOrderNumber = holdOrders[orderIndex].orderNumber.toString().padStart(7, '0');
        const now = new Date();
        const customerName = getCustomerName() || holdOrders[orderIndex].customerName;
        const dateStr = formatDate(now);
        const timeStr = formatTime(now);
        const receiveTime = calculateReceiveTime(timeStr, now, holdOrders[orderIndex].waitingTime);
        const paymentMethod = selectedPaymentMethod;

        newItemsForKOT.forEach((item, index) => {
            const singleItemTable = formatKOTItems([item]);
            const kotHTML = `
                <div style="text-align: center; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; width: 100%; line-height: 1.2;">
                    <div style="font-size: 20px; font-weight: 900; margin-bottom: 2px;">Hangout Lounge & Co.</div>
                    <div style="font-size: 16px; font-weight: 900; margin: 3px 0;">====== KOT ======</div>
                    <div style="font-size: 14px; margin-bottom: 2px;"><strong>${t('Order No.')} ${displayOrderNumber}</strong></div>
                    <div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Customer: ${customerName ? escapeHtml(customerName) : '-'}</div>
                    <div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">${t('Date')}: ${dateStr} ${timeStr}</div>
                    ${receiveTime ? `<div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Order Receive Time: ${receiveTime}</div>` : ''}
                    <div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Waiter: ${selectedWaiter ? escapeHtml(selectedWaiter) : '-'}</div>
                    <div style="border-top: 1px dashed #000; margin: 4px 0; padding-top: 4px; width: 100%;">
                        <div style="font-size: 12px; font-weight: 700; margin-bottom: 3px; text-align: center;">${t('ITEMS:')}</div>
                        <div style="width: 100%; display: block;">
                            ${singleItemTable}
                        </div>
                    </div>
                    <div style="border-top: 1px dashed #000; margin-top: 5px; padding-top: 4px;">
                        <div style="font-size: 12px; font-weight: 700;">======================</div>
                    </div>
                </div>
            `;

            setTimeout(() => {
                printKOTWindow(kotHTML, displayOrderNumber);
            }, index * 1200);
        });
    }

    // Reset editing state
    cancelEditHoldOrder();

    // Switch back to Hold Orders tab
    switchToTab('holdOrders');

    // Refresh hold orders
    loadHoldOrders();
}

function cancelEditHoldOrder() {
    const wasEditing = editingHoldOrderId !== null;
    editingHoldOrderId = null;
    cart = [];
    originalHoldOrderItems = []; // Clear original items when cancelling/finishing edit
    menuItemQuantities = {};

    // Reset UI
    const orderHeaderTitle = document.getElementById('orderHeaderTitle');
    if (orderHeaderTitle) {
        orderHeaderTitle.textContent = `Order Details (${cart.length})`;
    }
    document.getElementById('editingOrderInfo').style.display = 'none';
    const holdOrderBtn = document.getElementById('holdOrderBtn');
    const holdListBtn = document.getElementById('holdListBtn');
    const saveChangesBtn = document.getElementById('saveChangesBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const kotBtn = document.getElementById('kotBtn');
    const kotOrderBtn = document.getElementById('kotOrderBtn');
    const orderBtn = document.getElementById('orderBtn');
    const cashOrderBtn = document.getElementById('cashOrderBtn');
    const kotsBtn = document.getElementById('kotsBtn');

    if (holdOrderBtn) holdOrderBtn.style.display = 'block';
    if (holdListBtn) holdListBtn.style.display = 'block'; // Show Hold Orders List button when not editing
    if (cashOrderBtn) cashOrderBtn.style.display = 'block'; // Show Cash Order button when not editing
    if (saveChangesBtn) saveChangesBtn.style.display = 'none';
    if (cancelEditBtn) cancelEditBtn.style.display = 'none';
    if (kotBtn) kotBtn.style.display = 'block';
    if (kotOrderBtn) kotOrderBtn.style.display = 'block';
    if (orderBtn) orderBtn.style.display = 'block';
    if (kotsBtn) kotsBtn.style.display = 'block';

    // Update cart display
    updateCart();
    loadMenuItems();

    // Switch back to Hold Orders tab if we were editing
    if (wasEditing) {
        const currentTab = document.querySelector('.tab-content.active')?.id;
        if (currentTab === 'pos') {
            document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
            document.querySelector('[data-tab="holdOrders"]')?.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById('holdOrders')?.classList.add('active');

            // Hide order section
            const orderSectionWrapper = document.getElementById('orderSectionWrapper');
            const mainContent = document.querySelector('.main-content');
            if (orderSectionWrapper) orderSectionWrapper.classList.remove('show');
            if (mainContent) mainContent.classList.remove('has-order-section');

            // Refresh hold orders
            loadHoldOrders();
        }
    }
}

function deleteHoldOrder(orderId, buttonElement) {
    // Require password before deletion
    openActionPasswordModal(() => {
        // Re-find the button element after password verification
        let btnElement = buttonElement;
        if (!btnElement || !btnElement.parentElement || !document.contains(buttonElement)) {
            // Try to find the button in the DOM by looking for the hold order
            const holdOrderCards = document.querySelectorAll('.hold-order-card, [data-order-id]');
            for (let card of holdOrderCards) {
                const orderIdAttr = card.getAttribute('data-order-id') || card.querySelector('[data-order-id]')?.getAttribute('data-order-id');
                if (orderIdAttr === orderId) {
                    const deleteBtn = card.querySelector('button[onclick*="deleteHoldOrder"], .btn-delete');
                    if (deleteBtn) {
                        btnElement = deleteBtn;
                        break;
                    }
                }
            }
            // Also try finding by onclick attribute
            if (!btnElement || !document.contains(btnElement)) {
                const allDeleteBtns = document.querySelectorAll('button[onclick*="deleteHoldOrder"]');
                for (let btn of allDeleteBtns) {
                    const onclickAttr = btn.getAttribute('onclick') || '';
                    if (onclickAttr.includes(`"${orderId}"`) || onclickAttr.includes(`'${orderId}'`) || onclickAttr.includes(`(${orderId},`)) {
                        btnElement = btn;
                        break;
                    }
                }
            }
        }

        if (btnElement && btnElement.parentElement && document.contains(btnElement)) {
            showDeleteConfirmation(btnElement, deleteHoldOrderConfirmed, orderId);
        } else {
            // If button not found, directly delete (skip confirmation)
            deleteHoldOrderConfirmed(orderId);
        }
    });
}

function deleteHoldOrderConfirmed(orderId) {
    const holdOrders = Storage.get('holdOrders');
    const filtered = holdOrders.filter(o => o.id !== orderId);
    Storage.set('holdOrders', filtered);
    loadHoldOrders();

    // If deleting the order being edited, cancel edit
    if (editingHoldOrderId === orderId) {
        cancelEditHoldOrder();
    }
}

function printReceipt() {
    if (cart.length === 0) {
        const printReceiptBtn = document.getElementById('printReceiptBtn');
        if (printReceiptBtn) {
            showButtonMessage(printReceiptBtn, 'Cart is empty!');
        }
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Calculate discount
    let discountAmount = 0;
    if (currentDiscount.type === 'fixed') {
        discountAmount = Math.min(currentDiscount.value, subtotal);
    } else if (currentDiscount.type === 'percentage') {
        discountAmount = (subtotal * currentDiscount.value) / 100;
    }

    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const tax = (selectedPaymentMethod === 'delivery' || selectedPaymentMethod === 'parcel') ? 0 : discountedSubtotal * SALES_TAX_RATE;
    const serviceCharges = (selectedPaymentMethod === 'delivery' || selectedPaymentMethod === 'parcel') ? 0 : discountedSubtotal * SERVICE_CHARGE_RATE;
    const total = discountedSubtotal + tax + serviceCharges;

    // Skip confirmation - directly complete and print
    // Save to sales
    const sales = Storage.get('sales');
    const orderNumber = getNextOrderNumber();
    const orderId = `ORD-${orderNumber}`;

    // Get selected waiter and table details
    const selectedWaiterElement = document.getElementById('selectedWaiter');
    const selectedWaiter = selectedWaiterElement ? selectedWaiterElement.value.trim() : '';

    const selectedTableElement = document.getElementById('selectedTable');
    const selectedTableNo = selectedTableElement ? selectedTableElement.value.trim() : '';

    const newSale = {
        id: orderId,
        orderId: orderId,
        orderNumber: orderNumber,
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity
        })),
        subtotal: subtotal,
        ...(currentDiscount.type ? {
            discount: { type: currentDiscount.type, value: currentDiscount.value, amount: discountAmount }
        } : {}),
        tax: tax,
        serviceCharges: serviceCharges,
        total: total,
        paymentMethod: selectedPaymentMethod,
        waiter: selectedWaiter || null,
        tableNo: selectedTableNo || null,
        customerName: getCustomerName() || null,
        waitingTime: getWaitingTime(),
        date: new Date().toISOString()
    };

    sales.push(newSale);
    Storage.set('sales', sales);

    // Update stock quantities based on sale items
    updateStockFromSale(newSale.items);

    const displayOrderNumber = orderNumber.toString().padStart(7, '0');
    const now = new Date();
    const customerName = getCustomerName();

    // Create receipt content via standard generator
    const receipt = generateFullReceiptHTML(newSale);

    // Create KOT (Kitchen Order Ticket) - same details, items without prices
    const kotItemsTable2 = formatKOTItems(cart);
    const receiveTime2 = calculateReceiveTime(formatTime(now), now, newSale.waitingTime);
    const kotHTML2 = `
        <div style="text-align: center; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; width: 100%; line-height: 1.2;">
            <div style="font-size: 20px; font-weight: 900; margin-bottom: 2px;">Hangout Lounge & Co.</div>

            <div style="font-size: 16px; font-weight: 900; margin: 3px 0;">====== KOT ======</div>
            <div style="font-size: 14px; margin-bottom: 2px;"><strong>${t('Order No.')} ${displayOrderNumber}</strong></div>
            <div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Customer: ${customerName ? escapeHtml(customerName) : '-'}</div>
            <div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">${t('Date')}: ${formatDate(now)} ${formatTime(now)}</div>
            ${receiveTime2 ? `<div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Order Receive Time: ${receiveTime2}</div>` : ''}
            ${selectedTableNo ? `<div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Table No: ${escapeHtml(selectedTableNo)}</div>` : ''}
            <div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Waiter: ${selectedWaiter ? escapeHtml(selectedWaiter) : '-'}</div>
            <div style="border-top: 1px dashed #000; margin: 4px 0; padding-top: 4px; width: 100%;">
                <div style="font-size: 12px; font-weight: 700; margin-bottom: 3px; text-align: center;">${t('ITEMS:')}</div>
                <div style="width: 100%; display: block;">
                    ${kotItemsTable2}
                </div>
            </div>
            <div style="border-top: 1px dashed #000; margin-top: 5px; padding-top: 4px;">
                <div style="font-size: 12px; font-weight: 700;">======================</div>
            </div>
        </div>
    `;

    // Clear cart after saving order
    cart = [];
    menuItemQuantities = {};
    updateCart();
    loadMenuItems();
    resetWaiterSelection();
    resetTableSelection();
    resetCustomerName();
    resetWaitingTime();

    // Refresh sales if on sales tab
    if (document.getElementById('sales')?.classList.contains('active')) {
        loadSales();
    }

    // Print customer receipt (separate window)
    openReceiptPrintWindow(receipt, `Customer Receipt - #${displayOrderNumber}`);

    // Print KOT (separate window, after a short delay)
    setTimeout(() => {
        printKOTWindow(kotHTML2, displayOrderNumber);
    }, 800);
}

// Helper function to save order and generate receipt/KOT content
function saveOrderAndGenerateContent() {
    if (cart.length === 0) {
        return null;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Calculate discount
    let discountAmount = 0;
    if (currentDiscount.type === 'fixed') {
        discountAmount = Math.min(currentDiscount.value, subtotal);
    } else if (currentDiscount.type === 'percentage') {
        discountAmount = (subtotal * currentDiscount.value) / 100;
    }

    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    // Exclude tax for Parcel/Delivery orders
    const tax = (selectedPaymentMethod === 'delivery' || selectedPaymentMethod === 'parcel') ? 0 : (discountedSubtotal * SALES_TAX_RATE);
    const serviceCharges = (selectedPaymentMethod === 'delivery' || selectedPaymentMethod === 'parcel') ? 0 : (discountedSubtotal * SERVICE_CHARGE_RATE);
    const total = discountedSubtotal + tax + serviceCharges;

    // Get selected waiter and table details
    const selectedWaiterElement = document.getElementById('selectedWaiter');
    const selectedWaiter = selectedWaiterElement ? selectedWaiterElement.value.trim() : '';

    const selectedTableElement = document.getElementById('selectedTable');
    const selectedTableNo = selectedTableElement ? selectedTableElement.value.trim() : '';

    // Save to sales
    const sales = Storage.get('sales');
    const orderNumber = getNextOrderNumber();
    const orderId = `ORD-${orderNumber}`;
    const newSale = {
        id: orderId,
        orderId: orderId,
        orderNumber: orderNumber,
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity
        })),
        subtotal: subtotal,
        ...(currentDiscount.type ? {
            discount: { type: currentDiscount.type, value: currentDiscount.value, amount: discountAmount }
        } : {}),
        tax: tax,
        serviceCharges: serviceCharges,
        total: total,
        paymentMethod: selectedPaymentMethod,
        waiter: selectedWaiter || null,
        tableNo: selectedTableNo || null,
        customerName: getCustomerName() || null,
        waitingTime: getWaitingTime(),
        date: new Date().toISOString()
    };

    sales.push(newSale);
    Storage.set('sales', sales);

    // Update stock quantities based on sale items
    updateStockFromSale(newSale.items);

    const displayOrderNumber = orderNumber.toString().padStart(7, '0');
    const now = new Date();

    // Get customer name from input
    const customerName = getCustomerName();

    // Create receipt content via standard generator
    const receipt = generateFullReceiptHTML(newSale);

    // Create KOT (Kitchen Order Ticket) - same details, items without prices
    const kotItemsTable3 = formatKOTItems(cart);
    const receiveTime3 = calculateReceiveTime(formatTime(now), now, newSale.waitingTime);
    const kotHTML3 = `
        <div style="text-align: center; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; width: 100%; line-height: 1.2;">
            <div style="font-size: 20px; font-weight: 900; margin-bottom: 2px;">Hangout Lounge & Co.</div>

            <div style="font-size: 16px; font-weight: 900; margin: 3px 0;">====== KOT ======</div>
            <div style="font-size: 14px; margin-bottom: 2px;"><strong>${t('Order No.')} ${displayOrderNumber}</strong></div>
            <div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Customer: ${customerName ? escapeHtml(customerName) : '-'}</div>
            <div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">${t('Date')}: ${formatDate(now)} ${formatTime(now)}</div>
            ${receiveTime3 ? `<div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Order Receive Time: ${receiveTime3}</div>` : ''}
            ${selectedTableNo ? `<div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Table No: ${escapeHtml(selectedTableNo)}</div>` : ''}
            <div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Waiter: ${selectedWaiter ? escapeHtml(selectedWaiter) : '-'}</div>
            <div style="border-top: 1px dashed #000; margin: 4px 0; padding-top: 4px; width: 100%;">
                <div style="font-size: 12px; font-weight: 700; margin-bottom: 3px; text-align: center;">${t('ITEMS:')}</div>
                <div style="width: 100%; display: block;">
                    ${kotItemsTable3}
                </div>
            </div>
            <div style="border-top: 1px dashed #000; margin-top: 5px; padding-top: 4px;">
                <div style="font-size: 12px; font-weight: 700;">======================</div>
            </div>
        </div>
    `;
    const kot = kotHTML3; // Keep variable name for compatibility

    // Clear cart after saving order
    cart = [];
    menuItemQuantities = {};
    updateCart();
    loadMenuItems();

    // Reset waiter selection
    resetWaiterSelection();
    resetTableSelection();

    // Reset customer name and waiting time
    resetCustomerName();
    resetWaitingTime();

    // Refresh sales if on sales tab
    if (document.getElementById('sales')?.classList.contains('active')) {
        loadSales();
    }

    return {
        receipt,
        kot,
        displayOrderNumber
    };
}

// Helper function to print KOT
function printKOTWindow(kotHTML, displayOrderNumber) {
    const kotWindow = window.open('', '_blank');
    if (!kotWindow) return;

    kotWindow.document.open();
    kotWindow.document.write(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>KOT - ${displayOrderNumber || ''}</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
                <style>
                    *, *::before, *::after {
                        box-sizing: border-box;
                        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
                    }
                    body, div, span, p, h1, h2, h3, h4, table, th, td, tr, b, strong {
                        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
                    }
                    body {
                        padding: 8px;
                        font-size: 12px;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: center;
                        min-height: auto;
                        margin: 0 auto;
                        max-width: 80mm;
                        background: #fff;
                        color: #000;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .receipt-logo {
                        max-width: 120px;
                        max-height: 120px;
                        width: auto;
                        height: auto;
                        margin-bottom: 5px;
                        display: block;
                        object-fit: contain;
                    }
                    @media print {
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                        body {
                            padding: 3mm 0;
                            margin: 0;
                            min-height: auto;
                            display: block;
                            height: auto;
                            max-width: 100%;
                            width: 100%;
                            background: #fff;
                            color: #000;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                        .receipt-logo {
                            max-width: 100px;
                            max-height: 100px;
                            margin-bottom: 4px;
                        }
                        @page {
                            size: 80mm auto;
                            margin: 3mm;
                        }
                    }
                </style>
            </head>
            <body>
                <div id="kotContent" style="width: 100%;">${kotHTML}</div>
                <script>
                    var hasPrinted = false;
                    function triggerPrint() {
                        if (hasPrinted) return;
                        hasPrinted = true;
                        try {
                            window.focus();
                            window.print();
                        } catch(e) {
                            console.error(e);
                        }
                    }
                    window.addEventListener('afterprint', function() {
                        setTimeout(function() {
                            try { window.close(); } catch(e) {}
                        }, 150);
                    });
                    function schedulePrint() {
                        if (document.fonts && document.fonts.ready) {
                            document.fonts.ready.then(function() {
                                if (window.requestAnimationFrame) {
                                    window.requestAnimationFrame(function() {
                                        window.requestAnimationFrame(function() {
                                            setTimeout(triggerPrint, 250);
                                        });
                                    });
                                } else {
                                    setTimeout(triggerPrint, 250);
                                }
                            }).catch(function() {
                                setTimeout(triggerPrint, 250);
                            });
                        } else {
                            if (window.requestAnimationFrame) {
                                window.requestAnimationFrame(function() {
                                    window.requestAnimationFrame(function() {
                                        setTimeout(triggerPrint, 250);
                                    });
                                });
                            } else {
                                setTimeout(triggerPrint, 250);
                            }
                        }
                    }
                    if (document.readyState === 'complete') {
                        schedulePrint();
                    } else {
                        window.addEventListener('load', schedulePrint, { once: true });
                        setTimeout(schedulePrint, 500);
                    }
                </script>
            </body>
        </html>
    `);
    kotWindow.document.close();
}

// Helper function to print Order receipt
function printOrderWindow(receipt, displayOrderNumber) {
    if (!receipt) return;
    openReceiptPrintWindow(receipt, `Customer Receipt - #${displayOrderNumber}`);
}

// Print only KOT
// Function to hold order and generate content (for KOT and KOT+Order buttons)
function holdOrderAndGenerateContent() {
    if (cart.length === 0) {
        return null;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Calculate discount
    let discountAmount = 0;
    if (currentDiscount.type === 'fixed') {
        discountAmount = Math.min(currentDiscount.value, subtotal);
    } else if (currentDiscount.type === 'percentage') {
        discountAmount = (subtotal * currentDiscount.value) / 100;
    }

    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    // Exclude tax for Parcel/Delivery orders
    const tax = (selectedPaymentMethod === 'delivery' || selectedPaymentMethod === 'parcel') ? 0 : (discountedSubtotal * SALES_TAX_RATE);
    const serviceCharges = (selectedPaymentMethod === 'delivery' || selectedPaymentMethod === 'parcel') ? 0 : (discountedSubtotal * SERVICE_CHARGE_RATE);
    const total = discountedSubtotal + tax + serviceCharges;

    // Save to holdOrders instead of sales
    const holdOrders = Storage.get('holdOrders') || [];
    const orderNumber = getNextOrderNumber();
    const orderId = `ORD-${orderNumber}`;
    const now = new Date();

    // Get selected waiter and table details
    const selectedWaiterElement = document.getElementById('selectedWaiter');
    const selectedWaiter = selectedWaiterElement ? selectedWaiterElement.value.trim() : '';

    const selectedTableElement = document.getElementById('selectedTable');
    const selectedTableNo = selectedTableElement ? selectedTableElement.value.trim() : '';

    const heldOrder = {
        id: orderId,
        orderId: orderId,
        orderNumber: orderNumber,
        date: formatDate(now),
        time: formatTime(now),
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity
        })),
        subtotal: subtotal,
        ...(currentDiscount.type ? {
            discount: { type: currentDiscount.type, value: currentDiscount.value, amount: discountAmount }
        } : {}),
        tax: tax,
        serviceCharges: serviceCharges,
        total: total,
        paymentMethod: selectedPaymentMethod,
        waiter: selectedWaiter || null,
        tableNo: selectedTableNo || null,
        customerName: getCustomerName() || null,
        waitingTime: getWaitingTime(),
        status: 'pending',
        createdAt: now.toISOString()
    };

    holdOrders.push(heldOrder);
    Storage.set('holdOrders', holdOrders);

    const displayOrderNumber = orderNumber.toString().padStart(7, '0');

    // Get customer name
    const customerName = getCustomerName();

    // Create receipt content
    const receipt = generateFullReceiptHTML(heldOrder);

    // Create KOT (Kitchen Order Ticket) - same details, items without prices
    const kotItemsTable4 = formatKOTItems(cart);
    const receiveTime4 = calculateReceiveTime(heldOrder.time, heldOrder.date, heldOrder.waitingTime);
    const kotHTML4 = `
        <div style="text-align: center; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; width: 100%; line-height: 1.2;">
            <div style="font-size: 20px; font-weight: 900; margin-bottom: 2px;">Hangout Lounge & Co.</div>

            <div style="font-size: 16px; font-weight: 900; margin: 3px 0;">====== KOT ======</div>
            <div style="font-size: 14px; margin-bottom: 2px;"><strong>${t('Order No.')} ${displayOrderNumber}</strong></div>
            <div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Customer: ${customerName ? escapeHtml(customerName) : '-'}</div>
            <div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">${t('Date')}: ${heldOrder.date} ${heldOrder.time}</div>
            ${receiveTime4 ? `<div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Order Receive Time: ${receiveTime4}</div>` : ''}
            ${selectedTableNo ? `<div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Table No: ${escapeHtml(selectedTableNo)}</div>` : ''}
            <div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Waiter: ${heldOrder.waiter ? escapeHtml(heldOrder.waiter) : (selectedWaiter ? escapeHtml(selectedWaiter) : '-')}</div>
            <div style="border-top: 1px dashed #000; margin: 4px 0; padding-top: 4px; width: 100%;">
                <div style="font-size: 12px; font-weight: 700; margin-bottom: 3px; text-align: center;">${t('ITEMS:')}</div>
                <div style="width: 100%; display: block;">
                    ${kotItemsTable4}
                </div>
            </div>
            <div style="border-top: 1px dashed #000; margin-top: 5px; padding-top: 4px;">
                <div style="font-size: 12px; font-weight: 700;">======================</div>
            </div>
        </div>
    `;
    const kot = kotHTML4; // Keep variable name for compatibility

    // Clear cart after holding order
    cart = [];
    menuItemQuantities = {};
    updateCart();
    loadMenuItems();

    // Reset waiter selection
    resetWaiterSelection();
    resetTableSelection();

    // Reset customer name and waiting time
    resetCustomerName();
    resetWaitingTime();

    // Refresh hold orders if on hold orders tab
    if (document.getElementById('holdOrders')?.classList.contains('active')) {
        loadHoldOrders();
    }

    return {
        receipt,
        kot,
        displayOrderNumber,
        waitingTime: heldOrder.waitingTime
    };
}

window.printKOT = function () {
    if (cart.length === 0) {
        const kotBtn = document.getElementById('kotBtn');
        if (kotBtn) {
            showButtonMessage(kotBtn, 'Cart is empty!');
        }
        return;
    }

    const content = holdOrderAndGenerateContent();
    if (content) {
        printKOTWindow(content.kot, content.displayOrderNumber);
    }
};

// Print separate KOTs for each item in cart
window.printSeparateKOTs = function () {
    if (cart.length === 0) {
        const separateKOTsBtn = document.getElementById('separateKOTsBtn') || document.getElementById('kotsBtn');
        if (separateKOTsBtn) {
            showButtonMessage(separateKOTsBtn, 'Cart is empty!');
        }
        return;
    }

    // Capture cart items before clearing
    const cartCopy = cart.map(item => ({ ...item }));
    const customerName = getCustomerName();
    const selectedWaiterElement = document.getElementById('selectedWaiter');
    const selectedWaiter = selectedWaiterElement ? selectedWaiterElement.value.trim() : '';
    
    const selectedTableElement = document.getElementById('selectedTable');
    const selectedTableNo = selectedTableElement ? selectedTableElement.value.trim() : '';
    
    const paymentMethod = selectedPaymentMethod;

    // Save order to hold orders (this clears the real cart and provides order number)
    const content = holdOrderAndGenerateContent();

    if (content) {
        const displayOrderNumber = content.displayOrderNumber;
        const now = new Date();
        const dateStr = formatDate(now);
        const timeStr = formatTime(now);
        const receiveTime = calculateReceiveTime(timeStr, now, content.waitingTime);

        // Print separate KOT for each item in the original cart
        cartCopy.forEach((item, index) => {
            // For each item, create a one-item KOT HTML
            const singleItemTable = formatKOTItems([item]);
            const kotHTML = `
                <div style="text-align: center; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; width: 100%; line-height: 1.2;">
                    <div style="font-size: 20px; font-weight: 900; margin-bottom: 2px;">Hangout Lounge & Co.</div>
                    <div style="font-size: 16px; font-weight: 900; margin: 3px 0;">====== KOT ======</div>
                    <div style="font-size: 14px; margin-bottom: 2px;"><strong>${t('Order No.')} ${displayOrderNumber}</strong></div>
                    <div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Customer: ${customerName ? escapeHtml(customerName) : '-'}</div>
                    <div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">${t('Date')}: ${dateStr} ${timeStr}</div>
                    ${receiveTime ? `<div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Order Receive Time: ${receiveTime}</div>` : ''}
                    ${selectedTableNo ? `<div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Table No: ${escapeHtml(selectedTableNo)}</div>` : ''}
                    <div style="font-size: 12px; font-weight: 700; margin-bottom: 2px;">Waiter: ${selectedWaiter ? escapeHtml(selectedWaiter) : '-'}</div>
                    <div style="border-top: 1px dashed #000; margin: 4px 0; padding-top: 4px; width: 100%;">
                        <div style="font-size: 12px; font-weight: 700; margin-bottom: 3px; text-align: center;">${t('ITEMS:')}</div>
                        <div style="width: 100%; display: block;">
                            ${singleItemTable}
                        </div>
                    </div>
                    <div style="border-top: 1px dashed #000; margin-top: 5px; padding-top: 4px;">
                        <div style="font-size: 12px; font-weight: 700;">======================</div>
                    </div>
                </div>
            `;

            // Stagger separate KOT windows to ensure reliable sequential printing
            setTimeout(() => {
                printKOTWindow(kotHTML, displayOrderNumber);
            }, index * 800);
        });
    }
};

// Print only Order receipt
window.printOrder = function () {
    if (cart.length === 0) {
        const orderBtn = document.getElementById('orderBtn');
        if (orderBtn) {
            showButtonMessage(orderBtn, 'Cart is empty!');
        }
        return;
    }

    const content = saveOrderAndGenerateContent();
    if (content) {
        printOrderWindow(content.receipt, content.displayOrderNumber);
    }
};

// Process Cash Order - Save sale, print receipt, clear cart (no hold order, no KOT)
window.processCashOrder = function () {
    if (cart.length === 0) {
        const cashOrderBtn = document.getElementById('cashOrderBtn');
        if (cashOrderBtn) {
            showButtonMessage(cashOrderBtn, 'Cart is empty!');
        }
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Calculate discount
    let discountAmount = 0;
    if (currentDiscount.type === 'fixed') {
        discountAmount = Math.min(currentDiscount.value, subtotal);
    } else if (currentDiscount.type === 'percentage') {
        discountAmount = (subtotal * currentDiscount.value) / 100;
    }

    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    // Exclude tax for Parcel/Delivery orders
    const tax = (selectedPaymentMethod === 'delivery' || selectedPaymentMethod === 'parcel') ? 0 : (discountedSubtotal * SALES_TAX_RATE);
    const serviceCharges = (selectedPaymentMethod === 'delivery' || selectedPaymentMethod === 'parcel') ? 0 : (discountedSubtotal * SERVICE_CHARGE_RATE);
    const total = discountedSubtotal + tax + serviceCharges;

    // Get selected waiter and table details
    const selectedWaiterElement = document.getElementById('selectedWaiter');
    const selectedWaiter = selectedWaiterElement ? selectedWaiterElement.value.trim() : '';

    const selectedTableElement = document.getElementById('selectedTable');
    const selectedTableNo = selectedTableElement ? selectedTableElement.value.trim() : '';

    // Save to sales
    const sales = Storage.get('sales');
    const orderNumber = getNextOrderNumber();
    const orderId = `ORD-${orderNumber}`;
    const newSale = {
        id: orderId,
        orderId: orderId,
        orderNumber: orderNumber,
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity
        })),
        subtotal: subtotal,
        ...(currentDiscount.type ? {
            discount: { type: currentDiscount.type, value: currentDiscount.value, amount: discountAmount }
        } : {}),
        tax: tax,
        serviceCharges: serviceCharges,
        total: total,
        paymentMethod: selectedPaymentMethod,
        waiter: selectedWaiter || null,
        tableNo: selectedTableNo || null,
        customerName: getCustomerName() || null,
        waitingTime: getWaitingTime(),
        date: new Date().toISOString()
    };

    sales.push(newSale);
    Storage.set('sales', sales);

    // Update stock quantities based on sale items
    updateStockFromSale(newSale.items);

    const displayOrderNumber = orderNumber.toString().padStart(7, '0');

    // Create customer receipt content
    const receipt = generateFullReceiptHTML(newSale);

    // Print customer receipt
    printOrderWindow(receipt, displayOrderNumber);

    // Clear cart after saving order
    cart = [];
    menuItemQuantities = {};
    updateCart();
    loadMenuItems();

    // Reset waiter and table selection
    resetWaiterSelection();
    resetTableSelection();

    // Reset customer name and waiting time
    resetCustomerName();
    resetWaitingTime();

    // Refresh sales if on sales tab
    if (document.getElementById('sales')?.classList.contains('active')) {
        loadSales();
    }
};

// Print both KOT and Order
window.printKOTAndOrder = function () {
    if (cart.length === 0) {
        const kotOrderBtn = document.getElementById('kotOrderBtn');
        if (kotOrderBtn) {
            showButtonMessage(kotOrderBtn, 'Cart is empty!');
        }
        return;
    }

    const content = holdOrderAndGenerateContent();
    if (content) {
        // Print 1 KOT receipt containing all items
        printKOTWindow(content.kot, content.displayOrderNumber);

        // Print 1 Customer Order receipt after a delay
        setTimeout(() => {
            printOrderWindow(content.receipt, content.displayOrderNumber);
        }, 800);
    }
};

function resetAllData() {
    showCustomConfirm('⚠️ WARNING: This will delete ALL data!\n\nThis includes:\n- All menu items and categories\n- All sales records\n- All employees and payouts\n- All expenses\n- All tables\n- All hold orders\n- All favorites\n\nThis action cannot be undone!\n\nAre you absolutely sure you want to reset all data?', () => {
        showCustomConfirm('This is your last chance to cancel.\n\nClick "Permanently Delete" to wipe ALL data.', () => {
            const keysToClear = [
                'menuCategories',
                'menuItems',
                'menuItemOrder',
                'favorites',
                'holdOrders',
                'sales',
                'employees',
                'expenseCategories',
                'expenses',
                'tables',
                'dishes'
            ];

            keysToClear.forEach(key => {
                localStorage.removeItem(key);
            });

            cart = [];
            menuItemQuantities = {};
            editingHoldOrderId = null;
            selectedPaymentMethod = 'cash';

            loadCategories();
            loadMenuItems();
            updateCart();
            loadMenuCategories();
            loadMenuItemsList();
            updateCategoryDropdowns();
            loadSales();
            loadEmployees();
            loadExpenses();
            loadStock();
            loadTables();
            loadHoldOrders();
            loadDashboard();

            if (document.getElementById('dashboard')) {
                initCharts();
            }

            setTimeout(() => {
                selectPaymentMethod('cash');
            }, 100);

            showCustomAlert('All data has been reset successfully!');
        }, null, { title: 'Final Warning', confirmText: 'Permanently Delete', type: 'danger' });
    }, null, { title: 'Reset All Data', confirmText: 'Yes, Reset All', type: 'danger' });
}

function processPayment() {
    if (cart.length === 0) {
        // Find the payment button - it might be in different places
        const paymentBtn = document.querySelector('.place-order-btn') || document.querySelector('button[onclick*="processPayment"]');
        if (paymentBtn) {
            showButtonMessage(paymentBtn, 'Cart is empty!');
        }
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Calculate discount
    let discountAmount = 0;
    if (currentDiscount.type === 'fixed') {
        discountAmount = Math.min(currentDiscount.value, subtotal);
    } else if (currentDiscount.type === 'percentage') {
        discountAmount = (subtotal * currentDiscount.value) / 100;
    }

    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    // Exclude tax for Parcel/Delivery orders
    const tax = (selectedPaymentMethod === 'delivery' || selectedPaymentMethod === 'parcel') ? 0 : (discountedSubtotal * SALES_TAX_RATE);
    const serviceCharges = (selectedPaymentMethod === 'delivery' || selectedPaymentMethod === 'parcel') ? 0 : (discountedSubtotal * SERVICE_CHARGE_RATE);
    const total = discountedSubtotal + tax + serviceCharges;

    showCustomConfirm(`Place order for Rs.${formatNumber(total)}?`, () => {
        // Record sales as a single order
        const sales = Storage.get('sales');
        const orderNumber = getNextOrderNumber();
        const orderId = `ORD-${orderNumber}`;
        // Get selected waiter from dropdown
        const selectedWaiterElement = document.getElementById('selectedWaiter');
        const selectedWaiter = selectedWaiterElement ? selectedWaiterElement.value.trim() : '';

        const selectedTableElement = document.getElementById('selectedTable');
        const selectedTableNo = selectedTableElement ? selectedTableElement.value.trim() : '';

        const newSale = {
            id: orderId,
            orderId: orderId,
            orderNumber: orderNumber,
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                total: item.price * item.quantity
            })),
            subtotal: subtotal,
            ...(currentDiscount.type ? {
                discount: { type: currentDiscount.type, value: currentDiscount.value, amount: discountAmount }
            } : {}),
            tax: tax,
            serviceCharges: serviceCharges,
            total: total,
            paymentMethod: selectedPaymentMethod,
            waiter: selectedWaiter || null,
            tableNo: selectedTableNo || null,
            date: new Date().toISOString()
        };

        sales.push(newSale);
        Storage.set('sales', sales);

        // Update stock quantities based on sale items
        updateStockFromSale(newSale.items);

        // Clear cart
        cart = [];
        menuItemQuantities = {};
        updateCart();
        loadMenuItems();

        // Reset waiter and table selection
        resetWaiterSelection();
        resetTableSelection();

        // Refresh sales if on sales tab
        if (document.getElementById('sales')?.classList.contains('active')) {
            loadSales();
        }
    }, null, { title: 'Place Order', confirmText: 'Place Order', type: 'info' });
}

// Official Menu Definition from Menu WMC (Hangout Lounge & Co.)
const HANGOUT_WMC_MENU = [
    {
        category: "Parathas",
        items: [
            { name: "Plain Spiral Paratha", price: 60 },
            { name: "Sweet Paratha", price: 70 },
            { name: "Nutella Paratha", price: 160 },
            { name: "Cheese Paratha", price: 160 },
            { name: "Aalu Paratha", price: 110 },
            { name: "Aalu Chicken Paratha", price: 160 },
            { name: "Chicken Paratha", price: 200 }
        ]
    },
    {
        category: "Toasts",
        items: [
            { name: "Plain Toast (2 pcs)", price: 40 },
            { name: "Milky Toast (2 pcs)", price: 50 },
            { name: "French Toast (2 pcs)", price: 120 },
            { name: "Toast + Jam (2 pcs)", price: 80 },
            { name: "Toast + Butter (2 Pcs)", price: 100 },
            { name: "Toast + Butter n Jam (2 pcs)", price: 120 }
        ]
    },
    {
        category: "Eggs",
        items: [
            { name: "Boiled Egg", price: 60 },
            { name: "Omelet Plain", price: 80 },
            { name: "Fry Egg (half/full)", price: 70 },
            { name: "Mushroom Omelet", price: 130 },
            { name: "Cheese Omelet", price: 130 },
            { name: "Mushroom Cheese Omelet", price: 150 },
            { name: "Scrambled Egg", price: 70 }
        ]
    },
    {
        category: "Teas & Coffees",
        items: [
            { name: "Tea Plain", price: 70 },
            { name: "Cardamom Tea", price: 110 },
            { name: "Cinnamon Tea", price: 110 },
            { name: "Green Tea", price: 60 },
            { name: "Cappuccino", price: 240 },
            { name: "Latte", price: 240 },
            { name: "Black Coffee / Tea", price: 200 },
            { name: "Black Coffee / Tea (with milk)", price: 240 }
        ]
    },
    {
        category: "Fries",
        items: [
            { name: "Potato Spiral", price: 160 },
            { name: "Plain Fries", price: 110 },
            { name: "Garlic Mayo Fries", price: 150 },
            { name: "Loaded Fries", price: 290 }
        ]
    },
    {
        category: "Sandwiches",
        items: [
            { name: "Chicken Spread Sandwich", price: 170 },
            { name: "Egg Sandwich", price: 140 },
            { name: "Chicken Sandwich", price: 200 },
            { name: "Salsa Sandwich", price: 200 },
            { name: "Nutella Sandwich", price: 200 }
        ]
    },
    {
        category: "Burgers",
        items: [
            { name: "Z Burger", price: 310 },
            { name: "Petty Burger", price: 250 },
            { name: "Shami Burger", price: 140 },
            { name: "Anda Shami Burger", price: 160 }
        ]
    },
    {
        category: "Fried Munching",
        items: [
            { name: "Honey Wings (4 pcs)", price: 220 },
            { name: "Spicy Wings", price: 200 },
            { name: "Chicken Chunks", price: 330 },
            { name: "Nuggets (6 pcs)", price: 200 },
            { name: "Sliced Chicken", price: 240 },
            { name: "Finger Fish (3 pcs)", price: 510 }
        ]
    },
    {
        category: "Desi Chatkhara",
        items: [
            { name: "Gol Gappay", price: 200 },
            { name: "Samosa Chat", price: 150 },
            { name: "Papri Chat", price: 150 },
            { name: "Dahi Bhallay", price: 150 },
            { name: "Samosa (veg)", price: 50 },
            { name: "Samosa Chicken", price: 70 },
            { name: "Chicken Veg Rolls", price: 60 }
        ]
    },
    {
        category: "Khaba",
        items: [
            { name: "Biryani", price: 220 },
            { name: "Pullao", price: 220 },
            { name: "Naan Chanay", price: 160 },
            { name: "Daal", price: 150 },
            { name: "Vegetable", price: 150 },
            { name: "Shami Kebab (2 pcs)", price: 110 },
            { name: "Cutlets (2 pcs)", price: 85 },
            { name: "Seekh Kebab Handi", price: 740 },
            { name: "Chicken Chow-mein", price: 250 },
            { name: "Pasta White Sauce", price: 350 }
        ]
    },
    {
        category: "Salad Bar",
        items: [
            { name: "Fresh Salad", price: 100 },
            { name: "Crunchy Peanut Salad", price: 150 },
            { name: "Russian Salad", price: 200 },
            { name: "Beets Salad", price: 150 },
            { name: "Tortilla Salad", price: 180 },
            { name: "All Green Cauli Power", price: 180 }
        ]
    },
    {
        category: "Cold Bar",
        items: [
            { name: "Shakes", price: 200 },
            { name: "Chillers", price: 180 },
            { name: "Fresh Juices", price: 180 },
            { name: "Cold Coffee", price: 240 },
            { name: "Juices (tetra pack)", price: 100 },
            { name: "Cold Drinks (Pepsi/Coke/Murree Brewery/Gourmet)", price: 80 },
            { name: "Lassi (sweet/saltish)", price: 120 }
        ]
    },
    {
        category: "Pizzas",
        items: [
            { name: "Special Pizza (Starting by Nov 15th, 2026)", price: 0 }
        ]
    }
];

function seedHangoutWmcMenu(forceReplace = false) {
    let menuCategories = forceReplace ? [] : (Storage.get('menuCategories') || []);
    let menuItems = forceReplace ? [] : (Storage.get('menuItems') || []);
    let itemOrder = forceReplace ? {} : (Storage.get('menuItemOrder') || {});

    const baseId = Date.now();

    HANGOUT_WMC_MENU.forEach((catData, catIndex) => {
        let category = menuCategories.find(c => (c.name || '').trim().toLowerCase() === catData.category.trim().toLowerCase());
        if (!category) {
            category = {
                id: baseId + (catIndex * 1000) + 1,
                name: catData.category
            };
            menuCategories.push(category);
        }

        const catKey = category.id.toString();
        if (!itemOrder[catKey]) {
            itemOrder[catKey] = [];
        }

        catData.items.forEach((itemData, itemIndex) => {
            let existingItem = menuItems.find(i => 
                (String(i.categoryId) === String(category.id)) &&
                (i.name || '').trim().toLowerCase() === itemData.name.trim().toLowerCase()
            );

            if (!existingItem) {
                const newItem = {
                    id: baseId + (catIndex * 1000) + itemIndex + 10,
                    categoryId: category.id,
                    name: itemData.name,
                    price: itemData.price,
                    image: null
                };
                menuItems.push(newItem);
                if (!itemOrder[catKey].includes(newItem.id)) {
                    itemOrder[catKey].push(newItem.id);
                }
            } else if (forceReplace) {
                existingItem.price = itemData.price;
            }
        });
    });

    Storage.set('menuCategories', menuCategories);
    Storage.set('menuItems', menuItems);
    Storage.set('menuItemOrder', itemOrder);
    localStorage.setItem('hangout_menu_wmc_loaded', 'true');

    // Automatically sync stock items
    if (typeof syncAndGetStockItems === 'function') {
        syncAndGetStockItems();
    }
}

window.promptReloadWmcMenu = function promptReloadWmcMenu() {
    showCustomConfirm(
        'Do you want to load the Hangout Cafe menu (Menu WMC)? This will populate all official categories and menu items.',
        () => {
            seedHangoutWmcMenu(false);
            if (typeof loadMenuItemsList === 'function') loadMenuItemsList();
            if (typeof loadMenuCategories === 'function') loadMenuCategories();
            if (typeof updateCategoryDropdowns === 'function') updateCategoryDropdowns();
            if (typeof loadCategories === 'function') loadCategories();
            if (typeof loadMenuItems === 'function') loadMenuItems();
            showCustomAlert('Hangout Cafe menu items and categories loaded successfully!', 'Success');
        },
        null,
        {
            title: 'Load Hangout Cafe Menu',
            confirmText: 'Load Menu',
            type: 'info'
        }
    );
};

// Initialize menu structure
function initializeMenuStructure() {
    let menuCategories = Storage.get('menuCategories');
    let menuItems = Storage.get('menuItems');

    // Migrate old dishes data if exists
    const oldDishes = Storage.get('dishes');
    if (oldDishes && oldDishes.length > 0 && menuCategories.length === 0) {
        // Create categories from old dishes
        const categoryMap = {};
        oldDishes.forEach(dish => {
            if (!categoryMap[dish.category]) {
                const newCategory = {
                    id: Date.now() + Math.random(),
                    name: dish.category.charAt(0).toUpperCase() + dish.category.slice(1)
                };
                menuCategories.push(newCategory);
                categoryMap[dish.category] = newCategory.id;
            }
        });

        // Convert dishes to menu items
        oldDishes.forEach(dish => {
            const categoryId = categoryMap[dish.category];
            menuItems.push({
                id: dish.id,
                categoryId: categoryId,
                name: dish.name,
                price: dish.price
            });
        });

        Storage.set('menuCategories', menuCategories);
        Storage.set('menuItems', menuItems);
    }

    // Check if menu is empty OR only has the old default Karahi category OR WMC menu hasn't been initialized
    const isOnlyOldDefaultKarahi = menuCategories.length === 1 && 
        (menuCategories[0].name || '').toLowerCase() === 'karahi' && 
        menuItems.some(i => (i.name || '').toLowerCase().includes('karahi'));

    if (menuCategories.length === 0 || isOnlyOldDefaultKarahi || localStorage.getItem('hangout_menu_wmc_loaded') !== 'true') {
        // Seed full Hangout Cafe menu from Menu WMC
        seedHangoutWmcMenu(isOnlyOldDefaultKarahi || menuCategories.length === 0);
    }
}

// Update order date display
function updateOrderDate() {
    const orderDateEl = document.getElementById('orderDate');
    if (orderDateEl) {
        const now = new Date();
        orderDateEl.textContent = `${formatDate(now)} ${formatTime(now)}`;
    }
}

// Update current time in order header (POS right panel)
function updateOrderCurrentTime() {
    const el = document.getElementById('orderCurrentTime');
    if (!el) return;
    const now = new Date();
    el.textContent = formatTimeShortWithSeconds(now);
}

// -------------------------
// Global "click outside modal" close (works for all popups)
// -------------------------
function getTopmostOpenModal() {
    const modals = Array.from(document.querySelectorAll('.modal'));
    const open = modals.filter(m => {
        try {
            return window.getComputedStyle(m).display !== 'none';
        } catch (_) {
            return false;
        }
    });
    if (open.length === 0) return null;
    return open[open.length - 1];
}

function closeModalById(modalId) {
    if (!modalId) return;
    switch (modalId) {
        case 'saleModal':
            if (typeof window.closeSaleModal === 'function') return window.closeSaleModal();
            break;
        case 'payoutsListModal':
            if (typeof window.closePayoutsListModal === 'function') return window.closePayoutsListModal();
            break;
        case 'addEmployeeModal':
            if (typeof window.closeAddEmployeeModal === 'function') return window.closeAddEmployeeModal();
            break;
        case 'addPayoutModal':
            if (typeof window.closeAddPayoutModal === 'function') return window.closeAddPayoutModal();
            break;
        case 'attendanceModal':
            if (typeof window.closeAttendanceModal === 'function') return window.closeAttendanceModal();
            break;
        case 'addExpenseModal':
            if (typeof window.closeAddExpenseModal === 'function') return window.closeAddExpenseModal();
            break;
        case 'expenseCategoryModal':
            if (typeof window.closeExpenseCategoryModal === 'function') return window.closeExpenseCategoryModal();
            break;
        case 'addMenuItemModal':
            if (typeof window.closeAddMenuItemModal === 'function') return window.closeAddMenuItemModal();
            break;
        case 'addCategoryModal':
            if (typeof window.closeAddCategoryModal === 'function') return window.closeAddCategoryModal();
            break;
        case 'addTableModal':
            if (typeof window.closeAddTableModal === 'function') return window.closeAddTableModal();
            break;
        case 'bookTableModal':
            if (typeof window.closeBookTableModal === 'function') return window.closeBookTableModal();
            break;
        case 'discountModal': {
            const el = document.getElementById('discountModal');
            if (el) el.style.display = 'none';
            return;
        }
        default:
            break;
    }
    // Fallback: just hide the modal
    const el = document.getElementById(modalId);
    if (el) el.style.display = 'none';
}

function handleGlobalModalOutsideClick(e) {
    const modal = getTopmostOpenModal();
    if (!modal) return;

    // Do not close addMenuItemModal on outside clicks
    if (modal.id === 'addMenuItemModal') return;

    // If click is inside modal-content, don't close
    const content = modal.querySelector('.modal-content');
    if (content && content.contains(e.target)) return;

    closeModalById(modal.id);
}

function closeAllOpenModals() {
    const modals = Array.from(document.querySelectorAll('.modal'));
    const open = modals.filter(m => {
        try {
            return window.getComputedStyle(m).display !== 'none';
        } catch (_) {
            return false;
        }
    });
    // Close from topmost down (exclude addMenuItemModal from auto-closing on window blur/visibility change)
    for (let i = open.length - 1; i >= 0; i--) {
        if (open[i].id === 'addMenuItemModal') continue;
        closeModalById(open[i].id);
    }
}

function handleBookTableSubmit(e) {
    // Guard: prevent full page reload/navigation on submit
    e.preventDefault();
    e.stopImmediatePropagation();

    if (!currentBookingTableId) return;

    const tables = Storage.get('tables') || [];
    const table = tables.find(t => String(t.id) === String(currentBookingTableId));
    if (!table) return;

    const customerNameEl = document.getElementById('customerName');
    const customerContactEl = document.getElementById('customerContact');
    const bookingDateEl = document.getElementById('bookingDate');
    const bookingTimeEl = document.getElementById('bookingTime');
    const customerName = (customerNameEl?.value || '').trim();
    const customerContact = (customerContactEl?.value || '').trim();
    const bookingDate = bookingDateEl?.value || '';
    const bookingTime = bookingTimeEl?.value || '';

    if (!customerName) {
        alert('Please enter a customer name');
        return;
    }
    if (!customerContact) {
        alert('Please enter a contact number');
        return;
    }
    if (!bookingDate) {
        alert('Please select a booking date');
        return;
    }
    if (!bookingTime) {
        alert('Please select a booking time');
        return;
    }

    table.status = 'booked';
    table.customerName = customerName;
    table.customerContact = customerContact;
    table.bookingDate = bookingDate;
    table.bookingTime = bookingTime;
    Storage.set('tables', tables);
    loadTables();
    closeBookTableModal();
}

function handleTableFormSubmit(e) {
    // Guard: prevent full page reload/navigation on submit
    e.preventDefault();
    e.stopImmediatePropagation();

    const tables = Storage.get('tables') || [];
    const number = parseInt(document.getElementById('tableNumber')?.value, 10);
    const seats = parseInt(document.getElementById('tableSeats')?.value, 10);

    if (!number || number < 1) {
        alert('Please enter a valid table number');
        return;
    }
    if (!seats || seats < 1) {
        alert('Please enter a valid number of seats');
        return;
    }

    // Check if table number already exists (when adding new)
    if (editingTableId === null) {
        const existingTable = tables.find(t => t.number === number);
        if (existingTable) {
            alert('A table with this number already exists');
            return;
        }
    } else {
        // When editing, check if number conflicts with other tables
        const existingTable = tables.find(t => t.number === number && String(t.id) !== String(editingTableId));
        if (existingTable) {
            alert('A table with this number already exists');
            return;
        }
    }

    if (editingTableId !== null) {
        // Edit existing table
        const index = tables.findIndex(t => String(t.id) === String(editingTableId));
        if (index !== -1) {
            tables[index].number = number;
            tables[index].seats = seats;
        }
    } else {
        // Add new table
        const newTable = {
            id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
            number,
            seats,
            status: 'available',
            customerName: null,
            customerContact: null
        };
        tables.push(newTable);
    }

    Storage.set('tables', tables);
    loadTables();
    closeAddTableModal();
    editingTableId = null; // Reset editing state
}

// Install global handlers immediately (and only once)
if (!window.__globalModalKeyHandlersInstalled) {
    window.__globalModalKeyHandlersInstalled = true;

    // Global ESC key listener to close topmost open modal (or return from consumption / ledger views)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.keyCode === 27) {
            const topModal = getTopmostOpenModal();
            if (topModal) {
                closeModalById(topModal.id);
                return;
            }

            // If on Stock item ledger or consumption logs page, Esc returns to stock inventory
            const ledgerSection = document.getElementById('stockItemLedgerSection');
            if (ledgerSection && ledgerSection.style.display !== 'none') {
                switchStockView('inventory');
                return;
            }

            const consumptionSection = document.getElementById('stockConsumptionLogsSection');
            if (consumptionSection && consumptionSection.style.display !== 'none') {
                switchStockView('inventory');
                return;
            }
        }
    }, true);

    // Prevent refresh on Book Table submit (Electron can reload if submit isn't handled)
    document.addEventListener('submit', (e) => {
        const form = e.target;
        if (form && form.id === 'bookTableForm') {
            handleBookTableSubmit(e);
        }
        if (form && form.id === 'tableForm') {
            handleTableFormSubmit(e);
        }
    }, true);
}

// Make functions globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.showDiscountModal = showDiscountModal;
window.applyDiscount = applyDiscount;
window.clearDiscount = clearDiscount;
window.setCartQuantityDirect = setCartQuantityDirect;
window.updateMenuQuantity = updateMenuQuantity;
window.clearCart = clearCart;
window.processPayment = processPayment;
window.selectPaymentMethod = selectPaymentMethod;
window.printReceipt = printReceipt;

// Open favourites management tab
window.toggleManageFavourites = () => {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

    // Remove active state from all nav items
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));

    // Show favourites tab
    const favouritesTab = document.getElementById('favourites');
    if (favouritesTab) {
        favouritesTab.classList.add('active');
        loadFavouritesForManagement();

        // Scroll to top
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.scrollTop = 0;
        }
    }
};

// Load favourites items for position management
function loadFavouritesForManagement() {
    const favouritesGrid = document.getElementById('favouritesGrid');
    if (!favouritesGrid) return;

    const favorites = Storage.get('favorites') || [];
    const menuItems = Storage.get('menuItems') || [];

    if (favorites.length === 0) {
        favouritesGrid.innerHTML = '<div style="text-align: center; padding: 40px; color: #999;"><p>No favourites added yet.</p><p style="font-size: 14px; margin-top: 10px;">Add items to favourites from the POS page to manage their positions here.</p></div>';
        return;
    }

    // Get favourite items
    const favouriteItems = favorites.map(id => menuItems.find(item => item.id === id)).filter(item => item !== undefined);

    // Get saved order for favourites
    let itemOrder = Storage.get('menuItemOrder') || {};
    const savedOrder = itemOrder['favorites'] || [];

    // Sort items according to saved order
    const sortedItems = [...favouriteItems].sort((a, b) => {
        const indexA = savedOrder.indexOf(a.id);
        const indexB = savedOrder.indexOf(b.id);
        if (indexA === -1 && indexB === -1) return 0;
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });

    favouritesGrid.innerHTML = '';

    const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y1ZjVmNSIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2RkZCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTcwIDEwMEwxMDAgNzBMMTMwIDEwMEwxMDAgMTMwWiIgZmlsbD0iI2RkZCIvPjwvc3ZnPg==';

    sortedItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'favourite-item-card';
        card.dataset.itemId = item.id;
        card.draggable = true;
        card.style.cssText = 'background: #ffffff; border: 2px solid #e0e0e0; border-radius: 8px; padding: 6px; cursor: move; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';

        const imageSrc = item.image || placeholderImage;

        card.innerHTML = `
            <div style="width: 100%; aspect-ratio: 1 / 1; overflow: hidden; border-radius: 6px; margin-bottom: 4px; background: #f5f5f5;">
                <img src="${imageSrc}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='${placeholderImage}'">
            </div>
            <div style="font-weight: 600; color: #2c3e50; font-size: 12px; margin-bottom: 2px; line-height: 1.2;">${item.name}</div>
            <div style="font-weight: 700; color: #2980b9; font-size: 14px;">Rs.${formatNumber(item.price)}</div>
        `;

        // Add drag event listeners
        card.addEventListener('dragstart', handleFavouriteDragStart);
        card.addEventListener('dragend', handleFavouriteDragEnd);
        card.addEventListener('dragover', handleFavouriteDragOver);
        card.addEventListener('dragenter', handleFavouriteDragEnter);
        card.addEventListener('dragleave', handleFavouriteDragLeave);
        card.addEventListener('drop', handleFavouriteDrop);

        card.addEventListener('mouseenter', function () {
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            this.style.borderColor = '#4a90e2';
        });

        card.addEventListener('mouseleave', function () {
            if (!this.classList.contains('dragging')) {
                this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                this.style.borderColor = '#e0e0e0';
            }
        });

        favouritesGrid.appendChild(card);
    });
}

let draggedFavouriteElement = null;

function handleFavouriteDragStart(e) {
    draggedFavouriteElement = this;
    this.classList.add('dragging');
    this.style.opacity = '0.5';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleFavouriteDragEnd(e) {
    this.classList.remove('dragging');
    this.style.opacity = '1';
    document.querySelectorAll('.favourite-item-card').forEach(card => {
        card.classList.remove('drag-over');
        card.style.borderColor = '#e0e0e0';
    });
}

function handleFavouriteDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleFavouriteDragEnter(e) {
    if (this !== draggedFavouriteElement) {
        this.classList.add('drag-over');
        this.style.borderColor = '#4a90e2';
        this.style.borderStyle = 'dashed';
    }
}

function handleFavouriteDragLeave(e) {
    this.classList.remove('drag-over');
    this.style.borderColor = '#e0e0e0';
    this.style.borderStyle = 'solid';
}

function handleFavouriteDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (e.preventDefault) {
        e.preventDefault();
    }

    if (draggedFavouriteElement !== this) {
        const favouritesGrid = document.getElementById('favouritesGrid');
        const allCards = Array.from(favouritesGrid.querySelectorAll('.favourite-item-card'));
        const draggedIndex = allCards.indexOf(draggedFavouriteElement);
        const targetIndex = allCards.indexOf(this);

        if (draggedIndex < targetIndex) {
            favouritesGrid.insertBefore(draggedFavouriteElement, this.nextSibling);
        } else {
            favouritesGrid.insertBefore(draggedFavouriteElement, this);
        }
    }

    this.classList.remove('drag-over');
    this.style.borderColor = '#e0e0e0';
    this.style.borderStyle = 'solid';
    return false;
}

// Save favourites order
window.saveFavouritesOrder = () => {
    const favouritesGrid = document.getElementById('favouritesGrid');
    if (!favouritesGrid) return;

    const cards = Array.from(favouritesGrid.querySelectorAll('.favourite-item-card'));
    const itemIds = cards.map(card => parseInt(card.dataset.itemId));

    if (itemIds.length === 0) {
        alert('No favourites to save!');
        return;
    }

    // Get current order
    let itemOrder = Storage.get('menuItemOrder');
    if (!itemOrder || typeof itemOrder !== 'object') {
        itemOrder = {};
    }

    // Save the exact order as it appears in the DOM
    itemOrder['favorites'] = itemIds;
    Storage.set('menuItemOrder', itemOrder);

    // Also update POS if it's active
    if (document.getElementById('pos')?.classList.contains('active')) {
        if (selectedCategory === 'favorites' && window.loadMenuItems) {
            window.loadMenuItems();
        }
    }

    // Return to menu tab
    switchToTab('menu');
};
window.completeOrder = completeOrder;
window.resetAllData = resetAllData;
window.holdOrder = holdOrder;
window.editHoldOrder = editHoldOrder;
window.saveHoldOrderChanges = saveHoldOrderChanges;
window.cancelEditHoldOrder = cancelEditHoldOrder;
window.markOrderSuccessful = markOrderSuccessful;
window.printReceiptForOrder = printReceiptForOrder;
window.deleteHoldOrder = deleteHoldOrder;
window.closeHoldOrderSuccessModal = closeHoldOrderSuccessModal;
window.undoHoldOrder = undoHoldOrder;
window.clearAllSales = clearAllSales;
// Table functions are already assigned to window above

// Setup menu items search functionality
function setupMenuItemsSearch() {
    const menuItemSearchInput = document.getElementById('menuItemSearch');
    if (menuItemSearchInput && !menuItemSearchInput.hasAttribute('data-search-listener')) {
        // Mark as having listener to avoid duplicates
        menuItemSearchInput.setAttribute('data-search-listener', 'true');

        // Add real-time search on input change with debouncing
        const debouncedLoadMenuItemsList = debounce(() => {
            loadMenuItemsList();
        }, 300);

        menuItemSearchInput.addEventListener('input', () => {
            debouncedLoadMenuItemsList();
        });
    }
}

// Setup sales filters functionality
function setupSalesFilters() {
    const salesPaymentFilter = document.getElementById('salesPaymentFilter');
    const salesSortFilter = document.getElementById('salesSortFilter');

    if (salesPaymentFilter && !salesPaymentFilter.hasAttribute('data-filter-listener')) {
        salesPaymentFilter.setAttribute('data-filter-listener', 'true');
        salesPaymentFilter.addEventListener('change', () => {
            loadSales();
        });
    }
    if (salesSortFilter && !salesSortFilter.hasAttribute('data-filter-listener')) {
        salesSortFilter.setAttribute('data-filter-listener', 'true');
        salesSortFilter.addEventListener('change', () => {
            loadSales();
        });
    }
}

// Setup expenses filters functionality
function setupExpensesFilters() {
    const expenseCategoryFilter = document.getElementById('expenseCategoryFilter');
    const expenseSearch = document.getElementById('expenseSearch');
    const expenseSortFilter = document.getElementById('expenseSortFilter');

    if (expenseCategoryFilter && !expenseCategoryFilter.hasAttribute('data-filter-listener')) {
        expenseCategoryFilter.setAttribute('data-filter-listener', 'true');
        expenseCategoryFilter.addEventListener('change', () => loadExpenses());
    }
    if (expenseSearch && !expenseSearch.hasAttribute('data-filter-listener')) {
        expenseSearch.setAttribute('data-filter-listener', 'true');
        expenseSearch.addEventListener('input', () => loadExpenses());
    }
    if (expenseSortFilter && !expenseSortFilter.hasAttribute('data-filter-listener')) {
        expenseSortFilter.setAttribute('data-filter-listener', 'true');
        expenseSortFilter.addEventListener('change', () => loadExpenses());
    }
}

// Function to setup clear buttons (✕) for search input fields across the app
window.setupSearchClearButtons = function setupSearchClearButtons() {
    const searchInputIds = [
        'menuSearch',
        'menuItemSearch',
        'itemsSalesSearch',
        'employeeSearch',
        'waiterSearch',
        'expenseSearch',
        'stockSearch',
        'tableSearchFilter'
    ];

    searchInputIds.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (!input) return;

        let wrapper = input.parentElement;
        if (!wrapper) return;

        // Ensure wrapper has relative positioning for clear button alignment
        const computedPos = window.getComputedStyle(wrapper).position;
        if (computedPos === 'static') {
            wrapper.style.position = 'relative';
        }

        // Adjust padding-right on input so typed text doesn't overlap clear button
        input.style.paddingRight = '32px';

        // Check if clear button element already exists
        let clearBtn = wrapper.querySelector(`.search-clear-btn[data-for="${inputId}"]`);
        if (!clearBtn) {
            clearBtn = document.createElement('button');
            clearBtn.type = 'button';
            clearBtn.className = 'search-clear-btn';
            clearBtn.setAttribute('data-for', inputId);
            clearBtn.innerHTML = '✕';
            clearBtn.title = 'Clear search';
            clearBtn.style.display = 'none';
            wrapper.appendChild(clearBtn);

            clearBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                input.value = '';
                if (inputId === 'menuSearch') {
                    window.searchQuery = '';
                    if (typeof searchQuery !== 'undefined') searchQuery = '';
                }
                clearBtn.style.display = 'none';
                input.focus();
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        }

        const updateBtnVisibility = () => {
            if (input.value && input.value.trim().length > 0) {
                clearBtn.style.display = 'flex';
            } else {
                clearBtn.style.display = 'none';
            }
        };

        if (!input.hasAttribute('data-clear-listener-added')) {
            input.setAttribute('data-clear-listener-added', 'true');
            input.addEventListener('input', updateBtnVisibility);
            input.addEventListener('keyup', updateBtnVisibility);
        }
        updateBtnVisibility();
    });
};

// Setup employees filters functionality
function setupEmployeeFilters() {
    const employeeSearch = document.getElementById('employeeSearch');
    const employeeMonthFilter = document.getElementById('employeeMonthFilter');

    if (employeeSearch && !employeeSearch.hasAttribute('data-filter-listener')) {
        employeeSearch.setAttribute('data-filter-listener', 'true');
        employeeSearch.addEventListener('input', () => loadEmployees());
    }
    if (employeeMonthFilter && !employeeMonthFilter.hasAttribute('data-filter-listener')) {
        employeeMonthFilter.setAttribute('data-filter-listener', 'true');
        const now = new Date();
        const yearMonth = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
        if (!employeeMonthFilter.value) {
            employeeMonthFilter.value = yearMonth;
        }
        employeeMonthFilter.addEventListener('change', () => loadEmployees());
    }
}

// Reset filter helper functions
window.resetSalesFilter = () => {
    const filterSelect = document.getElementById('salesDateFilter');
    if (filterSelect) {
        filterSelect.value = 'today';
        filterSelect.dispatchEvent(new Event('change'));
    }
};

window.resetExpenseFilter = () => {
    const filterSelect = document.getElementById('expenseDateFilter');
    if (filterSelect) {
        filterSelect.value = 'today';
        filterSelect.dispatchEvent(new Event('change'));
    }
};

window.resetEmployeeFilter = () => {
    const monthFilter = document.getElementById('employeeMonthFilter');
    if (monthFilter) {
        const now = new Date();
        const yearMonth = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
        monthFilter.value = yearMonth;
        loadEmployees();
    }
};

window.resetTaxHistoryFilter = () => {
    const filterSelect = document.getElementById('taxHistoryFilter');
    if (filterSelect) {
        filterSelect.value = 'today';
        filterSelect.dispatchEvent(new Event('change'));
    }
};

window.resetItemsSalesFilter = () => {
    const filterSelect = document.getElementById('itemsSalesDateFilter');
    if (filterSelect) {
        filterSelect.value = 'today';
        filterSelect.dispatchEvent(new Event('change'));
    }
};

// Initialize
// Set logo path for Electron (works in both dev and production)
function setLogoPath() {
    const logoImage = document.getElementById('logoImage');
    if (logoImage) {
        const s = (typeof getCafeSettings === 'function') ? getCafeSettings() : null;
        if (s && s.logo) {
            logoImage.src = s.logo;
        } else {
            logoImage.src = 'assets/logo.jpg';
        }
    }
}

onDOMReady(() => {
    setLogoPath();
    // Initialize menu structure
    initializeMenuStructure();

    // Initialize unified dynamic time filters
    if (typeof handleSalesDateFilterChange === 'function') handleSalesDateFilterChange();
    if (typeof handleTaxHistoryFilterChange === 'function') handleTaxHistoryFilterChange();
    if (typeof handleItemsSalesDateFilterChange === 'function') handleItemsSalesDateFilterChange();
    if (typeof handleExpenseDateFilterChange === 'function') handleExpenseDateFilterChange();
    if (typeof handleTableTimeFilterTypeChange === 'function') handleTableTimeFilterTypeChange();

    // Seed 50 dummy tables data if tables list is less than 40
    let existingTables = Storage.get('tables') || [];
    if (existingTables.length < 40) {
        let tables = [];
        for (let i = 1; i <= 50; i++) {
            const seats = Math.floor(Math.random() * 2) + 4; // 4 or 5 seats
            tables.push({
                id: `TABLE-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}`,
                number: String(i),
                seats: seats,
                status: 'available'
            });
        }
        Storage.set('tables', tables);
    }

    // Set today's date as default for sales
    const saleDateInput = document.getElementById('saleDate');
    if (saleDateInput) {
        saleDateInput.value = new Date().toISOString().split('T')[0];
    }

    // Show order section for POS (default tab is 'pos')
    const orderSectionWrapper = document.getElementById('orderSectionWrapper');
    const mainContent = document.querySelector('.main-content');
    const activeTab = document.querySelector('.nav-item.active')?.dataset.tab || 'pos';

    if (activeTab === 'pos') {
        if (orderSectionWrapper) orderSectionWrapper.classList.add('show');
        if (mainContent) mainContent.classList.add('has-order-section');
        // Load initial POS data
        loadCategories();
        loadMenuItems();
        loadWaitersDropdown();
        loadTablesDropdown();
        updateCart();
        updateOrderDate();
    } else {
        if (orderSectionWrapper) orderSectionWrapper.classList.remove('show');
        if (mainContent) mainContent.classList.remove('has-order-section');
    }

    // Set up custom Table dropdown event listeners
    const tableSearchInput = document.getElementById('tableSearchInput');
    const tableDropdownContent = document.getElementById('tableDropdownContent');
    const tableSearchFilter = document.getElementById('tableSearchFilter');
    
    if (tableSearchInput && tableDropdownContent) {
        tableSearchInput.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = tableDropdownContent.style.display === 'block';
            if (isVisible) {
                tableDropdownContent.style.display = 'none';
            } else {
                loadTablesDropdown(() => {
                    tableDropdownContent.style.display = 'block';
                    if (tableSearchFilter) {
                        tableSearchFilter.value = '';
                        tableSearchFilter.focus();
                        // Reset visibility of list items
                        const items = document.querySelectorAll('#tableListItems div');
                        items.forEach(item => { item.style.display = 'block'; });
                    }
                });
            }
        });
    }

    if (tableSearchFilter) {
        tableSearchFilter.addEventListener('input', () => {
            const query = tableSearchFilter.value.toLowerCase().trim();
            const items = document.querySelectorAll('#tableListItems div');
            items.forEach(item => {
                const tableNo = item.getAttribute('data-table-no') || '';
                if (query === '' || (tableNo !== '' && tableNo.includes(query))) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Close table dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (tableDropdownContent && tableDropdownContent.style.display === 'block') {
            const container = document.getElementById('tableDropdownContainer');
            if (container && !container.contains(e.target)) {
                tableDropdownContent.style.display = 'none';
            }
        }
        if (!e.target.closest('.category-dropdown-container')) {
            document.querySelectorAll('.category-dropdown-container.open').forEach(c => c.classList.remove('open'));
        }
    });

    // Update order date
    updateOrderDate();
    setInterval(updateOrderDate, 60000); // Update every minute

    // Update current time in the order header
    updateOrderCurrentTime();
    setInterval(updateOrderCurrentTime, 1000); // Update every second

    // Load initial data
    loadCategories();
    loadMenuItems();
    updateCart();
    loadMenuCategories();
    loadMenuItemsList();
    updateCategoryDropdowns();
    loadSales();
    loadEmployees();
    loadExpenses();
    loadStock();
    handleTableTimeFilterTypeChange();

    // Setup search functionality for POS with debouncing
    const menuSearchInput = document.getElementById('menuSearch');
    if (menuSearchInput) {
        const debouncedLoadMenuItems = debounce(() => {
            loadMenuItems();
        }, 300);

        menuSearchInput.addEventListener('input', (e) => {
            window.searchQuery = e.target.value;
            searchQuery = e.target.value;
            debouncedLoadMenuItems();
        });
    }

    // Setup search functionality for Menu Items list - Real-time search
    setupMenuItemsSearch();

    // Setup clear buttons (✕) for all search inputs
    setupSearchClearButtons();

    // Close modal when clicking outside
    // Employee filters
    const employeeSearch = document.getElementById('employeeSearch');

    if (employeeSearch) {
        employeeSearch.addEventListener('input', loadEmployees);
    }

    // Expense filters
    const expenseCategoryFilter = document.getElementById('expenseCategoryFilter');
    const expenseDateFilter = document.getElementById('expenseDateFilter');
    const expenseStartDate = document.getElementById('expenseStartDate');
    const expenseEndDate = document.getElementById('expenseEndDate');
    const expenseSortFilter = document.getElementById('expenseSortFilter');
    const expenseCustomDateRange = document.getElementById('expenseCustomDateRange');

    if (expenseCategoryFilter) {
        expenseCategoryFilter.addEventListener('change', loadExpenses);
    }
    if (expenseSortFilter) {
        expenseSortFilter.addEventListener('change', loadExpenses);
    }

    // Expense search functionality
    const expenseSearchInput = document.getElementById('expenseSearch');
    if (expenseSearchInput) {
        expenseSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchExpenses();
            }
        });
        expenseSearchInput.addEventListener('input', () => {
            loadExpenses();
        });
    }

    // Initialize expense categories
    initializeExpenseCategories();
    loadExpenseCategories();
    updateExpenseCategoryDropdown();

    // Add event listeners to form fields to check "Add Next Item" button state
    const addMenuItemCategory = document.getElementById('addMenuItemCategory');
    const addMenuItemName = document.getElementById('addMenuItemName');
    const addMenuItemPrice = document.getElementById('addMenuItemPrice');

    if (addMenuItemCategory) {
        addMenuItemCategory.addEventListener('change', checkAddNextItemButton);
        addMenuItemCategory.addEventListener('input', checkAddNextItemButton);
    }
    if (addMenuItemName) {
        addMenuItemName.addEventListener('input', checkAddNextItemButton);
    }
    if (addMenuItemPrice) {
        addMenuItemPrice.addEventListener('input', checkAddNextItemButton);
    }

    // Global handler: Pressing ESC closes the currently open modal/window
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.keyCode === 27) {
            const allModals = Array.from(document.querySelectorAll('.modal, #customMessageBoxModal'));
            for (let i = allModals.length - 1; i >= 0; i--) {
                const m = allModals[i];
                const isVisible = m.style.display !== 'none' && m.style.display !== '' && window.getComputedStyle(m).display !== 'none';
                if (isVisible) {
                    e.preventDefault();
                    e.stopPropagation();

                    // If it's custom message box
                    if (m.id === 'customMessageBoxModal') {
                        const cancelBtn = m.querySelector('#customMsgBoxCancelBtn') || m.querySelector('#customMsgBoxOkBtn');
                        if (cancelBtn) {
                            cancelBtn.click();
                            return;
                        }
                    }

                    // Look for close button or inline close handler
                    const closeBtn = m.querySelector('.modal-close, button.close, [onclick*="close"], [onclick*="Close"]');
                    if (closeBtn) {
                        closeBtn.click();
                    } else {
                        m.style.display = 'none';
                    }
                    return;
                }
            }
        }
    });

    // Global handler is installed above (once). Keep DOMContentLoaded clean.

    // Table form handler
    const tableForm = document.getElementById('tableForm');
    if (tableForm) {
        tableForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const tables = Storage.get('tables') || [];
            const number = parseInt(document.getElementById('tableNumber').value);
            const seats = parseInt(document.getElementById('tableSeats').value);

            if (!number || number < 1) {
                alert('Please enter a valid table number');
                return;
            }

            if (!seats || seats < 1) {
                alert('Please enter a valid number of seats');
                return;
            }

            // Check if table number already exists (when adding new)
            if (editingTableId === null) {
                const existingTable = tables.find(t => t.number === number);
                if (existingTable) {
                    alert('A table with this number already exists');
                    return;
                }
            } else {
                // When editing, check if number conflicts with other tables
                const existingTable = tables.find(t => t.number === number && String(t.id) !== String(editingTableId));
                if (existingTable) {
                    alert('A table with this number already exists');
                    return;
                }
            }

            if (editingTableId !== null) {
                // Edit existing table
                const index = tables.findIndex(t => String(t.id) === String(editingTableId));
                if (index !== -1) {
                    tables[index].number = number;
                    tables[index].seats = seats;
                }
            } else {
                // Add new table
                const newTable = {
                    id: Date.now().toString(),
                    number: number,
                    seats: seats,
                    status: 'available',
                    customerName: null,
                    customerContact: null
                };
                tables.push(newTable);
            }

            Storage.set('tables', tables);
            loadTables();
            closeAddTableModal();
            editingTableId = null; // Reset editing state
        });
    } else {
        console.error('Table form not found');
    }

    // Book table form handler
    const bookTableForm = document.getElementById('bookTableForm');
    if (bookTableForm) {
        bookTableForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!currentBookingTableId) return;

            const tables = Storage.get('tables') || [];
            const table = tables.find(t => String(t.id) === String(currentBookingTableId));
            if (!table) return;

            const customerName = document.getElementById('customerName').value.trim();
            const customerContact = document.getElementById('customerContact').value.trim();
            const bookingDate = document.getElementById('bookingDate').value;
            const bookingTime = document.getElementById('bookingTime').value;
            if (!customerName) {
                alert('Please enter a customer name');
                return;
            }
            if (!customerContact) {
                alert('Please enter a contact number');
                return;
            }
            if (!bookingDate) {
                alert('Please select a booking date');
                return;
            }
            if (!bookingTime) {
                alert('Please select a booking time');
                return;
            }

            table.status = 'booked';
            table.customerName = customerName;
            table.customerContact = customerContact;
            table.bookingDate = bookingDate;
            table.bookingTime = bookingTime;
            Storage.set('tables', tables);
            loadTables();
            closeBookTableModal();
        });
    }

    // Sales filters - Auto-apply on change
    // Setup sales filters
    setupSalesFilters();

    // Items Sales filters
    const itemsSalesSortFilter = document.getElementById('itemsSalesSortFilter');

    if (itemsSalesSortFilter) {
        itemsSalesSortFilter.addEventListener('change', loadItemsSales);
    }

    // Items Sales search
    const itemsSalesSearch = document.getElementById('itemsSalesSearch');
    if (itemsSalesSearch) {
        itemsSalesSearch.addEventListener('input', loadItemsSales);
    }
});


// Safe Date Parser that handles YYYY-MM-DD, ISO-8601, and timestamps without timezone shifting
function parseDateSafe(dateVal) {
    if (!dateVal) return null;
    if (dateVal instanceof Date) {
        return isNaN(dateVal.getTime()) ? null : dateVal;
    }
    if (typeof dateVal === 'string') {
        const trimmed = dateVal.trim();
        // Match pure YYYY-MM-DD
        if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
            const parts = trimmed.split('-').map(Number);
            return new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0);
        }
        // Match ISO date string with date part
        if (trimmed.includes('T')) {
            const d = new Date(trimmed);
            if (!isNaN(d.getTime())) return d;
        }
        const d = new Date(trimmed);
        if (!isNaN(d.getTime())) return d;
    }
    const d = new Date(dateVal);
    return isNaN(d.getTime()) ? null : d;
}

// Master helper function for report print windows with anti-blank preview safeguards
function openReportPrintWindow(reportHTML, title) {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.open();
    printWindow.document.write(reportHTML);
    printWindow.document.close();
}

// Reports Functions
function generateReportHTML(title, filterText, startDate, endDate, transactionList = null, dailyBreakdown = null, breakdownTitle = 'Daily Breakdown', breakdownLabel = 'Date', isViewOnly = false) {
    const sales = Storage.get('sales') || [];
    const expenses = getCombinedExpenses();

    // Group sales logic (handling legacy data)
    const orderMap = {};
    const ungroupedSales = [];

    sales.forEach(sale => {
        if (sale.items && Array.isArray(sale.items)) {
            const orderId = sale.orderId || sale.id;
            orderMap[orderId] = sale;
        } else {
            ungroupedSales.push(sale);
        }
    });

    const groupedByTime = {};
    ungroupedSales.forEach(sale => {
        const saleDate = parseDateSafe(sale.date || sale.timestamp) || new Date();
        const timeKey = Math.floor(saleDate.getTime() / 5000) * 5000;
        const groupKey = `${timeKey}-${(sale.paymentMethod || 'cash')}`;

        if (!groupedByTime[groupKey]) {
            groupedByTime[groupKey] = {
                id: `ORD-${timeKey}`,
                orderId: `ORD-${timeKey}`,
                date: sale.date,
                paymentMethod: sale.paymentMethod || 'cash',
                items: [],
                total: 0,
                subtotal: 0,
                tax: 0,
                discount: { amount: 0 }
            };
        }
        groupedByTime[groupKey].items.push(sale);
        groupedByTime[groupKey].total += (sale.total || 0);
        groupedByTime[groupKey].subtotal += (sale.total || 0);
    });

    Object.values(groupedByTime).forEach(order => {
        orderMap[order.orderId] = order;
    });

    let orders = Object.values(orderMap);

    // Filter by Date
    orders = orders.filter(order => {
        if (!order.date) return false;
        const d = parseDateSafe(order.date);
        return d && d >= startDate && d <= endDate;
    });

    // Calculate Metrics
    const transactions = orders.length;
    let cash = 0; // Subtotal
    let serviceCharges = 0;
    let discount = 0;
    let netSale = 0;

    const locationStats = {
        'Gents': { bills: 0, total: 0 },
        'Family': { bills: 0, total: 0 },
        'Parcel': { bills: 0, total: 0 }
    };

    orders.forEach(o => {
        const sub = parseFloat(o.subtotal) || 0;
        const tax = parseFloat(o.tax) || 0;
        const disc = o.discount ? (parseFloat(o.discount.amount) || 0) : 0;
        const tot = parseFloat(o.total) || 0;

        cash += sub;
        serviceCharges += tax;
        discount += disc;
        netSale += tot;

        // Location mapping
        let loc = 'Gents';
        const pm = (o.paymentMethod || 'cash').toLowerCase();
        if (pm === 'online' || pm === 'family') loc = 'Family';
        if (pm === 'delivery' || pm === 'parcel') loc = 'Parcel';

        if (locationStats[loc]) {
            locationStats[loc].bills++;
            locationStats[loc].total += tot;
        }
    });

    // Expenses calculation (including payouts and raw expenses)
    const periodExpenses = expenses.filter(e => {
        const d = parseDateSafe(e.date || e.createdAt);
        if (!d) return false;
        return d >= startDate && d <= endDate;
    });
    const cashOut = periodExpenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
    const cashInHand = netSale - cashOut;
    const averageSale = transactions > 0 ? (netSale / transactions) : 0;

    // Stock Consumptions / Ingredients cost for period
    const consumptions = Storage.get('stockConsumptions') || [];
    const stocks = syncAndGetStockItems();
    const stockMap = {};
    stocks.forEach(s => { stockMap[String(s.id)] = s; stockMap[(s.itemName || '').toLowerCase()] = s; });

    let periodIngredientCost = 0;
    consumptions.forEach(log => {
        const d = parseDateSafe(log.timestamp || log.date);
        if (d && d >= startDate && d <= endDate) {
            (log.items || []).forEach(item => {
                const qty = parseFloat(item.finalDeductQty || item.enteredQty || item.deductedQty) || 0;
                const stock = stockMap[String(item.stockId)] || stockMap[(item.itemName || '').toLowerCase()];
                const price = stock ? (parseFloat(stock.unitPrice) || 0) : 0;
                periodIngredientCost += (qty * price);
            });
        }
    });

    const netActualProfit = netSale - periodIngredientCost - cashOut;

    // Expense categories breakdown
    const expCategoryMap = {};
    periodExpenses.forEach(e => {
        const catName = e.category ? (e.category.charAt(0).toUpperCase() + e.category.slice(1)) : 'General';
        if (!expCategoryMap[catName]) expCategoryMap[catName] = 0;
        expCategoryMap[catName] += (parseFloat(e.amount) || 0);
    });

    // Sold Items Breakdown aggregation
    const soldItemsMap = {};
    let totalSoldQty = 0;
    let totalSoldAmount = 0;

    orders.forEach(o => {
        if (Array.isArray(o.items)) {
            o.items.forEach(item => {
                const name = item.name || item.itemName || item.title || 'Item';
                const qty = parseFloat(item.quantity || item.qty) || 1;
                const price = parseFloat(item.price) || 0;
                const itemTot = (item.total !== undefined && item.total !== null) ? (parseFloat(item.total) || 0) : (price * qty);

                if (!soldItemsMap[name]) {
                    soldItemsMap[name] = { name, quantity: 0, total: 0 };
                }
                soldItemsMap[name].quantity += qty;
                soldItemsMap[name].total += itemTot;
                totalSoldQty += qty;
                totalSoldAmount += itemTot;
            });
        }
    });

    const soldItemsList = Object.values(soldItemsMap).sort((a, b) => b.quantity - a.quantity || a.name.localeCompare(b.name));

    // Current Date Formatted
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${escapeHtml(title)}</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
            <style>
                *, *::before, *::after {
                    box-sizing: border-box;
                    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
                }
                body { 
                    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important; 
                    font-size: 11px; 
                    width: 80mm; 
                    max-width: 80mm;
                    margin: 0 auto; 
                    padding: 8px;
                    color: #000;
                    background: #fff;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                .text-center { text-align: center; }
                .text-right { text-align: right; }
                .text-left { text-align: left; }
                .bold { font-weight: 600; }
                .header { margin-bottom: 5px; text-align: center; }
                .header h1 { font-size: 16.5px; margin: 0 0 2px 0; font-weight: 700; letter-spacing: 0.3px; text-transform: uppercase; }
                .header p { margin: 1px 0; font-size: 11px; font-weight: 400; color: #222; }
                .divider { border-bottom: 1px dashed #777; margin: 5px 0; }
                .report-title-badge { 
                    display: inline-block; 
                    border: 1.5px solid #000; 
                    padding: 2px 14px; 
                    font-size: 11px; 
                    font-weight: 600; 
                    text-transform: uppercase; 
                    letter-spacing: 0.5px; 
                    margin: 4px 0 2px 0; 
                }
                .meta-info { 
                    font-size: 10.5px; 
                    line-height: 1.4;
                    margin-bottom: 4px; 
                    text-align: center;
                }
                .section-title { 
                    font-size: 11.5px; 
                    font-weight: 600; 
                    margin: 6px 0 3px 0; 
                    text-align: center; 
                    text-transform: uppercase; 
                    letter-spacing: 0.3px; 
                }
                
                .report-table { 
                    width: 100%; 
                    border-collapse: collapse; 
                    margin: 4px 0 6px 0; 
                    border: 1.5px solid #000; 
                    background: #fff;
                }
                .report-table th { 
                    text-align: left; 
                    border-bottom: 1.5px solid #000; 
                    padding: 4px 5px; 
                    font-size: 10.5px; 
                    font-weight: 600; 
                    text-transform: uppercase; 
                    letter-spacing: 0.3px; 
                    background: #fff;
                    color: #000;
                }
                .report-table td { 
                    padding: 3.5px 5px; 
                    font-size: 11px; 
                    font-weight: 400; 
                    border-bottom: 1px solid #000; 
                    color: #000;
                }
                .report-table tr:last-child td {
                    border-bottom: none;
                }
                .report-table .totals-row td { 
                    border-top: 1.5px solid #000; 
                    font-weight: 600; 
                    padding-top: 4px; 
                }

                .compact-items-table { 
                    width: 100%; 
                    border-collapse: collapse; 
                    margin: 4px 0 6px 0; 
                    border: 1.5px solid #000; 
                    background: #fff;
                }
                .compact-items-table th { 
                    text-align: left; 
                    border-bottom: 1.5px solid #000; 
                    padding: 2.5px 4px !important; 
                    font-size: 9.5px !important; 
                    font-weight: 700; 
                    text-transform: uppercase; 
                    letter-spacing: 0.2px; 
                    background: #fff;
                    color: #000;
                }
                .compact-items-table td { 
                    padding: 1.5px 4px !important; 
                    font-size: 9.5px !important; 
                    font-weight: 500; 
                    border-bottom: 1px solid #e0e0e0; 
                    color: #000;
                    line-height: 1.15 !important;
                }
                .compact-items-table tr:last-child td {
                    border-bottom: none;
                }
                .compact-items-table .totals-row td { 
                    border-top: 1.5px solid #000 !important; 
                    font-weight: 700; 
                    padding: 3px 4px !important; 
                    font-size: 10px !important;
                }

                .cash-in-hand-box {
                    border: 1.5px solid #000;
                    padding: 5px 8px;
                    margin: 5px 0 6px 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 12px;
                    font-weight: 700;
                    background: #fff;
                }

                @media print {
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    body { 
                        width: 100%; 
                        max-width: 100%; 
                        margin: 0; 
                        padding: 3mm 0; 
                    }
                    @page {
                        size: 80mm auto;
                        margin: 3mm;
                    }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Hangout Lounge & Co.</h1>
                <p>Contact: 0300-9509536</p>
                <p>Wah Cantt</p>
                <div><span class="report-title-badge">${escapeHtml(title)}</span></div>
                <div class="divider"></div>
                <div class="meta-info">
                    <div><strong>Date:</strong> ${dateStr} ${timeStr}</div>
                    <div><strong>Filter:</strong> ${escapeHtml(filterText)}</div>
                </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="section-title">Performance Summary</div>
            <table class="report-table">
                <thead>
                    <tr style="border-bottom: 1.5px solid #000;">
                        <th style="width: 58%; border-right: 1px solid #000;">METRIC</th>
                        <th style="width: 42%; text-align: right;">AMOUNT / VALUE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border-right: 1px solid #000;">Total Transactions</td>
                        <td class="text-right bold">${transactions}</td>
                    </tr>
                    <tr>
                        <td style="border-right: 1px solid #000;">Gross Sales (Cash)</td>
                        <td class="text-right bold">Rs. ${formatNumber(cash)}</td>
                    </tr>
                    ${serviceCharges > 0 ? `<tr>
                        <td style="border-right: 1px solid #000;">Taxes & Service</td>
                        <td class="text-right bold">Rs. ${formatNumber(serviceCharges)}</td>
                    </tr>` : ''}
                    <tr>
                        <td style="border-right: 1px solid #000;">Discount</td>
                        <td class="text-right bold">Rs. ${formatNumber(discount)}</td>
                    </tr>
                    <tr style="border-top: 1.5px solid #000; background: #fff;">
                        <td style="border-right: 1px solid #000; font-weight: 600;">Net Sales Revenue</td>
                        <td class="text-right" style="font-weight: 600;">Rs. ${formatNumber(netSale)}</td>
                    </tr>
                    <tr>
                        <td style="border-right: 1px solid #000;">Ingredient Cost (Stock)</td>
                        <td class="text-right bold">Rs. ${formatNumber(periodIngredientCost)}</td>
                    </tr>
                    <tr>
                        <td style="border-right: 1px solid #000;">Total Expenses</td>
                        <td class="text-right bold">Rs. ${formatNumber(cashOut)}</td>
                    </tr>
                    <tr>
                        <td style="border-right: 1px solid #000;">Average Sale</td>
                        <td class="text-right bold">Rs. ${formatNumber(Math.round(averageSale))}</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="cash-in-hand-box" style="border: 2px solid #000; background: #f8fafc;">
                <span>NET ACTUAL PROFIT:</span>
                <span style="font-size: 13px; font-weight: 800;">Rs. ${formatNumber(netActualProfit)}</span>
            </div>
            <div class="cash-in-hand-box" style="margin-top: 2px; font-size: 10.5px; font-weight: 600;">
                <span>CASH IN HAND (REVENUE - EXPENSES):</span>
                <span>Rs. ${formatNumber(cashInHand)}</span>
            </div>
            
            <div class="divider"></div>
            
            <div class="section-title">Expenses Breakdown</div>
            <table class="report-table">
                <thead>
                    <tr style="border-bottom: 1.5px solid #000;">
                        <th style="width: 60%; border-right: 1px solid #000;">CATEGORY</th>
                        <th style="width: 40%; text-align: right;">AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.keys(expCategoryMap).length > 0 ? Object.keys(expCategoryMap).map(cat => `
                        <tr>
                            <td style="border-right: 1px solid #000;">${escapeHtml(cat)}</td>
                            <td class="text-right bold">Rs. ${formatNumber(expCategoryMap[cat])}</td>
                        </tr>
                    `).join('') : `
                        <tr>
                            <td colspan="2" class="text-center" style="color: #666; font-style: italic;">No expenses in this period</td>
                        </tr>
                    `}
                    <tr style="border-top: 1.5px solid #000;">
                        <td style="border-right: 1px solid #000; font-weight: 600;">TOTAL EXPENSES</td>
                        <td class="text-right" style="font-weight: 600;">Rs. ${formatNumber(cashOut)}</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="divider"></div>
            
            <div class="section-title">Sold Items (${soldItemsList.length} Items, Qty: ${totalSoldQty})</div>
            <table class="compact-items-table">
                <thead>
                    <tr style="border-bottom: 1.5px solid #000;">
                        <th style="width: 54%; border-right: 1px solid #000;">ITEM</th>
                        <th style="width: 18%; text-align: center; border-right: 1px solid #000;">QTY</th>
                        <th style="width: 28%; text-align: right;">AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                    ${soldItemsList.length > 0 ? soldItemsList.map(item => `
                        <tr>
                            <td style="border-right: 1px solid #000;">${escapeHtml(item.name)}</td>
                            <td class="text-center bold" style="border-right: 1px solid #000;">${item.quantity}</td>
                            <td class="text-right">Rs. ${formatNumber(item.total)}</td>
                        </tr>
                    `).join('') : `
                        <tr>
                            <td colspan="3" class="text-center" style="color: #666; font-style: italic; padding: 4px;">No sold items in this period</td>
                        </tr>
                    `}
                    <tr class="totals-row" style="border-top: 1.5px solid #000; background: #fff;">
                        <td style="border-right: 1px solid #000; font-weight: 700;">TOTAL ITEMS</td>
                        <td class="text-center bold" style="border-right: 1px solid #000;">${totalSoldQty}</td>
                        <td class="text-right bold">Rs. ${formatNumber(totalSoldAmount)}</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="divider"></div>
    `;

    // Append Detailed Section if provided
    if (transactionList && transactionList.length > 0) {
        html += `
            <div class="section-title">Details</div>
            <table class="report-table">
                <thead>
                    <tr style="border-bottom: 1.5px solid #000;">
                        <th style="width: 35%; border-right: 1px solid #000;">TIME</th>
                        <th style="width: 35%; border-right: 1px solid #000;">ORDER</th>
                        <th style="width: 30%; text-align: right;">TOTAL</th>
                    </tr>
                </thead>
                <tbody>
        `;
        transactionList.forEach(item => {
            html += `
                <tr>
                    <td style="border-right: 1px solid #000;">${escapeHtml(item.time || '')}</td>
                    <td style="border-right: 1px solid #000;">${escapeHtml(item.id || '')}</td>
                    <td class="text-right bold">Rs. ${formatNumber(item.total)}</td>
                </tr>
             `;
        });
        html += `
                </tbody>
            </table>
            <div class="divider"></div>
        `;
    } else if (dailyBreakdown && dailyBreakdown.length > 0) {
        html += `
            <div class="section-title">${escapeHtml(breakdownTitle)}</div>
            <table class="report-table">
                <thead>
                    <tr style="border-bottom: 1.5px solid #000;">
                        <th style="width: 60%; border-right: 1px solid #000;">${escapeHtml(breakdownLabel)}</th>
                        <th style="width: 40%; text-align: right;">SALES</th>
                    </tr>
                </thead>
                <tbody>
        `;
        dailyBreakdown.forEach(item => {
            html += `
                <tr>
                    <td style="border-right: 1px solid #000;">${escapeHtml(item.date)}</td>
                    <td class="text-right bold">Rs. ${formatNumber(item.total)}</td>
                </tr>
             `;
        });
        html += `
                </tbody>
            </table>
            <div class="divider"></div>
        `;
    }

    html += `
            <div class="text-center" style="margin-top: 8px; font-size: 10.5px; font-weight: 600; color: #444;">
                ${isViewOnly ? 'Receipt Preview Mode' : 'Report Generated Successfully'}
            </div>
    `;

    if (isViewOnly) {
        html += `
            <script>
                window.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        try { window.close(); } catch(err) {}
                    }
                });
            </script>
        </body>
        </html>
        `;
    } else {
        html += `
            <script>
                var hasPrinted = false;
                function triggerPrint() {
                    if (hasPrinted) return;
                    hasPrinted = true;
                    try {
                        window.focus();
                        window.print();
                    } catch(e) {
                        console.error(e);
                    }
                }
                window.addEventListener('afterprint', function() {
                    setTimeout(function() {
                        try { window.close(); } catch(e) {}
                    }, 150);
                });
                function schedulePrint() {
                    if (document.fonts && document.fonts.ready) {
                        document.fonts.ready.then(function() {
                            if (window.requestAnimationFrame) {
                                window.requestAnimationFrame(function() {
                                    window.requestAnimationFrame(function() {
                                        setTimeout(triggerPrint, 250);
                                    });
                                });
                            } else {
                                setTimeout(triggerPrint, 250);
                            }
                        }).catch(function() {
                            setTimeout(triggerPrint, 250);
                        });
                    } else {
                        if (window.requestAnimationFrame) {
                            window.requestAnimationFrame(function() {
                                window.requestAnimationFrame(function() {
                                    setTimeout(triggerPrint, 250);
                                });
                            });
                        } else {
                            setTimeout(triggerPrint, 250);
                        }
                    }
                }
                if (document.readyState === 'complete') {
                    schedulePrint();
                } else {
                    window.addEventListener('load', schedulePrint, { once: true });
                    setTimeout(schedulePrint, 500);
                }
            </script>
        </body>
        </html>
        `;
    }

    return html;
}

window.viewDailyReport = () => {
    const dateInput = document.getElementById('reportDailyDate');
    if (!dateInput || !dateInput.value) {
        if (typeof showCustomAlert === 'function') {
            showCustomAlert('Please select a date first.');
        } else {
            alert('Please select a date first.');
        }
        return;
    }

    const [y, m, d] = dateInput.value.split('-').map(Number);
    const startOfDay = new Date(y, m - 1, d, 0, 0, 0, 0);
    const endOfDay = new Date(y, m - 1, d, 23, 59, 59, 999);

    const html = generateReportHTML(
        'Daily Report',
        `Daily | ${dateInput.value}`,
        startOfDay,
        endOfDay,
        null,
        null,
        'Daily Breakdown',
        'Date',
        true
    );

    openReportPrintWindow(html, 'Daily Report Preview');
};

window.printDailyReport = () => {
    const dateInput = document.getElementById('reportDailyDate');
    if (!dateInput || !dateInput.value) {
        if (typeof showCustomAlert === 'function') {
            showCustomAlert('Please select a date first.');
        } else {
            alert('Please select a date first.');
        }
        return;
    }

    const [y, m, d] = dateInput.value.split('-').map(Number);
    const startOfDay = new Date(y, m - 1, d, 0, 0, 0, 0);
    const endOfDay = new Date(y, m - 1, d, 23, 59, 59, 999);

    const html = generateReportHTML(
        'Daily Report',
        `Daily | ${dateInput.value}`,
        startOfDay,
        endOfDay,
        null,
        null,
        'Daily Breakdown',
        'Date',
        false
    );

    openReportPrintWindow(html, 'Daily Report');
};

window.viewMonthlyReport = () => {
    const monthInput = document.getElementById('reportMonthlyMonth');
    if (!monthInput || !monthInput.value) {
        if (typeof showCustomAlert === 'function') {
            showCustomAlert('Please select a month first.');
        } else {
            alert('Please select a month first.');
        }
        return;
    }

    const [year, month] = monthInput.value.split('-').map(Number);
    const startDate = new Date(year, month - 1, 1, 0, 0, 0, 0);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    // Fetch for details (Daily Breakdown)
    const sales = Storage.get('sales') || [];
    const filteredSales = sales.filter(s => {
        if (!s.date) return false;
        const d = parseDateSafe(s.date);
        return d && d >= startDate && d <= endDate;
    });

    const dailyMap = {};
    filteredSales.forEach(s => {
        const d = parseDateSafe(s.date);
        if (d) {
            const day = d.getDate();
            if (!dailyMap[day]) dailyMap[day] = 0;
            dailyMap[day] += (parseFloat(s.total) || 0);
        }
    });

    const dailyBreakdown = [];
    const daysInMonth = endDate.getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        if (dailyMap[i]) {
            dailyBreakdown.push({
                date: `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
                total: dailyMap[i]
            });
        }
    }

    const html = generateReportHTML(
        'Monthly Report',
        `Monthly | ${new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}`,
        startDate,
        endDate,
        null,
        dailyBreakdown,
        'Daily Breakdown',
        'Date',
        true
    );

    openReportPrintWindow(html, 'Monthly Report Preview');
};

window.printMonthlyReport = () => {
    const monthInput = document.getElementById('reportMonthlyMonth');
    if (!monthInput || !monthInput.value) {
        if (typeof showCustomAlert === 'function') {
            showCustomAlert('Please select a month first.');
        } else {
            alert('Please select a month first.');
        }
        return;
    }

    const [year, month] = monthInput.value.split('-').map(Number);
    const startDate = new Date(year, month - 1, 1, 0, 0, 0, 0);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    // Fetch for details (Daily Breakdown)
    const sales = Storage.get('sales') || [];
    const filteredSales = sales.filter(s => {
        if (!s.date) return false;
        const d = parseDateSafe(s.date);
        return d && d >= startDate && d <= endDate;
    });

    const dailyMap = {};
    filteredSales.forEach(s => {
        const d = parseDateSafe(s.date);
        if (d) {
            const day = d.getDate();
            if (!dailyMap[day]) dailyMap[day] = 0;
            dailyMap[day] += (parseFloat(s.total) || 0);
        }
    });

    const dailyBreakdown = [];
    const daysInMonth = endDate.getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        if (dailyMap[i]) {
            dailyBreakdown.push({
                date: `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
                total: dailyMap[i]
            });
        }
    }

    const html = generateReportHTML(
        'Monthly Report',
        `Monthly | ${new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}`,
        startDate,
        endDate,
        null,
        dailyBreakdown,
        'Daily Breakdown',
        'Date',
        false
    );

    openReportPrintWindow(html, 'Monthly Report');
};

window.viewWeeklyReport = () => {
    const weekInput = document.getElementById('reportWeeklyWeek');
    if (!weekInput || !weekInput.value) {
        if (typeof showCustomAlert === 'function') {
            showCustomAlert('Please select a week first.');
        } else {
            alert('Please select a week first.');
        }
        return;
    }

    const [year, week] = weekInput.value.split('-W').map(Number);
    const simpleDate = new Date(year, 0, 4);
    const dayShift = simpleDate.getDay() || 7;
    const startOfWeekOne = new Date(year, 0, 4 - dayShift + 1);
    const startDate = new Date(startOfWeekOne.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);

    const sales = Storage.get('sales') || [];
    const filteredSales = sales.filter(s => {
        if (!s.date) return false;
        const d = parseDateSafe(s.date);
        return d && d >= startDate && d <= endDate;
    });

    const dailyMap = {};
    filteredSales.forEach(s => {
        const d = parseDateSafe(s.date);
        if (d) {
            const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            if (!dailyMap[dateKey]) dailyMap[dateKey] = 0;
            dailyMap[dateKey] += (parseFloat(s.total) || 0);
        }
    });

    const dailyBreakdown = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });

        if (dailyMap[dateKey] !== undefined || i < 7) {
            dailyBreakdown.push({
                date: `${dateKey} (${dayName})`,
                total: dailyMap[dateKey] || 0
            });
        }
    }

    const html = generateReportHTML(
        'Weekly Report',
        `Week ${week}, ${year}`,
        startDate,
        endDate,
        null,
        dailyBreakdown,
        'Daily Breakdown',
        'Date',
        true
    );

    openReportPrintWindow(html, 'Weekly Report Preview');
};

window.printWeeklyReport = () => {
    const weekInput = document.getElementById('reportWeeklyWeek');
    if (!weekInput || !weekInput.value) {
        if (typeof showCustomAlert === 'function') {
            showCustomAlert('Please select a week first.');
        } else {
            alert('Please select a week first.');
        }
        return;
    }

    const [year, week] = weekInput.value.split('-W').map(Number);
    const simpleDate = new Date(year, 0, 4);
    const dayShift = simpleDate.getDay() || 7;
    const startOfWeekOne = new Date(year, 0, 4 - dayShift + 1);
    const startDate = new Date(startOfWeekOne.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);

    const sales = Storage.get('sales') || [];
    const filteredSales = sales.filter(s => {
        if (!s.date) return false;
        const d = parseDateSafe(s.date);
        return d && d >= startDate && d <= endDate;
    });

    const dailyMap = {};
    filteredSales.forEach(s => {
        const d = parseDateSafe(s.date);
        if (d) {
            const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            if (!dailyMap[dateKey]) dailyMap[dateKey] = 0;
            dailyMap[dateKey] += (parseFloat(s.total) || 0);
        }
    });

    const dailyBreakdown = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });

        if (dailyMap[dateKey] !== undefined || i < 7) {
            dailyBreakdown.push({
                date: `${dateKey} (${dayName})`,
                total: dailyMap[dateKey] || 0
            });
        }
    }

    const html = generateReportHTML(
        'Weekly Report',
        `Week ${week}, ${year}`,
        startDate,
        endDate,
        null,
        dailyBreakdown,
        'Daily Breakdown',
        'Date',
        false
    );

    openReportPrintWindow(html, 'Weekly Report');
};

window.viewAnnualReport = () => {
    const yearInput = document.getElementById('reportAnnualYear');
    if (!yearInput || !yearInput.value) {
        if (typeof showCustomAlert === 'function') {
            showCustomAlert('Please select a year first.');
        } else {
            alert('Please select a year first.');
        }
        return;
    }

    const year = parseInt(yearInput.value);
    const startDate = new Date(year, 0, 1, 0, 0, 0, 0);
    const endDate = new Date(year, 11, 31, 23, 59, 59, 999);

    const sales = Storage.get('sales') || [];
    const filteredSales = sales.filter(s => {
        if (!s.date) return false;
        const d = parseDateSafe(s.date);
        return d && d >= startDate && d <= endDate;
    });

    const monthlyMap = {};
    filteredSales.forEach(s => {
        const d = parseDateSafe(s.date);
        if (d) {
            const m = d.getMonth();
            if (!monthlyMap[m]) monthlyMap[m] = 0;
            monthlyMap[m] += (parseFloat(s.total) || 0);
        }
    });

    const monthlyBreakdown = [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let i = 0; i < 12; i++) {
        monthlyBreakdown.push({
            date: monthNames[i],
            total: monthlyMap[i] || 0
        });
    }

    const html = generateReportHTML(
        'Annual Report',
        `Year ${year}`,
        startDate,
        endDate,
        null,
        monthlyBreakdown,
        'Monthly Breakdown',
        'Month',
        true
    );

    openReportPrintWindow(html, 'Annual Report Preview');
};

window.printAnnualReport = () => {
    const yearInput = document.getElementById('reportAnnualYear');
    if (!yearInput || !yearInput.value) {
        if (typeof showCustomAlert === 'function') {
            showCustomAlert('Please select a year first.');
        } else {
            alert('Please select a year first.');
        }
        return;
    }

    const year = parseInt(yearInput.value);
    const startDate = new Date(year, 0, 1, 0, 0, 0, 0);
    const endDate = new Date(year, 11, 31, 23, 59, 59, 999);

    const sales = Storage.get('sales') || [];
    const filteredSales = sales.filter(s => {
        if (!s.date) return false;
        const d = parseDateSafe(s.date);
        return d && d >= startDate && d <= endDate;
    });

    const monthlyMap = {};
    filteredSales.forEach(s => {
        const d = parseDateSafe(s.date);
        if (d) {
            const m = d.getMonth();
            if (!monthlyMap[m]) monthlyMap[m] = 0;
            monthlyMap[m] += (parseFloat(s.total) || 0);
        }
    });

    const monthlyBreakdown = [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let i = 0; i < 12; i++) {
        monthlyBreakdown.push({
            date: monthNames[i],
            total: monthlyMap[i] || 0
        });
    }

    const html = generateReportHTML(
        'Annual Report',
        `Year ${year}`,
        startDate,
        endDate,
        null,
        monthlyBreakdown,
        'Monthly Breakdown',
        'Month',
        false
    );

    openReportPrintWindow(html, 'Annual Report');
};

window.printStockReport = () => {
    const stockItems = syncAndGetStockItems();

    // Sort logic
    stockItems.sort((a, b) => (a.itemName || '').localeCompare(b.itemName || ''));

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Stock Report</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
            <style>
                *, *::before, *::after {
                    box-sizing: border-box;
                    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
                }
                body { 
                    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important; 
                    font-size: 11px; 
                    width: 80mm; 
                    max-width: 80mm;
                    margin: 0 auto; 
                    padding: 8px;
                    color: #000;
                    background: #fff;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                .text-center { text-align: center; }
                .text-right { text-align: right; }
                .bold { font-weight: 700; }
                .header { margin-bottom: 5px; text-align: center; }
                .header h1 { font-size: 18px; margin: 0 0 2px 0; font-weight: 900; letter-spacing: -0.2px; text-transform: uppercase; }
                .header p { margin: 1px 0; font-size: 11px; font-weight: 500; }
                .divider { border-bottom: 1.5px dashed #000; margin: 5px 0; }
                .report-title-badge { 
                    display: inline-block; 
                    border: 1.5px solid #000; 
                    padding: 2px 14px; 
                    font-size: 11.5px; 
                    font-weight: 800; 
                    text-transform: uppercase; 
                    letter-spacing: 0.5px; 
                    margin: 4px 0 2px 0; 
                }
                .meta-info { 
                    font-size: 10.5px; 
                    line-height: 1.4;
                    margin-bottom: 4px; 
                    text-align: center;
                }
                .report-table { 
                    width: 100%; 
                    border-collapse: collapse; 
                    margin: 4px 0 6px 0; 
                    border: 1.5px solid #000; 
                    background: #fff;
                }
                .report-table th { 
                    text-align: left; 
                    border-bottom: 1.5px solid #000; 
                    padding: 4px 5px; 
                    font-size: 10.5px; 
                    font-weight: 700; 
                    text-transform: uppercase;
                    background: #fff;
                    color: #000;
                }
                .report-table td { 
                    padding: 3.5px 5px; 
                    font-size: 11px; 
                    font-weight: 500;
                    border-bottom: 1px solid #000;
                    color: #000;
                }
                .report-table tr:last-child td {
                    border-bottom: none;
                }
                @media print {
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    body { 
                        width: 100%; 
                        max-width: 100%; 
                        margin: 0; 
                        padding: 3mm 0; 
                    }
                    @page {
                        size: 80mm auto;
                        margin: 3mm;
                    }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Hangout Lounge & Co.</h1>
                <p>Contact: 0300-9509536</p>
                <p>Wah Cantt</p>
                <div><span class="report-title-badge">STOCK REPORT</span></div>
                <div class="divider"></div>
                <div class="meta-info">
                    <div><strong>Date:</strong> ${dateStr} ${timeStr}</div>
                </div>
            </div>
            
            <div class="divider"></div>
            
            <table class="report-table">
                <thead>
                    <tr style="border-bottom: 1.5px solid #000;">
                        <th style="width: 60%; border-right: 1px solid #000;">ITEM NAME</th>
                        <th style="width: 40%; text-align: right;">AVAILABLE STOCK</th>
                    </tr>
                </thead>
                <tbody>
    `;

    if (stockItems.length === 0) {
        html += `<tr><td colspan="2" class="text-center" style="color: #666; font-style: italic;">No stock items found.</td></tr>`;
    } else {
        stockItems.forEach(item => {
            const quantity = parseFloat(item.quantity) || 0;
            const qtyDisplay = Number(quantity.toFixed(2));

            html += `
                <tr>
                    <td style="border-right: 1px solid #000;">${escapeHtml(item.itemName || 'Unknown Item')}</td>
                    <td class="text-right bold">${qtyDisplay} ${escapeHtml(item.unit || '')}</td>
                </tr>
            `;
        });
    }

    html += `
                </tbody>
            </table>
            
            <div class="divider"></div>
            <div class="text-center" style="font-size: 10.5px; margin-top: 5px; font-weight: 600; color: #444;">End of Report</div>
            <script>
                var hasPrinted = false;
                function triggerPrint() {
                    if (hasPrinted) return;
                    hasPrinted = true;
                    try {
                        window.focus();
                        window.print();
                    } catch(e) {
                        console.error(e);
                    }
                }
                window.addEventListener('afterprint', function() {
                    setTimeout(function() {
                        try { window.close(); } catch(e) {}
                    }, 150);
                });
                function schedulePrint() {
                    if (document.fonts && document.fonts.ready) {
                        document.fonts.ready.then(function() {
                            if (window.requestAnimationFrame) {
                                window.requestAnimationFrame(function() {
                                    window.requestAnimationFrame(function() {
                                        setTimeout(triggerPrint, 250);
                                    });
                                });
                            } else {
                                setTimeout(triggerPrint, 250);
                            }
                        }).catch(function() {
                            setTimeout(triggerPrint, 250);
                        });
                    } else {
                        if (window.requestAnimationFrame) {
                            window.requestAnimationFrame(function() {
                                window.requestAnimationFrame(function() {
                                    setTimeout(triggerPrint, 250);
                                });
                            });
                        } else {
                            setTimeout(triggerPrint, 250);
                        }
                    }
                }
                if (document.readyState === 'complete') {
                    schedulePrint();
                } else {
                    window.addEventListener('load', schedulePrint, { once: true });
                    setTimeout(schedulePrint, 500);
                }
            </script>
        </body>
        </html>
    `;

    openReportPrintWindow(html, 'Stock Report');
};

// ==========================================
// ITEM PROFIT & RECIPE COSTING SYSTEM
// ==========================================

const DEFAULT_MENU_RECIPES = {
    'loaded fries': [
        { itemName: 'Potatoes', qty: 250, unit: 'g' },
        { itemName: 'Chicken', qty: 100, unit: 'g' },
        { itemName: 'Mayonnaise', qty: 40, unit: 'g' },
        { itemName: 'Special Masala', qty: 15, unit: 'g' },
        { itemName: 'Cheese Slices', qty: 1, unit: 'pcs' },
        { itemName: 'Cooking Oil', qty: 40, unit: 'mL' }
    ],
    'french fries': [
        { itemName: 'Potatoes', qty: 200, unit: 'g' },
        { itemName: 'Cooking Oil', qty: 40, unit: 'mL' },
        { itemName: 'Special Masala', qty: 10, unit: 'g' }
    ],
    'fries': [
        { itemName: 'Potatoes', qty: 200, unit: 'g' },
        { itemName: 'Cooking Oil', qty: 40, unit: 'mL' },
        { itemName: 'Special Masala', qty: 10, unit: 'g' }
    ],
    'burger': [
        { itemName: 'Burger Buns', qty: 1, unit: 'pcs' },
        { itemName: 'Chicken', qty: 120, unit: 'g' },
        { itemName: 'Mayonnaise', qty: 25, unit: 'g' },
        { itemName: 'Cheese Slices', qty: 1, unit: 'pcs' },
        { itemName: 'Cooking Oil', qty: 30, unit: 'mL' }
    ],
    'zinger': [
        { itemName: 'Burger Buns', qty: 1, unit: 'pcs' },
        { itemName: 'Chicken', qty: 140, unit: 'g' },
        { itemName: 'Mayonnaise', qty: 30, unit: 'g' },
        { itemName: 'Cheese Slices', qty: 1, unit: 'pcs' },
        { itemName: 'Cooking Oil', qty: 40, unit: 'mL' }
    ],
    'sandwich': [
        { itemName: 'Sandwich Bread', qty: 2, unit: 'pcs' },
        { itemName: 'Chicken', qty: 90, unit: 'g' },
        { itemName: 'Mayonnaise', qty: 30, unit: 'g' },
        { itemName: 'Cheese Slices', qty: 1, unit: 'pcs' },
        { itemName: 'Eggs', qty: 1, unit: 'pcs' }
    ],
    'pizza': [
        { itemName: 'Flour (Atta)', qty: 180, unit: 'g' },
        { itemName: 'Chicken', qty: 120, unit: 'g' },
        { itemName: 'Cheese Slices', qty: 2, unit: 'pcs' },
        { itemName: 'Tomato Ketchup', qty: 35, unit: 'g' },
        { itemName: 'Special Masala', qty: 10, unit: 'g' }
    ],
    'shawarma': [
        { itemName: 'Sandwich Bread', qty: 1, unit: 'pcs' },
        { itemName: 'Chicken', qty: 100, unit: 'g' },
        { itemName: 'Mayonnaise', qty: 35, unit: 'g' },
        { itemName: 'Garlic Sauce', qty: 20, unit: 'g' }
    ],
    'wings': [
        { itemName: 'Chicken Wings', qty: 6, unit: 'pcs' },
        { itemName: 'Cooking Oil', qty: 50, unit: 'mL' },
        { itemName: 'Garlic Sauce', qty: 30, unit: 'g' }
    ],
    'tea': [
        { itemName: 'Milk (Packed)', qty: 150, unit: 'mL' },
        { itemName: 'Tea Leaves', qty: 8, unit: 'g' },
        { itemName: 'Sugar', qty: 15, unit: 'g' }
    ],
    'chai': [
        { itemName: 'Milk (Packed)', qty: 150, unit: 'mL' },
        { itemName: 'Tea Leaves', qty: 8, unit: 'g' },
        { itemName: 'Sugar', qty: 15, unit: 'g' }
    ],
    'coffee': [
        { itemName: 'Milk (Packed)', qty: 180, unit: 'mL' },
        { itemName: 'Coffee Beans', qty: 12, unit: 'g' },
        { itemName: 'Sugar', qty: 15, unit: 'g' }
    ]
};

function calculateIngredientCost(stockItem, qty, recipeUnit) {
    if (!stockItem) return 0;
    const unitPrice = parseFloat(stockItem.unitPrice) || 0;
    const q = parseFloat(qty) || 0;
    if (q <= 0 || unitPrice <= 0) return 0;

    const stockUnit = (stockItem.unit || 'kg').toLowerCase().trim();
    const targetUnit = (recipeUnit || stockUnit).toLowerCase().trim();

    // Weight conversions (kg <-> g)
    if (stockUnit === 'kg') {
        if (targetUnit === 'g' || targetUnit === 'gram' || targetUnit === 'grams') {
            return (q / 1000) * unitPrice;
        }
        if (targetUnit === 'kg') {
            return q * unitPrice;
        }
        if (targetUnit === 'tbsp') {
            return (q * 15 / 1000) * unitPrice;
        }
        if (targetUnit === 'tsp') {
            return (q * 5 / 1000) * unitPrice;
        }
    } else if (stockUnit === 'g') {
        if (targetUnit === 'g') return q * unitPrice;
        if (targetUnit === 'kg') return q * 1000 * unitPrice;
    }

    // Volume conversions (L / liter <-> mL / ml)
    if (stockUnit === 'l' || stockUnit === 'liter' || stockUnit === 'liters') {
        if (targetUnit === 'ml' || targetUnit === 'ml' || targetUnit === 'milliliters') {
            return (q / 1000) * unitPrice;
        }
        if (targetUnit === 'l' || targetUnit === 'liter') {
            return q * unitPrice;
        }
        if (targetUnit === 'tbsp') {
            return (q * 15 / 1000) * unitPrice;
        }
        if (targetUnit === 'tsp') {
            return (q * 5 / 1000) * unitPrice;
        }
    } else if (stockUnit === 'ml' || stockUnit === 'ml') {
        if (targetUnit === 'ml') return q * unitPrice;
        if (targetUnit === 'l' || targetUnit === 'liter') return q * 1000 * unitPrice;
    }

    // Direct unit match (pcs, pack, box, portion, etc.)
    return q * unitPrice;
}

function getItemRecipesMap() {
    let recipes = Storage.get('itemRecipes');
    if (!recipes || typeof recipes !== 'object' || Array.isArray(recipes)) {
        recipes = {};
    }
    return recipes;
}

function saveItemRecipesMap(recipes) {
    Storage.set('itemRecipes', recipes);
}

function getAllItemsProfitData() {
    const menuItems = Storage.get('menuItems') || [];
    const categories = Storage.get('menuCategories') || [];
    const stocks = syncAndGetStockItems();
    const recipesMap = getItemRecipesMap();

    const stockById = {};
    const stockByName = {};
    stocks.forEach(s => {
        if (s.id) stockById[s.id] = s;
        if (s.itemName) stockByName[s.itemName.toLowerCase().trim()] = s;
    });

    const categoryMap = {};
    categories.forEach(c => {
        categoryMap[c.id] = c.name;
    });

    return menuItems.map(item => {
        const itemId = String(item.id);
        let recipe = recipesMap[itemId];

        // If no recipe explicitly saved, check template match
        if (!recipe) {
            const nameLower = (item.name || '').toLowerCase();
            for (const [key, tpl] of Object.entries(DEFAULT_MENU_RECIPES)) {
                if (nameLower.includes(key)) {
                    const ingredients = tpl.map(t => {
                        const matchingStock = stockByName[t.itemName.toLowerCase()] || 
                            stocks.find(s => s.itemName.toLowerCase().includes(t.itemName.toLowerCase()));
                        return {
                            stockId: matchingStock ? matchingStock.id : '',
                            itemName: matchingStock ? matchingStock.itemName : t.itemName,
                            qty: t.qty,
                            unit: t.unit
                        };
                    });
                    recipe = {
                        menuItemId: itemId,
                        ingredients: ingredients,
                        isAutoTemplate: true
                    };
                    break;
                }
            }
        }

        const ingredientsDetailed = [];
        let totalCost = 0;

        if (recipe && Array.isArray(recipe.ingredients)) {
            recipe.ingredients.forEach(ing => {
                const stock = stockById[ing.stockId] || 
                    (ing.itemName ? stockByName[ing.itemName.toLowerCase().trim()] : null) ||
                    (ing.itemName ? stocks.find(s => s.itemName.toLowerCase().includes(ing.itemName.toLowerCase().trim())) : null);
                
                const cost = calculateIngredientCost(stock, ing.qty, ing.unit);
                totalCost += cost;
                ingredientsDetailed.push({
                    stockId: stock ? stock.id : (ing.stockId || ''),
                    itemName: ing.itemName || (stock ? stock.itemName : 'Ingredient'),
                    qty: ing.qty,
                    unit: ing.unit,
                    stockUnitPrice: stock ? parseFloat(stock.unitPrice) || 0 : 0,
                    stockUnit: stock ? stock.unit : ing.unit,
                    cost: cost,
                    stockFound: !!stock
                });
            });
        }

        const sellPrice = parseFloat(item.price) || 0;
        const netProfit = sellPrice - totalCost;
        const marginPercent = sellPrice > 0 ? (netProfit / sellPrice) * 100 : 0;
        const foodCostPercent = sellPrice > 0 ? (totalCost / sellPrice) * 100 : 0;
        const hasRecipe = ingredientsDetailed.length > 0;

        return {
            item,
            id: item.id,
            name: item.name || 'Unnamed Item',
            categoryId: item.categoryId,
            categoryName: categoryMap[item.categoryId] || 'General',
            image: item.image,
            sellPrice,
            totalCost,
            netProfit,
            marginPercent,
            foodCostPercent,
            hasRecipe,
            recipe,
            ingredientsDetailed
        };
    });
}

window.loadItemProfitSection = function loadItemProfitSection() {
    // Populate Categories Filter
    const catSelect = document.getElementById('profitCategoryFilter');
    if (catSelect) {
        const categories = Storage.get('menuCategories') || [];
        const currentVal = catSelect.value || 'all';
        catSelect.innerHTML = '<option value="all">All Categories</option>' + 
            categories.map(c => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join('');
        catSelect.value = currentVal;
    }

    loadItemProfitTable();
};

window.loadItemProfitTable = function loadItemProfitTable() {
    const allData = getAllItemsProfitData();
    const tbody = document.getElementById('profitTableBody');
    if (!tbody) return;

    // Filters
    const catFilter = document.getElementById('profitCategoryFilter')?.value || 'all';
    const statusFilter = document.getElementById('profitStatusFilter')?.value || 'all';
    const searchQuery = (document.getElementById('profitSearch')?.value || '').toLowerCase().trim();
    const sortFilter = document.getElementById('profitSortFilter')?.value || 'margin-desc';

    let filtered = allData.filter(d => {
        if (catFilter !== 'all' && String(d.categoryId) !== String(catFilter)) {
            return false;
        }
        if (statusFilter === 'configured' && !d.hasRecipe) {
            return false;
        }
        if (statusFilter === 'missing' && d.hasRecipe) {
            return false;
        }
        if (searchQuery) {
            const matchName = d.name.toLowerCase().includes(searchQuery);
            const matchCat = d.categoryName.toLowerCase().includes(searchQuery);
            const matchIng = d.ingredientsDetailed.some(i => i.itemName.toLowerCase().includes(searchQuery));
            if (!matchName && !matchCat && !matchIng) return false;
        }
        return true;
    });

    // Sorting
    filtered.sort((a, b) => {
        switch (sortFilter) {
            case 'margin-desc': return b.marginPercent - a.marginPercent;
            case 'margin-asc': return a.marginPercent - b.marginPercent;
            case 'profit-desc': return b.netProfit - a.netProfit;
            case 'profit-asc': return a.netProfit - b.netProfit;
            case 'price-desc': return b.sellPrice - a.sellPrice;
            case 'cost-desc': return b.totalCost - a.totalCost;
            case 'name-asc': return a.name.localeCompare(b.name);
            default: return b.marginPercent - a.marginPercent;
        }
    });

    // Compute Executive Stats
    let totalItems = allData.length;
    let configuredCount = allData.filter(d => d.hasRecipe).length;
    let sumMargin = 0;
    let sumProfit = 0;
    let topMarginItem = null;

    allData.forEach(d => {
        sumMargin += d.marginPercent;
        sumProfit += d.netProfit;
        if (!topMarginItem || (d.hasRecipe && d.marginPercent > topMarginItem.marginPercent)) {
            if (d.hasRecipe) topMarginItem = d;
        }
    });

    const avgMargin = totalItems > 0 ? (sumMargin / totalItems) : 0;
    const avgProfit = totalItems > 0 ? (sumProfit / totalItems) : 0;

    const avgMarginEl = document.getElementById('profitStatAvgMargin');
    if (avgMarginEl) avgMarginEl.textContent = avgMargin.toFixed(1) + '%';

    const avgProfitEl = document.getElementById('profitStatAvgProfit');
    if (avgProfitEl) avgProfitEl.textContent = 'Rs. ' + formatNumber(Math.round(avgProfit));

    const coverageEl = document.getElementById('profitStatRecipeCoverage');
    if (coverageEl) coverageEl.textContent = `${configuredCount} / ${totalItems}`;

    const topItemEl = document.getElementById('profitStatTopItem');
    const topItemSubEl = document.getElementById('profitStatTopItemSub');
    if (topItemEl) {
        if (topMarginItem) {
            topItemEl.textContent = topMarginItem.name;
            if (topItemSubEl) topItemSubEl.textContent = `${topMarginItem.marginPercent.toFixed(1)}% margin (Rs. ${formatNumber(Math.round(topMarginItem.netProfit))} profit)`;
        } else {
            topItemEl.textContent = 'None set';
            if (topItemSubEl) topItemSubEl.textContent = 'Configure recipes below';
        }
    }

    const countEl = document.getElementById('profitItemsCount');
    if (countEl) {
        countEl.textContent = `Showing ${filtered.length} of ${totalItems} menu items`;
    }

    // Render Table Rows
    tbody.innerHTML = '';
    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 36px 20px; color: #64748b; font-size: 14.5px;">
                    <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
                    No menu items match your search / filter criteria.
                </td>
            </tr>
        `;
        return;
    }

    filtered.forEach((row, idx) => {
        const tr = document.createElement('tr');
        tr.style.cssText = 'border-bottom: 1px solid #f1f5f9; transition: background 0.15s ease;';
        tr.onmouseover = () => { tr.style.background = '#f8fafc'; };
        tr.onmouseout = () => { tr.style.background = 'transparent'; };

        let marginBadgeClass = 'neutral';
        if (row.hasRecipe) {
            if (row.marginPercent >= 50) marginBadgeClass = 'high';
            else if (row.marginPercent >= 30) marginBadgeClass = 'medium';
            else marginBadgeClass = 'low';
        }

        // Ingredients summary chips
        let ingredientsHTML = '';
        if (row.hasRecipe && row.ingredientsDetailed.length > 0) {
            const chips = row.ingredientsDetailed.map(i => `
                <span class="recipe-ingredient-chip" title="${escapeHtml(i.itemName)}: ${i.qty} ${i.unit} @ Rs. ${formatNumber(i.stockUnitPrice)}/${i.stockUnit}">
                    ${escapeHtml(i.itemName)} <strong>${i.qty}${i.unit}</strong>
                    <span class="recipe-ingredient-chip-cost">(Rs. ${formatNumber(Math.round(i.cost))})</span>
                </span>
            `).join('');
            ingredientsHTML = `<div style="display: flex; flex-wrap: wrap; gap: 4px; max-width: 320px;">${chips}</div>`;
        } else {
            ingredientsHTML = `
                <span style="display: inline-flex; align-items: center; gap: 5px; color: #94a3b8; font-size: 12.5px; font-style: italic;">
                    ⚠️ No recipe ingredients defined
                </span>
            `;
        }

        tr.innerHTML = `
            <td style="padding: 12px 14px; text-align: center; font-weight: 700; color: #64748b; font-size: 13.5px;">
                ${idx + 1}
            </td>
            <td style="padding: 12px 16px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 40px; height: 40px; border-radius: 8px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; font-size: 20px; overflow: hidden; border: 1px solid #e2e8f0; flex-shrink: 0;">
                        ${row.image ? `<img src="${row.image}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.outerHTML='🍲'">` : '🍲'}
                    </div>
                    <div>
                        <div style="font-weight: 700; color: #1e293b; font-size: 14.5px;">${escapeHtml(row.name)}</div>
                        <div style="font-size: 12px; color: #0284c7; font-weight: 600; margin-top: 1px;">${escapeHtml(row.categoryName)}</div>
                    </div>
                </div>
            </td>
            <td style="padding: 12px 14px; text-align: right; font-weight: 700; color: #0f172a; font-size: 14.5px;">
                Rs. ${formatNumber(row.sellPrice)}
            </td>
            <td style="padding: 12px 14px; text-align: right; font-weight: 700; color: #dc2626; font-size: 14.5px;">
                ${row.hasRecipe ? `Rs. ${formatNumber(row.totalCost.toFixed(1))}` : '<span style="color: #94a3b8; font-weight: 500;">-</span>'}
            </td>
            <td style="padding: 12px 14px; text-align: right; font-weight: 800; color: ${row.netProfit >= 0 ? '#059669' : '#dc2626'}; font-size: 14.5px;">
                ${row.hasRecipe ? `Rs. ${formatNumber(Math.round(row.netProfit))}` : '<span style="color: #94a3b8; font-weight: 500;">-</span>'}
            </td>
            <td style="padding: 12px 14px; text-align: center;">
                ${row.hasRecipe ? `
                    <span class="profit-margin-badge ${marginBadgeClass}">
                        ${row.marginPercent.toFixed(1)}%
                    </span>
                ` : `
                    <span class="profit-margin-badge neutral">
                        Not Set
                    </span>
                `}
            </td>
            <td style="padding: 12px 16px;">
                ${ingredientsHTML}
            </td>
            <td style="padding: 12px 14px; text-align: center;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <button type="button" onclick="openRecipeCostModal('${row.id}')"
                        title="Set or Edit Recipe Ingredients"
                        style="background: #eff6ff; border: 1px solid #bfdbfe; color: #2563eb; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 12.5px; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s ease;">
                        <span>🥗</span> ${row.hasRecipe ? 'Edit Recipe' : 'Set Recipe'}
                    </button>
                    ${row.hasRecipe ? `
                    <button type="button" onclick="openCostSlipModal('${row.id}')"
                        title="View Detailed Cost Breakdown Slip"
                        style="background: #f8fafc; border: 1px solid #cbd5e1; color: #475569; padding: 6px 10px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 12.5px; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s ease;">
                        <span>🧾</span> Slip
                    </button>
                    ` : ''}
                </div>
            </td>
        `;

        tbody.appendChild(tr);
    });
};

// ==========================================
// RECIPE CONFIGURATION MODAL CONTROLLER
// ==========================================

let activeRecipeItemId = null;

window.openRecipeCostModalForNewOrSelect = function openRecipeCostModalForNewOrSelect() {
    const allData = getAllItemsProfitData();
    if (allData.length === 0) {
        showCustomAlert('Please add menu items in Menu Management first.');
        return;
    }
    // Open for first missing or first item
    const missing = allData.find(d => !d.hasRecipe) || allData[0];
    openRecipeCostModal(missing.id);
};

window.openRecipeCostModal = function openRecipeCostModal(itemId) {
    activeRecipeItemId = String(itemId);
    const allData = getAllItemsProfitData();
    const itemData = allData.find(d => String(d.id) === String(itemId));
    if (!itemData) return;

    const modal = document.getElementById('recipeCostModal');
    if (!modal) return;

    modal.style.display = 'flex';

    // Populate Item Info
    const nameEl = document.getElementById('recipeModalItemName');
    if (nameEl) nameEl.textContent = itemData.name;

    const catEl = document.getElementById('recipeModalItemCategory');
    if (catEl) catEl.textContent = itemData.categoryName;

    const imgEl = document.getElementById('recipeModalItemImage');
    if (imgEl) {
        imgEl.innerHTML = itemData.image ? 
            `<img src="${itemData.image}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.outerHTML='🍲'">` : '🍲';
    }

    const priceInput = document.getElementById('recipeModalSellPrice');
    if (priceInput) {
        priceInput.value = itemData.sellPrice;
    }

    // Populate Quick Add Stock Chips
    const stocks = syncAndGetStockItems();
    const chipsContainer = document.getElementById('recipeQuickAddChips');
    if (chipsContainer) {
        chipsContainer.innerHTML = stocks.slice(0, 15).map(s => `
            <span class="recipe-quick-chip" onclick="quickAddStockToRecipe('${s.id}')" title="Stock: ${s.quantity} ${s.unit} @ Rs. ${formatNumber(s.unitPrice)}/${s.unit}">
                ➕ ${escapeHtml(s.itemName)} <span style="color: #64748b; font-size: 11px;">(${s.unit})</span>
            </span>
        `).join('');
    }

    // Populate Ingredients Table
    const tbody = document.getElementById('recipeIngredientsTableBody');
    if (tbody) {
        tbody.innerHTML = '';
        if (itemData.ingredientsDetailed.length > 0) {
            itemData.ingredientsDetailed.forEach(ing => {
                addRecipeIngredientRow(ing);
            });
        } else {
            // Add initial empty row
            addRecipeIngredientRow();
        }
    }

    recalculateRecipeLiveSummary();
};

window.closeRecipeCostModal = function closeRecipeCostModal() {
    const modal = document.getElementById('recipeCostModal');
    if (modal) modal.style.display = 'none';
    activeRecipeItemId = null;
};

window.addRecipeIngredientRow = function addRecipeIngredientRow(data = null) {
    const tbody = document.getElementById('recipeIngredientsTableBody');
    if (!tbody) return;

    const stocks = syncAndGetStockItems();
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid #e2e8f0';

    const selectedStockId = data ? data.stockId : '';
    const selectedQty = data ? data.qty : '';
    const selectedUnit = data ? data.unit : 'g';

    const stockOptions = stocks.map(s => {
        const isSelected = (selectedStockId && String(s.id) === String(selectedStockId)) || 
            (!selectedStockId && data && data.itemName && s.itemName.toLowerCase() === data.itemName.toLowerCase());
        return `<option value="${s.id}" data-unit="${escapeHtml(s.unit)}" data-price="${s.unitPrice}" ${isSelected ? 'selected' : ''}>
            ${escapeHtml(s.itemName)} (${s.unit} @ Rs. ${formatNumber(s.unitPrice)})
        </option>`;
    }).join('');

    tr.innerHTML = `
        <td style="padding: 8px 10px;">
            <select class="recipe-row-input recipe-ing-stock-select" onchange="onRecipeIngredientStockChange(this)">
                <option value="">-- Select Stock Item --</option>
                ${stockOptions}
            </select>
        </td>
        <td style="padding: 8px 6px; text-align: center;">
            <div style="display: inline-flex; align-items: center; gap: 3px; justify-content: center;">
                <button type="button" class="recipe-step-btn" onclick="adjustRecipeRowQty(this, -10)" title="Decrease 10">-10</button>
                <input type="number" class="recipe-row-input recipe-ing-qty-input" value="${selectedQty}" placeholder="0" min="0" step="any" oninput="recalculateRecipeLiveSummary()" style="text-align: center; width: 62px; padding: 6px 4px;">
                <button type="button" class="recipe-step-btn" onclick="adjustRecipeRowQty(this, 10)" title="Add 10">+10</button>
                <button type="button" class="recipe-step-btn" onclick="adjustRecipeRowQty(this, 50)" title="Add 50">+50</button>
            </div>
        </td>
        <td style="padding: 8px 6px;">
            <select class="recipe-row-input recipe-ing-unit-select" onchange="recalculateRecipeLiveSummary()">
                <option value="g" ${selectedUnit === 'g' ? 'selected' : ''}>g (grams)</option>
                <option value="kg" ${selectedUnit === 'kg' ? 'selected' : ''}>kg</option>
                <option value="mL" ${selectedUnit === 'mL' || selectedUnit === 'ml' ? 'selected' : ''}>mL</option>
                <option value="L" ${selectedUnit === 'L' || selectedUnit === 'liter' ? 'selected' : ''}>L (liters)</option>
                <option value="pcs" ${selectedUnit === 'pcs' ? 'selected' : ''}>pcs</option>
                <option value="pack" ${selectedUnit === 'pack' ? 'selected' : ''}>pack</option>
                <option value="portion" ${selectedUnit === 'portion' ? 'selected' : ''}>portion</option>
                <option value="tbsp" ${selectedUnit === 'tbsp' ? 'selected' : ''}>tbsp (15g)</option>
                <option value="tsp" ${selectedUnit === 'tsp' ? 'selected' : ''}>tsp (5g)</option>
            </select>
        </td>
        <td style="padding: 8px 10px; text-align: right; color: #475569; font-weight: 600; font-size: 13px;">
            <span class="recipe-ing-rate-label">Rs. 0</span>
        </td>
        <td style="padding: 8px 10px; text-align: right; color: #dc2626; font-weight: 700; font-size: 13.5px;">
            <span class="recipe-ing-cost-label">Rs. 0.00</span>
        </td>
        <td style="padding: 8px 6px; text-align: center;">
            <button type="button" class="recipe-row-delete-btn" onclick="removeRecipeIngredientRow(this)" title="Remove Ingredient">
                ✕
            </button>
        </td>
    `;

    tbody.appendChild(tr);

    // Trigger initial rate label update
    const select = tr.querySelector('.recipe-ing-stock-select');
    if (select) onRecipeIngredientStockChange(select, false);

    recalculateRecipeLiveSummary();
};

window.removeRecipeIngredientRow = function removeRecipeIngredientRow(btn) {
    const tr = btn.closest('tr');
    if (tr) {
        tr.remove();
        recalculateRecipeLiveSummary();
    }
};

window.onRecipeIngredientStockChange = function onRecipeIngredientStockChange(selectEl, autoSetUnit = true) {
    const tr = selectEl.closest('tr');
    if (!tr) return;

    const opt = selectEl.options[selectEl.selectedIndex];
    const unit = opt ? opt.getAttribute('data-unit') : '';
    const price = opt ? parseFloat(opt.getAttribute('data-price')) || 0 : 0;

    const rateLabel = tr.querySelector('.recipe-ing-rate-label');
    if (rateLabel) {
        rateLabel.textContent = opt && opt.value ? `@ Rs. ${formatNumber(price)}/${unit}` : '-';
    }

    if (autoSetUnit && unit) {
        const unitSelect = tr.querySelector('.recipe-ing-unit-select');
        if (unitSelect) {
            const u = unit.toLowerCase();
            if (u === 'kg') unitSelect.value = 'g';
            else if (u === 'l' || u === 'liter') unitSelect.value = 'mL';
            else if (u === 'pcs') unitSelect.value = 'pcs';
            else if (u === 'pack') unitSelect.value = 'pack';
            else unitSelect.value = unit;
        }
    }

    recalculateRecipeLiveSummary();
};

window.quickAddStockToRecipe = function quickAddStockToRecipe(stockId) {
    const stocks = syncAndGetStockItems();
    const stock = stocks.find(s => String(s.id) === String(stockId));
    if (!stock) return;

    let defaultQty = 1;
    let defaultUnit = stock.unit;

    if (stock.unit === 'kg') {
        defaultQty = 100;
        defaultUnit = 'g';
    } else if (stock.unit === 'L' || stock.unit === 'liter') {
        defaultQty = 50;
        defaultUnit = 'mL';
    }

    addRecipeIngredientRow({
        stockId: stock.id,
        itemName: stock.itemName,
        qty: defaultQty,
        unit: defaultUnit
    });
};

window.clearRecipeIngredients = function clearRecipeIngredients() {
    const tbody = document.getElementById('recipeIngredientsTableBody');
    if (tbody) tbody.innerHTML = '';
    recalculateRecipeLiveSummary();
};

window.recalculateRecipeLiveSummary = function recalculateRecipeLiveSummary() {
    const tbody = document.getElementById('recipeIngredientsTableBody');
    if (!tbody) return;

    const stocks = syncAndGetStockItems();
    const stockById = {};
    stocks.forEach(s => { stockById[String(s.id)] = s; });

    let totalCost = 0;
    const rows = tbody.querySelectorAll('tr');

    rows.forEach(tr => {
        const select = tr.querySelector('.recipe-ing-stock-select');
        const qtyInput = tr.querySelector('.recipe-ing-qty-input');
        const unitSelect = tr.querySelector('.recipe-ing-unit-select');
        const costLabel = tr.querySelector('.recipe-ing-cost-label');

        const stockId = select ? select.value : '';
        const qty = qtyInput ? parseFloat(qtyInput.value) || 0 : 0;
        const unit = unitSelect ? unitSelect.value : 'g';
        const stock = stockById[stockId];

        const cost = calculateIngredientCost(stock, qty, unit);
        totalCost += cost;

        if (costLabel) {
            costLabel.textContent = `Rs. ${cost.toFixed(2)}`;
        }
    });

    const sellPriceInput = document.getElementById('recipeModalSellPrice');
    const sellPrice = sellPriceInput ? parseFloat(sellPriceInput.value) || 0 : 0;
    const netProfit = sellPrice - totalCost;
    const margin = sellPrice > 0 ? (netProfit / sellPrice) * 100 : 0;

    const liveCostEl = document.getElementById('recipeLiveCost');
    if (liveCostEl) liveCostEl.textContent = `Rs. ${totalCost.toFixed(2)}`;

    const liveProfitEl = document.getElementById('recipeLiveProfit');
    if (liveProfitEl) {
        liveProfitEl.textContent = `Rs. ${netProfit.toFixed(2)}`;
        liveProfitEl.style.color = netProfit >= 0 ? '#059669' : '#dc2626';
    }

    const liveMarginEl = document.getElementById('recipeLiveMargin');
    if (liveMarginEl) {
        liveMarginEl.textContent = `${margin.toFixed(1)}%`;
        liveMarginEl.style.color = margin >= 50 ? '#059669' : margin >= 30 ? '#d97706' : '#dc2626';
    }
};

window.saveRecipeCosting = function saveRecipeCosting() {
    if (!activeRecipeItemId) return;

    const tbody = document.getElementById('recipeIngredientsTableBody');
    if (!tbody) return;

    const stocks = syncAndGetStockItems();
    const stockById = {};
    stocks.forEach(s => { stockById[String(s.id)] = s; });

    const ingredients = [];
    const rows = tbody.querySelectorAll('tr');

    rows.forEach(tr => {
        const select = tr.querySelector('.recipe-ing-stock-select');
        const qtyInput = tr.querySelector('.recipe-ing-qty-input');
        const unitSelect = tr.querySelector('.recipe-ing-unit-select');

        const stockId = select ? select.value : '';
        const qty = qtyInput ? parseFloat(qtyInput.value) || 0 : 0;
        const unit = unitSelect ? unitSelect.value : 'g';
        const stock = stockById[stockId];

        if (stockId && qty > 0) {
            ingredients.push({
                stockId: stockId,
                itemName: stock ? stock.itemName : '',
                qty: qty,
                unit: unit
            });
        }
    });

    const recipesMap = getItemRecipesMap();
    recipesMap[activeRecipeItemId] = {
        menuItemId: activeRecipeItemId,
        ingredients: ingredients,
        updatedAt: new Date().toISOString()
    };
    saveItemRecipesMap(recipesMap);

    // Update selling price on menu item if edited
    const sellPriceInput = document.getElementById('recipeModalSellPrice');
    const newPrice = sellPriceInput ? parseFloat(sellPriceInput.value) : null;
    if (newPrice !== null && !isNaN(newPrice) && newPrice >= 0) {
        const menuItems = Storage.get('menuItems') || [];
        const item = menuItems.find(m => String(m.id) === String(activeRecipeItemId));
        if (item && item.price !== newPrice) {
            item.price = newPrice;
            Storage.set('menuItems', menuItems);
        }
    }

    closeRecipeCostModal();
    loadItemProfitTable();
    if (typeof loadMenuItemsList === 'function') {
        loadMenuItemsList();
    }

    if (typeof showCustomAlert === 'function') {
        showCustomAlert('Recipe and item costing saved successfully! ✅');
    }
};

// ==========================================
// COST BREAKDOWN SLIP & PRINTING
// ==========================================

let activeSlipItemId = null;

window.openCostSlipModal = function openCostSlipModal(itemId) {
    activeSlipItemId = String(itemId);
    const allData = getAllItemsProfitData();
    const itemData = allData.find(d => String(d.id) === String(itemId));
    if (!itemData) return;

    const modal = document.getElementById('costSlipModal');
    const content = document.getElementById('costSlipContent');
    if (!modal || !content) return;

    let ingredientsRows = '';
    itemData.ingredientsDetailed.forEach(i => {
        ingredientsRows += `
            <tr>
                <td style="padding: 4px 6px; border-bottom: 1px solid #e2e8f0; font-weight: 500;">${escapeHtml(i.itemName)}</td>
                <td style="padding: 4px 6px; border-bottom: 1px solid #e2e8f0; text-align: center; font-weight: 600;">${i.qty} ${i.unit}</td>
                <td style="padding: 4px 6px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 700;">Rs. ${i.cost.toFixed(1)}</td>
            </tr>
        `;
    });

    content.innerHTML = `
        <div style="text-align: center; border-bottom: 1.5px dashed #cbd5e1; padding-bottom: 12px; margin-bottom: 12px;">
            <div style="font-weight: 800; font-size: 16px; color: #1e293b; text-transform: uppercase;">Hangout Lounge & Co.</div>
            <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Item Recipe & Cost Breakdown</div>
            <div style="font-weight: 800; font-size: 17px; color: #0284c7; margin-top: 6px;">${escapeHtml(itemData.name)}</div>
            <div style="font-size: 11.5px; color: #64748b;">Category: ${escapeHtml(itemData.categoryName)}</div>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 12.5px; margin-bottom: 14px;">
            <thead>
                <tr style="background: #f1f5f9; color: #334155;">
                    <th style="padding: 5px 6px; text-align: left; font-weight: 700;">Ingredient</th>
                    <th style="padding: 5px 6px; text-align: center; font-weight: 700;">Portion</th>
                    <th style="padding: 5px 6px; text-align: right; font-weight: 700;">Cost</th>
                </tr>
            </thead>
            <tbody>
                ${ingredientsRows}
            </tbody>
        </table>

        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 12px; font-size: 13.5px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: #64748b; font-weight: 600;">Selling Price:</span>
                <span style="font-weight: 700; color: #1e293b;">Rs. ${formatNumber(itemData.sellPrice)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: #64748b; font-weight: 600;">Total Ingredient Cost:</span>
                <span style="font-weight: 700; color: #dc2626;">Rs. ${itemData.totalCost.toFixed(2)}</span>
            </div>
            <div style="border-top: 1px dashed #cbd5e1; margin: 6px 0; padding-top: 6px; display: flex; justify-content: space-between;">
                <span style="color: #059669; font-weight: 800;">Net Profit / Serving:</span>
                <span style="font-weight: 800; color: #059669;">Rs. ${itemData.netProfit.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                <span style="color: #0284c7; font-weight: 700;">Profit Margin:</span>
                <span style="font-weight: 800; color: #0284c7;">${itemData.marginPercent.toFixed(1)}%</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 2px;">
                <span style="color: #64748b; font-size: 11.5px;">Food Cost %:</span>
                <span style="font-weight: 600; color: #64748b; font-size: 11.5px;">${itemData.foodCostPercent.toFixed(1)}%</span>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
};

window.closeCostSlipModal = function closeCostSlipModal() {
    const modal = document.getElementById('costSlipModal');
    if (modal) modal.style.display = 'none';
    activeSlipItemId = null;
};

window.printSingleItemCostSlip = function printSingleItemCostSlip() {
    if (!activeSlipItemId) return;
    const allData = getAllItemsProfitData();
    const itemData = allData.find(d => String(d.id) === String(activeSlipItemId));
    if (!itemData) return;

    let ingredientsRows = '';
    itemData.ingredientsDetailed.forEach(i => {
        ingredientsRows += `
            <tr>
                <td style="padding: 2.5px 4px; border: 1px solid #000;">${escapeHtml(i.itemName)}</td>
                <td style="padding: 2.5px 4px; border: 1px solid #000; text-align: center; font-weight: 600;">${i.qty} ${i.unit}</td>
                <td style="padding: 2.5px 4px; border: 1px solid #000; text-align: right; font-weight: 700;">Rs. ${i.cost.toFixed(1)}</td>
            </tr>
        `;
    });

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Cost Slip - ${escapeHtml(itemData.name)}</title>
            <style>
                body {
                    font-family: 'Poppins', -apple-system, sans-serif !important;
                    font-size: 11px;
                    width: 80mm;
                    max-width: 80mm;
                    margin: 0 auto;
                    padding: 8px;
                    color: #000;
                    background: #fff;
                }
                .text-center { text-align: center; }
                .text-right { text-align: right; }
                .bold { font-weight: 700; }
                .divider { border-bottom: 1px dashed #000; margin: 6px 0; }
                table { width: 100%; border-collapse: collapse; margin: 6px 0; border: 1px solid #000; font-size: 10.5px; }
                th { background: #f2f2f2; border: 1px solid #000; padding: 3px 4px; font-weight: 700; }
                @media print {
                    @page { size: 80mm auto; margin: 0; }
                    body { width: 100%; max-width: 100%; padding: 4px; }
                }
            </style>
        </head>
        <body>
            <div class="text-center">
                <div class="bold" style="font-size: 15px;">HANGOUT LOUNGE & CO.</div>
                <div style="font-size: 10px;">Item Recipe & Cost Breakdown</div>
                <div class="bold" style="font-size: 13px; margin-top: 4px;">${escapeHtml(itemData.name)}</div>
                <div style="font-size: 10px;">Category: ${escapeHtml(itemData.categoryName)}</div>
                <div style="font-size: 9.5px; color: #555;">${dateStr} ${timeStr}</div>
            </div>
            <div class="divider"></div>

            <table>
                <thead>
                    <tr>
                        <th style="text-align: left;">Ingredient</th>
                        <th style="text-align: center;">Portion</th>
                        <th style="text-align: right;">Cost</th>
                    </tr>
                </thead>
                <tbody>
                    ${ingredientsRows}
                </tbody>
            </table>

            <table style="margin-top: 6px;">
                <tr>
                    <td style="padding: 3px 6px; border: 1px solid #000;">Selling Price</td>
                    <td class="text-right bold" style="padding: 3px 6px; border: 1px solid #000;">Rs. ${formatNumber(itemData.sellPrice)}</td>
                </tr>
                <tr>
                    <td style="padding: 3px 6px; border: 1px solid #000;">Total Ingredient Cost</td>
                    <td class="text-right bold" style="padding: 3px 6px; border: 1px solid #000;">Rs. ${itemData.totalCost.toFixed(2)}</td>
                </tr>
                <tr style="background: #f2f2f2;">
                    <td class="bold" style="padding: 4px 6px; border: 1px solid #000; font-size: 11.5px;">Net Profit / Serving</td>
                    <td class="text-right bold" style="padding: 4px 6px; border: 1px solid #000; font-size: 11.5px;">Rs. ${itemData.netProfit.toFixed(2)}</td>
                </tr>
                <tr>
                    <td style="padding: 3px 6px; border: 1px solid #000;">Profit Margin %</td>
                    <td class="text-right bold" style="padding: 3px 6px; border: 1px solid #000;">${itemData.marginPercent.toFixed(1)}%</td>
                </tr>
            </table>

            <div class="text-center" style="margin-top: 10px; font-size: 9.5px; color: #444;">
                Printed for Internal Costing Reference
            </div>

            <script>
                window.addEventListener('load', function() {
                    window.print();
                    setTimeout(function() { window.close(); }, 200);
                });
            </script>
        </body>
        </html>
    `;

    openReportPrintWindow(html, `Cost Slip - ${itemData.name}`);
};

window.printProfitCostReport = function printProfitCostReport() {
    const allData = getAllItemsProfitData();
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    let rowsHTML = '';
    allData.forEach((row, idx) => {
        rowsHTML += `
            <tr>
                <td style="text-align: center; border: 1px solid #000; padding: 3px 4px;">${idx + 1}</td>
                <td style="border: 1px solid #000; padding: 3px 5px; font-weight: 600;">${escapeHtml(row.name)}</td>
                <td style="border: 1px solid #000; padding: 3px 4px; font-size: 9.5px;">${escapeHtml(row.categoryName)}</td>
                <td style="text-align: right; border: 1px solid #000; padding: 3px 5px; font-weight: 700;">Rs. ${formatNumber(row.sellPrice)}</td>
                <td style="text-align: right; border: 1px solid #000; padding: 3px 5px; font-weight: 700;">${row.hasRecipe ? 'Rs. ' + row.totalCost.toFixed(1) : '-'}</td>
                <td style="text-align: right; border: 1px solid #000; padding: 3px 5px; font-weight: 700;">${row.hasRecipe ? 'Rs. ' + Math.round(row.netProfit) : '-'}</td>
                <td style="text-align: center; border: 1px solid #000; padding: 3px 4px; font-weight: 700;">${row.hasRecipe ? row.marginPercent.toFixed(1) + '%' : '-'}</td>
            </tr>
        `;
    });

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Item Cost & Profit Analysis Report</title>
            <style>
                body {
                    font-family: 'Poppins', -apple-system, sans-serif !important;
                    font-size: 11px;
                    width: 80mm;
                    max-width: 80mm;
                    margin: 0 auto;
                    padding: 8px;
                    color: #000;
                    background: #fff;
                }
                .text-center { text-align: center; }
                .text-right { text-align: right; }
                .bold { font-weight: 700; }
                .divider { border-bottom: 1px dashed #000; margin: 6px 0; }
                table { width: 100%; border-collapse: collapse; margin: 6px 0; border: 1px solid #000; font-size: 10px; }
                th { background: #f2f2f2; border: 1px solid #000; padding: 3px 4px; font-weight: 700; }
                @media print {
                    @page { size: 80mm auto; margin: 0; }
                    body { width: 100%; max-width: 100%; padding: 4px; }
                }
            </style>
        </head>
        <body>
            <div class="text-center">
                <div class="bold" style="font-size: 15px;">HANGOUT LOUNGE & CO.</div>
                <div class="bold" style="font-size: 12px; margin-top: 2px;">ITEM PROFIT & COST REPORT</div>
                <div style="font-size: 9.5px; color: #555;">Generated: ${dateStr} ${timeStr}</div>
            </div>
            <div class="divider"></div>

            <table>
                <thead>
                    <tr>
                        <th style="width: 25px; text-align: center;">#</th>
                        <th style="text-align: left;">Item</th>
                        <th style="text-align: left;">Cat</th>
                        <th style="text-align: right;">Sell</th>
                        <th style="text-align: right;">Cost</th>
                        <th style="text-align: right;">Profit</th>
                        <th style="text-align: center;">Margin</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHTML}
                </tbody>
            </table>

            <div class="divider"></div>
            <div class="text-center" style="font-size: 9.5px; color: #444;">
                Total Menu Items: ${allData.length} | Configured: ${allData.filter(d => d.hasRecipe).length}
            </div>

            <script>
                window.addEventListener('load', function() {
                    window.print();
                    setTimeout(function() { window.close(); }, 200);
                });
            </script>
        </body>
        </html>
    `;

    openReportPrintWindow(html, 'Item Cost & Profit Analysis Report');
};

// ==========================================
// SIMPLIFIED INLINE MENU ITEM RECIPE BUILDER
// ==========================================

window.toggleAddMenuItemRecipeSection = function toggleAddMenuItemRecipeSection(forceOpen = null) {
    const body = document.getElementById('addMenuItemRecipeBody');
    const chevron = document.getElementById('addMenuItemRecipeChevron');
    if (!body) return;

    const isOpen = forceOpen !== null ? forceOpen : body.style.display !== 'none';
    if (isOpen) {
        body.style.display = 'none';
        if (chevron) {
            chevron.textContent = '+ Add Recipe';
            chevron.style.background = '#eff6ff';
            chevron.style.color = '#2563eb';
            chevron.style.borderColor = '#bfdbfe';
        }
    } else {
        body.style.display = 'block';
        if (chevron) {
            chevron.textContent = '✕ Close';
            chevron.style.background = '#fee2e2';
            chevron.style.color = '#dc2626';
            chevron.style.borderColor = '#fca5a5';
        }
        populateAddMenuItemStockChips();
        if (document.querySelectorAll('#addMenuItemIngredientsTbody tr').length === 0) {
            addMenuItemInlineIngredientRow();
        }
        recalculateNewItemLiveCost();
    }
};

window.populateAddMenuItemStockChips = function populateAddMenuItemStockChips() {
    const container = document.getElementById('addMenuItemQuickChips');
    if (!container) return;
    const stocks = typeof syncAndGetStockItems === 'function' ? syncAndGetStockItems() : (Storage.get('stocks') || []);
    container.innerHTML = stocks.slice(0, 14).map(s => `
        <span class="recipe-quick-chip" onclick="quickAddStockToNewItem('${s.id}')" title="Stock: ${s.quantity} ${s.unit} @ Rs. ${formatNumber(s.unitPrice)}/${s.unit}">
            ➕ ${escapeHtml(s.itemName)} <span style="color: #64748b; font-size: 11px;">(${s.unit})</span>
        </span>
    `).join('');
};

window.addMenuItemInlineIngredientRow = function addMenuItemInlineIngredientRow(data = null) {
    const tbody = document.getElementById('addMenuItemIngredientsTbody');
    if (!tbody) return;

    const stocks = typeof syncAndGetStockItems === 'function' ? syncAndGetStockItems() : (Storage.get('stocks') || []);
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid #e2e8f0';

    const selectedStockId = data ? data.stockId : '';
    const selectedQty = data ? data.qty : '';
    const selectedUnit = data ? data.unit : 'g';

    const stockOptions = stocks.map(s => {
        const isSelected = (selectedStockId && String(s.id) === String(selectedStockId)) || 
            (!selectedStockId && data && data.itemName && s.itemName.toLowerCase() === data.itemName.toLowerCase());
        return `<option value="${s.id}" data-unit="${escapeHtml(s.unit)}" data-price="${s.unitPrice}" ${isSelected ? 'selected' : ''}>
            ${escapeHtml(s.itemName)} (${s.unit} @ Rs. ${formatNumber(s.unitPrice)})
        </option>`;
    }).join('');

    tr.innerHTML = `
        <td style="padding: 6px 8px;">
            <select class="recipe-row-input inline-ing-stock-select" onchange="onNewItemIngredientChange(this)" style="font-size: 12px; padding: 6px 8px;">
                <option value="">-- Select Ingredient --</option>
                ${stockOptions}
            </select>
        </td>
        <td style="padding: 6px 4px;">
            <input type="number" class="recipe-row-input inline-ing-qty-input" value="${selectedQty}" placeholder="0" min="0" step="any" oninput="recalculateNewItemLiveCost()" style="text-align: center; font-size: 12px; padding: 6px 4px;">
        </td>
        <td style="padding: 6px 4px;">
            <select class="recipe-row-input inline-ing-unit-select" onchange="recalculateNewItemLiveCost()" style="font-size: 12px; padding: 6px 4px;">
                <option value="g" ${selectedUnit === 'g' ? 'selected' : ''}>g</option>
                <option value="kg" ${selectedUnit === 'kg' ? 'selected' : ''}>kg</option>
                <option value="mL" ${selectedUnit === 'mL' || selectedUnit === 'ml' ? 'selected' : ''}>mL</option>
                <option value="L" ${selectedUnit === 'L' ? 'selected' : ''}>L</option>
                <option value="pcs" ${selectedUnit === 'pcs' ? 'selected' : ''}>pcs</option>
                <option value="pack" ${selectedUnit === 'pack' ? 'selected' : ''}>pack</option>
                <option value="tbsp" ${selectedUnit === 'tbsp' ? 'selected' : ''}>tbsp</option>
                <option value="tsp" ${selectedUnit === 'tsp' ? 'selected' : ''}>tsp</option>
            </select>
        </td>
        <td style="padding: 6px 8px; text-align: right; color: #dc2626; font-weight: 700; font-size: 12px;">
            <span class="inline-ing-cost-label">Rs. 0.00</span>
        </td>
        <td style="padding: 6px 4px; text-align: center;">
            <button type="button" class="recipe-row-delete-btn" onclick="removeMenuItemInlineIngredientRow(this)" title="Remove" style="font-size: 12px; padding: 2px 4px;">
                ✕
            </button>
        </td>
    `;

    tbody.appendChild(tr);
    const select = tr.querySelector('.inline-ing-stock-select');
    if (select) onNewItemIngredientChange(select, false);
    recalculateNewItemLiveCost();
};

window.quickAddStockToNewItem = function quickAddStockToNewItem(stockId) {
    const stocks = typeof syncAndGetStockItems === 'function' ? syncAndGetStockItems() : (Storage.get('stocks') || []);
    const stock = stocks.find(s => String(s.id) === String(stockId));
    if (!stock) return;

    let defaultQty = 1;
    let defaultUnit = stock.unit;
    if (stock.unit === 'kg') {
        defaultQty = 100;
        defaultUnit = 'g';
    } else if (stock.unit === 'L' || stock.unit === 'liter') {
        defaultQty = 50;
        defaultUnit = 'mL';
    }

    addMenuItemInlineIngredientRow({
        stockId: stock.id,
        itemName: stock.itemName,
        qty: defaultQty,
        unit: defaultUnit
    });
};

window.removeMenuItemInlineIngredientRow = function removeMenuItemInlineIngredientRow(btn) {
    const tr = btn.closest('tr');
    if (tr) {
        tr.remove();
        recalculateNewItemLiveCost();
    }
};

window.onNewItemIngredientChange = function onNewItemIngredientChange(selectEl, autoSetUnit = true) {
    const tr = selectEl.closest('tr');
    if (!tr) return;

    const opt = selectEl.options[selectEl.selectedIndex];
    const unit = opt ? opt.getAttribute('data-unit') : '';

    if (autoSetUnit && unit) {
        const unitSelect = tr.querySelector('.inline-ing-unit-select');
        if (unitSelect) {
            const u = unit.toLowerCase();
            if (u === 'kg') unitSelect.value = 'g';
            else if (u === 'l' || u === 'liter') unitSelect.value = 'mL';
            else if (u === 'pcs') unitSelect.value = 'pcs';
            else if (u === 'pack') unitSelect.value = 'pack';
            else unitSelect.value = unit;
        }
    }

    recalculateNewItemLiveCost();
};

window.recalculateNewItemLiveCost = function recalculateNewItemLiveCost() {
    const tbody = document.getElementById('addMenuItemIngredientsTbody');
    if (!tbody) return;

    const stocks = typeof syncAndGetStockItems === 'function' ? syncAndGetStockItems() : (Storage.get('stocks') || []);
    const stockById = {};
    stocks.forEach(s => { stockById[String(s.id)] = s; });

    let totalCost = 0;
    const rows = tbody.querySelectorAll('tr');

    rows.forEach(tr => {
        const select = tr.querySelector('.inline-ing-stock-select');
        const qtyInput = tr.querySelector('.inline-ing-qty-input');
        const unitSelect = tr.querySelector('.inline-ing-unit-select');
        const costLabel = tr.querySelector('.inline-ing-cost-label');

        const stockId = select ? select.value : '';
        const qty = qtyInput ? parseFloat(qtyInput.value) || 0 : 0;
        const unit = unitSelect ? unitSelect.value : 'g';
        const stock = stockById[stockId];

        const cost = typeof calculateIngredientCost === 'function' ? calculateIngredientCost(stock, qty, unit) : 0;
        totalCost += cost;

        if (costLabel) costLabel.textContent = `Rs. ${cost.toFixed(2)}`;
    });

    const priceInput = document.getElementById('addMenuItemPrice');
    const sellPrice = priceInput ? parseFloat(priceInput.value) || 0 : 0;
    const profit = sellPrice - totalCost;

    const costValEl = document.getElementById('addMenuItemLiveCostVal');
    if (costValEl) costValEl.textContent = `Rs. ${totalCost.toFixed(2)}`;

    const profitValEl = document.getElementById('addMenuItemLiveProfitVal');
    if (profitValEl) {
        profitValEl.textContent = `Est. Profit: Rs. ${profit.toFixed(2)} (${sellPrice > 0 ? ((profit / sellPrice) * 100).toFixed(0) : 0}%)`;
        profitValEl.style.color = profit >= 0 ? '#059669' : '#dc2626';
    }
};

function getAddMenuItemInlineIngredients() {
    const tbody = document.getElementById('addMenuItemIngredientsTbody');
    if (!tbody) return [];

    const stocks = typeof syncAndGetStockItems === 'function' ? syncAndGetStockItems() : (Storage.get('stocks') || []);
    const stockById = {};
    stocks.forEach(s => { stockById[String(s.id)] = s; });

    const ingredients = [];
    const rows = tbody.querySelectorAll('tr');

    rows.forEach(tr => {
        const select = tr.querySelector('.inline-ing-stock-select');
        const qtyInput = tr.querySelector('.inline-ing-qty-input');
        const unitSelect = tr.querySelector('.inline-ing-unit-select');

        const stockId = select ? select.value : '';
        const qty = qtyInput ? parseFloat(qtyInput.value) || 0 : 0;
        const unit = unitSelect ? unitSelect.value : 'g';
        const stock = stockById[stockId];

        if (stockId && qty > 0) {
            ingredients.push({
                stockId: stockId,
                itemName: stock ? stock.itemName : '',
                qty: qty,
                unit: unit
            });
        }
    });

    return ingredients;
}

window.resetAddMenuItemInlineRecipe = function resetAddMenuItemInlineRecipe() {
    const tbody = document.getElementById('addMenuItemIngredientsTbody');
    if (tbody) tbody.innerHTML = '';
    toggleAddMenuItemRecipeSection(true); // Close it
};

// ==========================================
// 1-CLICK RECIPE PRESET TEMPLATES
// ==========================================

const RECIPE_PRESETS = {
    burger: [
        { itemName: 'Burger Buns', qty: 1, unit: 'pcs' },
        { itemName: 'Chicken', qty: 120, unit: 'g' },
        { itemName: 'Cheese Slices', qty: 1, unit: 'pcs' },
        { itemName: 'Mayonnaise', qty: 20, unit: 'g' },
        { itemName: 'Tomato Ketchup', qty: 15, unit: 'g' }
    ],
    karahi: [
        { itemName: 'Chicken', qty: 500, unit: 'g' },
        { itemName: 'Cooking Oil', qty: 80, unit: 'mL' },
        { itemName: 'Tomatoes', qty: 200, unit: 'g' },
        { itemName: 'Special Masala', qty: 25, unit: 'g' },
        { itemName: 'Garlic Sauce', qty: 20, unit: 'g' }
    ],
    pizza: [
        { itemName: 'Flour (Atta)', qty: 180, unit: 'g' },
        { itemName: 'Cheese Slices', qty: 120, unit: 'g' },
        { itemName: 'Chicken', qty: 100, unit: 'g' },
        { itemName: 'Tomatoes', qty: 50, unit: 'g' },
        { itemName: 'Cooking Oil', qty: 20, unit: 'mL' }
    ],
    biryani: [
        { itemName: 'Rice (Basmati)', qty: 250, unit: 'g' },
        { itemName: 'Chicken', qty: 200, unit: 'g' },
        { itemName: 'Cooking Oil', qty: 50, unit: 'mL' },
        { itemName: 'Special Masala', qty: 20, unit: 'g' },
        { itemName: 'Tomatoes', qty: 50, unit: 'g' }
    ],
    sandwich: [
        { itemName: 'Sandwich Bread', qty: 2, unit: 'pcs' },
        { itemName: 'Chicken', qty: 80, unit: 'g' },
        { itemName: 'Mayonnaise', qty: 20, unit: 'g' },
        { itemName: 'Cheese Slices', qty: 1, unit: 'pcs' },
        { itemName: 'Tomatoes', qty: 30, unit: 'g' }
    ],
    shake_drink: [
        { itemName: 'Milk (Packed)', qty: 250, unit: 'mL' },
        { itemName: 'Sugar', qty: 20, unit: 'g' },
        { itemName: 'Coffee Beans', qty: 10, unit: 'g' }
    ],
    fries_fried: [
        { itemName: 'Potatoes', qty: 250, unit: 'g' },
        { itemName: 'Cooking Oil', qty: 60, unit: 'mL' },
        { itemName: 'Special Masala', qty: 5, unit: 'g' },
        { itemName: 'Tomato Ketchup', qty: 20, unit: 'g' }
    ]
};

window.applyRecipePreset = function applyRecipePreset(presetKey) {
    const list = RECIPE_PRESETS[presetKey];
    if (!list) return;

    const tbody = document.getElementById('recipeIngredientsTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const stocks = typeof syncAndGetStockItems === 'function' ? syncAndGetStockItems() : (Storage.get('stocks') || []);

    list.forEach(presetItem => {
        let matchedStock = stocks.find(s => s.itemName && s.itemName.toLowerCase() === presetItem.itemName.toLowerCase());
        if (!matchedStock) {
            matchedStock = stocks.find(s => s.itemName && s.itemName.toLowerCase().includes(presetItem.itemName.toLowerCase()));
        }

        addRecipeIngredientRow({
            stockId: matchedStock ? matchedStock.id : '',
            itemName: matchedStock ? matchedStock.itemName : presetItem.itemName,
            qty: presetItem.qty,
            unit: presetItem.unit
        });
    });

    recalculateRecipeLiveSummary();
};

window.adjustRecipeRowQty = function adjustRecipeRowQty(btn, delta) {
    const tr = btn.closest('tr');
    if (!tr) return;
    const input = tr.querySelector('.recipe-ing-qty-input');
    if (!input) return;
    let val = parseFloat(input.value) || 0;
    val = Math.max(0, val + delta);
    input.value = val;
    recalculateRecipeLiveSummary();
};

// ==========================================
// 1-CLICK STOCK PRESET CATEGORIES & INGREDIENTS
// ==========================================

const STOCK_PRESETS_BY_CAT = {
    meat: [
        { name: 'Chicken Boneless', unit: 'kg', min: 5, price: 950 },
        { name: 'Chicken with Bone', unit: 'kg', min: 10, price: 650 },
        { name: 'Chicken Wings', unit: 'kg', min: 5, price: 700 },
        { name: 'Beef Mince (Qeema)', unit: 'kg', min: 5, price: 1400 },
        { name: 'Beef Meat', unit: 'kg', min: 8, price: 1200 },
        { name: 'Mutton Meat', unit: 'kg', min: 5, price: 2100 },
        { name: 'Fish Fillet', unit: 'kg', min: 4, price: 1100 }
    ],
    veg: [
        { name: 'Tomatoes', unit: 'kg', min: 10, price: 120 },
        { name: 'Potatoes', unit: 'kg', min: 15, price: 90 },
        { name: 'Onions', unit: 'kg', min: 15, price: 140 },
        { name: 'Ginger (Adrak)', unit: 'kg', min: 2, price: 600 },
        { name: 'Garlic (Lehsan)', unit: 'kg', min: 3, price: 500 },
        { name: 'Green Chillies', unit: 'kg', min: 2, price: 250 },
        { name: 'Fresh Coriander / Mint', unit: 'pack', min: 5, price: 50 }
    ],
    dairy: [
        { name: 'Milk (Packed)', unit: 'L', min: 12, price: 270 },
        { name: 'Cheese Slices', unit: 'pack', min: 5, price: 650 },
        { name: 'Mozzarella Cheese', unit: 'kg', min: 3, price: 1600 },
        { name: 'Cheddar Cheese', unit: 'kg', min: 3, price: 1700 },
        { name: 'Butter', unit: 'kg', min: 2, price: 1800 },
        { name: 'Cooking Cream', unit: 'pack', min: 4, price: 420 },
        { name: 'Eggs (Dozen)', unit: 'pack', min: 5, price: 340 }
    ],
    spices: [
        { name: 'Cooking Oil', unit: 'L', min: 16, price: 520 },
        { name: 'Special Masala', unit: 'kg', min: 3, price: 1100 },
        { name: 'Tomato Ketchup', unit: 'kg', min: 5, price: 450 },
        { name: 'Mayonnaise', unit: 'kg', min: 5, price: 550 },
        { name: 'Garlic Sauce', unit: 'kg', min: 4, price: 500 },
        { name: 'Chilli Sauce', unit: 'bottle', min: 4, price: 350 },
        { name: 'Soy Sauce', unit: 'bottle', min: 3, price: 300 }
    ],
    bakery: [
        { name: 'Burger Buns', unit: 'pcs', min: 24, price: 45 },
        { name: 'Sandwich Bread', unit: 'pack', min: 6, price: 160 },
        { name: 'Rice (Basmati)', unit: 'kg', min: 25, price: 340 },
        { name: 'Flour (Atta)', unit: 'kg', min: 20, price: 150 },
        { name: 'Pizza Dough Base', unit: 'pcs', min: 12, price: 120 }
    ],
    drinks: [
        { name: 'Tea Leaves', unit: 'kg', min: 2, price: 1600 },
        { name: 'Coffee Beans / Powder', unit: 'kg', min: 1, price: 2800 },
        { name: 'Sugar', unit: 'kg', min: 15, price: 160 },
        { name: 'Nutella', unit: 'can', min: 2, price: 1800 },
        { name: 'Chocolate Syrup', unit: 'bottle', min: 3, price: 650 },
        { name: 'Mineral Water (Large)', unit: 'bottle', min: 24, price: 100 }
    ]
};

window.filterAddStockPresets = function filterAddStockPresets(catKey, el) {
    if (el) {
        const pills = document.querySelectorAll('.stock-cat-pill');
        pills.forEach(p => p.classList.remove('active'));
        el.classList.add('active');
    }
    const container = document.getElementById('addStockPresetChipsContainer');
    if (!container) return;

    const list = STOCK_PRESETS_BY_CAT[catKey] || STOCK_PRESETS_BY_CAT.meat;
    container.innerHTML = list.map(item => `
        <span class="popular-ingredient-chip" onclick="selectPresetStockIngredient('${escapeHtml(item.name)}', '${item.unit}', ${item.min}, ${item.price})" style="padding: 4px 10px; font-size: 11.5px;">
            ➕ ${escapeHtml(item.name)} <span style="opacity: 0.7; font-size: 10px;">(${item.unit})</span>
        </span>
    `).join('');
};

window.selectPresetStockIngredient = function selectPresetStockIngredient(name, unit, alertMin, defaultPrice) {
    const nameInput = document.getElementById('stockItemName');
    const unitSelect = document.getElementById('stockUnit');
    const minInput = document.getElementById('stockMinLevel');
    const priceInput = document.getElementById('stockUnitPrice');

    if (nameInput) nameInput.value = name;
    if (unitSelect) unitSelect.value = unit;
    if (minInput) minInput.value = alertMin;

    if (typeof checkExistingStockItemOnInput === 'function') {
        checkExistingStockItemOnInput();
    }

    if (priceInput && (!priceInput.value || parseFloat(priceInput.value) === 0)) {
        priceInput.value = defaultPrice;
    }

    const qtyInput = document.getElementById('stockQuantity');
    if (qtyInput) qtyInput.focus();
};


