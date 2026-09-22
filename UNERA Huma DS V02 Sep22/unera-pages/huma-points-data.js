/* huma-points-data.js - display-only mock of the Huma Points service (Confluence 88932370, v156, 16 Sep 2026).
   The FE never calculates HP rules; rates, ratios and tiers below stand in for Admin Portal configuration. */
(function () {
  'use strict';
  /* HP-EARN-02 - recommended review default, Admin-configurable. */
  var RATE = { hpPerUsd: 10, label: '10 HP per $1 donated', note: 'Rate is set in the Admin Portal and can change.' };
  /* HP-CLAIM-07 - default ratio unless Tokenomics config changes it. */
  var RATIO = { hpPerHpt: 1, label: '1 HP = 1 HPT' };
  /* HP-TIER-01..04 - proposed defaults for review; thresholds are lifetime HP earned. */
  var TIERS = [
    { id: 'supporter', name: 'Supporter', min: 0, perk: 'Where everyone starts. Every eligible donation earns HP.' },
    { id: 'advocate', name: 'Advocate', min: 2500, perk: 'Planned: entry-level fee discounts when benefits go live.' },
    { id: 'champion', name: 'Champion', min: 10000, perk: 'Planned: higher fee discounts and early access to new utilities.' },
    { id: 'guardian', name: 'Guardian', min: 50000, perk: 'Planned: the highest benefit level, set in the Admin Portal.' }
  ];
  /* huma_point_balances (§7.1.1) for the demo user. */
  var SUMMARY = { claimable: 1840, locked: 350, lifetime: 14852 };
  var WALLET = { short: '0x71C4…9A23', full: '0x71C4a92fE3b8D0621549cC00aa11bb22cc339A23' };
  /* huma_point_activity_rewards (§7.1.3). status: unclaimed | pending | locked | claimed | reversed. */
  var ACTIVITIES = [
    { id: 'a1', source: 'Donation', ref: 'DON-90533', to: 'Kibera Community Center', date: '17 Sep 2026', usd: 10, hp: null, status: 'pending' },
    { id: 'a8', source: 'Donation', ref: 'DON-90488', to: 'Sahel Green Belt Center', date: '15 Sep 2026', usd: 12, hp: 120, status: 'unclaimed' },
    { id: 'a2', source: 'Donation', ref: 'DON-90412', to: 'Kibera Community Center', date: '12 Sep 2026', usd: 25, hp: 250, status: 'unclaimed' },
    { id: 'a3', source: 'Donation', ref: 'DON-90267', to: 'Mekong Delta Center', date: '8 Sep 2026', usd: 60, hp: 600, status: 'unclaimed' },
    { id: 'a7', source: 'Donation', ref: 'DON-90101', to: 'Andes Highland Center', date: '4 Sep 2026', usd: 35, hp: 350, status: 'locked' },
    { id: 'a9', source: 'Donation', ref: 'DON-89560', to: 'Zurich Lakeside Center', date: '2 Sep 2026', usd: 48, hp: 480, status: 'unclaimed' },
    { id: 'a4', source: 'Donation', ref: 'DON-89918', to: 'Andes Highland Center', date: '30 Aug 2026', usd: 39, hp: 390, status: 'unclaimed' },
    { id: 'a10', source: 'Donation', ref: 'DON-88764', to: 'Sahel Green Belt Center', date: '26 Aug 2026', usd: 30, hp: 300, status: 'claimed' },
    { id: 'a5', source: 'Donation', ref: 'DON-88102', to: 'Kibera Community Center', date: '20 Aug 2026', usd: 72, hp: 720, status: 'claimed' },
    { id: 'a11', source: 'Donation', ref: 'DON-87920', to: 'Mekong Delta Center', date: '9 Aug 2026', usd: 26, hp: 260, status: 'claimed' },
    { id: 'a12', source: 'Donation', ref: 'DON-87610', to: 'Zurich Lakeside Center', date: '28 Jul 2026', usd: 15, hp: 150, status: 'claimed' },
    { id: 'a6', source: 'Donation', ref: 'DON-87455', to: 'Mekong Delta Center', date: '14 Jul 2026', usd: 15, hp: 150, status: 'reversed' }
  ];
  /* hpt_claim_requests (§7.1.4). */
  /* refs = the activity_reward entries locked by the claim (§7.1.4 activity_reward_ids), shown in the claim detail. */
  var CLAIMS = [
    { id: 'HPC-2288', type: 'Claim', entries: 1, hp: 350, hpt: null, dest: '0x71C4…9A23', status: 'submitted', tx: '0x2b91d004aa17', date: '18 Sep 2026', refs: [{ ref: 'DON-90101', to: 'Andes Highland Center', hp: 350 }] },
    { id: 'HPC-2140', type: 'Claim', entries: 1, hp: 300, hpt: 300, dest: '0x71C4…9A23', status: 'confirmed', tx: '0x4e02bb37d1a9', date: '27 Aug 2026', refs: [{ ref: 'DON-88764', to: 'Sahel Green Belt Center', hp: 300 }] },
    { id: 'HPC-2201', type: 'Claim All', entries: 2, hp: 980, hpt: 980, dest: '0x71C4…9A23', status: 'confirmed', tx: '0x8f3a41c09be2', date: '20 Aug 2026', refs: [{ ref: 'DON-88102', to: 'Kibera Community Center', hp: 720 }, { ref: 'DON-87920', to: 'Mekong Delta Center', hp: 260 }] },
    { id: 'HPC-2077', type: 'Claim', entries: 1, hp: 260, hpt: 260, dest: '0x71C4…9A23', status: 'confirmed', tx: '0x1d88c60f42ab', date: '10 Aug 2026', refs: [{ ref: 'DON-86340', to: 'Zurich Lakeside Center', hp: 260 }] },
    { id: 'HPC-2054', type: 'Claim', entries: 1, hp: 150, hpt: 150, dest: '0x9fD2…4E01', status: 'confirmed', tx: '0x77aa0912cc48', date: '2 Aug 2026', refs: [{ ref: 'DON-87610', to: 'Zurich Lakeside Center', hp: 150 }] },
    { id: 'HPC-1988', type: 'Claim', entries: 1, hp: 120, hpt: null, dest: '0x71C4…9A23', status: 'failed', tx: null, date: '14 Jul 2026', refs: [{ ref: 'DON-85102', to: 'Kibera Community Center', hp: 120 }] },
    { id: 'HPC-1720', type: 'Claim All', entries: 3, hp: 1420, hpt: 1420, dest: '0x71C4…9A23', status: 'confirmed', tx: '0x5cd30f81be77', date: '28 Jun 2026', refs: [{ ref: 'DON-84200', to: 'Mekong Delta Center', hp: 600 }, { ref: 'DON-83988', to: 'Kibera Community Center', hp: 500 }, { ref: 'DON-83710', to: 'Sahel Green Belt Center', hp: 320 }] }
  ];
  /* §6.3 - user messages, verbatim from the spec. Reference these, never retype them. */
  var ERR = {
    calc: 'Your Huma Points reward is being calculated.',
    noClaimable: 'You do not have Huma Points available to claim yet.',
    invalidWallet: 'Enter a valid wallet address to receive HPT.',
    notClaimable: 'One or more selected rewards cannot be claimed.',
    claimFailed: 'Your HPT claim could not be completed. Please check again later.',
    notEligible: 'Huma Points are not available for this account right now.',
    clawback: 'A previous reward was adjusted.',
    processedFinal: 'This HPT claim has already been processed and cannot be cancelled.',
    conversionUnavailable: 'Impact Point conversion is not available yet.',
    timeout: 'This is taking longer than expected. We\u2019ll update your status when available.'
  };
  function tierFor(lifetime) {
    var t = TIERS[0];
    TIERS.forEach(function (x) { if (lifetime >= x.min) t = x; });
    return t;
  }
  function nextTier(lifetime) {
    for (var i = 0; i < TIERS.length; i++) { if (TIERS[i].min > lifetime) return TIERS[i]; }
    return null;
  }
  window.UNERA_HP = { RATE: RATE, RATIO: RATIO, TIERS: TIERS, SUMMARY: SUMMARY, WALLET: WALLET, ACTIVITIES: ACTIVITIES, CLAIMS: CLAIMS, ERR: ERR, tierFor: tierFor, nextTier: nextTier };
})();
