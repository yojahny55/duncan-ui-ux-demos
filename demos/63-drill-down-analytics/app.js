// Drill-Down Analytics Dashboard
// Hierarchical data exploration with breadcrumb navigation

// Sample hierarchical data structure
const analyticsData = {
    level: 0,
    name: 'All Regions',
    icon: 'globe',
    revenue: 24800000,
    orders: 48392,
    avgOrder: 512,
    customers: 12847,
    growth: 12.4,
    children: [
        {
            id: 'north-america',
            level: 1,
            name: 'North America',
            icon: 'map-pin',
            color: '#3B82F6',
            revenue: 12400000,
            orders: 24196,
            growth: 15.2,
            share: 50,
            children: [
                {
                    id: 'electronics',
                    level: 2,
                    name: 'Electronics',
                    icon: 'monitor',
                    color: '#8B5CF6',
                    revenue: 5200000,
                    orders: 8200,
                    growth: 18.5,
                    share: 42,
                    children: [
                        { id: 'laptops', level: 3, name: 'Laptops', icon: 'laptop', color: '#EC4899', revenue: 2100000, orders: 3200, growth: 22.1, share: 40 },
                        { id: 'phones', level: 3, name: 'Smartphones', icon: 'smartphone', color: '#EC4899', revenue: 1800000, orders: 2800, growth: 15.8, share: 35 },
                        { id: 'tablets', level: 3, name: 'Tablets', icon: 'tablet', color: '#EC4899', revenue: 850000, orders: 1400, growth: 8.2, share: 16 },
                        { id: 'accessories', level: 3, name: 'Accessories', icon: 'headphones', color: '#EC4899', revenue: 450000, orders: 800, growth: 25.4, share: 9 }
                    ]
                },
                {
                    id: 'apparel',
                    level: 2,
                    name: 'Apparel',
                    icon: 'shirt',
                    color: '#8B5CF6',
                    revenue: 3800000,
                    orders: 9500,
                    growth: 12.3,
                    share: 31,
                    children: [
                        { id: 'mens', level: 3, name: "Men's Wear", icon: 'user', color: '#EC4899', revenue: 1600000, orders: 4200, growth: 10.5, share: 42 },
                        { id: 'womens', level: 3, name: "Women's Wear", icon: 'user', color: '#EC4899', revenue: 1400000, orders: 3500, growth: 14.2, share: 37 },
                        { id: 'kids', level: 3, name: 'Kids', icon: 'baby', color: '#EC4899', revenue: 800000, orders: 1800, growth: 18.9, share: 21 }
                    ]
                },
                {
                    id: 'home',
                    level: 2,
                    name: 'Home & Garden',
                    icon: 'home',
                    color: '#8B5CF6',
                    revenue: 2200000,
                    orders: 4500,
                    growth: 8.7,
                    share: 18,
                    children: [
                        { id: 'furniture', level: 3, name: 'Furniture', icon: 'sofa', color: '#EC4899', revenue: 1200000, orders: 1800, growth: 5.2, share: 55 },
                        { id: 'decor', level: 3, name: 'Decor', icon: 'lamp', color: '#EC4899', revenue: 600000, orders: 1500, growth: 12.8, share: 27 },
                        { id: 'garden', level: 3, name: 'Garden', icon: 'flower-2', color: '#EC4899', revenue: 400000, orders: 1200, growth: 15.1, share: 18 }
                    ]
                },
                {
                    id: 'sports',
                    level: 2,
                    name: 'Sports & Outdoors',
                    icon: 'dumbbell',
                    color: '#8B5CF6',
                    revenue: 1200000,
                    orders: 1996,
                    growth: 22.1,
                    share: 9,
                    children: [
                        { id: 'fitness', level: 3, name: 'Fitness', icon: 'heart-pulse', color: '#EC4899', revenue: 600000, orders: 900, growth: 28.5, share: 50 },
                        { id: 'outdoor', level: 3, name: 'Outdoor Gear', icon: 'tent', color: '#EC4899', revenue: 400000, orders: 700, growth: 18.2, share: 33 },
                        { id: 'team-sports', level: 3, name: 'Team Sports', icon: 'trophy', color: '#EC4899', revenue: 200000, orders: 396, growth: 12.8, share: 17 }
                    ]
                }
            ]
        },
        {
            id: 'europe',
            level: 1,
            name: 'Europe',
            icon: 'map-pin',
            color: '#8B5CF6',
            revenue: 7440000,
            orders: 14518,
            growth: 11.8,
            share: 30,
            children: [
                { id: 'eu-electronics', level: 2, name: 'Electronics', icon: 'monitor', color: '#EC4899', revenue: 3200000, orders: 5800, growth: 14.2, share: 43, children: [] },
                { id: 'eu-apparel', level: 2, name: 'Apparel', icon: 'shirt', color: '#EC4899', revenue: 2500000, orders: 5200, growth: 9.8, share: 34, children: [] },
                { id: 'eu-home', level: 2, name: 'Home & Garden', icon: 'home', color: '#EC4899', revenue: 1740000, orders: 3518, growth: 8.5, share: 23, children: [] }
            ]
        },
        {
            id: 'asia-pacific',
            level: 1,
            name: 'Asia Pacific',
            icon: 'map-pin',
            color: '#EC4899',
            revenue: 3720000,
            orders: 7259,
            growth: 8.2,
            share: 15,
            children: [
                { id: 'ap-electronics', level: 2, name: 'Electronics', icon: 'monitor', color: '#F59E0B', revenue: 2000000, orders: 4000, growth: 10.5, share: 54, children: [] },
                { id: 'ap-apparel', level: 2, name: 'Apparel', icon: 'shirt', color: '#F59E0B', revenue: 1200000, orders: 2500, growth: 6.2, share: 32, children: [] },
                { id: 'ap-sports', level: 2, name: 'Sports', icon: 'dumbbell', color: '#F59E0B', revenue: 520000, orders: 759, growth: 5.8, share: 14, children: [] }
            ]
        },
        {
            id: 'latam',
            level: 1,
            name: 'Latin America',
            icon: 'map-pin',
            color: '#F59E0B',
            revenue: 1240000,
            orders: 2419,
            growth: 5.4,
            share: 5,
            children: [
                { id: 'la-electronics', level: 2, name: 'Electronics', icon: 'monitor', color: '#22C55E', revenue: 700000, orders: 1400, growth: 7.2, share: 56, children: [] },
                { id: 'la-apparel', level: 2, name: 'Apparel', icon: 'shirt', color: '#22C55E', revenue: 400000, orders: 800, growth: 3.8, share: 32, children: [] },
                { id: 'la-other', level: 2, name: 'Other', icon: 'package', color: '#22C55E', revenue: 140000, orders: 219, growth: 2.1, share: 12, children: [] }
            ]
        }
    ]
};

