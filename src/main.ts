import './style.css';
import data from './data/portfolio.json';
import { renderHome } from './pages/home';
import { renderAbout } from './pages/about';
import { renderProjects } from './pages/projects';
import { renderContact } from './pages/contact';
import { generateAsciiArt } from './components/AsciiBackground';
import VanillaTilt from 'vanilla-tilt';

// ============================================
// State
// ============================================
interface AppState {
  currentTab: string;
  sidebarOpen: boolean;
  theme: 'dark' | 'light';
}

const state: AppState = {
  currentTab: 'home',
  sidebarOpen: window.innerWidth >= 768,
  theme: (localStorage.getItem('portfolio-theme') as 'dark' | 'light') || 'dark',
};

// ============================================
// Initialization
// ============================================
function init() {
  applyTheme(state.theme);
  renderTabs();
  renderFileTree();
  renderSidebarProfile();
  renderInfoPanel();
  renderMobileNav();
  setupEventListeners();
  
  // Route from hash or default
  const hash = window.location.hash.replace('#', '') || 'home';
  navigateTo(hash);
}

// ============================================
// Theme
// ============================================
function applyTheme(theme: 'dark' | 'light') {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  state.theme = theme;
}

function toggleTheme() {
  const next = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

// ============================================
// Tab Bar
// ============================================
function renderTabs() {
  const container = document.getElementById('tabs-container');
  if (!container) return;

  container.innerHTML = data.tabs.map(tab => `
    <div class="tab ${state.currentTab === tab.id ? 'tab--active' : ''}" data-tab="${tab.id}" id="tab-${tab.id}">
      ${getFileIcon(tab.icon)}
      <span>${tab.filename}</span>
      <span class="tab__close">×</span>
    </div>
  `).join('');

  container.querySelectorAll('.tab').forEach(el => {
    el.addEventListener('click', () => {
      const tabId = (el as HTMLElement).dataset.tab!;
      navigateTo(tabId);
    });
  });
}

function getFileIcon(type: string): string {
  const colors: Record<string, string> = {
    js: '#f0db4f',
    ts: '#3178c6',
    sh: '#3fb950',
  };
  const color = colors[type] || '#8b949e';
  return `<svg class="tab__icon" viewBox="0 0 16 16" fill="${color}">
    <rect x="2" y="1" width="12" height="14" rx="1.5" fill="${color}" opacity="0.15"/>
    <text x="8" y="11.5" text-anchor="middle" font-size="6" font-weight="700" fill="${color}" font-family="var(--font-mono)">${type.toUpperCase()}</text>
  </svg>`;
}

// ============================================
// File Tree (Sidebar)
// ============================================
function renderFileTree() {
  const tree = document.getElementById('file-tree');
  if (!tree) return;

  tree.innerHTML = data.tabs.map(tab => `
    <div class="file-tree__item ${state.currentTab === tab.id ? 'file-tree__item--active' : ''}" data-tab="${tab.id}" id="tree-${tab.id}">
      ${getFileIcon(tab.icon)}
      <span>${tab.filename}</span>
    </div>
  `).join('');

  tree.querySelectorAll('.file-tree__item').forEach(el => {
    el.addEventListener('click', () => {
      const tabId = (el as HTMLElement).dataset.tab!;
      navigateTo(tabId);
      // Close sidebar on mobile
      if (window.innerWidth < 768) {
        toggleSidebar(false);
      }
    });
  });
}

// ============================================
// Sidebar Profile
// ============================================
function renderSidebarProfile() {
  const el = document.getElementById('sidebar-profile');
  if (!el) return;

  el.innerHTML = `
    <div class="sidebar__profile-name">${data.profile.name}</div>
    <div class="sidebar__profile-title">${data.profile.title}</div>
    <div class="sidebar__profile-links">
      <a href="${data.profile.github}" target="_blank" rel="noopener" class="sidebar__profile-link" aria-label="GitHub">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
      </a>
      <a href="${data.profile.linkedin}" target="_blank" rel="noopener" class="sidebar__profile-link" aria-label="LinkedIn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <a href="mailto:${data.profile.email}" class="sidebar__profile-link" aria-label="Email">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>
      </a>
      <a href="${data.profile.instagram}" target="_blank" rel="noopener" class="sidebar__profile-link" aria-label="Instagram">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
      </a>
    </div>
  `;
}

// ============================================
// Info Panel
// ============================================
function renderInfoPanel() {
  const el = document.getElementById('info-panel-content');
  if (!el) return;

  el.innerHTML = `
    <div class="info-code">
<span class="comment">&lt;!-- profile.html --&gt;</span>
<span class="tag">&lt;section</span> <span class="attr">class</span>=<span class="string">"scope-profile"</span><span class="tag">&gt;</span>
  <span class="tag">&lt;h3&gt;</span>
    ${data.profile.name.toUpperCase()}
  <span class="tag">&lt;/h3&gt;</span>
  <span class="tag">&lt;p&gt;</span>
    ${data.profile.title}
  <span class="tag">&lt;/p&gt;</span>
  <span class="tag">&lt;p&gt;</span>
    ${data.profile.location}
  <span class="tag">&lt;/p&gt;</span>
  <span class="tag">&lt;a</span> <span class="attr">href</span>=<span class="string">"mailto:${data.profile.email}"</span><span class="tag">&gt;</span>
    Email me
  <span class="tag">&lt;/a&gt;</span>
<span class="tag">&lt;/section&gt;</span>

<span class="comment">&lt;!-- education --&gt;</span>
<span class="tag">&lt;div</span> <span class="attr">class</span>=<span class="string">"edu"</span><span class="tag">&gt;</span>
  <span class="tag">&lt;span&gt;</span>${data.education.degree}<span class="tag">&lt;/span&gt;</span>
  <span class="tag">&lt;span&gt;</span>${data.education.university}<span class="tag">&lt;/span&gt;</span>
  <span class="tag">&lt;span&gt;</span>${data.education.period}<span class="tag">&lt;/span&gt;</span>
<span class="tag">&lt;/div&gt;</span>
    </div>
  `;
}

// ============================================
// Mobile Nav
// ============================================
function renderMobileNav() {
  const container = document.getElementById('mobile-tabs');
  if (!container) return;

  const icons: Record<string, string> = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    about: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    projects: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    contact: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>',
  };

  container.innerHTML = data.tabs.map(tab => `
    <div class="mobile-nav__tab ${state.currentTab === tab.id ? 'mobile-nav__tab--active' : ''}" data-tab="${tab.id}">
      ${icons[tab.id] || ''}
      <span>${tab.id}</span>
    </div>
  `).join('');

  container.querySelectorAll('.mobile-nav__tab').forEach(el => {
    el.addEventListener('click', () => {
      const tabId = (el as HTMLElement).dataset.tab!;
      navigateTo(tabId);
    });
  });
}

