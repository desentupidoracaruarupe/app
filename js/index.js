// Substituir nome da cidade dinamicamente com base no subdomínio
(function() {
    var cidade = window.__cidadeAtual || 'Caruaru';
    if (cidade !== 'Caruaru') {
        // Substituir todos os spans com class "city-name"
        document.querySelectorAll('.city-name').forEach(function(el) {
            el.textContent = cidade;
        });
        // Substituir meta description
        var metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', metaDesc.getAttribute('content').replace(/Caruaru/g, cidade));
        }
    }
})();

// Rolagem suave personalizada
document.querySelectorAll('header nav a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        const yOffset = -70; // compensar o header fixo
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
    });
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./js/sw.js')
            .then(reg => console.log('Service Worker registrado:', reg))
            .catch(err => console.log('Falha ao registrar SW:', err));
    });
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const navMenu = document.getElementById('navMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const navLinks = document.querySelectorAll('#navMenu a');

    function openMenu() {
        navMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evita rolagem no fundo
    }

    function closeMenu() {
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuToggle && menuClose && navMenu && menuOverlay) {
        menuToggle.addEventListener('click', openMenu);
        menuClose.addEventListener('click', closeMenu);
        menuOverlay.addEventListener('click', closeMenu);

        // Fecha o menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
});