// Financial Dashboard — app.js
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    animateKPIs();
    renderRevenueExpenseChart();
    renderExpenseBreakdownChart();
    renderWaterfallChart();
    renderBudgetActualChart();
    renderPLTable();
    renderAuditTrail();
    renderFinancialRatios();
});

// --- Utilities ---
function fmt(n, decimals = 0) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(n);
}

function fmtK(n) {
    if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M';
    if (Math.abs(n) >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K';
    return fmt(n);
}

// --- KPI Count-Up Animation ---
function animateKPIs() {
    document.querySelectorAll('.kpi-value').forEach(el => {
        const target = parseFloat(el.dataset.target);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const start = performance.now();

        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;

            if (prefix === '$') {
                el.textContent = fmtK(current);
            } else {
                el.textContent = current.toFixed(1) + suffix;
            }

            if (progress < 1) requestAnimationFrame(step);
            else {
                if (prefix === '$') el.textContent = fmtK(target);
                else el.textContent = target.toFixed(1) + suffix;
            }
        }
        requestAnimationFrame(step);
    });
}

// --- Chart Defaults ---
const chartFont = { family: "'Inter', sans-serif", size: 11 };
Chart.defaults.font = chartFont;
Chart.defaults.color = '#6B7280';
Chart.defaults.plugins.legend.display = false;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const q1Months = ['Jan', 'Feb', 'Mar'];

// --- Revenue vs Expenses (Bar + Line) ---
function renderRevenueExpenseChart() {
    const revenue = [1320, 1425, 1540];
    const expenses = [1120, 1133, 1140];
    const profit = revenue.map((r, i) => r - expenses[i]);

    new Chart(document.getElementById('revenueExpenseChart'), {
        type: 'bar',
        data: {
            labels: q1Months,
            datasets: [
                {
                    label: 'Revenue',
                    data: revenue,
                    backgroundColor: '#3B82F6',
                    borderRadius: 4,
                    barPercentage: 0.35,
                    categoryPercentage: 0.7
                },
                {
                    label: 'Expenses',
                    data: expenses,
                    backgroundColor: '#EF4444',
                    borderRadius: 4,
                    barPercentage: 0.35,
                    categoryPercentage: 0.7
                },
                {
                    label: 'Net Profit',
                    data: profit,
                    type: 'line',
                    borderColor: '#22C55E',
                    backgroundColor: 'rgba(34,197,94,0.1)',
                    fill: true,
                    tension: 0.3,
                    pointRadius: 5,
                    pointBackgroundColor: '#22C55E',
                    borderWidth: 2,
                    yAxisID: 'y'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.2,
            interaction: { mode: 'index', intersect: false },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#F3F4F6' },
                    ticks: { callback: v => '$' + v + 'K' }
                },
                x: { grid: { display: false } }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: ctx => ctx.dataset.label + ': $' + ctx.parsed.y.toLocaleString() + 'K'
                    }
                }
            }
        }
    });
}

