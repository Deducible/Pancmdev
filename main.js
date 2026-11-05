const MIEMBROS = [
  {
    id: 0,
    nombre: 'Héctor Olivares Rifo',
    foto: 'src/assets/hector-olivares.webp',
    rol: 'Web y Software Developer',
    bio: 'Ingeniero en Computación e Informática (UNAB). En el Centro de Psicología Clínica se encargó del desarrollo front-end.',
    correo: 'h.olivaresrifo@gmail.com',
    ubicacion: 'Santiago, Chile',
    ingles: 'Inglés intermedio alto (B2)',
    disponibilidad: 'Disponible para trabajos',
    linkedin: 'https://www.linkedin.com/in/h%C3%A9ctor-enrique-olivares-rifo/',
    linkedinLabel: 'linkedin.com/in/héctor-enrique-olivares-rifo',
    aporte: 'Desarrollo front-end.',
    stack: ['React', 'TypeScript', 'Node.js', 'Electron', 'WebSockets', 'Tailwind', 'PHP', 'Excel', 'Power BI'],
    experiencia: [
      { anio: '2026', titulo: 'Centro de Psicología Clínica', detalle: 'Front-end developer con React/Vite/Tailwind, Diseñador UI/UX.' },
      { anio: '2026', titulo: 'I Wanna Coop', detalle: 'Proyecto personal. App de escritorio en Electron y Node.js para jugar fangames en cooperativo o carrera online: lectura de memoria del juego, servidor relay con WebSockets y overlay de jugadores.' },
      { anio: 'Oct—Dic 2025', titulo: 'Superintendencia de Pensiones', detalle: 'Practicante como analista de datos, dashboards en Power BI, código DAX, Python, Excel y Word.' },
      { anio: 'Abr—Jun 2024', titulo: 'Club Providencia', detalle: 'Practicante como analista de base de datos. Manejo de bases de datos SQL, MySQL Workbench, TablePlus, Scripts con PHP.' }
    ]
  },
  {
    id: 1,
    nombre: 'Bastián Orellana',
    foto: 'src/assets/bastian-orellana.png',
    rol: 'Desarrollo full-stack',
    bio: 'Ingeniero en Informática (DUOC UC). Construyó el frontend y la API del Centro de Psicología Clínica, y se encargó de seguridad, autenticación y el pipeline de despliegue.',
    correo: 'b.orellana.cv@gmail.com',
    ubicacion: 'Puente Alto, Santiago',
    disponibilidad: 'Disponible para trabajos',
    linkedin: 'https://www.linkedin.com/in/bastianorellanac',
    linkedinLabel: 'linkedin.com/in/bastianorellanac',
    aporte: 'Frontend en React, API en Express/Prisma, autenticación con JWT y 2FA, y CI/CD con GitHub Actions.',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'JWT', 'GitHub Actions'],
    experiencia: [
      { anio: '2026', titulo: 'Centro de Psicología Clínica', detalle: 'Frontend en React/Vite/Tailwind, API REST con Express y Prisma, JWT + verificación en dos pasos, CI/CD con GitHub Actions y migración a Neon.' },
      { anio: 'Jul—Dic 2024', titulo: 'IGN.Tattoo', detalle: 'Proyecto de título: app móvil (React Native/Expo) y plataforma web para estudios de tatuajes, con API en Node/Express sobre PostgreSQL.' },
      { anio: 'Dic 2024—Feb 2025', titulo: 'Aplicaciones Computacionales SPA (ACL TI)', detalle: 'Práctica full-stack: dashboards con Next.js y Prisma, documentación de API con Swagger.' }
    ]
  },
  {
    id: 2,
    nombre: 'Tomás González',
    rol: 'Desarrollo full-stack',
    bio: 'Ingeniero en Informática con Especialización de "Ciencia de Datos" (DUOC UC)',
    correo: 'tomas.gonzalezr04@gmail.com',
    ubicacion: 'Santiago, Chile',
    ingles: 'Inglés intermedio alto (B2)',
    disponibilidad: 'Disponible para trabajos',
    linkedin: 'https://www.linkedin.com/in/tomás-gonzález-rodríguez-063511252',
    linkedinLabel: 'linkedin.com/in/tomás-gonzález-rodríguez-063511252',
    aporte: 'Desarrollo full-stack.',
    stack: ['React', 'Node.js', 'TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'Python', 'Tailwind', 'Angular', 'Ionic', 'Git'],
    experiencia: [
      { anio: '2026', titulo: 'CRM Clinico', detalle: 'Frontend en React/Vite/Tailwind, API REST con Express y Prisma, JWT + verificación 2FA, almacenamiento de documentos en Cloudflare R2, CI/CD con GitHub Actions y PostgreSQL en Neon.' },
      { anio: 'Dic 2025—Feb2026', titulo: 'Rymak', detalle: 'Práctica analista de datos: Dashboards e informes con Power BI y Excel.' }
    ]
  }
];

