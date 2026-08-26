/* ============================================================
 * TechLearn — chat.js
 * ------------------------------------------------------------
 * Widget de chat de soporte ficticio. Es parte del PROBLEMA 3
 * (multiples archivos JS sin concatenar, cada uno con su propio
 * <script>) del laboratorio de rendimiento. Todo el contenido de
 * conversacion es simulado localmente, no hay backend real.
 * ============================================================ */

(function (global) {
  'use strict';

  var CHAT_WIDGET_VERSION = '1.9.2-edu';
  var isOpen = false;
  var messages = [];
  var canned = TL_CANNED_RESPONSES;

  function createEl(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  }

  var TL_CANNED_RESPONSES = [
    {
      topic: 'precios',
      keywords: ['precio', 'costo', 'cuanto cuesta', 'pago'],
      response: 'Nuestros cursos van desde S/49 hasta S/299. ¿Quieres que te recomiende uno según tu nivel?'
    },
    {
      topic: 'certificados',
      keywords: ['certificado', 'diploma', 'constancia'],
      response: 'Sí, todos los cursos incluyen certificado digital al completarlos.'
    },
    {
      topic: 'horarios',
      keywords: ['horario', 'cuando', 'clases en vivo'],
      response: 'Los cursos son 100% a tu ritmo, no hay horarios fijos.'
    },
    {
      topic: 'soporte_tecnico',
      keywords: ['no funciona', 'error', 'no carga', 'problema tecnico'],
      response: 'Lamento el inconveniente. ¿Puedes indicarme en qué curso o página ocurre?'
    },
    {
      topic: 'instructores',
      keywords: ['profesor', 'instructor', 'quien enseña'],
      response: 'Nuestros instructores son profesionales activos en la industria tecnológica.'
    },
    {
      topic: 'duracion',
      keywords: ['duracion', 'cuanto dura', 'tiempo'],
      response: 'La mayoría de los cursos toman entre 4 y 8 semanas a ritmo moderado.'
    },
    {
      topic: 'reembolso',
      keywords: ['reembolso', 'devolucion', 'cancelar'],
      response: 'Ofrecemos reembolso completo dentro de los primeros 7 días.'
    },
    {
      topic: 'requisitos',
      keywords: ['requisito', 'necesito saber', 'nivel previo'],
      response: 'La mayoría de cursos son para principiantes, no requieren experiencia previa.'
    },
    {
      topic: 'becas',
      keywords: ['beca', 'descuento', 'promocion'],
      response: 'Tenemos becas parciales para estudiantes del IIC, escríbenos a becas@techlearn.edu (ficticio).'
    },
    {
      topic: 'contacto_humano',
      keywords: ['hablar con alguien', 'persona real', 'humano'],
      response: 'Puedes escribirnos a soporte@techlearn.edu (correo ficticio para esta práctica).'
    },
    { topic: 'default', keywords: [], response: 'Gracias por tu mensaje, un asesor (simulado) te contactará pronto.' }
  ];

  function pickCannedResponse(userText) {
    var lower = (userText || '').toLowerCase();
    for (var i = 0; i < canned.length; i++) {
      if (canned[i].keywords.some(function (k) { return lower.indexOf(k) !== -1; })) {
        return canned[i].response;
      }
    }
    return canned[canned.length - 1].response;
  }

  function appendMessage(root, author, text) {
    var msg = createEl('div', 'tl-chat-msg tl-chat-msg--' + author, text);
    root.appendChild(msg);
    root.scrollTop = root.scrollHeight;
    messages.push({ author: author, text: text, ts: Date.now() });
  }

  function buildWidget() {
    var container = createEl('div', 'tl-chat-widget');
    var toggleBtn = createEl('button', 'tl-chat-toggle', '💬');
    var panel = createEl('div', 'tl-chat-panel');
    var header = createEl('div', 'tl-chat-header', 'Soporte TechLearn');
    var body = createEl('div', 'tl-chat-body');
    var form = createEl('form', 'tl-chat-form');
    var input = createEl('input', 'tl-chat-input');
    input.type = 'text';
    input.placeholder = 'Escribe tu pregunta...';

    panel.style.display = 'none';
    form.appendChild(input);
    panel.appendChild(header);
    panel.appendChild(body);
    panel.appendChild(form);
    container.appendChild(panel);
    container.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', function () {
      isOpen = !isOpen;
      panel.style.display = isOpen ? 'flex' : 'none';
      if (isOpen && messages.length === 0) {
        appendMessage(body, 'bot', '¡Hola! Soy el asistente de TechLearn (simulado). ¿En qué te ayudo?');
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text) return;
      appendMessage(body, 'user', text);
      input.value = '';
      setTimeout(function () {
        appendMessage(body, 'bot', pickCannedResponse(text));
      }, 400);
    });

    document.body.appendChild(container);
    return container;
  }

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', buildWidget);
    } else {
      buildWidget();
    }
  }

  init();

  global.TechLearnChat = {
    version: CHAT_WIDGET_VERSION,
    getMessages: function () { return messages.slice(); }
  };
})(typeof window !== 'undefined' ? window : this);

  /* ---------- Guiones de prueba manual (QA interno, relleno) ----------
   * Caso de prueba #1: Bot: Nuestros cursos van desde S/49 hasta S/299.
   * Caso de prueba #2: Usuario: ¿Tienen certificado?
   * Caso de prueba #3: Bot: Sí, todos los cursos incluyen certificado digital.
   * Caso de prueba #4: Usuario: ¿Cuánto dura el curso de JavaScript?
   * Caso de prueba #5: Bot: La mayoría de los cursos toman entre 4 y 8 semanas.
   * Caso de prueba #6: Usuario: Se me congela la página al pagar.
   * Caso de prueba #7: Bot: Lamento el inconveniente, ¿en qué navegador ocurre?
   * Caso de prueba #8: Usuario: Gracias por la ayuda.
   * Caso de prueba #9: Bot: ¡De nada! Éxitos en tu aprendizaje.
   * Caso de prueba #10: Usuario: Hola, quiero saber el precio del curso de Python.
   * Caso de prueba #11: Bot: Nuestros cursos van desde S/49 hasta S/299.
   * Caso de prueba #12: Usuario: ¿Tienen certificado?
   * Caso de prueba #13: Bot: Sí, todos los cursos incluyen certificado digital.
   * Caso de prueba #14: Usuario: ¿Cuánto dura el curso de JavaScript?
   * Caso de prueba #15: Bot: La mayoría de los cursos toman entre 4 y 8 semanas.
   * Caso de prueba #16: Usuario: Se me congela la página al pagar.
   * Caso de prueba #17: Bot: Lamento el inconveniente, ¿en qué navegador ocurre?
   * Caso de prueba #18: Usuario: Gracias por la ayuda.
   * Caso de prueba #19: Bot: ¡De nada! Éxitos en tu aprendizaje.
   * Caso de prueba #20: Usuario: Hola, quiero saber el precio del curso de Python.
   * Caso de prueba #21: Bot: Nuestros cursos van desde S/49 hasta S/299.
   * Caso de prueba #22: Usuario: ¿Tienen certificado?
   * Caso de prueba #23: Bot: Sí, todos los cursos incluyen certificado digital.
   * Caso de prueba #24: Usuario: ¿Cuánto dura el curso de JavaScript?
   * Caso de prueba #25: Bot: La mayoría de los cursos toman entre 4 y 8 semanas.
   * Caso de prueba #26: Usuario: Se me congela la página al pagar.
   * Caso de prueba #27: Bot: Lamento el inconveniente, ¿en qué navegador ocurre?
   * Caso de prueba #28: Usuario: Gracias por la ayuda.
   * Caso de prueba #29: Bot: ¡De nada! Éxitos en tu aprendizaje.
   * Caso de prueba #30: Usuario: Hola, quiero saber el precio del curso de Python.
   * Caso de prueba #31: Bot: Nuestros cursos van desde S/49 hasta S/299.
   * Caso de prueba #32: Usuario: ¿Tienen certificado?
   * Caso de prueba #33: Bot: Sí, todos los cursos incluyen certificado digital.
   * Caso de prueba #34: Usuario: ¿Cuánto dura el curso de JavaScript?
   * Caso de prueba #35: Bot: La mayoría de los cursos toman entre 4 y 8 semanas.
   * Caso de prueba #36: Usuario: Se me congela la página al pagar.
   * Caso de prueba #37: Bot: Lamento el inconveniente, ¿en qué navegador ocurre?
   * Caso de prueba #38: Usuario: Gracias por la ayuda.
   * Caso de prueba #39: Bot: ¡De nada! Éxitos en tu aprendizaje.
   * Caso de prueba #40: Usuario: Hola, quiero saber el precio del curso de Python.
   * Caso de prueba #41: Bot: Nuestros cursos van desde S/49 hasta S/299.
   * Caso de prueba #42: Usuario: ¿Tienen certificado?
   * Caso de prueba #43: Bot: Sí, todos los cursos incluyen certificado digital.
   * Caso de prueba #44: Usuario: ¿Cuánto dura el curso de JavaScript?
   * Caso de prueba #45: Bot: La mayoría de los cursos toman entre 4 y 8 semanas.
   * Caso de prueba #46: Usuario: Se me congela la página al pagar.
   * Caso de prueba #47: Bot: Lamento el inconveniente, ¿en qué navegador ocurre?
   * Caso de prueba #48: Usuario: Gracias por la ayuda.
   * Caso de prueba #49: Bot: ¡De nada! Éxitos en tu aprendizaje.
   * Caso de prueba #50: Usuario: Hola, quiero saber el precio del curso de Python.
   * Caso de prueba #51: Bot: Nuestros cursos van desde S/49 hasta S/299.
   * Caso de prueba #52: Usuario: ¿Tienen certificado?
   * Caso de prueba #53: Bot: Sí, todos los cursos incluyen certificado digital.
   * Caso de prueba #54: Usuario: ¿Cuánto dura el curso de JavaScript?
   * Caso de prueba #55: Bot: La mayoría de los cursos toman entre 4 y 8 semanas.
   * Caso de prueba #56: Usuario: Se me congela la página al pagar.
   * Caso de prueba #57: Bot: Lamento el inconveniente, ¿en qué navegador ocurre?
   * Caso de prueba #58: Usuario: Gracias por la ayuda.
   * Caso de prueba #59: Bot: ¡De nada! Éxitos en tu aprendizaje.
   * Caso de prueba #60: Usuario: Hola, quiero saber el precio del curso de Python.
   ---------------------------------------------------------- */

  /* ---------- Bitacora extendida de pruebas manuales (QA) ----------
   * [Chrome Android] Caso #1: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Safari iOS] Caso #2: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Firefox Desktop] Caso #3: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Edge Desktop] Caso #4: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Samsung Internet] Caso #5: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Chrome Desktop] Caso #6: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Chrome Android] Caso #7: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Safari iOS] Caso #8: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Firefox Desktop] Caso #9: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Edge Desktop] Caso #10: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Samsung Internet] Caso #11: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Chrome Desktop] Caso #12: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Chrome Android] Caso #13: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Safari iOS] Caso #14: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Firefox Desktop] Caso #15: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Edge Desktop] Caso #16: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Samsung Internet] Caso #17: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Chrome Desktop] Caso #18: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Chrome Android] Caso #19: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Safari iOS] Caso #20: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Firefox Desktop] Caso #21: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Edge Desktop] Caso #22: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Samsung Internet] Caso #23: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Chrome Desktop] Caso #24: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Chrome Android] Caso #25: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Safari iOS] Caso #26: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Firefox Desktop] Caso #27: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Edge Desktop] Caso #28: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Samsung Internet] Caso #29: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Chrome Desktop] Caso #30: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Chrome Android] Caso #31: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Safari iOS] Caso #32: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Firefox Desktop] Caso #33: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Edge Desktop] Caso #34: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Samsung Internet] Caso #35: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Chrome Desktop] Caso #36: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Chrome Android] Caso #37: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Safari iOS] Caso #38: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Firefox Desktop] Caso #39: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Edge Desktop] Caso #40: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Samsung Internet] Caso #41: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Chrome Desktop] Caso #42: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Chrome Android] Caso #43: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Safari iOS] Caso #44: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Firefox Desktop] Caso #45: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Edge Desktop] Caso #46: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Samsung Internet] Caso #47: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Chrome Desktop] Caso #48: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Chrome Android] Caso #49: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Safari iOS] Caso #50: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Firefox Desktop] Caso #51: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Edge Desktop] Caso #52: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Samsung Internet] Caso #53: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Chrome Desktop] Caso #54: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Chrome Android] Caso #55: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Safari iOS] Caso #56: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Firefox Desktop] Caso #57: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Edge Desktop] Caso #58: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Samsung Internet] Caso #59: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Chrome Desktop] Caso #60: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Chrome Android] Caso #61: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Safari iOS] Caso #62: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Firefox Desktop] Caso #63: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Edge Desktop] Caso #64: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Samsung Internet] Caso #65: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Chrome Desktop] Caso #66: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Chrome Android] Caso #67: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Safari iOS] Caso #68: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Firefox Desktop] Caso #69: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Edge Desktop] Caso #70: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Samsung Internet] Caso #71: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Chrome Desktop] Caso #72: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Chrome Android] Caso #73: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Safari iOS] Caso #74: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Firefox Desktop] Caso #75: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Edge Desktop] Caso #76: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Samsung Internet] Caso #77: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Chrome Desktop] Caso #78: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Chrome Android] Caso #79: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Safari iOS] Caso #80: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Firefox Desktop] Caso #81: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Edge Desktop] Caso #82: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Samsung Internet] Caso #83: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Chrome Desktop] Caso #84: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Chrome Android] Caso #85: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Safari iOS] Caso #86: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Firefox Desktop] Caso #87: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Edge Desktop] Caso #88: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Samsung Internet] Caso #89: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Chrome Desktop] Caso #90: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Chrome Android] Caso #91: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Safari iOS] Caso #92: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Firefox Desktop] Caso #93: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Edge Desktop] Caso #94: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Samsung Internet] Caso #95: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Chrome Desktop] Caso #96: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Chrome Android] Caso #97: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Safari iOS] Caso #98: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Firefox Desktop] Caso #99: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Edge Desktop] Caso #100: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Samsung Internet] Caso #101: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Chrome Desktop] Caso #102: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Chrome Android] Caso #103: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Safari iOS] Caso #104: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Firefox Desktop] Caso #105: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Edge Desktop] Caso #106: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Samsung Internet] Caso #107: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Chrome Desktop] Caso #108: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Chrome Android] Caso #109: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Safari iOS] Caso #110: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Firefox Desktop] Caso #111: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Edge Desktop] Caso #112: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Samsung Internet] Caso #113: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Chrome Desktop] Caso #114: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Chrome Android] Caso #115: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Safari iOS] Caso #116: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Firefox Desktop] Caso #117: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Edge Desktop] Caso #118: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Samsung Internet] Caso #119: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Chrome Desktop] Caso #120: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Chrome Android] Caso #121: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Safari iOS] Caso #122: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Firefox Desktop] Caso #123: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Edge Desktop] Caso #124: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Samsung Internet] Caso #125: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Chrome Desktop] Caso #126: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Chrome Android] Caso #127: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Safari iOS] Caso #128: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Firefox Desktop] Caso #129: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Edge Desktop] Caso #130: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Samsung Internet] Caso #131: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Chrome Desktop] Caso #132: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Chrome Android] Caso #133: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Safari iOS] Caso #134: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Firefox Desktop] Caso #135: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Edge Desktop] Caso #136: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Samsung Internet] Caso #137: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Chrome Desktop] Caso #138: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Chrome Android] Caso #139: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Safari iOS] Caso #140: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Firefox Desktop] Caso #141: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Edge Desktop] Caso #142: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Samsung Internet] Caso #143: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Chrome Desktop] Caso #144: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Chrome Android] Caso #145: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Safari iOS] Caso #146: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Firefox Desktop] Caso #147: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Edge Desktop] Caso #148: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Samsung Internet] Caso #149: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Chrome Desktop] Caso #150: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Chrome Android] Caso #151: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Safari iOS] Caso #152: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Firefox Desktop] Caso #153: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Edge Desktop] Caso #154: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Samsung Internet] Caso #155: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Chrome Desktop] Caso #156: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Chrome Android] Caso #157: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Safari iOS] Caso #158: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Firefox Desktop] Caso #159: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Edge Desktop] Caso #160: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Samsung Internet] Caso #161: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Chrome Desktop] Caso #162: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Chrome Android] Caso #163: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Safari iOS] Caso #164: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Firefox Desktop] Caso #165: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Edge Desktop] Caso #166: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Samsung Internet] Caso #167: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Chrome Desktop] Caso #168: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Chrome Android] Caso #169: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Safari iOS] Caso #170: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Firefox Desktop] Caso #171: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Edge Desktop] Caso #172: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Samsung Internet] Caso #173: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Chrome Desktop] Caso #174: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Chrome Android] Caso #175: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Safari iOS] Caso #176: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Firefox Desktop] Caso #177: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Edge Desktop] Caso #178: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Samsung Internet] Caso #179: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Chrome Desktop] Caso #180: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Chrome Android] Caso #181: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Safari iOS] Caso #182: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Firefox Desktop] Caso #183: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Edge Desktop] Caso #184: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Samsung Internet] Caso #185: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Chrome Desktop] Caso #186: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Chrome Android] Caso #187: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Safari iOS] Caso #188: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Firefox Desktop] Caso #189: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Edge Desktop] Caso #190: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Samsung Internet] Caso #191: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Chrome Desktop] Caso #192: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Chrome Android] Caso #193: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Safari iOS] Caso #194: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Firefox Desktop] Caso #195: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Edge Desktop] Caso #196: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Samsung Internet] Caso #197: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Chrome Desktop] Caso #198: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Chrome Android] Caso #199: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Safari iOS] Caso #200: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Firefox Desktop] Caso #201: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Edge Desktop] Caso #202: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Samsung Internet] Caso #203: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Chrome Desktop] Caso #204: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Chrome Android] Caso #205: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Safari iOS] Caso #206: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Firefox Desktop] Caso #207: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Edge Desktop] Caso #208: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Samsung Internet] Caso #209: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Chrome Desktop] Caso #210: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Chrome Android] Caso #211: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Safari iOS] Caso #212: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Firefox Desktop] Caso #213: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Edge Desktop] Caso #214: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Samsung Internet] Caso #215: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Chrome Desktop] Caso #216: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Chrome Android] Caso #217: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Safari iOS] Caso #218: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Firefox Desktop] Caso #219: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Edge Desktop] Caso #220: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Samsung Internet] Caso #221: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Chrome Desktop] Caso #222: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Chrome Android] Caso #223: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Safari iOS] Caso #224: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Firefox Desktop] Caso #225: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Edge Desktop] Caso #226: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Samsung Internet] Caso #227: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Chrome Desktop] Caso #228: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Chrome Android] Caso #229: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Safari iOS] Caso #230: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Firefox Desktop] Caso #231: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Edge Desktop] Caso #232: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Samsung Internet] Caso #233: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Chrome Desktop] Caso #234: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Chrome Android] Caso #235: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Safari iOS] Caso #236: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Firefox Desktop] Caso #237: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Edge Desktop] Caso #238: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Samsung Internet] Caso #239: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Chrome Desktop] Caso #240: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Chrome Android] Caso #241: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Safari iOS] Caso #242: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Firefox Desktop] Caso #243: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Edge Desktop] Caso #244: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Samsung Internet] Caso #245: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Chrome Desktop] Caso #246: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Chrome Android] Caso #247: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Safari iOS] Caso #248: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Firefox Desktop] Caso #249: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Edge Desktop] Caso #250: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Samsung Internet] Caso #251: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Chrome Desktop] Caso #252: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Chrome Android] Caso #253: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Safari iOS] Caso #254: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Firefox Desktop] Caso #255: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Edge Desktop] Caso #256: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Samsung Internet] Caso #257: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Chrome Desktop] Caso #258: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Chrome Android] Caso #259: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Safari iOS] Caso #260: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Firefox Desktop] Caso #261: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Edge Desktop] Caso #262: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Samsung Internet] Caso #263: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Chrome Desktop] Caso #264: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Chrome Android] Caso #265: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Safari iOS] Caso #266: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Firefox Desktop] Caso #267: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Edge Desktop] Caso #268: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Samsung Internet] Caso #269: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Chrome Desktop] Caso #270: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Chrome Android] Caso #271: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Safari iOS] Caso #272: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Firefox Desktop] Caso #273: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Edge Desktop] Caso #274: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Samsung Internet] Caso #275: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Chrome Desktop] Caso #276: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Chrome Android] Caso #277: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Safari iOS] Caso #278: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Firefox Desktop] Caso #279: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Edge Desktop] Caso #280: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Samsung Internet] Caso #281: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Chrome Desktop] Caso #282: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Chrome Android] Caso #283: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Safari iOS] Caso #284: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Firefox Desktop] Caso #285: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Edge Desktop] Caso #286: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Samsung Internet] Caso #287: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Chrome Desktop] Caso #288: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Chrome Android] Caso #289: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Safari iOS] Caso #290: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   * [Firefox Desktop] Caso #291: Bot: Nuestros cursos van desde S/49 hasta S/299. -> Resultado: OK tras reintento
   * [Edge Desktop] Caso #292: Usuario: ¿Tienen certificado? -> Resultado: Fallo menor de estilos
   * [Samsung Internet] Caso #293: Bot: Sí, todos los cursos incluyen certificado digital. -> Resultado: OK con latencia alta
   * [Chrome Desktop] Caso #294: Usuario: ¿Cuánto dura el curso de JavaScript? -> Resultado: OK en modo oscuro
   * [Chrome Android] Caso #295: Bot: La mayoría de los cursos toman entre 4 y 8 semanas. -> Resultado: OK
   * [Safari iOS] Caso #296: Usuario: Se me congela la página al pagar. -> Resultado: OK tras reintento
   * [Firefox Desktop] Caso #297: Bot: Lamento el inconveniente, ¿en qué navegador ocurre? -> Resultado: Fallo menor de estilos
   * [Edge Desktop] Caso #298: Usuario: Gracias por la ayuda. -> Resultado: OK con latencia alta
   * [Samsung Internet] Caso #299: Bot: ¡De nada! Éxitos en tu aprendizaje. -> Resultado: OK en modo oscuro
   * [Chrome Desktop] Caso #300: Usuario: Hola, quiero saber el precio del curso de Python. -> Resultado: OK
   ---------------------------------------------------------- */
