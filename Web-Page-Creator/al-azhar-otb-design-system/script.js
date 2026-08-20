(function () {
  'use strict';

  var ICON = {
    pencil: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    rotate: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    clipboard: '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
  };

  function icon(name, size, sw) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 2) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[name] + '</svg>';
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function brandLockup(extraClass, wordmark) {
    return '<div class="brand-lockup' + (extraClass ? ' ' + extraClass : '') + '">' +
      '<span class="brand-tile">' + icon('pencil', 21, 2.5) + '</span>' +
      '<span><span class="brand-wordmark">' + esc(wordmark || 'AL-AZHAR OTB') + '</span>' +
      '<span class="brand-kicker">school programme</span></span></div>';
  }

  function otbButton(label, variant, iconHtml, disabled, extraClass) {
    return '<button type="button" class="otb-btn ' + (variant || 'primary') + (extraClass ? ' ' + extraClass : '') + '"' + (disabled ? ' disabled' : '') + '>' + (iconHtml || '') + esc(label) + '</button>';
  }

  function letterRail(current) {
    var letters = ['A', 'B', 'C'];
    return '<div class="rail" role="group" aria-label="Scoring letter ' + letters[current] + '">' +
      letters.map(function (l, i) {
        var cls = (i === current ? ' active' : '') + (i < current ? ' done' : '');
        var dot = i < current ? icon('check', 14, 2.5) : l;
        var line = i < letters.length - 1 ? '<span class="rail-line"></span>' : '';
        return '<span class="rail-step' + cls + '"><span class="rail-dot">' + dot + '</span>' + line + '</span>';
      }).join('') +
      '</div>';
  }

  function swatch(blockLabel, fullLabel, cls) {
    return '<div class="swatch"><div class="swatch-block ' + cls + '">' + esc(blockLabel) + '</div><div class="swatch-label">' + esc(fullLabel || blockLabel) + '</div></div>';
  }

  function guidelines(doItems, dontItems) {
    var d = doItems.map(function (t) {
      return '<div class="guideline do"><span class="guideline-mark">Do</span><span>' + esc(t) + '</span></div>';
    }).join('');
    var n = dontItems.map(function (t) {
      return '<div class="guideline dont"><span class="guideline-mark">Don\'t</span><span>' + esc(t) + '</span></div>';
    }).join('');
    return '<div class="guidelines">' + d + n + '</div>';
  }

  var CORE_SWATCHES = swatch('Primary', 'Primary · pencil yellow', 'bg-primary text-primary-fg') +
    swatch('Secondary', 'Secondary · desk teal', 'bg-secondary text-white') +
    swatch('Accent', 'Accent · coral pencil', 'bg-accent text-white');

  var SUPPORTING_SWATCHES =
    swatch('Sky background', 'Sky background', 'bg-background border-swatch') +
    swatch('Warm paper', 'Warm paper', 'bg-card border-swatch') +
    swatch('Navy ink', 'Navy ink', 'bg-foreground text-background') +
    swatch('Muted paper', 'Muted paper', 'bg-muted border-swatch') +
    swatch('Reject / danger', 'Reject / danger', 'bg-destructive text-white');

  function overviewPage() {
    return '' +
      '<div class="card hero-card">' +
      '<div class="card-eyebrow">The point of view</div>' +
      '<h2 class="hero-title">A bright notebook for thoughtful judgement.</h2>' +
      '<p class="hero-desc">AL-AZHAR OTB uses tactile school-day cues to make a high-attention task feel calm: paper holds the work, navy anchors the desk, and yellow marks the next move.</p>' +
      '<div class="hero-grid">' +
      '<div class="stage" style="background-image:url(\'img/notebook-wide.png\')">' +
      '<div class="nb-surface p-5">' + brandLockup('') + '</div>' +
      '</div>' +
      '<div class="sidebar-panel">' +
      '<div class="sidebar-panel-eyebrow">Pilot components</div>' +
      otbButton('Open judging desk', 'primary') +
      letterRail(1) +
      '<p class="sidebar-panel-caption">Five reusable patterns extracted from the current judging desk.</p>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="card">' +
      '<div class="card-eyebrow">Core palette</div>' +
      '<div class="swatch-grid">' + CORE_SWATCHES + '</div>' +
      '</div>' +
      '<div class="card">' +
      '<div class="card-eyebrow">System principles</div>' +
      guidelines(
        ['Let a clear next action be as bright as a sharpened pencil.', 'Keep task surfaces warm, readable, and a little tactile.'],
        ['Flatten the product into a generic white admin panel.']
      ) +
      '</div>';
  }

  function brandLockupDemo() {
    return '' +
      '<div class="demo-stack">' +
      '<div class="panel-navy">' + brandLockup('') + '</div>' +
      '<div class="panel-foreground">' + brandLockup('color-yellow') + '</div>' +
      '</div>' +
      '<p class="page-caption">The lockup pairs a small hand-mark gesture with compact school-programme metadata. Keep it anchored to the navy desk bar.</p>';
  }

  function colorsPage() {
    return '' +
      '<div class="card">' +
      '<h2 class="section-title-serif">Color roles</h2>' +
      '<p class="section-sub">The palette is role-led, not decoration-led: yellow asks for attention, teal reassures, coral remembers that the work matters.</p>' +
      '<div class="swatch-grid">' + CORE_SWATCHES + '</div>' +
      '<div class="section">' +
      '<h3 class="section-title-serif">Supporting surfaces</h3>' +
      '<p class="section-sub">Paper, sky, navy ink, and semantic feedback complete the notebook environment.</p>' +
      '<div class="swatch-grid supporting">' + SUPPORTING_SWATCHES + '</div>' +
      '</div>' +
      '</div>';
  }

  function fontsPage() {
    return '' +
      '<div class="card">' +
      '<div class="card-eyebrow">Font families</div>' +
      '<h2 class="font-demo-title-serif">Make room for the idea.</h2>' +
      '<p class="section-sub" style="margin-top:.75rem">Plus Jakarta Sans keeps forms and tables legible. Fraunces gives moments of welcome and completion a human voice. DM Mono marks compact judge metadata.</p>' +
      '<div class="section">' +
      '<div class="type-grid">' +
      '<div class="type-cell"><div class="type-label">Sans</div><div class="type-sample-sans">Judge clearly.</div></div>' +
      '<div class="type-cell"><div class="type-label">Serif</div><div class="type-sample-serif">Turn the page.</div></div>' +
      '<div class="type-cell"><div class="type-label">Mono</div><div class="type-sample-mono">A · B · C</div></div>' +
      '</div>' +
      '</div>' +
      '</div>';
  }

  function layoutPage() {
    var bars = [1, 2, 3, 4, 6].map(function (step) {
      return '<div class="spacing-item"><div class="spacing-box"><span class="spacing-bar" style="width:' + (step * 16) + 'px"></span></div><div class="spacing-label">' + step + ' × base</div></div>';
    }).join('');
    return '' +
      '<div class="card">' +
      '<h2 class="section-title-serif">Notebook rhythm</h2>' +
      '<p class="section-sub">Use a quarter-rem base step, generous paper padding, and rounded corners that feel friendly rather than polished flat.</p>' +
      '<div class="spacing-grid">' + bars + '</div>' +
      '<div class="section two-col-grid">' +
      '<div class="nb-surface p-6">' +
      '<div class="card-eyebrow">Surface elevation</div>' +
      '<p class="page-caption" style="margin-top:.5rem">Warm translucent paper with a quiet navy shadow keeps the background illustration present but never noisy.</p>' +
      '</div>' +
      '<div class="stage portrait" style="background-image:url(\'img/notebook-portrait.png\')">' + letterRail(0) + '</div>' +
      '</div>' +
      '</div>';
  }

  function otbButtonDemo() {
    return '' +
      '<div class="card">' +
      '<div class="stack">' +
      '<div class="stack-label">Actions</div>' +
      '<div class="row">' +
      otbButton('Open judging desk', 'primary', icon('arrowRight', 16, 2)) +
      otbButton('Back to desk', 'secondary') +
      otbButton('Switch programme', 'ghost') +
      otbButton('Reset', 'danger', icon('rotate', 15, 2)) +
      '</div>' +
      '</div>' +
      '<div class="stack" style="margin-top:2rem">' +
      '<div class="stack-label">States</div>' +
      '<div class="row">' +
      otbButton('Saving mark…', 'primary', null, true) +
      otbButton('Full-width action', 'primary', null, false, 'wide') +
      '</div>' +
      '</div>' +
      '</div>';
  }

  function nbSurfaceDemo() {
    return '' +
      '<div class="card">' +
      '<div class="nb-surface demo-surface">' +
      '<div class="card-eyebrow">Judge access</div>' +
      '<h3 class="surface-title-serif">Ready when you are.</h3>' +
      '<p class="page-caption" style="margin-top:.75rem">Warm paper surfaces hold the task at hand without flattening the playful notebook world around it.</p>' +
      '<div class="row" style="margin-top:1.25rem">' +
      otbButton('Continue', 'primary', icon('arrowRight', 16, 2)) +
      '<span class="three-letters">' + icon('clipboard', 15, 2) + ' Three letters</span>' +
      '</div>' +
      '</div>' +
      guidelines(
        ['Use paper surfaces to group a clear task or moment of feedback.', 'Keep the surrounding notebook field visible so the product keeps its sense of place.'],
        ['Stack several heavy surfaces together when one can carry the hierarchy.']
      ) +
      '</div>';
  }

  function nbStageDemo() {
    return '' +
      '<div class="card">' +
      '<div class="stage demo-stage" style="background-image:url(\'img/notebook-wide.png\')">' +
      '<div class="nb-surface stage-surface p-6">' +
      '<div class="card-eyebrow">A calm place to make a call</div>' +
      '<h3 class="stage-title-serif">Give every idea a fair page.</h3>' +
      '<p class="page-caption" style="margin-top:.75rem">The stage gives each screen the same illustrated notebook setting.</p>' +
      '</div>' +
      '</div>' +
      '</div>';
  }

  function letterRailDemo() {
    return '' +
      '<div class="card">' +
      '<div class="stack">' +
      '<div class="stack-label">Progress</div>' +
      '<div class="row">' + letterRail(0) + letterRail(1) + letterRail(2) + '</div>' +
      '</div>' +
      guidelines(
        ['Use the yellow state for the current code letter and teal for completed letters.', 'Keep the rail visible while a judge is moving through the A–C sequence.'],
        ['Use the rail as a general navigation menu; it is a progress signal.']
      ) +
      '</div>';
  }

  var PAGES = {
    overview: { group: null, title: 'Overview', desc: 'A bright notebook language for calm, clear, and thoughtful judging moments.', render: overviewPage },
    'brand-lockup': { group: 'Brand', title: 'Brand lockup', desc: 'The lockup pairs a small hand-mark gesture with compact school-programme metadata.', render: brandLockupDemo },
    'color-roles': { group: 'Colors', title: 'Color roles', desc: 'Role-led palette tokens that keep the notebook environment readable.', render: colorsPage },
    'type-scale': { group: 'Fonts', title: 'Type scale', desc: 'Font families and display samples for the desk.', render: fontsPage },
    'spacing-radius': { group: 'Layout', title: 'Spacing and radius', desc: 'A quarter-rem rhythm, generous paper padding, and friendly corners.', render: layoutPage },
    'component-actions': { group: 'Components', title: 'Judging actions', desc: 'The four action buttons used across the desk.', render: otbButtonDemo },
    'component-surface': { group: 'Components', title: 'Notebook surface', desc: 'The warm paper task surface.', render: nbSurfaceDemo },
    'component-stage': { group: 'Components', title: 'Notebook stage', desc: 'The illustrated field behind every screen.', render: nbStageDemo },
    'component-letter-rail': { group: 'Components', title: 'Letter rail', desc: 'The A–C scoring progress signal.', render: letterRailDemo },
    'component-brand-lockup': { group: 'Components', title: 'Brand lockup', desc: 'Reusable compact header identity for the judging desk.', render: brandLockupDemo },
  };

  var NAV_GROUPS = [
    { label: 'Brand', pages: ['brand-lockup'] },
    { label: 'Colors', pages: ['color-roles'] },
    { label: 'Fonts', pages: ['type-scale'] },
    { label: 'Layout', pages: ['spacing-radius'] },
    { label: 'Components', pages: ['component-actions', 'component-surface', 'component-stage', 'component-letter-rail', 'component-brand-lockup'] },
  ];

  var searchInput = document.getElementById('search-input');
  var sidebarNav = document.getElementById('sidebar-nav');
  var mobileNavBody = document.getElementById('mobile-nav-body');
  var noResults = document.getElementById('no-results');
  var noResultsQuery = document.getElementById('no-results-query');
  var activeName = document.getElementById('active-name');
  var mainInner = document.getElementById('main-inner');
  var mobileNav = document.getElementById('mobile-nav');

  function currentPageId() {
    var params = new URLSearchParams(window.location.hash.slice(1));
    var id = params.get('page');
    return id && PAGES[id] ? id : 'overview';
  }

  function navEntry(id, activeId) {
    return '<button type="button" class="nav-entry" data-page="' + id + '"' + (activeId === id ? ' aria-current="true"' : '') + '>' + esc(PAGES[id].title) + '</button>';
  }

  function buildNavHtml(activeId, query) {
    var q = (query || '').trim().toLowerCase();
    var html = '';
    var overview = PAGES.overview;
    var ovMatch = !q || (overview.title + ' ' + overview.desc).toLowerCase().indexOf(q) !== -1;
    if (ovMatch) html += navEntry('overview', activeId);

    NAV_GROUPS.forEach(function (group) {
      var groupMatch = group.label.toLowerCase().indexOf(q) !== -1;
      var pages = group.pages;
      if (q && !groupMatch) {
        pages = group.pages.filter(function (id) {
          var p = PAGES[id];
          return (p.title + ' ' + p.desc).toLowerCase().indexOf(q) !== -1;
        });
      }
      if (!pages.length) return;
      html += '<div class="nav-group"><div class="nav-group-label">' + esc(group.label) + '</div><div class="nav-group-items">';
      html += pages.map(function (id) { return navEntry(id, activeId); }).join('');
      html += '</div></div>';
    });
    return html;
  }

  function headerHtml(page, title, desc) {
    return '<div class="page-header">' +
      (page ? '<p class="page-eyebrow">' + esc(page) + '</p>' : '') +
      '<h1 class="page-title">' + esc(title) + '</h1>' +
      '<p class="page-desc">' + esc(desc) + '</p>' +
      '</div>';
  }

  function attachNavListeners() {
    document.querySelectorAll('[data-page]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.location.hash = 'page=' + btn.getAttribute('data-page');
      });
    });
  }

  function render() {
    var id = currentPageId();
    var page = PAGES[id];
    var query = searchInput.value;
    var navHtml = buildNavHtml(id, query);

    sidebarNav.innerHTML = navHtml;
    mobileNavBody.innerHTML = '<div class="sidebar-nav">' + navHtml + '</div>';
    noResults.hidden = !(query && navHtml === '');
    noResultsQuery.textContent = query;
    activeName.textContent = page.title;

    var header = id === 'overview'
      ? headerHtml('', 'AL-AZHAR OTB Design System', 'A bright notebook language for calm, clear, and thoughtful judging moments.')
      : headerHtml(page.group, page.title, page.desc);

    mainInner.innerHTML = header + '<div class="page-body">' + page.render() + '</div>';

    attachNavListeners();
    if (mobileNav.open) mobileNav.open = false;
    window.scrollTo(0, 0);
  }

  searchInput.addEventListener('input', render);
  window.addEventListener('hashchange', render);
  render();
})();
