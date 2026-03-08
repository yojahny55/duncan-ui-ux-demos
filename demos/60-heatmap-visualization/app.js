/**
 * Heatmap Visualization - BI/Analytics Dashboard
 * Color-coded grid, intensity legend, tooltips, geographic/correlation heatmaps
 */

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Initialize all heatmaps
    initCorrelationMatrix();
    initActivityHeatmap();
    initGeoHeatmap();
    initCohortTable();
    initColorSchemeToggle();
    initTooltip();
});

// ========================================
// Data Sets
// ========================================

const financialMetrics = [
    'Revenue', 'Expenses', 'Profit', 'ROI', 'COGS', 'Margin', 'Cash Flow', 'Assets'
];

const marketingMetrics = [
    'CTR', 'CAC', 'LTV', 'ROAS', 'Conv Rate', 'Bounce', 'Sessions', 'Leads'
];

const operationsMetrics = [
    'Uptime', 'Latency', 'Throughput', 'Errors', 'Queue', 'CPU', 'Memory', 'Disk'
];

// Generate correlation data
function generateCorrelationData(labels) {
    const size = labels.length;
    const data = [];
    
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            if (i === j) {
                row.push(1.0);
            } else if (j < i) {
                row.push(data[j][i]); // Mirror
            } else {
                // Generate realistic correlation
                const base = Math.random() * 2 - 1;
                row.push(Math.round(base * 100) / 100);
            }
        }
        data.push(row);
    }
    return data;
}

// Color schemes
const colorSchemes = {
    divergent: {
        getColor: (value) => {
            // -1 to 1 scale
            if (value >= 0) {
                const intensity = value;
                return `rgba(255, ${Math.round(255 - intensity * 200)}, ${Math.round(255 - intensity * 255)}, ${0.3 + intensity * 0.7})`;
            } else {
                const intensity = Math.abs(value);
                return `rgba(${Math.round(255 - intensity * 255)}, ${Math.round(255 - intensity * 127)}, 255, ${0.3 + intensity * 0.7})`;
            }
        },
        getTextColor: (value) => Math.abs(value) > 0.5 ? '#FFFFFF' : '#1A1D26'
    },
    sequential: {
        getColor: (value) => {
            const normalized = (value + 1) / 2; // 0 to 1
            const r = Math.round(26 + normalized * (74 - 26));
            const g = Math.round(54 + normalized * (144 - 54));
            const b = Math.round(93 + normalized * (217 - 93));
            return `rgba(${r}, ${g}, ${b}, ${0.3 + normalized * 0.7})`;
        },
        getTextColor: (value) => value > 0 ? '#FFFFFF' : '#1A1D26'
    },
    accessible: {
        getColor: (value) => {
            const normalized = (value + 1) / 2; // 0 to 1
            const gray = Math.round(247 - normalized * 210);
            return `rgb(${gray}, ${gray}, ${gray})`;
        },
        getTextColor: (value) => value > 0.3 ? '#FFFFFF' : '#252525'
    }
};

let currentScheme = 'divergent';

// ========================================
// Correlation Matrix
// ========================================

function initCorrelationMatrix() {
    const select = document.getElementById('matrixDataset');
    renderCorrelationMatrix('financial');
    
    select.addEventListener('change', (e) => {
        renderCorrelationMatrix(e.target.value);
    });
}

function renderCorrelationMatrix(dataset) {
    const labels = {
        financial: financialMetrics,
        marketing: marketingMetrics,
        operations: operationsMetrics
    }[dataset];
    
    const data = generateCorrelationData(labels);
    const grid = document.getElementById('correlationMatrix');
    const yLabels = document.getElementById('yAxisLabels');
    const xLabels = document.getElementById('xAxisLabels');
    
    // Clear existing
    grid.innerHTML = '';
    yLabels.innerHTML = '';
    xLabels.innerHTML = '';
    
    // Set grid columns
    grid.style.gridTemplateColumns = `repeat(${labels.length}, var(--cell-size))`;
    
    // Y-axis labels
    labels.forEach(label => {
        const labelEl = document.createElement('div');
        labelEl.className = 'axis-label';
        labelEl.textContent = label;
        yLabels.appendChild(labelEl);
    });
    
    // X-axis labels
    labels.forEach(label => {
        const labelEl = document.createElement('div');
        labelEl.className = 'axis-label';
        labelEl.textContent = label;
        xLabels.appendChild(labelEl);
    });
    
    // Grid cells
    const scheme = colorSchemes[currentScheme];
    
    data.forEach((row, i) => {
        row.forEach((value, j) => {
            const cell = document.createElement('div');
            cell.className = 'heatmap-cell' + (i === j ? ' diagonal' : '');
            cell.style.background = scheme.getColor(value);
            cell.style.color = scheme.getTextColor(value);
            cell.textContent = value.toFixed(2);
            
            cell.dataset.row = labels[i];
            cell.dataset.col = labels[j];
            cell.dataset.value = value.toFixed(3);
            
            grid.appendChild(cell);
        });
    });
}

