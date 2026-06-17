// ── DATA ──────────────────────────────────────
const PLAYERS = [
  { name: 'CherryKing_', rank: 'Legend', emoji: '👑', economy: 2450000, kills: 1842, deaths: 234, mobkills: 9241, playtime: '412h', firstJoin: 'Jan 3, 2025', location: 'Overworld', online: true },
  { name: 'SakuraQueen', rank: 'Elite', emoji: '🌸', economy: 1980000, kills: 1203, deaths: 412, mobkills: 7832, playtime: '387h', firstJoin: 'Jan 5, 2025', location: 'Nether', online: true },
  { name: 'BlossomX', rank: 'Pro', emoji: '🌺', economy: 1540000, kills: 984, deaths: 287, mobkills: 5412, playtime: '301h', firstJoin: 'Jan 8, 2025', location: 'Overworld', online: false },
  { name: 'PetalStorm', rank: 'Pro', emoji: '🍃', economy: 1320000, kills: 756, deaths: 198, mobkills: 4109, playtime: '278h', firstJoin: 'Jan 10, 2025', location: 'End', online: true },
  { name: 'MapleDew', rank: 'Member', emoji: '🍁', economy: 980000, kills: 534, deaths: 321, mobkills: 3041, playtime: '201h', firstJoin: 'Jan 15, 2025', location: 'Overworld', online: false },
  { name: 'ZenithWolf', rank: 'Member', emoji: '🐺', economy: 870000, kills: 498, deaths: 150, mobkills: 2891, playtime: '188h', firstJoin: 'Jan 17, 2025', location: 'Overworld', online: true },
  { name: 'IcePhoenix', rank: 'Member', emoji: '🦅', economy: 760000, kills: 412, deaths: 280, mobkills: 2213, playtime: '156h', firstJoin: 'Jan 20, 2025', location: 'Nether', online: false },
  { name: 'ThunderBeak', rank: 'Member', emoji: '⚡', economy: 650000, kills: 387, deaths: 199, mobkills: 1984, playtime: '134h', firstJoin: 'Jan 22, 2025', location: 'Overworld', online: true },
  { name: 'CrystalEdge', rank: 'Member', emoji: '💎', economy: 540000, kills: 312, deaths: 234, mobkills: 1721, playtime: '112h', firstJoin: 'Jan 25, 2025', location: 'Overworld', online: false },
  { name: 'VoidWalker', rank: 'Member', emoji: '🌑', economy: 430000, kills: 287, deaths: 312, mobkills: 1432, playtime: '98h', firstJoin: 'Jan 28, 2025', location: 'End', online: true },
];

const RULES = [
  { icon: '📜', title: 'General Rules', rules: [
    'Respect all players and staff at all times.',
    'No hacking, cheating, or using unauthorized mods.',
    'No advertising other servers or services.',
    'Do not exploit bugs or glitches — report them instead.',
    'Account sharing is not allowed. You are responsible for your account.',
  ]},
  { icon: '💬', title: 'Chat Rules', rules: [
    'No hate speech, slurs, racism, or discrimination of any kind.',
    'No excessive spamming or excessive caps.',
    'No NSFW content in any public channel.',
    'English only in global chat. Use /msg for other languages.',
    'Impersonating staff members is strictly prohibited.',
  ]},
  { icon: '⚔', title: 'PvP Rules', rules: [
    'PvP is only allowed in designated PvP zones unless both parties consent.',
    'No spawn killing or trap griefing at spawn areas.',
    'Kill farming / boosting is not allowed.',
    'Do not exploit PvP mechanics or hitboxes.',
  ]},
  { icon: '🏠', title: 'Survival Rules', rules: [
    'Griefing claimed land is prohibited.',
    'Do not build within 100 blocks of another player\'s claim without permission.',
    'Laggy redstone machines that affect server performance may be removed.',
    'AFK machines are not allowed.',
  ]},
  { icon: '💰', title: 'Economy Rules', rules: [
    'Scamming other players is strictly prohibited.',
    'Real-money trading (RMT) outside the official store is banned.',
    'Do not manipulate shop prices maliciously.',
    'Duplication glitches must be reported, not exploited.',
  ]},
  { icon: '🛡', title: 'Punishments', rules: [
    'Minor violations: Warning → Mute → Temporary ban.',
    'Major violations (hacking, hate speech): Immediate permanent ban.',
    'Ban appeals can be submitted via the Contact page.',
    'Staff decisions are final. Argue respectfully if you disagree.',
    'Repeated offenses result in harsher punishments.',
  ]},
];

