/*
  YoLingo CMS Content Loader
  This keeps the website working as a normal static site, but allows Decap CMS
  to update selected text/links from the JSON files inside /content.
*/
(function () {
  const CONTENT_FILES = {
    site: 'content/site.json',
    home: 'content/home.json',
    pricing: 'content/pricing.json',
    contact: 'content/contact.json'
  };

  function getValue(source, path) {
    return path.split('.').reduce(function (value, key) {
      if (value === undefined || value === null) return undefined;
      const arrayMatch = key.match(/^(\w+)\[(\d+)\]$/);
      if (arrayMatch) {
        return value[arrayMatch[1]] && value[arrayMatch[1]][Number(arrayMatch[2])];
      }
      return value[key];
    }, source);
  }

  async function loadJson(path) {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error('Could not load ' + path);
    return response.json();
  }

  function setElementText(element, value) {
    // Preserve simple icon elements inside buttons/headings, then replace the label text.
    const icons = Array.from(element.children)
      .filter(function (child) { return child.matches && child.matches('i, svg'); })
      .map(function (child) { return child.cloneNode(true); });

    if (icons.length > 0) {
      element.textContent = '';
      icons.forEach(function (icon) { element.appendChild(icon); });
      element.appendChild(document.createTextNode(' ' + value));
    } else {
      element.textContent = value;
    }
  }

  function applyText(rootData) {
    document.querySelectorAll('[data-cms-text]').forEach(function (element) {
      const value = getValue(rootData, element.getAttribute('data-cms-text'));
      if (value !== undefined && value !== null) setElementText(element, value);
    });
  }

  function applyHtml(rootData) {
    document.querySelectorAll('[data-cms-html]').forEach(function (element) {
      const value = getValue(rootData, element.getAttribute('data-cms-html'));
      if (value !== undefined && value !== null) element.innerHTML = value;
    });
  }

  function applyAttributes(rootData) {
    ['href', 'src', 'alt', 'action', 'title'].forEach(function (attr) {
      document.querySelectorAll('[data-cms-' + attr + ']').forEach(function (element) {
        const value = getValue(rootData, element.getAttribute('data-cms-' + attr));
        if (value !== undefined && value !== null && value !== '') element.setAttribute(attr, value);
      });
    });
  }

  async function initCmsContent() {
    try {
      const loaded = await Promise.all(Object.entries(CONTENT_FILES).map(async function ([key, path]) {
        return [key, await loadJson(path)];
      }));
      const rootData = Object.fromEntries(loaded);
      applyText(rootData);
      applyHtml(rootData);
      applyAttributes(rootData);
    } catch (error) {
      // If content files cannot load, the original hardcoded HTML remains visible.
      console.warn('CMS content not loaded:', error.message);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCmsContent);
  } else {
    initCmsContent();
  }
})();
