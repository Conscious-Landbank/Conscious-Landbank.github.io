/**
 * UNERA Admin — shared session / MFA / RBAC helpers (static HTML demos).
 * See login.html HTML comment for localStorage keys.
 */
(function (global) {
    'use strict';

    /** True when opened locally for HTML prototyping (no query hacks required). */
    function isPrototypeHost() {
        try {
            if (global.location.protocol === 'file:') return true;
            var host = global.location.hostname;
            if (host === '' || host === 'localhost' || host === '127.0.0.1') return true;
            return false;
        } catch (e) {
            return false;
        }
    }

    function isDevMode() {
        var p = new URLSearchParams(global.location.search);
        return p.has('dev') || p.has('test') || isPrototypeHost();
    }

    function postPasswordMfaTarget() {
        return global.localStorage.getItem('operatorMfaEnrolled') === 'true'
            ? 'mfa-verify.html'
            : 'mfa-enroll.html';
    }

    function applyOperatorRoleDefaults() {
        var pending = global.sessionStorage.getItem('pendingOperatorRole');
        if (pending === 'viewer' || pending === 'support' || pending === 'compliance' || pending === 'super_admin') {
            global.localStorage.setItem('operatorPortalRole', pending);
            global.sessionStorage.removeItem('pendingOperatorRole');
            return;
        }
        var params = new URLSearchParams(global.location.search);
        var fromQuery = params.get('role');
        if (fromQuery === 'viewer' || fromQuery === 'support' || fromQuery === 'compliance' || fromQuery === 'super_admin') {
            global.localStorage.setItem('operatorPortalRole', fromQuery);
            return;
        }
        if (global.localStorage.getItem('operatorPortalRole')) return;
        if (isDevMode()) {
            global.localStorage.setItem('operatorPortalRole', 'super_admin');
            return;
        }
        global.localStorage.setItem('operatorPortalRole', 'support');
    }

    function completeOperatorSession() {
        global.localStorage.removeItem('operatorMfaPending');
        global.localStorage.setItem('operatorAuth', 'true');
        applyOperatorRoleDefaults();
        global.location.href = 'dashboard.html';
    }

    function guardAppPage() {
        if (isDevMode()) return;
        if (global.localStorage.getItem('operatorAuth') === 'true') return;
        if (global.localStorage.getItem('operatorMfaPending') === 'true') {
            global.location.href = postPasswordMfaTarget();
            return;
        }
        global.location.href = 'login.html';
    }

    function guardMfaEnrollPage() {
        if (isDevMode()) return;
        if (global.localStorage.getItem('operatorAuth') === 'true' && global.localStorage.getItem('operatorMfaPending') !== 'true') {
            global.location.href = 'dashboard.html';
            return;
        }
        if (global.localStorage.getItem('operatorMfaPending') !== 'true') {
            global.location.href = 'login.html';
        }
    }

    function guardMfaVerifyPage() {
        if (isDevMode()) return;
        if (global.localStorage.getItem('operatorAuth') === 'true' && global.localStorage.getItem('operatorMfaPending') !== 'true') {
            global.location.href = 'dashboard.html';
            return;
        }
        if (global.localStorage.getItem('operatorMfaPending') !== 'true') {
            global.location.href = 'login.html';
            return;
        }
        if (global.localStorage.getItem('operatorMfaEnrolled') !== 'true') {
            global.location.href = 'mfa-enroll.html';
        }
    }

    function guardTeamSuperAdmin() {
        if (isDevMode()) return;
        if (global.localStorage.getItem('operatorPortalRole') !== 'super_admin') {
            global.location.href = 'dashboard.html';
        }
    }

    function logout() {
        global.localStorage.removeItem('operatorAuth');
        global.localStorage.removeItem('operatorMfaPending');
        global.localStorage.removeItem('operatorMfaEnrolled');
        global.localStorage.removeItem('operatorEmail');
        global.localStorage.removeItem('operatorPortalRole');
        global.localStorage.removeItem('operatorInviteToken');
        global.location.href = 'login.html';
    }

    function ensureRbacStyles() {
        if (global.document.getElementById('unera-admin-rbac-style')) return;
        var st = global.document.createElement('style');
        st.id = 'unera-admin-rbac-style';
        st.textContent = [
            '.is-rbac-disabled{opacity:0.55;pointer-events:none!important;}',
            '.rbac-readonly-ribbon{background:var(--brand-cloud-blue);color:var(--brand-deep-blue);padding:1rem 1.25rem;border-radius:1.25rem;margin-bottom:1.25rem;display:flex;align-items:flex-start;gap:0.75rem;border:1px solid color-mix(in srgb, var(--brand-deep-blue) 12%, transparent);box-shadow:0 4px 12px rgba(23,61,71,0.12);}',
            '.rbac-readonly-ribbon .rbac-ribbon-icon{flex-shrink:0;color:var(--warning);margin-top:0.125rem;}',
            '.rbac-readonly-ribbon h2{margin:0;font-size:1rem;font-weight:700;font-family:var(--font-display);}',
            '.rbac-readonly-ribbon p{margin:0.25rem 0 0;font-size:0.875rem;color:var(--text-secondary);line-height:1.5;}',
            '.mobile-team-link{display:block;text-align:center;padding:0.75rem 1rem;margin-bottom:0.5rem;border-radius:0.75rem;background:color-mix(in srgb, var(--brand-purple) 12%, transparent);color:var(--brand-deep-blue);font-weight:600;text-decoration:none;font-size:0.875rem;}',
            '.mobile-team-link:focus-visible{outline:2px solid var(--brand-cloud-blue);outline-offset:2px;}'
        ].join('\n');
        global.document.head.appendChild(st);
    }

    function insertViewerReadOnlyBanner() {
        var mainContainer = global.document.querySelector('main#main-content');
        if (!mainContainer || mainContainer.querySelector('.rbac-readonly-ribbon')) return;
        ensureRbacStyles();
        var el = global.document.createElement('div');
        el.className = 'rbac-readonly-ribbon';
        el.setAttribute('role', 'status');
        el.setAttribute('aria-live', 'polite');
        el.innerHTML = '<svg class="rbac-ribbon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="m40-120 440-760 440 760H40Zm468.5-131.5Q520-263 520-280t-11.5-28.5Q497-320 480-320t-28.5 11.5Q440-297 440-280t11.5 28.5Q463-240 480-240t28.5-11.5ZM440-360h80v-200h-80v200Z"/></svg><div><h2>Read-only session</h2><p>You\u2019re signed in as Viewer. Actions that change data are disabled.</p></div>';
        var header = mainContainer.querySelector('.page-header');
        if (header && header.parentNode === mainContainer) {
            mainContainer.insertBefore(el, header);
        } else {
            mainContainer.insertBefore(el, mainContainer.firstChild);
        }
    }

    function syncTeamNavActiveState() {
        var path = global.location.pathname || '';
        var onTeam = path.indexOf('team.html') !== -1;
        var tabTeam = global.document.getElementById('adminTabsTeam');
        var mobTeam = global.document.getElementById('mobileAdminTabsTeam');

        if (tabTeam) {
            tabTeam.classList.remove('active');
            tabTeam.removeAttribute('aria-current');
            tabTeam.setAttribute('aria-selected', 'false');
        }
        if (mobTeam) {
            mobTeam.classList.remove('active');
            mobTeam.removeAttribute('aria-current');
        }

        if (!onTeam || !tabTeam) {
            return;
        }

        var tabsBar = global.document.querySelector('nav .tabs');
        if (tabsBar) {
            var tabEls = tabsBar.querySelectorAll('.tab');
            for (var i = 0; i < tabEls.length; i++) {
                var t = tabEls[i];
                if (t.id === 'adminTabsTeam') continue;
                t.classList.remove('active');
                t.removeAttribute('aria-current');
                if (t.getAttribute('role') === 'tab') {
                    t.setAttribute('aria-selected', 'false');
                }
            }
        }

        tabTeam.classList.add('active');
        tabTeam.setAttribute('aria-current', 'page');
        tabTeam.setAttribute('aria-selected', 'true');

        var mobNav = global.document.querySelector('.mobile-nav-tabs');
        if (mobNav && mobTeam) {
            var mobEls = mobNav.querySelectorAll('.mobile-tab');
            for (var j = 0; j < mobEls.length; j++) {
                var m = mobEls[j];
                if (m.id === 'mobileAdminTabsTeam') continue;
                m.classList.remove('active');
                m.removeAttribute('aria-current');
            }
            mobTeam.classList.add('active');
            mobTeam.setAttribute('aria-current', 'page');
        }
    }

    /** Desktop + mobile primary nav tab for super admins */
    function injectSuperAdminTeamNavTab() {
        var storedCount = 6;
        try {
            var raw = global.localStorage.getItem('teamPendingCount');
            if (raw !== null) storedCount = parseInt(raw, 10) || 0;
        } catch (e) {}

        var tabsBar = global.document.querySelector('nav .tabs');
        if (tabsBar && !global.document.getElementById('adminTabsTeam')) {
            var teamTab = global.document.createElement('a');
            teamTab.href = 'team.html';
            teamTab.className = 'tab';
            teamTab.id = 'adminTabsTeam';
            teamTab.setAttribute('role', 'tab');
            teamTab.setAttribute('aria-selected', 'false');
            var badgeHtml = storedCount > 0
                ? '<span class="tab-badge" id="tabTeamBadge" aria-hidden="true">' + storedCount + '</span>'
                : '<span class="tab-badge" id="tabTeamBadge" aria-hidden="true" style="display:none"></span>';
            teamTab.innerHTML = 'Team ' + badgeHtml;
            if (storedCount > 0) {
                teamTab.setAttribute('aria-label', 'Team, ' + storedCount + ' pending invitation' + (storedCount === 1 ? '' : 's'));
            }
            tabsBar.appendChild(teamTab);
        }
        var mobNav = global.document.querySelector('.mobile-nav-tabs');
        if (mobNav && !global.document.getElementById('mobileAdminTabsTeam')) {
            var mt = global.document.createElement('a');
            mt.href = 'team.html';
            mt.className = 'mobile-tab';
            mt.id = 'mobileAdminTabsTeam';
            var mobBadgeHtml = storedCount > 0
                ? '<span class="tab-badge" id="mobileTabTeamBadge" aria-hidden="true">' + storedCount + '</span>'
                : '<span class="tab-badge" id="mobileTabTeamBadge" aria-hidden="true" style="display:none"></span>';
            mt.innerHTML = 'Team ' + mobBadgeHtml;
            mobNav.appendChild(mt);
        }
        syncTeamNavActiveState();
    }

    function injectSuperAdminTeamLink() {
        injectSuperAdminTeamNavTab();

        var menu = global.document.querySelector('#operatorDropdown .op-dropdown-menu');
        if (menu && !global.document.getElementById('opTeamInviteItem')) {
            var logoutBtn = null;
            var obItems = menu.querySelectorAll('button.op-dropdown-item');
            for (var oi = 0; oi < obItems.length; oi++) {
                var oc = obItems[oi].getAttribute('onclick') || '';
                if (oc.indexOf('logout') >= 0) {
                    logoutBtn = obItems[oi];
                    break;
                }
            }
            if (!logoutBtn && obItems.length) logoutBtn = obItems[obItems.length - 1];
            var btn = global.document.createElement('button');
            btn.type = 'button';
            btn.className = 'op-dropdown-item';
            btn.id = 'opTeamInviteItem';
            btn.setAttribute('role', 'menuitem');
            btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0 400q-106 0-181-13.5T144-306q-9-5-14.5-14T124-340v-32q0-34 17.5-62.5T188-378q62-31 126-46.5T400-440q6 0 12 .5t12 1.5q-8 17-12 35.5t-4 38q0 20 4 37.5t12 34.5q-6 1-12 1.5t-12 .5q-66 0-130 15.5T188-306q-13 7-18.5 16T160-272l6 32q14 11 41 20t63.5 15.5T400-200q23 0 46.5-2.5T488-208q15 12 31.5 22t34.5 18q-40 30-91.5 49T400-120Zm320-320q33 0 56.5-23.5T800-520q0-33-23.5-56.5T720-600q-33 0-56.5 23.5T640-520q0 33 23.5 56.5T720-440Zm-80 160v-112q0-34 17.5-62.5T704-378q54-27 116-18t106 56l-52 36q-14-20-34.5-30.5T720-344q-10 0-20 1.5t-19 5.5q7 17 11 34.5t4 37.5q0 20-4 38t-11 35q9 4 19 5.5t20 1.5q46 0 78-30t32-76v-12Z"/></svg> Team &amp; invites';
            btn.onclick = function () { global.location.href = 'team.html'; };
            if (logoutBtn) menu.insertBefore(btn, logoutBtn);
            else menu.appendChild(btn);
        }
    }

    function disableSelector(sel) {
        var nodes = global.document.querySelectorAll(sel);
        for (var i = 0; i < nodes.length; i++) disableEl(nodes[i]);
    }

    function disableEl(el) {
        if (!el) return;
        el.classList.add('is-rbac-disabled');
        el.setAttribute('aria-disabled', 'true');
        var tag = el.tagName;
        if (tag === 'BUTTON' || tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') {
            el.disabled = true;
        } else if (tag === 'A') {
            if (!el.getAttribute('data-rbac-href')) el.setAttribute('data-rbac-href', el.getAttribute('href') || '');
            el.removeAttribute('href');
            el.tabIndex = -1;
        } else {
            el.tabIndex = -1;
        }
    }

    /** @param {string} pageKey dashboard | hc-management | hc-edit | user-management | kyc-management | kyc-detail | team */
    function applyPortalRbac(pageKey) {
        ensureRbacStyles();
        var role = global.localStorage.getItem('operatorPortalRole') || 'support';
        if (role === 'super_admin') injectSuperAdminTeamLink();

        var viewerSels = [];
        var supportSels = [];
        var complianceSels = [];

        switch (pageKey) {
            case 'dashboard':
                viewerSels = ['.action-card', '.stat-card-link', '.alert-cta', '#activityEmpty .alert-cta'];
                break;
            case 'hc-management':
                viewerSels = ['#addHcBtn', 'a.btn-edit', '#hcEmpty .btn-primary', '#hc-list button[role="switch"]'];
                complianceSels = ['#addHcBtn', 'a.btn-edit', '#hcEmpty .btn-primary', '#hc-list button[role="switch"]'];
                break;
            case 'hc-edit':
                viewerSels = ['.save-bar button', '#editor-sections input', '#editor-sections textarea', '#editor-sections select', '#editor-sections button'];
                complianceSels = ['.save-bar button', '#editor-sections input', '#editor-sections textarea', '#editor-sections select', '#editor-sections button'];
                break;
            case 'user-management':
                viewerSels = ['#lockToggle', '#forceResetBtn', '#confirmActionBtn', '#audit-note'];
                complianceSels = ['#lockToggle', '#forceResetBtn', '#confirmActionBtn', '#audit-note'];
                break;
            case 'kyc-management':
                viewerSels = ['#kycUpdateBtn', '#kycStatusSelect', '#kycConfirmActionBtn', '#kyc-audit-note'];
                supportSels = ['#kycUpdateBtn', '#kycStatusSelect', '#kycConfirmActionBtn', '#kyc-audit-note'];
                break;
            case 'kyc-detail':
                viewerSels = ['#detailStatusSelect', '#detailAuditNote', '#detailSaveBtn', '#kycConfirmActionBtn'];
                supportSels = ['#detailStatusSelect', '#detailAuditNote', '#detailSaveBtn', '#kycConfirmActionBtn'];
                break;
            case 'team':
                viewerSels = [
                    '#openInviteModal',
                    '#teamEmptyInviteBtn',
                    '#sendInviteBtn',
                    'button.team-stat-filter',
                    '#teamDrawerCopyBtn',
                    '#teamDrawerResendBtn',
                    '#teamDrawerRevokeBtn',
                    '#teamConfirmActionBtn',
                    '#teamAuditNote'
                ];
                break;
            default:
                break;
        }

        if (role === 'viewer') {
            insertViewerReadOnlyBanner();
            for (var vi = 0; vi < viewerSels.length; vi++) disableSelector(viewerSels[vi]);
        }
        if (role === 'support') {
            for (var si = 0; si < supportSels.length; si++) disableSelector(supportSels[si]);
        }
        if (role === 'compliance') {
            for (var ci = 0; ci < complianceSels.length; ci++) disableSelector(complianceSels[ci]);
        }
    }

    global.UneraAdminAuth = {
        isPrototypeHost: isPrototypeHost,
        isDevMode: isDevMode,
        postPasswordMfaTarget: postPasswordMfaTarget,
        applyOperatorRoleDefaults: applyOperatorRoleDefaults,
        completeOperatorSession: completeOperatorSession,
        guardAppPage: guardAppPage,
        guardMfaEnrollPage: guardMfaEnrollPage,
        guardMfaVerifyPage: guardMfaVerifyPage,
        guardTeamSuperAdmin: guardTeamSuperAdmin,
        logout: logout,
        applyPortalRbac: applyPortalRbac
    };
})(window);
