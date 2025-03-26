document.addEventListener('DOMContentLoaded', () => {
    const greeting = document.querySelector('.greeting-text');

    if (greeting) {
        const hour = new Date().getHours();

        if (hour >= 12 && hour < 13) {
            greeting.textContent = "Selamat Menunaikan Ibadah Sholat Zuhur";
        } else if (hour >= 13 && hour < 15) {
            greeting.textContent = "Selamat Menjalankan Ibadah Puasa";
        } else if (hour >= 15 && hour < 16) {
            greeting.textContent = "Selamat Menunaikan Ibadah Sholat Asar";
        } else if (hour >= 16 && hour < 18) {
            greeting.textContent = "Selamat Menjalankan Ibadah Puasa";
        } else if (hour >= 18 && hour < 19) {
            greeting.textContent = "Selamat Berbuka Puasa dan Menunaikan Ibadah Sholat Magrib";
        } else if (hour >= 19 && hour < 21) {
            greeting.textContent = "Selamat Menunaikan Ibadah Sholat Isya dan Sholat Tarawih";
        } else if (hour >= 21 || hour < 3) {
            greeting.textContent = "Selamat Beristirahat, Siapkan Energimu Esok untuk Berpuasa!";
        } else if (hour >= 3 && hour < 4.5) {
            greeting.textContent = "Selamat, Waktunya Sahur!";
        } else if (hour >= 4.5 && hour < 5.5) {
            greeting.textContent = "Selamat Menunaikan Ibadah Sholat Subuh";
        } else {
            greeting.textContent = "Selamat Beraktivitas dan Beribadah Puasa Ramadan";
        }
    }
});