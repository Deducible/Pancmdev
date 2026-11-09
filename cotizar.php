<?php
// Recibe el formulario de cotización de servicios.html y lo manda por correo
// a contacto@pancmdev.cl. Si lo envía el JS de la página responde JSON; si el
// navegador no tiene JS, muestra una página corta con el resultado.

const DESTINO = 'contacto@pancmdev.cl';

date_default_timezone_set('America/Santiago');
header('X-Robots-Tag: noindex');
header('Cache-Control: no-store');

function responder($ok, $mensaje, $codigo = 200)
{
    http_response_code($codigo);
    $accept = isset($_SERVER['HTTP_ACCEPT']) ? $_SERVER['HTTP_ACCEPT'] : '';
    if (strpos($accept, 'application/json') !== false) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(array('ok' => $ok, 'error' => $ok ? null : $mensaje), JSON_UNESCAPED_UNICODE);
        exit;
    }

    $titulo = $ok ? 'Listo, recibimos tu solicitud.' : 'No pudimos enviar el formulario.';
    if (!$ok) {
        $mensaje .= ' Vuelve a intentarlo o escríbenos a contacto@pancmdev.cl.';
    }
    $texto = htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8');
    header('Content-Type: text/html; charset=utf-8');
    echo <<<HTML
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>Cotización — PanCMdev</title>
<link rel="stylesheet" href="/styles.css?v=8" />
</head>
<body>
  <main>
    <section style="padding:64px var(--gutter) 72px">
      <div class="eyebrow">Cotización</div>
      <h1>$titulo</h1>
      <p class="lead">$texto</p>
      <div class="actions">
        <a href="/servicios.html" class="btn">Volver a servicios</a>
        <a href="/" class="btn-outline">Ir al inicio</a>
      </div>
    </section>
  </main>
</body>
</html>
HTML;
    exit;
}

// Deja un texto en una sola línea, sin espacios sobrantes y con un largo máximo
function limpiar($valor, $largo)
{
    $valor = (string) preg_replace('/\s+/u', ' ', $valor);
    return trim(mb_substr($valor, 0, $largo, 'UTF-8'));
}

function campo($nombre, $largo)
{
    return isset($_POST[$nombre]) && is_string($_POST[$nombre]) ? limpiar($_POST[$nombre], $largo) : '';
}

function o_guion($valor)
{
    return $valor !== '' ? $valor : '—';
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /servicios.html#cotizar', true, 303);
    exit;
}

// Campo trampa: las personas no lo ven y los bots lo llenan. Al bot se le
// responde como si todo hubiera salido bien, para que no insista.
if (campo('web', 200) !== '') {
    responder(true, 'Te respondemos en 48 horas al correo que nos dejaste.');
}

$nombre = campo('nombre', 100);
$correo = campo('correo', 150);
$telefono = campo('telefono', 30);
$negocio = campo('negocio', 200);
$sitio = campo('sitio_actual', 100);
$plazo = campo('plazo', 100);
$presupuesto = campo('presupuesto', 100);
$mensaje = isset($_POST['mensaje']) && is_string($_POST['mensaje'])
    ? trim(mb_substr(str_replace(array("\r\n", "\r"), "\n", $_POST['mensaje']), 0, 3000, 'UTF-8'))
    : '';

$necesita = array();
if (isset($_POST['necesita']) && is_array($_POST['necesita'])) {
    foreach (array_slice($_POST['necesita'], 0, 15) as $opcion) {
        if (is_string($opcion) && limpiar($opcion, 80) !== '') {
            $necesita[] = limpiar($opcion, 80);
        }
    }
}

// "Otros" con texto: se anota lo que escribió en vez de la palabra sola
$otros = campo('necesita_otros', 150);
if ($otros !== '') {
    $necesita = array_values(array_diff($necesita, array('Otros')));
    $necesita[] = 'Otros: ' . $otros;
}

if ($nombre === '' || $negocio === '' || !filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    responder(false, 'Revisa que estén tu nombre, un correo válido y a qué se dedica tu negocio.', 422);
}

$lineas = array(
    'Nueva solicitud de cotización desde pancmdev.cl',
    '',
    'Nombre: ' . $nombre,
    'Correo: ' . $correo,
    'Teléfono: ' . o_guion($telefono),
    'Negocio: ' . $negocio,
    '',
    'Qué necesita:',
);
foreach ($necesita as $opcion) {
    $lineas[] = '- ' . $opcion;
}
if (!$necesita) {
    $lineas[] = '- (no marcó opciones)';
}
array_push(
    $lineas,
    '',
    'Sitio o dominio: ' . o_guion($sitio),
    'Plazo: ' . o_guion($plazo),
    'Presupuesto: ' . o_guion($presupuesto),
    '',
    'Mensaje:',
    o_guion($mensaje),
    '',
    '-- ',
    'Enviado el ' . date('d-m-Y H:i') . ' desde https://pancmdev.cl/servicios.html'
);
$cuerpo = str_replace("\n", "\r\n", implode("\n", $lineas));

$asunto = mb_encode_mimeheader('Cotización: ' . $negocio . ' (' . $nombre . ')', 'UTF-8', 'B');

// Reply-To lleva el correo del cliente: al responder desde el buzón le llega a él.
// filter_var ya descartó saltos de línea, así que no se pueden colar cabeceras.
$cabeceras = implode("\r\n", array(
    'From: Cotizaciones pancmdev.cl <' . DESTINO . '>',
    'Reply-To: ' . $correo,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: quoted-printable',
));

if (!mail(DESTINO, $asunto, quoted_printable_encode($cuerpo), $cabeceras, '-f' . DESTINO)) {
    responder(false, 'Hubo un problema con el envío.', 500);
}

responder(true, 'Te respondemos en 48 horas al correo que nos dejaste.');
