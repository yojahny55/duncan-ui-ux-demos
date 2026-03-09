// Real-Time Monitoring Dashboard
// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initializeDashboard();
});

// Dashboard State
const state = {
    connected: true,
    charts: {},
    dataHistory: {
        cpu: [],
        memory: [],
        networkIn: [],
        networkOut: [],
        latency: [],
        errorRate: []
    },
    maxDataPoints: 30,
    updateInterval: 2000,
    alerts: []
};

// Initialize Dashboard
function initializeDashboard() {
    initializeCharts();
    initializeServices();
    initializeAlerts();
    initializeEvents();
    startRealTimeUpdates();
    setupEventListeners();
    updateLastUpdate();
}

// Chart Configuration
const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 300
    },
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(26, 26, 36, 0.95)',
            titleColor: '#fff',
            bodyColor: '#a1a1aa',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            padding: 10,
            cornerRadius: 8
        }
    },
    scales: {
        x: {
            display: false
        },
        y: {
            display: false,
            beginAtZero: true
        }
    },
    elements: {
        point: {
            radius: 0,
            hitRadius: 10
        },
        line: {
            tension: 0.4,
            borderWidth: 2
        }
    }
};

// Initialize Charts
function initializeCharts() {
    // Generate initial data
    for (let i = 0; i < state.maxDataPoints; i++) {
        state.dataHistory.cpu.push(randomInRange(50, 80));
        state.dataHistory.memory.push(randomInRange(70, 90));
        state.dataHistory.networkIn.push(randomInRange(600, 1000));
        state.dataHistory.networkOut.push(randomInRange(200, 400));
        state.dataHistory.latency.push(randomInRange(30, 80));
        state.dataHistory.errorRate.push(randomInRange(0.05, 0.2));
    }

    // CPU Chart
    state.charts.cpu = new Chart(document.getElementById('cpuChart'), {
        type: 'line',
        data: {
            labels: Array(state.maxDataPoints).fill(''),
            datasets: [{
                data: [...state.dataHistory.cpu],
                borderColor: '#06b6d4',
                backgroundColor: createGradient('cpuChart', '#06b6d4'),
                fill: true
            }]
        },
        options: {
            ...chartDefaults,
            scales: {
                ...chartDefaults.scales,
                y: { ...chartDefaults.scales.y, max: 100 }
            }
        }
    });

    // Memory Chart
    state.charts.memory = new Chart(document.getElementById('memChart'), {
        type: 'line',
        data: {
            labels: Array(state.maxDataPoints).fill(''),
            datasets: [{
                data: [...state.dataHistory.memory],
                borderColor: '#f59e0b',
                backgroundColor: createGradient('memChart', '#f59e0b'),
                fill: true
            }]
        },
        options: {
            ...chartDefaults,
            scales: {
                ...chartDefaults.scales,
                y: { ...chartDefaults.scales.y, max: 100 }
            }
        }
    });

    // Network Chart
    state.charts.network = new Chart(document.getElementById('networkChart'), {
        type: 'line',
        data: {
            labels: Array(state.maxDataPoints).fill(''),
            datasets: [
                {
                    label: 'Inbound',
                    data: [...state.dataHistory.networkIn],
                    borderColor: '#22c55e',
                    backgroundColor: 'transparent',
                    fill: false
                },
                {
                    label: 'Outbound',
                    data: [...state.dataHistory.networkOut],
                    borderColor: '#3b82f6',
                    backgroundColor: 'transparent',
                    fill: false
                }
            ]
        },
        options: chartDefaults
    });

    // Latency Chart
    state.charts.latency = new Chart(document.getElementById('latencyChart'), {
        type: 'line',
        data: {
            labels: Array(state.maxDataPoints).fill(''),
            datasets: [{
                data: [...state.dataHistory.latency],
                borderColor: '#8b5cf6',
                backgroundColor: createGradient('latencyChart', '#8b5cf6'),
                fill: true
            }]
        },
        options: chartDefaults
    });

    // Error Rate Chart
    state.charts.errorRate = new Chart(document.getElementById('errorChart'), {
        type: 'line',
        data: {
            labels: Array(state.maxDataPoints).fill(''),
            datasets: [{
                data: [...state.dataHistory.errorRate],
                borderColor: '#ef4444',
                backgroundColor: createGradient('errorChart', '#ef4444'),
                fill: true
            }]
        },
        options: chartDefaults
    });
}

