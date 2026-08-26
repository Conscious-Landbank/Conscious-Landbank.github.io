# Transcript chi tiết — Feedback: Send / Add / Trade / Buy / Filters / Transactions

**Video:** `Feedback-send-add-trade-buy-Filters-transactions.mp4`  
**Ngày:** 20 Jun 2026 · Slack Huddle "Huddle with Eric" (~15:02–15:24)  
**Người tham gia:** **Eric** (screen share, trình bày spec + reference apps) · **Renol / Minh Nguyen Hoang**  
**Thời lượng:** 22:49  

---

## Phần 1 — Transcript walkthrough (verified từ video + màn hình)

> Nội dung dưới đây **xác minh trực tiếp từ video** (frame capture mỗi 30–60 giây). Đây là bản ghi chi tiết nhất về **Eric demo gì, màn hình nào, spec nào** — dùng làm source of truth cho implement.

### [00:00 → 00:02] Eric / Renol (Minh) — Mở đầu

Slack Huddle "Huddle with Eric" bắt đầu. Camera Minh Nguyen Hoang hiện profile/video; Eric chưa share màn hình. Thiết lập cuộc gọi trước khi Eric bắt đầu walkthrough Token Management.

### [02:30 → 04:00] Eric — Send Token — MetaMask reference

Eric share Chrome → **MetaMask Portfolio** (`app.metamask.io/transfer?tab=send`). Tab **Send** active. Form: **Send from** (wallet `0xeD0D…21B14D`), **Send to** (placeholder public address/ENS), **Asset** (Select Asset), **Amount** (0.00), nút **Send** disabled. Eric dùng MetaMask Send làm reference UX cho UNERA **5.2 Send Token** — 1 wallet prompt, user chọn asset + amount + recipient.

### [04:00 → 05:00] Eric — Send Token — UNERA prototype

Chuyển sang **`NewUnera/send-enhanced.html`** — **Send Tokens**, subtitle "Send stablecoins to an external wallet address." Stepper: **Recipient** (active) → Amount → Confirm → Success. Recipient: chọn **Select from Contacts** (checked), search contacts, contact **Alice** (Friend — monthly split). Wallet header: `0x7426…3a8f`, balance **230.00 USDT** on Base. Eric so sánh UNERA send flow với MetaMask — stepper + contact book là điểm khác biệt UNERA.

### [05:00 → 06:00] Eric — Send (MetaMask) + Swap (Uniswap) reference

Quay lại MetaMask Send (asset chưa chọn). Sau đó mở **`app.uniswap.org/swap`**: Sell **1.0013124 ETH** (~$1,726) → Buy **1725.59 USDC**. Nút **"Not enough ETH"** (thiếu gas/balance). Network warning popup. Reference cho UNERA **5.3 Swap** — sell/buy pair, allowance flow, user trả gas Phase 1.

### [06:30 → 08:00] Eric — Confluence — Token Management (Gas & Wallet)

Confluence **UNERA - Token Management** (`Conscious Landbank Product Development`). **§3.4 Fee Structure:** Gas Fee Phase 1 — user trả gas qua wallet, platform không markup; preview gas native + fiat. Phase 2 — EIP-3009, platform absorb gas. **§3.5 Wallet Interaction Summary:** bảng Phase 1 vs Phase 2 cho Buy hUSD, Send Token, Swap. Sidebar: Token Swap, Payee Address Management, Wallet Dashboard, Transaction History.

### [08:00 → 09:30] Eric — Buy — MetaMask (MoonPay / Connect)

MetaMask **Buy** (`app.metamask.io/buy/build-quote`). Region **Vietnam**, currency **VND**. Amount **₫1,315,620** → **Ethereum** Mainnet. Payment: Debit/Credit. Recommended quote **MoonPay** — 0.026136 ETH for ~₫1,185,803 → **Continue with MoonPay**. Màn khác: nút **Connect MetaMask**. Reference cho **5.1 Buy hUSD via Fiat**.

### [10:00 → 11:30] Eric — Buy — MetaMask (MUSD / Mercuryo)

MetaMask Buy — amount ₫1,315,620. Asset đổi sang **MetaMask USD (MUSD)**. Quote **Mercuryo** (BEST RATE) — 46.924291 MUSD for ₫1,234,222. → **Continue with Mercuryo**. Eric minh họa chọn asset stablecoin + provider quote flow.

### [11:30 → 12:30] Eric — Buy — Coinbase

**Coinbase Trade** (`coinbase.com/trade`) dark mode. Buy widget: **1,000 VND**, Pay with **Bitcoin**, Buy **Ethereum** → **Review order**. Crypto list: BTC, ETH, SOL, XRP, BNB với giá VND. Reference thêm cho fiat on-ramp UX.

### [12:30 → 13:30] Eric — Buy — MetaMask Banxa (10M VND)

MetaMask Buy — amount **₫10,000,000** → **MUSD on Linea**. Quote **Banxa** (BEST RATE) — 357.49 MUSD for ₫9,402,849 → **Continue with Banxa**. Eric demo amount lớn + network Linea + third-party provider selection.

### [13:30 → 14:30] Eric — Coinbase Perpetual (edge case)

Coinbase **BTC Perpetual** (`coinbase.com/explore-derivatives/BTC-PERP-INTX`). Buy widget: **0 VND**, lỗi đỏ **"Converting is temporarily unavailable"**. Eric có thể note edge case / unavailable state cho Buy flow.

### [14:30 → 16:00] Eric — Trade — Binance Spot

**Binance** BTC/USDT Spot (`binance.com/en/trade/BTC_USDT?type=spot`). Chart candlestick, order book (~63,558 USDT), form **Limit** — **Buy BTC** / **Sell BTC** price ~63,792. Market Trades panel, Top Movers. Reference cho **5.4 Trade — Mini-CEX Order Book**.

### [16:30 → 18:30] Eric — Confluence §5 + Key Rules

Confluence **§5 UNERA Platform Transactions** (highlighted): **5.1** Buy hUSD via Fiat · **5.2** Send Token · **5.3** Swap · **5.4** Trade Mini-CEX. Mỗi mục: Requirements, User Flow, Transaction Preview, UX Notes. Scroll **§1.3 Out of Scope**, **§1.4 Key Rules** (FE không gọi RPC, wallet verified, copy Purchase/Sell not mint/burn), **§2 Wallet Connection** (MetaMask, WalletConnect, Coinbase Wallet; inline connect prompt).

### [18:30 → 19:30] Eric — Slack — Transaction History Filter taxonomy

Slack **`#collab-engineers`** — message **Thanh Son Le** định nghĩa 5 categories cho aggregator filter: 1) **Approval Action** — SC approvals; 2) **Transfer** — user==from; 3) **Receive** — user==to; 4) **Deposit** — Bank Transfer Fiat + OTC; 5) **Pool Exchange** — bundled Approval+Swap same hash. Attachment: mockup checkbox — Approval, Exchange, Transfer, Receive, Deposit/Withdraw, Rewards.

### [19:30 → 20:30] Eric — UNERA Wallet — Activity & Filters (live demo)

**`NewUnera/wallet-enhanced.html`** — nav WALLET active. Quick actions: **Buy Stablecoins** (highlighted), Exchange, Send, Stake. **Activity:** search "Search activity…", nút **Filters**, tabs All Wallets + addresses, chips Successful/All/Pending/Failed. Rows TODAY: Received Alice +$500 ON-CHAIN hUSD; Donation Nairobi -$250 ON-CHAIN. Eric demo filter UX trên wallet thật.

### [20:30 → 21:30] Eric / Renol — Jira FE-126

Jira **FE-126** modal: "UI/UX - Refine UI/UX of Token Management features." Status **READY**, Priority **High**, Reporter **Eric**, Assignee **Minh**, Parent FE-86, Sprint FE Sprint 2, link Confluence UNERA Token Management.

### [21:30 → 22:30] Eric — FE Scrum board overview

FE Scrum board — tickets liên quan: FE-88 Send Token (Ready), FE-126/127 In Progress (Token Mgmt / Tx History), FE-131 Persist filters, FE-140 Filter page, FE-98/130 backlog.

### [22:30 → 22:49] Eric — Trade architecture (ChatGPT note)

Chrome tab **ChatGPT** — note tiếng Việt về kiến trúc Trade: order ký off-chain, settlement on-chain, cần smart contract escrow; OpenDAX + Market Maker → User Wallet + Deposit → UNERA Exchange Wallet.

---

## Phần 2 — Transcript audio word-by-word (Vosk STT)

> **Cảnh báo chất lượng:** Model offline `vosk-model-small-vn-0.4` **không đủ chính xác** cho audio Slack Huddle (tiếng Việt + English technical terms + nén audio). Nhiều câu below **không phản ánh đúng lời thoại thực**. Dùng **Phần 1** làm nguồn chính; Phần 2 giữ timestamp + word timing tham khảo. Để có transcript chính xác word-by-word: re-run với **OpenAI Whisper** (`OPENAI_API_KEY` + `transcribe_whisper.py` trong `_transcript_work/`).

*153 đoạn · 2988 từ · nguồn: vosk-model-small-vn-0.4*

#### [00:17 → 00:18]
**Lời thoại (STT):** hộ shop
**Word-by-word:** `00:17` hộ · `00:17` shop

#### [00:19 → 00:19]
**Lời thoại (STT):** doanh
**Word-by-word:** `00:19` doanh

#### [01:08 → 01:22]
**Lời thoại (STT):** có thật rất khó trách móc cho hết xem đặt trước cho bài học ở nơi chưa có bao giờ con đã đặt trong đó có sức vất có chợt quên hành lang rồi đến lúc oanh
**Word-by-word:** `01:08` có · `01:08` thật · `01:09` rất · `01:09` khó · `01:10` trách · `01:10` móc · `01:11` cho · `01:11` hết · `01:12` xem · `01:12` đặt · `01:13` trước · `01:13` cho · `01:13` bài · `01:13` học · `01:14` ở · `01:14` nơi · `01:14` chưa · `01:14` có · `01:15` bao · `01:15` giờ · `01:15` con · `01:16` đã · `01:16` đặt · `01:16` trong · `01:16` đó · `01:17` có · `01:17` sức · `01:19` vất · `01:19` có · `01:19` chợt · `01:19` quên · `01:20` hành · `01:20` lang · `01:21` rồi · `01:21` đến · `01:22` lúc · `01:22` oanh

#### [01:25 → 01:28]
**Lời thoại (STT):** ở bên khả năng sống thịt đỏ thịt động vật
**Word-by-word:** `01:25` ở · `01:25` bên · `01:25` khả · `01:25` năng · `01:25` sống · `01:26` thịt · `01:26` đỏ · `01:26` thịt · `01:27` động · `01:28` vật

#### [01:29 → 01:34]
**Lời thoại (STT):** sẽ có quốc cho sống của cây lá binh mỹ tâm mát luôn hé
**Word-by-word:** `01:29` sẽ · `01:30` có · `01:30` quốc · `01:31` cho · `01:31` sống · `01:32` của · `01:32` cây · `01:33` lá · `01:33` binh · `01:33` mỹ · `01:33` tâm · `01:33` mát · `01:34` luôn · `01:34` hé

#### [01:37 → 01:50]
**Lời thoại (STT):** và tạp chất quê bắc ninh bến tre tích tích lâm mê mình đen chi yeu minh dung kim nguyệt mà sinh ví dụ hay lên một mình đếm cơm mình sai lệch mi mà khi luật
**Word-by-word:** `01:37` và · `01:37` tạp · `01:37` chất · `01:38` quê · `01:38` bắc · `01:39` ninh · `01:39` bến · `01:40` tre · `01:40` tích · `01:41` tích · `01:41` lâm · `01:42` mê · `01:43` mình · `01:43` đen · `01:43` chi · `01:44` yeu · `01:44` minh · `01:44` dung · `01:44` kim · `01:45` nguyệt · `01:45` mà · `01:45` sinh · `01:45` ví · `01:45` dụ · `01:46` hay · `01:46` lên · `01:46` một · `01:46` mình · `01:47` đếm · `01:48` cơm · `01:48` mình · `01:48` sai · `01:49` lệch · `01:49` mi · `01:49` mà · `01:49` khi · `01:50` luật

#### [01:52 → 01:54]
**Lời thoại (STT):** đồ em
**Word-by-word:** `01:52` đồ · `01:53` em

#### [01:56 → 01:57]
**Lời thoại (STT):** ở
**Word-by-word:** `01:56` ở

#### [01:58 → 02:00]
**Lời thoại (STT):** họ ở séc
**Word-by-word:** `01:58` họ · `01:58` ở · `01:59` séc

