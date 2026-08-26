/* ============================================================
 * TechLearn — app.js
 * ------------------------------------------------------------
 * Funcionalidad principal del sitio: menú móvil, smooth scroll,
 * validación de formulario de contacto y pequeñas interacciones
 * de UI. Este archivo se carga en el <head> SIN defer/async a
 * propósito (PROBLEMA 2: JavaScript bloqueante / render-blocking).
 * ============================================================ */

(function () {
  'use strict';

  /* ---------- Utilidades ---------- */
  function qs(selector, ctx) {
    return (ctx || document).querySelector(selector);
  }

  function qsa(selector, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(selector));
  }

  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  /* ---------- Menú móvil (hamburguesa) ---------- */
  function initMobileMenu() {
    var toggle = qs('.nav-toggle');
    var nav = qs('.main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.textContent = isOpen ? '✕' : '☰';
    });

    // Cierra el menú al hacer click en un enlace (mobile)
    qsa('a', nav).forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      });
    });
  }

  /* ---------- Smooth scroll para anclas internas ---------- */
  function initSmoothScroll() {
    qsa('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;
        var target = qs(targetId);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ---------- Header con sombra al hacer scroll ---------- */
  function initHeaderScrollState() {
    var header = qs('.site-header');
    if (!header) return;
    var lastScroll = 0;

    window.addEventListener('scroll', function () {
      var current = window.scrollY || document.documentElement.scrollTop;
      if (current > 8) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
      lastScroll = current;
    });
  }

  /* ---------- Validación de formulario de contacto ---------- */
  var Validators = {
    required: function (value) {
      return value.trim().length > 0;
    },
    email: function (value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    },
    minLength: function (value, len) {
      return value.trim().length >= len;
    }
  };

  function showFieldError(field, message) {
    var wrapper = field.closest('.form-group') || field.parentElement;
    var errorEl = wrapper.querySelector('.field-error');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'field-error';
      wrapper.appendChild(errorEl);
    }
    errorEl.textContent = message;
    field.setAttribute('aria-invalid', 'true');
  }

  function clearFieldError(field) {
    var wrapper = field.closest('.form-group') || field.parentElement;
    var errorEl = wrapper.querySelector('.field-error');
    if (errorEl) errorEl.textContent = '';
    field.removeAttribute('aria-invalid');
  }

  function validateContactForm(form) {
    var valid = true;

    var name = form.querySelector('[name="name"]');
    var email = form.querySelector('[name="email"]');
    var message = form.querySelector('[name="message"]');

    if (name) {
      if (!Validators.required(name.value)) {
        showFieldError(name, 'El nombre es obligatorio.');
        valid = false;
      } else {
        clearFieldError(name);
      }
    }

    if (email) {
      if (!Validators.required(email.value) || !Validators.email(email.value)) {
        showFieldError(email, 'Ingresa un correo válido.');
        valid = false;
      } else {
        clearFieldError(email);
      }
    }

    if (message) {
      if (!Validators.minLength(message.value, 10)) {
        showFieldError(message, 'El mensaje debe tener al menos 10 caracteres.');
        valid = false;
      } else {
        clearFieldError(message);
      }
    }

    return valid;
  }

  function initContactForm() {
    var form = qs('#contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = validateContactForm(form);
      var status = qs('.form-status', form);

      if (isValid) {
        if (status) {
          status.textContent = '¡Gracias! Tu mensaje fue enviado (simulado, no hay backend real).';
          status.classList.add('success');
        }
        form.reset();
      } else if (status) {
        status.textContent = 'Revisa los campos marcados en rojo.';
        status.classList.remove('success');
      }
    });
  }

  /* ---------- Toggle de tarjetas de recursos (acordeón simple) ---------- */
  function initResourceToggles() {
    qsa('.resource-item[data-expandable]').forEach(function (item) {
      item.addEventListener('click', function () {
        item.classList.toggle('is-expanded');
      });
    });
  }

  /* ---------- Botón "volver arriba" ---------- */
  function initScrollTopButton() {
    var btn = qs('.scroll-top-btn');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.style.display = window.scrollY > 400 ? 'flex' : 'none';
    });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Año dinámico en el footer ---------- */
  function initFooterYear() {
    var el = qs('[data-current-year]');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Inicialización ---------- */
  ready(function () {
    initMobileMenu();
    initSmoothScroll();
    initHeaderScrollState();
    initContactForm();
    initResourceToggles();
    initScrollTopButton();
    initFooterYear();
  });

  // Expuesto para depuración manual desde la consola durante la clase
  window.TechLearnApp = {
    Validators: Validators,
    validateContactForm: validateContactForm
  };
})();