// State management
let currentPath = [];
let currentData = analyticsData;
let currentView = 'grid';

// DOM elements
const backBtn = document.getElementById('backBtn');
const breadcrumbTrail = document.getElementById('breadcrumbTrail');
const levelIndicator = document.getElementById('levelIndicator');
const drillGrid = document.getElementById('drillGrid');
const drillTableContainer = document.getElementById('drillTableContainer');
const drillTableBody = document.getElementById('drillTableBody');
const sectionTitle = document.getElementById('sectionTitle');
const contextBar = document.getElementById('contextBar');
const drillTooltip = document.getElementById('drillTooltip');

// Format currency
function formatCurrency(value) {
    if (value >= 1000000) {
        return '$' + (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
        return '$' + (value / 1000).toFixed(0) + 'K';
    }
    return '$' + value.toFixed(0);
}

// Format number
function formatNumber(value) {
    return new Intl.NumberFormat().format(value);
}

// Get level color
function getLevelColor(level) {
    const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B'];
    return colors[level] || colors[0];
}

// Get level titles
function getLevelTitle(level) {
    const titles = ['Regional Performance', 'Category Performance', 'Subcategory Performance', 'Product Performance'];
    return titles[level] || 'Performance';
}

// Navigate to a specific path
function navigateToPath(path) {
    currentPath = path;
    currentData = getDataAtPath(path);
    updateUI();
}

// Get data at specific path
function getDataAtPath(path) {
    let data = analyticsData;
    for (const id of path) {
        const child = data.children?.find(c => c.id === id);
        if (child) {
            data = child;
        } else {
            break;
        }
    }
    return data;
}

// Drill down to item
function drillDown(itemId) {
    const newPath = [...currentPath, itemId];
    navigateToPath(newPath);
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Go back one level
function goBack() {
    if (currentPath.length > 0) {
        currentPath.pop();
        navigateToPath(currentPath);
    }
}

// Navigate to breadcrumb level
function navigateToBreadcrumb(level) {
    const newPath = currentPath.slice(0, level);
    navigateToPath(newPath);
}

// Update the entire UI
function updateUI() {
    updateBreadcrumb();
    updateLevelIndicator();
    updateContextBar();
    updateSummaryCards();
    updateDrillGrid();
    updateDrillTable();
    updateDetailPanel();
    updateBackButton();
    updateSectionTitle();
    
    // Reinitialize Lucide icons
    lucide.createIcons();
}

// Update breadcrumb navigation
function updateBreadcrumb() {
    let html = `
        <span class="breadcrumb-item ${currentPath.length === 0 ? 'active' : ''}" data-level="0" onclick="navigateToBreadcrumb(0)">
            <i data-lucide="globe"></i>
            All Regions
        </span>
    `;
    
    let data = analyticsData;
    currentPath.forEach((id, index) => {
        const child = data.children?.find(c => c.id === id);
        if (child) {
            html += `
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-item ${index === currentPath.length - 1 ? 'active' : ''}" 
                      data-level="${index + 1}" 
                      onclick="navigateToBreadcrumb(${index + 1})">
                    <i data-lucide="${child.icon}"></i>
                    ${child.name}
                </span>
            `;
            data = child;
        }
    });
    
    breadcrumbTrail.innerHTML = html;
}

// Update level indicator dots
function updateLevelIndicator() {
    const dots = levelIndicator.querySelectorAll('.level-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index <= currentPath.length);
    });
}

// Update context bar
function updateContextBar() {
    document.getElementById('currentViewLabel').textContent = currentData.name;
    document.getElementById('contextRevenue').textContent = formatCurrency(currentData.revenue);
    
    const childCount = currentData.children?.length || 0;
    const itemType = currentPath.length === 0 ? 'Regions' : 
                     currentPath.length === 1 ? 'Categories' : 
                     currentPath.length === 2 ? 'Subcategories' : 'Products';
    document.getElementById('contextItems').textContent = `${childCount} ${itemType}`;
}

// Update summary cards
function updateSummaryCards() {
    document.getElementById('totalRevenue').textContent = formatCurrency(currentData.revenue);
    document.getElementById('totalOrders').textContent = formatNumber(currentData.orders);
    document.getElementById('avgOrder').textContent = '$' + Math.round(currentData.revenue / currentData.orders);
    document.getElementById('totalCustomers').textContent = formatNumber(currentData.customers || Math.round(currentData.orders * 0.27));
}

// Update drill grid
function updateDrillGrid() {
    if (!currentData.children || currentData.children.length === 0) {
        drillGrid.innerHTML = `
            <div class="no-data">
                <i data-lucide="folder-open"></i>
                <p>No further drill-down available</p>
            </div>
        `;
        return;
    }
    
    const totalRevenue = currentData.children.reduce((sum, c) => sum + c.revenue, 0);
    
    let html = '';
    currentData.children.forEach((item, index) => {
        const hasChildren = item.children && item.children.length > 0;
        const share = ((item.revenue / totalRevenue) * 100).toFixed(1);
        
        html += `
            <div class="drill-item" 
                 style="--item-color: ${item.color || getLevelColor(item.level)}; animation-delay: ${index * 50}ms"
                 onclick="drillDown('${item.id}')"
                 onmouseenter="showTooltip(event, ${hasChildren})"
                 onmouseleave="hideTooltip()">
                <div class="drill-item-header">
                    <div class="drill-item-icon">
                        <i data-lucide="${item.icon}"></i>
                    </div>
                    ${hasChildren ? `
                        <div class="drill-indicator">
                            <span>${item.children.length}</span>
                            <i data-lucide="chevron-right"></i>
                        </div>
                    ` : ''}
                </div>
                <div class="drill-item-name">${item.name}</div>
                <div class="drill-item-subtitle">${share}% of total</div>
                <div class="drill-item-metrics">
                    <div class="drill-metric">
                        <span class="drill-metric-label">Revenue</span>
                        <span class="drill-metric-value">${formatCurrency(item.revenue)}</span>
                    </div>
                    <div class="drill-metric">
                        <span class="drill-metric-label">Growth</span>
                        <span class="drill-metric-value drill-metric-change ${item.growth >= 0 ? 'positive' : 'negative'}">
                            ${item.growth >= 0 ? '+' : ''}${item.growth}%
                        </span>
                    </div>
                </div>
                <div class="drill-progress">
                    <div class="drill-progress-bar" style="width: ${share}%"></div>
                </div>
            </div>
        `;
    });
    
    drillGrid.innerHTML = html;
}

// Update drill table
function updateDrillTable() {
    if (!currentData.children || currentData.children.length === 0) {
        drillTableBody.innerHTML = '<tr><td colspan="5">No data available</td></tr>';
        return;
    }
    
    let html = '';
    currentData.children.forEach(item => {
        const hasChildren = item.children && item.children.length > 0;
        
        html += `
            <tr onclick="drillDown('${item.id}')">
                <td>
                    <div class="drill-table-name">
                        <div class="drill-table-icon" style="background: ${item.color || getLevelColor(item.level)}">
                            <i data-lucide="${item.icon}"></i>
                        </div>
                        <span>${item.name}</span>
                    </div>
                </td>
                <td>${formatCurrency(item.revenue)}</td>
                <td>${formatNumber(item.orders)}</td>
                <td class="${item.growth >= 0 ? 'positive' : 'negative'}">
                    ${item.growth >= 0 ? '+' : ''}${item.growth}%
                </td>
                <td>
                    ${hasChildren ? `
                        <button class="drill-table-action" onclick="event.stopPropagation(); drillDown('${item.id}')">
                            Drill
                            <i data-lucide="chevron-right"></i>
                        </button>
                    ` : '-'}
                </td>
            </tr>
        `;
    });
    
    drillTableBody.innerHTML = html;
}

// Update detail panel
function updateDetailPanel() {
    updateDistributionChart();
    updateTopItemsList();
}

// Update distribution chart
function updateDistributionChart() {
    const distributionChart = document.getElementById('distributionChart');
    
    if (!currentData.children || currentData.children.length === 0) {
        distributionChart.innerHTML = '<p>No distribution data available</p>';
        return;
    }
    
    const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#22C55E', '#6366F1'];
    const totalRevenue = currentData.children.reduce((sum, c) => sum + c.revenue, 0);
    
    let html = '';
    currentData.children.slice(0, 6).forEach((item, index) => {
        const percentage = ((item.revenue / totalRevenue) * 100).toFixed(1);
        html += `
            <div class="distribution-item">
                <span class="distribution-label">${item.name}</span>
                <div class="distribution-bar-bg">
                    <div class="distribution-bar" style="width: ${percentage}%; background: ${colors[index % colors.length]}"></div>
                </div>
                <span class="distribution-value">${percentage}%</span>
            </div>
        `;
    });
    
    distributionChart.innerHTML = html;
}

// Update top items list
function updateTopItemsList() {
    const topItemsList = document.getElementById('topItemsList');
    
    if (!currentData.children || currentData.children.length === 0) {
        topItemsList.innerHTML = '<p>No top performers available</p>';
        return;
    }
    
    const sorted = [...currentData.children].sort((a, b) => b.revenue - a.revenue).slice(0, 5);
    const rankClasses = ['gold', 'silver', 'bronze', '', ''];
    
    let html = '';
    sorted.forEach((item, index) => {
        html += `
            <div class="top-item" onclick="drillDown('${item.id}')">
                <div class="top-item-rank ${rankClasses[index]}">${index + 1}</div>
                <div class="top-item-info">
                    <div class="top-item-name">${item.name}</div>
                    <div class="top-item-subtitle">${formatNumber(item.orders)} orders</div>
                </div>
                <div class="top-item-value">${formatCurrency(item.revenue)}</div>
            </div>
        `;
    });
    
    topItemsList.innerHTML = html;
}

// Update back button state
function updateBackButton() {
    backBtn.disabled = currentPath.length === 0;
}

// Update section title
function updateSectionTitle() {
    sectionTitle.textContent = getLevelTitle(currentPath.length);
}

// Show tooltip
function showTooltip(event, hasChildren) {
    if (!hasChildren) return;
    
    drillTooltip.style.display = 'flex';
    drillTooltip.style.left = event.pageX + 15 + 'px';
    drillTooltip.style.top = event.pageY - 10 + 'px';
}

// Hide tooltip
function hideTooltip() {
    drillTooltip.style.display = 'none';
}

// Toggle view (grid/table)
function toggleView(view) {
    currentView = view;
    
    const gridBtn = document.querySelector('[data-view="grid"]');
    const tableBtn = document.querySelector('[data-view="table"]');
    
    if (view === 'grid') {
        gridBtn.classList.add('active');
        tableBtn.classList.remove('active');
        drillGrid.classList.remove('hidden');
        drillTableContainer.classList.add('hidden');
    } else {
        gridBtn.classList.remove('active');
        tableBtn.classList.add('active');
        drillGrid.classList.add('hidden');
        drillTableContainer.classList.remove('hidden');
    }
    
    lucide.createIcons();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initial render
    updateUI();
    
    // Back button
    backBtn.addEventListener('click', goBack);
    
    // View toggle
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => toggleView(btn.dataset.view));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && currentPath.length > 0) {
            e.preventDefault();
            goBack();
        }
    });
    
    // Track tooltip position
    document.addEventListener('mousemove', (e) => {
        if (drillTooltip.style.display === 'flex') {
            drillTooltip.style.left = e.pageX + 15 + 'px';
            drillTooltip.style.top = e.pageY - 10 + 'px';
        }
    });
});

// Make functions available globally
window.drillDown = drillDown;
window.navigateToBreadcrumb = navigateToBreadcrumb;
window.showTooltip = showTooltip;
window.hideTooltip = hideTooltip;
