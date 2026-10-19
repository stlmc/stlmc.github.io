/* Static code highlighting for the STLmc model and configuration languages.
 * Standalone implementation: no editor library or generated HTML is required.
 */
(function (root) {
  'use strict';

  function tokenize(source, kind) {
    var tokens = [];
    var offset = 0;
    function take(text, style) {
      tokens.push({text: text, style: style || null});
      offset += text.length;
    }
    while (offset < source.length) {
      var rest = source.slice(offset);
      var match;
      if ((match = /^\s+/.exec(rest))) {
        take(match[0]);
      } else if (rest.slice(0, 3) === "'''") {
        var end = source.indexOf("'''", offset + 3);
        take(source.slice(offset, end < 0 ? source.length : end + 3), 'comment');
      } else if ((match = /^#[^\r\n]*/.exec(rest))) {
        take(match[0], 'comment');
      } else if (kind === 'config' && (match = /^"(?:\\.|[^"\\])*"/.exec(rest))) {
        take(match[0], 'string');
      } else if (kind !== 'config' && (match = /^\[\s*[A-Za-z_][A-Za-z0-9_]*\s*\](?=\s*:)/.exec(rest))) {
        take(match[0], 'label');
      } else if (kind !== 'config' && (match = /^d\/dt\b/.exec(rest))) {
        take(match[0], 'builtin');
      } else if ((match = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/.exec(rest))) {
        take(match[0], 'number');
      } else if ((match = /^(?:\[\]|<>|=>|->|<=|>=|!=|\*\*|[=<>+*\/~\-])/.exec(rest))) {
        take(match[0], 'operator');
      } else if ((match = (kind === 'config' ? /^[A-Za-z_][A-Za-z0-9_.\/-]*/ : /^[A-Za-z_][A-Za-z0-9_]*'?/).exec(rest))) {
        var word = match[0];
        var style = 'variable';
        if (/^(true|false)$/i.test(word)) style = 'bool';
        else if (word === 'inf') style = 'number';
        else if (kind === 'config') {
          if (/^\s*=/.test(rest.slice(word.length))) style = 'keyword';
          else if (word === 'extends' || /^\s*(?:\{|extends\b)/.test(rest.slice(word.length))) style = 'builtin';
        } else if (/^(bool|int|real)$/i.test(word)) style = 'type';
        else if (/^(const|mode|inv|flow|jump|init|proposition|goal|reach)$/.test(word)) style = 'keyword';
        else if (/^(and|or|not)$/i.test(word) || /^(U|R)$/.test(word)) style = 'operator';
        else if (/^(sin|cos|tan|arcsin|arccos|arctan|sqrt)$/.test(word)) style = 'builtin';
        else if (word.slice(-1) === "'") style = 'next';
        take(word, style);
      } else {
        take(rest.charAt(0));
      }
    }
    return tokens;
  }

  function highlightElement(element, kind) {
    if (element.getAttribute('data-stlmc-highlighted') === 'true') return;
    var source = element.textContent;
    var document = element.ownerDocument;
    var fragment = document.createDocumentFragment();
    tokenize(source, kind).forEach(function (token) {
      if (!token.style) fragment.appendChild(document.createTextNode(token.text));
      else {
        var span = document.createElement('span');
        span.className = 'stlmc-token-' + token.style;
        span.appendChild(document.createTextNode(token.text));
        fragment.appendChild(span);
      }
    });
    element.textContent = '';
    element.appendChild(fragment);
    element.setAttribute('data-stlmc-highlighted', 'true');
  }

  function highlightAll(document) {
    document.querySelectorAll('code.language-stlmc, .language-stlmc code, code.language-stlmc-config, .language-stlmc-config code').forEach(function (element) {
      var config = element.classList.contains('language-stlmc-config') || element.closest('.language-stlmc-config');
      highlightElement(element, config ? 'config' : 'model');
    });
  }

  var api = {tokenize: tokenize, highlightElement: highlightElement, highlightAll: highlightAll};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.STLmcHighlight = api;
  if (root.document) {
    if (root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', function () { highlightAll(root.document); });
    else highlightAll(root.document);
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
