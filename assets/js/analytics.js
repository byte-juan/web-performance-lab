/* ============================================================
 * TechLearn — analytics.js
 * ------------------------------------------------------------
 * Script de "tracking" ficticio para el laboratorio de rendimiento.
 * PROBLEMA 2 y 3: se carga de forma SINCRONA y bloqueante en el
 * <head> (sin defer/async), y NO esta concatenado con los demas
 * bundles de JS. Ademas contiene un bucle ocupado (busy-loop) que
 * simula trabajo pesado de analitica en el hilo principal al
 * cargarse, degradando el TTFB percibido / Time to Interactive.
 *
 * Nada de esto envia datos a un servidor real: todo es simulado
 * con console.log y estructuras en memoria para fines didacticos.
 * ============================================================ */

(function (global) {
  'use strict';

  var TL_ANALYTICS_VERSION = '3.14.1-edu';
  var eventQueue = [];
  var sessionId = 'sess_' + Math.random().toString(36).slice(2);

  function log() {
    // Descomentar para depurar en consola durante la clase:
    // console.log.apply(console, arguments);
  }

  /* Tracker #0: course_click
   * Registra el evento 'course_click' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_course_click(detail) {
    var ctx = {
      category: 'course_click',
      index: 0,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] course_click', ctx);
    eventQueue.push({ name: 'course_click', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #1: video_play
   * Registra el evento 'video_play' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_video_play(detail) {
    var ctx = {
      category: 'video_play',
      index: 1,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] video_play', ctx);
    eventQueue.push({ name: 'video_play', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #2: video_pause
   * Registra el evento 'video_pause' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_video_pause(detail) {
    var ctx = {
      category: 'video_pause',
      index: 2,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] video_pause', ctx);
    eventQueue.push({ name: 'video_pause', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #3: video_complete
   * Registra el evento 'video_complete' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_video_complete(detail) {
    var ctx = {
      category: 'video_complete',
      index: 3,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] video_complete', ctx);
    eventQueue.push({ name: 'video_complete', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #4: cta_click
   * Registra el evento 'cta_click' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_cta_click(detail) {
    var ctx = {
      category: 'cta_click',
      index: 4,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] cta_click', ctx);
    eventQueue.push({ name: 'cta_click', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #5: form_submit
   * Registra el evento 'form_submit' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_form_submit(detail) {
    var ctx = {
      category: 'form_submit',
      index: 5,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] form_submit', ctx);
    eventQueue.push({ name: 'form_submit', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #6: form_error
   * Registra el evento 'form_error' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_form_error(detail) {
    var ctx = {
      category: 'form_error',
      index: 6,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] form_error', ctx);
    eventQueue.push({ name: 'form_error', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #7: scroll_depth
   * Registra el evento 'scroll_depth' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_scroll_depth(detail) {
    var ctx = {
      category: 'scroll_depth',
      index: 7,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] scroll_depth', ctx);
    eventQueue.push({ name: 'scroll_depth', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #8: menu_open
   * Registra el evento 'menu_open' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_menu_open(detail) {
    var ctx = {
      category: 'menu_open',
      index: 8,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] menu_open', ctx);
    eventQueue.push({ name: 'menu_open', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #9: menu_close
   * Registra el evento 'menu_close' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_menu_close(detail) {
    var ctx = {
      category: 'menu_close',
      index: 9,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] menu_close', ctx);
    eventQueue.push({ name: 'menu_close', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #10: search_query
   * Registra el evento 'search_query' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_search_query(detail) {
    var ctx = {
      category: 'search_query',
      index: 10,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] search_query', ctx);
    eventQueue.push({ name: 'search_query', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #11: filter_apply
   * Registra el evento 'filter_apply' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_filter_apply(detail) {
    var ctx = {
      category: 'filter_apply',
      index: 11,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] filter_apply', ctx);
    eventQueue.push({ name: 'filter_apply', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #12: testimonial_view
   * Registra el evento 'testimonial_view' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_testimonial_view(detail) {
    var ctx = {
      category: 'testimonial_view',
      index: 12,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] testimonial_view', ctx);
    eventQueue.push({ name: 'testimonial_view', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #13: resource_download
   * Registra el evento 'resource_download' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_resource_download(detail) {
    var ctx = {
      category: 'resource_download',
      index: 13,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] resource_download', ctx);
    eventQueue.push({ name: 'resource_download', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #14: instructor_view
   * Registra el evento 'instructor_view' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_instructor_view(detail) {
    var ctx = {
      category: 'instructor_view',
      index: 14,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] instructor_view', ctx);
    eventQueue.push({ name: 'instructor_view', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #15: pricing_toggle
   * Registra el evento 'pricing_toggle' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_pricing_toggle(detail) {
    var ctx = {
      category: 'pricing_toggle',
      index: 15,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] pricing_toggle', ctx);
    eventQueue.push({ name: 'pricing_toggle', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #16: newsletter_signup
   * Registra el evento 'newsletter_signup' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_newsletter_signup(detail) {
    var ctx = {
      category: 'newsletter_signup',
      index: 16,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] newsletter_signup', ctx);
    eventQueue.push({ name: 'newsletter_signup', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #17: share_click
   * Registra el evento 'share_click' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_share_click(detail) {
    var ctx = {
      category: 'share_click',
      index: 17,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] share_click', ctx);
    eventQueue.push({ name: 'share_click', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #18: banner_impression
   * Registra el evento 'banner_impression' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_banner_impression(detail) {
    var ctx = {
      category: 'banner_impression',
      index: 18,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] banner_impression', ctx);
    eventQueue.push({ name: 'banner_impression', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #19: modal_open
   * Registra el evento 'modal_open' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_modal_open(detail) {
    var ctx = {
      category: 'modal_open',
      index: 19,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] modal_open', ctx);
    eventQueue.push({ name: 'modal_open', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #20: modal_close
   * Registra el evento 'modal_close' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_modal_close(detail) {
    var ctx = {
      category: 'modal_close',
      index: 20,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] modal_close', ctx);
    eventQueue.push({ name: 'modal_close', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #21: carousel_swipe
   * Registra el evento 'carousel_swipe' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_carousel_swipe(detail) {
    var ctx = {
      category: 'carousel_swipe',
      index: 21,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] carousel_swipe', ctx);
    eventQueue.push({ name: 'carousel_swipe', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #22: tab_change
   * Registra el evento 'tab_change' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_tab_change(detail) {
    var ctx = {
      category: 'tab_change',
      index: 22,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] tab_change', ctx);
    eventQueue.push({ name: 'tab_change', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #23: faq_expand
   * Registra el evento 'faq_expand' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_faq_expand(detail) {
    var ctx = {
      category: 'faq_expand',
      index: 23,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] faq_expand', ctx);
    eventQueue.push({ name: 'faq_expand', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #24: certificate_view
   * Registra el evento 'certificate_view' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_certificate_view(detail) {
    var ctx = {
      category: 'certificate_view',
      index: 24,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] certificate_view', ctx);
    eventQueue.push({ name: 'certificate_view', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #25: chat_open
   * Registra el evento 'chat_open' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_chat_open(detail) {
    var ctx = {
      category: 'chat_open',
      index: 25,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] chat_open', ctx);
    eventQueue.push({ name: 'chat_open', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #26: chat_message
   * Registra el evento 'chat_message' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_chat_message(detail) {
    var ctx = {
      category: 'chat_message',
      index: 26,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] chat_message', ctx);
    eventQueue.push({ name: 'chat_message', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #27: login_attempt
   * Registra el evento 'login_attempt' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_login_attempt(detail) {
    var ctx = {
      category: 'login_attempt',
      index: 27,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] login_attempt', ctx);
    eventQueue.push({ name: 'login_attempt', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #28: logout
   * Registra el evento 'logout' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_logout(detail) {
    var ctx = {
      category: 'logout',
      index: 28,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] logout', ctx);
    eventQueue.push({ name: 'logout', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #29: session_start
   * Registra el evento 'session_start' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_session_start(detail) {
    var ctx = {
      category: 'session_start',
      index: 29,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] session_start', ctx);
    eventQueue.push({ name: 'session_start', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #30: session_end
   * Registra el evento 'session_end' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_session_end(detail) {
    var ctx = {
      category: 'session_end',
      index: 30,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] session_end', ctx);
    eventQueue.push({ name: 'session_end', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #31: error_boundary
   * Registra el evento 'error_boundary' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_error_boundary(detail) {
    var ctx = {
      category: 'error_boundary',
      index: 31,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] error_boundary', ctx);
    eventQueue.push({ name: 'error_boundary', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #32: lazy_load_trigger
   * Registra el evento 'lazy_load_trigger' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_lazy_load_trigger(detail) {
    var ctx = {
      category: 'lazy_load_trigger',
      index: 32,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] lazy_load_trigger', ctx);
    eventQueue.push({ name: 'lazy_load_trigger', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #33: ab_test_bucket
   * Registra el evento 'ab_test_bucket' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_ab_test_bucket(detail) {
    var ctx = {
      category: 'ab_test_bucket',
      index: 33,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] ab_test_bucket', ctx);
    eventQueue.push({ name: 'ab_test_bucket', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #34: cookie_consent
   * Registra el evento 'cookie_consent' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_cookie_consent(detail) {
    var ctx = {
      category: 'cookie_consent',
      index: 34,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] cookie_consent', ctx);
    eventQueue.push({ name: 'cookie_consent', ctx: ctx, ts: Date.now() });
    return ctx;
  }

  /* Tracker #35: locale_change
   * Registra el evento 'locale_change' junto con metadatos de contexto
   * (viewport, user agent, referrer) para fines de analitica
   * ficticia. En produccion esto llamaria a un endpoint real.
   */
  function track_locale_change(detail) {
    var ctx = {
      category: 'locale_change',
      index: 35,
      viewport: (typeof window !== 'undefined') ? window.innerWidth + 'x' + window.innerHeight : 'unknown',
      referrer: (typeof document !== 'undefined') ? document.referrer : '',
      detail: detail || {}
    };
    log('[TechLearn Analytics] locale_change', ctx);
    eventQueue.push({ name: 'locale_change', ctx: ctx, ts: Date.now() });
    return ctx;
  }
  var TL_TRACKERS = {
    course_click: track_course_click,
    video_play: track_video_play,
    video_pause: track_video_pause,
    video_complete: track_video_complete,
    cta_click: track_cta_click,
    form_submit: track_form_submit,
    form_error: track_form_error,
    scroll_depth: track_scroll_depth,
    menu_open: track_menu_open,
    menu_close: track_menu_close,
    search_query: track_search_query,
    filter_apply: track_filter_apply,
    testimonial_view: track_testimonial_view,
    resource_download: track_resource_download,
    instructor_view: track_instructor_view,
    pricing_toggle: track_pricing_toggle,
    newsletter_signup: track_newsletter_signup,
    share_click: track_share_click,
    banner_impression: track_banner_impression,
    modal_open: track_modal_open,
    modal_close: track_modal_close,
    carousel_swipe: track_carousel_swipe,
    tab_change: track_tab_change,
    faq_expand: track_faq_expand,
    certificate_view: track_certificate_view,
    chat_open: track_chat_open,
    chat_message: track_chat_message,
    login_attempt: track_login_attempt,
    logout: track_logout,
    session_start: track_session_start,
    session_end: track_session_end,
    error_boundary: track_error_boundary,
    lazy_load_trigger: track_lazy_load_trigger,
    ab_test_bucket: track_ab_test_bucket,
    cookie_consent: track_cookie_consent,
    locale_change: track_locale_change,
  };

  /* ---------- API publica simulada ---------- */
  function track(eventName, payload) {
    var event = {
      name: eventName,
      payload: payload || {},
      session: sessionId,
      timestamp: Date.now(),
      version: TL_ANALYTICS_VERSION
    };
    eventQueue.push(event);
    log('[TechLearn Analytics] track()', event);
    return event;
  }

  function flush() {
    log('[TechLearn Analytics] flush() — enviando', eventQueue.length, 'eventos (simulado)');
    eventQueue = [];
  }

  /* ---------- Trabajo sincrono pesado al cargar (a proposito) ----------
   * Simula un calculo de "scoring de usuario" en el hilo principal.
   * Esto bloquea el parseo/renderizado mientras se ejecuta porque el
   * script se incluye sin defer/async justo antes del contenido.
   */
  function heavyInitialComputation() {
    var acc = 0;
    for (var i = 0; i < 200000; i++) {
      acc += Math.sqrt(i) * Math.sin(i);
    }
    return acc;
  }

  var __score = heavyInitialComputation();
  log('[TechLearn Analytics] score inicial calculado', __score);

  track('page_view', { url: typeof location !== 'undefined' ? location.pathname : '/' });

  global.TechLearnAnalytics = {
    version: TL_ANALYTICS_VERSION,
    track: track,
    flush: flush,
    trackers: TL_TRACKERS,
    _queue: eventQueue
  };
})(typeof window !== 'undefined' ? window : this);

  /* ---------- Changelog interno (relleno realista) ----------
   * v2.1.0 — Se corrigio bug donde sessionId se regeneraba en cada llamada a track().
   * v2.2.0 — Se añadio compatibilidad con Safari 9 (fallback sin Promise).
   * v2.3.0 — Se documento el formato de payload para el equipo de datos.
   * v2.4.0 — Se evaluo migrar a sendBeacon() pero se pospuso para v4.
   * v2.5.0 — Se agrego bandera TL_ANALYTICS_VERSION para depurar en produccion.
   * v2.6.0 — Se removieron logs de debug accidentalmente dejados en v2.3.0.
   * v2.7.0 — Se añadio manejo de errores silencioso para no romper la pagina.
   * v2.8.0 — Se discutio mover este script a un Web Worker (pendiente).
   * v2.9.0 — Se agrego el evento ab_test_bucket para experimentos de precios.
   * v2.10.0 — Se agrego soporte para eventos de scroll_depth con throttling manual.
   * v2.11.0 — Se corrigio bug donde sessionId se regeneraba en cada llamada a track().
   * v2.12.0 — Se añadio compatibilidad con Safari 9 (fallback sin Promise).
   * v2.13.0 — Se documento el formato de payload para el equipo de datos.
   * v2.14.0 — Se evaluo migrar a sendBeacon() pero se pospuso para v4.
   * v2.15.0 — Se agrego bandera TL_ANALYTICS_VERSION para depurar en produccion.
   * v2.16.0 — Se removieron logs de debug accidentalmente dejados en v2.3.0.
   * v2.17.0 — Se añadio manejo de errores silencioso para no romper la pagina.
   * v2.18.0 — Se discutio mover este script a un Web Worker (pendiente).
   * v2.19.0 — Se agrego el evento ab_test_bucket para experimentos de precios.
   * v2.20.0 — Se agrego soporte para eventos de scroll_depth con throttling manual.
   * v2.21.0 — Se corrigio bug donde sessionId se regeneraba en cada llamada a track().
   * v2.22.0 — Se añadio compatibilidad con Safari 9 (fallback sin Promise).
   * v2.23.0 — Se documento el formato de payload para el equipo de datos.
   * v2.24.0 — Se evaluo migrar a sendBeacon() pero se pospuso para v4.
   * v2.25.0 — Se agrego bandera TL_ANALYTICS_VERSION para depurar en produccion.
   * v2.26.0 — Se removieron logs de debug accidentalmente dejados en v2.3.0.
   * v2.27.0 — Se añadio manejo de errores silencioso para no romper la pagina.
   * v2.28.0 — Se discutio mover este script a un Web Worker (pendiente).
   * v2.29.0 — Se agrego el evento ab_test_bucket para experimentos de precios.
   * v2.30.0 — Se agrego soporte para eventos de scroll_depth con throttling manual.
   * v2.31.0 — Se corrigio bug donde sessionId se regeneraba en cada llamada a track().
   * v2.32.0 — Se añadio compatibilidad con Safari 9 (fallback sin Promise).
   * v2.33.0 — Se documento el formato de payload para el equipo de datos.
   * v2.34.0 — Se evaluo migrar a sendBeacon() pero se pospuso para v4.
   * v2.35.0 — Se agrego bandera TL_ANALYTICS_VERSION para depurar en produccion.
   * v2.36.0 — Se removieron logs de debug accidentalmente dejados en v2.3.0.
   * v2.37.0 — Se añadio manejo de errores silencioso para no romper la pagina.
   * v2.38.0 — Se discutio mover este script a un Web Worker (pendiente).
   * v2.39.0 — Se agrego el evento ab_test_bucket para experimentos de precios.
   * v2.40.0 — Se agrego soporte para eventos de scroll_depth con throttling manual.
   ---------------------------------------------------------- */