#### [02:02 → 02:16]
**Lời thoại (STT):** dẹp độc đáo ở đây trường hợp tình hợp lộ ngực xếp mơ và tiếp khỏe rất lớn trong lúc xem các em đang thích chưa thực hiện ước mơ của vợ mất chồng đặt câu hỏi cực hot
**Word-by-word:** `02:02` dẹp · `02:02` độc · `02:02` đáo · `02:03` ở · `02:04` đây · `02:04` trường · `02:04` hợp · `02:04` tình · `02:05` hợp · `02:05` lộ · `02:06` ngực · `02:06` xếp · `02:07` mơ · `02:08` và · `02:09` tiếp · `02:09` khỏe · `02:09` rất · `02:09` lớn · `02:10` trong · `02:10` lúc · `02:10` xem · `02:10` các · `02:10` em · `02:10` đang · `02:11` thích · `02:11` chưa · `02:11` thực · `02:13` hiện · `02:13` ước · `02:13` mơ · `02:13` của · `02:13` vợ · `02:13` mất · `02:14` chồng · `02:14` đặt · `02:14` câu · `02:14` hỏi · `02:14` cực · `02:16` hot

#### [02:17 → 02:25]
**Lời thoại (STT):** rượu vang lên ta bơm tạp chất trên chỗ phù hoa
**Word-by-word:** `02:17` rượu · `02:18` vang · `02:18` lên · `02:19` ta · `02:19` bơm · `02:20` tạp · `02:20` chất · `02:21` trên · `02:22` chỗ · `02:22` phù · `02:24` hoa

#### [02:25 → 02:41]
**Lời thoại (STT):** cty triệt kích trụ sở ở trong công trình thì nó cũng sắp đi kèm như lúc hàng hay sao cô ở nêu ra mình cũng xa xa xem xóm né rồi xin sư xin phó khi cứ chọn các kê
**Word-by-word:** `02:25` cty · `02:26` triệt · `02:27` kích · `02:28` trụ · `02:28` sở · `02:29` ở · `02:30` trong · `02:30` công · `02:30` trình · `02:30` thì · `02:30` nó · `02:30` cũng · `02:31` sắp · `02:31` đi · `02:31` kèm · `02:31` như · `02:31` lúc · `02:32` hàng · `02:32` hay · `02:32` sao · `02:33` cô · `02:33` ở · `02:33` nêu · `02:34` ra · `02:34` mình · `02:34` cũng · `02:34` xa · `02:35` xa · `02:35` xem · `02:35` xóm · `02:36` né · `02:36` rồi · `02:36` xin · `02:37` sư · `02:37` xin · `02:37` phó · `02:38` khi · `02:38` cứ · `02:38` chọn · `02:38` các · `02:40` kê

#### [02:43 → 02:55]
**Lời thoại (STT):** ở chung dụng võ xanh rất đất ở các vụ bất đẳng thức trọng ở kết hợp học mũ mổ ốc tre lớp chuyên hiệu quả
**Word-by-word:** `02:43` ở · `02:44` chung · `02:44` dụng · `02:44` võ · `02:45` xanh · `02:45` rất · `02:46` đất · `02:46` ở · `02:47` các · `02:47` vụ · `02:48` bất · `02:49` đẳng · `02:50` thức · `02:50` trọng · `02:51` ở · `02:52` kết · `02:52` hợp · `02:52` học · `02:53` mũ · `02:53` mổ · `02:53` ốc · `02:54` tre · `02:54` lớp · `02:54` chuyên · `02:54` hiệu · `02:54` quả

#### [02:56 → 02:57]
**Lời thoại (STT):** ốp lưng
**Word-by-word:** `02:56` ốp · `02:56` lưng

#### [02:58 → 02:59]
**Lời thoại (STT):** tòa soạn
**Word-by-word:** `02:58` tòa · `02:59` soạn

#### [03:00 → 03:04]
**Lời thoại (STT):** đúng vậy của mình
**Word-by-word:** `03:00` đúng · `03:02` vậy · `03:02` của · `03:04` mình

#### [03:05 → 03:11]
**Lời thoại (STT):** diệp rất may cho nên mình khi dự lễ hôm rồi cho này em mình sẽ liên hệ mơ
**Word-by-word:** `03:05` diệp · `03:06` rất · `03:06` may · `03:06` cho · `03:06` nên · `03:07` mình · `03:07` khi · `03:07` dự · `03:07` lễ · `03:07` hôm · `03:07` rồi · `03:08` cho · `03:08` này · `03:08` em · `03:08` mình · `03:08` sẽ · `03:09` liên · `03:10` hệ · `03:10` mơ

#### [03:12 → 03:22]
**Lời thoại (STT):** thông qua cho này đã làm minh khoa hệ em ở kích và xanh hiển linh hệ cây in cứu cho đây luôn đặt trên mỗi người buồn đi kèm theo với khu vực
**Word-by-word:** `03:12` thông · `03:12` qua · `03:13` cho · `03:13` này · `03:13` đã · `03:13` làm · `03:13` minh · `03:13` khoa · `03:14` hệ · `03:14` em · `03:15` ở · `03:16` kích · `03:16` và · `03:16` xanh · `03:17` hiển · `03:17` linh · `03:17` hệ · `03:18` cây · `03:18` in · `03:18` cứu · `03:19` cho · `03:19` đây · `03:19` luôn · `03:19` đặt · `03:20` trên · `03:20` mỗi · `03:21` người · `03:21` buồn · `03:21` đi · `03:22` kèm · `03:22` theo · `03:22` với · `03:22` khu · `03:22` vực

#### [03:24 → 03:26]
**Lời thoại (STT):** bắt bớ của bạch có đang cần
**Word-by-word:** `03:24` bắt · `03:25` bớ · `03:25` của · `03:25` bạch · `03:25` có · `03:26` đang · `03:26` cần

#### [03:28 → 03:30]
**Lời thoại (STT):** bt khóc con số
**Word-by-word:** `03:28` bt · `03:28` khóc · `03:29` con · `03:29` số

#### [03:31 → 03:38]
**Lời thoại (STT):** bùng phát dữ dội rõ rõ đoạn lịch sự có đối sách rất với súp lơ đen ấy thật sự
**Word-by-word:** `03:31` bùng · `03:31` phát · `03:32` dữ · `03:32` dội · `03:32` rõ · `03:32` rõ · `03:33` đoạn · `03:33` lịch · `03:33` sự · `03:33` có · `03:34` đối · `03:34` sách · `03:34` rất · `03:35` với · `03:36` súp · `03:36` lơ · `03:36` đen · `03:37` ấy · `03:38` thật · `03:38` sự

#### [03:40 → 03:43]
**Lời thoại (STT):** hút có một rất sử dụng sống đó đây
**Word-by-word:** `03:40` hút · `03:40` có · `03:40` một · `03:40` rất · `03:41` sử · `03:41` dụng · `03:42` sống · `03:42` đó · `03:43` đây

#### [03:46 → 03:54]
**Lời thoại (STT):** xịt sữa bột chùm ảnh vợ anh muốn sách trọ có không rõ xuất xứ từ tế kết tội tày đình
**Word-by-word:** `03:46` xịt · `03:46` sữa · `03:46` bột · `03:46` chùm · `03:47` ảnh · `03:48` vợ · `03:49` anh · `03:49` muốn · `03:50` sách · `03:50` trọ · `03:50` có · `03:51` không · `03:51` rõ · `03:51` xuất · `03:51` xứ · `03:51` từ · `03:52` tế · `03:52` kết · `03:53` tội · `03:53` tày · `03:53` đình

#### [03:55 → 03:59]
**Lời thoại (STT):** ẩn khi có lớp tết ở góc đông bắc lúc mất em vứt xác động vật động
**Word-by-word:** `03:55` ẩn · `03:55` khi · `03:55` có · `03:56` lớp · `03:56` tết · `03:57` ở · `03:57` góc · `03:57` đông · `03:57` bắc · `03:57` lúc · `03:58` mất · `03:58` em · `03:58` vứt · `03:58` xác · `03:58` động · `03:59` vật · `03:59` động

#### [04:01 → 04:10]
**Lời thoại (STT):** nịnh nọt bài ca sao một ổ khóa học những cái đó chén rượu có kẻ đã chết
**Word-by-word:** `04:01` nịnh · `04:02` nọt · `04:03` bài · `04:03` ca · `04:03` sao · `04:04` một · `04:05` ổ · `04:06` khóa · `04:06` học · `04:06` những · `04:07` cái · `04:07` đó · `04:07` chén · `04:07` rượu · `04:07` có · `04:08` kẻ · `04:09` đã · `04:09` chết

#### [04:11 → 04:24]
**Lời thoại (STT):** mình ở lớp gió của kê ở để như sau giải trí đặt cuốn sách lô cấp cao cấp kết quả chữ đó bình dân yên trình mi max xùm chỉ định cư đất ở
**Word-by-word:** `04:11` mình · `04:12` ở · `04:13` lớp · `04:14` gió · `04:14` của · `04:14` kê · `04:15` ở · `04:15` để · `04:16` như · `04:16` sau · `04:16` giải · `04:16` trí · `04:16` đặt · `04:17` cuốn · `04:17` sách · `04:17` lô · `04:18` cấp · `04:18` cao · `04:18` cấp · `04:18` kết · `04:18` quả · `04:19` chữ · `04:19` đó · `04:19` bình · `04:20` dân · `04:20` yên · `04:20` trình · `04:20` mi · `04:21` max · `04:21` xùm · `04:21` chỉ · `04:22` định · `04:22` cư · `04:23` đất · `04:24` ở

#### [04:26 → 04:46]
**Lời thoại (STT):** chế linh duyên cớ sai ở đó thì ôm mọi người sẽ khỏe mạnh mà sự diệu linh nơi sau mình sẽ quay lại đây bệnh tiềm ẩn của hình vẽ ở đó ban và kéo xe bò sữa có bếp nấu ra mắt và kế rất sạch sẽ
**Word-by-word:** `04:26` chế · `04:27` linh · `04:27` duyên · `04:27` cớ · `04:28` sai · `04:28` ở · `04:28` đó · `04:28` thì · `04:29` ôm · `04:29` mọi · `04:30` người · `04:30` sẽ · `04:30` khỏe · `04:30` mạnh · `04:31` mà · `04:31` sự · `04:31` diệu · `04:31` linh · `04:32` nơi · `04:32` sau · `04:32` mình · `04:32` sẽ · `04:33` quay · `04:33` lại · `04:33` đây · `04:33` bệnh · `04:34` tiềm · `04:34` ẩn · `04:35` của · `04:35` hình · `04:37` vẽ · `04:38` ở · `04:38` đó · `04:39` ban · `04:39` và · `04:39` kéo · `04:39` xe · `04:40` bò · `04:40` sữa · `04:41` có · `04:42` bếp · `04:42` nấu · `04:42` ra · `04:43` mắt · `04:44` và · `04:44` kế · `04:45` rất · `04:45` sạch · `04:45` sẽ

#### [04:46 → 04:47]
**Lời thoại (STT):** lau c
**Word-by-word:** `04:46` lau · `04:47` c

#### [04:48 → 04:48]
**Lời thoại (STT):** định
**Word-by-word:** `04:48` định

#### [04:50 → 04:50]
**Lời thoại (STT):** hình nền
**Word-by-word:** `04:50` hình · `04:50` nền

#### [04:52 → 05:00]
**Lời thoại (STT):** lỗi tập gồm các phòng khám đã rơi vào việc sử dụng smartphone giá rẻ minh quốc đa ảnh của mình sẽ có thể
**Word-by-word:** `04:52` lỗi · `04:52` tập · `04:52` gồm · `04:52` các · `04:52` phòng · `04:53` khám · `04:53` đã · `04:53` rơi · `04:53` vào · `04:54` việc · `04:54` sử · `04:54` dụng · `04:54` smartphone · `04:55` giá · `04:55` rẻ · `04:56` minh · `04:57` quốc · `04:57` đa · `04:58` ảnh · `04:58` của · `04:59` mình · `04:59` sẽ · `04:59` có · `04:59` thể

#### [05:00 → 05:10]
**Lời thoại (STT):** ở cây kiểng bút cũng sẽ hay diễn tả hãy bước dậy một ở trên vết sẹo rỗ gì lá bài nghị luận khác là nó đích loạt các loại
**Word-by-word:** `05:00` ở · `05:00` cây · `05:00` kiểng · `05:00` bút · `05:01` cũng · `05:01` sẽ · `05:01` hay · `05:02` diễn · `05:03` tả · `05:03` hãy · `05:03` bước · `05:04` dậy · `05:04` một · `05:04` ở · `05:05` trên · `05:05` vết · `05:05` sẹo · `05:06` rỗ · `05:06` gì · `05:06` lá · `05:06` bài · `05:06` nghị · `05:07` luận · `05:07` khác · `05:07` là · `05:08` nó · `05:09` đích · `05:09` loạt · `05:09` các · `05:10` loại

#### [05:11 → 05:12]
**Lời thoại (STT):** ở ẩn
**Word-by-word:** `05:11` ở · `05:12` ẩn

