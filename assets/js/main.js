document.addEventListener('DOMContentLoaded', function () {

    var sections = document.querySelectorAll('main section[id]');
    var navLinks = document.querySelectorAll('.nav-links .nav-link');
    var topbar = document.getElementById('topbar');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Cursor glow — fine pointers only
    var finePointer = window.matchMedia('(pointer: fine)').matches;
    if (finePointer && !reduceMotion) {
        document.addEventListener('mousemove', function (e) {
            document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
            document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
        });
    }

    // Topbar background once past the hero fold
    function updateTopbar() {
        if (!topbar) return;
        topbar.classList.toggle('scrolled', window.scrollY > 30);
    }
    window.addEventListener('scroll', updateTopbar, { passive: true });
    updateTopbar();

    if ('IntersectionObserver' in window) {
        // Section fade-in on scroll
        var fadeObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.04, rootMargin: '0px 0px -40px 0px' });

        sections.forEach(function (s) {
            fadeObserver.observe(s);
        });

        // Scroll spy for topbar nav
        var spyObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.getAttribute('id');
                    navLinks.forEach(function (link) {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                    });
                }
            });
        }, { rootMargin: '-35% 0px -58% 0px' });

        sections.forEach(function (s) {
            spyObserver.observe(s);
        });
    } else {
        // Older browsers: reveal everything immediately
        sections.forEach(function (s) {
            s.classList.add('visible');
        });
    }
});
