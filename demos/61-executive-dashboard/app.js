// Executive Dashboard - Interactive Features
// Animated KPI counters, sparklines, and dynamic updates

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Animate KPI numbers
  animateKPINumbers();
  
  // Generate sparklines
  generateSparklines();
  
  // Period selector functionality
  initPeriodSelector();
});

// Animate numbers counting up
function animateKPINumbers() {
  const numberElements = document.querySelectorAll('.number[data-target]');
  
  numberElements.forEach((el, index) => {
    const target = parseFloat(el.dataset.target);
    const isDecimal = target % 1 !== 0;
    const duration = 1500;
    const startTime = performance.now();
    const delay = index * 100;
    
    setTimeout(() => {
      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime - delay;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out-expo)
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = target * easeOutExpo;
        
        if (isDecimal) {
          el.textContent = current.toFixed(1);
        } else {
          el.textContent = Math.floor(current).toLocaleString();
        }
        
        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          // Final value
          if (isDecimal) {
            el.textContent = target.toFixed(1);
          } else {
            el.textContent = target.toLocaleString();
          }
        }
      }
      
      requestAnimationFrame(updateNumber);
    }, delay);
  });
}

// Generate SVG sparklines
function generateSparklines() {
  const sparklineData = {
    'sparkline-revenue': {
      data: [18.2, 19.1, 20.5, 21.2, 22.8, 23.4, 24.8],
      color: '#059669'
    },
    'sparkline-profit': {
      data: [4.8, 5.1, 5.3, 5.6, 5.8, 6.0, 6.2],
      color: '#059669'
    },
    'sparkline-customers': {
      data: [12100, 12250, 12400, 12500, 12600, 12750, 12847],
      color: '#D97706'
    },
    'sparkline-nps': {
      data: [62, 64, 65, 66, 68, 70, 72],
      color: '#059669'
    }
  };
  
  Object.entries(sparklineData).forEach(([id, config]) => {
    const container = document.getElementById(id);
    if (container) {
      container.innerHTML = createSparklineSVG(config.data, config.color);
    }
  });
}

function createSparklineSVG(data, color) {
  const width = 200;
  const height = 40;
  const padding = 2;
  
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });
  
  const polylinePoints = points.join(' ');
  
  // Create gradient fill area
  const areaPoints = [
    `${padding},${height - padding}`,
    ...points,
    `${width - padding},${height - padding}`
  ].join(' ');
  
  return `
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
      <defs>
        <linearGradient id="grad-${color.replace('#', '')}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:${color};stop-opacity:0.05" />
        </linearGradient>
      </defs>
      <polygon 
        points="${areaPoints}" 
        fill="url(#grad-${color.replace('#', '')})" 
      />
      <polyline 
        points="${polylinePoints}" 
        fill="none" 
        stroke="${color}" 
        stroke-width="2" 
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle 
        cx="${points[points.length - 1].split(',')[0]}" 
        cy="${points[points.length - 1].split(',')[1]}" 
        r="3" 
        fill="${color}"
      />
    </svg>
  `;
}

// Period selector functionality
function initPeriodSelector() {
  const buttons = document.querySelectorAll('.period-btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Simulate data refresh
      refreshData(btn.textContent);
    });
  });
}

// Simulate data refresh when period changes
function refreshData(period) {
  const kpiCards = document.querySelectorAll('.kpi-card');
  
  // Add loading state
  kpiCards.forEach(card => {
    card.style.opacity = '0.6';
    card.style.transform = 'scale(0.98)';
  });
  
  // Simulate API delay
  setTimeout(() => {
    kpiCards.forEach(card => {
      card.style.opacity = '1';
      card.style.transform = '';
    });
    
    // Re-animate numbers (in real app, would update with new data)
    animateKPINumbers();
    
    // Update last refreshed time
    updateLastRefreshed();
  }, 500);
}

// Update last refreshed indicator
function updateLastRefreshed() {
  const lastUpdated = document.querySelector('.last-updated span');
  if (lastUpdated) {
    lastUpdated.textContent = 'Updated just now';
    
    // Reset after a moment
    setTimeout(() => {
      lastUpdated.textContent = 'Updated 1 min ago';
    }, 60000);
  }
}

// Add hover interactions for KPI cards
document.querySelectorAll('.kpi-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    // Subtle pulse on the status indicator
    const indicator = card.querySelector('.status-indicator');
    if (indicator) {
      indicator.style.transform = 'scale(1.1)';
    }
  });
  
  card.addEventListener('mouseleave', () => {
    const indicator = card.querySelector('.status-indicator');
    if (indicator) {
      indicator.style.transform = '';
    }
  });
});

// Traffic light pulse animation
const trafficLights = document.querySelectorAll('.traffic-light');
trafficLights.forEach((light, index) => {
  // Staggered subtle pulse
  light.style.animation = `pulse 3s ease-in-out ${index * 0.2}s infinite`;
});

// Add pulse keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;
document.head.appendChild(style);

// Keyboard navigation for period selector
document.querySelector('.period-selector')?.addEventListener('keydown', (e) => {
  const buttons = Array.from(document.querySelectorAll('.period-btn'));
  const activeIndex = buttons.findIndex(b => b.classList.contains('active'));
  
  if (e.key === 'ArrowRight' && activeIndex < buttons.length - 1) {
    buttons[activeIndex + 1].click();
    buttons[activeIndex + 1].focus();
  } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
    buttons[activeIndex - 1].click();
    buttons[activeIndex - 1].focus();
  }
});

// Export button functionality
document.querySelector('.action-btn')?.addEventListener('click', () => {
  // Simulate PDF export
  const btn = document.querySelector('.action-btn');
  const originalText = btn.innerHTML;
  
  btn.innerHTML = '<i data-lucide="loader-2"></i> Generating...';
  btn.style.pointerEvents = 'none';
  lucide.createIcons();
  
  // Add spin animation to loader
  const loader = btn.querySelector('i');
  if (loader) {
    loader.style.animation = 'spin 1s linear infinite';
  }
  
  setTimeout(() => {
    btn.innerHTML = '<i data-lucide="check"></i> Downloaded';
    btn.style.background = '#059669';
    lucide.createIcons();
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.style.pointerEvents = '';
      lucide.createIcons();
    }, 2000);
  }, 1500);
});

// Responsive handling
function handleResponsive() {
  const width = window.innerWidth;
  
  if (width < 600) {
    // Simplify sparklines on mobile
    document.querySelectorAll('.sparkline').forEach(s => {
      s.style.height = '30px';
    });
  } else {
    document.querySelectorAll('.sparkline').forEach(s => {
      s.style.height = '';
    });
  }
}

window.addEventListener('resize', handleResponsive);
handleResponsive();

// Console welcome message
console.log('%c📊 Executive Dashboard', 'font-size: 20px; font-weight: bold; color: #1E40AF;');
console.log('%cC-suite KPIs at a glance', 'font-size: 14px; color: #64748B;');
console.log('Style: Clean professional • Status: Demo mode');
