document.addEventListener("DOMContentLoaded", function () {
    const hitungButton = document.querySelector("#hitungZakatBtn");
    const hartaInput = document.querySelector("#harta");
    const resultElement = document.querySelector("#hasilZakat");
    const scrollButton = document.querySelector("#scrollToCalculator");

    if (!hitungButton || !hartaInput || !resultElement) {
        console.error("❌ Error: Salah satu elemen tidak ditemukan!");
        return;
    }

    // Event listener untuk tombol hitung zakat
    hitungButton.addEventListener("click", function () {
        const harta = parseFloat(hartaInput.value);

        if (isNaN(harta) || harta <= 0) {
            resultElement.textContent = "⚠️ Masukkan jumlah harta yang valid.";
            resultElement.style.color = "red";
            return;
        }

        const nisab = 85700000;
        let zakat = 0;

        if (harta >= nisab) {
            zakat = harta * 0.025; // 2.5% dari total harta
            resultElement.textContent = `✅ Zakat yang harus dibayarkan: Rp ${zakat.toLocaleString('id-ID')}`;
            resultElement.style.color = "white";
        } else {
            resultElement.textContent = "⚠️ Anda belum mencapai nisab zakat.";
            resultElement.style.color = "yellow";
        }
    });

    // Event listener untuk tombol scroll
    if (scrollButton) {
        scrollButton.addEventListener("click", function () {
            const calculatorSection = document.querySelector("#calculatorSection");
            if (calculatorSection) {
                calculatorSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
});