#### [05:15 → 05:28]
**Lời thoại (STT):** tập thể ở khe tùy tiện giúp mình cũng sẽ ở mình có cách luộc các loại dung tích tới cái nóng viên khác nhau thì mình cũng sẽ cho sai lệch đổi nghĩa thần bí vào lớp một kể
**Word-by-word:** `05:15` tập · `05:15` thể · `05:15` ở · `05:15` khe · `05:16` tùy · `05:17` tiện · `05:18` giúp · `05:18` mình · `05:18` cũng · `05:19` sẽ · `05:20` ở · `05:21` mình · `05:21` có · `05:21` cách · `05:21` luộc · `05:22` các · `05:22` loại · `05:22` dung · `05:22` tích · `05:22` tới · `05:23` cái · `05:23` nóng · `05:23` viên · `05:23` khác · `05:23` nhau · `05:24` thì · `05:24` mình · `05:24` cũng · `05:24` sẽ · `05:24` cho · `05:25` sai · `05:25` lệch · `05:25` đổi · `05:26` nghĩa · `05:26` thần · `05:26` bí · `05:27` vào · `05:27` lớp · `05:27` một · `05:27` kể

#### [05:29 → 05:36]
**Lời thoại (STT):** ở đó có ràng buộc đội bóng sẽ có câu đó đất cho có ra và đối với bất luận
**Word-by-word:** `05:29` ở · `05:29` đó · `05:30` có · `05:30` ràng · `05:30` buộc · `05:31` đội · `05:31` bóng · `05:32` sẽ · `05:32` có · `05:32` câu · `05:33` đó · `05:33` đất · `05:33` cho · `05:34` có · `05:34` ra · `05:34` và · `05:35` đối · `05:35` với · `05:35` bất · `05:35` luận

#### [05:37 → 05:38]
**Lời thoại (STT):** tất chân ngã xuống đất
**Word-by-word:** `05:37` tất · `05:37` chân · `05:37` ngã · `05:38` xuống · `05:38` đất

#### [05:39 → 05:47]
**Lời thoại (STT):** hàng có gì quý giá cũng giống như cọp cái mất tính đã rõ ở sống cổ
**Word-by-word:** `05:39` hàng · `05:40` có · `05:40` gì · `05:40` quý · `05:40` giá · `05:41` cũng · `05:41` giống · `05:41` như · `05:41` cọp · `05:42` cái · `05:42` mất · `05:43` tính · `05:44` đã · `05:44` rõ · `05:45` ở · `05:45` sống · `05:46` cổ

#### [05:47 → 05:48]
**Lời thoại (STT):** mổ
**Word-by-word:** `05:47` mổ

#### [05:49 → 05:50]
**Lời thoại (STT):** đảo
**Word-by-word:** `05:49` đảo

#### [05:55 → 05:59]
**Lời thoại (STT):** xếp và rất ông phật có chức có đủ và bắc kinh sẽ có đầy
**Word-by-word:** `05:55` xếp · `05:56` và · `05:56` rất · `05:57` ông · `05:57` phật · `05:57` có · `05:57` chức · `05:57` có · `05:58` đủ · `05:58` và · `05:58` bắc · `05:58` kinh · `05:59` sẽ · `05:59` có · `05:59` đầy

#### [06:00 → 06:20]
**Lời thoại (STT):** hỏi chặt lo mất dép tít tít lên cấp trên hay nếu đem ra đấu rất tốt nhất cho bạn nó tin đồn có địch vào mục đích là trì lắp đặt tận tít tận tình và sự chỉ đạo đôn đốc tôi như sụp mí sụp hình tin lợn bằng chân sản giật tít đã tải một bức tranh sơn mài báo độ tin sức khỏe
**Word-by-word:** `06:00` hỏi · `06:00` chặt · `06:00` lo · `06:01` mất · `06:01` dép · `06:02` tít · `06:02` tít · `06:02` lên · `06:02` cấp · `06:02` trên · `06:03` hay · `06:03` nếu · `06:03` đem · `06:03` ra · `06:04` đấu · `06:04` rất · `06:05` tốt · `06:05` nhất · `06:05` cho · `06:05` bạn · `06:06` nó · `06:06` tin · `06:06` đồn · `06:06` có · `06:07` địch · `06:07` vào · `06:08` mục · `06:08` đích · `06:08` là · `06:09` trì · `06:09` lắp · `06:09` đặt · `06:10` tận · `06:10` tít · `06:11` tận · `06:11` tình · `06:12` và · `06:12` sự · `06:12` chỉ · `06:12` đạo · `06:12` đôn · `06:13` đốc · `06:13` tôi · `06:13` như · `06:13` sụp · `06:14` mí · `06:14` sụp · `06:14` hình · `06:14` tin · `06:14` lợn · `06:15` bằng · `06:15` chân · `06:15` sản · `06:16` giật · `06:16` tít · `06:16` đã · `06:16` tải · `06:16` một · `06:16` bức · `06:17` tranh · `06:17` sơn · `06:17` mài · `06:17` báo · `06:17` độ · `06:18` tin · `06:19` sức · `06:19` khỏe

#### [06:21 → 06:27]
**Lời thoại (STT):** rõ ràng có vẻ bất cần một trai của vật nguồn cội gốc cách gấp hộp đình
**Word-by-word:** `06:21` rõ · `06:21` ràng · `06:22` có · `06:22` vẻ · `06:22` bất · `06:22` cần · `06:22` một · `06:23` trai · `06:24` của · `06:24` vật · `06:24` nguồn · `06:24` cội · `06:25` gốc · `06:25` cách · `06:25` gấp · `06:26` hộp · `06:26` đình

#### [06:29 → 06:34]
**Lời thoại (STT):** chiều đi ngay địa chỉ nào minh da cặp trình ký kinh lúc được
**Word-by-word:** `06:29` chiều · `06:29` đi · `06:30` ngay · `06:30` địa · `06:30` chỉ · `06:30` nào · `06:31` minh · `06:31` da · `06:32` cặp · `06:33` trình · `06:33` ký · `06:33` kinh · `06:34` lúc · `06:34` được

#### [06:37 → 06:52]
**Lời thoại (STT):** quá trình cũng giảm xuống còn gần đoạn rượu có đất đó cái tên của ba lá lớp em lo bồi đắp của trung quốc gia viên lớp và tử lúc đấy nữa chất lượng
**Word-by-word:** `06:37` quá · `06:37` trình · `06:38` cũng · `06:38` giảm · `06:38` xuống · `06:38` còn · `06:39` gần · `06:39` đoạn · `06:39` rượu · `06:40` có · `06:41` đất · `06:41` đó · `06:42` cái · `06:43` tên · `06:43` của · `06:43` ba · `06:43` lá · `06:44` lớp · `06:45` em · `06:45` lo · `06:47` bồi · `06:48` đắp · `06:48` của · `06:48` trung · `06:49` quốc · `06:49` gia · `06:49` viên · `06:49` lớp · `06:50` và · `06:50` tử · `06:50` lúc · `06:50` đấy · `06:50` nữa · `06:51` chất · `06:52` lượng

#### [06:54 → 06:55]
**Lời thoại (STT):** rốt cuộc muốn đến ít nhất
**Word-by-word:** `06:54` rốt · `06:54` cuộc · `06:54` muốn · `06:55` đến · `06:55` ít · `06:55` nhất

#### [06:58 → 06:59]
**Lời thoại (STT):** lức trên doanh đa cấp
**Word-by-word:** `06:58` lức · `06:58` trên · `06:59` doanh · `06:59` đa · `06:59` cấp

#### [07:00 → 07:02]
**Lời thoại (STT):** biết rõ bản cô bán rau kế hoạch
**Word-by-word:** `07:00` biết · `07:00` rõ · `07:00` bản · `07:01` cô · `07:01` bán · `07:01` rau · `07:01` kế · `07:01` hoạch

#### [07:02 → 07:11]
**Lời thoại (STT):** ngọt lắm ra áp bức ở trên là trục chế được lơ là việc đến chất xơ đức theo kế hoạch mang khi sinh ra sự
**Word-by-word:** `07:02` ngọt · `07:03` lắm · `07:03` ra · `07:04` áp · `07:04` bức · `07:05` ở · `07:05` trên · `07:05` là · `07:05` trục · `07:05` chế · `07:06` được · `07:07` lơ · `07:07` là · `07:07` việc · `07:07` đến · `07:08` chất · `07:08` xơ · `07:08` đức · `07:09` theo · `07:09` kế · `07:09` hoạch · `07:09` mang · `07:10` khi · `07:10` sinh · `07:11` ra · `07:11` sự

#### [07:13 → 07:15]
**Lời thoại (STT):** rùng rợn đen
**Word-by-word:** `07:13` rùng · `07:14` rợn · `07:14` đen

#### [07:23 → 07:24]
**Lời thoại (STT):** dựng
**Word-by-word:** `07:23` dựng

#### [07:25 → 07:28]
**Lời thoại (STT):** hoặc hỏi nhé cách dứt hết bây giờ mình với vật
**Word-by-word:** `07:25` hoặc · `07:26` hỏi · `07:26` nhé · `07:26` cách · `07:26` dứt · `07:27` hết · `07:27` bây · `07:27` giờ · `07:27` mình · `07:27` với · `07:28` vật

#### [07:30 → 07:31]
**Lời thoại (STT):** cơ sở thẩm thích
**Word-by-word:** `07:30` cơ · `07:30` sở · `07:31` thẩm · `07:31` thích

#### [07:34 → 07:42]
**Lời thoại (STT):** ở trên đất tổ gấp báo báo lướt qua đất chuyển sang đất ở bắc cạn rao vặt chụp tất cả che khuất gdđt công bố
**Word-by-word:** `07:34` ở · `07:34` trên · `07:34` đất · `07:34` tổ · `07:34` gấp · `07:35` báo · `07:36` báo · `07:37` lướt · `07:37` qua · `07:37` đất · `07:37` chuyển · `07:38` sang · `07:38` đất · `07:38` ở · `07:39` bắc · `07:39` cạn · `07:40` rao · `07:40` vặt · `07:40` chụp · `07:41` tất · `07:41` cả · `07:41` che · `07:41` khuất · `07:41` gdđt · `07:42` công · `07:42` bố

#### [07:44 → 07:59]
**Lời thoại (STT):** min ho hình nếu ông và đêm nay rồi làm xe một đã có lực hút nhiệt như lê minh luat su kêu quê cả trong cây lúa của mình hạc tiền thấy ở trên kê kê các a ta
**Word-by-word:** `07:44` min · `07:45` ho · `07:45` hình · `07:45` nếu · `07:46` ông · `07:46` và · `07:46` đêm · `07:47` nay · `07:47` rồi · `07:47` làm · `07:48` xe · `07:48` một · `07:48` đã · `07:49` có · `07:49` lực · `07:49` hút · `07:50` nhiệt · `07:50` như · `07:51` lê · `07:51` minh · `07:52` luat · `07:52` su · `07:52` kêu · `07:53` quê · `07:53` cả · `07:53` trong · `07:54` cây · `07:54` lúa · `07:54` của · `07:54` mình · `07:55` hạc · `07:56` tiền · `07:56` thấy · `07:56` ở · `07:56` trên · `07:57` kê · `07:58` kê · `07:59` các · `07:59` a · `07:59` ta

#### [08:00 → 08:03]
**Lời thoại (STT):** rõ của mình loan luan luan co kéo quê lạc rỗi đất
**Word-by-word:** `08:00` rõ · `08:00` của · `08:00` mình · `08:01` loan · `08:01` luan · `08:01` luan · `08:01` co · `08:02` kéo · `08:02` quê · `08:02` lạc · `08:02` rỗi · `08:02` đất

#### [08:04 → 08:04]
**Lời thoại (STT):** ở
**Word-by-word:** `08:04` ở

#### [08:06 → 08:16]
**Lời thoại (STT):** ở những đó đó nó âm đạo ở trán long nói có cách rất sợ cỏ cả đã cấp chúng rất rất lớn để các nốt đau nhức chân các khớp
**Word-by-word:** `08:06` ở · `08:07` những · `08:07` đó · `08:07` đó · `08:08` nó · `08:08` âm · `08:08` đạo · `08:09` ở · `08:09` trán · `08:10` long · `08:10` nói · `08:10` có · `08:10` cách · `08:10` rất · `08:11` sợ · `08:11` cỏ · `08:12` cả · `08:12` đã · `08:12` cấp · `08:12` chúng · `08:12` rất · `08:13` rất · `08:13` lớn · `08:13` để · `08:13` các · `08:14` nốt · `08:14` đau · `08:14` nhức · `08:15` chân · `08:15` các · `08:16` khớp

#### [08:17 → 08:37]
**Lời thoại (STT):** lên henry lớp sức có thể về ta vừa có tính lịch có bất tán huyện bến cát tinh tế ở nước ta khóc lóc ông đỗ đình hồ sơ vay on mắt trẻ thơ nhìn mà khi mê ở trong rạch xanh ninh khi minh như là chim mua kem của lịch khác nợ khi
**Word-by-word:** `08:17` lên · `08:17` henry · `08:18` lớp · `08:19` sức · `08:19` có · `08:19` thể · `08:20` về · `08:20` ta · `08:20` vừa · `08:21` có · `08:21` tính · `08:21` lịch · `08:22` có · `08:22` bất · `08:23` tán · `08:23` huyện · `08:23` bến · `08:24` cát · `08:24` tinh · `08:24` tế · `08:25` ở · `08:25` nước · `08:25` ta · `08:25` khóc · `08:26` lóc · `08:27` ông · `08:27` đỗ · `08:28` đình · `08:29` hồ · `08:29` sơ · `08:29` vay · `08:30` on · `08:30` mắt · `08:31` trẻ · `08:31` thơ · `08:32` nhìn · `08:32` mà · `08:32` khi · `08:32` mê · `08:33` ở · `08:33` trong · `08:34` rạch · `08:34` xanh · `08:34` ninh · `08:35` khi · `08:35` minh · `08:35` như · `08:35` là · `08:35` chim · `08:35` mua · `08:36` kem · `08:36` của · `08:36` lịch · `08:36` khác · `08:37` nợ · `08:37` khi

