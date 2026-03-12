export interface ProjectLinks {
  live?: string;
  github?: string;
}

export interface Project {
  name: string;
  tagline: string;
  description: string;
  tech: readonly string[];
  features: readonly string[];
  links: ProjectLinks;
  stars?: number;
  hackathon?: string;
  status?: string;
  year?: string;
  featured?: boolean;
}

export function openProjectDetail(project: Project): void {
  document.getElementById('project-detail-overlay')?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'project-detail-overlay';
  overlay.className = 'project-detail-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', `${project.name} details`);

  const slugName = project.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const filename = `${slugName}.ts`;
  const varName = slugName.replace(/-/g, '_');

  const techArrayStr = project.tech
    .map(t => `<span class="pd-string">"${t}"</span>`)
    .join(', ');

  const featuresArrayStr = project.features
    .map(f => `<span class="pd-string">"${f}"</span>`)
    .join(', ');

  const techTags = project.tech
    .map(t => `<span class="detail-tag detail-tag--tech">${t}</span>`)
    .join('');

  const featureTags = project.features
    .map(f => `<span class="detail-tag detail-tag--feature">${f}</span>`)
    .join('');

  const previewHTML = project.links.live ? `
    <div class="detail-preview">
      <div class="detail-preview__bar">
        <span class="detail-preview__dot" style="background:#c97272"></span>
        <span class="detail-preview__dot" style="background:#c4b46a"></span>
        <span class="detail-preview__dot" style="background:#8fad7e"></span>
        <span class="detail-preview__url">${project.links.live.replace('https://', '')}</span>
        <a href="${project.links.live}" target="_blank" rel="noopener" class="detail-preview__open">↗ open</a>
      </div>
      <iframe
        src="${project.links.live}"
        class="detail-preview__iframe"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
        title="${project.name} live preview"
      ></iframe>
    </div>
  ` : '';

  const badgeLabel = project.hackathon ?? project.status ?? 'Project';
  const badgeClass = project.hackathon ? 'detail-badge--hackathon' : 'detail-badge--status';

  const statusColorMap: Record<string, string> = {
    'Live': 'detail-badge--live',
    'Open Source': 'detail-badge--open',
    'Private': 'detail-badge--private',
    'In Development': 'detail-badge--dev',
  };
  const resolvedBadgeClass = project.hackathon
    ? 'detail-badge--hackathon'
    : (statusColorMap[project.status ?? ''] ?? badgeClass);

  overlay.innerHTML = `
    <div class="detail-panel" tabindex="-1">

      <!-- Fake VS Code tab bar -->
      <div class="detail-tab-bar">
        <div class="detail-tab">
          <svg class="detail-tab__icon" viewBox="0 0 16 16" aria-hidden="true">
            <rect x="2" y="1" width="12" height="14" rx="1.5" fill="#3178c6" opacity="0.15"/>
            <text x="8" y="11.5" text-anchor="middle" font-size="5.5" font-weight="700" fill="#3178c6" font-family="monospace">TS</text>
          </svg>
          <span>${filename}</span>
        </div>
        <div class="detail-tab-bar__actions">
          <kbd class="detail-esc-hint">ESC to close</kbd>
          <button class="detail-close" id="detail-close-btn" aria-label="Close detail view">×</button>
        </div>
      </div>

      <!-- Scrollable content -->
      <div class="detail-content">
        <div class="detail-body">

          <!-- Left: code-styled info -->
          <div class="detail-code-col">

            <div class="detail-meta-row">
              <span class="detail-badge ${resolvedBadgeClass}">${badgeLabel}</span>
              ${project.year ? `<span class="detail-year">${project.year}</span>` : ''}
              ${project.stars ? `<span class="detail-stars">★ ${project.stars}</span>` : ''}
            </div>

            <h1 class="detail-name">${project.name}</h1>
            <p class="detail-tagline">${project.tagline}</p>

            <div class="detail-block-comment">
              <span class="pd-comment">/**</span><br>
              <span class="pd-comment">&nbsp;* ${project.description}</span><br>
              <span class="pd-comment">&nbsp;*/</span>
            </div>

            <div class="detail-code-block">
              <span class="pd-kw">const</span> <span class="pd-var">${varName}</span> <span class="pd-punct">=</span> {<br>
              &nbsp;&nbsp;<span class="pd-prop">tech</span><span class="pd-punct">:</span> [${techArrayStr}],<br>
              &nbsp;&nbsp;<span class="pd-prop">features</span><span class="pd-punct">:</span> [${featuresArrayStr}],<br>
              ${project.stars ? `&nbsp;&nbsp;<span class="pd-prop">stars</span><span class="pd-punct">:</span> <span class="pd-num">${project.stars}</span>,<br>` : ''}
              ${project.hackathon ? `&nbsp;&nbsp;<span class="pd-prop">hackathon</span><span class="pd-punct">:</span> <span class="pd-string">"${project.hackathon}"</span>,<br>` : ''}
              };
            </div>

            <div class="detail-tags-section">
              <span class="pd-comment">// tech stack</span>
              <div class="detail-tags">${techTags}</div>
            </div>

            <div class="detail-tags-section">
              <span class="pd-comment">// key features</span>
              <div class="detail-tags">${featureTags}</div>
            </div>

            <div class="detail-links">
              ${project.links.live ? `<a href="${project.links.live}" target="_blank" rel="noopener" class="btn btn--primary">Live Demo →</a>` : ''}
              ${project.links.github ? `<a href="${project.links.github}" target="_blank" rel="noopener" class="btn btn--ghost">Source Code →</a>` : ''}
            </div>

          </div>

          <!-- Right: live preview iframe -->
          ${previewHTML}

        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.classList.add('project-detail-overlay--visible');
    (overlay.querySelector<HTMLElement>('.detail-panel'))?.focus();
  });

  document.getElementById('detail-close-btn')?.addEventListener('click', closeProjectDetail);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeProjectDetail();
  });

  const escHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeProjectDetail();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

export function closeProjectDetail(): void {
  const overlay = document.getElementById('project-detail-overlay');
  if (!overlay) return;
  overlay.classList.remove('project-detail-overlay--visible');
  setTimeout(() => overlay.remove(), 350);
}
