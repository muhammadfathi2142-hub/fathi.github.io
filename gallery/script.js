// ==========================================================
// File: script.js
// Logika Universal Lightbox (Pop-up) untuk Foto dan Video
// ==========================================================
document.addEventListener('DOMContentLoaded', function() {
    const triggers = document.querySelectorAll('.lightbox-trigger');
    const lightbox = document.getElementById('lightbox');
    const closeButton = document.querySelector('.close-button');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxVideo = document.getElementById('lightbox-video');
    const body = document.body;

    // --- FUNGSI PENUTUP LIGHTBOX ---
    function closeLightbox() {
        lightbox.classList.remove('active');
        lightboxVideo.pause();
        lightboxVideo.removeAttribute('src'); // Hapus sumber video
        lightboxImage.removeAttribute('src'); // Hapus sumber gambar
        body.style.overflow = ''; // Mengaktifkan scroll body kembali
    }

    triggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            
            const mediaSrc = this.dataset.src;
            const mediaType = this.dataset.type;

            // 1. Reset dan sembunyikan semua media
            lightboxImage.style.display = 'none';
            lightboxVideo.style.display = 'none';
            lightboxVideo.pause();
            
            // 2. Tentukan dan tampilkan media yang benar
            if (mediaType === 'image') {
                lightboxImage.src = mediaSrc;
                lightboxImage.style.display = 'block';
                
            } else if (mediaType === 'video') {
                lightboxVideo.src = mediaSrc;
                lightboxVideo.style.display = 'block';
                lightboxVideo.play();
            }

            // 3. Tampilkan lightbox
            lightbox.classList.add('active');
            body.style.overflow = 'hidden'; // Mencegah scroll pada background
        });
    });

    // Event Listener untuk menutup lightbox
    closeButton.addEventListener('click', closeLightbox);

    // Menutup saat mengklik area gelap di luar media
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target === closeButton) { 
            closeLightbox();
        }
    });

    // Menutup dengan tombol ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

});