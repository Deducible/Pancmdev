/* Se ejecuta antes de pintar la página para que no parpadee el tema.
   Orden: preferencia guardada, luego la del sistema, luego claro. */
(function () {
  var root = document.documentElement;
  var tema = null;
  try { tema = localStorage.getItem('pancm-tema'); } catch (e) {}
  if (tema !== 'light' && tema !== 'dark') {
    tema = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  root.setAttribute('data-theme', tema);
  root.classList.add('js');
})();