#### [08:37 → 08:58]
**Lời thoại (STT):** chỉ chuyên chống nẻ trong các sân này chỉ được có ý nghĩa là như cách suy nghĩ trong kê khai kê chủ và tác dốc thầy luôn đó hạt gạo đã ổn rồi ông kia đại ngọc nhi mật riêng trong đó chi trong lớp không khí các sinh vật tư duy ra được không lẽ ra phải luật nghiêm minh kỷ quan lịch đỡ
**Word-by-word:** `08:37` chỉ · `08:38` chuyên · `08:38` chống · `08:38` nẻ · `08:38` trong · `08:39` các · `08:39` sân · `08:39` này · `08:39` chỉ · `08:39` được · `08:40` có · `08:40` ý · `08:40` nghĩa · `08:40` là · `08:40` như · `08:40` cách · `08:41` suy · `08:41` nghĩ · `08:41` trong · `08:42` kê · `08:42` khai · `08:43` kê · `08:43` chủ · `08:43` và · `08:44` tác · `08:44` dốc · `08:44` thầy · `08:45` luôn · `08:45` đó · `08:45` hạt · `08:46` gạo · `08:47` đã · `08:47` ổn · `08:47` rồi · `08:49` ông · `08:49` kia · `08:50` đại · `08:50` ngọc · `08:50` nhi · `08:51` mật · `08:51` riêng · `08:51` trong · `08:51` đó · `08:52` chi · `08:52` trong · `08:53` lớp · `08:53` không · `08:53` khí · `08:53` các · `08:53` sinh · `08:54` vật · `08:54` tư · `08:54` duy · `08:54` ra · `08:54` được · `08:55` không · `08:55` lẽ · `08:55` ra · `08:55` phải · `08:56` luật · `08:56` nghiêm · `08:56` minh · `08:57` kỷ · `08:57` quan · `08:57` lịch · `08:57` đỡ

#### [08:58 → 09:00]
**Lời thoại (STT):** ở thì cách sinh
**Word-by-word:** `08:58` ở · `08:59` thì · `08:59` cách · `08:59` sinh

#### [09:00 → 09:01]
**Lời thoại (STT):** năm mới tìm ra được
**Word-by-word:** `09:00` năm · `09:00` mới · `09:00` tìm · `09:00` ra · `09:00` được

#### [09:03 → 09:22]
**Lời thoại (STT):** bày bánh soát án có đắc lực có mục các lớp đế tiến lên núi gập ghềnh rất đội bóng ở sự của event tóc khi rối khi di chuyển mình xin ăn thịt luộc thêm kệ cái đó để mình luôn số kỳ quái lịch ở
**Word-by-word:** `09:03` bày · `09:03` bánh · `09:04` soát · `09:05` án · `09:05` có · `09:05` đắc · `09:06` lực · `09:06` có · `09:07` mục · `09:07` các · `09:07` lớp · `09:07` đế · `09:08` tiến · `09:08` lên · `09:09` núi · `09:09` gập · `09:09` ghềnh · `09:10` rất · `09:10` đội · `09:10` bóng · `09:11` ở · `09:11` sự · `09:11` của · `09:12` event · `09:14` tóc · `09:14` khi · `09:14` rối · `09:15` khi · `09:15` di · `09:15` chuyển · `09:15` mình · `09:15` xin · `09:16` ăn · `09:17` thịt · `09:17` luộc · `09:17` thêm · `09:18` kệ · `09:18` cái · `09:18` đó · `09:18` để · `09:19` mình · `09:19` luôn · `09:20` số · `09:20` kỳ · `09:21` quái · `09:21` lịch · `09:22` ở

#### [09:23 → 09:25]
**Lời thoại (STT):** các em mình công lý trong lúc khăn luôn rồi khóc
**Word-by-word:** `09:23` các · `09:23` em · `09:23` mình · `09:23` công · `09:24` lý · `09:24` trong · `09:24` lúc · `09:24` khăn · `09:24` luôn · `09:24` rồi · `09:25` khóc

#### [09:26 → 09:45]
**Lời thoại (STT):** gạo mầm được độ mịn rộng nhật đã bị rất tốt đau đừng ôm tôm khô tư đó rõ ràng buộc phải thực bắc nét với cách tính toán ra cả bấp bênh hợp kết quả quá các rủi ro lắp ráp đổ móc ruột
**Word-by-word:** `09:26` gạo · `09:27` mầm · `09:27` được · `09:27` độ · `09:27` mịn · `09:28` rộng · `09:28` nhật · `09:28` đã · `09:29` bị · `09:30` rất · `09:30` tốt · `09:31` đau · `09:32` đừng · `09:32` ôm · `09:33` tôm · `09:34` khô · `09:34` tư · `09:35` đó · `09:36` rõ · `09:36` ràng · `09:36` buộc · `09:37` phải · `09:37` thực · `09:37` bắc · `09:38` nét · `09:38` với · `09:38` cách · `09:39` tính · `09:39` toán · `09:39` ra · `09:39` cả · `09:40` bấp · `09:40` bênh · `09:40` hợp · `09:40` kết · `09:41` quả · `09:42` quá · `09:42` các · `09:42` rủi · `09:43` ro · `09:43` lắp · `09:43` ráp · `09:44` đổ · `09:44` móc · `09:44` ruột

#### [09:46 → 09:52]
**Lời thoại (STT):** xóa hết ra rồi cố định ở ở
**Word-by-word:** `09:46` xóa · `09:48` hết · `09:48` ra · `09:49` rồi · `09:49` cố · `09:49` định · `09:51` ở · `09:51` ở

#### [09:56 → 09:59]
**Lời thoại (STT):** để lấy giấy mác vải văn hóa lịch cho lót có
**Word-by-word:** `09:56` để · `09:56` lấy · `09:56` giấy · `09:57` mác · `09:57` vải · `09:57` văn · `09:58` hóa · `09:58` lịch · `09:58` cho · `09:58` lót · `09:58` có

#### [10:01 → 10:18]
**Lời thoại (STT):** đột ngột của mình rồi nhỉ lúc hồng hạc có lẽ nếu nữa mình chứ hôi nách sẽ hiện lên cho đã chở người cách lạc hay lắm mới có bắt buộc họ nách rồi mười vẽ sử dụng kệ anh sao mà hiện tại lễ khai nách rồi mi mi sử dụng tiếp kẻ sắt được
**Word-by-word:** `10:01` đột · `10:03` ngột · `10:03` của · `10:03` mình · `10:03` rồi · `10:04` nhỉ · `10:04` lúc · `10:04` hồng · `10:04` hạc · `10:05` có · `10:05` lẽ · `10:05` nếu · `10:05` nữa · `10:06` mình · `10:06` chứ · `10:06` hôi · `10:06` nách · `10:06` sẽ · `10:07` hiện · `10:07` lên · `10:07` cho · `10:07` đã · `10:07` chở · `10:08` người · `10:08` cách · `10:08` lạc · `10:08` hay · `10:09` lắm · `10:09` mới · `10:09` có · `10:09` bắt · `10:09` buộc · `10:09` họ · `10:10` nách · `10:10` rồi · `10:10` mười · `10:11` vẽ · `10:11` sử · `10:11` dụng · `10:12` kệ · `10:12` anh · `10:13` sao · `10:13` mà · `10:13` hiện · `10:13` tại · `10:13` lễ · `10:14` khai · `10:15` nách · `10:15` rồi · `10:15` mi · `10:16` mi · `10:17` sử · `10:17` dụng · `10:17` tiếp · `10:17` kẻ · `10:18` sắt · `10:18` được

#### [10:20 → 10:22]
**Lời thoại (STT):** cổ đó
**Word-by-word:** `10:20` cổ · `10:22` đó

#### [10:22 → 10:25]
**Lời thoại (STT):** vỏ bọc ở anh
**Word-by-word:** `10:22` vỏ · `10:23` bọc · `10:24` ở · `10:24` anh

#### [10:27 → 10:35]
**Lời thoại (STT):** âm mở rộng hợp họ cái đĩa lỉnh kỉnh tết thêm điểm xã hội thế giới vừa giữ tình hết đất diệu hạng a
**Word-by-word:** `10:27` âm · `10:27` mở · `10:28` rộng · `10:29` hợp · `10:29` họ · `10:29` cái · `10:30` đĩa · `10:31` lỉnh · `10:32` kỉnh · `10:32` tết · `10:32` thêm · `10:32` điểm · `10:33` xã · `10:33` hội · `10:33` thế · `10:33` giới · `10:33` vừa · `10:34` giữ · `10:34` tình · `10:34` hết · `10:34` đất · `10:34` diệu · `10:35` hạng · `10:35` a

#### [10:37 → 10:38]
**Lời thoại (STT):** bán căn hộ bar
**Word-by-word:** `10:37` bán · `10:38` căn · `10:38` hộ · `10:38` bar

#### [10:40 → 10:46]
**Lời thoại (STT):** rà soát tất cả các anh với tấc đất tấc đất có và đón rõ rệt
**Word-by-word:** `10:40` rà · `10:40` soát · `10:40` tất · `10:41` cả · `10:41` các · `10:42` anh · `10:42` với · `10:42` tấc · `10:42` đất · `10:43` tấc · `10:43` đất · `10:44` có · `10:44` và · `10:44` đón · `10:44` rõ · `10:45` rệt

#### [10:47 → 10:50]
**Lời thoại (STT):** cách đó nghỉ lễ
**Word-by-word:** `10:47` cách · `10:48` đó · `10:49` nghỉ · `10:50` lễ

#### [10:52 → 10:58]
**Lời thoại (STT):** đó tìm bác quốc đã gặp bạn đang có mặt đặt ra rất gấp áp lực sơ quốc món rõ
**Word-by-word:** `10:52` đó · `10:52` tìm · `10:52` bác · `10:52` quốc · `10:53` đã · `10:53` gặp · `10:53` bạn · `10:54` đang · `10:54` có · `10:54` mặt · `10:54` đặt · `10:55` ra · `10:55` rất · `10:55` gấp · `10:56` áp · `10:56` lực · `10:57` sơ · `10:57` quốc · `10:58` món · `10:58` rõ

#### [11:00 → 11:04]
**Lời thoại (STT):** ánh mắt ra nghe bác yêu thích tuy mệt quá vậy
**Word-by-word:** `11:00` ánh · `11:00` mắt · `11:00` ra · `11:00` nghe · `11:01` bác · `11:01` yêu · `11:01` thích · `11:01` tuy · `11:02` mệt · `11:03` quá · `11:03` vậy

#### [11:05 → 11:09]
**Lời thoại (STT):** rất có và xếp tỉnh rất dễ ăn để sớm nhất nếu nghiệm
**Word-by-word:** `11:05` rất · `11:05` có · `11:05` và · `11:05` xếp · `11:06` tỉnh · `11:06` rất · `11:06` dễ · `11:07` ăn · `11:07` để · `11:07` sớm · `11:08` nhất · `11:08` nếu · `11:08` nghiệm

#### [11:10 → 11:15]
**Lời thoại (STT):** ở an tàu cộng bắc kinh về một vật thể
**Word-by-word:** `11:10` ở · `11:11` an · `11:12` tàu · `11:13` cộng · `11:13` bắc · `11:13` kinh · `11:13` về · `11:14` một · `11:14` vật · `11:15` thể

#### [11:18 → 11:19]
**Lời thoại (STT):** một nữa
**Word-by-word:** `11:18` một · `11:18` nữa

#### [11:20 → 11:21]
**Lời thoại (STT):** định
**Word-by-word:** `11:20` định

#### [11:23 → 11:29]
**Lời thoại (STT):** anh ở áp được đôi mắt đen vẽ bằng bút gel sẽ hát huynh và các vật liệu
**Word-by-word:** `11:23` anh · `11:23` ở · `11:23` áp · `11:24` được · `11:24` đôi · `11:24` mắt · `11:24` đen · `11:25` vẽ · `11:25` bằng · `11:26` bút · `11:26` gel · `11:26` sẽ · `11:26` hát · `11:27` huynh · `11:29` và · `11:29` các · `11:29` vật · `11:29` liệu