// --- Expense Breakdown (Doughnut) ---
function renderExpenseBreakdownChart() {
    const data = [
        { label: 'Payroll', value: 1520, color: '#3B82F6' },
        { label: 'Marketing', value: 580, color: '#8B5CF6' },
        { label: 'Infrastructure', value: 420, color: '#F59E0B' },
        { label: 'Operations', value: 390, color: '#22C55E' },
        { label: 'R&D', value: 310, color: '#06B6D4' },
        { label: 'Other', value: 173, color: '#9CA3AF' }
    ];

    new Chart(document.getElementById('expenseBreakdownChart'), {
        type: 'doughnut',
        data: {
            labels: data.map(d => d.label),
            datasets: [{
                data: data.map(d => d.value),
                backgroundColor: data.map(d => d.color),
                borderWidth: 0,
                hoverOffset: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.3,
            cutout: '65%',
            plugins: {
                tooltip: {
                    callbacks: {
                        label: ctx => ctx.label + ': $' + ctx.parsed.toLocaleString() + 'K (' +
                            ((ctx.parsed / data.reduce((s, d) => s + d.value, 0)) * 100).toFixed(1) + '%)'
                    }
                }
            }
        }
    });

    const list = document.getElementById('expenseList');
    const total = data.reduce((s, d) => s + d.value, 0);
    data.forEach(d => {
        const pct = ((d.value / total) * 100).toFixed(1);
        list.innerHTML += `
            <div class="expense-item">
                <div class="expense-item-left">
                    <span class="expense-dot" style="background:${d.color}"></span>
                    <span>${d.label}</span>
                </div>
                <span class="expense-item-value">$${d.value.toLocaleString()}K (${pct}%)</span>
            </div>`;
    });
}

// --- Cash Flow Waterfall ---
function renderWaterfallChart() {
    const items = [
        { label: 'Opening', value: 6720, type: 'total' },
        { label: 'Revenue', value: 4285, type: 'increase' },
        { label: 'Payroll', value: -1520, type: 'decrease' },
        { label: 'Marketing', value: -580, type: 'decrease' },
        { label: 'Infra', value: -420, type: 'decrease' },
        { label: 'Operations', value: -390, type: 'decrease' },
        { label: 'Other', value: -483, type: 'decrease' },
        { label: 'Tax', value: -472, type: 'decrease' },
        { label: 'Closing', value: 7140, type: 'total' }
    ];

    // Build waterfall data
    let running = 0;
    const bases = [];
    const values = [];
    const colors = [];

    items.forEach(item => {
        if (item.type === 'total') {
            bases.push(0);
            values.push(item.value);
            colors.push('#003366');
        } else if (item.type === 'increase') {
            bases.push(running);
            values.push(item.value);
            colors.push('#22C55E');
            running += item.value;
        } else {
            running += item.value;
            bases.push(running);
            values.push(Math.abs(item.value));
            colors.push('#EF4444');
        }
        if (item.type === 'total') running = item.value;
    });

    new Chart(document.getElementById('waterfallChart'), {
        type: 'bar',
        data: {
            labels: items.map(i => i.label),
            datasets: [
                {
                    label: 'Base',
                    data: bases,
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    barPercentage: 0.6
                },
                {
                    label: 'Value',
                    data: values,
                    backgroundColor: colors,
                    borderRadius: 3,
                    barPercentage: 0.6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            scales: {
                x: {
                    stacked: true,
                    grid: { display: false }
                },
                y: {
                    stacked: true,
                    grid: { color: '#F3F4F6' },
                    ticks: { callback: v => '$' + (v / 1000).toFixed(0) + 'K' },
                    min: 0
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: ctx => {
                            if (ctx.datasetIndex === 0) return '';
                            const item = items[ctx.dataIndex];
                            const sign = item.value >= 0 ? '+' : '';
                            return item.label + ': ' + sign + '$' + item.value.toLocaleString() + 'K';
                        }
                    },
                    filter: ctx => ctx.datasetIndex === 1
                }
            }
        }
    });
}

// --- Budget vs Actual ---
function renderBudgetActualChart() {
    const categories = ['Payroll', 'Marketing', 'Infra', 'Operations', 'R&D', 'Travel', 'Legal', 'Other'];
    const budget =  [1600, 620, 450, 380, 340, 120, 90, 200];
    const actual =  [1520, 580, 420, 390, 310, 95, 105, 173];

    new Chart(document.getElementById('budgetActualChart'), {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [
                {
                    label: 'Budget',
                    data: budget,
                    backgroundColor: 'rgba(139,92,246,0.25)',
                    borderColor: '#8B5CF6',
                    borderWidth: 1.5,
                    borderRadius: 4,
                    barPercentage: 0.4,
                    categoryPercentage: 0.7
                },
                {
                    label: 'Actual',
                    data: actual,
                    backgroundColor: 'rgba(59,130,246,0.7)',
                    borderColor: '#3B82F6',
                    borderWidth: 0,
                    borderRadius: 4,
                    barPercentage: 0.4,
                    categoryPercentage: 0.7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.2,
            interaction: { mode: 'index', intersect: false },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#F3F4F6' },
                    ticks: { callback: v => '$' + v + 'K' }
                },
                x: { grid: { display: false } }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        afterBody: ctx => {
                            const b = budget[ctx[0].dataIndex];
                            const a = actual[ctx[0].dataIndex];
                            const variance = a - b;
                            const pct = ((variance / b) * 100).toFixed(1);
                            const sign = variance > 0 ? '+' : '';
                            return `Variance: ${sign}$${variance}K (${sign}${pct}%)`;
                        }
                    }
                }
            }
        }
    });
}

