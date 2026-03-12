// === Predictive Analytics Dashboard ===
// Canvas-based forecast chart with confidence intervals, anomaly markers, and scenario lines

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initChart();
  initScenarioToggles();
  initRangeButtons();
  initRefreshButton();
  animateOnLoad();
});

// === Data ===
const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const actualData = [2.8, 3.0, 3.2, 3.5, 3.3, 3.6, 3.75, null, null, null, null, null]; // actual ends at Mar (partial)
const forecastData = [null, null, null, null, null, null, 3.75, 3.9, 4.05, 4.2, 4.35, 4.5]; // forecast from Mar
const optimisticData = [null, null, null, null, null, null, 3.75, 4.1, 4.35, 4.6, 4.85, 5.1];
const pessimisticData = [null, null, null, null, null, null, 3.75, 3.7, 3.8, 3.85, 3.9, 3.95];

// Confidence bands (upper and lower)
const confidenceUpper = [null, null, null, null, null, null, 3.75, 4.2, 4.5, 4.75, 5.0, 5.3];
const confidenceLower = [null, null, null, null, null, null, 3.75, 3.6, 3.6, 3.65, 3.7, 3.7];

// Anomaly points [index, value, label]
const anomalies = [
  { index: 4, value: 3.3, label: 'Revenue drop', severity: 'warning' },
  { index: 6, value: 3.75, label: 'Enterprise anomaly', severity: 'critical' },
];

// State
const state = {
  scenarios: { optimistic: true, baseline: true, pessimistic: true, confidence: false },
  animProgress: 0,
  hoverIndex: -1,
};

let canvas, ctx, chartRect;

// === Chart Drawing ===
function initChart() {
  canvas = document.getElementById('forecastChart');
  const container = canvas.parentElement;
  const dpr = window.devicePixelRatio || 1;
  
  function resize() {
    const w = container.clientWidth - 48;
    const h = container.clientHeight - 48;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    chartRect = { x: 50, y: 20, w: w - 70, h: h - 60 };
    drawChart();
  }

  resize();
  window.addEventListener('resize', resize);

  // Mouse interactions
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseleave', () => {
    state.hoverIndex = -1;
    drawChart();
    document.getElementById('chartTooltip').classList.remove('visible');
  });
}

function handleMouseMove(e) {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left - chartRect.x;
  const stepW = chartRect.w / (months.length - 1);
  const idx = Math.round(mx / stepW);

  if (idx >= 0 && idx < months.length && idx !== state.hoverIndex) {
    state.hoverIndex = idx;
    drawChart();
    showTooltip(e, idx);
  }
}

function showTooltip(e, idx) {
  const tooltip = document.getElementById('chartTooltip');
  const container = canvas.parentElement;
  const containerRect = container.getBoundingClientRect();

  let html = `<div style="font-weight:600;margin-bottom:6px">${months[idx]} 2026</div>`;
  
  if (actualData[idx] !== null) {
    html += `<div style="color:#3B82F6">Actual: $${actualData[idx].toFixed(2)}M</div>`;
  }
  if (forecastData[idx] !== null && state.scenarios.baseline) {
    html += `<div style="color:#8B5CF6">Forecast: $${forecastData[idx].toFixed(2)}M</div>`;
  }
  if (optimisticData[idx] !== null && state.scenarios.optimistic) {
    html += `<div style="color:#10B981">Optimistic: $${optimisticData[idx].toFixed(2)}M</div>`;
  }
  if (pessimisticData[idx] !== null && state.scenarios.pessimistic) {
    html += `<div style="color:#EF4444">Pessimistic: $${pessimisticData[idx].toFixed(2)}M</div>`;
  }
  if (confidenceUpper[idx] !== null && state.scenarios.confidence) {
    html += `<div style="color:#8b8fa8;font-size:11px">CI: $${confidenceLower[idx].toFixed(2)}M – $${confidenceUpper[idx].toFixed(2)}M</div>`;
  }

  // Check anomaly
  const anomaly = anomalies.find(a => a.index === idx);
  if (anomaly) {
    html += `<div style="color:#F59E0B;margin-top:4px;font-weight:600">⚠ ${anomaly.label}</div>`;
  }

  tooltip.innerHTML = html;
  tooltip.classList.add('visible');

  const tx = e.clientX - containerRect.left + 16;
  const ty = e.clientY - containerRect.top - 10;
  tooltip.style.left = Math.min(tx, containerRect.width - 220) + 'px';
  tooltip.style.top = ty + 'px';
}

