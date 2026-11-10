# PanCMdev · sitio web

Sitio de [pancmdev.cl](https://pancmdev.cl): HTML, CSS y JavaScript sin paso de compilación, publicado en un hosting cPanel (LiteSpeed).

## Estructura

| Archivo o carpeta | Qué es |
|---|---|
| `*.html` | Una página por archivo: portada, servicios, proyectos, `proyecto.html` (la demo), equipo, `nosotros.html` (metodología), contacto, los 3 perfiles y `404.html` |
| `styles.css` | Estilos de todo el sitio, con los colores del tema claro y oscuro en variables |
| `tech.css` | Insignias del stack de los perfiles (íconos de [Simple Icons](https://simpleicons.org), CC0, embebidos) |
| `theme.js` | Aplica el tema antes de pintar la página, para que no parpadee |
| `main.js` | Cambio de tema, barra de avance, animaciones, demo de la portada y formularios |
| `cotizar.php` | Recibe el formulario de `servicios.html` y lo manda a contacto@pancmdev.cl |
| `src/assets/` | Imágenes. `clientes/`: logos de la experiencia. `og-*.png`: imágenes para redes sociales |
| `src/fonts/` | Manrope y JetBrains Mono (licencia SIL OFL) |
| `cv/` | CV en PDF de los integrantes |
| `.htaccess` | Redirección a https sin www, cabeceras de seguridad, caché y página 404 |
| `sitemap.xml`, `robots.txt` | Para buscadores |

## Ver el sitio en local

```
python -m http.server 8765
```

Y abrir http://127.0.0.1:8765. Para probar también el formulario hace falta PHP:

```
php -S 127.0.0.1:8765 -d SMTP=127.0.0.1 -d smtp_port=2525
```

En Windows, `mail()` necesita un servidor SMTP. Para no mandar correos reales, se levanta uno de prueba en el puerto 2525 que guarde los mensajes en archivos. `.htaccess` no se aplica en local: las redirecciones y las cabeceras solo existen en el servidor.

## Flujo de trabajo

1. Rama nueva desde `develop`.
2. PR a `develop`.
3. PR de `develop` a `main`: **`main` es lo que se publica.**

La Action "Desplegar sitio" (`.github/workflows/desplegar.yml`) sube el repo por FTP a `public_html` cada vez que cambia `main`. Usa los secrets `FTP_SERVER`, `FTP_USERNAME` y `FTP_PASSWORD`. **No borra nada en el servidor**, para no tocar lo que guarda cPanel: si se elimina un archivo del repo, hay que borrarlo a mano en el administrador de archivos de cPanel.

## Convenciones

- **Versiones de CSS y JS.** Al cambiar `styles.css`, `tech.css` o `main.js`, subir el `?v=` en todas las páginas, para que nadie vea la versión vieja (para `styles.css`, también en `cotizar.php`).
- **Menú, encabezado y pie** están repetidos en cada página. En `404.html` las rutas son absolutas (`/...`), porque se muestra en cualquier dirección.
- **Página nueva:** agregarle `canonical`, meta description y Open Graph, y sumarla a `sitemap.xml`. Al cambiar el contenido de una página, actualizar su `lastmod`.
- **Imágenes para redes de los perfiles** (`og-*.png`, 1200×630): traen el nombre y el cargo escritos dentro. Si cambian, hay que regenerarlas y subir el `?v=` del `og:image` del perfil, para que LinkedIn no muestre la vieja.
- **Fin de línea:** el repo guarda LF y git (`core.autocrlf`) entrega CRLF en Windows.
