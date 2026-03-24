export function renderProjects(data: any): string {
  const projects = data.projects;

  // --- Filter categories ---
  const liveCount = projects.filter((p: any) => p.status === 'Live').length;
  const ossCount = projects.filter((p: any) => p.status === 'Open Source').length;
  const hackathonCount = projects.filter((p: any) => p.hackathon).length;
  const filters = [
    { id: 'all', label: 'All', count: projects.length },
    { id: 'live', label: 'Live', count: liveCount },
    { id: 'open-source', label: 'Open Source', count: ossCount },
    { id: 'hackathon', label: 'Hackathon', count: hackathonCount },
  ];

  // --- Status color map ---
  const statusDotClass = (project: any): string => {
    if (project.hackathon) return 'status-dot--hackathon';
    switch (project.status) {
      case 'Live': return 'status-dot--live';
      case 'Open Source': return 'status-dot--oss';
      case 'Private': return 'status-dot--private';
      default: return '';
    }
  };

  // --- Render card ---
  const renderCard = (project: any, i: number, isFeatured: boolean) => {
    const techLine = project.tech.slice(0, isFeatured ? 7 : 5).join(' · ');

    const links: string[] = [];
    if (project.links.live) {
      links.push(`<a href="${project.links.live}" target="_blank" rel="noopener" class="project-card__link">
        <span class="project-card__link-label">Live</span><span class="project-card__link-arrow">↗</span>
      </a>`);
    }
    if (project.links.github) {
      links.push(`<a href="${project.links.github}" target="_blank" rel="noopener" class="project-card__link">
        <span class="project-card__link-label">Source</span><span class="project-card__link-arrow">↗</span>
      </a>`);
    }

    const statusLabel = project.hackathon || project.status;
    const previewDataAttr = project.links.live ? `data-preview-url="${project.links.live}" data-preview-name="${project.name}"` : '';

    // Determine filter category for data attribute
    let category = 'all';
    if (project.hackathon) category = 'hackathon';
    else if (project.status === 'Live') category = 'live';
    else if (project.status === 'Open Source') category = 'open-source';
    else if (project.status === 'Private') category = 'private';

    // Extract GitHub owner/repo for live star fetch
    const githubRepo = project.links.github
      ? project.links.github.replace('https://github.com/', '')
      : '';

    const starsHTML = githubRepo
      ? `<span class="project-card__stars" data-github-repo="${githubRepo}">★ <span class="project-card__stars-count">–</span></span>`
      : '';

    const featuredFeatures = isFeatured && project.features?.length
      ? `<div class="project-card__highlights">${project.features.map((f: string) => `<span class="project-card__highlight">${f}</span>`).join('')}</div>`
      : '';

    const featuredTerminalHeader = isFeatured
      ? `<div class="project-card__terminal-header">
           <span class="project-card__terminal-dot project-card__terminal-dot--red"></span>
           <span class="project-card__terminal-dot project-card__terminal-dot--yellow"></span>
           <span class="project-card__terminal-dot project-card__terminal-dot--green"></span>
           <span class="project-card__terminal-title">${project.tagline || ''}</span>
         </div>`
      : '';

    return `
      <article class="project-card${isFeatured ? ' project-card--featured' : ''} project-card--clickable"
        style="transition-delay: ${i * 0.06}s"
        ${previewDataAttr}
        data-project-index="${i}"
        data-category="${category}"
        role="button" tabindex="0"
        aria-label="Open ${project.name} details">
        ${featuredTerminalHeader}
        <div class="project-card__top">
          <div class="project-card__meta">
            <span class="project-card__index">${String(i + 1).padStart(2, '0')}</span>
            <span class="project-card__status-badge">
              <span class="status-dot ${statusDotClass(project)}"></span>
              ${statusLabel}
            </span>
          </div>
          <div class="project-card__top-right">
            ${starsHTML}
            ${links.length > 0 ? `<div class="project-card__links">${links.join('')}</div>` : ''}
          </div>
        </div>
        <h3 class="project-card__name">${project.name}</h3>
        <p class="project-card__desc">${project.description}</p>
        ${featuredFeatures}
        <div class="project-card__footer">
          <span class="project-card__tech">${techLine}</span>
          <span class="project-card__year">${project.year}</span>
        </div>
      </article>
    `;
  };

  const featured = projects[0];
  const rest = projects.slice(1);

  const featuredCard = renderCard(featured, 0, true);
  const restCards = rest.map((p: any, i: number) => renderCard(p, i + 1, false)).join('');

  return `
    <div class="projects-section">
      <div class="section-header">
        <h1 class="section-header__title">Projects</h1>
        <p class="section-header__subtitle">// selected work · ${projects.length} entries</p>
      </div>

      <!-- Filters -->
      <div class="projects-filters">
        <span class="projects-filters__prompt">~/projects $</span>
        <div class="projects-filters__tabs">
          ${filters.map(f => `
            <button class="projects-filter${f.id === 'all' ? ' projects-filter--active' : ''}" data-filter="${f.id}">
              ${f.label}<span class="projects-filter__count">${f.count}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Featured -->
      <div class="projects-featured">
        ${featuredCard}
      </div>

      <!-- Grid -->
      <div class="projects-grid">
        ${restCards}
      </div>
    </div>
  `;
}
