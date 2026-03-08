// Data-Dense Dashboard - BI Analytics
// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initCharts();
    populateProductsTable();
    populateActivityList();
    initInteractions();
});

// Chart.js default configuration
Chart.defaults.font.family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
Chart.defaults.font.size = 11;
Chart.defaults.color = '#64748B';

// Initialize Charts
function initCharts() {
    initRevenueChart();
    initCategoryChart();
    initRegionChart();
}

// Revenue Trend Line Chart
function initRevenueChart() {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    
    const labels = ['Mar 1', 'Mar 3', 'Mar 5', 'Mar 7', 'Mar 9', 'Mar 11', 'Mar 13', 'Mar 15', 
                    'Mar 17', 'Mar 19', 'Mar 21', 'Mar 23', 'Mar 25', 'Mar 27', 'Mar 29', 'Mar 31'];
    
    const revenueData = [82400, 95200, 89100, 102500, 98300, 110200, 105800, 118400, 
                         112900, 125600, 119300, 132100, 128500, 142800, 138200, 154600];
    
    const ordersData = [540, 620, 585, 670, 645, 720, 690, 775, 
                        740, 820, 780, 865, 840, 935, 905, 1012];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Revenue',
                    data: revenueData,
                    borderColor: '#3B82F6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    yAxisID: 'y'
                },
                {
                    label: 'Orders',
                    data: ordersData,
                    borderColor: '#22C55E',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderDash: [4, 4],
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        boxWidth: 8,
                        boxHeight: 8,
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: '#1E293B',
                    titleColor: '#F8FAFC',
                    bodyColor: '#94A3B8',
                    padding: 10,
                    cornerRadius: 6,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            if (context.datasetIndex === 0) {
                                return `Revenue: $${context.raw.toLocaleString()}`;
                            }
                            return `Orders: ${context.raw.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxRotation: 0
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: {
                        color: '#E2E8F0'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + (value / 1000) + 'K';
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        callback: function(value) {
                            return value;
                        }
                    }
                }
            }
        }
    });
}

// Category Doughnut Chart
function initCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'],
            datasets: [{
                data: [35, 25, 20, 12, 8],
                backgroundColor: [
                    '#3B82F6',
                    '#22C55E',
                    '#F59E0B',
                    '#8B5CF6',
                    '#EC4899'
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 8,
                        boxHeight: 8,
                        usePointStyle: true,
                        padding: 10,
                        font: {
                            size: 10
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#1E293B',
                    titleColor: '#F8FAFC',
                    bodyColor: '#94A3B8',
                    padding: 10,
                    cornerRadius: 6,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });
}

// Region Horizontal Bar Chart
function initRegionChart() {
    const ctx = document.getElementById('regionChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East'],
            datasets: [{
                data: [42, 28, 18, 8, 4],
                backgroundColor: [
                    '#3B82F6',
                    '#22C55E',
                    '#F59E0B',
                    '#8B5CF6',
                    '#06B6D4'
                ],
                borderWidth: 0,
                borderRadius: 4,
                barThickness: 16
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1E293B',
                    titleColor: '#F8FAFC',
                    bodyColor: '#94A3B8',
                    padding: 10,
                    cornerRadius: 6,
                    callbacks: {
                        label: function(context) {
                            return `${context.raw}% of sales`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: '#E2E8F0'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    max: 50
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Sample Products Data
const productsData = [
    { product: 'MacBook Pro 16"', sku: 'MBP-16-M2', sales: 847, revenue: 2118153, stock: 124, status: 'in-stock' },
    { product: 'iPhone 15 Pro Max', sku: 'IP-15PM-256', sales: 1248, revenue: 1497600, stock: 89, status: 'in-stock' },
    { product: 'Sony WH-1000XM5', sku: 'SNY-WH1000', sales: 2156, revenue: 754600, stock: 312, status: 'in-stock' },
    { product: 'Apple Watch Ultra 2', sku: 'AW-ULT2-49', sales: 632, revenue: 505600, stock: 45, status: 'low-stock' },
    { product: 'Samsung 65" OLED TV', sku: 'SAM-65OLED', sales: 189, revenue: 472500, stock: 23, status: 'low-stock' },
    { product: 'iPad Pro 12.9"', sku: 'IPAD-PRO12', sales: 421, revenue: 462100, stock: 156, status: 'in-stock' },
    { product: 'Dyson V15 Detect', sku: 'DYS-V15DET', sales: 534, revenue: 400500, stock: 0, status: 'out-of-stock' },
    { product: 'PS5 Digital Edition', sku: 'PS5-DIG-BL', sales: 892, revenue: 356800, stock: 67, status: 'in-stock' },
    { product: 'LG UltraGear Monitor', sku: 'LG-27GP950', sales: 445, revenue: 333750, stock: 89, status: 'in-stock' },
    { product: 'AirPods Pro 2', sku: 'AP-PRO2-W', sales: 1356, revenue: 338150, stock: 234, status: 'in-stock' }
];

// Populate Products Table
function populateProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    
    tbody.innerHTML = productsData.map(item => `
        <tr>
            <td><strong>${item.product}</strong></td>
            <td>${item.sku}</td>
            <td>${item.sales.toLocaleString()}</td>
            <td>$${item.revenue.toLocaleString()}</td>
            <td>${item.stock}</td>
            <td><span class="status-badge ${item.status}">${formatStatus(item.status)}</span></td>
        </tr>
    `).join('');
    
    // Re-initialize icons for dynamic content
    lucide.createIcons();
}

function formatStatus(status) {
    switch(status) {
        case 'in-stock': return 'In Stock';
        case 'low-stock': return 'Low Stock';
        case 'out-of-stock': return 'Out of Stock';
        default: return status;
    }
}

// Activity Data
const activityData = [
    { type: 'order', text: 'New order <strong>#ORD-8472</strong> received', time: '2 min ago' },
    { type: 'payment', text: 'Payment confirmed for <strong>#ORD-8469</strong>', time: '8 min ago' },
    { type: 'user', text: 'New customer <strong>Sarah M.</strong> registered', time: '15 min ago' },
    { type: 'alert', text: 'Low stock alert: <strong>Apple Watch Ultra 2</strong>', time: '23 min ago' },
    { type: 'order', text: 'Order <strong>#ORD-8465</strong> shipped', time: '31 min ago' },
    { type: 'return', text: 'Return requested for <strong>#ORD-8401</strong>', time: '45 min ago' },
    { type: 'payment', text: 'Refund processed for <strong>#ORD-8398</strong>', time: '52 min ago' },
    { type: 'user', text: 'Customer <strong>John D.</strong> upgraded to Premium', time: '1 hr ago' },
    { type: 'order', text: 'New order <strong>#ORD-8461</strong> received', time: '1 hr ago' },
    { type: 'alert', text: 'Out of stock: <strong>Dyson V15 Detect</strong>', time: '2 hr ago' }
];

// Populate Activity List
function populateActivityList() {
    const list = document.getElementById('activityList');
    
    list.innerHTML = activityData.map(item => {
        const iconMap = {
            order: 'shopping-bag',
            payment: 'credit-card',
            user: 'user-plus',
            alert: 'alert-triangle',
            return: 'rotate-ccw'
        };
        
        return `
            <div class="activity-item">
                <div class="activity-icon ${item.type}">
                    <i data-lucide="${iconMap[item.type]}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-text">${item.text}</div>
                    <div class="activity-time">${item.time}</div>
                </div>
            </div>
        `;
    }).join('');
    
    lucide.createIcons();
}

// Initialize Interactions
function initInteractions() {
    // Table row hover
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', () => {
            tableRows.forEach(r => r.classList.remove('selected'));
            row.classList.add('selected');
        });
    });
    
    // Filter apply button
    const applyBtn = document.querySelector('.apply-filters');
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            applyBtn.innerHTML = '<i data-lucide="loader-2" class="spinning"></i> Loading...';
            lucide.createIcons();
            
            setTimeout(() => {
                applyBtn.innerHTML = '<i data-lucide="check"></i> Applied!';
                lucide.createIcons();
                
                setTimeout(() => {
                    applyBtn.innerHTML = '<i data-lucide="check"></i> Apply Filters';
                    lucide.createIcons();
                }, 1500);
            }, 800);
        });
    }
    
    // Chart toggle buttons
    const chartBtns = document.querySelectorAll('.card-actions .btn-sm');
    chartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const siblings = btn.parentElement.querySelectorAll('.btn-sm');
            siblings.forEach(s => s.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Table sorting
    const sortableHeaders = document.querySelectorAll('.data-table th.sortable');
    sortableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const sortKey = header.dataset.sort;
            sortTable(sortKey, header);
        });
    });
    
    // Pagination
    const pageButtons = document.querySelectorAll('.page-btn:not(:disabled)');
    pageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!btn.querySelector('i')) {
                document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        });
    });
    
    // Refresh button
    const refreshBtn = document.querySelector('.btn-icon[title="Refresh"]');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            const icon = refreshBtn.querySelector('i');
            icon.style.animation = 'spin 1s linear';
            setTimeout(() => {
                icon.style.animation = '';
                updateLastUpdated();
            }, 1000);
        });
    }
    
    // Quick actions
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const originalContent = btn.innerHTML;
            btn.innerHTML = '<i data-lucide="loader-2"></i> Processing...';
            btn.disabled = true;
            lucide.createIcons();
            
            setTimeout(() => {
                btn.innerHTML = '<i data-lucide="check"></i> Done!';
                lucide.createIcons();
                
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                    lucide.createIcons();
                }, 1500);
            }, 1000);
        });
    });
}

// Sort table by column
function sortTable(key, header) {
    const ascending = !header.classList.contains('asc');
    
    // Update header states
    document.querySelectorAll('.data-table th.sortable').forEach(h => {
        h.classList.remove('asc', 'desc');
    });
    header.classList.add(ascending ? 'asc' : 'desc');
    
    // Sort data
    productsData.sort((a, b) => {
        let valA = a[key];
        let valB = b[key];
        
        if (typeof valA === 'string') {
            return ascending ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return ascending ? valA - valB : valB - valA;
    });
    
    populateProductsTable();
}

// Update last updated time
function updateLastUpdated() {
    const el = document.querySelector('.last-updated');
    if (el) {
        el.innerHTML = '<i data-lucide="clock"></i> Updated just now';
        lucide.createIcons();
    }
}

// Add CSS for spinning animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .spinning {
        animation: spin 1s linear infinite;
    }
    .data-table tbody tr.selected {
        background: rgba(59, 130, 246, 0.08) !important;
    }
    .data-table th.sortable.asc i,
    .data-table th.sortable.desc i {
        opacity: 1;
        color: #3B82F6;
    }
`;
document.head.appendChild(style);
