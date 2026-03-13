// === Data ===
const funnelData = [
    { label: 'Page Visit', count: 142387, color: '#3B82F6' },
    { label: 'Sign Up Started', count: 48211, color: '#6366F1' },
    { label: 'Email Verified', count: 31874, color: '#A855F7' },
    { label: 'Onboarding Done', count: 18493, color: '#EC4899' },
    { label: 'First Purchase', count: 6862, color: '#F43F5E' },
];

const cohortData = {
    weeks: ['Week 0', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
    cohorts: [
        { label: 'Jan 6', users: 18420, retention: [100, 42, 31, 25, 22, 19, 17, 15] },
        { label: 'Jan 13', users: 19103, retention: [100, 45, 33, 27, 23, 20, 18, null] },
        { label: 'Jan 20', users: 17856, retention: [100, 40, 29, 24, 21, 18, null, null] },
        { label: 'Jan 27', users: 20412, retention: [100, 44, 34, 28, 24, null, null, null] },
        { label: 'Feb 3', users: 21890, retention: [100, 47, 36, 29, null, null, null, null] },
        { label: 'Feb 10', users: 19774, retention: [100, 43, 32, null, null, null, null, null] },
        { label: 'Feb 17', users: 22150, retention: [100, 46, null, null, null, null, null, null] },
        { label: 'Feb 24', users: 22782, retention: [100, null, null, null, null, null, null, null] },
    ]
};

const engagementData = [
    { label: 'Power Users', count: 8543, pct: 6, color: '#3B82F6' },
    { label: 'Active', count: 28477, pct: 20, color: '#22C55E' },
    { label: 'Casual', count: 42716, pct: 30, color: '#F59E0B' },
    { label: 'Occasional', count: 35597, pct: 25, color: '#A855F7' },
    { label: 'Dormant', count: 27054, pct: 19, color: '#EF4444' },
];

const sessionsData = [
    { name: 'Sarah M.', initials: 'SM', color: '#3B82F6', pages: '/pricing → /features → /signup → /checkout', duration: '12m 34s', time: '2 min ago', tag: 'converted' },
    { name: 'Alex R.', initials: 'AR', color: '#A855F7', pages: '/blog/react-tips → /about', duration: '3m 12s', time: '5 min ago', tag: 'bounced' },
    { name: 'Priya K.', initials: 'PK', color: '#22C55E', pages: '/dashboard → /settings → /integrations → /api-docs', duration: '8m 45s', time: '8 min ago', tag: 'active' },
    { name: 'James T.', initials: 'JT', color: '#F59E0B', pages: '/home → /pricing → /case-studies → /demo', duration: '6m 18s', time: '12 min ago', tag: 'active' },
    { name: 'Maria L.', initials: 'ML', color: '#EC4899', pages: '/signup → /verify-email', duration: '1m 42s', time: '15 min ago', tag: 'bounced' },
    { name: 'David C.', initials: 'DC', color: '#06B6D4', pages: '/home → /features → /pricing → /signup → /welcome', duration: '9m 56s', time: '18 min ago', tag: 'converted' },
];

const sankeyNodes = [
    // Column 0 — Sources
    { id: 'direct', label: 'Direct', value: '45.2K', x: 0, y: 0 },
    { id: 'google', label: 'Google', value: '52.1K', x: 0, y: 75 },
    { id: 'social', label: 'Social', value: '28.8K', x: 0, y: 150 },
    { id: 'referral', label: 'Referral', value: '16.3K', x: 0, y: 225 },
    // Column 1 — Landing
    { id: 'home', label: 'Homepage', value: '68.4K', x: 1, y: 20 },
    { id: 'blog', label: 'Blog', value: '38.2K', x: 1, y: 115 },
    { id: 'pricing', label: 'Pricing', value: '35.8K', x: 1, y: 200 },
    // Column 2 — Action
    { id: 'signup', label: 'Sign Up', value: '48.2K', x: 2, y: 0 },
    { id: 'demo', label: 'Book Demo', value: '12.4K', x: 2, y: 90 },
    { id: 'docs', label: 'Read Docs', value: '21.6K', x: 2, y: 170 },
    { id: 'exit_mid', label: 'Exit', value: '60.2K', x: 2, y: 255 },
    // Column 3 — Outcome
    { id: 'converted', label: 'Converted', value: '6.9K', x: 3, y: 20 },
    { id: 'trial', label: 'Trial', value: '28.1K', x: 3, y: 100 },
    { id: 'exit_end', label: 'Dropped Off', value: '47.2K', x: 3, y: 200 },
];

const sankeyLinks = [
    // Sources → Landing
    { from: 'direct', to: 'home', value: 32 },
    { from: 'direct', to: 'pricing', value: 13 },
    { from: 'google', to: 'home', value: 20 },
    { from: 'google', to: 'blog', value: 25 },
    { from: 'google', to: 'pricing', value: 7 },
    { from: 'social', to: 'home', value: 16 },
    { from: 'social', to: 'blog', value: 13 },
    { from: 'referral', to: 'home', value: 5 },
    { from: 'referral', to: 'pricing', value: 11 },
    // Landing → Action
    { from: 'home', to: 'signup', value: 30 },
    { from: 'home', to: 'demo', value: 8 },
    { from: 'home', to: 'exit_mid', value: 30 },
    { from: 'blog', to: 'signup', value: 10 },
    { from: 'blog', to: 'docs', value: 16 },
    { from: 'blog', to: 'exit_mid', value: 12 },
    { from: 'pricing', to: 'signup', value: 8 },
    { from: 'pricing', to: 'demo', value: 4 },
    { from: 'pricing', to: 'exit_mid', value: 18 },
    { from: 'pricing', to: 'docs', value: 6 },
    // Action → Outcome
    { from: 'signup', to: 'converted', value: 5 },
    { from: 'signup', to: 'trial', value: 22 },
    { from: 'signup', to: 'exit_end', value: 21 },
    { from: 'demo', to: 'converted', value: 2 },
    { from: 'demo', to: 'trial', value: 6 },
    { from: 'demo', to: 'exit_end', value: 4 },
    { from: 'docs', to: 'exit_end', value: 22 },
];

// === Funnel ===
function renderFunnel() {
    const el = document.getElementById('funnel');
    const maxCount = funnelData[0].count;
    let html = '';

    funnelData.forEach((stage, i) => {
        const pct = (stage.count / maxCount * 100);
        const convPct = (stage.count / maxCount * 100).toFixed(1);
        html += `<div class="funnel-stage">
            <div class="funnel-bar-wrap">
                <div class="funnel-bar" style="width:${Math.max(pct, 20)}%;background:${stage.color}">
                    <span class="funnel-bar-label">${stage.label}</span>
                </div>
            </div>
            <div class="funnel-stats">
                <span class="funnel-count">${stage.count.toLocaleString()}</span>
                <span class="funnel-pct">${convPct}%</span>
            </div>
        </div>`;
        if (i < funnelData.length - 1) {
            const dropoff = ((1 - funnelData[i+1].count / stage.count) * 100).toFixed(1);
            html += `<div class="funnel-drop">
                <i data-lucide="arrow-down"></i>
                ${dropoff}% drop-off
            </div>`;
        }
    });
    el.innerHTML = html;
}

// === Retention Chart (Canvas) ===
function renderRetentionChart() {
    const canvas = document.getElementById('retentionChart');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = (rect.width - 40) * dpr;
    canvas.height = 260 * dpr;
    canvas.style.width = (rect.width - 40) + 'px';
    canvas.style.height = '260px';
    ctx.scale(dpr, dpr);

    const w = rect.width - 40;
    const h = 260;
    const pad = { top: 20, right: 20, bottom: 35, left: 45 };
    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;

    // Data — weekly retention curves
    const curves = [
        { label: 'This Month', color: '#3B82F6', data: [100, 46, 34, 28, 24, 20, 18, 16] },
        { label: 'Last Month', color: '#A855F7', data: [100, 42, 30, 24, 21, 18, 16, 14] },
        { label: 'Benchmark', color: '#5A5F75', data: [100, 38, 26, 20, 17, 15, 13, 12], dashed: true },
    ];

    const weeks = curves[0].data.length;

    // Grid
    ctx.strokeStyle = '#2A2E3F';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = pad.top + (plotH / 5) * i;
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(w - pad.right, y);
        ctx.stroke();

        ctx.fillStyle = '#5A5F75';
        ctx.font = '11px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText((100 - i * 20) + '%', pad.left - 8, y + 4);
    }

    // X labels
    ctx.textAlign = 'center';
    ctx.fillStyle = '#5A5F75';
    for (let i = 0; i < weeks; i++) {
        const x = pad.left + (plotW / (weeks - 1)) * i;
        ctx.fillText('W' + i, x, h - pad.bottom + 20);
    }

    // Curves
    curves.forEach(curve => {
        ctx.beginPath();
        ctx.strokeStyle = curve.color;
        ctx.lineWidth = 2.5;
        if (curve.dashed) ctx.setLineDash([6, 4]);
        else ctx.setLineDash([]);

        curve.data.forEach((val, i) => {
            const x = pad.left + (plotW / (weeks - 1)) * i;
            const y = pad.top + plotH - (val / 100) * plotH;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Fill area
        if (!curve.dashed) {
            ctx.globalAlpha = 0.08;
            ctx.lineTo(pad.left + plotW, pad.top + plotH);
            ctx.lineTo(pad.left, pad.top + plotH);
            ctx.closePath();
            ctx.fillStyle = curve.color;
            ctx.fill();
            ctx.globalAlpha = 1;
        }

        // Dots
        ctx.setLineDash([]);
        curve.data.forEach((val, i) => {
            const x = pad.left + (plotW / (weeks - 1)) * i;
            const y = pad.top + plotH - (val / 100) * plotH;
            ctx.beginPath();
            ctx.arc(x, y, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = curve.color;
            ctx.fill();
        });
    });

    // Legend
    const legendY = h - 5;
    let legendX = pad.left;
    ctx.font = '11px Inter, sans-serif';
    curves.forEach(curve => {
        ctx.fillStyle = curve.color;
        ctx.fillRect(legendX, legendY - 8, 14, 3);
        ctx.fillStyle = '#8B90A5';
        ctx.textAlign = 'left';
        ctx.fillText(curve.label, legendX + 18, legendY - 3);
        legendX += ctx.measureText(curve.label).width + 36;
    });
}

// === Sankey Diagram ===
function renderSankey() {
    const container = document.getElementById('sankey');
    const containerW = container.offsetWidth;
    const containerH = 320;
    const colPositions = [30, containerW * 0.28, containerW * 0.56, containerW * 0.82];
    const nodeW = 120;
    const nodeH = 52;

    // Position nodes
    const nodeMap = {};
    sankeyNodes.forEach(n => {
        n.px = colPositions[n.x];
        n.py = n.y + 15;
        nodeMap[n.id] = n;
    });

    // SVG paths
    let svg = `<svg class="sankey-svg" viewBox="0 0 ${containerW} ${containerH}">`;
    const colors = ['#3B82F6', '#6366F1', '#A855F7', '#22C55E', '#F59E0B', '#EC4899'];

    sankeyLinks.forEach((link, idx) => {
        const from = nodeMap[link.from];
        const to = nodeMap[link.to];
        const x1 = from.px + nodeW;
        const y1 = from.py + nodeH / 2;
        const x2 = to.px;
        const y2 = to.py + nodeH / 2;
        const cx1 = x1 + (x2 - x1) * 0.4;
        const cx2 = x2 - (x2 - x1) * 0.4;
        const strokeW = Math.max(link.value * 0.8, 2);
        const color = colors[idx % colors.length];

        svg += `<path class="sankey-path" d="M${x1},${y1} C${cx1},${y1} ${cx2},${y2} ${x2},${y2}" 
                stroke="${color}" stroke-width="${strokeW}"/>`;
    });
    svg += '</svg>';

    // Nodes
    let nodesHtml = '';
    sankeyNodes.forEach(n => {
        nodesHtml += `<div class="sankey-node" style="left:${n.px}px;top:${n.py}px;width:${nodeW}px">
            ${n.label}
            <span class="sankey-node-value">${n.value}</span>
        </div>`;
    });

    container.innerHTML = svg + nodesHtml;
}

// === Cohort Table ===
function renderCohort() {
    const table = document.getElementById('cohortTable');
    let html = '<thead><tr><th>Cohort</th><th>Users</th>';
    cohortData.weeks.forEach(w => html += `<th>${w}</th>`);
    html += '</tr></thead><tbody>';

    cohortData.cohorts.forEach(row => {
        html += `<tr><td>${row.label}</td><td class="cohort-users">${row.users.toLocaleString()}</td>`;
        row.retention.forEach(val => {
            if (val === null) {
                html += '<td></td>';
            } else {
                const intensity = val / 100;
                const bg = `rgba(59,130,246,${intensity * 0.7})`;
                const textColor = intensity > 0.35 ? '#fff' : '#8B90A5';
                html += `<td class="cohort-cell" style="background:${bg};color:${textColor}">${val}%</td>`;
            }
        });
        html += '</tr>';
    });
    html += '</tbody>';
    table.innerHTML = html;
}

// === Engagement Bars ===
function renderEngagement() {
    const el = document.getElementById('engagementBars');
    let html = '';
    engagementData.forEach(d => {
        html += `<div class="engagement-row">
            <span class="engagement-label">${d.label}</span>
            <div class="engagement-track">
                <div class="engagement-fill" style="width:0%;background:${d.color}" data-target="${d.pct}">
                    ${d.pct}%
                </div>
            </div>
            <span class="engagement-count">${d.count.toLocaleString()}</span>
        </div>`;
    });
    el.innerHTML = html;

    // Animate
    requestAnimationFrame(() => {
        setTimeout(() => {
            el.querySelectorAll('.engagement-fill').forEach(bar => {
                bar.style.width = bar.dataset.target + '%';
            });
        }, 100);
    });
}

// === Sessions List ===
function renderSessions() {
    const el = document.getElementById('sessionsList');
    let html = '';
    sessionsData.forEach(s => {
        html += `<div class="session-item">
            <div class="session-avatar" style="background:${s.color}">${s.initials}</div>
            <div class="session-info">
                <div class="session-user">
                    ${s.name}
                    <span class="session-tag ${s.tag}">${s.tag}</span>
                </div>
                <div class="session-pages">${s.pages}</div>
            </div>
            <div class="session-meta">
                <span class="session-duration">${s.duration}</span>
                <span class="session-time">${s.time}</span>
            </div>
        </div>`;
    });
    el.innerHTML = html;
}

// === Init ===
function init() {
    renderFunnel();
    renderRetentionChart();
    renderSankey();
    renderCohort();
    renderEngagement();
    renderSessions();
    lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('resize', () => {
    renderRetentionChart();
    renderSankey();
});
