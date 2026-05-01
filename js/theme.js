(function () {
    'use strict';

    var root = document.documentElement;
    var STORAGE_KEY = 'theme';

    function safeGet(key) {
        try {
            return globalThis.localStorage.getItem(key);
        } catch (e) {
            console.debug('theme: storage read blocked', e);
            return null;
        }
    }

    function safeSet(key, value) {
        try {
            globalThis.localStorage.setItem(key, value);
        } catch (e) {
            console.debug('theme: storage write blocked', e);
        }
    }

    function apply(theme) {
        root.dataset.theme = theme;
    }

    function init() {
        var saved = safeGet(STORAGE_KEY);
        var preferred = globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        apply(saved || preferred);
    }

    function bind() {
        var btn = document.querySelector('[data-theme-toggle]');
        if (!btn) return;
        btn.addEventListener('click', function () {
            var current = root.dataset.theme === 'dark' ? 'dark' : 'light';
            apply(current === 'dark' ? 'light' : 'dark');
            safeSet(STORAGE_KEY, root.dataset.theme);
        });
    }

    init();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bind);
    } else {
        bind();
    }
})();
