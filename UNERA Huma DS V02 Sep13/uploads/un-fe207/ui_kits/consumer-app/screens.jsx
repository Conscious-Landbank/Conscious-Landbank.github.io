/* Huma consumer app — screens (Dashboard, Wallet, Centers, Send flow). */
const { useState } = React;

/* ─── Dashboard ─────────────────────────────────────────────────── */
function Dashboard({ onNav }) {
  const UI = window.UI;
  const impact = [
    { icon: UI.portfolio, mod: "portfolio", value: "$10,240", label: "Total Portfolio", detail: "🦊 0x0822...7B75 · Ethereum", trend: "+$2,400 this month" },
    { icon: UI.yield, mod: "yield", value: "$486.50", label: "Yield Generated", detail: "Continuous support from reserves", trend: "+$42 this week" },
    { icon: UI.heart, mod: "donations", value: "$5,240", label: "Total Donations", detail: "3 centers supported", trend: "+18% this month" },
    { icon: UI.lives, mod: "lives", value: "1,240+", label: "Lives Impacted", detail: "Through education, food & care", trend: "Growing daily", neutral: true },
  ];
  const actions = [
    { key: "wallet", cls: "action-card--sky", icon: UI.wallet, title: "My Wallet", desc: "View balances & transactions" },
    { key: "send", cls: "primary", icon: UI.buy, title: "Buy Stablecoins", desc: "Buy hUSD, USDC or USDT" },
    { key: "send", cls: "action-card--sky", icon: UI.exchange, title: "Exchange", desc: "Convert between currencies" },
    { key: "centers", cls: "action-card--sky", icon: UI.explore, title: "Explore Centers", desc: "Discover where to donate" },
    { key: "dashboard", cls: "action-card--sky", icon: UI.governance, title: "Governance", desc: "Vote on community proposals" },
  ];
  return (
    <div className="app-main">
      <header className="page-header">
        <p className="welcome-text">Welcome back,</p>
        <h1 className="page-title">Jane Smith</h1>
        <p className="page-subtitle">One Flow. Many Lives. — Track your impact and manage your contributions.</p>
      </header>
      <section>
        <div className="impact-grid">
          {impact.map((c, i) => (
            <div className="impact-card" key={i} role="button" tabIndex={0}>
              <div className="impact-card-header">
                <div className={"impact-icon impact-icon--" + c.mod}>{c.icon}</div>
                <span className="info-tip" title={c.label}>i</span>
              </div>
              <div className="impact-value">{c.value}</div>
              <div className="impact-label">{c.label}</div>
              <div className="impact-detail">{c.detail}</div>
              <div className={"impact-trend" + (c.neutral ? " impact-trend--neutral" : "")}>{UI.arrowUp}{c.trend}</div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="section-header"><h2 className="section-title">Quick Actions</h2></div>
        <div className="quick-actions-grid">
          {actions.map((a, i) => (
            <button className={"action-card " + a.cls} key={i} onClick={() => onNav(a.key)}>
              <div className="action-card-icon">{a.icon}</div>
              <div className="action-card-title">{a.title}</div>
              <div className="action-card-desc">{a.desc}</div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ─── Wallet ────────────────────────────────────────────────────── */
function Wallet({ onNav }) {
  const UI = window.UI;
  const assets = [
    { sym: "hUSD", full: "US Dollar", icon: "🇺🇸", bal: "2,500.00 hUSD", fiat: "2,500.00 USD", pct: "30.3%", change: "+1.2%", fill: "husd" },
    { sym: "USDC", full: "USD Coin", glyph: "$", bal: "1,250.00 USDC", fiat: "1,250.00 USD", pct: "15.2%", change: "+0.1%", fill: "husd" },
    { sym: "USDT", full: "Tether USD", glyph: "T", bal: "850.00 USDT", fiat: "850.00 USD", pct: "10.3%", change: "0.0%", fill: "husd" },
  ];
  const txns = [
    { date: "Today", items: [
      { type: "in", icon: UI.received, title: "Received from Alice Johnson", time: "10:32 AM", status: "completed", rail: "chain", token: "hUSD", amt: "+ $500.00", amtCls: "positive", sub: "hUSD" },
      { type: "donation", icon: UI.heart, title: "Donation to Nairobi Humanity Center", time: "09:15 AM", status: "completed", rail: "chain", token: "hUSD", amt: "- $250.00", amtCls: "negative", sub: "hUSD" },
      { type: "pending", icon: UI.bank, title: "Bank Transfer In", time: "08:45 AM", status: "pending", rail: "fiat", token: "hUSD", amt: "+ $1,000.00", amtCls: "positive", sub: "Est. 2-3 days" },
      { type: "yield", icon: UI.yield, title: "Yield Earned — Monthly Distribution", time: "06:00 AM", status: "completed", rail: "chain", token: "hUSD", amt: "+ $12.50", amtCls: "positive", sub: "4.8% APY" },
    ]},
    { date: "Yesterday", items: [
      { type: "out", icon: UI.send, title: "Sent to 0x44f…9b1", time: "4:20 PM", status: "completed", rail: "chain", token: "USDC", amt: "- $180.00", amtCls: "negative", sub: "USDC" },
      { type: "convert", icon: UI.exchange, title: "Exchanged USDC → hUSD", time: "11:08 AM", status: "completed", rail: "chain", token: "hUSD", amt: "+ $300.00", amtCls: "neutral", sub: "hUSD" },
    ]},
  ];
  function assetActions(sym) {
    return (
      <footer className="portfolio-asset-row-actions" role="group" aria-label={sym + " actions"}>
        <button className="asset-action-btn">{UI.plus}<span className="btn-label">Issue</span></button>
        <button className="asset-action-btn">{UI.redeem}<span className="btn-label">Redeem</span></button>
        <a className="asset-action-btn" onClick={() => onNav("send")}>{UI.arrowRightUp}<span className="btn-label">Send</span></a>
        <a className="asset-action-btn" onClick={() => onNav("send")}>{UI.exchange}<span className="btn-label">Exchange</span></a>
      </footer>
    );
  }
  return (
    <div className="app-main">
      <header className="page-header">
        <h1 className="page-title">Wallet</h1>
        <p className="page-subtitle">View your portfolio, manage assets, and track transactions</p>
      </header>

      <section>
        <div className="wallet-section-header">
          <h2 className="section-title">Balances</h2>
          <button className="privacy-toggle" aria-pressed="true">
            <span className="privacy-toggle-icon">{UI.eye}</span>Show Balances
          </button>
        </div>

        <div className="asset-summary-panel">
          <header className="asset-summary-panel-head">
            <h2>Portfolio</h2>
            <span className="portfolio-trust-chip">{UI.shield}100% Backed by Reserves</span>
          </header>

          <div className="summary-stats">
            <div className="summary-stat-card">
              <span className="stat-label">Total Portfolio</span>
              <div className="stat-value">$8,250.00</div>
              <span className="stat-change positive">{UI.arrowUp}+3.2% this week</span>
            </div>
            <div className="summary-stat-card">
              <span className="stat-label">Total Assets</span>
              <div className="stat-value">4</div>
              <span className="stat-detail">3 stablecoins</span>
            </div>
            <div className="summary-stat-card">
              <span className="stat-label">Largest Holding</span>
              <div className="stat-value">hUSD</div>
              <span className="stat-detail">$2,500 (30.3%)</span>
            </div>
          </div>

          <div className="asset-distribution">
            <h3>Portfolio Distribution</h3>
            <h4 className="portfolio-group-label">Stablecoins</h4>
            {assets.map((a, i) => (
              <article className="portfolio-asset-row" key={i}>
                <header className="portfolio-asset-row-head">
                  <span className="distribution-icon" aria-hidden="true" style={a.glyph ? { fontSize: "0.9rem", fontWeight: 700, color: "var(--brand-deep-blue)" } : null}>{a.icon || a.glyph}</span>
                  <div className="portfolio-asset-row-identity">
                    <div className="portfolio-asset-row-name">{a.sym}</div>
                    <div className="portfolio-asset-row-fullname">{a.full}</div>
                  </div>
                  <div className="portfolio-asset-row-numbers">
                    <div className="balance-amount">{a.bal}</div>
                    <div className="portfolio-asset-row-fiat">{a.fiat}</div>
                  </div>
                  <span className="balance-change positive">{UI.caretUp}{a.change}</span>
                </header>
                <div className="distribution-bar" role="img" aria-label={a.sym + " — " + a.pct + " of portfolio"}>
                  <div className={"distribution-bar-fill " + a.fill} style={{ width: a.pct }}>{a.pct}</div>
                </div>
                {assetActions(a.sym)}
              </article>
            ))}
            <button type="button" className="load-more-btn">See more{UI.chevron}</button>
          </div>
        </div>

        <div className="quick-actions" role="group" aria-label="Wallet actions">
          <button className="action-btn primary" onClick={() => onNav("send")}><span className="action-btn-icon">{UI.buy}</span><span>Buy Stablecoins</span></button>
          <button className="action-btn" onClick={() => onNav("send")}><span className="action-btn-icon">{UI.exchange}</span><span>Exchange</span></button>
          <button className="action-btn" onClick={() => onNav("send")}><span className="action-btn-icon">{UI.send}</span><span>Send</span></button>
          <button className="action-btn" onClick={() => onNav("send")}><span className="action-btn-icon">{UI.stake}</span><span>Stake</span></button>
        </div>
      </section>

      <section id="transaction-history" className="history-section">
        <div className="card-header">
          <h3 className="card-title">Activity</h3>
          <p className="card-subtitle">All wallet activity — on-chain transfers and off-chain payments</p>
        </div>
        <div className="transaction-list">
          {txns.map((group, gi) => (
            <React.Fragment key={gi}>
              <div className="date-header">{group.date}</div>
              {group.items.map((t, i) => (
                <div className="transaction-item" key={i} role="button" tabIndex={0}>
                  <div className={"transaction-icon " + t.type} aria-hidden="true">{t.icon}</div>
                  <div className="transaction-details">
                    <div className="transaction-title">{t.title}</div>
                    <div className="transaction-meta">
                      <span>{t.time}</span><span aria-hidden="true">•</span>
                      <span className={"transaction-status " + t.status}>{t.status === "completed" ? "Completed" : "Pending"}</span>
                      <span aria-hidden="true">•</span>
                      <span className={"activity-rail-badge activity-rail-badge--" + t.rail}>{t.rail === "chain" ? "On-chain" : "Off-chain"}</span>
                      <span aria-hidden="true">•</span><span>{t.token}</span>
                    </div>
                  </div>
                  <div className="transaction-amount">
                    <div className={"amount-primary " + t.amtCls}>{t.amt}</div>
                    <div className="amount-secondary">{t.sub}</div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ─── Notifications ─────────────────────────────────────────────── */
function Notifications({ onNav }) {
  const UI = window.UI;
  const groups = [
    { title: "New", items: [
      { cat: "transaction", icon: UI.received, title: "Transaction Confirmed", msg: "Sent 12.5 USDC — confirmed on Ethereum", time: "2 minutes ago", cta: "View transaction", unread: true },
      { cat: "listing", icon: UI.explore, title: "New Listing Available", msg: "Lot 7B at Conscious Landbank is now open", time: "1 hour ago", unread: true },
      { cat: "donation", icon: UI.heart, title: "Donation Receipt Ready", msg: "Your $100 donation to Nairobi Hope Center has been processed", time: "5 hours ago", cta: "View receipt", unread: true },
    ]},
    { title: "Earlier", items: [
      { cat: "system", icon: UI.warn, title: "Security Notice", msg: "New device login detected for your account", time: "Yesterday", cta: "View activity" },
      { cat: "remittance", icon: UI.send, title: "Remittance Sent", msg: "You sent 50 hUSD to 0x742d...4a23 — confirmed", time: "2 days ago", cta: "View transaction" },
      { cat: "verification", icon: UI.verified, title: "KYC Verified", msg: "Your identity verification has been completed successfully", time: "2 days ago", cta: "View status" },
    ]},
  ];
  return (
    <div className="app-main">
      <header className="page-header">
        <h1 className="page-title">Notifications</h1>
        <p className="page-subtitle">Transactions, donations, listings, and account activity — all in one place.</p>
      </header>
      <div className="section-header" style={{ marginBottom: "1rem" }}>
        <span style={{ fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.875rem" }}>3 unread</span>
        <div className="notif-page-actions">
          <button className="btn btn-secondary" style={{ minHeight: "36px", padding: "0 0.875rem", fontSize: "0.8125rem" }}>Mark all read</button>
        </div>
      </div>
      <div className="notif-page-card">
        {groups.map((g, gi) => (
          <React.Fragment key={gi}>
            <div className="notif-group-title">{g.title}</div>
            {g.items.map((n, i) => (
              <div className={"notif-page-item" + (n.unread ? " unread" : "")} key={i}>
                <div className={"notif-cat-icon " + n.cat}>{n.icon}</div>
                <div className="notif-page-body">
                  <span className="notif-cat-badge">{n.cat}</span>
                  <div className="notif-page-title">{n.title}</div>
                  <div className="notif-page-msg">{n.msg}</div>
                  <div className="notif-page-time">{n.time}</div>
                  {n.cta && <a className="notif-page-cta" onClick={() => onNav(n.cat === "donation" ? "centers" : "wallet")}>{n.cta}{UI.arrowRightUp}</a>}
                </div>
                {n.unread && <span className="notif-unread-dot" aria-label="Unread"></span>}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ─── Centers ───────────────────────────────────────────────────── */
function Centers({ onNav }) {
  const UI = window.UI;
  const centers = [
    { img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80", cat: "Education · Nairobi", name: "Nairobi Hope Center", desc: "Schooling, meals and mentorship for 600 children across Kibera.", raised: 82, goal: "$120k" },
    { img: "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=800&q=80", cat: "Education · Mumbai", name: "Mumbai Education Hub", desc: "Digital literacy and after-school tutoring for first-generation learners.", raised: 64, goal: "$90k" },
    { img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80", cat: "Health · São Paulo", name: "São Paulo Health Center", desc: "Primary care and maternal health for the Capão Redondo community.", raised: 47, goal: "$150k" },
  ];
  return (
    <div className="app-main">
      <header className="page-header">
        <h1 className="page-title">Humanity Centers</h1>
        <p className="page-subtitle">Choose where your value lands. Every donation is tracked on-chain, end to end.</p>
      </header>
      <div className="centres-grid">
        {centers.map((c, i) => (
          <div className="centre-card" key={i}>
            <div className="centre-image">
              <img src={c.img} alt={c.name} />
              <span className="centre-badge">{UI.verified} Verified</span>
            </div>
            <div className="centre-content">
              <div className="centre-cat">{c.cat}</div>
              <div className="centre-name">{c.name}</div>
              <p className="centre-desc">{c.desc}</p>
              <div className="centre-progress"><div className="centre-progress-fill" style={{ width: c.raised + "%" }}></div></div>
              <div className="centre-progress-meta"><span><b>{c.raised}%</b> funded</span><span>Goal {c.goal}</span></div>
              <button className="btn btn-primary btn-block" onClick={() => onNav("send")}>{UI.heart} Donate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Send flow (stepper) ───────────────────────────────────────── */
function SendFlow({ onNav }) {
  const UI = window.UI;
  const steps = ["Amount", "Recipient", "Review", "Done"];
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState("250.00");
  const [addr, setAddr] = useState("0x91a4f2c7b8e3d6a90f1c2b4e5d8a7c91b4c20000");
  const last = steps.length - 1;
  const pct = (step / last) * 100;

  return (
    <div className="app-main">
      <header className="page-header"><h1 className="page-title">Send Tokens</h1></header>
      <div className="stepper">
        <div className="stepper-progress" style={{ width: "calc(" + pct + "% )" }}></div>
        {steps.map((s, i) => {
          const state = i < step ? "done" : i === step ? "active" : "";
          return (
            <div className={"step " + state} key={i}>
              <div className="step-circle">{i < step ? UI.check : i + 1}</div>
              <div className="step-label">{s}</div>
            </div>
          );
        })}
      </div>

      {step === 0 && (
        <div className="flow-card">
          <div className="form-group">
            <label className="form-label">Amount to send</label>
            <div className="amount-input-wrap">
              <span className="ccy">$</span>
              <input className="form-input" value={amount} onChange={e => setAmount(e.target.value)} inputMode="decimal" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Token</label>
            <input className="form-input" defaultValue="hUSD · Balance 6,420.00" readOnly />
          </div>
          <div className="flow-nav">
            <button className="btn btn-secondary" onClick={() => onNav("wallet")}>Cancel</button>
            <button className="btn btn-primary" onClick={() => setStep(1)}>Continue</button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="flow-card">
          <div className="form-group">
            <label className="form-label">Recipient address</label>
            <input className="form-input" value={addr} onChange={e => setAddr(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Note (optional)</label>
            <input className="form-input" placeholder="What's this for?" />
          </div>
          <div className="flow-nav">
            <button className="btn btn-secondary" onClick={() => setStep(0)}>Back</button>
            <button className="btn btn-primary" onClick={() => setStep(2)}>Review</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flow-card">
          <div className="review-row"><span className="k">You send</span><span className="v">${amount} hUSD</span></div>
          <div className="review-row"><span className="k">To</span><span className="v">0x91a…0000</span></div>
          <div className="review-row"><span className="k">Network</span><span className="v">Ethereum</span></div>
          <div className="review-row"><span className="k">Network fee</span><span className="v">~$1.20</span></div>
          <div className="review-row"><span className="k">They receive</span><span className="v" style={{ color: "var(--fin-up)" }}>${amount} hUSD</span></div>
          <div className="warn-callout">{UI.warn}<span>On-chain transfers are irreversible. Double-check the recipient address before sending.</span></div>
          <div className="flow-nav">
            <button className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
            <button className="btn btn-primary" onClick={() => setStep(3)}>Confirm &amp; Send</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flow-card">
          <div className="success-wrap">
            <div className="success-hero">{UI.check}<span className="success-bolt">{UI.bolt}</span></div>
            <div className="success-title">Sent successfully</div>
            <div className="success-sub">${amount} hUSD is on its way.</div>
            <div className="success-details">
              <div className="review-row"><span className="k">Tx ID</span><span className="v">0x7f3…a91</span></div>
              <div className="review-row"><span className="k">Amount</span><span className="v">${amount} hUSD</span></div>
              <div className="review-row"><span className="k">Date</span><span className="v">Jun 12, 2026 · 14:08</span></div>
              <div className="review-row"><span className="k">Status</span><span className="v" style={{ color: "var(--fin-up)" }}>Completed</span></div>
            </div>
            <button className="btn btn-primary btn-block" onClick={() => onNav("wallet")}>Back to wallet</button>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Dashboard, Wallet, Centers, SendFlow, Notifications });
