// AI Ad Factory Application
class AdFactory {
  constructor() {
    this.campaigns = [
      {
        id: 1,
        name: "Summer Sale Campaign",
        status: "active",
        impressions: "125.4K",
        clicks: "3.2K",
        ctr: "2.56%",
        spend: "$1,240"
      },
      {
        id: 2,
        name: "Product Launch",
        status: "paused",
        impressions: "89.2K",
        clicks: "1.8K",
        ctr: "2.02%",
        spend: "$890"
      },
      {
        id: 3,
        name: "Brand Awareness",
        status: "active",
        impressions: "203.7K",
        clicks: "5.1K",
        ctr: "2.51%",
        spend: "$2,100"
      }
    ];
    
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
    this.startMetricsAnimation();
  }

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="app-container">
        <!-- Header -->
        <header class="header">
          <div class="header-content">
            <div class="logo">
              <div class="logo-icon">🎯</div>
              <h1>AI Ad Factory</h1>
            </div>
            <nav class="nav">
              <a href="#" class="nav-link active">Dashboard</a>
              <a href="#" class="nav-link">Campaigns</a>
              <a href="#" class="nav-link">Analytics</a>
              <a href="#" class="nav-link">Templates</a>
            </nav>
            <div class="user-avatar">
              <div class="avatar">JD</div>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <main class="main-content">
          <!-- Hero Section -->
          <section class="hero">
            <div class="hero-content">
              <h2>Create High-Converting Ads with AI</h2>
              <p>Generate, optimize, and scale your advertising campaigns with intelligent automation</p>
              <button class="cta-button" id="createCampaign">
                <span>Create New Campaign</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </button>
            </div>
          </section>

          <!-- Stats Dashboard -->
          <section class="stats-section">
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon">📊</div>
                <div class="stat-content">
                  <h3 class="stat-value" data-target="418200">0</h3>
                  <p class="stat-label">Total Impressions</p>
                  <span class="stat-change positive">+12.5%</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">👆</div>
                <div class="stat-content">
                  <h3 class="stat-value" data-target="10100">0</h3>
                  <p class="stat-label">Total Clicks</p>
                  <span class="stat-change positive">+8.3%</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">💰</div>
                <div class="stat-content">
                  <h3 class="stat-value" data-target="4230">$0</h3>
                  <p class="stat-label">Total Spend</p>
                  <span class="stat-change negative">-2.1%</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">🎯</div>
                <div class="stat-content">
                  <h3 class="stat-value" data-target="2.41">0%</h3>
                  <p class="stat-label">Avg. CTR</p>
                  <span class="stat-change positive">+5.7%</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Campaigns Section -->
          <section class="campaigns-section">
            <div class="section-header">
              <h2>Active Campaigns</h2>
              <button class="secondary-button" id="viewAllCampaigns">View All</button>
            </div>
            <div class="campaigns-grid" id="campaignsGrid">
              ${this.renderCampaigns()}
            </div>
          </section>
        </main>

        <!-- Floating Action Buttons -->
        <div class="fab-container">
          <button class="fab secondary" id="templatesFab" title="Templates">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="9" y1="9" x2="15" y2="9"/>
              <line x1="9" y1="15" x2="15" y2="15"/>
            </svg>
          </button>
          <button class="fab secondary" id="analyticsFab" title="Analytics">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
            </svg>
          </button>
          <button class="fab primary" id="createFab" title="Create Campaign">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </button>
        </div>

        <!-- Notification -->
        <div class="notification" id="notification">
          <div class="notification-content">
            <span class="notification-text"></span>
            <button class="notification-close">&times;</button>
          </div>
        </div>
      </div>
    `;
  }

  renderCampaigns() {
    return this.campaigns.map(campaign => `
      <div class="campaign-card" data-id="${campaign.id}">
        <div class="campaign-header">
          <h3>${campaign.name}</h3>
          <span class="campaign-status ${campaign.status}">${campaign.status}</span>
        </div>
        <div class="campaign-metrics">
          <div class="metric">
            <span class="metric-label">Impressions</span>
            <span class="metric-value">${campaign.impressions}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Clicks</span>
            <span class="metric-value">${campaign.clicks}</span>
          </div>
          <div class="metric">
            <span class="metric-label">CTR</span>
            <span class="metric-value">${campaign.ctr}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Spend</span>
            <span class="metric-value">${campaign.spend}</span>
          </div>
        </div>
        <div class="campaign-actions">
          <button class="action-button edit" data-action="edit" data-id="${campaign.id}">Edit</button>
          <button class="action-button ${campaign.status === 'active' ? 'pause' : 'play'}" 
                  data-action="${campaign.status === 'active' ? 'pause' : 'play'}" 
                  data-id="${campaign.id}">
            ${campaign.status === 'active' ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>
    `).join('');
  }

  attachEventListeners() {
    // FAB buttons
    document.getElementById('createFab').addEventListener('click', () => {
      this.showNotification('Opening campaign creator...', 'info');
    });

    document.getElementById('analyticsFab').addEventListener('click', () => {
      this.showNotification('Loading analytics dashboard...', 'info');
    });

    document.getElementById('templatesFab').addEventListener('click', () => {
      this.showNotification('Opening template library...', 'info');
    });

    // Header buttons
    document.getElementById('createCampaign').addEventListener('click', () => {
      this.showNotification('Campaign creator launched!', 'success');
    });

    document.getElementById('viewAllCampaigns').addEventListener('click', () => {
      this.showNotification('Loading all campaigns...', 'info');
    });

    // Campaign actions
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('action-button')) {
        const action = e.target.dataset.action;
        const campaignId = parseInt(e.target.dataset.id);
        this.handleCampaignAction(action, campaignId);
      }
    });

    // Notification close
    document.querySelector('.notification-close').addEventListener('click', () => {
      this.hideNotification();
    });

    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
        this.showNotification(`Navigating to ${e.target.textContent}...`, 'info');
      });
    });
  }

  handleCampaignAction(action, campaignId) {
    const campaign = this.campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    switch (action) {
      case 'edit':
        this.showNotification(`Editing ${campaign.name}...`, 'info');
        break;
      case 'pause':
        campaign.status = 'paused';
        this.showNotification(`${campaign.name} paused`, 'success');
        this.updateCampaignDisplay();
        break;
      case 'play':
        campaign.status = 'active';
        this.showNotification(`${campaign.name} resumed`, 'success');
        this.updateCampaignDisplay();
        break;
    }
  }

  updateCampaignDisplay() {
    document.getElementById('campaignsGrid').innerHTML = this.renderCampaigns();
  }

  showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const text = notification.querySelector('.notification-text');
    
    text.textContent = message;
    notification.className = `notification show ${type}`;
    
    setTimeout(() => {
      this.hideNotification();
    }, 3000);
  }

  hideNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('show');
  }

  startMetricsAnimation() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
      const target = parseInt(stat.dataset.target);
      const isPercentage = stat.dataset.target.includes('.');
      const isCurrency = stat.textContent.includes('$');
      
      this.animateValue(stat, 0, target, 2000, isPercentage, isCurrency);
    });
  }

  animateValue(element, start, end, duration, isPercentage = false, isCurrency = false) {
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const current = start + (end - start) * this.easeOutCubic(progress);
      
      let displayValue;
      if (isPercentage) {
        displayValue = current.toFixed(2) + '%';
      } else if (isCurrency) {
        displayValue = '$' + Math.floor(current).toLocaleString();
      } else {
        displayValue = Math.floor(current).toLocaleString();
      }
      
      element.textContent = displayValue;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new AdFactory();
});