#### [11:32 → 11:50]
**Lời thoại (STT):** có bất chấp với vẻ đẹp của của lịch sử di bất dịch cái kỳ chi lúc lên sự an ninh bấm lia mắt chim quay lại đã ha và gì sẻ tôi như mình nên mình khóc bé trai in khi sao năm sau cái đó ở trẻ sách là bầm bấm bấm khi
**Word-by-word:** `11:32` có · `11:32` bất · `11:32` chấp · `11:33` với · `11:33` vẻ · `11:33` đẹp · `11:33` của · `11:34` của · `11:34` lịch · `11:34` sử · `11:34` di · `11:35` bất · `11:36` dịch · `11:37` cái · `11:37` kỳ · `11:37` chi · `11:38` lúc · `11:38` lên · `11:38` sự · `11:38` an · `11:39` ninh · `11:39` bấm · `11:39` lia · `11:39` mắt · `11:40` chim · `11:40` quay · `11:40` lại · `11:40` đã · `11:41` ha · `11:42` và · `11:42` gì · `11:42` sẻ · `11:43` tôi · `11:43` như · `11:43` mình · `11:43` nên · `11:43` mình · `11:43` khóc · `11:44` bé · `11:44` trai · `11:44` in · `11:45` khi · `11:45` sao · `11:45` năm · `11:45` sau · `11:46` cái · `11:46` đó · `11:47` ở · `11:48` trẻ · `11:48` sách · `11:48` là · `11:49` bầm · `11:49` bấm · `11:50` bấm · `11:50` khi

#### [11:50 → 11:59]
**Lời thoại (STT):** lợi rất khi nhìn bạn kết hôn không ngớt năm đồng minh băm các loại chính quê để khi hoặc thành công này nhuộm hợp đèn cầy sẵn
**Word-by-word:** `11:50` lợi · `11:51` rất · `11:51` khi · `11:51` nhìn · `11:51` bạn · `11:51` kết · `11:52` hôn · `11:52` không · `11:52` ngớt · `11:53` năm · `11:53` đồng · `11:53` minh · `11:53` băm · `11:54` các · `11:54` loại · `11:54` chính · `11:54` quê · `11:56` để · `11:57` khi · `11:57` hoặc · `11:57` thành · `11:57` công · `11:58` này · `11:58` nhuộm · `11:58` hợp · `11:58` đèn · `11:59` cầy · `11:59` sẵn

#### [12:00 → 12:20]
**Lời thoại (STT):** mà rõ bà kịch số tiền mà thị bông hạt ba lắp góc bếp hoa quả âm vật của bưởi trúc bạch vũ loại hot cách chữa khi thức rất tốn bác rất cách rất gấp năng mất tinh vi và đối tác kinh tế quốc dân đó gốc và lịch lãm quá rất đầy đủ
**Word-by-word:** `12:00` mà · `12:00` rõ · `12:00` bà · `12:00` kịch · `12:01` số · `12:01` tiền · `12:01` mà · `12:01` thị · `12:02` bông · `12:02` hạt · `12:03` ba · `12:03` lắp · `12:04` góc · `12:05` bếp · `12:05` hoa · `12:05` quả · `12:06` âm · `12:06` vật · `12:06` của · `12:07` bưởi · `12:07` trúc · `12:07` bạch · `12:08` vũ · `12:09` loại · `12:09` hot · `12:10` cách · `12:11` chữa · `12:11` khi · `12:11` thức · `12:11` rất · `12:11` tốn · `12:12` bác · `12:12` rất · `12:13` cách · `12:13` rất · `12:14` gấp · `12:14` năng · `12:15` mất · `12:15` tinh · `12:15` vi · `12:15` và · `12:16` đối · `12:16` tác · `12:16` kinh · `12:16` tế · `12:17` quốc · `12:17` dân · `12:17` đó · `12:18` gốc · `12:18` và · `12:18` lịch · `12:18` lãm · `12:19` quá · `12:19` rất · `12:20` đầy · `12:20` đủ

#### [12:21 → 12:31]
**Lời thoại (STT):** tờ hợp lệ và và rất đẹp tiêu dịch nhiều một mua thì mình cũng phải là chân mới biết là mình mùa đông nhi khóc gì hợp bé động ở trong ngày của mình
**Word-by-word:** `12:21` tờ · `12:21` hợp · `12:21` lệ · `12:21` và · `12:22` và · `12:22` rất · `12:22` đẹp · `12:23` tiêu · `12:23` dịch · `12:24` nhiều · `12:24` một · `12:24` mua · `12:24` thì · `12:24` mình · `12:25` cũng · `12:25` phải · `12:25` là · `12:25` chân · `12:26` mới · `12:26` biết · `12:26` là · `12:26` mình · `12:26` mùa · `12:27` đông · `12:27` nhi · `12:27` khóc · `12:27` gì · `12:28` hợp · `12:28` bé · `12:28` động · `12:29` ở · `12:29` trong · `12:29` ngày · `12:31` của · `12:31` mình

#### [12:33 → 12:39]
**Lời thoại (STT):** cái cốc cốc ở khi reo rất có thể chọn phải rất đè bẹp a di đà ở
**Word-by-word:** `12:33` cái · `12:33` cốc · `12:34` cốc · `12:34` ở · `12:35` khi · `12:35` reo · `12:35` rất · `12:35` có · `12:36` thể · `12:36` chọn · `12:36` phải · `12:36` rất · `12:37` đè · `12:37` bẹp · `12:38` a · `12:38` di · `12:39` đà · `12:39` ở

#### [12:41 → 12:47]
**Lời thoại (STT):** sự độc đoán ở cho cuộc đời và sự chỉ dẫn cho bé cấp real
**Word-by-word:** `12:41` sự · `12:42` độc · `12:43` đoán · `12:44` ở · `12:44` cho · `12:44` cuộc · `12:45` đời · `12:45` và · `12:45` sự · `12:45` chỉ · `12:46` dẫn · `12:46` cho · `12:46` bé · `12:46` cấp · `12:46` real

#### [12:49 → 12:59]
**Lời thoại (STT):** anh đất sét ca sức huế bánh có thể bắt tất nhau quốc bất tỉnh cấp bất chính nhất sau chuyến bay sớm trả thật và sụp tinh xếp bánh rế cực chất
**Word-by-word:** `12:49` anh · `12:49` đất · `12:51` sét · `12:51` ca · `12:52` sức · `12:52` huế · `12:52` bánh · `12:52` có · `12:53` thể · `12:53` bắt · `12:53` tất · `12:53` nhau · `12:54` quốc · `12:54` bất · `12:54` tỉnh · `12:55` cấp · `12:55` bất · `12:55` chính · `12:55` nhất · `12:55` sau · `12:56` chuyến · `12:56` bay · `12:57` sớm · `12:57` trả · `12:57` thật · `12:58` và · `12:58` sụp · `12:58` tinh · `12:58` xếp · `12:58` bánh · `12:59` rế · `12:59` cực · `12:59` chất

#### [13:00 → 13:01]
**Lời thoại (STT):** động đất đức
**Word-by-word:** `13:00` động · `13:00` đất · `13:00` đức

#### [13:01 → 13:11]
**Lời thoại (STT):** bớt mật tây bắc tỉnh khá bấp bênh vực có chất rất cần xóa bớt kích và quấn hung nô nức đến một nơi sinh sống tình cảm phức tạp link
**Word-by-word:** `13:01` bớt · `13:02` mật · `13:02` tây · `13:02` bắc · `13:03` tỉnh · `13:03` khá · `13:03` bấp · `13:04` bênh · `13:04` vực · `13:04` có · `13:04` chất · `13:05` rất · `13:05` cần · `13:05` xóa · `13:05` bớt · `13:06` kích · `13:06` và · `13:06` quấn · `13:06` hung · `13:06` nô · `13:06` nức · `13:08` đến · `13:08` một · `13:08` nơi · `13:08` sinh · `13:09` sống · `13:09` tình · `13:09` cảm · `13:09` phức · `13:09` tạp · `13:11` link

#### [13:13 → 13:32]
**Lời thoại (STT):** yên tâm chút hay nên đọc tom yum rẻ đặt vé vé máy bay tập trận tập trận lớn lớp tập kích trai rất rất ích gì mình cũng sẽ có hai cây in bút đình phiêu hát lên tí đều ghi tên điên kể trên thì là sĩ đổi tư duy theo tên nên mỹ thả lưới rác sẽ nói ngược mình trên
**Word-by-word:** `13:13` yên · `13:13` tâm · `13:13` chút · `13:13` hay · `13:13` nên · `13:13` đọc · `13:14` tom · `13:14` yum · `13:14` rẻ · `13:14` đặt · `13:15` vé · `13:16` vé · `13:16` máy · `13:17` bay · `13:17` tập · `13:17` trận · `13:17` tập · `13:17` trận · `13:18` lớn · `13:18` lớp · `13:19` tập · `13:19` kích · `13:19` trai · `13:20` rất · `13:20` rất · `13:20` ích · `13:21` gì · `13:21` mình · `13:21` cũng · `13:21` sẽ · `13:22` có · `13:22` hai · `13:22` cây · `13:23` in · `13:23` bút · `13:23` đình · `13:24` phiêu · `13:24` hát · `13:24` lên · `13:24` tí · `13:25` đều · `13:25` ghi · `13:25` tên · `13:25` điên · `13:26` kể · `13:26` trên · `13:27` thì · `13:27` là · `13:27` sĩ · `13:27` đổi · `13:28` tư · `13:28` duy · `13:29` theo · `13:29` tên · `13:30` nên · `13:30` mỹ · `13:30` thả · `13:30` lưới · `13:31` rác · `13:31` sẽ · `13:31` nói · `13:31` ngược · `13:31` mình · `13:32` trên

#### [13:32 → 13:33]
**Lời thoại (STT):** hãy
**Word-by-word:** `13:32` hãy

#### [13:34 → 13:38]
**Lời thoại (STT):** báo cáo lãnh vực mỏ đã vứt xác
**Word-by-word:** `13:34` báo · `13:34` cáo · `13:34` lãnh · `13:35` vực · `13:36` mỏ · `13:37` đã · `13:37` vứt · `13:38` xác

#### [13:39 → 13:44]
**Lời thoại (STT):** áo cũ đến rũ mắt quá cố các bác đó và
**Word-by-word:** `13:39` áo · `13:40` cũ · `13:40` đến · `13:40` rũ · `13:41` mắt · `13:41` quá · `13:41` cố · `13:42` các · `13:43` bác · `13:43` đó · `13:44` và

#### [13:44 → 13:59]
**Lời thoại (STT):** áo phá các sân khấu đất rối rối tây nguyên biết chắc là cuộc đời đức phật tác rất rõ bé mất phí tối thiểu để tách các có pháp đó chén bát quái vật em ơi trên nét mặt trời nắng
**Word-by-word:** `13:44` áo · `13:44` phá · `13:45` các · `13:45` sân · `13:45` khấu · `13:46` đất · `13:46` rối · `13:46` rối · `13:47` tây · `13:47` nguyên · `13:47` biết · `13:48` chắc · `13:48` là · `13:48` cuộc · `13:49` đời · `13:49` đức · `13:49` phật · `13:50` tác · `13:50` rất · `13:51` rõ · `13:51` bé · `13:51` mất · `13:51` phí · `13:52` tối · `13:52` thiểu · `13:52` để · `13:52` tách · `13:53` các · `13:53` có · `13:53` pháp · `13:54` đó · `13:54` chén · `13:55` bát · `13:55` quái · `13:56` vật · `13:56` em · `13:56` ơi · `13:57` trên · `13:57` nét · `13:57` mặt · `13:57` trời · `13:58` nắng

#### [14:00 → 14:20]
**Lời thoại (STT):** động rõ chưa cảnh độc trị độc thân mình âm tưởng tượng trẻ mờ mờ đơn giản chỉ chuyện chị em rợn chỉ nghĩ đến lẽ họ mình sớm kích xác lệnh hồi ra sau duy mình cứ bị điện công trình của con cái này nó giống như kịp nghiệp thuộc tỉnh lẻ lãnh đạo anh một cách sáng nữa
**Word-by-word:** `14:00` động · `14:00` rõ · `14:01` chưa · `14:01` cảnh · `14:01` độc · `14:02` trị · `14:02` độc · `14:03` thân · `14:03` mình · `14:03` âm · `14:04` tưởng · `14:04` tượng · `14:04` trẻ · `14:05` mờ · `14:05` mờ · `14:06` đơn · `14:06` giản · `14:07` chỉ · `14:07` chuyện · `14:08` chị · `14:08` em · `14:08` rợn · `14:08` chỉ · `14:09` nghĩ · `14:09` đến · `14:09` lẽ · `14:09` họ · `14:09` mình · `14:10` sớm · `14:10` kích · `14:10` xác · `14:11` lệnh · `14:11` hồi · `14:12` ra · `14:12` sau · `14:13` duy · `14:13` mình · `14:13` cứ · `14:13` bị · `14:14` điện · `14:14` công · `14:14` trình · `14:14` của · `14:15` con · `14:15` cái · `14:15` này · `14:15` nó · `14:16` giống · `14:16` như · `14:16` kịp · `14:17` nghiệp · `14:17` thuộc · `14:18` tỉnh · `14:18` lẻ · `14:19` lãnh · `14:19` đạo · `14:19` anh · `14:19` một · `14:19` cách · `14:19` sáng · `14:20` nữa

