document.addEventListener('DOMContentLoaded', function() {
    
    // === A. LOGIKA ANIMASI MENGETIK (TYPEWRITER EFFECT) ===
    const textToType = "Muhammad Fathi Alfardan"; // Teks yang akan diketik
    const targetElement = document.getElementById('typing-text');
    const speed = 80; // Kecepatan mengetik (milidetik)
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < textToType.length) {
            // Menambahkan satu karakter ke elemen target
            targetElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            // Mengulang fungsi setelah jeda waktu (speed)
            setTimeout(typeWriter, speed);
        }
    }

    // Panggil fungsi typeWriter saat seluruh konten halaman sudah dimuat
    typeWriter();


    // === B. LOGIKA NAVIGASI MOBILE ===
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdownContainer = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropbtn = document.querySelector('.dropbtn');
    
    // Mengambil semua link kecuali tombol dropdown dan link di dalamnya
    const links = document.querySelectorAll('.nav-links a:not(.dropbtn):not(.dropdown-content a)'); 
    
    const MOBILE_BREAKPOINT = 768; 
    
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
        // Hanya jalankan logika klik jika di tampilan mobile
        if (window.innerWidth <= MOBILE_BREAKPOINT) {
            e.preventDefault(); 
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
    
    // === C. FUNGSI EFEK VISUAL (Fade-in On Scroll) ===
    
    const sections = document.querySelectorAll('.section');
    // Setel threshold 0.1, artinya animasi dipicu saat 10% elemen terlihat.
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)'; 
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        // Abaikan Hero Section dari animasi scroll karena sudah terlihat di awal
        if (section.id !== 'hero') { 
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)'; 
            section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            sectionObserver.observe(section);
        }
    });
});