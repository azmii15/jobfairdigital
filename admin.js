
// ====================================
// 1. MENGAMBIL ELEMEN HTML
// ====================================

const fileCSV = document.getElementById("fileCSV");
const btnUpload = document.getElementById("btnUpload");
const tabelTamu = document.getElementById("tabelTamu");
const statusUpload = document.getElementById("statusUpload");

let daftarTamu = [];


// ====================================
// 2. FUNGSI UPLOAD CSV
// ====================================

btnUpload.addEventListener("click", function () {

    const file = fileCSV.files[0];

    if (!file) {
        statusUpload.textContent =
            "Silakan pilih file CSV terlebih dahulu.";

        return;
    }

    // Membaca CSV menggunakan PapaParse
    Papa.parse(file, {

        header: true,
        skipEmptyLines: true,
        transformHeader: header => header.trim(),

        complete: function (hasil) {

            const kolomWajib = [
                "id",
                "nama_tamu",
                "instansi",
                "kategori",
                "no_whatsapp"
            ];

            const kolomCSV = hasil.meta.fields || [];

            const kolomValid = kolomWajib.every(
                kolom => kolomCSV.includes(kolom)
            );

            if (!kolomValid) {
                statusUpload.textContent =
                    "Format CSV tidak sesuai. Periksa nama kolom.";

                return;
            }

            if (hasil.errors.length > 0) {
                statusUpload.textContent =
                    "Terdapat kesalahan saat membaca CSV.";

                return;
            }

            daftarTamu = hasil.data;

            tampilkanTamu();

            statusUpload.textContent =
                "Berhasil membaca " +
                daftarTamu.length +
                " data tamu.";

        },

        error: function () {

            statusUpload.textContent =
                "Gagal membaca file CSV.";

        }

    });

});


// ====================================
// 3. MENAMPILKAN DATA TAMU
// ====================================

function tampilkanTamu() {

    tabelTamu.innerHTML = "";

    daftarTamu.forEach(function (tamu) {

        const baris = document.createElement("tr");

        const data = [
            tamu.id,
            tamu.nama_tamu,
            tamu.instansi,
            tamu.kategori,
            tamu.no_whatsapp
        ];

        data.forEach(function (isi) {

            const kolom = document.createElement("td");

            kolom.textContent = isi || "-";

            baris.appendChild(kolom);

        });


        // Kolom aksi
        const kolomAksi = document.createElement("td");

        const linkUndangan = buatLink(tamu);

        // Tombol melihat link undangan
        const tombolLink = document.createElement("a");

        tombolLink.href = linkUndangan;
        tombolLink.target = "_blank";
        tombolLink.rel = "noopener";
        tombolLink.textContent = "Buat Link";
        tombolLink.className = "btn-link";


        // Tombol WhatsApp
        const tombolWA = document.createElement("a");

        const nomor = normalisasiNomor(tamu.no_whatsapp);

        const pesan =
            "Halo " + tamu.nama_tamu + ",\n\n" +
            "Kami mengundang Anda untuk menghadiri " +
            "Edu Fair & Career Day 2026.\n\n" +
            "Instansi: " + tamu.instansi + "\n" +
            "Kategori: " + tamu.kategori + "\n\n" +
            "Silakan buka undangan resmi berikut:\n" +
            linkUndangan + "\n\n" +
            "Terima kasih.";

        tombolWA.href =
            "https://wa.me/" + nomor +
            "?text=" + encodeURIComponent(pesan);

        tombolWA.target = "_blank";
        tombolWA.rel = "noopener";
        tombolWA.textContent = "Kirim WhatsApp";
        tombolWA.className = "btn-wa";


        kolomAksi.appendChild(tombolLink);
        kolomAksi.appendChild(tombolWA);

        baris.appendChild(kolomAksi);

        tabelTamu.appendChild(baris);

    });

    hitungStatistik();

}


// ====================================
// 4. MEMBUAT LINK UNDANGAN PERSONAL
// ====================================



function buatLink(tamu) {
    const url = new URL("index.html", window.location.href);

    url.searchParams.set("to", tamu.nama_tamu);
    url.searchParams.set("instansi", tamu.instansi);
    url.searchParams.set("kategori", tamu.kategori);

    return url.href;
}





// ====================================
// 5. NORMALISASI NOMOR WHATSAPP
// ====================================

function normalisasiNomor(nomor) {

    let hasil = String(nomor).replace(/\D/g, "");

    // Mengubah 08 menjadi 628
    if (hasil.startsWith("0")) {
        hasil = "62" + hasil.substring(1);
    }

    // Menambahkan kode negara jika belum ada
    if (!hasil.startsWith("62")) {
        hasil = "62" + hasil;
    }

    return hasil;

}


// ====================================
// 6. MENGHITUNG STATISTIK TAMU
// ====================================

function hitungStatistik() {

    const kampus = daftarTamu.filter(
        tamu => tamu.kategori.trim().toLowerCase() === "kampus"
    ).length;

    const perusahaan = daftarTamu.filter(
        tamu => tamu.kategori.trim().toLowerCase() === "perusahaan"
    ).length;

    document.getElementById("totalTamu").textContent =
        daftarTamu.length;

    document.getElementById("totalKampus").textContent =
        kampus;

    document.getElementById("totalPerusahaan").textContent =
        perusahaan;

}
