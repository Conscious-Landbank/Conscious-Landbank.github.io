/* huma-points-data.js - display-only mock of the Huma Points service (Confluence 88932370, v156, 16 Sep 2026,
   revised by the 24 Sep Slack clarification: HP is a ledger in this phase, no token, claim = link to a signed wallet).
   The FE never calculates HP rules; rates and tiers below stand in for Admin Portal configuration. */
(function () {
  'use strict';
  /* Donation rate: HP-EARN-02 default. Swap rate is new (Eric, 24 Sep) and a placeholder until the value is confirmed. */
  var RATE = { hpPerUsd: 10, label: '$1 donated = 10 HP' };
  var SWAP_RATE = { hpPerUsd: 1, label: '$1 swapped = 1 HP' };
  /* HP-TIER-01..04 - proposed defaults for review; thresholds are lifetime HP earned. */
  var TIERS = [
    { id: 'supporter', name: 'Supporter', min: 0, perk: 'Where everyone starts. Every eligible donation or swap earns HP.' },
    { id: 'advocate', name: 'Advocate', min: 2500, perk: 'Planned: entry-level fee discounts when benefits go live.' },
    { id: 'champion', name: 'Champion', min: 10000, perk: 'Planned: higher fee discounts and early access to new utilities.' },
    { id: 'guardian', name: 'Guardian', min: 50000, perk: 'Planned: the highest benefit level.' }
  ];
  /* ready = claimed HP (ready to use, linked to a wallet). claimable = earned, not yet claimed. */
  var SUMMARY = { claimable: 2190, ready: 3460, lifetime: 14852 };
  /* Wallets the user already proved ownership of by signature. Linking to one of these needs no new signature. */
  var WALLETS = [
    { id: 'w1', short: '0x71C4…9A23', full: '0x71C4a92fE3b8D0621549cC00aa11bb22cc339A23', app: 'MetaMask', verified: '20 Aug 2026' },
    { id: 'w2', short: '0x9fD2…4E01', full: '0x9fD2b0c1d2e3f40516273849aabbccddeeff4E01', app: 'Rabby', verified: '2 Aug 2026' }
  ];
  var NEW_WALLET = { short: '0x3aB8…C71F', full: '0x3aB8e5f60718293a4b5c6d7e8f9012345678C71F', app: 'MetaMask' };
  /* status: unclaimed | pending | claimed | reversed. */
  var ACTIVITIES = [
    { id: 'a1', source: 'Donation', ref: 'DON-90533', to: 'Kibera Community Center', date: '17 Sep 2026', usd: 10, hp: null, status: 'pending' },
    { id: 'a8', source: 'Donation', ref: 'DON-90488', to: 'Sahel Green Belt Center', date: '15 Sep 2026', usd: 12, hp: 120, status: 'unclaimed' },
    { id: 'a2', source: 'Donation', ref: 'DON-90412', to: 'Kibera Community Center', date: '12 Sep 2026', usd: 25, hp: 250, status: 'unclaimed' },
    { id: 's1', source: 'Swap', ref: 'SWP-4412', to: 'hUSD to USDC', date: '10 Sep 2026', usd: 200, hp: 200, status: 'unclaimed' },
    { id: 'a3', source: 'Donation', ref: 'DON-90267', to: 'Mekong Delta Center', date: '8 Sep 2026', usd: 60, hp: 600, status: 'unclaimed' },
    { id: 'a9', source: 'Donation', ref: 'DON-89560', to: 'Zurich Lakeside Center', date: '2 Sep 2026', usd: 48, hp: 480, status: 'unclaimed' },
    { id: 's2', source: 'Swap', ref: 'SWP-4380', to: 'hEUR to hUSD', date: '1 Sep 2026', usd: 150, hp: 150, status: 'unclaimed' },
    { id: 'a4', source: 'Donation', ref: 'DON-89918', to: 'Andes Highland Center', date: '30 Aug 2026', usd: 39, hp: 390, status: 'unclaimed' },
    { id: 'a7', source: 'Donation', ref: 'DON-90101', to: 'Andes Highland Center', date: '4 Sep 2026', usd: 35, hp: 350, status: 'claimed' },
    { id: 'a10', source: 'Donation', ref: 'DON-88764', to: 'Sahel Green Belt Center', date: '26 Aug 2026', usd: 30, hp: 300, status: 'claimed' },
    { id: 'a5', source: 'Donation', ref: 'DON-88102', to: 'Kibera Community Center', date: '20 Aug 2026', usd: 72, hp: 720, status: 'claimed' },
    { id: 'a11', source: 'Donation', ref: 'DON-87920', to: 'Mekong Delta Center', date: '9 Aug 2026', usd: 26, hp: 260, status: 'claimed' },
    { id: 'a12', source: 'Donation', ref: 'DON-87610', to: 'Zurich Lakeside Center', date: '28 Jul 2026', usd: 15, hp: 150, status: 'claimed' },
    { id: 'a6', source: 'Donation', ref: 'DON-87455', to: 'Mekong Delta Center', date: '14 Jul 2026', usd: 15, hp: 150, status: 'reversed' }
  ];
  /* Claims are full claims only (Eric, 24 Sep): each one takes every claimable reward since the last claim.
     refs = the rewards the claim took. status: completed | failed. */
  var CLAIMS = [
    { id: 'HPC-2288', entries: 1, hp: 350, wallet: '0x71C4…9A23', status: 'completed', date: '18 Sep 2026', refs: [{ ref: 'DON-90101', to: 'Andes Highland Center', hp: 350 }] },
    { id: 'HPC-2140', entries: 1, hp: 300, wallet: '0x71C4…9A23', status: 'completed', date: '27 Aug 2026', refs: [{ ref: 'DON-88764', to: 'Sahel Green Belt Center', hp: 300 }] },
    { id: 'HPC-2201', entries: 2, hp: 980, wallet: '0x71C4…9A23', status: 'completed', date: '20 Aug 2026', refs: [{ ref: 'DON-88102', to: 'Kibera Community Center', hp: 720 }, { ref: 'DON-87920', to: 'Mekong Delta Center', hp: 260 }] },
    { id: 'HPC-2077', entries: 1, hp: 260, wallet: '0x71C4…9A23', status: 'completed', date: '10 Aug 2026', refs: [{ ref: 'DON-86340', to: 'Zurich Lakeside Center', hp: 260 }] },
    { id: 'HPC-2054', entries: 1, hp: 150, wallet: '0x9fD2…4E01', status: 'completed', date: '2 Aug 2026', refs: [{ ref: 'DON-87610', to: 'Zurich Lakeside Center', hp: 150 }] },
    { id: 'HPC-1988', entries: 1, hp: 120, wallet: '0x71C4…9A23', status: 'failed', date: '14 Jul 2026', refs: [{ ref: 'DON-85102', to: 'Kibera Community Center', hp: 120 }] },
    { id: 'HPC-1720', entries: 3, hp: 1420, wallet: '0x71C4…9A23', status: 'completed', date: '28 Jun 2026', refs: [{ ref: 'DON-84200', to: 'Mekong Delta Center', hp: 600 }, { ref: 'DON-83988', to: 'Kibera Community Center', hp: 500 }, { ref: 'DON-83710', to: 'Sahel Green Belt Center', hp: 320 }] }
  ];
  /* §6.3 user messages. Strings that named HPT are reworded for the ledger model (24 Sep) until the spec is updated. */
  var ERR = {
    calc: 'Your Huma Points reward is being calculated.',
    noClaimable: 'You do not have Huma Points available to claim yet.',
    signRejected: 'The signature was cancelled. Your points were not linked. Try again when you are ready.',
    notClaimable: 'One or more selected rewards cannot be claimed.',
    claimFailed: 'Your claim could not be completed. Please check again later.',
    notEligible: 'Huma Points are not available for this account right now.',
    clawback: 'A previous reward was adjusted.',
    processedFinal: 'This claim has already been processed and cannot be cancelled.',
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
  window.UNERA_HP = { RATE: RATE, SWAP_RATE: SWAP_RATE, TIERS: TIERS, SUMMARY: SUMMARY, WALLET: WALLETS[0], WALLETS: WALLETS, NEW_WALLET: NEW_WALLET, ACTIVITIES: ACTIVITIES, CLAIMS: CLAIMS, ERR: ERR, tierFor: tierFor, nextTier: nextTier };
})();
