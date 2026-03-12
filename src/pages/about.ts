import { skillIconMap } from '../components/SkillIcons';

export function renderAbout(data: any): string {
  const skillIcons: Record<string, string> = {
    'languages': '⟨⟩',
    'frontend': '◆',
    'backend': '⚙',
    'databases': '⬙',
    'ai / ml': '◯',
    'devops': '⚡',
    'web3': '₿',
    'security': '🔒',
    'photography & cinematography': '📹'
  };

  const experienceHTML = data.experience.map((exp: any, i: number) => `
    <div class="timeline__item" style="transition-delay: ${i * 0.1}s">
      <div class="timeline__header">
        <span class="timeline__role">${exp.role}</span>
        <span class="timeline__at">@</span>
        <span class="timeline__company">${exp.company}</span>
        <span class="timeline__period">${exp.period}</span>
      </div>
      <p class="timeline__desc">${exp.description}</p>
    </div>
  `).join('');

  const venturesHTML = data.ventures.map((v: any, i: number) => `
    <div class="venture-card" style="transition-delay: ${i * 0.08}s">
      <div class="venture-card__status venture-card__status--${v.status}">
        ${v.status === 'current' ? 'Active' : v.period}
      </div>
      <div class="venture-card__name">${v.name}</div>
      <div class="venture-card__role">${v.role} ${v.status === 'current' ? '· ' + v.period : ''}</div>
      <p class="venture-card__desc">${v.description}</p>
    </div>
  `).join('');

  const skillCategories = Object.entries(data.skills).map(([category, skills], i) => {
    const tags = (skills as string[]).map(s => {
      const icon = skillIconMap[s] || '';
      return `
        <span class="skill-tag">
          ${icon ? `<span class="skill-tag__icon">${icon}</span>` : ''}
          <span class="skill-tag__text">${s}</span>
        </span>
      `;
    }).join('');
    const icon = skillIcons[category] || '•';
    return `
      <div class="skills-category" style="transition-delay: ${i * 0.08}s">
        <div class="skills-category__label">
          <span class="skills-category__icon">${icon}</span>
          ${category}
        </div>
        <div class="skill-tags">${tags}</div>
      </div>
    `;
  }).join('');

  return `
    <div class="about-section">
      <div class="section-header">
        <h1 class="section-header__title">About</h1>
        <p class="section-header__subtitle">// background, experience, and skills</p>
      </div>

      <div class="section-comment">/**</div>
      <p class="about-text">${data.profile.bio}</p>
      <div class="section-comment" style="margin-bottom: 32px;"> */</div>

      <div class="code-block">
        <span class="keyword">const</span> <span class="variable">education</span> = {
        <br>&nbsp;&nbsp;<span class="property">degree</span>: <span class="string">"${data.education.degree}"</span>,
        <br>&nbsp;&nbsp;<span class="property">university</span>: <span class="string">"${data.education.university}"</span>,
        <br>&nbsp;&nbsp;<span class="property">period</span>: <span class="string">"${data.education.period}"</span>,
        <br>&nbsp;&nbsp;<span class="property">status</span>: <span class="string">"${data.education.status}"</span>
        <br>};
      </div>

      <div class="section-header" style="margin-bottom: 20px;">
        <h2 class="section-header__title" style="font-size: 1.4rem;">Ventures</h2>
        <p class="section-header__subtitle">// entrepreneurship journey</p>
      </div>
      <div class="ventures">
        ${venturesHTML}
      </div>

      <div class="section-header" style="margin-bottom: 20px;">
        <h2 class="section-header__title" style="font-size: 1.4rem;">Experience</h2>
        <p class="section-header__subtitle">// professional journey</p>
      </div>
      <div class="timeline">
        ${experienceHTML}
      </div>

      <div class="section-header" style="margin-bottom: 20px;">
        <h2 class="section-header__title" style="font-size: 1.4rem;">Skills</h2>
        <p class="section-header__subtitle">// technical toolkit + creative expertise</p>
      </div>
      <div class="skills-section">
        ${skillCategories}
      </div>
    </div>
  `;
}
