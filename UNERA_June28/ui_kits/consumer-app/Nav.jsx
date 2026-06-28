/* UNERA consumer app — top nav (the product spine). */
function Nav({ active, onNav, connected, onConnect }) {
  const UI = window.UI;
  const [txOpen, setTxOpen] = React.useState(false);
  const link = (key, label) => (
    <li>
      <button className={"nav-link" + (active === key ? " active" : "")} onClick={() => onNav(key)}>{label}</button>
    </li>
  );
  return (
    <nav className="nav" aria-label="Main navigation">
      <div className="nav-left">
        <button className="nav-brand" onClick={() => onNav("dashboard")} aria-label="UNERA home">
          <img className="nav-logo-img" src="../../assets/logos/unera-white-text-nav.svg" alt="UNERA" />
        </button>
        <ul className="nav-links" role="list">
          {link("dashboard", "Dashboard")}
          {connected
            ? link("wallet", "Wallet")
            : <li><button className="nav-link" onClick={onConnect}>Connect</button></li>}
          <li className={"nav-dropdown" + (txOpen ? " open" : "")}
              onMouseEnter={() => setTxOpen(true)} onMouseLeave={() => setTxOpen(false)}>
            <button className={"nav-link" + (active === "send" ? " active" : "")} aria-haspopup="true" aria-expanded={txOpen}>
              Transact <span className="nav-chev">{UI.chevron}</span>
            </button>
            <ul className="nav-menu" role="menu">
              <li><a onClick={() => onNav("send")} role="menuitem">Add Tokens</a></li>
              <li><a onClick={() => onNav("send")} role="menuitem">Send Tokens</a></li>
              <li><a onClick={() => onNav("send")} role="menuitem">Stake</a></li>
              <li><a onClick={() => onNav("send")} role="menuitem">Exchange</a></li>
            </ul>
          </li>
          {link("centres", "Centres")}
        </ul>
      </div>
      <div className="nav-right">
        <button className="notif-bell" aria-label="Notifications, 3 unread" onClick={() => onNav("notifications")}>
          {UI.bell}<span className="notif-badge">3</span>
        </button>
        {connected && (
          <span className="wallet-pill">
            <span className="wp-avatar wp-avatar--blockie"><span className="wp-fox">🦊</span></span>
            <span className="wp-info"><span className="wp-addr">0x0822...7B75</span><span className="wp-bal">2,500.00 hUSD</span></span>
            <button className="wp-net"><span className="wp-dot"></span>Ethereum</button>
          </span>
        )}
      </div>
    </nav>
  );
}
window.Nav = Nav;
