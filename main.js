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

/* Demo de la portada: reservar una hora la marca en la cara pública
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
      ? `Reservaste el martes 3 a las ${elegida}. Ya está en la agenda privada y nadie más puede tomarla.`
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

/* Formulario de contacto: arma el correo y abre el programa de correo del visitante */
function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const msgEl = form.querySelector('[data-form-msg]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const datos = new FormData(form);
    const nombre = String(datos.get('nombre') || '').trim();
    const correo = String(datos.get('correo') || '').trim();
    const mensaje = String(datos.get('mensaje') || '').trim();

    const asunto = `Contacto desde pancmdev.cl: ${nombre}`;
    const cuerpo = `${mensaje}\n\n${nombre}\n${correo}`;
    window.location.href = `mailto:contacto@pancmdev.cl?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

    msgEl.textContent = 'Se abrió tu programa de correo con el mensaje listo para enviar. Si no se abrió, escríbenos a contacto@pancmdev.cl.';
  });
}

/* Formulario de cotización: lo envía a cotizar.php sin salir de la página.
   Sin JS se envía igual y cotizar.php responde con una página propia. */
function initQuoteForm() {
  const form = document.querySelector('[data-quote-form]');
  if (!form) return;

  /* "Otros": escribir en el campo marca la casilla, y marcarla lleva al campo */
  const otros = form.querySelector('[data-otros]');
  const otrosTexto = form.querySelector('[data-otros-texto]');
  if (otros && otrosTexto) {
    otrosTexto.addEventListener('input', () => { otros.checked = otrosTexto.value.trim() !== ''; });
    otros.addEventListener('change', () => { if (otros.checked) otrosTexto.focus(); });
  }

  if (!window.fetch) return;
  const msgEl = form.querySelector('[data-form-msg]');
  const boton = form.querySelector('button[type="submit"]');

  const mostrar = (tipo, texto) => {
    msgEl.className = `form-msg ${tipo}`;
    msgEl.textContent = texto;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    boton.disabled = true;
    mostrar('', 'Enviando…');

    let datos = null;
    try {
      const resp = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      try { datos = await resp.json(); } catch (err) {}
      if (resp.ok && datos && datos.ok) {
        form.reset();
        mostrar('ok', 'Listo, recibimos tu solicitud. Te respondemos en 48 horas al correo que nos dejaste.');
        return;
      }
    } catch (err) {}
    finally {
      boton.disabled = false;
    }

    const motivo = (datos && datos.error) || 'No pudimos enviar el formulario.';
    mostrar('error', `${motivo} Si sigue fallando, escríbenos a contacto@pancmdev.cl.`);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRail();
  initReveal();
  initDemo();
  initContactForm();
  initQuoteForm();
});