let currentCategory = 'economy';
let lbFilter = '';
let currentPage = 1;

// ── INIT ──────────────────────────────────────
function init() {
  buildHeroPetals();
  buildLegendCards();
  buildMapPlayers();
  buildOnlinePlayersList();
  buildTop3();
  buildLeaderboardTable();
  buildRules();
  animateStats();
}

function buildHeroPetals() {
  const c = document.getElementById('heroPetals');
  const petals = ['🌸','🌺','🍃','🌿','🌷'];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.className = 'petal-svg';
    el.style.cssText = `left:${Math.random()*100}%;font-size:${12+Math.random()*20}px;animation-duration:${8+Math.random()*12}s;animation-delay:${-Math.random()*20}s`;
    el.textContent = petals[Math.floor(Math.random()*petals.length)];
    c.appendChild(el);
  }
}

function fmt(n) {
  if (n >= 1000000) return '$' + (n/1000000).toFixed(2) + 'M';
  if (n >= 1000) return '$' + (n/1000).toFixed(1) + 'K';
  return '$' + n;
}

function buildLegendCards() {
  const c = document.getElementById('legendCards');
  const top5 = [...PLAYERS].sort((a,b) => b.economy - a.economy).slice(0,5);
  const medals = ['🥇','🥈','🥉','4️⃣','5️⃣'];
  c.innerHTML = top5.map((p,i) => `
    <div class="legend-card" onclick="openProfile('${p.name}')">
      <div class="legend-rank">${medals[i]} #${i+1} Legend</div>
      <div class="player-head">${p.emoji}</div>
      <div class="player-name">${p.name}</div>
      <div class="player-rank-tag">${p.rank}</div>
      <div class="player-stats">
        <div class="pstat"><span class="pstat-label">💰 Net Worth</span><span class="pstat-val">${fmt(p.economy)}</span></div>
        <div class="pstat"><span class="pstat-label">⚔ Kills</span><span class="pstat-val">${p.kills.toLocaleString()}</span></div>
        <div class="pstat"><span class="pstat-label">🕒 Playtime</span><span class="pstat-val">${p.playtime}</span></div>
      </div>
      <button class="btn btn-outline btn-sm" style="width:100%;justify-content:center;margin-top:12px">Profile Details</button>
    </div>
  `).join('');
}

function buildMapPlayers() {
  const online = PLAYERS.filter(p => p.online);
  document.getElementById('mapPlayersList').innerHTML = online.map(p => `
    <div class="map-player-chip"><span class="live-dot"></span>${p.emoji} ${p.name} · ${p.location}</div>
  `).join('');
}

function buildOnlinePlayersList() {
  const online = PLAYERS.filter(p => p.online);
  const dims = {Overworld:'🌍',Nether:'🔥',End:'✨'};
  document.getElementById('onlinePlayersList').innerHTML = online.map(p => `
    <div class="online-player-row" onclick="openProfile('${p.name}')">
      <div class="player-mini-head">${p.emoji}</div>
      <div class="player-mini-info">
        <div class="player-mini-name">${p.name}</div>
        <div class="player-mini-loc">${dims[p.location]||'🌍'} ${p.location} · ${p.rank}</div>
      </div>
      <span class="live-dot"></span>
    </div>
  `).join('');
  document.getElementById('mapOnlineCount').textContent = online.length;
}

function buildTop3() {
  const sorted = [...PLAYERS].sort((a,b) => b[currentCategory] - a[currentCategory]);
  const medals = [{emoji:'🥇',cls:'gold'},{emoji:'🥈',cls:'silver'},{emoji:'🥉',cls:'bronze'}];
  const valFmt = v => currentCategory === 'economy' ? fmt(v) : currentCategory === 'playtime' ? v : v.toLocaleString();
  const order = [sorted[1], sorted[0], sorted[2]];
  const paddings = ['0','20px 0','0'];
  document.getElementById('top3Grid').innerHTML = order.map((p,i) => `
    <div class="top3-card ${medals[[1,0,2][i]].cls}" style="padding-bottom:${paddings[i]}" onclick="openProfile('${p.name}')">
      <div class="trophy">${medals[[1,0,2][i]].emoji}</div>
      <div class="player-head" style="width:44px;height:44px;margin:0 auto 8px;font-size:22px">${p.emoji}</div>
      <div class="top3-name">${p.name}</div>
      <div style="font-size:12px;color:var(--muted);margin-bottom:6px">${p.rank}</div>
      <div class="top3-val">${valFmt(p[currentCategory])}</div>
    </div>
  `).join('');
}

