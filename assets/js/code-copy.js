/* Dependency-free copy controls for commands and source-code examples. */
(function (root) {
  'use strict';
  function fallbackCopy(text, document) {
    var previous = document.activeElement;
    var field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.left = '-9999px';
    field.style.top = '0';
    document.body.appendChild(field);
    try {
      field.select();
      if (!document.execCommand('copy')) throw new Error('Clipboard unavailable');
    } finally {
      field.parentNode.removeChild(field);
      if (previous && typeof previous.focus === 'function') previous.focus();
    }
  }

  function copyText(text, document, navigator) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      return Promise.resolve().then(function () { return navigator.clipboard.writeText(text); }).catch(function () {
        fallbackCopy(text, document);
      });
    }
    return Promise.resolve().then(function () { fallbackCopy(text, document); });
  }

  function initialize(document, navigator) {
    // Console transcripts can include prompts/output: leave those untouched.
    var languages = ['shell', 'bash', 'sh', 'stlmc', 'stlmc-config', 'python', 'javascript', 'js', 'json', 'css', 'html', 'xml', 'yaml', 'yml', 'toml', 'ini', 'ruby', 'c', 'cpp', 'java', 'sql'];
    var selectors = languages.map(function (language) {
      return 'pre code.language-' + language + ', .language-' + language + ' pre code';
    }).join(', ');
    document.querySelectorAll(selectors).forEach(function (code) {
      var pre = code.closest('pre');
      // Liquid highlights put the language on <code>; Markdown fences put it
      // on an outer <div>. Attach controls outside <pre> in both structures.
      var container = pre.parentElement;
      // Unknown Rouge languages can render as a bare <pre>. Never turn the
      // surrounding article into a code box: create a local wrapper instead.
      if ((' ' + (container.className || '') + ' ').indexOf(' highlight ') < 0) {
        var wrapper = document.createElement('div');
        wrapper.className = 'highlight';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        container = wrapper;
      }
      if (container.querySelector('.code-copy-button')) return;
      container.classList.add('code-copy-container');
      if (!code.closest('.language-shell, .language-bash, .language-sh')) container.classList.add('code-copy-source');
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'code-copy-button';
      button.textContent = 'Copy';
      button.title = 'Copy code';
      button.setAttribute('aria-label', 'Copy code to clipboard');
      button.setAttribute('aria-live', 'polite');
      button.addEventListener('click', function () {
        if (button.getAttribute('aria-disabled') === 'true') return;
        button.setAttribute('aria-disabled', 'true');
        copyText(code.textContent, document, navigator).then(function () {
          button.textContent = 'Copied!';
          button.setAttribute('aria-label', 'Code copied');
        }, function () {
          button.textContent = 'Failed';
          button.setAttribute('aria-label', 'Copy failed; select the code and copy manually');
        }).then(function () {
          root.setTimeout(function () {
            button.textContent = 'Copy';
            button.setAttribute('aria-label', 'Copy code to clipboard');
            button.setAttribute('aria-disabled', 'false');
          }, 2000);
        });
      });
      container.appendChild(button);
    });
  }
  var api = {copyText: copyText, initialize: initialize};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.STLmcCodeCopy = api;
  if (root.document) {
    var ready = function () { initialize(root.document, root.navigator || {}); };
    if (root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', ready);
    else ready();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