// ============================================
// Line Numbers
// ============================================
function updateLineNumbers() {
  const lineNumbersEl = document.getElementById('line-numbers');
  const editorContent = document.getElementById('editor-content');
  if (!lineNumbersEl || !editorContent) return;

  const contentHeight = editorContent.scrollHeight;
  const lineHeight = 25.5; // approx line-height in px
  const numLines = Math.max(Math.ceil(contentHeight / lineHeight), 60);

  let html = '';
  for (let i = 1; i <= numLines; i++) {
    html += `<span>${i}</span>`;
  }
  lineNumbersEl.innerHTML = html;

  // Sync scroll
  editorContent.addEventListener('scroll', () => {
    lineNumbersEl.scrollTop = editorContent.scrollTop;
  }, { passive: true });
}

// ============================================
// Navigation
// ============================================
function navigateTo(tabId: string) {
  state.currentTab = tabId;
  window.location.hash = tabId;

  // Update active states
  renderTabs();
  renderFileTree();
  renderMobileNav();

  // Render page content
  const container = document.getElementById('page-container');
  if (!container) return;

  container.style.opacity = '0';
  container.style.transform = 'translateY(12px)';
  container.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

  setTimeout(() => {
    switch (tabId) {
      case 'home':
        container.innerHTML = renderHome(data);
        break;
      case 'about':
        container.innerHTML = renderAbout(data);
        break;
      case 'projects':
        container.innerHTML = renderProjects(data);
        break;
      case 'contact':
        container.innerHTML = renderContact(data);
        startTerminalAnimation();
        break;
      default:
        container.innerHTML = renderHome(data);
    }

    // Animate in
    requestAnimationFrame(() => {
      container.style.transition = 'opacity 0.4s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    });

    // Update line numbers after content renders
    requestAnimationFrame(() => {
      updateLineNumbers();
      setupScrollAnimations();
      
      // Initialize VanillaTilt for elements loaded in the view
      VanillaTilt.init(document.querySelectorAll('.project-card, .venture-card') as unknown as HTMLElement[], {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.05,
        scale: 1.02
      });
      
      VanillaTilt.init(document.querySelectorAll('.btn') as unknown as HTMLElement[], {
        max: 15,
        speed: 300,
        scale: 1.05
      });
    });

    // Scroll to top
    const editorContent = document.getElementById('editor-content');
    if (editorContent) editorContent.scrollTop = 0;
  }, 100);
}

// ============================================
// Sidebar Toggle
// ============================================
function toggleSidebar(forceState?: boolean) {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  state.sidebarOpen = forceState !== undefined ? forceState : !state.sidebarOpen;

  if (window.innerWidth < 768) {
    sidebar.classList.toggle('sidebar--open', state.sidebarOpen);
    sidebar.classList.toggle('sidebar--collapsed', !state.sidebarOpen);
  } else {
    sidebar.classList.toggle('sidebar--collapsed', !state.sidebarOpen);
  }
}

// ============================================
// Terminal Typing Animation
// ============================================
function startTerminalAnimation() {
  const lines = document.querySelectorAll('.terminal__line');
  lines.forEach((line, i) => {
    (line as HTMLElement).style.animationDelay = `${i * 0.15}s`;
  });
}

// ============================================
// Scroll Animations (IntersectionObserver)
// ============================================
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.timeline__item, .skills-category, .project-card, .venture-card').forEach(el => {
    observer.observe(el);
  });
}

