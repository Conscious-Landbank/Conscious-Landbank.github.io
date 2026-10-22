/* Huma - Humanity Centers & Donation shared prototype data + user-state module.
   PRD: docs "Huma - Humanity Centers & Donation". Prototype-only; demo state is in-memory (never persisted). */
(function () {
  'use strict';
  /* ── Humanity Centers - the REAL network (FE-269, 13 Oct review H1-H4; Confluence 88768526 v7 §7.1/§7.2).
     Source of truth: humanitycentres.com/places + /all-programs and each center's own site. Field names follow the
     spec data model; legacy aliases (desc, about, image, location, active, totalDonatedUSD) are set in normalise()
     so existing pages keep working. Data was read from the public sites on 14 Oct 2026; the HC team will send the
     definitive CSV later (Eric, 14 Oct), so treat this as structure-correct sample content.
     Dropped on purpose (H3): lives impacted, donor counts, outcomes, stories, fund-use splits, milestones, impact
     hints, giving-trend charts. None of these exist on the HC sites. total_donated stays: it is Huma's own figure.
     Program category = the network's three dimensions (Me / Us / All of us) when the source states one; null otherwise. */
  var CITS = 'https://circlesinthesquare.ca/program/', BETH = 'https://bethlehemcentre.com/program/';
  var CENTERS = [
    { id: 'hc-circles', name: 'Circles in the Square', slug: 'circles-in-the-square', status: 'active',
      source_url: 'https://circlesinthesquare.ca/about/', website_url: 'https://circlesinthesquare.ca/',
      network_url: 'https://humanitycentres.com/places/',
      country: 'Canada', region: 'British Columbia', city: 'Vancouver', category: 'Neighbourhood gathering space',
      address: '665A Market Hill, Leg in Boot Square, False Creek South, Vancouver',
      short_description: 'A neighborhood gathering space for contemplation, sharing, learning, and creative practice.',
      full_description: 'Circles in the Square began with a simple idea: a warm, unhurried place where people come together to grow, to gather, and to wonder. Founder and host Susan Wright envisions a community belonging space for quiet contemplation, deep conversation and creative arts, where people connect with themselves and others and draw on their collective stories to sense right action. Circles runs as a gift economy: programs are freely offered and a donation within your means is invited in return.',
      tagline: 'A living room for the neighbourhood.',
      values: [ { name: 'Welcoming all', text: 'Everyone belongs. Come exactly as you are.' }, { name: 'Learning consciously', text: 'Growing in awareness, together.' }, { name: 'Expressing creatively', text: 'Art, voice and making as ways in.' }, { name: 'Contributing generously', text: 'A reciprocity of generosity. Give what you can.' } ],
      people: [ { name: 'Susan Wright', role: 'Founder and host' }, { name: 'Sebastian', role: 'Manager' } ],
      hero_image_url: 'https://humanitycentres.com/wp-content/uploads/2026/08/Screenshot-2026-08-18-at-11.59.46-AM.png',
      gallery_image_urls: [],
      programs: [
        { id: 'p-cits-climate', title: 'Climate Democracy Initiative', category: 'All of us', short_description: 'Conversations and civic action on climate: finding a local voice on a global question, and supporting one another to act.', cost: 'Cost varies', source_url: CITS + 'climate-democracy-initiative/', status: 'active', ip_redemption_enabled: false, display_order: 1 },
        { id: 'p-cits-coaching', title: 'Coaching', category: 'Me', short_description: 'Contemplative one-to-one coaching in the spirit of The Coaching Project. A supportive space to reflect, find clarity and take your next step.', cost: 'Cost varies', source_url: CITS + 'coaching/', status: 'active', ip_redemption_enabled: false, display_order: 2 },
        { id: 'p-cits-false-creek', title: 'False Creek Friends', category: 'All of us', short_description: 'Community feasts and volunteer events with False Creek Friends: caring for the shoreline and each other, and celebrating the neighbourhood.', cost: 'Cost varies', source_url: CITS + 'false-creek-friends/', status: 'active', ip_redemption_enabled: false, display_order: 3 },
        { id: 'p-cits-zero-waste', title: 'Neighbourhood Zero Waste Club', category: 'All of us', short_description: 'Neighbours helping neighbours waste less: tips, swaps, repairs and small changes that add up.', cost: 'Cost varies', source_url: CITS + 'neighbourhood-zero-waste-club/', status: 'active', ip_redemption_enabled: false, display_order: 4 },
        { id: 'p-cits-suzuki', title: 'Suzuki Elders', category: 'Us', short_description: 'A gathering of senior women and elders sharing wisdom, story and companionship, connected to the Suzuki Elders community.', cost: 'Cost varies', source_url: CITS + 'suzuki-elders/', status: 'active', ip_redemption_enabled: false, display_order: 5 },
        { id: 'p-cits-walking', title: 'Walking Tours and Travelogue', category: 'Us', short_description: 'Walking tours of the neighbourhood and travelogue evenings that go further afield.', cost: 'Cost varies', source_url: CITS + 'walking-tours-travelogue/', status: 'active', ip_redemption_enabled: false, display_order: 6 },
        { id: 'p-cits-painting', title: 'Painting the Landscape of Your Soul', category: null, short_description: 'Poster painting from the inside out, playing with colour and expression on paper just for fun.', cost: 'Cost varies', source_url: CITS + 'painting-the-landscape-of-your-soul/', status: 'active', ip_redemption_enabled: false, display_order: 7 },
        { id: 'p-cits-write', title: 'Write Your Body-Soul Alive: A Workshop for Women', category: null, short_description: 'An eight-part workshop exploring the stories waiting to be told, using poetry, movement and music.', cost: 'Cost varies', source_url: CITS + 'write-your-body-soul-alive-a-workshop-for-women/', status: 'active', ip_redemption_enabled: false, display_order: 8 },
        { id: 'p-cits-phoenix', title: 'Phoenix Writing', category: null, short_description: 'A four-week masterclass using improv games and prompts to turn raw survival into literary art.', cost: 'Cost varies', source_url: CITS + 'phoenix-writing/', status: 'active', ip_redemption_enabled: false, display_order: 9 },
        { id: 'p-cits-swipe', title: 'From Swipe to Script', category: null, short_description: 'For anyone exhausted by modern dating: a program about taking your power back.', cost: 'Cost varies', source_url: CITS + 'from-swipe-to-script/', status: 'active', ip_redemption_enabled: false, display_order: 10 },
        { id: 'p-cits-inner-child', title: 'Reclaiming the Inner Child', category: null, short_description: 'A workshop with Andrea Woodhouse. Full write-up coming soon.', cost: 'Cost varies', source_url: CITS + 'reclaiming-the-inner-child/', status: 'active', ip_redemption_enabled: false, display_order: 11 },
        { id: 'p-cits-silence', title: 'An Invitation to Silence', category: null, short_description: 'A retreat from daily busyness into spacious silence, grounding you for well-being, presence to others and action.', cost: 'Cost varies', source_url: CITS + 'an-invitation-to-silence/', status: 'active', ip_redemption_enabled: false, display_order: 12 },
        { id: 'p-cits-felting', title: 'Wet Felting: Salish Sea', category: null, short_description: 'Ocean currents, jellyfish, seaweed and more. Mindful fibre art with a little extra softness and heart.', cost: 'Cost varies', source_url: CITS + 'wet-felting/', status: 'active', ip_redemption_enabled: false, display_order: 13 },
        { id: 'p-cits-spirituality', title: 'Spirituality: Can We Talk?', category: null, short_description: 'A six-session discussion group for pilgrims, mystics, seekers and the curious, sharing faith experiences without judgement.', cost: 'Cost varies', source_url: CITS + 'spirituality-can-we-talk/', status: 'active', ip_redemption_enabled: false, display_order: 14 },
        { id: 'p-cits-belonging', title: 'Belonging Circles', category: null, short_description: 'An introduction to what Humanity Centres are: a welcoming place to pause, reflect and reconnect.', cost: 'Cost varies', source_url: CITS + 'belonging-circles/', status: 'active', ip_redemption_enabled: false, display_order: 15 },
        { id: 'p-cits-constellations', title: 'Family Constellations', category: null, short_description: 'Explore the unseen dynamics within your family system in a supportive circle.', cost: 'Cost varies', source_url: CITS + 'family-constellations/', status: 'active', ip_redemption_enabled: false, display_order: 16 },
        { id: 'p-cits-ai', title: 'Humanity in the Age of AI', category: null, short_description: 'A four-session exploration of what is being said and done about AI, and what we can do about it.', cost: 'Cost varies', source_url: CITS + 'humanity-in-the-age-of-ai/', status: 'active', ip_redemption_enabled: false, display_order: 17 },
        { id: 'p-cits-crossroads', title: 'Humanity at the Crossroads', category: null, short_description: 'Is there still hope for humanity? On choosing the path toward more complexity and kindness.', cost: 'Cost varies', source_url: CITS + 'humanity-at-the-crossroads/', status: 'active', ip_redemption_enabled: false, display_order: 18 },
        { id: 'p-cits-art', title: 'Art Exhibition', category: null, short_description: 'The walls are given over to a show for six weeks or so at a time. On now: Doors to the Universe, by Pierre Leichner.', cost: 'Cost varies', source_url: CITS + 'art-exhibition/', status: 'active', ip_redemption_enabled: false, display_order: 19 }
      ],
      total_donated: 18420, tint: '#1e4e5a', initials: 'CS' },
    { id: 'hc-surrey', name: 'Surrey Neighbourhood House', slug: 'surrey-neighbourhood-house', status: 'active',
      source_url: 'https://surreynhs.org/', website_url: 'https://surreynhs.org/',
      network_url: 'https://humanitycentres.com/places/',
      country: 'Canada', region: 'British Columbia', city: 'Surrey', category: 'Community hub',
      address: 'Surrey, BC',
      short_description: 'An inclusive community hub that helps individuals and families connect, learn and thrive together.',
      full_description: 'Surrey Neighbourhood House was founded in 2025 with a mission to create an inclusive community hub that empowers individuals and families to connect, learn and thrive together, through accessible programs, resources and spaces that foster wellbeing and a sense of belonging.',
      tagline: 'Connect, learn and thrive together.',
      founded: 2025, values: [], people: [],
      hero_image_url: 'https://humanitycentres.com/wp-content/uploads/2026/08/surrey-neighbourhood-house-backyard.webp',
      gallery_image_urls: [],
      programs: [
        { id: 'p-snh-belonging', title: 'The Belonging Circle', category: 'Us', short_description: 'A welcoming 90-minute guided Humanity Centre program, in person in Surrey, led by Manpreet.', cost: null, source_url: 'https://www.eventbrite.ca/e/the-belonging-circle-surrey-meet-up-tickets-1996529745213', status: 'active', ip_redemption_enabled: false, display_order: 1 }
      ],
      total_donated: 6180, tint: '#3a6152', initials: 'SN' },
    { id: 'hc-bethlehem', name: 'Bethlehem Centre', slug: 'bethlehem-centre', status: 'active',
      source_url: 'https://bethlehemcentre.com/about/', website_url: 'https://bethlehemcentre.com/',
      network_url: 'https://humanitycentres.com/places/',
      country: 'Canada', region: 'British Columbia', city: 'Nanaimo', category: 'Retreat centre',
      address: '2371 Arbot Rd, Nanaimo, BC V9R 6S9, on Westwood Lake',
      short_description: 'A lakeside retreat centre offering multi-day programs in contemplation, wellness, and community.',
      full_description: 'Bethlehem Centre is a charitable organization on Westwood Lake, Vancouver Island, that welcomes individuals and groups exploring spirituality and seeking a non-judgmental sacred place for contemplation, learning and community. Multi-faith rather than tied to one tradition, it holds the vision of a destination supporting and sustaining spirituality without borders, and keeps the tradition of hospitality that has long been part of its strength. The Centre was established in 1987 by the House of Bread Benedictine Sisters and is run today by the Bethlehem Centre Society.',
      tagline: 'Spirituality without borders.',
      founded: 1987, charity_reg_no: '892912668 RR0001',
      values: [ { name: 'People first', text: 'Care for one another, with kindness and respect.' }, { name: 'Respect', text: 'Lead with ethics and values; decisions that benefit all.' }, { name: 'Hospitality', text: 'Warmth, acceptance and simple, clean spaces.' }, { name: 'Open-minded thinking', text: 'Room for multiple points of view at once.' }, { name: 'Integrity', text: 'Doing things honestly.' }, { name: 'Trustworthiness', text: 'Keeping promises and commitments.' } ],
      people: [],
      hero_image_url: 'https://humanitycentres.com/wp-content/uploads/2026/08/Mask-group-1024x682.png',
      gallery_image_urls: [],
      programs: [
        { id: 'p-beth-island-dharma', title: 'Island Dharma: Insight, Awareness and Bodhicitta', category: null, short_description: 'A week-long silent meditation retreat led by resident teacher Dr. Cheryl Fraser, with guest teachings by Lama Mark Webber. 27 Aug to 3 Sep 2026.', cost: 'From CAD 816 (commuter) to CAD 1,761 (ensuite), meals included', source_url: BETH + '4040/island-dharma-insight-awareness-and-bodhicitta/', status: 'active', ip_redemption_enabled: false, display_order: 1 },
        { id: 'p-beth-hakomi', title: 'Mindful Self-Discovery: Hakomi Practice', category: null, short_description: 'An experiential Hakomi workshop using mindfulness and somatic practice to cultivate appreciation, gratitude and deeper relationships in community.', cost: null, source_url: BETH + '4176/mindful-self-discovery-hakomi-practice/', status: 'active', ip_redemption_enabled: false, display_order: 2 },
        { id: 'p-beth-fall-away', title: 'Fall Away Retreat: Bodhichitta Centre', category: null, short_description: 'A retreat to improve both the technique of meditation and the understanding of Dharma.', cost: null, source_url: BETH + '4058/bodhichitta-centre-fall-2026/', status: 'active', ip_redemption_enabled: false, display_order: 3 },
        { id: 'p-beth-kundalini', title: 'Embers and Expansion: A Fall Kundalini Retreat', category: null, short_description: 'A gentle fall Kundalini retreat to slow down, turn inward and reconnect with your inner compass.', cost: null, source_url: BETH + '3961/fall-kundalini-retreat-2/', status: 'active', ip_redemption_enabled: false, display_order: 4 },
        { id: 'p-beth-mens', title: "Autumn: Men's Group Retreat", category: null, short_description: 'A weekend retreat with time for private contemplation and the peace of Bethlehem.', cost: null, source_url: BETH + '4099/autumn-mens-group-retreat/', status: 'active', ip_redemption_enabled: false, display_order: 5 },
        { id: 'p-beth-ytt', title: '200 Hour Yoga Teacher Training', category: null, short_description: 'An inclusive yoga journey blending Hatha and Kundalini, with certification to share the practice with others.', cost: null, source_url: BETH + '3927/200-hour-teacher-training/', status: 'active', ip_redemption_enabled: false, display_order: 6 }
      ],
      total_donated: 24950, tint: '#2e6374', initials: 'BC' }
  ];

  /* ── Status model (§3.3): draft | active | pause | suspended | deactivated.
     Directory + detail: active and pause only. Donate: active only. §6.3 paused copy is verbatim below. */
  var HC_STATUS_LABEL = { active: 'Active', pause: 'Donations paused', suspended: 'Unavailable', deactivated: 'Closed', draft: 'Not published' };
  var PAUSED_COPY = {
    badge: 'Donations paused',
    cardHelper: 'This Humanity Center is temporarily not accepting new donations.',
    banner: 'This Humanity Center is currently paused and is not accepting new donations at this time. You can still view its public profile, active Programs, and impact information.',
    ctaTooltip: 'Donations are temporarily paused for this Humanity Center.',
    guard: 'This Humanity Center is not accepting donations right now. Please choose another Humanity Center or check back later.'
  };
  var PROGRAM_DIMENSION = { 'Me': 'Personal growth', 'Us': 'Community', 'All of us': 'The bigger picture' };
  function hostOf(url) { try { return new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return ''; } }
  function normalise(c) {
    c.active = c.status === 'active';
    c.visible = c.status === 'active' || c.status === 'pause';
    c.location = c.city ? c.city + ', ' + c.region : c.country;
    c.desc = c.short_description; c.about = c.full_description;
    c.image = c.hero_image_url; c.gallery = c.gallery_image_urls || [];
    c.totalDonatedUSD = c.total_donated;
    c.sourceHost = hostOf(c.source_url || c.website_url);
    (c.programs || []).forEach(function (p) { p.hc_id = c.id; p.slug = p.slug || p.id.replace(/^p-/, ''); p.sourceHost = hostOf(p.source_url); });
    c.activePrograms = (c.programs || []).filter(function (p) { return p.status === 'active'; }).sort(function (a, b) { return (a.display_order || 0) - (b.display_order || 0); });
  }
  CENTERS.forEach(normalise);
  /* In-memory demo override (prototype only, never persisted): setStatus('hc-bethlehem','pause') */
  function setStatus(id, status) { var c = CENTERS.find(function (x) { return x.id === id; }); if (c) { c.status = status; normalise(c); } }
  function visibleCentres() { return CENTERS.filter(function (c) { return c.visible; }); }
  function categories() {
    return Array.from(new Set(visibleCentres().map(function (c) { return c.category; }))).sort();
  }
  function cities() {
    return Array.from(new Set(visibleCentres().map(function (c) { return c.city; }))).sort();
  }

  /* ── Settlement configuration (Donation spec §1.7 + §7.3) ──
     Fiat settles to the Payment Rail's defined ACCOUNT (never converted to crypto).
     USDC/USDT settle DIRECTLY to the defined multisig wallet.
     BTC/ETH are converted to USDC or USDT by the Crypto Swap Worker, then routed to the same multisig. */
  var SETTLEMENT = {
    multisig: '0x5C1fD8a72E90B4d3617ac0951Ee27fB4a83D6019',
    /* FE-208 (Eric, 24 Aug) - the multisig wallet is NOT shown in UI; settlement is handled by the BE. Neutral label only. */
    multisigLabel: 'Humanity Center settlement wallet',
    fiatAccountLabel: 'Payment Rail settlement account',
    /* FE-208 (Eric, 24 Aug) - bank transfer shows the receiving account the user sends money to. Prototype details. */
    bank: { holder: 'Huma AG · Donations', bankName: 'Zürcher Kantonalbank, Zurich', iban: 'CH56 0483 5012 3456 7800 9', bic: 'ZKBKCHZZ80A', expiryHours: 72 },
    network: 'Ethereum',            /* OQ-03 - approved network list TBD */
    explorer: 'https://sepolia.etherscan.io/tx/'
  };

  /* Minimal donatable balance context - owned by Wallet Service (cached; see wallet-enhanced.html for full portfolio).
     Order follows DON-CRYPTO-01: USDC/USDT first, then convertible assets. */
  var BALANCES = {
    lastUpdated: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    tokens: [
      { symbol: 'USDC', name: 'USD Coin',  amount: 1204.10, native: false, settles: 'direct' },
      { symbol: 'USDT', name: 'Tether USD', amount: 610.25, native: false, settles: 'direct' },
      { symbol: 'BTC',  name: 'Bitcoin',    amount: 0.01840, native: false, settles: 'converted' },
      { symbol: 'ETH',  name: 'Ethereum',   amount: 0.4200,  native: true,  settles: 'converted' }
    ]
  };
  var PRICES = { hUSD: 1.0000, USDC: 1.0001, USDT: 0.9998, ETH: 3120.40, BTC: 61480.00 };
  var GAS = { approveETH: 0.00042, donateETH: 0.00068 }; // est. network fees, user pays

  /* ── Fees (DON-DASH-08 / DON-CRYPTO-03 / AC-DON-07) ──
     The spec mandates the fee but sets no rate. These are PROTOTYPE placeholders - TBD Finance.
     Processing fee is always applied ON TOP: total charged = donation amount + processing fee. */
  var FEES = {
    note: 'The platform fee is free for now. Any cost is shown before you confirm.',
    fiatPct: 0.029, fiatFixed: 0.30,   /* card rail */
    bankPct: 0.008, bankFixed: 0,      /* bank transfer - prototype rate, TBD Finance */
    cryptoPct: 0.010,                   /* platform processing fee on crypto donations */
    conversionPct: 0.003                /* Crypto Swap Worker route fee, convertible assets only */
  };
  function processingFee(source, usd, rail) {
    if (source === 'fiat') {
      if (rail === 'bank') return Math.round((usd * FEES.bankPct + FEES.bankFixed) * 100) / 100;
      return Math.round((usd * FEES.fiatPct + FEES.fiatFixed) * 100) / 100;
    }
    return Math.round(usd * FEES.cryptoPct * 100) / 100;
  }
  function conversionFee(usd) { return Math.round(usd * FEES.conversionPct * 100) / 100; }

  /* ── Fiat currencies (DON-FIAT-04). OQ-02 - MVP currency list TBD. ── */
  var FIAT = [
    { code: 'USD', symbol: '$',  rate: 1,        label: 'US Dollar' },
    { code: 'EUR', symbol: '€', rate: 1.0840, label: 'Euro' },
    { code: 'GBP', symbol: '£', rate: 1.2710, label: 'British Pound' },
    { code: 'VND', symbol: '₫', rate: 0.0000392, label: 'Vietnamese Dong' }
  ];
  function fiatCcy(code) { return FIAT.find(function (f) { return f.code === code; }) || FIAT[0]; }

  /* ── Uniswap quote (DON-CRYPTO-02 / §7.2 /v1/prices) ──
     Compares the USDC and USDT routes and returns the higher USD-equivalent. Prototype maths. */
  function uniswapQuote(symbol, amount) {
    var px = PRICES[symbol] || 0;
    var usdc = amount * px * (PRICES.USDC / 1);
    var usdt = amount * px * (PRICES.USDT / 1);
    var direct = symbol === 'USDC' || symbol === 'USDT';
    var best = usdc >= usdt ? 'USDC' : 'USDT';
    return {
      asset: symbol,
      amount: amount,
      settlementAsset: direct ? symbol : best,
      converted: !direct,
      usd: Math.round((direct ? amount * px : Math.max(usdc, usdt)) * 100) / 100,
      rate: px,
      routes: { USDC: Math.round(usdc * 100) / 100, USDT: Math.round(usdt * 100) / 100 },
      source: 'Uniswap'
    };
  }

  function iso(daysAgo, h) { var d = new Date(Date.now() - daysAgo * 864e5); if (h != null) d.setHours(h, 24 - daysAgo, 0, 0); return d.toISOString(); }
  /* donation_history (§7.1.2): original amount/currency, USD value, processing fee, total charged,
     settlement asset/amount, destination, source, status, txHash. */
  var HISTORY = [
    { id: 'don-90412', hcId: 'hc-circles', source: 'crypto', status: 'completed', amount: 250, currency: 'USDC', amountUSD: 250.03,
      rate: 1.0001, fee: 2.50, conversionFee: 0, totalCharged: 252.53, settlementAsset: 'USDC', settlementAmount: 250.00,
      destination: 'multisig', txHash: '0x9b71f04c8a2e51d6b3a8f27c90e14d5a6b82c3f1a0d97e6541bc28d3f7a1904c', createdAt: iso(3, 14),
      receipt: 'available', receiptNo: 'UN-2026-004182', uyt: { amount: 12.5, status: 'confirmed' } },
    { id: 'don-90371', hcId: 'hc-surrey', source: 'fiat', status: 'completed', amount: 500, currency: 'USD', amountUSD: 500,
      rate: 1, fee: 14.80, conversionFee: 0, totalCharged: 514.80, settlementAsset: 'USD_FIAT', settlementAmount: 500,
      destination: 'fiat_account', txHash: null, createdAt: iso(11, 10),
      receipt: 'available', receiptNo: 'UN-2026-003967', uyt: { amount: 25.0, status: 'confirmed' } },
    { id: 'don-90224', hcId: 'hc-circles', source: 'crypto', status: 'awaiting_confirmation', amount: 0.05, currency: 'ETH', amountUSD: 156.02,
      rate: 3120.4, fee: 1.56, conversionFee: 0.47, totalCharged: 157.58, settlementAsset: 'USDC', settlementAmount: null,
      destination: 'multisig', txHash: '0x4c81ab90de23f761c8a05b1e94d2c7f30a6b85d19e2f4c07b3a68d51c2e09af0', createdAt: iso(0.04),
      receipt: 'pending', receiptNo: null, uyt: { amount: 7.8, status: 'pending' } },
    /* DON-CRYPTO-07 - conversion pending: submitted and confirmed on-chain, Swap Worker still converting. */
    { id: 'don-90188', hcId: 'hc-bethlehem', source: 'crypto', status: 'conversion_pending', amount: 0.0035, currency: 'BTC', amountUSD: 215.18,
      rate: 61480, fee: 2.15, conversionFee: 0.65, totalCharged: 217.33, settlementAsset: 'USDT', settlementAmount: null,
      destination: 'multisig', txHash: '0x2f60c9a4b7138e05dc71a9f4382b06de5417ca8039fb26d7150e94c3a6b820f5', createdAt: iso(0.2),
      receipt: 'pending', receiptNo: null, uyt: { amount: 10.7, status: 'estimated' } },
    /* DON-FIAT-04 - non-USD fiat: original currency + amount + rate preserved, USD is canonical. */
    { id: 'don-90055', hcId: 'hc-circles', source: 'fiat', status: 'completed', amount: 180, currency: 'EUR', amountUSD: 195.12,
      rate: 1.084, fee: 5.96, conversionFee: 0, totalCharged: 185.50, settlementAsset: 'USD_FIAT', settlementAmount: 195.12,
      destination: 'fiat_account', txHash: null, createdAt: iso(21, 15),
      receipt: 'available', receiptNo: 'UN-2026-004071', uyt: { amount: 9.7, status: 'confirmed' } },
    { id: 'don-89960', hcId: 'hc-bethlehem', source: 'fiat', status: 'completed', amount: 120, currency: 'USD', amountUSD: 120,
      rate: 1, fee: 3.78, conversionFee: 0, totalCharged: 123.78, settlementAsset: 'USD_FIAT', settlementAmount: 120,
      destination: 'fiat_account', txHash: null, createdAt: iso(34, 16),
      receipt: 'available', receiptNo: 'UN-2026-002851', uyt: { amount: 6.0, status: 'confirmed' } },
    { id: 'don-89712', hcId: 'hc-surrey', source: 'crypto', status: 'completed', amount: 264, currency: 'USDT', amountUSD: 263.95,
      rate: 0.9998, fee: 2.64, conversionFee: 0, totalCharged: 266.59, settlementAsset: 'USDT', settlementAmount: 264,
      destination: 'multisig', txHash: '0x7a3fe8c210b94d67a1f05c3e82d96b40c7a2e15f90d84b672c3a01e59f6d2b9c', createdAt: iso(58, 9),
      receipt: 'unavailable', receiptNo: null, uyt: { amount: 13.2, status: 'confirmed' } },
    { id: 'don-89544', hcId: 'hc-circles', source: 'fiat', status: 'failed', amount: 75, currency: 'USD', amountUSD: 0,
      rate: 1, fee: 0, conversionFee: 0, totalCharged: 0, settlementAsset: 'USD_FIAT', settlementAmount: null,
      destination: 'fiat_account', txHash: null, createdAt: iso(71, 11),
      receipt: 'unavailable', receiptNo: null, uyt: null }
  ];

  var SUMMARY = { totalDonatedUSD: 1485.15, uytConfirmed: 74.2, uytPending: 7.8, uytEstimated: 10.7, receipts: 5 };

  /* ── Huma Points reward state (§7.1.4 / DON-HP-02) - display only, never calculated in FE. ── */
  var HP_STATE = {
    estimated: { label: 'Estimated', note: 'Confirmed after settlement.' },
    pending:   { label: 'Pending',   note: 'Awaiting confirmation.' },
    confirmed: { label: 'Confirmed', note: '' },
    failed:    { label: 'Not awarded', note: 'No points for this donation.' },
    unavailable: { label: 'Unavailable', note: 'Points are unavailable right now.' }
  };
  function hpChip(status) {
    var m = HP_STATE[status] || HP_STATE.unavailable;
    return '<span class="uyt-pill" title="' + esc(m.note) + '">' + esc(m.label) + '</span>';
  }

  /* ── §6.3 error copy - VERBATIM from the Donation spec. Single source of truth for every surface. ── */
  var MAX_USD = 50000, MIN_USD = 1;
  var ERR = {
    invalidAmount:  'Enter a valid donation amount.',
    outOfRange:     function (max) { return 'Donation amount must be between $1 and ' + fmtUSD(max == null ? MAX_USD : max) + '.'; },
    notLoggedIn:    'Log in to complete your donation.',
    kycRequired:    'Complete verification to continue with this donation.',
    walletRequired: 'Connect your wallet to donate crypto.',
    insufficient:   function (sym) { return 'You do not have enough ' + sym + ' for this donation.'; },
    gas:            'You may need more gas token to complete this transaction.',
    rejected:       'Donation was not submitted because the wallet request was rejected.',
    reverted:       'Unable to complete this donation. Please try again.',
    expired:        'This donation request expired. Please start a new donation.',
    provider:       'We could not process the payment right now. Please try again.',
    converting:     'Your donation is being processed. We’ll update the status when conversion is complete.',
    noReceipt:      'A receipt is not available for this donation.',
    timeout:        'This is taking longer than expected. We’ll update the status when confirmation is available.'
  };

  /* ── Demo user-state module - IN-MEMORY ONLY (resets on reload; PRD §2 access rules) ── */
  var STATES = [
    { id: 'wallet', label: 'KYC + wallet connected' },
    { id: 'kyc', label: 'KYC verified' },
    { id: 'authed', label: 'Logged in (no KYC)' },
    { id: 'public', label: 'Public visitor' }
  ];
  var userState = 'wallet'; // happy-path default
  var listeners = [];
  function setUserState(s) { userState = s; listeners.forEach(function (fn) { fn(s); }); }
  function onUserState(fn) { listeners.push(fn); }
  function is(minState) {
    var order = ['public', 'authed', 'kyc', 'wallet'];
    return order.indexOf(userState) >= order.indexOf(minState);
  }
  function renderStatePills(mountId) {
    var el = document.getElementById(mountId);
    if (!el) return;
    el.innerHTML = STATES.map(function (s) {
      return '<button type="button" class="demo-btn' + (s.id === userState ? ' active' : '') + '" data-ustate="' + s.id + '">' + s.label + '</button>';
    }).join('');
    el.querySelectorAll('.demo-btn').forEach(function (b) {
      b.addEventListener('click', function () { setUserState(b.getAttribute('data-ustate')); renderStatePills(mountId); });
    });
  }

  /* ── Helpers ── */
  function fmtUSD(n, dp) { return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: dp == null ? 0 : dp, maximumFractionDigits: dp == null ? 0 : dp }); }
  function fmtNum(n) { return Number(n).toLocaleString('en-US'); }
  function shortAddr(a) { return a ? a.slice(0, 6) + '...' + a.slice(-4) : ''; }
  function shortHash(h) { return h ? h.slice(0, 10) + '…' + h.slice(-4) : ''; }
  function fmtDate(isoStr) { var d = new Date(isoStr); return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }); }
  function getCentre(id) { return CENTERS.find(function (c) { return c.id === id; }) || CENTERS[0]; }
  function qs(name) { return new URLSearchParams(location.search).get(name); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  /* Status chip: label + icon, never color alone (PRD §6.4) */
  var STATUS_META = {
    completed: { label: 'Completed', cls: 'status-completed' },
    awaiting_confirmation: { label: 'Awaiting confirmation', cls: 'status-pending' },
    awaiting_signature: { label: 'Awaiting signature', cls: 'status-pending' },
    submitted: { label: 'Submitted', cls: 'status-pending' },
    conversion_pending: { label: 'Conversion pending', cls: 'status-pending' },
    processing: { label: 'Processing', cls: 'status-pending' },
    pending_payment: { label: 'Pending payment', cls: 'status-pending' },
    rejected: { label: 'Rejected by user', cls: 'status-warn' },
    failed: { label: 'Failed', cls: 'status-failed' },
    expired: { label: 'Expired', cls: 'status-failed' },
    requires_resolution: { label: 'Needs attention', cls: 'status-warn' }
  };
  function statusChip(status) {
    var m = STATUS_META[status] || { label: status, cls: 'status-pending' };
    var icons = {
      'status-completed': 'm424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z',
      'status-pending': 'M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm112-192 56-56-148-148v-184h-80v216l172 172Z',
      'status-failed': 'M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z',
      'status-warn': 'm40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Z'
    };
    return '<span class="don-status-chip ' + m.cls + '"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="' + icons[m.cls] + '"/></svg>' + m.label + '</span>';
  }
  /* Donation lifecycle notification (PRD §4.3.1) -> shared bell feed */
  function notifyDonation(level, title, message, ref, ctaUrl, ctaLabel) {
    if (typeof window.addNotification === 'function') {
      window.addNotification({ level: level, category: 'donation', title: title, message: message, ref: ref, ctaUrl: ctaUrl || 'donation-history.html', ctaLabel: ctaLabel || 'View donation' });
    }
  }

  /* Brand graphic-device artwork (organic blobs) - the DS illustration language; no figurative photos.
     Deterministic per center so each card/hero looks distinct but on-brand. */
  var BLOB_SETS = [
    [{w:78,h:78,br:'60% 40% 70% 30%/40% 60% 40% 60%',t:-26,r:-14,o:0.16},{w:52,h:52,br:'30% 70% 30% 70%/70% 30% 70% 30%',b:-16,l:-10,o:0.13},{w:34,h:34,br:'50%',t:14,l:'44%',o:0.10}],
    [{w:70,h:70,br:'70% 30% 40% 60%/30% 70% 60% 40%',t:-22,r:-12,o:0.15},{w:48,h:48,br:'40% 60% 60% 40%/60% 40% 40% 60%',b:-14,l:'20%',o:0.12},{w:30,h:30,br:'50% 50% 40% 60%/40% 70% 30% 60%',t:20,r:12,o:0.10}],
    [{w:74,h:74,br:'60% 40% 30% 70%/60% 30% 70% 40%',t:-18,l:-12,o:0.15},{w:50,h:50,br:'30% 60% 70% 40%/50% 60% 30% 60%',t:12,r:6,o:0.13},{w:32,h:32,br:'50% 50% 40% 60%/40% 70% 30% 60%',b:-12,l:'34%',o:0.10}],
    [{w:80,h:80,br:'40% 60% 65% 35%/55% 45% 55% 45%',t:-28,r:'30%',o:0.16},{w:46,h:46,br:'60% 40% 30% 70%/40% 60% 40% 60%',b:-14,r:-10,o:0.12},{w:30,h:30,br:'50%',t:18,l:8,o:0.10}],
    [{w:72,h:72,br:'70% 30% 50% 50%/40% 50% 50% 60%',b:-24,r:-14,o:0.15},{w:50,h:50,br:'40% 60% 40% 60%/60% 40% 60% 40%',t:-16,l:-8,o:0.12},{w:28,h:28,br:'50%',t:'40%',r:14,o:0.10}],
    [{w:76,h:76,br:'55% 45% 35% 65%/45% 55% 45% 55%',t:-22,l:'36%',o:0.15},{w:48,h:48,br:'30% 70% 60% 40%/60% 40% 30% 70%',b:-16,l:-10,o:0.12},{w:32,h:32,br:'50% 50% 60% 40%/50% 40% 60% 50%',t:16,r:-8,o:0.10}]
  ];
  function blobArt(seedIndex, palette) {
    var set = BLOB_SETS[((seedIndex % BLOB_SETS.length) + BLOB_SETS.length) % BLOB_SETS.length];
    var cols = palette || ['rgba(255,255,171,VAR)', 'rgba(235,252,245,VAR)', 'rgba(144,194,184,VAR)'];
    return set.map(function (b, i) {
      var pos = '';
      if (b.t != null) pos += 'top:' + (typeof b.t === 'number' ? b.t + '%' : b.t) + ';';
      if (b.b != null) pos += 'bottom:' + (typeof b.b === 'number' ? b.b + '%' : b.b) + ';';
      if (b.l != null) pos += 'left:' + (typeof b.l === 'number' ? b.l + '%' : b.l) + ';';
      if (b.r != null) pos += 'right:' + (typeof b.r === 'number' ? b.r + '%' : b.r) + ';';
      var col = cols[i % cols.length].replace('VAR', b.o);
      return '<span class="hc-blob" style="width:' + b.w + '%;height:' + b.h + '%;border-radius:' + b.br + ';background:' + col + ';' + pos + '"></span>';
    }).join('');
  }
  function centreIndex(id) { return CENTERS.findIndex(function (c) { return c.id === id; }); }

  function fmtCcy(code, n) {
    var f = fiatCcy(code);
    return f.symbol + Number(n).toLocaleString('en-US', { minimumFractionDigits: code === 'VND' ? 0 : 2, maximumFractionDigits: code === 'VND' ? 0 : 2 });
  }

  window.UNERA_DON = {
    blobArt: blobArt, centreIndex: centreIndex,
    CENTERS: CENTERS, BALANCES: BALANCES, PRICES: PRICES, GAS: GAS, HISTORY: HISTORY, SUMMARY: SUMMARY,
    STATES: STATES,
    /* FE-208 additions */
    HC_STATUS_LABEL: HC_STATUS_LABEL, PAUSED_COPY: PAUSED_COPY, PROGRAM_DIMENSION: PROGRAM_DIMENSION, categories: categories, cities: cities, visibleCentres: visibleCentres, setStatus: setStatus, hostOf: hostOf,
    SETTLEMENT: SETTLEMENT, FEES: FEES, processingFee: processingFee, conversionFee: conversionFee,
    FIAT: FIAT, fiatCcy: fiatCcy, fmtCcy: fmtCcy, uniswapQuote: uniswapQuote,
    HP_STATE: HP_STATE, hpChip: hpChip, ERR: ERR, MIN_USD: MIN_USD, MAX_USD: MAX_USD,
    getUserState: function () { return userState; }, setUserState: setUserState, onUserState: onUserState, is: is,
    renderStatePills: renderStatePills,
    fmtUSD: fmtUSD, fmtNum: fmtNum, shortAddr: shortAddr, shortHash: shortHash, fmtDate: fmtDate,
    getCentre: getCentre, qs: qs, esc: esc, statusChip: statusChip, notifyDonation: notifyDonation
  };
})();
