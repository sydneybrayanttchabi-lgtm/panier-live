import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Home, Trophy, Calendar as CalendarIcon, User as UserIcon, Plus, X, LogOut, ChevronLeft, ChevronRight, MapPin, Clock, Target, Award, Shuffle, Trash2, Loader2, MessageCircle, Phone, Send, Users, RotateCcw } from 'lucide-react';
/* ============================== THEME ============================== */
const ROOT_VARS = {
    '--bg': '#16140F',
    '--surface': '#201D17',
    '--surface2': '#2A2620',
    '--line': '#3A342A',
    '--chalk': '#F5F0E6',
    '--muted': '#A79A87',
    '--leather': '#C96A34',
    '--leather-dim': '#3A2211',
    '--amber': '#E7A93D',
    '--amber-dim': '#3D2E10',
    '--teal': '#4C8B76',
    '--teal-dim': '#16261F',
    '--brick': '#C1503F',
    '--brick-dim': '#331612',
};
const CSS_TEXT = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:wght@400;600;700&family=Inter:wght@400;500;600;700;800&display=swap');

.pl-app { background: var(--bg); color: var(--chalk); font-family: 'Inter', system-ui, sans-serif; }
.pl-display { font-family: 'Anton', sans-serif; letter-spacing: 0.02em; }
.pl-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
.pl-score { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; text-shadow: 0 0 12px rgba(231,169,61,0.35); color: var(--amber); font-weight: 700; }
.pl-score-dim { color: var(--muted); text-shadow: none; font-weight: 500; }

.pl-card { background: var(--surface); border: 1px solid var(--line); border-radius: 1rem; }
.pl-card-hover:hover { border-color: var(--leather); }
.pl-card-accent { border-left: 3px solid var(--leather); }

.pl-eyebrow { display: inline-flex; align-items: center; gap: .4rem; font-size: .68rem; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); font-weight: 700; }
.pl-eyebrow-dot { width: 6px; height: 6px; border-radius: 2px; background: var(--leather); display: inline-block; flex-shrink: 0; }