// --- P&L Table ---
function renderPLTable() {
    const rows = [
        { type: 'header', label: 'Revenue' },
        { label: 'Product Sales', jan: 920, feb: 995, mar: 1080, budget: 2850 },
        { label: 'Service Revenue', jan: 310, feb: 335, mar: 350, budget: 950 },
        { label: 'Subscriptions', jan: 72, feb: 78, mar: 88, budget: 220 },
        { label: 'Other Income', jan: 18, feb: 17, mar: 22, budget: 50 },
        { type: 'subtotal', label: 'Total Revenue', jan: 1320, feb: 1425, mar: 1540, budget: 4070 },

        { type: 'header', label: 'Cost of Goods Sold' },
        { label: 'Direct Materials', jan: 310, feb: 325, mar: 340, budget: 960 },
        { label: 'Direct Labor', jan: 180, feb: 185, mar: 190, budget: 540 },
        { label: 'Manufacturing Overhead', jan: 65, feb: 68, mar: 72, budget: 200 },
        { type: 'subtotal', label: 'Total COGS', jan: 555, feb: 578, mar: 602, budget: 1700 },

        { type: 'subtotal', label: 'Gross Profit', jan: 765, feb: 847, mar: 938, budget: 2370, cls: 'grand-total' },

        { type: 'header', label: 'Operating Expenses' },
        { label: 'Payroll & Benefits', jan: 495, feb: 510, mar: 515, budget: 1600 },
        { label: 'Marketing & Advertising', jan: 185, feb: 195, mar: 200, budget: 620 },
        { label: 'Technology & Infrastructure', jan: 135, feb: 140, mar: 145, budget: 450 },
        { label: 'Office & Operations', jan: 125, feb: 130, mar: 135, budget: 380 },
        { label: 'Research & Development', jan: 98, feb: 102, mar: 110, budget: 340 },
        { label: 'Travel & Entertainment', jan: 28, feb: 32, mar: 35, budget: 120 },
        { label: 'Legal & Professional', jan: 32, feb: 38, mar: 35, budget: 90 },
        { type: 'subtotal', label: 'Total OpEx', jan: 1098, feb: 1147, mar: 1175, budget: 3600 },

        { type: 'subtotal', label: 'Net Profit Before Tax', jan: -333, feb: -300, mar: -237, budget: -1230, cls: 'grand-total' },
    ];

    // Recalculate: gross profit - opex etc. Actually let's keep it simple with the provided data
    // Fix the net profit: gross - opex
    // GP: 765, 847, 938. OpEx: 1098, 1147, 1175. NP: -333, -300, -237... That's negative.
    // Actually for a Q1 it makes sense if revenue is $1.3M/mo but let me fix to be profitable.
    // Let me adjust: Revenue is in thousands (already K), so total revenue Q1 = 4285K = $4.285M
    // Let me redo to match KPIs.

    // Actually the KPI says net profit $892K. Let me fix the numbers.
    const plData = [
        { type: 'header', label: 'Revenue' },
        { label: 'Product Sales', jan: 920, feb: 995, mar: 1080 },
        { label: 'Service Revenue', jan: 310, feb: 335, mar: 350 },
        { label: 'Subscriptions', jan: 72, feb: 78, mar: 88 },
        { label: 'Other Income', jan: 18, feb: 17, mar: 22 },
        { type: 'subtotal', label: 'Total Revenue', computed: true },

        { type: 'header', label: 'Cost of Goods Sold' },
        { label: 'Direct Materials', jan: 265, feb: 275, mar: 285 },
        { label: 'Direct Labor', jan: 145, feb: 150, mar: 155 },
        { label: 'Manufacturing Overhead', jan: 52, feb: 55, mar: 58 },
        { type: 'subtotal', label: 'Total COGS', computed: true },

        { type: 'header', label: 'Operating Expenses' },
        { label: 'Payroll & Benefits', jan: 380, feb: 390, mar: 395 },
        { label: 'Marketing & Advertising', jan: 145, feb: 155, mar: 160 },
        { label: 'Technology & Infrastructure', jan: 105, feb: 110, mar: 115 },
        { label: 'Office & Operations', jan: 85, feb: 88, mar: 92 },
        { label: 'Research & Development', jan: 68, feb: 72, mar: 78 },
        { label: 'Travel & Entertainment', jan: 22, feb: 25, mar: 28 },
        { label: 'Legal & Professional', jan: 18, feb: 20, mar: 22 },
        { type: 'subtotal', label: 'Total OpEx', computed: true },
    ];

    // Calculate
    const body = document.getElementById('plBody');

    // Revenue items
    const revItems = plData.filter(r => !r.type).slice(0, 4);
    const cogsItems = plData.filter(r => !r.type).slice(4, 7);
    const opexItems = plData.filter(r => !r.type).slice(7);

    const sum = (items, key) => items.reduce((s, i) => s + (i[key] || 0), 0);

    const revJan = sum(revItems, 'jan'), revFeb = sum(revItems, 'feb'), revMar = sum(revItems, 'mar');
    const cogsJan = sum(cogsItems, 'jan'), cogsFeb = sum(cogsItems, 'feb'), cogsMar = sum(cogsItems, 'mar');
    const opexJan = sum(opexItems, 'jan'), opexFeb = sum(opexItems, 'feb'), opexMar = sum(opexItems, 'mar');

    const gpJan = revJan - cogsJan, gpFeb = revFeb - cogsFeb, gpMar = revMar - cogsMar;
    const npJan = gpJan - opexJan, npFeb = gpFeb - opexFeb, npMar = gpMar - opexMar;

    function addRow(label, jan, feb, mar, budget, cls = '') {
        const q1 = jan + feb + mar;
        const variance = q1 - budget;
        const varPct = budget !== 0 ? ((variance / Math.abs(budget)) * 100).toFixed(1) : '0.0';
        const varClass = variance >= 0 ? 'positive' : 'negative';
        // For expenses, under budget is good (negative variance = positive)
        body.innerHTML += `
            <tr class="${cls}">
                <td>${label}</td>
                <td class="num">${fmtK(jan)}</td>
                <td class="num">${fmtK(feb)}</td>
                <td class="num">${fmtK(mar)}</td>
                <td class="num"><strong>${fmtK(q1)}</strong></td>
                <td class="num">${fmtK(budget)}</td>
                <td class="num ${varClass}">${variance >= 0 ? '+' : ''}${fmtK(variance)}</td>
                <td class="num ${varClass}">${variance >= 0 ? '+' : ''}${varPct}%</td>
            </tr>`;
    }

    function addHeader(label) {
        body.innerHTML += `<tr class="section-header"><td colspan="8">${label}</td></tr>`;
    }

    // Revenue
    addHeader('Revenue');
    revItems.forEach(r => addRow(r.label, r.jan, r.feb, r.mar, Math.round((r.jan + r.feb + r.mar) * 1.05)));
    addRow('Total Revenue', revJan, revFeb, revMar, 4070, 'subtotal');

    // COGS
    addHeader('Cost of Goods Sold');
    cogsItems.forEach(r => addRow(r.label, r.jan, r.feb, r.mar, Math.round((r.jan + r.feb + r.mar) * 1.08)));
    addRow('Total COGS', cogsJan, cogsFeb, cogsMar, 1700, 'subtotal');

    // Gross Profit
    addRow('Gross Profit', gpJan, gpFeb, gpMar, 2370, 'grand-total');

    // OpEx
    addHeader('Operating Expenses');
    opexItems.forEach(r => addRow(r.label, r.jan, r.feb, r.mar, Math.round((r.jan + r.feb + r.mar) * 1.1)));
    addRow('Total Operating Expenses', opexJan, opexFeb, opexMar, 3200, 'subtotal');

    // Net Profit
    addRow('Net Profit', npJan, npFeb, npMar, 892, 'grand-total');
}

