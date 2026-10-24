const MIEMBROS = [
  {
    id: 0,
    nombre: 'Héctor Olivares Rifo',
    foto: 'src/assets/hector-olivares.webp',
    rol: 'Web y Software Developer',
    bio: 'Ingeniero en Computación e Informática (UNAB). En Psicología con Bel se encargó del desarrollo front-end.',
    correo: 'h.olivaresrifo@gmail.com',
    ubicacion: 'Santiago, Chile',
    ingles: 'Inglés intermedio alto (B2)',
    disponibilidad: 'Disponible para trabajos',
    linkedin: 'https://www.linkedin.com/in/h%C3%A9ctor-enrique-olivares-rifo/',
    linkedinLabel: 'linkedin.com/in/héctor-enrique-olivares-rifo',
    aporte: 'Desarrollo front-end.',
    stack: ['React', 'TypeScript', 'Node.js', 'Electron', 'WebSockets', 'Tailwind', 'PHP', 'Excel', 'Power BI'],
    experiencia: [
      { anio: '2026', titulo: 'Psicología con Bel', detalle: 'Front-end developer con React/Vite/Tailwind, Diseñador UI/UX.' },
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
    bio: 'Ingeniero en Informática (DUOC UC). Construyó el frontend y la API de Psicología con Bel, y se encargó de seguridad, autenticación y el pipeline de despliegue.',
    correo: 'b.orellana.cv@gmail.com',
    ubicacion: 'Puente Alto, Santiago',
    disponibilidad: 'Disponible para trabajos',
    linkedin: 'https://www.linkedin.com/in/bastianorellanac',
    linkedinLabel: 'linkedin.com/in/bastianorellanac',
    aporte: 'Frontend en React, API en Express/Prisma, autenticación con JWT y 2FA, y CI/CD con GitHub Actions.',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'JWT', 'GitHub Actions'],
    experiencia: [
      { anio: '2026', titulo: 'Psicología con Bel', detalle: 'Frontend en React/Vite/Tailwind, API REST con Express y Prisma, JWT + verificación en dos pasos, CI/CD con GitHub Actions y migración a Neon.' },
      { anio: 'Jul—Dic 2024', titulo: 'IGN.Tattoo', detalle: 'Proyecto de título: app móvil (React Native/Expo) y plataforma web para estudios de tatuajes, con API en Node/Express sobre PostgreSQL.' },
      { anio: 'Dic 2024—Feb 2025', titulo: 'Aplicaciones Computacionales SPA (ACL TI)', detalle: 'Práctica full-stack: dashboards con Next.js y Prisma, documentación de API con Swagger.' }
    ]
  },
  {
    id: 2,
    nombre: '[Nombre 03]',
    rol: 'Diseño de producto',
    bio: 'Define qué necesita el proyecto antes de programarlo: conversaciones con el cliente, flujos y pantallas.',
    correo: 'nombre03@pancm.cl',
    ubicacion: 'Santiago, Chile',
    disponibilidad: 'Disponible para trabajos',
    aporte: 'Investigación con la clienta y diseño de pantallas.',
    stack: ['Figma', 'Prototipado', 'Investigación', 'React', 'Tailwind'],
    experiencia: [
      { anio: '2026', titulo: 'Psicología con Bel', detalle: 'Definición del flujo y diseño de las pantallas.' },
      { anio: '2023—2025', titulo: '[Estudios o trabajo previo]', detalle: 'Reemplaza esto con tu experiencia real.' }
    ]
  }
];

const PROYECTOS = [
  { anio: '2026', nombre: 'Psicología con Bel', estado: 'En producción', resumen: 'Reserva de horas para pacientes y panel privado de agenda para la profesional.', href: 'proyecto.html' },
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
  set('[data-profile-rol]', `${m.rol} · PanCM`);
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

document.addEventListener('DOMContentLoaded', () => {
  renderMemberGrid(document.querySelector('[data-member-grid]'));
  renderTeamList(document.querySelector('[data-team-list]'));
  renderProjectList(document.querySelector('[data-project-list]'));
  renderProfile();
});