// Create Gradient for Charts
function createGradient(canvasId, color) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, color + '40');
    gradient.addColorStop(1, color + '05');
    return gradient;
}

// Initialize Services
function initializeServices() {
    const services = [
        { name: 'API Gateway', status: 'healthy', uptime: '99.99%', metric: '2.4k req/s' },
        { name: 'Auth Service', status: 'healthy', uptime: '99.97%', metric: '847 req/s' },
        { name: 'Database Primary', status: 'warning', uptime: '99.85%', metric: '156 qps' },
        { name: 'Database Replica', status: 'healthy', uptime: '99.92%', metric: '89 qps' },
        { name: 'Cache Layer', status: 'healthy', uptime: '99.99%', metric: '12k hits/s' },
        { name: 'Message Queue', status: 'healthy', uptime: '99.95%', metric: '4.2k msg/s' },
        { name: 'Storage Service', status: 'critical', uptime: '98.12%', metric: '342 ops/s' },
        { name: 'CDN Edge', status: 'healthy', uptime: '99.99%', metric: '8.7 GB/s' },
        { name: 'Search Engine', status: 'healthy', uptime: '99.91%', metric: '567 req/s' },
        { name: 'Analytics Engine', status: 'warning', uptime: '99.45%', metric: '1.2k evt/s' },
        { name: 'Notification Service', status: 'healthy', uptime: '99.88%', metric: '234 msg/s' },
        { name: 'Payment Gateway', status: 'offline', uptime: '0%', metric: '--' }
    ];

    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = services.map(service => `
        <div class="service-item ${service.status === 'critical' || service.status === 'warning' ? service.status : ''}">
            <span class="service-status ${service.status}"></span>
            <div class="service-info">
                <div class="service-name">${service.name}</div>
                <div class="service-uptime">Uptime: ${service.uptime}</div>
            </div>
            <div class="service-metric">${service.metric}</div>
        </div>
    `).join('');
}

// Initialize Alerts
function initializeAlerts() {
    state.alerts = [
        { type: 'critical', message: 'Storage Service disk usage at 95%', time: '2 minutes ago' },
        { type: 'critical', message: 'Payment Gateway connection failed', time: '5 minutes ago' },
        { type: 'warning', message: 'Database Primary replication lag detected', time: '8 minutes ago' }
    ];

    renderAlerts();
}

