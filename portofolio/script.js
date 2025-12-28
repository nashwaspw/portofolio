document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.card, .project-item, section, .visit-btn, .about');
    elementsToAnimate.forEach(el => {
        el.classList.remove('is-visible'); 
        revealObserver.observe(el);
    });

    const carousel = document.querySelector('#carousel');
    const prevBtn = document.querySelector('#prevBtn');
    const nextBtn = document.querySelector('#nextBtn');

    if (carousel && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const card = carousel.querySelector('.card') || carousel.querySelector('.project-item');
            return card ? card.offsetWidth + 24 : 300; 
        };

        nextBtn.onclick = () => carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        prevBtn.onclick = () => carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    }

    const menuIcon = document.querySelector('#menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (menuIcon && navLinks) {
        menuIcon.onclick = function() {
            navLinks.classList.toggle('active');
            const isBars = menuIcon.classList.contains('fa-bars');
            menuIcon.classList.toggle('fa-bars', !isBars);
            menuIcon.classList.toggle('fa-xmark', isBars);
        };
    }

    document.addEventListener('click', function(e) {
        const tag = e.target.closest('.mood-tag');
        if (!tag) return;

        const container = tag.closest('.project-item');
        if (tag.classList.contains('tag-love')) {
            makeParticles(container, 'fa-heart', 'heart-particle', tag);
        } else if (tag.classList.contains('tag-star')) {
            makeParticles(container, 'fa-star', 'star-particle', tag);
        }
    });

    function makeParticles(container, icon, colorClass, button) {
        if (!container || !button) return;

        const rect = button.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const centerX = rect.left - containerRect.left + rect.width / 2;
        const centerY = rect.top - containerRect.top + rect.height / 2;

        for (let i = 0; i < 8; i++) {
            const p = document.createElement('i');
            p.className = `fa-solid ${icon} ${colorClass}`; 
            
            p.style.position = 'absolute';
            p.style.left = centerX + 'px';
            p.style.top = centerY + 'px';
            p.style.zIndex = '1000';

            const spreadX = (Math.random() * 200 - 100) + 'px';
            const flyUp = (-150 - Math.random() * 100) + 'px';
            
            p.style.setProperty('--x2', spreadX);
            p.style.setProperty('--y2', flyUp);
            
            container.appendChild(p);
            setTimeout(() => p.remove(), 2500);
        }
    }

    const form = document.getElementById('contactForm');
    const msgStatus = document.getElementById('formMessage');

    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            if (msgStatus) msgStatus.innerText = "Sending...";

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: new FormData(form)
            })
            .then(response => {
                if (response.ok) {
                    if (msgStatus) msgStatus.innerText = "Message Sent!";
                    form.reset();
                } else {
                    throw new Error();
                }
            })
            .catch(() => {
                if (msgStatus) msgStatus.innerText = "Error, please try again.";
            });
        };
    }
});