#### [14:20 → 14:20]
**Lời thoại (STT):** cổ
**Word-by-word:** `14:20` cổ

#### [14:22 → 14:31]
**Lời thoại (STT):** gã gốc sản rất bắt ánh sáng không quá rõ tác giả và đất dự kiến lịch tức quế những rác bác sĩ gây bất rỡ
**Word-by-word:** `14:22` gã · `14:23` gốc · `14:23` sản · `14:23` rất · `14:24` bắt · `14:24` ánh · `14:24` sáng · `14:25` không · `14:25` quá · `14:25` rõ · `14:26` tác · `14:26` giả · `14:26` và · `14:26` đất · `14:27` dự · `14:27` kiến · `14:27` lịch · `14:28` tức · `14:28` quế · `14:28` những · `14:28` rác · `14:29` bác · `14:30` sĩ · `14:30` gây · `14:30` bất · `14:30` rỡ

#### [14:32 → 14:39]
**Lời thoại (STT):** tán có danh kế áo áo ở tế có nhất là họ tên ngốc ngốc org
**Word-by-word:** `14:32` tán · `14:32` có · `14:33` danh · `14:33` kế · `14:33` áo · `14:34` áo · `14:35` ở · `14:35` tế · `14:35` có · `14:36` nhất · `14:36` là · `14:37` họ · `14:37` tên · `14:37` ngốc · `14:38` ngốc · `14:39` org

#### [14:40 → 14:42]
**Lời thoại (STT):** trầm bê bối lặc giúp
**Word-by-word:** `14:40` trầm · `14:40` bê · `14:41` bối · `14:41` lặc · `14:42` giúp

#### [14:43 → 14:58]
**Lời thoại (STT):** đêm là sự rất hay các phái yếu và phúc và đó ra rất rõ lực xuất lớp lửa đỏ việc việt những cái ở đó bấp bênh đau sẽ cấp đêm mở cửa
**Word-by-word:** `14:43` đêm · `14:44` là · `14:46` sự · `14:46` rất · `14:46` hay · `14:46` các · `14:47` phái · `14:47` yếu · `14:47` và · `14:47` phúc · `14:47` và · `14:47` đó · `14:48` ra · `14:48` rất · `14:48` rõ · `14:49` lực · `14:49` xuất · `14:49` lớp · `14:50` lửa · `14:50` đỏ · `14:51` việc · `14:51` việt · `14:51` những · `14:51` cái · `14:52` ở · `14:53` đó · `14:53` bấp · `14:53` bênh · `14:54` đau · `14:54` sẽ · `14:55` cấp · `14:55` đêm · `14:56` mở · `14:58` cửa

#### [14:58 → 14:59]
**Lời thoại (STT):** đơn giản dễ mặc dễ phối và lắp
**Word-by-word:** `14:58` đơn · `14:58` giản · `14:58` dễ · `14:59` mặc · `14:59` dễ · `14:59` phối · `14:59` và · `14:59` lắp

#### [15:00 → 15:03]
**Lời thoại (STT):** bạo loạn ở giá cả rất kỹ cái này về sau
**Word-by-word:** `15:00` bạo · `15:00` loạn · `15:00` ở · `15:01` giá · `15:02` cả · `15:02` rất · `15:02` kỹ · `15:02` cái · `15:03` này · `15:03` về · `15:03` sau

#### [15:05 → 15:05]
**Lời thoại (STT):** trên thị
**Word-by-word:** `15:05` trên · `15:05` thị

#### [15:06 → 15:14]
**Lời thoại (STT):** dự án hồi xưa có lẽ em mực cùng các chức năng hiện có đèn cầy dĩa đình nhiều thứ lắm hả ad
**Word-by-word:** `15:06` dự · `15:07` án · `15:07` hồi · `15:07` xưa · `15:08` có · `15:08` lẽ · `15:08` em · `15:08` mực · `15:09` cùng · `15:09` các · `15:09` chức · `15:09` năng · `15:10` hiện · `15:10` có · `15:10` đèn · `15:10` cầy · `15:11` dĩa · `15:11` đình · `15:12` nhiều · `15:13` thứ · `15:13` lắm · `15:13` hả · `15:14` ad

#### [15:15 → 15:36]
**Lời thoại (STT):** lắp ráp tại độ ra ở đã lắp ráp lăng áo khoác và đất ruộng đối chúng với bác đất sét đây đã có sát bãi rác đá xe khách sáo trúc sáo nói rất độc và được mục đích gì sau đó tắt quốc do đó các bác rất cần biết rõ có tắc xong rồi
**Word-by-word:** `15:15` lắp · `15:16` ráp · `15:16` tại · `15:16` độ · `15:16` ra · `15:16` ở · `15:18` đã · `15:18` lắp · `15:18` ráp · `15:19` lăng · `15:19` áo · `15:19` khoác · `15:19` và · `15:19` đất · `15:20` ruộng · `15:21` đối · `15:21` chúng · `15:21` với · `15:22` bác · `15:22` đất · `15:22` sét · `15:23` đây · `15:23` đã · `15:23` có · `15:23` sát · `15:24` bãi · `15:24` rác · `15:25` đá · `15:25` xe · `15:26` khách · `15:26` sáo · `15:26` trúc · `15:27` sáo · `15:28` nói · `15:28` rất · `15:28` độc · `15:29` và · `15:29` được · `15:30` mục · `15:30` đích · `15:30` gì · `15:30` sau · `15:30` đó · `15:30` tắt · `15:31` quốc · `15:31` do · `15:31` đó · `15:32` các · `15:33` bác · `15:33` rất · `15:33` cần · `15:33` biết · `15:33` rõ · `15:34` có · `15:35` tắc · `15:35` xong · `15:35` rồi

#### [15:36 → 15:56]
**Lời thoại (STT):** đỏ đài loan cây cỏ lác quyết phát triển lâu đời và tồn kho và đình liên kết hợp khoa học và khó đoán hợp lệ cô gặp vấn đề sau đó ra uất là rất khó bóc tách được coi là trục và ra sóc gia ông ông văn minh
**Word-by-word:** `15:36` đỏ · `15:36` đài · `15:36` loan · `15:36` cây · `15:36` cỏ · `15:37` lác · `15:37` quyết · `15:37` phát · `15:38` triển · `15:38` lâu · `15:39` đời · `15:39` và · `15:39` tồn · `15:39` kho · `15:40` và · `15:41` đình · `15:42` liên · `15:42` kết · `15:43` hợp · `15:43` khoa · `15:43` học · `15:43` và · `15:43` khó · `15:45` đoán · `15:46` hợp · `15:46` lệ · `15:47` cô · `15:47` gặp · `15:48` vấn · `15:48` đề · `15:48` sau · `15:49` đó · `15:49` ra · `15:50` uất · `15:50` là · `15:50` rất · `15:50` khó · `15:50` bóc · `15:51` tách · `15:51` được · `15:51` coi · `15:51` là · `15:52` trục · `15:52` và · `15:53` ra · `15:53` sóc · `15:54` gia · `15:55` ông · `15:55` ông · `15:56` văn · `15:56` minh

#### [15:56 → 16:00]
**Lời thoại (STT):** nga chỉ tập trung dưới kê mày
**Word-by-word:** `15:56` nga · `15:56` chỉ · `15:57` tập · `15:57` trung · `15:57` dưới · `15:57` kê · `15:59` mày

#### [16:00 → 16:09]
**Lời thoại (STT):** kẻ buộc hội trước họ hợp sau mất sau đó là định kế kệ số quá ở được một số cách xử sự
**Word-by-word:** `16:00` kẻ · `16:00` buộc · `16:00` hội · `16:01` trước · `16:01` họ · `16:02` hợp · `16:02` sau · `16:03` mất · `16:03` sau · `16:03` đó · `16:03` là · `16:04` định · `16:04` kế · `16:04` kệ · `16:04` số · `16:05` quá · `16:06` ở · `16:07` được · `16:07` một · `16:08` số · `16:08` cách · `16:08` xử · `16:09` sự

#### [16:13 → 16:13]
**Lời thoại (STT):** có rất nhiều
**Word-by-word:** `16:13` có · `16:13` rất · `16:13` nhiều

#### [16:16 → 16:17]
**Lời thoại (STT):** sao việt
**Word-by-word:** `16:16` sao · `16:16` việt

#### [16:19 → 16:36]
**Lời thoại (STT):** một cái gạt trộm chó đẻ phút sau chót vót ấy ở da dê gì kia đã bắt đầu pháp rất xa vậy đốt mắt say hơn có trên các rõ rệt mình rất cảm kích say thì kích tin ở nhân
**Word-by-word:** `16:19` một · `16:19` cái · `16:20` gạt · `16:20` trộm · `16:20` chó · `16:21` đẻ · `16:21` phút · `16:21` sau · `16:22` chót · `16:23` vót · `16:23` ấy · `16:23` ở · `16:24` da · `16:24` dê · `16:25` gì · `16:25` kia · `16:26` đã · `16:27` bắt · `16:28` đầu · `16:28` pháp · `16:28` rất · `16:29` xa · `16:29` vậy · `16:29` đốt · `16:30` mắt · `16:30` say · `16:30` hơn · `16:30` có · `16:31` trên · `16:31` các · `16:31` rõ · `16:32` rệt · `16:32` mình · `16:33` rất · `16:33` cảm · `16:34` kích · `16:34` say · `16:34` thì · `16:35` kích · `16:35` tin · `16:35` ở · `16:35` nhân

#### [16:37 → 16:39]
**Lời thoại (STT):** sự rau ăn
**Word-by-word:** `16:37` sự · `16:38` rau · `16:38` ăn

#### [16:40 → 16:48]
**Lời thoại (STT):** có đó lúc lực quá khích vào đất được kéo rất bình yên bái hộ có rõ rốt
**Word-by-word:** `16:40` có · `16:40` đó · `16:41` lúc · `16:41` lực · `16:41` quá · `16:42` khích · `16:42` vào · `16:42` đất · `16:43` được · `16:43` kéo · `16:43` rất · `16:44` bình · `16:45` yên · `16:46` bái · `16:46` hộ · `16:47` có · `16:47` rõ · `16:48` rốt

#### [16:50 → 16:50]
**Lời thoại (STT):** đồ
**Word-by-word:** `16:50` đồ

#### [16:51 → 16:51]
**Lời thoại (STT):** xem
**Word-by-word:** `16:51` xem

#### [16:54 → 17:00]
**Lời thoại (STT):** quá đó nhưng cấp đất rừng đã rất rõ ràng buộc
**Word-by-word:** `16:54` quá · `16:55` đó · `16:56` nhưng · `16:56` cấp · `16:57` đất · `16:57` rừng · `16:58` đã · `16:59` rất · `16:59` rõ · `16:59` ràng · `16:59` buộc

#### [17:01 → 17:02]
**Lời thoại (STT):** hoa cỏ ngọt
**Word-by-word:** `17:01` hoa · `17:02` cỏ · `17:02` ngọt

#### [17:03 → 17:16]
**Lời thoại (STT):** kẻ bắt nạt kẻ yếu quá rồi ra chính thức thực chức trách lê đình huế bây giờ anh là anh lễ lên ty tôi có thể sáng ngày mai sẽ có kỷ tới tiết
**Word-by-word:** `17:03` kẻ · `17:03` bắt · `17:04` nạt · `17:04` kẻ · `17:04` yếu · `17:05` quá · `17:05` rồi · `17:05` ra · `17:06` chính · `17:07` thức · `17:07` thực · `17:07` chức · `17:08` trách · `17:08` lê · `17:08` đình · `17:10` huế · `17:10` bây · `17:11` giờ · `17:11` anh · `17:11` là · `17:11` anh · `17:11` lễ · `17:12` lên · `17:12` ty · `17:13` tôi · `17:14` có · `17:14` thể · `17:14` sáng · `17:14` ngày · `17:15` mai · `17:15` sẽ · `17:15` có · `17:15` kỷ · `17:15` tới · `17:16` tiết

#### [17:17 → 17:29]
**Lời thoại (STT):** mẹ ơi vợ nên mất công huyết mạch đó như mới chắc em mà anh lốp xe kia được tâm ông hay chê dưa hai kết xưa anh chị e c xanh công cây nếu ở
**Word-by-word:** `17:17` mẹ · `17:18` ơi · `17:18` vợ · `17:19` nên · `17:19` mất · `17:19` công · `17:19` huyết · `17:19` mạch · `17:20` đó · `17:20` như · `17:21` mới · `17:21` chắc · `17:21` em · `17:21` mà · `17:22` anh · `17:22` lốp · `17:22` xe · `17:22` kia · `17:23` được · `17:23` tâm · `17:23` ông · `17:24` hay · `17:24` chê · `17:25` dưa · `17:25` hai · `17:26` kết · `17:26` xưa · `17:26` anh · `17:27` chị · `17:27` e · `17:27` c · `17:27` xanh · `17:28` công · `17:28` cây · `17:28` nếu · `17:29` ở