// ============================================
// Event Listeners
// ============================================
function setupEventListeners() {
  // Theme toggle
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

  // Sidebar toggle
  document.getElementById('sidebar-toggle')?.addEventListener('click', () => toggleSidebar());

  // Hash change
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    if (hash !== state.currentTab) navigateTo(hash);
  });

  // Keyboard shortcuts (fun easter egg)
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      const tabMap: Record<string, string> = { '1': 'home', '2': 'about', '3': 'projects', '4': 'contact' };
      if (tabMap[e.key]) {
        e.preventDefault();
        navigateTo(tabMap[e.key]);
      }
    }
  });

  // Responsive sidebar handling
  window.addEventListener('resize', () => {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    if (window.innerWidth >= 768) {
      sidebar.classList.remove('sidebar--open');
      if (!state.sidebarOpen) {
        sidebar.classList.add('sidebar--collapsed');
      }
    }
  });

  // Click outside sidebar to close on mobile
  document.getElementById('editor-content')?.addEventListener('click', () => {
    if (window.innerWidth < 768 && state.sidebarOpen) {
      toggleSidebar(false);
    }
  });
}

// ============================================
// Boot
// ============================================
document.addEventListener('DOMContentLoaded', init);
// Also run init if DOM already loaded (Vite HMR)
if (document.readyState !== 'loading') init();
