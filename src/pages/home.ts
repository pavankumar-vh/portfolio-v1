import { generateAsciiArt } from '../components/AsciiBackground';

export function renderHome(data: any): string {
  const ascii = generateAsciiArt();

  return `
    <div class="hero">
      <div class="ascii-bg">${ascii}</div>

      <div class="hero__subtitle">
        <span class="comment-slashes">//</span> ${data.profile.title}
      </div>

      <h1 class="hero__name">
        <em>Pavan Kumar</em> <span class="hero__vh">VH</span>
      </h1>

      <div class="hero__tagline">
        <span class="kw">const</span> <span class="var">tagline</span> = <span class="str">"${data.profile.tagline}"</span>;
      </div>

      <div class="hero__cta">
        <a href="#projects" class="btn btn--primary">
          View Projects
        </a>
        <a href="mailto:${data.profile.email}" class="btn btn--ghost">
          Get in Touch
        </a>
      </div>
    </div>

    <!-- Current Venture Section -->
    <div class="current-venture">
      <div class="current-venture__label">
        <span class="pd-comment">// building</span>
      </div>
      <div class="current-venture__card">
        <div class="current-venture__header">
          <h2 class="current-venture__name">${data.ventures[0].name}</h2>
          <span class="current-venture__badge current-venture__badge--active">Active</span>
        </div>
        <div class="current-venture__role">
          <span class="pd-kw">const</span> <span class="pd-var">role</span> = <span class="pd-string">"${data.ventures[0].role}"</span>;
        </div>
        <p class="current-venture__desc">${data.ventures[0].description}</p>
        <div class="current-venture__meta">
          <span class="current-venture__period">${data.ventures[0].period}</span>
        </div>
      </div>
    </div>
  `;
}
