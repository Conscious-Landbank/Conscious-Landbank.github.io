/* Huma — Humanity Centers & Donation shared prototype data + user-state module.
   PRD: docs "Huma - Humanity Centers & Donation". Prototype-only; demo state is in-memory (never persisted). */
(function () {
  'use strict';
  var CENTERS = [
    { id: 'hc-nairobi', name: 'Kibera Community Center', country: 'Kenya', region: 'Africa', active: true,
      desc: 'Clean water access, primary education and school meals for families in Kibera, Nairobi.',
      programs: ['Clean Water Access', 'Primary Education', 'School Meals'],
      wallet: '0x8F3a41c29bD04c1a7E5590F21B4E6cD8a94A7B75', charityRegNo: 'KE-NGO-2021-04418',
      founded: 2018, image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80','https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80','https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80'],
      about: 'Kibera Community Center provides quality education, clean water access and daily school meals to more than 500 children in Africa\u2019s largest informal settlement. The center pairs classroom learning with family counselling and community-led water infrastructure, so progress made in school is backed up at home.',
      programsDetail: [
        { name: 'Clean Water Access', desc: 'Community water kiosks and household filters serving 1,200 families.', cost: '≈ $9 / month per family' },
        { name: 'Primary Education', desc: 'Classroom teaching, books and supplies for 540 enrolled children.', cost: '≈ $28 / month per child' },
        { name: 'School Meals', desc: 'A hot lunch every school day — attendance is up 22% since launch.', cost: '≈ $15 / month per child' }
      ],
      impactHints: [ { amount: 25, impact: 'Feeds 2 children for a week' }, { amount: 50, impact: 'School supplies for 5 children' }, { amount: 100, impact: 'Safe water for 3 families for a month' }, { amount: 250, impact: 'A teacher\u2019s monthly salary' } ],
      lead: "In Nairobi's Kibera settlement, a school place and a clean cup of water can change the whole arc of a child's life. Your gift funds classrooms, household water filters and a hot daily meal for more than 500 children — and keeps families together while the progress made at school is backed up at home.",
      story: { name: "Amina, age 9", text: "Amina used to miss a day of school each week queuing for water. A household filter and a daily lunch changed that — she now has full attendance and reads a grade above her age. Because of donors like you, her younger brother just enrolled too." },
      outcomes: [ { value: "94%", label: "daily attendance, up from 71%" }, { value: "1,200", label: "families with safe water" }, { value: "540", label: "children in full-time school" } ],
      testimonial: { quote: "My children eat, they learn, and they are safe. That is everything.", who: "Grace, parent and community water steward" },
      galleryCaptions: ["A community water kiosk serving Kibera households", "A primary classroom in session", "A hot school lunch, served every school day"],
      need: "Kibera is one of Africa's largest informal settlements. Many children miss school to queue for water, and a single illness can undo a year of hard-won progress.",
      fundUse: [ { label: "Classrooms, books & teachers", pct: 42 }, { label: "Clean-water infrastructure", pct: 30 }, { label: "Daily school meals", pct: 18 }, { label: "Admin & independent audit", pct: 10 } ],
      milestones: [ { year: "2018", text: "Center founded; the first 120 children enroll." }, { year: "2020", text: "Community water kiosks reach 1,200 families." }, { year: "2023", text: "Daily meals launch; attendance climbs to 94%." }, { year: "2025", text: "540 children are now in full-time school." } ],
      update: { date: "May 2026", text: "Two new household-filter distribution points opened, cutting average water-collection time in half." },
      galleryCaptions2: ["Children reading in the library corner", "A family counselling session", "The center kitchen preparing lunch"],
      totalDonatedUSD: 412580, livesImpacted: 12840, donorCount: 3120, tint: '#1e4e5a', initials: 'KC',
      stats: { day: 1240, week: 9180, month: 36420, year: 297500 } },
    { id: 'hc-manila', name: 'Tondo Youth Center', country: 'Philippines', region: 'Asia', active: true,
      desc: 'Vocational training, youth mentorship and disaster-relief readiness in Tondo, Manila.',
      programs: ['Vocational Training', 'Youth Mentorship', 'Disaster Relief'],
      wallet: '0x2B91e07dAcC34f8b1D6a8830fE29C551Aa10D4e2', charityRegNo: 'PH-SEC-CN-201903442',
      founded: 2016, image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80','https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80','https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80'],
      about: 'Tondo Youth Center helps young people in Manila\u2019s Tondo district move from precarious work into stable trades. Vocational workshops, one-to-one mentorship and typhoon-readiness training have reached more than 800 youth since 2016.',
      programsDetail: [
        { name: 'Vocational Training', desc: 'Carpentry, tailoring and digital-skills workshops with certified instructors.', cost: '≈ $35 / month per youth' },
        { name: 'Youth Mentorship', desc: 'One-to-one mentoring — 120 active mentor pairs across the district.', cost: '≈ $18 / month per youth' },
        { name: 'Disaster Relief', desc: 'Typhoon-readiness kits, drills and rapid-response supplies.', cost: '≈ $10 / month per family' }
      ],
      impactHints: [ { amount: 25, impact: 'Tool kit for 1 trainee' }, { amount: 50, impact: 'Skills training for 2 youth' }, { amount: 100, impact: 'A month of mentorship for 5 pairs' }, { amount: 250, impact: 'A full vocational course for 1 youth' } ],
      lead: "In Manila's Tondo district, a trade and a mentor can move a young person from day-to-day survival into steady work. Your gift funds certified workshops, one-to-one mentoring and typhoon-readiness for young people ready to build a different future — more than 800 have come through since 2016.",
      story: { name: "Mark, age 19", text: "Mark left school at 15 to scavenge alongside his family. He enrolled in the center's carpentry track, was paired with a mentor, and earned a national skills certificate within a year. He now apprentices at a furniture workshop and mentors two younger trainees himself. Your gift keeps that pipeline open." },
      outcomes: [ { value: "73%", label: "graduates in stable work or study" }, { value: "120", label: "active mentor pairs" }, { value: "800+", label: "youth reached since 2016" } ],
      testimonial: { quote: "I came here with nothing but time. I left with a trade and someone who believed in me.", who: "Mark, carpentry graduate and peer mentor" },
      galleryCaptions: ["A certified carpentry workshop in session", "A mentor and trainee reviewing a project", "A typhoon-readiness drill with local families"],
      need: "Tondo is one of Manila's most densely populated districts, where many young people leave school early to earn on the streets. Without a trade or a mentor, that first job is too often their last step up.",
      fundUse: [ { label: "Certified workshops & tools", pct: 45 }, { label: "One-to-one mentorship", pct: 27 }, { label: "Typhoon-readiness", pct: 16 }, { label: "Admin & independent audit", pct: 12 } ],
      milestones: [ { year: "2016", text: "Center opens with a single carpentry workshop and 40 trainees." }, { year: "2019", text: "Mentorship program launches; the first 100 graduates are certified." }, { year: "2022", text: "Typhoon-readiness added; the 800th young person enrolls." }, { year: "2025", text: "73% of graduates are now in stable work or further study." } ],
      update: { date: "June 2026", text: "A new welding bay opened this month, adding 24 training places and a fourth certified trade." },
      galleryCaptions2: ["Graduates at a certification ceremony", "The tool library trainees borrow from", "A finished piece from the furniture workshop"],
      totalDonatedUSD: 268340, livesImpacted: 8420, donorCount: 2210, tint: '#2e6374', initials: 'TY',
      stats: { day: 860, week: 5940, month: 24710, year: 201800 } },
    { id: 'hc-lapaz', name: 'El Alto Family Center', country: 'Bolivia', region: 'South America', active: true,
      desc: 'Family health services, childcare and nutrition programs serving El Alto, La Paz.',
      programs: ['Family Health', 'Childcare', 'Nutrition'],
      wallet: '0x6Cd20A18fE934B2a0C7719D45Fb08E63B21C99a4', charityRegNo: null,
      founded: 2019, image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80','https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80','https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80'],
      about: 'El Alto Family Center brings primary health services, licensed childcare and nutrition programs to families at 4,000 m in Bolivia\u2019s fastest-growing city. Mobile clinics reach neighbourhoods that have no permanent health post.',
      programsDetail: [
        { name: 'Family Health', desc: 'Mobile clinics offering checkups, vaccinations and referrals.', cost: '≈ $12 / month per family' },
        { name: 'Childcare', desc: 'Licensed day care so parents can work — 180 places.', cost: '≈ $20 / month per child' },
        { name: 'Nutrition', desc: 'Fortified meals and monthly growth monitoring for under-fives.', cost: '≈ $14 / month per child' }
      ],
      impactHints: [ { amount: 25, impact: 'Health checkups for 2 families' }, { amount: 50, impact: 'A week of day care for 3 children' }, { amount: 100, impact: 'A month of nutrition for 7 children' }, { amount: 250, impact: 'A full mobile-clinic day' } ],
      lead: "At 4,000 metres in Bolivia's fastest-growing city, many El Alto neighbourhoods have no permanent health post. Your gift puts mobile clinics on the road, licensed childcare within reach of working parents, and fortified meals in front of under-fives at the moment they need them most.",
      story: { name: "Lucia, mother of two", text: "Lucia skipped checkups because the nearest clinic was a two-hour round trip. When the mobile clinic reached her block, both her children were vaccinated and enrolled in growth monitoring; her youngest has since recovered from early malnutrition. Day care now lets her work without leaving them behind." },
      outcomes: [ { value: "180", label: "childcare places for working parents" }, { value: "3,400", label: "clinic visits a year" }, { value: "96%", label: "of under-fives on track for growth" } ],
      testimonial: { quote: "The clinic came to us. For the first time, my children see a doctor before they are sick.", who: "Lucia, El Alto resident" },
      galleryCaptions: ["A mobile clinic day in an El Alto neighbourhood", "Licensed childcare so parents can work", "Monthly growth monitoring for under-fives"],
      need: "El Alto sits at 4,000 metres and grows faster than its clinics can keep up. For many families, the nearest doctor is a two-hour round trip away.",
      fundUse: [ { label: "Mobile clinics & medicine", pct: 46 }, { label: "Licensed childcare", pct: 24 }, { label: "Nutrition & growth monitoring", pct: 20 }, { label: "Admin & independent audit", pct: 10 } ],
      milestones: [ { year: "2019", text: "Center opens; the first mobile-clinic route launches." }, { year: "2021", text: "Licensed day care opens with 180 places." }, { year: "2023", text: "Nutrition program reaches every under-five on the route." }, { year: "2025", text: "3,400 clinic visits delivered in a single year." } ],
      update: { date: "June 2026", text: "A second mobile clinic joined the fleet, adding three new neighbourhoods to the weekly route." },
      galleryCaptions2: ["A nurse checking a newborn", "Parents at a nutrition workshop", "The childcare play area"],
      totalDonatedUSD: 189220, livesImpacted: 5310, donorCount: 1480, tint: '#3d6b78', initials: 'EA',
      stats: { day: 410, week: 3260, month: 15980, year: 141200 } },
    { id: 'hc-colombo', name: 'Colombo Coastal Center', country: 'Sri Lanka', region: 'Asia', active: true,
      desc: 'Coastal livelihood support, fisheries training and flood response on the Colombo coast.',
      programs: ['Livelihood Support', 'Fisheries Training', 'Flood Response'],
      wallet: '0x91Ee5D0cB2A44a6f8C3D9761aE00B94Dd82F16c8', charityRegNo: 'LK-NGO-11-0842',
      founded: 2017, image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80','https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80','https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80'],
      about: 'Colombo Coastal Center supports fishing families on Sri Lanka\u2019s west coast with livelihood grants, sustainable-fisheries training and rapid flood response. After the 2024 floods the center helped rebuild 60 homes and restore 200 livelihoods.',
      programsDetail: [
        { name: 'Livelihood Support', desc: 'Micro-grants that keep fishing families working through lean seasons.', cost: '≈ $30 / month per family' },
        { name: 'Fisheries Training', desc: 'Sustainable-catch methods and boat-safety certification.', cost: '≈ $22 / month per trainee' },
        { name: 'Flood Response', desc: 'Early-warning network and pre-positioned relief stock.', cost: '≈ $8 / month per family' }
      ],
      impactHints: [ { amount: 25, impact: 'Repairs one fishing net' }, { amount: 50, impact: 'Safety gear for 2 boat crews' }, { amount: 100, impact: 'A livelihood grant instalment' }, { amount: 250, impact: 'Flood kits for 10 families' } ],
      lead: "On Sri Lanka's west coast, a single storm can wipe out a fishing family's livelihood overnight. Your gift funds micro-grants that keep boats working through lean seasons, sustainable-catch training, and an early-warning network that gets families to safety before the water rises.",
      story: { name: "Nuwan, fisherman", text: "After the 2024 floods, Nuwan lost his nets and half his season. A livelihood grant and new safety gear got him back on the water within weeks; he has since trained in sustainable methods that raised both his catch and his income. Sixty homes and 200 livelihoods were rebuilt alongside his." },
      outcomes: [ { value: "200", label: "livelihoods restored after the 2024 floods" }, { value: "60", label: "homes rebuilt" }, { value: "100%", label: "of boat crews safety-certified" } ],
      testimonial: { quote: "They did not just give us relief — they gave us our work back.", who: "Nuwan, fishing-cooperative member" },
      galleryCaptions: ["A fishing family back at work after a livelihood grant", "Boat-safety and sustainable-catch training", "Pre-positioned flood-relief supplies"],
      need: "On Sri Lanka's west coast, fishing families live one storm away from losing everything. When the 2024 floods hit, hundreds lost boats, nets and homes overnight.",
      fundUse: [ { label: "Livelihood micro-grants", pct: 40 }, { label: "Fisheries & safety training", pct: 26 }, { label: "Flood early-warning & relief", pct: 22 }, { label: "Admin & independent audit", pct: 12 } ],
      milestones: [ { year: "2017", text: "Center founded to support coastal fishing cooperatives." }, { year: "2020", text: "Boat-safety certification introduced." }, { year: "2024", text: "After the floods, 60 homes and 200 livelihoods rebuilt." }, { year: "2025", text: "Every partnered boat crew is now safety-certified." } ],
      update: { date: "April 2026", text: "A new early-warning siren network went live across three fishing villages ahead of monsoon season." },
      galleryCaptions2: ["New nets funded by micro-grants", "A safety-training classroom session", "Volunteers packing relief kits"],
      totalDonatedUSD: 152075, livesImpacted: 4160, donorCount: 1120, tint: '#4a7d84', initials: 'CC',
      stats: { day: 320, week: 2410, month: 11840, year: 108300 } },
    { id: 'hc-accra', name: 'Accra Learning Hub', country: 'Ghana', region: 'Africa', active: true,
      desc: 'Digital literacy, adult education and small-business skills in Accra.',
      programs: ['Digital Literacy', 'Adult Education', 'Small-Business Skills'],
      wallet: '0x3Fa8B92CdE1104D7b6E0a5C4832fF19a60B7D3e9', charityRegNo: 'GH-DSW-4471',
      founded: 2020, image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80','https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80','https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80'],
      about: 'Accra Learning Hub runs digital-literacy labs, adult evening classes and small-business clinics in central Accra. More than 400 graduates have moved into formal jobs or launched their own micro-enterprises.',
      programsDetail: [
        { name: 'Digital Literacy', desc: 'Computer labs with six-week foundational courses.', cost: '≈ $25 / month per learner' },
        { name: 'Adult Education', desc: 'Evening literacy and numeracy classes for working adults.', cost: '≈ $15 / month per learner' },
        { name: 'Small-Business Skills', desc: 'Bookkeeping, pricing and market-access clinics.', cost: '≈ $20 / month per trainee' }
      ],
      impactHints: [ { amount: 25, impact: 'Course materials for 2 learners' }, { amount: 50, impact: 'A month of lab time for 5 learners' }, { amount: 100, impact: 'An adult-education scholarship' }, { amount: 250, impact: 'A business starter kit' } ],
      lead: "In central Accra, a six-week course can be the difference between an informal hustle and a formal wage. Your gift funds computer labs, evening classes for working adults, and small-business clinics — more than 400 graduates have already moved into jobs or launched their own micro-enterprises.",
      story: { name: "Efua, age 27", text: "Efua ran a market stall with no way to track her money. She took the center's bookkeeping and digital-skills courses at night; within a year she had formalised her business, opened a second stall and hired her first employee. Your gift funds the next Efua's seat in the lab." },
      outcomes: [ { value: "400+", label: "graduates in jobs or self-employment" }, { value: "6 wks", label: "to a foundational digital certificate" }, { value: "68%", label: "of business-clinic alumni grew revenue" } ],
      testimonial: { quote: "I learned to read my own numbers. Now my business works for me.", who: "Efua, small-business clinic graduate" },
      galleryCaptions: ["A digital-literacy lab session", "An evening adult-education class", "A small-business clinic in progress"],
      need: "In Accra, thousands of adults run informal businesses with no records and no way to grow. A short course can be the difference between a daily hustle and a stable wage.",
      fundUse: [ { label: "Computer labs & courses", pct: 44 }, { label: "Adult evening classes", pct: 24 }, { label: "Small-business clinics", pct: 20 }, { label: "Admin & independent audit", pct: 12 } ],
      milestones: [ { year: "2020", text: "Learning hub opens with two computer labs." }, { year: "2022", text: "Evening adult-education classes launch." }, { year: "2024", text: "The 400th graduate moves into a formal job or business." }, { year: "2025", text: "68% of business-clinic alumni report higher revenue." } ],
      update: { date: "May 2026", text: "A new coding track launched this term, with 30 learners in its first cohort." },
      galleryCaptions2: ["A coding-track cohort at work", "A graduation ceremony", "A market stall run by an alumna"],
      totalDonatedUSD: 98410, livesImpacted: 2980, donorCount: 860, tint: '#56888c', initials: 'AL',
      stats: { day: 180, week: 1520, month: 7460, year: 74900 } },
    { id: 'hc-dhaka', name: 'Dhaka Health Outreach', country: 'Bangladesh', region: 'Asia', active: false,
      desc: 'Mobile clinics and maternal health outreach across greater Dhaka.',
      programs: ['Mobile Clinics', 'Maternal Health'],
      wallet: '0x7D42c81fA0B34E5a9C1D2276bE55A08Cd914F6b0', charityRegNo: 'BD-NGOAB-2688',
      founded: 2015, image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80','https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80'],
      about: 'Dhaka Health Outreach operates mobile clinics and maternal-health visits across greater Dhaka. The center is temporarily not accepting new donations; existing program commitments continue to be honoured.',
      programsDetail: [
        { name: 'Mobile Clinics', desc: 'Neighbourhood clinic days with a doctor, nurse and pharmacist.', cost: '≈ $11 / month per patient' },
        { name: 'Maternal Health', desc: 'Pre- and post-natal home visits by trained midwives.', cost: '≈ $16 / month per mother' }
      ],
      impactHints: [],
      lead: "Across greater Dhaka, Dhaka Health Outreach brings mobile clinics and maternal-health visits to neighbourhoods without a permanent health post. The center is temporarily not accepting new donations; existing program commitments continue to be honoured.",
      story: { name: "Shirin, new mother", text: "Shirin had no antenatal care until a center midwife began home visits on her lane. Regular checkups carried her through a safe delivery, and her newborn started life with a full immunisation record." },
      outcomes: [ { value: "9,640", label: "lives reached to date" }, { value: "2,540", label: "donors since 2015" }, { value: "Paused", label: "new donations on hold" } ],
      testimonial: { quote: "The midwife came to my home when I could not travel. My baby and I are healthy because of it.", who: "Shirin, Dhaka mother" },
      galleryCaptions: ["A neighbourhood mobile-clinic day", "A midwife on a maternal home visit", "An immunisation record for a newborn"],
      need: "Across greater Dhaka, many neighbourhoods have no permanent health post, and expectant mothers often reach care too late.",
      fundUse: [ { label: "Mobile clinics & medicine", pct: 52 }, { label: "Maternal home visits", pct: 30 }, { label: "Admin & independent audit", pct: 18 } ],
      milestones: [ { year: "2015", text: "Center founded; the first mobile-clinic route launches." }, { year: "2019", text: "Maternal home-visit program reaches 2,000 mothers." }, { year: "2023", text: "9,600+ lives reached across greater Dhaka." }, { year: "2026", text: "New donations paused during an independent review." } ],
      update: { date: "Notice", text: "This center is not accepting new donations right now. Existing program commitments continue to be honoured." },
      galleryCaptions2: ["A clinic queue on a visit day", "Medicines packed for the route", "A maternal-health information session"],
      totalDonatedUSD: 321660, livesImpacted: 9640, donorCount: 2540, tint: '#6a5770', initials: 'DH',
      stats: { day: 0, week: 0, month: 8120, year: 187400 } },
    { id: 'hc-jakarta', name: "Jakarta Coastal Resilience Center", country: "Indonesia", region: "Asia", active: true,
      desc: "Flood defence, clean water and fishing livelihoods for coastal families in North Jakarta.",
      programs: ["Flood Defence","Clean Water","Livelihood Support"],
      wallet: '0x1aF4c7B2E90d35A6c8194Db772f0E4519Ac3b6D1', charityRegNo: 'ID-KEMENKUM-2019-8841', founded: 2019, image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      gallery: ["https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80","https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80","https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80"],
      about: "Jakarta Coastal Resilience Center helps families in North Jakarta live with rising water. The center builds community flood defences, restores clean-water access and helps fishing households diversify their income before the next tidal flood arrives.",
      programsDetail: [{"name":"Flood Defence","desc":"Community barriers, pumps and an early-warning network for 900 households.","cost":"≈ $12 / month per household"},{"name":"Clean Water","desc":"Rainwater harvesting and filters where the mains supply has failed.","cost":"≈ $10 / month per family"},{"name":"Livelihood Support","desc":"Grants and training to diversify income beyond fishing.","cost":"≈ $28 / month per family"}],
      impactHints: [{"amount":25,"impact":"Sandbags for one home"},{"amount":50,"impact":"A household water filter"},{"amount":100,"impact":"A month of pump fuel for a block"},{"amount":250,"impact":"A livelihood grant instalment"}],
      lead: "In North Jakarta, the sea reaches the doorstep a little sooner every year. Your gift funds flood barriers, clean water and new ways to earn — so families can stay in the homes they have built.",
      story: {"name":"Sari, mother of three","text":"Sari's home flooded four times last year. A community barrier and a raised water tank kept her family dry through the last high tide, and a small grant let her start a food stall on days the boats can't go out."},
      outcomes: [{"value":"900","label":"households behind flood defences"},{"value":"70%","label":"fewer flood-damage claims on the block"},{"value":"240","label":"families with a second income"}],
      testimonial: {"quote":"The water still comes, but now we are ready for it. We are not starting from zero every time.","who":"Sari, North Jakarta resident"},
      galleryCaptions: ["A community flood barrier at high tide","A rainwater-harvesting tank","A family food stall funded by a grant"],
      galleryCaptions2: ["Volunteers testing the early-warning siren","A household water filter in use","Training on income diversification"],
      need: "North Jakarta is sinking while the sea rises, and tidal floods can arrive with little warning. For families who fish, one bad flood can wipe out both home and income.",
      fundUse: [{"label":"Flood defence & pumps","pct":42},{"label":"Clean-water access","pct":26},{"label":"Livelihood grants","pct":20},{"label":"Admin & independent audit","pct":12}],
      milestones: [{"year":"2019","text":"Center opens; first community flood barrier built."},{"year":"2021","text":"Early-warning siren network goes live."},{"year":"2023","text":"Clean-water program reaches 600 families."},{"year":"2025","text":"Flood-damage claims on protected blocks fall 70%."}],
      update: {"date":"June 2026","text":"A new tidal-gauge sensor now feeds the early-warning network, giving families up to two extra hours to prepare."},
      totalDonatedUSD: 174300, livesImpacted: 6120, donorCount: 1580, tint: '#2b5f6b', initials: 'JC',
      stats: {"day":520,"week":3980,"month":16240,"year":132400} },
    { id: 'hc-kampala', name: "Kampala Girls' Education Center", country: "Uganda", region: "Africa", active: true,
      desc: "Scholarships, mentorship and health support keeping girls in school in Kampala.",
      programs: ["Scholarships","Mentorship","Health & Wellbeing"],
      wallet: '0x9C2eB47a10Df58316b0A7c4491Ee2350aB84F7c9', charityRegNo: 'UG-NGO-2017-3092', founded: 2017, image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      gallery: ["https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80","https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80","https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80"],
      about: "Kampala Girls' Education Center keeps girls in the classroom through the years they are most likely to drop out. Scholarships, one-to-one mentors and school health support help students finish secondary school and plan what comes next.",
      programsDetail: [{"name":"Scholarships","desc":"School fees, uniforms and books for 320 girls.","cost":"≈ $26 / month per student"},{"name":"Mentorship","desc":"Weekly mentoring and study groups led by local women.","cost":"≈ $15 / month per student"},{"name":"Health & Wellbeing","desc":"School nurse, counselling and health education.","cost":"≈ $11 / month per student"}],
      impactHints: [{"amount":25,"impact":"Books for one student"},{"amount":50,"impact":"A term of uniforms for two girls"},{"amount":100,"impact":"A month of mentoring for a study group"},{"amount":250,"impact":"A full-year scholarship"}],
      lead: "In Kampala, a girl who stays in school past 14 changes the course of her whole life. Your gift funds the scholarships, mentors and health support that keep her there.",
      story: {"name":"Aisha, age 16","text":"Aisha was about to leave school to help at home when a scholarship and a mentor stepped in. She is now top of her science class and wants to train as a nurse — and she mentors two younger girls on her street."},
      outcomes: [{"value":"91%","label":"of scholars finish secondary school"},{"value":"320","label":"girls on scholarship"},{"value":"85","label":"local women mentors"}],
      testimonial: {"quote":"My mentor showed me that finishing school was possible. Now I show other girls the same thing.","who":"Aisha, scholarship student"},
      galleryCaptions: ["A study group led by a mentor","Students in a science lesson","The school health corner"],
      galleryCaptions2: ["A scholarship-fund uniform handover","A one-to-one mentoring session","A graduation celebration"],
      need: "In many Kampala neighbourhoods, girls are the first to be pulled from school when money is tight. Each year out of the classroom makes returning far less likely.",
      fundUse: [{"label":"Scholarships & school costs","pct":48},{"label":"Mentorship program","pct":24},{"label":"Health & counselling","pct":16},{"label":"Admin & independent audit","pct":12}],
      milestones: [{"year":"2017","text":"Center opens with 60 scholarships."},{"year":"2020","text":"Peer-mentorship network launches."},{"year":"2023","text":"School health corner opens with a full-time nurse."},{"year":"2025","text":"91% of scholars now complete secondary school."}],
      update: {"date":"May 2026","text":"A new careers program paired 40 senior students with women working in medicine, law and engineering."},
      totalDonatedUSD: 206540, livesImpacted: 4300, donorCount: 1890, tint: '#3a6152', initials: 'KG',
      stats: {"day":640,"week":4820,"month":19800,"year":158600} },
    { id: 'hc-amman', name: "Amman Refuge Support Center", country: "Jordan", region: "Middle East", active: true,
      desc: "Skills training, childcare and health support for refugee families in Amman.",
      programs: ["Skills Training","Childcare","Health Support"],
      wallet: '0x4Dd18A2fC703b95E6a41c88072Bf0913Ae5C21b7', charityRegNo: 'JO-MOSD-2018-1174', founded: 2018, image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      gallery: ["https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80","https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80","https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80"],
      about: "Amman Refuge Support Center helps refugee families rebuild a footing in a new city. Language and vocational classes, safe childcare and primary health support give parents the room to find work and children the stability to keep learning.",
      programsDetail: [{"name":"Skills Training","desc":"Language, digital and trade classes with job placement support.","cost":"≈ $30 / month per adult"},{"name":"Childcare","desc":"Safe day care so parents can attend classes and work.","cost":"≈ $20 / month per child"},{"name":"Health Support","desc":"Primary care, vaccinations and mental-health counselling.","cost":"≈ $13 / month per person"}],
      impactHints: [{"amount":25,"impact":"A week of childcare for one child"},{"amount":50,"impact":"Language materials for two learners"},{"amount":100,"impact":"A month of trade training"},{"amount":250,"impact":"A full job-placement course"}],
      lead: "For a family starting over in Amman, a new language and a safe place for the children can be the whole difference. Your gift funds the classes, childcare and care that make a fresh start possible.",
      story: {"name":"Omar, father of two","text":"Omar arrived in Amman unable to work in his trade. Evening classes rebuilt his Arabic and certified his skills, while day care kept his children safe and learning. He now works full-time and volunteers as a class translator."},
      outcomes: [{"value":"64%","label":"of trainees find work within six months"},{"value":"210","label":"childcare places"},{"value":"5,100","label":"health visits a year"}],
      testimonial: {"quote":"They gave my children somewhere safe and gave me back my trade. That is dignity.","who":"Omar, center graduate and volunteer"},
      galleryCaptions: ["A language class in session","The center childcare room","A primary-health consultation"],
      galleryCaptions2: ["A trade-skills workshop","A job-placement advice session","A family collecting health supplies"],
      need: "Refugee families in Amman often arrive with skills they cannot yet use, and no safe place to leave their children while they rebuild. Without support, months of potential are lost.",
      fundUse: [{"label":"Skills & language training","pct":40},{"label":"Childcare","pct":26},{"label":"Health & counselling","pct":22},{"label":"Admin & independent audit","pct":12}],
      milestones: [{"year":"2018","text":"Center opens with language and childcare services."},{"year":"2020","text":"Vocational trades and job placement added."},{"year":"2023","text":"Mental-health counselling introduced."},{"year":"2025","text":"64% of trainees now find work within six months."}],
      update: {"date":"April 2026","text":"A new employer partnership opened 30 apprenticeships in hospitality and construction."},
      totalDonatedUSD: 238900, livesImpacted: 7480, donorCount: 2110, tint: '#5a5570', initials: 'AR',
      stats: {"day":710,"week":5240,"month":21600,"year":171200} },
    { id: 'hc-lima', name: "Lima Highland Health Center", country: "Peru", region: "South America", active: true,
      desc: "Maternal care, nutrition and mobile clinics for highland families around Lima.",
      programs: ["Maternal Care","Nutrition","Mobile Clinics"],
      wallet: '0x7Bc90E2a41Df6538a0C7194bB2f8043Ae61C95d3', charityRegNo: 'PE-SUNARP-2020-4471', founded: 2020, image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      gallery: ["https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80","https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80","https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80"],
      about: "Lima Highland Health Center brings maternal care, child nutrition and mobile clinics to families on the steep, under-served edges of the city. Trained health workers reach homes that sit hours from the nearest permanent clinic.",
      programsDetail: [{"name":"Maternal Care","desc":"Antenatal checkups and safe-delivery support for expectant mothers.","cost":"≈ $16 / month per mother"},{"name":"Nutrition","desc":"Fortified meals and growth monitoring for under-fives.","cost":"≈ $14 / month per child"},{"name":"Mobile Clinics","desc":"Weekly clinic days with a doctor, nurse and pharmacist.","cost":"≈ $12 / month per patient"}],
      impactHints: [{"amount":25,"impact":"A month of nutrition for one child"},{"amount":50,"impact":"Antenatal care for a mother"},{"amount":100,"impact":"A mobile-clinic half-day"},{"amount":250,"impact":"A full clinic day for a hillside"}],
      lead: "On Lima's steep outer hills, the nearest doctor can be hours away — too far for a mother in labour or a sick child. Your gift puts trained health workers on those hills every week.",
      story: {"name":"Rosa, new mother","text":"Rosa lives an hour's climb from the nearest clinic. A community health worker visited through her whole pregnancy, and the mobile clinic was there for a safe delivery. Her daughter is healthy and fully immunised."},
      outcomes: [{"value":"98%","label":"of tracked pregnancies safely delivered"},{"value":"2,900","label":"clinic visits a year"},{"value":"94%","label":"of under-fives on track for growth"}],
      testimonial: {"quote":"The clinic climbed the hill to reach me. My daughter is alive because it did.","who":"Rosa, highland resident"},
      galleryCaptions: ["A mobile clinic on a hillside","A maternal home visit","Growth monitoring for a toddler"],
      galleryCaptions2: ["A nutrition food-pack handover","A community health worker on her rounds","A vaccination session"],
      need: "Families on Lima's highland fringes live hours from permanent health services. For expectant mothers and small children, that distance can be dangerous.",
      fundUse: [{"label":"Mobile clinics & medicine","pct":44},{"label":"Maternal care","pct":26},{"label":"Nutrition","pct":18},{"label":"Admin & independent audit","pct":12}],
      milestones: [{"year":"2020","text":"Center opens; first mobile-clinic route launches."},{"year":"2022","text":"Maternal home-visit program begins."},{"year":"2024","text":"Nutrition program reaches every under-five on the route."},{"year":"2025","text":"98% of tracked pregnancies safely delivered."}],
      update: {"date":"May 2026","text":"A second health worker joined the team, adding two more hillside neighbourhoods to the weekly route."},
      totalDonatedUSD: 143700, livesImpacted: 3960, donorCount: 1240, tint: '#4a6b78', initials: 'LH',
      stats: {"day":380,"week":2960,"month":13400,"year":118600} },
    { id: 'hc-hanoi', name: "Hanoi Digital Futures Center", country: "Vietnam", region: "Asia", active: true,
      desc: "Coding, digital skills and micro-business support for young people in Hanoi.",
      programs: ["Coding & Digital Skills","Vocational Training","Micro-Business"],
      wallet: '0x2eA7c81fB0439D5568a0C7194Bb2f0913Ac54E6d', charityRegNo: 'VN-DKKD-2021-6620', founded: 2021, image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      gallery: ["https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80","https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80","https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80"],
      about: "Hanoi Digital Futures Center helps young people turn digital skills into steady income. Structured coding tracks, practical vocational courses and micro-business support open doors that a traditional CV alone often cannot.",
      programsDetail: [{"name":"Coding & Digital Skills","desc":"Structured tracks from foundations to job-ready portfolios.","cost":"≈ $28 / month per learner"},{"name":"Vocational Training","desc":"Practical courses in design, e-commerce and IT support.","cost":"≈ $22 / month per learner"},{"name":"Micro-Business","desc":"Seed grants and coaching for online micro-enterprises.","cost":"≈ $20 / month per founder"}],
      impactHints: [{"amount":25,"impact":"A month of lab time for one learner"},{"amount":50,"impact":"Course materials for two students"},{"amount":100,"impact":"A coding scholarship instalment"},{"amount":250,"impact":"A micro-business seed grant"}],
      lead: "In Hanoi, a young person with the right digital skills can leapfrog into stable, well-paid work. Your gift funds the labs, courses and seed grants that make that leap possible.",
      story: {"name":"Linh, age 21","text":"Linh taught herself the basics on a borrowed phone. A place in the coding track gave her structure, a mentor and a real portfolio; she now works remotely as a junior developer and runs a small design side-business."},
      outcomes: [{"value":"70%","label":"of graduates in tech or digital work"},{"value":"12 wks","label":"to a job-ready portfolio"},{"value":"140","label":"micro-businesses launched"}],
      testimonial: {"quote":"I started on a borrowed phone. Now I write code for clients in three countries.","who":"Linh, coding-track graduate"},
      galleryCaptions: ["A coding-track cohort at work","A vocational design class","A micro-business owner shipping orders"],
      galleryCaptions2: ["A mentor reviewing a portfolio","A demo-day pitch session","The center computer lab"],
      need: "Many talented young people in Hanoi lack the structure, hardware and networks to turn raw interest in tech into a real career.",
      fundUse: [{"label":"Labs, hardware & courses","pct":46},{"label":"Vocational training","pct":22},{"label":"Micro-business seed grants","pct":20},{"label":"Admin & independent audit","pct":12}],
      milestones: [{"year":"2021","text":"Center opens with two computer labs."},{"year":"2023","text":"Structured coding tracks and mentoring launch."},{"year":"2024","text":"Micro-business seed-grant program begins."},{"year":"2025","text":"70% of graduates now work in tech or digital roles."}],
      update: {"date":"June 2026","text":"A new AI-literacy module joined the curriculum, with 45 learners in its first cohort."},
      totalDonatedUSD: 118200, livesImpacted: 2740, donorCount: 960, tint: '#3d6b6b', initials: 'HD',
      stats: {"day":300,"week":2380,"month":10900,"year":96400} },
    { id: 'hc-capetown', name: "Cape Town Early Years Center", country: "South Africa", region: "Africa", active: true,
      desc: "Early-childhood education, nutrition and family support in Cape Town.",
      programs: ["Early Education","Nutrition","Family Support"],
      wallet: '0x8Fa2c71bE0439D5568a0C7194Bb2f0913Ae61C95', charityRegNo: 'ZA-NPO-2016-2288', founded: 2016, image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      gallery: ["https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80","https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80","https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80"],
      about: "Cape Town Early Years Center gives children the strongest possible start before school begins. Play-based early education, daily nutrition and family support build the foundations that shape a child’s whole education.",
      programsDetail: [{"name":"Early Education","desc":"Play-based learning and school-readiness for 240 under-sixes.","cost":"≈ $24 / month per child"},{"name":"Nutrition","desc":"Two nutritious meals every day and growth monitoring.","cost":"≈ $15 / month per child"},{"name":"Family Support","desc":"Parenting workshops and social-work referrals.","cost":"≈ $12 / month per family"}],
      impactHints: [{"amount":25,"impact":"A week of meals for two children"},{"amount":50,"impact":"Learning materials for a classroom"},{"amount":100,"impact":"A month of early education for a child"},{"amount":250,"impact":"A full term for one child"}],
      lead: "The years before school decide how far a child can go. Your gift funds the early learning, daily meals and family support that give Cape Town's youngest children a fair start.",
      story: {"name":"Thandi, age 5","text":"Thandi arrived quiet and behind her peers. Two years of play-based learning and two meals a day changed that — she starts primary school this year reading simple words and bursting with questions."},
      outcomes: [{"value":"240","label":"children in early education"},{"value":"96%","label":"assessed school-ready"},{"value":"2","label":"nutritious meals a day per child"}],
      testimonial: {"quote":"My daughter starts school ready and confident. I never had that start myself.","who":"Nomsa, parent"},
      galleryCaptions: ["A play-based learning session","The center mealtime","A parenting workshop"],
      galleryCaptions2: ["A school-readiness assessment","The outdoor play area","A story-time circle"],
      need: "In under-resourced Cape Town neighbourhoods, many children reach school already behind, without the early learning and nutrition that shape their first years.",
      fundUse: [{"label":"Early education & staff","pct":44},{"label":"Daily nutrition","pct":26},{"label":"Family support","pct":18},{"label":"Admin & independent audit","pct":12}],
      milestones: [{"year":"2016","text":"Center opens with one early-learning classroom."},{"year":"2019","text":"Daily meals program launches."},{"year":"2022","text":"Family-support and parenting workshops added."},{"year":"2025","text":"96% of children now assessed school-ready."}],
      update: {"date":"May 2026","text":"A new outdoor learning garden opened, giving children hands-on lessons in growing food."},
      totalDonatedUSD: 161900, livesImpacted: 3480, donorCount: 1360, tint: '#556b3a', initials: 'CE',
      stats: {"day":430,"week":3320,"month":14900,"year":126800} }
  ];

  /* ── FE-208 §7.1 data-model alignment — status enum, city, category, slug ──
     The HC spec (pageId 88768526 §7.1) defines status as active | suspended | inactive | deactivated,
     plus optional city and category. The prototype seed carried only a boolean, so normalise here
     rather than restating every field on 13 records. */
  var HC_META = {
    'hc-nairobi':  { city: 'Nairobi',   category: 'Education',      status: 'active' },
    'hc-manila':   { city: 'Manila',    category: 'Livelihoods',    status: 'active' },
    'hc-lapaz':    { city: 'El Alto',   category: 'Healthcare',     status: 'active' },
    'hc-colombo':  { city: 'Colombo',   category: 'Livelihoods',    status: 'active' },
    'hc-accra':    { city: 'Accra',     category: 'Education',      status: 'active' },
    'hc-dhaka':    { city: 'Dhaka',     category: 'Healthcare',     status: 'suspended' },
    'hc-jakarta':  { city: 'Jakarta',   category: 'Climate resilience', status: 'active' },
    'hc-kampala':  { city: 'Kampala',   category: 'Education',      status: 'active' },
    'hc-amman':    { city: 'Amman',     category: 'Refugee support', status: 'active' },
    'hc-lima':     { city: 'Lima',      category: 'Healthcare',     status: 'active' },
    /* HC-DIR-02 / AC-HC-04 — lives impacted is nullable; this centre proves the "Coming soon" fallback. */
    'hc-hanoi':    { city: 'Hanoi',     category: 'Education',      status: 'active', livesImpacted: null },
    'hc-capetown': { city: 'Cape Town', category: 'Food security',  status: 'active' }
  };
  CENTERS.forEach(function (c) {
    var m = HC_META[c.id] || {};
    c.city = m.city || '';
    c.category = m.category || 'Community';
    c.status = m.status || (c.active ? 'active' : 'suspended');
    c.active = c.status === 'active';
    c.slug = c.id.replace(/^hc-/, '');
    if (Object.prototype.hasOwnProperty.call(m, 'livesImpacted')) c.livesImpacted = m.livesImpacted;
    c.location = c.city ? c.city + ', ' + c.country : c.country;
  });
  var HC_STATUS_LABEL = { active: 'Active', suspended: 'Suspended', inactive: 'Inactive', deactivated: 'Closed' };
  function categories() {
    return Array.from(new Set(CENTERS.filter(function (c) { return c.active; }).map(function (c) { return c.category; }))).sort();
  }

  /* ── Settlement configuration (Donation spec §1.7 + §7.3) ──
     Fiat settles to the Payment Rail's defined ACCOUNT (never converted to crypto).
     USDC/USDT settle DIRECTLY to the defined multisig wallet.
     BTC/ETH are converted to USDC or USDT by the Crypto Swap Worker, then routed to the same multisig. */
  var SETTLEMENT = {
    multisig: '0x5C1fD8a72E90B4d3617ac0951Ee27fB4a83D6019',
    multisigLabel: 'Humanity Center multisig wallet',
    fiatAccountLabel: 'Payment Rail settlement account',
    network: 'Ethereum',            /* OQ-03 — approved network list TBD */
    explorer: 'https://sepolia.etherscan.io/tx/'
  };

  /* Minimal donatable balance context — owned by Wallet Service (cached; see wallet-enhanced.html for full portfolio).
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
     The spec mandates the fee but sets no rate. These are PROTOTYPE placeholders — TBD Finance.
     Processing fee is always applied ON TOP: total charged = donation amount + processing fee. */
  var FEES = {
    note: 'Prototype rates — final schedule TBD with Finance / Payment Rail.',
    fiatPct: 0.029, fiatFixed: 0.30,   /* card rail */
    cryptoPct: 0.010,                   /* platform processing fee on crypto donations */
    conversionPct: 0.003                /* Crypto Swap Worker route fee, convertible assets only */
  };
  function processingFee(source, usd) {
    if (source === 'fiat') return Math.round((usd * FEES.fiatPct + FEES.fiatFixed) * 100) / 100;
    return Math.round(usd * FEES.cryptoPct * 100) / 100;
  }
  function conversionFee(usd) { return Math.round(usd * FEES.conversionPct * 100) / 100; }

  /* ── Fiat currencies (DON-FIAT-04). OQ-02 — MVP currency list TBD. ── */
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
    { id: 'don-90412', hcId: 'hc-nairobi', source: 'crypto', status: 'completed', amount: 250, currency: 'USDC', amountUSD: 250.03,
      rate: 1.0001, fee: 2.50, conversionFee: 0, totalCharged: 252.53, settlementAsset: 'USDC', settlementAmount: 250.00,
      destination: 'multisig', txHash: '0x9b71f04c8a2e51d6b3a8f27c90e14d5a6b82c3f1a0d97e6541bc28d3f7a1904c', createdAt: iso(3, 14),
      receipt: 'available', receiptNo: 'UN-2026-004182', uyt: { amount: 12.5, status: 'confirmed' } },
    { id: 'don-90371', hcId: 'hc-manila', source: 'fiat', status: 'completed', amount: 500, currency: 'USD', amountUSD: 500,
      rate: 1, fee: 14.80, conversionFee: 0, totalCharged: 514.80, settlementAsset: 'USD_FIAT', settlementAmount: 500,
      destination: 'fiat_account', txHash: null, createdAt: iso(11, 10),
      receipt: 'available', receiptNo: 'UN-2026-003967', uyt: { amount: 25.0, status: 'confirmed' } },
    { id: 'don-90224', hcId: 'hc-nairobi', source: 'crypto', status: 'awaiting_confirmation', amount: 0.05, currency: 'ETH', amountUSD: 156.02,
      rate: 3120.4, fee: 1.56, conversionFee: 0.47, totalCharged: 157.58, settlementAsset: 'USDC', settlementAmount: null,
      destination: 'multisig', txHash: '0x4c81ab90de23f761c8a05b1e94d2c7f30a6b85d19e2f4c07b3a68d51c2e09af0', createdAt: iso(0.04),
      receipt: 'pending', receiptNo: null, uyt: { amount: 7.8, status: 'pending' } },
    /* DON-CRYPTO-07 — conversion pending: submitted and confirmed on-chain, Swap Worker still converting. */
    { id: 'don-90188', hcId: 'hc-jakarta', source: 'crypto', status: 'conversion_pending', amount: 0.0035, currency: 'BTC', amountUSD: 215.18,
      rate: 61480, fee: 2.15, conversionFee: 0.65, totalCharged: 217.33, settlementAsset: 'USDT', settlementAmount: null,
      destination: 'multisig', txHash: '0x2f60c9a4b7138e05dc71a9f4382b06de5417ca8039fb26d7150e94c3a6b820f5', createdAt: iso(0.2),
      receipt: 'pending', receiptNo: null, uyt: { amount: 10.7, status: 'estimated' } },
    /* DON-FIAT-04 — non-USD fiat: original currency + amount + rate preserved, USD is canonical. */
    { id: 'don-90055', hcId: 'hc-kampala', source: 'fiat', status: 'completed', amount: 180, currency: 'EUR', amountUSD: 195.12,
      rate: 1.084, fee: 5.96, conversionFee: 0, totalCharged: 185.50, settlementAsset: 'USD_FIAT', settlementAmount: 195.12,
      destination: 'fiat_account', txHash: null, createdAt: iso(21, 15),
      receipt: 'available', receiptNo: 'UN-2026-004071', uyt: { amount: 9.7, status: 'confirmed' } },
    { id: 'don-89960', hcId: 'hc-lapaz', source: 'fiat', status: 'completed', amount: 120, currency: 'USD', amountUSD: 120,
      rate: 1, fee: 3.78, conversionFee: 0, totalCharged: 123.78, settlementAsset: 'USD_FIAT', settlementAmount: 120,
      destination: 'fiat_account', txHash: null, createdAt: iso(34, 16),
      receipt: 'available', receiptNo: 'UN-2026-002851', uyt: { amount: 6.0, status: 'confirmed' } },
    { id: 'don-89712', hcId: 'hc-colombo', source: 'crypto', status: 'completed', amount: 264, currency: 'USDT', amountUSD: 263.95,
      rate: 0.9998, fee: 2.64, conversionFee: 0, totalCharged: 266.59, settlementAsset: 'USDT', settlementAmount: 264,
      destination: 'multisig', txHash: '0x7a3fe8c210b94d67a1f05c3e82d96b40c7a2e15f90d84b672c3a01e59f6d2b9c', createdAt: iso(58, 9),
      receipt: 'unavailable', receiptNo: null, uyt: { amount: 13.2, status: 'confirmed' } },
    { id: 'don-89544', hcId: 'hc-accra', source: 'fiat', status: 'failed', amount: 75, currency: 'USD', amountUSD: 0,
      rate: 1, fee: 0, conversionFee: 0, totalCharged: 0, settlementAsset: 'USD_FIAT', settlementAmount: null,
      destination: 'fiat_account', txHash: null, createdAt: iso(71, 11),
      receipt: 'unavailable', receiptNo: null, uyt: null }
  ];

  var SUMMARY = { totalDonatedUSD: 1485.15, livesImpacted: 46, uytConfirmed: 74.2, uytPending: 7.8, uytEstimated: 10.7, receipts: 5 };

  /* ── Huma Points reward state (§7.1.4 / DON-HP-02) — display only, never calculated in FE. ── */
  var HP_STATE = {
    estimated: { label: 'Estimated', note: 'Estimated by the Huma Points service — confirmed after settlement.' },
    pending:   { label: 'Pending',   note: 'Awaiting confirmation from the Huma Points service.' },
    confirmed: { label: 'Confirmed', note: 'Confirmed by the Huma Points service.' },
    failed:    { label: 'Not awarded', note: 'No Huma Points were awarded for this donation.' },
    unavailable: { label: 'Unavailable', note: 'Huma Points state is unavailable right now.' }
  };
  function hpChip(status) {
    var m = HP_STATE[status] || HP_STATE.unavailable;
    return '<span class="uyt-pill" title="' + esc(m.note) + '">' + esc(m.label) + '</span>';
  }

  /* ── §6.3 error copy — VERBATIM from the Donation spec. Single source of truth for every surface. ── */
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

  /* ── Demo user-state module — IN-MEMORY ONLY (resets on reload; PRD §2 access rules) ── */
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
  /* Donation lifecycle notification (PRD §4.3.1) → shared bell feed */
  function notifyDonation(level, title, message, ref, ctaUrl, ctaLabel) {
    if (typeof window.addNotification === 'function') {
      window.addNotification({ level: level, category: 'donation', title: title, message: message, ref: ref, ctaUrl: ctaUrl || 'donation-history.html', ctaLabel: ctaLabel || 'View donation' });
    }
  }

  /* Brand graphic-device artwork (organic blobs) — the DS illustration language; no figurative photos.
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
    HC_STATUS_LABEL: HC_STATUS_LABEL, categories: categories,
    SETTLEMENT: SETTLEMENT, FEES: FEES, processingFee: processingFee, conversionFee: conversionFee,
    FIAT: FIAT, fiatCcy: fiatCcy, fmtCcy: fmtCcy, uniswapQuote: uniswapQuote,
    HP_STATE: HP_STATE, hpChip: hpChip, ERR: ERR, MIN_USD: MIN_USD, MAX_USD: MAX_USD,
    getUserState: function () { return userState; }, setUserState: setUserState, onUserState: onUserState, is: is,
    renderStatePills: renderStatePills,
    fmtUSD: fmtUSD, fmtNum: fmtNum, shortAddr: shortAddr, shortHash: shortHash, fmtDate: fmtDate,
    getCentre: getCentre, qs: qs, esc: esc, statusChip: statusChip, notifyDonation: notifyDonation
  };
})();