function buildLeaderboardTable() {
  const catKey = currentCategory;
  const valFmt = v => catKey === 'economy' ? fmt(v) : catKey === 'playtime' ? v : v.toLocaleString();
  let sorted = [...PLAYERS].sort((a,b) => {
    if (catKey === 'playtime') return parseInt(b.playtime) - parseInt(a.playtime);
    return b[catKey] - a[catKey];
  });
  if (lbFilter) sorted = sorted.filter(p => p.name.toLowerCase().includes(lbFilter.toLowerCase()));
  const perPage = 10; const total = sorted.length;
  const start = (currentPage-1)*perPage; const slice = sorted.slice(start, start+perPage);
  const headers = {economy:'Net Worth',kills:'Kills',deaths:'Deaths',mobkills:'Mob Kills',playtime:'Playtime'};
  document.getElementById('lbValHeader').textContent = headers[catKey];
  document.getElementById('lbTableBody').innerHTML = slice.map((p,i) => `
    <tr class="lb-row" onclick="openProfile('${p.name}')">
      <td class="lb-rank">#${start+i+1}</td>
      <td><div class="lb-player"><div class="player-mini-head" style="width:30px;height:30px;font-size:14px">${p.emoji}</div><div class="lb-player-name">${p.name}</div></div></td>
      <td><span class="player-rank-tag">${p.rank}</span></td>
      <td style="font-weight:700;color:var(--cherry)">${valFmt(p[catKey])}</td>
      <td style="font-size:13px">${p.kills.toLocaleString()}</td>
      <td style="font-size:13px">${p.playtime}</td>
    </tr>
  `).join('');
  const pages = Math.ceil(total/perPage);
  let pagBtns = '';
  for (let pg = 1; pg <= pages; pg++) pagBtns += `<button class="page-btn${pg===currentPage?' active':''}" onclick="setPage(${pg})">${pg}</button>`;
  document.getElementById('lbPagination').innerHTML = pagBtns;
}

function buildRules() {
  document.getElementById('rulesAccordion').innerHTML = RULES.map((s,i) => `
    <div class="rule-section">
      <div class="rule-section-header" id="rh${i}" onclick="toggleRule(${i})">
        <div style="display:flex;align-items:center;gap:10px"><span class="rule-section-icon">${s.icon}</span>${s.title}</div>
        <span class="rule-section-chevron">▾</span>
      </div>
      <div class="rule-section-body" id="rb${i}">
        ${s.rules.map((r,j)=>`<div class="rule-item"><span class="rule-num">${j+1}.</span><span>${r}</span></div>`).join('')}
      </div>
    </div>
  `).join('');
}

function toggleRule(i) {
  const h = document.getElementById('rh'+i), b = document.getElementById('rb'+i);
  h.classList.toggle('open'); b.classList.toggle('open');
}

// ── NAVIGATION ────────────────────────────────
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  const links = document.querySelectorAll('.nav-link');
  links.forEach(l => { if (l.textContent.toLowerCase().includes(id)) l.classList.add('active'); });
  window.scrollTo(0,0);
}

function openProfile(name) {
  const p = PLAYERS.find(x => x.name === name);
  if (!p) return;
  document.getElementById('profileSkin').textContent = p.emoji;
  document.getElementById('profileName').textContent = p.name;
  document.getElementById('profileBadge').textContent = p.online ? '● ONLINE' : '○ OFFLINE';
  document.getElementById('profileBadge').style.background = p.online ? '#2ed573' : '#636e72';
  document.getElementById('profileRankBadge').textContent = '⭐ ' + p.rank;
  document.getElementById('profileFirstJoin').textContent = p.firstJoin;
  document.getElementById('profileLocation').textContent = p.online ? p.location : 'Offline';
  document.getElementById('profileLastSeen').textContent = p.online ? 'Now' : '2 hours ago';
  document.getElementById('profileStatsGrid').innerHTML = [
    {icon:'💰',label:'Net Worth',val:fmt(p.economy),sub:'ExcellentEconomy'},
    {icon:'⚔',label:'Kills',val:p.kills.toLocaleString(),sub:'AxKills'},
    {icon:'☠',label:'Deaths',val:p.deaths.toLocaleString(),sub:'AxKills'},
    {icon:'📈',label:'KDR',val:(p.kills/Math.max(1,p.deaths)).toFixed(2),sub:'Kill/Death Ratio'},
    {icon:'👹',label:'Mob Kills',val:p.mobkills.toLocaleString(),sub:'AxKills'},
    {icon:'🕒',label:'Playtime',val:p.playtime,sub:'TAB Plugin'},
    {icon:'⛏',label:'Blocks Mined',val:'—',sub:'Coming soon'},
    {icon:'🏠',label:'Claims',val:'—',sub:'GriefPrevention (future)'},
  ].map(s=>`
    <div class="stat-card">
      <div class="stat-card-icon">${s.icon}</div>
      <div class="stat-card-label">${s.label}</div>
      <div class="stat-card-val">${s.val}</div>
      <div class="stat-card-sub">${s.sub}</div>
    </div>
  `).join('');
  showPage('player');
}

