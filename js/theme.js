(function () {
    'use strict';

    const root = document.documentElement;
    const STORAGE_KEY = 'theme';

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
        const saved = safeGet(STORAGE_KEY);
        const preferred = globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        apply(saved || preferred);
    }

    function bind() {
        const btn = document.querySelector('[data-theme-toggle]');
        if (!btn) return;
        btn.addEventListener('click', function () {
            const current = root.dataset.theme === 'dark' ? 'dark' : 'light';
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
