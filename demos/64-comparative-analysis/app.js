// === Comparative Analysis Dashboard ===
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initPeriodSelector();
    renderRegionTable();
    drawRevenueChart();
    animateBars();
});

// === Period Selector ===
function initPeriodSelector() {
    const btns = document.querySelectorAll('.period-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// === Regional Data ===
const regionData = [
    { name: 'North America',  currRev: '$1.24M', prevRev: '$1.08M', deltaRev: '+14.8%', deltaRevDir: 'positive', currConv: '4.8%', prevConv: '4.2%', deltaConv: '+14.3%', deltaConvDir: 'positive', perf: 92, perfClass: 'good' },
    { name: 'Europe',         currRev: '$842K',  prevRev: '$761K',  deltaRev: '+10.6%', deltaRevDir: 'positive', currConv: '3.9%', prevConv: '3.6%', deltaConv: '+8.3%',  deltaConvDir: 'positive', perf: 78, perfClass: 'good' },
    { name: 'Asia Pacific',   currRev: '$438K',  prevRev: '$352K',  deltaRev: '+24.4%', deltaRevDir: 'positive', currConv: '3.4%', prevConv: '2.8%', deltaConv: '+21.4%', deltaConvDir: 'positive', perf: 85, perfClass: 'good' },
    { name: 'Latin America',  currRev: '$198K',  prevRev: '$172K',  deltaRev: '+15.1%', deltaRevDir: 'positive', currConv: '2.9%', prevConv: '2.7%', deltaConv: '+7.4%',  deltaConvDir: 'positive', perf: 64, perfClass: 'warning' },
    { name: 'Middle East',    currRev: '$87K',   prevRev: '$94K',   deltaRev: '-7.4%',  deltaRevDir: 'negative', currConv: '2.1%', prevConv: '2.5%', deltaConv: '-16.0%', deltaConvDir: 'negative', perf: 42, perfClass: 'bad' },
    { name: 'Africa',         currRev: '$35K',   prevRev: '$28K',   deltaRev: '+25.0%', deltaRevDir: 'positive', currConv: '1.8%', prevConv: '1.4%', deltaConv: '+28.6%', deltaConvDir: 'positive', perf: 56, perfClass: 'warning' },
];

function renderRegionTable() {
    const tbody = document.getElementById('regionTable');
    tbody.innerHTML = regionData.map(r => `
        <tr>
            <td class="region-name">${r.name}</td>
            <td>${r.currRev}</td>
            <td style="color: var(--text-dim)">${r.prevRev}</td>
            <td class="delta-cell ${r.deltaRevDir}">${r.deltaRev}</td>
            <td>${r.currConv}</td>
            <td style="color: var(--text-dim)">${r.prevConv}</td>
            <td class="delta-cell ${r.deltaConvDir}">${r.deltaConv}</td>
            <td>
                <div class="perf-bar">
                    <div class="perf-bar-track">
                        <div class="perf-bar-fill ${r.perfClass}" style="width: 0%" data-width="${r.perf}%"></div>
                    </div>
                    <span style="font-size: 0.75rem; color: var(--text-muted); min-width: 28px;">${r.perf}%</span>
                </div>
            </td>
        </tr>
    `).join('');
}

// === Animate Bars ===
function animateBars() {
    setTimeout(() => {
        document.querySelectorAll('.perf-bar-fill[data-width]').forEach(el => {
            el.style.width = el.dataset.width;
        });
    }, 300);
}

// === Revenue Chart (Canvas) ===
function drawRevenueChart() {
    const canvas = document.getElementById('revenueChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = 280 * dpr;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = '280px';
        ctx.scale(dpr, dpr);
    }
    resize();

    const W = canvas.width / dpr;
    const H = 280;
    const pad = { top: 20, right: 20, bottom: 40, left: 60 };

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentData = [180, 210, 195, 240, 260, 285, 310, 295, 340, 365, 390, 420];
    const previousData = [160, 175, 185, 200, 215, 230, 245, 255, 270, 290, 305, 320];

    const maxVal = Math.max(...currentData, ...previousData) * 1.1;
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;

    function xPos(i) { return pad.left + (i / (months.length - 1)) * chartW; }
    function yPos(v) { return pad.top + chartH - (v / maxVal) * chartH; }

    // Grid lines
    ctx.strokeStyle = 'rgba(42, 46, 59, 0.6)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = pad.top + (i / 4) * chartH;
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(W - pad.right, y);
        ctx.stroke();

        const val = Math.round(maxVal - (i / 4) * maxVal);
        ctx.fillStyle = '#5c6078';
        ctx.font = '11px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('$' + val + 'K', pad.left - 8, y + 4);
    }

    // X labels
    ctx.textAlign = 'center';
    ctx.fillStyle = '#5c6078';
    months.forEach((m, i) => {
        ctx.fillText(m, xPos(i), H - pad.bottom + 20);
    });

    // Draw filled area + line for previous
    ctx.beginPath();
    previousData.forEach((v, i) => {
        i === 0 ? ctx.moveTo(xPos(i), yPos(v)) : ctx.lineTo(xPos(i), yPos(v));
    });
    ctx.lineTo(xPos(previousData.length - 1), pad.top + chartH);
    ctx.lineTo(xPos(0), pad.top + chartH);
    ctx.closePath();
    ctx.fillStyle = 'rgba(168, 85, 247, 0.08)';
    ctx.fill();

    ctx.beginPath();
    previousData.forEach((v, i) => {
        i === 0 ? ctx.moveTo(xPos(i), yPos(v)) : ctx.lineTo(xPos(i), yPos(v));
    });
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw filled area + line for current
    ctx.beginPath();
    currentData.forEach((v, i) => {
        i === 0 ? ctx.moveTo(xPos(i), yPos(v)) : ctx.lineTo(xPos(i), yPos(v));
    });
    ctx.lineTo(xPos(currentData.length - 1), pad.top + chartH);
    ctx.lineTo(xPos(0), pad.top + chartH);
    ctx.closePath();
    ctx.fillStyle = 'rgba(59, 130, 246, 0.12)';
    ctx.fill();

    ctx.beginPath();
    currentData.forEach((v, i) => {
        i === 0 ? ctx.moveTo(xPos(i), yPos(v)) : ctx.lineTo(xPos(i), yPos(v));
    });
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Data points
    currentData.forEach((v, i) => {
        ctx.beginPath();
        ctx.arc(xPos(i), yPos(v), 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#3b82f6';
        ctx.fill();
        ctx.strokeStyle = '#1a1d27';
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    previousData.forEach((v, i) => {
        ctx.beginPath();
        ctx.arc(xPos(i), yPos(v), 3, 0, Math.PI * 2);
        ctx.fillStyle = '#a855f7';
        ctx.fill();
        ctx.strokeStyle = '#1a1d27';
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    // Tooltip on hover
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const closestIdx = Math.round(((mx - pad.left) / chartW) * (months.length - 1));
        if (closestIdx < 0 || closestIdx >= months.length) return;

        resize();
        // Redraw (simplified - just overlay tooltip)
        drawAll();

        // Vertical guide
        ctx.beginPath();
        ctx.moveTo(xPos(closestIdx), pad.top);
        ctx.lineTo(xPos(closestIdx), pad.top + chartH);
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Tooltip
        const tx = xPos(closestIdx);
        const ty = yPos(currentData[closestIdx]) - 50;
        ctx.fillStyle = 'rgba(26, 29, 39, 0.95)';
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
        ctx.lineWidth = 1;
        roundRect(ctx, tx - 55, ty, 110, 42, 6);

        ctx.font = '600 11px Inter';
        ctx.fillStyle = '#3b82f6';
        ctx.textAlign = 'left';
        ctx.fillText('Current: $' + currentData[closestIdx] + 'K', tx - 45, ty + 16);
        ctx.fillStyle = '#a855f7';
        ctx.fillText('Previous: $' + previousData[closestIdx] + 'K', tx - 45, ty + 32);
    });

    function drawAll() {
        ctx.clearRect(0, 0, W, H);
        // Grid
        ctx.strokeStyle = 'rgba(42, 46, 59, 0.6)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = pad.top + (i / 4) * chartH;
            ctx.beginPath();
            ctx.moveTo(pad.left, y);
            ctx.lineTo(W - pad.right, y);
            ctx.stroke();
            const val = Math.round(maxVal - (i / 4) * maxVal);
            ctx.fillStyle = '#5c6078';
            ctx.font = '11px Inter, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText('$' + val + 'K', pad.left - 8, y + 4);
        }
        ctx.textAlign = 'center';
        ctx.fillStyle = '#5c6078';
        months.forEach((m, i) => ctx.fillText(m, xPos(i), H - pad.bottom + 20));

        // Previous area
        ctx.beginPath();
        previousData.forEach((v, i) => i === 0 ? ctx.moveTo(xPos(i), yPos(v)) : ctx.lineTo(xPos(i), yPos(v)));
        ctx.lineTo(xPos(previousData.length - 1), pad.top + chartH);
        ctx.lineTo(xPos(0), pad.top + chartH);
        ctx.closePath();
        ctx.fillStyle = 'rgba(168, 85, 247, 0.08)';
        ctx.fill();
        ctx.beginPath();
        previousData.forEach((v, i) => i === 0 ? ctx.moveTo(xPos(i), yPos(v)) : ctx.lineTo(xPos(i), yPos(v)));
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Current area
        ctx.beginPath();
        currentData.forEach((v, i) => i === 0 ? ctx.moveTo(xPos(i), yPos(v)) : ctx.lineTo(xPos(i), yPos(v)));
        ctx.lineTo(xPos(currentData.length - 1), pad.top + chartH);
        ctx.lineTo(xPos(0), pad.top + chartH);
        ctx.closePath();
        ctx.fillStyle = 'rgba(59, 130, 246, 0.12)';
        ctx.fill();
        ctx.beginPath();
        currentData.forEach((v, i) => i === 0 ? ctx.moveTo(xPos(i), yPos(v)) : ctx.lineTo(xPos(i), yPos(v)));
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Points
        currentData.forEach((v, i) => {
            ctx.beginPath();
            ctx.arc(xPos(i), yPos(v), 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#3b82f6';
            ctx.fill();
            ctx.strokeStyle = '#1a1d27';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
        previousData.forEach((v, i) => {
            ctx.beginPath();
            ctx.arc(xPos(i), yPos(v), 3, 0, Math.PI * 2);
            ctx.fillStyle = '#a855f7';
            ctx.fill();
            ctx.strokeStyle = '#1a1d27';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    }

    function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    window.addEventListener('resize', () => { resize(); drawAll(); });
}

// === Sort buttons ===
document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});