// ========================================
// Activity Heatmap (Time-based)
// ========================================

function initActivityHeatmap() {
    const grid = document.getElementById('activityGrid');
    
    // 7 days x 24 hours
    for (let day = 0; day < 7; day++) {
        for (let hour = 0; hour < 24; hour++) {
            const cell = document.createElement('div');
            cell.className = 'activity-cell';
            
            // Generate realistic activity pattern
            let intensity = generateActivityIntensity(day, hour);
            cell.style.background = getActivityColor(intensity);
            
            const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            cell.dataset.day = dayNames[day];
            cell.dataset.hour = `${hour}:00`;
            cell.dataset.value = Math.round(intensity * 100);
            
            grid.appendChild(cell);
        }
    }
}

function generateActivityIntensity(day, hour) {
    // Simulate realistic activity patterns
    let base = 0;
    
    // Weekdays (0-4) vs weekends (5-6)
    const isWeekend = day >= 5;
    
    // Peak hours (9-12, 14-17)
    if (!isWeekend) {
        if (hour >= 9 && hour <= 12) base = 0.7 + Math.random() * 0.3;
        else if (hour >= 14 && hour <= 17) base = 0.6 + Math.random() * 0.3;
        else if (hour >= 7 && hour <= 9) base = 0.4 + Math.random() * 0.2;
        else if (hour >= 17 && hour <= 19) base = 0.3 + Math.random() * 0.2;
        else if (hour >= 0 && hour <= 6) base = 0.05 + Math.random() * 0.1;
        else base = 0.2 + Math.random() * 0.2;
    } else {
        // Weekends are quieter
        if (hour >= 10 && hour <= 15) base = 0.3 + Math.random() * 0.2;
        else if (hour >= 0 && hour <= 8) base = 0.02 + Math.random() * 0.05;
        else base = 0.1 + Math.random() * 0.15;
    }
    
    return Math.min(1, Math.max(0, base));
}

function getActivityColor(intensity) {
    const alpha = 0.1 + intensity * 0.9;
    return `rgba(34, 197, 94, ${alpha})`;
}

// ========================================
// Geographic Heatmap
// ========================================

function initGeoHeatmap() {
    const regions = document.querySelectorAll('.region');
    
    regions.forEach(region => {
        const value = parseInt(region.dataset.value);
        region.style.background = getGeoColor(value);
    });
}

function getGeoColor(value) {
    // 0-100 scale
    const normalized = value / 100;
    
    if (currentScheme === 'divergent') {
        // Blue to Red gradient
        const r = Math.round(normalized * 220 + 35);
        const g = Math.round((1 - normalized * 0.7) * 130);
        const b = Math.round((1 - normalized) * 200 + 55);
        return `rgb(${r}, ${g}, ${b})`;
    } else if (currentScheme === 'sequential') {
        const r = Math.round(26 + normalized * 48);
        const g = Math.round(54 + normalized * 90);
        const b = Math.round(93 + normalized * 124);
        return `rgb(${r}, ${g}, ${b})`;
    } else {
        const gray = Math.round(200 - normalized * 160);
        return `rgb(${gray}, ${gray}, ${gray})`;
    }
}

// ========================================
// Cohort Retention Table
// ========================================

function initCohortTable() {
    const tbody = document.getElementById('cohortBody');
    
    const cohorts = [
        { name: 'Jan 2026', users: 2847 },
        { name: 'Feb 2026', users: 3156 },
        { name: 'Mar 2026', users: 2934 },
        { name: 'Apr 2026', users: 3421 },
        { name: 'May 2026', users: 2789 },
        { name: 'Jun 2026', users: 3067 }
    ];
    
    cohorts.forEach((cohort, index) => {
        const row = document.createElement('tr');
        
        // Cohort name
        const nameCell = document.createElement('td');
        nameCell.textContent = cohort.name;
        row.appendChild(nameCell);
        
        // User count
        const usersCell = document.createElement('td');
        usersCell.textContent = cohort.users.toLocaleString();
        row.appendChild(usersCell);
        
        // Retention weeks (8 weeks)
        for (let week = 0; week < 8; week++) {
            const cell = document.createElement('td');
            
            // Skip future weeks
            if (week > (5 - index)) {
                cell.innerHTML = '<span class="cohort-cell" style="background: transparent; color: var(--text-muted);">—</span>';
            } else {
                // Generate retention percentage (typically drops over time)
                const retention = generateRetention(week);
                const cellSpan = document.createElement('span');
                cellSpan.className = 'cohort-cell';
                cellSpan.textContent = `${retention}%`;
                cellSpan.style.background = getCohortColor(retention);
                cellSpan.style.color = retention > 50 ? '#FFFFFF' : '#1A1D26';
                
                cellSpan.dataset.cohort = cohort.name;
                cellSpan.dataset.week = `Week ${week + 1}`;
                cellSpan.dataset.value = retention;
                
                cell.appendChild(cellSpan);
            }
            
            row.appendChild(cell);
        }
        
        tbody.appendChild(row);
    });
}