// --- Audit Trail ---
function renderAuditTrail() {
    const entries = [
        { ts: '2026-03-14 09:42', user: 'Sarah Chen', action: 'Approved expense report', cat: 'Expenses', amount: 4250, status: 'approved' },
        { ts: '2026-03-14 09:15', user: 'Mike Torres', action: 'Submitted vendor invoice', cat: 'Accounts Payable', amount: 18500, status: 'pending' },
        { ts: '2026-03-13 16:30', user: 'Emily Park', action: 'Adjusted depreciation entry', cat: 'Fixed Assets', amount: 12800, status: 'approved' },
        { ts: '2026-03-13 14:22', user: 'David Kim', action: 'Flagged duplicate transaction', cat: 'Revenue', amount: 3200, status: 'flagged' },
        { ts: '2026-03-13 11:05', user: 'Sarah Chen', action: 'Budget reallocation Q2', cat: 'Budget', amount: 45000, status: 'approved' },
        { ts: '2026-03-12 17:48', user: 'Lisa Wang', action: 'Processed payroll batch', cat: 'Payroll', amount: 128500, status: 'approved' },
        { ts: '2026-03-12 10:30', user: 'Mike Torres', action: 'Updated vendor terms', cat: 'Procurement', amount: 0, status: 'pending' },
        { ts: '2026-03-11 15:12', user: 'Emily Park', action: 'Reconciled bank statement', cat: 'Banking', amount: 0, status: 'approved' },
    ];

    const body = document.getElementById('auditBody');
    const statusIcons = {
        approved: 'check-circle',
        pending: 'clock',
        flagged: 'alert-triangle'
    };

    entries.forEach(e => {
        body.innerHTML += `
            <tr>
                <td>${e.ts}</td>
                <td>${e.user}</td>
                <td>${e.action}</td>
                <td>${e.cat}</td>
                <td class="num">${e.amount ? fmt(e.amount) : '—'}</td>
                <td>
                    <span class="status-badge ${e.status}">
                        <i data-lucide="${statusIcons[e.status]}"></i>
                        ${e.status.charAt(0).toUpperCase() + e.status.slice(1)}
                    </span>
                </td>
            </tr>`;
    });

    // Re-init lucide for dynamic icons
    lucide.createIcons();
}

