/* ============================================================
 * TechLearn — carousel.js
 * ------------------------------------------------------------
 * "Libreria" de carousel ficticia, escrita a mano y SIN MINIFICAR
 * a proposito (PROBLEMA 3: multiples archivos JS sin concatenar
 * ni optimizar). Implementa un carrusel simple con autoplay,
 * flechas, puntos de navegacion y soporte basico de swipe tactil.
 * ============================================================ */

(function (global) {
  'use strict';

  var CAROUSEL_LIB_VERSION = '2.4.0-edu';

  function TLCarousel(root, options) {
    this.root = root;
    this.options = Object.assign({
      autoplay: true,
      interval: 4000,
      loop: true,
      showDots: true,
      showArrows: true
    }, options || {});

    this.track = root.querySelector('.carousel-track');
    this.slides = this.track ? Array.prototype.slice.call(this.track.children) : [];
    this.currentIndex = 0;
    this.timer = null;

    this._bindEvents = this._bindEvents.bind(this);
    this._onResize = this._onResize.bind(this);

    this.init();
  }


  TLCarousel.prototype.init = function () {
    if (!this.track || this.slides.length === 0) return;
    this._buildControls();
    this._bindEvents();
    this._goTo(0);
    if (this.options.autoplay) this._startAutoplay();
  };

  TLCarousel.prototype._buildControls = function () {
    var self = this;

    if (this.options.showArrows) {
      var prevBtn = document.createElement('button');
      prevBtn.className = 'carousel-arrow carousel-arrow--prev';
      prevBtn.setAttribute('aria-label', 'Anterior');
      prevBtn.textContent = '‹';
      prevBtn.addEventListener('click', function () { self.prev(); });

      var nextBtn = document.createElement('button');
      nextBtn.className = 'carousel-arrow carousel-arrow--next';
      nextBtn.setAttribute('aria-label', 'Siguiente');
      nextBtn.textContent = '›';
      nextBtn.addEventListener('click', function () { self.next(); });

      this.root.appendChild(prevBtn);
      this.root.appendChild(nextBtn);
      this.prevBtn = prevBtn;
      this.nextBtn = nextBtn;
    }

    if (this.options.showDots) {
      var dotsWrap = document.createElement('div');
      dotsWrap.className = 'carousel-dots';
      this.slides.forEach(function (_, i) {
        var dot = document.createElement('span');
        dot.className = 'carousel-dot';
        dot.addEventListener('click', function () { self._goTo(i); self._resetAutoplay(); });
        dotsWrap.appendChild(dot);
      });
      this.root.appendChild(dotsWrap);
      this.dotsWrap = dotsWrap;
    }
  };

  TLCarousel.prototype._bindEvents = function () {
    var self = this;
    window.addEventListener('resize', this._onResize);

    // Soporte basico de swipe tactil
    var startX = 0;
    this.track.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });

    this.track.addEventListener('touchend', function (e) {
      var endX = e.changedTouches[0].clientX;
      var delta = endX - startX;
      if (Math.abs(delta) > 40) {
        if (delta < 0) self.next(); else self.prev();
        self._resetAutoplay();
      }
    });

    this.root.addEventListener('mouseenter', function () { self._stopAutoplay(); });
    this.root.addEventListener('mouseleave', function () {
      if (self.options.autoplay) self._startAutoplay();
    });
  };

  TLCarousel.prototype._onResize = function () {
    this._goTo(this.currentIndex);
  };

  TLCarousel.prototype._goTo = function (index) {
    var total = this.slides.length;
    if (this.options.loop) {
      index = ((index % total) + total) % total;
    } else {
      index = Math.max(0, Math.min(index, total - 1));
    }
    this.currentIndex = index;
    var offset = -index * this.root.clientWidth;
    this.track.style.transform = 'translateX(' + offset + 'px)';

    if (this.dotsWrap) {
      Array.prototype.slice.call(this.dotsWrap.children).forEach(function (dot, i) {
        dot.classList.toggle('active', i === index);
      });
    }
  };

  TLCarousel.prototype.next = function () { this._goTo(this.currentIndex + 1); };
  TLCarousel.prototype.prev = function () { this._goTo(this.currentIndex - 1); };

  TLCarousel.prototype._startAutoplay = function () {
    var self = this;
    this._stopAutoplay();
    this.timer = setInterval(function () { self.next(); }, this.options.interval);
  };

  TLCarousel.prototype._stopAutoplay = function () {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  };

  TLCarousel.prototype._resetAutoplay = function () {
    if (this.options.autoplay) this._startAutoplay();
  };

  TLCarousel.prototype.destroy = function () {
    this._stopAutoplay();
    window.removeEventListener('resize', this._onResize);
  };

  function autoInit() {
    var nodes = document.querySelectorAll('[data-carousel]');
    Array.prototype.forEach.call(nodes, function (node) {
      new TLCarousel(node);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  global.TLCarousel = TLCarousel;
  global.TL_CAROUSEL_VERSION = CAROUSEL_LIB_VERSION;
})(typeof window !== 'undefined' ? window : this);

/* ============================================================
 * Notas de diseno y decisiones de arquitectura (relleno realista
 * para simular una libreria interna nunca depurada). Aporta al
 * PROBLEMA 3: JS sin concatenar ni minificar (30-50 KB).
 * ============================================================
 * Nota #1: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #2: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #3: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #4: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #5: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #6: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #7: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #8: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #9: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #10: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #11: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #12: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #13: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #14: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #15: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #16: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #17: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #18: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #19: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #20: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #21: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #22: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #23: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #24: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #25: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #26: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #27: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #28: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #29: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #30: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #31: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #32: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #33: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #34: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #35: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #36: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #37: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #38: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #39: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #40: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #41: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #42: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #43: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #44: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #45: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #46: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #47: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #48: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #49: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #50: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #51: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #52: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #53: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #54: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #55: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #56: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #57: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #58: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #59: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #60: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #61: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #62: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #63: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #64: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #65: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #66: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #67: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #68: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #69: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #70: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #71: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #72: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #73: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #74: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #75: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #76: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #77: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #78: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #79: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #80: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #81: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #82: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #83: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #84: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #85: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #86: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #87: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #88: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #89: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #90: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #91: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #92: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #93: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #94: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #95: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #96: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #97: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #98: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #99: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #100: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #101: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #102: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #103: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #104: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #105: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #106: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #107: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #108: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #109: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #110: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #111: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #112: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #113: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #114: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #115: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #116: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #117: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #118: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #119: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #120: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #121: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #122: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #123: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #124: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #125: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #126: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #127: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #128: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #129: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #130: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #131: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #132: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #133: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #134: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #135: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #136: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #137: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #138: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #139: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #140: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #141: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #142: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #143: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #144: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #145: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #146: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #147: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #148: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #149: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #150: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #151: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #152: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #153: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #154: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #155: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #156: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #157: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #158: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #159: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #160: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #161: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #162: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #163: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #164: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #165: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #166: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #167: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #168: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #169: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #170: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #171: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #172: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #173: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #174: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #175: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #176: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #177: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #178: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #179: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #180: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #181: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #182: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #183: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #184: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #185: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #186: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #187: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #188: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #189: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #190: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #191: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #192: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #193: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #194: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #195: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #196: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #197: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #198: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #199: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #200: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #201: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #202: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #203: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #204: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #205: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #206: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #207: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #208: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #209: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #210: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #211: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #212: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #213: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #214: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #215: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #216: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #217: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #218: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #219: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #220: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #221: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #222: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #223: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #224: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #225: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #226: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #227: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #228: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #229: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #230: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #231: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #232: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #233: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #234: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #235: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #236: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #237: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #238: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #239: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #240: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #241: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #242: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #243: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #244: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #245: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #246: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #247: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #248: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #249: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #250: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #251: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #252: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #253: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #254: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #255: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #256: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #257: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #258: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #259: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #260: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #261: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #262: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #263: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #264: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #265: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #266: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #267: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #268: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #269: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #270: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #271: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #272: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #273: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #274: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #275: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #276: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #277: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #278: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #279: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #280: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #281: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #282: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #283: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #284: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #285: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #286: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #287: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #288: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #289: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #290: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #291: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #292: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #293: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #294: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #295: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #296: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #297: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #298: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #299: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #300: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #301: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #302: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #303: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #304: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #305: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #306: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #307: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #308: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #309: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #310: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #311: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #312: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #313: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #314: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #315: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #316: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #317: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #318: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #319: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #320: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #321: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #322: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #323: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #324: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #325: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #326: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #327: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #328: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #329: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #330: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #331: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #332: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #333: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #334: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #335: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #336: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #337: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #338: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #339: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #340: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #341: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #342: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #343: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #344: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #345: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #346: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #347: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #348: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #349: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #350: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #351: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #352: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #353: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #354: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #355: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #356: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #357: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #358: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #359: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #360: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #361: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #362: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #363: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #364: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #365: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #366: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #367: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #368: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #369: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #370: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #371: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #372: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #373: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #374: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #375: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #376: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #377: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #378: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #379: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #380: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #381: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #382: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #383: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #384: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #385: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #386: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #387: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #388: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #389: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #390: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #391: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #392: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #393: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #394: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #395: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #396: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #397: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #398: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #399: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #400: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #401: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #402: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #403: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #404: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #405: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #406: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #407: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #408: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #409: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #410: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * Nota #411: El autoplay se pausa en hover para mejorar accesibilidad segun WCAG 2.2.2.
 * Nota #412: Pendiente: soportar teclas de flecha para navegacion con teclado.
 * Nota #413: Pendiente: anunciar cambios de slide con aria-live para lectores de pantalla.
 * Nota #414: Se considero usar IntersectionObserver para pausar el autoplay fuera de viewport.
 * Nota #415: TODO: extraer la logica de swipe a un modulo separado (nunca se hizo).
 * Nota #416: Se probo con 3, 6 y 9 slides sin problemas de rendimiento notables.
 * Nota #417: El calculo de offset asume que todos los slides tienen el mismo ancho.
 * Nota #418: Se documento que loop=false puede dejar botones deshabilitados visualmente (pendiente).
 * Nota #419: Bug conocido: al redimensionar rapido la ventana el offset puede desincronizarse brevemente.
 * Nota #420: Se evaluo usar CSS scroll-snap en vez de transform, se descarto por compatibilidad con IE11 (ya no aplica pero nadie lo removio).
 * ============================================================ */
