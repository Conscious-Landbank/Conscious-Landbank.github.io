# Skill: Reuse existing product patterns (don't reinvent)

The user's strongest, most-repeated preference: **"reuse the pattern from wallet / account-settings / send,"** "keep it consistent with the current product," "use 100% components/tokens from the design system or current pages." Default to lifting, not inventing.

## A. Find the canonical instance first
1. When the user points at a section ("make this like the transactions in wallet"), open that exact file (`wallet-enhanced.html`, `account-settings.html`, `send-enhanced.html`) and `grep` the class names on the referenced element.
2. Read BOTH the CSS rules AND the markup for that component. Copy the real class structure, spacing, radii, hover/focus states, and the JS behaviors (dropdown open/close, click-outside, Escape, focus return).

## B. Lift into a shared file
3. Put the copied CSS into the feature's shared stylesheet (e.g. `donation-shared.css`) once, so every page in the feature uses one copy. Don't paste per page.
4. Keep the SAME class names as the source so it reads as the same component to anyone who knows the product (`.transaction-item`, `.wallet-scope-dd`, `.status-tab`, `.stepper`, `.success-details`).
5. Data/content lives in a single JS module (e.g. `donation-data.js`) so images, copy, lists all change in one place. The user repeatedly asked "reuse this for all," and a single source makes that a one-line change.

## C. Reference patterns already established here
- Dropdowns -> wallet-scope pattern (`.wallet-scope-dd/.wallet-scope-trigger/.wallet-scope-list`): icon + label trigger, rotating `.ws-chev`, shadowed option list, active highlight, Escape/click-outside. This is the approved dropdown: use it for every select-like control; never a raw `<select>`.
- List of records -> wallet Activity (`.transaction-item`): date-group headers, 56px semantic icon medallion, title + meta row (time • status chip • rail badge • token • txHash link), right-aligned amount in fin-up/fin-down.
- Transactional flow -> send/buy/swap spine: `.stepper` (+ compact mobile stepper ≤640px), single `.amount-section` (no double card), grouped review, asymmetric terminals, `.success-details` receipt.
- Nav -> `account-settings.html` lockup verbatim, icon sizing inlined (CLAUDE.md rule).
- Imagery -> design-system Illustration System: organic brand blobs; real photos layer on top with the blob as fallback.

## D. Confirm
6. Screenshot the rebuilt component beside the original in your head. It should look like the same product, not a lookalike. Match verbs/copy to the new context (donate vs send).