const PROYECTOS = [
  { anio: '2026', nombre: 'Centro de Psicología Clínica', estado: 'Demo en línea', resumen: 'Sitio público con reserva de horas, portal del paciente y panel del profesional. La demo usa datos ficticios.', href: 'proyecto.html' },
  { anio: '2026', nombre: 'Próximo encargo', estado: 'En preparación', resumen: 'Espacio reservado para el siguiente proyecto del grupo.', href: 'proyecto.html' }
];

function avatarMarkup(m, cls) {
  return m.foto
    ? `<img class="${cls}" src="${m.foto}" alt="${m.nombre}" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'pin'}))" />`
    : `<div class="pin"></div>`;
}

function renderMemberGrid(container) {
  if (!container) return;
  container.classList.add('member-grid');
  container.innerHTML = MIEMBROS.map((m) => `
    <a class="member-card" href="perfil.html?id=${m.id}">
      <div class="who">
        ${avatarMarkup(m, 'avatar')}
        <div class="name">${m.nombre}</div>
      </div>
      <div class="role">${m.rol}</div>
      <div class="link">Ver perfil →</div>
    </a>
  `).join('');
}

function renderTeamList(container) {
  if (!container) return;
  container.innerHTML = MIEMBROS.map((m) => `
    <a class="team-row" href="perfil.html?id=${m.id}">
      ${avatarMarkup(m, 'avatar')}
      <span>
        <span class="nombre">${m.nombre}</span>
        <span class="rol">${m.rol}</span>
      </span>
      <span class="link">Ver perfil →</span>
    </a>
  `).join('');
}

function renderProjectList(container) {
  if (!container) return;
  container.innerHTML = PROYECTOS.map((p) => `
    <a class="list-row" href="${p.href}">
      <span class="anio">${p.anio}</span>
      <span>
        <span class="nombre">${p.nombre}</span>
        <span class="resumen">${p.resumen}</span>
      </span>
      <span class="estado">${p.estado}</span>
    </a>
  `).join('');
}

function renderProfile() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id') || 0);
  const m = MIEMBROS.find((x) => x.id === id) || MIEMBROS[0];

  const avatarEl = document.querySelector('[data-profile-avatar]');
  if (avatarEl) {
    if (m.foto) {
      avatarEl.src = m.foto;
      avatarEl.alt = m.nombre;
      avatarEl.style.display = '';
      avatarEl.onerror = () => { avatarEl.style.display = 'none'; };
    } else {
      avatarEl.style.display = 'none';
    }
  }

  const set = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  };

  set('[data-profile-nombre]', m.nombre);
  set('[data-profile-rol]', `${m.rol} · PanCMdev`);
  set('[data-profile-bio]', m.bio);

  const expEl = document.querySelector('[data-profile-experiencia]');
  if (expEl) {
    expEl.innerHTML = m.experiencia.map((e) => `
      <div class="exp-row">
        <span class="year">${e.anio}</span>
        <span>
          <span class="titulo">${e.titulo}</span>
          <span class="detalle">${e.detalle}</span>
        </span>
      </div>
    `).join('');
  }

  const stackEl = document.querySelector('[data-profile-stack]');
  if (stackEl) {
    stackEl.innerHTML = m.stack.map((s) => `<span>${s}</span>`).join('');
  }

  const datosEl = document.querySelector('[data-profile-datos]');
  if (datosEl) {
    datosEl.innerHTML = [m.correo, m.ubicacion, m.ingles, m.disponibilidad].filter(Boolean).join('<br />');
  }

  const linkedinEl = document.querySelector('[data-profile-linkedin]');
  if (linkedinEl) {
    if (m.linkedin) {
      linkedinEl.href = m.linkedin;
      linkedinEl.textContent = m.linkedinLabel;
      linkedinEl.style.display = '';
    } else {
      linkedinEl.style.display = 'none';
    }
  }

  set('[data-profile-aporte]', m.aporte);
}

