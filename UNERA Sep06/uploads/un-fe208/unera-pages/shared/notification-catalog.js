/**
 * Huma notification seed catalog (prototype).
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
                message: 'Your mint of 500.00 Unera CAD is complete. Tokens are available in your wallet.',
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
                message: '200.00 Unera CAD was burned. Your CAD payout is being processed.',
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
                title: 'Unera Stablecoin update',
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
                /* FE-207 §B.6 — matches the persistent nav pending pill + Transaction Tracker */
                id: 'n_tx_pending',
                layer: 'consumer',
                category: 'donation',
                type: 'pending',
                title: 'Donation pending',
                message: 'Your donation is on its way. Usually takes 2\u20135 minutes \u2014 we\u2019ll tell you the moment it lands.',
                timestamp: ts(2 * 60 * 1000),
                read: false,
                ctaUrl: 'donate.html',
                ctaLabel: 'View status'
            },
            /* ── FE-208 §4.3 — the six donation lifecycle events the Donation spec names.
               Donation submitted · awaiting confirmation · completed · failed · receipt available ·
               Huma Points reward updated. Seeded so a cold load shows the real feed. ── */
            {
                id: 'n_don_submitted',
                layer: 'consumer',
                category: 'donation',
                type: 'transaction',
                title: 'Donation submitted',
                message: 'Your donation of 250 USDC (≈ $250.03) to Kibera Community Center was submitted. Total charged $252.53 including the processing fee.',
                timestamp: ts(9 * 60 * 1000),
                read: false,
                ctaUrl: 'donation-history.html',
                ctaLabel: 'View donation'
            },
            {
                id: 'n_don_awaiting',
                layer: 'consumer',
                category: 'donation',
                type: 'pending',
                title: 'Donation awaiting confirmation',
                message: 'Your 0.0035 BTC donation to Jakarta Coastal Resilience Center is being processed. We’ll update the status when conversion is complete.',
                timestamp: ts(14 * 60 * 1000),
                read: false,
                ctaUrl: 'donation-history.html',
                ctaLabel: 'Track donation'
            },
            {
                id: 'n_don_completed',
                layer: 'consumer',
                category: 'donation',
                type: 'donation',
                title: 'Donation completed',
                message: 'Your donation of $250.03 to Kibera Community Center is confirmed. Thank you.',
                timestamp: ts(35 * 60 * 1000),
                read: false,
                ctaUrl: 'donation-history.html',
                ctaLabel: 'View donation'
            },
            {
                id: 'n_don_receipt',
                layer: 'consumer',
                category: 'donation',
                type: 'transaction',
                title: 'Tax receipt available',
                message: 'Receipt UN-2026-004182 is ready to download. It is tied to this donation’s transaction ID.',
                timestamp: ts(33 * 60 * 1000),
                read: false,
                ctaUrl: 'donation-history.html',
                ctaLabel: 'Download receipt'
            },
            {
                id: 'n_don_points',
                layer: 'consumer',
                category: 'donation',
                type: 'donation',
                title: 'Huma Points updated',
                message: 'Your Huma Points for donation DON-90412 moved to confirmed: 12.5 Huma Points.',
                timestamp: ts(31 * 60 * 1000),
                read: false,
                ctaUrl: 'donations.html',
                ctaLabel: 'View impact'
            },
            {
                id: 'n_don_failed',
                layer: 'consumer',
                category: 'donation',
                type: 'error',
                title: 'Donation failed',
                message: 'We could not process the payment right now. Please try again.',
                timestamp: ts(4 * 60 * 60 * 1000),
                read: false,
                ctaUrl: 'donate.html',
                ctaLabel: 'Try again'
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
                ctaLabel: 'Explore centers'
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
                title: 'Donation completed',
                message: 'Your donation of $120.00 to El Alto Family Center is confirmed. Thank you.',
                timestamp: ts(7 * 24 * 60 * 60 * 1000),
                read: false,
                ctaUrl: 'donations.html',
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
                message: 'Lot 12A at Kampala Center opens for pre-sale tomorrow',
                timestamp: ts(11 * 24 * 60 * 60 * 1000),
                read: false,
                ctaUrl: 'explore-centres.html',
                ctaLabel: 'Explore centers'
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
                title: 'Recurring donation processed',
                message: 'Your monthly donation of $25.00 to Accra Learning Hub was processed. Recurring giving earns 3× Huma Points.',
                timestamp: ts(14 * 24 * 60 * 60 * 1000),
                read: false,
                ctaUrl: 'donations.html',
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
        localStorage.setItem(versionKey, String(3));

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
        VERSION: 3,
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
