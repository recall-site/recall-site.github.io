(function () {
  var root = document.documentElement;

  // Tema: respeita o sistema por padrão; o botão alterna e lembra a escolha.
  try {
    var saved = localStorage.getItem('recall-theme');
    if (saved) root.setAttribute('data-theme', saved);
  } catch (e) {}

  function currentTheme() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('recall-theme', next); } catch (e) {}
    });
  });

  // Menu mobile
  var menuBtn = document.querySelector('.menu-btn');
  var links = document.querySelector('.nav-links');
  if (menuBtn && links) {
    menuBtn.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
  }

  // Destaca o instalador do sistema operacional do visitante
  var ua = navigator.userAgent || '';
  var os = /Windows/i.test(ua) ? 'windows' : /Mac/i.test(ua) ? 'mac' : /Linux|X11/i.test(ua) ? 'linux' : null;
  if (os) {
    var card = document.querySelector('[data-os="' + os + '"]');
    if (card) {
      card.classList.add('recommended');
      var badge = card.querySelector('.badge');
      if (badge) badge.hidden = false;
    }
    var heroBtn = document.getElementById('hero-download');
    var label = { windows: 'Windows', mac: 'macOS', linux: 'Linux' }[os];
    var target = card && card.querySelector('.dl.primary');
    if (heroBtn && target) {
      heroBtn.href = target.href;
      heroBtn.textContent = 'Download for ' + label;
    }
  }

  // Abas de instruções do macOS
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var tabs = group.querySelectorAll('.tab');
    var panels = group.querySelectorAll('.tab-panel');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.setAttribute('aria-selected', t === tab); });
        panels.forEach(function (p) { p.hidden = p.id !== tab.getAttribute('aria-controls'); });
      });
    });
  });
})();
