document.addEventListener('DOMContentLoaded', function() {
    // === Seleksi Elemen DOM ===
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropbtn = document.querySelector('.dropbtn');
    const links = document.querySelectorAll('.nav-links a:not(.dropbtn)'); 
    
    const MOBILE_BREAKPOINT = 768; 
    
    // === FUNGSI NAVIGASI RESPONSIF ===

    // 1. FUNGSI TOGGLE MENU UTAMA (Burger Icon)
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        // Saat menu utama ditutup, pastikan dropdown juga tertutup
        if (!navLinks.classList.contains('active')) {
             dropdownContent.classList.remove('mobile-show'); 
        }
    });

    // 2. FUNGSI MENUTUP MENU UTAMA setelah mengklik Link (di mobile)
    links.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active') && window.innerWidth <= MOBILE_BREAKPOINT) {
                setTimeout(() => {
                    navLinks.classList.remove('active');
                    dropdownContent.classList.remove('mobile-show'); 
                }, 300); 
            }
        });
    });

    // 3. FUNGSI TOGGLE DROPDOWN (Mapel) - HANYA BERFUNGSI DI MOBILE (klik)
    dropbtn.addEventListener('click', function(e) {
        e.preventDefault(); 
        
        if (window.innerWidth <= MOBILE_BREAKPOINT) {
            // Mobile: Toggle kelas 'mobile-show' untuk menampilkan dropdown
            dropdownContent.classList.toggle('mobile-show');
        }
        // Di Desktop: Dibiarkan, karena sudah diatur oleh CSS Hover
    });

    // 4. Tutup Dropdown dan Menu Utama saat mengklik link di dalam dropdown (di mobile)
    dropdownContent.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= MOBILE_BREAKPOINT) {
                 dropdownContent.classList.remove('mobile-show');
                 navLinks.classList.remove('active');
            }
        });
    });
    
    // === FUNGSI EFEK VISUAL (Fade-in On Scroll) ===
    
    const sections = document.querySelectorAll('.section');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)'; 
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)'; 
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        sectionObserver.observe(section);
    });
});