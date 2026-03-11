export function renderProjects(data: any): string {
  const projectCards = data.projects.map((project: any, i: number) => {
    const techTags = project.tech.map((t: string) => `<span class="project-card__tech-tag">${t}</span>`).join('');
    const featureTags = project.features.map((f: string) => `<span class="project-card__feature">${f}</span>`).join('');

    const links: string[] = [];
    if (project.links.live) {
      links.push(`<a href="${project.links.live}" target="_blank" rel="noopener" class="project-card__link">
        Live Demo →
      </a>`);
    }
    if (project.links.github) {
      links.push(`<a href="${project.links.github}" target="_blank" rel="noopener" class="project-card__link">
        Source Code →
      </a>`);
    }

    const starsHTML = project.stars ? `
      <span class="project-card__stars">
        ★ ${project.stars}
      </span>
    ` : '';

    const badgeHTML = project.hackathon
      ? `<span class="project-card__badge">${project.hackathon}</span>`
      : '';

    // Live preview iframe (only for projects with a live URL)
    const previewHTML = project.links.live ? `
      <div class="project-card__preview">
        <iframe src="${project.links.live}" loading="lazy" sandbox="allow-scripts allow-same-origin" tabindex="-1" aria-hidden="true"></iframe>
        <div class="project-card__preview-label">
          <span class="project-card__preview-name">${project.name}</span>
          <span class="project-card__preview-url">${project.links.live.replace('https://', '')}</span>
        </div>
      </div>
    ` : '';

    return `
      <article class="project-card" style="transition-delay: ${i * 0.06}s">
        ${previewHTML}
        <div class="project-card__header">
          <h3 class="project-card__name">${project.name}</h3>
          <div style="display: flex; align-items: center; gap: 8px;">
            ${badgeHTML}
            ${starsHTML}
          </div>
        </div>
        <p class="project-card__tagline">${project.tagline}</p>
        <p class="project-card__desc">${project.description}</p>
        <div class="project-card__features">${featureTags}</div>
        <div class="project-card__tech">${techTags}</div>
        ${links.length > 0 ? `<div class="project-card__links">${links.join('')}</div>` : ''}
      </article>
    `;
  }).join('');

  return `
    <div class="projects-section">
      <div class="section-header">
        <h1 class="section-header__title">Projects</h1>
        <p class="section-header__subtitle">// things I've built and shipped</p>
      </div>

      <div class="projects-grid">
        ${projectCards}
      </div>
    </div>
  `;
}
