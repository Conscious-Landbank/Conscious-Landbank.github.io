# UNERA Mobile App — Comprehensive Product & Design Plan

> **Product**: UNERA — "One Flow. Many Lives." A social-purpose stablecoin wallet that channels yield into Humanity Centres worldwide.
> **Scope**: Native mobile app for iOS and Android — full feature parity with the existing 55-screen web app, plus mobile-native enhancements.
> **Approach**: React Native + Expo (single codebase, iOS + Android); all web design tokens, copy, and flows reused directly.

---

## Table of Contents

1. [Product Vision for Mobile](#1-product-vision-for-mobile)
2. [Competitive Research & Inspiration](#2-competitive-research--inspiration)
3. [Navigation Architecture](#3-navigation-architecture)
4. [Screen Inventory — All 55 Web Pages Mapped to Mobile](#4-screen-inventory--all-55-web-pages-mapped-to-mobile)
5. [Feature Prioritization — MVP vs Phase 2](#5-feature-prioritization--mvp-vs-phase-2)
6. [User Flows — Key Journeys](#6-user-flows--key-journeys)
7. [Design System Adaptation — Web to Mobile](#7-design-system-adaptation--web-to-mobile)
8. [Platform-Specific Considerations](#8-platform-specific-considerations)
9. [Reuse Strategy](#9-reuse-strategy)
10. [Recommended Tech Stack](#10-recommended-tech-stack)
11. [Project Structure](#11-project-structure)
12. [Accessibility Standards](#12-accessibility-standards)
13. [Performance & Offline Strategy](#13-performance--offline-strategy)
14. [App Store Considerations](#14-app-store-considerations)

---

## 1. Product Vision for Mobile

### What UNERA Mobile Is

UNERA is a **social-purpose stablecoin wallet** — users hold stablecoins, generate yield, and that yield is channeled perpetually into physical/virtual Humanity Centres (community support hubs in cities like Toronto, Nairobi, and Mumbai). The product sits at the intersection of:

- **Fintech wallet** — hold, send, receive, exchange, add money, withdraw
- **Crypto platform** — stablecoin management, token exchange, staking, proof of reserve
- **Social impact** — Humanity Centre donations, impact tracking, community belonging

### Why Mobile Changes Everything

The web app is a comprehensive financial tool. Mobile transforms it into an **always-on, ambient financial companion**:

| Web Capability | Mobile Enhancement |
|---|---|
| Browser-based auth | Face ID / Touch ID biometric login — 1-tap entry |
| Copy/paste wallet addresses | QR code scanning for receive/send |
| Click-to-donate | Quick-donate from notification ("Centre X needs funding") |
| Manually check balance | Home screen widget showing live balance |
| Desktop notifications | Push notifications — real-time transaction alerts |
| No offline access | Cached balance view when offline |
| Long KYC flow | Camera-native document scan (OCR auto-fill) |
| Web share | Native iOS share sheet / Android share intent |
| Form-based send | Contacts integration for P2P sending |

### Core Mobile Value Props

1. **Instant access** — biometric unlock, balance visible in < 2 seconds
2. **Frictionless transactions** — QR scan to send, tap to donate
3. **Real-time awareness** — push notifications for every money movement
4. **Trust on-the-go** — institutional-grade security that fits in a pocket
5. **Impact visibility** — see your Humanity Centre impact while commuting

---

## 2. Competitive Research & Inspiration

### Leading Fintech/Crypto Mobile Apps Analyzed

#### Coinbase
- **Bottom nav**: 4 tabs (Home, Assets, Trade, Pay) — clean, function-first
- **Portfolio hero**: Full-width balance card with gradient, portfolio chart below
- **Asset list**: Tap row → detail screen with buy/sell CTA
- **Transaction flow**: Sheet modal, 3 steps max, progress dots
- **Trust signals**: Security badge, 2FA prompt inline with sensitive actions
- **Key takeaway**: Radical simplicity — one primary action per screen

#### Revolut
- **Bottom nav**: 5 tabs — Home, Payments, Wealth, Perks, Profile
- **Hide balance**: Tap-to-reveal/mask — privacy-first
- **Send money**: Recipient avatar + name, fee displayed before confirm
- **Cards section**: Animated card flip for CVV reveal
- **Analytics**: Spending charts, weekly summaries in feed
- **Key takeaway**: Context at decision moments — always show fees, recipients, consequences before committing

#### Cash App
- **Center action**: Large "$" button as primary CTA — single-purpose, unmissable
- **Minimalist home**: Balance + two actions (Pay/Request), nothing else
- **Boost system**: Loyalty/perks surfaced contextually, not buried in settings
- **Key takeaway**: Constraint creates clarity — ruthless prioritization of primary action

#### Wise (formerly TransferWise)
- **Multi-currency**: Card stack UI for multiple balance buckets
- **Recipient management**: Persistent contact list with flags/avatars
- **Fee transparency**: "You send X, they receive Y" before any commitment
- **Key takeaway**: Transparency as UX — users who understand fees trust more

### Design Patterns to Adopt for UNERA

| Pattern | Source | UNERA Application |
|---|---|---|
| Gradient hero balance card | Coinbase | Dashboard top card — portfolio total |
| Tap-to-reveal balance | Revolut | All balance displays masked by default |
| Sheet modal flows | Coinbase / Revolut | Send, Add Money, Exchange, Donate |
| 3-step max per flow | Coinbase | All transactional flows capped at 3 steps |
| Fee transparency before confirm | Wise | All Exchange / Send flows |
| QR-first receive | All | Receive screen shows QR immediately |
| Skeleton shimmer loading | Industry standard | Replace all spinners |
| Avatar + name for recipients | Revolut / Cash App | Send to contact flow |
| Progress dots for steppers | Coinbase | KYC, onboarding, add money steps |
| Success haptic + animation | All | Post-transaction confirmation |

---

## 3. Navigation Architecture

### Primary Navigation — Bottom Tab Bar (5 Tabs)

The web app uses a sticky top navigation bar with 4 links (Dashboard, Wallet, Impact, Centres). On mobile, this maps to a **bottom tab bar** — the universally expected pattern for iOS and Android fintech apps (Coinbase, Revolut, Wise, Cash App all use it).

```
┌─────────────────────────────────────────────┐
│                   Screen Content             │
│                                              │
│                                              │
│                                              │
│                                              │
├──────┬──────┬──────────┬──────┬──────────────┤
│  🏠  │  💼  │    ⊕     │  🌍  │    👤        │
│ Home │Wallet│   Move   │Impact│  Profile     │
└──────┴──────┴──────────┴──────┴──────────────┘
```

| Tab | Icon | Primary Content | Web Equivalent |
|---|---|---|---|
| **Home** | House | Portfolio overview, quick actions, impact snapshot, notifications feed | `dashboard-enhanced.html` |
| **Wallet** | Briefcase / card | Asset balances, full transaction history, multi-asset view | `wallet-enhanced.html` |
| **Move** | Plus circle (center, accent) | Action hub: Send, Receive, Add, Exchange, Convert, Withdraw, Stake | `send-enhanced.html`, `add-money.html`, `exchange.html`, etc. |
| **Impact** | Globe / heart | Humanity Centres explore, donate, donation history, proof of reserve | `explore-centres.html`, `donate.html`, `donation-history.html` |
| **Profile** | Avatar / person | Account settings, security, notifications settings, connected wallets | `account-settings.html`, `account-security.html` |

### "Move" Tab — Action Hub Design

The center "Move" tab uses a **raised action button** (FAB-style elevation on iOS, filled FAB pattern on Android). Tapping it opens an **action sheet** with 6 primary actions arranged in a 2×3 grid:

```
┌─────────────────────────────┐
│                             │
│   [Send]      [Receive]     │
│                             │
│   [Add Money] [Exchange]    │
│                             │
│   [Convert]   [Stake]       │
│                             │
│        [Withdraw]           │
└─────────────────────────────┘
```

Each action launches its corresponding full-screen sheet modal.

### Navigation Stack Structure

Each tab maintains an **independent navigation stack**:

```
Home Tab Stack
├── HomeScreen (root)
├── NotificationsScreen
└── (pushes from home cards)

Wallet Tab Stack
├── WalletScreen (root)
├── TransactionDetailScreen
└── ProofOfReserveScreen

Move Tab (Sheet modal — no stack)
├── MoveActionSheet (root)
├── SendScreen (full screen modal)
├── ReceiveScreen (full screen modal)
├── AddMoneyScreen (stepper modal)
├── ExchangeScreen (stepper modal)
├── ConvertScreen
├── StakeScreen
└── WithdrawScreen

Impact Tab Stack
├── ImpactScreen (root)
├── ExploreCentresScreen
├── CentreDetailScreen
├── DonateScreen (sheet)
└── DonationHistoryScreen

Profile Tab Stack
├── ProfileScreen (root)
├── AccountSettingsScreen
├── AccountSecurityScreen
└── ConnectedWalletsScreen
```

### Auth & Onboarding Flows (Outside Tab Bar)

All auth and onboarding screens live **outside the tab bar** — presented as full-screen modals before the main app is unlocked:

```
App Entry
├── SplashScreen (brand logo, 1.5s)
├── BiometricUnlockScreen (returning users)
│   └── → Main App (tab bar)
├── OnboardingFlow (first-time users)
│   ├── WelcomeScreen
│   ├── LoginScreen
│   ├── SignupScreen
│   │   ├── EmailVerifyScreen
│   │   ├── MagicLinkSentScreen
│   │   └── ConnectSocialScreen
│   ├── WalletConnectionFlow
│   │   ├── ConnectMetaMaskScreen
│   │   └── ConnectWalletConnectScreen
│   ├── KYCFlow
│   │   ├── KYCIntroScreen
│   │   ├── KYCDocumentScanScreen (camera)
│   │   ├── KYCSelfieScanScreen (camera)
│   │   └── KYCPendingScreen
│   ├── Setup2FAScreen
│   └── WalletCreationScreen
└── → Main App (tab bar)
```

---

## 4. Screen Inventory — All 55 Web Pages Mapped to Mobile

### Auth & Onboarding (14 screens)

| Web File | Mobile Screen Name | Nav Context | Platform Notes |
|---|---|---|---|
| `login_2.html` | `LoginScreen` | Auth stack (outside tabs) | Biometric button as primary CTA; email/password as fallback |
| `signup_2.html` | `SignupScreen` | Auth stack | Progressive disclosure — email + password only initially |
| `forgot-password.html` | `ForgotPasswordScreen` | Auth stack | Modal sheet from Login |
| `password-reset.html` | `PasswordResetScreen` | Deep link handler | Opened via email deep link (`unera://reset?token=…`) |
| `verify-email.html` | `VerifyEmailScreen` | Auth stack | OTP code input — 6-digit large tappable cells |
| `magic-link-sent.html` | `MagicLinkSentScreen` | Auth stack | Illustration + "Open Mail App" button |
| `connect-social.html` | `ConnectSocialScreen` | Auth stack | Google + Apple Sign In (Apple required on iOS) |
| `connect-metamask.html` | `ConnectMetaMaskScreen` | Auth stack / Settings | Deep link to MetaMask app; WalletConnect QR fallback |
| `connect-walletconnect.html` | `ConnectWalletConnectScreen` | Auth stack / Settings | QR code display + WalletConnect SDK |
| `setup-2fa.html` | `Setup2FAScreen` | Auth stack + Security settings | Authenticator app QR + backup codes |
| `verify-2fa.html` | `Verify2FAScreen` | Auth stack | 6-digit code input |
| `wallet-creation.html` | `WalletCreationScreen` | Auth stack | Seed phrase display with copy-protection (no screenshots) |
| `kyc-verify.html` | `KYCFlow` (multi-screen) | Auth stack | Native camera for document + selfie; OCR auto-fill |
| `instructions.html` | `OnboardingScreen` | First-launch only | Replaced by animated walkthrough (3 swipeable slides) |

### Home Tab (3 screens)

| Web File | Mobile Screen Name | Nav Context | Platform Notes |
|---|---|---|---|
| `dashboard-enhanced.html` | `HomeScreen` | Home tab root | Gradient hero card (portfolio total); quick actions row; scrollable feed |
| `notifications.html` | `NotificationsScreen` | Pushed from Home tab | Swipe-to-dismiss, badge count on tab icon |
| *(no web equivalent)* | `BiometricUnlockScreen` | App entry point | Shows masked balance behind lock; FaceID/fingerprint to unlock |

### Wallet Tab (3 screens)

| Web File | Mobile Screen Name | Nav Context | Platform Notes |
|---|---|---|---|
| `wallet-enhanced.html` | `WalletScreen` | Wallet tab root | Asset list with logos; balance per asset; filter tabs (All / Sent / Received) |
| *(transaction detail — web shows inline)* | `TransactionDetailScreen` | Pushed from WalletScreen | Full receipt view; share button → native share sheet |
| `proof-of-reserve-public.html` | `ProofOfReserveScreen` | Pushed from WalletScreen | Read-only data display; external link to on-chain explorer |

### Move Tab — Action Screens (9 screens, all sheet modals)

| Web File | Mobile Screen Name | Nav Context | Platform Notes |
|---|---|---|---|
| `send-enhanced.html` | `SendScreen` | Sheet modal from Move | Tab bar: Address / Username / QR Scan; QR uses native camera |
| *(no web equivalent — receive is partial)* | `ReceiveScreen` | Sheet modal from Move | Large QR code; copy address; native share; "Request amount" field |
| `add-money.html` | `AddMoneyScreen` | Sheet modal from Move | Stepper: Amount → Method → Review → Confirm; 4 steps max |
| `exchange.html` | `ExchangeScreen` | Sheet modal from Move | From/To token picker; live rate; fee preview; confirm |
| `convert.html` | `ConvertScreen` | Sheet modal from Move | Simplified exchange (crypto → stablecoin only) |
| `withdraw.html` | `WithdrawScreen` | Sheet modal from Move | Bank details; amount; fee; confirm |
| `stake.html` | `StakeScreen` | Sheet modal from Move | Yield rate display; amount; lock period selector; confirm |
| `purchase-receipt.html` | `TransactionReceiptScreen` | Success state after any Move action | Animated checkmark; share receipt button; done → returns to Home |
| *(no web equivalent)* | `MoveActionSheet` | Bottom sheet triggered by Move tab | 2×3 action grid: Send, Receive, Add, Exchange, Convert, Stake + Withdraw |

### Impact Tab (4 screens)

| Web File | Mobile Screen Name | Nav Context | Platform Notes |
|---|---|---|---|
| `explore-centres.html` | `ExploreCentresScreen` | Impact tab root | Search + filter; card grid collapses to list on small screens |
| `centre-detail.html` | `CentreDetailScreen` | Pushed from ExploreCentres | Hero image; mission; stats; donate CTA pinned to bottom |
| `donate.html` | `DonateScreen` | Sheet modal from CentreDetail | Amount picker; preset amounts; review → confirm |
| `donation-history.html` | `DonationHistoryScreen` | Pushed from Impact tab | Chronological list; filter by centre; total impact stat at top |

### Profile Tab (3 screens)

| Web File | Mobile Screen Name | Nav Context | Platform Notes |
|---|---|---|---|
| `account-settings.html` | `AccountSettingsScreen` | Profile tab root | Grouped list (Profile, Preferences, Connected Wallets, Notifications) |
| `account-security.html` | `AccountSecurityScreen` | Pushed from AccountSettings | 2FA status; biometric toggle; active sessions list; change password |
| *(no web equivalent)* | `NotificationPrefsScreen` | Pushed from AccountSettings | Per-category push notification toggles |

### Operator Portal (Deferred — Phase 2)

| Web File | Mobile Screen Name | Status |
|---|---|---|
| `operator-login.html` | `OperatorLoginScreen` | Phase 2 — separate app or WebView |
| `operator-dashboard.html` | `OperatorDashboardScreen` | Phase 2 |
| `operator-issuance.html` | `OperatorIssuanceScreen` | Phase 2 |
| `operator-hc-management.html` | `OperatorHCManagementScreen` | Phase 2 |
| `operator-por.html` | `OperatorPORScreen` | Phase 2 |

**Decision rationale**: The Operator Portal is a power-user admin tool designed for desktop use. Complex tables, multi-field forms, and batch operations are poor fits for mobile. Phase 2 options: (a) dedicated operator-only app with simplified mobile views, or (b) responsive WebView wrapper pointing to the existing web operator portal.

### Dev / Reference Files (Not Ported)

`brand-style-guide.html`, `logos.html`, `instructions.html`, `001testing.html`, `test-dropdown.html`, `reset-storage.html`, `email-notification-templates.html`, and all `*_backup` / `*_old` files — reference only, no mobile equivalent.

---

## 5. Feature Prioritization — MVP vs Phase 2

### MVP — Full Web Feature Parity (Target: App Store Launch)

**Authentication & Identity**
- [ ] Email + password login
- [ ] Sign up with email
- [ ] Forgot password / reset via email deep link
- [ ] Email verification (OTP + magic link)
- [ ] Google / Apple social sign-in
- [ ] Face ID / Touch ID / fingerprint biometric login
- [ ] 2FA setup and verification (TOTP authenticator)
- [ ] Multi-step KYC (document + selfie scan)
- [ ] MetaMask / WalletConnect connection
- [ ] Wallet creation with seed phrase

**Home & Dashboard**
- [ ] Portfolio total balance (with tap-to-reveal/mask)
- [ ] Quick action buttons (Send, Receive, Add, Exchange)
- [ ] Impact snapshot card (total donated, active centre)
- [ ] Recent transactions feed
- [ ] Notifications center with badge count

**Wallet**
- [ ] Multi-asset balance list
- [ ] Full transaction history with filters
- [ ] Transaction detail screen
- [ ] Proof of Reserve view
- [ ] Copy wallet address

**Move — Transactions**
- [ ] Send (by address, username, QR scan)
- [ ] Receive (QR code display + share)
- [ ] Add Money (stepper: amount → method → confirm)
- [ ] Exchange (token-to-token with live rate)
- [ ] Convert (crypto to stablecoin)
- [ ] Withdraw (to bank)
- [ ] Stake (with lock period)
- [ ] Transaction receipt with share

**Impact**
- [ ] Explore Humanity Centres (search + filter)
- [ ] Centre detail with mission and impact stats
- [ ] Donate to a centre (one-time)
- [ ] Donation history

**Profile & Settings**
- [ ] Edit profile (name, email, avatar)
- [ ] Notification preferences
- [ ] Connected wallets management
- [ ] Change password
- [ ] 2FA management
- [ ] Active sessions (view + terminate)
- [ ] Account deletion request

### Phase 2 — Mobile-Native Enhancements

**Payments & Commerce**
- [ ] NFC tap-to-pay
- [ ] Apple Pay / Google Pay for Add Money
- [ ] Payment requests (send amount request link)
- [ ] Recurring donations (scheduled)

**Notifications & Engagement**
- [ ] Push notifications — transaction confirmations
- [ ] Push notifications — price alerts (stablecoin depeg warning)
- [ ] Push notifications — Humanity Centre updates
- [ ] Push notifications — new features / announcements
- [ ] In-app notification feed (persistent history)

**Productivity**
- [ ] iOS Home Screen widget (live balance, quick send)
- [ ] Android Home Screen widget (Glance API)
- [ ] Offline mode — cached balance and recent transactions
- [ ] iCloud Keychain / Android Autofill integration
- [ ] Contacts integration for P2P send (send to phone number)

**Wearables**
- [ ] Apple Watch app — balance glance, recent transaction
- [ ] Wear OS complication — balance

**Operator Portal**
- [ ] Operator companion app (simplified mobile-first admin)
- [ ] Mint/burn token approval notifications
- [ ] Reserve health alerts

**Advanced Features**
- [ ] Recurring investments (DCA)
- [ ] Price charts with technical indicators
- [ ] Multi-sig wallet support
- [ ] Hardware wallet (Ledger) connection via Bluetooth
- [ ] App Clips — "receive money" entry point without full app install

---

## 6. User Flows — Key Journeys

### Flow 1: First-Time Onboarding

```
App Install
  ↓
Splash (1.5s brand logo)
  ↓
Welcome / Onboarding Slides (3 swipeable screens: "Hold", "Give", "Grow")
  ↓
Sign Up Screen
  ├── Enter email + password
  ↓
Magic Link Sent Screen
  ↓
[User taps link in email → deep link opens app]
  ↓
Email Verified Screen
  ↓
Connect Social (optional — skip available)
  ↓
Wallet Setup Choice
  ├── Create New Wallet → Wallet Creation (seed phrase backup)
  └── Connect Existing → MetaMask / WalletConnect
  ↓
KYC Flow (4 steps)
  ├── Step 1: ID Document choice (passport / driver's licence / national ID)
  ├── Step 2: Camera scan front of document (native camera, OCR auto-fill)
  ├── Step 3: Selfie / liveness check
  └── Step 4: KYC Pending screen (estimated 1-2 min)
  ↓
Set Up 2FA (optional — strong encourage, skip available)
  ↓
Enable Biometrics prompt (system dialog: "Use Face ID?")
  ↓
Main App → HomeScreen (first visit, empty state with Add Money CTA)
```

**Design principle**: Progressive KYC — collect minimum upfront, defer document scan until user attempts first transaction > $100 if they skipped during onboarding.

### Flow 2: Returning User Login

```
App open
  ↓
Biometric Unlock Screen (blurred balance visible behind)
  ├── Face ID / Touch ID prompt (auto-triggered, 0 taps)
  │   ↓ Success → HomeScreen (< 2 seconds total)
  └── Biometric fails → PIN / password fallback
```

### Flow 3: Send Money (Primary Transaction)

```
Move Tab → MoveActionSheet
  ↓
Tap "Send"
  ↓
SendScreen — Tab bar: By Address | By Username | Scan QR
  ├── Scan QR → full-screen camera, QR detected → auto-fill address
  ├── By Username → search field, result list with avatars
  └── By Address → paste or type address
  ↓
Amount Screen
  ├── Large numpad input
  ├── Asset selector (USDC / UNERA / etc.)
  ├── Tap to toggle: send in USD or crypto
  └── Fee shown inline: "Network fee: $0.02"
  ↓
Review Screen
  ├── From: [Your wallet abbreviated]
  ├── To: [Recipient address / name + avatar]
  ├── Amount: $XX.XX (+ crypto equivalent)
  ├── Fee: $0.02
  └── Total deducted: $XX.02
  ↓
Confirm (biometric prompt for amounts > $50)
  ↓
Processing Screen (skeleton shimmer, "Sending…")
  ↓
Success Screen
  ├── Animated checkmark + haptic feedback
  ├── "You sent $XX.XX to [Name]"
  ├── Share receipt button
  └── Done → HomeScreen
```

### Flow 4: Donate to Humanity Centre

```
Impact Tab → ExploreCentresScreen
  ↓
Search or browse → tap Centre card
  ↓
CentreDetailScreen
  ├── Hero image, mission statement
  ├── Impact stats (families served, months funded)
  └── "Donate" CTA button (pinned to bottom)
  ↓
DonateScreen (sheet modal)
  ├── Preset amounts: $5 / $10 / $25 / $50 / Custom
  ├── "This funds X days of operations"
  └── Review → Confirm
  ↓
Success → haptic + confetti animation (emotional reward)
  ↓
Updated impact stats on CentreDetailScreen
```

### Flow 5: Exchange Tokens

```
Move Tab → MoveActionSheet → "Exchange"
  ↓
ExchangeScreen
  ├── From: [Asset selector + balance]
  ├── Amount input (numpad)
  ├── Live rate: "1 ETH = 3,421.50 USDC"
  ├── To: [Auto-calculated receive amount]
  └── Fee + slippage shown
  ↓
Review (swipe up sheet)
  ├── From / To summary
  ├── Rate locked for 15s (countdown timer)
  └── "Confirm Exchange" button
  ↓
Biometric confirm → Processing → Success
```

---

## 7. Design System Adaptation — Web to Mobile

### Token Mapping (1:1 Web → Mobile)

All CSS custom properties from the web app translate directly to mobile design tokens. In React Native, these become a `theme.ts` constants file:

```typescript
// theme.ts — Direct mapping from web CSS variables
export const colors = {
  // Brand
  primaryGreen:   '#10B981',
  primaryBlue:    '#0EA5E9',
  accentPink:     '#EC4899',
  accentIndigo:   '#6366F1',

  // Neutrals
  neutral900: '#1F2937',
  neutral800: '#374151',
  neutral700: '#4B5563',
  neutral600: '#6B7280',
  neutral500: '#9CA3AF',
  neutral400: '#D1D5DB',
  neutral300: '#E5E7EB',
  neutral200: '#F3F4F6',
  neutral100: '#F9FAFB',
  neutral50:  '#FFFFFF',

  // Semantic
  success: '#059669',
  warning: '#F59E0B',
  error:   '#EF4444',

  // Text & Border
  textPrimary:   '#0F172A',
  textSecondary: '#475569',
  borderSubtle:  '#E2E8F0',
};

export const gradients = {
  primary:  ['#10B981', '#0EA5E9'], // green → blue (135deg)
  sky:      ['#0EA5E9', '#3B82F6'],
  warm:     ['#F59E0B', '#EC4899'],
  operator: ['#3B82F6', '#6366F1'],
};
```

### Typography Scale (Web → Mobile)

Space Grotesk is available as a Google Font and can be bundled via `expo-font`. The web type scale adapts to pt/sp units:

| Role | Web (rem) | Mobile (pt/sp) | Usage |
|---|---|---|---|
| Hero balance | — | 36–40pt | Portfolio total on HomeScreen |
| Display | 2rem (32px) | 28–32pt | Screen titles |
| Title | 1.5rem (24px) | 22–24pt | Card headers, section titles |
| Subtitle | 1.25rem (20px) | 18–20pt | Subheadings |
| Body | 1rem (16px) | 15–16pt | Primary body text |
| Small | 0.875rem (14px) | 13–14pt | Secondary labels |
| Caption | 0.75rem (12px) | 12pt | Timestamps, metadata |
| Minimum | — | 12pt | Never go below this |

### Component Adaptation

| Web Component | Mobile Equivalent | Key Changes |
|---|---|---|
| Nav bar (top sticky) | Bottom tab bar | Repositioned; 5 items; native feel |
| Card (`border-radius: 1.25rem`) | Card (`borderRadius: 20`) | Shadow instead of border on iOS; elevation on Android |
| `.btn-primary` | `PrimaryButton` | `minHeight: 52`, full-width in sheets |
| `.btn-secondary` | `SecondaryButton` | Outline style maintained |
| Gradient text headings | Gradient text (via `expo-linear-gradient` + masked) | Same visual |
| Modal/side sheet | Bottom sheet (react-native-bottom-sheet) | Native feel |
| Stepper (horizontal) | Progress dots / step indicator | Vertical scroll on small screens |
| Table/list rows | FlatList rows with `onPress` | Swipe actions on iOS |
| Form inputs | TextInput with custom styling | `fontSize: 16` minimum (prevents iOS zoom) |
| Dropdown select | ActionSheet / Picker | Platform-native select |
| Toast notifications | react-native-toast-message | Bottom position, above tab bar |

### Mobile-Specific Additions (No Web Equivalent)

| Component | Purpose |
|---|---|
| `BiometricButton` | Face ID / fingerprint unlock CTA |
| `QRScanner` | Full-screen camera with scan overlay |
| `QRDisplay` | Large QR code for receive address |
| `NumpadInput` | Custom large-key numpad for amounts |
| `BalanceMask` | Tap-to-reveal/hide balance |
| `SkeletonLoader` | Shimmer placeholder during data load |
| `HapticFeedback` | Utility for success/error tactile response |
| `PushNotificationBanner` | In-app notification overlay |
| `SafeAreaWrapper` | Handles Dynamic Island, home indicator |
| `DeepLinkHandler` | Routes `unera://` links to correct screen |

---

## 8. Platform-Specific Considerations

### iOS (Apple Human Interface Guidelines)

**Layout & Safe Areas**
- All screens must respect `SafeAreaView` / `useSafeAreaInsets()` — account for Dynamic Island (iPhone 14 Pro+), status bar, and home indicator bar
- Bottom tab bar sits above home indicator; tab items must be min 44pt tall
- Bottom safe area padding: ~34pt on Face ID iPhones, 0pt on older models with home button

**Navigation**
- Back navigation: system swipe-from-left-edge gesture must work on all pushed screens
- Bottom sheet: swipe-down to dismiss; handle bar at top of sheet
- Modals: present with `.sheet` style, slide-up animation
- Tab bar: 3–5 items (5 is our maximum); uses `UITabBarController` conventions

**Icons & Typography**
- Use SF Symbols for system icons (chevron.right, checkmark.circle, qrcode, person.crop.circle, etc.) alongside brand icons
- Support Dynamic Type — all text must scale when user increases system font size
- Bold titles in navigation bar (when using standard nav)

**Security**
- Biometric: `LocalAuthentication` framework (Face ID / Touch ID) — always check `isAvailable` and fallback to password
- Screenshot prevention on sensitive screens: `UITextField.isSecureTextEntry` or overlay blank view in `applicationWillResignActive`
- App Store requires privacy manifests for data collection

**Payments & Identity**
- Apple Sign In is **required** on iOS if offering any social login
- In-app purchases (if subscriptions exist in Phase 2): must use Apple's IAP framework
- App Clips: lightweight entry point for "receive money" use case (< 10MB)

**Capabilities**
- Push Notifications: APNs (Apple Push Notification service); requires `UserNotifications` entitlement
- Haptic Feedback: `UIImpactFeedbackGenerator` (light, medium, heavy) + `UINotificationFeedbackGenerator` (success, error, warning)
- Camera: `AVFoundation` for QR scan and document scan; requires `NSCameraUsageDescription` in plist
- Contacts: `CNContactStore` for P2P send (Phase 2); requires `NSContactsUsageDescription`
- Share Sheet: `UIActivityViewController` for QR codes, receipts, wallet addresses

### Android (Material Design 3)

**Layout & Edge-to-Edge**
- All screens must implement edge-to-edge layout (`WindowCompat.setDecorFitsSystemWindows(false)`)
- Handle `WindowInsets` — status bar, navigation bar, IME (keyboard) insets
- Navigation bar can be transparent (overlaid content) or opaque depending on screen
- Min touch target: 48×48dp for all interactive elements

**Navigation**
- Predictive back gesture (Android 14+): register `onBackInvokedCallback` for proper animated back
- Bottom Navigation Bar: `NavigationBar` component (Material 3); max 5 items
- Bottom sheets: `ModalBottomSheetLayout` (Jetpack Compose) or `BottomSheetDialogFragment`
- No side drawer — bottom tab bar is primary nav

**Material You — Dynamic Color Override**
- Android 12+ supports dynamic color (wallpaper-based theming). UNERA must **override** this with brand tokens to maintain visual consistency
- Set `Theme.Material3.DayNight.NoActionBar` as base; override all color roles with UNERA tokens
- `colorPrimary` → `#10B981`, `colorSecondary` → `#0EA5E9`, etc.

**Icons & Typography**
- Use Material Symbols (outlined style) for system icons alongside brand icons
- Support system font size scaling (`sp` units for all text)
- Adaptive icons required (foreground + background layers for home screen icon)

**Security**
- Biometric: `BiometricPrompt` API — supports fingerprint, face, iris; unified dialog
- Screenshot prevention: `WindowManager.LayoutParams.FLAG_SECURE` for wallet screens
- Android Keystore for storing sensitive tokens

**Payments & Identity**
- Google Sign In: use `Credential Manager` API (replaces legacy Google Sign In)
- Google Pay (Phase 2): `PaymentsClient` + `GooglePayButton` component
- FCM (Firebase Cloud Messaging) for push notifications

**Capabilities**
- Camera: `CameraX` for QR scan and document scan; requires `CAMERA` permission
- Notifications: `NotificationManager` + `NotificationChannel` (required Android 8+)
- Haptic feedback: `HapticFeedbackConstants` (CONFIRM, REJECT, etc.) — more limited than iOS
- Widgets: Jetpack Glance API for home screen widgets (Phase 2)
- Share Intent: `Intent.ACTION_SEND` for QR codes, receipts

---

## 9. Reuse Strategy

### What Transfers Directly (High Value)

| Asset | Reuse Method | Notes |
|---|---|---|
| **Design tokens** (colors, gradients) | Copy hex values → `theme.ts` | 1:1 mapping, no translation needed |
| **Copy & microcopy** | Copy verbatim from web HTML | All labels, CTAs, error messages, tooltips |
| **User flows & logic** | Replicate step-for-step in mobile screens | Same 3-step patterns, same field order |
| **Brand assets** | Export logos as SVG → import as React Native SVG | `react-native-svg` handles all vector assets |
| **Iconography** | Export custom icons as SVG | Supplement with SF Symbols / Material Symbols |
| **Business logic** | Reuse API contracts and response shapes | Mobile calls same backend endpoints |
| **Validation rules** | Port from web JS (`validation.js`) | Same regex, same error messages |

### What Requires Adaptation (Medium Effort)

| Asset | Adaptation Needed |
|---|---|
| **HTML/CSS layouts** | Rebuild as React Native StyleSheet — no HTML/CSS in native |
| **Multi-step stepper UI** | Rebuild with native scroll + progress indicator (no horizontal CSS stepper) |
| **Modals** | Convert from CSS absolute-positioned modals → bottom sheets |
| **Form inputs** | Rebuild with native TextInput; add custom numpad for amounts |
| **Navigation** | Top nav → bottom tab bar + stack navigators |
| **Notifications page** | Web full page → mobile push + in-app notification feed |

### What Is Mobile-Only (New Work)

| Feature | Effort |
|---|---|
| Biometric auth | Medium — integrate `expo-local-authentication` |
| QR scanner | Medium — integrate `expo-camera` + `expo-barcode-scanner` |
| Push notification setup | Medium — APNs + FCM setup, permission flow |
| Deep link handling | Small — `expo-linking` with route mapping |
| Haptic feedback | Small — `expo-haptics` utility |
| Skeleton loaders | Small — build shimmer component |
| Safe area handling | Small — `react-native-safe-area-context` |
| App icon + splash | Small — 1024×1024 icon, splash screen |

---

## 10. Recommended Tech Stack

### Primary Recommendation: React Native + Expo (Managed Workflow)

**Why React Native + Expo for UNERA:**

1. **Single codebase** — one repo ships to both App Store and Google Play
2. **Web token reuse** — design tokens (hex values, spacing) port directly to JavaScript objects
3. **Team velocity** — Expo abstracts away native build complexity; no Xcode/Android Studio knowledge required initially
4. **EAS Build** — Expo Application Services handles CI/CD for both platforms
5. **Large fintech ecosystem** — Coinbase, Robinhood, and Wise have used React Native successfully

```
react-native          ^0.74+   Core framework
expo                  ~51+     Managed workflow + native modules
expo-router           ~3+      File-based routing (like Next.js)
react-native-reanimated  ~3+   Smooth 60/120fps animations
react-native-gesture-handler    Gesture support (swipe, pan)
react-native-bottom-sheet  ~4+  Sheet modals
expo-linear-gradient        Gradient backgrounds (hero cards, CTAs)
expo-camera / expo-barcode-scanner   QR scan, document scan
expo-local-authentication   Face ID / Touch ID / Fingerprint
expo-haptics                Haptic feedback
expo-notifications          Push notifications (APNs + FCM)
expo-linking                Deep links (unera://)
react-native-safe-area-context  Safe area insets
@react-navigation/native    Navigation (bottom tabs + stacks)
@react-navigation/bottom-tabs   Tab bar
expo-secure-store           Encrypted token storage (replaces localStorage)
react-native-svg            Vector assets (logos, icons)
react-query / TanStack Query Data fetching + caching
zustand                     Lightweight state management
react-native-toast-message  In-app toasts
react-hook-form + zod       Form validation (same patterns as web)
```

### Alternative: Flutter

Consider Flutter if:
- Team prefers Dart over JavaScript/TypeScript
- Pixel-perfect parity between iOS and Android is critical
- Custom widget library is planned

Flutter produces slightly more polished platform-specific animations but requires more upfront effort to replicate the web design system.

### NOT Recommended: Ionic / Capacitor (WebView wrapper)

While Ionic would allow HTML/CSS reuse, WebView-based apps feel distinctly non-native on fintech apps. Users of financial applications expect native-feeling gestures, smooth animations, and instant biometric response. The trust perception is lower on WebView apps.

---

## 11. Project Structure

```
unera-mobile/
├── app/                        # Expo Router file-based routes
│   ├── (auth)/                 # Auth stack (outside tabs)
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   ├── forgot-password.tsx
│   │   ├── verify-email.tsx
│   │   ├── magic-link-sent.tsx
│   │   ├── connect-social.tsx
│   │   ├── connect-metamask.tsx
│   │   ├── connect-walletconnect.tsx
│   │   ├── setup-2fa.tsx
│   │   ├── verify-2fa.tsx
│   │   ├── wallet-creation.tsx
│   │   └── kyc/
│   │       ├── intro.tsx
│   │       ├── document-scan.tsx
│   │       ├── selfie-scan.tsx
│   │       └── pending.tsx
│   ├── (tabs)/                 # Main app tab bar
│   │   ├── _layout.tsx         # Tab bar definition
│   │   ├── home/
│   │   │   ├── index.tsx       # HomeScreen (dashboard)
│   │   │   └── notifications.tsx
│   │   ├── wallet/
│   │   │   ├── index.tsx       # WalletScreen
│   │   │   ├── [txId].tsx      # TransactionDetailScreen
│   │   │   └── proof-of-reserve.tsx
│   │   ├── move/
│   │   │   ├── index.tsx       # MoveActionSheet
│   │   │   ├── send.tsx
│   │   │   ├── receive.tsx
│   │   │   ├── add-money.tsx
│   │   │   ├── exchange.tsx
│   │   │   ├── convert.tsx
│   │   │   ├── stake.tsx
│   │   │   └── withdraw.tsx
│   │   ├── impact/
│   │   │   ├── index.tsx       # ImpactScreen
│   │   │   ├── explore.tsx     # ExploreCentresScreen
│   │   │   ├── [centreId].tsx  # CentreDetailScreen
│   │   │   ├── donate.tsx
│   │   │   └── history.tsx
│   │   └── profile/
│   │       ├── index.tsx       # ProfileScreen
│   │       ├── settings.tsx    # AccountSettingsScreen
│   │       ├── security.tsx    # AccountSecurityScreen
│   │       └── notification-prefs.tsx
│   ├── receipt.tsx             # TransactionReceiptScreen (modal)
│   └── _layout.tsx             # Root layout + providers
├── components/
│   ├── ui/                     # Design system components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Avatar.tsx
│   │   ├── GradientText.tsx
│   │   ├── GradientCard.tsx    # Hero balance card
│   │   ├── SkeletonLoader.tsx
│   │   ├── NumpadInput.tsx     # Custom amount numpad
│   │   ├── BalanceMask.tsx     # Tap-to-reveal balance
│   │   ├── QRDisplay.tsx       # QR code display
│   │   ├── QRScanner.tsx       # Camera QR scanner
│   │   ├── StepIndicator.tsx   # Flow progress dots
│   │   ├── BottomSheet.tsx     # Sheet wrapper
│   │   └── SafeAreaWrapper.tsx
│   ├── home/
│   ├── wallet/
│   ├── move/
│   ├── impact/
│   └── profile/
├── constants/
│   ├── theme.ts                # All design tokens (colors, typography, spacing)
│   ├── gradients.ts
│   └── icons.ts
├── hooks/
│   ├── useBiometric.ts
│   ├── useHaptics.ts
│   ├── useDeepLink.ts
│   └── usePushNotifications.ts
├── store/
│   ├── authStore.ts
│   ├── walletStore.ts
│   └── notificationStore.ts
├── services/
│   ├── api.ts                  # Same endpoints as web
│   ├── biometric.ts
│   ├── notifications.ts
│   └── deepLinks.ts
├── assets/
│   ├── images/
│   ├── icons/                  # SVG brand icons
│   └── fonts/
│       └── SpaceGrotesk/
├── app.json                    # Expo config
├── eas.json                    # EAS Build config
└── package.json
```

---

## 12. Accessibility Standards

### iOS VoiceOver
- All interactive elements must have `accessibilityLabel` (descriptive) and `accessibilityHint` (what happens on tap)
- Images must have `accessibilityLabel` or `accessible={false}` if decorative
- Amount inputs: announce value + currency as user types
- Transaction confirmation: read full summary before confirm button is reachable

### Android TalkBack
- Same requirements via `accessibilityLabel` (maps to `contentDescription`)
- Group related elements with `accessibilityViewIsModal` on sheet modals
- Ensure focus order is logical (top-to-bottom, left-to-right)

### Dynamic Type / Font Scaling
- All text uses `sp` equivalent (React Native's font sizes scale with system settings)
- Test at iOS Accessibility → Display & Text Size → Larger Text (maximum)
- Layouts must not clip text at large sizes — use `flexWrap` and avoid `numberOfLines` on critical content

### Color Contrast
- Primary text on white: `#0F172A` on `#FFFFFF` — 19.6:1 (exceeds AAA)
- Secondary text: `#475569` on `#FFFFFF` — 6.0:1 (AA pass)
- Green on white (`#10B981` on `#FFFFFF`) — 2.8:1 — do NOT use for text; use for icons/backgrounds only
- CTA text on gradient: ensure white text over gradient has ≥ 4.5:1 (test both endpoints)

### Reduced Motion
- All animations must be wrapped: `if (!isReduceMotionEnabled) { /* animate */ }`
- Use `useReducedMotion()` from `react-native-reanimated`
- Fallback: instant state changes (no transition)

---

## 13. Performance & Offline Strategy

### Performance Targets
- Cold start (first open after install): < 3 seconds to interactive
- Warm start (app in background): < 1 second to biometric prompt
- Tab switch: < 100ms
- Transaction history load: < 500ms (with skeleton shimmer shown immediately)

### Strategies
- **Lazy loading**: Each tab screen loads only when first visited — not all upfront
- **TanStack Query caching**: API responses cached with `staleTime: 30s` — navigation feels instant on revisit
- **Optimistic updates**: Send / donate show success immediately; rollback on error
- **FlatList virtualization**: Transaction lists use `FlatList` (never `ScrollView` for long lists)
- **Image caching**: Centre hero images cached via `expo-image` (built-in disk cache)

### Offline Mode (MVP — Graceful Degradation)
- Cached portfolio balance shown with "Last updated X min ago" label
- Recent transactions (last 50) available from cache
- All transaction actions disabled with "No internet connection" inline message
- No silent failures — always tell the user what's unavailable and why

---

## 14. App Store Considerations

### iOS App Store
- **Category**: Finance
- **Age Rating**: 17+ (financial transactions, digital currency)
- **Privacy Nutrition Labels**: Disclose data collected: Financial Info (transaction history), Contact Info (email), Identifiers (User ID), Usage Data
- **App Review**: Finance apps face enhanced scrutiny — provide test credentials in App Store Connect notes
- **Required capabilities to declare**: Camera (QR), Face ID, Push Notifications
- **Privacy Manifest**: Required for any third-party SDK data collection (iOS 17+)

### Google Play Store
- **Category**: Finance
- **Content Rating**: Everyone (financial apps rated Everyone by default unless gambling)
- **Data Safety Section**: Declare all data types collected and whether shared with third parties
- **Target API**: Must target latest Android API level (API 35 for 2025 submissions)
- **64-bit requirement**: All native libraries must be 64-bit compatible
- **Financial App Policy**: May require declaration of financial service type; provide privacy policy URL

### Both Platforms
- Privacy policy URL (required)
- Terms of service URL (required)
- Support email / URL (required)
- App icon: 1024×1024 PNG (iOS), 512×512 PNG (Android), no alpha channel on Android
- Screenshots: 6.7" iPhone Pro Max, 12.9" iPad, Pixel 8 Pro — required for store listing
- Preview video: 15–30 second app demo (strongly recommended for fintech)

---

*Plan version: 1.0 — March 2026*
*Prepared for: UNERA product team*
*Status: Approved for development*
