document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.2 }); // Animasi mulai saat 20% bagian muncul di layar

    // Mendaftarkan section about ke observer
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
    const contactSection = document.querySelector('.contact');
    if (contactSection) {
    contactObserver.observe(contactSection);
}
});

const initSmoothNav = () => {
        document.querySelectorAll('.nav-links a, .logo').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if(targetId === "#") return window.scrollTo({top: 0, behavior: 'smooth'});
                
                const targetSection = document.querySelector(targetId);
                
                // Animasi scroll halus

                // Berikan class reveal secara paksa jika belum terlihat
                targetSection.classList.add('is-visible');
                targetSection.classList.add('section-focus');
                
                setTimeout(() => targetSection.classList.remove('section-focus'), 1000);
            });
        });
    };

function launchConfetti(container, iconClass, colorClass) {
    const confettiCount = 20; // Jumlah confetti yang muncul
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('i');
        confetti.classList.add('fa-solid', iconClass, 'confetti', colorClass);
        
        // Atur posisi horizontal secara acak (0% sampai 100% lebar kotak)
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-20px'; // Mulai dari sedikit di atas kotak
        
        // Efek acak untuk jatuhnya
        confetti.style.setProperty('--spread', (Math.random() * 100 - 50) + 'px');
        
        // Variasi ukuran dan kecepatan
        confetti.style.fontSize = (Math.random() * 10 + 10) + 'px';
        confetti.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
        confetti.style.opacity = Math.random();

        container.appendChild(confetti);

        // Hapus setelah jatuh
        setTimeout(() => {
            confetti.remove();
        }, 2000);
    }
}

// Cara pakainya di dalam DOMContentLoaded:
document.addEventListener('DOMContentLoaded', () => {
    // Tombol Love
    document.querySelectorAll('.tag-love').forEach(btn => {
        btn.addEventListener('click', function() {
            const container = this.closest('.project-item');
            launchConfetti(container, 'fa-heart', 'heart-particle');
        });
    });

    // Tombol Star
    document.querySelectorAll('.tag-star').forEach(btn => {
        btn.addEventListener('click', function() {
            const container = this.closest('.project-item');
            launchConfetti(container, 'fa-star', 'star-particle');
        });
    });
});

// 2. Tunggu sampai HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIKA TOMBOL EXPERIENCE ---
    
    // Klik Love
    const loveButtons = document.querySelectorAll('.tag-love');
    loveButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const container = this.closest('.project-item');
            createParticle(e, container, 'fa-heart', 'heart-particle');
        });
    });

    // Klik Memorable (Bintang)
    const starButtons = document.querySelectorAll('.tag-star');
    starButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const container = this.closest('.project-item');
            createParticle(e, container, 'fa-star', 'star-particle');
        });
    });

    // --- LOGIKA NAVBAR MOBILE ---
    
    const menuIcon = document.querySelector('#menu-icon');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuIcon && navLinks) {
        menuIcon.onclick = () => {
            navLinks.classList.toggle('active');
        };

        // Otomatis tutup navbar saat link diklik (opsional tapi imut)
        navLinks.querySelectorAll('a').forEach(link => {
            link.onclick = () => {
                navLinks.classList.remove('active');
            };
        });
    }
});
const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

if (menuIcon) {
    menuIcon.onclick = () => {
        // Toggle menu navigasi
        navLinks.classList.toggle('active');
        
        // Animasi putar ikon
        menuIcon.style.transform = navLinks.classList.contains('active') 
            ? 'rotate(180deg)' 
            : 'rotate(0deg)';

        // Ganti ikon bars menjadi xmark
        if (menuIcon.classList.contains('fa-bars')) {
            menuIcon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            menuIcon.classList.replace('fa-xmark', 'fa-bars');
        }
    };
}

const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    formMessage.innerHTML = "Please wait...";
    formMessage.style.color = "gray";

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let res = await response.json();
            if (response.status == 200) {
                formMessage.innerHTML = "Message sent! Thank you.";
                formMessage.style.color = "green";
                form.reset(); // Kosongkan form setelah sukses
            } else {
                formMessage.innerHTML = res.message;
                formMessage.style.color = "red";
            }
        })
        .catch(error => {
            formMessage.innerHTML = "Something went wrong!";
            formMessage.style.color = "red";
        });
});

/**
 * Apple Design Controller
 * Mengelola animasi halus dan transisi elemen
 */
const AppleStyleUI = (() => {
    
    // 1. Fungsi Smooth Scroll Reveal
    const initScrollReveal = () => {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        // Targetkan semua section dan card untuk di-reveal
        document.querySelectorAll('section, .card, .project-item').forEach((el) => {
            el.classList.add('reveal-element');
            revealObserver.observe(el);
        });
    };

    // 2. Carousel Controller dengan Smooth Snap
    const initCarousel = () => {
        const carousel = document.querySelector('#carousel');
        const prevBtn = document.querySelector('#prevBtn');
        const nextBtn = document.querySelector('#nextBtn');

        if (!carousel) return;

        const scrollAmount = () => carousel.querySelector('.card').offsetWidth + 24;

        nextBtn.onclick = () => {
            carousel.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        };

        prevBtn.onclick = () => {
            carousel.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        };
    };

    // 3. Navbar Adaptive (Glassmorphism Effect on Scroll)
    const initNavbar = () => {
        const header = document.querySelector('.header');
        window.onscroll = () => {
            if (window.scrollY > 50) {
                header.style.padding = "0.5rem 1.5rem";
                header.style.background = "rgba(30, 30, 30, 0.8)";
            } else {
                header.style.padding = "0.8rem 2rem";
                header.style.background = "#333";
            }
        };
    };

    return {
        init: () => {
            initScrollReveal();
            initCarousel();
            initNavbar();
        }
    };
})();

// Jalankan saat DOM siap
document.addEventListener('DOMContentLoaded', AppleStyleUI.init);