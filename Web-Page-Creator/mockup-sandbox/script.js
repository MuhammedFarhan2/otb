(function () {
  'use strict';

  var root = document.getElementById('root');

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function galleryHtml() {
    return (
      '<div class="min-h-screen flex items-center justify-center p-8">' +
      '<div class="text-center max-w-md">' +
      '<h1 class="page-title">Component Preview Server</h1>' +
      '<p class="page-body">This server renders individual components for the workspace canvas.</p>' +
      '<p class="page-note">Access component previews at ' +
      '<a class="code-chip" href="#/preview/ComponentName">#/preview/ComponentName</a></p>' +
      '</div>' +
      '</div>'
    );
  }

  function previewHtml(componentPath) {
    var message = 'No component found at ' + componentPath + '.tsx';
    return '<pre class="preview-error">' + escapeHtml(message) + '</pre>';
  }

  function render() {
    var raw = window.location.hash.replace(/^#\/?/, '');

    if (raw.indexOf('preview/') === 0) {
      var componentPath = raw.slice('preview/'.length).replace(/\/+$/, '');
      document.title = componentPath + ' · Mockup Canvas';
      root.innerHTML = previewHtml(componentPath);
    } else {
      document.title = 'Mockup Canvas';
      root.innerHTML = galleryHtml();
    }
  }

  window.addEventListener('hashchange', render);
  render();
})();