// --- Financial Ratios ---
function renderFinancialRatios() {
    const ratios = [
        { label: 'Current Ratio', value: '2.4x', fill: 80, color: '#22C55E', context: 'Target: >2.0x' },
        { label: 'Debt-to-Equity', value: '0.35', fill: 35, color: '#3B82F6', context: 'Target: <0.5' },
        { label: 'Return on Equity', value: '18.2%', fill: 72, color: '#8B5CF6', context: 'vs 15.4% LY' },
        { label: 'Operating Margin', value: '20.8%', fill: 69, color: '#F59E0B', context: 'vs 18.7% LY' },
        { label: 'Quick Ratio', value: '1.8x', fill: 72, color: '#06B6D4', context: 'Target: >1.5x' },
        { label: 'Asset Turnover', value: '1.2x', fill: 60, color: '#EC4899', context: 'vs 1.1x LY' },
        { label: 'Interest Coverage', value: '8.5x', fill: 85, color: '#22C55E', context: 'Target: >5.0x' },
        { label: 'Net Profit Margin', value: '20.8%', fill: 69, color: '#3B82F6', context: 'Industry avg: 15%' }
    ];

    const grid = document.getElementById('ratiosGrid');
    ratios.forEach(r => {
        grid.innerHTML += `
            <div class="ratio-card">
                <div class="ratio-label">${r.label}</div>
                <div class="ratio-value">${r.value}</div>
                <div class="ratio-bar">
                    <div class="ratio-bar-fill" style="width:0%;background:${r.color}" data-fill="${r.fill}"></div>
                </div>
                <div class="ratio-context">${r.context}</div>
            </div>`;
    });

    // Animate bars
    setTimeout(() => {
        document.querySelectorAll('.ratio-bar-fill').forEach(bar => {
            bar.style.width = bar.dataset.fill + '%';
        });
    }, 300);
}