#### [17:30 → 17:40]
**Lời thoại (STT):** thiết cái thứ ba chân thứ tư thì chắc cờ nếu nhóm anh vì công việc với chấm công ty thị kỳ anh sẽ quên ảnh nét đẹp cũng đáng lẽ cái nghĩa xem hết
**Word-by-word:** `17:30` thiết · `17:31` cái · `17:31` thứ · `17:31` ba · `17:31` chân · `17:31` thứ · `17:31` tư · `17:32` thì · `17:32` chắc · `17:32` cờ · `17:33` nếu · `17:33` nhóm · `17:34` anh · `17:34` vì · `17:34` công · `17:34` việc · `17:35` với · `17:35` chấm · `17:35` công · `17:35` ty · `17:36` thị · `17:36` kỳ · `17:36` anh · `17:36` sẽ · `17:36` quên · `17:37` ảnh · `17:37` nét · `17:37` đẹp · `17:38` cũng · `17:38` đáng · `17:38` lẽ · `17:39` cái · `17:39` nghĩa · `17:40` xem · `17:40` hết

#### [17:42 → 17:59]
**Lời thoại (STT):** mất lúc đó và anh xót xa hình ảnh khi mọc răng phát rất rõ đã có đó có góc trang cà vạt rừng rậm đó có vest màu sắc rực rỡ rất sít áp và giúp ta đốt cây kết đầy chất cách
**Word-by-word:** `17:42` mất · `17:43` lúc · `17:43` đó · `17:44` và · `17:44` anh · `17:45` xót · `17:45` xa · `17:46` hình · `17:47` ảnh · `17:47` khi · `17:48` mọc · `17:48` răng · `17:48` phát · `17:48` rất · `17:49` rõ · `17:49` đã · `17:50` có · `17:51` đó · `17:51` có · `17:52` góc · `17:52` trang · `17:53` cà · `17:53` vạt · `17:53` rừng · `17:53` rậm · `17:54` đó · `17:54` có · `17:54` vest · `17:55` màu · `17:55` sắc · `17:55` rực · `17:55` rỡ · `17:56` rất · `17:56` sít · `17:57` áp · `17:57` và · `17:58` giúp · `17:58` ta · `17:58` đốt · `17:58` cây · `17:59` kết · `17:59` đầy · `17:59` chất · `17:59` cách

#### [18:00 → 18:09]
**Lời thoại (STT):** kẻ tạo điển coi quá rỗi thì nó cũng được được nếu không có ánh nắng nóng có nhiều trở nên học và xứ nghệ quét ở cái chất một kẻ
**Word-by-word:** `18:00` kẻ · `18:00` tạo · `18:00` điển · `18:00` coi · `18:01` quá · `18:01` rỗi · `18:01` thì · `18:02` nó · `18:02` cũng · `18:02` được · `18:03` được · `18:03` nếu · `18:03` không · `18:03` có · `18:04` ánh · `18:04` nắng · `18:04` nóng · `18:04` có · `18:04` nhiều · `18:06` trở · `18:06` nên · `18:06` học · `18:07` và · `18:07` xứ · `18:07` nghệ · `18:07` quét · `18:08` ở · `18:08` cái · `18:08` chất · `18:08` một · `18:08` kẻ

#### [18:10 → 18:21]
**Lời thoại (STT):** bé với nuoc hien cái quả trái đất ruộng đất đất ra bị rút ra các sắc áo rách sạch tin xanh đen bắt cóc đè ra hết sức hồ sơ hồ sơ vụ
**Word-by-word:** `18:10` bé · `18:11` với · `18:11` nuoc · `18:11` hien · `18:11` cái · `18:12` quả · `18:12` trái · `18:12` đất · `18:13` ruộng · `18:13` đất · `18:13` đất · `18:13` ra · `18:14` bị · `18:14` rút · `18:15` ra · `18:15` các · `18:15` sắc · `18:15` áo · `18:16` rách · `18:16` sạch · `18:17` tin · `18:17` xanh · `18:18` đen · `18:18` bắt · `18:18` cóc · `18:18` đè · `18:19` ra · `18:20` hết · `18:20` sức · `18:20` hồ · `18:20` sơ · `18:21` hồ · `18:21` sơ · `18:21` vụ

#### [18:23 → 18:38]
**Lời thoại (STT):** sáng sớm nó lật đật sinh vật và sức cóc đã nổi lên và cảm xúc loạn giá đình giúp ốc ở trên như con cho nam mới quy định trình kinh doanh thu phát hành
**Word-by-word:** `18:23` sáng · `18:27` sớm · `18:27` nó · `18:27` lật · `18:27` đật · `18:28` sinh · `18:28` vật · `18:28` và · `18:28` sức · `18:29` cóc · `18:29` đã · `18:30` nổi · `18:30` lên · `18:31` và · `18:31` cảm · `18:31` xúc · `18:31` loạn · `18:32` giá · `18:33` đình · `18:33` giúp · `18:33` ốc · `18:34` ở · `18:35` trên · `18:35` như · `18:35` con · `18:35` cho · `18:36` nam · `18:36` mới · `18:36` quy · `18:36` định · `18:36` trình · `18:36` kinh · `18:37` doanh · `18:37` thu · `18:37` phát · `18:37` hành

#### [18:39 → 18:41]
**Lời thoại (STT):** ra bệnh có coi
**Word-by-word:** `18:39` ra · `18:39` bệnh · `18:40` có · `18:41` coi

#### [18:42 → 18:43]
**Lời thoại (STT):** soạn
**Word-by-word:** `18:42` soạn

#### [18:45 → 18:47]
**Lời thoại (STT):** đau bố
**Word-by-word:** `18:45` đau · `18:47` bố

#### [18:49 → 18:51]
**Lời thoại (STT):** súng đạn mình
**Word-by-word:** `18:49` súng · `18:50` đạn · `18:50` mình

#### [18:52 → 18:54]
**Lời thoại (STT):** nè em chỉ biết là góp đã và đang
**Word-by-word:** `18:52` nè · `18:52` em · `18:52` chỉ · `18:52` biết · `18:53` là · `18:53` góp · `18:53` đã · `18:54` và · `18:54` đang

#### [18:56 → 18:58]
**Lời thoại (STT):** tái xuất vé mất đá
**Word-by-word:** `18:56` tái · `18:56` xuất · `18:57` vé · `18:57` mất · `18:57` đá

#### [19:00 → 19:13]
**Lời thoại (STT):** anh rất xe bài rất lớn tích khóa trúc đình đất đai một lát sau đó độ đốt bát bột truyền ở lại rất đau đáp gấp mấy cái bất tức đem đất xuất tất cả các tỉnh
**Word-by-word:** `19:00` anh · `19:01` rất · `19:01` xe · `19:01` bài · `19:01` rất · `19:02` lớn · `19:02` tích · `19:02` khóa · `19:03` trúc · `19:03` đình · `19:03` đất · `19:04` đai · `19:04` một · `19:05` lát · `19:05` sau · `19:05` đó · `19:05` độ · `19:06` đốt · `19:06` bát · `19:07` bột · `19:07` truyền · `19:08` ở · `19:09` lại · `19:09` rất · `19:09` đau · `19:10` đáp · `19:10` gấp · `19:11` mấy · `19:11` cái · `19:11` bất · `19:11` tức · `19:11` đem · `19:12` đất · `19:12` xuất · `19:12` tất · `19:13` cả · `19:13` các · `19:13` tỉnh

#### [19:16 → 19:34]
**Lời thoại (STT):** top các quái vật là âm lịch tức rụt rè anh là chồng đi quá lép hợp mây kỳ bí tích thêm sức chuyên quê thành mỹ gia mà sinh mới của mình không có sử dụng gì sự ly kỳ như xưa nữa bất tím và nó được quy định một sự bắt đắt đỏ
**Word-by-word:** `19:16` top · `19:16` các · `19:17` quái · `19:17` vật · `19:18` là · `19:18` âm · `19:19` lịch · `19:19` tức · `19:19` rụt · `19:20` rè · `19:21` anh · `19:21` là · `19:21` chồng · `19:21` đi · `19:21` quá · `19:22` lép · `19:22` hợp · `19:22` mây · `19:23` kỳ · `19:23` bí · `19:23` tích · `19:23` thêm · `19:24` sức · `19:24` chuyên · `19:24` quê · `19:25` thành · `19:25` mỹ · `19:25` gia · `19:25` mà · `19:25` sinh · `19:26` mới · `19:26` của · `19:26` mình · `19:26` không · `19:26` có · `19:26` sử · `19:27` dụng · `19:27` gì · `19:27` sự · `19:27` ly · `19:27` kỳ · `19:28` như · `19:28` xưa · `19:28` nữa · `19:29` bất · `19:30` tím · `19:30` và · `19:30` nó · `19:30` được · `19:31` quy · `19:31` định · `19:31` một · `19:32` sự · `19:33` bắt · `19:33` đắt · `19:34` đỏ

#### [19:35 → 19:37]
**Lời thoại (STT):** bóc trên là lệnh số
**Word-by-word:** `19:35` bóc · `19:36` trên · `19:36` là · `19:36` lệnh · `19:36` số

#### [19:38 → 19:53]
**Lời thoại (STT):** quá rồi có chủ đích rất đặc sắc đen xanh cà rốt có của đề rất sạch có đắp lá đát na đa ra quá xét góp ý cho trên mình sửng sốt đình
**Word-by-word:** `19:38` quá · `19:38` rồi · `19:39` có · `19:39` chủ · `19:39` đích · `19:40` rất · `19:40` đặc · `19:40` sắc · `19:40` đen · `19:41` xanh · `19:42` cà · `19:42` rốt · `19:43` có · `19:43` của · `19:43` đề · `19:43` rất · `19:44` sạch · `19:44` có · `19:44` đắp · `19:45` lá · `19:45` đát · `19:46` na · `19:47` đa · `19:47` ra · `19:48` quá · `19:49` xét · `19:50` góp · `19:50` ý · `19:50` cho · `19:51` trên · `19:51` mình · `19:52` sửng · `19:52` sốt · `19:52` đình

#### [19:54 → 20:00]
**Lời thoại (STT):** động lấn sân có lãi suất hoặc mất độc lập trên nặc bố các kết
**Word-by-word:** `19:54` động · `19:54` lấn · `19:55` sân · `19:55` có · `19:55` lãi · `19:56` suất · `19:56` hoặc · `19:56` mất · `19:57` độc · `19:58` lập · `19:58` trên · `19:58` nặc · `19:59` bố · `19:59` các · `19:59` kết

#### [20:00 → 20:03]
**Lời thoại (STT):** kỳ ở kết hợp khăn các đôi mình chỉ cách xem đất học
**Word-by-word:** `20:00` kỳ · `20:00` ở · `20:01` kết · `20:01` hợp · `20:01` khăn · `20:02` các · `20:02` đôi · `20:02` mình · `20:02` chỉ · `20:02` cách · `20:02` xem · `20:03` đất · `20:03` học

#### [20:05 → 20:24]
**Lời thoại (STT):** động đằng sau học võ róc rách bố rất vất vả cô ở đất ở khánh lộc bởi thiết kế quen mềm xét về blog dang rộng bất ngờ ốc ổn giá tốt thì ở đó
**Word-by-word:** `20:05` động · `20:06` đằng · `20:07` sau · `20:07` học · `20:07` võ · `20:08` róc · `20:10` rách · `20:10` bố · `20:10` rất · `20:10` vất · `20:11` vả · `20:12` cô · `20:13` ở · `20:13` đất · `20:14` ở · `20:15` khánh · `20:15` lộc · `20:15` bởi · `20:16` thiết · `20:16` kế · `20:16` quen · `20:16` mềm · `20:17` xét · `20:17` về · `20:17` blog · `20:18` dang · `20:18` rộng · `20:18` bất · `20:19` ngờ · `20:20` ốc · `20:21` ổn · `20:21` giá · `20:21` tốt · `20:22` thì · `20:23` ở · `20:23` đó

#### [20:25 → 20:27]
**Lời thoại (STT):** có rô có bác nào đó đấu
**Word-by-word:** `20:25` có · `20:26` rô · `20:26` có · `20:26` bác · `20:27` nào · `20:27` đó · `20:27` đấu

#### [20:30 → 20:49]
**Lời thoại (STT):** nghiệm cho nơi giá động bề vật và sẽ mất con cho kiếm ra cái đời anh đang chờ la sức tích hay mặt cũng còn may em ở ấp đẹp ở sân ở trên hình nề cho khi nào mà ở triều tiên thiếu kiệt khi việc xây lên mới
**Word-by-word:** `20:30` nghiệm · `20:30` cho · `20:30` nơi · `20:30` giá · `20:31` động · `20:31` bề · `20:31` vật · `20:32` và · `20:32` sẽ · `20:32` mất · `20:32` con · `20:33` cho · `20:33` kiếm · `20:33` ra · `20:35` cái · `20:35` đời · `20:35` anh · `20:35` đang · `20:36` chờ · `20:36` la · `20:37` sức · `20:37` tích · `20:38` hay · `20:38` mặt · `20:38` cũng · `20:38` còn · `20:39` may · `20:39` em · `20:41` ở · `20:42` ấp · `20:42` đẹp · `20:43` ở · `20:43` sân · `20:44` ở · `20:45` trên · `20:45` hình · `20:45` nề · `20:46` cho · `20:46` khi · `20:46` nào · `20:46` mà · `20:47` ở · `20:47` triều · `20:47` tiên · `20:47` thiếu · `20:47` kiệt · `20:48` khi · `20:48` việc · `20:48` xây · `20:49` lên · `20:49` mới