function renderAlerts() {
    const list = document.getElementById('alertsList');
    list.innerHTML = state.alerts.map(alert => `
        <div class="alert-item ${alert.type}">
            <div class="alert-icon">
                <i data-lucide="${alert.type === 'critical' ? 'alert-octagon' : 'alert-triangle'}"></i>
            </div>
            <div class="alert-content">
                <div class="alert-message">${alert.message}</div>
                <div class="alert-time">${alert.time}</div>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
    document.getElementById('alertBadge').textContent = state.alerts.length;
}

// Initialize Events Log
function initializeEvents() {
    const events = [
        { time: '14:32:15', level: 'info', message: 'Auto-scaling triggered: web-servers +2', source: 'k8s' },
        { time: '14:32:08', level: 'warn', message: 'High memory usage on worker-node-3', source: 'monitor' },
        { time: '14:31:55', level: 'info', message: 'Deployment v2.4.1 completed successfully', source: 'deploy' },
        { time: '14:31:42', level: 'error', message: 'Connection timeout to payment-gateway', source: 'api' },
        { time: '14:31:28', level: 'info', message: 'Certificate renewal completed', source: 'ssl' },
        { time: '14:31:15', level: 'debug', message: 'Cache invalidation: user-sessions', source: 'cache' },
        { time: '14:30:58', level: 'info', message: 'Database backup completed: 2.4 GB', source: 'db' }
    ];

    const log = document.getElementById('eventsLog');
    log.innerHTML = events.map(event => createEventHTML(event)).join('');
}

function createEventHTML(event) {
    return `
        <div class="event-item">
            <span class="event-time">${event.time}</span>
            <span class="event-level ${event.level}">${event.level.toUpperCase()}</span>
            <span class="event-message">${event.message}</span>
            <span class="event-source">[${event.source}]</span>
        </div>
    `;
}

// Start Real-Time Updates
function startRealTimeUpdates() {
    setInterval(() => {
        updateChartData();
        updateMetrics();
        updateLastUpdate();
        
        // Occasionally add new events
        if (Math.random() > 0.7) {
            addNewEvent();
        }
        
        // Rare random alerts
        if (Math.random() > 0.95) {
            showRandomToast();
        }
    }, state.updateInterval);
}

// Update Chart Data
function updateChartData() {
    // Generate new data points
    const newCpu = clamp(state.dataHistory.cpu[state.dataHistory.cpu.length - 1] + randomInRange(-8, 8), 20, 95);
    const newMem = clamp(state.dataHistory.memory[state.dataHistory.memory.length - 1] + randomInRange(-3, 5), 50, 98);
    const newNetIn = clamp(state.dataHistory.networkIn[state.dataHistory.networkIn.length - 1] + randomInRange(-100, 100), 400, 1200);
    const newNetOut = clamp(state.dataHistory.networkOut[state.dataHistory.networkOut.length - 1] + randomInRange(-50, 50), 150, 500);
    const newLatency = clamp(state.dataHistory.latency[state.dataHistory.latency.length - 1] + randomInRange(-10, 10), 20, 150);
    const newError = clamp(state.dataHistory.errorRate[state.dataHistory.errorRate.length - 1] + randomInRange(-0.05, 0.05), 0.01, 0.5);

    // Update history
    pushAndShift(state.dataHistory.cpu, newCpu);
    pushAndShift(state.dataHistory.memory, newMem);
    pushAndShift(state.dataHistory.networkIn, newNetIn);
    pushAndShift(state.dataHistory.networkOut, newNetOut);
    pushAndShift(state.dataHistory.latency, newLatency);
    pushAndShift(state.dataHistory.errorRate, newError);

    // Update charts
    state.charts.cpu.data.datasets[0].data = [...state.dataHistory.cpu];
    state.charts.memory.data.datasets[0].data = [...state.dataHistory.memory];
    state.charts.network.data.datasets[0].data = [...state.dataHistory.networkIn];
    state.charts.network.data.datasets[1].data = [...state.dataHistory.networkOut];
    state.charts.latency.data.datasets[0].data = [...state.dataHistory.latency];
    state.charts.errorRate.data.datasets[0].data = [...state.dataHistory.errorRate];

    // Refresh charts
    Object.values(state.charts).forEach(chart => chart.update('none'));
}

// Update Metric Values
function updateMetrics() {
    const cpu = state.dataHistory.cpu[state.dataHistory.cpu.length - 1];
    const mem = state.dataHistory.memory[state.dataHistory.memory.length - 1];
    const netIn = state.dataHistory.networkIn[state.dataHistory.networkIn.length - 1];
    const netOut = state.dataHistory.networkOut[state.dataHistory.networkOut.length - 1];
    const latency = state.dataHistory.latency[state.dataHistory.latency.length - 1];
    const errorRate = state.dataHistory.errorRate[state.dataHistory.errorRate.length - 1];

    document.getElementById('cpuValue').textContent = Math.round(cpu);
    document.getElementById('memValue').textContent = Math.round(mem);
    document.getElementById('inboundValue').textContent = Math.round(netIn);
    document.getElementById('outboundValue').textContent = Math.round(netOut);
    document.getElementById('latencyValue').textContent = Math.round(latency);
    document.getElementById('errorValue').textContent = errorRate.toFixed(2);

    // Update trends
    updateTrend('cpuTrend', state.dataHistory.cpu);
    updateTrend('memTrend', state.dataHistory.memory, true);
    updateTrend('latencyTrend', state.dataHistory.latency, false, 'ms');
    updateTrend('errorTrend', state.dataHistory.errorRate, false, '%', 2);

    // Update status counts based on current values
    if (mem > 90) {
        document.getElementById('warningCount').textContent = '6';
    }
}

function updateTrend(elementId, data, inversePositive = false, suffix = '%', decimals = 1) {
    const element = document.getElementById(elementId);
    const current = data[data.length - 1];
    const previous = data[data.length - 10] || data[0];
    const diff = current - previous;
    
    const isPositive = diff > 0;
    const trendClass = inversePositive ? (isPositive ? 'warning' : 'down') : (isPositive ? 'up' : 'down');
    const icon = isPositive ? 'trending-up' : 'trending-down';
    
    element.className = `trend ${trendClass}`;
    element.innerHTML = `<i data-lucide="${icon}"></i> ${isPositive ? '+' : ''}${diff.toFixed(decimals)}${suffix}`;
    lucide.createIcons();
}

// Update Last Update Time
function updateLastUpdate() {
    const now = new Date();
    const time = now.toTimeString().split(' ')[0];
    document.getElementById('lastUpdate').textContent = time;
}

// Add New Event
function addNewEvent() {
    const eventTypes = [
        { level: 'info', messages: [
            'Health check passed for api-gateway',
            'New pod scheduled: worker-v2-abc123',
            'Traffic spike detected: +15% requests',
            'SSL certificate valid for 89 days'
        ], sources: ['k8s', 'monitor', 'nginx', 'ssl'] },
        { level: 'warn', messages: [
            'Slow query detected: 2.3s execution time',
            'Memory pressure on cache-node-2',
            'Rate limiting triggered for client-xyz'
        ], sources: ['db', 'cache', 'api'] },
        { level: 'debug', messages: [
            'GC cycle completed: 45ms pause',
            'Connection pool resized: 100 → 150',
            'Session cleanup: 342 expired'
        ], sources: ['jvm', 'db', 'auth'] }
    ];

    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const now = new Date();
    const event = {
        time: now.toTimeString().split(' ')[0],
        level: type.level,
        message: type.messages[Math.floor(Math.random() * type.messages.length)],
        source: type.sources[Math.floor(Math.random() * type.sources.length)]
    };

    const log = document.getElementById('eventsLog');
    const newEventHTML = createEventHTML(event);
    log.insertAdjacentHTML('afterbegin', newEventHTML);

    // Keep only last 15 events
    while (log.children.length > 15) {
        log.removeChild(log.lastChild);
    }
}

// Show Toast Notification
function showToast(type, title, message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconName = type === 'critical' ? 'alert-octagon' : type === 'warning' ? 'alert-triangle' : 'check-circle';
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i data-lucide="${iconName}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">
            <i data-lucide="x"></i>
        </button>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    // Close button handler
    toast.querySelector('.toast-close').addEventListener('click', () => {
        removeToast(toast);
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            removeToast(toast);
        }
    }, 5000);
}

function removeToast(toast) {
    toast.classList.add('exiting');
    setTimeout(() => {
        toast.remove();
    }, 300);
}

function showRandomToast() {
    const toasts = [
        { type: 'warning', title: 'High CPU Usage', message: 'Server cpu-node-7 at 92% utilization' },
        { type: 'critical', title: 'Connection Error', message: 'Failed to reach external API endpoint' },
        { type: 'success', title: 'Auto-recovery', message: 'Service auth-worker restored automatically' },
        { type: 'warning', title: 'Disk Space', message: 'Volume /data at 85% capacity' }
    ];
    
    const toast = toasts[Math.floor(Math.random() * toasts.length)];
    showToast(toast.type, toast.title, toast.message);
}

// Setup Event Listeners
function setupEventListeners() {
    // Alert toggle
    document.getElementById('alertToggle').addEventListener('click', () => {
        document.getElementById('alertsPanel').classList.toggle('visible');
    });

    document.getElementById('closeAlerts').addEventListener('click', () => {
        document.getElementById('alertsPanel').classList.remove('visible');
    });

    // Close alerts when clicking outside
    document.addEventListener('click', (e) => {
        const panel = document.getElementById('alertsPanel');
        const toggle = document.getElementById('alertToggle');
        if (!panel.contains(e.target) && !toggle.contains(e.target)) {
            panel.classList.remove('visible');
        }
    });

    // Simulate occasional disconnection
    setInterval(() => {
        if (Math.random() > 0.98) {
            simulateDisconnection();
        }
    }, 10000);
}

// Simulate Connection Issues
function simulateDisconnection() {
    const status = document.getElementById('connectionStatus');
    status.classList.add('disconnected');
    status.querySelector('.status-text').textContent = 'Reconnecting...';
    
    showToast('warning', 'Connection Lost', 'Attempting to reconnect...');

    setTimeout(() => {
        status.classList.remove('disconnected');
        status.querySelector('.status-text').textContent = 'Connected';
        showToast('success', 'Reconnected', 'Connection restored successfully');
    }, 3000);
}

// Utility Functions
function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function pushAndShift(array, value) {
    array.push(value);
    if (array.length > state.maxDataPoints) {
        array.shift();
    }
}
