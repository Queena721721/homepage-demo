/* ============================================================
   交互脚本 —— 主题切换 / 滚动淡入 / 导航高亮 / 年份
   没有依赖，可整段删除，页面依然可用。
   ============================================================ */

(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- 1. 页脚年份 ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- 2. 深色 / 浅色主题 ---------- */
  var THEME_KEY = 'homepage-theme';
  var toggle = document.getElementById('themeToggle');

  function isDark() {
    return root.getAttribute('data-theme') === 'dark';
  }

  function applyTheme(dark) {
    if (dark) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    if (toggle) {
      toggle.setAttribute('aria-label', dark ? '切换到浅色模式' : '切换到深色模式');
      toggle.setAttribute('title', dark ? '切换到浅色模式' : '切换到深色模式');
    }
  }

  // 默认浅色；只有用户主动切换过才恢复深色
  var saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* 隐私模式下忽略 */ }
  applyTheme(saved === 'dark');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = !isDark();
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next ? 'dark' : 'light'); } catch (e) {}
    });
  }

  /* ---------- 3. 滚动淡入 ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -6% 0px' });

    Array.prototype.forEach.call(revealEls, function (el) {
      revealObserver.observe(el);
    });
  } else {
    // 老浏览器直接显示
    Array.prototype.forEach.call(revealEls, function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- 4. 导航当前区块高亮 ---------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav-links a[href^="#"]')
  );

  var sections = navLinks.map(function (link) {
    return document.getElementById(link.getAttribute('href').slice(1));
  }).filter(Boolean);

  function updateActiveLink() {
    if (!sections.length) return;

    var probe = window.scrollY + 130; // 顶端留出导航栏高度
    var activeId = null;

    sections.forEach(function (section) {
      if (section.offsetTop <= probe) activeId = section.id;
    });

    // 已经滚到页面底部时，强制点亮最后一节
    var atBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 4;
    if (atBottom) activeId = sections[sections.length - 1].id;

    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + activeId);
    });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      updateActiveLink();
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  updateActiveLink();
})();