.pl-btn { border-radius: .75rem; font-weight: 600; transition: filter .15s ease, transform .1s ease, opacity .15s ease; cursor: pointer; border: none; }
.pl-btn:active { transform: scale(0.97); }
.pl-btn:disabled { opacity: .4; cursor: not-allowed; transform: none; }
.pl-btn-primary { background: var(--leather); color: #1A0E06; }
.pl-btn-primary:hover:not(:disabled) { filter: brightness(1.12); }
.pl-btn-secondary { background: var(--surface2); color: var(--chalk); border: 1px solid var(--line); }
.pl-btn-secondary:hover:not(:disabled) { border-color: var(--leather); }
.pl-btn-ghost { background: transparent; color: var(--muted); }
.pl-btn-ghost:hover:not(:disabled) { color: var(--chalk); background: var(--surface2); }
.pl-btn-danger { background: var(--brick-dim); color: var(--brick); border: 1px solid var(--brick); }
.pl-btn-danger:hover:not(:disabled) { background: var(--brick); color: #1A0E06; }

.pl-input, .pl-textarea { background: var(--bg); border: 1px solid var(--line); border-radius: .7rem; color: var(--chalk); padding: .6rem .8rem; width: 100%; font-size: .9rem; font-family: inherit; }
.pl-input:focus, .pl-textarea:focus { outline: none; border-color: var(--leather); }
.pl-input::placeholder, .pl-textarea::placeholder { color: var(--muted); }

.pl-label { font-size: .75rem; font-weight: 700; color: var(--muted); margin-bottom: .35rem; display: block; }

.pl-badge { display: inline-flex; align-items: center; gap: .3rem; padding: .22rem .58rem; border-radius: 999px; font-size: .68rem; font-weight: 700; letter-spacing: .03em; text-transform: uppercase; white-space: nowrap; }
.pl-badge-leather { background: var(--leather-dim); color: var(--leather); }
.pl-badge-amber { background: var(--amber-dim); color: var(--amber); }
.pl-badge-teal { background: var(--teal-dim); color: var(--teal); }
.pl-badge-muted { background: var(--surface2); color: var(--muted); text-transform: none; letter-spacing: 0; }

.pl-nav { background: var(--surface); border-top: 1px solid var(--line); }
.pl-nav-item { color: var(--muted); }
.pl-nav-item.active { color: var(--leather); }

.pl-tab-chip { border-radius: 999px; padding: .42rem .9rem; font-size: .78rem; font-weight: 600; border: 1px solid var(--line); color: var(--muted); white-space: nowrap; background: transparent; cursor: pointer; }
.pl-tab-chip.active { border-color: var(--leather); color: var(--leather); background: var(--leather-dim); }

.pl-avatar { border-radius: 999px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #1A0E06; flex-shrink: 0; }

.pl-live-dot { width: 7px; height: 7px; border-radius: 999px; background: var(--amber); display: inline-block; }

.pl-modal-overlay { background: rgba(10,9,6,0.75); }
.pl-modal-panel { animation: pl-slideup .22s ease-out; }
@keyframes pl-slideup { from { transform: translateY(18px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.pl-fadein { animation: pl-fadein .18s ease-out; }
@keyframes pl-fadein { from { opacity: 0; } to { opacity: 1; } }

.pl-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
.pl-scroll::-webkit-scrollbar-thumb { background: var(--line); border-radius: 4px; }
.pl-scroll { scrollbar-width: thin; }

.pl-court-divider { height: 1px; background: repeating-linear-gradient(90deg, var(--line) 0 8px, transparent 8px 14px); }

.pl-sidebar-item { color: var(--muted); width: 100%; display: flex; align-items: center; gap: .75rem; padding: .65rem .8rem; border-radius: .7rem; font-size: .9rem; font-weight: 600; background: transparent; border: none; cursor: pointer; text-align: left; }
.pl-sidebar-item:hover { background: var(--surface2); color: var(--chalk); }
.pl-sidebar-item.active { background: var(--leather-dim); color: var(--leather); }

.pl-content-pad { padding-bottom: 5.5rem; }
@media (min-width: 768px) {
  .pl-hide-desktop { display: none !important; }
  .pl-content-pad { padding-bottom: 2.5rem; }
}
@media (max-width: 767px) {
  .pl-hide-mobile { display: none !important; }
}
`;
function GlobalStyle() {
    return React.createElement("style", null, CSS_TEXT);
}
/* ============================== CONSTANTS ============================== */
const K = { users: 'app:users', tournaments: 'app:tournaments', sessions: 'app:sessions', messages: 'app:messages' };
const FORMATS = [
    { id: '1v1', label: '1 contre 1', size: 1 },
    { id: '2v2', label: '2 contre 2', size: 2 },
    { id: '3v3', label: '3 contre 3', size: 3 },
    { id: '4v4', label: '4 contre 4', size: 4 },
    { id: '5v5', label: '5 contre 5', size: 5 },
];
function formatOf(id) { return FORMATS.find(f => f.id === id) || FORMATS[0]; }
const RULE_PRESETS = [
    { id: 'eclair', label: 'Éclair', targetPoints: 11, desc: 'Premier à 11 points' },
    { id: 'standard', label: 'Standard', targetPoints: 21, desc: 'Premier à 21 points' },
    { id: 'marathon', label: 'Marathon', targetPoints: 50, desc: 'Premier à 50 points' },
    { id: 'custom', label: 'Personnalisé', targetPoints: 21, desc: '' },
];
const AVATAR_COLORS = ['#C96A34', '#E7A93D', '#4C8B76', '#4E7FC1', '#B25FC0', '#C1503F', '#7BAF6E', '#D68A3E'];
const POSITIONS = ['Meneur', 'Arrière', 'Ailier', 'Ailier fort', 'Pivot', 'Polyvalent'];
const WEEKDAYS_FR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const NAV_ITEMS = [
    { id: 'dashboard', label: 'Accueil', icon: Home },
    { id: 'tournois', label: 'Tournois', icon: Trophy },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'calendrier', label: 'Agenda', icon: CalendarIcon },
    { id: 'profil', label: 'Profil', icon: UserIcon },
];
/* ============================== UTILS ============================== */
function uid(p = 'id') { return `${p}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`; }
function cls(...a) { return a.filter(Boolean).join(' '); }
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function nextPow2(n) { let s = 1; while (s < n)
    s *= 2; return s; }
function initials(name = '') {
    const parts = String(name).trim().split(/\s+/).filter(Boolean);
    if (!parts.length)
        return '?';
    return parts.slice(0, 2).map(w => w[0].toUpperCase()).join('');
}
function pad2(n) { return String(n).padStart(2, '0'); }
function toDateKey(d) { return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`; }
function todayKey() { return toDateKey(new Date()); }
function fmtDateLong(key) {
    const [y, m, d] = key.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    const s = dt.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    return s.charAt(0).toUpperCase() + s.slice(1);
}
function fmtMonthYear(d) {
    const s = d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    return s.charAt(0).toUpperCase() + s.slice(1);
}
function timeAgo(ts) {
    const diff = Date.now() - ts;
    const min = Math.floor(diff / 60000);
    if (min < 1)
        return "à l'instant";
    if (min < 60)
        return `il y a ${min} min`;
    const h = Math.floor(min / 60);
    if (h < 24)
        return `il y a ${h} h`;
    const j = Math.floor(h / 24);
    return `il y a ${j} j`;
}
function buildMonthGrid(viewDate) {
    const year = viewDate.getFullYear(), month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startOffset; i++)
        cells.push(null);
    for (let d = 1; d <= daysInMonth; d++)
        cells.push(new Date(year, month, d));
    return cells;
}
function dmId(a, b) { return `dm:${[a, b].sort().join('_')}`; }
/* ============================== STORAGE ============================== */
async function loadKey(key) {
    try {
        const r = await window.storage.get(key, true);
        return r ? JSON.parse(r.value) : [];
    }
    catch (e) {
        return [];
    }
}
async function mutateCollection(key, updater) {
    let current = [];
    try {
        const r = await window.storage.get(key, true);
        current = r ? JSON.parse(r.value) : [];
    }
    catch (e) {
        current = [];
    }
    const updated = updater(current);
    try {
        await window.storage.set(key, JSON.stringify(updated), true);
    }
    catch (e) {
        console.error('Erreur de sauvegarde', e);
    }
    return updated;
}
/* ============================== BRACKET LOGIC ============================== */
function buildUnits(tournament, users) {
    const format = formatOf(tournament.format);
    const size = format.size;
    const participantUsers = tournament.participantsUserIds.map(id => users.find(u => u.id === id)).filter(Boolean);
    const shuffled = shuffle(participantUsers);
    if (size === 1) {
        return { units: shuffled.map(u => ({ id: u.id, name: u.name })), leftover: [], teams: null };
    }
    const teams = [];
    let i = 0, teamNum = 1;
    while (i + size <= shuffled.length) {
        const members = shuffled.slice(i, i + size);
        teams.push({ id: uid('team'), name: `Équipe ${teamNum}`, memberIds: members.map(m => m.id) });
        i += size;
        teamNum++;
    }
    const leftover = shuffled.slice(i);
    return { units: teams.map(t => ({ id: t.id, name: t.name })), leftover, teams };
}
function makeMatch(a, b, roundIndex, matchIndex) {
    const sideA = a ? { refId: a.id, name: a.name, score: null } : null;
    const sideB = b ? { refId: b.id, name: b.name, score: null } : null;
    let status = 'pending', winnerRefId = null;
    if (a && !b) {
        status = 'termine';
        winnerRefId = a.id;
    }
    else if (!a && b) {
        status = 'termine';
        winnerRefId = b.id;
    }
    else if (!a && !b) {
        status = 'attente';
    }
    return { id: uid('m'), roundIndex, matchIndex, sideA, sideB, status, winnerRefId, liveScore: null };
}
function makeEmptyMatch(roundIndex, matchIndex) {
    return { id: uid('m'), roundIndex, matchIndex, sideA: null, sideB: null, status: 'attente', winnerRefId: null, liveScore: null };
}
function placeWinner(rounds, roundIndex, matchIndex, winnerId, winnerName) {
    if (roundIndex + 1 >= rounds.length)
        return;
    const nextMatch = rounds[roundIndex + 1][Math.floor(matchIndex / 2)];
    const side = matchIndex % 2 === 0 ? 'sideA' : 'sideB';
    nextMatch[side] = { refId: winnerId, name: winnerName, score: null };
    if (nextMatch.sideA && nextMatch.sideB)
        nextMatch.status = 'pending';
}
function resolveByes(rounds) {
    for (let r = 0; r < rounds.length - 1; r++) {
        rounds[r].forEach((match, mi) => {
            if (match.status === 'termine' && match.winnerRefId) {
                const winnerName = match.sideA && match.sideA.refId === match.winnerRefId ? match.sideA.name : (match.sideB ? match.sideB.name : '');
                placeWinner(rounds, r, mi, match.winnerRefId, winnerName);
            }
        });
    }
}
function buildBracket(units) {
    const n = units.length;
    const size = nextPow2(n);
    const numByes = size - n;
    const totalMatches = size / 2;
    const round0 = [];
    let idx = 0;
    for (let i = 0; i < totalMatches; i++) {
        if (i < numByes) {
            const a = units[idx++];
            round0.push(makeMatch(a, null, 0, i));
        }
        else {
            const a = units[idx++];
            const b = units[idx++];
            round0.push(makeMatch(a, b, 0, i));
        }
    }
    const rounds = [round0];
    let roundSize = totalMatches, rIndex = 1;
    while (roundSize > 1) {
        roundSize /= 2;
        const r = [];
        for (let i = 0; i < roundSize; i++)
            r.push(makeEmptyMatch(rIndex, i));
        rounds.push(r);
        rIndex++;
    }
    resolveByes(rounds);
    return rounds;
}
function applyScore(tournament, roundIndex, matchIndex, scoreA, scoreB) {
    const t = JSON.parse(JSON.stringify(tournament));
    const match = t.bracket.rounds[roundIndex][matchIndex];
    match.sideA.score = scoreA;
    match.sideB.score = scoreB;
    const winnerSide = scoreA > scoreB ? 'sideA' : 'sideB';
    match.winnerRefId = match[winnerSide].refId;
    match.status = 'termine';
    match.liveScore = null;
    const winnerName = match[winnerSide].name;
    const isFinal = roundIndex === t.bracket.rounds.length - 1;
    if (isFinal) {
        t.champion = match.winnerRefId;
        t.status = 'termine';
    }
    else {
        placeWinner(t.bracket.rounds, roundIndex, matchIndex, match.winnerRefId, winnerName);
    }
    return t;
}
function findUnitInRounds(rounds, refId) {
    for (const round of rounds) {
        for (const m of round) {
            if (m.sideA && m.sideA.refId === refId)
                return m.sideA.name;
            if (m.sideB && m.sideB.refId === refId)
                return m.sideB.name;
        }
    }
    return '?';
}
function getStandings(t) {
    if (!t.bracket)
        return [];
    const rounds = t.bracket.rounds;
    const groups = [];
    if (t.champion)
        groups.push({ label: 'Champion', names: [findUnitInRounds(rounds, t.champion)] });
    for (let r = rounds.length - 1; r >= 0; r--) {
        const names = [];
        rounds[r].forEach(m => {
            if (m.status === 'termine' && m.winnerRefId && m.sideA && m.sideB && m.sideA.score != null && m.sideB.score != null) {
                const loser = m.sideA.refId === m.winnerRefId ? m.sideB : m.sideA;
                names.push(loser.name);
            }
        });
        if (names.length) {
            const label = r === rounds.length - 1 ? 'Finaliste' : r === rounds.length - 2 ? 'Demi-finaliste' : `Éliminé — tour ${r + 1}`;
            groups.push({ label, names });
        }
    }
    return groups;
}
function userInSide(tournament, side, userId) {
    if (!side)
        return false;
    if (tournament.format === '1v1')
        return side.refId === userId;
    const team = (tournament.teams || []).find(tm => tm.id === side.refId);
    return team ? team.memberIds.includes(userId) : false;
}
function roundLabel(idx, total) {
    const fromEnd = total - 1 - idx;
    if (fromEnd === 0)
        return 'Finale';
    if (fromEnd === 1)
        return 'Demi-finale';
    if (fromEnd === 2)
        return 'Quart de finale';
    return `Tour ${idx + 1}`;
}
/* ============================== STATS ============================== */
function computeStats(users, tournaments) {
    const stats = {};
    const ensure = (id) => {
        if (!stats[id])
            stats[id] = { userId: id, played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0, tournamentsWon: 0, byFormat: {} };
        return stats[id];
    };
    users.forEach(u => ensure(u.id));
    tournaments.forEach(t => {
        if (!t.bracket)
            return;
        const teamMembers = {};
        if (t.format === '1v1') {
            t.participantsUserIds.forEach(id => { teamMembers[id] = [id]; });
        }
        else if (t.teams) {
            t.teams.forEach(team => { teamMembers[team.id] = team.memberIds; });
        }
        t.bracket.rounds.forEach(round => {
            round.forEach(match => {
                if (match.status !== 'termine' || !match.sideA || !match.sideB || match.sideA.score == null || match.sideB.score == null)
                    return;
                const aMembers = teamMembers[match.sideA.refId] || [];
                const bMembers = teamMembers[match.sideB.refId] || [];
                aMembers.forEach(uidm => {
                    const s = ensure(uidm);
                    s.played++;
                    s.pointsFor += match.sideA.score;
                    s.pointsAgainst += match.sideB.score;
                    if (match.winnerRefId === match.sideA.refId)
                        s.wins++;
                    else
                        s.losses++;
                    s.byFormat[t.format] = s.byFormat[t.format] || { played: 0, wins: 0 };
                    s.byFormat[t.format].played++;
                    if (match.winnerRefId === match.sideA.refId)
                        s.byFormat[t.format].wins++;
                });
                bMembers.forEach(uidm => {
                    const s = ensure(uidm);
                    s.played++;
                    s.pointsFor += match.sideB.score;
                    s.pointsAgainst += match.sideA.score;
                    if (match.winnerRefId === match.sideB.refId)
                        s.wins++;
                    else
                        s.losses++;
                    s.byFormat[t.format] = s.byFormat[t.format] || { played: 0, wins: 0 };
                    s.byFormat[t.format].played++;
                    if (match.winnerRefId === match.sideB.refId)
                        s.byFormat[t.format].wins++;
                });
            });
        });
        if (t.champion) {
            const championMembers = teamMembers[t.champion] || [t.champion];
            championMembers.forEach(uidm => { ensure(uidm).tournamentsWon++; });
        }
    });
    return stats;
}
/* ============================== PRIMITIVES ============================== */
function Avatar({ user, size = 'md' }) {
    const dims = { xs: 24, sm: 32, md: 40, lg: 56, xl: 80 };
    const d = dims[size] || 40;
    const fontSize = d <= 24 ? 10 : d <= 32 ? 12 : d <= 40 ? 14 : d <= 56 ? 20 : 28;
    return (React.createElement("div", { className: "pl-avatar", style: { width: d, height: d, background: (user && user.color) || 'var(--leather)', fontSize } }, initials(user && user.name)));
}
function EmptyState({ icon: Icon, title, subtitle }) {
    return (React.createElement("div", { className: "pl-card p-8 text-center" },
        Icon && React.createElement(Icon, { size: 28, style: { color: 'var(--muted)', margin: '0 auto' } }),
        React.createElement("div", { className: "font-semibold mt-3", style: { color: 'var(--chalk)' } }, title),
        subtitle && React.createElement("div", { className: "text-sm mt-1", style: { color: 'var(--muted)' } }, subtitle)));
}
function Modal({ title, onClose, children }) {
    return (React.createElement("div", { className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" },
        React.createElement("div", { className: "absolute inset-0 pl-modal-overlay", onClick: onClose }),
        React.createElement("div", { className: "pl-card pl-modal-panel relative w-full sm:max-w-md p-5 pl-scroll", style: { maxHeight: '88vh', overflowY: 'auto' } },
            React.createElement("div", { className: "flex items-center justify-between mb-4" },
                React.createElement("h3", { className: "pl-display text-lg" }, title),
                React.createElement("button", { className: "pl-btn pl-btn-ghost p-1.5", onClick: onClose },
                    React.createElement(X, { size: 18 }))),
            children)));
}
function StatCard({ label, value, color }) {
    return (React.createElement("div", { className: "pl-card p-4" },
        React.createElement("span", { className: "pl-eyebrow" }, label),
        React.createElement("div", { className: "pl-score text-3xl mt-2", style: color ? { color } : undefined }, value)));
}
function LoadingScreen() {
    return (React.createElement("div", { className: "min-h-screen flex items-center justify-center" },
        React.createElement("div", { className: "text-center" },
            React.createElement(Loader2, { size: 28, className: "animate-spin", style: { color: 'var(--leather)', margin: '0 auto' } }),
            React.createElement("div", { className: "text-sm mt-3", style: { color: 'var(--muted)' } }, "Chargement\u2026"))));
}
/* ============================== AUTH ============================== */
function AuthScreen({ users, onCreateUser, onLogin }) {
    const [mode, setMode] = useState('select');
    const [pinUser, setPinUser] = useState(null);
    const [pinInput, setPinInput] = useState('');
    const [pinError, setPinError] = useState('');
    const [name, setName] = useState('');
    const [color, setColor] = useState(AVATAR_COLORS[0]);
    const [pin, setPin] = useState('');
    const [position, setPosition] = useState(POSITIONS[0]);
    const [phone, setPhone] = useState('');
    const [createError, setCreateError] = useState('');
    function selectUser(u) {
        if (u.pin) {
            setPinUser(u);
            setPinInput('');
            setPinError('');
        }
        else
            onLogin(u);
    }
    function submitPin() {
        if (pinInput === pinUser.pin)
            onLogin(pinUser);
        else
            setPinError('Code incorrect.');
    }
    function submitCreate() {
        const trimmed = name.trim();
        if (!trimmed) {
            setCreateError('Entrez votre nom.');
            return;
        }
        if (users.some(u => u.name.toLowerCase() === trimmed.toLowerCase())) {
            setCreateError('Ce nom est déjà pris.');
            return;
        }
        if (pin && !/^\d{4}$/.test(pin)) {
            setCreateError('Le code doit contenir 4 chiffres.');
            return;
        }
        onCreateUser({ name: trimmed, color, pin: pin || null, position, phone: phone.trim() || null });
    }
    return (React.createElement("div", { className: "min-h-screen flex items-center justify-center p-5" },
        React.createElement("div", { className: "w-full", style: { maxWidth: '420px' } },
            React.createElement("div", { className: "text-center mb-6" },
                React.createElement("div", { style: { fontSize: '40px' } }, "\uD83C\uDFC0"),
                React.createElement("div", { className: "pl-display text-3xl mt-2" }, "Panier Live"),
                React.createElement("div", { className: "text-sm mt-1", style: { color: 'var(--muted)' } }, "Tournois et sessions entre amis")),
            pinUser ? (React.createElement("div", { className: "pl-card p-5" },
                React.createElement("div", { className: "flex items-center gap-3 mb-4" },
                    React.createElement(Avatar, { user: pinUser, size: "md" }),
                    React.createElement("div", { className: "font-semibold" }, pinUser.name)),
                React.createElement("label", { className: "pl-label" }, "Code \u00E0 4 chiffres"),
                React.createElement("input", { type: "password", inputMode: "numeric", maxLength: "4", className: "pl-input", style: { letterSpacing: '0.3em', textAlign: 'center', fontSize: '1.2rem' }, value: pinInput, onChange: e => setPinInput(e.target.value.replace(/\D/g, '')), onKeyDown: e => { if (e.key === 'Enter')
                        submitPin(); }, autoFocus: true }),
                pinError && React.createElement("div", { className: "text-sm mt-2", style: { color: 'var(--brick)' } }, pinError),
                React.createElement("div", { className: "flex gap-2 mt-4" },
                    React.createElement("button", { className: "pl-btn pl-btn-secondary flex-1 py-2.5", onClick: () => setPinUser(null) }, "Retour"),
                    React.createElement("button", { className: "pl-btn pl-btn-primary flex-1 py-2.5", onClick: submitPin }, "Entrer")))) : mode === 'select' ? (React.createElement("div", { className: "pl-card p-5" },
                users.length > 0 ? (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "pl-eyebrow mb-3" },
                        React.createElement("span", { className: "pl-eyebrow-dot" }),
                        "Choisissez votre profil"),
                    React.createElement("div", { className: "space-y-2 mb-4" }, users.map(u => (React.createElement("button", { key: u.id, className: "w-full flex items-center gap-3 p-3 rounded-lg", style: { background: 'var(--surface2)' }, onClick: () => selectUser(u) },
                        React.createElement(Avatar, { user: u, size: "sm" }),
                        React.createElement("span", { className: "font-medium" }, u.name))))))) : (React.createElement("div", { className: "text-sm mb-4", style: { color: 'var(--muted)' } }, "Aucun profil pour l'instant \u2014 cr\u00E9ez le premier !")),
                React.createElement("button", { className: "pl-btn pl-btn-primary w-full py-2.5 flex items-center justify-center gap-1.5", onClick: () => setMode('create') },
                    React.createElement(Plus, { size: 16 }),
                    " Nouveau profil"))) : (React.createElement("div", { className: "pl-card p-5" },
                React.createElement("div", { className: "pl-eyebrow mb-3" },
                    React.createElement("span", { className: "pl-eyebrow-dot" }),
                    "Nouveau profil"),
                React.createElement("div", { className: "space-y-3" },
                    React.createElement("div", null,
                        React.createElement("label", { className: "pl-label" }, "Nom"),
                        React.createElement("input", { className: "pl-input", placeholder: "Votre nom", value: name, onChange: e => setName(e.target.value), autoFocus: true })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "pl-label" }, "Couleur"),
                        React.createElement("div", { className: "flex gap-2 flex-wrap" }, AVATAR_COLORS.map(c => (React.createElement("button", { key: c, onClick: () => setColor(c), style: { width: 32, height: 32, borderRadius: 999, background: c, border: color === c ? '2px solid var(--chalk)' : '2px solid transparent' } }))))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "pl-label" }, "Poste favori"),
                        React.createElement("div", { className: "flex flex-wrap gap-2" }, POSITIONS.map(p => (React.createElement("button", { key: p, className: cls('pl-tab-chip', position === p && 'active'), onClick: () => setPosition(p) }, p))))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "pl-label" }, "Code \u00E0 4 chiffres (optionnel)"),
                        React.createElement("input", { type: "password", inputMode: "numeric", maxLength: "4", className: "pl-input", value: pin, onChange: e => setPin(e.target.value.replace(/\D/g, '')), placeholder: "\u2022\u2022\u2022\u2022" })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "pl-label" }, "T\u00E9l\u00E9phone (optionnel, pour \u00EAtre appel\u00E9)"),
                        React.createElement("input", { type: "tel", className: "pl-input", value: phone, onChange: e => setPhone(e.target.value), placeholder: "Ex. 06 12 34 56 78" })),
                    createError && React.createElement("div", { className: "text-sm", style: { color: 'var(--brick)' } }, createError),
                    React.createElement("button", { className: "pl-btn pl-btn-primary w-full py-2.5", onClick: submitCreate }, "Cr\u00E9er mon profil"),
                    React.createElement("button", { className: "pl-btn pl-btn-ghost w-full py-2", onClick: () => setMode('select') }, "Annuler")))),
            React.createElement("div", { className: "text-xs text-center mt-5", style: { color: 'var(--muted)' } }, "D\u00E9mo : les profils sont partag\u00E9s entre tous les utilisateurs de cette application. Le code n'est qu'un rappel personnel, pas une s\u00E9curit\u00E9 r\u00E9elle."))));
}
/* ============================== HEADER / NAV ============================== */
function Header({ currentUser, onLogout }) {
    return (React.createElement("header", { className: "sticky top-0 z-20", style: { background: 'var(--surface)', borderBottom: '1px solid var(--line)' } },
        React.createElement("div", { className: "max-w-5xl mx-auto px-4 py-3 flex items-center justify-between" },
            React.createElement("div", { className: "flex items-center gap-2" },
                React.createElement("span", { style: { fontSize: '22px' } }, "\uD83C\uDFC0"),
                React.createElement("span", { className: "pl-display text-lg" }, "Panier Live")),
            React.createElement("div", { className: "flex items-center gap-2" },
                React.createElement(Avatar, { user: currentUser, size: "sm" }),
                React.createElement("span", { className: "text-sm font-semibold hidden sm:inline" }, currentUser.name),
                React.createElement("button", { className: "pl-btn pl-btn-ghost p-2", onClick: onLogout, title: "Se d\u00E9connecter" },
                    React.createElement(LogOut, { size: 16 }))))));
}
function BottomNav({ active, onChange }) {
    return (React.createElement("nav", { className: "fixed bottom-0 inset-x-0 z-20 pl-nav pl-hide-desktop", style: { paddingBottom: 'env(safe-area-inset-bottom)' } },
        React.createElement("div", { className: "max-w-5xl mx-auto flex items-stretch justify-around" }, NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (React.createElement("button", { key: item.id, onClick: () => onChange(item.id), className: cls('pl-nav-item flex flex-col items-center gap-1 py-2.5 px-3', isActive && 'active'), style: { flex: 1 } },
                React.createElement(Icon, { size: 20, strokeWidth: isActive ? 2.4 : 2 }),
                React.createElement("span", { className: "text-xs font-medium" }, item.label)));
        }))));
}
function Sidebar({ active, onChange }) {
    return (React.createElement("aside", { className: "pl-hide-mobile", style: { width: '224px', flexShrink: 0 } },
        React.createElement("div", { style: { position: 'sticky', top: '84px' } },
            React.createElement("div", { className: "pl-card p-2", style: { display: 'flex', flexDirection: 'column', gap: '2px' } }, NAV_ITEMS.map(item => {
                const Icon = item.icon;
                const isActive = active === item.id;
                return (React.createElement("button", { key: item.id, onClick: () => onChange(item.id), className: cls('pl-sidebar-item', isActive && 'active') },
                    React.createElement(Icon, { size: 18, strokeWidth: isActive ? 2.4 : 2 }),
                    item.label));
            })))));
}
/* ============================== DASHBOARD ============================== */
function DashboardTab({ currentUser, users, tournaments, sessions }) {
    const stats = useMemo(() => computeStats(users, tournaments), [users, tournaments]);
    const my = stats[currentUser.id] || { played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0, tournamentsWon: 0, byFormat: {} };
    const winRate = my.played ? Math.round((my.wins / my.played) * 100) : 0;
    const leaderboard = useMemo(() => {
        return users.map(u => {
            const s = stats[u.id] || { played: 0, wins: 0, losses: 0 };
            const wr = s.played ? Math.round((s.wins / s.played) * 100) : 0;
            return { user: u, played: s.played, wins: s.wins, losses: s.losses, winRate: wr };
        }).sort((a, b) => b.wins - a.wins || b.winRate - a.winRate).slice(0, 10);
    }, [users, stats]);
    const totalMatches = useMemo(() => tournaments.reduce((acc, t) => {
        if (!t.bracket)
            return acc;
        return acc + t.bracket.rounds.flat().filter(m => m.status === 'termine' && m.sideA && m.sideB && m.sideA.score != null && m.sideB.score != null).length;
    }, 0), [tournaments]);
    const ballRate = sessions.length ? Math.round((sessions.filter(s => s.participants.some(p => p.apporteBallon)).length / sessions.length) * 100) : 0;
    return (React.createElement("div", { className: "space-y-5 pl-fadein" },
        React.createElement("div", null,
            React.createElement("div", { className: "pl-eyebrow" },
                React.createElement("span", { className: "pl-eyebrow-dot" }),
                "Bonjour ",
                currentUser.name.split(' ')[0]),
            React.createElement("h2", { className: "pl-display text-2xl mt-1" }, "Tableau de bord")),
        React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3" },
            React.createElement(StatCard, { label: "Matchs jou\u00E9s", value: my.played }),
            React.createElement(StatCard, { label: "Victoires", value: my.wins, color: "var(--teal)" }),
            React.createElement(StatCard, { label: "D\u00E9faites", value: my.losses, color: "var(--brick)" }),
            React.createElement(StatCard, { label: "Taux de victoire", value: `${winRate}%` }),
            React.createElement(StatCard, { label: "Points marqu\u00E9s", value: my.pointsFor }),
            React.createElement(StatCard, { label: "Tournois gagn\u00E9s", value: my.tournamentsWon, color: "var(--amber)" })),
        Object.keys(my.byFormat).length > 0 && (React.createElement("div", { className: "pl-card p-4" },
            React.createElement("div", { className: "pl-eyebrow" },
                React.createElement("span", { className: "pl-eyebrow-dot" }),
                "Par format"),
            React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3" }, FORMATS.filter(f => my.byFormat[f.id]).map(f => {
                const bf = my.byFormat[f.id];
                return (React.createElement("div", { key: f.id, className: "p-3 rounded-lg text-center", style: { background: 'var(--surface2)' } },
                    React.createElement("div", { className: "text-xs", style: { color: 'var(--muted)' } }, f.label),
                    React.createElement("div", { className: "pl-score text-lg mt-1" },
                        bf.wins,
                        "/",
                        bf.played)));
            })))),
        React.createElement("div", { className: "pl-card p-4" },
            React.createElement("div", { className: "pl-eyebrow" },
                React.createElement("span", { className: "pl-eyebrow-dot" }),
                "Classement g\u00E9n\u00E9ral"),
            React.createElement("div", { className: "mt-3" }, leaderboard.map((row, i) => (React.createElement("div", { key: row.user.id, className: "flex items-center gap-3 py-2", style: { borderBottom: i < leaderboard.length - 1 ? '1px solid var(--line)' : 'none' } },
                React.createElement("span", { className: "pl-mono text-sm", style: { width: '18px', color: 'var(--muted)' } }, i + 1),
                React.createElement(Avatar, { user: row.user, size: "sm" }),
                React.createElement("div", { className: "flex-1 min-w-0" },
                    React.createElement("div", { className: "text-sm font-semibold truncate flex items-center gap-2" },
                        row.user.name,
                        row.user.id === currentUser.id && React.createElement("span", { className: "pl-badge pl-badge-leather", style: { fontSize: '10px' } }, "Toi")),
                    React.createElement("div", { style: { height: '4px', background: 'var(--line)', borderRadius: '999px', marginTop: '4px', overflow: 'hidden' } },
                        React.createElement("div", { style: { height: '100%', width: `${row.winRate}%`, background: 'var(--leather)' } }))),
                React.createElement("span", { className: "pl-score", style: { fontSize: '.85rem' } },
                    row.wins,
                    "-",
                    row.losses)))))),
        React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3" },
            React.createElement("div", { className: "pl-card p-3 text-center" },
                React.createElement("div", { className: "text-xs", style: { color: 'var(--muted)' } }, "\uD83C\uDFC0 Ballon assur\u00E9"),
                React.createElement("div", { className: "pl-score text-xl mt-1" },
                    ballRate,
                    "%")),
            React.createElement("div", { className: "pl-card p-3 text-center" },
                React.createElement("div", { className: "text-xs", style: { color: 'var(--muted)' } }, "\u26A1 Matchs au total"),
                React.createElement("div", { className: "pl-score text-xl mt-1" }, totalMatches)),
            React.createElement("div", { className: "pl-card p-3 text-center" },
                React.createElement("div", { className: "text-xs", style: { color: 'var(--muted)' } }, "\uD83C\uDFC6 Tournois cr\u00E9\u00E9s"),
                React.createElement("div", { className: "pl-score text-xl mt-1" }, tournaments.length)),
            React.createElement("div", { className: "pl-card p-3 text-center" },
                React.createElement("div", { className: "text-xs", style: { color: 'var(--muted)' } }, "\uD83D\uDCC5 Sessions planifi\u00E9es"),
                React.createElement("div", { className: "pl-score text-xl mt-1" }, sessions.length)))));
}
/* ============================== TOURNAMENTS ============================== */
function TournamentCard({ t, users, onClick }) {
    const organizer = users.find(u => u.id === t.createdBy);
    const format = formatOf(t.format);
    const count = t.format === '1v1' ? t.participantsUserIds.length : (t.teams ? t.teams.length : Math.floor(t.participantsUserIds.length / format.size));
    const unit = t.format === '1v1' ? 'joueurs' : 'équipes';
    return (React.createElement("button", { onClick: onClick, className: "pl-card pl-card-hover pl-card-accent p-4 text-left w-full" },
        React.createElement("div", { className: "flex items-center gap-2 flex-wrap" },
            React.createElement("span", { className: "pl-badge pl-badge-leather" }, format.label),
            t.status === 'inscription' && React.createElement("span", { className: "pl-badge pl-badge-teal" }, "Inscriptions"),
            t.status === 'en_cours' && React.createElement("span", { className: "pl-badge pl-badge-amber" },
                React.createElement("span", { className: "pl-live-dot animate-pulse" }),
                " En cours"),
            t.status === 'termine' && React.createElement("span", { className: "pl-badge pl-badge-muted" }, "Termin\u00E9")),
        React.createElement("div", { className: "pl-display text-lg mt-2" }, t.name),
        React.createElement("div", { className: "flex items-center gap-1.5 text-sm mt-1", style: { color: 'var(--muted)' } },
            React.createElement(Target, { size: 13 }),
            " ",
            t.ruleset.desc || t.ruleset.label),
        React.createElement("div", { className: "flex items-center justify-between text-xs mt-3", style: { color: 'var(--muted)' } },
            React.createElement("span", null,
                "Organis\u00E9 par ",
                organizer ? organizer.name : '—'),
            React.createElement("span", null,
                count,
                " ",
                unit))));
}
function SideRow({ side, winner }) {
    if (!side)
        return React.createElement("div", { className: "text-sm py-1", style: { color: 'var(--muted)' } }, "\u00C0 d\u00E9terminer");
    const isWinner = winner === side.refId;
    return (React.createElement("div", { className: "flex items-center justify-between py-0.5 gap-2" },
        React.createElement("span", { className: "text-sm truncate", style: { color: isWinner ? 'var(--chalk)' : 'var(--muted)', fontWeight: isWinner ? 700 : 500 } },
            isWinner ? '🏆 ' : '',
            side.name),
        React.createElement("span", { className: cls('pl-score text-base', side.score == null && 'pl-score-dim') }, side.score == null ? '—' : side.score)));
}
function MatchCard({ t, match, isOrganizer, currentUser, onOpenScore }) {
    const canEdit = match.status === 'pending' && match.sideA && match.sideB &&
        (isOrganizer || userInSide(t, match.sideA, currentUser.id) || userInSide(t, match.sideB, currentUser.id));
    const isWalkover = match.status === 'termine' && match.sideA && match.sideB && match.sideA.score == null;
    const live = match.liveScore;
    return (React.createElement("div", { className: "p-3 rounded-lg", style: { background: 'var(--surface2)', border: '1px solid var(--line)' } },
        React.createElement(SideRow, { side: match.sideA, winner: match.winnerRefId }),
        React.createElement("div", { className: "pl-court-divider my-1.5" }),
        React.createElement(SideRow, { side: match.sideB, winner: match.winnerRefId }),
        match.status === 'attente' && React.createElement("div", { className: "text-xs text-center mt-2", style: { color: 'var(--muted)' } }, "En attente"),
        isWalkover && React.createElement("div", { className: "text-xs text-center mt-2", style: { color: 'var(--muted)' } }, "Qualifi\u00E9 d'office"),
        match.status === 'pending' && live && (live.a > 0 || live.b > 0) && (React.createElement("div", { className: "text-xs text-center mt-2 flex items-center justify-center gap-1", style: { color: 'var(--amber)' } },
            React.createElement("span", { className: "pl-live-dot animate-pulse" }),
            " En direct : ",
            live.a,
            " - ",
            live.b)),
        canEdit && React.createElement("button", { className: "pl-btn pl-btn-secondary w-full mt-2 py-1.5 text-xs", onClick: onOpenScore }, "Suivre le match en direct")));
}
function BracketView({ t, users, currentUser, isOrganizer, onOpenScore }) {
    const rounds = t.bracket.rounds;
    return (React.createElement("div", { className: "flex gap-4 overflow-x-auto pl-scroll mt-3 pb-2" }, rounds.map((round, ri) => (React.createElement("div", { key: ri, className: "flex flex-col gap-3", style: { minWidth: '220px' } },
        React.createElement("div", { className: "text-xs font-semibold uppercase tracking-wide text-center", style: { color: 'var(--muted)' } }, roundLabel(ri, rounds.length)),
        React.createElement("div", { className: "flex flex-col justify-around flex-1 gap-3" }, round.map((m, mi) => (React.createElement(MatchCard, { key: m.id, t: t, match: m, isOrganizer: isOrganizer, currentUser: currentUser, onOpenScore: () => onOpenScore(ri, mi) })))))))));
}
function LiveScoreboard({ match, ruleset, onIncrement, onReset, onFinish, onClose }) {
    const [manual, setManual] = useState(false);
    const [ma, setMa] = useState('');
    const [mb, setMb] = useState('');
    const [error, setError] = useState('');
    const live = match.liveScore || { a: 0, b: 0 };
    const target = ruleset && ruleset.targetPoints;
    const tied = (live.a || 0) === (live.b || 0);
    function submitManual() {
        if (ma === '' || mb === '') {
            setError('Renseignez les deux scores.');
            return;
        }
        const na = Number(ma), nb = Number(mb);
        if (!Number.isInteger(na) || !Number.isInteger(nb) || na < 0 || nb < 0) {
            setError('Scores invalides.');
            return;
        }
        if (na === nb) {
            setError('Le match ne peut pas se terminer sur une égalité.');
            return;
        }
        onFinish(na, nb);
    }
    return (React.createElement(Modal, { title: "Match en direct", onClose: onClose },
        React.createElement("div", { className: "text-xs mb-4 flex items-center gap-1.5", style: { color: 'var(--muted)' } },
            React.createElement(Target, { size: 13 }),
            " ",
            (ruleset && (ruleset.desc || ruleset.label)) || ''),
        !manual ? (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "grid grid-cols-2 gap-3" }, ['a', 'b'].map(side => {
                const sideObj = side === 'a' ? match.sideA : match.sideB;
                const val = live[side] || 0;
                const reached = target && val >= target;
                return (React.createElement("div", { key: side, className: "pl-card p-3 text-center", style: reached ? { borderColor: 'var(--amber)' } : undefined },
                    React.createElement("div", { className: "text-sm font-semibold truncate" }, sideObj ? sideObj.name : ''),
                    React.createElement("div", { className: "pl-score text-4xl mt-2" }, val),
                    reached && React.createElement("div", { className: "text-xs mt-1", style: { color: 'var(--amber)' } }, "Objectif atteint"),
                    React.createElement("div", { className: "flex justify-center gap-1.5 mt-3 flex-wrap" }, [1, 2, 3].map(pts => React.createElement("button", { key: pts, className: "pl-btn pl-btn-secondary px-2.5 py-1.5 text-sm", onClick: () => onIncrement(side, pts) },
                        "+",
                        pts))),
                    React.createElement("button", { className: "pl-btn pl-btn-ghost mt-1.5 text-xs px-2 py-1", onClick: () => onIncrement(side, -1) }, "-1")));
            })),
            React.createElement("div", { className: "flex items-center justify-between mt-4" },
                React.createElement("button", { className: "pl-btn pl-btn-ghost px-2 py-1.5 text-xs", style: { display: 'flex', alignItems: 'center', gap: '5px' }, onClick: onReset },
                    React.createElement(RotateCcw, { size: 13 }),
                    " R\u00E9initialiser"),
                React.createElement("button", { className: "pl-btn pl-btn-ghost px-2 py-1.5 text-xs", onClick: () => setManual(true) }, "Saisir le score final")),
            React.createElement("button", { className: "pl-btn pl-btn-primary w-full mt-3 py-2.5", disabled: tied, onClick: () => onFinish(live.a || 0, live.b || 0) }, "Terminer le match"),
            tied && React.createElement("div", { className: "text-xs text-center mt-2", style: { color: 'var(--muted)' } }, "\u00C9galit\u00E9 \u2014 continuez jusqu'\u00E0 ce qu'une \u00E9quipe soit devant."),
            React.createElement("div", { className: "text-xs text-center mt-3", style: { color: 'var(--muted)' } }, "Chaque joueur peut taper son propre panier depuis son t\u00E9l\u00E9phone \u2014 le score se synchronise pour tout le monde en quelques secondes."))) : (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "space-y-3" },
                React.createElement("div", { className: "flex items-center justify-between gap-3" },
                    React.createElement("span", { className: "text-sm font-medium truncate" }, match.sideA ? match.sideA.name : ''),
                    React.createElement("input", { type: "number", inputMode: "numeric", min: "0", className: "pl-input", style: { width: '90px', textAlign: 'center' }, value: ma, onChange: e => setMa(e.target.value) })),
                React.createElement("div", { className: "flex items-center justify-between gap-3" },
                    React.createElement("span", { className: "text-sm font-medium truncate" }, match.sideB ? match.sideB.name : ''),
                    React.createElement("input", { type: "number", inputMode: "numeric", min: "0", className: "pl-input", style: { width: '90px', textAlign: 'center' }, value: mb, onChange: e => setMb(e.target.value) }))),
            error && React.createElement("div", { className: "text-sm mt-3", style: { color: 'var(--brick)' } }, error),
            React.createElement("button", { className: "pl-btn pl-btn-primary w-full mt-4 py-2.5", onClick: submitManual }, "Valider le score"),
            React.createElement("button", { className: "pl-btn pl-btn-ghost w-full mt-2 py-2 text-xs", onClick: () => setManual(false) }, "Revenir au suivi en direct")))));
}
function CreateTournamentModal({ onClose, onCreate }) {
    const [name, setName] = useState('');
    const [format, setFormat] = useState('3v3');
    const [rulePresetId, setRulePresetId] = useState('standard');
    const [customTarget, setCustomTarget] = useState('21');
    const [customDesc, setCustomDesc] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    function submit() {
        if (!name.trim()) {
            setError('Donnez un nom à votre tournoi.');
            return;
        }
        onCreate({ name, format, rulePresetId, customTarget, customDesc, location });
    }
    return (React.createElement(Modal, { title: "Cr\u00E9er un tournoi", onClose: onClose },
        React.createElement("div", { className: "space-y-4" },
            React.createElement("div", null,
                React.createElement("label", { className: "pl-label" }, "Nom du tournoi"),
                React.createElement("input", { className: "pl-input", placeholder: "Ex. Tournoi du quartier", value: name, onChange: e => setName(e.target.value) })),
            React.createElement("div", null,
                React.createElement("label", { className: "pl-label" }, "Format"),
                React.createElement("div", { className: "flex flex-wrap gap-2" }, FORMATS.map(f => React.createElement("button", { key: f.id, className: cls('pl-tab-chip', format === f.id && 'active'), onClick: () => setFormat(f.id) }, f.label)))),
            React.createElement("div", null,
                React.createElement("label", { className: "pl-label" }, "R\u00E8gle du jeu"),
                React.createElement("div", { className: "flex flex-wrap gap-2" }, RULE_PRESETS.map(p => React.createElement("button", { key: p.id, className: cls('pl-tab-chip', rulePresetId === p.id && 'active'), onClick: () => setRulePresetId(p.id) }, p.label))),
                rulePresetId === 'custom' ? (React.createElement("div", { className: "flex gap-2 mt-2" },
                    React.createElement("input", { type: "number", min: "1", className: "pl-input", style: { width: '110px' }, value: customTarget, onChange: e => setCustomTarget(e.target.value) }),
                    React.createElement("input", { className: "pl-input", placeholder: "Ex. Premier \u00E0 50 points", value: customDesc, onChange: e => setCustomDesc(e.target.value) }))) : (React.createElement("div", { className: "text-xs mt-2", style: { color: 'var(--muted)' } }, (RULE_PRESETS.find(p => p.id === rulePresetId) || {}).desc))),
            React.createElement("div", null,
                React.createElement("label", { className: "pl-label" }, "Lieu (optionnel)"),
                React.createElement("input", { className: "pl-input", placeholder: "Ex. City stade du parc", value: location, onChange: e => setLocation(e.target.value) })),
            error && React.createElement("div", { className: "text-sm", style: { color: 'var(--brick)' } }, error),
            React.createElement("button", { className: "pl-btn pl-btn-primary w-full py-2.5", onClick: submit }, "Cr\u00E9er le tournoi"))));
}
function TournamentDetail({ t, users, currentUser, onBack, onToggleJoin, onStart, startError, onOpenScore, onDelete, confirmingDelete, onConfirmDelete, onCancelDelete }) {
    const organizer = users.find(u => u.id === t.createdBy);
    const isOrganizer = currentUser.id === t.createdBy;
    const format = formatOf(t.format);
    const joined = t.participantsUserIds.includes(currentUser.id);
    const requiredMin = format.size * 2;
    const standings = useMemo(() => (t.status !== 'inscription' ? getStandings(t) : []), [t]);
    return (React.createElement("div", { className: "space-y-4 pl-fadein" },
        React.createElement("button", { onClick: onBack, className: "flex items-center gap-1.5 text-sm", style: { color: 'var(--muted)' } },
            React.createElement(ChevronLeft, { size: 16 }),
            " Tournois"),
        React.createElement("div", { className: "pl-card p-4" },
            React.createElement("div", { className: "flex items-center gap-2 flex-wrap" },
                React.createElement("span", { className: "pl-badge pl-badge-leather" }, format.label),
                t.status === 'inscription' && React.createElement("span", { className: "pl-badge pl-badge-teal" }, "Inscriptions ouvertes"),
                t.status === 'en_cours' && React.createElement("span", { className: "pl-badge pl-badge-amber" },
                    React.createElement("span", { className: "pl-live-dot animate-pulse" }),
                    " En cours"),
                t.status === 'termine' && React.createElement("span", { className: "pl-badge pl-badge-muted" }, "Termin\u00E9")),
            React.createElement("h2", { className: "pl-display text-2xl mt-2" }, t.name),
            React.createElement("div", { className: "flex items-center gap-1.5 text-sm mt-2", style: { color: 'var(--muted)' } },
                React.createElement(Target, { size: 14 }),
                " ",
                t.ruleset.desc || t.ruleset.label),
            t.location && React.createElement("div", { className: "flex items-center gap-1.5 text-sm mt-1", style: { color: 'var(--muted)' } },
                React.createElement(MapPin, { size: 14 }),
                " ",
                t.location),
            React.createElement("div", { className: "text-xs mt-2", style: { color: 'var(--muted)' } },
                "Organis\u00E9 par ",
                organizer ? organizer.name : '—',
                " \u00B7 ",
                timeAgo(t.createdAt))),
        t.status === 'termine' && t.champion && (React.createElement("div", { className: "pl-card p-5 text-center", style: { borderColor: 'var(--amber)' } },
            React.createElement(Award, { size: 28, style: { color: 'var(--amber)', margin: '0 auto' } }),
            React.createElement("div", { className: "pl-eyebrow mt-2", style: { justifyContent: 'center' } }, "Champion"),
            React.createElement("div", { className: "pl-display text-2xl mt-1", style: { color: 'var(--amber)' } }, findUnitInRounds(t.bracket.rounds, t.champion)))),
        t.status === 'inscription' && (React.createElement("div", { className: "pl-card p-4" },
            React.createElement("div", { className: "pl-eyebrow" },
                React.createElement("span", { className: "pl-eyebrow-dot" }),
                "Participants (",
                t.participantsUserIds.length,
                ")"),
            React.createElement("div", { className: "flex flex-wrap gap-2 mt-3" }, t.participantsUserIds.map(id => {
                const u = users.find(x => x.id === id);
                if (!u)
                    return null;
                return React.createElement("div", { key: id, className: "pl-badge pl-badge-muted", style: { display: 'flex', alignItems: 'center', gap: '6px' } },
                    React.createElement(Avatar, { user: u, size: "xs" }),
                    u.name);
            })),
            React.createElement("div", { className: "flex gap-2 mt-4" },
                React.createElement("button", { className: cls('pl-btn px-4 py-2.5 flex-1', joined ? 'pl-btn-secondary' : 'pl-btn-primary'), onClick: onToggleJoin }, joined ? 'Quitter' : 'Rejoindre'),
                isOrganizer && React.createElement("button", { className: "pl-btn pl-btn-primary px-4 py-2.5 flex-1", style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }, onClick: onStart },
                    React.createElement(Shuffle, { size: 16 }),
                    " Lancer")),
            isOrganizer && React.createElement("div", { className: "text-xs mt-2", style: { color: 'var(--muted)' } },
                "Minimum ",
                requiredMin,
                " ",
                format.size === 1 ? 'joueurs' : 'joueurs répartis en équipes complètes',
                " pour lancer."),
            startError && React.createElement("div", { className: "text-sm mt-2", style: { color: 'var(--brick)' } }, startError))),
        t.teams && t.teams.length > 0 && (React.createElement("div", { className: "pl-card p-4" },
            React.createElement("div", { className: "pl-eyebrow" },
                React.createElement("span", { className: "pl-eyebrow-dot" }),
                "\u00C9quipes"),
            React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-3" }, t.teams.map(team => (React.createElement("div", { key: team.id, className: "p-3 rounded-lg", style: { background: 'var(--surface2)' } },
                React.createElement("div", { className: "font-semibold text-sm" }, team.name),
                React.createElement("div", { className: "text-xs mt-1", style: { color: 'var(--muted)' } }, team.memberIds.map(id => { const u = users.find(x => x.id === id); return u ? u.name : '?'; }).join(' · ')))))),
            t.leftoverUserIds && t.leftoverUserIds.length > 0 && (React.createElement("div", { className: "text-xs mt-3", style: { color: 'var(--muted)' } },
                "En attente d'une \u00E9quipe compl\u00E8te : ",
                t.leftoverUserIds.map(id => { const u = users.find(x => x.id === id); return u ? u.name : '?'; }).join(', '))))),
        t.bracket && (React.createElement("div", { className: "pl-card p-4" },
            React.createElement("div", { className: "pl-eyebrow" },
                React.createElement("span", { className: "pl-eyebrow-dot" }),
                "Tableau"),
            React.createElement(BracketView, { t: t, users: users, currentUser: currentUser, isOrganizer: isOrganizer, onOpenScore: onOpenScore }))),
        standings.length > 0 && (React.createElement("div", { className: "pl-card p-4" },
            React.createElement("div", { className: "pl-eyebrow" },
                React.createElement("span", { className: "pl-eyebrow-dot" }),
                "Classement"),
            React.createElement("div", { className: "mt-3 space-y-2" }, standings.map((g, i) => (React.createElement("div", { key: i },
                React.createElement("div", { className: "text-xs font-semibold uppercase", style: { color: 'var(--amber)', letterSpacing: '.05em' } }, g.label),
                React.createElement("div", { className: "text-sm mt-0.5" }, g.names.join(', ')))))))),
        isOrganizer && (React.createElement("div", { className: "pl-card p-4" }, !confirmingDelete ? (React.createElement("button", { className: "pl-btn pl-btn-danger px-4 py-2 text-sm", style: { display: 'flex', alignItems: 'center', gap: '6px' }, onClick: onDelete },
            React.createElement(Trash2, { size: 14 }),
            " Supprimer le tournoi")) : (React.createElement("div", { className: "flex items-center gap-2 flex-wrap" },
            React.createElement("span", { className: "text-sm", style: { color: 'var(--brick)' } }, "Supprimer d\u00E9finitivement ?"),
            React.createElement("button", { className: "pl-btn pl-btn-danger px-3 py-1.5 text-sm", onClick: onConfirmDelete }, "Confirmer"),
            React.createElement("button", { className: "pl-btn pl-btn-ghost px-3 py-1.5 text-sm", onClick: onCancelDelete }, "Annuler")))))));
}
function TournamentsTab({ currentUser, users, tournaments, setTournaments, selectedTournamentId, setSelectedTournamentId }) {
    const [showCreate, setShowCreate] = useState(false);
    const [filter, setFilter] = useState('tous');
    const [liveMatch, setLiveMatch] = useState(null);
    const [startError, setStartError] = useState('');
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const selected = tournaments.find(t => t.id === selectedTournamentId) || null;
    async function handleCreate(form) {
        const preset = RULE_PRESETS.find(p => p.id === form.rulePresetId);
        const ruleset = form.rulePresetId === 'custom'
            ? { label: 'Personnalisé', targetPoints: Number(form.customTarget) || 21, desc: form.customDesc.trim() || `Premier à ${Number(form.customTarget) || 21} points` }
            : { label: preset.label, targetPoints: preset.targetPoints, desc: preset.desc };
        const newT = {
            id: uid('t'), name: form.name.trim(), format: form.format, ruleset,
            location: (form.location || '').trim(), status: 'inscription', createdBy: currentUser.id, createdAt: Date.now(),
            participantsUserIds: [currentUser.id], teams: null, bracket: null, champion: null, leftoverUserIds: [],
        };
        const updated = await mutateCollection(K.tournaments, arr => [newT, ...arr]);
        setTournaments(updated);
        setShowCreate(false);
        setSelectedTournamentId(newT.id);
    }
    async function toggleJoin(t) {
        const updated = await mutateCollection(K.tournaments, arr => arr.map(x => {
            if (x.id !== t.id)
                return x;
            const already = x.participantsUserIds.includes(currentUser.id);
            const participantsUserIds = already ? x.participantsUserIds.filter(id => id !== currentUser.id) : [...x.participantsUserIds, currentUser.id];
            return { ...x, participantsUserIds };
        }));
        setTournaments(updated);
    }
    async function handleStart(t) {
        const built = buildUnits(t, users);
        if (built.units.length < 2) {
            setStartError('Il faut au moins 2 ' + (t.format === '1v1' ? 'joueurs' : 'équipes complètes') + ' pour lancer le tournoi.');
            return;
        }
        setStartError('');
        const rounds = buildBracket(built.units);
        const updated = await mutateCollection(K.tournaments, arr => arr.map(x => x.id === t.id
            ? { ...x, status: 'en_cours', teams: built.teams, bracket: { rounds }, leftoverUserIds: built.leftover.map(l => l.id) }
            : x));
        setTournaments(updated);
    }
    async function handleFinishMatch(t, roundIndex, matchIndex, a, b) {
        const updatedT = applyScore(t, roundIndex, matchIndex, a, b);
        const updated = await mutateCollection(K.tournaments, arr => arr.map(x => x.id === t.id ? updatedT : x));
        setTournaments(updated);
        setLiveMatch(null);
    }
    async function handleIncrement(t, roundIndex, matchIndex, side, delta) {
        const updated = await mutateCollection(K.tournaments, arr => arr.map(x => {
            if (x.id !== t.id)
                return x;
            const t2 = JSON.parse(JSON.stringify(x));
            const m = t2.bracket.rounds[roundIndex][matchIndex];
            if (!m.liveScore)
                m.liveScore = { a: 0, b: 0 };
            m.liveScore[side] = Math.max(0, (m.liveScore[side] || 0) + delta);
            return t2;
        }));
        setTournaments(updated);
    }
    async function handleResetLive(t, roundIndex, matchIndex) {
        const updated = await mutateCollection(K.tournaments, arr => arr.map(x => {
            if (x.id !== t.id)
                return x;
            const t2 = JSON.parse(JSON.stringify(x));
            t2.bracket.rounds[roundIndex][matchIndex].liveScore = { a: 0, b: 0 };
            return t2;
        }));
        setTournaments(updated);
    }
    async function handleDelete(id) {
        const updated = await mutateCollection(K.tournaments, arr => arr.filter(x => x.id !== id));
        setTournaments(updated);
        setConfirmDeleteId(null);
        if (selectedTournamentId === id)
            setSelectedTournamentId(null);
    }
    useEffect(() => {
        if (!liveMatch)
            return;
        const id = setInterval(async () => {
            const t = await loadKey(K.tournaments);
            setTournaments(t);
        }, 3000);
        return () => clearInterval(id);
    }, [liveMatch]);
    let body;
    if (selected) {
        body = (React.createElement(TournamentDetail, { t: selected, users: users, currentUser: currentUser, onBack: () => setSelectedTournamentId(null), onToggleJoin: () => toggleJoin(selected), onStart: () => handleStart(selected), startError: startError, onOpenScore: (r, m) => setLiveMatch({ tournamentId: selected.id, r, m }), onDelete: () => setConfirmDeleteId(selected.id), confirmingDelete: confirmDeleteId === selected.id, onConfirmDelete: () => handleDelete(selected.id), onCancelDelete: () => setConfirmDeleteId(null) }));
    }
    else {
        const filtered = tournaments.filter(t => filter === 'tous' || t.status === filter);
        body = (React.createElement("div", { className: "space-y-4 pl-fadein" },
            React.createElement("div", { className: "flex items-center justify-between" },
                React.createElement("div", null,
                    React.createElement("div", { className: "pl-eyebrow" },
                        React.createElement("span", { className: "pl-eyebrow-dot" }),
                        "Comp\u00E9tition"),
                    React.createElement("h2", { className: "pl-display text-2xl mt-1" }, "Tournois")),
                React.createElement("button", { className: "pl-btn pl-btn-primary px-4 py-2.5", style: { display: 'flex', alignItems: 'center', gap: '6px' }, onClick: () => setShowCreate(true) },
                    React.createElement(Plus, { size: 16 }),
                    " Cr\u00E9er")),
            React.createElement("div", { className: "flex gap-2 overflow-x-auto pl-scroll pb-1" }, [['tous', 'Tous'], ['inscription', 'Ouverts'], ['en_cours', 'En cours'], ['termine', 'Terminés']].map(([id, label]) => (React.createElement("button", { key: id, className: cls('pl-tab-chip', filter === id && 'active'), onClick: () => setFilter(id) }, label)))),
            filtered.length === 0 ? (React.createElement(EmptyState, { icon: Trophy, title: "Aucun tournoi pour l'instant", subtitle: "Lancez-en un et invitez vos amis \u00E0 rejoindre." })) : (React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" }, filtered.map(t => React.createElement(TournamentCard, { key: t.id, t: t, users: users, onClick: () => setSelectedTournamentId(t.id) }))))));
    }
    return (React.createElement("div", null,
        body,
        showCreate && React.createElement(CreateTournamentModal, { onClose: () => setShowCreate(false), onCreate: handleCreate }),
        liveMatch && (() => {
            const liveT = tournaments.find(x => x.id === liveMatch.tournamentId);
            if (!liveT || !liveT.bracket)
                return null;
            const m = liveT.bracket.rounds[liveMatch.r][liveMatch.m];
            if (!m)
                return null;
            return (React.createElement(LiveScoreboard, { match: m, ruleset: liveT.ruleset, onIncrement: (side, delta) => handleIncrement(liveT, liveMatch.r, liveMatch.m, side, delta), onReset: () => handleResetLive(liveT, liveMatch.r, liveMatch.m), onFinish: (a, b) => handleFinishMatch(liveT, liveMatch.r, liveMatch.m, a, b), onClose: () => setLiveMatch(null) }));
        })()));
}
/* ============================== CALENDAR ============================== */
function SessionCard({ s, users, currentUser, onToggleJoin, onToggleBallon, onDelete }) {
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const me = s.participants.find(p => p.userId === currentUser.id);
    const joined = !!me;
    const full = s.participants.length >= s.maxPlayers;
    const ballCount = s.participants.filter(p => p.apporteBallon).length;
    const isCreator = s.createdBy === currentUser.id;
    const fmt = s.format === 'libre' ? null : formatOf(s.format);
    return (React.createElement("div", { className: "pl-card p-4" },
        React.createElement("div", { className: "flex items-center justify-between flex-wrap gap-2" },
            React.createElement("div", { className: "flex items-center gap-2 flex-wrap" },
                React.createElement("span", { className: "pl-badge pl-badge-amber" },
                    React.createElement(Clock, { size: 12 }),
                    s.time),
                React.createElement("span", { className: "pl-badge pl-badge-leather" }, fmt ? fmt.label : 'Format libre')),
            React.createElement("span", { className: "text-xs", style: { color: 'var(--muted)' } },
                s.participants.length,
                "/",
                s.maxPlayers)),
        s.location && React.createElement("div", { className: "flex items-center gap-1.5 text-sm mt-2" },
            React.createElement(MapPin, { size: 14, style: { color: 'var(--muted)' } }),
            s.location),
        s.note && React.createElement("div", { className: "text-sm mt-1", style: { color: 'var(--muted)' } }, s.note),
        React.createElement("div", { className: "flex flex-wrap gap-1.5 mt-3" }, s.participants.map(p => {
            const u = users.find(x => x.id === p.userId);
            if (!u)
                return null;
            return React.createElement("span", { key: p.userId, className: "pl-badge pl-badge-muted" },
                u.name,
                p.apporteBallon ? ' 🏀' : '');
        })),
        ballCount === 0 ? (React.createElement("div", { className: "text-xs mt-3", style: { color: 'var(--brick)' } }, "\u26A0\uFE0F Personne n'apporte de ballon pour l'instant")) : (React.createElement("div", { className: "text-xs mt-3", style: { color: 'var(--teal)' } },
            "\uD83C\uDFC0 Ballon assur\u00E9 par ",
            ballCount,
            " joueur",
            ballCount > 1 ? 's' : '')),
        React.createElement("div", { className: "flex items-center gap-2 mt-3 flex-wrap" },
            !joined ? (React.createElement("button", { className: "pl-btn pl-btn-primary px-4 py-2 text-sm flex-1", disabled: full, onClick: onToggleJoin }, full ? 'Complet' : 'Rejoindre')) : (React.createElement(React.Fragment, null,
                React.createElement("button", { className: "pl-btn pl-btn-secondary px-3 py-2 text-sm flex-1", onClick: onToggleBallon }, me && me.apporteBallon ? "Je n'apporte plus le ballon" : "🏀 J'apporte le ballon"),
                !isCreator && React.createElement("button", { className: "pl-btn pl-btn-ghost px-3 py-2 text-sm", onClick: onToggleJoin }, "Quitter"))),
            isCreator && !confirmingDelete && React.createElement("button", { className: "pl-btn pl-btn-ghost p-2", onClick: () => setConfirmingDelete(true) },
                React.createElement(Trash2, { size: 15 })),
            isCreator && confirmingDelete && (React.createElement("div", { className: "flex items-center gap-1.5" },
                React.createElement("button", { className: "pl-btn pl-btn-danger px-2.5 py-1.5 text-xs", onClick: onDelete }, "Confirmer"),
                React.createElement("button", { className: "pl-btn pl-btn-ghost px-2.5 py-1.5 text-xs", onClick: () => setConfirmingDelete(false) }, "Annuler"))))));
}
function CreateSessionModal({ defaultDate, onClose, onCreate }) {
    const [date, setDate] = useState(defaultDate);
    const [time, setTime] = useState('18:00');
    const [location, setLocation] = useState('');
    const [format, setFormat] = useState('libre');
    const [maxPlayers, setMaxPlayers] = useState('10');
    const [note, setNote] = useState('');
    const [error, setError] = useState('');
    const options = [{ id: 'libre', label: 'Peu importe' }, ...FORMATS];
    function submit() {
        if (!date || !time) {
            setError('Indiquez une date et une heure.');
            return;
        }
        if (!location.trim()) {
            setError('Indiquez un lieu.');
            return;
        }
        onCreate({ date, time, location, format, maxPlayers, note });
    }
    return (React.createElement(Modal, { title: "Proposer une session", onClose: onClose },
        React.createElement("div", { className: "space-y-4" },
            React.createElement("div", { className: "flex gap-2" },
                React.createElement("div", { className: "flex-1" },
                    React.createElement("label", { className: "pl-label" }, "Date"),
                    React.createElement("input", { type: "date", className: "pl-input", value: date, onChange: e => setDate(e.target.value) })),
                React.createElement("div", { className: "flex-1" },
                    React.createElement("label", { className: "pl-label" }, "Heure"),
                    React.createElement("input", { type: "time", className: "pl-input", value: time, onChange: e => setTime(e.target.value) }))),
            React.createElement("div", null,
                React.createElement("label", { className: "pl-label" }, "Lieu"),
                React.createElement("input", { className: "pl-input", placeholder: "Ex. City stade du parc", value: location, onChange: e => setLocation(e.target.value) })),
            React.createElement("div", null,
                React.createElement("label", { className: "pl-label" }, "Format"),
                React.createElement("div", { className: "flex flex-wrap gap-2" }, options.map(f => React.createElement("button", { key: f.id, className: cls('pl-tab-chip', format === f.id && 'active'), onClick: () => setFormat(f.id) }, f.label)))),
            React.createElement("div", null,
                React.createElement("label", { className: "pl-label" }, "Nombre de joueurs max"),
                React.createElement("input", { type: "number", min: "2", className: "pl-input", value: maxPlayers, onChange: e => setMaxPlayers(e.target.value) })),
            React.createElement("div", null,
                React.createElement("label", { className: "pl-label" }, "Note (optionnel)"),
                React.createElement("textarea", { className: "pl-textarea", rows: "2", placeholder: "Infos utiles...", value: note, onChange: e => setNote(e.target.value) })),
            error && React.createElement("div", { className: "text-sm", style: { color: 'var(--brick)' } }, error),
            React.createElement("button", { className: "pl-btn pl-btn-primary w-full py-2.5", onClick: submit }, "Proposer la session"))));
}
function CalendarTab({ currentUser, users, sessions, setSessions }) {
    const [viewDate, setViewDate] = useState(() => new Date());
    const [selectedDateKey, setSelectedDateKey] = useState(() => todayKey());
    const [showCreate, setShowCreate] = useState(false);
    const sessionsByDate = useMemo(() => {
        const map = {};
        sessions.forEach(s => { (map[s.date] = map[s.date] || []).push(s); });
        Object.values(map).forEach(list => list.sort((a, b) => a.time.localeCompare(b.time)));
        return map;
    }, [sessions]);
    const cells = useMemo(() => buildMonthGrid(viewDate), [viewDate]);
    const daySessions = sessionsByDate[selectedDateKey] || [];
    async function handleCreate(form) {
        const newS = {
            id: uid('s'), date: form.date, time: form.time, location: form.location.trim(), format: form.format,
            maxPlayers: Number(form.maxPlayers) || 10, note: (form.note || '').trim(), createdBy: currentUser.id, createdAt: Date.now(),
            participants: [{ userId: currentUser.id, apporteBallon: false }],
        };
        const updated = await mutateCollection(K.sessions, arr => [...arr, newS]);
        setSessions(updated);
        setShowCreate(false);
        setSelectedDateKey(newS.date);
    }
    async function toggleJoin(s) {
        const updated = await mutateCollection(K.sessions, arr => arr.map(x => {
            if (x.id !== s.id)
                return x;
            const already = x.participants.some(p => p.userId === currentUser.id);
            if (already)
                return { ...x, participants: x.participants.filter(p => p.userId !== currentUser.id) };
            if (x.participants.length >= x.maxPlayers)
                return x;
            return { ...x, participants: [...x.participants, { userId: currentUser.id, apporteBallon: false }] };
        }));
        setSessions(updated);
    }
    async function toggleBallon(s) {
        const updated = await mutateCollection(K.sessions, arr => arr.map(x => x.id !== s.id ? x : {
            ...x, participants: x.participants.map(p => p.userId === currentUser.id ? { ...p, apporteBallon: !p.apporteBallon } : p),
        }));
        setSessions(updated);
    }
    async function handleDelete(s) {
        const updated = await mutateCollection(K.sessions, arr => arr.filter(x => x.id !== s.id));
        setSessions(updated);
    }
    return (React.createElement("div", { className: "space-y-5 pl-fadein" },
        React.createElement("div", null,
            React.createElement("div", { className: "pl-eyebrow" },
                React.createElement("span", { className: "pl-eyebrow-dot" }),
                "Planning"),
            React.createElement("h2", { className: "pl-display text-2xl mt-1" }, "Calendrier")),
        React.createElement("div", { className: "md:flex md:gap-5 md:items-start" },
            React.createElement("div", { className: "pl-card p-4 md:w-96 md:flex-shrink-0" },
                React.createElement("div", { className: "flex items-center justify-between mb-3" },
                    React.createElement("button", { className: "pl-btn pl-btn-ghost p-2", onClick: () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1)) },
                        React.createElement(ChevronLeft, { size: 18 })),
                    React.createElement("div", { className: "font-semibold pl-display" }, fmtMonthYear(viewDate)),
                    React.createElement("button", { className: "pl-btn pl-btn-ghost p-2", onClick: () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1)) },
                        React.createElement(ChevronRight, { size: 18 }))),
                React.createElement("div", { className: "grid grid-cols-7 gap-1 text-center text-xs mb-1", style: { color: 'var(--muted)' } }, WEEKDAYS_FR.map(w => React.createElement("div", { key: w }, w))),
                React.createElement("div", { className: "grid grid-cols-7 gap-1" }, cells.map((d, i) => {
                    if (!d)
                        return React.createElement("div", { key: i });
                    const key = toDateKey(d);
                    const isSelected = key === selectedDateKey;
                    const isToday = key === todayKey();
                    const count = (sessionsByDate[key] || []).length;
                    return (React.createElement("button", { key: i, onClick: () => setSelectedDateKey(key), className: "aspect-square rounded-lg flex flex-col items-center justify-center text-sm relative", style: { background: isSelected ? 'var(--leather-dim)' : 'transparent', border: isToday ? '1px solid var(--amber)' : '1px solid transparent', color: isSelected ? 'var(--leather)' : 'var(--chalk)', fontWeight: isSelected ? 700 : 500 } },
                        d.getDate(),
                        count > 0 && React.createElement("span", { style: { position: 'absolute', bottom: '4px', width: '4px', height: '4px', borderRadius: '999px', background: isSelected ? 'var(--leather)' : 'var(--amber)' } })));
                }))),
            React.createElement("div", { className: "mt-5 md:mt-0 flex-1 min-w-0" },
                React.createElement("div", { className: "flex items-center justify-between mb-3 flex-wrap gap-2" },
                    React.createElement("div", { className: "font-semibold" }, fmtDateLong(selectedDateKey)),
                    React.createElement("button", { className: "pl-btn pl-btn-primary px-3.5 py-2 text-sm", style: { display: 'flex', alignItems: 'center', gap: '6px' }, onClick: () => setShowCreate(true) },
                        React.createElement(Plus, { size: 15 }),
                        " Proposer")),
                daySessions.length === 0 ? (React.createElement(EmptyState, { icon: CalendarIcon, title: "Aucune session ce jour", subtitle: "Soyez le premier \u00E0 en proposer une." })) : (React.createElement("div", { className: "space-y-3" }, daySessions.map(s => (React.createElement(SessionCard, { key: s.id, s: s, users: users, currentUser: currentUser, onToggleJoin: () => toggleJoin(s), onToggleBallon: () => toggleBallon(s), onDelete: () => handleDelete(s) }))))))),
        showCreate && React.createElement(CreateSessionModal, { defaultDate: selectedDateKey, onClose: () => setShowCreate(false), onCreate: handleCreate })));
}
/* ============================== MESSAGES ============================== */
function ChatBubble({ msg, sender, isMe, showSender }) {
    return (React.createElement("div", { className: cls('flex', isMe ? 'justify-end' : 'justify-start'), style: { marginBottom: '8px' } },
        React.createElement("div", { style: { maxWidth: '78%' } },
            showSender && !isMe && React.createElement("div", { className: "text-xs mb-1", style: { color: 'var(--muted)', marginLeft: '4px' } }, sender ? sender.name : '?'),
            React.createElement("div", { className: "p-2.5 rounded-2xl text-sm", style: {
                    background: isMe ? 'var(--leather-dim)' : 'var(--surface2)',
                    color: isMe ? 'var(--leather)' : 'var(--chalk)',
                    border: '1px solid ' + (isMe ? 'var(--leather-dim)' : 'var(--line)'),
                } }, msg.text))));
}
function ChatView({ conversationId, title, otherUser, users, currentUser, messages, onSend, onBack }) {
    const [text, setText] = useState('');
    const bottomRef = useRef(null);
    const list = useMemo(() => messages.filter(m => m.conversationId === conversationId).sort((a, b) => a.createdAt - b.createdAt), [messages, conversationId]);
    useEffect(() => {
        if (bottomRef.current)
            bottomRef.current.scrollIntoView({ block: 'end' });
    }, [list.length, conversationId]);
    function submit() {
        const t = text.trim();
        if (!t)
            return;
        onSend(t);
        setText('');
    }
    return (React.createElement("div", { className: "pl-fadein", style: { display: 'flex', flexDirection: 'column', height: 'calc(100vh - 220px)', minHeight: '360px' } },
        React.createElement("div", { className: "flex items-center justify-between mb-3 gap-2" },
            React.createElement("div", { className: "flex items-center gap-2 min-w-0" },
                React.createElement("button", { onClick: onBack, className: "pl-btn pl-btn-ghost p-1.5" },
                    React.createElement(ChevronLeft, { size: 18 })),
                otherUser ? React.createElement(Avatar, { user: otherUser, size: "sm" }) : React.createElement("div", { className: "pl-avatar", style: { width: 32, height: 32, background: 'var(--leather)' } },
                    React.createElement(Users, { size: 16, color: "#1A0E06" })),
                React.createElement("span", { className: "font-semibold truncate" }, title)),
            otherUser && (otherUser.phone ? (React.createElement("a", { href: `tel:${otherUser.phone}`, className: "pl-btn pl-btn-secondary px-3 py-2 text-sm", style: { display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 } },
                React.createElement(Phone, { size: 14 }),
                " Appeler")) : (React.createElement("span", { className: "text-xs", style: { color: 'var(--muted)', flexShrink: 0 } }, "Pas de num\u00E9ro")))),
        React.createElement("div", { className: "pl-card p-3 pl-scroll", style: { flex: 1, overflowY: 'auto' } },
            list.length === 0 && React.createElement("div", { className: "text-sm text-center py-6", style: { color: 'var(--muted)' } }, "Aucun message pour l'instant \u2014 dites bonjour !"),
            list.map((m, i) => {
                const sender = users.find(u => u.id === m.senderId);
                const prev = list[i - 1];
                const showSender = !prev || prev.senderId !== m.senderId;
                return React.createElement(ChatBubble, { key: m.id, msg: m, sender: sender, isMe: m.senderId === currentUser.id, showSender: showSender });
            }),
            React.createElement("div", { ref: bottomRef })),
        React.createElement("div", { className: "flex items-center gap-2 mt-3" },
            React.createElement("input", { className: "pl-input", placeholder: "\u00C9crire un message...", value: text, onChange: e => setText(e.target.value), onKeyDown: e => { if (e.key === 'Enter')
                    submit(); } }),
            React.createElement("button", { className: "pl-btn pl-btn-primary p-2.5", disabled: !text.trim(), onClick: submit },
                React.createElement(Send, { size: 18 })))));
}
function MessagesTab({ currentUser, users, messages, setMessages }) {
    const [selectedId, setSelectedId] = useState(null);
    const [lastOpenedAt, setLastOpenedAt] = useState({});
    const others = users.filter(u => u.id !== currentUser.id);
    const conversations = useMemo(() => {
        const entries = [{ id: 'general', title: 'Général', otherUser: null }, ...others.map(u => ({ id: dmId(currentUser.id, u.id), title: u.name, otherUser: u }))];
        return entries.map(c => {
            const list = messages.filter(m => m.conversationId === c.id);
            const last = list.length ? list.reduce((a, b) => (a.createdAt > b.createdAt ? a : b)) : null;
            const unread = list.some(m => m.senderId !== currentUser.id && m.createdAt > (lastOpenedAt[c.id] || 0));
            return { ...c, last, unread };
        }).sort((a, b) => {
            if (a.id === 'general')
                return -1;
            if (b.id === 'general')
                return 1;
            return (b.last ? b.last.createdAt : 0) - (a.last ? a.last.createdAt : 0);
        });
    }, [messages, others, currentUser.id, lastOpenedAt]);
    async function handleSend(conversationId, text) {
        const msg = { id: uid('msg'), conversationId, senderId: currentUser.id, text, createdAt: Date.now() };
        const updated = await mutateCollection(K.messages, arr => [...arr, msg]);
        setMessages(updated);
    }
    function openConversation(id) {
        setSelectedId(id);
        setLastOpenedAt(prev => ({ ...prev, [id]: Date.now() }));
    }
    const conv = conversations.find(c => c.id === selectedId) || null;
    return (React.createElement("div", { className: "pl-fadein md:flex md:gap-4", style: { minHeight: 'calc(100vh - 220px)' } },
        React.createElement("div", { className: cls('space-y-4 md:w-80 md:flex-shrink-0', selectedId && 'pl-hide-mobile') },
            React.createElement("div", null,
                React.createElement("div", { className: "pl-eyebrow" },
                    React.createElement("span", { className: "pl-eyebrow-dot" }),
                    "Discussions"),
                React.createElement("h2", { className: "pl-display text-2xl mt-1" }, "Messages")),
            React.createElement("div", { className: "space-y-2" }, conversations.map(c => (React.createElement("button", { key: c.id, onClick: () => openConversation(c.id), className: "pl-card pl-card-hover p-3 w-full text-left", style: { display: 'flex', alignItems: 'center', gap: '12px', borderColor: selectedId === c.id ? 'var(--leather)' : undefined } },
                c.otherUser ? React.createElement(Avatar, { user: c.otherUser, size: "sm" }) : React.createElement("div", { className: "pl-avatar", style: { width: 32, height: 32, background: 'var(--leather)' } },
                    React.createElement(Users, { size: 16, color: "#1A0E06" })),
                React.createElement("div", { className: "flex-1 min-w-0" },
                    React.createElement("div", { className: "text-sm font-semibold truncate" }, c.title),
                    React.createElement("div", { className: "text-xs truncate", style: { color: 'var(--muted)' } }, c.last ? c.last.text : 'Aucun message')),
                c.unread && React.createElement("span", { className: "pl-live-dot", style: { background: 'var(--leather)' } })))))),
        React.createElement("div", { className: cls('flex-1 mt-4 md:mt-0', !selectedId && 'pl-hide-mobile') }, selectedId ? (React.createElement(ChatView, { conversationId: selectedId, title: conv ? conv.title : '', otherUser: conv ? conv.otherUser : null, users: users, currentUser: currentUser, messages: messages, onSend: (text) => handleSend(selectedId, text), onBack: () => setSelectedId(null) })) : (React.createElement("div", { className: "pl-card p-8 text-center", style: { height: '100%', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(MessageCircle, { size: 28, style: { color: 'var(--muted)' } }),
            React.createElement("div", { className: "font-semibold mt-3" }, "Choisis une discussion"),
            React.createElement("div", { className: "text-sm mt-1", style: { color: 'var(--muted)' } }, "S\u00E9lectionne \"G\u00E9n\u00E9ral\" ou un joueur dans la liste."))))));
}
/* ============================== PROFILE ============================== */
function ProfilTab({ currentUser, users, tournaments, sessions, onSelectTournament, onLogout }) {
    const stats = useMemo(() => computeStats(users, tournaments), [users, tournaments]);
    const my = stats[currentUser.id] || { played: 0, wins: 0, losses: 0, tournamentsWon: 0 };
    const winRate = my.played ? Math.round((my.wins / my.played) * 100) : 0;
    const myTournaments = tournaments.filter(t => t.participantsUserIds.includes(currentUser.id)).sort((a, b) => b.createdAt - a.createdAt);
    return (React.createElement("div", { className: "space-y-5 pl-fadein" },
        React.createElement("div", { className: "pl-card p-5 text-center" },
            React.createElement("div", { style: { margin: '0 auto', width: 'fit-content' } },
                React.createElement(Avatar, { user: currentUser, size: "xl" })),
            React.createElement("div", { className: "pl-display text-2xl mt-3" }, currentUser.name),
            currentUser.position && React.createElement("span", { className: "pl-badge pl-badge-leather", style: { display: 'inline-flex', marginTop: '8px' } }, currentUser.position),
            React.createElement("div", { className: "text-xs mt-2", style: { color: 'var(--muted)' } },
                "Membre depuis ",
                new Date(currentUser.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })),
            currentUser.phone && React.createElement("div", { className: "text-xs mt-1", style: { color: 'var(--muted)' } },
                React.createElement(Phone, { size: 11, style: { display: 'inline', marginRight: '4px' } }),
                currentUser.phone)),
        React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3" },
            React.createElement(StatCard, { label: "Matchs", value: my.played }),
            React.createElement(StatCard, { label: "Victoires", value: my.wins, color: "var(--teal)" }),
            React.createElement(StatCard, { label: "Taux", value: `${winRate}%` }),
            React.createElement(StatCard, { label: "Titres", value: my.tournamentsWon, color: "var(--amber)" })),
        React.createElement("div", { className: "pl-card p-4" },
            React.createElement("div", { className: "pl-eyebrow" },
                React.createElement("span", { className: "pl-eyebrow-dot" }),
                "Mes tournois (",
                myTournaments.length,
                ")"),
            myTournaments.length === 0 ? (React.createElement("div", { className: "text-sm mt-2", style: { color: 'var(--muted)' } }, "Vous n'avez encore rejoint aucun tournoi.")) : (React.createElement("div", { className: "mt-3 space-y-2" }, myTournaments.map(t => (React.createElement("button", { key: t.id, onClick: () => onSelectTournament(t.id), className: "w-full flex items-center justify-between p-3 rounded-lg text-left", style: { background: 'var(--surface2)' } },
                React.createElement("div", null,
                    React.createElement("div", { className: "text-sm font-semibold" }, t.name),
                    React.createElement("div", { className: "text-xs", style: { color: 'var(--muted)' } }, formatOf(t.format).label)),
                React.createElement("span", { className: "pl-badge pl-badge-muted" }, t.status === 'inscription' ? 'Inscriptions' : t.status === 'en_cours' ? 'En cours' : 'Terminé'))))))),
        React.createElement("button", { className: "pl-btn pl-btn-danger w-full py-2.5", style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }, onClick: onLogout },
            React.createElement(LogOut, { size: 16 }),
            " Se d\u00E9connecter")));
}
/* ============================== APP ROOT ============================== */
export default function App() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedTournamentId, setSelectedTournamentId] = useState(null);
    useEffect(() => {
        let cancelled = false;
        (async () => {
            const [u, t, s, m] = await Promise.all([loadKey(K.users), loadKey(K.tournaments), loadKey(K.sessions), loadKey(K.messages)]);
            if (cancelled)
                return;
            setUsers(u);
            setTournaments(t);
            setSessions(s);
            setMessages(m);
            setLoading(false);
        })();
        return () => { cancelled = true; };
    }, []);
    useEffect(() => {
        if (!currentUser)
            return;
        const id = setInterval(async () => {
            const [u, t, s, m] = await Promise.all([loadKey(K.users), loadKey(K.tournaments), loadKey(K.sessions), loadKey(K.messages)]);
            setUsers(u);
            setTournaments(t);
            setSessions(s);
            setMessages(m);
        }, 7000);
        return () => clearInterval(id);
    }, [currentUser]);
    async function handleCreateUser(form) {
        const newUser = { id: uid('u'), name: form.name, color: form.color, pin: form.pin, position: form.position, phone: form.phone || null, createdAt: Date.now() };
        const updated = await mutateCollection(K.users, arr => [...arr, newUser]);
        setUsers(updated);
        setCurrentUser(newUser);
    }
    function handleLogout() {
        setCurrentUser(null);
        setActiveTab('dashboard');
        setSelectedTournamentId(null);
    }
    let content;
    if (loading) {
        content = React.createElement(LoadingScreen, null);
    }
    else if (!currentUser) {
        content = React.createElement(AuthScreen, { users: users, onCreateUser: handleCreateUser, onLogin: setCurrentUser });
    }
    else {
        content = (React.createElement(React.Fragment, null,
            React.createElement(Header, { currentUser: currentUser, onLogout: handleLogout }),
            React.createElement("div", { className: "max-w-6xl mx-auto md:flex md:items-start md:gap-6 md:px-4 md:pt-5" },
                React.createElement(Sidebar, { active: activeTab, onChange: (tab) => { setActiveTab(tab); if (tab !== 'tournois')
                        setSelectedTournamentId(null); } }),
                React.createElement("main", { className: "pl-content-pad px-4 py-5 md:px-0 md:py-0", style: { flex: 1, minWidth: 0 } },
                    activeTab === 'dashboard' && React.createElement(DashboardTab, { currentUser: currentUser, users: users, tournaments: tournaments, sessions: sessions }),
                    activeTab === 'tournois' && (React.createElement(TournamentsTab, { currentUser: currentUser, users: users, tournaments: tournaments, setTournaments: setTournaments, selectedTournamentId: selectedTournamentId, setSelectedTournamentId: setSelectedTournamentId })),
                    activeTab === 'messages' && React.createElement(MessagesTab, { currentUser: currentUser, users: users, messages: messages, setMessages: setMessages }),
                    activeTab === 'calendrier' && React.createElement(CalendarTab, { currentUser: currentUser, users: users, sessions: sessions, setSessions: setSessions }),
                    activeTab === 'profil' && (React.createElement(ProfilTab, { currentUser: currentUser, users: users, tournaments: tournaments, sessions: sessions, onSelectTournament: (id) => { setSelectedTournamentId(id); setActiveTab('tournois'); }, onLogout: handleLogout })))),
            React.createElement(BottomNav, { active: activeTab, onChange: (tab) => { setActiveTab(tab); if (tab !== 'tournois')
                    setSelectedTournamentId(null); } })));
    }
    return (React.createElement("div", { className: "pl-app min-h-screen", style: ROOT_VARS },
        React.createElement(GlobalStyle, null),
        content));
}
