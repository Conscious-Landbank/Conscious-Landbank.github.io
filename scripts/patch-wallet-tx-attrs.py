#!/usr/bin/env python3
"""Patch wallet-enhanced.html transaction rows with filter data attributes."""

path = "/Users/minhnguyenhoang/009 Conscious Landbank/Cursor/CLB/NewUnera/wallet-enhanced.html"
with open(path) as f:
    lines = f.readlines()

W1 = "0x742d35Cc6634C0532925a3b8D4C9D2a8f7b3a8f"
W2 = "0x8f3a2b1c9d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8"
BOB = "0x3b1c9d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a1"
JAMES = "0x9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d"
HUSD = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
USDC = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
ROUTER = "0x68b3465833fb72a70dcdca97e7219030dbab124"

# status, rail, category + filter attrs
TX_ATTRS = {
    "'tx001'": ("completed", "chain", "received", W2, "Alice Johnson", W1, "Jane Smith", "hUSD", HUSD, "transfer"),
    "'tx002'": ("completed", "chain", "donation", W2, "Jane Smith", "nairobi-humanity-centre", "Nairobi Humanity Centre", "hUSD", HUSD, "transfer"),
    "'tx003'": ("pending", "fiat", "fiat-in", "interac", "Interac", W1, "Jane Smith", "hUSD", "", "interac_deposit"),
    "'tx003a'": ("pending", "chain", "transfer", W1, "Jane Smith", W2, "Alice Johnson", "hUSD", HUSD, "transfer"),
    "'tx003b'": ("failed", "chain", "transfer", W1, "Jane Smith", BOB, "Bob Chen", "hUSD", HUSD, "transfer"),
    "'tx003c'": ("failed", "fiat", "fiat-in", "interac", "Interac", W1, "Jane Smith", "hUSD", "", "interac_deposit"),
    "'tx004'": ("completed", "chain", "yield", "system", "UNERA Protocol", W1, "Jane Smith", "hUSD", HUSD, "claim"),
    "'tx005'": ("completed", "chain", "transfer", W1, "Jane Smith", BOB, "Bob Chen", "hUSD", HUSD, "transfer"),
    "'tx006'": ("completed", "chain", "conversion", W2, "Jane Smith", ROUTER, "Uniswap Router", "USDC", USDC, "swap"),
    "'tx007'": ("completed", "chain", "donation", W1, "Jane Smith", "toronto-humanity-centre", "Toronto Humanity Centre", "hUSD", HUSD, "transfer"),
    "'tx008'": ("completed", "fiat", "fiat-in", "stripe", "Stripe", W1, "Jane Smith", "hUSD", "", "interac_deposit"),
    "'tx009'": ("completed", "chain", "reward", "system", "UNERA Referral", W2, "Jane Smith", "USDT", USDT, "claim"),
    "'tx010'": ("completed", "fiat", "fiat-in", "interac", "Maria Garcia", W1, "Jane Smith", "hUSD", "", "interac_deposit"),
    "'tx011'": ("completed", "chain", "transfer", W1, "Jane Smith", JAMES, "James Okoye", "hUSD", HUSD, "transfer"),
    "'tx012'": ("completed", "chain", "yield", "system", "UNERA Staking", W2, "Jane Smith", "hUSD", HUSD, "claim"),
    "'tx013'": ("completed", "chain", "donation", W1, "Jane Smith", "lagos-water-project", "Lagos Water Project", "hUSD", HUSD, "transfer"),
    "'tx014'": ("completed", "chain", "conversion", W2, "Jane Smith", ROUTER, "Uniswap Router", "USDC", USDC, "swap"),
    "'tx015'": ("completed", "fiat", "fiat-in", "interac", "Bank EFT", W1, "Jane Smith", "hUSD", "", "interac_deposit"),
}

FILTER_ATTR_TEMPLATE = '''                         data-sender="{sender}"
                         data-sender-name="{sender_name}"
                         data-recipient="{recipient}"
                         data-recipient-name="{recipient_name}"
                         data-token-symbol="{token_symbol}"
                         data-token-address="{token_address}"
                         data-action="{action}"'''

out = []
i = 0
while i < len(lines):
    line = lines[i]
    out.append(line)
    if "showTransactionDetail(" in line:
        for tx_key, attrs in TX_ATTRS.items():
            if tx_key in line:
                status, rail, cat, sender, sender_name, recipient, recipient_name, token_symbol, token_address, action = attrs
                j = len(out) - 1
                while j >= 0 and "data-wallet=" not in out[j]:
                    j -= 1
                if j >= 0:
                    block = "".join(out[max(0, j - 8): j + 6])
                    if "data-status=" not in block:
                        indent = "                         "
                        out[j + 1:j + 1] = [
                            f'{indent}data-status="{status}"\n',
                            f'{indent}data-rail="{rail}"\n',
                            f'{indent}data-category="{cat}"\n',
                            FILTER_ATTR_TEMPLATE.format(
                                sender=sender, sender_name=sender_name, recipient=recipient,
                                recipient_name=recipient_name, token_symbol=token_symbol,
                                token_address=token_address, action=action
                            ) + "\n",
                        ]
                break
    i += 1

content = "".join(out)
with open(path, "w") as f:
    f.write(content)
print("data-action count:", content.count("data-action="))
