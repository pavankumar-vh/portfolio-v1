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
  `;
}
