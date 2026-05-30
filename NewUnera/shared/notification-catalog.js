/**
 * UNERA notification seed catalog (prototype).
 * Schema: { id, layer, category, type, title, message, timestamp, read, ctaUrl?, ctaLabel? }
 */
(function () {
    'use strict';

    var SYNC_FIELDS = ['layer', 'category', 'type', 'title', 'message', 'ctaUrl', 'ctaLabel'];
    var PRIORITY_CONSUMER_IDS = ['nkyc_retry', 'nkyc_blocked'];

    function ts(offsetMs) {
        return new Date(Date.now() - offsetMs).toISOString();
    }

    function buildStablecoinSeeds() {
        return [
            {
                id: 'sc_mint_complete',
                layer: 'stablecoin',
                category: 'mint_complete',
                type: 'transaction',
                title: 'Mint complete',
                message: 'Your mint of 500.00 UNERA CAD is complete. Tokens are available in your wallet.',
                timestamp: ts(45 * 60 * 1000),
                read: false,
                ctaUrl: 'mint-history.html',
                ctaLabel: 'View mint history'
            },
            {
                id: 'sc_redeem_complete',
                layer: 'stablecoin',
                category: 'redeem_complete',
                type: 'transaction',
                title: 'Redeem complete',
                message: '200.00 UNERA CAD was burned. Your CAD payout is being processed.',
                timestamp: ts(3 * 60 * 60 * 1000),
                read: false,
                ctaUrl: 'purchase-receipt.html?status=complete&id=demo-redeem&from=redeem',
                ctaLabel: 'View receipt'
            },
            {
                id: 'sc_bank_deposit',
                layer: 'stablecoin',
                category: 'bank_deposit',
                type: 'pending',
                title: 'Bank deposit received',
                message: '$500.00 CAD was deposited to your linked account. Redemption can proceed.',
                timestamp: ts(8 * 60 * 60 * 1000),
                read: false,
                ctaUrl: 'redeem-unera-cad.html',
                ctaLabel: 'Continue redeem'
            },
            {
                id: 'sc_payment_failed',
                layer: 'stablecoin',
                category: 'payment_problem',
                type: 'error',
                title: 'Payment could not be processed',
                message: 'Your bank declined the $250.00 CAD payment for mint. Update your payment method and try again.',
                timestamp: ts(22 * 60 * 60 * 1000),
                read: false,
                ctaUrl: 'get-unera-cad.html',
                ctaLabel: 'Update payment'
            },
            {
                id: 'sc_maintenance',
                layer: 'stablecoin',
                category: 'service_maintenance',
                type: 'system',
                title: 'Scheduled maintenance',
                message: 'Mint and redeem will be unavailable Sat 2:00–4:00 AM ET while we upgrade settlement rails.',
                timestamp: ts(2 * 24 * 60 * 60 * 1000),
                read: false,
                ctaUrl: 'proof-of-reserve-public.html',
                ctaLabel: 'Service status'
            },
            {
                id: 'sc_announcement',
                layer: 'stablecoin',
                category: 'service_announcement',
                type: 'system',
                title: 'UNERA Stablecoin update',
                message: 'Proof of Reserve reporting now updates hourly. See the latest reserve composition.',
                timestamp: ts(5 * 24 * 60 * 60 * 1000),
                read: false,
                ctaUrl: 'proof-of-reserve-public.html',
                ctaLabel: 'Read update'
            }
        ];
    }

    function buildConsumerSeeds() {
        return [
            {
                id: 'nkyc_retry',
                layer: 'consumer',
                category: 'kyc_retry',
                type: 'verification',
                title: 'Verification needs another try',
                message: 'Additional information is needed to complete your identity check. Please resume the verification flow to resubmit.',
                timestamp: ts(18 * 60 * 1000),
                read: false,
                ctaUrl: 'kyc-verify.html',
                ctaLabel: 'Resume verification'
            },
            {
                id: 'nkyc_blocked',
                layer: 'consumer',
                category: 'kyc_blocked',
                type: 'system',
                title: 'Identity verification unavailable',
                message: 'You\'re not able to complete identity verification on this account while we review it. Please contact support for next steps.',
                timestamp: ts(28 * 60 * 1000),
                read: false,
                ctaUrl: 'mailto:support@unera.ca',
                ctaLabel: 'Contact support'
            },
            {
                id: 'n1',
                layer: 'consumer',
                category: 'wallet_send',
                type: 'transaction',
                title: 'Transaction Confirmed',
                message: 'Sent 12.5 CTC — confirmed on Ethereum',
                timestamp: ts(5 * 24 * 60 * 60 * 1000),
                read: false,
                ctaUrl: 'wallet-enhanced.html',
                ctaLabel: 'View transaction'
            },
            {
                id: 'n2',
                layer: 'consumer',
                category: 'listing',
                type: 'listing',
                title: 'New Listing Available',
                message: 'Lot 7B at Conscious Landbank is now open',
                timestamp: ts(5 * 24 * 60 * 60 * 1000),
                read: false,
                ctaUrl: 'explore-centres.html',
                ctaLabel: 'Explore centres'
            },
            {
                id: 'n3',
                layer: 'consumer',
                category: 'security',
                type: 'system',
                title: 'Security Notice',
                message: 'New device login detected for your account',
                timestamp: ts(6 * 24 * 60 * 60 * 1000),
                read: false,
                ctaUrl: 'account-settings.html',
                ctaLabel: 'View activity'
            },
            {
                id: 'n4',
                layer: 'consumer',
                category: 'donation',
                type: 'donation',
                title: 'Donation Received',
                message: 'Your 50 CTC donation to Nairobi Centre has been processed',
                timestamp: ts(7 * 24 * 60 * 60 * 1000),
                read: false,
                ctaUrl: 'dashboard-enhanced.html',
                ctaLabel: 'View impact'
            },
            {
                id: 'n5',
                layer: 'consumer',
                category: 'remittance',
                type: 'remittance',
                title: 'Remittance Sent',
                message: '25 CTC sent to family wallet — delivered on Polygon',
                timestamp: ts(8 * 24 * 60 * 60 * 1000),
                read: false,
                ctaUrl: 'wallet-enhanced.html',
                ctaLabel: 'View transaction'
            },
            {
                id: 'n6',
                layer: 'consumer',
                category: 'kyc_verified',
                type: 'verification',
                title: 'Identity Verified',
                message: 'Your KYC verification has been approved',
                timestamp: ts(9 * 24 * 60 * 60 * 1000),
                read: false,
                ctaUrl: 'kyc-verify.html',
                ctaLabel: 'View status'
            },
            {
                id: 'n7',
                layer: 'consumer',
                category: 'stake_rewards',
                type: 'transaction',
                title: 'Stake Rewards',
                message: 'Earned 2.3 CTC from staking — added to wallet',
                timestamp: ts(10 * 24 * 60 * 60 * 1000),
                read: false,
                ctaUrl: 'wallet-enhanced.html',
                ctaLabel: 'View wallet'
            },
            {
                id: 'n8',
                layer: 'consumer',
                category: 'listing',
                type: 'listing',
                title: 'Lot Pre-sale Opens',
                message: 'Lot 12A at Kampala Centre opens for pre-sale tomorrow',
                timestamp: ts(11 * 24 * 60 * 60 * 1000),
                read: false,
                ctaUrl: 'explore-centres.html',
                ctaLabel: 'Explore centres'
            },
            {
                id: 'n9',
                layer: 'consumer',
                category: 'security',
                type: 'system',
                title: 'Password Updated',
                message: 'Your account password was successfully changed',
                timestamp: ts(12 * 24 * 60 * 60 * 1000),
                read: false,
                ctaUrl: 'account-settings.html',
                ctaLabel: 'Account settings'
            },
            {
                id: 'n10',
                layer: 'consumer',
                category: 'donation',
                type: 'donation',
                title: 'Monthly Recurring',
                message: 'Recurring donation of 10 CTC to Lagos Centre processed',
                timestamp: ts(14 * 24 * 60 * 60 * 1000),
                read: false,
                ctaUrl: 'dashboard-enhanced.html',
                ctaLabel: 'View impact'
            }
        ];
    }

    function cloneSeed(seed) {
        return JSON.parse(JSON.stringify(seed));
    }

    function isStablecoinAppPath() {
        return /\/Stablecoin\//.test(window.location.pathname);
    }

    function resolveCtaUrl(url) {
        if (!url || url.indexOf('mailto:') === 0) return url;
        if (isStablecoinAppPath()) return url;
        if (url.indexOf('Stablecoin/') === 0) return url;
        var q = url.indexOf('?');
        var path = q >= 0 ? url.slice(0, q) : url;
        var query = q >= 0 ? url.slice(q) : '';
        var stablecoinPages = [
            'mint-history.html', 'get-unera-cad.html', 'redeem-unera-cad.html',
            'proof-of-reserve-public.html', 'purchase-receipt.html', 'dashboard.html'
        ];
        if (stablecoinPages.indexOf(path) !== -1 || path.indexOf('purchase-receipt.html') === 0) {
            return 'Stablecoin/' + path + query;
        }
        return url;
    }

    function matchesFilter(n, filterKey) {
        if (!filterKey || filterKey === 'all') return true;
        if (filterKey === 'unread') return !n.read;
        if (filterKey === 'stablecoin_layer') return n.layer === 'stablecoin';
        if (filterKey === 'mint_redeem') {
            return n.category === 'mint_complete' || n.category === 'redeem_complete';
        }
        if (filterKey === 'deposits') return n.category === 'bank_deposit';
        if (filterKey === 'payments') return n.category === 'payment_problem';
        if (filterKey === 'updates') {
            return typeof n.category === 'string' && n.category.indexOf('service_') === 0;
        }
        if (filterKey === 'system') {
            return n.type === 'system' && n.layer === 'consumer';
        }
        return n.type === filterKey;
    }

    function syncSeedCopy(list, seed) {
        var i = list.findIndex(function (n) { return n.id === seed.id; });
        if (i === -1) return false;
        var n = list[i];
        var payload = {};
        var changed = false;
        SYNC_FIELDS.forEach(function (key) {
            if (seed[key] !== undefined && n[key] !== seed[key]) {
                payload[key] = seed[key];
                changed = true;
            }
        });
        if (changed) {
            list[i] = Object.assign({}, n, payload);
        }
        return changed;
    }

    function mergeIntoStorage() {
        var storageKey = 'clb_notifications';
        var versionKey = 'clb_notifications_catalog_version';
        var stablecoinSeeds = buildStablecoinSeeds();
        var consumerSeeds = buildConsumerSeeds();
        var allSeeds = stablecoinSeeds.concat(consumerSeeds);

        var list = JSON.parse(localStorage.getItem(storageKey) || '[]');
        var changed = false;

        list.forEach(function (n) {
            if (!n.layer) {
                n.layer = 'consumer';
                changed = true;
            }
        });

        allSeeds.forEach(function (seed) {
            if (syncSeedCopy(list, seed)) changed = true;
        });

        var existingIds = new Set(list.map(function (n) { return n.id; }));
        var toAdd = allSeeds.filter(function (s) { return !existingIds.has(s.id); }).map(cloneSeed);

        if (toAdd.length > 0) {
            var priorityIdSet = new Set(PRIORITY_CONSUMER_IDS);
            var priority = PRIORITY_CONSUMER_IDS.map(function (id) {
                return toAdd.find(function (n) { return n.id === id; });
            }).filter(Boolean).map(cloneSeed);
            var rest = toAdd.filter(function (n) { return !priorityIdSet.has(n.id); }).map(cloneSeed);
            list = priority.concat(list, rest);
            changed = true;
        }

        if (changed) {
            localStorage.setItem(storageKey, JSON.stringify(list));
        }
        localStorage.setItem(versionKey, String(2));

        return list;
    }

    function getForLayer(list, layer) {
        if (!Array.isArray(list)) list = JSON.parse(localStorage.getItem('clb_notifications') || '[]');
        if (layer === 'stablecoin') {
            return list.filter(function (n) { return n.layer === 'stablecoin'; });
        }
        return list.slice();
    }

    window.UNERA_NOTIFICATION_CATALOG = {
        VERSION: 2,
        STORAGE_KEY: 'clb_notifications',
        VERSION_KEY: 'clb_notifications_catalog_version',
        STABLECOIN_SEEDS: buildStablecoinSeeds(),
        CONSUMER_SEEDS: buildConsumerSeeds(),
        buildStablecoinSeeds: buildStablecoinSeeds,
        buildConsumerSeeds: buildConsumerSeeds,
        mergeIntoStorage: mergeIntoStorage,
        getForLayer: getForLayer,
        matchesFilter: matchesFilter,
        resolveCtaUrl: resolveCtaUrl,
        isStablecoinAppPath: isStablecoinAppPath
    };
})();