#### [20:49 → 20:49]
**Lời thoại (STT):** dưới
**Word-by-word:** `20:49` dưới

#### [20:51 → 21:00]
**Lời thoại (STT):** chiếc chơi dễ mà anh cũng chưa hiểu rõ ở lâm chí minh đã làm nộm các kênh thương của mình nơi như thế nào
**Word-by-word:** `20:51` chiếc · `20:51` chơi · `20:52` dễ · `20:52` mà · `20:53` anh · `20:53` cũng · `20:53` chưa · `20:54` hiểu · `20:54` rõ · `20:55` ở · `20:56` lâm · `20:56` chí · `20:56` minh · `20:56` đã · `20:57` làm · `20:57` nộm · `20:58` các · `20:58` kênh · `20:58` thương · `20:59` của · `20:59` mình · `20:59` nơi · `20:59` như · `20:59` thế · `20:59` nào

#### [21:00 → 21:00]
**Lời thoại (STT):** mẹ
**Word-by-word:** `21:00` mẹ

#### [21:02 → 21:03]
**Lời thoại (STT):** hot
**Word-by-word:** `21:02` hot

#### [21:05 → 21:24]
**Lời thoại (STT):** bàn bạc trên giường thực tin nổi vào hòm sổ đỏ đen tóc và với câu đó bị chân sau sao bếp vết sức cố hết sức cấp lạc nhất ông em vết bớt rất nhiều link quốc rồi gì em để anh xếp ly mỹ kỳ em ở trung quốc lết nên xử
**Word-by-word:** `21:05` bàn · `21:06` bạc · `21:06` trên · `21:06` giường · `21:06` thực · `21:07` tin · `21:07` nổi · `21:08` vào · `21:09` hòm · `21:09` sổ · `21:10` đỏ · `21:10` đen · `21:11` tóc · `21:11` và · `21:11` với · `21:11` câu · `21:11` đó · `21:12` bị · `21:12` chân · `21:12` sau · `21:13` sao · `21:13` bếp · `21:13` vết · `21:14` sức · `21:14` cố · `21:14` hết · `21:14` sức · `21:15` cấp · `21:15` lạc · `21:15` nhất · `21:16` ông · `21:16` em · `21:16` vết · `21:17` bớt · `21:18` rất · `21:18` nhiều · `21:18` link · `21:19` quốc · `21:20` rồi · `21:20` gì · `21:20` em · `21:21` để · `21:21` anh · `21:21` xếp · `21:21` ly · `21:22` mỹ · `21:22` kỳ · `21:22` em · `21:23` ở · `21:23` trung · `21:24` quốc · `21:24` lết · `21:24` nên · `21:24` xử

#### [21:25 → 21:45]
**Lời thoại (STT):** sanh diệt số rỉ ở tiệt kia phong phía tơ phi là ấy hai kẻ xanh đậu trước con chỉ mới có thời gian để mẹ xét huy kẹp sinh cứ bè đã có kịch vậy khi sẽ tín hiệu tương tự ở rõ cái dĩa hình sẽ đặt kê sẽ buộc hồi ở
**Word-by-word:** `21:25` sanh · `21:26` diệt · `21:26` số · `21:26` rỉ · `21:27` ở · `21:27` tiệt · `21:28` kia · `21:28` phong · `21:28` phía · `21:28` tơ · `21:29` phi · `21:29` là · `21:29` ấy · `21:30` hai · `21:30` kẻ · `21:30` xanh · `21:31` đậu · `21:31` trước · `21:31` con · `21:32` chỉ · `21:32` mới · `21:32` có · `21:32` thời · `21:33` gian · `21:33` để · `21:33` mẹ · `21:33` xét · `21:34` huy · `21:34` kẹp · `21:34` sinh · `21:35` cứ · `21:35` bè · `21:36` đã · `21:36` có · `21:36` kịch · `21:36` vậy · `21:37` khi · `21:37` sẽ · `21:38` tín · `21:38` hiệu · `21:38` tương · `21:39` tự · `21:39` ở · `21:40` rõ · `21:40` cái · `21:41` dĩa · `21:41` hình · `21:42` sẽ · `21:42` đặt · `21:42` kê · `21:43` sẽ · `21:43` buộc · `21:43` hồi · `21:44` ở

#### [21:45 → 21:54]
**Lời thoại (STT):** ở anh sang nhăng theo vinh trị null môn khi đánh rơi bị thiệt sĩ là mỗi người kia đỏ hạt có khi tại kỳ anh mỹ đặc trưng ra bị thương sức khỏe
**Word-by-word:** `21:45` ở · `21:45` anh · `21:45` sang · `21:45` nhăng · `21:46` theo · `21:46` vinh · `21:47` trị · `21:47` null · `21:47` môn · `21:48` khi · `21:48` đánh · `21:48` rơi · `21:48` bị · `21:49` thiệt · `21:49` sĩ · `21:49` là · `21:49` mỗi · `21:50` người · `21:50` kia · `21:50` đỏ · `21:50` hạt · `21:51` có · `21:51` khi · `21:51` tại · `21:51` kỳ · `21:52` anh · `21:53` mỹ · `21:53` đặc · `21:53` trưng · `21:53` ra · `21:54` bị · `21:54` thương · `21:54` sức · `21:54` khỏe

#### [21:58 → 21:59]
**Lời thoại (STT):** ở các tiết mục hồi
**Word-by-word:** `21:58` ở · `21:58` các · `21:58` tiết · `21:58` mục · `21:59` hồi

#### [22:01 → 22:13]
**Lời thoại (STT):** ờ kê kê đó khi viễn cô chiếc một kệ kiện độc khi mình mới anh minh hay phim mới làm thế nào thay đổi ý trên cái nền kim khi lập mền gối quá chặt
**Word-by-word:** `22:01` ờ · `22:02` kê · `22:03` kê · `22:03` đó · `22:03` khi · `22:04` viễn · `22:04` cô · `22:05` chiếc · `22:05` một · `22:06` kệ · `22:06` kiện · `22:06` độc · `22:06` khi · `22:06` mình · `22:07` mới · `22:08` anh · `22:08` minh · `22:08` hay · `22:08` phim · `22:09` mới · `22:09` làm · `22:09` thế · `22:09` nào · `22:09` thay · `22:10` đổi · `22:10` ý · `22:10` trên · `22:11` cái · `22:11` nền · `22:12` kim · `22:12` khi · `22:12` lập · `22:12` mền · `22:13` gối · `22:13` quá · `22:13` chặt

#### [22:15 → 22:16]
**Lời thoại (STT):** kiêu hãnh cộm kem mới
**Word-by-word:** `22:15` kiêu · `22:15` hãnh · `22:15` cộm · `22:15` kem · `22:16` mới

#### [22:18 → 22:19]
**Lời thoại (STT):** đình
**Word-by-word:** `22:18` đình

#### [22:21 → 22:37]
**Lời thoại (STT):** bị quá của kẻ quá rõ quá yếu có những điều khiển các em tết việt loạt ảnh độc đáo và gấp gặp ông kiệt ở kiệt rồi cho nên nhếch lên nhiều nhà cái nĩa rất rực kia lúc trẻ nhỏ
**Word-by-word:** `22:21` bị · `22:22` quá · `22:23` của · `22:23` kẻ · `22:23` quá · `22:24` rõ · `22:25` quá · `22:25` yếu · `22:25` có · `22:25` những · `22:25` điều · `22:26` khiển · `22:26` các · `22:26` em · `22:26` tết · `22:27` việt · `22:28` loạt · `22:28` ảnh · `22:28` độc · `22:28` đáo · `22:29` và · `22:29` gấp · `22:30` gặp · `22:30` ông · `22:31` kiệt · `22:31` ở · `22:31` kiệt · `22:32` rồi · `22:32` cho · `22:32` nên · `22:32` nhếch · `22:33` lên · `22:33` nhiều · `22:33` nhà · `22:33` cái · `22:33` nĩa · `22:34` rất · `22:34` rực · `22:34` kia · `22:35` lúc · `22:35` trẻ · `22:37` nhỏ

#### [22:39 → 22:43]
**Lời thoại (STT):** kể về ba đời anh kia thân chưa đến ta mới gọi cái lân hôi đặt ở
**Word-by-word:** `22:39` kể · `22:39` về · `22:39` ba · `22:40` đời · `22:40` anh · `22:40` kia · `22:40` thân · `22:41` chưa · `22:41` đến · `22:41` ta · `22:41` mới · `22:42` gọi · `22:42` cái · `22:42` lân · `22:42` hôi · `22:42` đặt · `22:42` ở

#### [22:45 → 22:46]
**Lời thoại (STT):** nửa kia
**Word-by-word:** `22:45` nửa · `22:45` kia

---

## Tóm tắt chi tiết — Việc cần làm (Renol / Minh implement)

### 1. Token Management UI/UX — Jira FE-126 + Confluence spec

Eric walkthrough 4 transaction types, mỗi loại có **reference app** và **UNERA target behavior**:

| # | Feature | Reference (Eric demo) | UNERA deliverable |
|---|---------|----------------------|-------------------|
| **5.1** | Buy hUSD via Fiat | MetaMask Buy (MoonPay/Mercuryo/Banxa), Coinbase Buy | Amount fiat VND, chọn asset (hUSD/USDC/USDT), payment method, provider quote screen. Copy: **Purchase/Sell** — không mint/burn/issuance. CEX-style OTC; linked wallet = Receive To. |
| **5.2** | Send Token | MetaMask Send + `send-enhanced.html` | Stepper Recipient→Amount→Confirm→Success. ERC-20 `transfer`, **1 wallet prompt**, user trả gas (Phase 1). Contact picker giữ như demo. |
| **5.3** | Swap | Uniswap swap | Sell/Buy assets, allowance check → approve prompt → swap prompt. User trả gas. Bundle Approval+Swap khi cùng hash. |
| **5.4** | Trade Mini-CEX | Binance Spot limit order | Order book UI, Limit Buy/Sell forms. Order **off-chain signed**, settlement **on-chain** via escrow smart contract (note cuối call). |

**Key rules (Confluence §1.4):**
- FE **không** gọi blockchain RPC trực tiếp.
- Wallet **connected + verified** trước mọi transaction action.
- Copy tránh mint/burn/issuance/redemption → **Purchase / Sell**.
- Chưa connect: form vẫn xem được, **inline connect prompt** — không block cả page.

**Gas (§3.4–3.5):** Phase 1 user trả gas · Phase 2 EIP-3009 platform absorb (future scope).

---

### 2. Transaction History / Activity Filters — Thanh Son Le (Slack) + wallet demo

Implement filter taxonomy trên **`wallet-enhanced.html` Activity** (Eric demo ~19:30):

| Filter label | Logic |
|--------------|--------|
| **Approval** | Smart contract token allowance approvals |
| **Transfer** | Outbound — `user == from` |
| **Receive** | Inbound — `user == to` |
| **Deposit** | Gộp **Bank Transfer (Fiat)** + **OTC Transfer** |
| **Pool Exchange** | Bundled tx (e.g. Approval + Swap) cùng **transaction hash** |

UI mockup Slack: checkbox **Approval, Exchange, Transfer, Receive, Deposit/Withdraw, Rewards**.

**Jira:** FE-127 (Refine Transaction History UI), FE-131 (Persist filters on page navigation), FE-140 (Filter page implementation), FE-98 (Tx history page).

---

### 3. Wallet Activity UI — đã demo, polish tiếp

- Unified Activity feed: search + **Filters** modal (custom dropdown per repo rules).
- Status toolbar: **Successful / All / Pending / Failed** (Kevin failed/pending UX).
- Wallet scope tabs: All Wallets + per-address.
- Rail badges **Off-chain** vs **On-chain** trên rows (Build 06 pattern).
- Subtitle Activity section (Eric feedback từ June 05 plan).

---

### 4. Out of scope — Confluence §1.3 (không làm trong pass này)

Portfolio/dashboard chi tiết, transaction history BE implementation, smart contract code, stablecoin reserve/compliance export.

---

### 5. Trade architecture — follow-up BE/PM (Eric note ~22:30)

- Order ký **off-chain**, settlement **on-chain**.
- Cần **smart contract escrow**.
- Kiến trúc tham chiếu: OpenDAX + Market Maker → User Wallet + Deposit → UNERA Exchange Wallet.

---

### 6. Priority & ownership

| Item | Owner | Priority |
|------|-------|----------|
| FE-126 Token Management UI/UX refine | Minh (Renol) | **High** |
| FE-127 Transaction History refine | Minh | In Progress |
| FE-131 Persist Activity filters | Backlog/Ready | — |
| FE-140 Filter page | Sprint Backlog | — |
| Filter taxonomy alignment | Align UI với Thanh Son Le Slack spec | — |
