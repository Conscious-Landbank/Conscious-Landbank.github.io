#!/usr/bin/env python3
path = "/Users/minhnguyenhoang/009 Conscious Landbank/Cursor/CLB/NewUnera/wallet-enhanced.html"
with open(path) as f:
    lines = f.readlines()

mappings = {
    "'tx001'": ("completed", "chain", "received"),
    "'tx002'": ("completed", "chain", "donation"),
    "'tx003'": ("pending", "fiat", "fiat-in"),
    "'tx004'": ("completed", "chain", "yield"),
    "'tx005'": ("completed", "chain", "transfer"),
    "'tx006'": ("completed", "chain", "conversion"),
    "'tx007'": ("completed", "chain", "donation"),
    "'tx008'": ("completed", "fiat", "fiat-in"),
    "'tx009'": ("completed", "chain", "reward"),
    "'tx010'": ("completed", "fiat", "fiat-in"),
    "'tx011'": ("completed", "chain", "transfer"),
    "'tx012'": ("completed", "chain", "yield"),
    "'tx013'": ("completed", "chain", "donation"),
    "'tx014'": ("completed", "chain", "conversion"),
    "'tx015'": ("completed", "fiat", "fiat-in"),
}

out = []
for line in lines:
    out.append(line)
    if "showTransactionDetail(" in line:
        for tx_key, (status, rail, cat) in mappings.items():
            if tx_key in line:
                j = len(out) - 1
                while j >= 0 and "data-wallet=" not in out[j]:
                    j -= 1
                if j >= 0:
                    block = "".join(out[max(0, j - 5): j + 4])
                    if "data-status=" not in block:
                        indent = "                         "
                        out[j + 1:j + 1] = [
                            f'{indent}data-status="{status}"\n',
                            f'{indent}data-rail="{rail}"\n',
                            f'{indent}data-category="{cat}"\n',
                        ]
                break

content = "".join(out)

new_rows = """
                    <!-- Transaction 3a: Pending Web3 Send -->
                    <div class="transaction-item"
                         data-tx-date="2026-06-06"
                         data-network="8453"
                         data-wallet="0x742d35Cc6634C0532925a3b8D4C9D2a8f7b3a8f"
                         data-status="pending"
                         data-rail="chain"
                         data-category="transfer"
                         onclick="showTransactionDetail('tx003a')"
                         role="button"
                         tabindex="0"
                         aria-label="Pending send of $120.00 to Alice Johnson">
                        <div class="transaction-icon pending" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg></div>
                        <div class="transaction-details">
                            <div class="transaction-title">Send to Alice Johnson — Confirming</div>
                            <div class="transaction-meta">
                                <span>08:30 AM</span>
                                <span aria-hidden="true">•</span>
                                <span class="transaction-status pending" role="status">Pending</span>
                                <span aria-hidden="true">•</span>
                                <span class="activity-rail-badge activity-rail-badge--chain">On-chain</span>
                                <span aria-hidden="true">•</span>
                                <span>hUSD</span>
                            </div>
                        </div>
                        <div class="transaction-amount">
                            <div class="amount-primary negative">- $120.00</div>
                            <div class="amount-secondary">Awaiting confirmation</div>
                        </div>
                    </div>

                    <!-- Transaction 3b: Failed Web3 Send -->
                    <div class="transaction-item"
                         data-tx-date="2026-06-06"
                         data-network="8453"
                         data-wallet="0x742d35Cc6634C0532925a3b8D4C9D2a8f7b3a8f"
                         data-status="failed"
                         data-rail="chain"
                         data-category="transfer"
                         onclick="showTransactionDetail('tx003b')"
                         role="button"
                         tabindex="0"
                         aria-label="Failed send of $85.00 to Bob Chen">
                        <div class="transaction-icon out" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg></div>
                        <div class="transaction-details">
                            <div class="transaction-title">Send to Bob Chen — Failed</div>
                            <div class="transaction-meta">
                                <span>08:15 AM</span>
                                <span aria-hidden="true">•</span>
                                <span class="transaction-status failed" role="status">Failed</span>
                                <span aria-hidden="true">•</span>
                                <span class="activity-rail-badge activity-rail-badge--chain">On-chain</span>
                                <span aria-hidden="true">•</span>
                                <span>hUSD</span>
                            </div>
                        </div>
                        <div class="transaction-amount">
                            <div class="amount-primary negative">- $85.00</div>
                            <div class="amount-secondary">Transaction reverted</div>
                        </div>
                    </div>

                    <!-- Transaction 3c: Failed Interac -->
                    <div class="transaction-item"
                         data-tx-date="2026-06-06"
                         data-network="1"
                         data-wallet="0x742d35Cc6634C0532925a3b8D4C9D2a8f7b3a8f"
                         data-status="failed"
                         data-rail="fiat"
                         data-category="fiat-in"
                         onclick="showTransactionDetail('tx003c')"
                         role="button"
                         tabindex="0"
                         aria-label="Failed Interac e-Transfer of $400.00">
                        <div class="transaction-icon in" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280 320-200v-80L480-520 160-720v80l320 200Zm0-80Z"/></svg></div>
                        <div class="transaction-details">
                            <div class="transaction-title">Interac e-Transfer — Failed</div>
                            <div class="transaction-meta">
                                <span>07:50 AM</span>
                                <span aria-hidden="true">•</span>
                                <span class="transaction-status failed" role="status">Failed</span>
                                <span aria-hidden="true">•</span>
                                <span class="activity-rail-badge activity-rail-badge--fiat">Off-chain</span>
                                <span aria-hidden="true">•</span>
                                <span>hUSD</span>
                            </div>
                        </div>
                        <div class="transaction-amount">
                            <div class="amount-primary positive">+ $400.00</div>
                            <div class="amount-secondary">Payment declined</div>
                        </div>
                    </div>

"""

marker = "                    <!-- Transaction 4: Yield Earned -->"
if "tx003a" not in content:
    content = content.replace(marker, new_rows + marker, 1)

with open(path, "w") as f:
    f.write(content)
print("data-status count:", content.count("data-status="))
