export function renderContact(data: any): string {
  return `
    <div class="contact-section">
      <div class="section-header">
        <h1 class="section-header__title">Contact</h1>
        <p class="section-header__subtitle">// let's connect</p>
      </div>

      <div class="terminal">
        <div class="terminal__header">
          <span class="terminal__dot terminal__dot--red"></span>
          <span class="terminal__dot terminal__dot--yellow"></span>
          <span class="terminal__dot terminal__dot--green"></span>
          <span class="terminal__title">pavan@portfolio ~</span>
        </div>
        <div class="terminal__body">
          <div class="terminal__line" style="animation-delay: 0s">
            <span class="terminal__prompt">$ </span>
            <span class="terminal__command">whoami</span>
          </div>
          <div class="terminal__line" style="animation-delay: 0.15s">
            <span class="terminal__output">${data.profile.name}</span>
          </div>

          <div class="terminal__line" style="animation-delay: 0.3s">&nbsp;</div>

          <div class="terminal__line" style="animation-delay: 0.4s">
            <span class="terminal__prompt">$ </span>
            <span class="terminal__command">cat contact.json</span>
          </div>
          <div class="terminal__line" style="animation-delay: 0.55s">
            <span class="terminal__output">{</span>
          </div>
          <div class="terminal__line" style="animation-delay: 0.65s">
            <span class="terminal__output">&nbsp;&nbsp;<span class="terminal__key">"email"</span>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="terminal__val"><a href="mailto:${data.profile.email}" class="terminal__link">"${data.profile.email}"</a></span>,</span>
          </div>
          <div class="terminal__line" style="animation-delay: 0.75s">
            <span class="terminal__output">&nbsp;&nbsp;<span class="terminal__key">"github"</span>:&nbsp;&nbsp;&nbsp;&nbsp;<span class="terminal__val"><a href="${data.profile.github}" target="_blank" rel="noopener" class="terminal__link">"pavankumar-vh"</a></span>,</span>
          </div>
          <div class="terminal__line" style="animation-delay: 0.85s">
            <span class="terminal__output">&nbsp;&nbsp;<span class="terminal__key">"linkedin"</span>:&nbsp;&nbsp;<span class="terminal__val"><a href="${data.profile.linkedin}" target="_blank" rel="noopener" class="terminal__link">"pavankumarvh"</a></span>,</span>
          </div>
          <div class="terminal__line" style="animation-delay: 0.95s">
            <span class="terminal__output">&nbsp;&nbsp;<span class="terminal__key">"instagram"</span>: <span class="terminal__val"><a href="${data.profile.instagram}" target="_blank" rel="noopener" class="terminal__link">"@volt.json"</a></span>,</span>
          </div>
          <div class="terminal__line" style="animation-delay: 1.05s">
            <span class="terminal__output">&nbsp;&nbsp;<span class="terminal__key">"location"</span>:&nbsp;&nbsp;<span class="terminal__val">"${data.profile.location}"</span></span>
          </div>
          <div class="terminal__line" style="animation-delay: 1.15s">
            <span class="terminal__output">}</span>
          </div>

          <div class="terminal__line" style="animation-delay: 1.3s">&nbsp;</div>

          <div class="terminal__line" style="animation-delay: 1.45s">
            <span class="terminal__prompt">$ </span>
            <span class="terminal__cursor"></span>
          </div>
        </div>
      </div>

      <div class="contact-cta">
        <p class="contact-cta__text">
          I'm open to interesting conversations and collaborations. Whether you're looking 
          for a developer, have a project idea, or want to connect — feel free to reach out.
        </p>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <a href="mailto:${data.profile.email}" class="btn btn--primary">Send Email</a>
          <a href="${data.profile.github}" target="_blank" rel="noopener" class="btn btn--ghost">GitHub</a>
          <a href="${data.profile.linkedin}" target="_blank" rel="noopener" class="btn btn--ghost">LinkedIn</a>
        </div>
      </div>
    </div>
  `;
}
