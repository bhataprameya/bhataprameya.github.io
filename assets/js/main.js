document.addEventListener('DOMContentLoaded', function () {

    // Cursor glow effect
    document.addEventListener('mousemove', function (e) {
        document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
        document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
    });

    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    // Section fade-in on scroll
    var fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -60px 0px' });

    sections.forEach(function (s) {
        fadeObserver.observe(s);
    });

    // Scroll spy for sidebar nav
    var spyObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var id = entry.target.getAttribute('id');
                navLinks.forEach(function (link) {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { rootMargin: '-40% 0px -58% 0px' });

    sections.forEach(function (s) {
        spyObserver.observe(s);
    });
});