/* Tema claro / oscuro: theme.js aplica el inicial, aquí se alterna y se guarda */
function initTheme() {
  const root = document.documentElement;
  const botones = document.querySelectorAll('[data-theme-toggle]');

  const reflejar = () => {
    const oscuro = root.getAttribute('data-theme') === 'dark';
    botones.forEach((b) => b.setAttribute('aria-label', oscuro ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'));
  };

  botones.forEach((b) => b.addEventListener('click', () => {
    const siguiente = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.classList.add('theme-anim');
    root.setAttribute('data-theme', siguiente);
    try { localStorage.setItem('pancm-tema', siguiente); } catch (e) {}
    reflejar();
    window.setTimeout(() => root.classList.remove('theme-anim'), 350);
  }));

  reflejar();
}

/* Riel bajo el encabezado: avanza con el scroll y termina en el nodo azul del logo */
function initRail() {
  const header = document.querySelector('header.site');
  if (!header) return;
  let pendiente = false;

  const actualizar = () => {
    pendiente = false;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const p = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
    header.style.setProperty('--p', p.toFixed(4));
  };

  window.addEventListener('scroll', () => {
    if (!pendiente) {
      pendiente = true;
      window.requestAnimationFrame(actualizar);
    }
  }, { passive: true });
  window.addEventListener('resize', actualizar);
  actualizar();
}

/* Las secciones aparecen una vez, al entrar en pantalla */
function initReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((el) => obs.observe(el));
}

/* Demo de la portada: reservar una hora la quita de la cara pública
   y la muestra en la agenda privada */
function initDemo() {
  const demo = document.querySelector('[data-demo]');
  if (!demo) return;

  const libres = ['10:00', '11:00', '15:00', '16:00'];
  const ocupadas = { '09:00': 'Paciente · confirmada', '12:00': 'Paciente · confirmada' };
  const horas = ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00'];
  let elegida = null;

  const slotsEl = demo.querySelector('[data-slots]');
  const agendaEl = demo.querySelector('[data-agenda]');
  const msgEl = demo.querySelector('[data-msg]');
  const resetEl = demo.querySelector('[data-reset]');

  const pintar = () => {
    slotsEl.innerHTML = libres.map((h) =>
      `<button type="button" class="slot" data-hora="${h}" aria-pressed="${elegida === h}">${h}</button>`
    ).join('');

    agendaEl.innerHTML = horas.map((h) => {
      if (h === elegida) return `<div class="agenda-row is-new"><span class="hora">${h}</span><span>Reserva nueva · por confirmar</span></div>`;
      if (ocupadas[h]) return `<div class="agenda-row is-taken"><span class="hora">${h}</span><span>${ocupadas[h]}</span></div>`;
      return `<div class="agenda-row is-free"><span class="hora">${h}</span><span>Libre</span></div>`;
    }).join('');

    msgEl.textContent = elegida
      ? `Reservaste el martes 3 a las ${elegida}. Esa hora ya no aparece disponible para nadie más.`
      : 'Elige un horario y mira cómo aparece al otro lado.';
    resetEl.hidden = elegida === null;
  };

  slotsEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-hora]');
    if (!b) return;
    elegida = b.dataset.hora;
    pintar();
    const activo = slotsEl.querySelector(`[data-hora="${elegida}"]`);
    if (activo) activo.focus();
  });

  resetEl.addEventListener('click', () => {
    elegida = null;
    pintar();
  });

  pintar();
}

document.addEventListener('DOMContentLoaded', () => {
  renderMemberGrid(document.querySelector('[data-member-grid]'));
  renderTeamList(document.querySelector('[data-team-list]'));
  renderProjectList(document.querySelector('[data-project-list]'));
  renderProfile();
  initTheme();
  initRail();
  initReveal();
  initDemo();
});