function drawChart() {
  if (!ctx) return;
  const { x, y, w, h } = chartRect;
  const cw = canvas.width / (window.devicePixelRatio || 1);
  const ch = canvas.height / (window.devicePixelRatio || 1);

  ctx.clearRect(0, 0, cw, ch);

  const minVal = 2.5;
  const maxVal = 5.5;
  const range = maxVal - minVal;
  const stepW = w / (months.length - 1);

  const toX = i => x + i * stepW;
  const toY = v => y + h - ((v - minVal) / range) * h;

  // Grid lines
  ctx.strokeStyle = '#2a2d42';
  ctx.lineWidth = 1;
  for (let v = 2.5; v <= 5.5; v += 0.5) {
    const gy = toY(v);
    ctx.beginPath();
    ctx.moveTo(x, gy);
    ctx.lineTo(x + w, gy);
    ctx.stroke();

    ctx.fillStyle = '#5c6078';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`$${v.toFixed(1)}M`, x - 8, gy + 4);
  }

  // X labels
  ctx.textAlign = 'center';
  ctx.fillStyle = '#5c6078';
  months.forEach((m, i) => {
    ctx.fillText(m, toX(i), y + h + 20);
  });

  // Forecast divider line
  const dividerX = toX(6);
  ctx.strokeStyle = '#3a3d52';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(dividerX, y);
  ctx.lineTo(dividerX, y + h);
  ctx.stroke();
  ctx.setLineDash([]);

  // "Forecast" label
  ctx.fillStyle = '#5c6078';
  ctx.font = '11px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('← Actual | Forecast →', dividerX - 50, y + 14);

  // Confidence bands
  if (state.scenarios.confidence) {
    ctx.fillStyle = 'rgba(139, 92, 246, 0.08)';
    ctx.beginPath();
    let started = false;
    for (let i = 0; i < months.length; i++) {
      if (confidenceUpper[i] !== null) {
        if (!started) { ctx.moveTo(toX(i), toY(confidenceUpper[i])); started = true; }
        else ctx.lineTo(toX(i), toY(confidenceUpper[i]));
      }
    }
    for (let i = months.length - 1; i >= 0; i--) {
      if (confidenceLower[i] !== null) ctx.lineTo(toX(i), toY(confidenceLower[i]));
    }
    ctx.closePath();
    ctx.fill();

    // Band borders
    drawLine(confidenceUpper.map((v, i) => v !== null ? [toX(i), toY(v)] : null).filter(Boolean), 'rgba(139, 92, 246, 0.25)', 1, [3, 3]);
    drawLine(confidenceLower.map((v, i) => v !== null ? [toX(i), toY(v)] : null).filter(Boolean), 'rgba(139, 92, 246, 0.25)', 1, [3, 3]);
  }

  // Scenario lines
  if (state.scenarios.pessimistic) {
    drawLine(pessimisticData.map((v, i) => v !== null ? [toX(i), toY(v)] : null).filter(Boolean), '#EF4444', 2, [6, 4], 0.5);
  }
  if (state.scenarios.optimistic) {
    drawLine(optimisticData.map((v, i) => v !== null ? [toX(i), toY(v)] : null).filter(Boolean), '#10B981', 2, [6, 4], 0.5);
  }

  // Forecast line (dashed)
  if (state.scenarios.baseline) {
    drawLine(forecastData.map((v, i) => v !== null ? [toX(i), toY(v)] : null).filter(Boolean), '#8B5CF6', 2.5, [5, 5]);
  }

  // Actual line (solid)
  const actualPoints = actualData.map((v, i) => v !== null ? [toX(i), toY(v)] : null).filter(Boolean);
  drawLine(actualPoints, '#3B82F6', 3);

  // Actual dots
  actualData.forEach((v, i) => {
    if (v === null) return;
    ctx.beginPath();
    ctx.arc(toX(i), toY(v), 4, 0, Math.PI * 2);
    ctx.fillStyle = '#3B82F6';
    ctx.fill();
    ctx.strokeStyle = '#0f1117';
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Forecast dots
  if (state.scenarios.baseline) {
    forecastData.forEach((v, i) => {
      if (v === null || i <= 6) return;
      ctx.beginPath();
      ctx.arc(toX(i), toY(v), 3, 0, Math.PI * 2);
      ctx.fillStyle = '#8B5CF6';
      ctx.fill();
    });
  }

  // Anomaly markers
  anomalies.forEach(a => {
    const ax = toX(a.index);
    const ay = toY(a.value);
    
    // Pulse ring
    ctx.beginPath();
    ctx.arc(ax, ay, 12, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
    ctx.fill();

    // Outer ring
    ctx.beginPath();
    ctx.arc(ax, ay, 8, 0, Math.PI * 2);
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Inner dot
    ctx.beginPath();
    ctx.arc(ax, ay, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#F59E0B';
    ctx.fill();
  });

  // Hover line
  if (state.hoverIndex >= 0 && state.hoverIndex < months.length) {
    const hx = toX(state.hoverIndex);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(hx, y);
    ctx.lineTo(hx, y + h);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

function drawLine(points, color, width, dash, alpha) {
  if (points.length < 2) return;
  ctx.save();
  if (alpha) ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  if (dash) ctx.setLineDash(dash);
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  
  // Smooth curve
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx = (prev[0] + curr[0]) / 2;
    ctx.quadraticCurveTo(prev[0], prev[1], cpx, (prev[1] + curr[1]) / 2);
  }
  ctx.lineTo(points[points.length - 1][0], points[points.length - 1][1]);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

// === Scenario Toggles ===
function initScenarioToggles() {
  document.querySelectorAll('.scenario-toggle').forEach(toggle => {
    toggle.addEventListener('change', () => {
      state.scenarios[toggle.dataset.scenario] = toggle.checked;
      drawChart();
    });
  });
}

// === Range Buttons ===
function initRangeButtons() {
  document.querySelectorAll('.range-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.range-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Visual feedback only for demo
      drawChart();
    });
  });
}

// === Refresh ===
function initRefreshButton() {
  const btn = document.getElementById('refreshBtn');
  btn.addEventListener('click', () => {
    btn.querySelector('svg')?.classList.add('spinning');
    setTimeout(() => {
      btn.querySelector('svg')?.classList.remove('spinning');
    }, 1000);
    animateOnLoad();
  });
}

// === Load Animation ===
function animateOnLoad() {
  // Animate KPI cards
  document.querySelectorAll('.kpi-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 + i * 100);
  });

  // Animate confidence bars
  document.querySelectorAll('.confidence-fill').forEach(bar => {
    const target = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => { bar.style.width = target; }, 600);
  });

  // Animate probability bars
  document.querySelectorAll('.prob-fill').forEach(bar => {
    const target = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => { bar.style.width = target; }, 800);
  });

  // Animate insight cards
  document.querySelectorAll('.insight-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-20px)';
    setTimeout(() => {
      card.style.transition = 'all 0.4s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateX(0)';
    }, 400 + i * 150);
  });

  // Animate anomaly items
  document.querySelectorAll('.anomaly-item').forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(20px)';
    setTimeout(() => {
      item.style.transition = 'all 0.4s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, 500 + i * 150);
  });
}

// Add spinning animation for refresh
const style = document.createElement('style');
style.textContent = `
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .spinning { animation: spin 1s linear; }
`;
document.head.appendChild(style);
