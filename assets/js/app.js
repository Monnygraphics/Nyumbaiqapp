// NyumbaIQ product app — vanilla JS port of the team's React interactions
// (hero tabs, listings filter, mobile nav, auth flow). No framework, no build step.
(function(){
  "use strict";

  // ---------- mobile nav ----------
  var navToggle = document.getElementById("nav-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", function(){
      mobileMenu.classList.toggle("open");
      var isOpen = mobileMenu.classList.contains("open");
      navToggle.innerHTML = isOpen
        ? '<svg class="icon" width="18" height="18"><use href="assets/app/icons.svg#x"/></svg>'
        : '<svg class="icon" width="18" height="18"><use href="assets/app/icons.svg#menu"/></svg>';
    });
  }

  // ---------- hero search tabs ----------
  var searchTabs = document.querySelectorAll(".search-tab");
  var searchInput = document.getElementById("search-location");
  searchTabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      searchTabs.forEach(function(t){ t.classList.remove("active"); });
      tab.classList.add("active");
      if (searchInput) {
        var mode = tab.getAttribute("data-tab");
        searchInput.placeholder = mode === "buy"
          ? "Search areas to buy in"
          : "Search location, estate or neighbourhood";
      }
    });
  });

  // ---------- popular search shortcuts ----------
  document.querySelectorAll(".ps-chip[data-search]").forEach(function(chip){
    chip.addEventListener("click", function(){
      if (searchInput) {
        searchInput.value = chip.getAttribute("data-search");
        searchInput.focus();
      }
    });
  });

  // ---------- listings filter ----------
  var filterPills = document.querySelectorAll(".filter-pill");
  var propertyCards = document.querySelectorAll(".property-card");
  filterPills.forEach(function(pill){
    pill.addEventListener("click", function(){
      filterPills.forEach(function(p){ p.classList.remove("active"); });
      pill.classList.add("active");
      var f = pill.getAttribute("data-filter");
      propertyCards.forEach(function(card){
        var show = f === "all" || card.getAttribute("data-listing") === f;
        card.style.display = show ? "" : "none";
      });
    });
  });

  // ---------- auth: mode switch (login / signup) ----------
  var modeButtons = document.querySelectorAll(".mode-btn");
  var loginPanel = document.getElementById("panel-login");
  var signupPanel = document.getElementById("panel-signup");
  function setMode(mode){
    modeButtons.forEach(function(b){ b.classList.toggle("active", b.getAttribute("data-mode") === mode); });
    if (loginPanel) loginPanel.style.display = mode === "login" ? "flex" : "none";
    if (signupPanel) signupPanel.style.display = mode === "signup" ? "block" : "none";
  }
  modeButtons.forEach(function(b){
    b.addEventListener("click", function(){ setMode(b.getAttribute("data-mode")); });
  });
  document.querySelectorAll("[data-goto-mode]").forEach(function(el){
    el.addEventListener("click", function(e){
      e.preventDefault();
      setMode(el.getAttribute("data-goto-mode"));
    });
  });

  // ---------- auth: role selection ----------
  var roleFields = {
    tenant: [
      { label: "Monthly budget (KSh)", type: "number", placeholder: "85,000" },
      { label: "Preferred move-in", type: "select", options: ["Immediately", "Within 1 month", "1-3 months", "Flexible"] },
      { label: "Preferred area", type: "text", placeholder: "Kilimani, Nairobi", full: true }
    ],
    landlord: [
      { label: "Properties owned", type: "number", placeholder: "3" },
      { label: "Company (optional)", type: "text", placeholder: "Acacia Estates" },
      { label: "Title deed / LR number", type: "text", placeholder: "LR No. 209/1234", full: true }
    ],
    buyer: [
      { label: "Purchase budget (KSh)", type: "number", placeholder: "25,000,000" },
      { label: "Financing", type: "select", options: ["Cash", "Mortgage pre-approved", "Mortgage needed"] },
      { label: "Property type", type: "select", options: ["Apartment", "Townhouse", "Villa / Bungalow", "Land"], full: true }
    ],
    broker: [
      { label: "Agency name", type: "text", placeholder: "Prime Realty Ltd" },
      { label: "EARB license number", type: "text", placeholder: "EARB/2024/0456" },
      { label: "Years active", type: "number", placeholder: "6" },
      { label: "Service areas", type: "text", placeholder: "Westlands, Karen, Runda", full: true }
    ]
  };
  var roleLabels = { tenant: "Tenant", landlord: "Landlord", buyer: "Buyer", broker: "Broker / Agent" };

  var roleCards = document.querySelectorAll(".role-select-card");
  var roleChooser = document.getElementById("role-chooser");
  var roleFormWrap = document.getElementById("role-form-wrap");
  var roleBadge = document.getElementById("active-role-badge");
  var dynamicFields = document.getElementById("dynamic-fields");
  var signupSubmitLabel = document.getElementById("signup-submit-label");

  function renderRoleForm(role){
    if (roleBadge) roleBadge.textContent = "Registering as " + roleLabels[role];
    if (signupSubmitLabel) signupSubmitLabel.textContent = "Create " + roleLabels[role] + " account";
    if (!dynamicFields) return;
    dynamicFields.innerHTML = "";
    (roleFields[role] || []).forEach(function(f, i){
      var wrap = document.createElement("div");
      wrap.className = f.full ? "field-full" : "";
      var label = document.createElement("label");
      label.className = "field-label";
      label.textContent = f.label;
      var id = "dyn-" + role + "-" + i;
      label.setAttribute("for", id);
      wrap.appendChild(label);
      var input;
      if (f.type === "select") {
        input = document.createElement("select");
        input.className = "field-input";
        input.id = id;
        var placeholder = document.createElement("option");
        placeholder.textContent = "Select an option";
        placeholder.value = "";
        placeholder.disabled = true;
        placeholder.selected = true;
        input.appendChild(placeholder);
        f.options.forEach(function(o){
          var opt = document.createElement("option");
          opt.textContent = o; opt.value = o;
          input.appendChild(opt);
        });
      } else {
        input = document.createElement("input");
        input.className = "field-input";
        input.id = id;
        input.type = f.type || "text";
        input.placeholder = f.placeholder || "";
      }
      wrap.appendChild(input);
      dynamicFields.appendChild(wrap);
    });
  }

  roleCards.forEach(function(card){
    card.addEventListener("click", function(){
      var role = card.getAttribute("data-role");
      renderRoleForm(role);
      if (roleChooser) roleChooser.style.display = "none";
      if (roleFormWrap) roleFormWrap.style.display = "block";
    });
  });
  var changeRoleBtn = document.getElementById("change-role-btn");
  if (changeRoleBtn) {
    changeRoleBtn.addEventListener("click", function(){
      if (roleFormWrap) roleFormWrap.style.display = "none";
      if (roleChooser) roleChooser.style.display = "block";
    });
  }

  // ---------- password show/hide ----------
  document.querySelectorAll(".pw-toggle").forEach(function(btn){
    btn.addEventListener("click", function(){
      var input = document.getElementById(btn.getAttribute("data-target"));
      if (!input) return;
      var showing = input.type === "text";
      input.type = showing ? "password" : "text";
      btn.innerHTML = showing
        ? '<svg class="icon" width="16" height="16"><use href="assets/app/icons.svg#eye"/></svg>'
        : '<svg class="icon" width="16" height="16"><use href="assets/app/icons.svg#eye-off"/></svg>';
    });
  });

  // ---------- demo-only form submission ----------
  document.querySelectorAll("form[data-demo-form]").forEach(function(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var note = form.querySelector(".demo-note");
      if (note) {
        note.style.display = "block";
        note.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  // ---------- trust chat: ask the ledger a question, conversationally ----------
  // Scripted per listing from its real ledger data - no live AI backend.
  var chatData = {
    "kilimani-heights": {
      title: "Kilimani Heights Apartments",
      greeting: "Hi, I'm the Trust Ledger for Kilimani Heights Apartments. Ask me anything before you commit.",
      qa: [
        { q: "Is the landlord verified?", a: "Yes. The landlord's identity was confirmed by phone against their national ID before this listing went live. This is a full 4/4 Trust Ledger." },
        { q: "Was the unit actually visited?", a: "Yes — our team visited in person and confirmed the condition matched the photos on site. Security rated 5 of 5." },
        { q: "What's the true cost here?", a: "Rent is KSh 95,000/month. Deposit, water, garbage and service charge are itemised upfront in the full ledger — nothing new appears after you sign." },
        { q: "Has a tenant reviewed it?", a: "Yes — a verified former tenant confirmed the unit matched what's listed." }
      ]
    },
    "karen-grove-villa": {
      title: "Karen Grove Family Villa",
      greeting: "Hi, I'm the Trust Ledger for Karen Grove Family Villa. Ask me anything before you commit.",
      qa: [
        { q: "Is the landlord verified?", a: "Yes. The owner's identity was confirmed by phone against their national ID before listing. This is a full 4/4 Trust Ledger." },
        { q: "Was the unit actually visited?", a: "Yes — visited in person and confirmed against the photos. Security: 5 of 5." },
        { q: "What's the true cost here?", a: "Listed at KSh 68,000,000. No hidden agent commissions get added after you've agreed a price — the full cost structure is disclosed upfront." },
        { q: "Has anyone reviewed it?", a: "Yes — a verified former occupant confirmed the property's condition matched the listing." }
      ]
    },
    "riverside-townhouse": {
      title: "Riverside Court Townhouses",
      greeting: "Hi, I'm the Trust Ledger for Riverside Court Townhouses. Ask me anything before you commit.",
      qa: [
        { q: "Is the landlord verified?", a: "Yes. Identity confirmed by phone against national ID. This is a full 4/4 Trust Ledger." },
        { q: "Was the unit actually visited?", a: "Yes, visited in person and confirmed against the photos. Security: 4 of 5." },
        { q: "What's the true cost here?", a: "Rent is KSh 58,000/month. Deposit, water and service charge are itemised upfront — total move-in cost KSh 179,000, and nothing new appears after you sign." },
        { q: "Has anyone reviewed it?", a: "Yes — a verified tenant in the same complex confirmed management and maintenance are responsive." }
      ]
    },
    "westlands-penthouse": {
      title: "Westlands Skyline Penthouse",
      greeting: "Hi, I'm the Trust Ledger for Westlands Skyline Penthouse. Ask me anything before you commit.",
      qa: [
        { q: "Is the landlord verified?", a: "Yes. Identity confirmed by phone against national ID. This is a full 4/4 Trust Ledger." },
        { q: "Was the unit actually visited?", a: "Yes, visited in person and confirmed against the photos. Security: 5 of 5." },
        { q: "What's the true cost here?", a: "Rent is KSh 165,000/month. Deposit, water, garbage and service charge are itemised upfront — nothing new appears after you sign." },
        { q: "Has a tenant reviewed it?", a: "Yes — a verified former tenant confirmed the rooftop and concierge service matched what's listed." }
      ]
    },
    "runda-bungalow": {
      title: "Runda Garden Bungalow",
      greeting: "Hi, I'm the Trust Ledger for Runda Garden Bungalow. This one's only partway verified — ask me anything.",
      qa: [
        { q: "Is the landlord verified?", a: "Identity is confirmed, yes. But this listing is only at 2 of 4 Trust Ledger checks — the in-person visit and tenant reviews are still pending." },
        { q: "Was the unit actually visited?", a: "Not yet. That's one of the two checks still pending for this listing — treat the photos as unverified for now." },
        { q: "What's the true cost here?", a: "Listed at KSh 42,500,000, and the cost breakdown is disclosed. Security rated 4 of 5 from available records — still awaiting in-person confirmation." },
        { q: "Has anyone reviewed it?", a: "No tenant review is on file yet — that's the other pending item on this ledger." }
      ]
    },
    "ngara-studio": {
      title: "Ngara Urban Studios",
      greeting: "Hi, I'm the Trust Ledger for Ngara Urban Studios. Ask me anything before you commit.",
      qa: [
        { q: "Is the landlord verified?", a: "Yes. Identity confirmed by phone against national ID. This is a full 4/4 Trust Ledger." },
        { q: "Was the unit actually visited?", a: "Yes, visited in person and confirmed against the photos. Security: 4 of 5." },
        { q: "What's the true cost here?", a: "Rent is KSh 13,500/month. Total move-in cost is KSh 41,700 including two months' deposit and water — what's listed is what you pay." },
        { q: "Has anyone reviewed it?", a: "Yes — a verified former tenant confirmed the unit stayed fully let with steady demand." }
      ]
    }
  };

  var chatOverlay = document.getElementById("chat-overlay");
  var chatTitle = document.getElementById("chat-title");
  var chatBody = document.getElementById("chat-body");
  var chatChips = document.getElementById("chat-chips");
  var chatClose = document.getElementById("chat-close");

  function addBubble(role, text){
    var b = document.createElement("div");
    b.className = "chat-bubble " + role;
    b.textContent = text;
    chatBody.appendChild(b);
    chatBody.scrollTop = chatBody.scrollHeight;
    return b;
  }

  function renderChips(propertyId){
    if (!chatChips) return;
    chatChips.innerHTML = "";
    var data = chatData[propertyId];
    if (!data) return;
    var askedCount = chatBody.querySelectorAll(".chat-bubble.user").length;
    data.qa.forEach(function(pair){
      var already = Array.prototype.some.call(chatBody.querySelectorAll(".chat-bubble.user"), function(el){
        return el.textContent === pair.q;
      });
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chat-chip";
      chip.textContent = pair.q;
      if (already) chip.disabled = true;
      chip.addEventListener("click", function(){
        if (chip.disabled) return;
        chip.disabled = true;
        addBubble("user", pair.q);
        var typing = document.createElement("div");
        typing.className = "chat-bubble assistant typing";
        typing.innerHTML = "<span></span><span></span><span></span>";
        chatBody.appendChild(typing);
        chatBody.scrollTop = chatBody.scrollHeight;
        setTimeout(function(){
          typing.remove();
          addBubble("assistant", pair.a);
        }, 550 + Math.random() * 400);
      });
      chatChips.appendChild(chip);
    });
  }

  function openChat(propertyId){
    var data = chatData[propertyId];
    if (!data || !chatOverlay) return;
    chatTitle.textContent = data.title;
    chatBody.innerHTML = "";
    addBubble("assistant", data.greeting);
    renderChips(propertyId);
    chatOverlay.classList.add("open");
    chatOverlay.dataset.property = propertyId;
  }

  function closeChat(){
    if (chatOverlay) chatOverlay.classList.remove("open");
  }

  document.querySelectorAll(".ledger-chat-btn").forEach(function(btn){
    btn.addEventListener("click", function(){
      openChat(btn.getAttribute("data-property"));
    });
  });
  if (chatClose) chatClose.addEventListener("click", closeChat);
  if (chatOverlay) chatOverlay.addEventListener("click", function(e){
    if (e.target === chatOverlay) closeChat();
  });
  document.addEventListener("keydown", function(e){
    if (e.key === "Escape") {
      closeChat();
      var dOverlay = document.getElementById("detail-overlay");
      if (dOverlay) dOverlay.classList.remove("open");
    }
  });

  // re-render chips as questions get asked, so already-answered ones disable themselves
  if (chatBody) {
    var chatObserver = new MutationObserver(function(){
      if (chatOverlay.classList.contains("open")) renderChips(chatOverlay.dataset.property);
    });
    chatObserver.observe(chatBody, { childList: true });
  }

  // ---------- listing detail modal: full ledger + Hunt Pass gate ----------
  var propertyDetails = {
    "kilimani-heights": {
      title: "Kilimani Heights Apartments", ref: "KILIMANI · REF NIQ-2026-01128",
      context: "Gated compound, manned 24/7 · lift access · 400m from the tarmac",
      ledger: [
        ["Landlord identity confirmed", "Phone-verified against national ID · 08 Jun 2026", true],
        ["Unit visited in person", "Condition and photos confirmed on site", true],
        ["Full cost disclosed upfront", "Deposit, water, garbage and service charge itemised", true],
        ["Tenant review recorded", "Verified former tenant · stayed two years", true]
      ],
      costs: [["Rent, first month", "KSh 95,000"], ["Deposit, two months", "KSh 190,000"], ["Water & service charge", "KSh 6,500"]],
      total: ["Total before you hold the keys", "KSh 291,500"]
    },
    "karen-grove-villa": {
      title: "Karen Grove Family Villa", ref: "KAREN · REF NIQ-2026-00874",
      context: "Half-acre grounds · borehole on site · quiet cul-de-sac off Karen Road",
      ledger: [
        ["Owner identity confirmed", "Phone-verified against national ID · 15 May 2026", true],
        ["Property visited in person", "Structure, boundaries and photos confirmed on site", true],
        ["Full cost disclosed upfront", "Asking price and estimated transfer costs itemised", true],
        ["Occupant reference recorded", "Verified former occupant · condition as listed", true]
      ],
      costs: [["Asking price", "KSh 68,000,000"], ["Legal, stamp & transfer (est.)", "KSh 3,060,000"]],
      total: ["Estimated total cost", "KSh 71,060,000"]
    },
    "riverside-townhouse": {
      title: "Riverside Court Townhouses", ref: "RIVERSIDE · REF NIQ-2026-01342",
      context: "Gated court of 12 · managed on site · 300m from Riverside Drive",
      ledger: [
        ["Landlord identity confirmed", "Phone-verified against national ID · 20 Jun 2026", true],
        ["Unit visited in person", "Condition and photos confirmed on site", true],
        ["Full cost disclosed upfront", "Deposit, water and service charge itemised", true],
        ["Tenant review recorded", "Verified tenant in the same court", true]
      ],
      costs: [["Rent, first month", "KSh 58,000"], ["Deposit, two months", "KSh 116,000"], ["Water & service charge", "KSh 5,000"]],
      total: ["Total before you hold the keys", "KSh 179,000"]
    },
    "westlands-penthouse": {
      title: "Westlands Skyline Penthouse", ref: "WESTLANDS · REF NIQ-2026-00291",
      context: "Concierge building · rooftop access · secure basement parking",
      ledger: [
        ["Landlord identity confirmed", "Phone-verified against national ID · 02 Jun 2026", true],
        ["Unit visited in person", "Condition and photos confirmed on site", true],
        ["Full cost disclosed upfront", "Deposit, water, garbage and service charge itemised", true],
        ["Tenant review recorded", "Verified former tenant · concierge service as listed", true]
      ],
      costs: [["Rent, first month", "KSh 165,000"], ["Deposit, two months", "KSh 330,000"], ["Water & service charge", "KSh 8,000"]],
      total: ["Total before you hold the keys", "KSh 503,000"]
    },
    "runda-bungalow": {
      title: "Runda Garden Bungalow", ref: "RUNDA · REF NIQ-2026-01477",
      context: "Large garden plot · borehole · verification still in progress",
      ledger: [
        ["Owner identity confirmed", "Phone-verified against national ID · 28 Jun 2026", true],
        ["Property visit", "Scheduled — not yet completed", false],
        ["Full cost disclosed upfront", "Asking price and estimated transfer costs itemised", true],
        ["Occupant reference", "Pending — no reference on file yet", false]
      ],
      costs: [["Asking price", "KSh 42,500,000"], ["Legal, stamp & transfer (est.)", "KSh 1,912,500"]],
      total: ["Estimated total cost", "KSh 44,412,500"]
    },
    "ngara-studio": {
      title: "Ngara Urban Studios", ref: "NGARA · REF NIQ-2026-01503",
      context: "Secure block, caretaker on site · 5 min walk to matatu stage",
      ledger: [
        ["Landlord identity confirmed", "Phone-verified against national ID · 25 Jun 2026", true],
        ["Unit visited in person", "Condition and photos confirmed on site", true],
        ["Full cost disclosed upfront", "Deposit, water and garbage itemised", true],
        ["Tenant review recorded", "Verified former tenant · unit matched the listing", true]
      ],
      costs: [["Rent, first month", "KSh 13,500"], ["Deposit, two months", "KSh 27,000"], ["Water & garbage", "KSh 1,200"]],
      total: ["Total before you hold the keys", "KSh 41,700"]
    }
  };

  var detailOverlay = document.getElementById("detail-overlay");
  var detailTitle = document.getElementById("detail-title");
  var detailRef = document.getElementById("detail-ref");
  var detailBody = document.getElementById("detail-body");
  var detailClose = document.getElementById("detail-close");

  function esc(s){ var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }

  function openDetail(propertyId){
    var d = propertyDetails[propertyId];
    if (!d || !detailOverlay) return;
    detailTitle.textContent = d.title;
    detailRef.textContent = d.ref;
    var html = '<p class="dl-context"><svg class="icon" width="13" height="13"><use href="assets/app/icons.svg#map-pin"/></svg>' + esc(d.context) + '</p>';
    d.ledger.forEach(function(row){
      html += '<div class="dl-row' + (row[2] ? '' : ' pending') + '">' +
        '<span class="lm-dot' + (row[2] ? ' done' : '') + '"></span>' +
        '<div><div class="dl-label">' + esc(row[0]) + '</div><div class="dl-detail">' + esc(row[1]) + '</div></div>' +
        '<span class="dl-stamp">' + (row[2] ? 'Verified' : 'Pending') + '</span></div>';
    });
    html += '<div class="dl-costs"><div class="dl-costs-title">True move-in cost, itemised</div>';
    d.costs.forEach(function(c){
      html += '<div class="cost-line"><span>' + esc(c[0]) + '</span><span class="amt">' + esc(c[1]) + '</span></div>';
    });
    html += '<div class="cost-line total"><span>' + esc(d.total[0]) + '</span><span class="amt">' + esc(d.total[1]) + '</span></div>';
    html += '<div class="dl-lock" id="dl-lock"><p><strong>The itemised cost is part of the full ledger.</strong><br>Unlock every listing for 30 days with a Hunt Pass.</p>' +
      '<button type="button" class="btn btn-primary" id="dl-unlock">Unlock with Hunt Pass — KSh 299 (M-Pesa)</button>' +
      '<p style="font-size:0.7rem; opacity:0.75;">Concept demo — no real payment is taken.</p></div>';
    html += '</div>';
    detailBody.innerHTML = html;
    detailBody.scrollTop = 0;
    var unlockBtn = document.getElementById("dl-unlock");
    if (unlockBtn) {
      unlockBtn.addEventListener("click", function(){
        unlockBtn.disabled = true;
        unlockBtn.textContent = "Confirming M-Pesa… (demo)";
        setTimeout(function(){
          var lock = document.getElementById("dl-lock");
          if (lock) lock.classList.add("unlocked");
        }, 900);
      });
    }
    detailOverlay.classList.add("open");
  }

  document.querySelectorAll(".property-link[data-property]").forEach(function(link){
    link.addEventListener("click", function(e){
      e.preventDefault();
      openDetail(link.getAttribute("data-property"));
    });
  });
  if (detailClose) detailClose.addEventListener("click", function(){ detailOverlay.classList.remove("open"); });
  if (detailOverlay) detailOverlay.addEventListener("click", function(e){
    if (e.target === detailOverlay) detailOverlay.classList.remove("open");
  });

  // ---------- AI scam check (scripted concept) ----------
  var scamVerdicts = {
    risk: { cls: "risk", title: "✗ High risk — do not pay", lines: [
      "This number is not linked to any verified landlord or agent on NyumbaIQ.",
      "Pattern match: the same number appears across 3 different listings in 2 estates.",
      "It has requested a 'viewing fee' before viewing — the single most common scam signal in our interviews."
    ]},
    ok: { cls: "ok", title: "✓ Verified — ledger on file", lines: [
      "Matches the verified landlord of Kilimani Heights Apartments.",
      "Identity confirmed against national ID on 08 Jun 2026.",
      "Two completed tenancies recorded. No disputes on file."
    ]},
    unknown: { cls: "unknown", title: "— No record — treat as unverified", lines: [
      "This listing has no Trust Ledger on NyumbaIQ.",
      "No verified property matches the described location and price.",
      "Ask the lister to verify on NyumbaIQ before paying anything at all."
    ]}
  };

  var scInput = document.getElementById("sc-input");
  var scRun = document.getElementById("sc-run");
  var scResult = document.getElementById("sc-result");
  var scSampleMap = { "0712 345 678": "risk", "+254 700 111 222": "ok" };

  function runScamCheck(kind){
    if (!scResult) return;
    scResult.className = "sc-result";
    scResult.innerHTML = "";
    var scanning = document.createElement("div");
    scanning.className = "sc-scanning";
    scanning.innerHTML = '<span class="spinner"></span>Cross-referencing the Trust Ledger network…';
    scResult.classList.add("show");
    scResult.appendChild(scanning);
    setTimeout(function(){
      var v = scamVerdicts[kind];
      var html = '<div class="sc-verdict">' + v.title + '</div>';
      v.lines.forEach(function(line){
        html += '<div class="sc-line"><span class="dot"></span>' + line + '</div>';
      });
      scResult.className = "sc-result show " + v.cls;
      scResult.innerHTML = html;
    }, 1100);
  }

  document.querySelectorAll(".sc-sample").forEach(function(chip){
    chip.addEventListener("click", function(){
      if (scInput) scInput.value = chip.textContent;
      runScamCheck(chip.getAttribute("data-sample"));
    });
  });
  if (scRun) scRun.addEventListener("click", function(){
    var val = scInput ? scInput.value.trim() : "";
    if (!val) { if (scInput) scInput.focus(); return; }
    runScamCheck(scSampleMap[val] || "unknown");
  });
  if (scInput) scInput.addEventListener("keydown", function(e){
    if (e.key === "Enter") { e.preventDefault(); scRun.click(); }
  });

  // ---------- neighbourhood cards: fill search + jump to listings ----------
  document.querySelectorAll(".hood-card").forEach(function(card){
    card.addEventListener("click", function(){
      if (searchInput) searchInput.value = card.getAttribute("data-search");
      var grid = document.getElementById("property-grid");
      if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ---------- hunt request: timeline chips ----------
  var huntChips = document.querySelectorAll(".hunt-when");
  huntChips.forEach(function(chip){
    chip.addEventListener("click", function(){
      huntChips.forEach(function(c){ c.classList.remove("active"); });
      chip.classList.add("active");
    });
  });

  // ---------- scroll reveal ----------
  var revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
      revealEls.forEach(function(el){ revealObserver.observe(el); });
    } else {
      revealEls.forEach(function(el){ el.classList.add("in-view"); });
    }
  }
})();
