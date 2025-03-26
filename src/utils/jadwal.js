document.addEventListener("DOMContentLoaded", () => {
    loadProvinsi();
    document.getElementById("provinsi")?.addEventListener("change", loadKabKota);
    document.getElementById("kabkota")?.addEventListener("change", getJadwalSholat);
});

async function loadProvinsi() {
    try {
        const response = await fetch("https://equran.id/api/v2/imsakiyah/provinsi");
        if (!response.ok) throw new Error("Gagal mengambil data provinsi");

        const data = await response.json();
        const selectProvinsi = document.getElementById("provinsi");
        if (!selectProvinsi) return;

        // Reset pilihan
        selectProvinsi.innerHTML = '<option value="">Pilih Provinsi</option>';

        // Tambahkan daftar provinsi
        selectProvinsi.innerHTML += data.data
            .map(prov => `<option value="${prov}">${prov}</option>`)
            .join("");

    } catch (error) {
        console.error("Gagal memuat provinsi:", error);
    }
}

async function loadKabKota() {
    const provinsi = document.getElementById("provinsi").value;
    const selectKabKota = document.getElementById("kabkota");
    if (!provinsi || !selectKabKota) return;

    try {
        selectKabKota.innerHTML = '<option value="">Memuat...</option>';
        selectKabKota.disabled = true; 

        const response = await fetch("https://equran.id/api/v2/imsakiyah/kabkota", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({ provinsi })
        });

        if (!response.ok) throw new Error("Gagal mengambil kabupaten/kota");

        const data = await response.json();
        selectKabKota.innerHTML = '<option value="">Pilih Kabupaten/Kota</option>';

        selectKabKota.innerHTML += data.data
            .map(kabkota => `<option value="${kabkota}">${kabkota}</option>`)
            .join("");

        selectKabKota.disabled = false;
    } catch (error) {
        console.error("Gagal memuat kabupaten/kota:", error);
        selectKabKota.innerHTML = '<option value="">Gagal memuat</option>';
        selectKabKota.disabled = true;
    }
}

async function getJadwalSholat() {
    const provinsi = document.getElementById("provinsi").value;
    const kabkota = document.getElementById("kabkota").value;
    if (!provinsi || !kabkota) return;

    try {
        // Tampilkan loading sementara
        const prayerTimes = ["imsak", "subuh", "dzuhur", "ashar", "maghrib", "isya"];
        prayerTimes.forEach(time => document.getElementById(time).textContent = "Memuat...");

        const response = await fetch("https://equran.id/api/v2/imsakiyah", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({ provinsi, kabkota })
        });

        if (!response.ok) throw new Error("Gagal mengambil jadwal sholat");

        const data = await response.json();
        if (!data.data || data.data.length === 0) throw new Error("Data jadwal kosong");

        const jadwal = data.data[0].imsakiyah[0];

        document.getElementById("imsak").textContent = jadwal.imsak || "-";
        document.getElementById("subuh").textContent = jadwal.subuh || "-";
        document.getElementById("dzuhur").textContent = jadwal.dzuhur || "-";
        document.getElementById("ashar").textContent = jadwal.ashar || "-";
        document.getElementById("maghrib").textContent = jadwal.maghrib || "-";
        document.getElementById("isya").textContent = jadwal.isya || "-";

        document.getElementById("location").textContent = `Jadwal Sholat untuk ${kabkota}, ${provinsi}`;
    } catch (error) {
        console.error("Gagal memuat jadwal sholat:", error);
        document.getElementById("location").textContent = "Gagal memuat jadwal sholat";
    }
}


export { loadProvinsi, loadKabKota, getJadwalSholat };