// ── LEADERBOARD CONTROLS ──────────────────────
function setCategory(cat) {
  currentCategory = cat; currentPage = 1;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  buildTop3(); buildLeaderboardTable();
}
function filterLeaderboard(v) { lbFilter = v; currentPage = 1; buildLeaderboardTable(); }
function setPage(n) { currentPage = n; buildLeaderboardTable(); }
function setDim(d) {
  document.querySelectorAll('[id^="dim"]').forEach(b => { b.className = 'btn btn-outline btn-sm'; });
  document.getElementById('dim'+d[0].toUpperCase()+d.slice(1)).className = 'btn btn-ghost btn-sm';
}

// ── UTILITIES ─────────────────────────────────
function copyIP() {
  navigator.clipboard.writeText('play.dbsnetwork.net').catch(()=>{});
  showToast('✅ Copied: play.dbsnetwork.net');
}
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
function toggleTheme() {
  const dark = document.body.getAttribute('data-theme') === 'dark';
  document.body.setAttribute('data-theme', dark ? '' : 'dark');
  document.getElementById('themeBtn').textContent = dark ? '🌙' : '☀️';
  localStorage.setItem('dbs-theme', dark ? 'light' : 'dark');
}
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function submitContact() {
  const mc = document.getElementById('cfMC').value;
  const sub = document.getElementById('cfSubject').value;
  const msg = document.getElementById('cfMessage').value;
  if (!mc || !sub || !msg) { showToast('⚠ Please fill in all required fields'); return; }
  showToast('✅ Message sent! We\'ll respond within 48h.');
  ['cfMC','cfDiscord','cfEmail','cfMessage'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('cfSubject').value = '';
}
function animateStats() {
  const el = document.getElementById('stat-players');
  let n = 0; const target = 12;
  const iv = setInterval(() => { if (n >= target) { clearInterval(iv); return; } el.textContent = ++n; }, 80);
}

// ── RESTORE THEME ─────────────────────────────
if (localStorage.getItem('dbs-theme') === 'dark') {
  document.body.setAttribute('data-theme','dark');
  document.addEventListener('DOMContentLoaded', () => {
    const b = document.getElementById('themeBtn');
    if (b) b.textContent = '☀️';
  });
}

document.addEventListener('DOMContentLoaded', init);

document.addEventListener('DOMContentLoaded',()=>{
 setTimeout(()=>{
   const l=document.getElementById('dbs-loader');
   if(l) l.remove();
 },1200);

 document.querySelectorAll('.section,.legend-card,.stat-card,.join-section,.vote-card,.contact-info-card').forEach(el=>{
   el.classList.add('reveal');
 });

 const io=new IntersectionObserver(entries=>{
   entries.forEach(e=>{
     if(e.isIntersecting) e.target.classList.add('show');
   });
 },{threshold:.1});

 document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

 document.addEventListener('click',e=>{
   const btn=e.target.closest('.btn');
   if(!btn) return;
   const r=document.createElement('span');
   r.style.cssText='position:absolute;width:12px;height:12px;border-radius:50%;background:rgba(255,255,255,.5);left:50%;top:50%;transform:translate(-50%,-50%);animation:ripple .6s ease-out forwards;pointer-events:none';
   btn.appendChild(r);
   setTimeout(()=>r.remove(),600);
 });
});

const style=document.createElement('style');
style.textContent='@keyframes ripple{from{opacity:.7;transform:translate(-50%,-50%) scale(1)}to{opacity:0;transform:translate(-50%,-50%) scale(12)}}';
document.head.appendChild(style);