function generateRetention(week) {
    // Realistic retention curve
    const baseRetention = [100, 65, 48, 38, 31, 26, 23, 20];
    const variation = Math.floor(Math.random() * 10) - 5;
    return Math.max(5, Math.min(100, baseRetention[week] + variation));
}

function getCohortColor(retention) {
    // Green for high retention, red for low
    if (retention >= 80) return 'rgba(34, 197, 94, 0.9)';
    if (retention >= 60) return 'rgba(34, 197, 94, 0.7)';
    if (retention >= 40) return 'rgba(245, 158, 11, 0.8)';
    if (retention >= 25) return 'rgba(239, 68, 68, 0.6)';
    return 'rgba(239, 68, 68, 0.8)';
}

// ========================================
// Color Scheme Toggle
// ========================================

function initColorSchemeToggle() {
    const buttons = document.querySelectorAll('.scheme-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentScheme = btn.dataset.scheme;
            document.body.className = `scheme-${currentScheme}`;
            
            // Re-render heatmaps with new scheme
            const select = document.getElementById('matrixDataset');
            renderCorrelationMatrix(select.value);
            initGeoHeatmap();
        });
    });
}

// ========================================
// Tooltip System
// ========================================

function initTooltip() {
    const tooltip = document.getElementById('tooltip');
    
    // Correlation matrix tooltips
    document.getElementById('correlationMatrix').addEventListener('mousemove', (e) => {
        if (e.target.classList.contains('heatmap-cell')) {
            const { row, col, value } = e.target.dataset;
            showTooltip(e, {
                title: `${row} × ${col}`,
                value: value,
                description: getCorrelationDescription(parseFloat(value))
            });
        }
    });
    
    document.getElementById('correlationMatrix').addEventListener('mouseleave', () => {
        hideTooltip();
    });
    
    // Activity grid tooltips
    document.getElementById('activityGrid').addEventListener('mousemove', (e) => {
        if (e.target.classList.contains('activity-cell')) {
            const { day, hour, value } = e.target.dataset;
            showTooltip(e, {
                title: `${day} at ${hour}`,
                value: `${value}%`,
                description: 'Activity level'
            });
        }
    });
    
    document.getElementById('activityGrid').addEventListener('mouseleave', () => {
        hideTooltip();
    });
    
    // Geo heatmap tooltips
    document.getElementById('geoHeatmap').addEventListener('mousemove', (e) => {
        const region = e.target.closest('.region');
        if (region) {
            const { region: name, value } = region.dataset;
            showTooltip(e, {
                title: `${name.charAt(0).toUpperCase() + name.slice(1)} Region`,
                value: `${value}%`,
                description: 'Performance score'
            });
        }
    });
    
    document.getElementById('geoHeatmap').addEventListener('mouseleave', () => {
        hideTooltip();
    });
    
    // Cohort table tooltips
    document.getElementById('cohortTable').addEventListener('mousemove', (e) => {
        if (e.target.classList.contains('cohort-cell') && e.target.dataset.cohort) {
            const { cohort, week, value } = e.target.dataset;
            showTooltip(e, {
                title: `${cohort} - ${week}`,
                value: `${value}%`,
                description: 'Users retained'
            });
        }
    });
    
    document.getElementById('cohortTable').addEventListener('mouseleave', () => {
        hideTooltip();
    });
}

function showTooltip(e, { title, value, description }) {
    const tooltip = document.getElementById('tooltip');
    
    tooltip.querySelector('.tooltip-title').textContent = title;
    tooltip.querySelector('.tooltip-value').textContent = value;
    tooltip.querySelector('.tooltip-description').textContent = description;
    
    // Position tooltip
    const x = e.clientX + 15;
    const y = e.clientY + 15;
    
    // Keep tooltip in viewport
    const rect = tooltip.getBoundingClientRect();
    const maxX = window.innerWidth - 180;
    const maxY = window.innerHeight - 100;
    
    tooltip.style.left = `${Math.min(x, maxX)}px`;
    tooltip.style.top = `${Math.min(y, maxY)}px`;
    tooltip.classList.add('visible');
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('visible');
}

function getCorrelationDescription(value) {
    const abs = Math.abs(value);
    const direction = value >= 0 ? 'positive' : 'negative';
    
    if (abs >= 0.9) return `Very strong ${direction} correlation`;
    if (abs >= 0.7) return `Strong ${direction} correlation`;
    if (abs >= 0.5) return `Moderate ${direction} correlation`;
    if (abs >= 0.3) return `Weak ${direction} correlation`;
    return 'Little to no correlation';
}

// ========================================
// Window resize handler
// ========================================

window.addEventListener('resize', () => {
    hideTooltip();
});
